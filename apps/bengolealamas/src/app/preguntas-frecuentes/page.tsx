import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@repo/shared/components/json-ld';
import { absoluteUrl } from '@repo/shared/seo';
import { PageShell } from '@/components/page-shell';
import { STUDIO_FAQS } from '@/config/faqs';
import { getBlSiteSeoConfig } from '@/config/seo';
import { blPageMetadata } from '@/lib/page-metadata';
import { faqPageJsonLd } from '@/lib/schema';

export const metadata: Metadata = blPageMetadata({
  title: 'Preguntas frecuentes',
  description:
    'Dónde está el Estudio Bengolea & Lamas, cómo contactarlo y en qué materias trabaja, en San Nicolás de los Arroyos.',
  path: '/preguntas-frecuentes',
  keywords: ['preguntas frecuentes estudio jurídico', 'abogados San Nicolás contacto'],
});

export default function PreguntasFrecuentesPage() {
  const site = getBlSiteSeoConfig();

  return (
    <PageShell
      title="Preguntas frecuentes"
      description="Respuestas institucionales sobre el estudio, el domicilio y las materias de trabajo."
      path="/preguntas-frecuentes"
      breadcrumbs={[{ label: 'Inicio', href: '/' }, { label: 'Preguntas frecuentes' }]}
    >
      <JsonLd data={faqPageJsonLd(STUDIO_FAQS, absoluteUrl(site, '/preguntas-frecuentes'))} />
      <div className="mx-auto max-w-3xl space-y-8">
        {STUDIO_FAQS.map((faq) => (
          <section key={faq.question} className="border-b border-border pb-8 last:border-b-0">
            <h2 className="font-headline text-xl font-normal text-foreground">{faq.question}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">{faq.answer}</p>
          </section>
        ))}
        <p className="text-sm text-muted-foreground">
          ¿Tu consulta no está acá?{' '}
          <Link href="/contacto" className="font-medium text-accent hover:underline">
            Escribinos
          </Link>{' '}
          o{' '}
          <Link href="/contanos-tu-caso" className="font-medium text-accent hover:underline">
            contanos tu caso
          </Link>
          .
        </p>
      </div>
    </PageShell>
  );
}
