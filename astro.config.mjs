import { defineConfig } from "astro/config";

// Public origin — used by Astro for canonical URLs, sitemap, OG tags.
const SITE = "https://social-home.io";

// Locales we plan to ship. English is hand-authored under
// ``src/content/en/``; the others are populated by the Azure
// Translator CI (see scripts/azure-translate.js, §30.8.2). Until
// that lands, every non-en locale falls back to en so missing
// pages never 404.
const LOCALES = ["en", "de", "nl", "fr"];

export default defineConfig({
  site: SITE,
  trailingSlash: "always",
  build: { format: "directory" },
  i18n: {
    defaultLocale: "en",
    locales: [...LOCALES],
    routing: { prefixDefaultLocale: false },
    fallback: { de: "en", nl: "en", fr: "en" },
  },
});
