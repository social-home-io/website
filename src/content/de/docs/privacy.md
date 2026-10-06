---
title: Datenschutzmodell
description: Was Social Home behält, was reist, und was niemand — auch wir nicht — je sehen kann.
order: 50
---

Social Home baut auf einer einfachen Regel auf: **Der Haushalt
behält alles**. Es gibt kein Cloud-Konto, keine Analytics, keinen
entfernten Logger, kein Growth-Team. Die Website, die du gerade
liest, ist statisches HTML, ausgeliefert von GitHub Pages — keine
Analytics, keine Cookies, keine Anfragen an Dritte; sogar die
Schriften kommen vom selben Ort.

Diese Seite listet jedes Datum, das Social Home berührt, und
genau, wohin es geht. Die Seite zum
[Sicherheitsmodell](/de/docs/security/) erklärt, wie das
Versiegeln funktioniert und was es nicht kann; die hier
verwendeten Wörter stehen in
[Wörter, die wir verwenden](/de/docs/glossary/).

## Was wo lebt

| Daten                                        | Zu Hause gespeichert?     | Verlässt deinen Server?                                                             |
| -------------------------------------------- | ------------------------- | ----------------------------------------------------------------------------------- |
| Nachrichten, Beiträge, Fotos                 | ja                        | nur zu Haushalten im Space, versiegelt                                              |
| Direktnachrichten                            | ja                        | versiegelt zum Server des anderen Haushalts                                         |
| Einkaufsliste                                | ja                        | nur zwischen den Geräten deines Haushalts                                           |
| Kalendereinträge                             | ja                        | nur zu Haushalten, die den Kalender teilen                                          |
| Sprachtranskripte                            | ja (der Text)             | wie Beiträge                                                                        |
| Avatare + Anzeigenamen                       | ja                        | ja — zu gekoppelten Haushalten (so erkennen sie dich)                               |
| Öffentlicher Schlüssel (Identität)           | ja                        | ja — das ist buchstäblich der Sinn der Kopplung                                     |
| Externe URL                                  | ja                        | ja — zu gekoppelten Haushalten, wenn sie sich ändert                                |
| Dein Home Assistant Konto (E-Mail, Passwort) | **wird nie gelesen**      | nie                                                                                 |
| GPS / Standortverlauf                        | **nie** standardmäßig     | nur die aktuelle Zone, nur wenn du zustimmst; Kartenmarkierungen auf ~11 m gerundet |
| Logs                                         | bleiben auf deinem Server | nie                                                                                 |

## Was das globale Relay sieht

Der GFS (Global Federation Server) — der globale
Föderationsserver, das Relay, das Haushalten hilft, einander zu
finden — trägt die Beiträge öffentlicher und globaler Spaces als
versiegelte Umschläge. Was er über dich erfährt, hängt davon ab,
wie der Space eingerichtet ist (siehe
[GFS](/de/docs/glossary/#gfs) im Glossar):

- **Vertrauend** (der Standard): welcher Haushalt in welchen
  gelisteten Space gepostet hat, und wann.
- **Streng** (Opt-in pro Space): nur, dass _jemand_ im Space
  gepostet hat. Der Absender ist unter den Schreibenden des Space
  anonym.
- **Ein privater Space mit eingeschaltetem GFS** (standardmäßig
  aus): welche Haushalte zum Kanal gehören — nie den Namen, die
  ID, den Schlüssel oder den Inhalt des Space.

Er sieht **nie**:

- Den Inhalt irgendeiner Nachricht, eines Beitrags, eines
  Kalendereintrags, Fotos oder einer Sprachnotiz.
- Irgendetwas aus einem privaten Space mit ausgeschaltetem GFS
  oder aus einem Haushalts-Space.
- Die Einkaufsliste, den Kalender, die Anwesenheit oder die Logs
  deines Haushalts.

Er sieht deine IP-Adresse, die Zeitpunkte und die ungefähre Größe
jedes Umschlags sowie welche Haushalte die Beiträge eines Space
empfangen.

Gar kein Relay ist beteiligt, wenn du keine öffentlichen oder
globalen Spaces, keine öffentlichen Momente, keine öffentlichen
Highlight-Links und keinen privaten Space mit eingeschaltetem GFS
hast. Dein Haushalt redet dann nur mit Haushalten, mit denen du
gekoppelt bist, direkt.

<details class="tech">
<summary>Unter der Haube</summary>

Nur Routing-Metadaten: `space_id`, `event_type`, Größenklasse
(1 / 4 / 16 / 64 / 128 KiB, plus 191 KiB für das Weiterleiten von
Umschlägen), Zeitpunkte, Abonnentenmenge, Quell-IP. Ein vom
Host-Haushalt weitergeleiteter Beitrag ist identitätsfrei
`{space_id, event_type, payload}` auf einer Sitzung ohne Cookies;
ein Mitglied, das für sich selbst veröffentlicht, signiert im
vertrauenden Modus mit dem Haushaltsschlüssel und im strengen
Modus mit einem gemeinsamen Writer-Key pro Epoche. Ein privater
Space mit eingeschaltetem `private_gfs` verwendet eine opake
128-Bit-Kanal-ID. Offline-Empfänger werden 24 h in die
Warteschlange gestellt (2000 Umschläge / 64 MiB pro Empfänger);
darüber hinaus wird kein Inhalt gespeichert.

</details>

## Verschlüsselung

Jede Nachricht, die deinen Server verlässt, ist verschlüsselt —
immer, ohne Schalter, den man vergessen könnte. Jeder Beitrag
wird in einem Umschlag versiegelt und signiert, sodass nur die
Haushalte im Space ihn öffnen können und nicht einmal ein
bösartiges Relay ein Wort lesen kann. Direktnachrichten werden
von deinem Zuhause zu ihrem versiegelt. Es gibt keinen Schalter
„verschlüsselt / nicht verschlüsselt“ und keinen
Klartext-Fallback: Wenn ein Space nicht versiegeln kann, sendet
er nicht.

Die Regel ist einfach: Nichts verlässt das Haus unversiegelt, und
nichts, was ein Relay berührt, ist je lesbar.

<details class="tech">
<summary>Unter der Haube</summary>

AES-256-GCM-Umschläge, Ed25519-Signaturen. Die einzigen lesbaren
Felder auf einem Umschlag sind `event_type`, `from_instance`,
`to_instance`, `space_id` und `epoch`. Alle Details auf der Seite
zum [Sicherheitsmodell](/de/docs/security/).

</details>

## Dinge, die Social Home nicht hat

- Ein Konto in einer Social-Home-Cloud (es gibt keine).
- Eine Kopie deiner Daten irgendwo anders. Wenn du das Add-on
  installiert hast, ist Social Home Teil deines normalen Home
  Assistant Backups; bei einer eigenständigen Installation lädst
  du ein Recovery Kit herunter und bewahrst es an einem sicheren
  Ort auf.
- Telemetrie, Analytics, Absturzberichte oder A/B-Tests.
- Eine Werbefläche.
- Ein Growth-Team, das deinen Feierabend monetarisieren will.

<details class="tech">
<summary>Unter der Haube</summary>

Schlüssel im Ruhezustand sind unter einem KEK verpackt. Das
Recovery Kit ist eine `.shrk`-Datei, versiegelt mit scrypt +
AES-256-GCM.

</details>

## Dinge, die du kontrollierst

- **Wer in einem Space ist** (Einstellungen → Spaces — Mitglieder
  einladen oder entfernen; jede Änderung der Mitgliedschaft gibt
  dem Space einen neuen Schlüssel, sodass jemand Entferntes
  nichts lesen kann, was danach gepostet wird).
- **Anwesenheit teilen** (Einstellungen → Datenschutz — Opt-in,
  pro Haushaltsmitglied, jederzeit abschaltbar).
- **Kopplung** (Einstellungen → Verbindungen — entferne einen
  Haushalt, und seiner Kopie deiner Nachrichten wird nicht mehr
  vertraut).
- **Welches Relay, falls überhaupt** (Einstellungen →
  Verbindungen — der GFS ist optional, und du wählst, welchen).
- **Backups** — deine Verantwortung, wie alles andere in deinem
  Zuhause.

## Probleme melden

Sicherheitsprobleme gehören zu
[`social-home-io/socialhome`](https://github.com/social-home-io/socialhome/security)
auf GitHub. Bitte melde sie vertraulich über den Link zu den
GitHub Security Advisories statt in einem öffentlichen Issue.
