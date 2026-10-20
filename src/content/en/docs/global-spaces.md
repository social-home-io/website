---
title: Global spaces
description: When you need a GFS and when you don't — the four kinds of space, how the owner picks which GFSs list a global space, and what a GFS can and can't see.
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

## Do I need a GFS?

**Not for the people you know.** Once you've paired with a
household, everything you share with it travels directly from
your home to theirs, or across the mesh of households you both
know. Private, household and public spaces all work without a GFS.

You need a GFS when you want to reach households you **haven't**
paired with:

- **A global space** that strangers can find, follow or join.
- **Following or joining** someone else's global space.
- **A GFS link**, an invite that works without pairing first.
- **A private space** whose members can't all reach each other
  directly. The owner can switch the GFS on for it.
- **A safety net** for a paired household, used only when the
  direct path fails. It's off unless you switch it on.

## Four kinds of space

Each kind reaches a little further than the one before:

| Kind          | Who can find it                                | Does a GFS see it?                                           |
| ------------- | ---------------------------------------------- | ------------------------------------------------------------ |
| **Private**   | Only people you invite                         | No, unless the owner switches the GFS on and picks which GFS |
| **Household** | Everyone in your home, automatically           | Never                                                        |
| **Public**    | Households you're paired with, in **Discover** | Never                                                        |
| **Global**    | Anyone using one of the GFSs the owner picked  | Only the GFSs the owner picked                               |

A **public** space stays inside your own circle: your paired
households can find it and ask to join, and it never touches a
GFS. To list a space on a GFS, you make it **global**, and the
owner picks which GFSs list it. The rest of this page is about
global spaces.

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

Once a space is global, **which GFSs list it is the owner's call
alone**, with no vote. The owner can add or remove a GFS at any
time in the space's settings.

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

1. **It's a directory.** The owner picks which GFSs list the
   space, up to eight. Each one shows its name, who hosts it, how
   to join and, if the space has one, a map pin rounded to about
   11 m. Anyone using one of those GFSs can find it under
   **Discover › Global**.
2. **It carries posts to people you aren't paired with.** That
   means **followers**, households that read along without
   joining (only if the owner allows followers; it's off by
   default), and **members who joined with a GFS link**. Members
   you're paired with still get every post directly or over the
   mesh.

**Every listed GFS gets every post.** A member sends each post to
all the GFSs the owner picked, including ones their own household
never connected to. So a follower who only uses GFS B still sees
what a member posted while connected to GFS A, even while the
host is offline. A GFS a member never connected to only sees that
member's internet address and when they posted, never which
household they are.

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

Only a global space can be listed on a GFS; publishing a public
one answers `409 TIER_CHANGE_REQUIRED`. The owner's choice (at
most 8) travels to members as an owner-signed list
(`spaces.gfs_servers`) inside the encrypted `space_meta`; a
co-admin can relay it but not change it. Leaving global or
dissolving withdraws the space only from the GFSs that list it.
Public spaces reach paired households as a `SPACE_DIRECTORY_SYNC`
snapshot, never via a GFS. Members hold the writer group
key and send every item anonymously to every listed GFS
(`member-publish-anon`), over a cookie-less session pinned to the
listed address, after the GFS proves it holds the listed key.
Receivers dedupe by item id. Envelopes are AES-256-GCM, signed
with Ed25519. Padding buckets: 1 / 4 / 16 / 64 / 128 KiB (member
publish), plus 191 KiB for envelope relay. Offline recipients are
queued for 24 h, at most 2000 envelopes or 64 MiB per recipient.
Full detail on the [security model](/docs/security/#what-a-relay-sees)
page.

</details>

## Trusted or strict

The owner also chooses how members post through the GFS.

- **Trusted** (the default): members post anonymously, so the GFS
  can't tell which household posted.
- **Strict**: on top of that, the GFS can't even tell which
  households are allowed to write. Members and followers look the
  same to it.

<details class="tech">
<summary>Under the hood</summary>

Both modes hand every writer the per-epoch writer group key, so
every item goes out anonymously to every listed GFS. The host
relay is identity-free (`{space_id, event_type, payload}` on a
cookie-less session). In strict mode writers subscribe in the
same shuffled batch as followers. In both modes the GFS still
sees source IP, timing, the size bucket and the subscriber set,
and a GFS loses per-household bans for anonymous writers (per-IP
limits remain; the owner revokes a writer by rotating the key).

</details>

## How finding and joining work

1. The owner makes a space **global** and picks which GFSs list
   it. Each one gets the name, description, cover image, age
   policy and accent colour: enough to list it, but **no message
   content**. A space can also be global but not listed anywhere
   yet, until the owner picks a GFS.
2. Anyone using one of those GFSs can find it under **Discover ›
   Global** and ask to join, or follow it if the owner allows
   followers.
3. Whether a join is granted depends on the space's **join
   mode**: **Open** (anyone can join straight away), **Request**
   (an admin says yes) or **Invite only**. Invite links work
   alongside any of them.
4. Once you're in, posts travel from your home to every other
   member's home: directly or over the mesh for households you're
   paired with, through the listed GFSs for everyone else.

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

## What happens if a GFS is down?

Members you're paired with don't notice: their posts never went
through the GFS. If the space is listed on more than one GFS,
followers on the others don't notice either. Only households that
rely on the GFS that's down have to wait. Nothing is silently
dropped: your household keeps retrying (after a few seconds, then
half a minute, then a couple of minutes, then every ten) and the
GFS, once it's back, still holds up to a day's worth of sealed
envelopes for households that were offline. Your local copy is
saved at home the moment you press send.

That's the best reason to list a busy global space on two GFSs,
for example the project's one and one you run yourself.

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

| Behaviour           | Private / household / public                    | Global                                                             |
| ------------------- | ----------------------------------------------- | ------------------------------------------------------------------ |
| Who can find it     | invited people / your home / paired households  | anyone using one of the GFSs the owner picked                      |
| Joining             | invite, household membership, or join mode      | open / request / invite only, plus invite links                    |
| How posts travel    | directly or over the mesh                       | the same for paired members; through every listed GFS for the rest |
| What a GFS sees     | nothing (unless a private space switches it on) | routing data and a sealed, padded envelope, never content          |
| Encryption          | **always on**                                   | **always on**                                                      |
| Where messages live | each member's home                              | each member's home (a GFS never stores content)                    |
| If a GFS is offline | n/a                                             | the other listed GFSs carry on; posts retry                        |
| Can be turned off   | yes, by admin vote                              | remove a GFS any time (owner), or leave global (admin vote)        |

## Privacy in global spaces

A global space stays walled off from the rest of your household.
Information posted in one space never bleeds into another, or
into your private spaces, and a GFS only ever learns about the
global spaces it lists. What the relay can and can't
see is spelled out on the [privacy model](/docs/privacy/) and
[security model](/docs/security/) pages.
