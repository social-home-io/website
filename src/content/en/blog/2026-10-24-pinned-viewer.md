---
title: "Share links that the GFS can't open"
description: Public highlight links, moment share links, a global space's page, invite links and Momentum profiles now open in the Social Home viewer, a page that no GFS serves. The people who run a GFS can't read what you share or change the page your friend sees. Since Social Home 2026.10.22.
date: 2026-10-24
author: The Social Home team
order: 50
---

Most of what you do in Social Home stays between households: sealed in
your home, opened in theirs. But sometimes you want to reach someone
who isn't on Social Home at all. Maybe it's Grandpa, who only reads
email, or the friend you met on holiday, or the parents at school you
want to invite to the class space. They open your link in an ordinary
browser.

Until now, that browser page came from the
[GFS (Global Federation Server)](/docs/glossary/#gfs), the relay that
helps households find each other. Since **Social Home 2026.10.22**, it
comes from the **Social Home viewer** at `viewer.social-home.io`, a
page that no GFS serves. That one change means the people who run a
GFS can't read what you share, and they can't change the page your
friend sees.

## The lock and the locksmith

A public highlight link is sealed from your home to your friend's
browser. The key that opens it sits in the part of the link after the
`#`. Browsers never send that part to any server, so the GFS that
helps set up the link never sees it.

But a key only helps if you trust the hands that hold it. The page that
opens the highlight is the code that reads the key. If the GFS served
that page, the GFS could also serve a slightly different page that
copies the key, and nobody would notice. Encryption is only as strong
as the page doing the opening.

So the page now comes from somewhere else. Your household writes links
that point to the viewer, and the viewer talks to the GFS only to set up
the connection. The GFS still introduces your home and your friend's
browser, and it still passes sealed bytes along when a direct
connection can't be made. It never runs the code that holds the key.

| Who                      | What they get                                                                                                     |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| Whoever runs the GFS     | that a link was opened, from which address, and when, plus sealed bytes. Never the key, and never the page itself |
| The viewer's host        | that someone loaded the viewer. Not which link, not which GFS, not what was in it                                 |
| Anyone who has the link  | that one highlight or moment, until it ends (a highlight link also stops the moment you remove it)                |
| Anyone who hasn't got it | nothing                                                                                                           |

## Every version, frozen

The viewer is a small set of static files. Its job is to be boring and
easy to check:

- **Every version gets its own address.** A link names the exact viewer
  version it was made for. The files behind that address never change,
  so a link made today opens the same page next year.
- **The script is locked by its fingerprint.** The page tells the
  browser exactly which script to run. If even one byte is different,
  the browser refuses to run it.
- **Built twice, by two different repos.** The Social Home release
  builds the viewer and records its fingerprint. The separate
  [`social-home-io/viewer`](https://github.com/social-home-io/viewer)
  repository builds it again from the same release and publishes it
  only when both builds match.
- **Versions are only ever added.** Old versions are never rewritten or
  deleted, so every link minted by an earlier release keeps opening.
- **Anyone can check.** Fetch the files, compare their fingerprint with
  the one in the release, rebuild from the tag. You don't have to take
  our word for it.

## One viewer for everyone outside

Highlights were the start. Everything a stranger opens from a GFS now
opens in the same viewer:

- **Public highlight links.** Tap **Publish public link** in the
  highlight viewer, pick a GFS, and share the link. The page shows who
  shared it (name, picture and bio, sealed like the frames) and streams
  the highlight straight from your home. See
  [Highlights](/docs/highlights/#sharing-publicly-via-a-global-server).
- **Moment share links.** On a public moment, **Copy share link** makes
  a link that opens that one moment and nothing else you posted. It
  works even while your home is offline, because the GFS keeps a sealed
  copy that it can't open itself. See
  [Momentum](/docs/momentum/#share-one-moment).
- **A global space's page, invite links and profiles.** A space's page
  on a GFS, a GFS invite link and a person's Momentum profile hand off to
  the viewer, which shows the space's About text, the invite code and QR
  code, or the profile with a Follow button.

The viewer speaks English, German, Dutch, French and Spanish, picking
your friend's browser language, and the pages follow their light or
dark setting. Shared in a chat app, a space or profile link still
unfurls with its name and picture. The GFS answers the chat app with a
small preview page that has no scripts.

## What it doesn't solve

We'd rather you hear the limits from us:

- **You trust the viewer's host.** The viewer is published on GitHub
  Pages under the `social-home-io` organisation. The fingerprints make
  a swapped page detectable, but only if someone checks.
- **The link is the key.** Anyone you forward it to can open it. It
  also sits in your friend's browser history, like any other link they
  open.
- **A moment link can't be taken back** short of deleting the moment.
  A highlight link can: remove it, or let the highlight expire.
- **The GFS still sees the traffic.** It knows when a link is opened
  and from which address. It doesn't know what's inside.

The full list is on the [security model](/docs/security/#public-links)
page.

## Running your own GFS

There's nothing to do. A GFS hands its public
pages to the project's viewer by default. If you'd rather not depend on
it, you can host the published viewer files yourself and point your GFS
and households at them, or switch the hand-off off, which brings back
the pages your GFS renders itself. That is less safe for highlight
links, because your GFS then serves the page that reads the key. See
[Run a relay yourself](/docs/running-a-gfs/#your-public-pages).

<details class="tech">
<summary>Under the hood</summary>

- Highlight link:
  `https://viewer.social-home.io/v/<hash>/#g=<GFS>&i=<home>&h=<highlight>&t=<token>&k=<secret>`.
  Everything after `#` stays in the browser. `k` is derived with
  HKDF-SHA256 from the author's identity seed and the token; the GFS
  never sees it.
- The stream is sealed per view: the viewer sends an ephemeral P-256
  key, and the author's home derives an AES-256-GCM key from the ECDH
  result salted with `k`. The GFS sees the token and the viewer key on
  the direct path and on the relay fallback alike, but never `k`.
- `<hash>` is the first 16 hex characters of the sha384 of the page,
  which carries the script's SRI hash and the styles by hash. Strict CSP
  in a `<meta>` tag, `no-referrer`, every request `credentials: 'omit'`
  and `redirect: 'error'`.
- The manifest `socialhome/pinned_viewer.json` is committed in the core
  repo; CI builds the viewer twice and fails on any byte difference.
  The viewer repo rebuilds it, checks the `integrity`, and adds
  `v/<hash>/` to `gh-pages`, which a ruleset keeps append-only.
- The viewer has its own domain, `viewer.social-home.io`, rather than a
  shared `github.io` origin, so no other site of the organisation could
  register a service worker over it.
- GFS public pages: `/spaces/{id}`, `/join/{token}` and
  `/moments/{user}` answer an inert hand-off page (preview tags, a
  refresh to the viewer, `default-src 'none'`). The viewer reads
  `/gfs/pages/*` cross-origin, without credentials, and renders the
  About text from a small Markdown subset, never as HTML.
- Viewer TURN credentials are minted per answer (TURN REST API, 10
  minutes by default), never static.

</details>
