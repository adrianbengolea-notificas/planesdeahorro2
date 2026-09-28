# ⚠️ Root directory en Firebase App Hosting

## Configuración correcta (backend `bengolealamas`)

| Campo | Valor |
|--------|--------|
| Root directory | **`apps/bengolealamas`** |
| Rama | `main` |
| Build | `npm run build` dentro de esa carpeta (Next.js B&L) |

Este directorio incluye su propio **`package-lock.json`** y dependencias `file:../../packages/*`.

Adrian (`planesdeahorro2`) usa root **`.`** (raíz del repo).

Variables opcionales en Environment: `NEXT_PUBLIC_SITE_ID=bl`, `NEXT_PUBLIC_APP_URL` (URL `hosted.app` del backend bengolealamas). **No hace falta** `APP_SITE_ID` si el root es `apps/bengolealamas`.
