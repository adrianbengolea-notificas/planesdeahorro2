import { ImageResponse } from 'next/og';
import { SITE_NAME, SITE_TAGLINE } from '@/lib/seo';

export const runtime = 'edge';
export const alt = `${SITE_NAME} – ${SITE_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: 72,
          background: 'linear-gradient(135deg, #0a1628 0%, #122a4a 55%, #0d1f38 100%)',
          color: '#f5f7fa',
          fontFamily: 'Georgia, serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 8,
            background: '#c9a227',
          }}
        />
        <div
          style={{
            fontSize: 22,
            letterSpacing: 6,
            textTransform: 'uppercase',
            color: '#c9a227',
            marginBottom: 20,
            fontFamily: 'sans-serif',
          }}
        >
          Abogado — Provincia de Buenos Aires
        </div>
        <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1, maxWidth: 980 }}>
          {SITE_NAME}
        </div>
        <div
          style={{
            marginTop: 18,
            fontSize: 30,
            color: 'rgba(245,247,250,0.75)',
            maxWidth: 900,
            fontFamily: 'sans-serif',
          }}
        >
          {SITE_TAGLINE}
        </div>
      </div>
    ),
    { ...size },
  );
}
