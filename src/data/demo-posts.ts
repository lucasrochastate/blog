/**
 * Dados de demonstração usados quando o Sanity ainda não está configurado.
 * Assim o front sobe localmente antes de criar o projeto no CMS.
 */
import type { Category, Post, SearchPost, Tag } from "@/types/post";

export const demoCategories: Category[] = [
  {
    _id: "cat-at",
    title: "Antigo Testamento",
    slug: "antigo-testamento",
    description: "Reflexões a partir dos livros do Antigo Testamento.",
  },
  {
    _id: "cat-nt",
    title: "Novo Testamento",
    slug: "novo-testamento",
    description: "Estudos e meditações no Novo Testamento.",
  },
  {
    _id: "cat-reflexoes",
    title: "Reflexões",
    slug: "reflexoes",
    description: "Textos de aplicação prática e vida cristã.",
  },
  {
    _id: "cat-salmos",
    title: "Salmos",
    slug: "salmos",
    description: "Orações, louvores e clamor dos Salmos.",
  },
];

export const demoTags: Tag[] = [
  { _id: "tag-fe", title: "Fé", slug: "fe" },
  { _id: "tag-esperanca", title: "Esperança", slug: "esperanca" },
  { _id: "tag-oracao", title: "Oração", slug: "oracao" },
];

export const demoPosts: Post[] = [
  {
    _id: "post-1",
    title: "A quietude que restaura",
    slug: "a-quietude-que-restaura",
    publishedAt: "2026-07-20T10:00:00.000Z",
    excerpt:
      "Uma reflexão sobre o Salmo 46 e o convite a aquietar-se diante de Deus em meio ao ruído.",
    status: "published",
    likes: 0,
    author: {
      _id: "author-1",
      name: "Autor",
      bio: "Escritor de reflexões bíblicas.",
    },
    category: demoCategories[3],
    tags: [demoTags[1], demoTags[2]],
    body: [
      {
        _type: "block",
        _key: "b1",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "s1",
            text: "Vivemos em uma época de velocidade constante. Notificações, prazos e preocupações disputam a atenção a cada instante. O Salmo 46, porém, abre um espaço diferente: o de reconhecer que Deus é refúgio e fortaleza, e que há um chamado à quietude.",
            marks: [],
          },
        ],
      },
      {
        _type: "verseQuote",
        _key: "v1",
        text: "Aquietai-vos e sabei que eu sou Deus.",
        reference: "Salmos 46:10",
        translation: "ARA",
      },
      {
        _type: "block",
        _key: "b2",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "s2",
            text: "Aquietar-se não é passividade vazia. É confiança ativa: deixar de lado a ilusão de controle e lembrar quem sustenta todas as coisas. Nesta quietude, a oração deixa de ser apenas pedido e se torna presença.",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "b3",
        style: "h2",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "s3",
            text: "Praticando a quietude",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "b4",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "s4",
            text: "Reserve alguns minutos do dia para ler um salmo em voz baixa, sem pressa. Peça discernimento. Observe o que o texto revela sobre o caráter de Deus e sobre o seu próprio coração. A restauração começa quando paramos o suficiente para ouvir.",
            marks: [],
          },
        ],
      },
    ],
  },
  {
    _id: "post-2",
    title: "Luz que não se apaga",
    slug: "luz-que-nao-se-apaga",
    publishedAt: "2026-07-18T14:30:00.000Z",
    excerpt:
      "Meditação em João 1 sobre a luz verdadeira que ilumina a todo homem e permanece mesmo nas trevas.",
    status: "published",
    likes: 0,
    author: { _id: "author-1", name: "Autor" },
    category: demoCategories[1],
    tags: [demoTags[0], demoTags[1]],
    body: [
      {
        _type: "block",
        _key: "b1",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "s1",
            text: "O prólogo de João apresenta Cristo como a Palavra eterna e como luz. As trevas existem, mas não prevalecem. Essa verdade sustenta a esperança cristã em tempos difíceis.",
            marks: [],
          },
        ],
      },
      {
        _type: "verseQuote",
        _key: "v1",
        text: "A luz resplandece nas trevas, e as trevas não prevaleceram contra ela.",
        reference: "João 1:5",
        translation: "ARA",
      },
      {
        _type: "block",
        _key: "b2",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "s2",
            text: "Seguir a luz de Cristo é caminhar com honestidade, arrependimento e confiança. Não se trata de negar a realidade das trevas, mas de afirmar que elas não têm a última palavra.",
            marks: [],
          },
        ],
      },
    ],
  },
  {
    _id: "post-3",
    title: "Confiança no deserto",
    slug: "confianca-no-deserto",
    publishedAt: "2026-07-10T09:00:00.000Z",
    excerpt:
      "Lições de Êxodo sobre provisão, dependência e fidelidade de Deus no caminho do deserto.",
    status: "published",
    likes: 0,
    author: { _id: "author-1", name: "Autor" },
    category: demoCategories[0],
    tags: [demoTags[0]],
    body: [
      {
        _type: "block",
        _key: "b1",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "s1",
            text: "O deserto na narrativa bíblica é lugar de prova e de formação. Israel aprendeu a depender do maná diário — um lembrete de que a fidelidade de Deus se renova a cada manhã.",
            marks: [],
          },
        ],
      },
      {
        _type: "verseQuote",
        _key: "v1",
        text: "O Senhor é o que pelejará por vós; e vós vos calareis.",
        reference: "Êxodo 14:14",
        translation: "ARA",
      },
    ],
  },
  {
    _id: "post-4",
    title: "Andar em novidade de vida",
    slug: "andar-em-novidade-de-vida",
    publishedAt: "2026-07-05T16:00:00.000Z",
    excerpt:
      "Uma reflexão sobre Romanos 6 e o chamado a viver a liberdade em Cristo com responsabilidade e gratidão.",
    status: "published",
    likes: 0,
    author: { _id: "author-1", name: "Autor" },
    category: demoCategories[2],
    tags: [demoTags[0]],
    body: [
      {
        _type: "block",
        _key: "b1",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "s1",
            text: "A graça não é licença para o pecado; é poder para uma vida nova. Paulo convida a comunidade a considerar-se morta para o pecado e viva para Deus em Cristo Jesus.",
            marks: [],
          },
        ],
      },
    ],
  },
];

export const demoSearchIndex: SearchPost[] = demoPosts.map((post) => ({
  _id: post._id,
  title: post.title,
  slug: post.slug,
  excerpt: post.excerpt,
  publishedAt: post.publishedAt,
  bodyText: post.body
    .map((block) => {
      if (block._type === "verseQuote") {
        const verse = block as { text?: string; reference?: string };
        return `${verse.text ?? ""} ${verse.reference ?? ""}`;
      }
      if (block._type === "block" && "children" in block) {
        const children = block.children as { text?: string }[];
        return children.map((c) => c.text ?? "").join("");
      }
      return "";
    })
    .join(" "),
  category: post.category
    ? { title: post.category.title, slug: post.category.slug }
    : undefined,
}));
