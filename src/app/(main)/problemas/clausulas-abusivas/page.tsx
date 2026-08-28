import { ProblemPageLayout } from '@/components/problem-page-layout';
import type { Metadata } from 'next';
import { getProblemBySlug } from '@/lib/data';
import { buildPageMetadata } from '@/lib/seo';

const problem = getProblemBySlug('clausulas-abusivas')!;

export const metadata: Metadata = buildPageMetadata({
  title: problem.seoTitle,
  description: problem.seoDescription,
  path: '/problemas/clausulas-abusivas',
  keywords: problem.keywords,
});

export default function ClausulasAbusivasPage() {
  return (
    <ProblemPageLayout slug="clausulas-abusivas" title="Cláusulas Abusivas">
      <p>
        Los contratos de plan de ahorro son de adhesión: el consumidor no negocia, acepta o rechaza lo que impone la administradora. Esa desigualdad explica gran parte de los problemas de planes de ahorro y da lugar a cláusulas abusivas.
      </p>
      <p>
        Una cláusula es abusiva cuando, contra la buena fe, causa un desequilibrio importante en perjuicio del consumidor. La Ley de Defensa del Consumidor N.º 24.240 establece que esas cláusulas se tienen por no escritas.
      </p>

      <h2 className="font-headline">¿Qué cláusulas abusivas son comunes en un plan de ahorro?</h2>
      <ul>
        <li><strong>Ajustes unilaterales del precio:</strong> permiten cambiar el precio de lista del vehículo sin justificación clara.</li>
        <li><strong>Gastos de administración y sellados:</strong> cargos excesivos o de concepto opaco.</li>
        <li><strong>Seguros impuestos:</strong> obligación de contratar con compañías vinculadas, a precios por encima del mercado.</li>
        <li><strong>Penalidades por renuncia:</strong> multas desproporcionadas para quien se sale del plan.</li>
        <li><strong>Prórroga de jurisdicción:</strong> obligan a litigar en el domicilio de la administradora y dificultan el acceso a la justicia.</li>
        <li><strong>Plazos de entrega ambiguos:</strong> permiten demorar el auto sin consecuencias.</li>
      </ul>

      <h2 className="font-headline">¿Cómo se anula una cláusula abusiva del plan de ahorro?</h2>
      <p>
        No se anulan solas. Hace falta que un juez, a pedido del consumidor, las declare nulas en el caso concreto.
      </p>
      <ol>
        <li><strong>Análisis del contrato:</strong> se revisan el contrato y los anexos.</li>
        <li><strong>Reclamo extrajudicial:</strong> se intima a la administradora para que no aplique la cláusula.</li>
        <li><strong>Demanda:</strong> se pide la nulidad y, si pagaste de más, el reintegro con daños.</li>
      </ol>
      <p>
        Cuestionar estas cláusulas es la vía para reequilibrar el contrato y proteger al suscriptor, la parte más débil.
      </p>
    </ProblemPageLayout>
  );
}
