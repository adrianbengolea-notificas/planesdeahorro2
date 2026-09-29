import Link from 'next/link';
import { CoverImage } from '@/components/cover-image';
import type { ProfessionalSummary } from '@/config/professionals';
import { cn } from '@/lib/utils';

type Props = {
  person: ProfessionalSummary;
  className?: string;
};

export function ProfessionalCard({ person, className }: Props) {
  const displayName = person.honorific ? `${person.honorific} ${person.name}` : person.name;

  return (
    <article
      className={cn(
        'flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-shadow hover:shadow-md md:flex-row',
        className,
      )}
    >
      <div className="relative aspect-[4/5] w-full shrink-0 md:aspect-auto md:w-[38%] md:min-h-[320px]">
        {person.image && !person.imageTodo ? (
          <CoverImage
            src={person.image}
            alt={person.imageAlt}
            className="absolute inset-0 h-full w-full"
            imageClassName="object-top grayscale-[0.15]"
            sizes="(max-width: 768px) 100vw, 320px"
          />
        ) : (
          <div className="flex h-full min-h-[280px] items-center justify-center p-6 text-center text-sm text-muted-foreground">
            TODO: incorporar fotografía oficial del profesional.
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6 md:p-8">
        <h2 className="font-headline text-xl font-normal text-foreground md:text-2xl">{displayName}</h2>
        <p className="mt-1 text-sm font-medium uppercase tracking-wide text-accent">{person.jobTitle}</p>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{person.specialties.join(' · ')}</p>
        <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">{person.teaser}</p>
        <Link
          href={`/profesionales/${person.slug}`}
          className="mt-6 inline-flex w-fit border border-foreground px-6 py-2.5 text-xs font-medium uppercase tracking-[0.15em] transition hover:bg-foreground hover:text-background"
        >
          Ver perfil
        </Link>
      </div>
    </article>
  );
}
