import type { MetadataRoute } from 'next';
import { frequentProblems } from '@/lib/data';
import { listPublishedDoctrinaForSeo } from '@/lib/doctrina-list-public-server';
import { listPublishedFallosForSeo } from '@/lib/fallos-public-server';
import { absoluteUrl } from '@/lib/seo';

const STATIC_PATHS: { path: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }[] = [
  { path: '/', changeFrequency: 'weekly', priority: 1 },
  { path: '/evaluar-caso', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/faq', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/sobre-mi', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/fallos', changeFrequency: 'weekly', priority: 0.85 },
  { path: '/doctrina', changeFrequency: 'weekly', priority: 0.85 },
  { path: '/terminos', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/privacidad', changeFrequency: 'yearly', priority: 0.3 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    ...STATIC_PATHS.map(({ path, changeFrequency, priority }) => ({
      url: absoluteUrl(path),
      lastModified: now,
      changeFrequency,
      priority,
    })),
    ...frequentProblems.map((p) => ({
      url: absoluteUrl(`/problemas/${p.slug}`),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
  ];

  const [fallos, doctrina] = await Promise.all([
    listPublishedFallosForSeo(),
    listPublishedDoctrinaForSeo(),
  ]);

  const falloEntries: MetadataRoute.Sitemap = fallos.map((f) => ({
    url: absoluteUrl(`/fallos/${f.slug}`),
    lastModified: f.updatedAt ? new Date(f.updatedAt) : f.date ? new Date(f.date) : now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const doctrinaEntries: MetadataRoute.Sitemap = doctrina.map((a) => ({
    url: absoluteUrl(`/doctrina/${a.slug}`),
    lastModified: a.updatedAt
      ? new Date(a.updatedAt)
      : a.publishDate
        ? new Date(a.publishDate)
        : now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticEntries, ...falloEntries, ...doctrinaEntries];
}
