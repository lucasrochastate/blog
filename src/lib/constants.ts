export const SITE = {
  name: "terminal.faith",
  tagline: "Reflexões bíblicas digitadas com calma.",
  /** Promessa editorial fixa — assinatura do produto */
  signature: "fé pensada com calma, sem perder a reverência",
  manifesto:
    "Reflexões bíblicas sérias, em linguagem acessível. A casca é jovem e um pouco nerd; o conteúdo trata a Escritura com respeito.",
  description:
    "terminal.faith — reflexões bíblicas sérias, linguagem acessível e fé tratada com respeito. Leitura longa, tipografia em foco.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /** Cadência editorial comunicada ao leitor */
  cadence: "Uma reflexão nova por semana, em média.",
  /** Tradução bíblica padrão do blog */
  bibleTranslation: "ARA",
  bibleTranslationLabel: "Almeida Revista e Atualizada",
  /** Autor permanece anônimo no site público */
  authorLabel: "Autor",
  scopeNotice:
    "Este blog não substitui a comunidade local de fé, o aconselhamento pastoral nem o estudo bíblico aprofundado. É um diário de reflexões oferecido com humildade.",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Início", ariaLabel: "Início" },
  { href: "/categorias", label: "Categorias", ariaLabel: "Categorias" },
  { href: "/busca", label: "Busca", ariaLabel: "Buscar" },
  { href: "/sobre", label: "Sobre", ariaLabel: "Sobre" },
] as const;

/** Revalidação ISR em segundos (fallback quando não há webhook) */
export const REVALIDATE_SECONDS = 60;

/** Thresholds da métrica norte: leitura engajada */
export const ENGAGED_READING = {
  minSeconds: 45,
  minScrollRatio: 0.55,
} as const;
