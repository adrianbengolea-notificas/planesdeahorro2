import type { Metadata } from 'next';
import { CoverImage } from '@/components/cover-image';
import { JsonLd } from '@repo/shared/components/json-ld';
import { Breadcrumbs } from '@repo/shared/components/breadcrumbs';
import { breadcrumbJsonLd } from '@repo/shared/schema';
import { ProfileCta } from '@/components/professionals/profile-cta';
import { ProfileSection } from '@/components/professionals/profile-section';
import { getProfessionalBySlug } from '@/config/professionals';
import { getBlSiteSeoConfig } from '@/config/seo';
import { personJsonLd } from '@/lib/schema';

const siteSeo = getBlSiteSeoConfig();
const path = '/profesionales/carlos-alberto-lamas';
const person = getProfessionalBySlug('carlos-alberto-lamas')!;
const photo = '/images/profesionales/carlos-alberto-lamas.jpg';

export const metadata: Metadata = {
  title: 'Carlos Alberto Lamas | In memoriam | Bengolea & Lamas',
  description:
    'Carlos Alberto Lamas, socio fundador del Estudio Jurídico Bengolea & Lamas. In memoriam — legado en la defensa de quienes confiaron en el estudio.',
  alternates: { canonical: `${siteSeo.siteUrl.replace(/\/$/, '')}${path}` },
};

export default function CarlosAlbertoLamasPage() {
  const jsonLd = personJsonLd({
    name: person.name,
    path,
    jobTitle: person.jobTitle,
    description: person.teaser,
    image: `${siteSeo.siteUrl.replace(/\/$/, '')}${photo}`,
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
              <CoverImage
                src={photo}
                alt={person.imageAlt}
                className="mx-auto aspect-[3/4] w-full max-w-sm lg:mx-0"
                imageClassName="object-top"
                sizes="(max-width: 1024px) 80vw, 360px"
                priority
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
          <ProfileSection title="In memoriam">
            <p>
              Socio del estudio y parte fundamental de su historia. Su trayectoria profesional, su compromiso con el
              ejercicio de la abogacía y su dedicación a la defensa de los derechos de quienes confiaron en el estudio
              constituyen un legado que continúa presente en nuestra práctica profesional.
            </p>
          </ProfileSection>
          <ProfileCta />
        </div>
      </article>
    </>
  );
}
