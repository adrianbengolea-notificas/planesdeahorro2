# Baseline producción — sitio Adrian (pre multisite)

Punto de rollback antes de agregar `apps/bengolealamas` y `packages/*`.

## Git

| Campo | Valor |
|--------|--------|
| **Commit** | `ac92756d45f8da8bf45310ddab6c5a12d08dcb97` |
| **Tag de rollback** | `baseline-adrian-pre-multisite-ac92756` |
| **Restaurar código** | `git checkout baseline-adrian-pre-multisite-ac92756` (o el commit anterior a los commits de multisite) |

## Firebase

| Campo | Valor |
|--------|--------|
| **Proyecto** | `planesdeahorro-77c3e` (`.firebaserc` → `default`) |
| **App Hosting backend** | `planesdeahorro2` (`firebase.json` → `apphosting.backendId`) |
| **rootDir deploy Adrian** | `.` (raíz del repo) |
| **Firestore / Storage** | Reglas en `firestore.rules`, `storage.rules` |

## Dominio

| Campo | Valor |
|--------|--------|
| **Producción** | `https://adrianbengolea.com.ar` |
| **Canonical host** | apex (`adrianbengolea.com.ar`); `www` → apex vía `src/middleware.ts` (308) |

## Variables de entorno (Adrian)

Documentadas en `.env.example` (raíz). Críticas en producción:

- `NEXT_PUBLIC_APP_URL` — URL canónica (obligatoria en prod)
- Secretos App Hosting: `GEMINI_API_KEY`, `OPENAI_API_KEY`, `RESEND_API_KEY`, `NOTIFICASHUB_*` (`apphosting.yaml`)
- Admin SDK en runtime: credenciales de servicio (App Hosting / `FIREBASE_SERVICE_ACCOUNT_*` local)
- Opcionales públicas: `NEXT_PUBLIC_GOOGLE_ADS_ID`, `NEXT_PUBLIC_WHATSAPP_*`

## Build y deploy (Adrian — sin cambios de esta fase)

```bash
npm install
npm run build
npm run start          # puerto default Next (3000) o dev en 9002: npm run dev
```

Deploy Adrian (igual que antes): Firebase App Hosting asociado al backend `planesdeahorro2` con **rootDir = raíz del repositorio**. No usar el `firebase.json` dentro de `apps/bengolealamas` para Adrian.

## Verificación build baseline (2026-09-28)

Comando: `npm run build` en la raíz.

- **Resultado:** exit code 0
- **Next.js:** 15.5.9
- **First Load JS shared:** ~102 kB
- **Home `/`:** ~249 kB First Load JS
- **Middleware:** ~33.6 kB
- **Warnings:** OpenTelemetry/Genkit (jaeger) en trace de importación — preexistentes
- **Nota build local:** sin credenciales Admin SDK, sitemap/listados SEO de doctrina/fallos pueden loguear advertencia; en App Hosting con SA funciona

## Qué no debe cambiar al rollback

- Rutas públicas bajo `src/app/`
- `firebase.json` / `apphosting.yaml` de la raíz (backend `planesdeahorro2`)
- Reglas Firestore/Storage desplegadas
- DNS de `adrianbengolea.com.ar`
