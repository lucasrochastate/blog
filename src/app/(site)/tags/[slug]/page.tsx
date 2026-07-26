import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EmptyPosts } from "@/components/posts/empty-posts";
import { PostList } from "@/components/posts/post-list";
import { SITE } from "@/lib/constants";
import { getPostsByTag, getTagBySlug } from "@/sanity/lib/fetch";

export const revalidate = 60;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = await getTagBySlug(slug);
  if (!tag) return { title: "Tag não encontrada" };

  return {
    title: `#${tag.title}`,
    description: `Posts com a tag ${tag.title} em ${SITE.name}.`,
  };
}

export default async function TagPage({ params }: PageProps) {
  const { slug } = await params;
  const tag = await getTagBySlug(slug);
  if (!tag) notFound();

  const posts = await getPostsByTag(slug);

  return (
    <div className="page-shell">
      <header className="mb-12 max-w-xl space-y-3">
        <p className="meta-line">tag</p>
        <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          #{tag.title}
        </h1>
      </header>

      {posts.length === 0 ? <EmptyPosts /> : <PostList posts={posts} />}
    </div>
  );
}
