import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Conteúdo")
    .items([
      S.listItem()
        .title("Posts")
        .schemaType("post")
        .child(S.documentTypeList("post").title("Posts")),
      S.divider(),
      S.listItem()
        .title("Categorias")
        .schemaType("category")
        .child(S.documentTypeList("category").title("Categorias")),
      S.listItem()
        .title("Tags")
        .schemaType("tag")
        .child(S.documentTypeList("tag").title("Tags")),
      S.listItem()
        .title("Autores")
        .schemaType("author")
        .child(S.documentTypeList("author").title("Autores")),
    ]);
