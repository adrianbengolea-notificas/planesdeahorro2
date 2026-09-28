import type { PracticeAreaEntry } from '@/config/practice-areas';
import { PageShell } from '@/components/page-shell';

/**
 * Plantilla para futuras páginas de área (`published: true` en el registro).
 * Usar desde rutas explícitas o generateStaticParams en una fase posterior.
 */
export function PracticeAreaTemplate({ area }: { area: PracticeAreaEntry }) {
  return (
    <PageShell
      title={area.title}
      description={area.description}
      breadcrumbs={[
        { label: 'Inicio', href: '/' },
        { label: 'Áreas de práctica', href: '/areas-de-practica' },
        { label: area.title },
      ]}
    >
      <div className="prose prose-neutral max-w-3xl">
        <p>Contenido en preparación. Esta URL ya forma parte del mapa de áreas del estudio.</p>
      </div>
    </PageShell>
  );
}
