import type { Metadata } from 'next';
import Link from 'next/link';
import { blPageMetadata } from '@/lib/page-metadata';
import { STUDIO_EMAIL, STUDIO_WHATSAPP_URL } from '@/config/wix-brand';

export const metadata: Metadata = blPageMetadata({
  title: 'Consultas online',
  description: 'Consultas jurídicas online con el Estudio Bengolea & Lamas.',
  path: '/consultas-online',
});

export default function ConsultasOnlinePage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 md:px-8 md:py-16">
      <h1 className="font-headline text-3xl font-normal text-foreground">Consultas online</h1>
      <p className="mt-6 text-muted-foreground leading-relaxed">
        Podés evacuar una consulta o solicitar turnos desde cualquier lugar del país. Un abogado del estudio se
        comunicará a la brevedad.
      </p>
      <ul className="mt-8 space-y-3 text-sm md:text-base">
        <li>
          <Link href="/contacto" className="font-medium text-accent underline-offset-2 hover:underline">
            Formulario de contacto
          </Link>
        </li>
        <li>
          <a href={STUDIO_WHATSAPP_URL} className="font-medium text-accent underline-offset-2 hover:underline" rel="noopener noreferrer" target="_blank">
            WhatsApp
          </a>
        </li>
        <li>
          <a href={`mailto:${STUDIO_EMAIL}`} className="font-medium text-accent underline-offset-2 hover:underline">
            {STUDIO_EMAIL}
          </a>
        </li>
      </ul>
    </article>
  );
}
