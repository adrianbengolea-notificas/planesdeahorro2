import { AiToolsClient } from "./ai-tools-client";

export default function AiToolsPage() {
  return (
    <div className="p-4 md:p-8">
       <h1 className="font-headline text-3xl md:text-4xl text-primary mb-2">Herramientas con IA</h1>
       <p className="text-muted-foreground mb-8">Utilice la inteligencia artificial para optimizar su flujo de trabajo y la creación de contenido legal.</p>
       <AiToolsClient />
    </div>
  )
}
