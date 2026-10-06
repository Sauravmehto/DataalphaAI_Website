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
  author: string;
  image: string;
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

  const meta: BlogPostMeta = {
    slug: (data.slug as string) ?? slug,
    title: (data.title as string) ?? "Untitled",
    date: (data.date as string) ?? new Date().toISOString(),
    excerpt: (data.excerpt as string) ?? "",
    author: (data.author as string) ?? "DataAlpha Team",
    image: (data.image as string) ?? "https://picsum.photos/800/450",
    published: data.published !== false,
  };

  return { slug, meta, body: content };
}

export function getAllPostsMeta(): BlogPostMeta[] {
  return readMarkdownFiles()
    .map((file) => parseFrontmatter(file).meta)
    .filter((meta) => meta.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAllPostSlugs(): string[] {
  return getAllPostsMeta().map((meta) => meta.slug);
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
