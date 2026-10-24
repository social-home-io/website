---
title: Installeren met Docker
description: Draai Social Home als Docker-container op een thuisserver of NAS — met Home Assistant ernaast, of helemaal op zichzelf.
order: 12
---

Heb je een thuisserver of een NAS met Docker, dan draait Social Home
daar als één container. Het werkt op zichzelf, met eigen accounts en
wachtwoorden, of samen met een Home Assistant die zonder apps draait.

Gebruik je Home Assistant OS? Dan is de
[Home Assistant App](/nl/docs/install-home-assistant/) makkelijker —
één klik, niets te onderhouden.

## Wat je nodig hebt

- Docker (met Compose, als je wilt) op een 64-bit-computer — `amd64` of
  `arm64`, dus een Raspberry Pi 4 of 5 kan ook.
- Ruimte voor de gegevens van Social Home. De voorbeelden hieronder
  zetten ze in een Docker-volume met de naam `socialhome-data`; daar
  staan de berichten, foto's en sleutels van je huishouden.

## 1. De container starten

Met Docker Compose sla je dit op als `docker-compose.yml`:

```yaml
services:
  socialhome:
    image: ghcr.io/social-home-io/socialhome:latest
    container_name: socialhome
    restart: unless-stopped
    ports:
      - "8099:8099"
    volumes:
      - socialhome-data:/data

volumes:
  socialhome-data:
```

en start je hem:

```sh
docker compose up -d
```

Of met gewone Docker:

```sh
docker run -d --name socialhome --restart unless-stopped \
  -p 8099:8099 -v socialhome-data:/data \
  ghcr.io/social-home-io/socialhome:latest
```

Gebruik je Home Assistant Container of Core? Voeg dan vóór het starten
de drie Home Assistant-instellingen uit
[Home Assistant zonder apps](/nl/docs/install-home-assistant/#home-assistant-zonder-apps)
toe en ga daarna daar verder.

## 2. Je beheerdersaccount maken

Open `http://<je-server>:8099` in een browser. Bij het eerste bezoek
opent **Social Home instellen**: kies een gebruikersnaam en een
wachtwoord voor jezelf. Jij bent beheerder en haalt van daaruit de
rest van je huishouden erbij.

## 3. Bereikbaar zijn voor andere huishoudens

Om rechtstreeks met een huishouden te koppelen, heeft dat van jou een
adres nodig dat zij kunnen bereiken — bijvoorbeeld
`https://social.example.com` via de reverse proxy die je thuis al voor
andere dingen gebruikt. Vul het in onder **Instellingen → Verbindingen
→ Extern adres**.

Geen eigen adres? Geen probleem: je kunt koppelen via een
[GFS (Global Federation Server)](/nl/docs/glossary/#gfs), de relay die
huishoudens helpt elkaar te vinden. Je berichten blijven onderweg
verzegeld.

## 4. Een back-up bewaren

Je gegevens staan in het volume `socialhome-data`. Open af en toe
**Admin → Back-up**: download een back-up en maak een **Herstelkit**.
De kit is een verzegeld bestand, beschermd met een wachtwoordzin die
je zelf kiest. Hij brengt je huishouden en de gekoppelde huishoudens
terug op nieuwe hardware als er ooit een schijf sneuvelt. Maak een
nieuwe nadat je met iemand nieuw hebt gekoppeld.

## Bijwerken

```sh
docker compose pull
docker compose up -d
```

`latest` volgt de stabiele releases. Wil je op een bekende versie
blijven, gebruik dan de tag ervan, bijvoorbeeld
`ghcr.io/social-home-io/socialhome:2026.10.24`.

<details class="tech">
<summary>Onder de motorkap</summary>

- Image `ghcr.io/social-home-io/socialhome`, multi-arch
  (`linux/amd64`, `linux/arm64`). Tags: `YYYY.M.D[.N]` (vast),
  `YYYY.M` en `YYYY` (meelopend), `latest` (huidige stabiele versie).
- Draait als gebruiker zonder rootrechten (uid 10001) met
  `SH_DATA_DIR=/data` en `SH_MODE=standalone` (lokale accounts,
  scrypt-wachtwoordhashes). Zet `SH_MODE=ha` plus `SH_HA_URL` en
  `SH_HA_TOKEN` om in plaats daarvan Home Assistant te gebruiken.
- Poort `8099` is de webinterface, API en WebSocket. Poort `8100` is het
  huishouddashboard voor de wandtablet, dat uit blijft tot een
  beheerder het aanzet; stel hem alleen open als je het gebruikt, en
  alleen in je thuisnetwerk.
- Elke instelling in `socialhome.toml` heeft een
  `SH_*`-omgevingsvariabele, die voorgaat op het bestand; wijs met
  `SH_CONFIG` een bestand aan om er een te gebruiken. Het
  voorbeeldbestand is
  [`socialhome.toml.example`](https://github.com/social-home-io/socialhome/blob/main/socialhome.toml.example).
- Een bind mount in plaats van het volume? Maak de map schrijfbaar voor
  uid 10001 (`sudo chown 10001:10001 ./data`).
- Healthcheck: `GET /healthz`.

</details>
