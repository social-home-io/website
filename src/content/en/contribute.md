---
title: Contribute
description: Whether you write code, translate copy, design, or just tell other households about Social Home — here's how to help.
order: 95
---

Social Home is a small project run by a few volunteers. Every
nudge helps. There's no contributor license agreement to sign,
no commercial entity behind it, and no one trying to flip
contributions into a future paid plan.

## If you write code

The repos are small and well-documented:

- **Core server** —
  [`socialhome-io/socialhome`](https://github.com/social-home-io/socialhome).
  Python 3.14, aiohttp, SQLite, Preact frontend.
- **HA integration** —
  [`socialhome-io/ha-integration`](https://github.com/social-home-io/ha-integration).
  Custom integration; tests via
  `pytest-homeassistant-custom-component`.
- **Client library** —
  [`socialhome-io/socialhome-client`](https://github.com/social-home-io/socialhome-client).
  Pure async HTTP/WS client, no HA dependency.
- **HA add-on** —
  [`socialhome-io/ha-app`](https://github.com/social-home-io/ha-app).
  Two channels (stable + dev), bashio + tempio.
- **Website** — this repo at
  [`socialhome-io/website`](https://github.com/social-home-io/website).

Read the `CLAUDE.md` / `AGENTS.md` files at the root of each
repo before opening a PR — they explain the conventions
(CalVer, MPL 2.0, no inline imports, etc.) that keep the codebase
consistent.

## If you translate

Non-English copy on this site and in the apps is generated
automatically by Azure Translator on every CI run. The output
isn't perfect — if you read a locale natively and the wording
feels off, open a PR against the **English** source. We don't
accept hand edits to the translated files because the next CI
run would overwrite them.

If you'd like to take ownership of a locale (proofread + nudge
the source so it translates better), open an issue tagged
`i18n` and we'll add you as a maintainer for that language.

## If you design

Anything visual — illustrations, brand-mark refinements,
spot-illustration sets, social-card templates, the OG image — is
gold. Open a draft PR with the file (SVG preferred, MPL 2.0
licensed) and we'll iterate from there.

## If you run a household

The most useful thing you can do is **install it and tell us
what was confusing**. The first 100 households that try Social
Home shape the next year of work harder than any spec rewrite.

## What the project does _not_ need

- **Money.** No donation links, no Patreon, no Open Collective —
  the project is run by people who use it, not a company that
  has to keep itself fed. If hosting costs ever become a real
  problem, we'll say so loudly first.
- **"Can you add X?"** issues without a description of the
  problem you're solving. A use case beats a feature request.
- **Promises to contribute.** A working pull request, even a
  small one, is worth more than a roadmap.

## Closing

Social Home is for people who believe their family photos,
messages, and calendar shouldn't be someone else's product. If
that resonates with you, you're already part of it.
