import { Breadcrumbs, type BreadcrumbNavItem } from '@repo/shared/components/breadcrumbs';
import { JsonLd } from '@repo/shared/components/json-ld';
import { breadcrumbJsonLd } from '@repo/shared/schema';
import { getBlSiteSeoConfig } from '@/config/seo';

type PageShellProps = {
  title: string;
  description?: string;
  /** Path de esta página para el último ítem del BreadcrumbList (sin dominio). */
  path?: string;
  breadcrumbs?: BreadcrumbNavItem[];
  children: React.ReactNode;
};

export function PageShell({ title, description, path = '/', breadcrumbs, children }: PageShellProps) {
  const site = getBlSiteSeoConfig();

  const schemaItems =
    breadcrumbs?.map((b, index) => {
      const isLast = index === breadcrumbs.length - 1;
      const itemPath = b.href ?? (isLast ? path : '/');
      return { name: b.label, path: itemPath };
    }) ?? [];

  const jsonLd = schemaItems.length > 0 ? breadcrumbJsonLd(site, schemaItems) : null;

  return (
    <>
      {jsonLd ? <JsonLd data={jsonLd} /> : null}
      <div className="border-b border-border bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-12 md:py-16">
          {breadcrumbs && breadcrumbs.length > 0 ? (
            <Breadcrumbs
              items={breadcrumbs}
              className="mb-6 text-primary-foreground/60 [&_a]:text-primary-foreground/70 [&_a:hover]:text-primary-foreground"
            />
          ) : null}
          <h1 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">{title}</h1>
          {description ? (
            <p className="mt-4 max-w-2xl text-base text-primary-foreground/75 leading-relaxed">{description}</p>
          ) : null}
        </div>
      </div>
      <div className="container mx-auto px-4 py-10 md:py-14">{children}</div>
    </>
  );
}
