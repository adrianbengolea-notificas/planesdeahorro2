import { Gavel } from 'lucide-react';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 text-primary ${className}`}>
      <Gavel className="h-7 w-7 md:h-8 md:w-8" />
      <span className="font-headline text-2xl md:text-3xl font-bold tracking-tighter">
        JurisPlan
      </span>
    </div>
  );
}
