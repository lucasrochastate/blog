import { REVALIDATE_SECONDS } from "@/lib/constants";
import {
  estimateReadingMinutes,
  portableTextToPlain,
} from "@/lib/reading-time";
import {
  demoCategories,
  demoPosts,
  demoSearchIndex,
  demoTags,
} from "@/data/demo-posts";
import { isSanityConfigured } from "@/sanity/env";
import { client } from "@/sanity/lib/client";
import {
  adjacentPostsQuery,
  categoriesQuery,
  categoryBySlugQuery,
  postBySlugQuery,
  postsByCategoryQuery,
  postsByTagQuery,
  postsQuery,
  postSlugsQuery,
  relatedPostsQuery,
  rssPostsQuery,
  searchIndexQuery,
  tagBySlugQuery,
} from "@/sanity/lib/queries";
import type { Category, Post, PostListItem, SearchPost, Tag } from "@/types/post";

type AdjacentPosts = {
  previous: { title: string; slug: string; publishedAt: string } | null;
  next: { title: string; slug: string; publishedAt: string } | null;
};

async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  tags: string[] = ["sanity"],
): Promise<T | null> {
  if (!isSanityConfigured()) return null;

  try {
    return await client.fetch<T>(query, params, {
      next: { revalidate: REVALIDATE_SECONDS, tags },
    });
  } catch (error) {
    console.error("[sanity] fetch failed:", error);
    // Em produção, não mascarar falha com demo — retorna null/vazio
    if (process.env.NODE_ENV === "production") {
      throw error;
    }
    return null;
  }
}

function withReadingTime<T extends PostListItem>(post: T): T {
  const minutes = estimateReadingMinutes(
    post.bodyText ||
      ("body" in post
        ? portableTextToPlain((post as Post).body)
        : post.excerpt),
  );
  return { ...post, estimatedMinutes: minutes };
}

/** Demo só fora de produção e sem Project ID. */
function useDemoFallback() {
  return !isSanityConfigured() && process.env.NODE_ENV !== "production";
}

export async function getPosts(): Promise<PostListItem[]> {
  if (useDemoFallback()) return demoPosts.map(withReadingTime);
  const data = await sanityFetch<PostListItem[]>(postsQuery, {}, ["sanity", "posts"]);
  return (data ?? []).map(withReadingTime);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (useDemoFallback()) {
    const post = demoPosts.find((item) => item.slug === slug) ?? null;
    return post ? withReadingTime(post) : null;
  }
  const data = await sanityFetch<Post>(postBySlugQuery, { slug }, [
    "sanity",
    "posts",
    `post:${slug}`,
  ]);
  return data ? withReadingTime(data) : null;
}

export async function getPostSlugs(): Promise<string[]> {
  if (useDemoFallback()) return demoPosts.map((post) => post.slug);
  return (await sanityFetch<string[]>(postSlugsQuery, {}, ["sanity", "posts"])) ?? [];
}

export async function getAdjacentPosts(
  publishedAt: string,
): Promise<AdjacentPosts> {
  if (useDemoFallback()) {
    const ordered = [...demoPosts].sort(
      (a, b) =>
        new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime(),
    );
    const index = ordered.findIndex((p) => p.publishedAt === publishedAt);
    const previous = index > 0 ? ordered[index - 1] : null;
    const next = index >= 0 && index < ordered.length - 1 ? ordered[index + 1] : null;
    return {
      previous: previous
        ? { title: previous.title, slug: previous.slug, publishedAt: previous.publishedAt }
        : null,
      next: next
        ? { title: next.title, slug: next.slug, publishedAt: next.publishedAt }
        : null,
    };
  }

  return (
    (await sanityFetch<AdjacentPosts>(
      adjacentPostsQuery,
      { publishedAt },
      ["sanity", "posts"],
    )) ?? { previous: null, next: null }
  );
}

export async function getRelatedPosts(post: Post): Promise<PostListItem[]> {
  if (useDemoFallback()) {
    return demoPosts
      .filter(
        (item) =>
          item._id !== post._id &&
          (item.category?.slug === post.category?.slug ||
            item.tags?.some((tag) =>
              post.tags?.some((current) => current.slug === tag.slug),
            )),
      )
      .slice(0, 3)
      .map(withReadingTime);
  }

  const data = await sanityFetch<PostListItem[]>(
    relatedPostsQuery,
    {
      postId: post._id,
      categoryId: post.category?._id ?? "",
      tagIds: post.tags?.map((tag) => tag._id) ?? [],
    },
    ["sanity", "posts"],
  );

  return (data ?? []).map(withReadingTime);
}

export async function getCategories(): Promise<Category[]> {
  if (useDemoFallback()) return demoCategories;
  return (await sanityFetch<Category[]>(categoriesQuery, {}, ["sanity", "categories"])) ?? [];
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  if (useDemoFallback()) {
    return demoCategories.find((c) => c.slug === slug) ?? null;
  }
  return (
    (await sanityFetch<Category>(categoryBySlugQuery, { slug }, [
      "sanity",
      "categories",
    ])) ?? null
  );
}

export async function getPostsByCategory(slug: string): Promise<PostListItem[]> {
  if (useDemoFallback()) {
    return demoPosts
      .filter((post) => post.category?.slug === slug)
      .map(withReadingTime);
  }
  const data = await sanityFetch<PostListItem[]>(
    postsByCategoryQuery,
    { slug },
    ["sanity", "posts"],
  );
  return (data ?? []).map(withReadingTime);
}

export async function getTagBySlug(slug: string): Promise<Tag | null> {
  if (useDemoFallback()) {
    return demoTags.find((t) => t.slug === slug) ?? null;
  }
  return (await sanityFetch<Tag>(tagBySlugQuery, { slug }, ["sanity", "tags"])) ?? null;
}

export async function getPostsByTag(slug: string): Promise<PostListItem[]> {
  if (useDemoFallback()) {
    return demoPosts
      .filter((post) => post.tags?.some((t) => t.slug === slug))
      .map(withReadingTime);
  }
  const data = await sanityFetch<PostListItem[]>(postsByTagQuery, { slug }, [
    "sanity",
    "posts",
  ]);
  return (data ?? []).map(withReadingTime);
}

export async function getSearchIndex(): Promise<SearchPost[]> {
  if (useDemoFallback()) return demoSearchIndex;
  return (await sanityFetch<SearchPost[]>(searchIndexQuery, {}, ["sanity", "posts"])) ?? [];
}

export async function getRssPosts(): Promise<
  { title: string; slug: string; excerpt: string; publishedAt: string; bodyText?: string }[]
> {
  if (useDemoFallback()) {
    return demoPosts.map((post) => ({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      publishedAt: post.publishedAt,
      bodyText: portableTextToPlain(post.body),
    }));
  }
  return (
    (await sanityFetch<
      { title: string; slug: string; excerpt: string; publishedAt: string; bodyText?: string }[]
    >(rssPostsQuery, {}, ["sanity", "posts"])) ?? []
  );
}
