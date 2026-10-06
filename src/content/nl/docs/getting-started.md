---
title: Aan de slag
description: Installeer de Social Home add-on, rond de integratieprompt met één klik af, en je bent klaar. Ongeveer vijf minuten, koffie inbegrepen.
order: 10
---

Social Home installeert als Home Assistant add-on, dus je hebt een
Home Assistant met de Supervisor nodig — dat is **Home Assistant
OS** of **Home Assistant Supervised**, op een aarch64-machine
(Raspberry Pi, Home Assistant Green/Yellow) of een amd64-machine,
met Home Assistant **2026.3 of nieuwer**. Draai je in plaats
daarvan de Container- of Core-variant, dan kun je Social Home als
[losstaande Docker-container](https://github.com/social-home-io/socialhome#docker)
draaien (die stelt de poorten 8099 en 8124 beschikbaar) en de
integratie handmatig toevoegen.

## 1. Voeg de add-on-repository toe

Klik op de
[„Toevoegen aan Home Assistant”-knop](https://my.home-assistant.io/redirect/supervisor_addon/?addon=752dab87_socialhome&repository_url=https%3A%2F%2Fgithub.com%2Fsocial-home-io%2Fha-app)
— die voegt met één klik de repository toe en opent de
add-on-pagina voor je.

Doe je het liever met de hand? Open in Home Assistant
**Instellingen → Add-ons → Add-on winkel**. Klik rechtsboven op het
menu met de drie puntjes en kies **Repositories**. Plak deze URL:

```
https://github.com/social-home-io/ha-app
```

Er verschijnen twee nieuwe add-ons: **Social Home** (stable,
aanbevolen) en **Social Home (Early)** (release candidates, één
versie vóór stable — voor huishoudens die dingen graag als eerste
uitproberen).

## 2. Installeer **Social Home**

Klik op **Installeren**. De images zijn vooraf gebouwd, dus dit
duurt ongeveer een minuut. Klik daarna op **Starten** en open het
tabblad **Log** om te controleren of de bootstrap is gelukt:

```
[INFO] Starting Social Home...
[INFO] Configuration written to /data/social_home.toml
[INFO] HA owner detected: alex · provisioned as admin
[INFO] Integration token written to /data/integration_token.txt
[INFO] Discovery pushed to Supervisor
```

## 3. Voeg de integratie toe

De add-on bevat de Home Assistant-integratie en kopieert die bij
het opstarten naar `custom_components` — niets te downloaden,
niets ergens anders vandaan te installeren. Binnen enkele seconden
toont Home Assistant een discovery-kaart onder **Instellingen →
Apparaten & diensten**. Klik op **Configureren** op de Social
Home-kaart. Je hoeft niets in te typen — de add-on heeft al een
beheerder aangemaakt en een token uitgegeven.

## 4. Open de webinterface

Klik op **Social Home** in de zijbalk van HA (het pictogram is een
huisje met een chat-inkeping). De pagina opent via Home Assistant
Ingress op poort 8099, dus er hoeft niets doorgestuurd en niets
blootgesteld te worden — als je bij je Home Assistant kunt, kun je
bij Social Home. Het eerste verzoek maakt je een gewoon lid; het
beheerdersaccount dat de add-on bij de eerste start aanmaakte, is
standaard van jou.

## Wat nu

- Koppel een ander huishouden: **Instellingen → Verbindingen →
  Huishouden koppelen** in de webinterface. Zie
  [Huishoudens, gefedereerd](/nl/docs/federation/) voor de
  QR-scanprocedure.
- Stel een externe URL in zodat andere huishoudens je kunnen
  bereiken. HA stuurt wat je invult bij **Instellingen → Netwerk →
  Externe URL** (of je Nabu Casa Remote UI) automatisch door naar
  Social Home — geen handmatige stap.
- Heb je een HA-spraakopstelling met microfoon, probeer dan
  _„Hey HA, zet olijfolie op de boodschappenlijst.”_
