import type { Metadata } from 'next';
import { PageShell } from '@/components/page-shell';
import { blPageMetadata } from '@/lib/page-metadata';

export const metadata: Metadata = blPageMetadata({
  title: 'Política de privacidad',
  description: 'Información sobre el tratamiento de datos personales en el sitio del estudio.',
  path: '/privacidad',
});

export default function PrivacidadPage() {
  return (
    <PageShell
      title="Política de privacidad"
      path="/privacidad"
      breadcrumbs={[{ label: 'Inicio', href: '/' }, { label: 'Privacidad' }]}
    >
      <p className="max-w-3xl text-muted-foreground leading-relaxed">
        Texto legal definitivo pendiente de revisión. Esta página reserva la URL para cumplimiento normativo al conectar
        el dominio en producción.
      </p>
    </PageShell>
  );
}
