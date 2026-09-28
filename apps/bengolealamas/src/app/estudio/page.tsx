import type { Metadata } from 'next';
import { PageShell } from '@/components/page-shell';
import { blPageMetadata } from '@/lib/page-metadata';

export const metadata: Metadata = blPageMetadata({
  title: 'El estudio',
  description:
    'Estudio jurídico Bengolea & Lamas en San Nicolás de los Arroyos: trayectoria, enfoque y áreas de trabajo.',
  path: '/estudio',
});

export default function EstudioPage() {
  return (
    <PageShell
      title="El estudio"
      description="Identidad institucional y forma de trabajo del estudio."
      path="/estudio"
      breadcrumbs={[{ label: 'Inicio', href: '/' }, { label: 'El estudio' }]}
    >
      <div className="max-w-3xl space-y-4 text-muted-foreground leading-relaxed">
        <p>
          Bengolea & Lamas es un estudio jurídico con sede en San Nicolás de los Arroyos, dedicado al asesoramiento y
          litigio en materia civil, comercial y de defensa del consumidor.
        </p>
        <p>
          Priorizamos el análisis riguroso del caso, la comunicación clara con el cliente y la estrategia procesal
          adecuada a cada conflicto.
        </p>
        <p className="text-sm">Datos de contacto, domicilio y equipo completo se publicarán en esta sección.</p>
      </div>
    </PageShell>
  );
}
