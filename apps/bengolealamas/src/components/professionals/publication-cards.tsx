import type { PublicationRef } from '@/config/publications-adrian';

type Props = {
  items: PublicationRef[];
};

export function PublicationCards({ items }: Props) {
  return (
    <ul className="mt-6 grid gap-4 md:grid-cols-2">
      {items.map((pub) => (
        <li key={pub.url} className="flex flex-col rounded-lg border border-border bg-card p-5">
          <h3 className="font-headline text-base font-normal leading-snug text-foreground">
            <a href={pub.url} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
              {pub.title}
            </a>
          </h3>
          <p className="mt-2 text-xs uppercase tracking-wide text-muted-foreground">
            {pub.source}
            {pub.date ? ` · ${pub.date}` : null}
          </p>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{pub.excerpt}</p>
          <a
            href={pub.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 text-sm font-medium text-accent hover:underline"
          >
            Leer en la fuente
          </a>
        </li>
      ))}
    </ul>
  );
}
