import type { MetadataRoute } from "next";
import { cities } from "@/lib/cities";
import { blogPosts } from "@/lib/blog";
import { cityServiceMeta, serviceMeta } from "@/lib/service-meta";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = site.website;

  const entries: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${base}/services`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/locations`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/about`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${base}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...["privacy-policy", "terms"].map((path) => ({
      url: `${base}/${path}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    })),
  ];

  // Blog posts
  for (const p of blogPosts) {
    entries.push({
      url: `${base}/blog/${p.slug}`,
      lastModified: p.updated ?? p.date,
      changeFrequency: "monthly",
      priority: 0.65,
    });
  }

  // Service pages
  for (const s of serviceMeta) {
    entries.push({
      url: `${base}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    });
  }

  // City pages
  for (const c of cities) {
    entries.push({
      url: `${base}/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  // City × Service combos (the programmatic SEO bulk)
  for (const c of cities) {
    for (const s of cityServiceMeta) {
      entries.push({
        url: `${base}/${c.slug}/${s.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
