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

If you use the Home Assistant app, it is part of your normal Home Assistant backup;
Docker and Python installs get a Recovery Kit (`.shrk`, scrypt +
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
exists) are taken by all its admins together. If the owner allows
it, admins from other households can also act while the host is
offline.

## Public and global spaces

Some spaces are private to invited households. A _public_ space
is one your paired households can find and ask to join; it stays
inside your own circle. A _global_ space — a public marketplace,
a hobby community, a neighbourhood notice board — is for
strangers too: the owner picks one or more lightweight relays,
GFSs (Global Federation Servers), that list it so households who
don't know each other can find it (see [GFS](/docs/glossary/#gfs)).

Paired households always get a space's posts directly or over
the mesh. The relay only carries posts to households you aren't
paired with — followers, members who joined with a GFS link, and
households that asked to join through it — as sealed, padded
envelopes, each into that household's anonymous mailbox. Every
listed GFS gets every post.
It can't read a word, and members post
anonymously. More in
[Global spaces](/docs/global-spaces/).

<details class="tech">
<summary>Under the hood</summary>

Only a global space is ever listed on a GFS, and only on the GFSs
in its owner-signed `gfs_servers` list (at most 8). Public spaces
reach paired households as a `SPACE_DIRECTORY_SYNC` snapshot and
never touch a GFS. Members publish anonymously to every
listed GFS. The GFS sees routing
metadata only (`space_id`, `event_type`, size bucket, timing,
subscriber set, source IP); publishes are always identity-free,
signed with a shared per-epoch writer key. Households reached
through a GFS get one anonymous mailbox per GFS. Sealed envelopes
wait up to 24 h; encrypted pictures are cached up to 3 days
(operator setting, at most 7). Nothing else is stored.

</details>

## Built to keep going

Social Home has no centre. Every household is its own server, at
home, and keeps a full copy of the spaces it's in. Households you've
paired with talk to each other directly. GFSs carry sealed posts to
households you aren't paired with, and a space can use up to eight of
them. So there is
no single machine whose failure takes the network down, and no
single place where everything could be read.

<figure class="map">
  <img src="/docs/how-it-works/network-map-en.webp" alt="A world map with households spread across Europe, the Americas, Africa, Asia and Australia. Solid green lines join paired households directly. Dotted lines lead from other households to three GFSs, one in northern Europe, one in North America and one in South-East Asia. The Asian GFS is greyed out with a cross, and red dashed arrows show its households moving to the European GFS. One household in Greece is faded with a moon: the host is offline, and the other households carry on." width="1600" height="890" loading="lazy">
  <figcaption>Paired households talk directly. GFSs carry sealed posts to the rest. When a GFS or a host is away, the others carry on.</figcaption>
</figure>

What happens when something breaks:

- **Your internet goes down.** The household keeps working on your
  home network: calendar, lists, chat in the house. What you post
  to other households waits at home and goes out when you're back.
- **Another household is offline.** Nobody else notices. When it's
  back, it catches up from any member of each space, not only from
  the host.
- **The host of a space is offline.** Members still post to each
  other. Any member can fill in what someone missed, and if the
  owner allows it, admins from other households can keep running
  the space.
- **A GFS goes down.** Paired households don't notice. Spaces listed
  on several GFSs carry on through the others, and after about ten
  minutes households move to another GFS they're connected to.
  Sealed posts wait up to a day for households that were away.
- **A GFS operator can't be trusted.** They can't read a post, can't
  tell who wrote it, and can't forge or change one: every post is
  signed by the household that wrote it and checked at the other
  end. Your identity and your posts live at home, so you connect to
  another GFS and carry on.
- **The Social Home project goes away.** Your home keeps running. The
  GFS is open source, anyone can run one, and households can connect
  to any GFS that lets them in.

<details class="tech">
<summary>Under the hood</summary>

Each household stores its spaces in its own database and signs what
it sends with its Ed25519 identity key; space admin actions are
signed with the space's authority key. Posts are sealed with
AES-256-GCM under a per-space key that rotates whenever someone
leaves. Delivery retries with backoff (5 s, 30 s, 2 min, 10 min) and
the GFS queues sealed envelopes for 24 h. Members catch up against a
signed **sync page** (256 bucket hashes over the space's rows) and
accept rows from any member only if the page vouches for them. A
household's mailbox moves to another listed GFS when its own stays
down for 10 minutes. Residuals: a GFS sees internet addresses,
timing and sizes; a member that no GFS of the space reaches is
reached through the host; public highlight links open in a viewer
hosted on GitHub Pages. The full list is on the
[security model](/docs/security/) page.

</details>

## How this differs from other decentralised networks

In many decentralised networks, decentralisation stops at the
server. Someone runs a server, people make accounts on it, and the
servers talk to each other. That spreads the network over many
servers, but each person still depends on one of them: if it goes
down, its people are offline; if its operator closes it, their
accounts and history go with it; and the operator can read what's
stored there unless the app seals it for the recipients.

Social Home takes decentralisation one step further, down to each
household. The server is your home. Your account, your keys and your
copy of every space live there, and nowhere else. The relays in
between, the GFSs, are helpers, not homes: they hold nothing they
can read, they can't speak for you, and they can be swapped.

|                            | Server-based federation                     | Social Home                                               |
| -------------------------- | ------------------------------------------- | --------------------------------------------------------- |
| Where your account lives   | on someone else's server                    | in your home                                              |
| Who can read what's stored | the server's operator, unless it's sealed   | your household, and the members of a space for that space |
| If a server goes down      | everyone on it is offline                   | only that one household is; the others carry on           |
| If an operator quits       | accounts and history go with it             | a GFS held nothing it could read; connect to another one  |
| Changing server            | move your account, if both servers allow it | connect to another GFS; your home stays where it is       |

The trade-off is honest: your home has to be on for others to reach
it directly, and a household that's off for a while catches up when
it's back. That's what the Home Assistant app is for: it runs Social
Home on a machine that's on anyway.

## Public highlight links

The same kind of relay also has a second job: handing off a
single highlight to people outside Social Home. When you publish
a highlight link, your household makes a link to the
[Social Home viewer](/docs/glossary/#viewer) — a page no relay
serves — that anyone can open in a browser. The highlight bytes
flow directly from your home to the visitor's browser, sealed so
that only that browser can open them. If that direct path can't
be made, the relay passes the sealed frames through only while
you're online, and stores none of them. See
[Highlights](/docs/highlights/#sharing-publicly-via-a-global-server)
for the author-facing flow.

<details class="tech">
<summary>Under the hood</summary>

WebRTC-direct from the author's home to the browser; HTTP
pass-through as fallback only while the author is online. Every
frame is sealed to the viewer's ephemeral key and the link secret
in the URL fragment. Zero highlight bytes are stored on the GFS,
and the GFS serves none of the viewer's code.

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
