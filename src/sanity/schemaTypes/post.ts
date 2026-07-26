import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Data de publicação",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "author",
      title: "Autor",
      type: "reference",
      to: [{ type: "author" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Categoria",
      type: "reference",
      to: [{ type: "category" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "reference", to: [{ type: "tag" }] }],
    }),
    defineField({
      name: "coverImage",
      title: "Imagem de capa",
      type: "image",
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
      rows: 3,
      validation: (rule) => rule.required().max(280),
    }),
    defineField({
      name: "body",
      title: "Corpo do texto",
      type: "blockContent",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status editorial",
      type: "string",
      description:
        "Apenas organização no painel. O que controla a visibilidade no site é o botão Publish (Publicar) do Studio.",
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
