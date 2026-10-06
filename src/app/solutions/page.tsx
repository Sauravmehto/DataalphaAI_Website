import { solutions, solutionIcons } from "@/lib/constants";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowRight,
  DatabaseZap,
  CheckCircle,
  Search,
  LineChart,
  BarChartHorizontal,
  Users,
  Wallet,
  BookCheck,
  Scale,
  ShieldCheck,
  Building,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const revalidate = 3600; // Revalidate every hour

const newFunctionGroups = [
  {
    name: "Pre-Trade",
    icon: <Search className="h-6 w-6 text-primary" />,
    functions: [
      {
        title: "Deal Screening",
        description:
          "We help you identify and vet new opportunities with powerful due diligence and valuation tools. Our system automates the screening process, allowing your team to focus on high-potential deals, accelerate proposals, and secure funding faster.",
      },
      {
        title: "Portfolio Optimization",
        description:
          "Our tools support portfolio optimization using algorithmic models and provide detailed performance tracking, empowering you to make data-driven choices and approve investments with confidence.",
      },
      {
        title: "Asset Allocation",
        description:
          "Drive smarter investment decisions with our robust research and analytics. We have AI driven models that can distil news and provide alternative allocation suggestions for the portfolios.",
      },
    ],
  },
  {
    name: "Trading",
    icon: <LineChart className="h-6 w-6 text-primary" />,
    functions: [
      {
        title: "Order Management",
        description:
          "Our platform provides a single source for managing trade orders, ensuring rapid and compliant execution. From capturing orders to pre-trade compliance checks, we streamline the entire process, minimizing errors and maximizing efficiency.",
      },
      {
        title: "Portfolio Management",
        description:
          "Gain a competitive edge with our dynamic portfolio management solutions. We offer real-time monitoring, strategic asset allocation, and rebalancing tools to optimize performance and track live P&L, helping you stay ahead of market shifts.",
      },
      {
        title: "Client Relationship Management",
        description:
          "Build and maintain strong client relationships with our integrated platform. From managing investor pipelines to executing targeted campaigns and handling correspondence, we ensure a seamless and professional client experience from onboarding onward.",
      },
    ],
  },
  {
    name: "Post-Trade",
    icon: <BookCheck className="h-6 w-6 text-primary" />,
    functions: [
      {
        title: "Trade Settlement",
        description:
          "Our system simplifies the complex process of trade settlement. It automates confirmations, manages investment terms, and handles fee allocations, ensuring accuracy and reducing the time and resources needed to finalize transactions.",
      },
      {
        title: "Market Data",
        description:
          "Our platform centralizes market data integration, providing a single, reliable source for everything from pricing liquidity to rates and curves. This ensures that all valuation models and decisions are based on the most accurate, up-to-the-minute information.",
      },
      {
        title: "Asset Servicing",
        description:
          "Automate the administrative burdens of asset management. Our tools handle corporate actions, process income, and service OTC derivatives, freeing up your team to focus on higher-value tasks.",
      },
      {
        title: "Reconciliation",
        description:
          "We eliminate operational risk by providing a comprehensive reconciliation engine. Our tools perform automated checks on positions, cash, and transactions, integrating with TPA and custodial systems to ensure all data is consistent and accurate.",
      },
      {
        title: "Cash Management",
        description:
          "Optimize your firm's liquidity and financial health with our cash management tools. We provide a clear view of daily cash flows, offer precise ladder forecasts, and help you manage margin and collateral effectively.",
      },
      {
        title: "Treasury",
        description:
          "Our treasury function supports strategic financial management. From allocating money market funds and hedging FX balances to planning for financing and short positions, we provide the tools to manage your firm's capital effectively.",
      },
    ],
  },
  {
    name: "Transparency",
    icon: <Scale className="h-6 w-6 text-primary" />,
    functions: [
      {
        title: "Portfolio Control",
        description:
          "Maintain full control over your portfolio's integrity. We provide official NAV and P&L calculations, manage AUM, and streamline reconciliation processes, ensuring all financial data is verifiable and accurate for audits and reporting.",
      },
      {
        title: "Risk Management",
        description:
          "Proactively protect your firm from market, trading, and counterparty risks. Our system calculates key metrics like VaR and provides a firm-wide view of risk exposure, enabling timely and informed risk mitigation strategies.",
      },
      {
        title: "Fund Compliance",
        description:
          "Stay compliant in a complex regulatory landscape. We monitor against restricted lists, calculate compliance requirements, and track fund limits, ensuring all operations adhere to regulatory and SEC standards with minimal manual effort.",
      },
      {
        title: "Performance Attribution",
        description:
          "Go beyond simple returns to understand what drives your performance. Our analytics provide detailed performance attribution, including Brinson model calculations, to help you identify the true sources of alpha and underperformance.",
      },
      {
        title: "Data Governance",
        description:
          "Ensure the integrity and security of your core data. Our system provides a centralized repository for security masters and counterparty data, establishing a single source of truth for all legal and account information.",
      },
      {
        title: "Investor Reporting",
        description:
          "Deliver clear, comprehensive reports to your investors effortlessly. Our platform automates the creation of reports detailing investment breakdowns, NAV, and performance, ensuring your investors are always well-informed.",
      },
    ],
  },
  {
    name: "Accounting",
    icon: <Wallet className="h-6 w-6 text-primary" />,
    functions: [
      {
        title: "Portfolio Accounting",
        description:
          "This function is the backbone of your firm's financial operations. We capture every transaction, maintain trial balances, and perform daily pricing, ensuring accurate and transparent accounting for tax lots and all holdings.",
      },
      {
        title: "Corporate Accounting",
        description:
          "We simplify corporate financial management and tax compliance. Our system automates expense allocation, manages payables and receivables, and assists with tax forms, ensuring your corporate books are always organized and ready.",
      },
      {
        title: "Partner Accounting",
        description:
          "Streamline the complex process of investor and partner compensation. We automate investor allocation, management fee calculations, and incentive fee calculations, providing transparency and accuracy in all partner-related financial activities.",
      },
    ],
  },
];

export default function SolutionsPage() {
  const dataHubSolution = solutions.find((s) => s.slug === "data-hub");
  return (
    <div className="container py-24 sm:py-32">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-bold tracking-tighter sm:text-5xl font-headline">
          Our Suite of Solutions
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Explore our powerful solutions designed to automate and optimize your
          financial operations.
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <Accordion
          type="multiple"
          defaultValue={["item-1", "item-2"]}
          className="w-full space-y-8"
        >
          {dataHubSolution && (
            <AccordionItem
              value="item-1"
              className="border-b-0"
              id={dataHubSolution.slug}
            >
              <Card className="bg-muted/30">
                <AccordionTrigger className="w-full p-4 text-left hover:no-underline sm:p-6">
                  <div className="flex flex-col items-start w-full">
                    <div className="flex justify-center w-full">
                      <CardTitle className="text-center text-2xl font-headline sm:text-3xl lg:text-4xl xl:text-5xl">
                        Modern Central UI for Enterprise
                      </CardTitle>
                      <span className="accordion-chevron ml-2 h-4 w-4 shrink-0 transition-transform duration-200" />
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="px-4 pb-4 sm:px-6 sm:pb-6">
                    <div className="prose mx-auto max-w-none text-muted-foreground dark:prose-invert sm:prose-lg">
                      <div className="mt-2 mb-3 h-[310px] w-full overflow-hidden rounded-lg border border-primary/20 bg-background shadow-lg sm:h-[410px] md:h-[420px] lg:h-[570px] xl:h-[680px]">
                        <iframe
                          src="/data_hub_enhanced_v2.html"
                          title="Data Hub Interactive Demo"
                          className="h-full w-full border-0"
                          loading="lazy"
                        />
                      </div>

                      <p className="mt-8">
                        Data Hub provides a modern, centralized user interface
                        built natively for asset managers. It seamlessly
                        connects to any API or database, including Snowflake and
                        SQL, to unify your data streams, enabling streamlined
                        workflows and powerful analytics. This creates a single
                        point of access for all your enterprise data, enabling
                        streamlined workflows, enhanced data visualization, and
                        more powerful analytics. Empower your teams with a
                        consistent and intuitive experience for interacting with
                        complex financial data.
                      </p>
                      <h2 className="font-headline text-3xl text-foreground mt-8">
                        Key Features
                      </h2>
                      <ul className="space-y-2 mt-4">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-primary" />{" "}
                          Significant Value
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-primary" />{" "}
                          Operational Efficiency
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-primary" />{" "}
                          Ensuring Data Accuracy and Compliance
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-primary" />{" "}
                          Advanced Analytics and Insights
                        </li>
                      </ul>

                      <h2 className="font-headline text-3xl text-foreground mt-8">
                        Benefits
                      </h2>
                      <p>
                        Implementing our {dataHubSolution.title} solution
                        provides tangible benefits to your organization,
                        including a single source of truth, streamlined
                        workflows, and empowered decision-making through
                        intuitive data visualization and powerful analytics.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </Card>
            </AccordionItem>
          )}

          <AccordionItem
            value="item-2"
            className="border-b-0"
            id="investment-management-functions"
          >
            <Card className="bg-muted/30">
              <AccordionTrigger className="w-full text-left hover:no-underline p-6">
                <div className="flex flex-col items-start w-full">
                  <div className="flex justify-center w-full">
                    <CardTitle className="text-5xl font-headline">
                      Investment Management Functions
                    </CardTitle>
                    <span className="accordion-chevron ml-2 h-4 w-4 shrink-0 transition-transform duration-200" />
                  </div>
                  <p className="text-muted-foreground mt-2 flex justify-center w-full">
                    Explore the comprehensive functions our platform supports
                    across the entire investment lifecycle.
                  </p>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="px-6 pb-6">
                  <div className="relative">
                    {newFunctionGroups.map((group) => (
                      <div key={group.name} className="mb-12 last:mb-0">
                        <div className="py-4">
                          <div className="flex justify-center gap-4 w-full items-center">
                            <div className="bg-primary/10 p-3 rounded-full">
                              {group.icon}
                            </div>
                            <h3 className="text-3xl font-bold font-headline text-foreground">
                              {group.name}
                            </h3>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
                          {group.functions.map((func) => (
                            <Card
                              key={func.title}
                              className="flex flex-col transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/10"
                            >
                              <CardHeader>
                                <CardTitle className="text-xl font-semibold">
                                  {func.title}
                                </CardTitle>
                              </CardHeader>
                              <CardContent className="flex-grow">
                                <p className="text-muted-foreground">
                                  {func.description}
                                </p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </Card>
          </AccordionItem>
        </Accordion>
      </div>
      {/* CTA Section */}
      <section className="text-center py-16 bg-muted/30 rounded-lg mt-24">
        <div className="container">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline mb-4">
            Ready to Transform Your Operations?
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-8">
            Let's discuss how DataAlpha can tailor a solution to fit your unique
            needs.
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
