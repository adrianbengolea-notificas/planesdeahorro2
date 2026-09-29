import Link from 'next/link';
import { CASE_INTAKE_COPY } from '@/config/case-intake';

type Props = {
  className?: string;
  title?: string;
  description?: string;
};

export function CaseIntakePromo({ className, title, description }: Props) {
  return (
    <aside
      className={`rounded-lg border border-border bg-muted/40 p-5 md:p-6 ${className ?? ''}`}
      aria-label="Consulta con asistente"
    >
      <h2 className="font-headline text-lg font-normal text-foreground">
        {title ?? '¿Tenés un reclamo o consulta jurídica?'}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {description ??
          'El asistente con IA te ayuda a ordenar los hechos y prepara un resumen para que un abogado del estudio lo revise.'}
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Link
          href="/contanos-tu-caso"
          className="inline-flex border border-foreground bg-foreground px-5 py-2.5 text-xs font-medium uppercase tracking-[0.12em] text-background transition hover:bg-foreground/90"
        >
          {CASE_INTAKE_COPY.primaryCta}
        </Link>
        <Link href="/contacto" className="inline-flex px-1 py-2.5 text-sm font-medium text-accent hover:underline">
          Contacto tradicional
        </Link>
      </div>
    </aside>
  );
}
