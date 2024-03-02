import { type SchemaTypeDefinition } from "sanity"

import { type BaseSanityResponse } from "@/types/sanityCMS"
import { siteConfig } from "@/config/site"

export type SiteInfoSanityRes = BaseSanityResponse & {
  clientName: string
  siteTitle: string
  siteDescription: string
}

const sanitySchemaSiteInfo = {
  name: "generalSiteInfo",
  title: "Site Information",
  description:
    "Information used throughout the whole site, such as your name, and SEO (Search Engine Optimization)",
  type: "document",
  fields: [
    {
      name: "clientName",
      title: "Your name",
      description: "Your name to be displayed throughout the site.",
      type: "string",
      initialValue: siteConfig.name,
      validation: (Rule) => Rule.required().min(1).max(160),
    },
    {
      name: "siteTitle",
      title: "Title of website",
      description:
        "Title of your website, which will be shown in tab headers and in search engines.",
      type: "string",
      initialValue: siteConfig.name,
      validation: (Rule) => Rule.required().min(1).max(160),
    },
    {
      name: "siteDescription",
      title: "Site Description",
      description:
        "Your website description for Search Engine Optimization (SEO) purposes.",
      type: "string",
      initialValue: siteConfig.description,
      validation: (Rule) => Rule.required().min(1).max(160),
    },
  ],
} satisfies SchemaTypeDefinition

export default sanitySchemaSiteInfo
