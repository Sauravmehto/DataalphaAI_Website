import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog";

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: `${post.title} - DataAlpha AI Blog`,
    description: post.excerpt,
  };
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="mr-1.5 h-4 w-4" />
          Back to Blog
        </Link>

        <p className="text-sm font-medium text-muted-foreground">
          {formatDate(post.date)} &middot; {post.author}
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tighter sm:text-5xl font-headline">
          {post.title}
        </h1>

        <Image
          src={post.image}
          alt={post.title}
          width={800}
          height={450}
          className="my-10 w-full rounded-lg shadow-lg"
        />

        <div
          className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-headline prose-headings:tracking-tight"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        <div className="mt-16 text-center">
          <Button asChild size="lg">
            <Link href="/contact">Talk to Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
