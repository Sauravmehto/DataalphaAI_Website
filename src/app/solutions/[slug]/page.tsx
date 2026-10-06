import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { solutions, solutionIcons } from '@/lib/constants';
import Link from 'next/link';

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  // We are only generating a static page for 'data-hub' for now
  return solutions.filter(s => s.slug === 'data-hub').map((solution) => ({
    slug: solution.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const solution = solutions.find((s) => s.slug === params.slug);

  if (!solution) {
    return {
      title: 'Solution Not Found',
    };
  }

  return {
    title: `${solution.title} - DataAlpha AI`,
    description: solution.shortDescription,
  };
}


export default function SolutionDetailPage({ params }: { params: { slug: string } }) {
  if (params.slug !== 'data-hub') {
    notFound();
  }

  const solution = solutions.find((s) => s.slug === params.slug);

  if (!solution) {
    notFound();
  }

  const Icon = solutionIcons[solution.icon];

  return (
    <div className="container py-24 sm:py-32">
        <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
                {Icon && <Icon className="h-16 w-16 text-primary mx-auto mb-4" />}
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">
                {solution.title}
                </h1>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none mx-auto text-muted-foreground text-lg">
                <p className="lead mb-8">{solution.longDescription}</p>
                <Image
                    src="/solutions-datahub.png"
                    alt={solution.title}
                    width={800}
                    height={400}
                    data-ai-hint="datahub dashboard"
                    className="rounded-lg shadow-lg my-8"
                />
                <h2 className="font-headline text-3xl text-foreground">Key Features</h2>
                <ul>
                    <li>Significant Value</li>
                    <li>Operational Efficiency</li>
                    <li>Ensuring Data Accuracy and Compliance</li>
                    <li>Advanced Analytics and Insights</li>
                </ul>

                <h2 className="font-headline text-3xl text-foreground">Benefits</h2>
                <p>
                    Implementing our {solution.title} solution provides tangible benefits to your organization, including a single source of truth, streamlined workflows, and empowered decision-making through intuitive data visualization and powerful analytics.
                </p>
            </div>
            <div className="text-center mt-16">
                 <Button asChild size="lg">
                    <Link href="/contact">
                        Request a Demo for {solution.title}
                    </Link>
                </Button>
            </div>
        </div>
    </div>
  );
}
