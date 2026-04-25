---
title: Households, federated
description: How two Home Assistants pair, what travels between them, and what stays put.
order: 30
---

When two households pair, their Home Assistants learn each
other's cryptographic identity and store the public key locally.
After that one handshake, every message between them carries a
signature your HA can verify — no central account, no third-party
auth.

## The pairing flow

1. **Open a pairing link.** In Social Home → **Settings →
   Connections → Pair a household**. You'll see a QR code and a
   six-word phrase.
2. **Scan from the other household.** They open the same screen
   on their HA, click **Scan**, and point a phone at the QR. The
   six-word phrase prevents man-in-the-middle attacks — both
   sides confirm they see the same words before accepting.
3. **Done.** The two servers exchange public keys, names,
   avatars, and the externally-reachable URL each one announces
   for itself. From now on, messages flow directly between you.

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

If your HA's external URL moves — you switch domains, lose
Nabu Casa Remote UI, or your IP rotates — Social Home announces
the new address to every paired household automatically (a
signed `URL_UPDATED` event). Their HA verifies the signature,
updates the stored URL, and the connection stays alive. No
manual re-pairing.

## Revoking a pairing

If you want to disconnect from another household, open
**Settings → Connections** and click **Remove**. Both sides
lose their copy of the other's identity; previously-delivered
messages stay where they already are (the local SQLite
database) — federation is forward-only.

## Across the internet

Pairing works over the open internet — federation is
peer-to-peer between Home Assistants, not LAN-only. To be
reachable from outside your network you need either:

- **Nabu Casa Remote UI** (easiest), or
- An **external URL** in HA's network settings + a port forward
  / reverse proxy, or
- A **TURN server** for the WebRTC fallback when neither side
  can be reached directly.

The HA integration pushes whichever URL HA reports as the
external one to Social Home automatically. If Nabu Casa is on,
the Nabu Casa URL wins; otherwise the admin-set `external_url`
is used.
