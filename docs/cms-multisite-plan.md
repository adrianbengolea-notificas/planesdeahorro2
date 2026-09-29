# Plan CMS multisite (sin implementar en admin Adrian)

## Estado actual

El admin en `/admin` (app Adrian) gestiona:

- `doctrina`, `fallos`, `faqs` (colección no usada en front), `knowledge_docs`, `case_evaluations`.

Auth: Firebase Auth + documento en `admin_users`.

**Fase B (B&L):** panel propio en `apps/bengolealamas` → `/admin`.

- Consultas: colección `bl_case_intakes` (las crea el backend de Adrian al cerrar el chat).
- Notas: colección `bl_publications` (el sitio público las mezcla con las migradas de Wix).

## Objetivo

Un solo panel con selector **`siteId`**:

- `adrian` — contenido planes de ahorro (comportamiento actual).
- `bl` — publicaciones, jurisprudencia, áreas, FAQ del estudio.

## Enfoque recomendado (fases)

1. **Fase A** — Admin solo Adrian (sin cambios).
2. **Fase B** — Duplicar rutas admin bajo `apps/bengolealamas` read-only o CMS mínimo (solo `bl`).
3. **Fase C** — Extraer `@repo/admin-core` con forms compartidos; filtro `siteId` en queries.
4. **Fase D** — Unificar en un admin (subdominio o `/admin` con tenant).

## Cambios de datos (futuro)

- Formularios: campo `siteId` default según app.
- Listados: `where('siteId','==', currentSite)`.
- Storage: prefijos `bl/publicaciones/{id}/...` vs rutas actuales.

## Riesgo

Modificar el admin Adrian en producción puede romper flujo editorial de planes de ahorro. **No tocar** hasta Fase B/C con feature flag.
