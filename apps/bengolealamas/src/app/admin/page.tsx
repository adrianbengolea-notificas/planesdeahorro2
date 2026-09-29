import Link from 'next/link';
import { ArrowRight, ClipboardList, FileText } from 'lucide-react';

const cards = [
  {
    href: '/admin/consultas',
    icon: ClipboardList,
    title: 'Consultas del asistente',
    description: 'Revisá los casos que llegan por el chat, asignalos y cambiá el estado.',
    cta: 'Ver consultas',
  },
  {
    href: '/admin/publicaciones',
    icon: FileText,
    title: 'Publicaciones',
    description: 'Creá y publicá notas del estudio. Las publicadas aparecen en /publicaciones.',
    cta: 'Gestionar notas',
  },
];

export default function AdminHomePage() {
  return (
    <div className="mx-auto max-w-4xl p-6 md:p-10">
      <p className="text-sm font-medium uppercase tracking-[0.25em] text-accent">Panel de control</p>
      <h1 className="mt-2 font-headline text-3xl text-foreground md:text-4xl">Administración</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Sitio institucional Bengolea & Lamas. Las consultas del asistente y las notas nuevas viven acá, separadas del
        panel de planes de ahorro.
      </p>
      <div className="mt-10 grid gap-px border border-border bg-border md:grid-cols-2">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.href}
              href={card.href}
              className="group flex flex-col bg-background p-7 transition-colors hover:bg-secondary/40"
            >
              <div className="mb-5 flex h-10 w-10 items-center justify-center border border-primary/20">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <h2 className="font-headline text-2xl">{card.title}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{card.description}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-3">
                {card.cta} <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
