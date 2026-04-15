'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gavel, Loader2 } from 'lucide-react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, where, orderBy } from 'firebase/firestore';
import type { Fallo } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

function FalloCardSkeleton() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <Skeleton className="h-10 w-10 mb-4 rounded-md" />
        <Skeleton className="h-6 w-3/4 mb-2 rounded-md" />
        <Skeleton className="h-4 w-1/2 rounded-md" />
      </CardHeader>
      <CardContent className="flex-grow space-y-2">
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-4/5 rounded-md" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-10 w-full rounded-md" />
      </CardFooter>
    </Card>
  );
}

export default function RulingsPage() {
  const firestore = useFirestore();
  
  const fallosQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, 'fallos'), 
      where('published', '==', true), 
      orderBy('date', 'desc')
    );
  }, [firestore]);

  const { data: fallos, isLoading } = useCollection<Fallo>(fallosQuery);

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
          {isLoading && (
            <>
              <FalloCardSkeleton />
              <FalloCardSkeleton />
              <FalloCardSkeleton />
            </>
          )}

          {!isLoading && fallos && fallos.length > 0 && fallos.map((ruling) => (
            <Card key={ruling.id} className="flex flex-col hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <Gavel className="w-10 h-10 mb-4 text-primary" />
                <CardTitle className="font-headline text-xl">{ruling.title}</CardTitle>
                <CardDescription>
                  {ruling.tribunal} - {new Date(ruling.date).toLocaleDateString('es-AR', { timeZone: 'UTC' })}
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

        {!isLoading && (!fallos || fallos.length === 0) && (
            <div className="text-center col-span-full py-12 bg-card rounded-lg">
                <Gavel className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium text-foreground">No hay fallos publicados</h3>
                <p className="mt-1 text-sm text-muted-foreground">Próximamente se agregarán nuevos fallos y jurisprudencia relevante.</p>
            </div>
        )}
      </div>
    </div>
  );
}
