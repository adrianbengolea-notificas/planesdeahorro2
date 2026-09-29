import { NextRequest, NextResponse } from 'next/server';
import { processBlCaseIntakeConversation } from '@/server/case-intake-bl-conversation';
import type { ChatMessage } from '@/lib/types';

const MAX_BODY_BYTES = 120_000;
const MAX_MESSAGE_LEN = 8_000;
const RATE_WINDOW_MS = 60 * 60 * 1000;
const RATE_MAX = 40;

const hits = new Map<string, { count: number; resetAt: number }>();

function clientKey(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  );
}

function rateLimit(key: string): boolean {
  const now = Date.now();
  const entry = hits.get(key);
  if (!entry || now > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_MAX) return false;
  entry.count += 1;
  return true;
}

function sanitizeHistory(raw: unknown): ChatMessage[] | null {
  if (!Array.isArray(raw)) return null;
  const out: ChatMessage[] = [];
  for (const item of raw) {
    if (!item || typeof item !== 'object') return null;
    const role = (item as { role?: string }).role;
    const content = (item as { content?: string }).content;
    if (role !== 'user' && role !== 'assistant' && role !== 'system') return null;
    if (typeof content !== 'string' || content.length > MAX_MESSAGE_LEN) return null;
    out.push({
      id: typeof (item as { id?: string }).id === 'string' ? (item as { id: string }).id : `m-${out.length}`,
      role,
      content: content.trim(),
    });
  }
  if (out.length > 80) return null;
  return out;
}

export async function POST(req: NextRequest) {
  const secret = process.env.INTAKE_BRIDGE_SECRET?.trim();
  const auth = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '').trim();
  if (!secret || auth !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const site = req.headers.get('x-intake-site')?.trim();
  if (site !== 'bengolea-lamas' && site !== 'bl') {
    return NextResponse.json({ error: 'Unsupported intake site' }, { status: 400 });
  }

  const key = clientKey(req);
  if (!rateLimit(key)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const contentLength = Number(req.headers.get('content-length') ?? '0');
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: 'Payload too large' }, { status: 413 });
  }

  let body: { history?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const history = sanitizeHistory(body.history);
  if (!history?.length) {
    return NextResponse.json({ error: 'Invalid history' }, { status: 400 });
  }

  const message = await processBlCaseIntakeConversation(history);
  return NextResponse.json({ message });
}
