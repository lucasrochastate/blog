import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { EngagedReadingTracker } from "@/components/analytics/engaged-reading-tracker";
import { PostBody } from "@/components/posts/post-body";
import { PostEngagement } from "@/components/posts/post-engagement";
import { PostNav } from "@/components/posts/post-nav";
import { RelatedPosts } from "@/components/posts/related-section";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  JsonLd,
} from "@/components/seo/json-ld";
import { SITE } from "@/lib/constants";
import { formatDate } from "@/lib/format";
import { formatReadingTime } from "@/lib/reading-time";
import { absoluteUrl } from "@/lib/url";
import { isSanityConfigured } from "@/sanity/env";
import {
  getAdjacentPosts,
  getPostBySlug,
  getPostSlugs,
  getRelatedPosts,
} from "@/sanity/lib/fetch";
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

  const title = post.seo?.title || post.title;
  const description = post.seo?.description || post.excerpt;
  const cover =
    post.seo?.ogImageUrl ||
    post.coverImage?.url ||
    (post.coverImage?.asset && isSanityConfigured()
      ? urlFor(post.coverImage).width(1200).height(630).url()
      : undefined);
  const canonical = post.seo?.canonicalUrl || absoluteUrl(`/posts/${post.slug}`);

  return {
    title,
    description,
    alternates: { canonical },
    robots: post.seo?.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.publishedAt,
      url: canonical,
      siteName: SITE.name,
      locale: "pt_BR",
      images: cover
        ? [
            {
              url: cover,
              alt: post.coverImage?.alt || title,
              width: 1200,
              height: 630,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: cover ? [cover] : undefined,
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const [adjacent, related] = await Promise.all([
    getAdjacentPosts(post.publishedAt),
    getRelatedPosts(post),
  ]);

  const coverUrl =
    post.coverImage?.url ||
    (post.coverImage?.asset && isSanityConfigured()
      ? urlFor(post.coverImage).width(1400).height(788).url()
      : null);

  const shareUrl = absoluteUrl(`/posts/${post.slug}`);

  return (
    <article className="page-shell">
      <EngagedReadingTracker slug={post.slug} title={post.title} />
      <JsonLd
        data={[
          articleJsonLd(post, coverUrl),
          breadcrumbJsonLd([
            { name: "Início", path: "/" },
            ...(post.category
              ? [
                  {
                    name: post.category.title,
                    path: `/categorias/${post.category.slug}`,
                  },
                ]
              : []),
            { name: post.title, path: `/posts/${post.slug}` },
          ]),
        ]}
      />

      <header className="mx-auto mb-12 max-w-[65ch]">
        <div className="mb-5 flex flex-wrap items-baseline gap-x-3 gap-y-1 font-mono text-[0.7rem] tracking-wide text-muted-foreground">
          {post.category ? (
            <Link
              href={`/categorias/${post.category.slug}`}
              className="text-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              /{post.category.slug}
            </Link>
          ) : null}
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          {post.estimatedMinutes ? (
            <span>{formatReadingTime(post.estimatedMinutes)}</span>
          ) : null}
        </div>

        <h1 className="font-heading text-[clamp(1.85rem,5vw,2.75rem)] font-semibold leading-tight tracking-tight">
          {post.title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>

        <p className="mt-4 font-mono text-[0.7rem] text-muted-foreground">
          Citações bíblicas em{" "}
          <span className="text-foreground">
            {SITE.bibleTranslation} ({SITE.bibleTranslationLabel})
          </span>
          , salvo indicação em contrário.
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
            sizes="(max-width: 768px) 100vw, 65ch"
          />
        </figure>
      ) : null}

      <PostBody value={post.body} />

      <div className="mx-auto mt-12 max-w-[65ch]">
        <PostEngagement
          slug={post.slug}
          title={post.title}
          url={shareUrl}
          excerpt={post.excerpt}
          initialLikes={post.likes ?? 0}
        />
      </div>

      <div className="mx-auto mt-10 max-w-[65ch]">
        <RelatedPosts posts={related} links={post.relatedLinks} />
      </div>

      <div className="mx-auto mt-10 max-w-[65ch]">
        <PostNav previous={adjacent.previous} next={adjacent.next} />
      </div>

      <footer className="mx-auto mt-12 max-w-[65ch] border-t border-border/40 pt-8">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {SITE.scopeNotice}
        </p>
        <p className="mt-4 font-mono text-[0.72rem] text-muted-foreground">
          publicado em {SITE.name}.{" "}
          <Link
            href="/"
            className="text-primary underline-offset-4 hover:underline"
          >
            voltar ao início
          </Link>
        </p>
      </footer>
    </article>
  );
}
