import Link from "next/link";
import { ArrowUpRight, Linkedin } from "lucide-react";
import { NAV_LINKS, solutions } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { DataAlphaLogo } from "../icons";

export function Footer() {
  return (
    <footer className="border-t bg-muted/20">
      <div className="container px-4 sm:px-6 lg:px-8 py-12 md:py-14">
        <div className="rounded-2xl border bg-background/60 backdrop-blur-sm p-6 md:p-8 lg:p-10">
          <div className="flex flex-col gap-6 border-b pb-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Let&apos;s Build Together
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
                Build modern financial operations with DataAlpha
              </h2>
              <p className="mt-3 text-sm text-muted-foreground md:text-base">
                Partner with our team for data, AI, quant and application
                solutions tailored for asset managers.
              </p>
            </div>
            <Button asChild size="lg" className="w-full md:w-auto">
              <Link href="/contact">
                Book a Demo <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-10 pt-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <Link href="/" className="inline-flex items-center gap-2">
                <DataAlphaLogo className="h-20 w-auto" />
              </Link>
              <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
                Boutique financial technology consulting with AI-powered
                solutions for front, middle, and back-office transformation.
              </p>
              <div className="mt-5 flex items-center gap-4">
                <Link
                  href="https://www.linkedin.com/company/dataalpha-ai"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="rounded-md border p-2 text-muted-foreground transition-colors hover:text-primary hover:border-primary"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-lg border border-border/50 p-4 md:p-5 space-y-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
                  <h3 className="min-w-24 text-xs font-semibold uppercase tracking-wider text-foreground/90">
                    Company
                  </h3>
                  <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
                    {NAV_LINKS.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-sm text-muted-foreground transition-colors hover:text-primary"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col gap-2 border-t border-border/50 pt-4 sm:flex-row sm:items-center sm:gap-6">
                  <h3 className="min-w-24 text-xs font-semibold uppercase tracking-wider text-foreground/90">
                    Solutions
                  </h3>
                  <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
                    {solutions.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/solutions/${s.slug}`}
                          className="text-sm text-muted-foreground transition-colors hover:text-primary"
                        >
                          {s.title.split(" - ")[0]}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col gap-2 border-t border-border/50 pt-4 sm:flex-row sm:items-center sm:gap-6">
                  <h3 className="min-w-24 text-xs font-semibold uppercase tracking-wider text-foreground/90">
                    Legal
                  </h3>
                  <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
                    <li>
                      <Link
                        href="/privacy-policy"
                        className="text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        Privacy Policy
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t pt-6">
            <p className="text-center text-sm text-muted-foreground md:text-left">
              &copy; {new Date().getFullYear()} DataAlpha AI. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
