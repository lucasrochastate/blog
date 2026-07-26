"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { EmptyPosts } from "@/components/posts/empty-posts";
import { Input } from "@/components/ui/input";
import { formatDate } from "@/lib/format";
import type { SearchPost } from "@/types/post";

export function PostSearch({ posts }: { posts: SearchPost[] }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;

    return posts.filter((post) => {
      const haystack = [
        post.title,
        post.excerpt,
        post.bodyText ?? "",
        post.category?.title ?? "",
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [posts, query]);

  return (
    <div className="space-y-10">
      <div>
        <label htmlFor="busca-posts" className="sr-only">
          Buscar posts por título ou conteúdo
        </label>
        <div className="flex items-center gap-3 border-b border-border/60 pb-2">
          <span className="font-mono text-sm text-primary" aria-hidden="true">
            $
          </span>
          <Input
            id="busca-posts"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="tema, livro bíblico, palavra-chave…"
            className="h-10 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
            autoComplete="off"
            aria-describedby="busca-ajuda"
          />
        </div>
        <p id="busca-ajuda" className="mt-2 font-mono text-[0.7rem] text-muted-foreground">
          busca local · sem loading de JRPG desta vez
        </p>
      </div>

      {results.length === 0 ? (
        <EmptyPosts
          title="grep: 0 matches"
          description="Nada combina com esse termo. Tente outra palavra — ou volte ao feed."
        />
      ) : (
        <ul className="divide-y divide-border/40" aria-live="polite">
          {results.map((post) => (
            <li key={post._id} className="py-5">
              <Link
                href={`/posts/${post.slug}`}
                className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <h2 className="font-heading text-lg font-semibold tracking-tight transition-colors hover:text-primary">
                  {post.title}
                </h2>
              </Link>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {post.excerpt}
              </p>
              <p className="mt-2 font-mono text-[0.7rem] text-muted-foreground">
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                {post.category ? ` · /${post.category.slug}` : ""}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
