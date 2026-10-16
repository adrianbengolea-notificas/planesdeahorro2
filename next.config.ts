import type {NextConfig} from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  /* Firebase App Hosting ejecuta el bundle standalone generado por Next. */
  output: 'standalone',
  /* Monorepo local: forzar trazado al root de esta app (evita lockfile del repo padre). */
  outputFileTracingRoot: path.join(__dirname),
  /* App Hosting (standalone): pdf.js importa el worker por ruta relativa; hay que copiarlo explícitamente. */
  outputFileTracingIncludes: {
    '/*': [
      './node_modules/pdfjs-dist/legacy/build/pdf.worker.mjs',
      './node_modules/pdfjs-dist/legacy/build/pdf.worker.min.mjs',
      './node_modules/@napi-rs/canvas-linux-x64-gnu/**',
    ],
  },
  /* Evita empaquetar pdf.js y su implementación nativa de canvas en el bundle del servidor. */
  serverExternalPackages: ['pdf-parse', 'pdfjs-dist', '@napi-rs/canvas'],
  /* config options here */
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    // PDFs subidos a server actions (extraer texto + IA).
    serverActions: {
      bodySizeLimit: '12mb',
    },
  },
};

export default nextConfig;
