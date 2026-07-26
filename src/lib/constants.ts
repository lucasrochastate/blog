export const SITE = {
  name: "terminal.faith",
  tagline: "Reflexões bíblicas digitadas com calma.",
  description:
    "terminal.faith — blog pessoal de textos bíblicos e reflexões. Leitura longa, tipografia em foco e fé tratada com respeito.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  author: "Autor",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Início", ariaLabel: "Início" },
  { href: "/categorias", label: "Categorias", ariaLabel: "Categorias" },
  { href: "/busca", label: "Busca", ariaLabel: "Buscar" },
  { href: "/sobre", label: "Sobre", ariaLabel: "Sobre" },
] as const;

/** Revalidação ISR em segundos */
export const REVALIDATE_SECONDS = 60;
