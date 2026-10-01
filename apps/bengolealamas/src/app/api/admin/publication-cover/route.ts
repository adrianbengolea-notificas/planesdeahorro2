import { NextRequest, NextResponse } from 'next/server';
import { requireAdminSession } from '@/firebase/admin';
import { savePublicationCover } from '@/lib/save-publication-cover';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

function isBlobFile(value: unknown): value is Blob & { name?: string; type: string } {
  return typeof value === 'object' && value !== null && typeof (value as Blob).arrayBuffer === 'function';
}

export async function POST(req: NextRequest) {
  const authz = req.headers.get('authorization');
  const token = authz?.match(/^Bearer\s+(.+)$/i)?.[1]?.trim();
  if (!token) {
    return NextResponse.json({ ok: false, error: 'Falta sesión de administrador.' }, { status: 401 });
  }

  try {
    await requireAdminSession(token);
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : 'No autorizado.' },
      { status: 401 },
    );
  }

  try {
    const form = await req.formData();
    const file = form.get('file');
    if (!isBlobFile(file) || file.size === 0) {
      return NextResponse.json({ ok: false, error: 'Seleccioná una imagen.' }, { status: 400 });
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    const saved = await savePublicationCover({
      buffer,
      mime: file.type || '',
      fileName: typeof file.name === 'string' ? file.name : 'portada.jpg',
    });
    return NextResponse.json({ ok: true, url: saved.url });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : 'No se pudo subir la imagen.' },
      { status: 500 },
    );
  }
}
