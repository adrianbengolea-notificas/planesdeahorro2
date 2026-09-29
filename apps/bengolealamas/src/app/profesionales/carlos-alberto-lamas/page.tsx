import type { Metadata } from 'next';
import { CoverImage } from '@/components/cover-image';
import { JsonLd } from '@repo/shared/components/json-ld';
import { Breadcrumbs } from '@repo/shared/components/breadcrumbs';
import { breadcrumbJsonLd } from '@repo/shared/schema';
import { ProfileCta } from '@/components/professionals/profile-cta';
import { ProfileSection } from '@/components/professionals/profile-section';
import { getBlSiteSeoConfig } from '@/config/seo';
import { personJsonLd } from '@/lib/schema';

const siteSeo = getBlSiteSeoConfig();
const path = '/profesionales/carlos-alberto-lamas';

export const metadata: Metadata = {
  title: 'Carlos Alberto Lamas | Abogado | Bengolea & Lamas',
  description: 'Carlos Alberto Lamas, socio del Estudio Jurídico Bengolea & Lamas en San Nicolás de los Arroyos.',
  alternates: { canonical: `${siteSeo.siteUrl.replace(/\/$/, '')}${path}` },
};

export default function CarlosAlbertoLamasPage() {
  const jsonLd = personJsonLd({
    name: 'Carlos Alberto Lamas',
    path,
    jobTitle: 'Abogado — Socio',
    description: 'Socio del Estudio Jurídico Bengolea & Lamas.',
    image: `${siteSeo.siteUrl.replace(/\/$/, '')}/images/profesionales/carlos-alberto-lamas.jpg`,
  });

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(siteSeo, [
          { name: 'Inicio', path: '/' },
          { name: 'Profesionales', path: '/profesionales' },
          { name: 'Carlos Alberto Lamas', path },
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
                { label: 'Carlos Alberto Lamas' },
              ]}
              className="mb-8 text-muted-foreground"
            />
            <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
              <CoverImage
                src="/images/profesionales/carlos-alberto-lamas.jpg"
                alt="Carlos Alberto Lamas"
                className="mx-auto aspect-square w-full max-w-xs"
                imageClassName="object-top grayscale"
                sizes="320px"
              />
              <div>
                <h1 className="font-headline text-3xl font-normal">Carlos Alberto Lamas</h1>
                <p className="mt-2 text-lg text-accent">Abogado — Socio</p>
              </div>
            </div>
          </div>
        </header>
        <div className="container mx-auto max-w-5xl space-y-10 px-4 py-12 md:px-8">
          <ProfileSection title="Perfil profesional">
            <p>
              Carlos Alberto Lamas integra el Estudio Jurídico Bengolea & Lamas como socio. En la web institucional del
              estudio se presenta su vocación de servicio hacia quienes confían sus conflictos al equipo jurídico.
            </p>
            <blockquote className="border-l-2 border-accent pl-4 font-headline text-base italic text-foreground">
              &ldquo;Vivo la abogacía como un acto de servicio hacia el prójimo y no como una fuente de
              ganancias.&rdquo;
            </blockquote>
          </ProfileSection>
          <ProfileSection title="Áreas de práctica">
            <p>
              Colabora en la labor litigiosa y de asesoramiento del estudio. Datos adicionales de formación, matrícula y
              especialidades se incorporarán cuando estén verificados en fuentes públicas.
            </p>
          </ProfileSection>
          <ProfileCta />
        </div>
      </article>
    </>
  );
}
