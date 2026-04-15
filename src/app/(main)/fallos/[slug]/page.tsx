import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { latestRulings } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Calendar, Gavel, Tag } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const ruling = latestRulings.find((p) => p.slug === params.slug);

  if (!ruling) {
    return {
      title: 'Fallo no encontrado',
    };
  }

  return {
    title: `${ruling.title} | JurisPlan`,
    description: ruling.summary,
  };
}

export default function RulingDetailPage({ params }: { params: { slug: string } }) {
  const ruling = latestRulings.find((p) => p.slug === params.slug);

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
                <span>{ruling.court}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={ruling.date}>{new Date(ruling.date).toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
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

export async function generateStaticParams() {
  return latestRulings.map((post) => ({
    slug: post.slug,
  }));
}
