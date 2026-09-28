# ⚠️ Root directory en Firebase App Hosting

**No uses `apps/bengolealamas` como directorio raíz del backend.**

El monorepo tiene:

- `package-lock.json` → **raíz del repo** (`/`)
- workspaces `@repo/*` → `packages/`

Si el backend apunta a `apps/bengolealamas`, el build falla con:

> Missing dependency lock file at path '/workspace/apps/bengolealamas'

## Configuración correcta (backend `bengolealamas`)

| Campo | Valor |
|--------|--------|
| Root directory | **`.`** o **`/`** (raíz del repositorio) |
| Rama | `main` |
| Build | variable `GOOGLE_NODE_RUN_SCRIPTS` = `build:bl` |

Ver `apphosting.bengolealamas.yaml` en la raíz del repo.

Adrian (`planesdeahorro2`) también usa root **`.`** pero sin `build:bl` — solo el backend B&L lleva esa variable.
