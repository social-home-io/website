---
title: Highlights
description: A photo or short clip that vanishes. Highlights let you share a moment with paired households without leaving an archive in someone else's data centre.
order: 22
---

A **highlight** is the lightweight, ephemeral counterpart to the
household feed. You drop a photo or a short video, add an
optional caption, and it lands in the _Highlights_ inbox of every
paired household. It expires on its own — 30 days by default, or
whatever retention window you set — and is then purged from disk,
on your server.

Highlights live under **Talk → Highlights** in the sidebar, with two
tabs. **Today** shows your own highlight (how many frames, seen by how
many, and who it's for), then one row per person, split into **New**
and **Seen**, each with who it was for and, near the end, when it
ends. **Archive** lists older highlights day by day, with a month
picker and **Only mine**. The rings of people with something new sit
on **Home**, in one card that hides when nothing is new.

## How it works

- **One highlight per author per day.** A highlight is a small album of
  _frames_; each post during the same day appends a frame to
  today's highlight rather than creating a new one. New day → new
  highlight row.
- **One audience for the day.** Today's first frame sets who sees
  the whole highlight, starting from your default in **Settings →
  Privacy → Highlights**:
  - **All paired households** — every confirmed paired household.
  - **Your household only.**
  - **Choose households or people…** — the households or particular
    people you pick.

  When you add frames later, the composer shows who they go to.
  **Change for all of today…** narrows or widens every frame at
  once, and tells you first who will gain the highlight and who
  will lose it. People who already watched keep what they saw. If
  the highlight has a public link, you can remove it in the same
  step.

- **Retention.** Default 30 days, configurable per author from
  1 to 90 days in **Settings → Privacy**. The retention scheduler
  prunes expired rows hourly.
- **Watching.** The viewer has pause, a menu and close buttons;
  Space or K pauses and the arrow keys move between frames. Videos
  start muted. At the end it moves on to the next person with
  something new.
- **Replies & reactions.** React with an emoji under the frame;
  your reaction stays marked, and tapping it again takes it back.
  The author is notified. **Reply to … privately** sends the frame
  into your chat with the author, so the conversation stays
  meaningful even after the frame expires.
- **For the author.** The ⋯ menu deletes one frame or the whole of
  today's highlight, shares it into the feed or a space, or makes a
  public link.

## Privacy

- Highlight frames are sealed from your home to the
  other household's, the same way DMs are. Nothing
  on the way can open them.
- Frames are signed by your household; a receiving household
  drops forgeries before they ever land in its database.
- People watching a highlight see only a short label for who it
  was for ("Picked people", "Household only"), never the list, and
  each household receives only its own part of the audience.
- The personal block list (**Settings → Privacy → Blocked
  accounts**) hides every highlight from a blocked author across
  every surface — inbox, archive, and the rings on top of the
  page — without leaking a "you've been blocked" signal.

## Sharing publicly via a Global Server

Sometimes you want to send a highlight to someone who isn't on Social
Home — a friend on Twitter, a relative who only checks email. From
the highlight viewer, the author can tap **Publish public link** and
pick a paired [GFS (Global Federation Server)](/docs/glossary/#gfs)
— the relay that helps households find each other. You get back a
link to the [Social Home viewer](/docs/glossary/#viewer), like

```
https://viewer.social-home.io/v/0123456789abcdef/#g=…&i=…&h=…&t=…&k=…
```

Anyone with that link can open the highlight in a browser. The page
shows who shared it — your name, picture and bio — and then the
frames. The pictures travel directly from your home to the
visitor's browser; the GFS only introduces the two. If that direct
path can't be set up (a strict office network, say), the GFS passes
the frames through — but only while your home is online, and it
stores none of them.

On both paths the highlight is sealed from your home to the
visitor's browser. The key is the part of the link after the `#`,
which browsers never send to a server, so the GFS can't open the
highlight even though it helps deliver it. And the page that reads
the key is not served by the GFS: it comes from the Social Home
viewer, a fixed set of files whose every version can be checked. Whoever
runs the GFS can neither read your highlight nor change the page
your visitor sees.

The same retention you set on the highlight applies to the public
link too: when the highlight would have been purged for paired
households, the link stops working.

You can make several links per highlight (one per platform, say) and
remove any of them individually. The author can also pull every
link at once with **Remove all public links for this highlight** if
a link gets out of hand.

This is the only Social Home surface where a highlight is
intentionally readable without a household identity, and it's
per-highlight opt-in — nothing leaves your home until you create a
link. Treat the link like a key: whoever has it can watch.

<details class="tech">
<summary>Under the hood</summary>

- The GFS brokers a WebRTC handshake between the author's home and
  the visitor's browser; highlight bytes then flow over that direct
  connection. When WebRTC fails, the GFS falls back to an HTTP
  pass-through that streams frames from the author's home while it
  is reachable. Zero highlight bytes are written to the GFS's disk in
  either path.
- Sealing: the viewer sends an ephemeral P-256 key (`vk`) with its
  offer; the author's home seals every frame with AES-256-GCM under
  `HKDF-SHA256(ECDH, salt = k)`. `k` is derived from the author's
  identity seed and the token, and lives only in the fragment.
- The link's `v/<hash>/` names one content-addressed viewer version;
  its script is pinned by SRI, its CSP is strict, and the versions are
  published append-only by
  [`social-home-io/viewer`](https://github.com/social-home-io/viewer).
  The GFS answers the viewer's anonymous signalling routes with CORS,
  never with credentials.
- Tokens are per-highlight, per-link, and revocable individually or
  all at once. A failed open always reads "This isn't available right
  now", whether the link is revoked, expired or the author is offline.

</details>

## Reporting

If a highlight breaks community norms — spam, harassment,
inappropriate content, misinformation — open the ⋯ menu on the
viewer and choose **Report**. The report lands in the household
admin's review queue — the same one that handles posts, comments,
and Momentum reports — for the admin to triage.

<details class="tech">
<summary>Under the hood</summary>

Reports are rows in the unified `content_reports` table; admins
list them at `/api/admin/reports?status=pending`.

</details>

## Federation

Highlights travel between households the same way DMs and space
content do: sealed, signed, and checked for replays on arrival.
Reactions and view-receipts find their way back to the author's
household so "seen by" counts correctly. Widening today's audience
sends today's frames once to each household that was added.

<details class="tech">
<summary>Under the hood</summary>

Highlights use the §24.11 inbound pipeline shared with DMs and
space content: signed envelopes, replay-cache protected, routing
fields in plaintext and every content field encrypted. Reactions
and view-receipts ride a unicast back-channel to the author's
household. Widening the day's audience sends at most 30 frames,
once, to each newly added household; narrowing makes a household
that drops out delete the highlight. Audience changes are limited
to 6 an hour per author.

</details>
