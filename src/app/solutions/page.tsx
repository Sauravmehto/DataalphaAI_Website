import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookCheck,
  CheckCircle,
  Landmark,
  LineChart,
  Scale,
  Search,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/sections/section-header";
import { FeatureCard } from "@/components/sections/feature-card";
import {
  dataHub,
  functionGroups,
  investmentManagement,
  type FunctionGroup,
} from "@/content/solutions-content";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 3600; // Revalidate every hour

const title = "Data Hub & Investment Management Solutions | DataAlpha";
const description =
  "Data Hub centralizes financial data for asset managers, and our investment management solutions connect research, trading, post-trade, controls, and accounting.";

export const metadata: Metadata = pageMetadata({ title, description, path: "/solutions/" });

const groupIcons: Record<FunctionGroup["icon"], LucideIcon> = {
  "pre-trade": Search,
  trading: LineChart,
  "post-trade": BookCheck,
  transparency: Scale,
  accounting: Landmark,
};

export default function SolutionsPage() {
  return (
    <div className="container py-24 sm:py-32">
      <div className="mx-auto mb-20 max-w-4xl text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">
          Our Solutions
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl">
          A centralized data platform and investment management solutions
          across the full investment lifecycle.
        </p>
      </div>

      <section id="data-hub" className="mx-auto mb-28 max-w-6xl scroll-mt-28">
        <SectionHeader
          eyebrow={dataHub.tagline}
          title={dataHub.title}
          description={dataHub.description}
          className="max-w-4xl"
        />

        <div className="mb-10 h-[310px] w-full overflow-hidden rounded-2xl border border-primary/20 bg-background shadow-lg sm:h-[410px] md:h-[420px] lg:h-[570px] xl:h-[680px]">
          <iframe
            src="/data_hub_enhanced_v2.html"
            title="Data Hub interactive demo"
            className="h-full w-full border-0"
            loading="lazy"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-border/60 bg-muted/30 p-6 sm:p-8">
            <h3 className="text-2xl font-semibold tracking-tight font-headline">
              Key Features
            </h3>
            <ul className="mt-5 space-y-4">
              {dataHub.keyFeatures.map((feature) => (
                <li key={feature} className="flex gap-3 text-muted-foreground">
                  <CheckCircle
                    className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border/60 bg-muted/30 p-6 sm:p-8">
            <h3 className="text-2xl font-semibold tracking-tight font-headline">
              Benefits
            </h3>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              {dataHub.benefits}
            </p>
            <Button asChild variant="outline" className="mt-6">
              <Link href="/solutions/data-hub">
                Explore Data Hub <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section
        id="investment-management-functions"
        className="mx-auto max-w-7xl scroll-mt-28"
      >
        <SectionHeader
          title={investmentManagement.title}
          description={investmentManagement.description}
          className="max-w-4xl"
        />

        <nav
          aria-label="Investment lifecycle stages"
          className="mb-14 flex flex-wrap justify-center gap-2"
        >
          {functionGroups.map((group) => (
            <a
              key={group.id}
              href={`#${group.id}`}
              className="rounded-full border border-border/70 px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
            >
              {group.shortName}
            </a>
          ))}
        </nav>

        <div className="space-y-16">
          {functionGroups.map((group) => {
            const Icon = groupIcons[group.icon];
            return (
              <div key={group.id} id={group.id} className="scroll-mt-28">
                <div className="mb-6 flex items-center gap-3 border-b border-border/60 pb-4">
                  <div className="rounded-full bg-primary/10 p-2.5">
                    <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight font-headline">
                    {group.name}
                    {group.name !== group.shortName && (
                      <span className="ml-2 text-base font-medium text-muted-foreground">
                        {group.shortName}
                      </span>
                    )}
                  </h3>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {group.functions.map((func) => (
                    <FeatureCard
                      key={func.title}
                      title={func.title}
                      description={func.description}
                      headingLevel="h4"
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-24 rounded-2xl bg-muted/30 py-16 text-center">
        <div className="container">
          <h2 className="mb-4 text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
            Ready to Transform Your Operations?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
            Let&apos;s discuss how DataAlpha can tailor a solution to fit your
            unique needs.
          </p>
          <Button asChild size="lg">
            <Link href="/contact">
              Book a Demo <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
