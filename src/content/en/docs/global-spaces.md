---
title: Global spaces
description: Rooms for households who don't already know each other — the four kinds of space, the relay that carries global spaces (one you trust, or one you run yourself), and what it can and can't see.
order: 40
---

Most spaces in Social Home are shared between households you
already know: the family, the neighbours you've paired with. But
some communities are open by nature: a neighbourhood marketplace,
a city-wide running club, a public-domain book club. For those,
Social Home has **global spaces**, and a small relay, the GFS
(Global Federation Server), that helps households who have never
met find each other. (New word? See [GFS](/docs/glossary/#gfs) in
the glossary.)

## Four kinds of space

Each kind reaches a little further than the one before:

| Kind          | Who can find it                                 | Does the GFS see it?                              |
| ------------- | ----------------------------------------------- | ------------------------------------------------- |
| **Private**   | Only people you invite                          | No, unless the owner switches the GFS on for it   |
| **Household** | Everyone in your home, automatically            | No                                                |
| **Public**    | Your paired households, under **Browse spaces** | No, unless an admin publishes it to a GFS by hand |
| **Global**    | Anyone whose home is connected to the same GFS  | **Yes**, it is listed on every GFS you use        |

One rule makes the rest easy: **households you're paired with
don't need the GFS.** Posts reach them directly, or across the
mesh of households you both know, whatever kind of space it is.
The GFS only comes in for households you _aren't_ paired with
(or as a fallback, if you switched that on for a connection and
the direct path is down).

So a **public** space stays inside your own circle: it is a space
your paired households can find and ask to join, not one the
whole world can see. A **global** space is the one for strangers.
The rest of this page is about global spaces.

## Big changes take a vote

Two actions are too consequential for one person to do alone:
**dissolving a space** and **changing its scope** — in either
direction, wider or narrower. When a space has more than one
admin, either action becomes a _proposal_ instead of happening
instantly.

- Any admin can open the proposal; the others vote yes or no.
- It executes once **more than half** the admins approve — the
  owner counts as an admin like everyone else.
- A single _no_ cancels it. So does waiting: a proposal lapses
  after seven days if it never reaches a majority.

A space with just one admin still acts immediately — a majority
of one. But the moment a second admin joins, no single person
can dissolve the space or change who sees it on their own.
Admins in paired households vote too; the host tallies everyone
and only the approved result travels out.

## Who does what in a space

Every space has an owner, and the owner can hand out roles. From
the most to the least power: **owner**, **admin**, **moderator**,
**member**, **follower**. A follower reads but doesn't post.

Each feature in a space — posting, the calendar, the marketplace
— can be **open** to every member, **reviewed** (a member's
contribution waits in a queue until a moderator or admin
approves it), or **admins only**. Reviewed items that nobody
looks at expire after seven days.

## What the GFS does for a global space

A GFS is a relay any household can connect to. For a global
space it does two jobs:

1. **It's a directory.** It lists the global spaces published to
   it, who hosts them, how to join, and, if the space has one, a
   map pin rounded to about 11 m. Anyone connected to that GFS
   can find them under **Browse spaces**.
2. **It carries posts to people you aren't paired with.** That
   means **followers**, households that read along without
   joining (only if the owner allows followers; it's off by
   default), and **members who joined with a GFS link**. Members
   you're paired with still get every post directly or over the
   mesh.

The relay never sees the _contents_ of your posts. Every post is
sealed on the way out of your home and only opened in each
recipient's home. The envelope is padded to one of a few fixed
sizes, so the relay can't even tell a short message from a long
one. It stores no content: if a household is offline, it holds
their sealed envelopes for a day and then lets them go.

> Think of the relay as the post office for an open community.
> The post office sees that a sealed parcel went to the book
> club, and roughly how heavy it was, but only the members have
> keys to open it.

<details class="tech">
<summary>Under the hood</summary>

`PUBLIC_SPACE_TIERS = {public, global}`: only those two may ever
relay content to a GFS. A global space is published to every GFS
the household is connected to when it becomes global, and
withdrawn from all of them when it stops being global. A public
space reaches paired households as a `SPACE_DIRECTORY_SYNC`
snapshot (name, description, emoji, member count, join mode),
never through a GFS; it reaches a GFS only through the manual
publish button, and is withdrawn again if it turns private or
household. Followers need `allow_subscribers` on (default off).
Members always receive posts through the ordinary member fan-out,
direct or mesh, independent of the GFS. Envelopes are
AES-256-GCM, signed with Ed25519. Padding buckets: 1 / 4 / 16 /
64 / 128 KiB (member publish), plus 191 KiB for envelope relay.
Offline recipients are queued for 24 h, at most 2000 envelopes or
64 MiB per recipient. Full detail on the
[security model](/docs/security/#what-a-relay-sees) page.

</details>

## Trusted or strict

For the posts that do go through the GFS, a space runs in
**trusted** mode by default: the relay learns which household
posted into which space, and when — but never what. For communities where even that is too much, the space's
owner can switch to **strict** mode: posts go out with no
sender on them at all, and the relay only knows that _someone_
in the space posted.

<details class="tech">
<summary>Under the hood</summary>

Two paths reach the GFS. When the host household relays a post,
the request is identity-free — `{space_id, event_type, payload}`
on a cookie-less session — and is only sent to a GFS that has
proved `anonymous_publish` support. When a member publishes for
itself, trusted mode signs the request with that household's key
(so the GFS learns who posted); strict mode signs it with a
shared per-epoch writer key derived from the space seed, so the
GFS can't tell members apart. A plain membership sync tells the
GFS nothing. In both modes the GFS still sees source IP, timing,
the size bucket and the subscriber set.

</details>

## How finding and joining work

1. A household makes a space **global**. Its home publishes the
   name, description, cover image, age policy and accent colour
   to every GFS it is connected to: enough to list it, but **no
   message content**.
2. Anyone whose home is connected to that same GFS can find it
   under **Browse spaces** and ask to join, or follow it if the
   owner allows followers.
3. Whether a join is granted depends on the space's **join
   mode**: **Open** (anyone can join straight away), **Request**
   (an admin says yes) or **Invite only**. Invite links work
   alongside any of them.
4. Once you're in, posts travel from your home to every other
   member's home: directly or over the mesh for households you're
   paired with, through the GFS for followers and members who joined
   with a GFS link.

## Two kinds of invite link

- A **GFS link** works for anyone. The person opening it doesn't
  need to be paired with you — the GFS makes the introduction.
  Treat it like a key: whoever has it can get in.
- A **Local link** only works for households you're already
  connected to, and never touches a GFS. Use it for the family
  space or the three neighbours you already know.

## Encryption is always on

Every post in every space — public, global or private — is
**always** sealed in transit. There is no "encrypted / not
encrypted" toggle in Social Home, and no fallback to sending in
the clear: if a space can't seal, it doesn't send.

What that means in practice:

- The relay can't read your messages, photos or voice notes —
  even if the operator wanted to. It only sees the sealed
  envelope.
- A new member who joins later only receives messages posted
  after they join. Earlier history isn't retroactively shared —
  members handle their own backups locally.
- Every time the membership changes, the space gets a new key.
  Someone who left can't read anything posted after they left.

## What happens if the relay is down?

Members you're paired with don't notice: their posts never went
through the GFS. Followers and members who joined with a GFS link
have to wait. Nothing is silently dropped: your household keeps
retrying (after a few seconds, then half a minute, then a couple
of minutes, then every ten) and the relay, once it's back, still
holds up to a day's worth of sealed envelopes for households that
were offline. Your local copy is saved at home the moment you
press send.

If your space has many followers, connecting your household to a
second relay (or running your own) is the cure. A global space is
published to every relay you're connected to, and posts for
followers go out through all of them.

<details class="tech">
<summary>Under the hood</summary>

Retry backoff: 5 s, 30 s, 2 min, 10 min. GFS-side queue for
offline recipients: 24 h, 2000 envelopes / 64 MiB per recipient.

</details>

## Connect to a ready-made relay

The Social Home project runs one public relay at
**[`gfs.social-home.io`](/servers/)**, with the age-gate policy
enforced. One QR scan and you're connected.

Or [run your own](/docs/running-a-gfs/) on any VPS in
15 minutes — useful for a private community, a household-
specific relay, or as a second connection for resilience.

## Running a relay

A relay is a small Python server (open source under MPL 2.0).
You can host one for your neighbourhood, your city, or a
specific community. See
[Run a relay yourself](/docs/running-a-gfs/) for a Docker
Compose + Cloudflare guide.

## Side by side

| Behaviour           | Private / household / public                   | Global                                                       |
| ------------------- | ---------------------------------------------- | ------------------------------------------------------------ |
| Who can find it     | invited people / your home / paired households | anyone connected to the same GFS                             |
| Joining             | invite, household membership, or join mode     | open / request / invite only, plus invite links              |
| How posts travel    | directly or over the mesh                      | the same for paired members; through the GFS for the rest    |
| What the relay sees | nothing (no relay, unless switched on)         | routing data and a sealed, padded envelope, never content    |
| Encryption          | **always on**                                  | **always on**                                                |
| Where messages live | each member's home                             | each member's home (relay never stores content)              |
| If relay is offline | n/a                                            | followers wait; posts retry, relay holds a day's envelopes   |
| Can be turned off   | yes, by admin vote                             | yes: make it non-global by admin vote, and the relay forgets |

## Privacy in global spaces

A global space stays walled off from the rest of your household.
Information posted in one space never bleeds into another, or
into your private spaces, and the relay only ever learns about
the global spaces you take part in. What the relay can and can't
see is spelled out on the [privacy model](/docs/privacy/) and
[security model](/docs/security/) pages.
