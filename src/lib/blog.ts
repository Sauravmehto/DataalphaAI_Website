import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type BlogPostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  // Meta description; falls back to the excerpt
  description: string;
  author: string;
  category: string;
  // Optional cover; posts without one get the branded BlogCover
  image?: string;
  // Tie-break for posts sharing a date (lower comes first)
  order: number;
  published: boolean;
};

export type BlogPost = BlogPostMeta & {
  contentHtml: string;
};

function readMarkdownFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }
  return fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith(".md"));
}

function parseFrontmatter(fileName: string): { slug: string; meta: BlogPostMeta; body: string } {
  const slug = fileName.replace(/\.md$/, "");
  const filePath = path.join(BLOG_DIR, fileName);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  if (!data.date) {
    throw new Error(`Blog post "${fileName}" is missing a date in its frontmatter`);
  }

  const excerpt = (data.excerpt as string) ?? "";

  const meta: BlogPostMeta = {
    slug: (data.slug as string) ?? slug,
    title: (data.title as string) ?? "Untitled",
    date: data.date as string,
    excerpt,
    description: (data.description as string) ?? excerpt,
    author: (data.author as string) ?? "DataAlpha",
    category: (data.category as string) ?? "Insights",
    image: (data.image as string) || undefined,
    order: typeof data.order === "number" ? data.order : 0,
    published: data.published !== false,
  };

  return { slug, meta, body: content };
}

// Frontmatter dates are calendar dates ("2026-11-03"), parsed as UTC midnight;
// format in UTC so a server in another time zone can't shift the day.
export function formatPostDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

// Serializable card data for BlogPostCard
export function toCardPost(meta: BlogPostMeta) {
  return {
    slug: meta.slug,
    title: meta.title,
    excerpt: meta.excerpt,
    category: meta.category,
    image: meta.image,
    displayDate: formatPostDate(meta.date),
  };
}

export function getAllPostsMeta(): BlogPostMeta[] {
  return readMarkdownFiles()
    .map((file) => parseFrontmatter(file).meta)
    .filter((meta) => meta.published)
    .sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime() ||
        a.order - b.order
    );
}

export function getAllPostSlugs(): string[] {
  return getAllPostsMeta().map((meta) => meta.slug);
}

// Same-category posts first, then the most recent others
export function getRelatedPosts(slug: string, count = 3): BlogPostMeta[] {
  const posts = getAllPostsMeta();
  const current = posts.find((post) => post.slug === slug);
  const others = posts.filter((post) => post.slug !== slug);
  if (!current) {
    return others.slice(0, count);
  }
  const sameCategory = others.filter((post) => post.category === current.category);
  const rest = others.filter((post) => post.category !== current.category);
  return [...sameCategory, ...rest].slice(0, count);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const fileName = readMarkdownFiles().find(
    (file) => parseFrontmatter(file).slug === slug
  );

  if (!fileName) {
    return null;
  }

  const { meta, body } = parseFrontmatter(fileName);

  if (!meta.published) {
    return null;
  }

  const processed = await remark().use(html).process(body);

  return {
    ...meta,
    contentHtml: processed.toString(),
  };
}
