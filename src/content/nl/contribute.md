---
title: Meedoen
description: Of je nu code schrijft, teksten vertaalt, ontwerpt of gewoon andere huishoudens over Social Home vertelt — zo kun je helpen.
order: 95
---

Social Home is een klein project dat door een paar vrijwilligers
wordt gerund. Elk duwtje helpt. Er is geen contributor license
agreement om te ondertekenen, geen commerciële partij erachter, en
niemand die bijdragen later wil omzetten in een betaald abonnement.

## Als je code schrijft

De repo's zijn klein en goed gedocumenteerd:

- **Core-server** —
  [`social-home-io/socialhome`](https://github.com/social-home-io/socialhome).
  Python 3.14, aiohttp, SQLite, Preact-frontend.
- **HA-integratie** —
  [`social-home-io/ha-integration`](https://github.com/social-home-io/ha-integration).
  Custom integration; tests via
  `pytest-homeassistant-custom-component`.
- **Clientbibliotheek** —
  [`social-home-io/socialhome-client`](https://github.com/social-home-io/socialhome-client).
  Pure async HTTP/WS-client, zonder HA-afhankelijkheid.
- **HA add-on** —
  [`social-home-io/ha-app`](https://github.com/social-home-io/ha-app).
  Twee kanalen (stable + Early), bashio + tempio.
- **Website** — deze repo op
  [`social-home-io/website`](https://github.com/social-home-io/website).

Lees de bestanden `CLAUDE.md` / `AGENTS.md` in de root van elke
repo voordat je een PR opent — ze leggen de conventies uit
(CalVer, MPL 2.0, geen inline imports, enzovoort) die de codebase
consistent houden.

## Als je vertaalt

Niet-Engelse teksten op deze site en in de apps zijn bedoeld om
bij elke CI-run automatisch door Azure Translator te worden
gegenereerd — het vertaalscript is gepland, maar zit nog niet in
de repo. Hoe dan ook zal de uitkomst niet perfect zijn: lees je
een taal als moedertaalspreker en wringt de formulering, open dan
een PR tegen de **Engelse** bron. We accepteren geen handmatige
bewerkingen van de vertaalde bestanden, omdat de volgende CI-run
ze zou overschrijven.

Wil je een taal onder je hoede nemen (proeflezen + de bron
bijsturen zodat die beter vertaalt), open dan een issue met het
label `i18n` en we voegen je toe als beheerder voor die taal.

## Als je ontwerpt

Alles wat visueel is — illustraties, verfijningen van het
beeldmerk, sets spot-illustraties, sjablonen voor social cards, de
OG-afbeelding — is goud waard. Open een concept-PR met het bestand
(bij voorkeur SVG, onder MPL 2.0-licentie) en vandaar werken we
verder.

## Als je een huishouden runt

Het nuttigste wat je kunt doen is **het installeren en ons
vertellen wat verwarrend was**. De eerste 100 huishoudens die
Social Home proberen, bepalen het werk van het komende jaar
sterker dan welke herschreven spec ook.

## Wat het project _niet_ nodig heeft

- **Geld.** Geen donatielinks, geen Patreon, geen Open Collective —
  het project wordt gerund door mensen die het gebruiken, niet door
  een bedrijf dat zichzelf moet voeden. Als hostingkosten ooit een
  echt probleem worden, zeggen we dat eerst luid en duidelijk.
- **„Kunnen jullie X toevoegen?”**-issues zonder beschrijving van
  het probleem dat je oplost. Een use case is meer waard dan een
  featureverzoek.
- **Beloftes om bij te dragen.** Een werkende pull request, hoe
  klein ook, is meer waard dan een roadmap.

## Tot slot

Social Home is voor mensen die vinden dat hun familiefoto's,
berichten en agenda niet iemand anders' product horen te zijn. Als
dat bij je resoneert, hoor je er al bij.
