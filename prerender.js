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
