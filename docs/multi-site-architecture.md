# Arquitectura multisite (transitoria)

## Decisión (Fase 1)

**Adrian permanece en la raíz del repositorio** (`src/`, `next.config.ts`, `firebase.json` con backend `planesdeahorro2`, `rootDir: "."`).

**Bengolea & Lamas** vive en `apps/bengolealamas/` con su propio Next.js, middleware, SEO y deploy App Hosting separado.

```
/
├── src/                    ← adrianbengolea.com.ar (sin mover)
├── apps/bengolealamas/     ← bengolealamas.com.ar (nuevo)
├── packages/
│   ├── content-types/      ← tipos editoriales + SiteId
│   └── shared/             ← SEO, breadcrumbs, JSON-LD helpers, redirects Wix
├── data/migration/         ← wix-redirects.json (vacío)
└── docs/
```

### ¿Por qué no `apps/adrian` aún?

Mover Adrian implicaría cambiar `apphosting.rootDir`, rutas CI/CD y riesgo de regressions en producción. La estructura transitoria es **válida**: dos apps npm workspaces, un solo `node_modules` en raíz, builds independientes.

**Fase posterior:** migrar Adrian a `apps/adrian` cuando exista pipeline de deploy probado para ambos backends.

## Dominios y SEO

| Sitio | App | `NEXT_PUBLIC_APP_URL` | Backend App Hosting |
|-------|-----|------------------------|---------------------|
| Adrian | raíz | `https://adrianbengolea.com.ar` | `planesdeahorro2` |
| B&L | `apps/bengolealamas` | `https://bengolealamas.com.ar` (staging: URL `*.web.app`) | `bengolealamas` |

Cada app tiene su propio `sitemap.ts`, `robots.ts`, `llms.txt`, JSON-LD y middleware (`www` → apex por host).

## Firestore (futuro)

- `siteId`: `adrian` | `bl` en contenido nuevo.
- Documentos históricos de Adrian **sin tocar**.
- Reglas propuestas: `docs/firestore-rules-proposed.md` (no desplegadas).

## Anti-canibalización SEO

Ver `docs/seo-anti-cannibalization.md`.

## Staging B&L — segundo backend App Hosting

Firebase App Hosting admite **varios backends** en un mismo proyecto.

### Pasos (consola / CLI)

1. Proyecto Firebase: `planesdeahorro-77c3e` (mismo que Adrian).
2. Crear backend App Hosting **`bengolealamas`**:
   - Consola: **App Hosting → Create backend** → conectar repo Git → **Root directory**: `apps/bengolealamas`.
   - O CLI (referencia): `firebase apphosting:backends:create --project planesdeahorro-77c3e` y asociar root `apps/bengolealamas`.
3. **Root directory (Deployment):** **`.`** (raíz del monorepo), **no** `apps/bengolealamas`.  
   Con subcarpeta sola, `npm install` no resuelve `@repo/shared` y el build falla.
4. Config: `apphosting.bengolealamas.yaml` en la raíz (build vía `GOOGLE_NODE_RUN_SCRIPTS=build:bl`, run `npm run start:bl`).  
   Si la consola no enlaza ese archivo, cargar las mismas variables en **Settings → Environment**.
5. Variables mínimas:
   - `NEXT_PUBLIC_APP_URL` — en staging usar la URL `https://<backend>--<project>.web.app` hasta DNS.
   - `NEXT_PUBLIC_SITE_ID=bl`
6. Deploy desde rama con cambios; **no** conectar `bengolealamas.com.ar` hasta Fase DNS.
7. Adrian sigue desplegándose desde la **raíz** con `firebase.json` existente (`planesdeahorro2`); no comparte el mismo `runCommand` porque el backend Adrian usa el `apphosting.yaml` por defecto (`npm run build` / `npm start`).

### Ver logs cuando falla el build

Consola: **App Hosting → backend bengolealamas → Rollouts** → clic en el rollout fallido → **Ver registros de compilación** (Cloud Build).  
Ahí aparece el error real (`npm ERR`, `Module not found`, etc.).

### Archivos de deploy B&L

- `apps/bengolealamas/firebase.json` — referencia `backendId: bengolealamas`, `rootDir: apps/bengolealamas` (relativo al repo si se usa monorepo deploy).
- `apps/bengolealamas/apphosting.yaml` — env mínima.

> Si el CLI de deploy solo lee `firebase.json` de la raíz, configurar el segundo backend en consola vinculado al subdirectorio; no modificar el `firebase.json` raíz de Adrian.

## Redirects Wix

- Archivo: `data/migration/wix-redirects.json`
- Lectura: `apps/bengolealamas/src/lib/wix-redirects.ts` + `middleware.ts`
- Reglas vacías hasta migración.
