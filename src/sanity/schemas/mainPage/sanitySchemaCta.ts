import { type Image as SanityImage, type SchemaTypeDefinition } from "sanity"

import { type BaseSanityResponse } from "@/types/sanityCMS"
import { siteConfig } from "@/config/site"

export type SectionCtaSanityResponse = BaseSanityResponse & {
  ctaTitle: string
  ctaSubTitle: string
  ctaBgImage: SanityImage
}

const sanitySchemaCta = {
  name: "sectionCta",
  title: "Section - Call To Action",
  type: "document",
  fields: [
    {
      name: "ctaTitle",
      title: "Call-to-Action Headline",
      description:
        "(160ch) Headline in the Call-To-Action section (the large banner near the top of the page).",
      type: "string",
      initialValue: siteConfig.name,
      validation: (Rule) => Rule.required().min(1).max(160),
    },
    {
      name: "ctaSubTitle",
      title: "Call-to-Action Subtitle",
      description:
        "(160ch) Short promotional text shown under the Call-to-Action headline.",
      type: "string",
      initialValue: siteConfig.description,
      validation: (Rule) => Rule.required().min(1).max(160),
    },
    {
      name: "ctaBgImage",
      title: "Background image for the Call-to-Action section.",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    },
  ],
} satisfies SchemaTypeDefinition

export default sanitySchemaCta
