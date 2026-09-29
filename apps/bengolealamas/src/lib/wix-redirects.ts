/**
 * Redirects legacy Wix (Edge middleware — sin @repo/shared).
 * Reglas canónicas en repo: data/migration/wix-redirects.json (copiar acá al migrar).
 */
import redirectsFile from '@/data/wix-redirects.json';

type WixRedirectRule = {
  from: string;
  to: string;
  status: 301 | 302 | 308;
};

type WixRedirectsFile = {
  version: number;
  rules: WixRedirectRule[];
};

const file = redirectsFile as WixRedirectsFile;

function normalizeRedirectPath(path: string): string {
  const trimmed = path.trim();
  if (!trimmed || trimmed === '/') return '/';
  const withSlash = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  return withSlash.replace(/\/+$/, '') || '/';
}

function findWixRedirect(pathname: string): WixRedirectRule | undefined {
  const normalized = normalizeRedirectPath(pathname);
  return file.rules.find((r) => normalizeRedirectPath(r.from) === normalized);
}

export function resolveLegacyRedirect(pathname: string) {
  return findWixRedirect(pathname);
}
