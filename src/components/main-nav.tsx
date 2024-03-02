import Link from "next/link"
import { fetchPageData } from "@/sanity/lib/fetchers"

import { type NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

import { buttonVariants } from "./ui/button"

interface MainNavProps {
  items?: NavItem[]
}

export async function MainNav({ items }: MainNavProps) {
  const { siteInfo } = await fetchPageData()

  if (!siteInfo) {
    console.error("No site info found from CMS")
  }

  const { siteTitle } = siteInfo ?? { siteTitle: siteConfig.name }

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        {/* TODO: Add an optional icon field in the CMS schema */}
        <span className="inline-block font-bold">{siteTitle}</span>
      </Link>

      {items?.length ? (
        <nav className="hidden gap-6 md:flex">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "text-muted-foreground",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
      ) : null}
    </div>
  )
}
