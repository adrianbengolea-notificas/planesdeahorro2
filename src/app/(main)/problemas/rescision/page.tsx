import { ProblemPageLayout } from '@/components/problem-page-layout';
import type { Metadata } from 'next';
import { getProblemBySlug } from '@/lib/data';
import { buildPageMetadata } from '@/lib/seo';

const problem = getProblemBySlug('rescision')!;

export const metadata: Metadata = buildPageMetadata({
  title: problem.seoTitle,
  description: problem.seoDescription,
  path: '/problemas/rescision',
  keywords: problem.keywords,
});

export default function RescisionPage() {
  return (
    <ProblemPageLayout slug="rescision" title="Rescisión del Contrato">
      <p>
        La rescisión de un plan de ahorro es otro conflicto típico: puede ser una decisión del suscriptor (renuncia) o una medida de la administradora, generalmente por falta de pago. En ambos casos hay derechos concretos sobre el dinero aportado.
      </p>

      <h2 className="font-headline">¿Puedo renunciar a mi plan de ahorro y recuperar la plata?</h2>
      <p>
        Sí. Podés renunciar en cualquier momento. Conviene comunicarlo de forma fehaciente (carta documento u otro medio con constancia) para que quede prueba.
      </p>
      <p>
        No perdés el dinero de las cuotas puras. El reintegro no es inmediato: se efectúa al finalizar la vida del grupo, actualizado al valor del vehículo en ese momento.
      </p>

      <h2 className="font-headline">¿Qué pasa si la administradora me rescindió por falta de pago?</h2>
      <p>
        Si dejás de pagar un número determinado de cuotas (en muchos contratos, 3 consecutivas o 4 alternadas), la administradora puede rescindir. Ese acto también debe notificarse.
      </p>
      <p>
        El contrato se extingue, pero conservás el derecho a la devolución de las cuotas puras al final del plan. Las multas o penalidades que suelen aplicar por esa rescisión, muchas veces, son abusivas y se pueden impugnar.
      </p>

      <h2 className="font-headline">Problemas frecuentes al salirte del plan</h2>
      <ul>
        <li><strong>Negativa a recibir la renuncia:</strong> se intima a la administradora para que la acepte.</li>
        <li><strong>Penalidades excesivas:</strong> se cuestiona la multa y se pide su nulidad como cláusula abusiva.</li>
        <li><strong>Falta de devolución:</strong> al cierre del grupo, si no liquidan ni pagan, se inicia el reclamo de haberes.</li>
      </ul>
      <p>
        Ya sea que quieras salirte o que la administradora te haya dejado fuera, conviene asesorarte para proteger el capital invertido.
      </p>
    </ProblemPageLayout>
  );
}
