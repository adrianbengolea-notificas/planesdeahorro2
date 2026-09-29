import type { Metadata } from 'next';
import Link from 'next/link';
import { blPageMetadata } from '@/lib/page-metadata';
import { ContactForm } from '@/components/contact-form';
import {
  STUDIO_ADDRESS,
  STUDIO_EMAIL,
  STUDIO_PHONES,
  STUDIO_WHATSAPP_DISPLAY,
  STUDIO_WHATSAPP_URL,
} from '@/config/wix-brand';

export const metadata: Metadata = blPageMetadata({
  title: 'Contacto',
  description: 'Contacto con el Estudio Jurídico Bengolea & Lamas en San Nicolás de los Arroyos.',
  path: '/contacto',
});

export default function ContactoPage() {
  return (
    <article className="mx-auto max-w-5xl px-4 py-12 md:px-8 md:py-16">
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

      <div className="mt-8 space-y-2 text-sm leading-relaxed text-muted-foreground md:text-base">
        <p>
          {STUDIO_ADDRESS.street}
          <br />
          {STUDIO_ADDRESS.city}
          <br />
          {STUDIO_ADDRESS.province}.
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
              <a href={`tel:+54${tel.replace(/-/g, '')}`} className="hover:text-foreground">
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
      </div>

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
