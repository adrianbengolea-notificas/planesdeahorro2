import { execSync } from 'node:child_process';

/** Backend bengolealamas: APP_SITE_ID=bl (BUILD+RUNTIME en consola). Adrian: no definir. */
function resolveSiteId() {
  return (
    process.env.APP_SITE_ID?.trim() ||
    process.env.NEXT_PUBLIC_SITE_ID?.trim() ||
    ''
  );
}

const siteId = resolveSiteId();
console.log('[apphosting-build] siteId=', siteId || '(adrian default)');

if (siteId === 'bl') {
  execSync('npm run build --workspace=bengolealamas', { stdio: 'inherit' });
} else {
  execSync('npm run build:adrian', { stdio: 'inherit' });
}
