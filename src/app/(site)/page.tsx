import type { Metadata } from "next";
import Link from "next/link";

import { EmptyPosts } from "@/components/posts/empty-posts";
import { PostList } from "@/components/posts/post-list";
import { JsonLd, websiteJsonLd } from "@/components/seo/json-ld";
import { SITE } from "@/lib/constants";
import { getPosts } from "@/sanity/lib/fetch";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Início",
  description: SITE.description,
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
  openGraph: {
    title: SITE.name,
    description: SITE.description,
  },
};

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <div className="page-shell">
      <JsonLd data={websiteJsonLd()} />

      <header className="mb-16 sm:mb-20">
        <h1 className="animate-rise font-mono text-[clamp(2.1rem,7vw,3.4rem)] font-medium leading-none tracking-tight text-foreground">
          {SITE.name}
          <span className="cursor-blink" aria-hidden="true" />
        </h1>
        <p className="animate-rise-delay mt-4 font-mono text-[0.8rem] tracking-wide text-primary">
          {SITE.signature}
        </p>
        <p className="animate-rise-delay mt-5 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
          {SITE.manifesto}
        </p>
        <p className="animate-rise-delay-2 mt-4 max-w-md text-sm text-muted-foreground">
          {SITE.cadence}
        </p>
        <div className="animate-rise-delay-2 mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
          <Link
            href="#feed"
            className="font-mono text-[0.78rem] text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            ir ao feed ↓
          </Link>
          <Link
            href="/feed.xml"
            className="font-mono text-[0.78rem] text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
          >
            RSS
          </Link>
        </div>
      </header>

      <section id="feed" aria-labelledby="posts-recentes">
        <div className="mb-8 flex items-baseline justify-between gap-4 border-b border-border/40 pb-3">
          <h2
            id="posts-recentes"
            className="font-mono text-[0.72rem] tracking-[0.14em] text-muted-foreground uppercase"
          >
            recent.log
          </h2>
          <Link
            href="/categorias"
            className="font-mono text-[0.72rem] text-primary underline-offset-4 hover:underline"
          >
            categorias
          </Link>
        </div>

        {posts.length === 0 ? <EmptyPosts /> : <PostList posts={posts} />}
      </section>
    </div>
  );
}
