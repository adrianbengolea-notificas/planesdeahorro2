import Link from 'next/link';
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gavel } from 'lucide-react';
import { latestRulings } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Fallos y Jurisprudencia sobre Planes de Ahorro | JurisPlan',
  description: 'Acceda a una colección de fallos y jurisprudencia relevante sobre conflictos en planes de ahorro en Argentina.',
};

export default function RulingsPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">Fallos y Jurisprudencia</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Explore una selección de sentencias y medidas cautelares que sientan precedentes en la defensa de los derechos de los suscriptores.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestRulings.map((ruling) => (
            <Card key={ruling.slug} className="flex flex-col hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <Gavel className="w-10 h-10 mb-4 text-primary" />
                <CardTitle className="font-headline text-xl">{ruling.title}</CardTitle>
                <CardDescription>
                  {ruling.court} - {new Date(ruling.date).toLocaleDateString('es-AR')}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground line-clamp-5">{ruling.summary}</p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/fallos/${ruling.slug}`}>Ver Detalle</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
