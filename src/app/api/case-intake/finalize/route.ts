import { NextRequest, NextResponse } from 'next/server';
import { parseBlIntakeStructured, deliverBlCaseIntake } from '@/server/bl-case-intake-delivery';
import type { ChatMessage } from '@/lib/types';
import { ZodError } from 'zod';

function authOk(req: NextRequest): boolean {
  const secret = process.env.INTAKE_BRIDGE_SECRET?.trim();
  const auth = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '').trim();
  return Boolean(secret && auth === secret);
}

export async function POST(req: NextRequest) {
  if (!authOk(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const site = req.headers.get('x-intake-site')?.trim();
  if (site !== 'bengolea-lamas' && site !== 'bl') {
    return NextResponse.json({ error: 'Unsupported intake site' }, { status: 400 });
  }

  let body: { structuredData?: unknown; intakeId?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  try {
    const structuredData = parseBlIntakeStructured(body.structuredData);
    const delivery = await deliverBlCaseIntake(structuredData, {
      existingIntakeId: typeof body.intakeId === 'string' ? body.intakeId : undefined,
    });

    if (!delivery.persisted && !delivery.emailSent) {
      const message: ChatMessage = {
        id: `error-finalize-${Date.now()}`,
        role: 'system',
        content:
          'No pudimos registrar ni enviar tu consulta. Intentá de nuevo o usá el formulario de contacto.',
        submissionFailed: true,
        pendingSubmission: structuredData as unknown as Record<string, unknown>,
      };
      return NextResponse.json({ message });
    }

    if (!delivery.emailSent) {
      const message: ChatMessage = {
        id: `error-email-${Date.now()}`,
        role: 'system',
        content:
          'Tu consulta quedó registrada, pero el aviso por email falló. Podés reintentar el envío sin repetir el chat.',
        submissionFailed: true,
        pendingSubmission: structuredData as unknown as Record<string, unknown>,
        intakeId: delivery.intakeId,
      };
      return NextResponse.json({ message });
    }

    const message: ChatMessage = {
      id: `asistente-finalize-${Date.now()}`,
      role: 'assistant',
      content:
        'Listo: el resumen fue enviado al Estudio Bengolea & Lamas para su revisión. Si necesitamos más datos, te contactaremos.',
      isFinished: true,
      leadCaptured: true,
    };
    return NextResponse.json({ message });
  } catch (e) {
    if (e instanceof ZodError) {
      return NextResponse.json({ error: 'Invalid structuredData' }, { status: 400 });
    }
    console.error('[case-intake/finalize]', e);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
