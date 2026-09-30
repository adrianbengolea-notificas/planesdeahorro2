import type { Metadata } from 'next';
import Link from 'next/link';
import { blPageMetadata } from '@/lib/page-metadata';
import { INFORMACION_BODY, INFORMACION_LEAD } from '@/config/wix-brand';

export const metadata: Metadata = blPageMetadata({
  title: 'Información',
  description: INFORMACION_LEAD,
  path: '/informacion',
});

export default function InformacionPage() {
  return (
    <article className="mx-auto max-w-5xl px-4 py-12 md:px-8 md:py-16">
      <p className="mb-2 text-sm font-medium uppercase tracking-[0.25em] text-accent">Información</p>
      <h1 className="font-headline text-2xl font-normal leading-snug text-foreground md:text-3xl lg:text-[2rem]">
        {INFORMACION_LEAD}
      </h1>
      <div className="mt-8 max-w-3xl space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
        {INFORMACION_BODY.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>

      <p className="mt-10 text-sm">
        <Link href="/profesionales" className="font-medium text-accent hover:underline">
          Conocé al equipo de profesionales
        </Link>
      </p>
    </article>
  );
}
