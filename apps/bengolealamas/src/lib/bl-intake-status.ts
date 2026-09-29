export const BL_INTAKE_STATUSES = [
  'pendiente de revisión',
  'en análisis',
  'aceptado',
  'rechazado',
  'derivado',
  'cerrado',
] as const;

export type BlIntakeStatus = (typeof BL_INTAKE_STATUSES)[number];

export const BL_INTAKE_STATUS_LABELS: Record<BlIntakeStatus, string> = {
  'pendiente de revisión': 'Pendiente de revisión',
  'en análisis': 'En análisis',
  aceptado: 'Aceptado',
  rechazado: 'Rechazado',
  derivado: 'Derivado',
  cerrado: 'Cerrado',
};

export function isBlIntakeStatus(value: string): value is BlIntakeStatus {
  return (BL_INTAKE_STATUSES as readonly string[]).includes(value);
}

export function formatBlIntakeStatus(status: string | undefined): string {
  if (!status) return '—';
  if (isBlIntakeStatus(status)) return BL_INTAKE_STATUS_LABELS[status];
  return status;
}

export type BlCaseIntakeRow = {
  id: string;
  createdAt: string | null;
  status: string;
  archived: boolean;
  read: boolean;
  assignedTo: string;
  internalNotes: string;
  nombre: string;
  email: string;
  telefono: string;
  localidad: string;
  provincia: string;
  areaJuridicaProbable: string;
  contraparte: string;
  resumenCaso: string;
  cronologiaRelevante: string;
  documentacionDisponible: string;
  reclamosRealizados: string;
  notificacionesRecibidas: string;
  plazosOUrgencias: string;
  pretensionConsultante: string;
  observacionesIA: string;
  transcripcionResumen: string;
  posibleUrgencia: boolean;
  detalleUrgencia: string;
};
