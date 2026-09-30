import type { Metadata } from 'next';
import Link from 'next/link';
import { ProfilePhoto } from '@/components/professionals/profile-photo';
import { JsonLd } from '@repo/shared/components/json-ld';
import { Breadcrumbs } from '@repo/shared/components/breadcrumbs';
import { breadcrumbJsonLd } from '@repo/shared/schema';
import { ProfileCta } from '@/components/professionals/profile-cta';
import { ProfileSection } from '@/components/professionals/profile-section';
import { PublicationCards } from '@/components/professionals/publication-cards';
import { ADRIAN_PLANES_SITE_URL, NOTIFICAS_URL, UCU_URL, socialLinks } from '@/config/site';
import { ADRIAN_UCU_PUBLICATIONS } from '@/config/publications-adrian';
import { BAR_SAN_NICOLAS, getProfessionalBySlug } from '@/config/professionals';
import { getBlSiteSeoConfig } from '@/config/seo';
import { personJsonLd } from '@/lib/schema';

const profile = getProfessionalBySlug('adrian-bengolea')!;
const siteSeo = getBlSiteSeoConfig();
const canonical = `${siteSeo.siteUrl.replace(/\/$/, '')}/profesionales/adrian-bengolea`;

export const metadata: Metadata = {
  title: 'Adrián Bengolea | Abogado en San Nicolás | Bengolea & Lamas',
  description:
    'Dr. Adrián Bengolea. Abogado en San Nicolás. Director Ejecutivo de Usuarios y Consumidores Unidos (UCU), fundador de Notificas SRL. Defensa del consumidor, planes de ahorro y litigación civil y comercial.',
  alternates: { canonical },
  openGraph: {
    title: 'Adrián Bengolea | Abogado en San Nicolás | Bengolea & Lamas',
    description:
      'Dr. Adrián Bengolea. Abogado en San Nicolás. Director Ejecutivo de UCU, fundador de Notificas SRL. Defensa del consumidor, planes de ahorro y litigación civil y comercial.',
    url: canonical,
    images: [{ url: '/images/profesionales/adrian-bengolea.jpg', alt: 'Dr. Adrián Bengolea' }],
  },
};

const sameAs = [
  ADRIAN_PLANES_SITE_URL,
  UCU_URL,
  NOTIFICAS_URL,
  socialLinks.facebook,
].filter(Boolean);

export default function AdrianBengoleaProfilePage() {
  const jsonLd = personJsonLd({
    name: 'Adrián Bengolea',
    path: '/profesionales/adrian-bengolea',
    jobTitle: 'Abogado',
    description:
      'Abogado en San Nicolás. Director Ejecutivo de Usuarios y Consumidores Unidos (UCU) y fundador de Notificas SRL.',
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
              <ProfilePhoto
                src={profile.image}
                pending={profile.imageTodo}
                alt={profile.imageAlt}
                className="mx-auto aspect-[3/4] w-full max-w-sm lg:mx-0"
                imageClassName="object-top"
                sizes="(max-width: 1024px) 80vw, 360px"
                priority
              />
              <div>
                <h1 className="font-headline text-3xl font-normal text-foreground md:text-4xl">Dr. Adrián Bengolea</h1>
                <p className="mt-2 text-lg text-accent">Abogado</p>
                <p className="mt-3 text-sm leading-relaxed text-foreground/90">
                  Director Ejecutivo de{' '}
                  <a href={UCU_URL} className="text-accent hover:underline" rel="noopener noreferrer">
                    Usuarios y Consumidores Unidos (UCU)
                  </a>
                  . Fundador de{' '}
                  <a href={NOTIFICAS_URL} className="text-accent hover:underline" rel="noopener noreferrer">
                    Notificas SRL
                  </a>
                  .
                </p>
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
              provincia de Buenos Aires. Integra el Estudio Jurídico Bengolea & Lamas y es Director Ejecutivo de{' '}
              <a href={UCU_URL} className="text-accent hover:underline" rel="noopener noreferrer">
                Usuarios y Consumidores Unidos (UCU)
              </a>{' '}
              y fundador de{' '}
              <a href={NOTIFICAS_URL} className="text-accent hover:underline" rel="noopener noreferrer">
                Notificas SRL
              </a>
              . Desarrolla su práctica con orientación a la defensa de consumidores en conflictos individuales y
              colectivos, el asesoramiento y la litigación en materia civil y comercial.
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
              En el sitio de UCU publica materiales orientados a la defensa de consumidores y a la difusión de
              herramientas para abogados en derecho del consumidor.
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

          <ProfileSection title="Trayectoria y formación">
            <p>
              Abogado egresado de la Facultad de Derecho de la Universidad Nacional de Rosario (2000). Integra el
              Estudio Jurídico Bengolea desde febrero de 2000. Es asociado fundador y Director Ejecutivo de Usuarios y
              Consumidores Unidos (UCU) y fundador de Notificas SRL.
            </p>
            <p>
              Completó el Master en Asesoramiento Jurídico de Empresas de la Universidad Austral (Rosario) y posgrados
              en defensa del consumidor y procesos colectivos. Fue docente en cursos de posgrado sobre procesos
              colectivos y acciones de clase en la Universidad Nacional del Litoral y en la Universidad Católica
              Argentina.
            </p>
            <p>
              Participó como ponente y expositor en congresos y jornadas nacionales de derecho procesal y del consumidor
              y presidió la Comisión de Jóvenes Abogados del Departamento Judicial de San Nicolás (2003–2005). Cuenta
              con numerosas publicaciones doctrinales en derecho del consumidor, procesos colectivos y responsabilidad
              civil.
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
