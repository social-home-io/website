---
title: Privacy model
description: What Social Home keeps, what travels, and what nobody — including us — can ever see.
order: 50
---

Social Home is built on a simple rule: **the household keeps
everything**. There is no cloud account, no analytics, no remote
logger, no growth team. The website you're reading right now is
static HTML served by GitHub Pages — no analytics, no cookies, no
third-party requests; even the fonts are served from the same
place.

This page lists every piece of data Social Home touches and
exactly where it goes. The [security model](/docs/security/)
page explains how the sealing works and what it can't do; the
words used here are in [Words we use](/docs/glossary/).

## What lives where

| Data                                          | Stored at home?      | Travels off your server?                                            |
| --------------------------------------------- | -------------------- | ------------------------------------------------------------------- |
| Messages, posts, photos                       | yes                  | only to households in the space, sealed                             |
| Direct messages                               | yes                  | sealed to the other household's server                              |
| Shopping list                                 | yes                  | only across your household devices                                  |
| Calendar events                               | yes                  | only to households sharing the calendar                             |
| Voice transcripts                             | yes (the text)       | same as posts                                                       |
| Avatars + display names                       | yes                  | yes — to paired households (it's how they recognise you)            |
| Public key (identity)                         | yes                  | yes — that's literally the point of pairing                         |
| External URL                                  | yes                  | yes — to paired households when it changes                          |
| Your Home Assistant account (email, password) | **never read**       | never                                                               |
| GPS / location history                        | **never** by default | only the current zone, only when you opt in; map pins rounded ~11 m |
| Logs                                          | stay on your server  | never                                                               |

## What the global relay sees

The GFS (Global Federation Server) — the relay that helps
households find each other — carries the posts of public and
global spaces as sealed envelopes. What it learns about you
depends on how the space is set up (see
[GFS](/docs/glossary/#gfs) in the glossary):

- **Trusted** (the default): which household posted into which
  listed space, and when.
- **Strict** (opt-in per space): only that _someone_ in the space
  posted. The sender is anonymous among the space's writers.
- **A private space with the GFS switch on** (off by default):
  which households belong to the channel — never the space's
  name, id, key or content.

It **never** sees:

- The contents of any message, post, calendar event, photo or
  voice note.
- Anything from a private space with the GFS switch off, or from
  a household space.
- Your household's shopping list, calendar, presence or logs.

It does see your IP address, the timing and the rough size of
each envelope, and which households receive a space's posts.

No relay is involved at all if you have no public or global
spaces, no public Moments, no public highlight links and no
private space with the GFS switch on. Your household then talks
only to households you've paired with, directly.

<details class="tech">
<summary>Under the hood</summary>

Routing metadata only: `space_id`, `event_type`, size bucket
(1 / 4 / 16 / 64 / 128 KiB, plus 191 KiB for envelope relay),
timing, subscriber set, source IP. A post relayed by the host
household is identity-free `{space_id, event_type, payload}` on
a cookie-less session; a member publishing for itself is
household-signed in trusted mode and signed with a shared
per-epoch writer key in strict mode. A private space with
`private_gfs` on uses an opaque 128-bit channel id. Offline recipients are queued for 24 h
(2000 envelopes / 64 MiB per recipient); no content is stored
beyond that.

</details>

## Encryption

Every message that leaves your server is encrypted — always, with
no toggle to forget. Each post is sealed in an envelope and
signed, so only the households in the space can open it and not
even a malicious relay can read a word. Direct messages are
sealed from your home to theirs. There's no "encrypted
/ not encrypted" switch and no plaintext fallback: if a space
can't seal, it doesn't send.

The rule is simple: nothing leaves the house unsealed, and
nothing a relay touches is ever readable.

<details class="tech">
<summary>Under the hood</summary>

AES-256-GCM envelopes, Ed25519 signatures. The only readable
fields on an envelope are `event_type`, `from_instance`,
`to_instance`, `space_id` and `epoch`. Full
detail on the [security model](/docs/security/) page.

</details>

## Things Social Home doesn't have

- An account on a Social Home cloud (there isn't one).
- A copy of your data anywhere else. If you installed the add-on, Social
  Home is part of your normal Home Assistant backup; on a
  standalone install, download a Recovery Kit and keep it somewhere safe.
- Telemetry, analytics, crash reporting, or A/B testing.
- An advertising surface.
- A growth team trying to monetise your evening.

<details class="tech">
<summary>Under the hood</summary>

Keys at rest are wrapped under a KEK. The Recovery Kit is a
`.shrk` file sealed with scrypt + AES-256-GCM.

</details>

## Things you control

- **Who's in a space** (Settings → Spaces — invite or remove
  members; every membership change gives the space a new key, so
  someone removed can't read anything posted afterwards).
- **Presence sharing** (Settings → Privacy — opt-in, per
  household member, can be turned off any time).
- **Pairing** (Settings → Connections — remove a household and
  its copy of your messages stops being trusted).
- **Which relay, if any** (Settings → Connections — the GFS is
  optional and you choose which one).
- **Backups** — your responsibility, like everything else in your home.

## Reporting issues

Security issues live in
[`social-home-io/socialhome`](https://github.com/social-home-io/socialhome/security)
on GitHub. Please report privately via the GitHub Security
Advisories link rather than a public issue.
