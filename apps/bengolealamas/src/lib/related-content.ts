import { PRACTICE_AREAS, type PracticeAreaEntry } from '@/config/practice-areas';
import type { BlPublication } from '@/lib/bl-publications';

const AREA_NEEDLES: Record<string, string[]> = {
  'defensa-consumidor': ['consumidor', 'consumo', 'abusiv', 'punitivo', 'usuario'],
  bancos: ['banco', 'bancari', 'financ'],
  'bancos-fraude': ['fraude'],
  'bancos-debitos': ['debito', 'débito'],
  'bancos-debin': ['debin'],
  'bancos-tarjetas': ['tarjeta'],
  'bancos-habeas': ['habeas', 'veraz', 'crediticio'],
  'planes-ahorro': ['plan de ahorro', 'planes de ahorro', 'automotriz'],
  seguros: ['seguro', 'asegurador', 'siniestro', 'poliza', 'póliza'],
  'servicios-publicos': ['servicio público', 'servicios públicos', 'tarifa'],
  civil: ['civil', 'alquiler', 'contrato'],
  danos: ['daño', 'perjuicio', 'indemniz'],
  comercial: ['comercial', 'sociedad', 'mercantil', 'fideicomiso'],
  empresas: ['empresa', 'pyme'],
  administrativo: ['municipal', 'administrativ', 'tasa vial', 'comuna'],
  colectivas: ['colectiv'],
  salud: ['salud', 'prepaga', 'discapacidad', 'incapacidad', 'oslara', 'aca salud'],
  laboral: ['laboral', 'despido', 'sueldo'],
  familia: ['familia', 'alimento', 'divorcio', 'matrimonio', 'convivencial'],
  'medio-ambiente': ['ambiente', 'inundación', 'inundacion'],
  tributario: ['ganancia', 'tributar', 'impuesto', 'jubilacion', 'jubilación'],
  procesal: ['procesal', 'cautelar', 'autosatisfactiv', 'amparo'],
};

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function publicationHaystack(pub: BlPublication): string {
  return normalize(`${pub.title} ${pub.excerpt ?? ''} ${(pub.tags ?? []).join(' ')}`);
}

function areaScore(haystack: string, areaId: string): number {
  const needles = AREA_NEEDLES[areaId] ?? [];
  return needles.reduce((score, needle) => (haystack.includes(normalize(needle)) ? score + 1 : score), 0);
}

export function publicationsRelatedToArea(pubs: BlPublication[], areaId: string, limit = 3): BlPublication[] {
  return pubs
    .map((pub) => ({ pub, score: areaScore(publicationHaystack(pub), areaId) }))
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((row) => row.pub);
}

export function practiceAreasRelatedToPublication(pub: BlPublication, limit = 4): PracticeAreaEntry[] {
  const haystack = publicationHaystack(pub);
  return PRACTICE_AREAS.filter((area) => area.published)
    .map((area) => ({ area, score: areaScore(haystack, area.id) }))
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((row) => row.area);
}
