import type { Metadata } from "next";

export const SITE_URL = "https://www.dataalpha.ai";
export const SITE_NAME = "DataAlpha";
export const DEFAULT_OG_IMAGE = { url: "/logo.png", width: 512, height: 230, alt: "DataAlpha" };

type PageMetadataInput = {
  title: string;
  description: string;
  // Route path with trailing slash, e.g. "/services/" (trailingSlash is on)
  path: string;
  image?: { url: string; alt: string };
  type?: "website" | "article";
  publishedTime?: string;
  section?: string;
};

// Next.js replaces (not merges) a page's openGraph object, so every page builds
// the full set here instead of relying on layout defaults.
export function pageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  publishedTime,
  section,
}: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      siteName: SITE_NAME,
      url: path,
      title,
      description,
      images: [image ?? DEFAULT_OG_IMAGE],
      ...(publishedTime && { publishedTime }),
      ...(section && { section }),
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
    },
  };
}
