export type SiteConfig = typeof siteConfig

const CALENDLY_BASE_URL = "https://calendly.com/dev-ronaldlibago"

export const siteConfig = {
  name: "Raymond Lebagel",
  description: "Life coach. Mindfulness. Healing.",
  mainNav: [],
  links: {
    elsc: "https://www.ronaldlibago.dev",
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
    // Socials
    facebook: "https://www.facebook.com",
    instagram: "https://www.instagram.com",
    // Calendly
    calendly: {
      default: CALENDLY_BASE_URL,
      coaching: `${CALENDLY_BASE_URL}/coaching-60min`,
      meditation: `${CALENDLY_BASE_URL}/meditation-30min`,
    },
  },
}
