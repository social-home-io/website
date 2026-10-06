# CLAUDE.md — website

Instruction file for Claude Code. Read before editing.

## What this is

Static marketing + docs site for Social Home, hosted on GitHub
Pages at `https://social-home.io`. Spec: §9 of `spec_work.md`
in the meta-repo.

## Hard rules

- **English-only authoring.** All copy lives in
  `src/content/en/`. Other locales are meant to be written by a
  CI translator (`scripts/azure-translate.js`, §30.8.2 — planned,
  not in this repo yet); never commit hand edits to non-English
  content files.
- **Voice: warm but technical.** Like the Home Assistant docs.
  Concrete examples beat abstract claims; "your household"
  beats "the home of the future".
- **Two readers, one page.** See the section below. Plain
  language first; technical detail only inside an
  "Under the hood" block.
- **The site sells _both_ dimensions.** Social Home is a
  household OS _and_ a federated social network. The landing
  page must make the dual nature obvious — never frame this as
  "yet another open-source social app". The hero pairs a
  household-OS collage (`FamilyWall`) with a federation collage
  (`SpaceWall`) for exactly this reason.
- **Say only what the code does.** Every factual claim must be
  backed by `social-home-io/socialhome` (its `docs/principles.md`
  and `docs/crypto.md` are the reference for security wording).
  No "end-to-end" (say "encrypted home to home"), no "military-grade", "zero-knowledge"
  or "quantum-safe". Residuals are stated plainly, not hidden.
- **Design system = `src/styles/tokens.css`.** Never hardcode
  colours / sizes / motion durations in components. New tokens
  go into `tokens.css` first, then get used. `--moss` is the
  trust / privacy colour; `--hearth` is for primary actions.
- **Type stack: Fraunces (display) + Manrope (body) + JetBrains
  Mono (technical).** Never replace these with Inter / Space
  Grotesk / Roboto. The fonts are self-hosted under
  `public/fonts/` — never load them from a CDN.
- **No analytics, no third-party JS, no third-party requests, no
  auth.** The site is static; the only outbound link of
  consequence is the add-on install redirect on
  `my.home-assistant.io`.
- **No hand-maintained changelog.** Releases live on GitHub
  Releases; blog posts name the release they shipped in.

## Two readers, one page

The app itself moved to plain wording for everyday users (for
example "GFS link / Local link", "Connections", on/off switches
that say what changes). The site does the same, so a parent and
a protocol nerd can read the same page.

1. **Plain first.** The first paragraph of every page, section
   and card is readable by someone who has never heard of a
   relay or a key. Lead with what it means for the household.
2. **Detail in a skippable layer.** Technical content — algorithm
   names, field names, API routes, limits, spec references — goes
   only into a collapsible block at the end of its section, always
   with the same summary line:

   ```html
   <details class="tech">
     <summary>Under the hood</summary>

     …markdown or HTML…
   </details>
   ```

   The block is styled once in `src/layouts/Docs.astro` and
   `src/layouts/BlogPost.astro` (moss edge, mono summary). The
   plain text outside it must still make sense on its own.

3. **Landing page:** claims and bodies stay plain. Technical terms
   appear only as small mono chips under a card (e.g.
   `AES-256-GCM · Ed25519`), never in the sentence.
4. **Same words as the app.** Use the vocabulary of the app's UI
   strings (`client/src/i18n/locales/en.json` in the core repo):

   | Say                                      | Not                   |
   | ---------------------------------------- | --------------------- |
   | household / your home                    | instance, HFS, node   |
   | your home (what sends, stores, pairs)    | Home Assistant, HA    |
   | space                                    | room, group, channel  |
   | pair / paired households                 | federate with, peer   |
   | Connections (the settings page)          | Federation settings   |
   | GFS (Global Federation Server), then GFS | relay server, GS, hub |
   | GFS link / Local link                    | relay link / internal |
   | Follower                                 | subscriber            |
   | Social Home (Early) add-on               | dev / beta add-on     |
   | sealed, encrypted home to home           | end-to-end encrypted  |

   First use of "GFS" on a page gets the short gloss and a link
   to `/docs/glossary/#gfs`.

   **Home, not Home Assistant.** The unit that sends, receives,
   stores and pairs is "your home" / "your household". Home
   Assistant is named only as the way to install Social Home: the
   "Add to Home Assistant" CTA, the install banner, Getting
   started, the add-on's backup and account sentences. Never
   "sealed from your Home Assistant to theirs"; always "sealed
   from your home to theirs".

5. **Checklist for a new page:** plain first paragraph · every
   term glossed or linked to `/docs/glossary/` · technical detail
   only inside `details.tech` · chips, not jargon, on the landing
   page · facts checked against the core repo.

## Adding a doc page

1. Create `src/content/en/docs/<slug>.md` with the standard
   frontmatter (`title`, `description`, `order`).
2. The sidebar in `src/layouts/Docs.astro` is built from the
   `docs/*` collection automatically, sorted by `order` — there is
   no nav file to edit. Add a one-line entry to
   `src/content/en/docs.md` if the page should appear on the docs
   landing.
3. The page renders via the dynamic `[...slug].astro` route — no
   per-page Astro file needed.

## Brand cues

- Name: **Social Home** (two words, capital S, capital H).
- Tagline: _"The social home for your household."_
- Logo: see `LogoMark.astro`. Inline SVG; never bake the wordmark
  into a raster.
- Accent: terracotta (`--hearth`) for primary, hearth-green
  (`--moss`) for privacy / trust messaging.
