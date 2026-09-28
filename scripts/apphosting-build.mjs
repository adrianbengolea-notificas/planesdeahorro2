import { execSync } from 'node:child_process';

/**
 * App Hosting (monorepo): el backend bengolealamas define NEXT_PUBLIC_SITE_ID=bl en build.
 * Adrian (planesdeahorro2) no define esa variable → build clásico en la raíz.
 */
const siteId = process.env.NEXT_PUBLIC_SITE_ID?.trim();

if (siteId === 'bl') {
  execSync('npm run build --workspace=bengolealamas', { stdio: 'inherit' });
} else {
  execSync('next build', { stdio: 'inherit' });
}
