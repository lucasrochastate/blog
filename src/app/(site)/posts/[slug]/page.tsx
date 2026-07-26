import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PostBody } from "@/components/posts/post-body";
import { SITE } from "@/lib/constants";
import { formatDate } from "@/lib/format";
import { isSanityConfigured } from "@/sanity/env";
import { getPostBySlug, getPostSlugs } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";

export const revalidate = 60;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post não encontrado" };

  const cover =
    post.coverImage?.url ||
    (post.coverImage?.asset && isSanityConfigured()
      ? urlFor(post.coverImage).width(1200).height(630).url()
      : undefined);

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      images: cover ? [{ url: cover, alt: post.coverImage?.alt }] : undefined,
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const coverUrl =
    post.coverImage?.url ||
    (post.coverImage?.asset && isSanityConfigured()
      ? urlFor(post.coverImage).width(1400).height(788).url()
      : null);

  return (
    <article className="page-shell">
      <header className="mx-auto mb-12 max-w-[65ch]">
        <div className="mb-5 flex flex-wrap items-baseline gap-x-3 gap-y-1 font-mono text-[0.7rem] tracking-wide text-muted-foreground">
          {post.category ? (
            <Link
              href={`/categorias/${post.category.slug}`}
              className="text-primary/90 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              /{post.category.slug}
            </Link>
          ) : null}
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          {post.author ? <span>· {post.author.name}</span> : null}
        </div>

        <h1 className="font-heading text-[clamp(1.85rem,5vw,2.75rem)] font-semibold leading-tight tracking-tight">
          {post.title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>

        {post.tags && post.tags.length > 0 ? (
          <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-1" aria-label="Tags">
            {post.tags.map((tag) => (
              <li key={tag._id}>
                <Link
                  href={`/tags/${tag.slug}`}
                  className="font-mono text-[0.72rem] text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
                >
                  #{tag.slug}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </header>

      {coverUrl ? (
        <figure className="mx-auto mb-12 max-w-[65ch]">
          <Image
            src={coverUrl}
            alt={post.coverImage?.alt || `Capa do post ${post.title}`}
            width={1400}
            height={788}
            className="h-auto w-full object-cover"
            priority
          />
        </figure>
      ) : null}

      <PostBody value={post.body} />

      <footer className="mx-auto mt-16 max-w-[65ch] border-t border-border/40 pt-8">
        <p className="font-mono text-[0.72rem] text-muted-foreground">
          publicado em {SITE.name}.{" "}
          <Link
            href="/"
            className="text-primary underline-offset-4 hover:underline"
          >
            cd ~
          </Link>
        </p>
      </footer>
    </article>
  );
}
