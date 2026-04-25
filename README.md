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

All copywriting lives under `src/content/en/`. The non-English
locale folders (`src/content/de/`, `src/content/nl/`,
`src/content/fr/`, …) are **machine-generated** by
`scripts/azure-translate.js` on every CI run — never hand-edit
them. The translator skips files whose source hash is unchanged
(see `.i18n-hash.json`).

## Layout

```
website/
├── astro.config.mjs           # i18n routing, custom domain
├── public/
│   ├── CNAME                  # required for GitHub Pages
│   └── robots.txt
├── src/
│   ├── components/            # Reusable .astro components
│   │   ├── HeroSection.astro
│   │   ├── FamilyWall.astro   # Hero collage
│   │   ├── SpaceWall.astro    # Federation collage
│   │   ├── FeatureGrid.astro
│   │   └── …
│   ├── content/
│   │   └── en/
│   │       ├── index.md       # Landing-page copy
│   │       ├── docs/          # User-facing documentation
│   │       └── changelog.md
│   ├── layouts/
│   │   ├── Base.astro
│   │   └── Docs.astro
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
