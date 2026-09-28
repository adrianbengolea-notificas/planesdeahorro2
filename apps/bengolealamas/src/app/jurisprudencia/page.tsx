import type { Metadata } from 'next';
import { ContentEmptyState } from '@/components/content-empty-state';
import { PageShell } from '@/components/page-shell';
import { blPageMetadata } from '@/lib/page-metadata';

export const metadata: Metadata = blPageMetadata({
  title: 'Jurisprudencia',
  description: 'Fallos comentados y líneas jurisprudenciales relevantes.',
  path: '/jurisprudencia',
});

export default function JurisprudenciaPage() {
  return (
    <PageShell
      title="Jurisprudencia"
      description="Análisis de sentencias."
      path="/jurisprudencia"
      breadcrumbs={[{ label: 'Inicio', href: '/' }, { label: 'Jurisprudencia' }]}
    >
      <ContentEmptyState
        title="Jurisprudencia en preparación"
        description="Los fallos comentados se publicarán con el modelo editorial multisite (kind: ruling_commentary, siteId: bl)."
      />
    </PageShell>
  );
}
