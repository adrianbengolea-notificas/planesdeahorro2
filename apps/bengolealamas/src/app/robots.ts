import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@repo/shared/seo';
import { getBlSiteSeoConfig } from '@/config/seo';

const AI_CRAWLERS = [
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'anthropic-ai',
  'Google-Extended',
  'PerplexityBot',
  'Perplexity-User',
  'Applebot-Extended',
  'Bytespider',
  'Amazonbot',
  'meta-externalagent',
];

const DISALLOW = ['/api/', '/admin', '/admin/'];

export default function robots(): MetadataRoute.Robots {
  const site = getBlSiteSeoConfig();
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: DISALLOW },
      { userAgent: AI_CRAWLERS, allow: '/', disallow: DISALLOW },
    ],
    sitemap: absoluteUrl(site, '/sitemap.xml'),
    host: absoluteUrl(site, '/'),
  };
}
