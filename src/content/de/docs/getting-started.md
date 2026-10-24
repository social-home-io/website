---
title: Erste Schritte
description: Am einfachsten läuft Social Home als App in Home Assistant — ein Klick, etwa fünf Minuten. Docker und Python gehen auch.
order: 10
---

Social Home läuft bei dir zu Hause, auf einem Rechner, den du schon
hast. Am einfachsten — und so empfehlen wir es — geht es mit der
**Social Home App für Home Assistant**. Wenn du Home Assistant OS
nutzt (auf einem Home Assistant Green oder Yellow, einem Raspberry Pi
oder einem Mini-PC) oder Home Assistant Supervised, ist es ein Klick
und etwa fünf Minuten, Kaffee inklusive.

[**Social Home zu Home Assistant hinzufügen →**](https://my.home-assistant.io/redirect/supervisor_addon/?addon=752dab87_socialhome&repository_url=https%3A%2F%2Fgithub.com%2Fsocial-home-io%2Fha-app)

Der Button öffnet dein Home Assistant, fügt die App hinzu und zeigt
dir den Button **Installieren**. Die App richtet alles für dich ein:
dein Konto und die Verbindung zu Home Assistant. Es gibt nichts
einzutippen und keinen Port zu öffnen. Die
[Schritt-für-Schritt-Anleitung](/de/docs/install-home-assistant/)
führt dich durch und zeigt, was dich erwartet.

## Andere Wege zur Installation

Kein Home Assistant OS? Social Home läuft auch anderswo. Feed,
Kalender, Spaces und Kopplung funktionieren überall gleich; was sich
ändert, ist, wie viel du von Hand einrichtest. Ein paar Extras kommen
von Home Assistant — Sprachsteuerung, Benachrichtigungen über die Home
Assistant Companion App und Orte und Personen, die deinem Home
Assistant folgen —, dafür braucht es Home Assistant neben Social Home.

| Wie                                                                                   | Gut für                                                                       | Aufwand         |
| ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | --------------- |
| [Home Assistant App](/de/docs/install-home-assistant/)                                | Home Assistant OS — **empfohlen**                                             | ein Klick       |
| [Home Assistant ohne Apps](/de/docs/install-home-assistant/#home-assistant-ohne-apps) | Home Assistant Container oder Core, dazu die Integration aus HACS             | etwa 20 Minuten |
| [Docker-Container](/de/docs/install-docker/)                                          | einen Heimserver oder ein NAS mit Docker, mit oder ohne Home Assistant        | etwa 15 Minuten |
| [Python](/de/docs/install-python/)                                                    | zum Ausprobieren auf dem Laptop oder auf einem Server, den du selbst betreust | etwa 15 Minuten |

Unsicher? Wenn dein Home Assistant unter **Einstellungen** eine Seite
**Apps** hat, nimm die App.

## Nach der Installation

- **Hol deinen Haushalt dazu.** Alle bei dir zu Hause bekommen ein
  eigenes Konto. Mit der Home Assistant App bekommt es jede Person
  automatisch, die Social Home in der Seitenleiste von Home Assistant
  öffnet.
- **Einen anderen Haushalt koppeln:** **Einstellungen → Verbindungen →
  Haushalt koppeln**. Siehe [Haushalte, föderiert](/de/docs/federation/)
  für den Ablauf mit dem QR-Code.
- Mit einem Sprachassistenten in Home Assistant probier mal
  _„Hey HA, setz Olivenöl auf die Einkaufsliste.“_
