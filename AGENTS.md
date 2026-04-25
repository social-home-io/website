# AGENTS.md — website

AI agent instruction file. Read before editing. Canonical spec:
`spec_work.md` §9 in the meta-repo.

### Architecture rules

- Astro 4+ static site, output `dist/`. No SSR, no client-side
  JS framework.
- Content collection lives at `src/content/{locale}/`. Only
  `en/` is authored by hand.
- Design tokens are the single source of truth — never hardcode
  values in component styles.

### Voice

- Warm, technical, concrete. Like Home Assistant's own docs.
- Lead with what changes for the reader's day, not protocol
  acronyms. Use "your household" / "your phone" / "your server".
- Never call this "the open-source social network". It is a
  household OS + a federated social fabric.

### File locations

- Components: `src/components/`
- Layouts: `src/layouts/`
- Content: `src/content/{locale}/`
- Styles: `src/styles/`
- Pages / routes: `src/pages/`
