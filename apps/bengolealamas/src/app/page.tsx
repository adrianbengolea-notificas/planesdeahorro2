import type { Metadata } from 'next';
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
      <div className="flex-1 bg-background" aria-hidden />
    </div>
  );
}
