"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type BlogGridPost = {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  category: string;
  image: string;
  // Formatted on the server so the client can't render a different date
  displayDate: string;
};

const ALL = "All";

export function BlogPostGrid({ posts }: { posts: BlogGridPost[] }) {
  const [active, setActive] = useState(ALL);

  const categories = Array.from(new Set(posts.map((post) => post.category))).sort();
  const filters = [
    { name: ALL, count: posts.length },
    ...categories.map((name) => ({
      name,
      count: posts.filter((post) => post.category === name).length,
    })),
  ];
  const visible =
    active === ALL ? posts : posts.filter((post) => post.category === active);

  return (
    <>
      <div
        role="group"
        aria-label="Filter posts by category"
        className="mb-10 flex flex-wrap justify-center gap-2"
      >
        {filters.map(({ name, count }) => {
          const selected = active === name;
          return (
            <button
              key={name}
              type="button"
              onClick={() => setActive(name)}
              aria-pressed={selected}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                selected
                  ? "border-primary bg-primary font-semibold text-primary-foreground"
                  : "border-border/70 font-medium text-muted-foreground hover:border-primary/50 hover:text-foreground"
              )}
            >
              {name}
              <span
                className={cn(
                  "rounded-full px-1.5 text-xs",
                  selected ? "bg-primary-foreground/20" : "bg-muted"
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
            <Card className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20">
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardContent className="flex flex-1 flex-col p-6">
                <span className="mb-3 inline-flex w-fit rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  {post.category}
                </span>
                <p className="text-xs font-medium text-muted-foreground">
                  {post.displayDate} &middot; {post.author}
                </p>
                <h2 className="mt-2 text-xl font-semibold tracking-tight font-headline">
                  {post.title}
                </h2>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">
                  {post.excerpt}
                </p>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-primary">
                  Read more
                  <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}
