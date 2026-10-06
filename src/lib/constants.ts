import type { LucideIcon } from 'lucide-react';
import {
  BarChart,
  Briefcase,
  GitCompareArrows,
  LayoutDashboard,
  ShieldCheck,
  ServerCog,
  Database,
  FileText,
  KeyRound,
  DatabaseZap,
  BrainCircuit,
  Calculator,
  AppWindow,
  CandlestickChart,
  Landmark,
  FileBox,
  Building2,
  Users,
  Bitcoin,
  Shield,
  Leaf,
  Award,
  Server,
  BadgeCheck,
  Gem,
  Layers,
  Bot,
} from 'lucide-react';

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/solutions', label: 'Solutions' },
  { href: '/about', label: 'About Us' },
  { href: '/blog', label: 'Blog' },
  { href: '/careers', label: 'Careers' },
  { href: '/contact', label: 'Contact' },
];

export type SolutionsMenuItem = {
  label: string;
  description: string;
  icon: LucideIcon;
  href?: string;
  external?: boolean;
  comingSoon?: boolean;
};

// Items shown in the "Solutions" dropdown in the header.
export const SOLUTIONS_MENU: SolutionsMenuItem[] = [
  {
    label: 'Modern Central UI for Enterprise',
    description: 'Data Hub: one interface across all your data sources.',
    icon: LayoutDashboard,
    href: '/solutions/',
  },
  {
    label: 'DA ONE',
    description: 'Explore DA ONE on dalabs.ai.',
    icon: Layers,
    href: 'https://dalabs.ai/',
    external: true,
  },
  {
    label: 'Dynamic Agents',
    description: 'Coming soon.',
    icon: Bot,
    comingSoon: true,
  },
];

type Solution = {
  title: string;
  slug: string;
  icon: string;
  shortDescription: string;
  longDescription: string;
};

export const solutionIcons: {[key:string]: LucideIcon} = {
  'data-hub': LayoutDashboard,
  'functions': BrainCircuit,

};

export const solutions: Solution[] = [
  {
    title: 'Data Hub - Modern Central UI for Enterprise',
    slug: 'data-hub',
    icon: 'data-hub',
    shortDescription:
      'Data Hub is API based UX build natively for asset managers; it connects to any API or database (Snowflake, SQL).',
    longDescription:
      'Data Hub provides a modern, centralized user interface built natively for asset managers. It seamlessly connects to any API or database, including Snowflake and SQL, to unify your data streams. This creates a single point of access for all your enterprise data, enabling streamlined workflows, enhanced data visualization, and more powerful analytics. Empower your teams with a consistent and intuitive experience for interacting with complex financial data.',
  }
];

type InvestmentFunction = {
  title: string;
  description: string;
};

export const frontOfficeFunctions: InvestmentFunction[] = [
    { title: 'Order Management', description: ''},
    { title: 'Deal Screening', description: ''},
    { title: 'Portfolio Management', description: ''},
    { title: 'Asset Selection', description: ''},
    { title: 'Client Relationship Management', description: ''},
];

export const middleOfficeFunctions: InvestmentFunction[] = [
    { title: 'Trade Settlement', description: ''},
    { title: 'Reconciliation', description: ''},
    { title: 'Cash Management', description: ''},
    { title: 'Risk Management', description: ''},
    { title: 'Fund Compliance', description: ''},
];

export const backOfficeFunctions: InvestmentFunction[] = [
    { title: 'Market Data', description: ''},
    { title: 'Asset Servicing', description: ''},
    { title: 'Portfolio Control', description: ''},
    { title: 'Data Governance', description: ''},
    { title: 'Treasury', description: ''},
    { title: 'Portfolio Accounting', description: ''},
    { title: 'Performance Attribution', description: ''},
    { title: 'Corp/Tax Accounting', description: ''},
    { title: 'Partner Accounting', description: ''},
    { title: 'Investor Reporting', description: ''},
];

type Service = {
  title: string;
  icon: string;
  content: {
    heading: string;
    paragraphs: string[];
  }[];
};

export const serviceIcons: { [key: string]: LucideIcon } = {
  'reconciliation-service': ServerCog,
  'data-management-service': Database,
  'regulatory-reporting-service': FileText,
  'security-master-service': KeyRound,
  'data-service': DatabaseZap,
  'ai-service': BrainCircuit,
  'quant-service': Calculator,
  'finance-apps-service': AppWindow,
  'hedge-fund': CandlestickChart,
  'private-credit': Landmark,
  'structured-credit': FileBox,
  'real-estate': Building2,
  'private-equity': Users,
  'crypto-funds': Bitcoin,
  'insurance': Shield,
  'commodities': Leaf,
  'family-offices': Users,
};

export const whyDataAlphaIcons: { [key: string]: LucideIcon } = {
  award: Award,
  brainCircuit: BrainCircuit,
  server: Server,
  users: Users,
  badgeCheck: BadgeCheck,
  gem: Gem,
};

export const services: Service[] = [
  {
    title: 'Reconciliation Delivered as a Service',
    icon: 'reconciliation-service',
    content: [
      {
        heading: '',
        paragraphs: [
          'DataAlpha’s Reconciliation Managed Service offers a comprehensive, outsourced solution for asset managers seeking to simplify and strengthen their reconciliation processes. We take on the critical task of reconciling positions, activities, and cash balances across prime brokers, custodians, fund administrators, and other counterparties—allowing your team to focus on what truly drives performance.',
          'Delivered in conjunction with DataAlpha’s advanced Reconciliation Solution, this service eliminates the operational burden of daily reconciliation while maintaining accuracy, transparency, and control.',
          'Supported by DataAlpha’s digital-first managed service framework, our reconciliation offering operates seamlessly in the cloud, ensuring complete “audit-anytime” transparency. You can instantly view the status of any transaction at any point in the process, gaining clarity and confidence in your financial data.',
          'With DataAlpha managing your reconciliation workflows, you can increase operational efficiency, uphold full oversight, and reallocate internal resources toward higher-value, strategic initiatives.'
        ]
      }
    ]
  },
  {
    title: 'Data Management as a Service',
    icon: 'data-management-service',
    content: [
      {
        heading: '',
        paragraphs: [
          'Data is the lifeblood of every asset management firm — but managing it effectively remains one of the industry’s biggest challenges. Traditional data management solutions often fall short: they struggle to handle diverse data types, become outdated quickly, and are costly to maintain in-house.',
          'That’s where DataAlpha’s Data Management as a Service comes in. We help asset managers streamline the complex process of managing large and varied data sets, improving operational efficiency and strengthening data governance across the enterprise.',
          'Our fully managed data service offers a comprehensive approach that goes far beyond traditional models. From hosting, maintenance, and governance to data cleansing, storage, and delivery — we handle every layer of the data lifecycle. In addition, our expertise in analytics and dashboard creation enables firms to turn raw data into actionable intelligence for portfolio optimization, risk management, and strategic decision-making.',
          'Serving clients across the U.S., U.K., and Western Europe, DataAlpha provides the scalability, precision, and reliability that today’s asset managers need to stay ahead.',
          'Ready to transform how your firm manages and leverages data? Partner with DataAlpha to elevate efficiency, enhance insight, and unlock the full potential of your data.'
        ]
      }
    ]
  },
  {
    title: 'Regulatory Reporting as a Service',
    icon: 'regulatory-reporting-service',
    content: [
      {
        heading: '',
        paragraphs: [
          'For buy-side firms, managing an ever-expanding range of filings and disclosures is both time-consuming and resource-intensive. DataAlpha’s Regulatory Reporting as a Service provides a smarter, more efficient way to meet these obligations — allowing firms to offload complex reporting processes while retaining complete visibility and control.',
          'By combining DataAlpha’s Regulatory Reporting Solution with our digital-first managed services framework, we offer an evolved approach to outsourcing. Instead of assigning fixed headcount to each project, we leverage advanced automation, intelligent workflows, and data-driven processes to streamline reporting, reduce operational burden, and enhance accuracy across submissions.',
          'Our approach ensures end-to-end compliance while providing real-time analytics and interactive dashboards that give your team full transparency into the status of every filing. You’ll gain actionable insights, strengthen oversight, and have the flexibility to scale as your reporting requirements grow and evolve.',
          'With DataAlpha handling your regulatory reporting, your firm can redirect valuable time and resources toward high-impact strategic initiatives — driving growth, improving efficiency, and maintaining confidence in compliance.',
          'Ready to transform your regulatory reporting process? Partner with DataAlpha and experience a new standard in accuracy, scalability, and control.'
        ]
      }
    ]
  },
  {
    title: 'DataAlpha Security and Reference Master',
    icon: 'security-master-service',
    content: [
      {
        heading: 'Simplify, Centralize, and Strengthen Your Data Foundation',
        paragraphs: [
          'DataAlpha’s Security and Reference Master empowers asset managers to automate the collection, consolidation, cleansing, and distribution of security master, reference, and entity data. Built on a flexible and scalable MDM framework, it ensures your organization operates on a single, trusted source of truth across all systems and teams.'
        ]
      },
      {
        heading: 'Eliminate Redundant Steps',
        paragraphs: [
          'Deliver consistent, validated security and reference data to every team across your organization — ensuring seamless access and eliminating data silos.'
        ]
      },
      {
        heading: 'Streamline Management',
        paragraphs: [
          'Automate end-to-end workflows for security master and reference data management, including golden copy creation, to reduce manual intervention and operational overhead.'
        ]
      },
      {
        heading: 'Improve Speed',
        paragraphs: [
          'Accelerate onboarding and setup for new asset classes, entities, and counterparties, enabling faster market entry and smoother operations.'
        ]
      },
       {
        heading: 'Heighten Accuracy',
        paragraphs: [
          'Enhance data quality and reliability by minimizing manual processes that often introduce inconsistencies and errors.'
        ]
      },
      {
        heading: 'React Faster',
        paragraphs: [
          'Receive proactive alerts when missing reference data or newly issued securities could impact downstream systems — helping you prevent disruptions before they occur.'
        ]
      },
       {
        heading: 'Strengthen Security',
        paragraphs: [
          'Protect sensitive information with robust, configurable permissions and advanced data governance controls embedded throughout the DataAlpha MDM suite.'
        ]
      }
    ]
  }
];

// Blog posts live as markdown files in content/blog/*.md. See src/lib/blog.ts.
