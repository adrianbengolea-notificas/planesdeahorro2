'use server';
/**
 * @fileOverview Flujo de Genkit para la evaluación de casos de planes de ahorro.
 * Este flujo impulsa una conversación de chat para recopilar información y
 * devuelve un resumen estructurado del caso.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import type { ChatMessage } from '@/lib/types';

// Esquema para la entrada del flujo (historial del chat)
const CaseEvaluationInputSchema = z.object({
  history: z.array(
    z.object({
      role: z.enum(['user', 'assistant']),
      content: z.string(),
    })
  ),
});

// Esquema para la salida ESTRUCTURADA final del flujo
const CaseEvaluationOutputSchema = z.object({
  nombre: z.string().describe('Nombre y apellido completos del cliente.'),
  whatsapp: z.string().describe('Número de WhatsApp del cliente, solo dígitos.'),
  email: z.string().email().describe('Dirección de correo electrónico del cliente.'),
  ciudad: z.string().describe('Ciudad de residencia del cliente.'),
  provincia: z.string().describe('Provincia de residencia del cliente.'),
  administradora: z.string().describe('Nombre de la administradora del plan de ahorro.'),
  estadoPlan: z
    .enum(['activo', 'rescindido', 'terminado', 'no_sabe'])
    .describe('Estado actual del plan de ahorro.'),
  adjudicado: z
    .enum(['si', 'no', 'no_sabe'])
    .describe('Indica si el plan fue adjudicado.'),
  vehiculoRecibido: z
    .enum(['si', 'no', 'no_sabe'])
    .describe('Indica si el cliente recibió el vehículo.'),
  grupoOrden: z.string().describe("Número de grupo y orden, o 'no sabe' si no lo conoce."),
  problemaPrincipal: z.string().describe('Explicación del problema principal en palabras del cliente.'),
  resumenHechos: z.string().describe('Un resumen claro y conciso de los hechos del caso, redactado por la IA.'),
  documentacionDisponible: z
    .array(z.string())
    .describe('Lista de documentos que el cliente confirma tener.'),
  urgencia: z
    .enum(['alta', 'media', 'baja'])
    .describe('Nivel de urgencia detectado por la IA.'),
  motivoUrgencia: z
    .string()
    .describe('Motivo específico por el cual se asignó el nivel de urgencia.'),
  posibleCategoriaJuridica: z.string().describe('Sugerencia de la IA sobre la categoría legal del caso.'),
  proximaAccionSugerida: z.string().describe('Sugerencia de la IA para el próximo paso a seguir por el estudio jurídico.'),
});
export type CaseEvaluation = z.infer<typeof CaseEvaluationOutputSchema>;

// Esquema para la salida de la conversación (la respuesta del chat)
const ConversationOutputSchema = z.object({
  nextMessage: z.string().describe("El siguiente mensaje del asistente para continuar la conversación."),
  quickReplies: z.array(z.string()).optional().describe("Sugerencias de respuestas rápidas para el usuario."),
  isFinished: z.boolean().describe("Indica si el asistente ha recopilado toda la información y la conversación ha terminado."),
  structuredData: CaseEvaluationOutputSchema.optional().describe("El objeto JSON con todos los datos recopilados. Solo se proporciona cuando isFinished es true."),
});

// El prompt principal que guía al asistente de IA
const caseEvaluationPrompt = ai.definePrompt({
  name: 'caseEvaluationPrompt',
  input: { schema: CaseEvaluationInputSchema },
  output: { schema: ConversationOutputSchema },
  model: 'googleai/gemini-2.5-pro',
  system: `Eres un asistente jurídico virtual llamado 'Juris-IA', especializado en la primera fase de evaluación de reclamos sobre planes de ahorro en Argentina. Tu objetivo es conversar con el usuario para recopilar toda la información necesaria de manera amable, clara y estructurada.

  **Tu Personalidad:**
  - **Tono:** Cordial, respetuoso y empático. Usa español rioplatense neutro (ej: "vos" en lugar de "tú", "sos" en lugar de "eres").
  - **Claridad:** Haz preguntas cortas, una a la vez o en bloques muy pequeños. Evita la jerga legal.
  - **Guía:** Acompaña al usuario paso a paso. Si una respuesta es incompleta, repregunta con amabilidad. No exijas datos, sugiérelos.
  
  **Tu Misión:**
  1.  **Bienvenida:** Empieza con un saludo cordial y explica que harás algunas preguntas para entender el caso.
  2.  **Recopilación de Datos:** Sigue un flujo lógico para obtener la siguiente información, pero sé flexible si el usuario la da en otro orden:
      - **Datos Personales:** Nombre y apellido, WhatsApp, email, ciudad y provincia.
      - **Datos del Plan:** Marca/Administradora, estado actual (activo, rescindido, terminado, no sabe), si fue adjudicado, si recibió el vehículo, grupo y orden.
      - **Problema Principal:** Pide una explicación con sus palabras. Luego, sugiere categorías para clasificarlo.
      - **Documentación:** Pregunta qué documentos tiene (contrato, liquidación, recibos, cartas documento, emails, etc.).
      - **Urgencia:** Indaga sobre intimaciones recientes, amenazas de secuestro, o plazos legales cercanos.
  3.  **Análisis y Estructuración:** Mientras conversas, ve ordenando la información internamente para completar el `structuredData` final.
  4.  **Finalización:** Cuando tengas TODOS los datos necesarios, cambia `isFinished` a \`true\` y completa el objeto `structuredData`. Tu `nextMessage` final debe ser un mensaje de agradecimiento y confirmación. NO inventes datos. Si un dato no fue proporcionado, déjalo como un string vacío o un valor por defecto ('no sabe', 'no', etc.), pero asegúrate de haberlo preguntado antes.

  **Reglas Clave:**
  - **NO des asesoramiento legal:** No puedes dar opiniones, conclusiones jurídicas ni estrategias. Tu rol es SOLO recolectar y ordenar información. Puedes decir frases como "Entiendo, el abogado revisará este punto en detalle."
  - **Una pregunta a la vez:** No abrumes al usuario.
  - **Usa `quickReplies`:** Ofrece opciones clickeables cuando sea apropiado (ej: para el estado del plan, sí/no, categorías de problemas).
  - **Detecta urgencia:** Si el usuario menciona "secuestro", "intimación", "carta documento", "audiencia" o "plazo", asegúrate de que `urgencia` sea 'alta' y explica por qué en `motivoUrgencia`.
  - **Flujo de conversación:**
      - Empieza con el saludo.
      - Sigue con datos personales (nombre primero).
      - Luego, datos del plan.
      - Después, el problema (texto libre y luego categorización).
      - Continúa con la documentación.
      - Finaliza con la urgencia.
      - Por último, un mensaje de cierre y `isFinished: true`.
  - **Resumen de Hechos:** El campo `resumenHechos` es CRÍTICO. Debes crearlo tú, como IA, redactando un párrafo claro, conciso y bien estructurado que resuma toda la situación del cliente para que el abogado pueda entender el caso de un vistazo.
  - **`isFinished`:** SOLO pon `isFinished` en `true` en el ÚLTIMO mensaje, cuando ya tengas toda la data y estés listo para devolver el `structuredData` completo. En todos los demás turnos de la conversación, debe ser `false`.
  `,
  prompt: `Historial de la conversación:
  {{#each history}}
  - {{role}}: {{{content}}}
  {{/each}}
  
  Basado en el historial, genera tu próxima respuesta.`,
});

// El flujo de Genkit que se llamará desde la acción del servidor
const evaluateCaseFlow = ai.defineFlow(
  {
    name: 'evaluateCaseFlow',
    inputSchema: CaseEvaluationInputSchema,
    outputSchema: ConversationOutputSchema,
  },
  async (input) => {
    const { output } = await caseEvaluationPrompt(input);
    if (!output) {
      throw new Error('La IA no generó una respuesta.');
    }
    return output;
  }
);

// Función exportada que envuelve el flujo
export async function evaluateCase(
  history: ChatMessage[]
): Promise<ChatMessage> {
  // Mapea el historial del chat al formato que espera el prompt de Genkit
  const flowInput = {
    history: history.map(msg => ({ role: msg.role, content: msg.content })).filter(msg => msg.role !== 'system'),
  };

  const result = await evaluateCaseFlow(flowInput);

  return {
    id: `asistente-${Date.now()}`,
    role: 'assistant',
    content: result.nextMessage,
    quickReplies: result.quickReplies,
    isFinished: result.isFinished,
    // El structuredData se manejará en la acción del servidor cuando isFinished sea true
  };
}
