import type { Metadata } from 'next';
import { ContentEmptyState } from '@/components/content-empty-state';
import { PageShell } from '@/components/page-shell';
import { blPageMetadata } from '@/lib/page-metadata';

export const metadata: Metadata = blPageMetadata({
  title: 'Preguntas frecuentes',
  description: 'Respuestas a consultas habituales sobre el estudio y materias de práctica.',
  path: '/preguntas-frecuentes',
});

export default function PreguntasFrecuentesPage() {
  return (
    <PageShell
      title="Preguntas frecuentes"
      description="FAQ del estudio."
      path="/preguntas-frecuentes"
      breadcrumbs={[{ label: 'Inicio', href: '/' }, { label: 'Preguntas frecuentes' }]}
    >
      <ContentEmptyState
        title="FAQ próximamente"
        description="Las preguntas frecuentes se cargarán desde el CMS con schema FAQPage cuando el contenido esté validado."
      />
    </PageShell>
  );
}
