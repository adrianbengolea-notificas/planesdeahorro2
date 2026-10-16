#!/usr/bin/env node
/**
 * App Hosting (Next standalone): pdf.js importa pdf.worker.mjs por ruta relativa;
 * el trazado NFT a veces no lo copia. Lo sincronizamos antes del empaquetado.
 */
import { cpSync, existsSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { createRequire } from 'node:module';

const appRoot = process.cwd();
const require = createRequire(import.meta.url);

function findStandaloneRoot() {
  const queue = [join(appRoot, '.next/standalone')];
  while (queue.length) {
    const dir = queue.shift();
    if (!existsSync(dir)) continue;
    if (existsSync(join(dir, 'server.js'))) return dir;
    for (const name of readdirSync(dir)) {
      const child = join(dir, name);
      try {
        if (statSync(child).isDirectory()) queue.push(child);
      } catch {
        /* ignore */
      }
    }
  }
  return null;
}

const standalone = findStandaloneRoot();
if (!standalone) {
  console.log('[copy-standalone-pdf-worker] Sin output standalone; omitido.');
  process.exit(0);
}

const workerNames = ['pdf.worker.mjs', 'pdf.worker.min.mjs'];
let copied = 0;

for (const name of workerNames) {
  let src;
  try {
    src = require.resolve(`pdfjs-dist/legacy/build/${name}`);
  } catch {
    continue;
  }
  if (!existsSync(src)) continue;

  const rel = join('node_modules', 'pdfjs-dist', 'legacy', 'build', name);
  const dest = join(standalone, rel);
  mkdirSync(dirname(dest), { recursive: true });
  cpSync(src, dest, { force: true });
  copied += 1;
  console.log('[copy-standalone-pdf-worker]', rel);
}

if (copied === 0) {
  console.warn('[copy-standalone-pdf-worker] No se encontró pdf.worker en node_modules.');
}
