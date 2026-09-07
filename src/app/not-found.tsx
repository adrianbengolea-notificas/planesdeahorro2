import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Página no encontrada',
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-24 md:py-32 text-center max-w-xl">
      <p className="text-accent font-medium tracking-[0.3em] uppercase text-[11px] mb-4">
        Error 404
      </p>
      <h1 className="font-headline text-3xl md:text-4xl mb-4">Página no encontrada</h1>
      <p className="text-muted-foreground mb-8">
        Esa dirección no existe o el contenido ya no está publicado. Si llegaste desde Google, pedí una evaluación del caso desde el inicio.
      </p>
      <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
        <Link href="/">Volver al inicio</Link>
      </Button>
    </div>
  );
}
