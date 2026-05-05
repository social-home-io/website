---
title: Calendar & RSVPs
description: One overlay for personal, partner and household calendars. Invitees RSVP yes / no / maybe — including across paired households when an event is shared with a remote space.
order: 25
---

The calendar is the central coordination surface for a
household. Personal calendars, a shared **House** calendar, and
any space-scoped calendars overlay in one colour-coded view
under **At home → Calendar**. Events can be added from the SPA,
through HA voice, or by importing an `.ics` file dropped into
the composer.

## RSVPs

Every event carries a list of invitees. Each invitee can RSVP
**Yes**, **No**, or **Maybe** — and change their mind any time
up until the event starts. The detail view summarises the
counts at the top (`✓ 3 · ✗ 1 · ? 2`) and lists every invitee
with their current state and the ISO timestamp of their last
change.

Default visibility:

- **Personal** events — RSVPs only visible to the inviter and
  the invitee.
- **Household** events — RSVPs visible to every household
  member.
- **Space** events — RSVPs visible to every space member,
  including paired remote households.

## Federation

When an event is shared with a space whose members live on
paired peer instances, every RSVP federates over the standard
§24.11 inbound pipeline. The event id is plaintext on the
envelope (it's routing data); the invitee list, the response,
and any free-text note ride inside the encrypted payload.

A space admin who removes a member also revokes their RSVP
silently — the federated event is mirrored to every paired
peer, so the count chip updates everywhere within seconds.

## Reminders

Events carry an optional reminder — *15 minutes before*, *1
hour before*, *1 day before*. The reminder fires through the
notification service: an in-app row, a push notification (if
the user has push enabled), and an HA event so HA automations
can chime a speaker, dim the lights, or whatever the
household has wired up.

## Importing existing events

Drop an `.ics` file on the composer, paste the URL of a public
calendar feed, or upload a screenshot of a paper invitation —
the AI extractor (when configured) will pull `{title, start,
end, location, description}` from the image. Imported events
land as **draft** until you confirm; nothing federates until
you press Save.

## Privacy

- Calendar payload fields are encrypted in the federation
  envelope (§25.8.21).
- GPS coordinates on a *location*-flavoured event are
  truncated to four decimal places (≈ 11 m) before they're
  ever stored or transmitted (§25 GPS rule).
- Personal calendars never federate. Only the household and
  space-scoped overlays cross instance boundaries.

## API

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/api/calendar` | Household calendar, with personal overlays mixed in. |
| `POST` | `/api/calendar/events` | Create an event in the household calendar. |
| `GET` / `PATCH` / `DELETE` | `/api/calendar/events/{id}` | Read / edit / delete one event. |
| `PUT` | `/api/calendar/events/{id}/rsvps` | Set your RSVP. Body: `{response: "yes" \| "no" \| "maybe", note?}`. |
| `GET` | `/api/calendar/events/{id}/rsvps` | List every invitee's current state. |
| `POST` | `/api/calendar/events/{id}/reminders` | Configure the reminder window. |
| `GET` | `/api/calendar/events/{id}.ics` | Download a single event as an iCalendar file. |
| `POST` | `/api/calendar/import/ics` | Import a `.ics` file or feed URL. |
| `POST` | `/api/calendar/import/image` | OCR + AI-extract an event from a screenshot. |

Space-scoped calendars use the parallel `/api/spaces/{id}/calendar/*`
shape so a single space can host its own event series without
mixing into the household overlay.
