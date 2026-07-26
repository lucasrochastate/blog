import type { Metadata } from "next";

import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Sobre",
  description: `Conheça o propósito de ${SITE.name} e a intenção por trás das reflexões publicadas.`,
  openGraph: {
    title: `Sobre · ${SITE.name}`,
    description: `Conheça o propósito de ${SITE.name}.`,
  },
};

export default function SobrePage() {
  return (
    <div className="page-shell">
      <article className="prose-article mx-auto">
        <header className="mb-10 space-y-4">
          <p className="meta-line">whoami</p>
          <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Sobre este espaço
          </h1>
        </header>

        <p>
          Este blog nasceu do desejo de registrar reflexões bíblicas com
          seriedade, clareza e respeito. Aqui, os textos buscam servir à
          meditação das Escrituras — não ao entretenimento, nem à polêmica
          vazia.
        </p>

        <h2>Propósito</h2>
        <p>
          Publicar estudos e reflexões que ajudem o leitor a aproximar-se da
          Palavra com atenção. Cada post pretende ser um convite à leitura
          pausada, à oração e à aplicação prática da fé no cotidiano.
        </p>

        <h2>Como ler</h2>
        <p>
          Os textos são organizados por categorias — Antigo Testamento, Novo
          Testamento, Salmos e Reflexões — e podem incluir citações bíblicas
          destacadas. Recomenda-se ler com a Bíblia aberta, confrontando cada
          reflexão com o contexto do versículo citado.
        </p>

        <h2>Sobre o autor</h2>
        <p>
          Sou um leitor das Escrituras que escreve para aprender e para
          compartilhar. Este espaço não substitui a comunidade local de fé, a
          pregação nem o estudo aprofundado; é apenas um diário público de
          meditações, oferecido com humildade.
        </p>

        <p>
          Que a graça e a verdade de Cristo iluminem a leitura de cada texto
          publicado aqui.
        </p>
      </article>
    </div>
  );
}
