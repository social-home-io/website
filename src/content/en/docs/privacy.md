---
title: Privacy model
description: What Social Home keeps, what travels, and what nobody — including us — can ever see.
order: 50
---

Social Home is built on a simple rule: **the household keeps
everything**. There is no cloud account, no analytics, no remote
logger, no growth team. The website you're reading right now is
served as static HTML by GitHub Pages and tracks nothing.

This page lists every piece of data Social Home touches and
exactly where it goes.

## What lives where

| Data                                  | Stored on your HA?                                                          | Travels off-server?                                      |
| ------------------------------------- | --------------------------------------------------------------------------- | -------------------------------------------------------- |
| Messages, posts, photos               | yes (SQLite + media folder under `/data`)                                   | only to households you've paired                         |
| Shopping list                         | yes                                                                         | only across your household devices                       |
| Calendar events                       | yes                                                                         | only to households sharing the calendar                  |
| Voice transcripts                     | yes (text only — audio is discarded after transcription unless you save it) | same as posts                                            |
| Avatars + display names               | yes                                                                         | yes — to paired households (it's how they recognise you) |
| Public key (identity)                 | yes                                                                         | yes — that's literally the point of pairing              |
| External URL                          | yes                                                                         | yes — to paired households when it changes               |
| HA owner's account / email / password | **never read**                                                              | never                                                    |
| GPS / location history                | **never** by default                                                        | only the current zone, only when you opt in              |
| Logs                                  | rotated locally, default 7 days                                             | never                                                    |

## What the global relay sees

The optional relay (used for global spaces only — see
[global spaces](/docs/global-spaces/)) sees:

- The set of households that have published public spaces and
  their reachable URLs.
- New-space announcements (signed metadata).
- Connection-keepalive pings.

It **never** sees:

- The contents of any message, post, calendar event, photo, or
  voice note.
- Anything from a private space.
- Any data from a household that hasn't published a public
  space.

If you don't use global spaces, no relay is involved at all —
your household just talks directly to households you've paired.

## Encryption

Every message that leaves your server is encrypted — always, with
no toggle to forget. Each federation event is sealed in an
AES-256-GCM envelope and signed, so only the households on the
guest list can open it and not even a malicious relay can read a
word. There's no "encrypted / not encrypted" switch and no
plaintext fallback: if a space can't encrypt, it doesn't send.

On your own server, your data sits in plaintext — because it's
your house, your disk, and that's how you search and scroll your
own history. The rule is simple: nothing leaves the house
unencrypted, and nothing a relay touches is ever readable.

## Things Social Home doesn't have

- An account on a Social Home cloud (there isn't one).
- A way to recover messages if your HA dies — back up
  `/addon_data/social_home/data/` like any other HA backup.
- Telemetry, analytics, crash reporting, or A/B testing.
- An advertising surface.
- A growth team trying to monetise your evening.

## Things you control

- **Who's in a space** (Settings → Spaces — invite or remove
  members; removing someone rotates the space's key so they can't
  read anything posted afterwards).
- **Presence sharing** (Settings → Privacy — opt-in, per
  household member, can be turned off any time).
- **Pairing** (Settings → Connections — remove a household and
  its copy of your messages stops being trusted).
- **Backups** — your responsibility, like everything else on HA.

## Reporting issues

Security issues live in
[`socialhome-io/socialhome`](https://github.com/social-home-io/socialhome/security)
on GitHub. Please report privately via the GitHub Security
Advisories link rather than a public issue.
