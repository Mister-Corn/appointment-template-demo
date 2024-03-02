import {
  JetBrains_Mono as FontMono,
  Quattrocento as FontPrimary,
  Inter as FontSans,
  Quattrocento_Sans as FontSecondary,
} from "next/font/google"

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const fontPrimary = FontPrimary({
  subsets: ["latin"],
  variable: "--font-primary",
  weight: ["400", "700"],
})

export const fontSecondary = FontSecondary({
  subsets: ["latin"],
  variable: "--font-secondary",
  weight: ["400", "700"],
})
