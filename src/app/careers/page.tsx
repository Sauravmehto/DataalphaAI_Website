
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Briefcase, MapPin, ArrowRight, ChevronDown } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ApplyForm } from '@/components/careers/apply-form';
import { useState } from 'react';
import Link from 'next/link';

const jobOpenings = [
  {
    title: 'Senior DevOps Engineer – High Frequency Trading (HFT)',
    location: 'India (Remote / Hybrid)',
    type: 'Full-time',
    description: ['Hello There, ',
      'Hope you\'re doing well. ',
      'We are currently hiring for an exciting opportunity at Data Alpha, focused on building and operating ultra-low-latency, highly reliable trading infrastructure supporting real-time trading systems, market data platforms, and quant research environments.',
      'We are looking for a Senior DevOps Engineer with mandatory High-Frequency Trading (HFT) / low-latency trading experience to design, build, and operate our critical infrastructure.',
      'This role sits at the intersection of high-performance infrastructure engineering and trading systems, where your work will directly support real-world HFT and low-latency trading platforms.',
    ],
    details: {
      
      responsibilities: [
        '- Design and maintain low-latency, high-availability HFT infrastructure',
        '- Manage bare-metal, colocated, and hybrid cloud environments',
        '- Build and maintain CI/CD pipelines for trading and research platforms',
        '- Optimize Linux systems for performance, latency, and stability',
        '- Implement monitoring, alerting, and observability frameworks',
        '- Perform root-cause analysis for live trading incidents',
        '- Enforce security, access control, and compliance standards'
      ],
      qualifications: [
      'Mandatory Skills (Non-Negotiable)',
        '- Hands-on DevOps experience in High-Frequency Trading or low-latency trading systems',
        '- Strong Linux internals and performance tuning expertise',
        '- Low-latency networking knowledge (TCP/UDP tuning, multicast, NIC optimization)',
        '- Experience with on-prem / colocation infrastructure',
        '- Scripting skills in Python, Bash, or similar',
      
      'Core Technology Stack',
        '- CI/CD: Jenkins, GitLab CI, GitHub Actions',
        '- IaC: Terraform, Ansible',
        '- Containers: Docker, Kubernetes',
        '- Monitoring: Prometheus, Grafana, ELK, Datadog',
      ],    
    }
  },
  {
    title: 'C++ Engineer Crypto HFT Market Making firm.',
    location: 'Noida',
    type: 'Full-time',
    description: ['Hello There, ',
    'Hope you\'re doing well. I\'m currently hiring for an exciting opportunity with a fast-moving global firm operating in the crypto market-making space — not an exchange,but focused on building next-gen high-frequency trading infrastructure for market making in various global exchanges.',
    'We’re looking for a C++ Engineer to help develop, optimize, and elevate our core trading systems',
    'This role sits at the intersection of high-performance engineering and financial innovation, where your work will directly shape the future of crypto trading markets.',],
     details: {
      responsibilities: [
        'Design and build robust, low-latency systems powering our crypto trading infrastructure',
        'Collaborate on architectural decisions, latency tuning, and stability of trading engine',
        'Identify bottlenecks and devise high-impact solutions',
        'Own the code — from development to production-level performance',
      ],
      qualifications: [
        '2+ years of deep hands-on C++ development',
        'Background in high-frequency trading (HFT), crypto and/or market-making is highly preferred',
        'Proven experience in low latency systems',
        'Passion for speed, stability & clean, scalable code',
        'Strong Leadership capabilities to manage expectations of traders from Technology perspective',
        
        'Why Join Data Alpha: ',
        'Work on real-world HFT and low-latency trading systems with global exposure. High-impact role, strong ownership, and competitive compensation aligned with niche expertise.',
        'Interested in learning more? Let’s set up a quick call, or feel free to share your updated CV — even if you\'re just passively exploring.',
      ],
      
    }
  },
  {
    title: 'Performance Business Analyst – Fund & Investor Performance',
    location: 'New York',
    type: 'Full-time',
    description: ["Hello There, ",
"Hope you're doing well. We are currently hiring for an exciting opportunity with DataAlpha to build and scale our Fund Performance and Investor Performance function.",
"Position Overview",
"We are seeking an experienced Business Analyst to design, build, and implement comprehensive fund performance and investor performance reporting functions for our asset management firm.",
"This role will be instrumental in developing analytical frameworks, performance measurement systems, and investor reporting capabilities that align with industry standards and regulatory requirements.",],
      details: {
      responsibilities: [
        "Performance Analytics and Measurement",

"The Business Analyst will be responsible for writing requirements for developing and implementing performance measurement methodologies across all asset classes and investment strategies.",
"Key Duties Include:",
"Performance Calculation and Analysis: Calculating investment returns, risk-adjusted performance metrics, and attribution analysis using industry-standard methodologies on daily, monthly, and quarterly basis.",
"Develop capabilities to report gross and net portfolio-level performance for realized, unrealized, and total portfolios in accordance with ILPA standards.",
"Benchmark Analysis: Establish comprehensive benchmark comparison frameworks and peer group analysis capabilities to evaluate competitive positioning.",
"Risk-Adjusted Metrics: Implement calculation engines for alpha, beta, Sharpe ratio, information ratio, and other risk-adjusted performance indicators.",
"Multi-Asset Class Support: Develop performance measurement capabilities across public and private investments within a unified platform, including liquidity monitoring and exposure reporting.",
"Standardized Performance Calculation: Design and build automated systems for calculating investment returns using ILPA's standardized framework, including IRR, TVPI, MOIC, and DPI calculations with and without the impact of fund-level subscription facilities.",
"Cash Flow and Transaction Mapping: Implement ILPA's prescribed cash flow tables and transaction type mapping to provide transparency into performance calculation methodologies for both fund-level and portfolio-level metrics.",

"Investor Reporting and Communications",

"Report Production: Design and automate the preparation of monthly, quarterly, and annual investor reports including fund activity summaries, performance analytics, and market outlook.",
"Data Visualization: Create compelling visual representations of portfolio allocations, performance trends, and analytical insights using advanced reporting tools.",
"Regulatory Compliance: Ensure all reporting adheres to Global Investment Performance Standards (GIPS), SEC Marketing Rule requirements, and other relevant regulatory frameworks.",
"Ad-Hoc Analysis: Respond to investor queries and consultant requests with customized performance analysis and due diligence materials.",

"Stakeholder Management and Project Leadership",

"Requirements Gathering: Conduct stakeholder interviews across front, middle, and back-office functions to define system specifications and functional requirements.",
"System Implementation: Work with technology teams to implement and optimize investment management systems such as Bloomberg AIM, Aladdin, SimCorp Dimension, or similar platforms.",
"Data Management: Establish data integrity protocols and quality control measures for performance calculations and reporting processes.",
"Process Optimization: Analyze existing workflows and implement improvements to enhance efficiency and accuracy of performance measurement functions.",
"Cross-Functional Collaboration: Partner with portfolio management, risk teams, operations, and compliance departments to ensure integrated performance reporting.",
"Vendor Management: Evaluate and manage relationships with performance measurement vendors, custodians, and data providers.",
"Training and Documentation: Develop user guides, process documentation, and training materials for performance systems and reporting procedures.",
      ],
      qualifications: [
        "Education and Experience",

"Bachelor's degree in Finance, Economics, Business Administration, Mathematics, or related quantitative field.",
"Minimum 3-5 years of experience in asset management, investment performance analysis, or financial services business analysis.",
"Demonstrated experience with performance measurement methodologies and investment management systems.",

"Technical Skills",

"Performance Systems Expertise: Hands-on experience with investment management platforms such as Bloomberg AIM, Aladdin, SimCorp Dimension, IRESS, or FactSet.",
"Data Analysis Proficiency: Advanced skills in Excel, SQL, and statistical analysis tools for manipulating and analyzing large datasets.",
"Business Intelligence Tools: Experience with Tableau, Power BI, or similar visualization platforms for creating interactive dashboards and reports.",

"Industry Knowledge",

"Investment Performance Standards: Deep understanding of GIPS standards, attribution methodologies, and performance calculation techniques.",
"Regulatory Framework: Knowledge of SEC Marketing Rule, private fund reporting requirements, and other relevant regulations.",
"Asset Management Operations: Comprehensive understanding of trade lifecycle, settlement processes, and investment management workflows.",

"Preferred Qualifications",

"Professional certifications such as CFA, FRM, or investment performance measurement credentials.",
"Experience with Agile/Scrum project management methodologies and SDLC processes.",
"Knowledge of alternative investments, private equity, or hedge fund performance measurement.",
"Prior experience in fund administration, performance measurement, or investor relations roles.",
"Background in regulatory compliance, audit preparation, or external verification processes.",
"Experience with composite construction, GIPS compliance, and performance presentation standards.",

"Interested in learning more? Let’s set up a quick call, or feel free to share your updated CV — even if you're just passively exploring.",
      ],
    }
  },
  {
    title: 'Fund Accounting Practice Manager',
    location: 'Gurgaon/Hyderabad/Bangalore',
    type: 'Full-time',
    description: ['Hello There,',
    'Hope you\'re doing well. We are currently hiring for an exciting opportunity with DataAlpha, a boutique white-gloved technology services company that specializes in providing world class advisory and execution capabilities to financial institutions. We partner with the world’s premier asset management organizations where we provide them strategic advisory, operational transformation, system selection & implementation, data and analytics, to consolidate their alpha.',
    'Our team is made up of professionals with decades of practical operations and technology backgrounds at global funds and banks. Our people have the right balance of strategic and practical knowledge to deliver across targeted functional initiatives to large-scale business transformations.',
    'We aspire to become the world’s most exceptional financial technology services company, powered by our values of partnership, client service, integrity, and meritocracy. We believe in delivering agile and clear solutions, built through a data-first and AI integration lens.',

    'The Opportunity',

    'The person is responsible for implementing accounting and operational systems for its clients in Asset Management to manage internal books and records, and preparing data for reporting and Fund’s NAV determination.',
    'You’ll bring deep expertise in fee calculations, NAV/GAV reporting, and P&L attribution, ensuring precision and transparency in every transaction. Working closely with cross-functional teams, you’ll help streamline reporting, support strategic initiatives, and elevate our investor servicing capabilities.'],
     details: {
      responsibilities: [
        "You'll Be Instrumental In:",
"Managerial Activities",

"Manage and guide a team of fund accountants and operations associates to execute project deadlines for implementation of an accounting platform.",
"Perform daily operations/accounting or work for clients to train them on their daily workflow.",
"Manage project-implementation, client-relationship, escalations, issues, queries and provide solutions.",
"Ensure achieving desired KPIs/ SLAs.",
"Train the new joinees and manage activities of fund accounting associates by reviewing, monitoring and validating their work and process.",

"Implement Core Activities in Accounting Platform",

"Hands on experience with all aspects of fund accounting activities related to clients.",
"Perform daily reconciliation of accounts between Geneva/VPM/Investran or similar accounting systems and Custodian/Prime Broker.",
"Prepare monthly financial reporting package for Hedge Funds, including the determination of 'Net Asset Value' and prepare the Statement of Asset and Liabilities and Profit and Loss Statement.",
"Ensure Fund income and expenses, including management and performance fees, are accrued for and are in accordance with relevant accounting standards (Calculation of Incentive Fee and Management Fee).",
"Accurate and timely processing of all capital activities including subscriptions, redemptions, transfers, rollups, capital commitments and calls.",
"Cash Management - managing the daily cash flow of trades and monitoring fund cash-flows.",
"Preparation of Investor and Client reports including Audit confirmations, Trade confirmations etc.",
"Communicate the transactions associated with the fund(s) and work closely with internal and external clients to provide accurate and thorough accounting packages.",
"Assistance with New Client Onboarding and Implementations.",
"Provide functional support on client configurations and data loads.",
"Coordination with Internal/Cross Product Development Team for new features/changes.",
"Document the current knowledge and the formal procedures to use them in future.",
"Handle end-to-end investor accounting for hedge funds, with a focus on open-ended master-feeder structures.",
"Perform and validate management fee and incentive fee calculations, including understanding of crystallization concepts.",
"Ensure accuracy in the calculation and reporting of NAV (Net Asset Value), GAV (Gross Asset Value), and related components.",
"Reconcile investor activity, subscriptions, redemptions, transfers, and capital balances.",
"Work closely with fund administrators and internal stakeholders to resolve discrepancies and ensure timely deliverables.",
"Contribute to P&L attribution analysis and investor-level reporting.",
"Support the implementation or integration of investor accounting systems and tools.",
"Serve as a primary contact for clients on daily operational matters, addressing queries and ensuring high levels of client satisfaction.",
      ],
      qualifications: [
        "5+ years of experience in client-facing roles that require a high degree of consultative and solutioning skills.",
        "Good organizational skills and a methodical mindset, along with the ability to make presentations with ease.",
"Strong understanding of alternatives instruments, investment lifecycle from origination, structuring and underwriting, operations and accounting, borrower credit risk and covenant monitoring, financial modeling, LP reporting.",
"Knowledge and experience of implementing a fund accounting system for a hedge fund, like Geneva, VPM, Investran or similar that support accounting lifecycle events for alternative funds.",
"Strong interpersonal skills: stakeholder management, influencing, persuasion, and critical thinking skills, and the ability to build and maintain cooperative internal and external relationships.",
"Demonstrable track record of leading and driving cross-functional, medium and large-scale data projects across business lines and technology domains.",
"Advanced in MS Excel, Word and PowerPoint; Good to have SQL.",

"What We Offer:",

"An opportunity to work with a boutique white-gloved technology services company and partner with premier asset management organizations for strategic advisory, operational transformation, system selection & implementation, and data analytics.",
"Work alongside professionals with decades of practical operations and technology backgrounds at global funds and banks.",
"Be part of a team that aspires to become the world’s most exceptional financial technology services company.",
"Work in a values-driven environment that emphasizes partnership, client service, integrity, and meritocracy.",
"Enjoy highly competitive salary packages along with performance-based incentives.",

"Interested in learning more? Let’s set up a quick call, or feel free to share your updated CV — even if you're just passively exploring.",
      ],
    }
  },
];


export default function CareersPage() {
    const [selectedJob, setSelectedJob] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleApplyClick = (jobTitle: string) => {
        setSelectedJob(jobTitle);
        setIsDialogOpen(true);
    };

  return (
    <div className="py-24 sm:py-32">
      <section className="container text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">
          Build the Future of FinTech
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            At DataAlpha, we are on a mission to redefine the financial technology landscape. We are a team of innovators, problem-solvers, and collaborators. If you are passionate about technology and finance, we invite you to join us.
        </p>
      </section>

      <section id="open-positions" className="container py-24">
        <h2 className="text-3xl font-bold text-center mb-12 font-headline">Current Openings</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <Accordion type="multiple" className="grid md:grid-cols-2 gap-8 max-w-8xl mx-auto items-start">
            {jobOpenings.map((job) => (
              <AccordionItem value={job.title} key={job.title} className="border-b-0">
                <Card className="flex flex-col h-full">
                  <CardHeader className="flex-row items-center justify-between w-full">
                    <div>
                      <CardTitle className="text-xl font-semibold text-left">{job.title}</CardTitle>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground pt-1">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-4 w-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Briefcase className="h-4 w-4" />
                          <span>{job.type}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {job.description.slice(0, 3).join(' ')}
                    </p>
                  </CardContent>
                  <AccordionContent>
                    <CardContent className="flex-grow pt-0">
                        <div className="space-y-3 text-muted-foreground mb-6">
                          {job.description.map((line, index) => (
                            <p key={index}>{line}</p>
                          ))}
                        </div>
                        
                        <div className="space-y-4 text-muted-foreground text-sm">
                            <div>
                                <h4 className="font-semibold text-foreground mb-2">Responsibilities</h4>
                                <ul className="list-disc pl-5 space-y-1">
                                    {job.details.responsibilities.map((item, index) => <li key={index}>{item}</li>)}
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-foreground mb-2">Qualifications</h4>
                                <ul className="list-disc pl-5 space-y-1">
                                     {job.details.qualifications.map((item, index) => <li key={index}>{item}</li>)}
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                  </AccordionContent>
                  <CardFooter className="gap-3 flex-wrap">
                    <AccordionTrigger className="w-auto gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground hover:no-underline">
                      Job Details
                      <ChevronDown className="accordion-chevron h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
                    </AccordionTrigger>
                    <DialogTrigger asChild>
                        <Button variant="outline" onClick={() => handleApplyClick(job.title)}>
                            Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </DialogTrigger>
                  </CardFooter>
                </Card>
               </AccordionItem>
            ))}
          </Accordion>
           <DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-[560px]">
              <div className="border-b bg-muted/30 px-6 py-5 pr-14">
                <DialogHeader className="space-y-2 text-left">
                  <DialogTitle className="text-xl">Apply for {selectedJob}</DialogTitle>
                  <DialogDescription>
                    Share your details and resume. Our hiring team will review your profile and contact you if there is a fit.
                  </DialogDescription>
                </DialogHeader>
              </div>
              <div className="max-h-[70vh] overflow-y-auto px-6 py-5">
                <ApplyForm jobTitle={selectedJob} onFormSubmit={() => setIsDialogOpen(false)} />
              </div>
          </DialogContent>
        </Dialog>
      </section>

      <section className="py-24 text-center bg-muted/30">
          <div className="container">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline mb-4">
                  Don't See Your Role?
              </h2>
              <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-8">
                  We are always looking for talented individuals. If you believe you have what it takes to be part of our team, send us your resume.
              </p>
              <Button asChild size="lg">
                  <Link href="mailto:careers@dataalpha.ai">
                      Contact HR <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
              </Button>
          </div>
      </section>
    </div>
  );
}
