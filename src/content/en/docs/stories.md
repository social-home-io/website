---
title: Stories
description: A photo or short clip that vanishes. Stories let you share a moment with paired households without leaving an archive in someone else's data centre.
order: 22
---

A **story** is the lightweight, ephemeral counterpart to the
household feed. You drop a photo or a short video, add an
optional caption, and it lands in the _Stories_ inbox of every
paired household. After 24 hours (or longer if you've set a
retention preference) the row is purged, on disk, on your
server.

Stories live under **Talk → Stories** in the sidebar.

## How it works

- **One story per author per day.** A story is a small album of
  _frames_; each post during the same day appends a frame to
  today's story rather than creating a new one. New day → new
  story row.
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
- **Archive.** **Browse → Story archive** is a calendar grid of
  every story still inside its retention window — yours and
  every paired peer's. Days with stories are clickable; tap a
  date to see who posted that day.

## Privacy

- The same end-to-end encryption that protects DMs protects
  story frames in transit between Home Assistants.
- Frames are signed with the author's instance key; receivers
  drop forgeries before they ever land in the database.
- The personal block list (**Settings → Privacy → Blocked
  accounts**) hides every story from a blocked author across
  every surface — inbox, archive, and the rings on top of the
  page — without leaking a "you've been blocked" signal.

## Reporting

If a story breaks community norms — spam, harassment,
inappropriate content, misinformation — open the ⋯ menu on the
viewer and choose **Report**. The report lands in the unified
admin queue at `/api/admin/reports?status=pending` for the
household admin to triage. Same surface that handles posts,
comments, and Momentum reports.

## Federation

Stories federate over the same §24.11 inbound pipeline that
covers DMs and space content: signed envelopes, replay-cache
protected, every routing field plaintext and every content field
encrypted. Reactions and view-receipts ride a back-channel
back to the author's instance so the chip on the frame counts
correctly. See the [federation docs](/docs/federation/) for the
full envelope shape.
