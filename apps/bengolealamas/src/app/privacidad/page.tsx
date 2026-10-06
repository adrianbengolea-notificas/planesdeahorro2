import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell } from '@/components/page-shell';
import { formatStudioAddressLine, STUDIO_EMAIL } from '@/config/wix-brand';
import { blPageMetadata } from '@/lib/page-metadata';

export const metadata: Metadata = blPageMetadata({
  title: 'Política de privacidad',
  description:
    'Cómo el Estudio Jurídico Bengolea & Lamas trata los datos personales: consultas, formulario, chat y derechos según la Ley 25.326.',
  path: '/privacidad',
});

const LAST_UPDATED = '6 de octubre de 2026';

export default function PrivacidadPage() {
  return (
    <PageShell
      title="Política de privacidad"
      description="Tratamiento de datos personales en bengolealamas.com.ar."
      path="/privacidad"
      breadcrumbs={[{ label: 'Inicio', href: '/' }, { label: 'Privacidad' }]}
    >
      <div className="max-w-3xl space-y-8 text-sm leading-relaxed text-muted-foreground md:text-base">
        <p>Última actualización: {LAST_UPDATED}.</p>
        <p>
          Esta política describe cómo el Estudio Jurídico Bengolea & Lamas recopila y usa datos personales en este
          sitio. El contenido es divulgativo y no sustituye un dictamen sobre un caso concreto.
        </p>

        <section className="space-y-3" aria-labelledby="privacidad-responsable">
          <h2 id="privacidad-responsable" className="font-headline text-xl font-normal text-foreground md:text-2xl">
            1. Responsable
          </h2>
          <p>
            El responsable del tratamiento es el Estudio Jurídico Bengolea & Lamas, con domicilio en{' '}
            {formatStudioAddressLine()}. Correo:{' '}
            <a href={`mailto:${STUDIO_EMAIL}`} className="font-medium text-accent hover:underline">
              {STUDIO_EMAIL}
            </a>
            . También podés escribirnos por{' '}
            <Link href="/contacto" className="font-medium text-accent hover:underline">
              Contacto
            </Link>{' '}
            o{' '}
            <Link href="/contanos-tu-caso" className="font-medium text-accent hover:underline">
              Contanos tu caso
            </Link>
            .
          </p>
        </section>

        <section className="space-y-3" aria-labelledby="privacidad-datos">
          <h2 id="privacidad-datos" className="font-headline text-xl font-normal text-foreground md:text-2xl">
            2. Datos que podemos recopilar
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Identificación y contacto: nombre, correo, teléfono y el mensaje que envíes en el formulario.</li>
            <li>
              Relato de un conflicto y archivos que adjuntes en la consulta guiada (chat), para que un abogado del
              estudio los revise.
            </li>
            <li>
              Datos técnicos de navegación (por ejemplo IP, tipo de dispositivo y páginas visitadas) que genera el
              hosting y el funcionamiento del sitio.
            </li>
          </ul>
        </section>

        <section className="space-y-3" aria-labelledby="privacidad-fines">
          <h2 id="privacidad-fines" className="font-headline text-xl font-normal text-foreground md:text-2xl">
            3. Finalidades
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Responder consultas, turnos y el análisis preliminar de un caso.</li>
            <li>Prestar servicios profesionales si existe un vínculo de patrocinio o asesoramiento.</li>
            <li>Operar, proteger y mejorar el sitio.</li>
            <li>Cumplir obligaciones legales aplicables.</li>
          </ul>
        </section>

        <section className="space-y-3" aria-labelledby="privacidad-base">
          <h2 id="privacidad-base" className="font-headline text-xl font-normal text-foreground md:text-2xl">
            4. Base legal y secreto profesional
          </h2>
          <p>
            El tratamiento se basa en tu consentimiento, en medidas precontractuales o contractuales, y en intereses
            legítimos compatibles con la actividad del estudio. Cuando corresponda, rige el secreto profesional.
          </p>
        </section>

        <section className="space-y-3" aria-labelledby="privacidad-cesion">
          <h2 id="privacidad-cesion" className="font-headline text-xl font-normal text-foreground md:text-2xl">
            5. Conservación y encargados
          </h2>
          <p>
            Conservamos los datos el tiempo necesario para esas finalidades o el que exija la normativa. No vendemos
            datos personales. Podemos usar proveedores técnicos (alojamiento, correo, base de datos) que actúan como
            encargados, con obligaciones de confidencialidad y seguridad. El sitio se publica en infraestructura de
            Google Cloud / Firebase App Hosting.
          </p>
        </section>

        <section className="space-y-3" aria-labelledby="privacidad-derechos">
          <h2 id="privacidad-derechos" className="font-headline text-xl font-normal text-foreground md:text-2xl">
            6. Derechos
          </h2>
          <p>
            Conforme a la Ley 25.326 de Protección de los Datos Personales y normas complementarias, podés solicitar
            acceso, rectificación, actualización o supresión de tus datos, en la medida aplicable, escribiendo a{' '}
            <a href={`mailto:${STUDIO_EMAIL}`} className="font-medium text-accent hover:underline">
              {STUDIO_EMAIL}
            </a>
            .
          </p>
        </section>

        <section className="space-y-3" aria-labelledby="privacidad-cookies">
          <h2 id="privacidad-cookies" className="font-headline text-xl font-normal text-foreground md:text-2xl">
            7. Cookies
          </h2>
          <p>
            El sitio usa cookies o tecnologías similares necesarias para su funcionamiento (sesión, seguridad,
            preferencias técnicas). Podés limitarlas o bloquearlas desde el navegador; algunas funciones pueden dejar
            de andar.
          </p>
        </section>

        <section className="space-y-3" aria-labelledby="privacidad-cambios">
          <h2 id="privacidad-cambios" className="font-headline text-xl font-normal text-foreground md:text-2xl">
            8. Cambios
          </h2>
          <p>
            Podemos actualizar esta política. La fecha de revisión figura al inicio. El uso del sitio después de un
            cambio relevante implica el conocimiento de la versión vigente.
          </p>
        </section>
      </div>
    </PageShell>
  );
}
