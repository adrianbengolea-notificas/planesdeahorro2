import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { doctrinalArticles } from '@/lib/data';
import { Calendar, User } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = doctrinalArticles.find((p) => p.slug === params.slug);

  if (!article) {
    return {
      title: 'Artículo no encontrado',
    };
  }

  return {
    title: `${article.title} | JurisPlan`,
    description: article.summary,
  };
}

export default function ArticleDetailPage({ params }: { params: { slug: string } }) {
  const article = doctrinalArticles.find((p) => p.slug === params.slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="bg-card py-12 md:py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <article className="prose lg:prose-xl max-w-none dark:prose-invert prose-headings:font-headline prose-headings:text-primary">
          <div className="mb-8">
            <h1 className="font-headline text-3xl md:text-4xl font-bold text-primary mb-4">{article.title}</h1>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Por {article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={article.date}>{new Date(article.date).toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
              </div>
            </div>
          </div>
          
          <p className="lead text-lg font-medium text-foreground">{article.summary}</p>
          
          <div className="whitespace-pre-wrap mt-8">
            {article.content}
          </div>
        </article>

         <div className="mt-12 text-center">
            <Button asChild>
                <Link href="/doctrina">Volver a Doctrina</Link>
            </Button>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return doctrinalArticles.map((post) => ({
    slug: post.slug,
  }));
}
