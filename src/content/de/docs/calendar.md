---
title: Kalender & Zusagen
description: Eine Ansicht für persönliche, Partner- und Haushaltskalender. Eingeladene antworten mit Ja / Nein / Vielleicht — auch über gekoppelte Haushalte hinweg, wenn ein Termin mit einem entfernten Space geteilt wird.
order: 25
---

Der Kalender ist die zentrale Koordinationsfläche eines Haushalts.
Persönliche Kalender, ein gemeinsamer **Haus**-Kalender und
beliebige Space-Kalender liegen farbcodiert übereinander in einer
Ansicht unter **Zu Hause → Kalender**. Termine lassen sich in der
App, per Stimme oder durch Import einer `.ics`-Datei anlegen, die du
in das Eingabefeld ziehst.

## Zusagen (RSVP)

Jeder Termin trägt eine Liste von Eingeladenen. Jede eingeladene
Person kann mit **Ja**, **Nein** oder **Vielleicht** antworten — und
es sich jederzeit bis zum Beginn des Termins anders überlegen. Die
Detailansicht fasst die Zahlen oben zusammen (`✓ 3 · ✗ 1 · ? 2`)
und listet alle Eingeladenen mit ihrem aktuellen Stand und wann sie
ihn zuletzt geändert haben.

Standard-Sichtbarkeit:

- **Persönliche** Termine — Antworten sehen nur die einladende und
  die eingeladene Person.
- **Haushalts**-Termine — Antworten sieht jedes Mitglied des
  Haushalts.
- **Space**-Termine — Antworten sieht jedes Mitglied des Space,
  gekoppelte entfernte Haushalte eingeschlossen.

## Kapazität und Wartelisten

Gib einem Termin eine **Kapazität**, und „Ja“ gilt nicht mehr
sofort: Es wird zu einer **Anfrage**, die der Ersteller des Termins
(oder ein Space-Admin) genehmigt, und sobald die Plätze voll sind,
landen weitere Zusagen auf einer **Warteliste**. Springt jemand ab,
rückt die Person, die am längsten wartet, automatisch nach.
„Vielleicht“ zählt nie gegen die Kapazität und bleibt so ein
ehrliches „Ich versuch's“. Lässt du die Kapazität leer, steht der
Termin wie bisher allen offen.

## Föderation

Wird ein Termin mit einem Space geteilt, dessen Mitglieder in
gekoppelten Haushalten leben, reist jede Antwort auf demselben
versiegelten Weg zu diesen Haushalten wie alles andere. Wer
eingeladen war, was die Person geantwortet hat und jede Notiz, die
sie getippt hat, steckt im versiegelten Teil; nur die ID des Termins
ist außen lesbar, damit er zugestellt werden kann.

Entfernt ein Space-Admin ein Mitglied, zieht er damit auch dessen
Antwort stillschweigend zurück — der Termin wird in jeden
gekoppelten Haushalt gespiegelt, sodass sich der Zähler-Chip überall
innerhalb von Sekunden aktualisiert.

<details class="tech">
<summary>Unter der Haube</summary>

RSVPs föderieren über die Standard-Eingangspipeline nach §24.11. Die
Termin-ID steht im Klartext auf dem Umschlag (Routing-Daten); die
Liste der Eingeladenen, die Antwort und jede Freitext-Notiz reisen
in der verschlüsselten Nutzlast.

</details>

## Erinnerungen

Termine haben eine optionale Erinnerung — _15 Minuten vorher_,
_1 Stunde vorher_, _1 Tag vorher_. Die Erinnerung läuft über den
Benachrichtigungsdienst: eine Zeile in der App, eine
Push-Benachrichtigung (wenn Push aktiviert ist) und ein Ereignis,
auf das deine Automationen zu Hause reagieren können — einen
Lautsprecher klingeln lassen, das Licht dimmen oder was auch immer
der Haushalt verdrahtet hat.

<details class="tech">
<summary>Unter der Haube</summary>

Der Automations-Hook ist ein Ereignis auf dem Event-Bus von Home
Assistant, ausgelöst über die Integration, die das Add-on mitbringt;
jede Automation kann darauf triggern.

</details>

## Bestehende Termine importieren

Zieh eine `.ics`-Datei in das Eingabefeld, füg die URL eines
öffentlichen Kalender-Feeds ein oder lade den Screenshot einer
Einladung auf Papier hoch — der KI-Extraktor (sofern eingerichtet)
holt Titel, Beginn, Ende, Ort und Beschreibung aus dem Bild.
Importierte Termine landen als **Entwurf**, bis du sie bestätigst;
nichts föderiert, bevor du auf Speichern drückst.

## Privatsphäre

- Alles in einem Termin ist versiegelt, wenn er zu einem anderen
  Haushalt reist.
- Der Ort eines _Standort_-Termins wird auf etwa 11 Meter
  verwischt, bevor er je gespeichert oder übertragen wird.
- Persönliche Kalender föderieren nie. Nur die Haushalts- und
  Space-Kalender überschreiten Haushaltsgrenzen.

<details class="tech">
<summary>Unter der Haube</summary>

Kalender-Nutzlastfelder werden im Föderationsumschlag verschlüsselt
(§25.8.21). GPS-Koordinaten werden vor Speicherung oder Übertragung
auf vier Nachkommastellen gekürzt (≈ 11 m) (GPS-Regel in §25).

</details>

## API

<details class="tech">
<summary>Unter der Haube</summary>

| Methode                    | Pfad                                  | Zweck                                                                      |
| -------------------------- | ------------------------------------- | -------------------------------------------------------------------------- |
| `GET`                      | `/api/calendar`                       | Haushaltskalender, mit eingemischten persönlichen Overlays.                |
| `POST`                     | `/api/calendar/events`                | Einen Termin im Haushaltskalender anlegen.                                 |
| `GET` / `PATCH` / `DELETE` | `/api/calendar/events/{id}`           | Einen Termin lesen / bearbeiten / löschen.                                 |
| `PUT`                      | `/api/calendar/events/{id}/rsvps`     | Deine Antwort setzen. Body: `{response: "yes" \| "no" \| "maybe", note?}`. |
| `GET`                      | `/api/calendar/events/{id}/rsvps`     | Den aktuellen Stand aller Eingeladenen auflisten.                          |
| `POST`                     | `/api/calendar/events/{id}/reminders` | Das Erinnerungsfenster konfigurieren.                                      |
| `GET`                      | `/api/calendar/events/{id}.ics`       | Einen einzelnen Termin als iCalendar-Datei herunterladen.                  |
| `POST`                     | `/api/calendar/import/ics`            | Eine `.ics`-Datei oder Feed-URL importieren.                               |
| `POST`                     | `/api/calendar/import/image`          | Einen Termin per OCR + KI aus einem Screenshot extrahieren.                |

Space-Kalender nutzen das parallele `/api/spaces/{id}/calendar/*`-Schema,
sodass ein einzelner Space seine eigene Terminserie führen kann,
ohne sich in das Haushalts-Overlay zu mischen.

</details>
