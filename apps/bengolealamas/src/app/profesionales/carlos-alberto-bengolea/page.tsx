import type { Metadata } from 'next';
import { CoverImage } from '@/components/cover-image';
import { JsonLd } from '@repo/shared/components/json-ld';
import { Breadcrumbs } from '@repo/shared/components/breadcrumbs';
import { breadcrumbJsonLd } from '@repo/shared/schema';
import { ProfileCta } from '@/components/professionals/profile-cta';
import { ProfileSection } from '@/components/professionals/profile-section';
import { INFORMACION_LEAD } from '@/config/wix-brand';
import { getBlSiteSeoConfig } from '@/config/seo';
import { personJsonLd } from '@/lib/schema';

const siteSeo = getBlSiteSeoConfig();
const path = '/profesionales/carlos-alberto-bengolea';

export const metadata: Metadata = {
  title: 'Carlos Alberto Bengolea | Abogado | Bengolea & Lamas',
  description:
    'Carlos Alberto Bengolea, socio fundador del Estudio Jurídico Bengolea & Lamas en San Nicolás de los Arroyos.',
  alternates: { canonical: `${siteSeo.siteUrl.replace(/\/$/, '')}${path}` },
};

export default function CarlosAlbertoBengoleaPage() {
  const jsonLd = personJsonLd({
    name: 'Carlos Alberto Bengolea',
    path,
    jobTitle: 'Abogado — Socio fundador',
    description: 'Socio fundador del Estudio Jurídico Bengolea & Lamas.',
    image: `${siteSeo.siteUrl.replace(/\/$/, '')}/images/profesionales/carlos-alberto-bengolea.jpg`,
  });

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(siteSeo, [
          { name: 'Inicio', path: '/' },
          { name: 'Profesionales', path: '/profesionales' },
          { name: 'Carlos Alberto Bengolea', path },
        ])}
      />
      <JsonLd data={jsonLd} />
      <article>
        <header className="border-b border-border bg-background">
          <div className="container mx-auto max-w-5xl px-4 py-8 md:px-8">
            <Breadcrumbs
              items={[
                { label: 'Inicio', href: '/' },
                { label: 'Profesionales', href: '/profesionales' },
                { label: 'Carlos Alberto Bengolea' },
              ]}
              className="mb-8 text-muted-foreground"
            />
            <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
              <CoverImage
                src="/images/profesionales/carlos-alberto-bengolea.jpg"
                alt="Carlos Alberto Bengolea"
                className="mx-auto aspect-square w-full max-w-xs"
                imageClassName="object-top grayscale"
                sizes="320px"
              />
              <div>
                <h1 className="font-headline text-3xl font-normal">Carlos Alberto Bengolea</h1>
                <p className="mt-2 text-lg text-accent">Abogado — Socio fundador</p>
              </div>
            </div>
          </div>
        </header>
        <div className="container mx-auto max-w-5xl space-y-10 px-4 py-12 md:px-8">
          <ProfileSection title="Perfil profesional">
            <p>
              Carlos Alberto Bengolea es socio fundador del Estudio Jurídico Bengolea & Lamas. En la presentación
              institucional del estudio se destaca su compromiso con el servicio jurídico y la defensa de los clientes
              en litigios y asesoramiento.
            </p>
            <blockquote className="border-l-2 border-accent pl-4 font-headline text-base italic text-foreground">
              &ldquo;Para mi, nunca existieron causas chicas o menos importantes. A todas mis causas les pongo el mayor
              de los empeños. Es la única forma de trabajar que conozco.&rdquo;
            </blockquote>
            <p className="text-sm">{INFORMACION_LEAD}</p>
          </ProfileSection>
          <ProfileSection title="Áreas de práctica">
            <p>
              Su actuación se vincula con la tradición litigiosa del estudio en materia civil y comercial. Los detalles
              de especialidades, formación académica y matrícula se publicarán cuando estén confirmados en fuentes
              verificables.
            </p>
          </ProfileSection>
          <ProfileCta />
        </div>
      </article>
    </>
  );
}
