import { type PortableTextBlock, type SchemaTypeDefinition } from "sanity"

import { type BaseSanityResponse } from "@/types/sanityCMS"

export type SectionEmailSignupSanityResponse = BaseSanityResponse & {
  sectionTitle: string
  sectionParagraph?: PortableTextBlock[]
}

const sanitySchemaEmailSignUp = {
  name: "sectionEmailSignUp",
  title: "Section - Email List Subscribe",
  description: "Title and copy for the email subscription form section.",
  type: "document",
  fields: [
    {
      name: "sectionTitle",
      title: "Section Title",
      description: "Title of the email subscription section to be displayed.",
      type: "string",
      initialValue: "Subscribe to updates and promotions!",
      validation: (Rule) => Rule.required().min(1).max(160),
    },
    {
      name: "sectionParagraph",
      title: "Section Content",
      description:
        "Content to be shown under the title within the email subscription section.",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.optional(),
    },
  ],
} satisfies SchemaTypeDefinition

export default sanitySchemaEmailSignUp
