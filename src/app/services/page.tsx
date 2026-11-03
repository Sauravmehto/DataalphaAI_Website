import servicesData from '@/content/services-content.json';
import type { LucideIcon } from 'lucide-react';
import { serviceIcons } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { FundRibbon } from '@/components/fund-ribbon';
import { SectionHeader } from '@/components/sections/section-header';
import { FeatureCard } from '@/components/sections/feature-card';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: servicesData.seo.title,
  description: servicesData.seo.description,
  path: '/services/',
});

const iconFor = (key: string) =>
  serviceIcons[key as keyof typeof serviceIcons] as LucideIcon | undefined;

export default function ServicesPage() {
  const { intro, fundsServices, techServices, cta } = servicesData;

  return (
    <div className="container py-24 sm:py-32">
      <div className="mx-auto mb-20 max-w-4xl text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">
          Our Services
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl">
          {intro}
        </p>
      </div>

      <section id="tech-services" className="mb-24 scroll-mt-28">
        <SectionHeader
          title={techServices.title}
          description={techServices.description}
          className="max-w-4xl"
        />
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          {techServices.items.map((service) => (
            <FeatureCard
              key={service.anchorId}
              id={`tech-${service.anchorId}`}
              icon={iconFor(service.icon)}
              title={service.title}
              description={service.description}
              className="bg-muted/30"
            />
          ))}
        </div>
      </section>

      <section id="funds-services" className="mb-24 scroll-mt-28">
        <SectionHeader
          title={fundsServices.title}
          description={fundsServices.description || undefined}
          className="mb-4"
        />
        <FundRibbon />
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {fundsServices.items.map((service) => (
            <FeatureCard
              key={service.anchorId}
              id={`fund-${service.anchorId}`}
              icon={iconFor(service.icon)}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </section>

      <section className="rounded-2xl bg-muted/30 py-16 text-center">
        <div className="container">
          <h2 className="mb-4 text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
            {cta.title}
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
            {cta.subtitle}
          </p>
          <Button asChild size="lg">
            <Link href="/contact">
              {cta.buttonText} <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
