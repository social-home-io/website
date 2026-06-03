---
title: Changelog
description: Release history of the Social Home stack — core server, HA integration, HA add-on, client library, and this website.
order: 90
---

Each Social Home release is tagged with the same CalVer date —
e.g. `2026.4.25` — across every repo that participated in the
release. Components without changes for a given date simply
don't tag.

## Unreleased

- **Social Home Apps.** Install small apps — a chess board, a shared
  whiteboard, a quiz — that federate app-to-app with the same app in a
  paired household. Sessions run peer-to-peer between confirmed homes
  (the relay is never involved); every payload is AES-256-GCM sealed and
  Ed25519-signed. Apps are sandboxed; the admin installs once and sets a
  per-app age gate.
- **Spaces: big changes take a vote.** Dissolving a space or changing its
  scope now needs a majority of the space's admins to approve once a
  space has more than one admin. Any reject cancels; a proposal lapses
  after seven days.
- **Highlights: public sharing via a paired GFS.** A highlight author can
  mint a public URL on a Global Federation Server. Anyone with the
  URL gets a browser-only viewer — highlight bytes stream straight from
  the author's home server over WebRTC; the relay only brokers the
  signalling handshake. Per-link tokens are individually revocable;
  the same retention you set on the highlight applies to the link.

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
