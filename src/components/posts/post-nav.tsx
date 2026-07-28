import Link from "next/link";

type NavPost = {
  title: string;
  slug: string;
};

type PostNavProps = {
  previous: NavPost | null;
  next: NavPost | null;
};

export function PostNav({ previous, next }: PostNavProps) {
  if (!previous && !next) return null;

  return (
    <nav
      aria-label="Navegação entre posts"
      className="grid gap-6 border-t border-border/40 pt-8 sm:grid-cols-2"
    >
      {previous ? (
        <Link
          href={`/posts/${previous.slug}`}
          className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="font-mono text-[0.7rem] tracking-wide text-muted-foreground uppercase">
            ← anterior
          </span>
          <span className="mt-1 block text-sm font-medium transition-colors group-hover:text-primary">
            {previous.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`/posts/${next.slug}`}
          className="group block text-right focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:justify-self-end"
        >
          <span className="font-mono text-[0.7rem] tracking-wide text-muted-foreground uppercase">
            próximo →
          </span>
          <span className="mt-1 block text-sm font-medium transition-colors group-hover:text-primary">
            {next.title}
          </span>
        </Link>
      ) : null}
    </nav>
  );
}
