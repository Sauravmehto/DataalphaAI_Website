"use client";

import { useEffect, useState } from "react";
import { BlogPostCard, type BlogCardPost } from "@/components/blog/blog-post-card";
import { cn } from "@/lib/utils";

const ALL = "All";
const PARAM = "category";

export function BlogPostGrid({ posts }: { posts: BlogCardPost[] }) {
  const [active, setActive] = useState(ALL);

  const categories = Array.from(new Set(posts.map((post) => post.category))).sort();

  // Read ?category= after mount (not useSearchParams) so the page stays fully
  // static and every post is in the server-rendered HTML.
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get(PARAM);
    if (requested && categories.includes(requested)) {
      setActive(requested);
    }
    // categories is derived from the static posts prop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const select = (name: string) => {
    setActive(name);
    const url = new URL(window.location.href);
    if (name === ALL) {
      url.searchParams.delete(PARAM);
    } else {
      url.searchParams.set(PARAM, name);
    }
    window.history.replaceState(null, "", url);
  };

  const filters = [
    { name: ALL, count: posts.length },
    ...categories.map((name) => ({
      name,
      count: posts.filter((post) => post.category === name).length,
    })),
  ];
  const visible =
    active === ALL ? posts : posts.filter((post) => post.category === active);
  const [featured, ...rest] = active === ALL ? visible : [undefined, ...visible];

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
              onClick={() => select(name)}
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

      {featured && (
        <div className="mb-8">
          <BlogPostCard post={featured} featured />
        </div>
      )}

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((post) =>
          post ? <BlogPostCard key={post.slug} post={post} /> : null
        )}
      </div>
    </>
  );
}
