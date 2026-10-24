---
title: Aan de slag
description: Social Home draait het makkelijkst als app in Home Assistant — één klik, ongeveer vijf minuten. Docker en Python kan ook.
order: 10
---

Social Home draait bij jou thuis, op een computer die je al hebt. De
makkelijkste manier — en de manier die we aanraden — is de **Social
Home-app voor Home Assistant**. Gebruik je Home Assistant OS (op een
Home Assistant Green of Yellow, een Raspberry Pi of een mini-pc) of
Home Assistant Supervised, dan is het één klik en ongeveer vijf
minuten, koffie inbegrepen.

[**Social Home toevoegen aan Home Assistant →**](https://my.home-assistant.io/redirect/supervisor_addon/?addon=752dab87_socialhome&repository_url=https%3A%2F%2Fgithub.com%2Fsocial-home-io%2Fha-app)

De knop opent je Home Assistant, voegt de app toe en toont je de knop
**Installeren**. De app regelt alles voor je: je account en de
verbinding met Home Assistant. Er valt niets in te typen en er hoeft
geen poort open. De [stap-voor-stap-handleiding](/nl/docs/install-home-assistant/)
loopt het met je door en laat zien wat je kunt verwachten.

## Andere manieren om te installeren

Geen Home Assistant OS? Social Home draait ook elders. Feed, agenda,
spaces en koppelen werken overal hetzelfde; wat verschilt, is hoeveel
je zelf instelt. Een paar extra's komen van Home Assistant — spraak,
meldingen via de Home Assistant Companion-app, en plaatsen en personen
die je Home Assistant volgen — dus daarvoor moet Home Assistant naast
Social Home draaien.

| Hoe                                                                                       | Goed voor                                                       | Moeite              |
| ----------------------------------------------------------------------------------------- | --------------------------------------------------------------- | ------------------- |
| [Home Assistant App](/nl/docs/install-home-assistant/)                                    | Home Assistant OS — **aangeraden**                              | één klik            |
| [Home Assistant zonder apps](/nl/docs/install-home-assistant/#home-assistant-zonder-apps) | Home Assistant Container of Core, plus de integratie uit HACS   | ongeveer 20 minuten |
| [Docker-container](/nl/docs/install-docker/)                                              | een thuisserver of NAS met Docker, met of zonder Home Assistant | ongeveer 15 minuten |
| [Python](/nl/docs/install-python/)                                                        | uitproberen op je laptop, of een server die je zelf beheert     | ongeveer 15 minuten |

Twijfel je? Heeft je Home Assistant onder **Instellingen** een pagina
**Apps**, kies dan de app.

## Na de installatie

- **Haal je huishouden erbij.** Iedereen bij jou thuis krijgt een
  eigen account. Met de Home Assistant App krijgt iedereen die Social
  Home opent vanuit de zijbalk van Home Assistant er automatisch een.
- **Een ander huishouden koppelen:** **Instellingen → Verbindingen →
  Huishouden koppelen**. Zie
  [Huishoudens, gefedereerd](/nl/docs/federation/) voor de stappen met
  de QR-code.
- Met een spraakassistent in Home Assistant, probeer eens
  _„Hey HA, zet olijfolie op de boodschappenlijst.”_
