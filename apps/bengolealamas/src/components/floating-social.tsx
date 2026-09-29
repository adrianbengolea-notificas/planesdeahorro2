import Image from 'next/image';
import Link from 'next/link';
import { MessageSquare } from 'lucide-react';
import { CASE_INTAKE_COPY } from '@/config/case-intake';
import { SITE_SAME_AS } from '@/config/site';
import { STUDIO_EMAIL, STUDIO_WHATSAPP_URL } from '@/config/wix-brand';

export function FloatingSocial() {
  const facebook = SITE_SAME_AS[0];

  return (
    <>
      <div className="fixed right-4 top-24 z-40 flex flex-col gap-2 md:right-8 md:top-28">
        <Link
          href={STUDIO_WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-sm bg-white p-1 shadow-md ring-1 ring-black/5 transition hover:shadow-lg"
          aria-label="WhatsApp"
        >
          <Image src="/brand/icon-whatsapp.png" alt="" width={28} height={28} />
        </Link>
        {facebook ? (
          <Link
            href={facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm bg-white p-1 shadow-md ring-1 ring-black/5 transition hover:shadow-lg"
            aria-label="Facebook"
          >
            <Image src="/brand/icon-facebook.png" alt="" width={28} height={28} />
          </Link>
        ) : null}
      </div>

      <div
        className="fixed bottom-4 right-4 z-50 flex max-w-[min(100vw-2rem,22rem)] flex-col gap-2 md:bottom-6 md:right-6"
        role="group"
        aria-label="Contacto rápido"
      >
        <Link
          href="/contanos-tu-caso"
          className="flex items-center justify-center gap-2 rounded-full border border-foreground bg-foreground px-4 py-2.5 text-sm font-medium text-background shadow-lg transition hover:bg-foreground/90"
        >
          <MessageSquare className="h-4 w-4 shrink-0" aria-hidden />
          {CASE_INTAKE_COPY.floatLabel}
        </Link>
        <Link
          href={STUDIO_WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-full bg-[#7ee3cf] px-4 py-2.5 text-sm font-medium text-foreground shadow-md transition hover:bg-[#6dd9c4]"
        >
          WhatsApp directo
        </Link>
        <p className="hidden text-center text-[10px] leading-snug text-muted-foreground md:block">
          IA: consulta guiada para el estudio · WhatsApp: mensaje informal
        </p>
      </div>

      <Link href={`mailto:${STUDIO_EMAIL}`} className="sr-only">
        {STUDIO_EMAIL}
      </Link>
    </>
  );
}
