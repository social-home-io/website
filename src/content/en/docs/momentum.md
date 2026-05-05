---
title: Momentum
description: One-shot posts that fan out three hops across the federation. Up to 1 000 characters plus an image or 15-second clip; gone after a day, or a week for people you follow.
order: 24
---

**Momentum** is the broadcast pillar of Social Home. Each post —
a *moment* — fans out across paired households *and their
paired households* up to three hops away. Replies are themselves
moments, linked through a `parent_moment_id` so a thread reads
as one. The whole pillar lives under **Talk → Momentum** in the
sidebar; the **Browse → Moments archive** dashboard groups every
received moment by day inside the retention window.

## What you can post

- Up to **1 000 characters** of text (the composer shows a live
  counter).
- Optionally a single **image** *or* a single **video clip up to
  15 seconds**. The composer rejects longer clips before the
  upload so you don't waste bandwidth.
- Replies attach to a parent via `parent_moment_id`. Threading
  stays flat — a reply to a reply attaches to the original
  thread root so the detail view reads top-down without nested
  branches.

## Retention

- **24 hours** by default for moments from people you don't
  follow.
- **7 days** for moments from anyone on your follow list.
- The hourly retention scheduler drops every row past the
  absolute 7-day cap; the visible window is computed per-viewer
  at list time. You can follow / unfollow from the ⋯ menu on
  any moment, or from **Settings → Privacy → Following**.

## Federation — the 3-hop relay

```
            hop=1               hop=2               hop=3
   A ───►   B ───►              C ───►              D
   author    paired peer         B's paired peer      C's paired peer
                                 (skips A)            (skips A and B)
```

The author's instance fans the moment to every paired peer with
`hop_count = 1`. Each receiving instance:

1. **Persists** the row (UPSERT by `moment_id`, so duplicate
   delivery via two relay paths is a no-op).
2. **Republishes** the bus event so the realtime layer pushes a
   `moment.created` WebSocket frame to local viewers.
3. **Re-broadcasts** the same envelope to *its own* paired peers
   — bumping `hop_count` and skipping both the original origin
   and the immediate sender.
4. **Stops** when `hop_count` would exceed `MOMENT_MAX_HOPS`
   (3).

The relay carries an `origin_instance_id` field that pins the
original sender across hops, so the receiving instance can
verify authority even when the envelope arrived from a relayer
rather than the author's home.

## Rate limit

One **top-level** moment per author per **15 minutes**. Replies
and reactions are exempt — a back-and-forth thread shouldn't
grind to a halt waiting for the timer. The 15-minute window is
enforced at the service layer; the API returns a 429
`MOMENT_RATE_LIMIT` error code when it kicks in.

## Reactions

Pick from a quick row of emoji on the detail page, or tap an
existing reaction to set / change yours. Reactions ride a
unicast back-channel to the author's home instance only — the
update lands as a `moment.reaction_changed` WebSocket frame in
the author's session.

## Block + report

- **Block.** The same `Block` action that hides Stories also
  hides every moment from that author. Manage blocks at
  **Settings → Privacy → Blocked accounts**.
- **Report.** ⋯ → **Report** on the detail page files a row in
  the unified `content_reports` queue (the same one that handles
  posts, comments, stories, and users). The household admin
  triages everything from one place at
  `/api/admin/reports?status=pending`.

## API

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/api/moments` | List moments visible to the caller (block-aware, follow-aware). |
| `POST` | `/api/moments` | Create a moment. Body: `{content, media_url?, media_type?, duration_ms?, parent_moment_id?}`. |
| `GET` | `/api/moments/archive` | Full retention-window list for the calendar dashboard. |
| `GET` | `/api/moments/{id}` | Detail with replies + reactions. |
| `DELETE` | `/api/moments/{id}` | Author or admin delete. |
| `PUT` / `DELETE` | `/api/moments/{id}/reaction` | Set / clear your own emoji. |
| `POST` | `/api/moments/{id}/report` | File a `content_reports` row. |
| `GET` / `POST` / `DELETE` | `/api/moments/follows[/{user_id}]` | Manage your follow list. |

The `feat_momentum` household toggle in **Settings →
Household features** disables every endpoint above with a 403
`FEATURE_DISABLED` response when admins want to leave the
pillar off.
