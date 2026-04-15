import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Bot, FileText, Gavel } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminDashboardPage() {
  return (
    <div className="p-4 md:p-8">
      <h1 className="font-headline text-3xl md:text-4xl text-primary mb-2">Panel de Administración</h1>
      <p className="text-muted-foreground mb-8">Bienvenido al panel de control de JurisPlan.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-6 w-6 text-primary"/>
              Herramientas de IA
            </CardTitle>
            <CardDescription>
              Agilice la creación de contenido con asistencia de inteligencia artificial.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Genere resúmenes de fallos y borradores de artículos de doctrina en segundos.
            </p>
            <Button asChild>
              <Link href="/admin/herramientas-ai">Ir a Herramientas IA</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gavel className="h-6 w-6 text-primary"/>
              Gestionar Fallos
            </CardTitle>
            <CardDescription>
              Añada, edite o elimine fallos y jurisprudencia del sitio web.
            </CardDescription>
          </CardHeader>
          <CardContent>
             <p className="text-sm text-muted-foreground mb-4">
              Mantenga la sección de jurisprudencia actualizada con las últimas novedades.
            </p>
            <Button variant="secondary" disabled>Próximamente</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary"/>
              Gestionar Doctrina
            </CardTitle>
            <CardDescription>
              Publique y administre los artículos del blog jurídico.
            </CardDescription>
          </CardHeader>
          <CardContent>
             <p className="text-sm text-muted-foreground mb-4">
              Comparta su análisis y conocimiento con los visitantes del sitio.
            </p>
            <Button variant="secondary" disabled>Próximamente</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
