'use client';

import Link from 'next/link';
import { MessageSquare } from 'lucide-react';
import { CASE_INTAKE_COPY } from '@/config/case-intake';

export function FloatingCaseIntake() {
  return (
    <Link
      href="/contanos-tu-caso"
      className="group fixed bottom-20 left-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background shadow-md transition hover:bg-muted md:bottom-24 md:left-6"
      aria-label={CASE_INTAKE_COPY.floatLabel}
      title={CASE_INTAKE_COPY.floatLabel}
    >
      <MessageSquare className="h-5 w-5 text-accent" aria-hidden />
      <span className="pointer-events-none absolute left-full ml-2 hidden whitespace-nowrap rounded bg-foreground px-2 py-1 text-xs text-background opacity-0 transition group-hover:opacity-100 md:block">
        {CASE_INTAKE_COPY.floatLabel}
      </span>
    </Link>
  );
}
