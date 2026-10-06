---
title: Households, federated
description: How two homes pair, what travels between them, and what stays put.
order: 30
---

When two households pair, their homes learn each
other's cryptographic identity and store the public key locally.
After that one handshake, every message between them carries a
signature your home can verify — no central account, no third-party
auth.

## The pairing flow

1. **Open a pairing link.** In Social Home → **Settings →
   Connections → Pair a household**. You'll see a QR code and a
   short verification code.
2. **Scan from the other household.** They open the same screen
   in their own home, click **Scan**, and point a phone at the QR. Both
   sides then read the verification code aloud and confirm it
   matches — that out-of-band check is what blocks a
   man-in-the-middle from slipping in.
3. **Done.** The two households exchange public keys, names,
   avatars, and the externally-reachable URL each one announces
   for itself. From now on, messages flow directly between you,
   sealed from your home to theirs.

## What travels

| Field                                | Shared with paired households?                  |
| ------------------------------------ | ----------------------------------------------- |
| Display name                         | yes                                             |
| Avatar                               | yes                                             |
| Currently-shared spaces              | only spaces you both joined                     |
| Public key (identity)                | yes — that's the point                          |
| External URL                         | yes, so they can reach you when you move        |
| Email / password                     | **never** — Social Home doesn't even have one   |
| GPS / location history               | **never** — only opt-in current zone, per space |
| Messages from spaces you don't share | never visible                                   |

## What happens when an address changes

If your household's external URL moves — you switch domains, lose
Nabu Casa Remote UI, or your IP rotates — Social Home tells every
paired household the new address automatically. Their home checks
that the announcement really came from you, updates the stored
URL, and the connection stays alive. No manual re-pairing.

<details class="tech">
<summary>Under the hood</summary>

The announcement is a signed `URL_UPDATED` event. The receiving
household verifies the Ed25519 signature against the public key
stored at pairing time before it replaces the URL.

</details>

## Revoking a pairing

If you want to disconnect from another household, open
**Settings → Connections** and click **Remove**. Both sides
lose their copy of the other's identity; previously-delivered
messages stay where they already are (the local SQLite
database) — federation is forward-only.

## Across the internet

Pairing works over the open internet — federation runs from one
home to the other, not LAN-only. To be reachable from
outside your network you need either:

- **Nabu Casa Remote UI** (easiest), or
- An **external URL** (set in Home Assistant's network settings if
  you run the add-on) + a port forward / reverse proxy, or
- A **TURN server** for the WebRTC fallback when neither side
  can be reached directly.

<details class="tech">
<summary>Under the hood</summary>

If you installed the add-on, the Home Assistant integration pushes
whichever URL Home Assistant reports as the external one to Social
Home automatically. If Nabu Casa is on, the Nabu Casa URL wins;
otherwise the admin-set `external_url` is used.

</details>

## Seeing your households

The **Connections** page also draws a map: one pin per paired
household, with the distance and direction to each. It's there to
make the federation tangible — to see that "my sister's house" is
a real place 40 km north-east, talking straight to yours. A small
glyph notes whether you're connected directly (WebRTC) or via the
HTTPS fallback; it's purely diagnostic — everything works the same
either way. The map only ever shows a household's rough home
location if they chose to share it when you paired, and any
coordinate is blurred to about 11 metres before it's stored or
sent.
