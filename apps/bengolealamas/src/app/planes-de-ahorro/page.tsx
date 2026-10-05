import type { Metadata } from 'next';
import Link from 'next/link';
import { CaseIntakePromo } from '@/components/case-intake/case-intake-promo';
import { PageShell } from '@/components/page-shell';
import { ADRIAN_PLANES_SITE_URL } from '@/config/site';
import { blPageMetadata } from '@/lib/page-metadata';

export const metadata: Metadata = blPageMetadata({
  title: 'Planes de ahorro',
  description:
    'El Estudio Bengolea & Lamas atiende conflictos de planes de ahorro automotriz. El contenido especializado está en adrianbengolea.com.ar.',
  path: '/planes-de-ahorro',
});

export default function PlanesDeAhorroHubPage() {
  return (
    <PageShell
      title="Planes de ahorro automotriz"
      description="Hub institucional — derivación al sitio especializado."
      path="/planes-de-ahorro"
      breadcrumbs={[
        { label: 'Inicio', href: '/' },
        { label: 'Áreas de práctica', href: '/areas-de-practica' },
        { label: 'Planes de ahorro' },
      ]}
    >
      <CaseIntakePromo
        className="mb-8"
        title="¿Conflicto con tu plan de ahorro?"
        description="Contanos tu situación con el asistente: administradora, cuotas, liquidación o entrega del vehículo. El estudio recibe un resumen para revisar tu caso."
      />
      <div className="max-w-3xl space-y-4 text-muted-foreground leading-relaxed">
        <p>
          Los conflictos con administradoras de planes de ahorro automotriz (liquidación, rescisión, haberes netos,
          ejecución prendaria y cláusulas abusivas) tienen un tratamiento editorial y consultas dedicadas en un sitio
          especializado.
        </p>
        <p>
          <a
            href={ADRIAN_PLANES_SITE_URL}
            rel="noopener noreferrer"
            className="font-medium text-primary underline-offset-2 hover:underline"
          >
            Visitar adrianbengolea.com.ar — planes de ahorro
          </a>
        </p>
        <p className="text-sm">
          Profesional relacionado:{' '}
          <Link href="/profesionales/adrian-bengolea" className="font-medium text-accent hover:underline">
            Dr. Adrián Bengolea
          </Link>
          .
        </p>
        <p className="text-sm">
          Esta página no duplica el contenido del sitio vertical para evitar competir en SEO; resume el enfoque del
          estudio y deriva al recurso principal.
        </p>
      </div>
    </PageShell>
  );
}
