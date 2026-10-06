import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatedCounter } from '@/components/animated-counter';

const caseStudies = [
  {
    client: 'Global Asset Manager',
    title: 'Automating Reconciliation for a $50B Fund',
    challenge: 'A global asset manager was struggling with a highly manual trade reconciliation process, leading to frequent errors, high operational costs, and significant delays in reporting.',
    solution: 'DataAlpha implemented its AI-powered Trade Reconciliation solution, automating over 98% of the matching process and providing a centralized dashboard for exception management.',
    image: 'https://picsum.photos/500/300',
    dataAiHint: 'finance chart',
    results: [
      { value: 98, label: 'Automation Rate', suffix: '%' },
      { value: 85, label: 'Reduction in Errors', suffix: '%' },
      { value: 60, label: 'Faster Closing Time', suffix: '%' },
    ],
  },
  {
    client: 'Regional Investment Bank',
    title: 'Streamlining Compliance & Reporting',
    challenge: 'A regional bank needed to enhance its compliance framework to keep up with evolving regulations, facing challenges with data silos and manual reporting.',
    solution: 'Our Risk & Compliance Automation platform was deployed to provide real-time monitoring and automated report generation, ensuring full compliance with local and international standards.',
    image: 'https://picsum.photos/500/300',
    dataAiHint: 'compliance document',
    results: [
      { value: 100, label: 'Audit Trail Coverage', suffix: '%' },
      { value: 40, label: 'Reduction in Reporting Time', suffix: '%' },
      { value: 50, label: 'Lower Compliance Costs', suffix: '%' },
    ],
  },
];

export default function CaseStudiesPage() {
  return (
    <div className="container py-24 sm:py-32">
      <div className="max-w-2xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">
          Client Success Stories
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Discover how leading financial institutions are leveraging DataAlpha AI to transform their operations.
        </p>
      </div>

      <div className="space-y-24">
        {caseStudies.map((study, index) => (
          <div key={index} className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={index % 2 !== 0 ? 'lg:order-2' : ''}>
              <div className="mb-2 text-sm font-semibold text-primary">{study.client}</div>
              <h2 className="text-3xl font-bold font-headline mb-4">{study.title}</h2>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-1">The Challenge</h3>
                  <p>{study.challenge}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">The Solution</h3>
                  <p>{study.solution}</p>
                </div>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                {study.results.map((result) => (
                  <Card key={result.label}>
                    <CardContent className="p-4">
                      <div className="text-3xl font-bold text-primary">
                        <AnimatedCounter to={result.value} />{result.suffix}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{result.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            <div className={index % 2 !== 0 ? 'lg:order-1' : ''}>
              <Image 
                src={study.image}
                alt={study.title}
                width={500}
                height={300}
                data-ai-hint={study.dataAiHint}
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
