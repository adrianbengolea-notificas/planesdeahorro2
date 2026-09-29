import { CoverImage } from '@/components/cover-image';
import { normalizePublicationHtml } from '@/lib/normalize-publication-html';

type Props = {
  html: string;
  heroImage?: string | null;
  title: string;
};

export function PublicationBody({ html, heroImage, title }: Props) {
  const bodyHtml = normalizePublicationHtml(html);

  return (
    <div className="mt-8">
      {heroImage ? (
        <CoverImage
          src={heroImage}
          alt={title}
          className="mb-10 aspect-[16/9] w-full rounded-lg"
          sizes="(max-width: 768px) 100vw, 768px"
          priority
        />
      ) : null}
      <div
        className="publication-prose text-base leading-relaxed text-foreground [&_a]:text-accent [&_a]:underline-offset-2 hover:[&_a]:underline [&_h2]:mt-10 [&_h2]:font-headline [&_h2]:text-xl [&_h3]:mt-8 [&_h3]:font-headline [&_li]:my-1 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:my-4 [&_strong]:font-semibold [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6"
        dangerouslySetInnerHTML={{ __html: bodyHtml }}
      />
    </div>
  );
}
