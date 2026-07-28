import Image from "next/image";
import Link from "next/link";

import { formatDate } from "@/lib/format";
import { formatReadingTime } from "@/lib/reading-time";
import { isSanityConfigured } from "@/sanity/env";
import { urlFor } from "@/sanity/lib/image";
import type { PostListItem } from "@/types/post";

type PostCardProps = {
  post: PostListItem;
};

export function PostCard({ post }: PostCardProps) {
  const coverUrl =
    post.coverImage?.url ||
    (post.coverImage?.asset && isSanityConfigured()
      ? urlFor(post.coverImage).width(800).height(450).url()
      : null);

  return (
    <article className="group py-9 first:pt-0">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-8">
        <div className="min-w-0 flex-1">
          <div className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1 font-mono text-[0.7rem] tracking-wide text-muted-foreground">
            {post.category ? (
              <Link
                href={`/categorias/${post.category.slug}`}
                className="text-primary/90 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                /{post.category.slug}
              </Link>
            ) : null}
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            {post.estimatedMinutes ? (
              <span>{formatReadingTime(post.estimatedMinutes)}</span>
            ) : null}
          </div>

          <h2 className="font-heading text-[1.35rem] font-semibold leading-snug tracking-tight sm:text-[1.5rem]">
            <Link
              href={`/posts/${post.slug}`}
              className="transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {post.title}
            </Link>
          </h2>

          <p className="mt-2.5 max-w-prose text-[0.98rem] leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>

          <Link
            href={`/posts/${post.slug}`}
            className="mt-4 inline-flex font-mono text-[0.72rem] text-primary underline-offset-4 transition-opacity hover:underline"
          >
            open →
          </Link>
        </div>

        {coverUrl ? (
          <Link
            href={`/posts/${post.slug}`}
            className="relative block aspect-[16/10] w-full shrink-0 overflow-hidden opacity-90 transition-opacity group-hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:mt-1 sm:w-40"
            tabIndex={-1}
            aria-hidden="true"
          >
            <Image
              src={coverUrl}
              alt={post.coverImage?.alt || `Capa do post ${post.title}`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 160px"
            />
          </Link>
        ) : null}
      </div>
    </article>
  );
}
