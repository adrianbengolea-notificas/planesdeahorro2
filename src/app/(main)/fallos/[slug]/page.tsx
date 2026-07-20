import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/json-ld';
import { loadFalloPublicBySlug } from '@/lib/fallos-public-server';
import { absoluteUrl, buildPageMetadata, SITE_NAME } from '@/lib/seo';
import { FalloDetailClient } from './fallo-detail-client';

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = await loadFalloPublicBySlug(slug);

  if (result.mode === 'doc') {
    const { fallo } = result;
    return buildPageMetadata({
      title: fallo.title,
      description: fallo.summary?.slice(0, 160) || `Fallo judicial: ${fallo.title}`,
      path: `/fallos/${slug}`,
      ogType: 'article',
      publishedTime: fallo.date,
      keywords: ['fallo', 'jurisprudencia', 'planes de ahorro', ...(fallo.tags ?? [])],
    });
  }

  return buildPageMetadata({
    title: 'Fallo judicial',
    description: 'Detalle de jurisprudencia sobre planes de ahorro automotriz.',
    path: `/fallos/${slug}`,
  });
}

export default async function RulingDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const result = await loadFalloPublicBySlug(slug);

  if (result.mode === 'doc') {
    const { fallo } = result;
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: fallo.title,
      description: fallo.summary,
      datePublished: fallo.date,
      author: { '@type': 'Person', name: SITE_NAME },
      publisher: { '@type': 'Organization', name: SITE_NAME },
      mainEntityOfPage: absoluteUrl(`/fallos/${slug}`),
      about: {
        '@type': 'Thing',
        name: fallo.tribunal,
      },
      keywords: (fallo.tags ?? []).join(', '),
    };

    return (
      <>
        <JsonLd data={jsonLd} />
        <FalloDetailClient initialFromFirestore={fallo} />
      </>
    );
  }

  if (result.mode === 'client_fallback') {
    return <FalloDetailClient />;
  }

  notFound();
}
