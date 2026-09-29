/**
 * URL pública del sitio Bengolea & Lamas (enlaces en correos internos).
 * En producción preferí `BL_PUBLIC_APP_URL=https://bengolealamas.com.ar`.
 */
export function getBlPublicAppUrl(): string {
  const fromEnv = process.env.BL_PUBLIC_APP_URL?.trim() || process.env.NEXT_PUBLIC_BL_APP_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, '');
  if (process.env.NODE_ENV !== 'production') return 'http://localhost:9003';
  return 'https://bengolealamas.com.ar';
}
