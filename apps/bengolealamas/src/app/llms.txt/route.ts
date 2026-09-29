import { absoluteUrl } from '@repo/shared/seo';
import { getBlSiteSeoConfig } from '@/config/seo';
import { PRACTICE_AREAS } from '@/config/practice-areas';
import { DEFAULT_DESCRIPTION, SITE_NAME, SITE_TITLE } from '@/config/site';
import { getBlSitemapPaths } from '@/lib/sitemap-paths';

export const dynamic = 'force-static';

export async function GET() {
  const site = getBlSiteSeoConfig();
  const paths = await getBlSitemapPaths();
  const sections = paths
    .filter((p) => p !== '/')
    .map((p) => `- ${absoluteUrl(site, p)}`)
    .join('\n');

  const areas = PRACTICE_AREAS.map(
    (a) => `- ${a.title}: ${a.published ? absoluteUrl(site, a.path) : `(próximamente) ${a.path}`}`,
  ).join('\n');

  const body = `# ${SITE_TITLE}

> ${DEFAULT_DESCRIPTION}

${SITE_NAME} es un estudio jurídico con base en San Nicolás de los Arroyos (Argentina). Este índice describe las secciones públicas de **bengolealamas.com.ar** para crawlers y modelos de lenguaje.

## Secciones principales

${sections}

## Áreas de práctica (mapa)

${areas}

## Nota sobre planes de ahorro

El contenido especializado en planes de ahorro automotriz se publica en un sitio distinto (dominio vertical). Desde este estudio, la página ${absoluteUrl(site, '/planes-de-ahorro')} actúa como hub institucional con enlace al recurso principal.

## Contacto

${absoluteUrl(site, '/contacto')}
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
