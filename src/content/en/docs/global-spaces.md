---
title: Global spaces
description: Rooms for households who don't already know each other — public and global spaces, the relay that carries them (one you trust, or one you run yourself), and what it can and can't see.
order: 40
---

Most spaces in Social Home are private — invited households only.
But some communities are open by nature: a neighbourhood
marketplace, a city-wide running club, a public-domain book club.
For those, Social Home has **public** and **global spaces**, and
a small relay — the GFS (Global Federation Server) — that helps
households find each other. (New word? See
[GFS](/docs/glossary/#gfs) in the glossary.)

## Four kinds of space

Before you reach for a relay, it's worth knowing the full
spectrum. Social Home has four space scopes, each one a slightly
wider audience:

| Scope         | Visible to                                                    | Uses a relay (GFS)?       |
| ------------- | ------------------------------------------------------------- | ------------------------- |
| **Private**   | Members you explicitly invite                                 | Optional (off by default) |
| **Household** | Members of your own household                                 | No                        |
| **Public**    | Listed on the GFS map — anyone connected to that GFS can find | **Yes**                   |
| **Global**    | Published worldwide through your GFS                          | **Yes**                   |

Private and household spaces travel directly between the
households involved. A private space's owner can switch the GFS
on for it — useful when members can't reach each other directly
— but it is off unless you turn it on.

Public and global spaces both ride the GFS. A **public** space
gets a pin on the map of the GFS you're connected to, with its
location rounded to about 11 m, so anyone on that GFS can find
it. A **global** space is published worldwide through your GFS.
The rest of this page covers these two.

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

## What a global space is

A public or global space lives on a GFS that any household can
connect to. The relay does two jobs:

1. **It's a map and a directory.** It lists which spaces have
   been published to it, who hosts them, and how to join.
2. **It's the post hub.** Once you're a member, every post you
   write goes through the relay, which fans it out to every
   other household in that space.

The relay never sees the _contents_ of your posts. Every post is
sealed on the way out of your Home Assistant and only opened on
each member's Home Assistant when it arrives. The envelope is
padded to one of a few fixed sizes, so the relay can't even tell
a short message from a long one. It stores no content: if a
member is offline, it holds their sealed envelopes for a day and
then lets them go.

> Think of the relay as the post office for an open community.
> The post office sees that a sealed parcel went to the book
> club, and roughly how heavy it was — but only the members have
> keys to open it.

<details class="tech">
<summary>Under the hood</summary>

Envelopes are AES-256-GCM, signed with Ed25519; the only
readable fields are `event_type`, `from_instance`,
`to_instance`, `space_id` and `epoch`. Padding buckets:
1 / 4 / 16 / 64 / 128 KiB (member publish), plus 191 KiB for
envelope relay. Offline recipients are queued for 24 h, at most
2000 envelopes or 64 MiB per recipient. Full detail on the
[security model](/docs/security/#what-a-relay-sees) page.

</details>

## Trusted or strict

By default a space runs in **trusted** mode: the relay learns
which household posted into which space, and when — but never
what. For communities where even that is too much, the space's
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

## How discovery and posting work

1. A household creates a space and **publishes** it to a relay.
   The relay receives the space's name, description, cover
   image, age policy, accent colour — enough to put it on the
   map — but **no message content**.
2. Anyone whose Home Assistant is connected to that same relay
   can browse the map, find the space, and ask to join.
3. Whether the join is granted depends on the space's **join
   mode**, which the host picks: **Open** (anyone can join
   straight away) or **Request** (the host household reviews
   and approves). Invite links work alongside either.
4. Once you're a member, posts in the space flow:
   `your HA → relay → every other member's HA`. The relay is on
   the path for every message and reaction; it doesn't drop out
   after introductions.

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
- Your local Home Assistant **does** keep the messages readable
  after opening them. That's how you can search and browse your
  own history.
- A new member who joins later only receives messages posted
  after they join. Earlier history isn't retroactively shared —
  members handle their own backups locally.
- Every time the membership changes, the space gets a new key.
  Someone who left can't read anything posted after they left.

## What happens if the relay is down?

The relay is the post hub for public and global spaces, so while
it's down, posts to those spaces wait. Nothing is silently
dropped: your household keeps retrying — after a few seconds,
then half a minute, then a couple of minutes, then every ten —
and the relay, once it's back, still holds up to a day's worth
of sealed envelopes for members who were offline. Your local
copy is saved on your HA the moment you press send.

In practice this matters when:

- Your relay is having an outage. Members talking to _each
  other_ in the space won't see new posts until it's back.
- You depend on a single project-run relay. Connecting your
  household to a second relay (or running your own) is the
  cure.

Connecting your space to **multiple relays** is supported and
encouraged for resilience. Posts go out via every relay you've
connected.

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

## What changes vs other space scopes

| Behaviour           | Private / household                         | Public / global                                               |
| ------------------- | ------------------------------------------- | ------------------------------------------------------------- |
| Visible to          | invited / household members only            | on the relay's map; anyone connected to it can find           |
| Joining             | invite or household membership              | open / request / invite link — host picks per space           |
| How posts travel    | direct, household-to-household              | through the relay to every member, every time                 |
| What the relay sees | nothing (no relay, unless you switch it on) | routing data and a sealed, padded envelope — never content    |
| Encryption          | **always on**                               | **always on**                                                 |
| Where messages live | each member's HA                            | each member's HA (relay never stores content)                 |
| If relay is offline | n/a                                         | posts wait and retry; relay holds a day's envelopes when back |
| Visible to peers    | members only                                | members only — never leaks to your paired-household graph     |
| Can be turned off   | yes, by admin vote                          | yes — un-publish by admin vote; the relay forgets             |

## Privacy in global spaces

Public and global spaces stay walled off from the rest of your
federation. They don't show up to your paired households, they
don't get included in any household-level sync, and information
posted in one space never bleeds into another (or into your
private spaces). The space is a deliberate scope: members only,
on the relay you chose. What the relay can and can't see is
spelled out on the [privacy model](/docs/privacy/) and
[security model](/docs/security/) pages.
