import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    POSTGRES_URL: z.string().url(),
    NODE_ENV: z.enum(["development", "test", "production"]),
    NEXTAUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string().min(1)
        : z.string().min(1).optional(),
    NEXTAUTH_URL: z.preprocess(
      // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
      // Since NextAuth.js automatically uses the VERCEL_URL if present.
      (str) => process.env.VERCEL_URL ?? str,
      // VERCEL_URL doesn't include `https` so it cant be validated as a URL
      process.env.VERCEL ? z.string().min(1) : z.string().url()
    ),
    // Email
    // - Email address the contact form will send to
    EMAIL_CONTACT: z.string().email(),
    // - Email address to set the "from" field. For SendGrid, it must be a
    // - a domain we control (e.g. we can't put the end user's email here).
    // - Defaults to EMAIL_CONTACT.
    EMAIL_FROM: z.string().email(),
    // SendGrid
    SENDGRID_API_KEY: z.string(),
    // Sanity CMS
    SANITY_WEBHOOK_SECRET: z.string(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // Sanity CMS
    NEXT_PUBLIC_SANITY_API_VERSION: z.string().optional(),
    NEXT_PUBLIC_SANITY_DATASET: z.string().min(1),
    NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    // --- SERVER / EDGE RUNTIME ---
    POSTGRES_URL: process.env.POSTGRES_URL,
    NODE_ENV: process.env.NODE_ENV,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    // Emails
    EMAIL_CONTACT: process.env.EMAIL_CONTACT,
    EMAIL_FROM: process.env.EMAIL_FROM ?? process.env.EMAIL_CONTACT,
    // SendGrid
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    // Sanity CMS
    SANITY_WEBHOOK_SECRET: process.env.SANITY_WEBHOOK_SECRET,

    // --- CLIENT ---
    // Sanity CMS
    NEXT_PUBLIC_SANITY_API_VERSION: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
   * This is especially useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
})
