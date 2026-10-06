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

function decodePathSegment(segment: string): string {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}

function findWixRedirect(pathname: string): WixRedirectRule | undefined {
  const normalized = normalizeRedirectPath(pathname);
  const exact = file.rules.find((r) => normalizeRedirectPath(r.from) === normalized);
  if (exact) return exact;

  // Wix blog: /single-post/{slug} o /single-post/YYYY/MM/DD/{slug}
  if (normalized === '/single-post' || normalized.startsWith('/single-post/')) {
    const rest = normalized.slice('/single-post/'.length);
    if (!rest) {
      return { from: normalized, to: '/publicaciones', status: 301 };
    }
    const slug = decodePathSegment(rest.split('/').filter(Boolean).pop() || '');
    if (!slug) {
      return { from: normalized, to: '/publicaciones', status: 301 };
    }
    const mapped = file.rules.find((r) => {
      const toSlug = normalizeRedirectPath(r.to).split('/').pop();
      return toSlug === slug;
    });
    return mapped ?? { from: normalized, to: `/publicaciones/${slug}`, status: 301 };
  }

  return undefined;
}

export function resolveLegacyRedirect(pathname: string) {
  return findWixRedirect(pathname);
}
