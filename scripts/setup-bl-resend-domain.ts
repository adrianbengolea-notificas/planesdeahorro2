/**
 * Crea el dominio bengolealamas.com.ar en Resend (hace falta una API key con
 * permiso full_access; las keys de solo envío no pueden crear dominios).
 * Uso: npx tsx scripts/setup-bl-resend-domain.ts
 */
import { config } from 'dotenv';
import { resolve } from 'node:path';
import { Resend } from 'resend';

config({ path: resolve(process.cwd(), '.env.local') });

const DOMAIN = 'bengolealamas.com.ar';
const FROM = `Bengolea & Lamas <estudio@${DOMAIN}>`;
const TO = 'abengolea1@gmail.com';
const REPLY_TO = `estudio@${DOMAIN}`;

async function main() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.error('Falta RESEND_API_KEY en .env.local');
    process.exit(1);
  }

  const resend = new Resend(apiKey);

  const listed = await resend.domains.list();
  if (listed.error) {
    console.error('No se pudieron listar dominios:', listed.error);
    process.exit(1);
  }

  const existing = (listed.data?.data ?? listed.data ?? []).find(
    (d: { name?: string }) => d.name === DOMAIN,
  ) as { id: string; name: string; status: string } | undefined;

  let domainId = existing?.id;
  if (existing) {
    console.log(`Dominio ya existía: ${existing.name} (${existing.status}) id=${existing.id}`);
  } else {
    const created = await resend.domains.create({ name: DOMAIN });
    if (created.error || !created.data) {
      console.error('No se pudo crear el dominio:', created.error);
      process.exit(1);
    }
    domainId = created.data.id;
    console.log(`Dominio creado: ${created.data.name} (${created.data.status}) id=${created.data.id}`);
  }

  const detail = await resend.domains.get(domainId!);
  if (detail.error || !detail.data) {
    console.error('No se pudo leer el dominio:', detail.error);
    process.exit(1);
  }

  console.log(`Estado: ${detail.data.status}`);
  console.log('Registros DNS (cargar en Wix, nameservers ns10/ns11.wixdns.net):');
  const records = (detail.data as { records?: Array<Record<string, unknown>> }).records ?? [];
  for (const rec of records) {
    console.log(
      JSON.stringify({
        record: rec.record,
        type: rec.type,
        name: rec.name,
        value: rec.value,
        priority: rec.priority ?? null,
        status: rec.status,
      }),
    );
  }

  console.log(`Enviando prueba a ${TO} desde ${FROM}…`);
  const sent = await resend.emails.send({
    from: FROM,
    to: [TO],
    reply_to: REPLY_TO,
    subject: 'Bengolea & Lamas — prueba de envío de notas',
    html: `
      <p>Hola Adrián,</p>
      <p>Esta es una prueba del envío de notas del estudio desde Resend.</p>
      <p>Remitente: <strong>Bengolea &amp; Lamas &lt;estudio@bengolealamas.com.ar&gt;</strong></p>
      <p>Si llegó, el dominio ya puede enviar. Si no, falta cargar los DNS en Wix.</p>
    `,
    text: 'Prueba de envío de notas del Estudio Bengolea & Lamas desde Resend.',
  });

  if (sent.error) {
    console.error('Envío falló:', sent.error);
    process.exit(2);
  }
  console.log('OK. email id:', sent.data?.id);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
