---
title: Changelog
description: Release history of the Social Home stack — core server, HA integration, HA add-on, client library, and this website.
order: 90
---

Each Social Home release is tagged with the same CalVer date —
e.g. `2026.4.25` — across every repo that participated in the
release. Components without changes for a given date simply
don't tag.

## 2026.4.25 — first public release

The bootstrap. Five repos go public on the same day:

- **Core server** (`socialhome-io/socialhome`) — Python aiohttp
  app, Preact frontend, federation, GFS support.
- **Client library**
  (`socialhome-io/socialhome-client` · 2026.4.25) — async
  HTTP/WS client, federation resource (`set_base`,
  `get_base`, `forward_inbox_envelope`).
- **HA integration** (`socialhome-io/ha-integration` · 2026.4.25)
  — config flow, federation base URL push, presence push,
  public inbox view (also a WebRTC fallback).
- **HA add-on**
  (`socialhome-io/ha-app` · 2026.4.25 + 2026.4.25-dev) —
  Music-Assistant-style stable + dev channels, bashio + tempio
  config rendering.
- **Website** (`socialhome-io/website`) — this site, built with
  Astro.

Highlights:

- Pairing via QR + six-word phrase.
- Direct WebRTC sync between paired households; HTTPS inbox as
  fallback.
- Optional GFS relay for global-space discovery (no message
  data ever flows through it).
- Per-space end-to-end encryption.
- Voice-note transcripts via HA STT.
- Calendar overlay between household + personal + shared
  calendars.
- Live shopping list with HA-voice integration.
- Quiet, opt-in presence (current zone only — no GPS history).
