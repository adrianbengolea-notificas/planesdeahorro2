'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { WIX_NAV } from '@/config/wix-brand';
import { cn } from '@/lib/utils';

export function SiteHeader() {
  const pathname = usePathname() ?? '/';

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4 md:px-8 md:py-5">
        <Link href="/" className="shrink-0">
          <Image
            src="/brand/logo.jpg"
            alt="Estudio Jurídico Bengolea & Lamas"
            width={320}
            height={54}
            className="h-10 w-auto md:h-12"
            priority
          />
        </Link>

        <nav className="hidden items-stretch lg:flex" aria-label="Principal">
          {WIX_NAV.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center border-y border-foreground/90 px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] transition-colors md:px-8 md:text-sm',
                  active ? 'text-accent' : 'text-foreground hover:text-accent',
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <details className="relative lg:hidden group">
          <summary className="flex cursor-pointer list-none items-center justify-center rounded-md border border-border p-2">
            <Menu className="h-5 w-5" aria-hidden />
            <span className="sr-only">Abrir menú</span>
          </summary>
          <nav
            className="absolute right-0 top-full z-50 mt-2 w-56 rounded-md border border-border bg-card p-2 shadow-lg"
            aria-label="Principal móvil"
          >
            <ul className="flex flex-col">
              {WIX_NAV.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block border-b border-border/60 px-3 py-3 text-sm uppercase tracking-wide last:border-0 hover:bg-muted/50"
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
