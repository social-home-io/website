---
title: How it works
description: A plain-language tour of what Social Home does, what stays on your server, and how households connect — without any protocol jargon.
order: 20
---

Social Home gives your home the household OS your
phone never managed to be: shared calendars, a live shopping
list, photos, voice notes, presence, and chat — all running on
hardware you already own. It also lets your household connect to
other households the same way you'd add a friend on any other
network, only without giving anyone's data to a company in the
middle.

This page walks through what you can actually do with it. No
acronyms in the main text; the technical detail sits in the
"Under the hood" blocks, and the words are in
[Words we use](/docs/glossary/).

## What can I do with it?

Stay connected with the people who matter — without giving your
data to anyone else. Here's what Social Home lets you and your
household do:

- **📸 Share a photo of dinner** on your household feed. Your
  partner sees it instantly on their phone, your flatmates can
  react and comment — all without it going through any cloud
  service.
- **🗓 See everyone's calendar in one place.** Your personal
  calendar, your flatmate's schedule, and the shared "House"
  calendar overlay in one colour-coded view. Events stay on your
  server.
- **🛒 Shout "I'm at the supermarket — anything needed?"** Your
  household shopping list is live. Someone adds milk, you see it
  before you reach the checkout. Ask your voice assistant to add
  it by speaking.
- **🔔 Know when people are home** without asking. A quiet
  presence indicator shows who's around right now — no location
  tracking, no history, just the current moment.
- **✅ Split chores instead of nagging.** Task lists with
  assignees, deadlines, and an overdue badge. Drill the
  bookshelf this weekend; recycle the old fridge today;
  everyone sees who has what.
- **📒 Keep the house manual in one place.** Pages are
  Markdown wiki entries that live inside a Space — how to
  bleed the radiators, where the meter readings go, the
  babysitter handover. They sync across every household device.
- **📝 Stickies for the things that don't deserve a page.**
  Colourful tap-to-edit notes pinned to a Space canvas — the
  modern fridge magnet. Carrots in the bottom drawer; birthday
  gift ideas; the doorbell-fix shopping list.
- **💬 Message your family across the world** — sealed from your
  home to theirs, with no cloud in between. No phone
  numbers. No account on a third-party service.
- **📞 Call without a stranger in the middle** — voice and video
  calls, 1:1 or with a group, straight from your DMs and group
  chats. The audio and video flow directly between participants;
  if a direct connection can't be made, a relay passes the
  stream through but only ever sees encrypted media.
- **🏘 Build your own community, your way** — create a Space for
  any group: your street, apartment building, sports team, or
  maker club. Organise a neighbourhood BBQ, run a book club —
  in a private place that no big tech company can read,
  monetise, or shut down. Everyone keeps their own server.
- **🔨 Run a marketplace** — list things you want to give away or
  sell to people you already know. No strangers, no platform
  fees.
- **🎙 Transcribe a voice note** from a microphone in the house
  and post it to the feed — useful when your hands are full.

<details class="tech">
<summary>Under the hood</summary>

Calls are WebRTC with DTLS-SRTP between participants; a TURN
fallback relays ciphertext only. Direct messages are encrypted
server-to-server (AES-256-GCM envelopes, Ed25519 signatures).

</details>

## Your data stays yours

Everything Social Home knows lives in your home, on your own
server. The
photos, the messages, the shopping list, the calendar entries —
all in a small database on your machine. There is no cloud
account, no analytics, no advertising network, no remote logger
watching what your household says. If your internet goes down,
the household features keep working on your LAN; the only thing
that pauses is messaging _outside_ the house.

<details class="tech">
<summary>Under the hood</summary>

If you installed the add-on, it is part of your normal Home Assistant backup;
standalone installs get a Recovery Kit (`.shrk`, scrypt +
AES-256-GCM) for the keys.

</details>

## Connecting with other households

You connect two homes by scanning a QR code — in the
app it's called **pairing**. After that, the two servers know
each other and can carry direct messages and shared spaces
between them. The QR code carries a public key — like a digital
ID card — that lets the other side verify it's still you, even if
your address changes later.

What you share with a paired household: your display name, your
avatar, and the spaces you join together.

What you never share: passwords, emails, your location history,
or anything that lives in a space you didn't both join.

<details class="tech">
<summary>Under the hood</summary>

Each household generates an Ed25519 identity key on first start.
Pairing is X25519 + HKDF-SHA256, authenticated by the QR code or
a short spoken code. Every incoming envelope's signature is
checked against the pairing; a bad signature is dropped, and
there is no trusted-instance mode to bypass that.

</details>

## Spaces — shared rooms for any group

A Space is a shared feed, chat, and calendar for any group of
people, across any number of households. Think:

- **Family** — the people in your house, plus parents and
  siblings in their own homes.
- **Eichenstrasse 3–17** — your apartment block. Everyone runs
  their own server; the space is the shared notice board.
- **Book club**, **bouldering crew**, **maker space** — the
  recurring groups that already exist in your life, just not on
  any platform that's worth trusting.

You decide who sees a space. You decide which households are
invited. Every space has a host household — the one that created
it and keeps the member list — but members post straight to each
other, and the big decisions (who can see it, whether it still
exists) are taken by all its admins together.

## Public and global spaces

Some spaces are private to invited households. A _public_ space
is one your paired households can find and ask to join; it stays
inside your own circle. A _global_ space — a public marketplace,
a hobby community, a neighbourhood notice board — is for
strangers too: a lightweight relay, the GFS (Global Federation
Server), lists it so households who don't know each other can
find it (see [GFS](/docs/glossary/#gfs)).

Paired households always get a space's posts directly or over
the mesh. The relay only carries posts to households you aren't
paired with — followers, and members who joined with a GFS link —
as sealed, padded envelopes. It can't read a word. By default it knows
which household posted and when; a space can switch to strict
mode, where it doesn't even know who. More in
[Global spaces](/docs/global-spaces/).

<details class="tech">
<summary>Under the hood</summary>

`PUBLIC_SPACE_TIERS = {public, global}`: only these may relay to
a GFS. A global space is published to every connected GFS
automatically; a public space only when an admin publishes it by
hand. Public spaces reach paired households as a
`SPACE_DIRECTORY_SYNC` snapshot, never via a GFS. The GFS sees routing
metadata only (`space_id`, `event_type`, size bucket, timing,
subscriber set, source IP); strict mode makes publishes
identity-free. Offline members are queued 24 h; nothing else is
stored.

</details>

## Public highlight links

The same kind of relay also has a second job: handing off a
single highlight to people outside Social Home. When you publish
a highlight link, the relay mints a URL that anyone can open in a
browser — but the highlight bytes flow directly from your home
server to the visitor's browser. If that direct path can't be
made, the relay passes the frames through only while you're
online, and stores none of them. See
[Highlights](/docs/highlights/#sharing-publicly-via-a-global-server)
for the author-facing flow.

<details class="tech">
<summary>Under the hood</summary>

WebRTC-direct from the author's server to the browser; HTTP
pass-through as fallback only while the author is online. Zero
highlight or moment bytes are stored on the GFS.

</details>

## Encryption, always on

Every message that leaves your server is sealed in an envelope
only the receiving households can open — always, with no switch
to turn it off and no plaintext fallback. Even the relay can't
see inside. Think of it like an envelope that only the people on
the guest list have keys for — the postal service routes it, but
never opens it. The
[security model](/docs/security/) page says exactly what that
does and doesn't cover.

## Privacy at a glance

- ✅ Every message encrypted on the wire — always on, no opt-out
- ✅ No ads, no tracking, no analytics
- ✅ GPS is opt-in per device
- ✅ Your server, your rules
- ✅ Open source under MPL 2.0

## How connections work (for the curious)

Each home running Social Home generates a unique
cryptographic identity on first boot — the equivalent of a
digital ID card. When two households pair, they exchange these
IDs and verify each other's signatures whenever a message
arrives. After that one-time handshake, the two servers can
talk directly: a message you send to your sister appears in her
home the same second, with no relay in the middle.

If a household's address changes (you move, your IP rotates, or
you switch to a domain), the new address is announced to all
its paired households automatically — your sister's home notes
the move and keeps the connection alive.

## Running a global space relay

If you want to host a discovery relay for a community, it's a
small Python server that runs on a VPS — see
[run a relay yourself](/docs/running-a-gfs/). Open source,
licensed MPL 2.0, no fees.
