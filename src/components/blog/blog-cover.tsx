import Image from "next/image";
import {
  BrainCircuit,
  Building2,
  CandlestickChart,
  Compass,
  Database,
  Leaf,
  Newspaper,
  ShieldCheck,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const categoryIcons: Record<string, LucideIcon> = {
  "AI & Automation": BrainCircuit,
  "Data Management": Database,
  "Risk & Portfolio": ShieldCheck,
  Operations: Workflow,
  "Hedge Funds": CandlestickChart,
  Commodities: Leaf,
  "Family Offices": Building2,
  "Technology Strategy": Compass,
};

type BlogCoverProps = {
  title: string;
  category: string;
  image?: string;
  // "hero" is the large cover on the post page
  size?: "card" | "hero";
  className?: string;
  priority?: boolean;
};

// Fills its (relatively positioned) parent. Uses the post image when there is
// one, otherwise a branded cover (category + icon, no title: the title is
// always shown right next to it) so every post has a consistent visual.
export function BlogCover({
  title,
  category,
  image,
  size = "card",
  className,
  priority,
}: BlogCoverProps) {
  if (image) {
    return (
      <Image
        src={image}
        alt={title}
        fill
        priority={priority}
        sizes={size === "hero" ? "(min-width: 1024px) 896px, 100vw" : "(min-width: 1024px) 400px, 100vw"}
        className={cn("object-cover", className)}
      />
    );
  }

  const Icon = categoryIcons[category] ?? Newspaper;
  const hero = size === "hero";

  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 flex flex-col justify-between overflow-hidden bg-[linear-gradient(135deg,#070b2b_0%,#111a5c_55%,#2b3aa8_100%)] text-white",
        hero ? "p-6 sm:p-8" : "p-6",
        className
      )}
    >
      {/* Decorative grid and glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.6)_1px,transparent_1px)] [background-size:32px_32px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#6b7cff]/40 blur-3xl"
      />
      <Icon
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute right-[8%] top-1/2 -translate-y-1/2 text-white/25",
          hero ? "h-24 w-24 sm:h-36 sm:w-36" : "h-28 w-28"
        )}
        strokeWidth={1}
      />

      <div className="relative flex items-center gap-2">
        <span className="rounded-full bg-white/10 p-2 ring-1 ring-white/20">
          <Icon className={hero ? "h-5 w-5" : "h-4 w-4"} aria-hidden="true" />
        </span>
        <span className="text-xs font-semibold uppercase tracking-wider text-white/80">
          {category}
        </span>
      </div>

      <span className="relative text-xs font-semibold tracking-wide text-white/60">
        DataAlpha Insights
      </span>
    </div>
  );
}
