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
    <section
      className="relative w-full bg-background px-4 pt-2 md:px-8 md:pt-4"
      aria-roledescription="carousel"
      aria-label="Presentación"
    >
      {/* Wix original: slideshow ~980×399 px, centrado (no full-bleed). */}
      <div className="relative mx-auto w-full max-w-[980px] overflow-hidden bg-muted">
        <div className="relative h-[220px] w-full sm:h-[280px] md:h-[340px] lg:h-[400px]">
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
              sizes="(max-width: 980px) 100vw, 980px"
              priority={i === 0}
            />
          </div>
          ))}

          <div className="absolute inset-0 z-20 flex items-stretch">
            <div className="flex w-full max-w-md flex-col justify-center bg-black/45 px-6 py-6 sm:px-8 sm:py-8 md:px-10 md:py-10">
              <h2 className="font-headline text-2xl font-normal text-white sm:text-3xl md:text-4xl">{slide.title}</h2>
              <div className="mt-4 flex flex-wrap gap-3 sm:mt-6">
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

          <nav className="absolute bottom-3 left-1/2 z-30 flex -translate-x-1/2 gap-2" aria-label="Diapositivas">
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
      </div>
    </section>
  );
}
