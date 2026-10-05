import { absoluteUrl } from '@repo/shared/seo';
import { PRACTICE_AREAS } from '@/config/practice-areas';
import { TEAM } from '@/config/professionals';
import { getBlSiteSeoConfig } from '@/config/seo';
import { STUDIO_GEO, studioHoursJsonLd } from '@/config/gbp';
import {
  STUDIO_ADDRESS,
  STUDIO_EMAIL,
  STUDIO_PHONES,
  studioMapsSearchUrl,
  studioPhoneE164,
} from '@/config/wix-brand';
import type { BlPublication } from '@/lib/bl-publications';
import { publicationPath } from '@/lib/bl-publications';
import { DEFAULT_DESCRIPTION, SITE_NAME, SITE_SAME_AS, SITE_TITLE } from '@/config/site';

export function legalServiceId(origin: string): string {
  return `${origin}#legalservice`;
}

function phonesE164(): string[] {
  return STUDIO_PHONES.map(studioPhoneE164);
}

function postalAddress() {
  return {
    '@type': 'PostalAddress',
    streetAddress: STUDIO_ADDRESS.street,
    addressLocality: STUDIO_ADDRESS.city,
    addressRegion: STUDIO_ADDRESS.province,
    postalCode: STUDIO_ADDRESS.postalCode,
    addressCountry: STUDIO_ADDRESS.country,
  };
}

/** Grafo de identidad institucional B&L (WebSite + LegalService). */
export function siteIdentityJsonLd() {
  const site = getBlSiteSeoConfig();
  const origin = absoluteUrl(site, '/');
  const orgId = legalServiceId(origin);
  const websiteId = `${origin}#website`;
  const tels = phonesE164();

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': websiteId,
        name: SITE_TITLE,
        alternateName: [SITE_NAME, 'Bengolea & Lamas', 'Estudio Bengolea Lamas'],
        url: origin,
        description: DEFAULT_DESCRIPTION,
        inLanguage: 'es-AR',
        publisher: { '@id': orgId },
      },
      {
        '@type': 'LegalService',
        '@id': orgId,
        name: SITE_NAME,
        alternateName: ['Bengolea & Lamas', 'Estudio Bengolea Lamas'],
        description: DEFAULT_DESCRIPTION,
        url: origin,
        image: absoluteUrl(site, '/opengraph-image'),
        logo: absoluteUrl(site, '/opengraph-image'),
        sameAs: [...SITE_SAME_AS],
        areaServed: [
          {
            '@type': 'City',
            name: STUDIO_ADDRESS.city,
          },
          {
            '@type': 'AdministrativeArea',
            name: 'San Nicolás de los Arroyos y región, Argentina',
          },
        ],
        address: postalAddress(),
        geo: {
          '@type': 'GeoCoordinates',
          latitude: STUDIO_GEO.latitude,
          longitude: STUDIO_GEO.longitude,
        },
        hasMap: studioMapsSearchUrl(),
        openingHoursSpecification: studioHoursJsonLd(),
        email: STUDIO_EMAIL,
        telephone: tels[0],
        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType: 'customer service',
            telephone: tels[0],
            email: STUDIO_EMAIL,
            areaServed: 'AR',
            availableLanguage: ['Spanish'],
          },
        ],
        availableLanguage: ['es'],
        knowsAbout: PRACTICE_AREAS.map((a) => a.title),
        founder: TEAM.filter((p) => p.slug === 'carlos-alberto-bengolea' || p.slug === 'carlos-alberto-lamas').map(
          (p) => ({
            '@type': 'Person',
            name: p.name,
            url: absoluteUrl(site, `/profesionales/${p.slug}`),
          }),
        ),
        employee: TEAM.map((p) => ({
          '@type': 'Person',
          '@id': `${absoluteUrl(site, `/profesionales/${p.slug}`)}#person`,
          name: p.name,
          jobTitle: p.jobTitle,
          url: absoluteUrl(site, `/profesionales/${p.slug}`),
        })),
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Áreas de práctica',
          itemListElement: PRACTICE_AREAS.filter((a) => a.published).map((area) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: area.title,
              description: area.description,
              url: absoluteUrl(site, area.path),
              provider: { '@id': orgId },
            },
          })),
        },
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
    '@id': `${personUrl}#person`,
    name: options.name,
    jobTitle: options.jobTitle ?? 'Abogado',
    ...(options.description ? { description: options.description } : {}),
    ...(options.image ? { image: options.image } : {}),
    ...(options.sameAs?.length ? { sameAs: options.sameAs } : {}),
    ...(options.knowsAbout?.length ? { knowsAbout: options.knowsAbout } : {}),
    url: personUrl,
    worksFor: {
      '@type': 'LegalService',
      '@id': legalServiceId(origin),
      name: SITE_NAME,
    },
    workLocation: {
      '@type': 'Place',
      name: SITE_NAME,
      address: postalAddress(),
    },
  };
}

export function faqPageJsonLd(faqs: { question: string; answer: string }[], url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    url,
    inLanguage: 'es-AR',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer.replace(/\n+/g, ' ').trim(),
      },
    })),
  };
}

export function contactPageJsonLd(path: string) {
  const site = getBlSiteSeoConfig();
  const url = absoluteUrl(site, path);
  const origin = absoluteUrl(site, '/');
  const tels = phonesE164();

  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contacto',
    url,
    inLanguage: 'es-AR',
    isPartOf: { '@id': `${origin}#website` },
    about: { '@id': legalServiceId(origin) },
    mainEntity: {
      '@type': 'LegalService',
      '@id': legalServiceId(origin),
      name: SITE_NAME,
      email: STUDIO_EMAIL,
      telephone: tels,
      address: postalAddress(),
      geo: {
        '@type': 'GeoCoordinates',
        latitude: STUDIO_GEO.latitude,
        longitude: STUDIO_GEO.longitude,
      },
      hasMap: studioMapsSearchUrl(),
      openingHoursSpecification: studioHoursJsonLd(),
    },
  };
}

export function articleJsonLd(pub: BlPublication) {
  const site = getBlSiteSeoConfig();
  const origin = absoluteUrl(site, '/');
  const url = absoluteUrl(site, publicationPath(pub.slug));
  const description = (pub.seoDescription || pub.excerpt || pub.title).slice(0, 300);

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: pub.title,
    description,
    url,
    inLanguage: 'es-AR',
    datePublished: pub.publishDate || undefined,
    dateModified: pub.updatedAt || pub.publishDate || undefined,
    author: {
      '@type': 'Person',
      name: pub.author || SITE_NAME,
    },
    publisher: {
      '@type': 'LegalService',
      '@id': legalServiceId(origin),
      name: SITE_NAME,
    },
    mainEntityOfPage: url,
    ...(pub.heroImage
      ? { image: pub.heroImage.startsWith('http') ? pub.heroImage : absoluteUrl(site, pub.heroImage) }
      : {}),
  };
}

export function professionalsItemListJsonLd() {
  const site = getBlSiteSeoConfig();
  const url = absoluteUrl(site, '/profesionales');

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Profesionales',
    url,
    inLanguage: 'es-AR',
    isPartOf: { '@id': `${absoluteUrl(site, '/')}#website` },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: TEAM.map((person, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: person.name,
        url: absoluteUrl(site, `/profesionales/${person.slug}`),
        description: person.teaser,
      })),
    },
  };
}

export function webPageJsonLd(options: {
  path: string;
  name: string;
  description: string;
}) {
  const site = getBlSiteSeoConfig();
  const origin = absoluteUrl(site, '/');
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: options.name,
    description: options.description,
    url: absoluteUrl(site, options.path),
    inLanguage: 'es-AR',
    isPartOf: { '@id': `${origin}#website` },
    about: { '@id': legalServiceId(origin) },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'article p', 'header p'],
    },
  };
}

export function practiceAreaServiceJsonLd(
  area: { title: string; path: string; description: string },
  page: { directAnswer: string; seoDescription: string },
) {
  const site = getBlSiteSeoConfig();
  const origin = absoluteUrl(site, '/');
  const url = absoluteUrl(site, area.path);

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: area.title,
    description: page.directAnswer || page.seoDescription || area.description,
    url,
    inLanguage: 'es-AR',
    serviceType: area.title,
    areaServed: {
      '@type': 'City',
      name: STUDIO_ADDRESS.city,
    },
    provider: {
      '@type': 'LegalService',
      '@id': legalServiceId(origin),
      name: SITE_NAME,
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'article p'],
    },
  };
}
