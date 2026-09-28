/** Contenido y rutas alineados al sitio Wix (bengolealamas.com.ar). */

export const STUDIO_ADDRESS = {
  street: 'Belgrano 174',
  city: 'San Nicolás de los Arroyos',
  province: 'Provincia de Buenos Aires',
} as const;

export const STUDIO_EMAIL = 'estudio@bengolealamas.com.ar';

export const STUDIO_PHONES = ['336-4434145', '336-4432628', '336-4455332'] as const;

export const STUDIO_WHATSAPP_DISPLAY = '336-4061333';

/** Enlace wa.me (Argentina, móvil). */
export const STUDIO_WHATSAPP_URL = 'https://wa.me/5493364061333';

export type HomeSlide = {
  id: string;
  title: string;
  image: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

export const HOME_SLIDES: HomeSlide[] = [
  {
    id: 'compromiso',
    title: 'Compromiso',
    image: '/brand/hero-compromiso.jpg',
    primaryCta: { label: 'Contacto', href: '/contacto' },
  },
  {
    id: 'equipo',
    title: 'Trabajo en equipo',
    image: '/brand/hero-equipo.jpg',
    primaryCta: { label: 'Publicaciones', href: '/publicaciones' },
  },
  {
    id: 'solvencia',
    title: 'Solvencia técnica',
    image: '/brand/hero-solvencia.jpg',
    primaryCta: { label: 'Solicitar turno', href: '/contacto' },
    secondaryCta: { label: 'Información', href: '/informacion' },
  },
  {
    id: 'experiencia',
    title: 'Experiencia',
    image: '/brand/hero-experiencia.jpg',
    primaryCta: { label: 'Información', href: '/informacion' },
  },
];

export const WIX_NAV = [
  { href: '/contacto', label: 'Contacto' },
  { href: '/consultas-online', label: 'Consultas online' },
  { href: '/publicaciones', label: 'Publicaciones' },
  { href: '/informacion', label: 'Información' },
] as const;

export const FOUNDERS = [
  {
    name: 'Carlos Alberto Bengolea',
    role: 'Socio Fundador',
    quote:
      'Para mi, nunca existieron causas chicas o menos importantes. A todas mis causas les pongo el mayor de los empeños. Es la única forma de trabajar que conozco.',
    image: '/brand/carlos-bengolea.jpg',
  },
  {
    name: 'Carlos Alberto Lamas',
    role: 'Socio',
    quote:
      'Vivo la abogacía como un acto de servicio hacia el prójimo y no como una fuente de ganancias.',
    image: '/brand/carlos-lamas.jpg',
  },
] as const;

export const INFORMACION_LEAD =
  'Desde sus inicios el Estudio Bengolea & Lamas se ha centrado en el compromiso constante en darle a su cliente un servicio jurídico de excelencia, con la más absoluta responsabilidad.';

export const INFORMACION_BODY = [
  'Somos un estudio jurídico con sede en San Nicolás de los Arroyos, orientado al asesoramiento y litigio en materia civil, comercial y de defensa del consumidor.',
  'Acompañamos a personas y empresas con criterio técnico, comunicación clara y estrategia procesal adecuada a cada conflicto.',
] as const;
