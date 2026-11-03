// Single source for Solutions copy (from "Revised website content.pdf").
// Used by /solutions, /solutions/data-hub, the homepage functions accordion
// and the header search index via `solutions` in lib/constants.

export type InvestmentFunction = {
  title: string;
  description: string;
};

export type FunctionGroup = {
  // Stable anchor id: /solutions#<id>
  id: string;
  name: string;
  // Short label for compact UI such as the homepage accordion
  shortName: string;
  icon: "pre-trade" | "trading" | "post-trade" | "transparency" | "accounting";
  functions: InvestmentFunction[];
};

export const dataHub = {
  title: "Data Hub",
  tagline: "Centralized Enterprise Data Platform",
  // One-line version of `description` for cards and search results
  summary:
    "Data Hub is a centralized financial data management platform for asset managers that connects APIs, Snowflake, SQL, and other databases.",
  description:
    "We provide Data Hub as a centralized financial data management platform for asset managers. We connect APIs, Snowflake, SQL, other databases; standardize incoming datasets; and make trusted information accessible through dashboards and analytics. We help teams work from consistent records for investment analysis, operational monitoring, and reporting.",
  keyFeatures: [
    "We centralize position, transaction, pricing, and reference data across sources.",
    "We streamline data ingestion, validation, and routine workflows.",
    "We apply financial data quality management controls and support traceable data handling.",
    "We provide advanced analytics and visual dashboards for investment and operating teams.",
  ],
  benefits:
    "We reduce fragmented datasets by establishing a common data foundation. We help teams identify data exceptions, spend less time reconciling records, and access consistent inputs for reporting and investment decisions. Our data management in financial services approach supports clearer ownership and stronger operational control.",
};

export const investmentManagement = {
  title: "Investment Management Solutions",
  description:
    "We deliver investment management solutions that connect research, trading, post-trade processing, controls, and accounting. We combine fintech software solutions, quantitative analytics solutions, and financial data management so investment teams manage information and workflows across the full investment lifecycle.",
};

export const functionGroups: FunctionGroup[] = [
  {
    id: "pre-trade",
    name: "Investment Research & Strategy",
    shortName: "Pre-Trade",
    icon: "pre-trade",
    functions: [
      {
        title: "Deal Screening",
        description:
          "We organize deal pipelines, collect diligence materials, and apply screening criteria to compare potential investments. We integrate valuation assumptions and predictive analytics tools so analysts evaluate opportunities against consistent inputs.",
      },
      {
        title: "Portfolio Optimization",
        description:
          "We use algorithmic models, constraints, and scenario analysis to compare portfolio allocations. Our quantitative analytics solutions calculate risk and return measures and help managers evaluate portfolio optimization decisions.",
      },
      {
        title: "Asset Allocation",
        description:
          "We combine market data, portfolio exposures, and investment research to evaluate asset allocation choices. We use fintech AI to analyze news and identify relevant themes while investment teams review proposed changes.",
      },
    ],
  },
  {
    id: "trading",
    name: "Trading",
    shortName: "Trading",
    icon: "trading",
    functions: [
      {
        title: "Order Management",
        description:
          "We centralize order capture, routing information, and pre-trade compliance checks. Our fintech software solutions track order status and connect execution records with downstream booking and reporting workflows.",
      },
      {
        title: "Portfolio Management",
        description:
          "We provide portfolio management tools that consolidate holdings, P&L, exposures, and performance. We help managers monitor positions, assess drift from targets, and review rebalancing choices using current portfolio data.",
      },
      {
        title: "Client Relationship Management",
        description:
          "We connect investor contact records, onboarding tasks, communications, and pipeline activity in one CRM workflow. We automate reminders and routine updates so client teams maintain an organized record of investor interactions.",
      },
    ],
  },
  {
    id: "post-trade",
    name: "Post-Trade Optimization",
    shortName: "Post-Trade",
    icon: "post-trade",
    functions: [
      {
        title: "Trade Settlement",
        description:
          "We organize trade confirmations, fee allocations, investment terms, and settlement status. Our trade settlement workflows help operations teams track exceptions, verify records, and coordinate processing across counterparties.",
      },
      {
        title: "Market Data",
        description:
          "We centralize prices, rates, liquidity measures, and market curves in financial data management workflows. We validate and distribute these inputs to valuation, portfolio analytics, and reporting applications.",
      },
      {
        title: "Asset Servicing",
        description:
          "We track corporate actions, income events, and OTC derivatives processes. We automate event records and related checks so operations teams review obligations and resolve exceptions.",
      },
      {
        title: "Reconciliation",
        description:
          "We compare positions, cash, and transactions across internal books, custodians, and administrators. We flag breaks, organize exception queues, and support financial data quality management through automated reconciliation.",
      },
      {
        title: "Cash Management",
        description:
          "We consolidate balances, expected flows, and collateral requirements into liquidity views. We help teams forecast cash needs, monitor margin, and review funding decisions.",
      },
      {
        title: "Treasury",
        description:
          "We connect money market allocations, FX hedge positions, financing activity, and short-position records. We provide centralized views that support daily treasury monitoring and capital allocation decisions.",
      },
    ],
  },
  {
    id: "transparency",
    name: "Transparency & Risk Control",
    shortName: "Transparency",
    icon: "transparency",
    functions: [
      {
        title: "Portfolio Control",
        description:
          "We calculate and reconcile NAV, P&L, and AUM using portfolio and pricing records. We support control checks, audit trails, and consistent management reporting through financial data management.",
      },
      {
        title: "Risk Management",
        description:
          "We measure Value at Risk (VaR), market exposures, concentration, and counterparty risk. We build quantitative analytics solutions that show changes in risk metrics and support scenario analysis and oversight.",
      },
      {
        title: "Fund Compliance",
        description:
          "We monitor restricted lists, investment limits, and configured fund rules through automated checks. We organize alerts and compliance reporting so teams review breaches and maintain oversight.",
      },
      {
        title: "Performance Attribution",
        description:
          "We calculate performance contributions and use Brinson analysis to separate allocation and selection effects where applicable. Our performance attribution tools help investment teams understand return drivers and evaluate strategies.",
      },
      {
        title: "Data Governance",
        description:
          "We maintain consistent security master, counterparty, and account reference data. We apply data governance rules, ownership, and validation checks so systems use aligned identifiers and definitions.",
      },
      {
        title: "Investor Reporting",
        description:
          "We assemble NAV, allocations, holdings, and performance data into recurring investor reporting workflows. We standardize report inputs and reduce repetitive preparation while supporting review before distribution.",
      },
    ],
  },
  {
    id: "accounting",
    name: "Accounting",
    shortName: "Accounting",
    icon: "accounting",
    functions: [
      {
        title: "Portfolio Accounting",
        description:
          "We process investment transactions, apply daily pricing, track tax lots, and prepare trial-balance information. Our portfolio accounting workflows maintain consistent records for reconciliation and financial reporting.",
      },
      {
        title: "Corporate Accounting",
        description:
          "We organize expenses, payables, receivables, and tax-reporting inputs. We automate allocation and review steps to help finance teams maintain accurate corporate records.",
      },
      {
        title: "Partner Accounting",
        description:
          "We calculate investor allocations, management fees, and incentive-related amounts using configured fund terms. We link these calculations to accounting records and partner statements to improve traceability.",
      },
    ],
  },
];
