import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@repo/shared/components/json-ld';
import { CaseIntakePromo } from '@/components/case-intake/case-intake-promo';
import { PublicationList } from '@/components/publication-list';
import { PublicationTags } from '@/components/publication-tags';
import { PageShell } from '@/components/page-shell';
import { getAllPublicPublications } from '@/lib/bl-cms-publications';
import { publicationPath } from '@/lib/bl-publications';
import { blPageMetadata } from '@/lib/page-metadata';
import { collectPublicationTags, publicationHasTag } from '@/lib/publication-tags';
import { collectionPageJsonLd } from '@/lib/schema';

export const revalidate = 60;

export const metadata: Metadata = blPageMetadata({
  title: 'Publicaciones',
  description: 'Artículos jurídicos, análisis y notas del Estudio Bengolea & Lamas.',
  path: '/publicaciones',
});

export default async function PublicacionesPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag } = await searchParams;
  const items = await getAllPublicPublications();
  const visible = tag ? items.filter((item) => publicationHasTag(item.tags, tag)) : items;
  const allTags = collectPublicationTags(items);
  const cmsCount = visible.filter((p) => p.source === 'cms').length;
  const activeTag = allTags.find((item) => publicationHasTag([item], tag ?? '')) ?? tag;

  return (
    <PageShell
      title="Publicaciones"
      description="Doctrina, análisis y novedades del estudio."
      path="/publicaciones"
      breadcrumbs={[{ label: 'Inicio', href: '/' }, { label: 'Publicaciones' }]}
    >
      <JsonLd
        data={collectionPageJsonLd({
          path: '/publicaciones',
          name: 'Publicaciones',
          description: 'Artículos jurídicos, análisis y notas del Estudio Bengolea & Lamas.',
          items: visible.slice(0, 20).map((pub) => ({
            name: pub.title,
            path: publicationPath(pub.slug),
            description: (pub.excerpt || pub.title).slice(0, 180),
          })),
        })}
      />
      <p className="mb-6 text-sm text-muted-foreground">
        {visible.length} {visible.length === 1 ? 'nota' : 'notas'} del estudio
        {cmsCount ? ` (${cmsCount} desde el panel)` : null}
        {activeTag ? ` con la etiqueta “${activeTag}”` : null}. Las notas de fallos también se agrupan en{' '}
        <Link href="/jurisprudencia" className="text-accent hover:underline">
          Jurisprudencia
        </Link>
        . El recorte temático está en{' '}
        <Link href="/areas-de-practica" className="text-accent hover:underline">
          Áreas de práctica
        </Link>
        .
        {tag ? (
          <>
            {' '}
            <Link href="/publicaciones" className="text-accent hover:underline">
              Ver todas
            </Link>
          </>
        ) : null}
      </p>
      {allTags.length ? <PublicationTags tags={allTags} className="mb-8" linkToFilter /> : null}
      <CaseIntakePromo className="mb-10" />
      {visible.length ? (
        <PublicationList items={visible} />
      ) : (
        <p className="text-sm text-muted-foreground">No hay notas con esa etiqueta.</p>
      )}
    </PageShell>
  );
}
