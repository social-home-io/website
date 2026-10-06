import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Public origin — used by Astro for canonical URLs, sitemap, OG tags.
const SITE = "https://social-home.io";

// Locales we ship. English is the reference (``src/content/en/``,
// ``src/i18n/en.ts``); the others are hand-maintained translations
// updated alongside it. Every route exists in every locale (see
// ``src/pages/[lang]/``); a page missing from a locale's collection
// renders the English body at the localized URL. Keep this list in
// sync with ``LOCALES`` in ``src/i18n/index.ts``.
const LOCALES = ["en", "de", "nl", "fr"];

export default defineConfig({
  site: SITE,
  trailingSlash: "always",
  build: { format: "directory" },
  i18n: {
    defaultLocale: "en",
    locales: [...LOCALES],
    routing: { prefixDefaultLocale: false },
    // No ``fallback`` here: ``src/pages/[lang]/`` renders every route
    // for every locale itself (missing translations show the English
    // body), and Astro's fallback redirects would overwrite those
    // pages for static routes such as ``/de/blog/``.
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: { en: "en-US", de: "de-DE", nl: "nl-NL", fr: "fr-FR" },
      },
    }),
  ],
});
