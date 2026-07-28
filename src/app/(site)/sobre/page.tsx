import type { Metadata } from "next";

import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Sobre",
  description: `Conheça o propósito de ${SITE.name}.`,
  openGraph: {
    title: `Sobre · ${SITE.name}`,
    description: `O propósito por trás de ${SITE.name}.`,
  },
};

export default function SobrePage() {
  return (
    <div className="page-shell">
      <article className="prose-article mx-auto">
        <header className="mb-10 space-y-4">
          <p className="meta-line">sobre</p>
          <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Sobre este espaço
          </h1>
          <p className="font-mono text-sm text-primary">{SITE.signature}</p>
        </header>

        <p>{SITE.manifesto}</p>

        <h2>Propósito</h2>
        <p>
          Publicar estudos e reflexões que ajudem o leitor a aproximar-se da
          Palavra com atenção. Cada post pretende ser um convite à leitura
          pausada, à oração e à aplicação prática da fé no cotidiano.
        </p>

        <h2>Como ler</h2>
        <p>
          Os textos são organizados por categorias — Antigo Testamento, Novo
          Testamento, Salmos e Reflexões — e incluem citações bíblicas
          destacadas. A tradução padrão é{" "}
          <strong>
            {SITE.bibleTranslation} ({SITE.bibleTranslationLabel})
          </strong>
          , salvo indicação no próprio versículo. Recomenda-se ler com a Bíblia
          aberta, confrontando cada reflexão com o contexto do versículo citado.
        </p>

        <h2>Cadência</h2>
        <p>{SITE.cadence}</p>

        <h2>Escopo e limites</h2>
        <p>{SITE.scopeNotice}</p>
      </article>
    </div>
  );
}
