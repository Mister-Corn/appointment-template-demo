import { fetchPageData } from "@/sanity/lib/fetchers"

import { siteConfig } from "@/config/site"
import { CalendlyButton } from "@/components/button-calendly"
import { SanityImage } from "@/components/sanity-image"

export default async function CallToAction() {
  const { sectionCta } = await fetchPageData()

  if (!sectionCta) {
    console.error("NO Call-to-Action data in CMS")
    return null
  }

  const { ctaTitle, ctaSubTitle, ctaBgImage } = sectionCta

  return (
    <section id="section--call-to-action" className="relative h-80">
      <SanityImage src={ctaBgImage} alt="" className="object-cover" sizes="" />

      <div className="container relative z-10 h-full w-full bg-transparent">
        <div className="mx-auto flex h-full w-[85%] flex-col items-center justify-center bg-secondary/60 px-12 text-center md:w-1/2">
          <h1 className="mb-[0.5em] font-primary text-3xl font-bold">
            {ctaTitle}
          </h1>

          <p className="text-lg">{ctaSubTitle}</p>

          <CalendlyButton
            url={siteConfig.links.calendly.default}
            variant="default"
            className="mt-8"
          >
            Book now
          </CalendlyButton>
        </div>
      </div>
    </section>
  )
}
