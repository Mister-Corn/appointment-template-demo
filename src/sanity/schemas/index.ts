import { type SchemaTypeDefinition } from "sanity"

import sanitySchemasGeneral from "./general"
import sanitySchemasMainPage from "./mainPage"
import sanitySchemaServices from "./sanitySchemaServices"
import sanitySchemaTestimonials from "./sanitySchemaTestimonials"

export const schemaTypes = [
  sanitySchemaServices,
  sanitySchemaTestimonials,
  // Main page schemas
  ...sanitySchemasMainPage,
  // General settings schemas
  ...sanitySchemasGeneral,
] satisfies SchemaTypeDefinition[]
