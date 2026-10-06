---
title: Haushalte, föderiert
description: Wie zwei Zuhause sich koppeln, was zwischen ihnen reist und was bleibt, wo es ist.
order: 30
---

Wenn zwei Haushalte sich koppeln, lernen ihre Zuhause die
kryptografische Identität des jeweils anderen kennen und speichern
den öffentlichen Schlüssel lokal. Nach diesem einen Handshake trägt
jede Nachricht zwischen ihnen eine Signatur, die dein Zuhause prüfen
kann — kein zentrales Konto, keine Anmeldung bei Dritten.

## Der Kopplungsablauf

1. **Öffne einen Kopplungslink.** In Social Home → **Einstellungen →
   Verbindungen → Haushalt koppeln**. Du siehst einen QR-Code und
   einen kurzen Prüfcode.
2. **Vom anderen Haushalt aus scannen.** Dort öffnet man denselben
   Bildschirm im eigenen Zuhause, klickt auf **Scannen** und hält
   ein Handy auf den QR-Code. Beide Seiten lesen dann den Prüfcode
   laut vor und bestätigen, dass er übereinstimmt — diese Prüfung
   außerhalb der Verbindung ist es, die einen Man-in-the-Middle am
   Einschleichen hindert.
3. **Fertig.** Die beiden Haushalte tauschen öffentliche Schlüssel,
   Namen, Avatare und die von außen erreichbare URL aus, die jeder
   für sich bekannt gibt. Ab jetzt fließen Nachrichten direkt
   zwischen euch, versiegelt von deinem Zuhause zu ihrem.

## Was reist

| Feld                                        | Mit gekoppelten Haushalten geteilt?                       |
| ------------------------------------------- | --------------------------------------------------------- |
| Anzeigename                                 | ja                                                        |
| Avatar                                      | ja                                                        |
| Aktuell gemeinsame Spaces                   | nur Spaces, denen ihr beide beigetreten seid              |
| Öffentlicher Schlüssel (Identität)          | ja — genau darum geht es                                  |
| Externe URL                                 | ja, damit sie dich erreichen, wenn du umziehst            |
| E-Mail / Passwort                           | **nie** — Social Home hat nicht einmal eins               |
| GPS / Standortverlauf                       | **nie** — nur die aktuelle Zone, per Opt-in und pro Space |
| Nachrichten aus Spaces, die ihr nicht teilt | nie sichtbar                                              |

## Was passiert, wenn sich eine Adresse ändert

Wenn die externe URL deines Haushalts umzieht — du wechselst die
Domain, verlierst Nabu Casa Remote UI oder deine IP wechselt —,
teilt Social Home jedem gekoppelten Haushalt die neue Adresse
automatisch mit. Deren Zuhause prüft, dass die Ankündigung wirklich
von dir kam, aktualisiert die gespeicherte URL, und die Verbindung
bleibt bestehen. Kein manuelles Neu-Koppeln.

<details class="tech">
<summary>Unter der Haube</summary>

Die Ankündigung ist ein signiertes `URL_UPDATED`-Ereignis. Der
empfangende Haushalt prüft die Ed25519-Signatur gegen den bei der
Kopplung gespeicherten öffentlichen Schlüssel, bevor er die URL
ersetzt.

</details>

## Eine Kopplung aufheben

Wenn du die Verbindung zu einem anderen Haushalt trennen willst,
öffne **Einstellungen → Verbindungen** und klicke auf **Entfernen**.
Beide Seiten verlieren ihre Kopie der Identität des anderen; bereits
zugestellte Nachrichten bleiben, wo sie sind (in der lokalen
SQLite-Datenbank) — Föderation wirkt nur nach vorn.

## Über das Internet

Koppeln funktioniert über das offene Internet — Föderation läuft von
einem Zuhause zum anderen, nicht nur im LAN. Um von außerhalb deines
Netzwerks erreichbar zu sein, brauchst du entweder:

- **Nabu Casa Remote UI** (am einfachsten), oder
- eine **externe URL** (in den Netzwerkeinstellungen von Home
  Assistant gesetzt, wenn du das Add-on nutzt) + eine
  Portweiterleitung / einen Reverse-Proxy, oder
- einen **TURN-Server** für den WebRTC-Fallback, wenn keine Seite
  direkt erreichbar ist.

<details class="tech">
<summary>Unter der Haube</summary>

Wenn du das Add-on installiert hast, übergibt die
Home-Assistant-Integration automatisch die URL an Social Home, die
Home Assistant als externe meldet. Ist Nabu Casa an, gewinnt die
Nabu-Casa-URL; andernfalls wird die vom Admin gesetzte
`external_url` verwendet.

</details>

## Deine Haushalte sehen

Die Seite **Verbindungen** zeichnet auch eine Karte: ein Pin pro
gekoppeltem Haushalt, mit Entfernung und Richtung zu jedem. Sie ist
dazu da, die Föderation greifbar zu machen — zu sehen, dass „das
Haus meiner Schwester“ ein echter Ort 40 km nordöstlich ist, der
direkt mit deinem spricht. Ein kleines Symbol zeigt, ob ihr direkt
(WebRTC) oder über den HTTPS-Fallback verbunden seid; das ist rein
diagnostisch — alles funktioniert so oder so gleich. Die Karte zeigt
den ungefähren Standort eines Haushalts nur, wenn er ihn beim
Koppeln teilen wollte, und jede Koordinate wird auf etwa 11 Meter
verwischt, bevor sie gespeichert oder gesendet wird.
