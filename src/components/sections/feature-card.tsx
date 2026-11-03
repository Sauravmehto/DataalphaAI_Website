import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type FeatureCardProps = {
  title: string;
  description: string;
  icon?: LucideIcon;
  id?: string;
  // Defaults to h3; use h4 when the card sits under an h3 group heading
  headingLevel?: "h3" | "h4";
  className?: string;
};

// Icon + heading + paragraph card shared by Services, Solutions and About
export function FeatureCard({
  title,
  description,
  icon: Icon,
  id,
  headingLevel: Heading = "h3",
  className,
}: FeatureCardProps) {
  return (
    <Card
      id={id}
      className={cn(
        "flex h-full scroll-mt-28 flex-col rounded-2xl border border-border/60 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10",
        className
      )}
    >
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="shrink-0 rounded-xl bg-primary/10 p-2.5">
            <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
          </div>
        )}
        <Heading className="text-lg font-semibold leading-snug tracking-tight font-headline">
          {title}
        </Heading>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </Card>
  );
}
