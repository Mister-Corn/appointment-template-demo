/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs")

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  /**
   * If you have `experimental: { appDir: true }` set, then you must comment the below `i18n` config
   * out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   *
   * Ron's note: As of next@^13.4, the `appDir` feature is stable. Uncertains if i18n setting still
   * conflict, so commenting it out.
   */
  // i18n: {
  //   locales: ["en"],
  //   defaultLocale: "en",
  // },
  images: {
    // External domains NextJS Image component is allowed to retrieve images from
    domains: ["cdn.sanity.io"],
  },
}
export default config
