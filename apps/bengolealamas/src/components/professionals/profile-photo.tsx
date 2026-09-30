import { CoverImage } from '@/components/cover-image';
import { cn } from '@/lib/utils';

type Props = {
  src?: string;
  alt: string;
  pending?: boolean;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
};

export function ProfilePhoto({
  src,
  alt,
  pending,
  className,
  imageClassName,
  sizes = '(max-width: 1024px) 80vw, 360px',
  priority,
}: Props) {
  if (src && !pending) {
    return (
      <CoverImage
        src={src}
        alt={alt}
        className={className}
        imageClassName={imageClassName}
        sizes={sizes}
        priority={priority}
      />
    );
  }

  return (
    <div
      className={cn(
        'flex items-center justify-center border border-dashed border-border bg-muted/30 p-6 text-center text-sm text-muted-foreground',
        className,
      )}
      aria-label={alt}
    >
      Fotografía profesional — pendiente de incorporar.
    </div>
  );
}
