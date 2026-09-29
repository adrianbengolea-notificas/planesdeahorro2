import { z } from 'zod';

export const BlIntakeStructuredSchema = z.object({
  nombre: z.string(),
  email: z.string(),
  telefono: z.string(),
  localidad: z.string(),
  provincia: z.string(),
  areaJuridicaProbable: z.string(),
  contraparte: z.string(),
  resumenCaso: z.string(),
  cronologiaRelevante: z.string(),
  documentacionDisponible: z.string(),
  reclamosRealizados: z.string(),
  notificacionesRecibidas: z.string(),
  plazosOUrgencias: z.string(),
  pretensionConsultante: z.string(),
  observacionesIA: z.string(),
  transcripcionResumen: z.string(),
  posibleUrgencia: z.boolean(),
  detalleUrgencia: z.string(),
  consentimientoDatos: z.boolean(),
});

export type BlIntakeStructured = z.infer<typeof BlIntakeStructuredSchema>;

export const BlConversationOutputSchema = z.object({
  nextMessage: z.string(),
  quickReplies: z.array(z.string()).optional(),
  isFinished: z.boolean(),
  structuredData: BlIntakeStructuredSchema.optional(),
});

export type BlConversationOutput = z.infer<typeof BlConversationOutputSchema>;
