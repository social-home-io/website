---
title: Calendar & RSVPs
description: One overlay for personal, partner and household calendars. Invitees RSVP yes / no / maybe — including across paired households when an event is shared with a remote space.
order: 25
---

The calendar is the central coordination surface for a
household. Personal calendars, a shared **House** calendar, and
any space-scoped calendars overlay in one colour-coded view
under **At home → Calendar**. Events can be added from the app,
through HA voice, or by importing an `.ics` file dropped into
the composer.

## RSVPs

Every event carries a list of invitees. Each invitee can RSVP
**Yes**, **No**, or **Maybe** — and change their mind any time
up until the event starts. The detail view summarises the
counts at the top (`✓ 3 · ✗ 1 · ? 2`) and lists every invitee
with their current state and when they last changed it.

Default visibility:

- **Personal** events — RSVPs only visible to the inviter and
  the invitee.
- **Household** events — RSVPs visible to every household
  member.
- **Space** events — RSVPs visible to every space member,
  including paired remote households.

## Capacity and waitlists

Give an event a **capacity** and "Yes" stops being instant: it
becomes a **request** that the event creator (or a space admin)
approves, and once the seats are full, further yeses join a
**waitlist**. When someone drops out, the oldest person on the
waitlist is promoted automatically. "Maybe" never counts against
the capacity, so it stays an honest "I'll try." Leave capacity
unset and the event is open to everyone, as before.

## Federation

When an event is shared with a space whose members live in
paired households, every RSVP travels to those households the
same sealed way everything else does. Who was invited, what they
answered and any note they typed are all inside the sealed part;
only the event's id is readable on the outside so it can be
routed.

A space admin who removes a member also revokes their RSVP
silently — the event is mirrored to every paired household, so
the count chip updates everywhere within seconds.

<details class="tech">
<summary>Under the hood</summary>

RSVPs federate over the standard §24.11 inbound pipeline. The
event id is plaintext on the envelope (routing data); the invitee
list, the response and any free-text note ride inside the
encrypted payload.

</details>

## Reminders

Events carry an optional reminder — _15 minutes before_, _1
hour before_, _1 day before_. The reminder fires through the
notification service: an in-app row, a push notification (if
the user has push enabled), and an HA event so HA automations
can chime a speaker, dim the lights, or whatever the
household has wired up.

## Importing existing events

Drop an `.ics` file on the composer, paste the URL of a public
calendar feed, or upload a screenshot of a paper invitation —
the AI extractor (when configured) will pull the title, start,
end, location and description from the image. Imported events
land as **draft** until you confirm; nothing federates until
you press Save.

## Privacy

- Everything inside an event is sealed when it travels to
  another household.
- The location on a _location_-flavoured event is blurred to
  about 11 metres before it's ever stored or transmitted.
- Personal calendars never federate. Only the household and
  space-scoped overlays cross household boundaries.

<details class="tech">
<summary>Under the hood</summary>

Calendar payload fields are encrypted in the federation envelope
(§25.8.21). GPS coordinates are truncated to four decimal places
(≈ 11 m) before storage or transmission (§25 GPS rule).

</details>

## API

<details class="tech">
<summary>Under the hood</summary>

| Method                     | Path                                  | Purpose                                                             |
| -------------------------- | ------------------------------------- | ------------------------------------------------------------------- |
| `GET`                      | `/api/calendar`                       | Household calendar, with personal overlays mixed in.                |
| `POST`                     | `/api/calendar/events`                | Create an event in the household calendar.                          |
| `GET` / `PATCH` / `DELETE` | `/api/calendar/events/{id}`           | Read / edit / delete one event.                                     |
| `PUT`                      | `/api/calendar/events/{id}/rsvps`     | Set your RSVP. Body: `{response: "yes" \| "no" \| "maybe", note?}`. |
| `GET`                      | `/api/calendar/events/{id}/rsvps`     | List every invitee's current state.                                 |
| `POST`                     | `/api/calendar/events/{id}/reminders` | Configure the reminder window.                                      |
| `GET`                      | `/api/calendar/events/{id}.ics`       | Download a single event as an iCalendar file.                       |
| `POST`                     | `/api/calendar/import/ics`            | Import a `.ics` file or feed URL.                                   |
| `POST`                     | `/api/calendar/import/image`          | OCR + AI-extract an event from a screenshot.                        |

Space-scoped calendars use the parallel `/api/spaces/{id}/calendar/*`
shape so a single space can host its own event series without
mixing into the household overlay.

</details>
