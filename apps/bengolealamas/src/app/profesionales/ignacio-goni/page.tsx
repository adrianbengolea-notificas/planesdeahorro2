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

  title: 'Ignacio Goñi Bengolea | Abogado | Bengolea & Lamas',

  description:

    'Ignacio Goñi Bengolea. Litigación, derecho bancario, tributario y seguros. UBA, posgrado en Daños. Abogado apoderado del Banco de la Nación Argentina.',

  alternates: { canonical: `${siteSeo.siteUrl.replace(/\/$/, '')}${path}` },

  openGraph: {

    title: 'Ignacio Goñi Bengolea | Abogado | Bengolea & Lamas',

    description:

      'Litigación, derecho bancario, tributario y seguros. Más de veinte años de experiencia en conflictos civiles, comerciales y procesales complejos.',

    url: `${siteSeo.siteUrl.replace(/\/$/, '')}${path}`,

  },

};



export default function IgnacioGoniPage() {

  const jsonLd = personJsonLd({

    name: person.name,

    path,

    jobTitle: person.jobTitle,

    description: person.teaser,

    image: person.image
      ? `${siteSeo.siteUrl.replace(/\/$/, '')}${person.image}`
      : undefined,

    knowsAbout: person.specialties,

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

                src={person.image}

                pending={person.imageTodo}

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

          <ProfileSection title="Formación y experiencia">

            <p>

              Abogado graduado de la Universidad de Buenos Aires, con Posgrado en Derecho de Daños en la misma casa de

              estudios.

            </p>

            <p>

              Cuenta con más de veinte años de experiencia profesional, con una sólida trayectoria en litigación

              judicial y asesoramiento jurídico en materias civil, comercial, bancaria, tributaria, laboral y penal.

            </p>

          </ProfileSection>



          <ProfileSection title="Sector financiero y seguros">

            <p>

              Desde 2011 se desempeña como abogado apoderado del Banco de la Nación Argentina, interviniendo en la

              gestión y estrategia de procesos judiciales, mediaciones y procedimientos administrativos.

            </p>

            <p>

              Previamente fue Subgerente Legal de Nación Seguros y Nación Seguros de Retiro, donde tuvo a su cargo el

              asesoramiento jurídico integral de distintas áreas de la compañía, elaboración y revisión de contratos y

              emisión de dictámenes jurídicos.

            </p>

          </ProfileSection>



          <ProfileSection title="Derecho tributario">

            <p>

              Desarrolla asimismo una práctica específica en <strong className="font-medium text-foreground">Derecho Tributario</strong>, tanto en materia de

              asesoramiento como en controversias vinculadas con obligaciones fiscales, procedimientos tributarios y

              defensa de los derechos de los contribuyentes.

            </p>

          </ProfileSection>



          <ProfileSection title="Experiencia internacional">

            <p>

              Entre 2005 y 2007 desarrolló actividad profesional en la Organización de Estados Americanos (OEA), en

              Washington D.C. y distintos países de América Latina, participando como asesor jurídico y coordinador en

              Misiones de Observación Electoral y en proyectos vinculados con derecho electoral, institucional y

              ambiental.

            </p>

          </ProfileSection>



          <ProfileSection title="Enfoque profesional">

            <p>

              Su práctica se encuentra especialmente orientada al análisis jurídico, la estrategia procesal y la

              resolución de conflictos complejos, en el marco del Estudio Jurídico Bengolea & Lamas.

            </p>

          </ProfileSection>



          <ProfileCta />

        </div>

      </article>

    </>

  );

}


