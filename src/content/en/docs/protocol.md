---
title: How it works
description: A plain-language tour of what Social Home does, what stays on your server, and how households connect — without any protocol jargon.
order: 20
---

Social Home turns your Home Assistant into the household OS your
phone never managed to be: shared calendars, a live shopping
list, photos, voice notes, presence, and chat — all running on
hardware you already own. It also lets your household connect to
other households the same way you'd add a friend on any other
network, only without giving anyone's data to a company in the
middle.

This page walks through what you can actually do with it. No
acronyms.

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
  before you reach the checkout. Ask HA's voice assistant to add
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
- **💬 Message your family across the world** — end-to-end
  encrypted, direct from your Home Assistant to theirs. No
  phone numbers. No account on a third-party service.
- **🏘 Build your own community, your way** — create a Space for
  any group: your street, apartment building, sports team, or
  maker club. Organise a neighbourhood BBQ, run a book club —
  in a private place that no big tech company can read,
  monetise, or shut down. Everyone keeps their own server.
- **🔨 Run a marketplace** — list things you want to give away or
  sell to people you already know. No strangers, no platform
  fees.
- **🎙 Transcribe a voice note** from HA's microphone and post it
  to the feed — useful when your hands are full.

## Your data stays yours

Everything Social Home knows lives on your Home Assistant. The
photos, the messages, the shopping list, the calendar entries —
all in a small SQLite database in `/data` on your machine.
There is no cloud account, no analytics, no advertising network,
no remote logger watching what your household says. If your
internet goes down, the household features keep working on your
LAN; the only thing that pauses is messaging _outside_ the house.

## Connecting with other households

You connect two Home Assistants by scanning a QR code. After
that, the two servers know each other and can carry direct
messages and shared spaces between them. The QR code carries a
public key — like a digital ID card — that lets the other side
verify it's still you, even if your address changes later.

What you share with a paired household: your display name, your
avatar, and the spaces you join together.

What you never share: passwords, emails, your location history,
or anything that lives in a space you didn't both join.

## Spaces — shared rooms for any group

A Space is a shared feed, chat, and calendar for any group of
people, across any number of households. Think:

- **Family** — the people in your house, plus parents and
  siblings on their own Home Assistants.
- **Eichenstrasse 3–17** — your apartment block. Everyone runs
  their own server; the space is the shared notice board.
- **Book club**, **bouldering crew**, **maker space** — the
  recurring groups that already exist in your life, just not on
  any platform that's worth trusting.

You decide who sees a space. You decide which households are
invited. The space exists across all of them simultaneously and
no single host owns it.

## Global spaces

Some spaces are private to invited households. Others — like a
public marketplace, a hobby community, or your neighbourhood
notice board — are _global_: anyone can discover them. A
lightweight relay server helps households find each other when
they don't already know one another. The relay never reads your
messages. It just helps two servers shake hands; once they do,
the conversation goes directly between them.

## End-to-end encryption

For sensitive spaces, messages are sealed on your device and
can only be read by members. Even the global relay can't see
inside. Think of it like an envelope that only the people on
the guest list have keys for — the postal service routes it,
but never opens it.

## Privacy at a glance

- ✅ Messages encrypted in transit and at rest
- ✅ No ads, no tracking, no analytics
- ✅ GPS is opt-in per device
- ✅ Your server, your rules
- ✅ Open source under MPL 2.0

## How connections work (for the curious)

Each Home Assistant running Social Home generates a unique
cryptographic identity on first boot — the equivalent of a
digital ID card. When two households pair, they exchange these
IDs and verify each other's signatures whenever a message
arrives. After that one-time handshake, the two servers can
talk directly: a message you send to your sister appears on her
HA the same second, with no relay in the middle.

If a household's address changes (you move, your IP rotates, or
you switch to a domain), the new address is announced to all
its paired households automatically — your sister's HA notes
the move and keeps the connection alive.

## Running a global space relay

If you want to host a discovery relay for a community, it's a
small Python server that runs on a VPS — see
[run a relay yourself](/docs/running-a-gfs/). Open source,
licensed MPL 2.0, no fees.
