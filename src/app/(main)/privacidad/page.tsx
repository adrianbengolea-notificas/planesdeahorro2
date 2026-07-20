import type { Metadata } from 'next';
import Link from 'next/link';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Política de Privacidad',
  description:
    'Cómo tratamos los datos personales en el sitio del Dr. Adrián Bengolea: finalidades, bases legales, derechos ARCO y contacto según la normativa argentina.',
  path: '/privacidad',
});

const lastUpdated = '20 de julio de 2026';

export default function PrivacidadPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm text-muted-foreground">Última actualización: {lastUpdated}</p>
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mt-2">
            Política de Privacidad
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Esta política describe cómo se recopilan, usan y protegen los datos personales en el sitio
            web del Dr. Adrián Bengolea.
          </p>

          <div className="prose prose-neutral dark:prose-invert max-w-none mt-10">
            <h2 className="font-headline text-xl md:text-2xl text-foreground">1. Responsable</h2>
            <p>
              El responsable del tratamiento es el Dr. Adrián Bengolea, abogado matriculado en la
              Provincia de Buenos Aires, República Argentina. Para consultas sobre privacidad puede
              escribirnos a través de los canales de contacto del sitio o la sección{' '}
              <Link href="/evaluar-caso">Contanos tu caso</Link>.
            </p>

            <h2 className="font-headline text-xl md:text-2xl text-foreground mt-10">
              2. Datos que podemos recopilar
            </h2>
            <p>Según el uso del sitio, pueden tratarse:</p>
            <ul>
              <li>Datos de identificación y contacto (nombre, correo, teléfono).</li>
              <li>Información que usted nos envía al evaluar o consultar un caso.</li>
              <li>
                Datos técnicos de navegación (dirección IP, tipo de dispositivo, páginas visitadas)
                mediante herramientas de medición o publicidad, cuando estén habilitadas.
              </li>
            </ul>

            <h2 className="font-headline text-xl md:text-2xl text-foreground mt-10">
              3. Finalidades
            </h2>
            <ul>
              <li>Responder consultas y gestionar el análisis preliminar de su situación.</li>
              <li>Prestar servicios profesionales cuando exista vínculo contractual.</li>
              <li>Mejorar el sitio, la seguridad y la experiencia de uso.</li>
              <li>Cumplir obligaciones legales aplicables.</li>
            </ul>

            <h2 className="font-headline text-xl md:text-2xl text-foreground mt-10">
              4. Base legal y confidencialidad
            </h2>
            <p>
              El tratamiento se basa en su consentimiento, en la ejecución de medidas
              precontractuales o contractuales, y en intereses legítimos compatibles con la
              actividad profesional, sin perjuicio del secreto profesional cuando corresponda.
            </p>

            <h2 className="font-headline text-xl md:text-2xl text-foreground mt-10">
              5. Conservación y cesiones
            </h2>
            <p>
              Conservamos los datos el tiempo necesario para las finalidades indicadas o el que
              exija la normativa. No vendemos datos personales. Podemos recurrir a proveedores
              técnicos (hosting, correo, analítica) que actúan como encargados del tratamiento bajo
              obligaciones de confidencialidad y seguridad.
            </p>

            <h2 className="font-headline text-xl md:text-2xl text-foreground mt-10">6. Derechos</h2>
            <p>
              Conforme a la Ley 25.326 de Protección de los Datos Personales y normas
              complementarias, usted puede solicitar acceso, rectificación, actualización o
              supresión de sus datos, en la medida aplicable. Para ejercer estos derechos, contáctenos
              por los medios del sitio.
            </p>

            <h2 className="font-headline text-xl md:text-2xl text-foreground mt-10">7. Cookies</h2>
            <p>
              El sitio puede utilizar cookies o tecnologías similares necesarias para su
              funcionamiento y, en su caso, para medición o publicidad. Puede configurar su navegador
              para limitar o bloquear cookies.
            </p>

            <h2 className="font-headline text-xl md:text-2xl text-foreground mt-10">8. Cambios</h2>
            <p>
              Podemos actualizar esta política. La fecha de la última revisión figura al inicio de
              esta página. El uso continuado del sitio tras cambios relevantes implica conocimiento
              de la versión vigente.
            </p>

            <h2 className="font-headline text-xl md:text-2xl text-foreground mt-10">
              9. Relación con los Términos
            </h2>
            <p>
              Esta política se complementa con los{' '}
              <Link href="/terminos">Términos y Condiciones de Uso</Link> del sitio.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
