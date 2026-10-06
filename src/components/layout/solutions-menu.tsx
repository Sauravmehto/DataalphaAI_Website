"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import { SOLUTIONS_MENU, type SolutionsMenuItem } from "@/lib/constants";
import { cn } from "@/lib/utils";

const isSolutionsPath = (pathname: string | null) =>
  Boolean(pathname?.startsWith("/solutions"));

// Renders an internal link, external link, or inert block depending on the item.
function ItemLink({
  item,
  className,
  onSelect,
  children,
}: {
  item: SolutionsMenuItem;
  className: string;
  onSelect?: () => void;
  children: React.ReactNode;
}) {
  if (item.comingSoon || !item.href) {
    return (
      <div className={className} aria-disabled="true">
        {children}
      </div>
    );
  }

  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onSelect}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={item.href} className={className} onClick={onSelect}>
      {children}
    </Link>
  );
}

function ItemIcon({ item, size }: { item: SolutionsMenuItem; size: "sm" | "lg" }) {
  const Icon = item.icon;
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors",
        size === "lg" ? "h-10 w-10" : "h-8 w-8",
        !item.comingSoon && "group-hover:bg-primary group-hover:text-primary-foreground"
      )}
    >
      <Icon className={size === "lg" ? "h-5 w-5" : "h-4 w-4"} />
    </span>
  );
}

function SoonBadge() {
  return (
    <span className="rounded-full border border-primary/30 bg-primary/5 px-1.5 py-px text-[10px] font-semibold uppercase tracking-wide text-primary">
      Soon
    </span>
  );
}

function ItemAction({ item }: { item: SolutionsMenuItem }) {
  if (item.comingSoon) {
    return (
      <span className="text-xs font-medium text-muted-foreground">
        {item.actionLabel}
      </span>
    );
  }

  const Arrow = item.external ? ArrowUpRight : ArrowRight;
  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
      {item.actionLabel}
      <Arrow
        className={cn(
          "h-3.5 w-3.5 transition-transform",
          item.external
            ? "group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            : "group-hover:translate-x-0.5"
        )}
      />
    </span>
  );
}

function SolutionCard({
  item,
  onSelect,
}: {
  item: SolutionsMenuItem;
  onSelect?: () => void;
}) {
  return (
    <ItemLink
      item={item}
      onSelect={onSelect}
      className={cn(
        "group flex h-full flex-col rounded-lg border border-transparent p-4 transition-colors",
        item.comingSoon
          ? "cursor-default"
          : "hover:border-border hover:bg-muted/60 focus-visible:border-border focus-visible:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      )}
    >
      <ItemIcon item={item} size="lg" />
      <span className="mt-4 flex items-center gap-2 text-sm font-semibold leading-snug text-foreground">
        {item.label}
        {item.comingSoon && <SoonBadge />}
      </span>
      <span className="mt-1.5 flex-1 text-xs leading-relaxed text-muted-foreground">
        {item.description}
      </span>
      <span className="mt-4">
        <ItemAction item={item} />
      </span>
    </ItemLink>
  );
}

export function SolutionsDropdown() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number>();
  const panelId = useId();

  const cancelClose = () => window.clearTimeout(closeTimer.current);
  const openMenu = () => {
    cancelClose();
    setIsOpen(true);
  };
  // Small delay so moving the pointer from trigger to panel doesn't flicker.
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setIsOpen(false), 150);
  };
  const close = () => setIsOpen(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => cancelClose, []);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
      onBlur={(event) => {
        if (!containerRef.current?.contains(event.relatedTarget as Node)) {
          setIsOpen(false);
        }
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => (isOpen ? setIsOpen(false) : openMenu())}
        className={cn(
          "flex items-center gap-1 text-sm font-medium uppercase transition-colors hover:text-primary focus-visible:outline-none focus-visible:text-primary",
          isSolutionsPath(pathname) || isOpen
            ? "text-primary"
            : "text-muted-foreground"
        )}
      >
        Solutions
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        // pt-4 keeps a hover bridge between the trigger and the panel.
        <div
          id={panelId}
          className="absolute left-1/2 top-full z-50 w-[min(44rem,calc(100vw-2rem))] -translate-x-1/2 pt-4"
        >
          <div className="overflow-hidden rounded-xl border bg-popover text-popover-foreground shadow-2xl shadow-primary/10 animate-in fade-in-0 zoom-in-95 slide-in-from-top-1 duration-150">
            <div className="flex items-baseline justify-between border-b px-5 py-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-foreground">
                Our Solutions
              </p>
              <p className="text-xs text-muted-foreground">
                Built for alternative asset managers
              </p>
            </div>

            <div className="grid grid-cols-3 gap-1 p-2">
              {SOLUTIONS_MENU.map((item) => (
                <SolutionCard key={item.label} item={item} onSelect={close} />
              ))}
            </div>

            <div className="flex items-center justify-between gap-4 border-t bg-muted/40 px-5 py-3">
              <p className="text-xs text-muted-foreground">
                Not sure which solution fits your firm?
              </p>
              <Link
                href="/contact/"
                onClick={close}
                className="group inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline focus-visible:underline focus-visible:outline-none"
              >
                Book a demo
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function MobileSolutionsMenu({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-2">
      <span
        className={cn(
          "text-base font-medium",
          isSolutionsPath(pathname) ? "text-primary" : "text-muted-foreground"
        )}
      >
        Solutions
      </span>
      <div className="flex flex-col gap-1 rounded-lg border bg-muted/30 p-1.5">
        {SOLUTIONS_MENU.map((item) => (
          <ItemLink
            key={item.label}
            item={item}
            onSelect={onNavigate}
            className={cn(
              "group flex items-center gap-3 rounded-md px-2.5 py-2.5 transition-colors",
              item.comingSoon
                ? "cursor-default"
                : "hover:bg-background focus-visible:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            )}
          >
            <ItemIcon item={item} size="sm" />
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                <span className="truncate">{item.label}</span>
                {item.comingSoon && <SoonBadge />}
              </span>
              <span className="block truncate text-xs text-muted-foreground">
                {item.description}
              </span>
            </span>
            {!item.comingSoon &&
              (item.external ? (
                <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground" />
              ) : (
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
              ))}
          </ItemLink>
        ))}
      </div>
    </div>
  );
}
