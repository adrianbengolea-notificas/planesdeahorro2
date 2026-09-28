import Image from 'next/image';
import Link from 'next/link';
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

      <Link
        href={STUDIO_WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-4 z-50 flex items-center gap-2 rounded-full bg-[#7ee3cf] px-4 py-2.5 text-sm font-medium text-foreground shadow-lg transition hover:bg-[#6dd9c4] md:right-6"
      >
        ¡Vamos a chatear!
      </Link>

      <Link href={`mailto:${STUDIO_EMAIL}`} className="sr-only">
        {STUDIO_EMAIL}
      </Link>
    </>
  );
}
