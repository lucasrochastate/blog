import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EmptyPosts } from "@/components/posts/empty-posts";
import { PostList } from "@/components/posts/post-list";
import { SITE } from "@/lib/constants";
import {
  getCategories,
  getCategoryBySlug,
  getPostsByCategory,
} from "@/sanity/lib/fetch";

export const revalidate = 60;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: "Categoria não encontrada" };

  return {
    title: category.title,
    description:
      category.description ||
      `Posts da categoria ${category.title} em ${SITE.name}.`,
  };
}

export default async function CategoriaPage({ params }: PageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const posts = await getPostsByCategory(slug);

  return (
    <div className="page-shell">
      <header className="mb-12 max-w-xl space-y-3">
        <p className="meta-line">cd /{category.slug}</p>
        <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          {category.title}
        </h1>
        {category.description ? (
          <p className="text-base leading-relaxed text-muted-foreground">
            {category.description}
          </p>
        ) : null}
      </header>

      {posts.length === 0 ? (
        <EmptyPosts
          title="pasta vazia (por enquanto)"
          description="Ainda não há posts publicados nesta categoria."
        />
      ) : (
        <PostList posts={posts} />
      )}
    </div>
  );
}
