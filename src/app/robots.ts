import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/seo';

/** Crawlers de buscadores de IA (ChatGPT, Claude, Gemini, Perplexity, etc.). */
const AI_CRAWLERS = [
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'anthropic-ai',
  'Google-Extended',
  'Googlebot',
  'PerplexityBot',
  'Perplexity-User',
  'Applebot',
  'Applebot-Extended',
  'Amazonbot',
  'Bytespider',
  'meta-externalagent',
  'YouBot',
  'cohere-ai',
  'CCBot',
  'DuckAssistBot',
];

const DISALLOW_PRIVATE = ['/admin', '/admin/', '/mi-caso', '/mi-caso/', '/api/'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: DISALLOW_PRIVATE,
      },
      {
        userAgent: AI_CRAWLERS,
        allow: '/',
        disallow: DISALLOW_PRIVATE,
      },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: absoluteUrl('/'),
  };
}
