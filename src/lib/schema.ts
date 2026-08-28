import { frequentProblems, problemasIndexFaqs } from '@/lib/data';
import type { FAQ, FrequentProblem } from '@/lib/types';
import {
  absoluteUrl,
  DEFAULT_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_TITLE,
} from '@/lib/seo';

function plainFaqAnswer(text: string): string {
  return text.replace(/\n+/g, ' ').trim();
}

export function faqEntityJsonLd(faqs: FAQ[]) {
  return faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: plainFaqAnswer(faq.answer),
    },
  }));
}

export function faqPageJsonLd(faqs: FAQ[], url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqEntityJsonLd(faqs),
    url,
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function problemWebPageJsonLd(problem: FrequentProblem) {
  const url = absoluteUrl(`/problemas/${problem.slug}`);
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: problem.seoTitle,
    headline: problem.title,
    description: problem.seoDescription,
    url,
    inLanguage: 'es-AR',
    isPartOf: { '@id': `${absoluteUrl('/')}#website` },
    about: {
      '@type': 'Thing',
      name: `Problemas de planes de ahorro: ${problem.title}`,
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'article p'],
    },
    mainEntity: {
      '@type': 'LegalService',
      '@id': `${absoluteUrl('/')}#legalservice`,
    },
  };
}

/** Grafo de identidad del sitio para crawlers y buscadores de IA. */
export function siteIdentityJsonLd() {
  const origin = absoluteUrl('/');
  const personId = `${origin}#person`;
  const orgId = `${origin}#legalservice`;
  const websiteId = `${origin}#website`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': websiteId,
        name: SITE_TITLE,
        alternateName: [
          SITE_NAME,
          'Problemas de planes de ahorro',
          'Reclamos por planes de ahorro',
        ],
        url: origin,
        description: DEFAULT_DESCRIPTION,
        inLanguage: 'es-AR',
        publisher: { '@id': orgId },
      },
      {
        '@type': 'LegalService',
        '@id': orgId,
        name: SITE_TITLE,
        alternateName: SITE_NAME,
        description: DEFAULT_DESCRIPTION,
        url: origin,
        image: absoluteUrl('/opengraph-image'),
        areaServed: {
          '@type': 'AdministrativeArea',
          name: 'Provincia de Buenos Aires, Argentina',
        },
        address: {
          '@type': 'PostalAddress',
          addressRegion: 'Buenos Aires',
          addressCountry: 'AR',
        },
        founder: { '@id': personId },
        employee: { '@id': personId },
        availableLanguage: ['es'],
        knowsAbout: [
          'Problemas de planes de ahorro',
          'Planes de ahorro automotriz',
          'Derecho del consumidor',
          'Ley 24.240',
          'Liquidación de planes de ahorro',
          'Rescisión de plan de ahorro',
          'Haberes netos',
          'Ejecución prendaria',
          'Secuestro prendario',
          'Cláusulas abusivas',
          SITE_TAGLINE,
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Problemas frecuentes de planes de ahorro',
          itemListElement: frequentProblems.map((problem) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: problem.title,
              description: problem.directAnswer,
              url: absoluteUrl(`/problemas/${problem.slug}`),
            },
          })),
        },
      },
      {
        '@type': 'Person',
        '@id': personId,
        name: SITE_NAME,
        jobTitle: 'Abogado',
        description:
          'Abogado matriculado en la Provincia de Buenos Aires, con dedicación exclusiva a reclamos por problemas de planes de ahorro automotriz.',
        url: absoluteUrl('/sobre-mi'),
        worksFor: { '@id': orgId },
        knowsAbout: [
          'Planes de ahorro',
          'Defensa del consumidor',
          'Liquidación de haberes',
          'Ejecución prendaria',
        ],
      },
    ],
  };
}

export function problemasIndexJsonLd() {
  const url = absoluteUrl('/problemas');
  return [
    breadcrumbJsonLd([
      { name: 'Inicio', path: '/' },
      { name: 'Problemas de planes de ahorro', path: '/problemas' },
    ]),
    faqPageJsonLd(problemasIndexFaqs, url),
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Problemas frecuentes de planes de ahorro',
      description: DEFAULT_DESCRIPTION,
      url,
      inLanguage: 'es-AR',
      isPartOf: { '@id': `${absoluteUrl('/')}#website` },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: frequentProblems.map((problem, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: problem.title,
          url: absoluteUrl(`/problemas/${problem.slug}`),
          description: problem.directAnswer,
        })),
      },
    },
  ];
}
