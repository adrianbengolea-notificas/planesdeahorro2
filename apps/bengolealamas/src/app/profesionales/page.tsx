import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@repo/shared/components/json-ld';
import { breadcrumbJsonLd } from '@repo/shared/schema';
import { ProfessionalCard } from '@/components/professionals/professional-card';
import { ProfileCta } from '@/components/professionals/profile-cta';
import { getBlSiteSeoConfig } from '@/config/seo';
import { PROFESSIONALS_HERO, PROFESSIONALS_TRADITION, TEAM } from '@/config/professionals';

const siteSeo = getBlSiteSeoConfig();

export const metadata: Metadata = {
  title: 'Abogados en San Nicolás | Profesionales | Bengolea & Lamas',
  description:
    'Conocé al equipo de abogados de Bengolea & Lamas en San Nicolás de los Arroyos. Experiencia en litigación, derecho civil y comercial, defensa del consumidor y asesoramiento jurídico.',
  alternates: { canonical: `${siteSeo.siteUrl.replace(/\/$/, '')}/profesionales` },
  openGraph: {
    title: 'Abogados en San Nicolás | Profesionales | Bengolea & Lamas',
    description:
      'Conocé al equipo de abogados de Bengolea & Lamas en San Nicolás de los Arroyos. Experiencia en litigación, derecho civil y comercial, defensa del consumidor y asesoramiento jurídico.',
    url: `${siteSeo.siteUrl.replace(/\/$/, '')}/profesionales`,
  },
};

export default function ProfesionalesPage() {
  const breadcrumbs = breadcrumbJsonLd(siteSeo, [
    { name: 'Inicio', path: '/' },
    { name: 'Profesionales', path: '/profesionales' },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <header className="border-b border-border bg-background">
        <div className="container mx-auto max-w-5xl px-4 py-12 md:px-8 md:py-16">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-accent">Equipo</p>
          <h1 className="mt-3 font-headline text-3xl font-normal text-foreground md:text-4xl">
            {PROFESSIONALS_HERO.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{PROFESSIONALS_HERO.subtitle}</p>
          <div className="mt-6 max-w-3xl space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            {PROFESSIONALS_HERO.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-5xl px-4 py-12 md:px-8 md:py-16">
        <ul className="space-y-8">
          {TEAM.map((person) => (
            <li key={person.slug}>
              <ProfessionalCard person={person} />
            </li>
          ))}
        </ul>

        <section className="mt-16 border-t border-border pt-12" aria-labelledby="tradition-heading">
          <h2 id="tradition-heading" className="font-headline text-2xl font-normal text-foreground md:text-3xl">
            {PROFESSIONALS_TRADITION.title}
          </h2>
          <div className="mt-6 max-w-3xl space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            {PROFESSIONALS_TRADITION.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            <Link href="/informacion" className="font-medium text-accent hover:underline">
              Más información institucional
            </Link>
            {' · '}
            <Link href="/servicios" className="font-medium text-accent hover:underline">
              Servicios del estudio
            </Link>
            {' · '}
            <Link href="/areas-de-practica" className="font-medium text-accent hover:underline">
              Áreas de práctica
            </Link>
          </p>
        </section>

        <div className="mt-12">
          <p className="mb-4 text-sm text-muted-foreground">¿Necesitás asesoramiento? Contanos tu situación.</p>
          <ProfileCta />
        </div>
      </div>
    </>
  );
}
