import { execSync } from 'node:child_process';

const siteId = process.env.NEXT_PUBLIC_SITE_ID?.trim();

if (siteId === 'bl') {
  execSync('npm run start --workspace=bengolealamas', { stdio: 'inherit' });
} else {
  execSync('next start', { stdio: 'inherit' });
}
