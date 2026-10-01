import { FileText } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { PublicationTags } from '@/components/publication-tags';
import type { BlPublication } from '@/lib/bl-publications';
import { formatPublicationDate, publicationPath, resolvePublicationThumbnail } from '@/lib/bl-publications';

type Props = {
  items: BlPublication[];
};

function PublicationThumb({ pub }: { pub: BlPublication }) {
  const src = resolvePublicationThumbnail(pub);
  const href = publicationPath(pub.slug);

  if (src) {
    const external = src.startsWith('http://') || src.startsWith('https://');
    return (
      <Link
        href={href}
        className="relative block aspect-[16/10] w-full shrink-0 overflow-hidden bg-muted sm:aspect-[4/3] sm:w-44 md:w-52"
      >
        {external ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt="" className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]" />
        ) : (
          <Image
            src={src}
            alt=""
            fill
            className="object-cover transition duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 640px) 100vw, 208px"
          />
        )}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="flex aspect-[16/10] w-full shrink-0 items-center justify-center bg-muted/80 text-muted-foreground sm:aspect-[4/3] sm:w-44 md:w-52"
      aria-label={`Ver nota: ${pub.title}`}
    >
      <FileText className="h-10 w-10 opacity-40" strokeWidth={1.25} />
    </Link>
  );
}

export function PublicationList({ items }: Props) {
  return (
    <ul className="grid gap-5 md:gap-6">
      {items.map((pub) => {
        const href = publicationPath(pub.slug);
        const authorLine = pub.author?.trim() || 'Estudio Bengolea & Lamas';
        const dateLine = pub.publishDate ? formatPublicationDate(pub.publishDate) : null;

        return (
          <li key={pub.guid || pub.slug}>
            <article className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-shadow hover:shadow-md sm:flex-row">
              <PublicationThumb pub={pub} />
              <div className="flex min-w-0 flex-1 flex-col p-5 md:p-6">
                <h2 className="font-headline text-lg font-normal leading-snug text-foreground md:text-xl">
                  <Link href={href} className="hover:text-accent">
                    {pub.title}
                  </Link>
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {authorLine}
                  {dateLine ? ` · ${dateLine}` : null}
                </p>
                {pub.excerpt ? (
                  <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground md:text-[0.9375rem]">
                    {pub.excerpt}
                  </p>
                ) : null}
                <PublicationTags tags={pub.tags} className="mt-3" linkToFilter />
                <Link href={href} className="mt-4 inline-flex w-fit text-sm font-medium text-accent hover:underline">
                  Leer nota →
                </Link>
              </div>
            </article>
          </li>
        );
      })}
    </ul>
  );
}
