# Propuesta de reglas Firestore (NO desplegada)

Documento de diseño para contenido multisite. **No reemplaza** `firestore.rules` en producción hasta revisión legal/técnica.

## Principios

- Colecciones actuales (`doctrina`, `fallos`, …) siguen sin `siteId` → se tratan como `adrian` por convención en código.
- Contenido nuevo B&L: campo obligatorio `siteId: 'bl'`.
- Lectura pública: `published == true` **y** (`siteId == 'bl'` en app B&L) — en práctica cada app filtra en queries; reglas pueden exigir `siteId` en creates admin.

## Índices compuestos sugeridos (futuro)

```
content (colección unificada opcional)
  - siteId ASC, published ASC, publishDate DESC
  - siteId ASC, kind ASC, published ASC, publishDate DESC
  - siteId ASC, slug ASC, published ASC
```

O sobre colecciones existentes al migrar:

```
doctrina: siteId + published + publishDate
fallos: siteId + published + date
```

## Reglas esquemáticas (borrador)

```
match /content/{id} {
  allow get, list: if resource.data.published == true;
  allow write: if isAdmin();
}
```

Ajustar cuando exista la colección. **No desplegar** sin migración planificada.

## Redirects (opcional futuro)

```
match /redirects/{id} {
  allow read: if true;  // solo si se sirven desde cliente — preferir JSON en repo o middleware
  allow write: if isAdmin();
}
```

Preferencia actual: **`data/migration/wix-redirects.json`** + middleware Next.js.
