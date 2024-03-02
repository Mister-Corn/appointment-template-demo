import Image from "next/image"
import { fetchPageData } from "@/sanity/lib/fetchers"
import { urlForImage } from "@/sanity/lib/image"
import { PortableText } from "@portabletext/react"
import type { Image as SanityImage } from "sanity"

import { cn } from "@/lib/utils"

export default async function AboutMe() {
  const { sectionAboutMe } = await fetchPageData()

  if (!sectionAboutMe) {
    console.error("No About Me data found from CMS")
    return null
  }

  const { pageTitle, pageContent, aboutMePicture } = sectionAboutMe

  return (
    <section id="section--about-me" className="section-p">
      <div className="mx-auto flex flex-col items-center gap-6">
        <h2 className="headings">{pageTitle}</h2>

        <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
          <AboutMePicture imgSrc={aboutMePicture} className="shrink-0" />

          <div className="prose prose-stone text-center md:text-left">
            <PortableText value={pageContent ?? []} />
          </div>
        </div>
      </div>
    </section>
  )
}

function AboutMePicture({
  imgSrc,
  className,
}: {
  imgSrc: SanityImage
  className?: string
}) {
  // Reference: https://github.com/sanity-io/nextjs-blog-cms-sanity-v3/blob/main/components/AuthorAvatar.tsx
  return imgSrc.asset?._ref ? (
    <div className={cn("relative h-48 w-48 lg:h-64 lg:w-64", className)}>
      <Image
        src={urlForImage(imgSrc).height(256).width(256).fit("crop").url()}
        sizes="256px"
        fill
        className="rounded-full"
        alt=""
      />
    </div>
  ) : (
    <div className="h-32 w-32 rounded-full bg-slate-300"></div>
  )
}
