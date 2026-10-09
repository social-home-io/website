---
title: "A chat on the feed, a safety net for pairs, and lighter syncs"
description: Every household and every space gets its own chat, paired households can fall back to the GFS when no direct path reaches them, and space sync sends only what changed. In Social Home 2026.10.8 and 2026.10.9.
date: 2026-10-09
author: The Social Home team
image: /blog/2026-10-chat-sync/household-chat.png
imageAlt: The household feed with its Chat tab open, showing messages from family members, an @mention and a New messages divider
order: 50
---

Two releases in two days, and three changes you'll notice in
everyday life: your household gets a chat right on the feed, paired
households keep reaching each other when the direct line is down,
and keeping shared spaces up to date costs a lot less.

_All screens below show sample data._

## A chat for the whole household

"Dinner is ready." "Can someone check the heating?" "Pizza Friday?"
Not every message is worth a post. The feed now has a
**Feed | Chat** switch at the top, and behind it is one chat that
everyone in your household can read. It works like any group chat:
@mentions, reactions, edits, attachments and a **New messages** line
where you left off. You can mute it or only be notified when someone
mentions you.

The household chat never leaves your home. It isn't sent to paired
households, and it doesn't clutter your Chats inbox. An admin can
switch it off under household settings; then the feed looks exactly
as it did before.

<div class="shots">
<figure class="desk"><a href="/blog/2026-10-chat-sync/household-chat.png"><img src="/blog/2026-10-chat-sync/household-chat.png" alt="The household feed with its Chat tab open, showing messages from family members, an @mention and a New messages divider" width="1280" height="720" loading="lazy"></a><figcaption><b>Feed | Chat</b>One chat for everyone at home, one tap away from the feed.</figcaption></figure>
<figure class="phone"><a href="/blog/2026-10-chat-sync/space-chat-phone.png"><img src="/blog/2026-10-chat-sync/space-chat-phone.png" alt="A space's chat on a phone, with messages from members of three different households, an edited message and a deleted reply" width="390" height="844" loading="lazy"></a><figcaption><b>Chat in a space</b>Members from three households, one conversation.</figcaption></figure>
</div>

**Spaces get the same switch.** Every space now has a chat shared by
its members across households — the book club can agree on the next
date without a post for it. Followers of a space don't see the chat
and don't receive it. By default it only notifies you when someone
mentions you, the space's moderators can remove any message, and an
archived space keeps its chat readable but closed. For now space chat
is text only. The owner can switch it off in the space's settings.

<details class="tech">
<summary>Under the hood</summary>

The household chat is a regular group DM with a household scope:
it reuses messages, mentions, reactions, mute and read state, but
outbound fan-out skips it and every inbound `DM_*` handler refuses
its id. Space chat travels as four new federation events
(`SPACE_CHAT_MESSAGE_CREATED`, `_UPDATED`, `_DELETED`,
`SPACE_CHAT_REACTION`, protocol v55), sealed like all other space
events, and is delivered only to households holding a writer seat.
Households below v55 are skipped. New members catch up through
space sync, including deletions.

</details>

## Paired households get a safety net

Paired households talk to each other directly. When that direct path
fails — a router acting up, an address that changed, a household
without an outside address at all — messages used to wait in the
outbox until it came back.

Now you can let the [GFS (Global Federation Server)](/docs/glossary/#gfs)
step in as a **fallback**. It's **off by default** and set per
connection, under **Connections → Manage**. Both households have to
turn it on, and their homes find a GFS they both use without telling
each other which ones they're connected to. When pairing, the new
**How can they reach you?** choice lets a household without an outside
address pair through the GFS. Once it gets an address later, the pair
switches to direct by itself.

The GFS is only used when the direct path fails, and everything it
carries stays sealed. It can see when and how much your two households
exchange, and that you are paired — never what you say. That's why
the app keeps calling a direct address the more private choice.

<div class="shots">
<figure class="desk"><a href="/blog/2026-10-chat-sync/gfs-fallback.png"><img src="/blog/2026-10-chat-sync/gfs-fallback.png" alt="Manage panel for a paired household with Use the GFS as a fallback ticked, saying it can be reached through 1 GFS both households use, and what the GFS can see" width="1280" height="720" loading="lazy"></a><figcaption><b>One switch per connection</b>The status line says whether it works, and the note says what the GFS sees.</figcaption></figure>
</div>

One more change on the GFS side: the welcome tour's **Connect to the
GFS** box now starts ticked. Untick it to stay off the GFS; you can
connect or disconnect any time in Connections.

<details class="tech">
<summary>Under the hood</summary>

Paired traffic tries the WebRTC DataChannel first, then the HTTPS
inbox, and only on a network error or 5xx (or with no URL at all)
round-robins over the pair's GFS routes. A 4xx never falls through.
The GFS only sees `{to_instance, sealed}`. Shared GFSes are found by
sending a nonce probe through each of our own GFS connections; a
route is recorded only when the ack comes back through the same GFS,
so a GFS replaying a probe elsewhere creates nothing. Routes are
re-probed every 24 h and expire after 72 h. Protocol v53 (routes) and
v54 (key exchange for existing pairs).

</details>

## Syncs send only what changed

Every half hour, your home checks in with the other households in
your spaces to make sure nobody missed anything. Until now, that meant
re-sending every recent post, comment and photo record, every time.
Now each household sends only what changed since the last sync the
other side confirmed. A quiet space costs almost nothing.

Two things got more reliable along the way:

- **Deletes reach everyone.** A deleted post, comment, sticky note,
  event, photo or zone now reaches households that were offline when
  it happened, instead of quietly coming back later.
- **A restored backup catches up.** A household restored from an
  older backup gets the missing changes at the next sync, without
  anyone pressing **Sync now**.

What a sync carries is no longer cut off at fixed numbers. The
space's own retention period decides how far back it reaches.

<details class="tech">
<summary>Under the hood</summary>

SQLite triggers stamp every synced row with a per-household counter
(`sync_seq`), so no write path can forget. The sender keeps a
watermark per household and only advances it after a stream the
receiver reports as `clean`, so a failed chunk comes again next time.
A restored household echoes the last snapshot it applied
(`have_seq`); the sender streams from the lower of the two and never
trusts a value above its own. A full stream still runs at pairing,
on join, on **Sync now**, after a shape change and at least once a
day. Deletions travel as content-free tombstones and are applied with
the same authority as a live delete. No protocol bump.

</details>

## Try it

The GFS fallback is in **Social Home 2026.10.8**; the chats and the
lighter sync are in **Social Home 2026.10.9**. Both households need the
new version for the fallback and for space chat. Want to know more
about how households reach each other? Read
[Households, federated](/docs/federation/).
