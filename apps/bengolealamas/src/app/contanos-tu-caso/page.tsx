import type { Metadata } from 'next';
import Link from 'next/link';
import { CaseIntakeChat } from '@/components/case-intake/case-intake-chat';
import { CASE_INTAKE_COPY } from '@/config/case-intake';
import { getBlSiteSeoConfig } from '@/config/seo';

const siteSeo = getBlSiteSeoConfig();

export const metadata: Metadata = {
  title: `${CASE_INTAKE_COPY.pageTitle} | Bengolea & Lamas`,
  description: CASE_INTAKE_COPY.intro,
  alternates: { canonical: `${siteSeo.siteUrl.replace(/\/$/, '')}/contanos-tu-caso` },
  robots: { index: true, follow: true },
};

export default function ContanosTuCasoPage() {
  return (
    <article className="container mx-auto max-w-5xl px-4 py-12 md:px-8 md:py-16">
      <p className="text-xs font-medium uppercase tracking-[0.25em] text-accent">Consulta inicial</p>
      <h1 className="mt-3 font-headline text-3xl font-normal text-foreground md:text-4xl">
        {CASE_INTAKE_COPY.pageTitle}
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{CASE_INTAKE_COPY.intro}</p>
      <p className="mt-3 max-w-2xl text-sm text-muted-foreground">{CASE_INTAKE_COPY.disclaimer}</p>

      <div className="mt-10">
        <CaseIntakeChat />
      </div>

      <p className="mt-8 text-sm text-muted-foreground">
        Preferís contacto tradicional?{' '}
        <Link href="/contacto" className="font-medium text-accent hover:underline">
          Formulario y teléfonos del estudio
        </Link>
      </p>
    </article>
  );
}
