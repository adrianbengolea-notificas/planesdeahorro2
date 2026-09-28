/** Configuración explícita por sitio — nunca asumir un dominio por defecto en helpers. */
export type SiteSeoConfig = {
  siteName: string;
  siteTitle: string;
  siteUrl: string;
  defaultDescription: string;
  locale?: string;
  ogImagePath?: string;
  keywords?: string[];
};
