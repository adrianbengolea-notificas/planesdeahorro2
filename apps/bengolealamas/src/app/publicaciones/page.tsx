import type { Metadata } from 'next';
import Link from 'next/link';
import { CaseIntakePromo } from '@/components/case-intake/case-intake-promo';
import { PublicationList } from '@/components/publication-list';
import { PublicationTags } from '@/components/publication-tags';
import { PageShell } from '@/components/page-shell';
import { getAllPublicPublications } from '@/lib/bl-cms-publications';
import { blPageMetadata } from '@/lib/page-metadata';
import { collectPublicationTags, publicationHasTag } from '@/lib/publication-tags';

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
      <p className="mb-6 text-sm text-muted-foreground">
        {visible.length} {visible.length === 1 ? 'nota' : 'notas'} del estudio
        {cmsCount ? ` (${cmsCount} desde el panel)` : null}
        {activeTag ? ` con la etiqueta “${activeTag}”` : null}.
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
