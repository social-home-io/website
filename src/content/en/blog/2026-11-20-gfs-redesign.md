---
title: "A new GFS: every member equal, and the GFS learns less"
description: Real households showed us where the GFS could do better, so we redesigned how it works. Every household gets its own anonymous mailbox, every member reaches every other member, posting is always anonymous, admins can keep a space running without the owner, and you can ask to join a global space without pairing. In Social Home 2026.11.19.
date: 2026-11-20
author: The Social Home team
image: /blog/2026-11-gfs/cover.webp
imageAlt: An illustration of a GFS as a green cabinet of small mailboxes with no names on them, only scrambled marks. Five households below send sealed envelopes along dotted paths into a few of the mailboxes, and one household holds two tickets
order: 50
---

The [GFS (Global Federation Server)](/docs/glossary/#gfs) is the relay
that helps households find each other. It also carries a
[space](/docs/glossary/#space) to households you aren't paired with:
the followers of a global space, and members who joined through a
**GFS link**.

Over the last weeks, many households have used the GFS in everyday
life: family spaces with grandparents in another town, clubs with
dozens of members, global spaces with followers all over the place.
That taught us three things:

- **Every member should be equal**, however their household reaches
  the space. Joining through a GFS link should give you the same
  space as being paired with the host.
- **A space shouldn't wait for its owner.** When the owner's home is
  updating or offline, the members should still reach each other, and
  admins should still be able to run the space.
- **The GFS should learn as little as possible.** Not what is posted,
  and not who posted it. Ideally not even which household it delivers
  to.

So we went back to the drawing board and redefined how a GFS
operates. The result is in **Social Home 2026.11.19**. Your posts are
still sealed from your home to theirs, and the GFS still can't read a
single one of them.

## Every household gets an anonymous mailbox

When your household is in a space through a GFS, it gets one
**anonymous mailbox** on that GFS. The host and every other member
drop sealed messages into it, and your home picks them up. The GFS
knows a mailbox only by a random-looking number. It doesn't know
which household owns the mailbox, which spaces it belongs to, or what
the messages say.

To open a mailbox, your home spends a **ticket**. It fetches a small
batch of tickets each day, and they are made so that the GFS can't
tell which household spent one. That keeps a busy GFS fair without
the GFS learning who is behind each mailbox.

You don't have to do anything for this. There is no setting, and
nothing in the app is called a mailbox. It just works.

<details class="tech">
<summary>Under the hood</summary>

One mailbox per household per GFS, shared by all its spaces there.
The keys come from a 32-byte mailbox root with HKDF-SHA256: an X25519
key to seal to and an Ed25519 key to claim with. The mailbox id is
`base32(SHA-256("sh-mbx-v1" ‖ sign_pk))`. The space id is not part of
the derivation, and two GFSs see unrelated mailboxes. Your household
announces its mailbox on a **member card** signed with its identity
key, so a host can drop a card but never forge one. A household only
accepts mailbox messages from members whose card it holds.

Registration (`POST /gfs/mailbox/register`) is anonymous with proof
of possession. The claim socket (`/gfs/mailbox/ws`) is separate from
the household's own socket. The GFS stores the mailbox id, its pinned
key and two day-rounded timestamps. It does not store a household id,
an address or a space. Tickets are Privacy Pass tokens (RFC 9576–9578,
blind RSA-2048, RFC 9474), at most 50 per household per day, with one
issuer key per 30 days. A ticket hides its household among every
household that fetched tickets under the same key.

</details>

## Every member reaches every member

With a mailbox for every household, members no longer go through the
host to reach each other:

- **Posts arrive while the host is offline.** Every member delivers
  straight to the others, also in private spaces.
- **Pictures and large pages arrive in one piece.** Households behind
  a GFS get the same pictures and the same long pages as paired
  households.
- **One upload, however many members.** A calendar event for 200
  households behind the same GFS goes up once, not 200 times.
- **Gaps fill themselves.** If the host doesn't answer, your home
  asks an admin's or moderator's household instead. An older picture
  you never got is fetched when you open it. A new member gets the
  last 30 days right away.
- **Reactions show up in every household.** You can leave up to five
  reactions on a post, and everyone sees the same ones.

<details class="tech">
<summary>Under the hood</summary>

A space update for many mailboxes is sealed once with a fresh
AES-256-GCM key, and that key is wrapped for each recipient with
X25519 + HKDF (`POST /gfs/envelope/multi`, up to 500 recipients). For
200 households that is one 51 KB upload instead of 1.13 MB. Items over
the ~191 KiB envelope travel as binary frames padded to
64/128/256/516 KiB, and pictures go in full 512 KiB pieces.

Healing: if the host stays silent for 120 s during a sync, the member
asks one helper (an admin or moderator household). A missing picture
is asked of the host first and of a helper after 60 s; every file is
checked against its hash. The member list is repaired by digest
(`rd1-sha256`) instead of being re-sent on a timer. A member whose
home isn't connected to the GFS is reached through the host, the one
case that still needs the host online.

</details>

## Posting is always anonymous

When a member posts through the GFS, the GFS can't tell which household
it came from, and can't even tell which households are allowed to
write. It's how every space works, with nothing to set up.

<details class="tech">
<summary>Under the hood</summary>

Every member publishes with `POST /gfs/member-publish-anon`,
authorized by a writer key shared per key epoch. The outer type is
always `space_item`, padded to 1/4/16/64/128 KiB inside the AEAD. The
member's writer certificate travels only inside the ciphertext, where
the receiving households check it. Writers subscribe in the same
shuffled batch as followers.

</details>

## Admins can keep the space running

Space owners can now turn on **Let admins act for me**. Your admins
from other households can then moderate, invite and publish while
your home is offline, also admins who reach the space only through a
GFS. It's off by default.

Before you make a household an admin, the app shows its **Household
ID**. Ask them to read theirs out from their **Connections** page, so
you know it really is them. If you remove an admin, their key stops
working on every GFS the space was ever listed on.

<details class="tech">
<summary>Under the hood</summary>

With the switch on, the space's Ed25519 signing seed is handed to
each admin household, sealed for that household. Toward the GFS, an
admin looks like any other writer: the GFS can learn that a space has
delegated admins, not which household they are. Removing an admin
rotates the space's key on every GFS, including GFSs the listing was
withdrawn from, and the change is confirmed and retried until each
GFS has it. Every listing is signed for one GFS, so one GFS can't
replay it to another.

</details>

## Ask to join a global space without pairing

See a global space you like on your GFS? You can now ask to join it
straight away, without pairing with its host first. The owner sees
your request marked **Via the GFS · not verified**, because the name
you send is what you typed, not something anybody checked. If many
requests pile up, the owner can decline all of them at once.

## Followers are members who read

A follower is now simply a member with a read-only role. Followers
get the same posts the same way, and the owner decides with two
switches whether followers may comment or leave reactions. Voting in
polls stays with the members; followers see the results.

## What the GFS still sees

We'd rather tell you plainly:

- **Which mailboxes get a space update.** When a member sends one
  update to many mailboxes at once, the GFS sees that list of
  mailboxes, though not the space, the households or the content.
- **Who follows a global space.** Followers subscribe to the space on
  the GFS, and writers hide among them.
- **Which households take part in a private space** that the owner
  connected to the GFS. Never the space's name, key or posts.
- **Network addresses.** A GFS that logged addresses could link a
  mailbox to a household that connects from the same address. The
  Social Home GFS doesn't log addresses. If you
  [run a GFS yourself](/docs/running-a-gfs/), keep it that way.

## Try it

Everything in this post is in **Social Home 2026.11.19**. Update your
home, and the new GFS does the rest. Want the details? Read
[Global spaces](/docs/global-spaces/) and
[Privacy](/docs/privacy/).
