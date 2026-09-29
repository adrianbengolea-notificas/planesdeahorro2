export const CASE_INTAKE_COPY = {
  pageTitle: 'Contanos tu caso',
  intro:
    'Nuestro asistente puede ayudarte a ordenar la información inicial de tu consulta. Te hará algunas preguntas sobre lo ocurrido y preparará un resumen para que un abogado del Estudio Bengolea & Lamas pueda analizarlo.',
  disclaimer:
    'El asistente no reemplaza el asesoramiento jurídico profesional ni emite una opinión definitiva sobre tu caso.',
  privacy:
    'Los datos proporcionados serán utilizados para analizar la consulta y contactarte. El envío de información no implica aceptación del caso ni constituye por sí mismo una relación abogado-cliente.',
  primaryCta: 'Contar mi caso',
  altCta: 'Analizar mi consulta',
  floatLabel: 'Contanos tu caso',
} as const;

export const CASE_INTAKE_INITIAL_MESSAGE = {
  id: 'inicio',
  role: 'assistant' as const,
  content:
    'Hola, soy el asistente inicial del Estudio Bengolea & Lamas. Contame brevemente qué pasó, con tus palabras. Después te haré algunas preguntas para ordenar la información.',
};
