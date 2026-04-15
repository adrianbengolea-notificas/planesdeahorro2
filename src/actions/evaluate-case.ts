'use server';

import { evaluateCase } from '@/ai/flows/case-evaluation-flow';
import type { ChatMessage, CaseEvaluation } from '@/lib/types';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getSdks } from '@/firebase';
import { sendCaseEvaluationEmail } from '@/lib/send-email';

// Esta función se encarga de la lógica del servidor:
// 1. Llama al flujo de IA para obtener la siguiente respuesta.
// 2. Si la conversación ha terminado, guarda los datos en Firestore y envía el email.
export async function continueConversation(history: ChatMessage[]): Promise<ChatMessage> {
  // Llama al flujo de Genkit para obtener la respuesta del asistente
  const assistantResponse = await evaluateCase(history);

  // Si el flujo de IA indica que la conversación ha terminado
  if (assistantResponse.isFinished) {
    // Para obtener los datos estructurados, necesitamos hacer una llamada final a la IA
    // pidiéndole explícitamente el JSON completo.
    const finalFlowInput = {
      history: [...history, assistantResponse].map(msg => ({ role: msg.role, content: msg.content })),
    };
    
    // Llamamos de nuevo al flujo, pero esta vez esperamos el structuredData
    const { output: finalResult } = await ai.getRunner('caseEvaluationPrompt')(finalFlowInput);

    if (finalResult?.structuredData) {
      const caseData = finalResult.structuredData as CaseEvaluation;
      
      try {
        // Guardar en Firestore
        const { firestore } = getSdks();
        const caseEvaluationsCollection = collection(firestore, 'case_evaluations');
        await addDoc(caseEvaluationsCollection, {
          ...caseData,
          createdAt: serverTimestamp(),
          status: 'pendiente de revisión',
        });

        // Enviar email
        await sendCaseEvaluationEmail(caseData);

      } catch (error) {
        console.error("Error al guardar en Firestore o enviar el email:", error);
        // Devolvemos un mensaje de error al usuario en la interfaz de chat
        return {
          id: `error-${Date.now()}`,
          role: 'system',
          content: 'Hubo un error al procesar tu caso. Por favor, intenta de nuevo más tarde.',
        };
      }
    } else {
        console.error("Error: La conversación finalizó pero no se generaron datos estructurados.");
         return {
          id: `error-data-${Date.now()}`,
          role: 'system',
          content: 'Hubo un problema al finalizar la recopilación de datos. Por favor, intenta de nuevo.',
        };
    }
  }

  return assistantResponse;
}

// Re-exportar 'ai' para que la acción del servidor pueda acceder a él.
// Esto es un workaround para asegurar que la instancia de 'ai' esté disponible aquí.
import { ai } from '@/ai/genkit';
