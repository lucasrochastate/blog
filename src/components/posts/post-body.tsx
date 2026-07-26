import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Image from "next/image";

import { VerseQuote } from "@/components/posts/verse-quote";
import { isSanityConfigured } from "@/sanity/env";
import { urlFor } from "@/sanity/lib/image";
import type { PostBodyBlock } from "@/types/post";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
    normal: ({ children }) => <p>{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
    number: ({ children }) => <ol>{children}</ol>,
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href ?? "#";
      const isExternal = href.startsWith("http");
      return (
        <a
          href={href}
          rel={isExternal ? "noopener noreferrer" : undefined}
          target={isExternal ? "_blank" : undefined}
        >
          {children}
        </a>
      );
    },
  },
  types: {
    verseQuote: ({ value }) => (
      <VerseQuote
        text={value.text}
        reference={value.reference}
        translation={value.translation}
      />
    ),
    image: ({ value }) => {
      const alt = value.alt || "Imagem do conteúdo";
      const src =
        value.url ||
        (isSanityConfigured() && value.asset
          ? urlFor(value).width(1200).height(675).url()
          : null);

      if (!src) return null;

      return (
        <figure className="my-8">
          <Image
            src={src}
            alt={alt}
            width={1200}
            height={675}
            className="h-auto w-full rounded-lg"
          />
        </figure>
      );
    },
  },
};

export function PostBody({ value }: { value: PostBodyBlock[] }) {
  return (
    <div className="prose-article mx-auto">
      <PortableText value={value} components={components} />
    </div>
  );
}
