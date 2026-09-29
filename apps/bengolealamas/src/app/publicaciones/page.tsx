import type { Metadata } from 'next';
import { PublicationList } from '@/components/publication-list';
import { PageShell } from '@/components/page-shell';
import { getAllPublicPublications } from '@/lib/bl-cms-publications';
import { blPageMetadata } from '@/lib/page-metadata';

export const revalidate = 60;

export const metadata: Metadata = blPageMetadata({
  title: 'Publicaciones',
  description: 'Artículos jurídicos, análisis y notas del Estudio Bengolea & Lamas.',
  path: '/publicaciones',
});

export default async function PublicacionesPage() {
  const items = await getAllPublicPublications();
  const cmsCount = items.filter((p) => p.source === 'cms').length;

  return (
    <PageShell
      title="Publicaciones"
      description="Doctrina, análisis y novedades del estudio."
      path="/publicaciones"
      breadcrumbs={[{ label: 'Inicio', href: '/' }, { label: 'Publicaciones' }]}
    >
      <p className="mb-8 text-sm text-muted-foreground">
        {items.length} notas del estudio
        {cmsCount ? ` (${cmsCount} desde el panel)` : null}.
      </p>
      <PublicationList items={items} />
    </PageShell>
  );
}
