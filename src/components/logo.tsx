import Image from 'next/image';

export function Logo({ className, inverted }: { className?: string; inverted?: boolean }) {
  if (inverted) {
    return (
      <div className={`flex min-w-0 flex-col leading-tight text-primary-foreground ${className ?? ''}`}>
        <span className="font-headline text-[10px] md:text-[11px] font-medium uppercase tracking-[0.28em] text-accent">
          Estudio jurídico
        </span>
        <span className="font-headline text-base md:text-lg font-semibold tracking-[0.12em] uppercase">
          Bengolea & Lamas
        </span>
        <span className="font-body text-[10px] md:text-[11px] font-medium uppercase tracking-[0.16em] text-primary-foreground/70">
          Planes de ahorro
        </span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 min-w-0 ${className ?? ''}`}>
      <Image
        src="/brand/estudio-logo.jpg"
        alt="Estudio Jurídico Bengolea & Lamas"
        width={382}
        height={64}
        className="h-8 md:h-10 w-auto"
        priority
      />
      <span className="hidden sm:block border-l border-primary/20 pl-3 font-headline text-[10px] font-medium uppercase tracking-[0.22em] text-primary/70">
        Planes de ahorro
      </span>
    </div>
  );
}
