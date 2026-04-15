import Link from 'next/link';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface ProblemPageLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function ProblemPageLayout({ title, children }: ProblemPageLayoutProps) {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          <main className="lg:col-span-2">
            <article className="prose lg:prose-lg max-w-none dark:prose-invert prose-headings:font-headline prose-headings:text-primary">
              <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-8">
                {title}
              </h1>
              {children}
            </article>
          </main>
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="bg-card shadow-lg">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl text-primary">
                    ¿Sufre este problema?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    No se resigne. Tiene derechos que lo protegen. Nuestro equipo puede analizar su caso y ofrecerle una solución.
                  </p>
                  <Button asChild size="lg" className="w-full">
                    <Link href="/evaluar-caso">Evaluar mi Caso Gratis</Link>
                  </Button>
                  <p className='text-center text-sm text-muted-foreground mt-4'>Consulta 100% confidencial.</p>
                </CardContent>
              </Card>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
