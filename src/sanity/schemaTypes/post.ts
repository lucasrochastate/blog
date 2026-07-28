import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Checklist editorial embutido no documento — força revisão antes de Publish.
 */
export const post = defineType({
  name: "post",
  title: "Post",
  type: "document",
  groups: [
    { name: "content", title: "Conteúdo", default: true },
    { name: "meta", title: "Taxonomia" },
    { name: "seo", title: "SEO" },
    { name: "checklist", title: "Checklist" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Data de publicação",
      type: "datetime",
      group: "content",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "author",
      title: "Autor",
      type: "reference",
      group: "meta",
      to: [{ type: "author" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Categoria",
      type: "reference",
      group: "meta",
      to: [{ type: "category" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      group: "meta",
      of: [{ type: "reference", to: [{ type: "tag" }] }],
    }),
    defineField({
      name: "searchIntent",
      title: "Intenção de busca",
      type: "string",
      group: "seo",
      description:
        "Pergunta real que este texto responde. Ex.: “o que a Bíblia diz sobre medo?”",
    }),
    defineField({
      name: "coverImage",
      title: "Imagem de capa",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Texto alternativo",
          type: "string",
          description: "Obrigatório para acessibilidade quando houver imagem.",
          validation: (rule) =>
            rule.custom((alt, context) => {
              const parent = context.parent as { asset?: unknown } | undefined;
              if (parent?.asset && !alt) {
                return "Informe o texto alternativo da imagem de capa.";
              }
              return true;
            }),
        }),
      ],
    }),
    defineField({
      name: "excerpt",
      title: "Resumo",
      type: "text",
      group: "content",
      rows: 3,
      validation: (rule) => rule.required().max(280),
    }),
    defineField({
      name: "body",
      title: "Corpo do texto",
      type: "blockContent",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "relatedLinks",
      title: "Links internos planejados",
      type: "array",
      group: "meta",
      description:
        "Conecte este texto a outros por conceito (não só por tag). Use caminhos como /posts/slug.",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Rótulo",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "href",
              title: "URL ou caminho",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "href" },
          },
        }),
      ],
    }),
    defineField({
      name: "seo",
      title: "Metadados SEO",
      type: "object",
      group: "seo",
      fields: [
        defineField({
          name: "title",
          title: "Título SEO",
          type: "string",
          description: "Se vazio, usa o título do post.",
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 3,
          description: "Se vazio, usa o resumo.",
        }),
        defineField({
          name: "canonicalUrl",
          title: "URL canônica",
          type: "url",
          description:
            "Use quando o texto também existir em outra plataforma. Aponta para o original.",
        }),
        defineField({
          name: "ogImage",
          title: "Imagem social (Open Graph)",
          type: "image",
          description: "Se vazio, usa a capa.",
        }),
        defineField({
          name: "noIndex",
          title: "Não indexar",
          type: "boolean",
          initialValue: false,
        }),
      ],
    }),
    defineField({
      name: "checklist",
      title: "Checklist de publicação",
      type: "object",
      group: "checklist",
      description: "Marque antes de clicar em Publish.",
      fields: [
        defineField({
          name: "titleOk",
          title: "Título claro e fiel ao texto",
          type: "boolean",
          initialValue: false,
        }),
        defineField({
          name: "excerptOk",
          title: "Resumo revisado (sem spoiler desnecessário)",
          type: "boolean",
          initialValue: false,
        }),
        defineField({
          name: "slugOk",
          title: "Slug estável e legível",
          type: "boolean",
          initialValue: false,
        }),
        defineField({
          name: "coverAltOk",
          title: "Capa com alt (ou sem capa de propósito)",
          type: "boolean",
          initialValue: false,
        }),
        defineField({
          name: "refsOk",
          title: "Referências bíblicas conferidas + tradução",
          type: "boolean",
          initialValue: false,
        }),
        defineField({
          name: "internalLinksOk",
          title: "Links internos / relacionados pensados",
          type: "boolean",
          initialValue: false,
        }),
        defineField({
          name: "reviewedOk",
          title: "Releitura completa feita",
          type: "boolean",
          initialValue: false,
        }),
      ],
      validation: (rule) =>
        rule.custom((value) => {
          if (!value || typeof value !== "object") {
            return "Complete o checklist antes de publicar.";
          }
          const required = [
            "titleOk",
            "excerptOk",
            "slugOk",
            "coverAltOk",
            "refsOk",
            "internalLinksOk",
            "reviewedOk",
          ] as const;
          const missing = required.filter(
            (key) => !(value as Record<string, unknown>)[key],
          );
          if (missing.length) {
            return "Marque todos os itens do checklist antes de Publish.";
          }
          return true;
        }),
    }),
    defineField({
      name: "status",
      title: "Status editorial",
      type: "string",
      group: "content",
      description:
        "Apenas organização no painel. A visibilidade no site depende do botão Publish.",
      options: {
        list: [
          { title: "Rascunho", value: "draft" },
          { title: "Publicado", value: "published" },
        ],
        layout: "radio",
      },
      initialValue: "published",
    }),
  ],
  orderings: [
    {
      title: "Data de publicação (recente)",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "coverImage",
      status: "status",
    },
    prepare({ title, author, media, status }) {
      return {
        title,
        subtitle: `${status === "published" ? "Publicado" : "Rascunho"}${author ? ` · ${author}` : ""}`,
        media,
      };
    },
  },
});
