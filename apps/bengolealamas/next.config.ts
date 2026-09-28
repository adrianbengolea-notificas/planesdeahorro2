import type { NextConfig } from 'next';
import path from 'path';

const appNodeModules = path.join(__dirname, 'node_modules');

const nextConfig: NextConfig = {
  // Raíz de esta app (no el monorepo): el adaptador App Hosting espera standalone bajo apps/bengolealamas/.next.
  outputFileTracingRoot: path.join(__dirname),
  async redirects() {
    return [
      { source: '/estudio', destination: '/informacion', permanent: true },
      { source: '/profesionales', destination: '/informacion', permanent: false },
    ];
  },
  transpilePackages: ['@repo/shared', '@repo/content-types'],
  typescript: { ignoreBuildErrors: false },
  eslint: { ignoreDuringBuilds: false },
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
