export default function Loading() {
  return (
    <div
      className="page-shell flex min-h-[40vh] flex-col items-start justify-center"
      role="status"
      aria-live="polite"
    >
      <p className="font-mono text-sm text-primary">
        <span className="cursor-blink" aria-hidden="true" />
        compiling faith…
      </p>
      <span className="sr-only">Carregando conteúdo</span>
    </div>
  );
}
