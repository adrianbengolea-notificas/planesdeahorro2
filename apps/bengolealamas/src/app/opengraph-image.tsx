import { ImageResponse } from 'next/og';
import { SITE_NAME, SITE_TAGLINE } from '@/config/site';

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
          background: 'linear-gradient(145deg, #1a2332 0%, #2c3e50 55%, #0f1419 100%)',
          color: '#f5f1e8',
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
            background: '#b8954a',
          }}
        />
        <div style={{ fontSize: 22, letterSpacing: 6, textTransform: 'uppercase', color: '#b8954a' }}>
          Estudio jurídico
        </div>
        <div style={{ fontSize: 52, fontWeight: 700, marginTop: 16, lineHeight: 1.15, maxWidth: 900 }}>
          {SITE_NAME}
        </div>
        <div style={{ fontSize: 26, marginTop: 20, color: 'rgba(245,241,232,0.85)' }}>{SITE_TAGLINE}</div>
      </div>
    ),
    { ...size },
  );
}
