import { REVALIDATE_SECONDS } from "@/lib/constants";
import {
  demoCategories,
  demoPosts,
  demoSearchIndex,
  demoTags,
} from "@/data/demo-posts";
import { isSanityConfigured } from "@/sanity/env";
import { client } from "@/sanity/lib/client";
import {
  categoriesQuery,
  categoryBySlugQuery,
  postBySlugQuery,
  postsByCategoryQuery,
  postsByTagQuery,
  postsQuery,
  postSlugsQuery,
  searchIndexQuery,
  tagBySlugQuery,
} from "@/sanity/lib/queries";
import type { Category, Post, PostListItem, SearchPost, Tag } from "@/types/post";

async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T | null> {
  if (!isSanityConfigured()) return null;

  try {
    return await client.fetch<T>(query, params, {
      next: { revalidate: REVALIDATE_SECONDS },
    });
  } catch (error) {
    console.error("[sanity] fetch failed:", error);
    return null;
  }
}

/**
 * Quando o Sanity está configurado, usamos só a resposta dele (mesmo se vazia).
 * Demo só entra se não houver Project ID.
 */
export async function getPosts(): Promise<PostListItem[]> {
  if (!isSanityConfigured()) return demoPosts;
  const data = await sanityFetch<PostListItem[]>(postsQuery);
  return data ?? [];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!isSanityConfigured()) {
    return demoPosts.find((post) => post.slug === slug) ?? null;
  }
  return (await sanityFetch<Post>(postBySlugQuery, { slug })) ?? null;
}

export async function getPostSlugs(): Promise<string[]> {
  if (!isSanityConfigured()) return demoPosts.map((post) => post.slug);
  return (await sanityFetch<string[]>(postSlugsQuery)) ?? [];
}

export async function getCategories(): Promise<Category[]> {
  if (!isSanityConfigured()) return demoCategories;
  return (await sanityFetch<Category[]>(categoriesQuery)) ?? [];
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  if (!isSanityConfigured()) {
    return demoCategories.find((c) => c.slug === slug) ?? null;
  }
  return (await sanityFetch<Category>(categoryBySlugQuery, { slug })) ?? null;
}

export async function getPostsByCategory(slug: string): Promise<PostListItem[]> {
  if (!isSanityConfigured()) {
    return demoPosts.filter((post) => post.category?.slug === slug);
  }
  return (await sanityFetch<PostListItem[]>(postsByCategoryQuery, { slug })) ?? [];
}

export async function getTagBySlug(slug: string): Promise<Tag | null> {
  if (!isSanityConfigured()) {
    return demoTags.find((t) => t.slug === slug) ?? null;
  }
  return (await sanityFetch<Tag>(tagBySlugQuery, { slug })) ?? null;
}

export async function getPostsByTag(slug: string): Promise<PostListItem[]> {
  if (!isSanityConfigured()) {
    return demoPosts.filter((post) => post.tags?.some((t) => t.slug === slug));
  }
  return (await sanityFetch<PostListItem[]>(postsByTagQuery, { slug })) ?? [];
}

export async function getSearchIndex(): Promise<SearchPost[]> {
  if (!isSanityConfigured()) return demoSearchIndex;
  return (await sanityFetch<SearchPost[]>(searchIndexQuery)) ?? [];
}
