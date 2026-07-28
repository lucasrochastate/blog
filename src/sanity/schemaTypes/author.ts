import { defineField, defineType } from "sanity";

export const author = defineType({
  name: "author",
  title: "Autor",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nome",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Papel",
      type: "string",
      description: "Ex.: Autor, Editor",
    }),
    defineField({
      name: "bio",
      title: "Biografia",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "context",
      title: "Contexto / tradição",
      type: "string",
      description: "Ex.: tradição evangélica · leitura pausada",
    }),
    defineField({
      name: "email",
      title: "E-mail de contato",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Foto",
      type: "image",
      options: { hotspot: true },
    }),
  ],
});
