import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { BlogSubscribe } from "@/components/blog/blog-subscribe";
import { getAllPostsMeta } from "@/lib/blog";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog - DataAlpha AI",
  description:
    "Insights on AI, data, and technology for alternative asset managers from the DataAlpha team.",
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  const posts = getAllPostsMeta();

  return (
    <div className="container py-24 sm:pt-16 sm:pb-8">
      <div className="max-w-2xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">
          Insights & Perspectives
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Ideas on AI, data, and technology for the alternative asset
          management industry.
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="text-center text-muted-foreground">
          No posts published yet. Check back soon.
        </p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
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
                  <p className="text-xs font-medium text-muted-foreground">
                    {formatDate(post.date)} &middot; {post.author}
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
      )}

      <div className="mt-20">
        <BlogSubscribe />
      </div>
    </div>
  );
}
