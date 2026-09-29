# Chat de recepción — Bengolea & Lamas

## Arquitectura

- **Frontend:** `apps/bengolealamas` → `/contanos-tu-caso`, componente `CaseIntakeChat`, botón flotante.
- **Backend IA + email:** app raíz (Adrian / planes de ahorro) — mismo Genkit/Gemini y Resend que `evaluate-case`.
- **Puente HTTP:** `POST /api/case-intake/continue` con cabeceras `Authorization: Bearer <INTAKE_BRIDGE_SECRET>` y `X-Intake-Site: bengolea-lamas`.

## Variables de entorno

### App raíz (donde corre Genkit y Resend)

```env
GEMINI_API_KEY=...
RESEND_API_KEY=...
RESEND_FROM_EMAIL=...   # opcional
CASE_INTAKE_EMAIL=abengolea1@gmail.com
INTAKE_BRIDGE_SECRET=...   # secreto compartido, largo y aleatorio
BL_PUBLIC_APP_URL=https://bengolealamas.com.ar   # enlace “Abrir en admin” del mail
```

### App `apps/bengolealamas`

```env
INTAKE_BRIDGE_URL=https://adrianbengolea.com.ar/api/case-intake/continue
INTAKE_BRIDGE_SECRET=...   # mismo valor que en la app raíz
```

Desarrollo local (Adrian en :9002):

```env
INTAKE_BRIDGE_URL=http://localhost:9002/api/case-intake/continue
```

## Prompt

`src/ai/flows/case-intake-bl-flow.ts` — multi-área, consentimiento, urgencias, resumen estructurado.

## Persistencia y admin

Al cerrar el chat, el backend de Adrian guarda el caso en Firestore (`bl_case_intakes`) y envía el mail. El panel está en `bengolealamas.com.ar/admin/consultas` (mismas cuentas `admin_users`).

## Email

`src/lib/send-bl-intake-email.ts` — asunto `Nueva consulta web — [Nombre] — [Área probable]`, con botón al admin si el caso se persistió.

## Seguridad

- Rate limit por IP en la API (40 req/h).
- Tamaño máximo de mensajes y historial.
- Secreto de puente; sin claves en el cliente.

## Reintento sin IA

`POST /api/case-intake/finalize` — mismo auth que `continue`. Body:

```json
{ "structuredData": { ... }, "intakeId": "opcional-si-ya-está-en-firestore" }
```

El cliente B&L usa `retryCaseIntakeDelivery` cuando `submissionFailed` trae `pendingSubmission`.

## App Hosting (Firebase)

1. **Secreto compartido** (una sola vez):  
   `firebase apphosting:secrets:set INTAKE_BRIDGE_SECRET`  
   Otorgar acceso al backend **planesdeahorro2** y **bengolealamas** (Environment → Secret).

2. **Backend planesdeahorro2** (`apphosting.yaml` raíz): `GEMINI_API_KEY`, `RESEND_API_KEY`, `INTAKE_BRIDGE_SECRET`, `BL_PUBLIC_APP_URL`, `CASE_INTAKE_EMAIL`.

3. **Backend bengolealamas** (`apps/bengolealamas/apphosting.yaml`): `INTAKE_BRIDGE_URL`, `INTAKE_BRIDGE_SECRET`, más `NEXT_PUBLIC_*`.

4. Redeploy de **ambos** backends tras cambiar secretos.

## Smoke test local

Con Adrian en `:9002` y variables en el shell:

```bash
npm run smoke:bl-intake
```

Opcional: `SMOKE_RUN_AI=1` para un turno real contra Gemini.

## Adjuntos (fase 2 — implementado)

- Hasta 3 archivos (PDF/JPG/PNG/WebP, 4 MB) en `/contanos-tu-caso`.
- Subida vía Admin SDK a `bl-intake-attachments/{sessionId}/…`.
- Se envían al cerrar el chat (`attachmentPaths` en continue/finalize) y aparecen en `/admin/consultas`.

## Pendiente
- Extraer componente compartido `<LegalIntakeChat practice="..." />` entre ambos sitios.
