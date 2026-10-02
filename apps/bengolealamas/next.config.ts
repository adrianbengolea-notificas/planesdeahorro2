import type { NextConfig } from 'next';
import path from 'path';

const appNodeModules = path.join(__dirname, 'node_modules');

const nextConfig: NextConfig = {
  // App Hosting ejecuta standalone; public/ debe copiarse en postbuild (ver scripts/copy-standalone-public.mjs).
  output: 'standalone',
  // Raíz de esta app (no el monorepo): el adaptador App Hosting espera standalone bajo apps/bengolealamas/.next.
  outputFileTracingRoot: path.join(__dirname),
  outputFileTracingIncludes: {
    '/*': ['./public/**/*'],
  },
  async redirects() {
    return [
      { source: '/estudio', destination: '/servicios', permanent: true },
      { source: '/informacion', destination: '/servicios', permanent: false },
    ];
  },
  transpilePackages: ['@repo/shared', '@repo/content-types'],
  typescript: { ignoreBuildErrors: false },
  eslint: { ignoreDuringBuilds: false },
  experimental: {
    serverActions: {
      bodySizeLimit: '8mb',
    },
  },
  // No mapear @repo/shared ni @repo/content-types a /src: rompe subpaths (@repo/shared/components/json-ld).
  // Turbopack y webpack resuelven vía package.json "exports" + transpilePackages.
  turbopack: {
    resolveAlias: {
      clsx: path.join(appNodeModules, 'clsx'),
      'tailwind-merge': path.join(appNodeModules, 'tailwind-merge'),
    },
  },
  webpack: (config) => {
    // App Hosting solo hace npm ci en apps/bengolealamas; resolver deps de file:../../packages/* desde acá.
    config.resolve.modules = [appNodeModules, ...(config.resolve.modules ?? [])];
    config.resolve.alias = {
      ...config.resolve.alias,
      clsx: path.join(appNodeModules, 'clsx'),
      'tailwind-merge': path.join(appNodeModules, 'tailwind-merge'),
    };
    return config;
  },
};

export default nextConfig;
