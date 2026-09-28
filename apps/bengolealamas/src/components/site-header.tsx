'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { SHORT_NAME } from '@/config/site';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/estudio', label: 'Estudio' },
  { href: '/areas-de-practica', label: 'Áreas de práctica' },
  { href: '/profesionales', label: 'Profesionales' },
  { href: '/publicaciones', label: 'Publicaciones' },
  { href: '/jurisprudencia', label: 'Jurisprudencia' },
  { href: '/contacto', label: 'Contacto' },
];

export function SiteHeader() {
  const pathname = usePathname() ?? '/';

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4 md:h-[4.25rem]">
        <Link href="/" className="min-w-0 font-headline text-base font-semibold tracking-wide md:text-lg">
          <span className="block text-[10px] font-normal uppercase tracking-[0.2em] text-muted-foreground">
            Estudio jurídico
          </span>
          {SHORT_NAME}
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Principal">
          {navLinks.map((link) => {
            const active =
              link.href === '/'
                ? pathname === '/'
                : pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium tracking-wide transition-colors',
                  active ? 'text-primary' : 'text-muted-foreground hover:text-primary',
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <details className="relative lg:hidden group">
          <summary className="flex cursor-pointer list-none items-center justify-center rounded-md border border-border p-2 hover:bg-secondary">
            <Menu className="h-5 w-5" aria-hidden />
            <span className="sr-only">Abrir menú</span>
          </summary>
          <nav
            className="absolute right-0 top-full z-50 mt-2 w-64 rounded-md border border-border bg-card p-3 shadow-lg"
            aria-label="Principal móvil"
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded px-3 py-2 text-sm hover:bg-secondary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </details>
      </div>
    </header>
  );
}
