import Link from 'next/link';
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, User } from 'lucide-react';
import { doctrinalArticles } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Doctrina y Artículos sobre Planes de Ahorro | JurisPlan',
  description: 'Análisis y artículos de doctrina sobre la problemática de los planes de ahorro en Argentina.',
};

export default function DoctrinePage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">Doctrina y Artículos</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Profundice su conocimiento con nuestros análisis sobre los aspectos legales y controversiales de los planes de ahorro.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctrinalArticles.map((article) => (
            <Card key={article.slug} className="flex flex-col hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <FileText className="w-10 h-10 mb-4 text-primary" />
                <CardTitle className="font-headline text-xl">{article.title}</CardTitle>
                <CardDescription className='flex items-center gap-2'>
                    <User className="h-4 w-4"/> 
                    {article.author} - {new Date(article.date).toLocaleDateString('es-AR')}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground line-clamp-5">{article.summary}</p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/doctrina/${article.slug}`}>Leer Artículo</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
