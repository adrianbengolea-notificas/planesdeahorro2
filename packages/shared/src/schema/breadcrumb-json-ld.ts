import { absoluteUrl } from '../seo/absolute-url';
import type { SiteSeoConfig } from '../seo/site-seo-config';

export type BreadcrumbItem = { name: string; path: string };

export function breadcrumbJsonLd(site: SiteSeoConfig, items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(site, item.path),
    })),
  };
}
