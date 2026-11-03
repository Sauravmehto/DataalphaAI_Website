import type { Metadata } from "next";
import { BlogSubscribe } from "@/components/blog/blog-subscribe";
import { BlogPostGrid } from "@/components/blog/blog-post-grid";
import { getAllPostsMeta, toCardPost } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";

const title = "Insights & Perspectives | DataAlpha Blog";
const description =
  "Insights on AI, data management, risk, and technology for alternative asset managers from the DataAlpha team.";

export const metadata: Metadata = pageMetadata({ title, description, path: "/blog/" });

export default function BlogPage() {
  const posts = getAllPostsMeta();

  return (
    <div className="container py-24 sm:pt-16 sm:pb-8">
      <div className="max-w-2xl mx-auto text-center mb-12">
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
        <BlogPostGrid posts={posts.map(toCardPost)} />
      )}

      <div className="mt-20">
        <BlogSubscribe />
      </div>
    </div>
  );
}
