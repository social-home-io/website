---
title: Highlights
description: A photo or short clip that vanishes. Highlights let you share a moment with paired households without leaving an archive in someone else's data centre.
order: 22
---

A **highlight** is the lightweight, ephemeral counterpart to the
household feed. You drop a photo or a short video, add an
optional caption, and it lands in the _Highlights_ inbox of every
paired household. After 24 hours (or longer if you've set a
retention preference) the row is purged, on disk, on your
server.

Highlights live under **Talk → Highlights** in the sidebar.

## How it works

- **One highlight per author per day.** A highlight is a small album of
  _frames_; each post during the same day appends a frame to
  today's highlight rather than creating a new one. New day → new
  highlight row.
- **Audience.** You pick from three options when you post:
  - **All paired peers** — every confirmed paired household.
  - **Specific households** — the peers you choose.
  - **Specific users** — particular people on those households.
- **Retention.** Default 30 days, configurable per author from
  1 to 90 days in **Settings → Privacy**. The retention scheduler
  prunes expired rows hourly.
- **Replies & reactions.** Tap a frame to react with an emoji;
  swipe up or hit the ✉ chip to reply via DM with a snapshot of
  the frame attached, so the conversation stays meaningful even
  after the original frame expires.
- **Archive.** **Browse → Highlight archive** is a calendar grid of
  every highlight still inside its retention window — yours and
  every paired peer's. Days with highlights are clickable; tap a
  date to see who posted that day.

## Privacy

- The same end-to-end encryption that protects DMs protects
  highlight frames in transit between Home Assistants.
- Frames are signed with the author's instance key; receivers
  drop forgeries before they ever land in the database.
- The personal block list (**Settings → Privacy → Blocked
  accounts**) hides every highlight from a blocked author across
  every surface — inbox, archive, and the rings on top of the
  page — without leaking a "you've been blocked" signal.

## Sharing publicly via a Global Server

Sometimes you want to send a highlight to someone who isn't on Social
Home — a friend on Twitter, a relative who only checks email. From
the highlight viewer, the author can tap **Publish public link** and
pick a paired Global Federation Server (GFS). The GFS hands back a
URL like

```
https://gfs.example/highlight/{instance}/{highlight}/{token}
```

Anyone with that URL can open the highlight in a browser. Under the
hood, the GFS only relays a WebRTC handshake — the **highlight bytes
flow directly from your home server to the visitor's browser**, the
GFS never sees a frame. The same retention you set on the highlight
applies to the public link too: when the highlight would have been
purged for paired peers, the public URL stops working.

You can mint several tokens per highlight (one per platform, say) and
revoke any of them individually. The author can also pull every
token at once with **Unpublish** if the link gets out of hand.

This is the only Social Home surface where content is intentionally
readable without a household identity, and it's per-highlight
opt-in — nothing leaves your home server until you flip the toggle.

## Reporting

If a highlight breaks community norms — spam, harassment,
inappropriate content, misinformation — open the ⋯ menu on the
viewer and choose **Report**. The report lands in the unified
admin queue at `/api/admin/reports?status=pending` for the
household admin to triage. Same surface that handles posts,
comments, and Momentum reports.

## Federation

Highlights federate over the same §24.11 inbound pipeline that
covers DMs and space content: signed envelopes, replay-cache
protected, every routing field plaintext and every content field
encrypted. Reactions and view-receipts ride a back-channel
back to the author's instance so the chip on the frame counts
correctly. See the [federation docs](/docs/federation/) for the
full envelope shape.
