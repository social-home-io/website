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

Highlights live under **Talk → Highlights** in the sidebar.

## How it works

- **One highlight per author per day.** A highlight is a small album of
  _frames_; each post during the same day appends a frame to
  today's highlight rather than creating a new one. New day → new
  highlight row.
- **Audience.** You pick from three options when you post:
  - **All paired households** — every confirmed paired household.
  - **Specific households** — the households you choose.
  - **Specific people** — particular people in those households.
- **Retention.** Default 30 days, configurable per author from
  1 to 90 days in **Settings → Privacy**. The retention scheduler
  prunes expired rows hourly.
- **Replies & reactions.** Tap a frame to react with an emoji;
  swipe up or hit the ✉ chip to reply via DM with a snapshot of
  the frame attached, so the conversation stays meaningful even
  after the original frame expires.
- **Archive.** **Browse → Highlight archive** is a calendar grid of
  every highlight still inside its retention window — yours and
  every paired household's. Days with highlights are clickable;
  tap a date to see who posted that day.

## Privacy

- Highlight frames are sealed from your home to the
  other household's, the same way DMs are. Nothing
  on the way can open them.
- Frames are signed by your household; a receiving household
  drops forgeries before they ever land in its database.
- The personal block list (**Settings → Privacy → Blocked
  accounts**) hides every highlight from a blocked author across
  every surface — inbox, archive, and the rings on top of the
  page — without leaking a "you've been blocked" signal.

## Sharing publicly via a Global Server

Sometimes you want to send a highlight to someone who isn't on Social
Home — a friend on Twitter, a relative who only checks email. From
the highlight viewer, the author can tap **Publish public link** and
pick a paired [GFS (Global Federation Server)](/docs/glossary/#gfs)
— the relay that helps households find each other. The GFS hands
back a URL like

```
https://gfs.example/highlight/{instance}/{highlight}/{token}
```

Anyone with that URL can open the highlight in a browser. The
pictures travel directly from your server to the visitor's
browser; the GFS only introduces the two. If that direct path
can't be set up (a strict office network, say), the GFS passes the
frames through — but only while your home is online, and
it stores none of them. The same retention you set on the
highlight applies to the public link too: when the highlight would
have been purged for paired households, the public URL stops
working.

You can mint several tokens per highlight (one per platform, say) and
revoke any of them individually. The author can also pull every
token at once with **Unpublish** if the link gets out of hand.

This is the only Social Home surface where content is intentionally
readable without a household identity, and it's per-highlight
opt-in — nothing leaves your home server until you flip the toggle.

<details class="tech">
<summary>Under the hood</summary>

The GFS brokers a WebRTC handshake between the author's server and
the visitor's browser; highlight bytes then flow over that
direct connection. When WebRTC fails, the GFS falls back to an
HTTP pass-through that streams frames from the author's server
while it is reachable — zero highlight bytes are written to the
relay's disk in either path. Tokens are per-highlight, per-link,
and revocable individually or all at once.

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
household so the chip on the frame counts correctly.

<details class="tech">
<summary>Under the hood</summary>

Highlights use the §24.11 inbound pipeline shared with DMs and
space content: signed envelopes, replay-cache protected, routing
fields in plaintext and every content field encrypted. Reactions
and view-receipts ride a unicast back-channel to the author's
household.

</details>
