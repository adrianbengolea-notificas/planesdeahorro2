import { SHORT_NAME, SITE_NAME } from '@/config/site';
import { STUDIO_ADDRESS, STUDIO_EMAIL, STUDIO_PHONES, studioPhoneE164 } from '@/config/wix-brand';

/**
 * Coordenadas de la ficha de Google Maps del estudio (Belgrano 174).
 * Fuente: listado público del lugar; no inventar otro pin.
 */
export const STUDIO_GEO = {
  latitude: -33.329067,
  longitude: -60.2194,
} as const;

export function studioMapsEmbedUrl(): string {
  const q = encodeURIComponent(`${STUDIO_ADDRESS.street}, ${STUDIO_ADDRESS.city}, Buenos Aires`);
  return `https://maps.google.com/maps?q=${q}&z=17&hl=es&output=embed`;
}

export function studioGeoIcbm(): string {
  return `${STUDIO_GEO.latitude}, ${STUDIO_GEO.longitude}`;
}

/** Confirmado por el estudio (2026-10-05): lun–vie mañana y tarde. */
export const STUDIO_HOURS = {
  days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as const,
  slots: [
    { opens: '08:30', closes: '12:20' },
    { opens: '17:00', closes: '20:00' },
  ],
  display: 'Lunes a viernes, 8:30 a 12:20 y 17:00 a 20:00',
  gbpMorning: '8:30–12:20',
  gbpAfternoon: '17:00–20:00',
} as const;

export function studioHoursJsonLd() {
  return STUDIO_HOURS.slots.map((slot) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [...STUDIO_HOURS.days],
    opens: slot.opens,
    closes: slot.closes,
  }));
}

/**
 * Texto para actualizar la ficha de Google Business Profile.
 * La ficha ya existe (reseñas públicas). El sitio no puede “crear” el perfil:
 * hay que reclamarlo/editarlo en business.google.com con la cuenta del estudio.
 */
export const GBP_PROFILE = {
  businessName: SITE_NAME,
  alternateName: SHORT_NAME,
  primaryCategory: 'Abogado',
  additionalCategories: ['Bufete de abogados', 'Asesoría jurídica'],
  website: 'https://bengolealamas.com.ar',
  primaryPhone: studioPhoneE164(STUDIO_PHONES[0]),
  phones: STUDIO_PHONES.map(studioPhoneE164),
  email: STUDIO_EMAIL,
  addressLine: `${STUDIO_ADDRESS.street}`,
  city: STUDIO_ADDRESS.city,
  region: 'Buenos Aires',
  postalCode: STUDIO_ADDRESS.postalCode,
  country: 'AR',
  mapsHoursNote: STUDIO_HOURS.display,
  description:
    'Estudio jurídico en Belgrano 174, San Nicolás de los Arroyos. Asesoramiento y litigio en derecho civil, comercial y defensa del consumidor. También atendemos daños y perjuicios, conflictos bancarios, seguros y empresas de la región. Lunes a viernes, 8:30 a 12:20 y 17:00 a 20:00, con turno previo.',
  services: [
    'Defensa del consumidor',
    'Derecho civil',
    'Daños y perjuicios',
    'Conflictos bancarios',
    'Derecho comercial',
    'Seguros',
    'Asesoramiento a empresas',
  ],
  fromTheBusiness:
    'Atención en San Nicolás de los Arroyos, lunes a viernes de 8:30 a 12:20 y de 17:00 a 20:00, con turno por teléfono, WhatsApp o el formulario del sitio. La información de la web es divulgativa y no reemplaza un dictamen.',
} as const;
