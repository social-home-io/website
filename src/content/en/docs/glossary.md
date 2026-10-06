---
title: Words we use
description: The dozen words that come up everywhere in Social Home — household, space, scope, host, GFS, pairing and the rest — each explained in a paragraph.
order: 5
---

Social Home tries to use the same words in the app, in these docs
and in the code. This page is the short list. If a doc page uses
a term you don't recognise, it is almost certainly here — and
the technical detail on every page sits in a collapsible
"Under the hood" block you can skip or open as you like.

## Household

A household is one home running Social Home — one server,
usually installed as a Home Assistant add-on — and the
people who live behind it — you, your partner, the kids, the
flatmate. Everything a household does (the shopping list, the
calendar, the photos, the chat) is stored on that one server.
When these docs say "your household", they mean your server and
everyone with an account on it.

<details class="tech">
<summary>Under the hood</summary>

The code and the protocol spec call a household an _instance_.
The two readable addressing fields on every envelope,
`from_instance` and `to_instance`, are household ids.

</details>

## Pairing

Pairing is how two households get to know each other: you scan a
QR code (or type a short code out loud over the phone), and from
then your home and theirs can exchange direct
messages and share spaces. Pairing happens once per household
pair, and either side can remove it later under
**Settings → Connections**.

<details class="tech">
<summary>Under the hood</summary>

Pairing is an X25519 key agreement with HKDF-SHA256 key
derivation; the spoken code protects the exchange from being
hijacked. Each household's long-term identity is an Ed25519
signing key.

</details>

## Space

A space is a shared room for any group of people, across any
number of households: the family, the apartment block, the book
club. A space has a feed, a chat and a calendar, and its members
decide together who else gets in.

## Scope

A space's scope is who can find it and who can post in it. There
are four, each one a wider audience than the last:

- **Private** — members you explicitly invite.
- **Household** — the members of your own household.
- **Public** — listed on the map of a
  [GFS](#gfs) you are connected to, for anyone on that GFS to
  find.
- **Global** — published worldwide through your GFS.

Public and global spaces ride a GFS; private and household
spaces do not, unless a private space's owner switches the GFS
on for it (it is off by default). Changing a space's scope is a
decision for all of its admins — see
[Global spaces](/docs/global-spaces/#big-changes-take-a-vote).

## Host

Every space has a host household: the one that created it and
tallies the admin votes. The host is not a middleman — members
post straight to each other — but it is the place where the
member list lives.

## GFS

A GFS is a **Global Federation Server** — the relay that helps
households find each other when they don't already know one
another, and that carries the sealed posts of public and global
spaces. The Social Home project runs one; anyone can
[run their own](/docs/running-a-gfs/). A GFS sees sealed
envelopes and routing information, never the contents of a post.
What it can and can't see is spelled out on the
[security model](/docs/security/#what-a-relay-sees) page.

## GFS link and Local link

Both are invite links to a space. A **GFS link** works for
anyone — the person opening it doesn't need to be paired with
you, because the GFS makes the introduction. A **Local link** only
works for households you are already connected to, and never
touches a GFS at all.

## Follower

A follower is someone who reads a space without being a member
of it. Followers see what the space publishes, but they don't
post, and they don't get a vote. Membership roles run
owner → admin → moderator → member → follower.

## Key rotation (epoch)

Every space has a key that seals its posts. Whenever the
membership changes — someone joins, someone leaves, someone is
removed — the space gets a fresh key and starts a new _epoch_.
Someone who left can't read anything posted after they left.

<details class="tech">
<summary>Under the hood</summary>

Space content is sealed with a per-epoch AES-256-GCM key; the
epoch number is one of the few readable fields on an envelope,
so a member knows which key to use. The space's authority key
rotates separately whenever an admin is revoked.

</details>

## Sealed envelope

A sealed envelope is what actually travels between households.
The post, photo or calendar event inside is encrypted before it
leaves your home and is only decrypted in the receiving
home; the outside of the envelope carries just enough to deliver
it. Nothing ever leaves a household unsealed — if a space can't
seal, it doesn't send.

<details class="tech">
<summary>Under the hood</summary>

Envelopes are AES-256-GCM, signed with Ed25519. The only readable
fields are `event_type`, `from_instance`, `to_instance`,
`space_id` and `epoch`.

</details>

## Mesh

When two member households can't reach each other directly, a
post can hop through other members' servers to get there. Each
hop is sealed for the final recipient, so the households in
between carry the envelope but can't open it.

<details class="tech">
<summary>Under the hood</summary>

`SPACE_ROUTED` forwarding, at most three hops, sealed to an
ephemeral X25519 key of the recipient.

</details>

## Relay and TURN

A relay is any server that passes sealed envelopes between
households without being able to read them; in Social Home that
is the GFS. A **TURN** server is a different kind of relay used
only for voice and video calls, and only when a direct
connection between the two phones can't be made. It passes
through the encrypted media and sees nothing else.
