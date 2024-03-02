import { type SchemaTypeDefinition } from "sanity"

import { type BaseSanityResponse } from "@/types/sanityCMS"

export type ExternalLinksSanityRes = BaseSanityResponse & {
  instagramLink?: string
  facebookLink?: string
  tiktokLink?: string
}

const sanitySchemaExternalLinks = {
  name: "generalExternalLinks",
  title: "Social media & Other links",
  description: "Set up links to your social media and other external sites",
  type: "document",
  fields: [
    {
      name: "instagramLink",
      title: "Instagram",
      type: "url",
      validation: (Rule) => Rule.optional(),
    },
    {
      name: "facebookLink",
      title: "Facebook",
      type: "url",
      validation: (Rule) => Rule.optional(),
    },
    {
      name: "tiktokLink",
      title: "Tik Tok",
      type: "url",
      validation: (Rule) => Rule.optional(),
    },
  ],
} satisfies SchemaTypeDefinition

export default sanitySchemaExternalLinks
