import Link from "next/link";

import { Navigation } from "@/components/layout/navigation";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { SITE } from "@/lib/constants";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/50 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between gap-4 px-5 sm:px-6">
        <Link
          href="/"
          className="group font-mono text-[0.95rem] tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="text-muted-foreground transition-colors group-hover:text-foreground">
            ~/
          </span>
          <span className="text-foreground">{SITE.name}</span>
        </Link>

        <div className="flex items-center gap-1">
          <Navigation />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
