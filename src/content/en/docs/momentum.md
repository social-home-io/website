---
title: Momentum
description: Short posts that travel three hops across paired households. Up to 1 000 characters plus an image or 15-second clip; gone after a day, or as long as the author chooses for people who follow them. Your own stay under Yours.
order: 24
---

**Momentum** is the broadcast pillar of Social Home. Each post —
a _moment_ — fans out across paired households _and their
paired households_ up to three hops away. Replies are themselves
moments, linked to the one they answer so a thread reads as one.
The whole pillar lives under **Talk → Momentum** in the sidebar,
with three tabs: **Moments** (everything that reached you),
**Yours** (everything you posted) and **Discover** (public authors
on a GFS). The **#** button filters by hashtag, in any language.
Home shows a "Momentum · 3 new" line when new moments are waiting.

## What you can post

- Up to **1 000 characters** of text (the composer shows a live
  counter).
- Optionally a single **image** _or_ a single **video clip up to
  15 seconds**. The composer rejects longer clips before the
  upload so you don't waste bandwidth.
- The line under the composer says where the moment goes: "Paired
  households and theirs, up to 3 hops · 24 h". Tap ⓘ for the details.
- Replies attach to the moment they answer. Threading stays
  flat — a reply to a reply attaches to the original thread root
  so the detail view reads top-down without nested branches.

<details class="tech">
<summary>Under the hood</summary>

A reply carries `parent_moment_id`; nested replies are re-parented
to the thread root on creation.

</details>

## Retention

- **24 hours** for everyone who doesn't follow you.
- **As long as you choose** for people who follow you: 1, 3, 7
  (default), 14 or 30 days, under **Settings → Privacy → Momentum →
  People who follow you keep your moments for**. It applies to
  moments you post from then on.
- **Your own moments stay.** Everything you post stays under
  **Yours**, with who sees it and until when, after it has ended
  for everyone else. Your household's admin can set how much space
  pictures and videos may take per person under **Admin → Storage**
  (2 GB by default); past it, the oldest pictures and videos go
  first and the text stays.
- **Save someone else's moment** from its ⋯ menu and it stays with
  you until its author deletes it. A delete removes saved copies
  too, so Save only appears where a delete can reach your copy: a
  moment from your household, a directly paired household, or a GFS
  that keeps delete records.

Follow someone from their person sheet. For a person from a paired
household, you see their moments for as long as they keep them, and
the follow stays between your households. For someone you only know
from a GFS, the follow goes through that GFS, which then knows you
follow them.

<details class="tech">
<summary>Under the hood</summary>

The follower window travels in the moment's signed `expires_at`, so
every receiving household honours it; values are capped at 30 days.
An author's delete is retried for 30 days, relays pass it on only
when it changed something, and a GFS keeps the signed delete
certificates (no content) for 30 days for followers that reconnect.
Saves are a per-person pin (`PUT /api/moments/{id}/save`) on the
copy your household already holds; the author learns nothing about
them.

</details>

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
account. **Settings → Privacy → Momentum → Show moments up to**
picks between **1 step** (only your paired households),
**2 steps** (their paired households too), and **3 steps** (default — every
moment that reaches you). The setting only changes what _you_ see; your
household still relays the full three hops onward so the rest of
the mesh stays intact.

## Protected accounts

A protected account, usually a child's, sees moments only from its
own household and directly paired households, the same circle its
own moments and replies reach. It has no Discover tab and can't post
publicly. See [Family safety](/docs/family-safety/).

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
— the relay that helps households find each other. Sign up at
**Settings → Privacy → Public sharing** (also linked from **Yours**
and the composer) and pick a GFS. Public stays **off** for each
moment until you switch on "Also public on …" in the composer; the
button then reads **Post publicly**. If you'd rather every new
moment be public, switch on **Make new moments public** there.
Public is chosen when you write, not afterwards. A reply can only be
public when the moment it answers is public. Public moments fan out
to everyone on that GFS who follows you. What the GFS
knows about you is exactly what you set in **Settings →
Profile**: display name, bio, avatar. Update those and the GFS
copy refreshes on save — one identity, no per-pillar overrides.

### Discover and follow

- **In your Social Home.** The **Discover** tab in Momentum lists
  every public author on each GFS you've paired with. Search by
  name, handle, or bio; one click to follow. Their next moment
  lands in your inbox alongside paired-household moments —
  flagged with a "via {gfs}" chip.
- **From the open web.** Each GFS lists its public authors at
  `/moments`, and every author has a profile page at
  `/moments/<id>` with their picture, bio and a **Follow** button.
  The profile opens in the [Social Home viewer](/docs/glossary/#viewer),
  a page no GFS serves. Useful for sharing your Momentum profile
  with people who aren't on a Social Home yet. The profile shows
  who you are, not what you posted.

The directory cards use the same avatar + bio + display name
that paired households see — there's no separate "public
persona" to maintain.

### Share one moment

To show a single public moment to someone without Social Home,
open it and tap **Copy share link**. The link opens that one
moment — and nothing else you posted — in the Social Home viewer,
until the moment ends. It works even while your home is offline:
the GFS keeps a sealed copy it can't open itself, and the key is
the part of the link after the `#`, which browsers never send to
a server. A share link can't be taken back short of deleting the
moment, so share it like a key.

<details class="tech">
<summary>Under the hood</summary>

The link is
`viewer.social-home.io/v/<hash>/#g=<GFS>&a=<author>&m=<moment>&b=<share copy>&k=<item key>`.
`k` is the moment's item key, never a generation or step key. The
share copy (text, times, display name, media descriptor) is sealed
under it, padded to 4 KB and uploaded to the GFS only when you ask
for a link. The viewer fetches it and the file anonymously, checks
each SHA-256 address and opens them with WebCrypto. The author's
home is never contacted.

</details>

## Rate limit

One **top-level** moment per author per **15 minutes**. The
composer tells you before you write: "You can post your next moment
at 13:24". You can write in the meantime; the button reads "Post at
13:24" until then. Replies and reactions are exempt — a
back-and-forth thread shouldn't grind to a halt waiting for the
timer.

<details class="tech">
<summary>Under the hood</summary>

The 15-minute window is enforced at the service layer; the API
returns a 429 `MOMENT_RATE_LIMIT` error code when it kicks in.

</details>

## Reactions

Pick from a quick row of emoji, or tap your reaction again to take
it back. Reactions go to the author's household only, also for
authors two or three hops away and authors you follow through a
GFS. On the way they are sealed for the author's household, so the
households and the GFS that pass them along can't see who reacted
or with which emoji.

Only the author's household knows the full count, so it sends the
totals back out a few times while the moment is fresh, and only
when they changed. Never who reacted. Until the first totals
arrive you see just your own reaction, and your new reaction joins
the number at the author's next update.

<details class="tech">
<summary>Under the hood</summary>

- A far reaction is signed by your household (Ed25519), padded to
  1 KB and sealed to the author household's key-wrap key (X25519).
  Over the mesh it travels back along the moment's path using
  stateless return tokens (AES-256-GCM, HKDF from each relay's
  routing secret). A moment keeps up to 3 return paths through
  different neighbours; each reaction goes along 2 of them.
- Through a GFS it goes to the author's household only, if you
  follow the author there.
- Totals cover the 8 most used emoji plus the overall count, signed
  by the author's household, at 10 minutes, 6 hours and 3 days
  after posting on the mesh, and 10 minutes, 3 hours and 24 hours
  through the GFS (sealed and padded to 640 bytes there).
- In the author's own session the update lands as a
  `moment.reaction_changed` WebSocket frame.

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
| `GET`                     | `/api/moments/archive`             | Your own moments and the ones you saved (Yours).                                              |
| `GET`                     | `/api/moments/{id}`                | Detail with replies + reactions.                                                              |
| `DELETE`                  | `/api/moments/{id}`                | Author or admin delete.                                                                       |
| `PUT` / `DELETE`          | `/api/moments/{id}/reaction`       | Set / clear your own emoji.                                                                   |
| `POST`                    | `/api/moments/{id}/report`         | File a `content_reports` row.                                                                 |
| `PUT` / `DELETE`          | `/api/moments/{id}/save`           | Save / unsave someone else's moment.                                                          |
| `GET` / `POST` / `DELETE` | `/api/moments/follows[/{user_id}]` | Manage your follow list.                                                                      |

The `feat_momentum` household toggle in **Settings →
Household features** disables every endpoint above with a 403
`FEATURE_DISABLED` response when admins want to leave the
pillar off.

</details>
