import type { PortableTextBlock } from "next-sanity";

export type Author = {
  _id: string;
  name: string;
  bio?: string;
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
