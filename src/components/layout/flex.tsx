import { type ReactNode } from "react"

import { cn } from "@/lib/utils"

export type FlexProps = {
  children: ReactNode
  className?: string
  /**
   * @default true
   */
  centered?: boolean
}
function Flex({ children, className, centered }: FlexProps) {
  return (
    <div
      className={cn(
        "flex",
        centered ? "items-center justify-center" : "",
        className
      )}
    >
      {children}
    </div>
  )
}

export { Flex }
