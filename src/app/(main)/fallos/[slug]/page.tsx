'use client';

import { notFound, useParams } from 'next/navigation';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, where, limit } from 'firebase/firestore';
import type { Fallo } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Calendar, Gavel, Loader2, Tag } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export default function RulingDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const firestore = useFirestore();

  const falloQuery = useMemoFirebase(() => {
    if (!firestore || !slug) return null;
    return query(
      collection(firestore, 'fallos'),
      where('slug', '==', slug),
      where('published', '==', true),
      limit(1)
    );
  }, [firestore, slug]);

  const { data: fallos, isLoading } = useCollection<Fallo>(falloQuery);
  const ruling = fallos?.[0];

  if (isLoading) {
    return (
        <div className="bg-card py-12 md:py-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <Skeleton className="h-10 w-3/4 mb-4" />
                <Skeleton className="h-6 w-1/2 mb-6" />
                <div className="space-y-4 mt-8">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                </div>
            </div>
        </div>
    );
  }

  if (!ruling) {
    notFound();
  }

  return (
    <div className="bg-card py-12 md:py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <article className="prose lg:prose-xl max-w-none dark:prose-invert prose-headings:font-headline prose-headings:text-primary">
          <div className="mb-8">
            <h1 className="font-headline text-3xl md:text-4xl font-bold text-primary mb-4">{ruling.title}</h1>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Gavel className="h-4 w-4" />
                <span>{ruling.tribunal}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={ruling.date}>{new Date(ruling.date).toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}</time>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2">
                <Tag className="h-4 w-4 text-muted-foreground" />
                {ruling.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
            </div>
          </div>
          
          <p className="lead text-lg font-medium text-foreground">{ruling.summary}</p>
          
          <div className="whitespace-pre-wrap mt-8">
            {ruling.content}
          </div>

        </article>

        <div className="mt-12 text-center">
            <Button asChild>
                <Link href="/fallos">Volver a Fallos</Link>
            </Button>
        </div>
      </div>
    </div>
  );
}
