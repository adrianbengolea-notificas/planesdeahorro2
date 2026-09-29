# ⚠️ Root directory en Firebase App Hosting

## Configuración correcta (backend `bengolealamas`)

| Campo | Valor |
|--------|--------|
| Root directory | **`apps/bengolealamas`** |
| Rama | `main` |
| Build | `npm run build` dentro de esa carpeta (Next.js B&L) |

Este directorio incluye su propio **`package-lock.json`** y dependencias `file:../../packages/*`.

Adrian (`planesdeahorro2`) usa root **`.`** (raíz del repo).

Variables en Environment (o `apphosting.yaml`): `NEXT_PUBLIC_SITE_ID=bl`, `NEXT_PUBLIC_APP_URL` (URL `hosted.app` del backend bengolealamas).

Panel admin: `/admin` (consultas + publicaciones). Usa el mismo proyecto Firebase y `admin_users`. En App Hosting alcanza ADC; en local, las mismas credenciales de Admin SDK que Adrian (`FIREBASE_SERVICE_ACCOUNT_PATH` o JSON). Después del cambio de reglas: `firebase deploy --only firestore:rules`.

**No** configures root `.` con `APP_SITE_ID=bl` ni `GOOGLE_NODE_RUN_SCRIPTS=build:bl`: el deploy de `05cf4a8` falla porque el adaptador Next.js de App Hosting no encuentra el artefacto en la raíz del repo.

Si el build falla por lockfile: confirmá que `apps/bengolealamas/package-lock.json` está en GitHub y volvé a desplegar.

## Desarrollo local

```powershell
cd apps\bengolealamas
npm ci
npm run dev
```

O desde la raíz: `npm run dev:bl` (requiere `npm ci` previo en `apps/bengolealamas`).
