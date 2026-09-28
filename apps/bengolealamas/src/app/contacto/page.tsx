import type { Metadata } from 'next';
import { PageShell } from '@/components/page-shell';
import { blPageMetadata } from '@/lib/page-metadata';

export const metadata: Metadata = blPageMetadata({
  title: 'Contacto',
  description: 'Coordiná una consulta con el Estudio Jurídico Bengolea & Lamas.',
  path: '/contacto',
});

export default function ContactoPage() {
  return (
    <PageShell
      title="Contacto"
      description="Medios de contacto oficiales del estudio."
      path="/contacto"
      breadcrumbs={[{ label: 'Inicio', href: '/' }, { label: 'Contacto' }]}
    >
      <div className="max-w-xl space-y-6 text-muted-foreground">
        <p>Publicaremos teléfono, correo electrónico y horarios de atención cuando estén confirmados.</p>
        <p className="text-sm">
          Por favor, no envíe documentación confidencial hasta coordinar un canal seguro con el estudio.
        </p>
      </div>
    </PageShell>
  );
}
