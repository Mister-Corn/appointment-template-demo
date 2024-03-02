import { type SchemaTypeDefinition } from "sanity"

import sanitySchemaExternalLinks from "./sanitySchemaExternalLinks"
import sanitySchemaSiteInfo from "./sanitySchemaSiteInfo"

const sanitySchemasGeneral = [
  sanitySchemaSiteInfo,
  sanitySchemaExternalLinks,
] satisfies SchemaTypeDefinition[]

export default sanitySchemasGeneral
