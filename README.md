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
```

## Content

All copywriting lives under `src/content/en/`. Non-English
locales are planned to be **machine-generated** by a CI
translator (`scripts/azure-translate.js`, not in this repo yet);
until then every other locale falls back to English. Never
hand-edit generated locale files.

Writing rules (voice, the "two readers, one page" pattern, the
vocabulary table) are in `CLAUDE.md`.

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
│   │   └── en/
│   │       ├── docs.md        # Docs landing
│   │       ├── docs/          # User-facing documentation
│   │       │   ├── security.md
│   │       │   ├── glossary.md
│   │       │   └── …
│   │       └── blog/          # Posts, one per release feature
│   ├── layouts/
│   │   ├── Base.astro
│   │   ├── Docs.astro
│   │   └── BlogPost.astro
│   ├── pages/                 # Astro file-based routing
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
