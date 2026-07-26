import Link from "next/link";

import { SiteShell } from "@/components/layout/site-shell";

export default function NotFound() {
  return (
    <SiteShell>
      <div className="page-shell flex min-h-[55vh] flex-col justify-center">
        <p className="meta-line">exit 404</p>
        <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight">
          Página não encontrada
        </h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          Esse path não existe no filesystem. Spell errado, link quebrado — ou
          você caiu fora do mapa.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex w-fit font-mono text-[0.78rem] text-primary underline-offset-4 hover:underline"
        >
          cd ~
        </Link>
      </div>
    </SiteShell>
  );
}
