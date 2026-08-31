import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/json-ld';
import { loadDoctrinaPublicBySlug } from '@/lib/doctrina-public-server';
import { absoluteUrl, buildPageMetadata, SITE_NAME } from '@/lib/seo';
import { ArticleDetailClient } from './article-detail-client';

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = await loadDoctrinaPublicBySlug(slug);

  if (result.mode === 'doc') {
    const { article } = result;
    return buildPageMetadata({
      title: article.title,
      description: article.summary?.slice(0, 160) || article.title,
      path: `/doctrina/${slug}`,
      ogType: 'article',
      publishedTime: article.publishDate,
      authors: article.authorName ? [article.authorName] : [SITE_NAME],
      keywords: ['doctrina', 'planes de ahorro', ...(article.tags ?? [])],
    });
  }

  return buildPageMetadata({
    title: 'Artículo de doctrina',
    description: 'Análisis jurídico sobre planes de ahorro en Argentina.',
    path: `/doctrina/${slug}`,
    noIndex: result.mode === 'none',
  });
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const result = await loadDoctrinaPublicBySlug(slug);
  if (result.mode === 'doc') {
    const { article } = result;
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.summary,
      datePublished: article.publishDate,
      author: {
        '@type': 'Person',
        name: article.authorName || SITE_NAME,
      },
      publisher: { '@type': 'Organization', name: SITE_NAME },
      mainEntityOfPage: absoluteUrl(`/doctrina/${slug}`),
      keywords: (article.tags ?? []).join(', '),
    };

    return (
      <>
        <JsonLd data={jsonLd} />
        <ArticleDetailClient initialFromFirestore={article} />
      </>
    );
  }

  if (result.mode === 'client_fallback') {
    return <ArticleDetailClient />;
  }

  notFound();
}
