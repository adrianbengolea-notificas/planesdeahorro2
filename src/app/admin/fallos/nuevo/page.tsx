'use client';

import { FalloForm } from '../fallo-form';

export default function NuevoFalloPage() {
  return (
    <div className="p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="font-headline text-3xl md:text-4xl text-primary">Crear Nuevo Fallo</h1>
          <p className="text-muted-foreground">Complete los detalles del nuevo fallo judicial.</p>
        </div>
        <FalloForm />
      </div>
    </div>
  );
}
