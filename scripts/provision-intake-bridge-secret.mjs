#!/usr/bin/env node
/**
 * Crea/actualiza INTAKE_BRIDGE_SECRET en Firebase App Hosting y otorga acceso a ambos backends.
 *
 * Uso:
 *   node scripts/provision-intake-bridge-secret.mjs --dry-run
 *   node scripts/provision-intake-bridge-secret.mjs --apply
 *
 * Opcional: PROVISION_INTAKE_BRIDGE_SECRET=<valor> para no generar uno nuevo.
 */

import { randomBytes } from 'node:crypto';
import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const PROJECT = process.env.FIREBASE_PROJECT?.trim() || 'planesdeahorro-77c3e';
const BACKENDS = ['planesdeahorro2', 'bengolealamas'];
const apply = process.argv.includes('--apply');
const dryRun = process.argv.includes('--dry-run') || !apply;

function runFirebase(args) {
  const r = spawnSync('firebase', args, { encoding: 'utf8', shell: true });
  if (r.status !== 0) {
    console.error(r.stderr || r.stdout);
    process.exit(r.status ?? 1);
  }
  return r.stdout;
}

async function main() {
  const secret =
    process.env.PROVISION_INTAKE_BRIDGE_SECRET?.trim() ||
    randomBytes(32).toString('base64url');

  console.log(`Proyecto: ${PROJECT}`);
  console.log(`Modo: ${dryRun ? 'dry-run' : 'apply'}`);
  console.log('');
  console.log('Copiá este valor en:');
  console.log('  - .env local app raíz (INTAKE_BRIDGE_SECRET)');
  console.log('  - apps/bengolealamas/.env.local (INTAKE_BRIDGE_SECRET)');
  console.log('');
  console.log(secret);
  console.log('');

  if (dryRun) {
    console.log('Ejecutá con --apply para crear/actualizar el secreto en App Hosting.');
    return;
  }

  const dir = await mkdtemp(join(tmpdir(), 'intake-bridge-'));
  const file = join(dir, 'secret.txt');
  await writeFile(file, secret, 'utf8');

  try {
    runFirebase([
      'apphosting:secrets:set',
      'INTAKE_BRIDGE_SECRET',
      '--data-file',
      file,
      '--force',
      '--project',
      PROJECT,
    ]);

    for (const backend of BACKENDS) {
      console.log(`Grant access → ${backend}`);
      runFirebase([
        'apphosting:secrets:grantaccess',
        'INTAKE_BRIDGE_SECRET',
        '--backend',
        backend,
        '--project',
        PROJECT,
      ]);
    }

    console.log('');
    console.log('Listo. Redeploy de planesdeahorro2 y bengolealamas para tomar el secreto.');
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
