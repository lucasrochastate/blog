import Link from "next/link";

type EmptyPostsProps = {
  title?: string;
  description?: string;
};

export function EmptyPosts({
  title = "ls: nenhum arquivo neste diretório",
  description = "O log ainda está vazio. Volte depois — ou rode grep em outro termo.",
}: EmptyPostsProps) {
  return (
    <div role="status" className="py-16 text-center">
      <p className="font-mono text-[0.7rem] tracking-[0.14em] text-primary/80 uppercase">
        empty
      </p>
      <h2 className="mt-3 font-heading text-lg font-semibold tracking-tight">
        {title}
      </h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex font-mono text-[0.75rem] text-primary underline-offset-4 hover:underline"
      >
        cd ~
      </Link>
    </div>
  );
}
