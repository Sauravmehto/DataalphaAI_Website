import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BlogCover } from "@/components/blog/blog-cover";
import { BlogPostCard } from "@/components/blog/blog-post-card";
import {
  formatPostDate,
  getAllPostSlugs,
  getPostBySlug,
  getRelatedPosts,
  toCardPost,
} from "@/lib/blog";
import { SITE_URL, pageMetadata } from "@/lib/seo";


type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return pageMetadata({
    title: `${post.title} | DataAlpha Blog`,
    description: post.description,
    path: `/blog/${post.slug}/`,
    image: post.image ? { url: encodeURI(post.image), alt: post.title } : undefined,
    type: "article",
    publishedTime: post.date,
    section: post.category,
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const related = getRelatedPosts(post.slug, 3).map(toCardPost);
  // Older posts have a separate summary; newer ones use their opening sentence,
  // which the article already shows, so only render a lede when it adds something.
  const bodyText = post.contentHtml.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
  const showLede = post.excerpt && !bodyText.includes(post.excerpt);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    articleSection: post.category,
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}/`,
    ...(post.image && { image: new URL(encodeURI(post.image), SITE_URL).toString() }),
    author: { "@type": "Organization", name: "DataAlpha", url: SITE_URL },
    publisher: { "@type": "Organization", name: "DataAlpha", url: SITE_URL },
  };

  return (
    <div className="container py-24 sm:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="mx-auto max-w-4xl">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="mr-1.5 h-4 w-4" />
          Back to Blog
        </Link>

        <header className="mx-auto max-w-3xl">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-muted-foreground">
            <Link
              href={`/blog/?category=${encodeURIComponent(post.category)}`}
              className="rounded-full bg-primary/10 px-3 py-0.5 text-primary transition-colors hover:bg-primary/20"
            >
              {post.category}
            </Link>
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            <span aria-hidden="true">&middot;</span>
            <span>{post.author}</span>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
            {post.title}
          </h1>
          {showLede && (
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {post.excerpt}
            </p>
          )}
        </header>

        {/* Branded covers carry no text, so keep them as a slim banner */}
        <div
          className={cn(
            "relative my-10 w-full overflow-hidden rounded-2xl border border-primary/20 shadow-lg",
            post.image ? "aspect-[16/9]" : "aspect-[3/1] sm:aspect-[4/1]"
          )}
        >
          <BlogCover
            title={post.title}
            category={post.category}
            image={post.image}
            size="hero"
            priority
          />
        </div>

        <div
          className="prose prose-lg mx-auto max-w-3xl dark:prose-invert prose-headings:font-headline prose-headings:tracking-tight prose-h2:mt-12 prose-h3:mt-8 prose-p:leading-relaxed prose-a:text-primary prose-strong:text-foreground prose-li:my-1 marker:text-primary"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        <aside className="mx-auto mt-16 max-w-3xl rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/15 via-card to-card p-8 text-center sm:p-10">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl font-headline">
            Put your data to work
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Talk to DataAlpha about financial data management, AI, and analytics
            for your investment operations.
          </p>
          <Button asChild size="lg" className="mt-6">
            <Link href="/contact">
              Talk to Us <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </aside>
      </article>

      {related.length > 0 && (
        <section className="mx-auto mt-24 max-w-6xl" aria-labelledby="related-heading">
          <h2
            id="related-heading"
            className="mb-8 text-center text-2xl font-bold tracking-tight sm:text-3xl font-headline"
          >
            Related Insights
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <BlogPostCard key={item.slug} post={item} headingLevel="h3" />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
