import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import servicesData from '@/content/services-content.json';
import type { LucideIcon } from 'lucide-react';
import { serviceIcons } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FundRibbon } from '@/components/fund-ribbon';

const toAnchorId = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');


export default function ServicesPage() {
  const { intro, fundsServices, techServices, cta } = servicesData;

  return (
    <div className="container py-24 sm:py-32">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">
          Our Services
        </h1>
        <p className="mt-6 text-xl text-muted-foreground">
          {intro}
        </p>
      </div>
      
      {/* Tech Services Section */}
       <section id="tech-services" className="mb-24">
        <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl fontheadline">
                {techServices.title}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
                {techServices.description}
            </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {techServices.items.map((service) => {
            const Icon = serviceIcons[service.icon as keyof typeof serviceIcons] as LucideIcon | undefined;
            return (
              <Card
                key={service.title}
                id={`tech-${toAnchorId(service.title)}`}
                className="scroll-mt-28 bg-muted/30 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 flex flex-col"
              >
                <CardHeader className="flex flex-row items-center gap-4 pb-4">
                  {Icon && (
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                  )}
                  <CardTitle className="text-2xl font-headline">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      
      {/* Funds Services Section */}
      <section id="funds-services" className="mb-24">
        <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
                {fundsServices.title}
            </h2>
             <p className="mt-4 text-lg text-muted-foreground">
                {fundsServices.description}
            </p>
        </div>
        <FundRibbon />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {fundsServices.items.map((service) => {
              const Icon = serviceIcons[service.icon as keyof typeof serviceIcons] as LucideIcon | undefined;
              return (
                <Card
                  key={service.title}
                  id={`fund-${toAnchorId(service.title)}`}
                  className="scroll-mt-28 bg-card transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 flex flex-col"
                >
                  <CardHeader>
                    <CardTitle className="text-xl font-headline flex items-center gap-3">
                       {Icon && (
                          <div className="bg-primary/10 p-2 rounded-full">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                        )}

                    {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              );
            })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-16 bg-muted/30 rounded-lg">
          <div className="container">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline mb-4">
                  {cta.title}
              </h2>
              <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-8">
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
