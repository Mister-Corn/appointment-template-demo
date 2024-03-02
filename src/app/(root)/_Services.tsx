import { fetchPageData } from "@/sanity/lib/fetchers"
import { PortableText } from "@portabletext/react"

import { CalendlyButton } from "@/components/button-calendly"
import { SanityImage } from "@/components/sanity-image"

export default async function ServicesSection() {
  const { services } = await fetchPageData()

  if (!Array.isArray(services)) {
    console.error("No Services data found from CMS")
    return null
  }

  return (
    <section className="section-p bg-stone-200">
      <h2 className="headings mb-6 text-center">Services</h2>

      {services.map(({ serviceTitle, image, description, calendlyLink }) => {
        return (
          <div
            key={serviceTitle}
            className="grid place-items-center gap-4 rounded bg-white p-4 shadow md:mx-auto md:max-w-4xl md:auto-rows-min md:grid-cols-3 md:p-6"
          >
            <h3 className="text-lg font-bold md:col-span-3">{serviceTitle}</h3>
            <div className="relative aspect-video max-h-40 w-full md:aspect-square">
              <SanityImage src={image} alt="" className="object-cover" />
            </div>

            <div className="space-y-6 text-center md:col-span-2 md:text-left">
              <PortableText value={description} />
              <CalendlyButton url={calendlyLink}>Book now</CalendlyButton>
            </div>
          </div>
        )
      })}
    </section>
  )
}
