'use client';

import { useState } from 'react';
import { STUDIO_EMAIL } from '@/config/wix-brand';
import { cn } from '@/lib/utils';

type Props = {
  className?: string;
};

export function ContactForm({ className }: Props) {
  const [sent, setSent] = useState(false);

  return (
    <form
      className={cn('space-y-4', className)}
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const subject = String(data.get('asunto') || 'Consulta desde la web');
        const body = [
          `Nombre: ${data.get('nombre')}`,
          `Email: ${data.get('email')}`,
          `Teléfono: ${data.get('telefono')}`,
          '',
          String(data.get('mensaje') || ''),
        ].join('\n');
        window.location.href = `mailto:${STUDIO_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        setSent(true);
      }}
    >
      <div>
        <label htmlFor="nombre" className="sr-only">
          Nombre
        </label>
        <input
          id="nombre"
          name="nombre"
          required
          placeholder="Nombre *"
          className="w-full border border-border bg-background px-3 py-2.5 text-sm outline-none ring-accent focus:ring-1"
        />
      </div>
      <div>
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="Email *"
          className="w-full border border-border bg-background px-3 py-2.5 text-sm outline-none ring-accent focus:ring-1"
        />
      </div>
      <div>
        <label htmlFor="telefono" className="sr-only">
          Teléfono
        </label>
        <input
          id="telefono"
          name="telefono"
          placeholder="Teléfono"
          className="w-full border border-border bg-background px-3 py-2.5 text-sm outline-none ring-accent focus:ring-1"
        />
      </div>
      <div>
        <label htmlFor="asunto" className="sr-only">
          Asunto
        </label>
        <input
          id="asunto"
          name="asunto"
          placeholder="Asunto"
          className="w-full border border-border bg-background px-3 py-2.5 text-sm outline-none ring-accent focus:ring-1"
        />
      </div>
      <div>
        <label htmlFor="mensaje" className="sr-only">
          Mensaje
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows={5}
          placeholder="Mensaje"
          className="w-full resize-y border border-border bg-background px-3 py-2.5 text-sm outline-none ring-accent focus:ring-1"
        />
      </div>
      <button
        type="submit"
        className="border border-foreground bg-background px-10 py-2.5 text-sm font-medium uppercase tracking-wide transition hover:bg-foreground hover:text-background"
      >
        Enviar
      </button>
      {sent ? (
        <p className="text-sm text-muted-foreground" role="status">
          Se abrió tu cliente de correo. Si no aparece, escribinos a {STUDIO_EMAIL}.
        </p>
      ) : null}
    </form>
  );
}
