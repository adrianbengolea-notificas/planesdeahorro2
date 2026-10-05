import { getPublishedPracticeAreas } from '@/config/practice-areas';
import { getAllPublicPublications } from '@/lib/bl-cms-publications';
import { publicationPath } from '@/lib/bl-publications';

/** Rutas estáticas indexables del sitio B&L (sin dominio Adrian). */
export const BL_STATIC_SITEMAP_PATHS: string[] = [
  '/',
  '/estudio',
  '/areas-de-practica',
  '/servicios',
  '/profesionales',
  '/profesionales/adrian-bengolea',
  '/profesionales/carlos-alberto-bengolea',
  '/profesionales/carlos-alberto-lamas',
  '/profesionales/ignacio-goni',
  '/publicaciones',
  '/jurisprudencia',
  '/preguntas-frecuentes',
  '/contacto',
  '/consultas-online',
  '/privacidad',
  '/planes-de-ahorro',
];

export type BlSitemapEntry = {
  path: string;
  lastModified?: Date;
  changeFrequency: 'weekly' | 'monthly' | 'yearly';
  priority: number;
};

function priorityFor(path: string): number {
  if (path === '/') return 1;
  if (
    path === '/estudio' ||
    path === '/servicios' ||
    path === '/profesionales' ||
    path === '/contacto' ||
    path === '/areas-de-practica' ||
    path === '/preguntas-frecuentes'
  ) {
    return 0.85;
  }
  if (path === '/defensa-del-consumidor' || path === '/bancos' || path === '/derecho-civil' || path === '/danos-y-perjuicios') {
    return 0.8;
  }
  if (path === '/publicaciones') return 0.65;
  if (path.startsWith('/publicaciones/')) return 0.6;
  if (path === '/planes-de-ahorro') return 0.55;
  if (path === '/privacidad' || path === '/jurisprudencia') return 0.2;
  return 0.45;
}

function safeDate(iso?: string | null): Date {
  if (!iso) return new Date();
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? new Date() : d;
}

function changeFrequencyFor(path: string): BlSitemapEntry['changeFrequency'] {
  if (path === '/' || path === '/publicaciones') return 'weekly';
  if (path === '/privacidad') return 'yearly';
  return 'monthly';
}

export async function getBlSitemapPaths(): Promise<string[]> {
  const entries = await getBlSitemapEntries();
  return entries.map((e) => e.path);
}

export async function getBlSitemapEntries(): Promise<BlSitemapEntry[]> {
  const practice = getPublishedPracticeAreas().map((a) => a.path);
  const pubs = await getAllPublicPublications();
  const staticEntries: BlSitemapEntry[] = [...new Set([...BL_STATIC_SITEMAP_PATHS, ...practice])].map((path) => ({
    path,
    lastModified: new Date(),
    changeFrequency: changeFrequencyFor(path),
    priority: priorityFor(path),
  }));

  const pubEntries: BlSitemapEntry[] = pubs.map((p) => ({
    path: publicationPath(p.slug),
    lastModified: safeDate(p.updatedAt || p.publishDate),
    changeFrequency: 'monthly',
    priority: priorityFor(publicationPath(p.slug)),
  }));

  const seen = new Set<string>();
  const merged: BlSitemapEntry[] = [];
  for (const entry of [...staticEntries, ...pubEntries]) {
    if (seen.has(entry.path)) continue;
    seen.add(entry.path);
    merged.push(entry);
  }
  return merged;
}
