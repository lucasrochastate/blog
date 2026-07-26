import { BookMarked } from "lucide-react";
import { defineArrayMember, defineType } from "sanity";

/**
 * Portable Text com formatação básica + bloco de citação bíblica (verseQuote).
 */
export const blockContent = defineType({
  name: "blockContent",
  title: "Conteúdo",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Título H2", value: "h2" },
        { title: "Título H3", value: "h3" },
        { title: "Citação", value: "blockquote" },
      ],
      lists: [
        { title: "Lista", value: "bullet" },
        { title: "Numerada", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Negrito", value: "strong" },
          { title: "Itálico", value: "em" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              {
                name: "href",
                type: "url",
                title: "URL",
                validation: (rule) =>
                  rule.uri({ allowRelative: true, scheme: ["http", "https", "mailto"] }),
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      name: "verseQuote",
      title: "Citação bíblica",
      type: "object",
      icon: BookMarked,
      fields: [
        {
          name: "text",
          title: "Texto do versículo",
          type: "text",
          rows: 3,
          validation: (rule) => rule.required(),
        },
        {
          name: "reference",
          title: "Referência",
          type: "string",
          description: "Ex.: João 3:16",
          validation: (rule) => rule.required(),
        },
        {
          name: "translation",
          title: "Tradução (opcional)",
          type: "string",
          description: "Ex.: ARA, NVI, ACF",
        },
      ],
      preview: {
        select: { title: "reference", subtitle: "text" },
      },
    }),
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Texto alternativo",
          validation: (rule) => rule.required(),
        },
      ],
    }),
  ],
});
