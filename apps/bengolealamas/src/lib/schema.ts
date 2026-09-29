import { absoluteUrl } from '@repo/shared/seo';
import { getBlSiteSeoConfig } from '@/config/seo';
import { STUDIO_ADDRESS, STUDIO_EMAIL, STUDIO_PHONES } from '@/config/wix-brand';
import { DEFAULT_DESCRIPTION, SITE_NAME, SITE_SAME_AS, SITE_TITLE } from '@/config/site';

/** Grafo de identidad institucional B&L (WebSite + LegalService). */
export function siteIdentityJsonLd() {
  const site = getBlSiteSeoConfig();
  const origin = absoluteUrl(site, '/');
  const orgId = `${origin}#legalservice`;
  const websiteId = `${origin}#website`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': websiteId,
        name: SITE_TITLE,
        alternateName: [SITE_NAME, 'Bengolea & Lamas'],
        url: origin,
        description: DEFAULT_DESCRIPTION,
        inLanguage: 'es-AR',
        publisher: { '@id': orgId },
      },
      {
        '@type': 'LegalService',
        '@id': orgId,
        name: SITE_NAME,
        description: DEFAULT_DESCRIPTION,
        url: origin,
        sameAs: [...SITE_SAME_AS],
        areaServed: {
          '@type': 'AdministrativeArea',
          name: 'San Nicolás de los Arroyos y región, Argentina',
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: STUDIO_ADDRESS.street,
          addressLocality: STUDIO_ADDRESS.city,
          addressRegion: STUDIO_ADDRESS.province,
          addressCountry: 'AR',
        },
        email: STUDIO_EMAIL,
        telephone: STUDIO_PHONES.map((p) => p.replace(/-/g, '')).join(', '),
        availableLanguage: ['es'],
        knowsAbout: [
          'Defensa del consumidor',
          'Derecho civil',
          'Derecho comercial',
          'Daños y perjuicios',
          'Seguros',
          'Acciones colectivas',
        ],
      },
    ],
  };
}

/** Person mínimo — sin datos sensibles inventados. */
export function personJsonLd(options: {
  name: string;
  path: string;
  jobTitle?: string;
  description?: string;
  image?: string;
  sameAs?: string[];
  knowsAbout?: string[];
}) {
  const site = getBlSiteSeoConfig();
  const origin = absoluteUrl(site, '/');
  const personUrl = absoluteUrl(site, options.path);

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: options.name,
    jobTitle: options.jobTitle ?? 'Abogado',
    ...(options.description ? { description: options.description } : {}),
    ...(options.image ? { image: options.image } : {}),
    ...(options.sameAs?.length ? { sameAs: options.sameAs } : {}),
    ...(options.knowsAbout?.length ? { knowsAbout: options.knowsAbout } : {}),
    url: personUrl,
    worksFor: {
      '@type': 'LegalService',
      '@id': `${origin}#legalservice`,
      name: SITE_NAME,
    },
  };
}
