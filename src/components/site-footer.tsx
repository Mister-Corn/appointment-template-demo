import Link from "next/link"
import { fetchPageData } from "@/sanity/lib/fetchers"
import { capitalize } from "lodash"

import { Icons } from "./icons"
import { buttonVariants } from "./ui/button"

export async function SiteFooter() {
  const { siteInfo, externalLinks } = await fetchPageData()

  if (!siteInfo || !externalLinks) {
    return null
  }

  const { clientName, siteDescription } = siteInfo
  const links = [
    { platform: "instagram", link: externalLinks.instagramLink },
    { platform: "facebook", link: externalLinks.facebookLink },
    { platform: "tiktok", link: externalLinks.tiktokLink },
  ] as Array<{
    platform: "instagram" | "facebook" | "tiktok"
    link: string | undefined
  }>

  return (
    <footer className="bg-footer px-6 py-8 text-footer-foreground">
      <div className="container flex flex-col gap-8 md:flex-row md:justify-between">
        {/* Name, description, copyright notice */}
        <div className="[&>*]:mb-[0.25em]">
          <h2 className="headings">{clientName}</h2>
          <p>{siteDescription}</p>
          <p>
            <Icons.copyright className="-mt-1 mb-0 inline h-4 w-4" /> 2023{" "}
            {clientName}, All rights reserved
          </p>
        </div>

        {/* Contact & social media links */}
        <div className="flex flex-col md:items-end [&>*]:mb-[0.25em]">
          <h2 className="headings">Connect with me</h2>
          {/* TODO: Add email/contact link */}
          <nav className="flex gap-2">
            {links.map(({ platform, link }) => {
              if (!link) {
                return null
              }

              const Icon = Icons[platform]
              return (
                <Link
                  key={platform}
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div
                    className={buttonVariants({
                      size: "sm",
                      variant: "ghost",
                    })}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="sr-only">{capitalize(platform)}</span>
                  </div>
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </footer>
  )
}
