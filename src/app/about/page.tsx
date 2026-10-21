import type { Metadata } from "next";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import {
  Linkedin,
  Users,
  Handshake,
  Lightbulb,
  Shield,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About DataAlpha | Financial Technology & AI",
  description:
    "Learn how DataAlpha helps alternative investment managers modernize financial data, AI, analytics, and investment technology.",
};

const leadershipTeam = [
  {
    name: "Vineet Gavri",
    role: "CEO & Founder",
    image: "/vineet-gavri.png",
    dataAiHint: "man portrait",
    linkedin: "https://www.linkedin.com/in/vineetgavri",
    bio: "Vineet has two decades of experience with asset managers including Carlyle, Blackstone, Apollo, and D.E. Shaw. At CIFC, a $40 billion alternative asset manager, he led applications development and enterprise data solutions. He holds an MBA (IIM Bangalore), a B.Tech. (IIT BHU), FRM, CAIA, and CFA Level 1.",
  },
  {
    name: "Seema Sawlani",
    role: "COO",
    image: "/Seema-Sawlani.jpg",
    dataAiHint: "man portrait developer",
    linkedin: "https://www.linkedin.com/in/seema-sawlani-b49b5282/",
    bio: "Seema leads DataAlpha's operations, drawing on over a decade of experience in finance, HR, corporate governance, and enterprise strategy. She focuses on operational excellence, process improvement, and people strategy, building the systems and teams that support the company's growth across the US and India.",
  },
  {
    name: "Sahil Malhotra",
    role: "Head of Business Development",
    image: "/Sahil-Malhotra.jpg",
    dataAiHint: "man portrait developer",
    linkedin: "https://www.linkedin.com/in/sahilbrijmalhotrapmp/",
    bio: "Sahil has more than 17 years of experience in strategic partnerships and business development across global markets. He builds relationships with financial institutions, asset managers, and enterprise clients, connecting their priorities with DataAlpha's AI, data, and financial technology solutions.",
  },
  {
    name: "Gaurav Singh",
    role: "Product Manager",
    image: "/gaurav-singh.png",
    dataAiHint: "man portrait professional",
    linkedin: "https://www.linkedin.com/in/gauravsingh010",
    bio: "Gaurav has nearly a decade of experience across capital markets, treasury, and risk, focused on product delivery and business analysis. He translates business requirements into data and analytics solutions. He holds a Master's in Business Finance from XIM University, a BE from BIT Mesra, and PMP and CSPO certifications.",
  },
  {
    name: "Rahul Soni",
    role: "Lead Engineer",
    image: "/rahul-soni.png",
    dataAiHint: "man portrait developer",
    linkedin: "https://www.linkedin.com/in/rahulsoni11",
    bio: "Rahul leads engineering execution at DataAlpha, focusing on technical delivery and scalable product development. He works across teams to build reliable solutions for complex data and technology requirements.",
  },
  {
    name: "Prashant Choudhary",
    role: "Head of Pre-Sales",
    image: "/Prashant-Choudhary.jpg",
    dataAiHint: "man portrait developer",
    linkedin: "https://www.linkedin.com/in/praashant001/",
    bio: "Prashant brings over nine years of solution consulting and pre-sales experience for alternative asset managers in private equity, private credit, hedge funds, real estate, and family offices. He specializes in solution architecture, enterprise data platforms, reporting, and workflow automation.",
  },
  {
    name: "Drishti Singh",
    role: "Lead Business Development",
    image: "/Drishti-Singh.png",
    dataAiHint: "man portrait developer",
    linkedin: "https://www.linkedin.com/in/drishti-s15/",
    bio: "Drishti's four-plus years span private markets, fund administration, and enterprise SaaS. She partners with alternative investment firms on AI, data infrastructure, portfolio intelligence, due diligence automation, and workflow optimization, and has engaged stakeholders across the US, UK, Europe, Middle East, and Africa.",
  },
  {
    name: "Bhawna Hotwani",
    role: "Strategic Partnerships & Talent Engagement",
    image: "/Bhawna-Hotwani.jpg",
    dataAiHint: "man portrait developer",
    linkedin: "https://www.linkedin.com/in/bhawna-hotwany-89a36a5a/",
    bio: "Bhawna has over five years of experience in strategic partnerships, talent engagement, and stakeholder relationships. She develops industry and technology partnerships and leads talent initiatives for DataAlpha's global operations, aligning people and partnership efforts with business priorities.",
  },
  {
    name: "Iti Attri",
    role: "Lead – People & Culture",
    image: "/Iti-Attri.png",
    dataAiHint: "man portrait developer",
    linkedin: "https://www.linkedin.com/in/iti-attri/",
    bio: "Iti leads DataAlpha's people strategy, with over eight years of experience in HR business partnering, talent strategy, organizational development, and HR transformation. Her background spans fintech, healthcare, and real estate, where she led workforce transformation, employee engagement, and culture initiatives.",
  },
];

const values = [
  {
    icon: Users,
    title: "Community",
    description:
      "We build lasting partnerships with clients and colleagues through collaboration, shared goals, and long-term thinking.",
  },
  {
    icon: Handshake,
    title: "Trust",
    description:
      "We earn client trust by understanding their challenges in depth, communicating clearly, and taking ownership of delivery.",
  },
  {
    icon: Lightbulb,
    title: "Meritocracy",
    description:
      "We encourage open discussion and bottom-up ideas, and let the strongest idea win, wherever it comes from.",
  },
  {
    icon: Shield,
    title: "Integrity",
    description:
      "We act honestly, learn from our mistakes, and keep improving as individuals and as a company.",
  },
];

export default function AboutPage() {
  return (
    <div className="py-24 sm:py-32">
      <section className="container text-center mb-12">
        <p className="text-3xl font-bold tracking-tighter text-primary mb-4 font-headline">
          About DataAlpha
        </p>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">
          Turning Financial Data into Alpha
        </h1>
      </section>

      <section className="container max-w-3xl mx-auto mb-16">
        <div className="space-y-5 text-lg text-center">
          <p className="text-foreground">
            DataAlpha helps alternative investment managers turn financial data
            into actionable intelligence through modern data engineering, AI,
            analytics, and financial technology.
          </p>
          <p className="text-muted-foreground">
            We work with hedge funds, private equity, private credit, real
            estate, and other alternative investment managers. Our teams build
            data platforms, analytics solutions, AI applications, and investment
            technology that give firms clearer visibility into their portfolios,
            more efficient workflows, and stronger risk analysis.
          </p>
          <p className="text-muted-foreground">
            We pair financial domain expertise with hands-on technology
            delivery, working alongside each client&apos;s team from design
            through implementation so they can make better-informed investment
            decisions.
          </p>
        </div>
      </section>

      <section className="container py-12">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
            Leadership Team
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Experienced leaders combining deep asset management domain knowledge
            with modern technology execution.
          </p>
        </div>
        {/* Each card: bio | divider | centred profile, then a full-width strip
            holding the LinkedIn button. 2 cards per row from lg, 3 from xl; below
            sm the bio and profile stack. */}
        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 lg:max-w-none lg:grid-cols-2 xl:grid-cols-3">
          {leadershipTeam.map((member) => (
            <Card
              key={member.name}
              className="flex flex-col overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-b from-card to-card/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20"
            >
              <div className="grid flex-1 grid-cols-1 sm:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
                <p className="min-w-0 p-5 text-sm leading-relaxed text-muted-foreground sm:self-center sm:pr-5 lg:self-start">
                  {member.bio}
                </p>
                {/* On mobile the profile leads, so readers see who the bio is about */}
                <div className="order-first flex min-w-0 flex-col items-center border-b border-primary/15 p-5 text-center sm:order-none sm:border-b-0 sm:border-l">
                  <Image
                    src={member.image}
                    alt={`Portrait of ${member.name}, ${member.role} at DataAlpha`}
                    width={160}
                    height={192}
                    sizes="160px"
                    data-ai-hint={member.dataAiHint}
                    className="aspect-[5/6] w-full max-w-[9rem] rounded-xl border border-primary/30 object-cover object-top xl:max-w-[8.5rem] 2xl:max-w-[9.5rem]"
                  />
                  <h3 className="mt-4 break-words text-lg font-semibold leading-snug tracking-tight text-foreground">
                    {member.name}
                  </h3>
                  <p className="mt-1 break-words text-sm font-medium leading-snug text-primary">
                    {member.role}
                  </p>
                </div>
              </div>
              <div className="flex justify-center border-t border-primary/15 bg-primary/5 px-5 py-4">
                <Link
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} on LinkedIn (opens in a new tab)`}
                  className="inline-flex min-w-[10rem] items-center justify-center rounded-lg border border-primary/40 px-6 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Linkedin className="mr-2.5 h-4 w-4 shrink-0" />
                  <span>LinkedIn</span>
                  <ArrowUpRight className="ml-2.5 h-4 w-4 shrink-0 opacity-70" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-muted/30 py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
              Our Values
            </h2>
            <p className="mt-6 text-xl text-muted-foreground">
              Our values shape our culture and guide every decision we make.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <Card
                  key={value.title}
                  className="bg-card transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20"
                >
                  <CardHeader className="flex flex-row items-center gap-4 pb-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle role="heading" aria-level={3} className="text-2xl font-headline">
                      {value.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 text-center">
        <div className="container">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline mb-4">
            Let&apos;s Build What&apos;s Next
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-8">
            Explore how DataAlpha can support your investment technology goals.
          </p>
          <Button asChild size="lg">
            <Link href="/contact">
              Contact Us <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
