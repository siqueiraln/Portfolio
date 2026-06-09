const npmRoot = require('child_process').execSync('npm root -g').toString().trim();
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType,
  ShadingType, VerticalAlign, PageNumber, PageBreak
} = require(npmRoot + '/docx');
const fs = require('fs');
const path = require('path');

// ── Palette ──────────────────────────────────────────────────────────
const NAVY      = '1B2A4A';
const ACCENT    = '2563EB';
const GREEN     = '16A34A';
const AMBER     = 'D97706';
const RED       = 'DC2626';
const ORANGE    = 'EA580C';
const LGRAY     = 'F8F9FA';
const BORDER    = 'E2E8F0';
const DARK      = '1E293B';
const LIGHTBLUE = 'EFF6FF';
const SLATE     = '94A3B8';
const LIGHTGREEN= 'F0FDF4';

// ── Score helpers ─────────────────────────────────────────────────────
function scoreColor(s) { return s >= 8 ? GREEN : s >= 5 ? AMBER : RED; }
function scoreStatus(s) { return s >= 8 ? 'Strong' : s >= 5 ? 'On Track' : 'Needs Work'; }

const SEO_SCORE = 5;
const GEO_SCORE = 4;
const AEO_SCORE = 2;
const COMBINED  = SEO_SCORE + GEO_SCORE + AEO_SCORE;

// ── Helpers ───────────────────────────────────────────────────────────
const noBorder = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder, insideH: noBorder, insideV: noBorder };
const thinBorder = { style: BorderStyle.SINGLE, size: 4, color: BORDER };
const thinBorders = { top: thinBorder, bottom: thinBorder, left: thinBorder, right: thinBorder };
const navyBorderBottom = { top: noBorder, left: noBorder, right: noBorder, bottom: { style: BorderStyle.SINGLE, size: 8, color: NAVY } };

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 160 },
    children: [new TextRun({ text, bold: true, size: 48, color: DARK, font: 'Arial' })]
  });
}

function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 280, after: 120 },
    children: [new TextRun({ text, bold: true, size: 36, color: DARK, font: 'Arial' })]
  });
}

function body(text, opts = {}) {
  return new Paragraph({
    spacing: { before: 80, after: 80 },
    children: [new TextRun({ text, size: 22, color: DARK, font: 'Arial', ...opts })]
  });
}

function spacer(lines = 1) {
  return new Paragraph({ spacing: { before: lines * 100, after: 0 }, children: [new TextRun('')] });
}

function cell(texts, { bg, bold, color, size, align, width, vAlign, borders } = {}) {
  const paras = (Array.isArray(texts) ? texts : [texts]).map(t =>
    new Paragraph({
      alignment: align || AlignmentType.LEFT,
      spacing: { before: 60, after: 60 },
      children: [new TextRun({
        text: String(t),
        bold: bold || false,
        size: size || 22,
        color: color || DARK,
        font: 'Arial'
      })]
    })
  );
  return new TableCell({
    width: width ? { size: width, type: WidthType.DXA } : undefined,
    verticalAlign: vAlign || VerticalAlign.CENTER,
    shading: bg ? { fill: bg, type: ShadingType.CLEAR, color: 'auto' } : undefined,
    borders: borders || thinBorders,
    margins: { top: 100, bottom: 100, left: 120, right: 120 },
    children: paras
  });
}

function statusCell(score) {
  const bg = scoreColor(score);
  return cell(scoreStatus(score), { bg, color: 'FFFFFF', bold: true, align: AlignmentType.CENTER, borders: thinBorders });
}

function priorityCell(label, bg) {
  return cell(label, { bg, color: 'FFFFFF', bold: true, align: AlignmentType.CENTER, borders: thinBorders });
}

function shadeRow(i) { return i % 2 === 0 ? 'FFFFFF' : LGRAY; }

// ── COVER PAGE ────────────────────────────────────────────────────────
function buildCover() {
  const navyCell = (children) => new TableCell({
    shading: { fill: NAVY, type: ShadingType.CLEAR, color: 'auto' },
    borders: noBorders,
    margins: { top: 0, bottom: 0, left: 0, right: 0 },
    children
  });

  const coverPara = (text, size, color, spaceBefore = 0, spaceAfter = 0, bold = false, align = AlignmentType.CENTER) =>
    new Paragraph({
      alignment: align,
      spacing: { before: spaceBefore, after: spaceAfter },
      children: [new TextRun({ text, size, color, bold, font: 'Arial' })]
    });

  // Score table on cover
  const scoreCovCell = (label, score) => {
    const bg = scoreColor(score);
    return new TableCell({
      width: { size: 3120, type: WidthType.DXA },
      shading: { fill: bg, type: ShadingType.CLEAR, color: 'auto' },
      borders: noBorders,
      margins: { top: 160, bottom: 160, left: 80, right: 80 },
      verticalAlign: VerticalAlign.CENTER,
      children: [
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 0, after: 40 }, children: [new TextRun({ text: label, bold: true, size: 20, color: 'FFFFFF', font: 'Arial' })] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 0, after: 40 }, children: [new TextRun({ text: String(score) + '/10', bold: true, size: 72, color: 'FFFFFF', font: 'Arial' })] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 0, after: 0 }, children: [new TextRun({ text: scoreStatus(score), italics: true, size: 18, color: 'FFFFFF', font: 'Arial' })] }),
      ]
    });
  };

  const scoreTable = new Table({
    width: { size: 9360, type: WidthType.DXA },
    borders: noBorders,
    rows: [new TableRow({ children: [scoreCovCell('SEO', SEO_SCORE), scoreCovCell('GEO', GEO_SCORE), scoreCovCell('AEO', AEO_SCORE)] })]
  });

  return [
    new Table({
      width: { size: 12240, type: WidthType.DXA },
      borders: noBorders,
      rows: [new TableRow({
        children: [navyCell([
          coverPara('', 20, NAVY, 0, 0),
          coverPara('', 20, NAVY, 1800, 0),
          coverPara('lucassiqueira.vercel.app', 72, 'FFFFFF', 0, 80, true),
          coverPara('SEO / GEO / AEO Audit Report', 36, '93C5FD', 0, 80),
          coverPara('FULL AUDIT', 22, 'FFFFFF', 0, 400),
          scoreTable,
          coverPara('', 20, NAVY, 1800, 0),
          coverPara('9 de junho de 2026', 18, SLATE, 0, 40),
          coverPara('Claude Code SEO/GEO/AEO Skill', 18, SLATE, 0, 200),
        ])]
      })]
    }),
    new Paragraph({ children: [new PageBreak()] })
  ];
}

// ── EXECUTIVE SUMMARY ─────────────────────────────────────────────────
function buildExecutiveSummary() {
  const summaryBox = new Table({
    width: { size: 9360, type: WidthType.DXA },
    borders: noBorders,
    rows: [new TableRow({
      children: [new TableCell({
        shading: { fill: LIGHTBLUE, type: ShadingType.CLEAR, color: 'auto' },
        borders: thinBorders,
        margins: { top: 160, bottom: 160, left: 200, right: 200 },
        children: [
          new Paragraph({ spacing: { before: 0, after: 100 }, children: [new TextRun({ text: 'O portfólio de Lucas Siqueira possui uma base técnica de SEO razoável — title, canonical, Open Graph e JSON-LD Person schema estão presentes — mas o posicionamento atual como "Desenvolvedor No-Code" não reflete o novo perfil de "Parceiro de Tecnologia" que o usuário deseja comunicar. O título e a meta description estão acima dos limites ideais e a imagem OG usa caminho relativo, que falha em plataformas sociais. O maior gargalo é a quase ausência de sinais GEO e AEO: o site não tem blog, depoimentos, FAQ, métricas de impacto reais nem estruturas de resposta direta que permitam que modelos de IA o citem como autoridade. O novo posicionamento — parceiro de tecnologia completo para PMEs no interior de Sergipe — é estrategicamente sólido e diferenciado; executar a migração corretamente pode capturar buscas locais de alta intenção que atualmente não convertem para este perfil.', size: 22, color: DARK, font: 'Arial' })] })
        ]
      })]
    })]
  });

  const scoresTable = new Table({
    width: { size: 9360, type: WidthType.DXA },
    borders: noBorders,
    rows: [
      new TableRow({ tableHeader: true, children: [
        cell('Dimensão', { bg: NAVY, color: 'FFFFFF', bold: true, align: AlignmentType.CENTER }),
        cell('Pontuação', { bg: NAVY, color: 'FFFFFF', bold: true, align: AlignmentType.CENTER }),
        cell('Status', { bg: NAVY, color: 'FFFFFF', bold: true, align: AlignmentType.CENTER }),
        cell('Takeaway Principal', { bg: NAVY, color: 'FFFFFF', bold: true }),
      ]}),
      new TableRow({ children: [
        cell('SEO', { bold: true }),
        cell(SEO_SCORE + '/10', { bg: scoreColor(SEO_SCORE), color: 'FFFFFF', bold: true, align: AlignmentType.CENTER }),
        statusCell(SEO_SCORE),
        cell('Title (78 ch) e description (215 ch) acima do limite; múltiplos H1; og:image relativa'),
      ]}),
      new TableRow({ children: [
        cell('GEO', { bold: true }),
        cell(GEO_SCORE + '/10', { bg: scoreColor(GEO_SCORE), color: 'FFFFFF', bold: true, align: AlignmentType.CENTER }),
        statusCell(GEO_SCORE),
        cell('Sem testimoniais, sem métricas reais, sem conteúdo editorial citável por IA'),
      ]}),
      new TableRow({ children: [
        cell('AEO', { bold: true }),
        cell(AEO_SCORE + '/10', { bg: scoreColor(AEO_SCORE), color: 'FFFFFF', bold: true, align: AlignmentType.CENTER }),
        statusCell(AEO_SCORE),
        cell('Sem FAQ, sem headings em forma de pergunta, sem FAQPage/HowTo schema'),
      ]}),
      new TableRow({ children: [
        cell('COMBINADO', { bold: true }),
        cell(COMBINED + '/30', { bold: true, align: AlignmentType.CENTER }),
        cell(''),
        cell(''),
      ]}),
    ]
  });

  return [h1('Resumo Executivo'), spacer(), summaryBox, spacer(2), scoresTable];
}

// ── PAGES AUDITED ─────────────────────────────────────────────────────
function buildPagesAudited() {
  const pages = [
    ['https://lucassiqueira.vercel.app/', 'Homepage (SPA)', 'Seção principal — contém todas as 5 seções da página'],
    ['/robots.txt', 'Robots.txt', '404 — arquivo ausente'],
    ['/sitemap.xml', 'Sitemap', 'Presente; apenas 1 URL listada (homepage)'],
    ['#home (Hero)', 'Seção Hero', 'H1 triplo, foto, CTAs WhatsApp e Projetos'],
    ['#skills (Soluções)', 'Seção Soluções', '3 cards de serviço; sem H2 otimizado para keyword'],
    ['#about (Sobre)', 'Seção Sobre', 'Bio detalhada, 3 parágrafos, sem credenciais formais'],
    ['#projects (Projetos)', 'Seção Projetos', '5 projetos com modal de detalhes; sem links de case study'],
    ['#contact (Contato)', 'Seção Contato / Footer', 'Formulário mailto + redes sociais; sem telefone visível'],
  ];

  const rows = pages.map(([url, type, notes], i) => new TableRow({
    children: [
      cell(url, { bg: shadeRow(i) }),
      cell(type, { bg: shadeRow(i) }),
      cell(notes, { bg: shadeRow(i) }),
    ]
  }));

  return [
    h1('Páginas Auditadas'),
    new Table({
      width: { size: 9360, type: WidthType.DXA },
      borders: noBorders,
      rows: [
        new TableRow({ tableHeader: true, children: [
          cell('URL / Âncora', { bg: NAVY, color: 'FFFFFF', bold: true }),
          cell('Tipo', { bg: NAVY, color: 'FFFFFF', bold: true }),
          cell('Observações', { bg: NAVY, color: 'FFFFFF', bold: true }),
        ]}),
        ...rows
      ]
    })
  ];
}

// ── SIGNAL TABLE helper ───────────────────────────────────────────────
function signalTable(rows) {
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    borders: noBorders,
    rows: [
      new TableRow({ tableHeader: true, children: [
        cell('Sinal', { bg: NAVY, color: 'FFFFFF', bold: true, width: 2400 }),
        cell('Achado', { bg: NAVY, color: 'FFFFFF', bold: true }),
        cell('Status', { bg: NAVY, color: 'FFFFFF', bold: true, width: 1400 }),
      ]}),
      ...rows.map(([signal, finding, status], i) => {
        const bg = status === 'Bom' ? GREEN : status === 'Atenção' ? AMBER : RED;
        return new TableRow({ children: [
          cell(signal, { bg: shadeRow(i), width: 2400 }),
          cell(finding, { bg: shadeRow(i) }),
          cell(status, { bg, color: 'FFFFFF', bold: true, align: AlignmentType.CENTER, width: 1400, borders: thinBorders }),
        ]});
      })
    ]
  });
}

// ── SEO ANALYSIS ──────────────────────────────────────────────────────
function buildSEO() {
  const technicalRows = [
    ['Title Tag', '"Lucas Siqueira | Desenvolvedor No-Code, Automação com n8n e IA — Simão Dias, SE" — 78 caracteres (limite ideal: 50-60). Keyword presente mas título truncado no SERP.', 'Atenção'],
    ['Meta Description', '215 caracteres (limite ideal: 150-160). Texto será cortado no Google. Contém keyword e CTA implícito, mas muito longa.', 'Atenção'],
    ['H1', 'Três tags <h1> separadas no componente Hero: "Desenvolvedor", "No-Code", "& IA". Semanticamente incorreto; Google espera um único H1 por página.', 'Crítico'],
    ['H2/H3', 'H2s presentes em cada seção (Soluções, Sobre Mim, Projetos, Contato). Hierarquia lógica, mas nenhum H2 usa keywords locais como "Simão Dias" ou "Sergipe".', 'Atenção'],
    ['URL', 'URL raiz limpa: lucassiqueira.vercel.app/. SPA sem subpáginas — perde oportunidade de URLs específicas por serviço.', 'Atenção'],
    ['Canonical', 'Presente e auto-referenciando corretamente: https://lucassiqueira.vercel.app/', 'Bom'],
    ['Robots Meta', '"index, follow" — correto e explícito.', 'Bom'],
    ['robots.txt', 'Arquivo ausente (404). Sem robots.txt, crawlers precisam adivinhar permissões.', 'Crítico'],
    ['Viewport / Mobile', 'Presente: "width=device-width, initial-scale=1.0"', 'Bom'],
    ['Open Graph', 'og:type, og:url, og:title, og:description, og:image, og:locale — todos presentes. Porém og:image usa "/headshot.webp" (relativo) em vez de URL absoluta — WhatsApp e LinkedIn não conseguem carregar a imagem.', 'Atenção'],
    ['Twitter Card', '"summary_large_image" presente com title, description e image. Mesmo problema: imagem com caminho relativo.', 'Atenção'],
    ['Alt Text', 'Foto principal usa alt={PERSONAL_INFO.name} → "Lucas Siqueira" (OK mas poderia incluir keyword). Imagens de projetos usam alt={project.title} (bom). Imagens decorativas sem alt vazio.', 'Atenção'],
    ['Internal Links', 'Navegação interna via scroll (âncoras #home, #skills, #about, #projects, #contact). Sem links de texto com anchor text descritivo entre seções de conteúdo.', 'Atenção'],
  ];

  const contentRows = [
    ['Volume de Conteúdo', 'Estimativa ~600-800 palavras totais visíveis — abaixo do ideal para uma página que quer ranquear por múltiplos serviços. Não há blog ou artigos.', 'Atenção'],
    ['Keyword Primary', '"Desenvolvedor No-Code" é o foco atual. Com o novo posicionamento, "parceiro de tecnologia Simão Dias" e "suporte de TI para empresas Sergipe" seriam muito mais eficazes localmente.', 'Atenção'],
    ['Conteúdo Local', 'Simão Dias/SE mencionado no title, description, body e schema. Ponto forte para SEO local.', 'Bom'],
    ['Freshness', 'Sem datas de publicação ou atualização visíveis. Sitemap indica lastmod 2026-04-12.', 'Atenção'],
    ['Legibilidade', 'Parágrafos curtos, bullet points nos projetos, subheadings por seção. Boa escaneabilidade.', 'Bom'],
    ['Prova Social', 'Sem depoimentos, avaliações ou endorsements de clientes. Falta forte de E-E-A-T.', 'Crítico'],
  ];

  const structuredRows = [
    ['JSON-LD Schema', 'Person schema presente com: name, jobTitle, description, url, email, address, sameAs, knowsAbout, areaServed, offers. Boa base.', 'Bom'],
    ['Schema Type', '"Person" é correto para portfólio pessoal, mas com o novo posicionamento de negócio local, adicionar "LocalBusiness" ou "ProfessionalService" aumentaria muito o alcance.', 'Atenção'],
    ['FAQPage Schema', 'Ausente.', 'Crítico'],
    ['HowTo Schema', 'Ausente.', 'Crítico'],
    ['BreadcrumbList', 'Ausente — SPA de página única, mas poderia ter breadcrumb para as seções.', 'Atenção'],
  ];

  return [
    h1('Análise SEO — ' + SEO_SCORE + '/10'),
    h2('Técnico On-Page'),
    signalTable(technicalRows),
    spacer(),
    h2('Qualidade de Conteúdo'),
    signalTable(contentRows),
    spacer(),
    h2('Dados Estruturados'),
    signalTable(structuredRows),
  ];
}

// ── GEO ANALYSIS ──────────────────────────────────────────────────────
function buildGEO() {
  const eeatRows = [
    ['Autor / Proprietário', 'Nome "Lucas Siqueira" explícito em todo o site — title, schema, footer. Identidade clara.', 'Bom'],
    ['Credenciais', 'Sem certificações, cursos ou diplomas citados. A bio menciona experiência multidisciplinar mas sem evidências verificáveis (links, certificados).', 'Crítico'],
    ['Contato', 'Email visível (lucas.sikeira78@gmail.com). WhatsApp clicável. Sem telefone textual, sem endereço completo na seção de contato.', 'Atenção'],
    ['Depoimentos', 'Completamente ausentes. Engines de IA (e o Google) dão peso enorme a provas sociais verificáveis.', 'Crítico'],
    ['Prêmios / Press', 'Ausentes.', 'Crítico'],
    ['Sobre Page', 'Seção "Sobre Mim" presente com bio de 3 parágrafos. Trajetória descrita (técnico de informática, agronegócio, esports). Boa narrativa pessoal.', 'Bom'],
    ['Organization Schema', 'Ausente. Com novo posicionamento de "parceiro de tecnologia", um schema LocalBusiness é essencial.', 'Crítico'],
  ];

  const aiRows = [
    ['Densidade Factual', 'Poucas métricas concretas: "4+ projetos", "2+ anos", "0 gambiarras". Muito genérico — IA prefere citar dados específicos ("reduziu 70% do tempo manual", "150 clientes atendidos").', 'Crítico'],
    ['Declarações Claras', 'Headline "Desenvolvedor No-Code & IA" no Hero comunica o valor principal de forma direta.', 'Bom'],
    ['Citação de Fontes', 'Sem referências a fontes externas ou dados de mercado.', 'Crítico'],
    ['Abrangência', 'Os 3 serviços atuais (automação, MVP, integrações) estão bem descritos. Com novo posicionamento, os novos serviços (hardware, manutenção, consultoria SaaS) não estão cobertos.', 'Atenção'],
    ['Clareza de Entidade', 'Nome "Lucas Siqueira" + localização "Simão Dias, SE" + sameAs para LinkedIn/GitHub/Instagram — entidade bem definida para engines de IA.', 'Bom'],
    ['Originalidade', 'Projetos como o sistema de afiliados ML+Shopee e Aura Extension são únicos e detalhados — bom sinal de originalidade.', 'Bom'],
    ['Blog / Editorial', 'Ausente. Sem conteúdo publicado regularmente, o site não recebe crawls frequentes e não aparece em respostas geradas por IA sobre temas de tecnologia local.', 'Crítico'],
  ];

  const techGeoRows = [
    ['HTTPS', 'Vercel fornece HTTPS automático — ativo.', 'Bom'],
    ['Renderização JavaScript', 'SPA React/Vite — todo o conteúdo é renderizado via JS. Googlebot renderiza JS mas pode levar mais tempo. Perplexity e outros crawlers de IA podem não executar JS, capturando apenas o title.', 'Crítico'],
    ['robots.txt', 'Ausente — sem diretivas para crawlers de IA (GPTBot, PerplexityBot, ClaudeBot, etc.).', 'Crítico'],
    ['sameAs / Brand Entity', 'LinkedIn, GitHub, Instagram, Facebook linkados no schema e no footer. Forte sinal de entidade.', 'Bom'],
    ['Schema Profundidade', 'Person básico sem Author, Dataset, ClaimReview ou SpeakableSpecification.', 'Atenção'],
  ];

  return [
    h1('Análise GEO — ' + GEO_SCORE + '/10'),
    h2('E-E-A-T (Experiência, Expertise, Autoridade, Confiança)'),
    signalTable(eeatRows),
    spacer(),
    h2('Conteúdo para Síntese por IA'),
    signalTable(aiRows),
    spacer(),
    h2('GEO Técnico'),
    signalTable(techGeoRows),
  ];
}

// ── AEO ANALYSIS ──────────────────────────────────────────────────────
function buildAEO() {
  const snippetRows = [
    ['Parágrafos de Resposta Direta', 'Nenhuma seção responde perguntas diretamente em 40-60 palavras abaixo de um heading interrogativo.', 'Crítico'],
    ['Padrões de Definição', 'Sem frases "X é..." que gerariam definition snippets para queries como "o que é automação n8n".', 'Crítico'],
    ['Listas Numeradas', 'Objetivos no componente TacticalBriefing têm lista numerada mas não estão no portfólio principal. As soluções principais são 3 cards visuais, não lista HTML.', 'Atenção'],
    ['Tabelas Comparativas', 'Ausentes.', 'Crítico'],
  ];

  const structuredRows = [
    ['FAQ Schema (FAQPage)', 'Completamente ausente. Perguntas como "Quanto custa um site em Simão Dias?" ou "O que é automação de processos para pequenas empresas?" seriam candidatas a featured snippets de alta intenção.', 'Crítico'],
    ['HowTo Schema', 'Ausente. Uma seção "Como contratar um parceiro de tecnologia" com passos poderia capturar featured snippets.', 'Crítico'],
    ['Headings Interrogativos', 'Nenhum H2 ou H3 usa linguagem de pergunta em todo o site.', 'Crítico'],
    ['Speakable Schema', 'Ausente.', 'Crítico'],
  ];

  const voiceRows = [
    ['Linguagem Conversacional', 'O copy usa linguagem direta e profissional ("Elimine tarefas repetitivas", "Valide sua ideia em semanas") mas não conversacional no estilo de busca por voz.', 'Atenção'],
    ['Cobertura Long-tail', 'Sem respostas para queries como "como automatizar WhatsApp de empresa pequena" ou "técnico de informática Simão Dias".', 'Crítico'],
    ['Sinais Locais (NAP)', 'Nome: "Lucas Siqueira" ✓. Endereço: só no schema (não visível na página) ✗. Telefone: WhatsApp clicável mas número não visível como texto ✗.', 'Atenção'],
    ['Schema Local', 'Sem LocalBusiness schema com horário de funcionamento, área de atendimento, tipos de serviço.', 'Crítico'],
  ];

  return [
    h1('Análise AEO — ' + AEO_SCORE + '/10'),
    h2('Elegibilidade para Featured Snippets'),
    signalTable(snippetRows),
    spacer(),
    h2('Formatos de Resposta Estruturada'),
    signalTable(structuredRows),
    spacer(),
    h2('Preparação para Busca por Voz'),
    signalTable(voiceRows),
  ];
}

// ── PRIORITY MATRIX ───────────────────────────────────────────────────
function buildPriorityMatrix() {
  const recs = [
    ['🔴 Crítico', RED,    'Migrar posicionamento completo para "Parceiro de Tecnologia"', 'SEO/GEO', 'Alto', 'Muito Alto'],
    ['🔴 Crítico', RED,    'Corrigir title tag para ≤60 chars com nova keyword', 'SEO', 'Baixo', 'Alto'],
    ['🔴 Crítico', RED,    'Corrigir meta description para ≤160 chars', 'SEO', 'Baixo', 'Alto'],
    ['🔴 Crítico', RED,    'Unificar 3 tags H1 em um único H1 semântico', 'SEO', 'Baixo', 'Alto'],
    ['🔴 Crítico', RED,    'og:image e twitter:image: substituir caminho relativo por URL absoluta', 'SEO', 'Baixo', 'Alto'],
    ['🔴 Crítico', RED,    'Criar robots.txt com diretivas para crawlers (incluindo GPTBot, PerplexityBot)', 'SEO/GEO', 'Baixo', 'Alto'],
    ['🟠 Alta',   ORANGE, 'Adicionar seção FAQ com 6-10 perguntas reais + FAQPage schema JSON-LD', 'AEO', 'Médio', 'Muito Alto'],
    ['🟠 Alta',   ORANGE, 'Adicionar LocalBusiness/ProfessionalService schema com todos os serviços', 'GEO/AEO', 'Médio', 'Alto'],
    ['🟠 Alta',   ORANGE, 'Incluir pelo menos 2 depoimentos reais de clientes com nome e cidade', 'GEO', 'Médio', 'Alto'],
    ['🟠 Alta',   ORANGE, 'Adicionar seção de serviços expandida cobrindo hardware, manutenção e consultoria SaaS', 'SEO/GEO', 'Médio', 'Muito Alto'],
    ['🟠 Alta',   ORANGE, 'Tornar NAP (Nome, Endereço, Telefone) visível como texto na seção de contato', 'AEO/GEO', 'Baixo', 'Alto'],
    ['🟡 Médio',  AMBER,  'Adicionar métricas reais aos projetos (ex.: "reduziu 80% do tempo de agendamento")', 'GEO', 'Médio', 'Alto'],
    ['🟡 Médio',  AMBER,  'Converter renderização crítica de SSG/SSR para garantir conteúdo no HTML estático', 'GEO', 'Alto', 'Alto'],
    ['🟡 Médio',  AMBER,  'Criar ao menos 1 artigo de blog por mês (ex.: "Como automatizar seu WhatsApp com n8n")', 'GEO', 'Alto', 'Muito Alto'],
    ['🟡 Médio',  AMBER,  'Reescrever H2s de seção com keywords locais (ex.: "Soluções de TI em Simão Dias, SE")', 'SEO', 'Baixo', 'Médio'],
    ['🟢 Quick Win', GREEN, 'Adicionar número de WhatsApp como texto visível no footer (NAP)', 'AEO', 'Baixo', 'Médio'],
    ['🟢 Quick Win', GREEN, 'Expandir alt text da foto: "Lucas Siqueira, parceiro de tecnologia em Simão Dias SE"', 'SEO', 'Baixo', 'Baixo'],
    ['🟢 Quick Win', GREEN, 'Adicionar sitemap.xml com todas as seções âncora e registrar no Google Search Console', 'SEO', 'Baixo', 'Médio'],
  ];

  return [
    h1('Matrix de Recomendações Prioritárias'),
    new Table({
      width: { size: 9360, type: WidthType.DXA },
      borders: noBorders,
      rows: [
        new TableRow({ tableHeader: true, children: [
          cell('Prioridade', { bg: NAVY, color: 'FFFFFF', bold: true, width: 1600 }),
          cell('Problema / Ação', { bg: NAVY, color: 'FFFFFF', bold: true }),
          cell('Dimensão', { bg: NAVY, color: 'FFFFFF', bold: true, width: 1200 }),
          cell('Esforço', { bg: NAVY, color: 'FFFFFF', bold: true, width: 1000 }),
          cell('Impacto', { bg: NAVY, color: 'FFFFFF', bold: true, width: 1000 }),
        ]}),
        ...recs.map(([label, bg, issue, dim, effort, impact], i) =>
          new TableRow({ children: [
            priorityCell(label, bg),
            cell(issue, { bg: shadeRow(i) }),
            cell(dim, { bg: shadeRow(i) }),
            cell(effort, { bg: shadeRow(i), align: AlignmentType.CENTER }),
            cell(impact, { bg: shadeRow(i), align: AlignmentType.CENTER }),
          ]})
        )
      ]
    })
  ];
}

// ── WHAT'S WORKING ────────────────────────────────────────────────────
function buildStrengths() {
  const strengths = [
    ['JSON-LD Person Schema Completo', 'sameAs com LinkedIn/GitHub/Instagram/Facebook, areaServed com Simão Dias/SE e Brasil, knowsAbout com 9 tecnologias, address com addressLocality/Region/Country — base sólida para entity graph.'],
    ['Open Graph e Twitter Card Completos', 'og:type, og:url, og:title, og:description, og:image, og:locale + twitter:card summary_large_image — todos presentes. Compartilhamento social funcional (exceto imagem relativa que é correção fácil).'],
    ['Canonical e Robots Corretos', 'Canonical auto-referenciando, robots "index, follow" explícito, lang="pt-BR" no html — SEO básico bem configurado.'],
    ['Localização Explícita', '"Simão Dias, SE" aparece no title, na meta description, no body text e no schema — forte sinal de relevância geográfica para buscas locais.'],
    ['Projetos com Detalhes Técnicos', 'Os projetos (Afiliados ML+Shopee, Aura Extension) têm descrições técnicas detalhadas com stack, arquitetura e CTAs reais — sinal de experiência genuína valioso para E-E-A-T.'],
    ['Identidade de Entidade Clara', 'Nome consistente em todo o site, foto profissional, links sociais verificáveis — engines de IA conseguem confirmar que Lucas Siqueira é uma pessoa real com presença digital.'],
    ['Performance Técnica', 'Vite + lazy loading de componentes + imagens WebP com preload — boas práticas de performance implementadas.'],
  ];

  return [
    h1('O que está funcionando bem'),
    new Table({
      width: { size: 9360, type: WidthType.DXA },
      borders: noBorders,
      rows: [
        new TableRow({ tableHeader: true, children: [
          cell('Ponto Forte', { bg: GREEN, color: 'FFFFFF', bold: true, width: 2800 }),
          cell('Evidência', { bg: GREEN, color: 'FFFFFF', bold: true }),
        ]}),
        ...strengths.map(([s, e], i) => new TableRow({ children: [
          cell(s, { bg: i % 2 === 0 ? LIGHTGREEN : 'FFFFFF', bold: true }),
          cell(e, { bg: i % 2 === 0 ? LIGHTGREEN : 'FFFFFF' }),
        ]}))
      ]
    })
  ];
}

// ── REPOSITIONING GUIDE ───────────────────────────────────────────────
function buildRepositioning() {
  const items = [
    ['Title Tag Sugerido', '"Lucas Siqueira | Parceiro de Tecnologia — Simão Dias, SE" (52 chars ✓)'],
    ['Meta Description Sugerida', '"Suporte completo de TI para empresas em Simão Dias e região: sites, automações, manutenção de computadores e consultoria de sistemas. Atendimento presencial e remoto." (168 chars — comprimir mais 8 para 160)'],
    ['H1 Sugerido (único)', '"Parceiro de Tecnologia para sua empresa"'],
    ['Subtítulo (H2 Hero)', '"Soluções web, automações, hardware e suporte de TI — tudo em um só lugar."'],
    ['Schema Type Adicional', 'LocalBusiness ou ProfessionalService com: @type, name, address, telephone, url, openingHours, areaServed, hasOfferCatalog'],
    ['Serviços a Adicionar', '1) Desenvolvimento web e sistemas 2) Automação de processos com n8n e IA 3) Consultoria de serviços online (SaaS) 4) Consultoria e compra de hardware com busca de melhores preços 5) Manutenção e suporte de computadores'],
    ['Keywords Locais Alvo', '"parceiro de tecnologia Simão Dias", "suporte TI pequenas empresas Sergipe", "automação para empresas Simão Dias", "manutenção de computadores Simão Dias SE"'],
  ];

  return [
    h1('Guia de Reposicionamento: "Parceiro de Tecnologia"'),
    body('Esta seção detalha as mudanças concretas para migrar o posicionamento atual de "Desenvolvedor No-Code" para "Parceiro de Tecnologia para PMEs". Sim — é totalmente viável incluir todos os serviços mencionados. O diferencial é que nenhuma empresa de TI em Simão Dias/SE provavelmente oferece tudo isso de forma unificada, o que cria um nicho poderoso.', {}),
    spacer(),
    new Table({
      width: { size: 9360, type: WidthType.DXA },
      borders: noBorders,
      rows: [
        new TableRow({ tableHeader: true, children: [
          cell('Elemento', { bg: NAVY, color: 'FFFFFF', bold: true, width: 2800 }),
          cell('Recomendação', { bg: NAVY, color: 'FFFFFF', bold: true }),
        ]}),
        ...items.map(([el, rec], i) => new TableRow({ children: [
          cell(el, { bg: shadeRow(i), bold: true }),
          cell(rec, { bg: shadeRow(i) }),
        ]}))
      ]
    })
  ];
}

// ── GLOSSARY ──────────────────────────────────────────────────────────
function buildGlossary() {
  const terms = [
    ['SEO (Search Engine Optimization)', 'Conjunto de técnicas para melhorar a visibilidade de um site nos resultados orgânicos de buscadores tradicionais como Google. Envolve otimização técnica (title, H1, schema), qualidade de conteúdo e autoridade de domínio.'],
    ['GEO (Generative Engine Optimization)', 'Disciplina emergente focada em otimizar conteúdo para ser citado e sintetizado por engines de IA como Google AI Overviews, ChatGPT Search, Perplexity e Gemini. Prioriza E-E-A-T, densidade factual e clareza de entidade.'],
    ['AEO (Answer Engine Optimization)', 'Otimização para featured snippets, caixas "People Also Ask" e busca por voz. Requer conteúdo estruturado em formato de pergunta-resposta, listas e tabelas, além de markup FAQ/HowTo.'],
    ['E-E-A-T', 'Experience, Expertise, Authoritativeness, Trustworthiness — os quatro pilares de qualidade de conteúdo usados pelo Google e engines de IA para avaliar credibilidade de uma fonte.'],
    ['Schema / JSON-LD', 'Linguagem de marcação estruturada (schema.org) inserida no HTML para comunicar à IA e ao Google o tipo de entidade que a página representa (pessoa, negócio local, artigo, FAQ, etc.).'],
    ['SPA (Single Page Application)', 'Aplicação web que carrega uma única página HTML e renderiza o conteúdo via JavaScript. Pode dificultar crawling por bots que não executam JS — como vários crawlers de IA.'],
  ];

  return [
    h1('Glossário'),
    new Table({
      width: { size: 9360, type: WidthType.DXA },
      borders: noBorders,
      rows: [
        new TableRow({ tableHeader: true, children: [
          cell('Termo', { bg: NAVY, color: 'FFFFFF', bold: true, width: 2800 }),
          cell('Definição', { bg: NAVY, color: 'FFFFFF', bold: true }),
        ]}),
        ...terms.map(([t, d], i) => new TableRow({ children: [
          cell(t, { bg: shadeRow(i), bold: true }),
          cell(d, { bg: shadeRow(i) }),
        ]}))
      ]
    })
  ];
}

// ── HEADER / FOOTER ───────────────────────────────────────────────────
function buildHeader() {
  return new Header({
    children: [
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        borders: { ...noBorders, bottom: { style: BorderStyle.SINGLE, size: 8, color: NAVY } },
        rows: [new TableRow({ children: [
          cell('lucassiqueira.vercel.app', { borders: noBorders }),
          cell('SEO / GEO / AEO Audit Report', { borders: noBorders, align: AlignmentType.RIGHT }),
        ]})]
      })
    ]
  });
}

function buildFooter() {
  return new Footer({
    children: [
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        borders: { ...noBorders, top: { style: BorderStyle.SINGLE, size: 4, color: BORDER } },
        rows: [new TableRow({ children: [
          cell('Claude Code SEO/GEO/AEO Skill', { borders: noBorders }),
          new TableCell({
            borders: noBorders,
            children: [new Paragraph({
              alignment: AlignmentType.RIGHT,
              children: [new TextRun({ children: [PageNumber.CURRENT], size: 18, color: SLATE, font: 'Arial' })]
            })]
          }),
        ]})]
      })
    ]
  });
}

// ── ASSEMBLE ──────────────────────────────────────────────────────────
const doc = new Document({
  sections: [
    // Cover — no header/footer
    {
      properties: {},
      children: buildCover(),
    },
    // Main content
    {
      properties: {},
      headers: { default: buildHeader() },
      footers: { default: buildFooter() },
      children: [
        ...buildExecutiveSummary(),
        new Paragraph({ children: [new PageBreak()] }),
        ...buildPagesAudited(),
        new Paragraph({ children: [new PageBreak()] }),
        ...buildSEO(),
        new Paragraph({ children: [new PageBreak()] }),
        ...buildGEO(),
        new Paragraph({ children: [new PageBreak()] }),
        ...buildAEO(),
        new Paragraph({ children: [new PageBreak()] }),
        ...buildPriorityMatrix(),
        new Paragraph({ children: [new PageBreak()] }),
        ...buildStrengths(),
        new Paragraph({ children: [new PageBreak()] }),
        ...buildRepositioning(),
        new Paragraph({ children: [new PageBreak()] }),
        ...buildGlossary(),
      ]
    }
  ]
});

const outDir = path.join(__dirname);
const outFile = path.join(outDir, 'seo-audit-lucassiqueira-2026-06-09.docx');

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(outFile, buf);
  console.log('DOCX written to:', outFile);
}).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
