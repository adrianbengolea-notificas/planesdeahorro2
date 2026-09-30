import type { Metadata } from 'next';
import { JsonLd } from '@repo/shared/components/json-ld';
import { Breadcrumbs } from '@repo/shared/components/breadcrumbs';
import { breadcrumbJsonLd } from '@repo/shared/schema';
import { ProfileCta } from '@/components/professionals/profile-cta';
import { ProfilePhoto } from '@/components/professionals/profile-photo';
import { ProfileSection } from '@/components/professionals/profile-section';
import { getProfessionalBySlug } from '@/config/professionals';
import { getBlSiteSeoConfig } from '@/config/seo';
import { personJsonLd } from '@/lib/schema';

const siteSeo = getBlSiteSeoConfig();
const path = '/profesionales/ignacio-goni';
const person = getProfessionalBySlug('ignacio-goni')!;

export const metadata: Metadata = {
  title: 'Ignacio Goñi | Abogado | Bengolea & Lamas',
  description: 'Ignacio Goñi, integrante del Estudio Jurídico Bengolea & Lamas en San Nicolás de los Arroyos.',
  alternates: { canonical: `${siteSeo.siteUrl.replace(/\/$/, '')}${path}` },
};

export default function IgnacioGoniPage() {
  const jsonLd = personJsonLd({
    name: person.name,
    path,
    jobTitle: person.jobTitle,
    description: person.teaser,
  });

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(siteSeo, [
          { name: 'Inicio', path: '/' },
          { name: 'Profesionales', path: '/profesionales' },
          { name: person.name, path },
        ])}
      />
      <JsonLd data={jsonLd} />
      <article>
        <header className="border-b border-border bg-background">
          <div className="container mx-auto max-w-5xl px-4 py-8 md:px-8 md:py-12">
            <Breadcrumbs
              items={[
                { label: 'Inicio', href: '/' },
                { label: 'Profesionales', href: '/profesionales' },
                { label: person.name },
              ]}
              className="mb-8 text-muted-foreground"
            />
            <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:items-start">
              <ProfilePhoto
                pending={person.imageTodo}
                alt={person.imageAlt}
                className="mx-auto aspect-[3/4] w-full max-w-sm lg:mx-0"
              />
              <div>
                <h1 className="font-headline text-3xl font-normal text-foreground md:text-4xl">{person.name}</h1>
                <p className="mt-2 text-lg text-accent">{person.jobTitle}</p>
                <p className="mt-6 text-base leading-relaxed text-muted-foreground">{person.teaser}</p>
              </div>
            </div>
          </div>
        </header>
        <div className="container mx-auto max-w-5xl space-y-10 px-4 py-12 md:px-8 md:py-16">
          <ProfileSection title="Perfil profesional">
            <p>
              Estamos completando la biografía pública de Ignacio Goñi con matrícula, formación y áreas de práctica
              verificables. Mientras tanto, podés contactar al estudio para consultas vinculadas a su actuación.
            </p>
          </ProfileSection>
          <ProfileCta />
        </div>
      </article>
    </>
  );
}
