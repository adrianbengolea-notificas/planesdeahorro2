import Image from 'next/image';
import Link from 'next/link';
import { STUDIO_HOURS } from '@/config/gbp';
import { socialLinks } from '@/config/site';
import {
  STUDIO_ADDRESS,
  STUDIO_EMAIL,
  STUDIO_PHONES,
  studioPhoneE164,
} from '@/config/wix-brand';

export function WixFooterStrip() {
  return (
    <footer className="border-t border-border/60 bg-background py-10 text-center">
      <div className="mb-4 flex justify-center gap-3">
        {socialLinks.facebook ? (
          <Link
            href={socialLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm p-1 opacity-80 transition hover:opacity-100"
            aria-label="Facebook del estudio"
          >
            <Image src="/brand/icon-facebook.png" alt="" width={24} height={24} />
          </Link>
        ) : null}
        {socialLinks.instagram ? (
          <Link href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-xs text-accent">
            Instagram
          </Link>
        ) : null}
        {socialLinks.linkedin ? (
          <Link href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-xs text-accent">
            LinkedIn
          </Link>
        ) : null}
      </div>
      <p className="px-4 text-xs leading-relaxed text-muted-foreground md:text-sm">
        Estudio Jurídico Bengolea & Lamas — {STUDIO_ADDRESS.street}, {STUDIO_ADDRESS.city} ({STUDIO_ADDRESS.postalCode})
        {' — '}
        <Link href={`mailto:${STUDIO_EMAIL}`} className="text-accent hover:underline">
          {STUDIO_EMAIL}
        </Link>
      </p>
      <p className="mt-2 px-4 text-xs text-muted-foreground">
        {STUDIO_PHONES.map((tel, i) => (
          <span key={tel}>
            {i > 0 ? ' · ' : null}
            <a href={`tel:${studioPhoneE164(tel)}`} className="hover:text-foreground">
              {tel}
            </a>
          </span>
        ))}
      </p>
      <p className="mt-2 px-4 text-xs text-muted-foreground">{STUDIO_HOURS.display}</p>
      <p className="mt-3 px-4 text-xs text-muted-foreground">
        <Link href="/estudio" className="hover:text-foreground hover:underline">
          El estudio
        </Link>
        {' · '}
        <Link href="/areas-de-practica" className="hover:text-foreground hover:underline">
          Áreas de práctica
        </Link>
        {' · '}
        <Link href="/publicaciones" className="hover:text-foreground hover:underline">
          Publicaciones
        </Link>
        {' · '}
        <Link href="/contacto" className="hover:text-foreground hover:underline">
          Contacto
        </Link>
        {' · '}
        <Link href="/privacidad" className="hover:text-foreground hover:underline">
          Privacidad
        </Link>
      </p>
    </footer>
  );
}

