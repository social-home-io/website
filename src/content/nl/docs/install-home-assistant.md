---
title: Installeren op Home Assistant
description: Installeer de Social Home-app in Home Assistant in ongeveer vijf minuten. Geen pagina Apps? Draai Social Home naast Home Assistant en voeg de integratie toe via HACS.
order: 11
---

Dit is de manier die we aanraden. Social Home draait als app in je
Home Assistant, start ermee, wordt ermee geback-upt en opent vanuit de
zijbalk van Home Assistant. Je hoeft geen poort te openen, geen
wachtwoord in te stellen en geen token te kopiëren: dat doet de app
allemaal voor je.

Je hebt Home Assistant OS of Home Assistant Supervised nodig — heb je
onder **Instellingen** een pagina **Apps**, dan zit je goed — op een
64-bit-computer (een Home Assistant Green of Yellow, een Raspberry Pi
4 of 5, of een mini-pc), met Home Assistant **2026.3 of nieuwer**.

Geen pagina **Apps**? Dan gebruik je Home Assistant Container of Core,
en [het deel hieronder](#home-assistant-zonder-apps) is voor jou.

## 1. De app toevoegen

Klik op de knop en bevestig in je Home Assistant:

[**Social Home toevoegen aan Home Assistant →**](https://my.home-assistant.io/redirect/supervisor_addon/?addon=752dab87_socialhome&repository_url=https%3A%2F%2Fgithub.com%2Fsocial-home-io%2Fha-app)

Hij voegt de app-repository van Social Home toe en opent de pagina van
de app.

<details class="tech">
<summary>Onder de motorkap</summary>

Met de hand: open in Home Assistant **Instellingen → Apps**, ga naar de
app-winkel, kies **Repositories** in het menu met de drie puntjes en
plak

```
https://github.com/social-home-io/ha-app
```

Er verschijnen twee apps: **Social Home** (stabiel, voor elke dag) en
**Social Home (Early)** (release candidates, één versie voor op
stabiel — voor huishoudens die nieuwe dingen graag als eerste
proberen). De images zijn kant-en-klaar voor `aarch64` en `amd64`.

</details>

## 2. Installeren en starten

Klik op **Installeren**. Dat duurt ongeveer een minuut. Klik daarna op
**Starten**.

Bij de eerste start maakt de app jou beheerder (de eigenaar van je
Home Assistant) en stelt hij zich voor aan Home Assistant.

<details class="tech">
<summary>Onder de motorkap</summary>

Het tabblad **Logboek** toont de eerste start:

```
[INFO] Starting Social Home...
[INFO] Configuration written to /data/social_home.toml
[INFO] HA owner detected: alex · provisioned as admin
[INFO] Integration token written to /data/integration_token.txt
[INFO] Discovery pushed to Supervisor
```

</details>

## 3. Ja zeggen tegen de integratie

De app neemt zijn Home Assistant-integratie gewoon mee — je hoeft
niets van ergens anders te downloaden. Binnen een paar seconden toont
Home Assistant onder **Instellingen → Apparaten & diensten** een kaart
**Ontdekt** voor Social Home. Klik op **Configureren** en bevestig. Er
valt niets in te typen.

Via de integratie bereiken andere huishoudens je huis op het adres van
je Home Assistant. Hij kan ook delen waar je mensen volgens Home
Assistant zijn, als je dat aanzet.

## 4. Social Home openen

Klik op **Social Home** in de zijbalk van Home Assistant. Klaar: als je
je Home Assistant kunt bereiken, kun je Social Home bereiken — in de
browser en in de Home Assistant Companion-app. Iedereen bij jou thuis
die het vanuit de zijbalk opent, krijgt een eigen Social Home-account.

**Back-ups** gaan mee met je Home Assistant-back-ups: zet er een terug
en Social Home is er weer, gekoppelde huishoudens inbegrepen.

En nu? Zie [Aan de slag → Na de
installatie](/nl/docs/getting-started/#na-de-installatie).

## Home Assistant zonder apps

Gebruik je Home Assistant Container of Home Assistant Core? Die hebben
geen apps, maar Social Home werkt er net zo goed mee. Je draait Social
Home naast Home Assistant, op dezelfde computer of een andere bij je
thuis, en voegt daarna de Social Home-integratie toe via
[HACS](https://hacs.xyz/). Dat duurt ongeveer twintig minuten, en je
doet het maar één keer.

### 1. Een token maken voor Social Home

Social Home heeft toestemming nodig om met je Home Assistant te
praten. Open in Home Assistant je **profiel** (linksonder), ga naar het
tabblad **Beveiliging** en klik onder **Langdurige toegangstokens** op
**Token aanmaken**. Noem het „Social Home” en kopieer het. Je plakt het
in de volgende stap.

### 2. Social Home starten

Start Social Home met [Docker](/nl/docs/install-docker/) (hier het
makkelijkst, omdat je Home Assistant waarschijnlijk al met Docker
draait) of met [Python](/nl/docs/install-python/). Volg die pagina en
geef Social Home drie extra instellingen mee:

| Instelling    | Wat je invult                                                            |
| ------------- | ------------------------------------------------------------------------ |
| `SH_MODE`     | `ha`                                                                     |
| `SH_HA_URL`   | het adres van je Home Assistant, bijv. `http://homeassistant.local:8123` |
| `SH_HA_TOKEN` | het token uit stap 1                                                     |

Liever een instellingenbestand? Dezelfde drie komen in
`socialhome.toml` als `mode = "ha"` onder `[server]`, en `url` en
`token` onder `[homeassistant]` — zie
[het instellingenbestand](/nl/docs/install-docker/#5-bijstellen-met-een-instellingenbestand-optioneel).
Voor Docker zijn dat drie extra `-e`-regels (of drie regels onder
`environment:` in Compose):

```sh
docker run -d --name socialhome --restart unless-stopped \
  -p 8099:8099 -v socialhome-data:/data \
  -e SH_MODE=ha \
  -e SH_HA_URL=http://homeassistant.local:8123 \
  -e SH_HA_TOKEN=plak-hier-je-token \
  ghcr.io/social-home-io/socialhome:latest
```

### 3. Kiezen wie de baas is

Open `http://<je-server>:8099` in een browser. Social Home toont de
personen uit je Home Assistant: kies wie beheerder wordt en stel een
wachtwoord in om mee in te loggen. (Niemand in de lijst? Voeg jezelf
eerst toe in Home Assistant onder **Instellingen → Personen**.)

### 4. De integratie toevoegen via HACS

[HACS](https://hacs.xyz/) is de communitywinkel die de meeste Home
Assistant-gebruikers al hebben voor extra integraties. Heb je hem nog
niet, dan helpt de [installatiehandleiding](https://hacs.xyz/docs/use/)
je op weg.

1. Open in Home Assistant **HACS**, kies **Aangepaste repositories** in
   het menu met de drie puntjes, plak
   `https://github.com/social-home-io/ha-integration` en kies het type
   **Integratie**.
2. Zoek **Social Home** in HACS, klik op **Downloaden** en start Home
   Assistant opnieuw.
3. Ga naar **Instellingen → Apparaten & diensten → Integratie
   toevoegen** en kies **Social Home**.
4. Er wordt om twee dingen gevraagd: het adres van Social Home
   (`http://<je-server>:8099`) en een API-token. Maak het token in
   Social Home onder **Instellingen → Beveiliging** en plak het.

Klaar. Andere huishoudens bereiken je huis nu op het adres van je Home
Assistant, en Social Home kan delen waar je mensen volgens Home
Assistant zijn, als je dat aanzet in de opties van de integratie.

<details class="tech">
<summary>Onder de motorkap</summary>

- `SH_MODE=ha` praat via de REST-API met Home Assistant, met het
  langdurige token; de app draait in plaats daarvan als `haos` met de
  Supervisor. Zonder de integratie vul je het adres voor andere
  huishoudens zelf in: **Instellingen → Verbindingen → Extern adres**.
- De integratie geeft Social Home de externe URL (of interne URL) van
  Home Assistant bij het instellen en bij elke wijziging, geeft de
  STUN/TURN-servers van Home Assistant door (die van Nabu Casa
  inbegrepen), stuurt federatie-enveloppen op
  `/api/socialhome/inbox/{id}` door zonder ze te lezen, en — als
  **sync location** in de opties aan staat — geeft posities van
  `person.*` door, afgekapt op 4 decimalen.
- Back-ups: buiten de app bevatten de back-ups van Home Assistant geen
  Social Home. Download een back-up onder **Admin → Back-up** en maak
  daar ook een **Herstelkit** — de kit brengt de identiteit van je
  huishouden en de gekoppelde huishoudens terug op nieuwe hardware.

</details>
