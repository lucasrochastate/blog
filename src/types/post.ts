import type { PortableTextBlock } from "next-sanity";

export type Author = {
  _id: string;
  name: string;
  bio?: string;
  role?: string;
  context?: string;
  email?: string;
  imageUrl?: string;
};

export type Category = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
};

export type Tag = {
  _id: string;
  title: string;
  slug: string;
};

export type CoverImage = {
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt: string;
  url?: string;
};

export type PostStatus = "draft" | "published";

export type PostSeo = {
  title?: string;
  description?: string;
  ogImageUrl?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
};

export type RelatedLink = {
  label: string;
  href: string;
};

export type PostListItem = {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  excerpt: string;
  status: PostStatus;
  author?: Author;
  category?: Category;
  tags?: Tag[];
  coverImage?: CoverImage & { url?: string };
  /** Texto plano do corpo — usado para reading time / busca */
  bodyText?: string;
  estimatedMinutes?: number;
};

export type VerseQuoteBlock = {
  _type: "verseQuote";
  _key: string;
  text: string;
  reference: string;
  translation?: string;
};

export type PostBodyBlock = PortableTextBlock | VerseQuoteBlock;

export type Post = PostListItem & {
  body: PostBodyBlock[];
  seo?: PostSeo;
  relatedLinks?: RelatedLink[];
  searchIntent?: string;
};

export type SearchPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  bodyText?: string;
  category?: { title: string; slug: string };
};
