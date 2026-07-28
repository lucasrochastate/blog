# terminal.faith

Blog pessoal de textos bíblicos e reflexões — **Next.js (App Router) + TypeScript + Tailwind CSS + shadcn/ui + Sanity CMS**. Identidade de terminal (fósforo), tipografia editorial e casca nerd/jovem; o conteúdo sagrado permanece sério.

Sem as variáveis do Sanity, o site sobe com **conteúdo de demonstração** local — útil para desenvolver o front antes de conectar o CMS.

## Stack

- Next.js 16 (App Router, SSG/ISR)
- React 19 + TypeScript
- Tailwind CSS 4 + shadcn/ui
- Sanity (headless CMS) + Portable Text
- next-themes (dark/light)
- lucide-react

## Começar

### 1. Instalar dependências

```bash
npm install
```

### 2. Variáveis de ambiente

```bash
cp .env.example .env.local
```

Preencha:

| Variável | Descrição |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL pública (ex.: `http://localhost:3000`) |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | ID do projeto no Sanity |
| `NEXT_PUBLIC_SANITY_DATASET` | Dataset (padrão: `production`) |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Versão da API (ex.: `2025-01-01`) |
| `SANITY_REVALIDATE_SECRET` | Secret do webhook `/api/revalidate` |

### 3. Rodar o front

```bash
npm run dev
```

- Site: [http://localhost:3000](http://localhost:3000)
- Studio (CMS): [http://localhost:3000/studio](http://localhost:3000/studio)

## Configurar o Sanity

1. Crie uma conta/projeto em [sanity.io/manage](https://www.sanity.io/manage).
2. Copie o **Project ID** para `.env.local`.
3. Em **API → CORS origins**, adicione `http://localhost:3000` (e a URL de produção depois).
4. Abra `/studio`, autentique-se e publique:
   - 1 **Autor**
   - Categorias (ex.: Antigo Testamento, Novo Testamento, Reflexões, Salmos)
   - Tags (opcional)
   - Posts e clique em **Publish** (Publicar) no Studio
5. Reinicie `npm run dev` — o site passa a consumir o CMS (ISR a cada 60s).

### Schema do Post

- Título, slug (auto), data, autor, categoria, tags
- Imagem de capa (opcional, com `alt` obrigatório)
- Resumo (excerpt)
- Corpo (Portable Text + bloco **Citação bíblica** com tradução obrigatória)
- SEO (title, description, canonical, OG image, noindex)
- Links internos planejados + intenção de busca
- **Checklist de publicação** (obrigatório antes de Publish)
- Status editorial (opcional, só organização no painel)

Só posts **Publishados** no Studio (botão Publish) aparecem no site.

Ver também `EDITORIAL.md` (cadência, revisão mensal, webhook).

### Rotas úteis

| Rota | Função |
|---|---|
| `/feed.xml` | RSS |
| `/api/revalidate` | Webhook Sanity → ISR on-demand |

## Scripts

```bash
npm run dev      # desenvolvimento
npm run build    # build de produção
npm run start    # servir build
npm run lint     # ESLint
```

## Estrutura (resumo)

```text
src/
  app/
    (site)/          # páginas públicas com Header/Footer
    studio/          # Sanity Studio embutido
    sitemap.ts
    robots.ts
  components/        # layout, posts, busca, tema, ui
  data/demo-posts.ts # fallback sem Sanity
  sanity/            # client, queries, schemas
```

## Design tokens

- Dark: fundo `#070908`, texto `#E8EBE6`, fósforo `#4ADE80`
- Light: fundo `#F7F5F0`, texto `#1C1917`, destaque `#15803D`
- Fontes: IBM Plex Sans / Mono + Source Serif 4 (corpo dos artigos)

## Deploy

### Front (Vercel)

1. Suba o repositório para o GitHub.
2. Importe o projeto na [Vercel](https://vercel.com).
3. Configure as mesmas variáveis de `.env.example`.
4. Deploy. A Vercel detecta Next.js automaticamente.

### Sanity

- O Studio já está em `/studio` no mesmo deploy (recomendado).
- Alternativa: hospede o Studio no Sanity (`npx sanity deploy`) apontando para o mesmo `projectId`/`dataset`.
- Em CORS do Sanity, libere a URL da Vercel (`https://seu-projeto.vercel.app`).

### Após publicar conteúdo

O site usa **ISR** (`revalidate = 60`). Em até ~1 minuto o conteúdo novo aparece; para invalidação imediata, dá para adicionar um webhook Sanity → Vercel depois.

## Acessibilidade

- Skip link, HTML semântico, foco visível
- Contraste WCAG AA na paleta
- `alt` obrigatório em capas
- `prefers-reduced-motion` respeitado
- Labels/`aria-label` em busca, menu e toggle de tema
- Corpo de artigo com ~70ch e line-height generoso

## Tom de voz

- Interface: leve, nerd, referências sutis (estados vazios, loading, footer)
- Conteúdo bíblico e página **Sobre**: tom sério e respeitoso

## Licença

Uso pessoal — adapte livremente.
