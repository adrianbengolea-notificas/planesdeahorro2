import { FileText } from 'lucide-react';

type ContentEmptyStateProps = {
  title: string;
  description: string;
};

export function ContentEmptyState({ title, description }: ContentEmptyStateProps) {
  return (
    <div className="rounded-lg border border-dashed border-border bg-muted/40 px-6 py-10 text-center">
      <FileText className="mx-auto h-8 w-8 text-muted-foreground" aria-hidden />
      <h2 className="mt-4 font-headline text-lg font-semibold text-foreground">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}
