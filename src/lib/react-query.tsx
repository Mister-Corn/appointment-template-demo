"use client"

import { type ReactNode } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

/**
 * Enables use of react-query hooks within its children.
 *
 * NOTE: This is intended to be used within the "app" folder. TRPC is set up
 * for pages & routes in the "pages" folder.
 */
export default function ReactQueryProvider({
  children,
}: {
  children: ReactNode
}) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
