import type { Metadata } from "next";

import { PostSearch } from "@/components/search/post-search";
import { SITE } from "@/lib/constants";
import { getSearchIndex } from "@/sanity/lib/fetch";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Busca",
  description: `Busque textos e reflexões publicados em ${SITE.name}.`,
};

export default async function BuscaPage() {
  const posts = await getSearchIndex();

  return (
    <div className="page-shell">
      <header className="mb-10 space-y-3">
        <p className="meta-line">grep -i</p>
        <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          Buscar
        </h1>
        <p className="max-w-md text-base leading-relaxed text-muted-foreground">
          Título, categoria ou trecho do texto — digite e filtra na hora.
        </p>
      </header>

      <PostSearch posts={posts} />
    </div>
  );
}
