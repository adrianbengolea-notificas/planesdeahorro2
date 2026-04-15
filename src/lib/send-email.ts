'use server';
import { Resend } from 'resend';
import type { CaseEvaluation } from '@/lib/types';

// Asegúrate de tener la variable de entorno RESEND_API_KEY en tu archivo .env
const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = 'abengolea1@gmail.com';
const FROM_EMAIL = 'onboarding@resend.dev'; // Resend requiere un dominio verificado. `onboarding@resend.dev` es para pruebas.

export async function sendCaseEvaluationEmail(caseData: CaseEvaluation) {
  const subject = `Nueva evaluación de caso – Plan de ahorro – ${caseData.nombre} – ${caseData.administradora}`;

  const body = `
    <h1>Nueva Evaluación de Caso Recibida</h1>
    <p>Se ha recibido una nueva consulta a través del asistente de evaluación de JurisPlan.</p>
    
    <h2>Datos del Cliente</h2>
    <ul>
      <li><strong>Nombre:</strong> ${caseData.nombre}</li>
      <li><strong>WhatsApp:</strong> ${caseData.whatsapp}</li>
      <li><strong>Email:</strong> ${caseData.email}</li>
      <li><strong>Ciudad/Provincia:</strong> ${caseData.ciudad}, ${caseData.provincia}</li>
    </ul>

    <h2>Datos del Plan</h2>
    <ul>
      <li><strong>Administradora:</strong> ${caseData.administradora}</li>
      <li><strong>Estado del Plan:</strong> ${caseData.estadoPlan}</li>
      <li><strong>Adjudicado:</strong> ${caseData.adjudicado}</li>
      <li><strong>Vehículo Recibido:</strong> ${caseData.vehiculoRecibido}</li>
      <li><strong>Grupo y Orden:</strong> ${caseData.grupoOrden || 'No especificado'}</li>
    </ul>

    <h2>Resumen del Caso</h2>
    <ul>
      <li><strong>Problema Principal:</strong> ${caseData.problemaPrincipal}</li>
      <li><strong>Resumen de Hechos por IA:</strong>
        <p>${caseData.resumenHechos}</p>
      </li>
    </ul>
    
    <h2>Análisis de IA</h2>
    <ul>
      <li><strong>Nivel de Urgencia:</strong> ${caseData.urgencia}</li>
      <li><strong>Motivo de Urgencia:</strong> ${caseData.motivoUrgencia || 'N/A'}</li>
      <li><strong>Documentación Disponible:</strong> ${caseData.documentacionDisponible.join(', ')}</li>
      <li><strong>Posible Categoría Jurídica:</strong> ${caseData.posibleCategoriaJuridica}</li>
      <li><strong>Próxima Acción Sugerida:</strong> ${caseData.proximaAccionSugerida}</li>
    </ul>
  `;

  try {
    const { data, error } = await resend.emails.send({
      from: `JurisPlan <${FROM_EMAIL}>`,
      to: [TO_EMAIL],
      subject: subject,
      html: body,
    });

    if (error) {
      console.error('Error sending email:', error);
      // En un caso real, aquí podrías reintentar o notificar a un sistema de monitoreo.
      return { success: false, error: 'Failed to send email' };
    }

    console.log('Email sent successfully:', data);
    return { success: true };
  } catch (exception) {
    console.error('Exception sending email:', exception);
    return { success: false, error: 'An unexpected error occurred' };
  }
}
