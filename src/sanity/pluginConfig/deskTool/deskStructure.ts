import sanitySchemasGeneral from "@/sanity/schemas/general"
import sanitySchemasMainPage from "@/sanity/schemas/mainPage"
import { type ListItemBuilder, type StructureResolver } from "sanity/desk"

const singletonSchemas = [...sanitySchemasMainPage, ...sanitySchemasGeneral]
const singletonDocumentIDs = new Set(singletonSchemas.map(({ name }) => name))

export const deskStructure: StructureResolver = (S) => {
  const ignoreSingletonItems = (listItem: ListItemBuilder) =>
    !singletonDocumentIDs.has(listItem.getId() ?? "")

  return S.list()
    .title("Your Site")
    .items([
      // Main page
      S.listItem()
        .title("Main Page")
        .child(
          S.list()
            .title("Main Page Sections")
            .items(
              sanitySchemasMainPage.map(({ title, name: schemaTypeName }) =>
                S.listItem()
                  .title(title)
                  .child(
                    S.document()
                      .schemaType(schemaTypeName)
                      .documentId(schemaTypeName)
                  )
              )
            )
        ),
      // General Information
      S.listItem()
        .title("General Information")
        .child(
          S.list()
            .title("General Information Sections Sections")
            .items(
              sanitySchemasGeneral.map(({ title, name: schemaTypeName }) =>
                S.listItem()
                  .title(title)
                  .child(
                    S.document()
                      .schemaType(schemaTypeName)
                      .documentId(schemaTypeName)
                  )
              )
            )
        ),
      // All remaining items (All items - Singleton items)
      ...S.documentTypeListItems().filter(ignoreSingletonItems),
    ])
}
