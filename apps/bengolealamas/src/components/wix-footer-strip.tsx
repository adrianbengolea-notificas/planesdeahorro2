import Link from 'next/link';
import { STUDIO_ADDRESS, STUDIO_EMAIL } from '@/config/wix-brand';

export function WixFooterStrip() {
  return (
    <footer className="border-t border-border/60 bg-background py-10 text-center">
      <p className="px-4 text-xs leading-relaxed text-muted-foreground md:text-sm">
        Estudio Jurídico Bengolea & Lamas - {STUDIO_ADDRESS.city} - {STUDIO_ADDRESS.street} -{' '}
        <Link href={`mailto:${STUDIO_EMAIL}`} className="text-accent hover:underline">
          {STUDIO_EMAIL}
        </Link>
      </p>
    </footer>
  );
}
