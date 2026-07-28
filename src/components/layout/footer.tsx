import Link from "next/link";

import { SITE } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border/50">
      <div className="mx-auto flex max-w-3xl flex-col gap-4 px-5 py-10 text-sm text-muted-foreground sm:px-6">
        <div className="flex flex-col gap-2 font-mono text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            <span className="text-foreground">{SITE.name}</span>
            <span className="mx-2 opacity-40">·</span>
            <span>
              {year} — {SITE.signature}
            </span>
          </p>
          <nav aria-label="Rodapé" className="flex flex-wrap gap-x-4 gap-y-2">
            <Link
              href="/feed.xml"
              className="text-primary underline-offset-4 hover:underline"
            >
              RSS
            </Link>
            <Link
              href="/sobre"
              className="underline-offset-4 hover:text-primary hover:underline"
            >
              Sobre
            </Link>
          </nav>
        </div>
        <p className="max-w-2xl text-xs leading-relaxed">{SITE.scopeNotice}</p>
      </div>
    </footer>
  );
}
