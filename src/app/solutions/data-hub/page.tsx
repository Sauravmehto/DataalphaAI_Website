import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { dataHub } from '@/content/solutions-content';
import { pageMetadata } from '@/lib/seo';

const title = `${dataHub.title} | ${dataHub.tagline} | DataAlpha`;

export const metadata: Metadata = pageMetadata({
  title,
  description: dataHub.summary,
  path: '/solutions/data-hub/',
  image: {
    url: '/solutions-datahub.png',
    alt: 'Data Hub dashboard showing consolidated financial data for asset managers',
  },
});

export default function DataHubPage() {
  return (
    <div className="container py-24 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/solutions"
          className="mb-8 inline-flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="mr-1.5 h-4 w-4" />
          All Solutions
        </Link>

        <div className="mb-12 text-center">
          <LayoutDashboard className="mx-auto mb-4 h-14 w-14 text-primary" aria-hidden="true" />
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">
            {dataHub.title}
          </h1>
          <p className="mt-3 text-xl font-medium text-primary">{dataHub.tagline}</p>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            {dataHub.description}
          </p>
        </div>

        <Image
          src="/solutions-datahub.png"
          alt="Data Hub dashboard showing consolidated financial data for asset managers"
          width={1200}
          height={600}
          className="mb-12 w-full rounded-2xl border border-primary/20 shadow-lg"
        />

        <div className="grid gap-6 md:grid-cols-2">
          <section className="rounded-2xl border border-border/60 bg-muted/30 p-6 sm:p-8">
            <h2 className="text-2xl font-semibold tracking-tight font-headline">
              Key Features
            </h2>
            <ul className="mt-5 space-y-4">
              {dataHub.keyFeatures.map((feature) => (
                <li key={feature} className="flex gap-3 text-muted-foreground">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </section>
          <section className="rounded-2xl border border-border/60 bg-muted/30 p-6 sm:p-8">
            <h2 className="text-2xl font-semibold tracking-tight font-headline">Benefits</h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">{dataHub.benefits}</p>
          </section>
        </div>

        <div className="mt-16 text-center">
          <Button asChild size="lg">
            <Link href="/contact">
              Request a Data Hub Demo <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
