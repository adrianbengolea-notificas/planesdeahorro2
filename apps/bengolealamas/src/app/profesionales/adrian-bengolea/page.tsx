import type { Metadata } from 'next';
import { CoverImage } from '@/components/cover-image';
import Link from 'next/link';
import { JsonLd } from '@repo/shared/components/json-ld';
import { Breadcrumbs } from '@repo/shared/components/breadcrumbs';
import { breadcrumbJsonLd } from '@repo/shared/schema';
import { ProfileCta } from '@/components/professionals/profile-cta';
import { ProfileSection } from '@/components/professionals/profile-section';
import { PublicationCards } from '@/components/professionals/publication-cards';
import { ADRIAN_PLANES_SITE_URL, UCU_URL, socialLinks } from '@/config/site';
import { ADRIAN_UCU_PUBLICATIONS } from '@/config/publications-adrian';
import { BAR_SAN_NICOLAS } from '@/config/professionals';
import { getBlSiteSeoConfig } from '@/config/seo';
import { personJsonLd } from '@/lib/schema';

const siteSeo = getBlSiteSeoConfig();
const canonical = `${siteSeo.siteUrl.replace(/\/$/, '')}/profesionales/adrian-bengolea`;

export const metadata: Metadata = {
  title: 'Adrián Bengolea | Abogado en San Nicolás | Bengolea & Lamas',
  description:
    'Dr. Adrián Bengolea. Abogado en San Nicolás de los Arroyos. Defensa del consumidor, planes de ahorro, litigación civil y comercial y acciones colectivas.',
  alternates: { canonical },
  openGraph: {
    title: 'Adrián Bengolea | Abogado en San Nicolás | Bengolea & Lamas',
    description:
      'Dr. Adrián Bengolea. Abogado en San Nicolás de los Arroyos. Defensa del consumidor, planes de ahorro, litigación civil y comercial y acciones colectivas.',
    url: canonical,
    images: [{ url: '/images/profesionales/adrian-bengolea.jpg', alt: 'Dr. Adrián Bengolea' }],
  },
};

const sameAs = [
  ADRIAN_PLANES_SITE_URL,
  UCU_URL,
  socialLinks.facebook,
].filter(Boolean);

export default function AdrianBengoleaProfilePage() {
  const jsonLd = personJsonLd({
    name: 'Adrián Bengolea',
    path: '/profesionales/adrian-bengolea',
    jobTitle: 'Abogado',
    description:
      'Abogado en San Nicolás de los Arroyos. Defensa del consumidor, planes de ahorro y litigación civil y comercial.',
    image: `${siteSeo.siteUrl.replace(/\/$/, '')}/images/profesionales/adrian-bengolea.jpg`,
    sameAs,
    knowsAbout: [
      'Defensa del consumidor',
      'Planes de ahorro automotor',
      'Derecho civil',
      'Derecho comercial',
      'Acciones colectivas',
    ],
  });

  const breadcrumbs = breadcrumbJsonLd(siteSeo, [
    { name: 'Inicio', path: '/' },
    { name: 'Profesionales', path: '/profesionales' },
    { name: 'Adrián Bengolea', path: '/profesionales/adrian-bengolea' },
  ]);

  return (
    <>
      <JsonLd data={[jsonLd, breadcrumbs]} />
      <article>
        <header className="border-b border-border bg-background">
          <div className="container mx-auto max-w-5xl px-4 py-8 md:px-8 md:py-12">
            <Breadcrumbs
              items={[
                { label: 'Inicio', href: '/' },
                { label: 'Profesionales', href: '/profesionales' },
                { label: 'Adrián Bengolea' },
              ]}
              className="mb-8 text-muted-foreground"
            />
            <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:items-start">
              <CoverImage
                src="/images/profesionales/adrian-bengolea.jpg"
                alt="Dr. Adrián Bengolea"
                className="mx-auto aspect-[3/4] w-full max-w-sm lg:mx-0"
                imageClassName="object-top"
                sizes="(max-width: 1024px) 80vw, 360px"
                priority
              />
              <div>
                <h1 className="font-headline text-3xl font-normal text-foreground md:text-4xl">Dr. Adrián Bengolea</h1>
                <p className="mt-2 text-lg text-accent">Abogado</p>
                <p className="mt-4 text-sm text-muted-foreground">
                  {BAR_SAN_NICOLAS.registration} — {BAR_SAN_NICOLAS.association}
                </p>
                <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                  Especialista en defensa del consumidor, litigación civil y comercial y conflictos vinculados a planes de
                  ahorro automotor. Integrante del Estudio Jurídico Bengolea & Lamas, con ejercicio profesional en San
                  Nicolás de los Arroyos y la provincia de Buenos Aires.
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto max-w-5xl space-y-10 px-4 py-12 md:px-8 md:py-16">
          <ProfileSection title="Perfil profesional">
            <p>
              Adrián Bengolea es abogado matriculado en el {BAR_SAN_NICOLAS.association} ({BAR_SAN_NICOLAS.registration}),
              provincia de Buenos Aires. Integra el Estudio Jurídico Bengolea & Lamas y desarrolla su práctica con
              orientación a la defensa de consumidores en conflictos individuales y colectivos, el asesoramiento y la
              litigación en materia civil y comercial.
            </p>
            <p>
              En el sitio profesional{' '}
              <a href={ADRIAN_PLANES_SITE_URL} className="text-accent hover:underline" rel="noopener noreferrer">
                adrianbengolea.com.ar
              </a>{' '}
              concentra contenidos y consultas vinculadas a problemas de planes de ahorro automotor —liquidación,
              rescisión, haberes, ejecución prendaria y cláusulas abusivas—, siempre dentro del marco de la Ley 24.240 y
              la normativa aplicable a los contratos de adhesión.
            </p>
            <p>
              En publicaciones oficiales del sitio de{' '}
              <a href={UCU_URL} className="text-accent hover:underline" rel="noopener noreferrer">
                Usuarios y Consumidores Unidos (UCU)
              </a>{' '}
              se lo identifica como Director Ejecutivo de la asociación y autor de materiales orientados a la defensa de
              consumidores y a la difusión de herramientas para abogados en derecho del consumidor.
            </p>
            <p>
              Su labor combina el análisis de cada situación concreta, la preparación de estrategias probatorias y la
              producción de contenidos jurídicos divulgativos destinados a consumidores y profesionales.
            </p>
          </ProfileSection>

          <ProfileSection id="defensa-consumidor" title="Defensa del consumidor">
            <p>
              <strong className="font-medium text-foreground">Usuarios y Consumidores Unidos (UCU)</strong> es una
              asociación civil sin fines de lucro dedicada a la defensa de los derechos de usuarios y consumidores en
              Argentina. Según información publicada en{' '}
              <a href={UCU_URL} className="text-accent hover:underline" rel="noopener noreferrer">
                ucu.org.ar
              </a>
              , brinda asesoramiento, canal de denuncias, acciones individuales y colectivas, y cuenta con presencia
              territorial mediante delegaciones en distintas localidades del país, con sede principal en San Nicolás de
              los Arroyos.
            </p>
            <p>
              Adrián Bengolea aparece en notas y comunicados oficiales de UCU vinculados a acciones colectivas,
              participación en regulaciones de consumo y expansión de delegaciones. Para conocer la actividad actual de
              la entidad, consultá el sitio oficial:{' '}
              <a href={UCU_URL} className="text-accent hover:underline" rel="noopener noreferrer">
                https://ucu.org.ar
              </a>
              .
            </p>
          </ProfileSection>

          <ProfileSection id="planes-de-ahorro" title="Experiencia en planes de ahorro">
            <p>
              Entre sus áreas de trabajo específicas se encuentran los conflictos derivados de planes de ahorro
              automotor: demoras o discrepancias en la liquidación y devolución de haberes, rescisión contractual,
              incumplimientos de administradoras, adjudicación y entrega del bien, diferencias en cálculos, cargos y
              seguros asociados, ejecuciones prendarias y cláusulas abusivas, así como la responsabilidad de
              administradoras y concesionarias en el marco de relaciones de consumo.
            </p>
            <p>
              <Link
                href={ADRIAN_PLANES_SITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex border border-accent px-5 py-2 text-sm font-medium text-accent transition hover:bg-accent hover:text-accent-foreground"
              >
                Ver información sobre planes de ahorro
              </Link>
            </p>
          </ProfileSection>

          <ProfileSection title="Litigación y estrategia jurídica">
            <p>
              El ejercicio profesional comprende el estudio previo de cada conflicto, la definición de estrategia
              probatoria, la negociación cuando resulta conveniente, los reclamos extrajudiciales y las acciones
              judiciales con sus recursos y etapas de ejecución. Cuando el caso lo requiere, participa en acciones
              colectivas promovidas por asociaciones de consumidores.
            </p>
            <p>
              El objetivo es ordenar hechos, documentación y plazos mencionados por el cliente para que el estudio pueda
              evaluar viabilidad y próximos pasos con rigor técnico, sin prometer resultados ni sustituir el análisis
              personalizado de cada abogado responsable.
            </p>
          </ProfileSection>

          <ProfileSection title="Actividad académica y divulgación">
            <p>
              En el sitio de UCU se publican artículos y comunicados firmados por Adrián Bengolea sobre defensa del
              consumidor, participación ciudadana en regulaciones y herramientas para abogados. También desarrolla
              contenidos en{' '}
              <a href={ADRIAN_PLANES_SITE_URL} className="text-accent hover:underline" rel="noopener noreferrer">
                adrianbengolea.com.ar
              </a>{' '}
              orientados a consumidores con conflictos en planes de ahorro.
            </p>
            <p className="text-sm italic">
              Referencias concretas a jornadas o cursos específicos se incorporarán cuando estén verificadas en fuentes
              públicas independientes.
            </p>
          </ProfileSection>

          <ProfileSection title="Publicaciones y análisis">
            <p>Selección de materiales publicados en UCU atribuidos a Adrián Bengolea:</p>
            <PublicationCards items={ADRIAN_UCU_PUBLICATIONS} />
          </ProfileSection>

          <ProfileSection title="Enlaces relacionados">
            <ul className="list-inside list-disc space-y-2 text-sm">
              <li>
                <Link href="/areas-de-practica" className="text-accent hover:underline">
                  Áreas de práctica del estudio
                </Link>
              </li>
              <li>
                <Link href="/planes-de-ahorro" className="text-accent hover:underline">
                  Hub institucional — planes de ahorro
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-accent hover:underline">
                  Contacto del estudio
                </Link>
              </li>
            </ul>
          </ProfileSection>

          <ProfileCta />
        </div>
      </article>
    </>
  );
}
