'use server';

import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(2),
  whatsapp: z.string().regex(/^[0-9]{10,15}$/),
  administrator: z.string().min(2),
  planStatus: z.enum(['al_dia', 'en_mora', 'renunciado', 'finalizado']),
  description: z.string().min(20).max(2000),
});

export async function submitCase(values: z.infer<typeof formSchema>): Promise<{ success: boolean; error?: string }> {
  const validatedFields = formSchema.safeParse(values);

  if (!validatedFields.success) {
    return { success: false, error: "Datos de formulario inválidos." };
  }

  try {
    // Aquí es donde se guardaría la información en Firestore.
    // Por ejemplo: await db.collection('cases').add(validatedFields.data);
    console.log('Caso recibido:', validatedFields.data);
    
    // Simula un pequeño retraso de red
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return { success: true };
  } catch (error) {
    console.error('Error al guardar el caso:', error);
    return { success: false, error: 'No se pudo procesar la solicitud en el servidor.' };
  }
}
