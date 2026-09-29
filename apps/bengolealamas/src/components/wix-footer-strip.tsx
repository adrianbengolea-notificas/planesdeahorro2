import Image from 'next/image';
import Link from 'next/link';
import { socialLinks } from '@/config/site';
import { STUDIO_ADDRESS, STUDIO_EMAIL } from '@/config/wix-brand';

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
        Estudio Jurídico Bengolea & Lamas - {STUDIO_ADDRESS.city} - {STUDIO_ADDRESS.street} -{' '}
        <Link href={`mailto:${STUDIO_EMAIL}`} className="text-accent hover:underline">
          {STUDIO_EMAIL}
        </Link>
      </p>
    </footer>
  );
}
