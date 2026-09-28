import type { Metadata } from 'next';
import { JsonLd } from '@repo/shared/components/json-ld';
import { PageShell } from '@/components/page-shell';
import { ADRIAN_PLANES_SITE_URL } from '@/config/site';
import { blPageMetadata } from '@/lib/page-metadata';
import { personJsonLd } from '@/lib/schema';

export const metadata: Metadata = blPageMetadata({
  title: 'Adrián Bengolea',
  description: 'Abogado integrante del Estudio Jurídico Bengolea & Lamas.',
  path: '/profesionales/adrian-bengolea',
});

export default function AdrianBengoleaPage() {
  const jsonLd = personJsonLd({
    name: 'Adrián Bengolea',
    path: '/profesionales/adrian-bengolea',
    jobTitle: 'Abogado',
    description: 'Integrante del Estudio Jurídico Bengolea & Lamas.',
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageShell
        title="Adrián Bengolea"
        description="Abogado."
        path="/profesionales/adrian-bengolea"
        breadcrumbs={[
          { label: 'Inicio', href: '/' },
          { label: 'Profesionales', href: '/profesionales' },
          { label: 'Adrián Bengolea' },
        ]}
      >
        <div className="max-w-3xl space-y-4 text-muted-foreground leading-relaxed">
          <p>
            Adrián Bengolea integra el Estudio Jurídico Bengolea & Lamas. Los datos de matrícula, formación y contacto
            directo se publicarán cuando estén validados.
          </p>
          <p>
            Consultas especializadas en{' '}
            <strong className="text-foreground">planes de ahorro automotriz</strong> se canalizan en el sitio dedicado{' '}
            <a
              href={ADRIAN_PLANES_SITE_URL}
              rel="noopener noreferrer"
              className="font-medium text-primary underline-offset-2 hover:underline"
            >
              adrianbengolea.com.ar
            </a>
            .
          </p>
        </div>
      </PageShell>
    </>
  );
}
