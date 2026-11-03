import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  title: string;
  description?: string;
  eyebrow?: string;
  className?: string;
};

// Centred H2 block used at the top of content sections
export function SectionHeader({
  title,
  description,
  eyebrow,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("mx-auto mb-12 max-w-3xl text-center", className)}>
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
