import type { Metadata } from "next";
import Link from "next/link";

import { SITE } from "@/lib/constants";
import { getCategories } from "@/sanity/lib/fetch";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Categorias",
  description: `Explore os textos de ${SITE.name} por categoria.`,
};

export default async function CategoriasPage() {
  const categories = await getCategories();

  return (
    <div className="page-shell">
      <header className="mb-12 max-w-xl space-y-3">
        <p className="meta-line">ls ./categorias</p>
        <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          Categorias
        </h1>
        <p className="text-base leading-relaxed text-muted-foreground">
          Pastas temáticas das reflexões — escolha uma e abra.
        </p>
      </header>

      <ul className="divide-y divide-border/40">
        {categories.map((category) => (
          <li key={category._id}>
            <Link
              href={`/categorias/${category.slug}`}
              className="group flex flex-col gap-1 py-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
            >
              <div>
                <h2 className="font-heading text-lg font-semibold tracking-tight transition-colors group-hover:text-primary">
                  {category.title}
                </h2>
                {category.description ? (
                  <p className="mt-1 max-w-md text-sm leading-relaxed text-muted-foreground">
                    {category.description}
                  </p>
                ) : null}
              </div>
              <span className="shrink-0 font-mono text-[0.72rem] text-muted-foreground transition-colors group-hover:text-primary">
                /{category.slug}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
