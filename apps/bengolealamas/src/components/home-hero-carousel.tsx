'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { HomeSlide } from '@/config/wix-brand';
import { cn } from '@/lib/utils';

type Props = {
  slides: HomeSlide[];
};

export function HomeHeroCarousel({ slides }: Props) {
  const [index, setIndex] = useState(0);
  const count = slides.length;

  const go = useCallback(
    (delta: number) => {
      setIndex((i) => (i + delta + count) % count);
    },
    [count],
  );

  useEffect(() => {
    const timer = window.setInterval(() => go(1), 8000);
    return () => window.clearInterval(timer);
  }, [go]);

  const slide = slides[index];

  return (
    <section className="relative w-full overflow-hidden bg-muted" aria-roledescription="carousel" aria-label="Presentación">
      <div className="relative aspect-[21/9] min-h-[280px] w-full md:min-h-[360px] lg:min-h-[420px]">
        {slides.map((s, i) => (
          <div
            key={s.id}
            className={cn(
              'absolute inset-0 transition-opacity duration-700',
              i === index ? 'opacity-100 z-10' : 'opacity-0 z-0',
            )}
            aria-hidden={i !== index}
          >
            <Image
              src={s.image}
              alt=""
              fill
              className="object-cover object-center"
              sizes="100vw"
              priority={i === 0}
            />
          </div>
        ))}

        <div className="absolute inset-0 z-20 flex items-stretch">
          <div className="flex w-full max-w-md flex-col justify-center bg-black/45 px-8 py-10 md:px-12 md:py-14">
            <h2 className="font-headline text-3xl font-normal text-white md:text-4xl lg:text-[2.75rem]">{slide.title}</h2>
            <div className="mt-8 flex flex-wrap gap-4">
              {slide.primaryCta ? (
                <Link
                  href={slide.primaryCta.href}
                  className="inline-flex border border-white px-8 py-2.5 text-sm font-medium tracking-wide text-white transition-colors hover:bg-white hover:text-foreground"
                >
                  {slide.primaryCta.label}
                </Link>
              ) : null}
              {slide.secondaryCta ? (
                <Link
                  href={slide.secondaryCta.href}
                  className="inline-flex border border-white/70 px-8 py-2.5 text-sm font-medium tracking-wide text-white/90 transition-colors hover:bg-white/10"
                >
                  {slide.secondaryCta.label}
                </Link>
              ) : null}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => go(-1)}
          className="absolute left-3 top-1/2 z-30 -translate-y-1/2 p-2 text-white/90 transition hover:text-white md:left-6"
          aria-label="Diapositiva anterior"
        >
          <ChevronLeft className="h-8 w-8 md:h-10 md:w-10" strokeWidth={1.25} />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          className="absolute right-3 top-1/2 z-30 -translate-y-1/2 p-2 text-white/90 transition hover:text-white md:right-6"
          aria-label="Diapositiva siguiente"
        >
          <ChevronRight className="h-8 w-8 md:h-10 md:w-10" strokeWidth={1.25} />
        </button>

        <nav className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 gap-2" aria-label="Diapositivas">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setIndex(i)}
              className={cn(
                'h-2.5 w-2.5 rounded-full border border-white/80 transition',
                i === index ? 'bg-white' : 'bg-transparent hover:bg-white/40',
              )}
              aria-label={`Diapositiva ${i + 1}: ${s.title}`}
              aria-current={i === index ? 'true' : undefined}
            />
          ))}
        </nav>
      </div>
    </section>
  );
}
