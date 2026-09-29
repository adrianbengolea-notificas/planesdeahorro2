import Image from 'next/image';

type Props = {
  html: string;
  heroImage?: string | null;
  title: string;
};

export function PublicationBody({ html, heroImage, title }: Props) {
  return (
    <div className="mt-8">
      {heroImage ? (
        <div className="relative mb-10 aspect-[16/9] w-full max-w-3xl overflow-hidden bg-muted">
          {heroImage.startsWith('http://') || heroImage.startsWith('https://') ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={heroImage} alt={title} className="h-full w-full object-cover" />
          ) : (
            <Image src={heroImage} alt={title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" priority />
          )}
        </div>
      ) : null}
      <div
        className="publication-prose max-w-none text-base leading-relaxed text-foreground [&_a]:text-accent [&_a]:underline-offset-2 hover:[&_a]:underline [&_h2]:mt-10 [&_h2]:font-headline [&_h2]:text-xl [&_h3]:mt-8 [&_h3]:font-headline [&_img]:my-6 [&_img]:h-auto [&_img]:max-w-full [&_li]:my-1 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:my-4 [&_strong]:font-semibold [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
