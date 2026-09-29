import { getPublishedPracticeAreas } from '@/config/practice-areas';
import { getAllPublicPublications } from '@/lib/bl-cms-publications';
import { publicationPath } from '@/lib/bl-publications';

/** Rutas estáticas indexables del sitio B&L (sin dominio Adrian). */
export const BL_STATIC_SITEMAP_PATHS: string[] = [
  '/',
  '/estudio',
  '/areas-de-practica',
  '/profesionales',
  '/profesionales/adrian-bengolea',
  '/publicaciones',
  '/jurisprudencia',
  '/preguntas-frecuentes',
  '/contacto',
  '/informacion',
  '/consultas-online',
  '/privacidad',
  '/planes-de-ahorro',
];

export async function getBlSitemapPaths(): Promise<string[]> {
  const practice = getPublishedPracticeAreas().map((a) => a.path);
  const pubs = (await getAllPublicPublications()).map((p) => publicationPath(p.slug));
  return [...new Set([...BL_STATIC_SITEMAP_PATHS, ...practice, ...pubs])];
}
