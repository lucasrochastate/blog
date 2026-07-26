import Link from "next/link";

import { SITE } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border/50">
      <div className="mx-auto flex max-w-3xl flex-col gap-2 px-5 py-10 font-mono text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          <span className="text-foreground">{SITE.name}</span>
          <span className="mx-2 opacity-40">·</span>
          <span>
            {year} — exit 0, grace &gt; 0
          </span>
        </p>
        <p>
          <Link
            href="/sobre"
            className="text-primary underline-offset-4 hover:underline"
          >
            Sobre
          </Link>
        </p>
      </div>
    </footer>
  );
}
