# Social Home — website

Marketing site + user documentation for [Social
Home](https://social-home.io). Built with [Astro 4](https://astro.build),
deployed to GitHub Pages with the custom domain
`social-home.io`.

## Develop

```sh
pnpm install     # or npm install / yarn install
pnpm dev         # http://localhost:4321
pnpm build       # static site → ./dist/
pnpm check       # astro type-check
pnpm check:links # internal links + anchors in ./dist, all locales
```

## Content

English is the reference: every page is written under
`src/content/en/` (markdown) and `src/i18n/en.ts` (UI strings)
first, then translated by hand into German, Dutch and French
(`src/content/{de,nl,fr}/`, `src/i18n/{de,nl,fr}.ts`). A change
to an English page is carried into all three translations in the
same PR; translations are never edited on their own. A page
missing from a locale falls back to the English body at the
localized URL so the build never breaks.

`npm run check:links` verifies every internal link and anchor in
the built site, across all four languages.

Writing rules (voice, the "two readers, one page" pattern, the
vocabulary table, the translation workflow) are in `CLAUDE.md`.

## Layout

```
website/
├── astro.config.mjs           # i18n routing, custom domain
├── public/
│   ├── CNAME                  # required for GitHub Pages
│   ├── blog/                  # Blog screenshots
│   ├── fonts/                 # Self-hosted Fraunces / Manrope / JetBrains Mono
│   └── robots.txt
├── src/
│   ├── components/            # Reusable .astro components
│   │   ├── HeroSection.astro
│   │   ├── FamilyWall.astro   # Hero collage
│   │   ├── SpaceWall.astro    # Federation collage
│   │   ├── FeatureGrid.astro
│   │   ├── TrustBand.astro    # "Private by construction" band
│   │   └── …
│   ├── content/
│   │   ├── en/                # Reference copy (English)
│   │   │   ├── docs.md        # Docs landing
│   │   │   ├── docs/          # User-facing documentation
│   │   │   │   ├── security.md
│   │   │   │   ├── glossary.md
│   │   │   │   └── …
│   │   │   └── blog/          # Posts, one per release feature
│   │   ├── de/                # Translations, same tree as en/
│   │   ├── nl/
│   │   └── fr/
│   ├── i18n/
│   │   ├── en.ts              # UI strings (reference)
│   │   ├── de.ts, nl.ts, fr.ts
│   │   ├── types.ts           # UiStrings shape
│   │   ├── index.ts           # locale helpers (t, localePath …)
│   │   └── content.ts         # collections with en fallback
│   ├── layouts/
│   │   ├── Base.astro
│   │   ├── Docs.astro
│   │   └── BlogPost.astro
│   ├── pages/                 # Astro file-based routing
│   │   ├── index.astro …      # English routes (no prefix)
│   │   └── [lang]/            # /de/, /nl/, /fr/ twins
│   ├── styles/
│   │   ├── tokens.css         # Design tokens
│   │   └── base.css
│   └── types.ts
└── .github/workflows/deploy.yml
```

## Deploy

Pushing to `main` triggers `deploy.yml`, which builds the static
site and publishes it to GitHub Pages via
`actions/deploy-pages`. The `CNAME` file in `public/` keeps the
custom domain wired up.

## License

[Mozilla Public License 2.0](LICENSE).
