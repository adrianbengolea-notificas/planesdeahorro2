import { cn } from '@/lib/utils';

type Props = {
  id?: string;
  title: string;
  children: React.ReactNode;
  className?: string;
};

export function ProfileSection({ id, title, children, className }: Props) {
  return (
    <section id={id} className={cn('scroll-mt-24 border-t border-border pt-10 first:border-t-0 first:pt-0', className)}>
      <h2 className="font-headline text-2xl font-normal text-foreground md:text-[1.65rem]">{title}</h2>
      <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">{children}</div>
    </section>
  );
}
