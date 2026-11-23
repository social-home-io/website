---
title: "A space that keeps going: more GFSs, and every member can fill you in"
description: Spaces now lean on every household and every GFS they use. Posts reach members on any of a space's GFSs, your household moves to another GFS when one is down, and you can see whether you have everything from a space and catch up from any member while the host is offline. In Social Home 2026.11.23.
date: 2026-11-23
author: The Social Home team
image: /blog/2026-11-sync/cover.webp
imageAlt: An illustration of five households linked to each other and to two GFSs. One GFS is greyed out with a cross, and a dotted arrow leads from it to the other GFS. The host household in the middle is faded with a moon next to it, while sealed envelopes keep travelling between the other households, three of them marked with a green tick
order: 50
---

Social Home has no centre. Every household keeps its own copy of the
[spaces](/docs/glossary/#space) it's in, at home. The
[GFS (Global Federation Server)](/docs/glossary/#gfs) carries sealed
posts to households you aren't paired with, and a space can use
several of them.

The last two releases build on that. A space now uses **every** GFS
its owner picked, not just one, and its members fill each other in.
When a GFS is down, when the host's home is updating, or when your
own home was off for the weekend, the space keeps going and you can
see that you have everything.

## A space on more than one GFS

The owner of a [global space](/docs/global-spaces/) can list it on up
to eight GFSs, for example the project's GFS and one a member runs at
home. Your posts now go straight to the members on **any** of those
GFSs, also ones your household never connected to. It's one upload
per GFS, however many members wait there.

So a member who only uses the second GFS gets your post as quickly as
everyone else, and the host doesn't have to pass it on.

<details class="tech">
<summary>Under the hood</summary>

A member's mailbox may sit on any GFS in the owner-signed
`gfs_servers` list. Two or more members on one GFS get one
`POST /gfs/envelope/multi` upload; a lone member gets
`POST /gfs/envelope`. Your own connection to a GFS is used first.
For a listed GFS you never connected to, your home uses a
cookie-less session pinned to the listed address, after the GFS
proves it holds the key the owner signed. A GFS that isn't on the
signed list gets no request at all.

The host still carries a post when no listed GFS can: the GFS isn't
on the list, it doesn't offer mailboxes, it failed three times in a
row, or the item is too large for the route. For 200 members on three
GFSs, a post is 3 uploads.

</details>

## When a GFS is down, your household moves

Your household receives a space's posts in one anonymous mailbox on
one GFS. If that GFS stays down for about ten minutes, and your
household is connected to another GFS the space is on, your home
opens a mailbox there and tells the other members. Their posts then
go to the new mailbox.

It doesn't jump back and forth. When the first GFS returns, your
household stays where it is, and only moves again if the second GFS
fails too. If it's your own internet that's down, nothing moves.

<details class="tech">
<summary>Under the hood</summary>

The check rides the mailbox's own reconnect backoff, so there is no
extra timer: the move lands 10 to 18 minutes into an outage, and only
toward a GFS that answers right now. The GFS that failed is marked
_demoted_ and ranked last from then on. Your member card for each
affected space gets a newer revision and goes to the host, which
passes it on with its next member list update; about 0.7 KB per space.
The choice survives a restart.

</details>

## The space tells you which GFS you're missing

To move to another GFS, your household has to be connected to it.
So a space now says, in its feed, when it's on a GFS your household
isn't connected to: "This space is also on _GFS name_. Connect for a
steadier connection." A household admin gets a **Connect** button
that opens the right GFS, and everyone else is told to ask one.

For admins who act for the owner (with **Let admins act for me**
on), every GFS of the space counts. Their household admins also get a
notification under **Needs you** until their household is connected
to all of them.

## Is everything here?

A space's settings now have a section called **Is everything here?**
It tells you, in a sentence:

- **Everything's here**, and when it was last checked.
- **Getting the latest…** while new posts come in.
- **Can't reach the host right now**, with how far you're up to date.
  What you post goes out once the connection is back.
- **Some posts may be missing**, only after two checks in a row
  didn't bring everything. Your home tries again every 30 minutes,
  and **Check now** asks right away.

When posts may be missing, the space gets a ⚠ in your spaces list.
Your own posts that are still waiting to go out show **Not sent yet**.
A space your household hosts never shows a warning: it has
everything by definition.

<details class="tech">
<summary>Under the hood</summary>

Every sync outcome is stored per space and turned into a state on
`GET /api/spaces/{id}` and the `space.sync_state` frame. **Check
now** is open to every member (not followers), three times an hour
per space. Admins get a **Details** view with the page comparison:
which page you matched, how many parts differ and who signed it.

</details>

## Catch up from any member

The host's home, or an admin acting for the owner, signs a short
summary of everything in the space now and then, and sends it to all
members.
Your home compares its own copy with that summary. If something is
missing, it can get it from **any** other member household, not only
the host.

Your home only keeps what the signed summary vouches for. A member
that sends something else, or something changed, gets nothing
past your home. So a member can help you catch up, but can't slip
anything in.

So after a weekend away, you catch up even if the host is offline
when you come back. Any member that was there can fill you in.

<details class="tech">
<summary>Under the hood</summary>

The summary is a **sync page**: 256 bucket hashes over every row of
the space, and a header (`space_id`, epoch, signer, sequence, row
count, root hash) signed with the space's authority key
(`page_suite: sha256-b256-c1`). The owner and admins holding the
space's signing key seal one at most every 15 minutes after a
change, and push it at most once an hour per space, sealed with the
space's content key: to paired members directly, to members behind a
GFS with one upload per GFS. A quiet space sends nothing.

A member compares its own bucket hashes with the newest page. For the
buckets that differ it asks any member household
(`SPACE_SYNC_BEGIN` with `buckets`), at most three per round and one
at a time. A row is applied only if its hash appears in a bucket
listing that hashes to the signed page. A member keeps about 9 KB per
space. In a busy space with 200 member households, the pages add
about 7% to the signer's upload.

</details>

## How it adds up

Put together, a space has many places to stand on:

- **Every member's home** holds the whole space and can fill the
  others in.
- **Every listed GFS** carries the posts, and households move between
  them when one fails.
- **Admins** can run the space while the owner is away, if the owner
  lets them.

You don't have to set any of this up. If you run a busy global
space, list it on two GFSs, for example ours and one you
[run yourself](/docs/running-a-gfs/), and connect your household to
both. Social Home does the rest.

## What it costs, plainly

- **A GFS you never connected to sees you deliver.** When your post
  goes to members on a listed GFS your household never connected to,
  that GFS sees your internet address, the time, the size and which
  mailboxes the post goes to. It never sees which household you are,
  or what you wrote.
- **A member not connected to any of the space's GFSs** is still
  reached through the host, so that member waits for the host.
- **A member can make you look again.** A member that sends wrong
  data can make your space say "Some posts may be missing". It can
  never make a missing post look present.
- **After a post is deleted while the host is away,** your space may
  not say "Everything's here" until the host is back.

## Try it

Posting to every GFS of a space and moving to another GFS arrived in
**Social Home 2026.11.21**. **Is everything here?** and catching up
from any member are in **Social Home 2026.11.23**. Update your home,
and check that your household is connected to every GFS your spaces
use. More in [Global spaces](/docs/global-spaces/).
