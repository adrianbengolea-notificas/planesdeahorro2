# ⚠️ Root directory en Firebase App Hosting

## Configuración correcta (backend `bengolealamas`)

| Campo | Valor |
|--------|--------|
| Root directory | **`apps/bengolealamas`** |
| Rama | `main` |
| Build | `npm run build` dentro de esa carpeta (Next.js B&L) |

Este directorio incluye su propio **`package-lock.json`** y dependencias `file:../../packages/*`.

Adrian (`planesdeahorro2`) usa root **`.`** (raíz del repo).

El build usa `output: standalone` y `postbuild` copia `public/` al bundle (sin eso, logo/fotos del carrusel dan **404** en App Hosting).

Variables en Environment (o `apphosting.yaml`):

| Variable | Uso |
|----------|-----|
| `NEXT_PUBLIC_SITE_ID` | `bl` |
| `NEXT_PUBLIC_APP_URL` | `https://bengolealamas.com.ar` (no usar `*.hosted.app` en canonicals) |
| `INTAKE_BRIDGE_URL` | `https://adrianbengolea.com.ar/api/case-intake/continue` |
| `INTAKE_BRIDGE_SECRET` | Secreto compartido con backend **planesdeahorro2** (ver `docs/case-intake-bengolealamas.md`) |
| `RESEND_API_KEY` | Secreto Resend (mismo que Adrian, o uno de la cuenta). Crear: `firebase apphosting:secrets:set RESEND_API_KEY` |
| `RESEND_BL_FROM` | Remitente de notas a listas: `estudio@bengolealamas.com.ar` (verificar el dominio en Resend + DNS en Wix) |
| `RESEND_BL_REPLY_TO` | Respuestas de esos envíos. Default: `estudio@bengolealamas.com.ar` |

El chat con IA **no** corre en este backend: llama al puente en la app Adrian.

Panel admin: `/admin` (consultas, publicaciones y listas de mail). Usa el mismo proyecto Firebase y `admin_users`. Login con **email/contraseña** o **Google** (Firebase Console → Authentication → Sign-in method → Google habilitado; dominios autorizados: `localhost`, dominio `hosted.app` del deploy y `bengolealamas.com.ar`). Tras el primer login con Google, ejecutá `npx tsx scripts/grant-admin.ts tu@gmail.com` si el UID cambió respecto a la cuenta solo-email. En App Hosting alcanza ADC; en local, las mismas credenciales de Admin SDK que Adrian (`FIREBASE_SERVICE_ACCOUNT_PATH` o JSON). Después del cambio de reglas: `firebase deploy --only firestore:rules`.

**No** configures root `.` con `APP_SITE_ID=bl` ni `GOOGLE_NODE_RUN_SCRIPTS=build:bl`: el deploy de `05cf4a8` falla porque el adaptador Next.js de App Hosting no encuentra el artefacto en la raíz del repo.

Si el build falla por lockfile: confirmá que `apps/bengolealamas/package-lock.json` está en GitHub y volvé a desplegar.

## Desarrollo local

```powershell
cd apps\bengolealamas
npm ci
npm run dev
```

O desde la raíz: `npm run dev:bl` (requiere `npm ci` previo en `apps/bengolealamas`).
