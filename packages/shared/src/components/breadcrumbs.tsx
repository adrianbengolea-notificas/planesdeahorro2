import Link from 'next/link';
import { cn } from '../utils/cn';

export type BreadcrumbNavItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbNavItem[];
  className?: string;
};

/** Navegación accesible de migas de pan (UI). JSON-LD aparte vía breadcrumbJsonLd. */
export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Miga de pan" className={cn('text-sm text-muted-foreground', className)}>
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {index > 0 ? <span aria-hidden="true">/</span> : null}
              {isLast || !item.href ? (
                <span className={isLast ? 'text-foreground font-medium' : undefined}>{item.label}</span>
              ) : (
                <Link href={item.href} className="hover:text-foreground transition-colors">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
