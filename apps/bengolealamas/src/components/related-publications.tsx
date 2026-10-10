import Link from 'next/link';
import { getAllPublicPublications } from '@/lib/bl-cms-publications';
import { publicationPath } from '@/lib/bl-publications';
import { publicationsRelatedToArea } from '@/lib/related-content';

export async function RelatedPublications({ areaId }: { areaId: string }) {
  const pubs = publicationsRelatedToArea(await getAllPublicPublications(), areaId, 3);
  if (!pubs.length) return null;

  return (
    <section className="mt-12 max-w-3xl border-t border-border pt-8" aria-labelledby={`${areaId}-notas`}>
      <h2 id={`${areaId}-notas`} className="font-headline text-lg font-normal text-foreground">
        Notas relacionadas
      </h2>
      <ul className="mt-4 space-y-2 text-sm">
        {pubs.map((pub) => (
          <li key={pub.slug}>
            <Link href={publicationPath(pub.slug)} className="font-medium text-accent hover:underline">
              {pub.title}
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-muted-foreground">
        <Link href="/publicaciones" className="hover:underline">
          Todas las publicaciones
        </Link>
        {' · '}
        <Link href="/jurisprudencia" className="hover:underline">
          Jurisprudencia
        </Link>
      </p>
    </section>
  );
}
