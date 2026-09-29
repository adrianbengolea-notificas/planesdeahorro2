import Link from 'next/link';
import type { BlPublication } from '@/lib/bl-publications';
import { formatPublicationDate, publicationPath } from '@/lib/bl-publications';

type Props = {
  items: BlPublication[];
};

export function PublicationList({ items }: Props) {
  return (
    <ul className="divide-y divide-border border-y border-border">
      {items.map((pub) => (
        <li key={pub.guid || pub.slug} className="py-8 first:pt-0 last:pb-0">
          <article>
            <h2 className="font-headline text-xl font-normal leading-snug text-foreground md:text-2xl">
              <Link href={publicationPath(pub.slug)} className="hover:text-accent">
                {pub.title}
              </Link>
            </h2>
            <p className="mt-2 text-xs uppercase tracking-wide text-muted-foreground">
              {pub.author ? `${pub.author}` : 'Estudio Bengolea & Lamas'}
              {pub.publishDate ? ` · ${formatPublicationDate(pub.publishDate)}` : null}
            </p>
            {pub.excerpt ? (
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">{pub.excerpt}</p>
            ) : null}
            <Link
              href={publicationPath(pub.slug)}
              className="mt-4 inline-block text-sm font-medium text-accent hover:underline"
            >
              Leer nota
            </Link>
          </article>
        </li>
      ))}
    </ul>
  );
}
