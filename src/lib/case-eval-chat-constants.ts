/**
 * Mensaje inicial del flujo de recopilación de caso (web y WhatsApp vía NotificasHub).
 */
export const CASE_EVAL_INITIAL_ASSISTANT_CONTENT =
  'Hola, soy el asistente virtual del estudio del Dr. Adrián Bengolea. Te voy a hacer algunas preguntas para recopilar y ordenar tu relato; el Dr. Bengolea analizará tu situación. Atendemos a residentes en la Provincia de Buenos Aires. Contame con tus palabras qué te está pasando con tu plan de ahorro — no hace falta usar términos jurídicos; podés ser breve o detallar lo que consideres importante.';

/** Sin botones de categoría en el primer mensaje: priorizamos el relato libre (en la web también hay dictado por micrófono). */
export const CASE_EVAL_INITIAL_QUICK_REPLIES = [] as const;
