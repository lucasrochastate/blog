import { SITE } from "@/lib/constants";
import { absoluteUrl } from "@/lib/url";
import type { Post } from "@/types/post";

type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: absoluteUrl(),
    description: SITE.description,
    inLanguage: "pt-BR",
    potentialAction: {
      "@type": "SearchAction",
      target: `${absoluteUrl("/busca")}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function articleJsonLd(post: Post, coverUrl?: string | null) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.seo?.title || post.title,
    description: post.seo?.description || post.excerpt,
    datePublished: post.publishedAt,
    author: {
      "@type": "Person",
      name: SITE.authorLabel,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: absoluteUrl(),
    },
    mainEntityOfPage: absoluteUrl(`/posts/${post.slug}`),
    image: coverUrl || undefined,
    inLanguage: "pt-BR",
    articleSection: post.category?.title,
    keywords: post.tags?.map((tag) => tag.title).join(", "),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
