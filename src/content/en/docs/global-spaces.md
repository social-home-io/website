---
title: Global spaces
description: Discoverable rooms for households who don't already know each other — coordinated by a relay you can trust (or run yourself).
order: 40
---

Most spaces in Social Home are private — invited households only.
But some communities are open by nature: a neighbourhood
marketplace, a city-wide running club, a public-domain book club.
For those, Social Home has **global spaces**.

## What a global space is

A global space lives on a small relay server — a **Global
Federation Server**, or **GFS** — that any household can subscribe
to. The relay does two jobs:

1. **It's a directory.** It lists which spaces have been published
   to it, who hosts them, and how to join.
2. **It's the post hub.** Once you're a member of a global space,
   every post you write goes through the relay, which fans it out
   to every other household subscribed to that space.

The relay never sees the _contents_ of your posts. Every post is
encrypted on the way out of your Home Assistant and only decrypted
on each member's Home Assistant when it arrives. The relay sees
only the encrypted envelope — sender instance, target space, size
— and forwards it on. It can't decrypt; it doesn't store; it
**relays and forgets** (technically: fire-and-discard, no copy
kept).

> Think of the relay as the post office for an open community.
> The post office sees who sent what package and who it's for,
> but the package itself is sealed — only the people on the
> guest list have keys to open it.

## How discovery and posting work

1. A household creates a space and **publishes** it to a relay.
   The relay receives the space's name, description, cover
   image, age policy, accent colour — enough to put it on a
   public listing — but **no message content**.
2. Anyone whose Home Assistant is paired with that same relay
   can browse the listing, find the space, and ask to join.
3. Whether the join is granted depends on the space's
   **join mode**, which the host picks when creating it:
   - **Open** — anyone can join immediately.
   - **Request** — the host's instance reviews and approves.
   - **Invite only** — joining requires an invite from a
     member.
   - **Link** — anyone with the invite link can join.
4. Once you're a member, posts in the space flow:
   `your HA → relay → every other subscribed HA`. The relay is
   on the path for every message and reaction; it doesn't drop
   out after introductions.

## Encryption is always on

Every post in every space — global or private — is **always**
encrypted in transit. There is no "encrypted / not encrypted"
toggle in Social Home. From v1.0, the spec
([§4.1.10](https://github.com/social-home-io/socialhome/blob/main/spec_work.md))
calls it: _"every content event is always encrypted; there is no
opt-out."_

What that means in practice:

- The relay can't read your messages, photos, or voice notes —
  even if the operator wanted to. It only sees the sealed
  envelope.
- Your local Home Assistant **does** store the messages in
  plaintext after decryption. That's how you can search and
  browse your own history.
- A new member who joins later only receives messages posted
  after they join. Earlier history isn't retroactively shared —
  members handle their own backups locally.

## What happens if the relay is down?

The relay is the post hub for global spaces, so when it's down,
posts to that space don't go through. Social Home **doesn't
queue and retry** — if your message can't be relayed at the
moment you press send, it's dropped from the federation path
(`fire-and-discard`, by design — keeps the relay simple and
prevents replay loops). Your local copy is still saved on your
HA so you don't lose what you wrote; you can re-send.

In practice this matters when:

- Your relay is having an outage. Members talking to _each
  other_ in the space won't see new posts until it's back.
- You depend on a single project-run relay. Subscribing your
  household to a second relay (or running your own) is the
  cure.

Pairing your space with **multiple relays** is supported and
encouraged for resilience. Posts go out via every relay you've
subscribed to.

## Connect to a ready-made relay

The Social Home project runs two free relays you can connect to
immediately:

- **[Community GFS](/servers/)** —
  `gfs-community.social-home.io`. Moderated, reviewed within
  24 h. Great for neighbourhood groups, clubs, families.
- **[Open GFS](/servers/)** — `gfs-open.social-home.io`.
  Unmoderated, instant publishing. For developers and niche
  communities.

Or [run your own](/docs/running-a-gfs/) on any VPS in 15 minutes.

## Running a relay

A relay is a small Python server (open source under MPL 2.0).
You can host one for your neighbourhood, your city, or a
specific community. See
[Run a relay yourself](/docs/running-a-gfs/) for a Docker
Compose + Cloudflare guide.

## What changes vs private spaces

| Behaviour           | Private space                     | Global space                                                    |
| ------------------- | --------------------------------- | --------------------------------------------------------------- |
| Visible to          | only households you invited       | listed on the relay's directory; anyone paired with it can find |
| Joining             | by invite, household-to-household | open / request / invite-only / link — host picks per space      |
| How posts travel    | direct, household-to-household    | through the relay to every subscriber, every time               |
| What the relay sees | nothing (no relay involved)       | metadata only — encrypted envelope, never plaintext             |
| Encryption          | **always on**                     | **always on**                                                   |
| Where messages live | each member's HA                  | each member's HA (relay never stores)                           |
| If relay is offline | n/a                               | new posts drop until it's back                                  |
| Visible to peers    | members only                      | members only — never leaks to your paired-household graph       |
| Can be turned off   | yes, instantly                    | yes — un-publish; the relay forgets                             |

## Privacy in global spaces

Global spaces stay walled off from the rest of your federation.
They don't show up to your paired households, they don't get
included in any household-level sync, and information posted in
one global space never bleeds into another (or into your private
spaces). The space is a deliberate scope: members only, on the
relay you chose.
