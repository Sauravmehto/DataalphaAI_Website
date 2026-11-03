import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { ScrollToTop } from '@/components/layout/scroll-to-top';
import Script from 'next/script';
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from '@/lib/seo';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'DataAlpha AI',
  description:
    'Front, Middle and Back-office AI-Powered solutions for tomorrow\'s financial institutions.',
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    images: [DEFAULT_OG_IMAGE],
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  sameAs: ['https://www.linkedin.com/company/dataalpha-ai'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased',
          spaceGrotesk.variable
        )}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-TY5S87067L"
        ></Script>
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-TY5S87067L');
          `}
        </Script>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <ScrollToTop />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
