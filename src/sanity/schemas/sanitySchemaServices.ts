import {
  type PortableTextBlock,
  type Image as SanityImage,
  type SchemaTypeDefinition,
} from "sanity"

import { type BaseSanityResponse } from "@/types/sanityCMS"

export type ServicesSanityResponse = BaseSanityResponse & {
  serviceTitle: string
  image: SanityImage
  description: PortableTextBlock[]
  calendlyLink: string
}

const sanitySchemaServices = {
  name: "services",
  title: "Services You Offer",
  type: "document",
  fields: [
    {
      name: "serviceTitle",
      title: "Service Title",
      type: "string",
      validation: (Rule) => Rule.required().min(1).max(100),
    },
    {
      name: "image",
      title: "Image of Service",
      description: "An image that will show in the service card on your page.",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Service Description",
      description:
        "Description of your service that will appear in the service card on your page.",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: "calendlyLink",
      title: "Calendly Link",
      description:
        "The link on Calendly that prospective clients will use to book an appointment. Note: using a proper Calendly link will enable a more seamless booking experience in your page!",
      type: "string",
      validation: (Rule) => Rule.required().min(1).max(100),
    },
  ],
} satisfies SchemaTypeDefinition

export default sanitySchemaServices
