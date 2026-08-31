import Image from 'next/image';
import type { Metadata } from 'next';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Scale, FileText, Landmark, Users } from 'lucide-react';

import { JsonLd } from '@/components/json-ld';
import {
  absoluteUrl,
  BAR_ASSOCIATION,
  BAR_REGISTRATION,
  BAR_REGISTRATION_LABEL,
  buildPageMetadata,
  SITE_NAME,
} from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Sobre mí',
  description:
    `Dr. Adrián Bengolea, abogado matriculado en el ${BAR_ASSOCIATION} (${BAR_REGISTRATION}), con dedicación exclusiva a problemas y reclamos de planes de ahorro automotriz.`,
  path: '/sobre-mi',
  keywords: [
    'Dr. Adrián Bengolea',
    'abogado planes de ahorro Buenos Aires',
    'Colegio de Abogados de San Nicolás',
    'especialista problemas plan de ahorro',
  ],
});

const highlights = [
  {
    icon: Scale,
    label: 'Especialización exclusiva en planes de ahorro',
  },
  {
    icon: Landmark,
    label: BAR_REGISTRATION_LABEL,
  },
  {
    icon: FileText,
    label: 'Profundo conocimiento de jurisprudencia de la SCJBA',
  },
  {
    icon: Users,
    label: 'Trato directo, sin intermediarios',
  },
];

export default function AboutPage() {
  const portraitImage = PlaceHolderImages.find((img) => img.id === 'about-me-portrait');
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${absoluteUrl('/')}#person`,
    name: SITE_NAME,
    jobTitle: 'Abogado',
    description: `Abogado matriculado en el ${BAR_ASSOCIATION} (${BAR_REGISTRATION}), especializado en problemas de planes de ahorro automotriz y defensa del consumidor.`,
    url: absoluteUrl('/sobre-mi'),
    identifier: BAR_REGISTRATION,
    memberOf: {
      '@type': 'Organization',
      name: BAR_ASSOCIATION,
    },
    knowsAbout: [
      'Problemas de planes de ahorro',
      'Planes de ahorro automotriz',
      'Ley 24.240',
      'Ejecución prendaria',
    ],
  };

  return (
    <div className="flex flex-col">
      <JsonLd data={personJsonLd} />
      {/* ── Page header ── */}
      <div className="bg-primary text-primary-foreground py-14 md:py-20 relative overflow-hidden">
        <div className="absolute left-0 top-0 w-[3px] h-full bg-accent hidden md:block" />
        <div className="container mx-auto px-6 md:px-8">
          <p className="text-accent text-[11px] font-medium tracking-[0.3em] uppercase mb-3">
            El Profesional
          </p>
          <h1 className="font-headline text-4xl md:text-6xl font-bold leading-[1.05]">
            Dr. Adrián Bengolea
          </h1>
          <p className="text-white/65 mt-3 text-lg font-medium">
            Abogado — Especialista en Planes de Ahorro
          </p>
          <p className="text-white/50 mt-2 text-sm">
            {BAR_REGISTRATION_LABEL}
          </p>
          <div className="w-12 h-[2px] bg-accent mt-6" />
        </div>
      </div>

      {/* ── Content ── */}
      <div className="bg-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-5 gap-10 md:gap-16 items-start">

            {/* Photo */}
            <div className="md:col-span-2">
              <div className="aspect-[3/4] relative overflow-hidden border border-border">
                {portraitImage && (
                  <Image
                    src={portraitImage.imageUrl}
                    alt={portraitImage.description}
                    data-ai-hint={portraitImage.imageHint}
                    fill
                    className="object-cover"
                  />
                )}
              </div>

              {/* Highlights below photo */}
              <div className="mt-6 space-y-3">
                {highlights.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <Icon className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span>{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bio */}
            <div className="md:col-span-3">
              <div className="prose lg:prose-lg max-w-none dark:prose-invert prose-headings:font-headline prose-headings:text-primary">
                <p>
                  Soy abogado matriculado en el Colegio de Abogados de San Nicolás (Tomo 8, Folio 84), Provincia de Buenos Aires, con una profunda vocación por la defensa de los derechos de las personas frente a las grandes corporaciones. Desde el inicio de mi carrera, enfoqué mi práctica en el complejo mundo de los contratos de consumo, encontrando en los planes de ahorro un campo donde la asimetría de poder deja a miles de familias en situación de vulnerabilidad.
                </p>
                <p>
                  Mi misión es simple: nivelar el campo de juego. A través del estudio constante de la legislación y la jurisprudencia, desarrollo estrategias legales innovadoras y efectivas para proteger el patrimonio de mis clientes.
                </p>
                <h3>Especialización y Enfoque</h3>
                <p>
                  A diferencia de los estudios jurídicos generalistas, mi práctica está 100% dedicada a conflictos derivados de planes de ahorro. Esta ultra-especialización me permite estar al día con cada cambio normativo y cada nuevo fallo judicial, ofreciendo un servicio de la más alta calidad con un profundo conocimiento de las tácticas empleadas por las administradoras.
                </p>
                <p>
                  Creo en un trato directo y transparente. Cada cliente habla directamente conmigo, y cada caso es tratado con la dedicación y la seriedad que merece.
                </p>
              </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8"
                >
                  <Link href="/evaluar-caso">Contanos tu caso</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-primary/30 text-primary"
                >
                  <Link href="/problemas">Ver problemas frecuentes</Link>
                </Button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
