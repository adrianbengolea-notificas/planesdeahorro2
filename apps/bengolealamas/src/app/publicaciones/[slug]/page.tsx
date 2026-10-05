import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { JsonLd } from '@repo/shared/components/json-ld';
import { Breadcrumbs } from '@repo/shared/components/breadcrumbs';
import { breadcrumbJsonLd } from '@repo/shared/schema';
import { PublicationBody } from '@/components/publication-body';
import { PublicationTags } from '@/components/publication-tags';
import { resolvePublicPublication } from '@/lib/bl-cms-publications';
import {
  encodeSlug,
  formatPublicationDate,
  getBlPublications,
  publicationPath,
  readPublicationHtml,
} from '@/lib/bl-publications';
import { getBlSiteSeoConfig } from '@/config/seo';
import { blPageMetadata } from '@/lib/page-metadata';
import { articleJsonLd } from '@/lib/schema';

type PageProps = { params: Promise<{ slug: string }> };

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  return getBlPublications().map((p) => ({ slug: encodeSlug(p.slug) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pub = await resolvePublicPublication(slug);
  if (!pub) return { title: 'Publicación' };
  const description = (pub.seoDescription || pub.excerpt || pub.title).slice(0, 160);
  return blPageMetadata({
    title: pub.seoTitle || pub.title,
    description,
    path: publicationPath(pub.slug),
    ogType: 'article',
    publishedTime: pub.publishDate || undefined,
    modifiedTime: pub.updatedAt || pub.publishDate || undefined,
    authors: pub.author ? [pub.author] : ['Estudio Bengolea & Lamas'],
    keywords: pub.tags,
  });
}

export default async function PublicacionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const pub = await resolvePublicPublication(slug);
  if (!pub) notFound();

  const bodyHtml = pub.bodyHtml || (pub.contentFile ? readPublicationHtml(pub.contentFile) : null);
  const siteSeo = getBlSiteSeoConfig();
  const breadcrumbs = breadcrumbJsonLd(siteSeo, [
    { name: 'Inicio', path: '/' },
    { name: 'Publicaciones', path: '/publicaciones' },
    { name: pub.title, path: publicationPath(pub.slug) },
  ]);

  return (
    <>
      <JsonLd data={[breadcrumbs, articleJsonLd(pub)]} />
      <article className="mx-auto max-w-3xl px-4 py-12 md:px-8 md:py-16">
        <Breadcrumbs
          items={[
            { label: 'Inicio', href: '/' },
            { label: 'Publicaciones', href: '/publicaciones' },
            { label: pub.title.length > 48 ? `${pub.title.slice(0, 48)}…` : pub.title },
          ]}
          className="mb-8 text-muted-foreground"
        />
        <header>
          <h1 className="font-headline text-3xl font-normal leading-tight text-foreground md:text-4xl">{pub.title}</h1>
          <p className="mt-4 text-sm text-muted-foreground">
            {pub.author || 'Estudio Bengolea & Lamas'}
            {pub.publishDate ? ` · ${formatPublicationDate(pub.publishDate)}` : null}
          </p>
          <PublicationTags tags={pub.tags} className="mt-4" linkToFilter />
        </header>
        {bodyHtml ? (
          <PublicationBody html={bodyHtml} heroImage={pub.heroImage} title={pub.title} />
        ) : (
          <>
            {pub.excerpt ? (
              <div className="mt-8 space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>{pub.excerpt}</p>
              </div>
            ) : null}
            <div className="mt-10 rounded-lg border border-border bg-muted/30 p-6">
              <p className="text-sm leading-relaxed text-muted-foreground">
                El contenido completo de esta nota aún no fue migrado. Podés consultarla en el sitio anterior del
                estudio.
              </p>
              <a
                href={pub.legacyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex border border-accent px-5 py-2 text-sm font-medium text-accent transition hover:bg-accent hover:text-accent-foreground"
              >
                Ver artículo en bengolealamas.com.ar
              </a>
            </div>
          </>
        )}
        <p className="mt-8 text-sm">
          <Link href="/publicaciones" className="text-accent hover:underline">
            ← Volver a publicaciones
          </Link>
        </p>
      </article>
    </>
  );
}
