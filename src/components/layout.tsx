import { SiteHeader } from "@/components/site-header"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      {/* @ts-expect-error Async Server Component */}
      <SiteHeader />
      <main>{children}</main>
    </>
  )
}
