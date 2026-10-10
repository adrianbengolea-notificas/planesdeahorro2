import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell } from '@/components/page-shell';
import { STUDIO_HOURS } from '@/config/gbp';
import { PRACTICE_AREAS } from '@/config/practice-areas';
import { formatStudioAddressLine, STUDIO_EMAIL, STUDIO_WHATSAPP_URL } from '@/config/wix-brand';
import { blPageMetadata } from '@/lib/page-metadata';

export const metadata: Metadata = blPageMetadata({
  title: 'Consultas online',
  description:
    'Consulta jurídica online con Bengolea & Lamas desde cualquier lugar del país. Chat inicial, formulario, WhatsApp y correo del estudio en San Nicolás.',
  path: '/consultas-online',
  keywords: ['consulta jurídica online', 'abogados San Nicolás consulta', 'consulta online Bengolea Lamas'],
});

const featured = PRACTICE_AREAS.filter((area) =>
  ['defensa-consumidor', 'bancos', 'civil', 'danos', 'salud', 'laboral'].includes(area.id),
);

export default function ConsultasOnlinePage() {
  return (
    <PageShell
      title="Consultas online"
      description="Canal remoto del estudio: una consulta inicial para ordenar el conflicto y, si corresponde, un turno con un abogado."
      path="/consultas-online"
      breadcrumbs={[{ label: 'Inicio', href: '/' }, { label: 'Consultas online' }]}
    >
      <article className="max-w-3xl space-y-6 text-sm leading-relaxed text-muted-foreground md:text-base">
        <p>
          Podés evacuar una consulta o pedir un turno desde cualquier lugar del país. El estudio está en{' '}
          {formatStudioAddressLine()}. Atención {STUDIO_HOURS.display.toLowerCase()}, con turno previo.
        </p>
        <p>
          El canal más ágil es{' '}
          <Link href="/contanos-tu-caso" className="font-medium text-accent hover:underline">
            Contanos tu caso
          </Link>
          : un asistente ordena los hechos y deja un resumen para que lo revise un abogado. No reemplaza el
          asesoramiento profesional. También podés usar el{' '}
          <Link href="/contacto" className="font-medium text-accent hover:underline">
            formulario de contacto
          </Link>
          ,{' '}
          <a href={STUDIO_WHATSAPP_URL} className="font-medium text-accent hover:underline" rel="noopener noreferrer" target="_blank">
            WhatsApp
          </a>{' '}
          o el correo{' '}
          <a href={`mailto:${STUDIO_EMAIL}`} className="font-medium text-accent hover:underline">
            {STUDIO_EMAIL}
          </a>
          .
        </p>

        <section className="border-t border-border pt-8" aria-labelledby="consultas-areas">
          <h2 id="consultas-areas" className="font-headline text-xl font-normal text-foreground md:text-2xl">
            Materias frecuentes
          </h2>
          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
            {featured.map((area) => (
              <li key={area.id}>
                <Link href={area.path} className="font-medium text-accent hover:underline">
                  {area.title}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-4">
            El mapa completo está en{' '}
            <Link href="/areas-de-practica" className="font-medium text-accent hover:underline">
              Áreas de práctica
            </Link>
            .
          </p>
        </section>
      </article>
    </PageShell>
  );
}
