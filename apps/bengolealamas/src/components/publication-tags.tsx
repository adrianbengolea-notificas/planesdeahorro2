import Link from 'next/link';
import { tagSlug } from '@/lib/publication-tags';
import { cn } from '@/lib/utils';

type Props = {
  tags?: string[];
  className?: string;
  linkToFilter?: boolean;
};

export function PublicationTags({ tags, className, linkToFilter = false }: Props) {
  if (!tags?.length) return null;

  return (
    <ul className={cn('flex flex-wrap gap-1.5', className)}>
      {tags.map((tag) => {
        const classNames =
          'border border-border px-2 py-0.5 text-[11px] uppercase tracking-wide text-muted-foreground';
        return (
          <li key={tag.toLowerCase()}>
            {linkToFilter ? (
              <Link href={`/publicaciones?tag=${encodeURIComponent(tagSlug(tag))}`} className={`${classNames} hover:border-accent hover:text-accent`}>
                {tag}
              </Link>
            ) : (
              <span className={classNames}>{tag}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
