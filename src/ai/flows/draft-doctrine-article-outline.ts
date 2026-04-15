'use server';
/**
 * @fileOverview This file implements a Genkit flow for drafting an initial outline
 * for a legal doctrine article based on a provided topic or keywords.
 *
 * - draftDoctrineArticleOutline - A function to generate a doctrine article outline.
 * - DraftDoctrineArticleOutlineInput - The input type for the draftDoctrineArticleOutline function.
 * - DraftDoctrineArticleOutlineOutput - The return type for the draftDoctrineArticleOutline function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const DraftDoctrineArticleOutlineInputSchema = z.object({
  topicOrKeywords: z
    .string()
    .describe(
      'The topic or keywords for the legal doctrine article for which an outline is to be generated.'
    ),
});
export type DraftDoctrineArticleOutlineInput = z.infer<
  typeof DraftDoctrineArticleOutlineInputSchema
>;

const DraftDoctrineArticleOutlineOutputSchema = z.object({
  outline: z
    .string()
    .describe('A detailed outline for the legal doctrine article, formatted in markdown.'),
});
export type DraftDoctrineArticleOutlineOutput = z.infer<
  typeof DraftDoctrineArticleOutlineOutputSchema
>;

export async function draftDoctrineArticleOutline(
  input: DraftDoctrineArticleOutlineInput
): Promise<DraftDoctrineArticleOutlineOutput> {
  return draftDoctrineArticleOutlineFlow(input);
}

const draftDoctrineArticleOutlinePrompt = ai.definePrompt({
  name: 'draftDoctrineArticleOutlinePrompt',
  input: { schema: DraftDoctrineArticleOutlineInputSchema },
  output: { schema: DraftDoctrineArticleOutlineOutputSchema },
  prompt: `Eres un asistente experto en derecho y redacción jurídica. Tu tarea es crear un esquema detallado y coherente para un artículo de doctrina legal.
El esquema debe ser completo, bien estructurado y relevante para el tema o las palabras clave proporcionadas. Incluye secciones y subsecciones lógicas, como introducción, desarrollo de puntos clave, análisis de jurisprudencia (si aplica), conclusiones y posibles referencias.

Formatea el esquema utilizando markdown, con encabezados y listas para una fácil lectura.

Tema o Palabras Clave: {{{topicOrKeywords}}}`,
});

const draftDoctrineArticleOutlineFlow = ai.defineFlow(
  {
    name: 'draftDoctrineArticleOutlineFlow',
    inputSchema: DraftDoctrineArticleOutlineInputSchema,
    outputSchema: DraftDoctrineArticleOutlineOutputSchema,
  },
  async (input) => {
    const { output } = await draftDoctrineArticleOutlinePrompt(input);
    return output!;
  }
);
