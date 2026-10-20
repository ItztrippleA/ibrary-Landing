import type { MetadataRoute } from 'next';

const paths = ['', '/about', '/learn', '/schools', '/accessibility', '/faq', '/contact', '/terms', '/privacy'];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({
    url: `https://ibrary.app${path}`,
    lastModified: new Date('2026-10-10'),
  }));
}
