---
title: Security model
description: What is sealed, what is signed, what the relay can still see — and what we haven't solved yet.
order: 55
---

This page is the plain-language twin of the project's
[principles](https://github.com/social-home-io/socialhome/blob/main/docs/principles.md):
every guarantee below is written first for the person who runs
the household, and then — in the "Under the hood" blocks — for
the person who wants to check it against the code. If a word is
new, it is in [Words we use](/docs/glossary/).

## One rule, stated honestly

Nothing leaves your household readable. The shopping list, the
book-club chat, the photo of dinner, the dentist appointment —
all of it is sealed before it leaves your home and only
opened in the home it was sent to.

The rule is about the wire and about every machine in between:
the relay, the network, and other members' servers that pass a
post along.

<details class="tech">
<summary>Under the hood</summary>

Encryption is server-to-server: your household's server seals,
the receiving household's server opens. There is no per-device
key and no claim of device-to-device secrecy.

</details>

## Who it protects you from

| Someone who…                      | …gets                                                                                                  |
| --------------------------------- | ------------------------------------------------------------------------------------------------------ |
| runs the GFS you use              | sealed envelopes, routing data and timing — never a word of content                                    |
| watches the network               | sealed, padded traffic between known addresses                                                         |
| was removed from a space          | nothing posted after they left — the space got a new key                                               |
| finds a stray invite link         | into the space, if it was a GFS link — treat those like keys; a Local link does nothing for a stranger |
| has root on your home's server    | everything — it is your server; protect it like the rest of your home network                          |
| is an admin of a space you are in | everything in that space, same as any member — admins aren't a backdoor                                |

The last two rows are the honest ones: Social Home protects your
household from the outside, not from itself.

## Encrypted home to home

Every message, post and calendar event is sealed in an envelope
in your home and signed, so the receiving household can
check it really came from you and that nobody changed it on the
way. Direct messages work the same way: sealed from your home
to theirs.

<details class="tech">
<summary>Under the hood</summary>

- Envelopes: AES-256-GCM. Signatures: Ed25519 over the envelope.
- The only plaintext on the wire: `event_type`, `from_instance`,
  `to_instance`, `space_id`, `epoch`.

</details>

## It fails closed

There is no "encrypted / not encrypted" switch and no fallback to
sending in the clear. If a space can't be sealed, the message
stays home. An envelope with a bad signature, or one that arrives
far too late, is dropped — no exceptions, no "trust this one
anyway" mode.

<details class="tech">
<summary>Under the hood</summary>

- No plaintext fallback; no trusted-instance mode.
- Timestamp window ±300 s; replay cache 24 h.
- Any signature failure drops the envelope before it is parsed
  further.

</details>

## Keys and rotation

Your household gets its own identity key the first time it
starts. When you pair with another household, the two of you
agree a shared secret over a QR code or a short spoken code, so
nobody can slip in between.

Every space has its own key, and that key changes every time the
membership changes. When someone leaves the book club, the club
gets a new key; they can't read anything posted after that. When
an admin is removed, the key that signs admin decisions changes
too.

The keys on your disk are wrapped under a master key. If you
installed the add-on, they travel with your normal Home Assistant
backup; on a standalone install you download a Recovery Kit and keep it
somewhere safe.

<details class="tech">
<summary>Under the hood</summary>

- Identity: Ed25519. Opt-in hybrid Ed25519 + ML-DSA-65 signatures
  (needs liboqs).
- Pairing: X25519 + HKDF-SHA256, authenticated by the spoken
  code.
- Space content: per-epoch AES-256-GCM key, rotated on every
  membership change. Authority key rotated on admin revocation.
- At rest: keys wrapped under a KEK (key-encryption key). Recovery
  Kit `.shrk` = scrypt + AES-256-GCM, for standalone installs; the
  Home Assistant backup covers add-on installs.
- Residual: key exchange is X25519 only — not yet post-quantum.
  Hybrid signatures do not make the key exchange post-quantum.

</details>

## What a relay sees

The GFS (Global Federation Server) — the relay that helps
households find each other — carries the posts of a global space
to households you aren't paired with: followers, and members who
joined with a GFS link. Paired households get them directly or
over the mesh. It carries sealed envelopes, padded to a few fixed
sizes, and fans them out. It
stores no content: if a household is offline it keeps the sealed
envelopes for a day, then lets them go. See
[GFS](/docs/glossary/#gfs) in the glossary.

| Mode                      | What the relay learns                                                                  |
| ------------------------- | -------------------------------------------------------------------------------------- |
| **Trusted** (default)     | which household posted into which listed space, at which key epoch, and when           |
| **Strict** (opt-in)       | that _someone_ in the space posted — the sender is anonymous among the space's writers |
| **Private space, GFS on** | which households belong to the channel — never the space's name, id, key or content    |

In every mode the relay still sees the sender's IP address, the
timing, the size bucket and which households receive a space's
posts. A plain membership sync tells the GFS nothing.

<details class="tech">
<summary>Under the hood</summary>

- Routing metadata only: `space_id`, `event_type`, size bucket,
  timing, subscriber set, source IP.
- When the host household relays a post, the request names no
  household at all: `{space_id, event_type, payload}` on a
  cookie-less session, and only to a GFS that has proved
  `anonymous_publish` — otherwise nothing is sent.
- When a member publishes for itself (so the host needn't be
  online), trusted mode signs the request with that household's
  key; strict mode signs it with a shared per-epoch writer key
  instead, so the GFS can't tell which member posted.
- Private spaces: `private_gfs` off by default; when on, an
  opaque 128-bit channel id.
- Padding buckets: 1 / 4 / 16 / 64 / 128 KiB for member
  publishes, plus a 191 KiB bucket for envelope relay.
- Offline recipients: queued 24 h, at most 2000 envelopes or
  64 MiB per recipient. Your household retries with backoff:
  5 s, 30 s, 2 min, 10 min.

</details>

## Mesh and calls

If two member households can't reach each other directly, a post
can hop through other members' servers. Each hop is sealed for
the final recipient, so the servers in between carry it but can't
open it.

Voice and video calls run directly between the participants.
When a direct connection isn't possible, a TURN server — a relay
just for calls — passes the stream through, and it only ever
sees encrypted media.

<details class="tech">
<summary>Under the hood</summary>

- `SPACE_ROUTED` forwarding: at most three hops, sealed to an
  ephemeral X25519 key of the recipient.
- Calls: WebRTC with DTLS-SRTP between participants; a TURN
  fallback relays ciphertext only.

</details>

## Apps

Apps from the catalog run in a sealed box inside Social Home. An
app can't phone home, can't load anything from the internet, and
can't be swapped for a different version behind your back. Apps
travel directly between households; the GFS is not involved.

<details class="tech">
<summary>Under the hood</summary>

- Bundles sha256-pinned; 1 MiB cap.
- Sandboxed iframe (`allow-scripts` only) with
  `connect-src 'none'`.
- Distributed peer-to-peer between paired households.

</details>

## The small things

- A space pinned on the GFS map has its location rounded to
  about 11 m — the street, not the front door.
- Posts can't load images from other websites, so nobody can
  plant a tracking pixel in your feed.
- Link previews are fetched by the author's household only, never
  by every reader. A household admin can turn them off.
- Push notifications carry only the title; the content waits
  until you open the app.
- Protected accounts for minors are refused outright from the
  Bazaar, public spaces, public Moments, public highlight links
  and API tokens — see [Family safety](/docs/family-safety/).

<details class="tech">
<summary>Under the hood</summary>

- GPS truncated to 4 decimals (~11 m).
- CSP `img-src 'self' data: blob:` blocks external images in user
  content.
- Link previews: fetched by the author's household, SSRF-guarded,
  admin-disableable.
- API and WebSocket responses are minimised to what the view
  needs.
- `min_age` is checked on every path that seats a member.

</details>

## How we keep it true

Every rule on this page has tests behind it, and those tests run
before every release. If one fails, the release doesn't ship —
there is no "we'll fix it next time". Changes to security-
sensitive code get a second, deliberately adversarial review,
and every change to a principle gets a dated sign-off in the
principles file, with whatever it leaves unsolved written down
next to it.

What we don't have yet: automated scanning of third-party
dependencies. That is on the list, not in the pipeline.

<details class="tech">
<summary>Under the hood</summary>

- 68 protocol test files tagged `security`; they block a release
  regardless of coverage numbers.
- CI: pytest with 90 % branch coverage, the security tests as a
  separate step, ruff, mypy, eslint, tsc, vitest.
- Sign-offs live in
  [`docs/principles.md`](https://github.com/social-home-io/socialhome/blob/main/docs/principles.md).
- No CodeQL, bandit or dependency scanning yet.

</details>

## Known residuals

The things that are true today and that you should know before
you trust us with the group chat:

- In trusted mode the relay learns which household posted into
  which space, and when.
- In every mode the relay sees your IP address, the timing and the
  size bucket of each envelope, and which households receive a
  space's posts.
- Key exchange is not yet post-quantum; only signatures have an
  opt-in post-quantum variant.
- There is no automated dependency scanning yet.

## Reporting a problem

If you find a hole, please tell us privately rather than in a
public issue: open a report under
[GitHub Security Advisories](https://github.com/social-home-io/socialhome/security)
in the `social-home-io/socialhome` repository.
