import type { Metadata } from 'next';
import Link from 'next/link';
import { buildPageMetadata } from '@repo/shared/seo';
import { HomeHeroCarousel } from '@/components/home-hero-carousel';
import { getBlSiteSeoConfig } from '@/config/seo';
import { DEFAULT_DESCRIPTION, SITE_NAME } from '@/config/site';
import { HOME_SLIDES } from '@/config/wix-brand';

const siteSeo = getBlSiteSeoConfig();

export const metadata: Metadata = buildPageMetadata(siteSeo, {
  title: SITE_NAME,
  description: DEFAULT_DESCRIPTION,
  path: '/',
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col">
      <HomeHeroCarousel slides={[...HOME_SLIDES]} />
      <section className="border-t border-border bg-background px-4 py-10 text-center md:py-12">
        <p className="mx-auto max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
          ¿Tenés un conflicto civil, comercial o de consumo? Podemos ayudarte a ordenar la consulta inicial.
        </p>
        <Link
          href="/contanos-tu-caso"
          className="mt-6 inline-flex border border-foreground bg-foreground px-8 py-3 text-xs font-medium uppercase tracking-[0.15em] text-background transition hover:bg-foreground/90"
        >
          Contanos tu caso
        </Link>
      </section>
      <div className="flex-1 bg-background" aria-hidden />
    </div>
  );
}
