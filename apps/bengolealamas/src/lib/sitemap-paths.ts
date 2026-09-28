import { getPublishedPracticeAreas } from '@/config/practice-areas';

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
  '/privacidad',
  '/planes-de-ahorro',
];

export function getBlSitemapPaths(): string[] {
  const practice = getPublishedPracticeAreas().map((a) => a.path);
  return [...new Set([...BL_STATIC_SITEMAP_PATHS, ...practice])];
}
