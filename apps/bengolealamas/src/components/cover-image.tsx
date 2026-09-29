import Image from 'next/image';
import { cn } from '@/lib/utils';

type Props = {
  src: string;
  alt: string;
  /** Clases del contenedor (incl. aspect-ratio, max-w, etc.) */
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
};

export function CoverImage({ src, alt, className, imageClassName, sizes, priority }: Props) {
  const external = src.startsWith('http://') || src.startsWith('https://');

  return (
    <div className={cn('relative overflow-hidden bg-muted', className)}>
      {external ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className={cn('h-full w-full object-cover', imageClassName)} />
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          className={cn('object-cover', imageClassName)}
          sizes={sizes}
          priority={priority}
        />
      )}
    </div>
  );
}
