import Link from "next/link"
import { fetchPageData } from "@/sanity/lib/fetchers"
import capitalize from "lodash/capitalize"
import { type LucideIcon } from "lucide-react"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"

import { CalendlyButton } from "./button-calendly"
import { ContactUsModal } from "./contact-modal"

type SocialPlatforms = "instagram" | "facebook" | "tiktok"

const iconPlatformHash: Record<SocialPlatforms, LucideIcon> = {
  instagram: Icons.instagram,
  facebook: Icons.facebook,
  tiktok: Icons.tiktok,
}

export async function SiteHeader() {
  const { externalLinks } = await fetchPageData()

  if (!externalLinks) {
    console.error("No external links found from CMS")
  }

  const { instagramLink, facebookLink, tiktokLink } = externalLinks ?? {}

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        {/* @ts-expect-error Async Server Component */}
        <MainNav items={siteConfig.mainNav} />

        <div className="flex flex-1 items-center justify-end space-x-4">
          {/* Book appointment link */}
          <CalendlyButton
            url={siteConfig.links.calendly.default}
            variant="ghost"
          >
            Book appointment
          </CalendlyButton>

          {/* Social Media Links */}
          <nav className="hidden items-center space-x-1 sm:flex">
            {(
              [
                { platform: "instagram", link: instagramLink },
                { platform: "facebook", link: facebookLink },
                { platform: "tiktok", link: tiktokLink },
              ] as Array<{ platform: SocialPlatforms; link: string }>
            ).map(({ platform, link }) => {
              if (!link) return null

              const Icon = iconPlatformHash[platform]

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

            <ContactUsModal>
              <button
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                })}
              >
                <Icons.mail className="h-5 w-5" />
                <span className="sr-only">Contact me</span>
              </button>
            </ContactUsModal>
          </nav>
        </div>
      </div>
    </header>
  )
}
