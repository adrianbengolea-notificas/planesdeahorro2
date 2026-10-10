/** Preguntas institucionales — solo hechos públicos verificados (docs/fuentes-profesionales.md). */

export type StudioFaq = {
  question: string;
  answer: string;
};

export const HOME_IDENTITY = {
  kicker: 'Abogados en San Nicolás de los Arroyos',
  h1: 'Estudio Jurídico Bengolea & Lamas',
  lead:
    'Estudio jurídico con sede en Belgrano 174, San Nicolás de los Arroyos. Asesoramiento y litigio en derecho civil, comercial y defensa del consumidor, para personas y empresas de la región.',
} as const;

export const STUDIO_FAQS: StudioFaq[] = [
  {
    question: '¿Dónde está el Estudio Jurídico Bengolea & Lamas?',
    answer:
      'El domicilio es Belgrano 174, San Nicolás de los Arroyos (CP 2900), Provincia de Buenos Aires, Argentina.',
  },
  {
    question: '¿En qué materias trabaja el estudio?',
    answer:
      'Trabaja en derecho civil, comercial y defensa del consumidor, y también en daños, bancos, seguros, empresas, laboral, familia, administrativo, tributario, acciones colectivas, salud y cuestiones procesales. Cada área tiene ficha propia en Áreas de práctica.',
  },
  {
    question: '¿Cómo se contacta al estudio?',
    answer:
      'Por el formulario de contacto, el correo estudio@bengolealamas.com.ar, los teléfonos 336-4434145, 336-4432628 y 336-4455332, o WhatsApp 336-4061333. También se puede iniciar una consulta desde Contanos tu caso.',
  },
  {
    question: '¿Cuál es el horario de atención?',
    answer:
      'Lunes a viernes, de 8:30 a 12:20 y de 17:00 a 20:00. Se atiende con turno previo.',
  },
  {
    question: '¿Quiénes integran el equipo?',
    answer:
      'El equipo público incluye a Carlos Alberto Bengolea (socio fundador), Carlos Alberto Lamas (socio, in memoriam), el Dr. Adrián Bengolea e Ignacio Goñi Bengolea. Los perfiles están en la sección Profesionales.',
  },
  {
    question: '¿Atienden conflictos de planes de ahorro automotriz?',
    answer:
      'Sí. El estudio atiende esos conflictos. El contenido especializado (problemas frecuentes, fallos y consultas dedicadas) se publica en adrianbengolea.com.ar, para no duplicar el mismo material en ambos dominios. En este sitio, la página institucional es /planes-de-ahorro.',
  },
  {
    question: '¿Asesoran a empresas de la región?',
    answer:
      'Sí. El estudio brinda asesoramiento y litigio a personas y a pequeñas y medianas empresas de San Nicolás y la zona. Cuando el caso lo requiere, trabaja con alianzas en otras especialidades.',
  },
  {
    question: '¿La información del sitio reemplaza un dictamen jurídico?',
    answer:
      'No. El contenido es divulgativo y describe el enfoque del estudio. Cada caso requiere evaluación concreta; la consulta se canaliza por contacto o por Contanos tu caso.',
  },
];

export const HOME_FAQS = STUDIO_FAQS.slice(0, 4);
