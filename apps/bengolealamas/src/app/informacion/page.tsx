import type { Metadata } from 'next';
import Image from 'next/image';
import { blPageMetadata } from '@/lib/page-metadata';
import { FOUNDERS, INFORMACION_BODY, INFORMACION_LEAD } from '@/config/wix-brand';

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

      <ul className="mt-14 grid gap-12 md:grid-cols-2 md:gap-10">
        {FOUNDERS.map((person) => (
          <li key={person.name} className="text-center">
            <div className="relative mx-auto aspect-square w-full max-w-[280px] overflow-hidden bg-muted">
              <Image
                src={person.image}
                alt={person.name}
                fill
                className="object-cover object-top grayscale"
                sizes="(max-width: 768px) 80vw, 280px"
              />
            </div>
            <h2 className="mt-6 font-headline text-lg font-normal text-accent md:text-xl">{person.name}</h2>
            <p className="mt-1 text-sm font-medium uppercase tracking-wide text-accent/90">{person.role}</p>
            <blockquote className="mt-4 font-headline text-base italic leading-relaxed text-foreground md:text-lg">
              &ldquo;{person.quote}&rdquo;
            </blockquote>
          </li>
        ))}
      </ul>
    </article>
  );
}
