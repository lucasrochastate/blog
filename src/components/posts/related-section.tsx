import Link from "next/link";

import { formatReadingTime } from "@/lib/reading-time";
import type { PostListItem, RelatedLink } from "@/types/post";

type RelatedPostsProps = {
  posts: PostListItem[];
  links?: RelatedLink[];
};

export function RelatedPosts({ posts, links }: RelatedPostsProps) {
  const hasPosts = posts.length > 0;
  const hasLinks = Boolean(links?.length);
  if (!hasPosts && !hasLinks) return null;

  return (
    <section aria-labelledby="related-heading" className="mt-12 border-t border-border/40 pt-8">
      <h2
        id="related-heading"
        className="font-mono text-[0.72rem] tracking-[0.14em] text-muted-foreground uppercase"
      >
        continue lendo
      </h2>

      {hasPosts ? (
        <ul className="mt-5 space-y-4">
          {posts.map((post) => (
            <li key={post._id}>
              <Link
                href={`/posts/${post.slug}`}
                className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="font-heading text-base font-semibold tracking-tight transition-colors group-hover:text-primary">
                  {post.title}
                </span>
                <span className="mt-1 block font-mono text-[0.7rem] text-muted-foreground">
                  {post.estimatedMinutes
                    ? formatReadingTime(post.estimatedMinutes)
                    : null}
                  {post.category ? ` · /${post.category.slug}` : ""}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}

      {hasLinks ? (
        <ul className="mt-5 space-y-2">
          {links!.map((link) => (
            <li key={`${link.href}-${link.label}`}>
              <Link
                href={link.href}
                className="font-mono text-[0.78rem] text-primary underline-offset-4 hover:underline"
              >
                {link.label} →
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
