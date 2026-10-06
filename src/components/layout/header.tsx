"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import { NAV_LINKS, services, solutions } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { DataAlphaLogo } from "../icons";
import { MobileSolutionsMenu, SolutionsDropdown } from "./solutions-menu";
import homeContent from "@/content/home.json";
import servicesContent from "@/content/services-content.json";
import functionsContent from "@/content/functions.json";
import expertiseContent from "@/content/expertise.json";

type SearchItem = {
  href: string;
  label: string;
  description: string;
  keywords: string[];
};

const toAnchorId = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const SEARCH_ITEMS: SearchItem[] = [
  ...NAV_LINKS.map((link) => ({
    href: link.href,
    label: link.label,
    description: `${link.label} page`,
    keywords: [link.label],
  })),
  {
    href: "/",
    label: "Home - Hero",
    description: homeContent.hero.subtitle,
    keywords: [homeContent.hero.title, homeContent.hero.subtitle],
  },
  {
    href: "/",
    label: "Home - Why DataAlpha",
    description: homeContent.whyDataAlpha.subtitle,
    keywords: [homeContent.whyDataAlpha.title, homeContent.whyDataAlpha.subtitle],
  },
  ...homeContent.technologyServices.services.map((item) => ({
    href: "/",
    label: `Technology Service - ${item.title}`,
    description: item.description,
    keywords: [item.title, item.description],
  })),
  {
    href: "/functions",
    label: "Functions",
    description: "Front, middle, and back office investment functions.",
    keywords: [
      "front office",
      "middle office",
      "back office",
      "portfolio",
      "reconciliation",
      "risk",
    ],
  },
  ...functionsContent.map((item) => ({
    href: "/functions",
    label: `${item.office} - ${item.title}`,
    description: item.description,
    keywords: [item.office, item.title, item.description],
  })),
  ...services.map((service) => ({
    href: "/services",
    label: service.title,
    description: service.content[0]?.paragraphs[0] ?? "",
    keywords: [
      service.title,
      ...service.content.flatMap((section) => [
        section.heading,
        ...section.paragraphs,
      ]),
    ],
  })),
  ...servicesContent.fundsServices.items.map((item) => ({
    href: `/services#fund-${toAnchorId(item.title)}`,
    label: `Client Focus - ${item.title}`,
    description: item.description,
    keywords: [item.title, item.description],
  })),
  ...servicesContent.techServices.items.map((item) => ({
    href: `/services#tech-${toAnchorId(item.title)}`,
    label: `Tech Service - ${item.title}`,
    description: item.description,
    keywords: [item.title, item.description],
  })),
  ...expertiseContent.map((item) => ({
    href: "/services",
    label: item.title,
    description: item.description ?? `${item.category} expertise`,
    keywords: [item.category, item.title, item.description ?? ""],
  })),
  ...solutions.map((solution) => ({
    href: `/solutions/${solution.slug}`,
    label: solution.title,
    description: solution.shortDescription,
    keywords: [solution.shortDescription, solution.longDescription],
  })),
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const searchResults = useMemo(() => {
    if (!normalizedQuery) return [];
    const terms = normalizedQuery.split(/\s+/).filter(Boolean);
    return SEARCH_ITEMS.map((item) => {
      const haystack = `${item.label} ${item.description} ${item.keywords.join(
        " "
      )}`.toLowerCase();
      const matchedTerms = terms.filter((term) => haystack.includes(term)).length;
      return { item, matchedTerms };
    })
      .filter(({ matchedTerms }) => matchedTerms > 0)
      .sort((a, b) => b.matchedTerms - a.matchedTerms)
      .slice(0, 8)
      .map(({ item }) => item);
  }, [normalizedQuery]);

  const openSearchResult = (href: string) => {
    setIsSearchOpen(false);
    setSearchQuery("");
    setIsMenuOpen(false);
    router.push(href);

    const hash = href.split("#")[1];
    if (hash) {
      window.setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 150);
    }
  };

  const runInPageFind = () => {
    if (!normalizedQuery) return;
    const searchRoot = document.querySelector("main") ?? document.body;
    const walker = document.createTreeWalker(searchRoot, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const text = node.textContent?.trim().toLowerCase();
        if (!text) return NodeFilter.FILTER_REJECT;
        return text.includes(normalizedQuery)
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT;
      },
    });

    const textNode = walker.nextNode();
    if (textNode) {
      const textContent = textNode.textContent ?? "";
      const startIndex = textContent.toLowerCase().indexOf(normalizedQuery);
      const parentElement = textNode.parentElement;

      if (parentElement) {
        parentElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }

      if (startIndex >= 0) {
        const range = document.createRange();
        range.setStart(textNode, startIndex);
        range.setEnd(textNode, startIndex + normalizedQuery.length);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
    }

    setIsSearchOpen(false);
  };

  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
    setSearchQuery("");
  }, [pathname]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;

    const timer = window.setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 150);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  return (
    <header
      className={cn(
        "top-0 left-0 right-0 z-50 transition-all duration-300 flex justify-center"
      )}
    >
      <div
        className={cn(
          "container mx-auto px-4 sm:px-6 lg:px-8 mt-4 transition-all duration-300",
          isMenuOpen
            ? "bg-background/80 backdrop-blur-sm border shadow-md rounded-xl"
            : "bg-transparent border"
        )}
      >
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <DataAlphaLogo className="h-20 w-auto py-0.5" />
            </Link>
          </div>
          <nav className="hidden lg:flex lg:items-center lg:gap-x-5 xl:gap-x-7">
            {NAV_LINKS.map((link) =>
              link.href === "/solutions" ? (
                <SolutionsDropdown key={link.href} />
              ) : (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary uppercase ",
                  pathname === link.href
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
              )
            )}
          </nav>
          <div className="flex items-center gap-3 md:gap-4 lg:gap-6 xl:gap-8">
            <div
              ref={searchContainerRef}
              className="relative hidden md:block w-40 lg:w-44 xl:w-56 2xl:w-64"
            >
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  onFocus={() => setIsSearchOpen(true)}
                  onKeyDown={(event) => {
                    if (event.key === "Escape") {
                      setIsSearchOpen(false);
                    }
                    if (event.key === "Enter" && searchResults[0]) {
                      openSearchResult(searchResults[0].href);
                    } else if (event.key === "Enter") {
                      runInPageFind();
                    }
                  }}
                  placeholder="Search..."
                  className="h-9 pl-9"
                  aria-label="Search pages"
                />
              </div>
              {isSearchOpen && normalizedQuery && (
                <div className="absolute right-0 top-full z-50 mt-2 w-full rounded-md border bg-background p-1 shadow-md">
                  {searchResults.length > 0 ? (
                    searchResults.map((result) => (
                      <Link
                        key={`${result.href}-${result.label}`}
                        href={result.href}
                        onClick={(event) => {
                          event.preventDefault();
                          openSearchResult(result.href);
                        }}
                        className="block rounded-sm px-3 py-2 text-sm text-foreground hover:bg-muted"
                      >
                        <p className="font-medium">{result.label}</p>
                        <p className="line-clamp-2 text-xs text-muted-foreground">
                          {result.description}
                        </p>
                      </Link>
                    ))
                  ) : (
                    <p className="px-3 py-2 text-sm text-muted-foreground">
                      No matching pages found. Press Enter to find text on this page.
                    </p>
                  )}
                </div>
              )}
            </div>
            <div className="hidden xl:block">
              <Button asChild>
                <Link href="/contact">Book a Demo</Link>
              </Button>
            </div>
            <ThemeToggle />
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X /> : <Menu />}
                <span className="sr-only">Toggle menu</span>
              </Button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="lg:hidden pb-4">
            <nav className="flex flex-col gap-y-4 px-4 py-6 border-t">
              <div className="pb-4 border-b">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={searchQuery}
                    onChange={(event) => {
                      setSearchQuery(event.target.value);
                      setIsSearchOpen(true);
                    }}
                    onFocus={() => setIsSearchOpen(true)}
                    onKeyDown={(event) => {
                      if (event.key === "Escape") {
                        setIsSearchOpen(false);
                      }
                      if (event.key === "Enter" && searchResults[0]) {
                        openSearchResult(searchResults[0].href);
                      } else if (event.key === "Enter") {
                        runInPageFind();
                      }
                    }}
                    placeholder="Search pages..."
                    className="h-10 pl-9"
                    aria-label="Search pages"
                  />
                </div>
                {isSearchOpen && normalizedQuery && (
                  <div className="mt-2 rounded-md border bg-background p-1">
                    {searchResults.length > 0 ? (
                      searchResults.map((result) => (
                        <Link
                          key={`mobile-${result.href}-${result.label}`}
                          href={result.href}
                          onClick={(event) => {
                            event.preventDefault();
                            openSearchResult(result.href);
                          }}
                          className="block rounded-sm px-3 py-2 text-sm text-foreground hover:bg-muted"
                        >
                          <p className="font-medium">{result.label}</p>
                          <p className="line-clamp-2 text-xs text-muted-foreground">
                            {result.description}
                          </p>
                        </Link>
                      ))
                    ) : (
                      <p className="px-3 py-2 text-sm text-muted-foreground">
                        No matching pages found. Press Enter to find text on this page.
                      </p>
                    )}
                  </div>
                )}
              </div>
              {NAV_LINKS.map((link) =>
                link.href === "/solutions" ? (
                  <MobileSolutionsMenu
                    key={link.href}
                    onNavigate={() => setIsMenuOpen(false)}
                  />
                ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-base font-medium transition-colors hover:text-primary",
                    pathname === link.href
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {link.label}
                </Link>
                )
              )}
              <Button asChild className="w-full mt-4">
                <Link href="/contact">Book a Demo</Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
