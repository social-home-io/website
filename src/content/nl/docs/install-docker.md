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

## 5. Bijstellen met een instellingenbestand (optioneel)

De meeste huishoudens hebben dit nooit nodig: de dagelijkse
instellingen staan in de webinterface. Een instellingenbestand,
`socialhome.toml`, is voor de paar dingen die Social Home bij het
starten leest — bijvoorbeeld de TURN-server die je gesprekken achter
strenge netwerken gebruiken, een opslaglimiet, je eigen GFS voor de
stap „Verbinden met de GFS” bij de eerste start, of de verbinding met
Home Assistant in plaats van via omgevingsvariabelen.

1. Download naast je `docker-compose.yml` het voorbeeldbestand. Elke
   instelling erin staat uitgecommentarieerd en is uitgelegd:

   ```sh
   curl -o socialhome.toml https://raw.githubusercontent.com/social-home-io/socialhome/main/socialhome.toml.example
   ```

2. Haal het `#` weg voor de regels die je wilt en vul je waarden in,
   bijvoorbeeld:

   ```toml
   [storage]
   max_storage_bytes = 21474836480   # 20 GB

   [webrtc]
   turn_url = "turn:turn.example.com:3478"
   turn_secret = "het-gedeelde-geheim-van-je-turn-server"
   ```

3. Geef het bestand aan de container en vertel Social Home waar het
   staat — twee regels extra in `docker-compose.yml`:

   ```yaml
   services:
     socialhome:
       # … zoals hierboven …
       environment:
         SH_CONFIG: /config/socialhome.toml
       volumes:
         - socialhome-data:/data
         - ./socialhome.toml:/config/socialhome.toml:ro
   ```

4. Opnieuw starten: `docker compose up -d`. Social Home leest het
   bestand alleen bij het starten, dus start na elke wijziging opnieuw.

Twee dingen om te weten. Een omgevingsvariabele wint altijd van het
bestand: een instelling die je ook met `-e` of onder `environment:`
meegeeft, negeert het bestand. En als het bestand een typfout heeft
die Social Home niet kan lezen, start het in plaats daarvan met de
standaardwaarden — controleer na het bewerken of je wijziging is
doorgekomen.

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
- Instellingen zijn gelaagd: `SH_*`-omgevingsvariabelen, dan het
  TOML-bestand op `SH_CONFIG` (standaard
  `~/.config/socialhome/socialhome.toml`, in de container
  `/home/hsuser/.config/…`, buiten het datavolume — vandaar de mount),
  dan ingebouwde standaardwaarden. Een bestand dat ontbreekt of niet te
  lezen is, wordt in zijn geheel overgeslagen. De image zet
  `SH_DATA_DIR` en `SH_MODE`, dus `[storage] data_dir` en
  `[server] mode` in het bestand hebben onder Docker geen effect.
- Sleutels: `[server]`, `[storage]`, `[federation]` komen overeen met
  de naam van de instelling; sleutels in `[webrtc]`, `[gfs]`,
  `[highlights]` krijgen de sectie als voorvoegsel
  (`[gfs] default_url` = `SH_GFS_DEFAULT_URL`);
  `[homeassistant] url` / `token` = `SH_HA_URL` / `SH_HA_TOKEN`. De
  referentie is [`socialhome.toml.example`](https://github.com/social-home-io/socialhome/blob/main/socialhome.toml.example).
- Het bestand moet leesbaar zijn voor uid 10001. Staat er een Home
  Assistant-token in, houd het dan weg van andere gebruikers op de
  host: `sudo chgrp 10001 socialhome.toml && chmod 640 socialhome.toml`.
- Een bind mount in plaats van het volume? Maak de map schrijfbaar voor
  uid 10001 (`sudo chown 10001:10001 ./data`).
- Healthcheck: `GET /healthz`.

</details>
