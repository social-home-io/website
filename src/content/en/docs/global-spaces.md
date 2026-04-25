---
title: Global spaces
description: Discoverable rooms that span households who don't already know each other — coordinated by a relay you can trust (or run yourself).
order: 40
---

Most spaces in Social Home are private — invited households
only. But some communities are open by nature: a neighbourhood
marketplace, a city-wide running club, a public-domain book
club. For those, Social Home has **global spaces**.

## What a global space is

A global space lives on a small relay server that any household
can subscribe to. The relay knows two things:

1. **Which households exist** in the directory (their public
   keys + reachable URLs).
2. **Which spaces those households opted in to publishing.**

That's it. The relay never sees your messages. When a household
finds an interesting space, it pairs directly with the host
households the same way it would with a friend — once paired,
all space traffic flows peer-to-peer.

> Think of the relay as a community noticeboard. The notices
> on it are short — "this household runs a public bouldering
> space, here's how to reach them" — and the conversation
> happens off the board, between the people who saw it.

## How discovery works

1. A household marks a space as **discoverable** and points it
   at a relay URL.
2. The relay receives a signed announcement: _"household X has
   a public space called Y, here's how to reach household X."_
3. Anyone browsing the relay sees the space; if they join, the
   relay introduces their household to X's household, and the
   two pair.
4. From that point on, the global-space conversation flows
   directly between the joined households — no relay traffic.

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
Compose + Cloudflare guide that takes about 15 minutes.

## What changes vs private spaces

| Behaviour           | Private space                  | Global space                        |
| ------------------- | ------------------------------ | ----------------------------------- |
| Visible to          | only households you invited    | anyone browsing the relay           |
| Discovery           | direct pairing only            | relay announcement                  |
| Encryption          | optional, end-to-end available | optional, end-to-end available      |
| Where messages live | each member's HA               | each member's HA                    |
| What the relay sees | nothing                        | metadata only — public keys, URLs   |
| Can be turned off   | yes, instantly                 | yes — un-publish; the relay forgets |

End-to-end encryption is _available_ on global spaces but off
by default — most public communities want their conversation to
be searchable inside their own HA. For sensitive global spaces
(adoption groups, support communities), turn E2EE on per space
in Settings.
