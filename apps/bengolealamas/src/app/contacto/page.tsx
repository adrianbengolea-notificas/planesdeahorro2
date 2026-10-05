import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@repo/shared/components/json-ld';
import { Breadcrumbs } from '@repo/shared/components/breadcrumbs';
import { breadcrumbJsonLd } from '@repo/shared/schema';
import { blPageMetadata } from '@/lib/page-metadata';
import { ContactForm } from '@/components/contact-form';
import { getBlSiteSeoConfig } from '@/config/seo';
import { STUDIO_HOURS, studioMapsEmbedUrl } from '@/config/gbp';
import { contactPageJsonLd } from '@/lib/schema';
import {
  formatStudioAddressLine,
  STUDIO_EMAIL,
  STUDIO_PHONES,
  STUDIO_WHATSAPP_DISPLAY,
  STUDIO_WHATSAPP_URL,
  studioMapsSearchUrl,
  studioPhoneE164,
} from '@/config/wix-brand';

export const metadata: Metadata = blPageMetadata({
  title: 'Contacto',
  description:
    'Contacto con el Estudio Jurídico Bengolea & Lamas. Belgrano 174, San Nicolás. Lunes a viernes 8:30 a 12:20 y 17:00 a 20:00. Teléfonos, WhatsApp y formulario.',
  path: '/contacto',
  keywords: ['contacto abogados San Nicolás', 'Bengolea Lamas teléfono', 'estudio jurídico Belgrano 174'],
});

export default function ContactoPage() {
  const siteSeo = getBlSiteSeoConfig();
  const breadcrumbs = breadcrumbJsonLd(siteSeo, [
    { name: 'Inicio', path: '/' },
    { name: 'Contacto', path: '/contacto' },
  ]);

  return (
    <article className="mx-auto max-w-5xl px-4 py-12 md:px-8 md:py-16">
      <JsonLd data={[breadcrumbs, contactPageJsonLd('/contacto')]} />
      <Breadcrumbs
        items={[{ label: 'Inicio', href: '/' }, { label: 'Contacto' }]}
        className="mb-8 text-muted-foreground"
      />
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">Abogados</p>
      <h1 className="mt-2 font-headline text-4xl font-normal text-foreground">Contacto</h1>

      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href="/contanos-tu-caso"
          className="inline-flex border border-foreground bg-foreground px-6 py-2.5 text-xs font-medium uppercase tracking-[0.15em] text-background transition hover:bg-foreground/90"
        >
          Contar mi caso con IA
        </Link>
        <a
          href="#form-heading"
          className="inline-flex border border-foreground px-6 py-2.5 text-xs font-medium uppercase tracking-[0.15em] transition hover:bg-foreground hover:text-background"
        >
          Contacto tradicional
        </a>
      </div>

      <address className="mt-8 space-y-2 text-sm not-italic leading-relaxed text-muted-foreground md:text-base">
        <p>
          <a href={studioMapsSearchUrl()} className="hover:text-foreground" target="_blank" rel="noopener noreferrer">
            {formatStudioAddressLine()}
          </a>
        </p>
        <p>
          <a href={`mailto:${STUDIO_EMAIL}`} className="text-accent hover:underline">
            {STUDIO_EMAIL}
          </a>
        </p>
        <p>
          Teléfonos:{' '}
          {STUDIO_PHONES.map((tel, i) => (
            <span key={tel}>
              {i > 0 ? ' · ' : null}
              <a href={`tel:${studioPhoneE164(tel)}`} className="hover:text-foreground">
                {tel}
              </a>
            </span>
          ))}
        </p>
        <p>
          WhatsApp:{' '}
          <a href={STUDIO_WHATSAPP_URL} className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">
            {STUDIO_WHATSAPP_DISPLAY}
          </a>
        </p>
        <p>
          Horario: {STUDIO_HOURS.display}. Atención con turno previo.
        </p>
      </address>

      <section className="mt-10" aria-labelledby="mapa-heading">
        <h2 id="mapa-heading" className="text-lg font-medium text-foreground">
          Cómo llegar
        </h2>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          Belgrano 174, en el centro de San Nicolás de los Arroyos.
        </p>
        <div className="mt-4 aspect-[16/9] w-full max-w-3xl overflow-hidden border border-border bg-muted">
          <iframe
            title="Mapa del Estudio Jurídico Bengolea & Lamas en Belgrano 174, San Nicolás"
            src={studioMapsEmbedUrl()}
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <p className="mt-3 text-sm">
          <a href={studioMapsSearchUrl()} className="font-medium text-accent hover:underline" target="_blank" rel="noopener noreferrer">
            Abrir en Google Maps
          </a>
        </p>
      </section>

      <section className="mt-14 max-w-xl" aria-labelledby="form-heading">
        <h2 id="form-heading" className="text-lg font-medium text-foreground">
          Formulario de contacto
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Ud. puede evacuar una consulta o solicitar turnos a través de esta vía. Un abogado del Estudio se comunicará a
          la brevedad.
        </p>
        <ContactForm className="mt-6" />
        <p className="mt-8 text-sm text-muted-foreground">
          Si te interesa aplicar para trabajar con nosotros podés enviarnos tu CV a{' '}
          <a href={`mailto:${STUDIO_EMAIL}?subject=CV`} className="text-accent hover:underline">
            {STUDIO_EMAIL}
          </a>
          .
        </p>
      </section>
    </article>
  );
}
