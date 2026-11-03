import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { BlogCover } from "@/components/blog/blog-cover";
import { cn } from "@/lib/utils";

export type BlogCardPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image?: string;
  // Formatted on the server so the client can't render a different date
  displayDate: string;
};

type BlogPostCardProps = {
  post: BlogCardPost;
  // Wide horizontal layout for the newest post on the listing page
  featured?: boolean;
  headingLevel?: "h2" | "h3";
};

export function BlogPostCard({
  post,
  featured = false,
  headingLevel: Heading = "h2",
}: BlogPostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <Card
        className={cn(
          "flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/20",
          featured && "lg:grid lg:grid-cols-2"
        )}
      >
        <div className={cn("relative aspect-[16/9] w-full overflow-hidden", featured && "lg:aspect-auto lg:h-full lg:min-h-[20rem]")}>
          <BlogCover
            title={post.title}
            category={post.category}
            image={post.image}
            size={featured ? "hero" : "card"}
            className="transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className={cn("flex flex-1 flex-col p-6", featured && "lg:justify-center lg:p-10")}>
          <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-muted-foreground">
            {featured && (
              <span className="rounded-full bg-primary px-2.5 py-0.5 font-semibold text-primary-foreground">
                Latest
              </span>
            )}
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-primary">
              {post.category}
            </span>
            <time>{post.displayDate}</time>
          </div>
          <Heading
            className={cn(
              "font-semibold tracking-tight font-headline",
              featured ? "text-2xl sm:text-3xl" : "text-xl"
            )}
          >
            {post.title}
          </Heading>
          <p className={cn("mt-3 flex-1 text-muted-foreground", featured ? "text-base" : "text-sm")}>
            {post.excerpt}
          </p>
          <span className="mt-5 inline-flex items-center text-sm font-medium text-primary">
            Read more
            <span className="sr-only">: {post.title}</span>
            <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </div>
      </Card>
    </Link>
  );
}
