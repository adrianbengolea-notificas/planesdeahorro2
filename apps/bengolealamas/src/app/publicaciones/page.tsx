import type { Metadata } from 'next';
import { ContentEmptyState } from '@/components/content-empty-state';
import { PageShell } from '@/components/page-shell';
import { blPageMetadata } from '@/lib/page-metadata';

export const metadata: Metadata = blPageMetadata({
  title: 'Publicaciones',
  description: 'Artículos jurídicos, análisis y doctrina del estudio.',
  path: '/publicaciones',
});

export default function PublicacionesPage() {
  return (
    <PageShell
      title="Publicaciones"
      description="Doctrina y artículos del estudio."
      path="/publicaciones"
      breadcrumbs={[{ label: 'Inicio', href: '/' }, { label: 'Publicaciones' }]}
    >
      <ContentEmptyState
        title="Sin publicaciones indexadas aún"
        description="El listado se alimentará desde Firestore con siteId bl. Mientras tanto, esta sección confirma routing y SEO."
      />
    </PageShell>
  );
}
