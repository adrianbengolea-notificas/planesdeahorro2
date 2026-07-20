/** ID de conversión Google Ads: Envío de formulario / lead (evaluar-caso). */
export const GOOGLE_ADS_LEAD_CONVERSION_SEND_TO =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_CONVERSION?.trim() ||
  'AW-18107912536/hVCkCPnQoqQcENiiw7pD';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Dispara la conversión de lead una vez (no en cada visita a /evaluar-caso). */
export function trackGoogleAdsLeadConversion(): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', 'conversion', {
    send_to: GOOGLE_ADS_LEAD_CONVERSION_SEND_TO,
  });
}
