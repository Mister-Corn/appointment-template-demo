import { type PortableTextBlock, type SchemaTypeDefinition } from "sanity"

import { type BaseSanityResponse } from "@/types/sanityCMS"

export type TestimonialSanityResponse = BaseSanityResponse & {
  endorser: string
  location: string
  highlight: string
  testimonial: PortableTextBlock[]
}

const sanitySchemaTestimonials = {
  name: "testimonials",
  title: "Testimonials & Endorsements",
  type: "document",
  fields: [
    {
      name: "endorser",
      title: "Endorser’s name",
      type: "string",
      validation: (Rule) => Rule.required().min(1).max(100),
    },
    {
      name: "location",
      title: "Endorser’s location",
      type: "string",
      validation: (Rule) => Rule.required().min(1).max(100),
    },
    {
      name: "highlight",
      title: "Testimonial highlight",
      type: "string",
      validation: (Rule) => Rule.required().min(1).max(160),
    },
    {
      name: "testimonial",
      title: "Endorser’s full testimonial",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required().min(1).max(1000),
    },
  ],
} satisfies SchemaTypeDefinition

export default sanitySchemaTestimonials
