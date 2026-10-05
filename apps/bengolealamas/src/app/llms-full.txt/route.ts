import { buildLlmsFullTxt, LLM_TXT_HEADERS } from '@/lib/ai-discovery';

export const dynamic = 'force-static';

export async function GET() {
  const body = await buildLlmsFullTxt();
  return new Response(body, { headers: LLM_TXT_HEADERS });
}
