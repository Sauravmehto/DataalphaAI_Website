import { MetadataRoute } from 'next';
import { NAV_LINKS } from '@/lib/constants';
import { getAllPostsMeta } from '@/lib/blog';

export const dynamic = 'force-static';
export const revalidate = 86400;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.dataalpha.ai';

   // Get all main navigation links
  const staticPages = NAV_LINKS.map((link) => ({
    url: `${baseUrl}${link.href}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: link.href === '/' ? 1 : 0.8,
  }));

  const blogPages: MetadataRoute.Sitemap = getAllPostsMeta().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // Add other important pages that might not be in the main navigation
  const otherPages: MetadataRoute.Sitemap = [
    {
        url: `${baseUrl}/case-studies`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
    },
    {
        url: `${baseUrl}/functions`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
    },
    {
        url: `${baseUrl}/privacy-policy`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.5,
    }
  ];

  return [...staticPages, ...otherPages, ...blogPages];
}
