import { groq } from "next-sanity"

import { type ExternalLinksSanityRes } from "../schemas/general/sanitySchemaExternalLinks"
import { type SiteInfoSanityRes } from "../schemas/general/sanitySchemaSiteInfo"
import { type SectionAboutMeSanityResponse } from "../schemas/mainPage/sanitySchemaAboutMe"
import { type SectionCtaSanityResponse } from "../schemas/mainPage/sanitySchemaCta"
import { type SectionEmailSignupSanityResponse } from "../schemas/mainPage/sanitySchemaEmailSignUp"
import { type ServicesSanityResponse } from "../schemas/sanitySchemaServices"
import { type TestimonialSanityResponse } from "../schemas/sanitySchemaTestimonials"
import { sanityClient } from "./client"

type Nullable<T> = T | null | undefined

export async function fetchPageData() {
  const groqQuery = groq`{
        "toggleSearchEngineVisibility": *[_type == "generalTogglePublic"][0].searchEngineVisibilityToggle,
        "siteInfo": *[_type == "generalSiteInfo"][0],
        "externalLinks": *[_type == "generalExternalLinks"][0],
        "sectionAboutMe": *[_type == "sectionAboutMe"][0],
        "sectionEmailSignUp": *[_type == "sectionEmailSignUp"][0],
        "services": *[_type == "services"],
        "sectionCta": *[_type == "sectionCta"][0],
        "testimonials": *[_type == "testimonials"],
      }`

  return sanityClient
    .fetch<{
      toggleSearchEngineVisibility: Nullable<boolean>
      siteInfo: Nullable<SiteInfoSanityRes>
      externalLinks: Nullable<ExternalLinksSanityRes>
      sectionAboutMe: Nullable<SectionAboutMeSanityResponse>
      sectionEmailSignUp: Nullable<SectionEmailSignupSanityResponse>
      sectionCta: Nullable<SectionCtaSanityResponse>
      services: Nullable<ServicesSanityResponse[]>
      testimonials: Nullable<TestimonialSanityResponse[]>
    }>(groqQuery)
    .catch((err) => {
      console.error(err)
      return {
        toggleSearchEngineVisibility: false,
        siteInfo: null,
        externalLinks: null,
        sectionAboutMe: null,
        sectionEmailSignUp: null,
        sectionCta: null,
        services: [] as ServicesSanityResponse[],
        testimonials: [] as TestimonialSanityResponse[],
      }
    })
}
