export type WixRedirectRule = {
  from: string;
  to: string;
  status: 301 | 302 | 308;
  note?: string;
};

export type WixRedirectsFile = {
  version: number;
  rules: WixRedirectRule[];
};

export function normalizeRedirectPath(path: string): string {
  const trimmed = path.trim();
  if (!trimmed || trimmed === '/') return '/';
  const withSlash = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  return withSlash.replace(/\/+$/, '') || '/';
}

export function findWixRedirect(
  pathname: string,
  file: WixRedirectsFile,
): WixRedirectRule | undefined {
  const normalized = normalizeRedirectPath(pathname);
  return file.rules.find((r) => normalizeRedirectPath(r.from) === normalized);
}
