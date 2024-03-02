/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
const config = {
  semi: false,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "es5",
  importOrder: [
    "^(react/(.*)$)|^(react$)",
    "^(next/(.*)$)|^(next$)",
    "<THIRD_PARTY_MODULES>",
    "",
    "^types$",
    "^@/types/(.*)$",
    "^@/config/(.*)$",
    "^@/lib/(.*)$",
    "^@/hooks/(.*)$",
    "^@/components/ui/(.*)$",
    "^@/components/(.*)$",
    "^@/styles/(.*)$",
    "^@/app/(.*)$",
    "^@/pages/(.*)$",
    "",
    "^~/(.*)$",
    "",
    "^[./]",
  ],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  plugins: [require.resolve("@ianvs/prettier-plugin-sort-imports")],
}

module.exports = config
