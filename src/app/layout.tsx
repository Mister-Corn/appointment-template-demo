import "@/styles/globals.css"

import { type Metadata } from "next"
import { fetchPageData } from "@/sanity/lib/fetchers"

import { siteConfig } from "@/config/site"
import { fontPrimary, fontSecondary } from "@/lib/fonts"
import ReactQueryProvider from "@/lib/react-query"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toast/toaster"
import { CalendlyPopUpModal } from "@/components/button-calendly"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

import { AppStateProvider } from "./(state)/reducer"

export const generateMetadata = async (): Promise<Metadata> => {
  const { siteInfo } = await fetchPageData()

  if (!siteInfo) {
    console.error("No site info found from CMS")
  }

  const { siteTitle, siteDescription } = siteInfo ?? {
    siteTitle: siteConfig.name,
    siteDescription: siteConfig.description,
  }

  const metadata: Metadata = {
    title: {
      default: siteTitle,
      template: `%s - ${siteTitle}`,
    },
    description: siteDescription,
    themeColor: "white",
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-16x16.png",
    },
    robots: { index: false, follow: false },
  }

  return metadata
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background",
            "font-secondary text-stone-700 antialiased", // Font styling
            fontPrimary.variable,
            fontSecondary.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <AppStateProvider>
              <ReactQueryProvider>
                <div className="relative flex min-h-screen flex-col">
                  {/* @ts-expect-error Async Server Component */}
                  <SiteHeader />
                  <div className="flex-1">{children}</div>
                </div>
                {/* @ts-expect-error Async Server Component */}
                <SiteFooter />
                <TailwindIndicator />
                <Toaster />
                <CalendlyPopUpModal />
              </ReactQueryProvider>
            </AppStateProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
