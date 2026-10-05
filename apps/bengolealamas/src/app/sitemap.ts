import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@repo/shared/seo';
import { getBlSiteSeoConfig } from '@/config/seo';
import { getBlSitemapEntries } from '@/lib/sitemap-paths';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = getBlSiteSeoConfig();
  const entries = await getBlSitemapEntries();
  return entries.map((entry) => ({
    url: absoluteUrl(site, entry.path),
    lastModified: entry.lastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
