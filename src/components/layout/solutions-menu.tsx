"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { SOLUTIONS_MENU, type SolutionsMenuItem } from "@/lib/constants";
import { cn } from "@/lib/utils";

const isSolutionsPath = (pathname: string | null) =>
  Boolean(pathname?.startsWith("/solutions"));

function MenuItemContent({
  item,
  compact = false,
}: {
  item: SolutionsMenuItem;
  compact?: boolean;
}) {
  const Icon = item.icon;
  return (
    <>
      <span
        className={cn(
          "flex shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary",
          compact ? "h-8 w-8" : "h-9 w-9"
        )}
      >
        <Icon className="h-4 w-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-1.5 text-sm font-medium text-foreground">
          {item.label}
          {item.external && (
            <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground transition-colors group-hover:text-primary" />
          )}
          {item.comingSoon && (
            <span className="rounded-full border border-primary/30 px-1.5 py-px text-[10px] font-semibold uppercase tracking-wide text-primary">
              Soon
            </span>
          )}
        </span>
        {!compact && (
          <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">
            {item.description}
          </span>
        )}
      </span>
    </>
  );
}

function MenuItem({
  item,
  compact,
  onSelect,
}: {
  item: SolutionsMenuItem;
  compact?: boolean;
  onSelect?: () => void;
}) {
  const className = cn(
    "group flex items-start gap-3 rounded-lg transition-colors",
    compact ? "items-center px-2 py-2" : "p-3",
    item.comingSoon
      ? "cursor-default opacity-70"
      : "hover:bg-muted focus-visible:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
  );

  if (item.comingSoon || !item.href) {
    return (
      <div className={className} aria-disabled="true">
        <MenuItemContent item={item} compact={compact} />
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
        <MenuItemContent item={item} compact={compact} />
      </a>
    );
  }

  return (
    <Link href={item.href} className={className} onClick={onSelect}>
      <MenuItemContent item={item} compact={compact} />
    </Link>
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
        // pt-3 keeps a hover bridge between the trigger and the panel.
        <div
          id={panelId}
          className="absolute left-1/2 top-full z-50 w-[22rem] -translate-x-1/2 pt-3"
        >
          <div className="rounded-xl border bg-popover p-2 text-popover-foreground shadow-xl shadow-primary/10 animate-in fade-in-0 zoom-in-95 slide-in-from-top-1 duration-150">
            <p className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Our Solutions
            </p>
            <div className="flex flex-col gap-0.5">
              {SOLUTIONS_MENU.map((item) => (
                <MenuItem
                  key={item.label}
                  item={item}
                  onSelect={() => setIsOpen(false)}
                />
              ))}
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
      <div className="ml-1 flex flex-col gap-1 border-l border-border pl-3">
        {SOLUTIONS_MENU.map((item) => (
          <MenuItem
            key={item.label}
            item={item}
            compact
            onSelect={onNavigate}
          />
        ))}
      </div>
    </div>
  );
}
