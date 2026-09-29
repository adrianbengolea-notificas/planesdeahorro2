#!/usr/bin/env node
/**
 * Smoke del puente case-intake (auth + opcional turno IA).
 *
 * Env:
 *   INTAKE_BRIDGE_URL (default http://localhost:9002/api/case-intake/continue)
 *   INTAKE_BRIDGE_SECRET
 *   SMOKE_RUN_AI=1  — un POST /continue con historial mínimo (consume Gemini)
 */

const base =
  process.env.INTAKE_BRIDGE_URL?.trim() || 'http://localhost:9002/api/case-intake/continue';
const secret = process.env.INTAKE_BRIDGE_SECRET?.trim();
const site = 'bengolea-lamas';

function headers(token) {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token ?? ''}`,
    'X-Intake-Site': site,
  };
}

async function post(path, body, token) {
  const url = path.startsWith('http') ? path : base.replace(/\/continue\/?$/, path);
  const res = await fetch(url, {
    method: 'POST',
    headers: headers(token),
    body: JSON.stringify(body),
  });
  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    json = text;
  }
  return { status: res.status, json };
}

async function main() {
  console.log('Bridge base:', base);

  const noAuth = await post('/continue', { history: [] }, '');
  if (noAuth.status !== 401) {
    console.error('Expected 401 without secret, got', noAuth.status);
    process.exit(1);
  }
  console.log('OK 401 without auth');

  if (!secret) {
    console.warn('INTAKE_BRIDGE_SECRET not set — skipping authenticated checks.');
    process.exit(0);
  }

  const badSite = await fetch(base, {
    method: 'POST',
    headers: { ...headers(secret), 'X-Intake-Site': 'other' },
    body: JSON.stringify({
      history: [{ id: '1', role: 'user', content: 'hola' }],
    }),
  });
  if (badSite.status !== 400) {
    console.error('Expected 400 for bad site header, got', badSite.status);
    process.exit(1);
  }
  console.log('OK 400 unsupported site');

  if (process.env.SMOKE_RUN_AI === '1') {
    const turn = await post('/continue', {
      history: [
        { id: 'a0', role: 'assistant', content: 'Contame brevemente qué pasó.' },
        { id: 'u1', role: 'user', content: 'Tengo un conflicto con mi administradora de plan de ahorro por la liquidación.' },
      ],
    }, secret);
    console.log('AI turn status:', turn.status);
    if (turn.status !== 200) {
      console.error(turn.json);
      process.exit(1);
    }
    const msg = turn.json?.message;
    if (!msg?.content) {
      console.error('Missing message.content', turn.json);
      process.exit(1);
    }
    console.log('OK AI reply snippet:', String(msg.content).slice(0, 120), '…');
  } else {
    console.log('Skip AI turn (set SMOKE_RUN_AI=1 to run one Gemini call).');
  }

  console.log('Smoke passed.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
