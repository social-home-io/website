# CLAUDE.md — website

Instruction file for Claude Code. Read before editing.

## What this is

Static marketing + docs site for Social Home, hosted on GitHub
Pages at `https://social-home.io`. Spec: §9 of `spec_work.md`
in the meta-repo.

## Hard rules

- **English-only authoring.** All copy lives in
  `src/content/en/`. The CI translator
  (`scripts/azure-translate.js`, §30.8.2) writes every other
  locale; never commit hand edits to non-English content files.
- **Voice: warm but technical.** Like the Home Assistant docs.
  Concrete examples beat abstract claims; "your household"
  beats "the home of the future".
- **The site sells _both_ dimensions.** Social Home is a
  household OS _and_ a federated social network. The landing
  page must make the dual nature obvious — never frame this as
  "yet another open-source social app". The hero pairs a
  household-OS collage (`FamilyWall`) with a federation collage
  (`SpaceWall`) for exactly this reason.
- **Design system = `src/styles/tokens.css`.** Never hardcode
  colours / sizes / motion durations in components. New tokens
  go into `tokens.css` first, then get used.
- **Type stack: Fraunces (display) + Manrope (body) + JetBrains
  Mono (technical).** Never replace these with Inter / Space
  Grotesk / Roboto.
- **No analytics, no third-party JS, no auth.** The site is
  static; the only outbound link of consequence is the HACS
  install URL on `my.home-assistant.io`.

## Adding a doc page

1. Create `src/content/en/docs/<slug>.md` with the standard
   frontmatter (`title`, `description`, `order`).
2. Add an entry to `src/components/DocsNav.astro` if it should
   appear in the sidebar.
3. The page renders via the dynamic `[...slug].astro` route — no
   per-page Astro file needed.

## Brand cues

- Name: **Social Home** (two words, capital S, capital H).
- Tagline: _"The social home for your household."_
- Logo: see `LogoMark.astro`. Inline SVG; never bake the wordmark
  into a raster.
- Accent: terracotta (`--hearth`) for primary, hearth-green
  (`--moss`) for privacy / trust messaging.
