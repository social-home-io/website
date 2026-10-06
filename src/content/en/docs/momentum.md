---
title: Momentum
description: One-shot posts that fan out three hops across the federation. Up to 1 000 characters plus an image or 15-second clip; gone after a day, or a week for people you follow.
order: 24
---

**Momentum** is the broadcast pillar of Social Home. Each post —
a _moment_ — fans out across paired households _and their
paired households_ up to three hops away. Replies are themselves
moments, linked to the one they answer so a thread reads as one.
The whole pillar lives under **Talk → Momentum** in the sidebar;
the **Browse → Moments archive** dashboard groups every received
moment by day inside the retention window.

## What you can post

- Up to **1 000 characters** of text (the composer shows a live
  counter).
- Optionally a single **image** _or_ a single **video clip up to
  15 seconds**. The composer rejects longer clips before the
  upload so you don't waste bandwidth.
- Replies attach to the moment they answer. Threading stays
  flat — a reply to a reply attaches to the original thread root
  so the detail view reads top-down without nested branches.

<details class="tech">
<summary>Under the hood</summary>

A reply carries `parent_moment_id`; nested replies are re-parented
to the thread root on creation.

</details>

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
   author    paired household    B's paired household  C's paired household
                                 (skips A)             (skips A and B)
```

Your household sends the moment to every household it's paired
with. Each of them keeps a copy, shows it to their own members,
and passes it on to _their_ paired households — skipping whoever
already has it — until it has travelled three hops. A moment that
arrives twice by two routes is simply recognised and kept once.
Whoever receives it can always check that it really came from
the original author, even when it arrived via a friend of a
friend.

<details class="tech">
<summary>Under the hood</summary>

The author's household fans the moment to every paired household
with `hop_count = 1`. Each receiving household:

1. **Persists** the row (UPSERT by `moment_id`, so duplicate
   delivery via two relay paths is a no-op).
2. **Republishes** the bus event so the realtime layer pushes a
   `moment.created` WebSocket frame to local viewers.
3. **Re-broadcasts** the same envelope to _its own_ paired
   households — bumping `hop_count` and skipping both the
   original origin and the immediate sender.
4. **Stops** when `hop_count` would exceed `MOMENT_MAX_HOPS`
   (3).

The envelope carries an `origin_instance_id` field that pins the
original sender across hops, so the receiving household can
verify authority even when the envelope arrived from a relayer
rather than the author's home.

</details>

## How far you want to look

Three hops is the wire-level cap; you can dial it down per
account. **Settings → Privacy → Momentum visibility** picks
between **1 hop** (only your paired households),
**2 hops** (their paired households too), and **3 hops** (default — the full
relay reach). The setting only changes what _you_ see; your
household still relays the full three hops onward so the rest of
the mesh stays intact.

## Forwarding without storing

When an inbound moment lands and no one in your household can
see it — say everyone has dialled max-hops down to 1, or they
all block the author — your household skips the local copy
entirely and just forwards it to the next hop. Pure
pass-through: no disk write, no retention work, no UI surface.
The mesh stays whole for everyone else; your household just
doesn't keep a copy of something nobody asked for.

## Banned households + open reports

Two extra gates sit on top of the relay:

- **Banned households.** Admins can ban an entire household;
  moments from it are dropped on arrival and never relayed
  onward. Each household keeps its own list — bans don't
  federate.
- **Open content reports.** While a report is open against a
  moment or its author, your household won't fan the moment out
  to others. Resolving or dismissing the report restores the
  relay. The author still sees their own moment locally — other
  households only catch up after a moderator acts.

<details class="tech">
<summary>Under the hood</summary>

Bans are instance IDs listed under **Settings → Federation →
Banned instances**; matching inbound moments are dropped at the
§24.11 pipeline. Reports are `content_reports` rows; the relay
hold lifts once the row is resolved or dismissed via
`/api/admin/reports`.

</details>

## Going public via a Global Federation Server

Three hops cover paired households, but the wider network goes
through the [GFS (Global Federation Server)](/docs/glossary/#gfs)
— the relay that helps households find each other. Opt in at
**Settings → Privacy → Public Momentum**, pick a GFS, and your
moments fan out to everyone there who follows you. What the GFS
knows about you is exactly what you set in **Settings →
Profile**: display name, bio, avatar. Update those and the GFS
copy refreshes on save — one identity, no per-pillar overrides.

### Discover and follow

- **In your Social Home.** **Talk → Momentum → Discover** lists
  every public author on each GFS you've paired with. Search by
  name, handle, or bio; one click to follow. Their next moment
  lands in your inbox alongside paired-household moments —
  flagged with a "via {gfs}" chip.
- **From the open web.** Each GFS hosts a public landing at
  `/users` (the directory) and `/users/<id>` (per-author page
  with avatar, bio, follower count, and a deeplink that opens
  the follow flow on your Social Home). Useful for sharing your
  Momentum profile with people who aren't on a Social Home yet.

The directory cards use the same avatar + bio + display name
that paired households see — there's no separate "public
persona" to maintain.

## Rate limit

One **top-level** moment per author per **15 minutes**. Replies
and reactions are exempt — a back-and-forth thread shouldn't
grind to a halt waiting for the timer.

<details class="tech">
<summary>Under the hood</summary>

The 15-minute window is enforced at the service layer; the API
returns a 429 `MOMENT_RATE_LIMIT` error code when it kicks in.

</details>

## Reactions

Pick from a quick row of emoji on the detail page, or tap an
existing reaction to set / change yours. Reactions go back to
the author's household only, and the count on their screen
updates live.

<details class="tech">
<summary>Under the hood</summary>

Reactions ride a unicast back-channel to the author's household;
the update lands as a `moment.reaction_changed` WebSocket frame
in the author's session.

</details>

## Block + report

- **Block.** The same `Block` action that hides Highlights also
  hides every moment from that author. Manage blocks at
  **Settings → Privacy → Blocked accounts**.
- **Report.** ⋯ → **Report** on the detail page files a report in
  the household admin's review queue — the same one that handles
  posts, comments, highlights, and users — so the admin triages
  everything from one place.

<details class="tech">
<summary>Under the hood</summary>

Reports are rows in the unified `content_reports` queue; admins
list them at `/api/admin/reports?status=pending`.

</details>

## API

<details class="tech">
<summary>Under the hood</summary>

| Method                    | Path                               | Purpose                                                                                       |
| ------------------------- | ---------------------------------- | --------------------------------------------------------------------------------------------- |
| `GET`                     | `/api/moments`                     | List moments visible to the caller (block-aware, follow-aware).                               |
| `POST`                    | `/api/moments`                     | Create a moment. Body: `{content, media_url?, media_type?, duration_ms?, parent_moment_id?}`. |
| `GET`                     | `/api/moments/archive`             | Full retention-window list for the calendar dashboard.                                        |
| `GET`                     | `/api/moments/{id}`                | Detail with replies + reactions.                                                              |
| `DELETE`                  | `/api/moments/{id}`                | Author or admin delete.                                                                       |
| `PUT` / `DELETE`          | `/api/moments/{id}/reaction`       | Set / clear your own emoji.                                                                   |
| `POST`                    | `/api/moments/{id}/report`         | File a `content_reports` row.                                                                 |
| `GET` / `POST` / `DELETE` | `/api/moments/follows[/{user_id}]` | Manage your follow list.                                                                      |

The `feat_momentum` household toggle in **Settings →
Household features** disables every endpoint above with a 403
`FEATURE_DISABLED` response when admins want to leave the
pillar off.

</details>
