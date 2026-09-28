import type { SiteSeoConfig } from './site-seo-config';

export function absoluteUrl(site: Pick<SiteSeoConfig, 'siteUrl'>, path = '/'): string {
  const base = site.siteUrl.replace(/\/$/, '');
  if (!path || path === '/') return base;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
