#!/usr/bin/env node
/**
 * Firebase App Hosting + Next standalone: a veces solo queda un public/ parcial (NFT).
 * Copiamos public/ y .next/static al directorio standalone antes de empaquetar.
 */
import { cpSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const appRoot = process.cwd();

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
  console.log('[copy-standalone-public] Sin output standalone; omitido.');
  process.exit(0);
}

const publicSrc = join(appRoot, 'public');
const staticSrc = join(appRoot, '.next/static');

if (existsSync(publicSrc)) {
  cpSync(publicSrc, join(standalone, 'public'), { recursive: true, force: true });
  console.log('[copy-standalone-public] public/ →', join(standalone, 'public'));
}

if (existsSync(staticSrc)) {
  cpSync(staticSrc, join(standalone, '.next/static'), { recursive: true, force: true });
  console.log('[copy-standalone-public] .next/static →', join(standalone, '.next/static'));
}
