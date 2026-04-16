'use server';

import { 
  summarizeLegalRuling, 
  type SummarizeLegalRulingInput, 
  type SummarizeLegalRulingOutput 
} from '@/ai/flows/summarize-legal-ruling-flow';
import { 
  draftDoctrineArticleOutline, 
  type DraftDoctrineArticleOutlineInput, 
  type DraftDoctrineArticleOutlineOutput 
} from '@/ai/flows/draft-doctrine-article-outline';

export async function summarizeRulingAction(
  input: SummarizeLegalRulingInput
): Promise<SummarizeLegalRulingOutput> {
  return await summarizeLegalRuling(input);
}

export async function draftOutlineAction(
  input: DraftDoctrineArticleOutlineInput
): Promise<DraftDoctrineArticleOutlineOutput> {
  return await draftDoctrineArticleOutline(input);
}
