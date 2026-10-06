"use client";

import { useState } from "react";
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
import { cn } from "@/lib/utils";

const leadershipTeam = [
  {
    name: "Vineet Gavri",
    role: "CEO & Founder",
    image: "/vineet-gavri.png",
    dataAiHint: "man portrait",
    linkedin: "https://www.linkedin.com/in/vineetgavri",
    details: [
      "Vineet brings two decades of experience with top-tier asset managers. He served as Managing Director and Head of Applications Development at CIFC, a $40 billion alternative asset manager, where he built an enterprise suite of applications and data solutions. He has also worked with major asset managers including Carlyle, Blackstone, Apollo, and D.E. Shaw, where he has created and executed technology and data strategies to help managers generate alpha.",
      "Vineet holds an MBA from IIM Bangalore and a B.Tech. in Computer Science from IIT BHU. He also holds FRM, CFA Level 1, and CAIA.",
    ],
  },
  {
    name: "Seema Sawlani",
    role: "COO",
    image: "/Seema-Sawlani.jpg",
    dataAiHint: "man portrait developer",
    linkedin: "https://www.linkedin.com/in/seema-sawlani-b49b5282/",
    details: [
      "Seema Sawlani is the Chief Operating Officer at DataAlpha, bringing over a decade of leadership experience across Finance, Operations, Human Resources, Corporate Governance, and Enterprise Strategy. She leads the operational backbone of the organization, driving organizational scale, operational excellence, and execution across DataAlpha's global business.",
      "With deep expertise in business transformation, process optimization, financial operations, people strategy, and enterprise governance, Seema is instrumental in building the systems and operating framework that enable DataAlpha to deliver AI-powered data, analytics, and automation solutions to leading financial institutions. Her leadership ensures seamless execution, cross-functional alignment, and a culture of innovation, positioning DataAlpha for sustainable growth across the US and India.",
    ],
  },
  {
    name: "Sahil Malhotra",
    role: "Head of Business Development",
    image: "/Sahil-Malhotra.jpg",
    dataAiHint: "man portrait developer",
    linkedin: "https://www.linkedin.com/in/sahilbrijmalhotrapmp/",
    details: [
      "Sahil Malhotra leads business development at DataAlpha with over 17 years of experience, driving strategic partnerships and business growth across global markets. He collaborates with financial institutions, asset managers, and enterprise clients to align their business objectives with DataAlpha's AI, data, and financial technology solutions.",
      "With a consultative approach and a strong focus on client success, Sahil helps organizations accelerate digital transformation through innovative, data-driven solutions. He is committed to building long-term relationships and delivering measurable business value while supporting DataAlpha's mission of helping clients generate alpha through data and artificial intelligence.",
    ],
  },
  {
    name: "Gaurav Singh",
    role: "Product Manager",
    image: "/gaurav-singh.png",
    dataAiHint: "man portrait professional",
    linkedin: "https://www.linkedin.com/in/gauravsingh010",
    details: [
      "Gaurav brings nearly ten years of experience across capital markets, treasury, and risk, with a focus on product delivery, business analysis, and data-driven transformations. He has partnered with global financial institutions and engineering teams to translate complex business needs into scalable front-to-back solutions.",
      "At DataAlpha, he drives product and delivery execution, bridging business and technology to deliver analytics, automation, and data platforms that enhance efficiency, risk management, and decision-making.",
      "He holds a Master's in Business Finance from XIM University and a BE in Computer Science from BIT Mesra, and is PMP and CSPO certified.",
    ],
  },
  {
    name: "Rahul Soni",
    role: "Lead Engineer",
    image: "/rahul-soni.png",
    dataAiHint: "man portrait developer",
    linkedin: "https://www.linkedin.com/in/rahulsoni11",
    details: [
      "Rahul leads engineering execution at DataAlpha, combining deep technical expertise with a practical, delivery-focused mindset. He works closely with clients and cross-functional teams to build robust, scalable solutions that turn complex data challenges into dependable products.",
    ],
  },
  {
    name: "Prashant Choudhary",
    role: "Head of Pre-Sales",
    image: "/Prashant-Choudhary.jpg",
    dataAiHint: "man portrait developer",
    linkedin: "https://www.linkedin.com/in/praashant001/",
    details: [
      "Prashant Choudhary is the Head of Pre-Sales at DataAlpha with over nine years of experience, leading solution consulting and pre-sales initiatives for alternative asset managers across private equity, private credit, hedge funds, real estate, and family offices. He partners with clients to understand business challenges and design AI-powered, data-driven solutions that streamline investment operations and accelerate digital transformation.",
      "His expertise spans solution architecture, stakeholder engagement, and enterprise data platforms, helping investment firms modernize reporting, workflow automation, and operational processes through intelligent technology.",
    ],
  },
  {
    name: "Drishti Singh",
    role: "Lead Business Development",
    image: "/Drishti-Singh.png",
    dataAiHint: "man portrait developer",
    linkedin: "https://www.linkedin.com/in/drishti-s15/",
    details: [
      "Drishti Singh is a Lead Business Development at DataAlpha with 4+ years of experience across Private Equity, Private Credit, Venture Capital, Family Offices, Fund Administration, and AI-powered Enterprise SaaS. She partners with alternative asset managers globally to drive operational transformation through AI, data infrastructure, portfolio intelligence, due diligence automation, and workflow optimization.",
      "Leveraging her Private Capital background and deep understanding of investment operations, Drishti works closely with C-suite leaders to deliver technology solutions that enhance efficiency, reporting, and decision-making. Having built strategic relationships and expanded business across the US, UK, Europe, Middle East, and Africa, she brings a unique blend of industry expertise, commercial acumen, and global market insight to every engagement.",
    ],
  },
  {
    name: "Bhawna Hotwani",
    role: "Strategic Partnerships & Talent Engagement",
    image: "/Bhawna-Hotwani.jpg",
    dataAiHint: "man portrait developer",
    linkedin: "https://www.linkedin.com/in/bhawna-hotwany-89a36a5a/",
    details: [
      "Bhawna Hotwani is the Strategic Partnerships & Talent Engagement lead at DataAlpha with over five years of experience, driving strategic alliances and talent initiatives that strengthen the company's growth and client success. She collaborates with industry partners, clients, and technology ecosystems to foster meaningful relationships while identifying and engaging top talent to support DataAlpha's expanding global operations.",
      "Her expertise spans strategic partnerships, talent acquisition, stakeholder engagement, and relationship management, enabling the organization to build high-performing teams and cultivate long-term collaborations. By aligning business objectives with people and partnership strategies, Bhawna plays a key role in enhancing organizational capabilities and supporting the delivery of innovative, AI-driven solutions to the alternative investment industry.",
    ],
  },
  {
    name: "Iti Attri",
    role: "Lead – People & Culture",
    image: "/Iti-Attri.png",
    dataAiHint: "man portrait developer",
    linkedin: "https://www.linkedin.com/in/iti-attri/",
    details: [
      "Iti Attri is the Lead – People & Culture at DataAlpha, leading the company's people strategy to foster a high-performing, people-first culture. With over eight years of experience in Human Resources Business Partnering, talent strategy, organizational development, and HR transformation, she partners with leadership to build scalable people practices that drive business growth and organizational excellence.",
      "Before joining DataAlpha, Iti held HR leadership roles across the fintech, healthcare, and real estate sectors, leading workforce transformation, employee engagement, and culture initiatives. Passionate about empowering people and nurturing inclusive workplaces, she combines strategic insight with a people-centric approach to create environments where individuals, teams, and businesses thrive together.",
    ],
  },
];

const values = [
  {
    icon: Users,
    title: "Community",
    description:
      "We believe we go further together. We seek win-win games, focus on long term partnerships with our clients and employees, creating a culture that fosters collaboration and joint pursuit of growth.",
  },
  {
    icon: Handshake,
    title: "Trust",
    description:
      "Our top priority is to earn our client’s trust by putting ourselves in their shoes, understanding their problems in-depth and exceeding delivery expectations.",
  },
  {
    icon: Lightbulb,
    title: "Meritocracy",
    description:
      "We ensure that the best idea in the room wins, regardless of where they come from. We encourage open discussions, bottom-up innovations and a bias-free solutions mindset.",
  },
  {
    icon: Shield,
    title: "Integrity",
    description:
      "It is humane to make mistakes, but we do not intend to make the same mistake twice. We foster a culture of truth, communication and introspection that facilitates continuous improvement of each individual and the organization as a whole.",
  },
];

export default function AboutPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="py-24 sm:py-32">
      <section className="container text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tighter text-primary mb-4 font-headline">
          About DataAlpha
        </h2>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">
          We help generate Alpha leveraging your data.
        </h1>
      </section>

      <section className="container max-w-4xl mx-auto mb-24">
        <div className="space-y-6 text-lg text-center">
          <p className="text-muted-foreground">
            The world of alternative investments is evolving — and the edge now
            belongs to those who can turn data into intelligence and
            intelligence into performance. At DataAlpha, we exist at that
            intersection — where data meets alpha. As a next-generation
            technology consulting firm, we help alternative asset management
            firms harness data and AI to transform the way they invest, operate,
            and scale.
          </p>
          <p className="text-foreground">
            Our expertise spans the full technology stack — from modern data
            architectures and advanced analytics to intelligent automation and
            AI-driven decision systems. We design and implement end-to-end
            solutions that empower firms to uncover insights, accelerate
            execution, and outperform in a dynamic market. The next generation
            of Alternative Management Industry won’t simply survive; they’ll
            thrive by embracing the power of data and the possibilities of AI.
            That’s where we come in: to drive this transformation and expand the
            limits of what’s possible.
          </p>
          <p className="text-muted-foreground">
            By deeply understanding each firm’s unique challenges and delivering
            tailored, innovative solutions, we unlock their full potential. With
            stakes higher than ever, the firms poised to lead the next wave of
            innovation are those leveraging data and AI to transform how
            investments are made, risks are managed, and value is created. From
            building robust data architectures to delivering real-time,
            actionable intelligence, we equip alternative asset managers with
            the tools they need to outperform in an increasingly competitive
            market. But beyond technology, we bring partnership and Domain
            skills. We work hand-in-hand with clients to reimagine their
            strategies, streamline their Technology operations, and build next
            generation Platform to unlock value at every level of their
            investment lifecycle.
          </p>
          <p className="text-foreground">
            At DataAlpha, we don’t just enable smarter investing through our
            data-driven AI approach. We build the intelligence that defines the
            future of the buy side, and together we’re not just adapting to
            change—we’re shaping it.
          </p>
        </div>
      </section>

      <section className="container py-24 overflow-hidden">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
            Leadership Team
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Experienced leaders combining deep asset management domain knowledge
            with modern technology execution.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {leadershipTeam.map((member, index) => (
            <Card
              key={`${member.name}-${index}`}
              className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-b from-card to-card/80 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20"
            >
              <CardContent className="flex h-full flex-grow flex-col items-center p-6">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={132}
                  height={132}
                  data-ai-hint={member.dataAiHint}
                  className="mb-4 h-[132px] w-[100px] shrink-0 rounded-full border-4 border-primary/15 object-cover"
                />
                <h3 className="text-xl font-semibold tracking-tight">
                  {member.name}
                </h3>
                <p className="mt-1 min-h-[2.5rem] text-sm font-medium text-primary">
                  {member.role}
                </p>
                <div className="flex items-center gap-2 pt-3">
                  {member.linkedin && (
                    <Link
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-md border border-border/70 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                    >
                      <Linkedin className="mr-1.5 h-4 w-4" />
                      LinkedIn
                      <ArrowUpRight className="ml-1.5 h-3.5 w-3.5 opacity-70" />
                    </Link>
                  )}
                  {member.details.length > 0 && (
                    <button
                      type="button"
                      onClick={() =>
                        setOpenIndex(openIndex === index ? null : index)
                      }
                      aria-expanded={openIndex === index}
                      className="inline-flex items-center rounded-md border border-border/70 px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                    >
                      {openIndex === index ? "Hide" : "Details"}
                    </button>
                  )}
                </div>
                {member.details.length > 0 && (
                  <div
                    className={cn(
                      "grid w-full transition-all duration-500 ease-in-out",
                      openIndex === index
                        ? "mt-4 grid-rows-[1fr] opacity-100"
                        : "mt-0 grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="space-y-2 text-left text-sm leading-relaxed text-muted-foreground">
                        {member.details.map((detail, detailIndex) => (
                          <p key={detailIndex}>{detail}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <section className="bg-muted/30 py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
              Our Values
            </h2>
            <p className="mt-6 text-xl text-muted-foreground">
              We aspire to be the World’s most exceptional financial technology
              services company. Our values are the foundation of our culture and
              the guiding principles for every decision we make.
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
                    <CardTitle className="text-2xl font-headline">
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
            Ready to Build the Future?
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-8">
            Let's partner to transform your financial operations and unlock new
            opportunities.
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
