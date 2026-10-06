'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle,
  BarChart,
  ShieldCheck,
  Zap,
  DatabaseZap,
  BrainCircuit,
  Calculator,
  AppWindow,
  ChevronsDown,
  ChevronsUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DataFlowBackground from '@/components/data-flow-background';
import homeContent from '@/content/home.json';
import expertiseContent from '@/content/expertise.json';
import {
  frontOfficeFunctions,
  middleOfficeFunctions,
  backOfficeFunctions,
  solutions,
  whyDataAlphaIcons,
} from '@/lib/constants';
import { TechRibbon } from '@/components/tech-ribbon';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useState, useRef } from 'react';

const serviceIcons: { [key: string]: React.ElementType } = {
  DatabaseZap,
  BrainCircuit,
  Calculator,
  AppWindow,
};


const newFunctionGroups = [
  {
    name: 'Pre-Trade',
    functions: ['Deal Screening', 'Portfolio Optimization', 'Asset Allocation'],
  },
  {
    name: 'Trading',
    functions: [
      'Order Management',
      'Portfolio Management',
      'Client Relationship Management',
    ],
  },
  {
    name: 'Post-Trade',
    functions: [
      'Trade Settlement',
      'Market Data',
      'Asset Servicing',
      'Reconciliation',
      'Cash Management',
      'Treasury',
    ],
  },
  {
    name: 'Transparency',
    functions: [
      'Portfolio Control',
      'Risk Management',
      'Fund Compliance',
      'Performance Attribution',
      'Data Governance',
      'Investor Reporting',
    ],
  },
  {
    name: 'Accounting',
    functions: [
      'Portfolio Accounting',
      'Corporate Accounting',
      'Partner Accounting',
    ],
  },
];

export default function Home() {
  const expertiseSectionRef = useRef<HTMLElement>(null);
  const [openAccordionItem, setOpenAccordionItem] = useState<string | null>(null);

  const {
    hero,
    solutionsSection,
    whoWeServe,
    whyDataAlpha,
    clients,
    technologyServices,
  } = homeContent;

  const expertiseByMarket = expertiseContent.filter(
    (e) => e.category === 'markets'
  );

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative w-full pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <DataFlowBackground />
        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline bg-clip-text text-transparent bg-gradient-to-r from-primary dark:from-white to-primary/60 dark:to-gray-400">
                  {hero.title}
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  {hero.subtitle}
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg">
                  <Link href="/solutions">
                    {hero.cta.primary} <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <Link href="/contact">{hero.cta.secondary}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="who-we-serve"
        ref={expertiseSectionRef}
        className="w-full py-12 md:py-24 lg:py-32 bg-muted/20"
      >
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
                {whoWeServe.title}
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {whoWeServe.subtitle}
              </p>
            </div>
          </div>
          
          <div className="py-12">
             <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {expertiseByMarket.map((item) => (
                  <div key={item.title} className="p-4 bg-background/50 dark:bg-card rounded-lg shadow-sm transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/10">
                    <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                  </div>
                ))}
              </div>
          </div>

          <div className="text-center mt-4">
            <Button asChild size="lg" className="transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20">
              <Link href="/services">
                Learn More <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section
        id="solutions"
        className="w-full py-12 md:py-24 lg:py-32 bg-background"
      >
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                {solutionsSection.tag}
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                {solutionsSection.title}
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {solutionsSection.subtitle}
              </p>
            </div>
          </div>
           
          <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-2">
              {/* Data Hub Card */}
              <Card className="flex flex-col h-full transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/20">
                  <CardHeader>
                      <div className="flex items-center gap-4">
                          <div className="bg-primary/10 p-3 rounded-full">
                            <DatabaseZap className="h-8 w-8 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-2xl font-headline">Data Hub</CardTitle>
                             <p className="text-sm text-muted-foreground">Modern Central UI for Enterprise</p>
                          </div>
                      </div>
                  </CardHeader>
                  <CardContent className="flex-grow space-y-6">
                      <p className="text-muted-foreground">
                        Data Hub is API based UX build natively for asset managers; it connects to any API or database (Snowflake, SQL).
                      </p>
                      <div>
                          <h4 className="font-semibold text-foreground mb-3">Key Features</h4>
                          <ul className="space-y-2">
                              <li className="flex items-center gap-2 text-muted-foreground"><CheckCircle className="h-4 w-4 text-primary" /> Significant Value</li>
                              <li className="flex items-center gap-2 text-muted-foreground"><CheckCircle className="h-4 w-4 text-primary" /> Operational Efficiency</li>
                              <li className="flex items-center gap-2 text-muted-foreground"><CheckCircle className="h-4 w-4 text-primary" /> Data Accuracy and Compliance</li>
                              <li className="flex items-center gap-2 text-muted-foreground"><CheckCircle className="h-4 w-4 text-primary" /> Advanced Analytics and Insights</li>
                          </ul>
                      </div>
                  </CardContent>
                  <div className="p-6 pt-0">
                       <Button asChild variant="outline">
                          <Link href="/solutions/data-hub">
                              Learn More <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                      </Button>
                  </div>
              </Card>

              {/* Functions Card */}
              <Card className="flex flex-col h-full transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/20">
                  <CardHeader>
                     <div className="flex items-center gap-4">
                          <div className="bg-primary/10 p-3 rounded-full">
                            <BrainCircuit className="h-8 w-8 text-primary" />
                          </div>
                           <CardTitle className="text-2xl font-headline">Investment Management Functions</CardTitle>
                      </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                     <Accordion 
                        type="single" 
                        collapsible 
                        className="w-full"
                        onValueChange={setOpenAccordionItem}
                      >
                          {newFunctionGroups.map((group) => (
                            <AccordionItem value={group.name} key={group.name}>
                                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                                  <div className='flex justify-between w-full items-center'>
                                    <span>{group.name}</span>
                                    {openAccordionItem === group.name ? <ChevronsUp /> : <ChevronsDown />}
                                  </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <ul className="space-y-1 list-disc pl-5 text-muted-foreground">
                                        {group.functions.map(f => <li key={f}>{f}</li>)}
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                          ))}
                      </Accordion>
                  </CardContent>
                   <div className="p-6 pt-0">
                       <Button asChild variant="outline">
                          <Link href="/solutions#investment-management-functions">
                              Explore All Functions <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                      </Button>
                  </div>
              </Card>
          </div>
        </div>
      </section>

      <section
        id="tech-ecosystem"
        className="w-full py-12 md:py-24 lg:py-32 bg-muted/20"
      >
        <div className="container px-4 md-px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
                Our Technology Ecosystem
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We build on a foundation of robust, scalable, and
                enterprise-grade technologies.
              </p>
            </div>
          </div>
          <TechRibbon />
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/20">
        <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              {whyDataAlpha.tag}
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">
              {whyDataAlpha.title}
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {whyDataAlpha.subtitle}
            </p>
            <ul className="grid gap-4">
              {whyDataAlpha.features.map((feature) => {
                const Icon = whyDataAlphaIcons[feature.icon as keyof typeof whyDataAlphaIcons] || CheckCircle;
                return (
                  <li key={feature.title} className="flex items-start gap-3">
                    <Icon className="mt-1 h-5 w-5 text-primary" />
                    <div>
                      <h3 className="font-semibold">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="pt-6">
               <Button asChild size="lg" className="transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20">
                <Link href="/about">
                  Learn More <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src={whyDataAlpha.image.src}
              alt={whyDataAlpha.image.alt}
              width={600}
              height={400}
              data-ai-hint={whyDataAlpha.image.dataAiHint}
              className="rounded-xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
            {clients.title}
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed mt-4">
            {clients.subtitle}
          </p>
          {clients.logos && clients.logos.length > 0 && (
            <div className="mt-8 flex justify-center items-center gap-8 md:gap-12 lg:gap-16 text-muted-foreground">
              {clients.logos.map((logo) => (
                <p key={logo} className="text-lg font-semibold">
                  {logo}
                </p>
              ))}
            </div>
          )}
          <div className="mt-12 flex justify-center gap-4">
            {clients.cta && clients.cta.text && clients.cta.href && (
              <Button asChild size="lg">
                <Link href={clients.cta.href}>
                  {clients.cta.text} <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            )}
             <Button asChild size="lg" variant="secondary">
              <Link href="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
