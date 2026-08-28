import { buildLlmsFullTxt, LLM_TXT_HEADERS } from '@/lib/ai-discovery';

export async function GET() {
  const body = await buildLlmsFullTxt();
  return new Response(body, { headers: LLM_TXT_HEADERS });
}
