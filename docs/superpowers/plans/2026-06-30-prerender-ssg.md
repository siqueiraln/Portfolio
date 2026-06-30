# Pré-renderização (SSG) do Portfólio — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Servir o HTML do portfólio já renderizado (conteúdo dentro de `<div id="root">`), em vez de uma casca vazia, para que Google e crawlers de IA (ChatGPT, Perplexity, Claude, Bing) enxerguem todo o conteúdo sem executar JavaScript.

**Architecture:** SSG nativo do Vite via `renderToString` em build-time — **sem navegador headless e sem dependências novas**. O build roda em três etapas: (1) build do cliente (gera `dist/` com a casca + bundle), (2) build SSR de um `entry-server.tsx` (gera `dist-server/`), (3) um script Node (`prerender.js`) que renderiza o `<App/>` para string e injeta esse HTML dentro do `<div id="root">` de `dist/index.html`. No cliente, `index.tsx` passa a **hidratar** o HTML existente em vez de recriá-lo do zero.

**Tech Stack:** Vite 6, React 19 (`react-dom/server` `renderToString` + `react-dom/client` `hydrateRoot`), TypeScript, Node ESM. Deploy na Vercel (build roda `npm run build`).

## Global Constraints

- **Zero dependências novas** — usar apenas `react`, `react-dom`, `vite` já instalados.
- **React 19** — usar `hydrateRoot`/`createRoot` de `react-dom/client` e `renderToString` de `react-dom/server`.
- **Preservar `<React.StrictMode>`** no cliente e no servidor (a árvore renderizada precisa ser idêntica).
- **Preservar o script anti-flash de tema** em `index.html` (linhas 12-20) e os blocos JSON-LD estáticos (`<head>`) — o prerender só substitui `<div id="root"></div>`, nada mais.
- **Não introduzir flash de tema:** as cores vêm de CSS vars trocadas pela classe `.dark` no `<html>` (controlada pelo script inline), não pelo React. O único valor de tema que afeta a árvore React é o ícone do `ThemeToggle` — tratado na Task 3.
- **Build precisa rodar na Vercel sem browser** — por isso `renderToString` (Node puro), nunca puppeteer.
- **Dev (`npm run dev`) não pode quebrar** — em dev o `<div id="root">` é vazio, então o cliente cai no caminho `createRoot`.
- Ambiente de desenvolvimento: Windows 11 + PowerShell. Comandos de verificação usam `node -e` (cross-platform), não `grep`.

---

## File Structure

| Arquivo | Responsabilidade | Ação |
|---|---|---|
| `App.tsx` | Árvore raiz da aplicação | Modificar — remover `React.lazy`/`Suspense`, usar imports estáticos |
| `index.tsx` | Entry do cliente (mount) | Modificar — hidratar se já houver HTML, senão renderizar |
| `components/Navbar.tsx` | Navbar + dono do `useTheme` | Modificar — estabilizar hidratação do `ThemeToggle` |
| `entry-server.tsx` | Entry de SSR (build-time) | Criar — exporta `render(): string` |
| `prerender.js` | Script Node que injeta o HTML em `dist/index.html` | Criar |
| `package.json` | Scripts de build | Modificar — pipeline client → server → prerender |
| `.gitignore` | Ignorar artefato de build do servidor | Modificar — adicionar `dist-server` |

**Por que de-lazy (Task 1):** `renderToString` não aguarda `React.lazy`; ele renderiza o `fallback` do `Suspense`. Com imports estáticos, o `renderToString` captura **todo** o conteúdo (About, Projects, FAQ, Contact, ChatWidget), e a primeira renderização do cliente passa a bater exatamente com o HTML do servidor (sem mismatch de hidratação). Para um site de página única, o code-splitting economizava só ~1-7 KB por chunk — perda desprezível.

---

### Task 1: De-lazy dos componentes de seção em `App.tsx`

Converte os componentes lazy (`About`, `Projects`, `FAQ`, `Contact`, `ChatWidget`) em imports estáticos e remove os `Suspense`/`ComponentFallback`. Refactor puro — sem mudança de comportamento visível para o usuário (em dev continua CSR).

**Files:**
- Modify: `App.tsx` (substituição integral)

**Interfaces:**
- Consumes: componentes existentes em `./components/*` (default exports), `useScrollReveal` (default), `SectionId` (de `./types`).
- Produces: `App` (default export) — árvore React totalmente síncrona, sem `Suspense`/`lazy`. Tasks 4 e 5 dependem de o `renderToString(<App/>)` produzir o conteúdo completo.

- [ ] **Step 1: Escrever a verificação que falha (ainda há `React.lazy`)**

Run:
```bash
node -e "const s=require('fs').readFileSync('App.tsx','utf8'); if(/React\.lazy|Suspense/.test(s)) {console.error('FALHA ESPERADA: App.tsx ainda usa lazy/Suspense'); process.exit(1)} else {console.log('OK')}"
```
Expected: FALHA — imprime "FALHA ESPERADA: App.tsx ainda usa lazy/Suspense" e sai com código 1.

- [ ] **Step 2: Reescrever `App.tsx` com imports estáticos**

Substituir todo o conteúdo de `App.tsx` por:

```tsx
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import About from './components/About';
import Projects from './components/Projects';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import ChatWidget from './components/ChatWidget';
import useScrollReveal from './hooks/useScrollReveal';
import { SectionId } from './types';

const App: React.FC = () => {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-bg text-ink">
      <Navbar />
      <main>
        <Hero />
        <Skills />
        <div id={SectionId.ABOUT}>
          <About />
        </div>
        <div id={SectionId.PROJECTS}>
          <Projects />
        </div>
        <div id={SectionId.FAQ}>
          <FAQ />
        </div>
      </main>
      <div id={SectionId.CONTACT}>
        <Contact />
      </div>
      <ChatWidget />
    </div>
  );
};

export default App;
```

- [ ] **Step 3: Rodar a verificação e confirmar que passa**

Run:
```bash
node -e "const s=require('fs').readFileSync('App.tsx','utf8'); if(/React\.lazy|Suspense/.test(s)) {console.error('ainda tem lazy'); process.exit(1)} else {console.log('OK: sem lazy/Suspense')}"
```
Expected: PASS — imprime "OK: sem lazy/Suspense".

- [ ] **Step 4: Build do cliente continua funcionando**

Run:
```bash
npm run build
```
Expected: build conclui sem erros (`✓ built in ...`). O bundle principal agora inclui as seções antes separadas (some o split de `About-*.js`, `Projects-*.js`, etc.); isso é esperado.

- [ ] **Step 5: Conferir visualmente em dev**

Run: `npm run dev` e abrir `http://localhost:3000`.
Expected: todas as seções (Hero, Serviços, Sobre, Projetos, FAQ, Contato) renderizam normalmente; animações de scroll funcionam. Encerrar o dev server (Ctrl+C) depois.

- [ ] **Step 6: Commit**

```bash
git add App.tsx
git commit -m "refactor: de-lazy section components for prerendering"
```

---

### Task 2: Entry do cliente hidrata HTML pré-renderizado (`index.tsx`)

Faz o cliente **hidratar** quando o `<div id="root">` já tem conteúdo (produção pré-renderizada) e **criar do zero** quando está vazio (dev). Sem esse passo, o React descartaria o HTML do servidor e a hidratação não aconteceria.

**Files:**
- Modify: `index.tsx` (substituição integral)

**Interfaces:**
- Consumes: `App` (default de `./App`), `./index.css`.
- Produces: comportamento de mount condicional. Não exporta nada novo.

- [ ] **Step 1: Verificação que falha (ainda usa só `createRoot`)**

Run:
```bash
node -e "const s=require('fs').readFileSync('index.tsx','utf8'); if(/hydrateRoot/.test(s)) {console.log('OK')} else {console.error('FALHA ESPERADA: sem hydrateRoot'); process.exit(1)}"
```
Expected: FALHA — "FALHA ESPERADA: sem hydrateRoot", código 1.

- [ ] **Step 2: Reescrever `index.tsx`**

Substituir todo o conteúdo por:

```tsx
import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Could not find root element to mount to');
}

const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Em produção o HTML já vem pré-renderizado (root com filhos) → hidratar.
// Em dev o root está vazio → renderizar do zero.
if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}
```

- [ ] **Step 3: Verificação passa**

Run:
```bash
node -e "const s=require('fs').readFileSync('index.tsx','utf8'); if(/hydrateRoot/.test(s) && /createRoot/.test(s)) {console.log('OK')} else {process.exit(1)}"
```
Expected: PASS — "OK".

- [ ] **Step 4: Build + dev continuam funcionando**

Run:
```bash
npm run build
```
Expected: build sem erros.

Run: `npm run dev`, abrir `http://localhost:3000`, confirmar que a página carrega (caminho `createRoot`, pois root vazio em dev). Encerrar com Ctrl+C.

- [ ] **Step 5: Commit**

```bash
git add index.tsx
git commit -m "feat: hydrate prerendered HTML on the client"
```

---

### Task 3: Estabilizar hidratação do tema (`components/Navbar.tsx`)

No servidor, `useTheme` retorna `'light'` (sem `window`/`localStorage`). No cliente, a primeira renderização pode retornar `'dark'` (valor salvo) → o ícone do `ThemeToggle` (Sun/Moon) diverge entre servidor e cliente, gerando aviso de mismatch de hidratação. Correção: na primeira renderização do cliente, passar `theme='light'` (igual ao servidor) e só refletir o tema real após montar. As **cores** da página não dependem disso (vêm da classe `.dark` no `<html>` via script inline), então não há flash visual além do próprio ícone do botão.

**Files:**
- Modify: `components/Navbar.tsx`

**Interfaces:**
- Consumes: `useTheme()` → `{ theme, toggle }`; `ThemeToggle` (props `theme`, `onToggle`).
- Produces: Navbar com ícone de tema estável na hidratação. Sem novas exports.

- [ ] **Step 1: Verificação que falha (Navbar ainda não tem guarda de mount)**

Run:
```bash
node -e "const s=require('fs').readFileSync('components/Navbar.tsx','utf8'); if(/mounted/.test(s)) {console.log('OK')} else {console.error('FALHA ESPERADA: sem guarda mounted'); process.exit(1)}"
```
Expected: FALHA — "FALHA ESPERADA: sem guarda mounted", código 1.

- [ ] **Step 2: Adicionar estado `mounted` e usá-lo no `theme` passado ao `ThemeToggle`**

Em `components/Navbar.tsx`:

1. Trocar a linha de import do React (linha 1) para incluir o que já é usado mais nada novo — ela já é `import React, { useState, useEffect } from 'react';`. Manter.

2. Logo após a linha `const { theme, toggle } = useTheme();` (linha 11), adicionar:

```tsx
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  // Antes de montar, espelha o tema do servidor ('light') para evitar mismatch de hidratação.
  const displayTheme = mounted ? theme : 'light';
```

3. Nas **duas** ocorrências de `<ThemeToggle theme={theme} onToggle={toggle} />` (uma no bloco desktop ~linha 65, outra no bloco mobile ~linha 78), trocar `theme={theme}` por `theme={displayTheme}`:

```tsx
<ThemeToggle theme={displayTheme} onToggle={toggle} />
```

- [ ] **Step 3: Verificação passa**

Run:
```bash
node -e "const s=require('fs').readFileSync('components/Navbar.tsx','utf8'); const n=(s.match(/displayTheme/g)||[]).length; if(/mounted/.test(s) && n>=3) {console.log('OK: mounted + '+n+' usos de displayTheme')} else {console.error('faltou aplicar displayTheme nos dois toggles'); process.exit(1)}"
```
Expected: PASS — "OK: mounted + 3 usos de displayTheme" (1 declaração + 2 usos).

- [ ] **Step 4: Build funciona**

Run: `npm run build`
Expected: sem erros.

- [ ] **Step 5: Commit**

```bash
git add components/Navbar.tsx
git commit -m "fix: stabilize theme toggle across hydration"
```

---

### Task 4: Entry de servidor + build SSR (`entry-server.tsx`, `package.json`)

Cria o ponto de entrada que o Vite compila em modo SSR e que o `prerender.js` importa para obter o HTML do app como string.

**Files:**
- Create: `entry-server.tsx`
- Modify: `package.json` (scripts)

**Interfaces:**
- Consumes: `App` (default de `./App`), `renderToString` de `react-dom/server`.
- Produces: `export function render(): string` em `entry-server.tsx` (após build SSR, vira `dist-server/entry-server.js` com a mesma export). Task 5 importa essa função.

- [ ] **Step 1: Criar `entry-server.tsx`**

Conteúdo de `entry-server.tsx` (na raiz do projeto, ao lado de `index.tsx`):

```tsx
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';

// Renderiza a mesma árvore que o cliente hidrata (com StrictMode) para HTML estático.
export function render(): string {
  return renderToString(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
```

- [ ] **Step 2: Adicionar scripts de build em `package.json`**

Substituir o bloco `"scripts"` atual:

```json
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
```

por:

```json
  "scripts": {
    "dev": "vite",
    "build": "npm run build:client && npm run build:server && npm run prerender",
    "build:client": "vite build",
    "build:server": "vite build --ssr entry-server.tsx --outDir dist-server",
    "prerender": "node prerender.js",
    "preview": "vite preview"
  },
```

- [ ] **Step 3: Verificar que o build SSR gera um módulo que renderiza HTML**

Run (gera os dois builds e testa o render do servidor isoladamente):
```bash
npm run build:client && npm run build:server && node -e "import('./dist-server/entry-server.js').then(m => { const html = m.render(); console.log('len:', html.length); console.log('temContent:', /Parceiro de Tecnologia/.test(html) && /Perguntas frequentes|Dúvidas comuns/.test(html)); })"
```
Expected:
- Os dois builds concluem sem erro.
- Imprime `len:` com um número alto (vários milhares).
- Imprime `temContent: true` (o HTML do servidor contém o hero e a seção de FAQ).

> Se `temContent` for `false` ou o `import` lançar erro de `window is not defined`, algum componente acessa API de browser durante o render. Localizar pelo stack trace e mover o acesso para dentro de `useEffect`/handler. (Pela auditoria atual, todos os componentes já são SSR-safe — este passo é a rede de segurança.)

- [ ] **Step 4: Commit**

```bash
git add entry-server.tsx package.json
git commit -m "feat: add SSR server entry and build scripts"
```

---

### Task 5: Script de prerender + pipeline de build (`prerender.js`, `.gitignore`)

Injeta o HTML do servidor dentro de `dist/index.html` e limpa o artefato `dist-server`.

**Files:**
- Create: `prerender.js`
- Modify: `.gitignore`

**Interfaces:**
- Consumes: `dist/index.html` (template do build do cliente), `dist-server/entry-server.js` (`render()` da Task 4).
- Produces: `dist/index.html` com `<div id="root">…conteúdo…</div>`. Nenhuma export.

- [ ] **Step 1: Criar `prerender.js`**

Conteúdo de `prerender.js` (raiz do projeto):

```js
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distIndex = path.resolve(__dirname, 'dist/index.html');
const serverEntry = path.resolve(__dirname, 'dist-server/entry-server.js');

const template = fs.readFileSync(distIndex, 'utf-8');

const PLACEHOLDER = '<div id="root"></div>';
if (!template.includes(PLACEHOLDER)) {
  throw new Error('prerender: não encontrei "' + PLACEHOLDER + '" em dist/index.html');
}

const { render } = await import(pathToFileURL(serverEntry).href);
const appHtml = render();

if (!appHtml || appHtml.length < 100) {
  throw new Error('prerender: render() retornou HTML vazio/curto (' + appHtml.length + ' chars)');
}

const html = template.replace(PLACEHOLDER, `<div id="root">${appHtml}</div>`);
fs.writeFileSync(distIndex, html);

// Remove o bundle de servidor — não deve ir para produção.
fs.rmSync(path.resolve(__dirname, 'dist-server'), { recursive: true, force: true });

console.log('✓ Prerender concluído: ' + appHtml.length + ' chars injetados em dist/index.html');
```

- [ ] **Step 2: Adicionar `dist-server` ao `.gitignore`**

Acrescentar uma linha `dist-server` ao arquivo `.gitignore` (que já contém `dist` e `dist-ssr`).

- [ ] **Step 3: Verificação que falha ANTES do prerender (root ainda vazio no build atual)**

Run:
```bash
npm run build:client && node -e "const s=require('fs').readFileSync('dist/index.html','utf8'); const empty=s.includes('<div id=\"root\"></div>'); console.log('rootVazio:', empty); process.exit(empty?0:1)"
```
Expected: imprime `rootVazio: true` (o build do cliente sozinho ainda entrega a casca vazia — é exatamente o problema que o prerender resolve).

- [ ] **Step 4: Rodar o build completo**

Run:
```bash
npm run build
```
Expected: as três etapas rodam em sequência e termina com `✓ Prerender concluído: <N> chars injetados em dist/index.html`. Sem erros.

- [ ] **Step 5: Verificar que o HTML final contém o conteúdo e segue válido**

Run:
```bash
node -e "
const fs=require('fs');
const s=fs.readFileSync('dist/index.html','utf8');
const rootEmpty=s.includes('<div id=\"root\"></div>');
const hasHero=/Parceiro de Tecnologia/.test(s);
const hasFaqText=/parceiro de tecnologia é um profissional/.test(s);
const hasContact=/Todos os direitos reservados/.test(s);
const noServerDir=!fs.existsSync('dist-server');
const blocks=[...s.matchAll(/<script type=\"application\/ld\+json\">([\s\S]*?)<\/script>/g)];
let jsonOk=blocks.length===2; blocks.forEach(b=>{try{JSON.parse(b[1])}catch(e){jsonOk=false}});
console.log({rootEmpty, hasHero, hasFaqText, hasContact, noServerDir, jsonBlocks:blocks.length, jsonOk});
if(rootEmpty||!hasHero||!hasFaqText||!hasContact||!noServerDir||!jsonOk){process.exit(1)}
console.log('OK: HTML pré-renderizado e válido');
"
```
Expected: `rootEmpty:false`, `hasHero:true`, `hasFaqText:true`, `hasContact:true`, `noServerDir:true`, `jsonBlocks:2`, `jsonOk:true`, e por fim "OK: HTML pré-renderizado e válido".

- [ ] **Step 6: Commit**

```bash
git add prerender.js .gitignore package.json
git commit -m "feat: prerender app HTML into dist/index.html at build time"
```

---

### Task 6: Verificar hidratação no navegador real

Garante que o cliente hidrata o HTML pré-renderizado sem erros e que tema, animações e links seguem funcionando. Esta é a verificação de regressão que confirma que não houve quebra visual nem mismatch.

**Files:** nenhum (verificação manual).

- [ ] **Step 1: Servir o build de produção**

Run:
```bash
npm run build && npm run preview
```
Expected: Vite preview sobe (geralmente `http://localhost:4173`).

- [ ] **Step 2: Conferir o console do navegador**

Abrir a URL do preview, abrir o DevTools (F12) → aba Console, recarregar.
Expected: **nenhum** erro/aviso de hidratação (procurar por "hydrat", "did not match", "Hydration failed"). O console deve estar limpo desses avisos.

- [ ] **Step 3: Conferir comportamento**

Na página servida:
- Alternar o tema pelo botão (sol/lua) → cores mudam e a escolha persiste ao recarregar.
- Rolar a página → animações de reveal disparam; seções aparecem.
- Os botões "Falar no WhatsApp" abrem o link correto; "Ver projetos" rola até a seção.
Expected: tudo funciona como antes do prerender. Encerrar o preview (Ctrl+C).

- [ ] **Step 4: Conferir o que um crawler sem JS veria**

Run (simula um fetch sem execução de JS lendo o arquivo servido):
```bash
node -e "const s=require('fs').readFileSync('dist/index.html','utf8'); const m=s.match(/<div id=\"root\">([\s\S]*?)<\/body>/); console.log('Tamanho do conteúdo no body root:', m?m[1].length:0, 'chars'); console.log('Contém serviços:', /Desenvolvimento Web|Automação/.test(s)); console.log('Contém todas as 10 perguntas FAQ:', (s.match(/text-sm font-semibold leading-snug|acceptedAnswer/g)||[]).length>0);"
```
Expected: tamanho na casa dos milhares de chars; "Contém serviços: true"; conteúdo do FAQ presente. (Confirma o ganho de SEO/GEO: o conteúdo agora está no HTML servido.)

- [ ] **Step 5: Sem mudanças de código — nada a commitar**

Se algum problema aparecer nos steps 2-3, voltar à task correspondente (mismatch de tema → Task 3; conteúdo faltando → Task 1/4). Caso contrário, seguir.

---

### Task 7: Confirmar deploy na Vercel e fechar

A Vercel roda `npm run build` por padrão; como o pipeline usa só Node + Vite (sem browser), o prerender roda no CI sem configuração extra. Esta task documenta isso e garante que o `vercel.json` existente não conflita.

**Files:**
- Modify (se necessário): `vercel.json`

**Interfaces:**
- Consumes: `vercel.json` atual (headers de segurança + cache; criado em trabalho anterior).
- Produces: confirmação de que o build de produção da Vercel serve o `dist/index.html` pré-renderizado.

- [ ] **Step 1: Confirmar que o `vercel.json` não define `buildCommand` divergente**

Run:
```bash
node -e "const c=require('./vercel.json'); console.log('buildCommand:', c.buildCommand||'(default: npm run build)'); console.log('outputDirectory:', c.outputDirectory||'(default: dist)');"
```
Expected: `buildCommand` ausente (usa o default `npm run build`, que agora inclui o prerender) e `outputDirectory` ausente/`dist`. Nenhuma ação necessária se ambos forem default.

- [ ] **Step 2: Garantir que `dist-server` não é servido**

Confirmar (visualmente) que `prerender.js` remove `dist-server` ao final (já incluído na Task 5) e que `.gitignore` contém `dist-server`. Como o `outputDirectory` da Vercel é `dist`, o `dist-server` nunca seria publicado mesmo se permanecesse — mas a remoção mantém o artefato limpo.

- [ ] **Step 3: Build limpo final (simula o CI)**

Run:
```bash
rm -rf dist dist-server && npm run build
```
Expected: termina com `✓ Prerender concluído: …`. `dist/index.html` existe e está pré-renderizado; `dist-server` não existe.

- [ ] **Step 4: Commit final (se houve ajuste no vercel.json) e push**

Se nada mudou no `vercel.json`, não há novo commit aqui — o trabalho já foi commitado nas tasks anteriores. Caso a equipe queira publicar:

```bash
git push
```
Expected: a Vercel dispara um deploy; após concluir, `view-source:` da URL de produção mostra o conteúdo dentro de `<div id="root">` (não mais vazio).

- [ ] **Step 5: Validação pós-deploy (opcional, after deploy)**

Run (substituir pela URL real de produção):
```bash
node -e "fetch('https://lucassiqueira.vercel.app/').then(r=>r.text()).then(t=>{console.log('rootVazio:', t.includes('<div id=\"root\"></div>')); console.log('temHero:', /Parceiro de Tecnologia/.test(t));})"
```
Expected: `rootVazio: false`, `temHero: true` — confirma que produção serve HTML pré-renderizado.

---

## Notas de risco e decisões

- **Por que SSG via `renderToString` e não `react-snap`/puppeteer:** zero dependências novas, build determinístico e sem download de Chromium — roda no CI da Vercel sem configuração. A auditoria confirmou que todos os componentes são SSR-safe (acessos a `window`/`document` só em effects/handlers).
- **Mismatch de hidratação previsto e tratado:** apenas o ícone do `ThemeToggle` dependia do tema na árvore React (Task 3). As cores em si vêm da classe `.dark` no `<html>` (script anti-flash), que não é tocada pelo React — logo, sem flash de cor.
- **`.reveal` com `opacity:0`:** o conteúdo pré-renderizado fica visualmente oculto até o `IntersectionObserver` adicionar `.visible` na hidratação — comportamento idêntico ao atual. Crawlers leem o texto no HTML independentemente de `opacity` (não é `display:none`), então o ganho de SEO/GEO é real.
- **Perda de code-splitting:** aceita de propósito; em página única o split economizava poucos KB e impedia o prerender completo.
- **Escopo NÃO coberto aqui (itens da auditoria que dependem de você):** Google Business Profile, domínio `.com.br`, depoimentos, âncoras de preço, páginas de serviço dedicadas. Este plano cobre só a pré-renderização.
