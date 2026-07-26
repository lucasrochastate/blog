import type { MetadataRoute } from "next";

import { SITE } from "@/lib/constants";
import { getCategories, getPostSlugs } from "@/sanity/lib/fetch";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE.url.replace(/\/$/, "");
  const [slugs, categories] = await Promise.all([
    getPostSlugs(),
    getCategories(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/sobre",
    "/busca",
    "/categorias",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.7,
  }));

  const postRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${base}/posts/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${base}/categorias/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...postRoutes, ...categoryRoutes];
}
