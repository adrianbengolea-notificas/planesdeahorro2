import Link from 'next/link';

export function ProfileCta() {
  return (
    <section className="mt-14 rounded-lg border border-border bg-muted/40 p-8 md:p-10" aria-labelledby="profile-cta-heading">
      <h2 id="profile-cta-heading" className="font-headline text-xl font-normal text-foreground md:text-2xl">
        Consultar al estudio
      </h2>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
        Podés enviarnos una consulta describiendo brevemente tu situación. Analizaremos el caso para determinar cómo
        podemos ayudarte.
      </p>
      <div className="mt-6 flex flex-wrap gap-4">
        <Link
          href="/contanos-tu-caso"
          className="inline-flex border border-foreground bg-foreground px-6 py-2.5 text-xs font-medium uppercase tracking-[0.15em] text-background transition hover:bg-foreground/90"
        >
          Realizar consulta
        </Link>
        <Link
          href="/contacto"
          className="inline-flex border border-foreground px-6 py-2.5 text-xs font-medium uppercase tracking-[0.15em] transition hover:bg-foreground hover:text-background"
        >
          Contactar al estudio
        </Link>
      </div>
    </section>
  );
}
