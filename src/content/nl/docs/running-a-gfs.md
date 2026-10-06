---
title: Zelf een relay draaien
description: Zet in ongeveer 15 minuten een Global Federation Server (GFS) op een VPS. Docker Compose + Cloudflare, meer niet.
order: 60
---

Een relay is wat huishoudens die nooit gekoppeld zijn, elkaar
laat vinden – een openbare ouderspace, bijvoorbeeld, of een
buurtprikbord dat iedereen kan volgen. Iedereen kan er een
draaien, en deze pagina leidt je er in ongeveer 15 minuten
doorheen.

De [GFS (Global Federation Server – de wereldwijde federatieserver)](/nl/docs/glossary/#gfs)
– de relay die huishoudens helpt elkaar te vinden – heeft drie
taken. Hij is een gids, zodat huishoudens openbare en
wereldwijde spaces kunnen vinden. Hij draagt verzegelde posts
voor openbare en wereldwijde spaces (en voor privéspaces waarvan
de eigenaar de GFS heeft ingeschakeld), zodat een space blijft
stromen terwijl de host slaapt. En hij bemiddelt openbare
highlight-links – zie
[Highlights → openbaar delen](/nl/docs/highlights/#openbaar-delen-via-een-global-server)
voor de kant van de auteur. Bij elke taak verwerkt hij alleen
enveloppen: hij leest nooit een bericht, slaat nooit een
highlight-frame op. Je eigen relay hosten betekent dat je
community bepaalt wie mag meedoen, en dat er geen enkele partij
in het centrum zit.

## Wat je nodig hebt

- Een VPS met een publiek IP – elke aanbieder is goed.
- Een domeinnaam. Een subdomein is prima – `gfs.example.com`.
- Een Cloudflare-account op het gratis abonnement, gebruikt als
  TLS-terminator en DDoS-schild.
- Docker geïnstalleerd op de VPS.

Ongeveer 15 minuten van begin tot eind.

## 1. Wijs je domein naar de server

Voeg in Cloudflare DNS een **A-record** toe:

| Type | Naam  | IPv4-adres       | Proxystatus |
| ---- | ----- | ---------------- | ----------- |
| A    | `gfs` | `YOUR.SERVER.IP` | 🟠 Proxied  |

> De status "Proxied" (oranje wolk) betekent dat Cloudflare HTTPS
> voor je afhandelt – geen certificaten om te installeren, geen
> verlengingen om bij te houden. Je server hoeft intern alleen
> HTTP te spreken.

Zet dan in **Cloudflare → SSL/TLS → Overview** de
versleutelingsmodus op **Flexible** – de relay zelf luistert
achter de proxy op gewoon HTTP. Wil je TLS liever zelf op de
server afhandelen (bijvoorbeeld met Caddy voor de container),
gebruik dan **Full (strict)**.

## 2. Maak de projectmap aan

SSH naar je VPS:

```bash
mkdir -p ~/gfs/data
cd ~/gfs
```

## 3. `docker-compose.yml`

```yaml
services:
  gfs:
    image: ghcr.io/social-home-io/gfs:latest
    container_name: gfs
    restart: unless-stopped
    command: ["socialhome-global-server", "--config", "/var/lib/sh-gfs/global_server.toml"]
    volumes:
      - ./data:/var/lib/sh-gfs
    ports:
      - "80:8765"
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8765/healthz"]
      interval: 30s
      timeout: 5s
      retries: 3
```

## 4. Initialiseer de configuratie

```bash
docker run --rm -v "$PWD/data:/var/lib/sh-gfs" \
  ghcr.io/social-home-io/gfs:latest \
  socialhome-global-server --init --config /var/lib/sh-gfs/global_server.toml

docker run --rm -it -v "$PWD/data:/var/lib/sh-gfs" \
  ghcr.io/social-home-io/gfs:latest \
  socialhome-global-server --set-password --config /var/lib/sh-gfs/global_server.toml
```

`--init` schrijft een verse configuratie; `--set-password` stelt
het wachtwoord in voor het beheerportaal, dat je op
`https://gfs.example.com/admin` vindt zodra de relay draait.

Open `data/global_server.toml` en stel je domein in:

```toml
[server]
base_url = "https://gfs.example.com"
```

<details class="tech">
<summary>Onder de motorkap</summary>

Elke optie in `global_server.toml` kan ook als
omgevingsvariabele met het voorvoegsel `GFS_` worden ingesteld –
handig als je het compose-bestand liever op zichzelf laat staan:

| Variabele         | Configuratiesleutel | Standaard         |
| ----------------- | ------------------- | ----------------- |
| `GFS_HOST`        | `[server] host`     | `0.0.0.0`         |
| `GFS_PORT`        | `[server] port`     | `8765`            |
| `GFS_BASE_URL`    | `[server] base_url` | —                 |
| `GFS_DATA_DIR`    | datamap             | `/var/lib/sh-gfs` |
| `GFS_OPEN_SIGNUP` | `open_signup`       | `false`           |

Bij dezelfde sleutel wint een omgevingsvariabele van het bestand.

</details>

## Standaardinstellingen

Uit de doos is een verse relay voorzichtig op de juiste plekken.
Huishoudens die ermee koppelen worden automatisch geaccepteerd
(`auto_accept_clients`), zodat mensen kunnen verbinden zonder
dat jij ergens op hoeft te klikken. Spaces die op je relay
worden gepubliceerd, wachten daarentegen op jouw goedkeuring in
het beheerportaal (`auto_accept_spaces = false`) – je gids toont
alleen wat je zelf hebt bekeken. Open registratie staat uit, dus
niemand kan een account op de relay zelf aanmaken tenzij je dat
inschakelt.

## 5. Open de firewall

Op de VPS:

```bash
sudo ufw allow 80/tcp        # Cloudflare-proxy → GFS
```

Poort 8765 hoeft **niet** open – die is intern voor het
Docker-netwerk.

## 6. Start de relay

```bash
docker compose up -d
```

Controleer vanaf je laptop dat hij antwoordt:

```sh
curl https://gfs.example.com/healthz
# → {"status":"ok","version":"…"}
```

## 7. Verbind vanuit Social Home

In Social Home → **Instellingen → Verbindingen → Global
Federation Servers → GFS toevoegen**:

- URL: `https://gfs.example.com`
- Klik op **Koppelen**

Klaar. Deelt je relay koppeltokens uit (bijvoorbeeld vanuit het
beheerportaal), dan is elk token eenmalig te gebruiken en 10
minuten geldig.

## Wat je relay zal zien

Een relay draaien geeft je geen inkijk in iemands space. Posts
komen verzegeld en opgevuld binnen; je leert bij welke space een
envelop hoort en wanneer hij is aangekomen, en – in de standaard
"vertrouwde" modus van een space – welk huishouden hem heeft
gepubliceerd. In de strikte modus leer je zelfs dat niet. Voor
het volledige beeld, inclusief wat de relay nog wél kan
waarnemen (timing, groottes, IP-adressen), lees je het
[beveiligingsmodel](/nl/docs/security/).

## Bijwerken

```bash
cd ~/gfs
docker compose pull
docker compose up -d
```

De container is stateless, afgezien van `./data`; een back-up is
gewoon `tar -czf data.tgz ./data`.

## De relay van het project

Wil je er geen zelf draaien, dan host het project één openbare
relay op [`gfs.social-home.io`](/nl/servers/) – één QR-scan en
je bent gekoppeld. Maar je space richten op een relay die jíj
vertrouwt, is nou juist de hele reden om keuze te hebben, dus
zelf een relay draaien wordt aangemoedigd voor elke community
van meer dan een handvol huishoudens.
