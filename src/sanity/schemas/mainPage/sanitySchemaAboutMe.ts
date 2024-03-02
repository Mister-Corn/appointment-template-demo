import type { Image as SanityImage } from "sanity"
import { type PortableTextBlock, type SchemaTypeDefinition } from "sanity"

import { type BaseSanityResponse } from "@/types/sanityCMS"

export type SectionAboutMeSanityResponse = BaseSanityResponse & {
  pageTitle: string
  pageContent: PortableTextBlock[]
  aboutMePicture: SanityImage
}

const sanitySchemaAboutMe = {
  name: "sectionAboutMe",
  title: "Section - About me",
  description:
    "Title and content for the 'About Me' section in your main page.",
  type: "document",
  fields: [
    {
      name: "pageTitle",
      title: "'About Me' Section Title",
      description: "(32ch) Title of your 'About Me' section",
      type: "string",
      initialValue: "About me",
      validation: (Rule) => Rule.required().min(1).max(32),
    },
    {
      name: "pageContent",
      title: "'About Me' Section Content",
      description: "Content displayed in your 'About Me' section",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: "aboutMePicture",
      title: "Image of yourself",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    },
  ],
} satisfies SchemaTypeDefinition

export default sanitySchemaAboutMe
