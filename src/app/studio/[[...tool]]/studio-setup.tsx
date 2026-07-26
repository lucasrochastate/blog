/**
 * Tela de fallback exibida em /studio quando o Sanity ainda não foi configurado.
 * Evita o erro "Project not found" causado pelo projectId "placeholder".
 */
export function StudioSetup() {
  const steps = [
    {
      title: "Crie um projeto no Sanity",
      body: (
        <>
          Acesse{" "}
          <a
            href="https://www.sanity.io/manage"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-400 underline underline-offset-4"
          >
            sanity.io/manage
          </a>{" "}
          e crie um projeto gratuito. Copie o <strong>Project ID</strong>.
        </>
      ),
    },
    {
      title: "Preencha o .env.local",
      body: (
        <>
          No arquivo <code className="font-mono text-sky-400">.env.local</code>{" "}
          da raiz do projeto, defina:
        </>
      ),
      code: [
        "NEXT_PUBLIC_SANITY_PROJECT_ID=seu_project_id",
        "NEXT_PUBLIC_SANITY_DATASET=production",
        "NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01",
      ].join("\n"),
    },
    {
      title: "Libere o CORS",
      body: (
        <>
          Em <strong>API → CORS origins</strong> no painel do Sanity, adicione{" "}
          <code className="font-mono text-sky-400">http://localhost:3000</code>{" "}
          (marque &ldquo;Allow credentials&rdquo;).
        </>
      ),
    },
    {
      title: "Reinicie o servidor",
      body: (
        <>
          Pare e rode <code className="font-mono text-sky-400">npm run dev</code>{" "}
          de novo. Esta página passará a carregar o Studio automaticamente.
        </>
      ),
    },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] px-6 py-16 text-zinc-100">
      <div className="w-full max-w-2xl">
        <p className="font-mono text-xs tracking-[0.2em] text-sky-400 uppercase">
          sanity studio
        </p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
          Configure o CMS para continuar
        </h1>
        <p className="mt-3 leading-relaxed text-zinc-400">
          O Studio precisa de um <strong>Project ID</strong> válido do Sanity.
          Enquanto ele não estiver configurado, o site público continua
          funcionando com conteúdo de demonstração — mas o painel de edição fica
          indisponível.
        </p>

        <ol className="mt-8 space-y-6">
          {steps.map((step, index) => (
            <li key={step.title} className="flex gap-4">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-sky-400/40 font-mono text-sm text-sky-400">
                {index + 1}
              </span>
              <div className="space-y-3">
                <h2 className="font-medium text-zinc-100">{step.title}</h2>
                <p className="text-sm leading-relaxed text-zinc-400">
                  {step.body}
                </p>
                {step.code ? (
                  <pre className="overflow-x-auto rounded-lg border border-zinc-800 bg-black/60 p-4 font-mono text-xs text-zinc-300">
                    {step.code}
                  </pre>
                ) : null}
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-10 border-t border-zinc-800 pt-6">
          <a
            href="/"
            className="font-mono text-xs tracking-wide text-sky-400 uppercase underline-offset-4 hover:underline"
          >
            ← Voltar ao site
          </a>
        </div>
      </div>
    </div>
  );
}
