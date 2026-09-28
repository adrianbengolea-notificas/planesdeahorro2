import type { Metadata } from 'next';
import { buildPageMetadata, type BuildPageMetadataOptions } from '@repo/shared/seo';
import { getBlSiteSeoConfig } from '@/config/seo';

export function blPageMetadata(options: BuildPageMetadataOptions): Metadata {
  return buildPageMetadata(getBlSiteSeoConfig(), options);
}
