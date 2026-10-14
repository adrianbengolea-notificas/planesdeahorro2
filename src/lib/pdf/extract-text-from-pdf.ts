import 'server-only';

import { DOMMatrix, ImageData, Path2D } from '@napi-rs/canvas';

/** Límite alineado con `serverActions.bodySizeLimit` en next.config. */
export const MAX_PDF_BYTES = 12 * 1024 * 1024;

let pdfParseModule: Promise<typeof import('pdf-parse')> | undefined;

/**
 * pdf.js necesita estas APIs del navegador aun cuando solo extraemos texto.
 * La importación dinámica garantiza que existan antes de evaluar `pdf-parse`.
 * La importación directa de @napi-rs/canvas también hace que Next/App Hosting
 * incluya el paquete y su binario nativo en el bundle de producción.
 */
function loadPdfParse() {
  const runtimeGlobal = globalThis as unknown as Record<string, unknown>;
  runtimeGlobal.DOMMatrix ??= DOMMatrix;
  runtimeGlobal.ImageData ??= ImageData;
  runtimeGlobal.Path2D ??= Path2D;
  pdfParseModule ??= import('pdf-parse');
  return pdfParseModule;
}

export async function extractTextFromPdfBuffer(buffer: Buffer): Promise<string> {
  const { PDFParse } = await loadPdfParse();
  const parser = new PDFParse({ data: buffer });
  try {
    const result = await parser.getText();
    return (result.text ?? '').replace(/\u0000/g, '').trim();
  } finally {
    await parser.destroy();
  }
}

export function classifyPdfError(err: unknown): string {
  const errorName =
    typeof err === 'object' && err !== null && 'name' in err
      ? String((err as { name?: unknown }).name ?? '')
      : '';
  if (errorName === 'PasswordException') {
    return 'El PDF está protegido con contraseña. Subí una versión sin contraseña o desbloqueala antes.';
  }
  if (errorName === 'InvalidPDFException') {
    return 'No se pudo leer el archivo como PDF válido. Comprobá que no esté dañado.';
  }
  if (err instanceof Error && /password|encrypt/i.test(err.message)) {
    return 'El PDF parece estar protegido. Probá con otra copia del documento.';
  }
  return 'No se pudo extraer texto del PDF. Probá con otro archivo o copiá el texto manualmente.';
}
