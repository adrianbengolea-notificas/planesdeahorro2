import { execSync } from 'node:child_process';

const siteId =
  process.env.APP_SITE_ID?.trim() ||
  process.env.NEXT_PUBLIC_SITE_ID?.trim() ||
  '';

console.log('[apphosting-start] siteId=', siteId || '(adrian default)');

if (siteId === 'bl') {
  execSync('npm run start --prefix apps/bengolealamas', { stdio: 'inherit' });
} else {
  execSync('npm run start:adrian', { stdio: 'inherit' });
}
