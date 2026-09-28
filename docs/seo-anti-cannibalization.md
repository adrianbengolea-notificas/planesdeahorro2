# Política SEO — dos dominios

## Roles

| Dominio | Rol |
|---------|-----|
| **adrianbengolea.com.ar** | Sitio **vertical** principal para **planes de ahorro automotriz** (profundidad de contenido, evaluación de caso, fallos/doctrina PA). |
| **bengolealamas.com.ar** | Sitio **institucional** del estudio: civil, comercial, consumo, bancos, seguros, empresas, etc. |
| **bengolealamas.com.ar/planes-de-ahorro** | **Hub introductorio** + enlace editorial al sitio vertical. **No** duplicar artículos largos de Adrian. |

## Reglas editoriales

1. Un tema “dueño” por dominio; el otro sitio solo resume y enlaza (`rel="noopener"`, anchor descriptivo).
2. No copiar URLs/canonical cruzados: cada pieza tiene **una** URL canónica en su dominio.
3. Si un artículo debe existir en ambos (excepcional), usar `canonical` apuntando al sitio dueño.
4. Sitemaps **separados** — nunca incluir URLs del otro dominio.
5. JSON-LD `url` / `@id` siempre en el dominio del sitio que sirve la página.

## Planes de ahorro

- Consultas y contenido extenso → **adrianbengolea.com.ar**
- Presencia institucional del estudio → **bengolealamas.com.ar/planes-de-ahorro** → link a Adrian
