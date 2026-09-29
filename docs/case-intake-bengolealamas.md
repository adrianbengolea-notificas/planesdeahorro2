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

## Pendiente

- Reintento de email sin re-ejecutar toda la conversación (hoy reintenta el último turno vía IA).
- Adjuntos de documentación (fase 2).
- Extraer componente compartido `<LegalIntakeChat practice="..." />` entre ambos sitios.
- Pruebas E2E en staging con Resend y Gemini antes de deploy B&L.
