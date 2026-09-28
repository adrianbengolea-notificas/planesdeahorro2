import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@repo/shared/seo';
import { getBlSiteSeoConfig } from '@/config/seo';
import { getBlSitemapPaths } from '@/lib/sitemap-paths';

export default function sitemap(): MetadataRoute.Sitemap {
  const site = getBlSiteSeoConfig();
  const now = new Date();
  return getBlSitemapPaths().map((path) => ({
    url: absoluteUrl(site, path),
    lastModified: now,
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : 0.7,
  }));
}
