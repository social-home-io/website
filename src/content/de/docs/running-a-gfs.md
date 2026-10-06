---
title: Ein Relay selbst betreiben
description: Setz in etwa 15 Minuten einen Global Federation Server (GFS) auf einem VPS auf. Docker Compose + Cloudflare, mehr nicht.
order: 60
---

Ein Relay ist das, womit Haushalte, die sich nie gekoppelt haben,
einander finden — ein öffentlicher Eltern-Space etwa, oder ein
Nachbarschafts-Brett, dem jeder folgen kann. Jeder kann eines
betreiben, und diese Seite führt dich in etwa 15 Minuten hindurch.

Der [GFS (Global Federation Server – der globale Föderationsserver)](/de/docs/glossary/#gfs)
— das Relay, das Haushalten hilft, einander zu finden — hat drei
Aufgaben. Er ist ein Verzeichnis, damit Haushalte öffentliche und
globale Spaces finden. Er transportiert versiegelte Beiträge für
öffentliche und globale Spaces (und für private Spaces, deren
Besitzer den GFS eingeschaltet hat), damit ein Space weiterläuft,
während sein Host schläft. Und er vermittelt öffentliche
Highlight-Links — siehe
[Highlights → öffentlich teilen](/de/docs/highlights/#öffentlich-teilen-über-einen-global-server)
für den Ablauf aus Sicht des Autors. Bei jeder dieser Aufgaben
hantiert er nur mit Umschlägen: Er liest nie eine Nachricht,
speichert nie einen Highlight-Frame. Ein eigenes Relay zu hosten
heißt, dass deine Community entscheidet, wer beitreten darf, und
dass es keine einzelne Partei im Zentrum gibt.

## Was du brauchst

- Einen VPS mit öffentlicher IP — jeder Anbieter tut es.
- Einen Domainnamen. Eine Subdomain reicht — `gfs.example.com`.
- Ein Cloudflare-Konto im kostenlosen Tarif, als TLS-Terminierung
  und DDoS-Schutz.
- Docker auf dem VPS installiert.

Etwa 15 Minuten von Anfang bis Ende.

## 1. Richte deine Domain auf den Server

Füge in Cloudflare DNS einen **A-Eintrag** hinzu:

| Typ | Name  | IPv4-Adresse     | Proxy-Status |
| --- | ----- | ---------------- | ------------ |
| A   | `gfs` | `YOUR.SERVER.IP` | 🟠 Proxied   |

> Der Status „Proxied“ (orangefarbene Wolke) bedeutet, dass
> Cloudflare HTTPS für dich übernimmt — keine Zertifikate zu
> installieren, keine Verlängerungen zu verwalten. Dein Server muss
> intern nur HTTP sprechen.

Stell dann unter **Cloudflare → SSL/TLS → Overview** den
Verschlüsselungsmodus auf **Flexible** — das Relay selbst lauscht
hinter dem Proxy auf reinem HTTP. Wenn du TLS lieber selbst auf dem
Server terminierst (etwa mit Caddy vor dem Container), nimm
stattdessen **Full (strict)**.

## 2. Lege das Projektverzeichnis an

Per SSH auf deinen VPS:

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

## 4. Konfiguration initialisieren

```bash
docker run --rm -v "$PWD/data:/var/lib/sh-gfs" \
  ghcr.io/social-home-io/gfs:latest \
  socialhome-global-server --init --config /var/lib/sh-gfs/global_server.toml

docker run --rm -it -v "$PWD/data:/var/lib/sh-gfs" \
  ghcr.io/social-home-io/gfs:latest \
  socialhome-global-server --set-password --config /var/lib/sh-gfs/global_server.toml
```

`--init` schreibt eine frische Konfiguration; `--set-password` setzt
das Passwort für das Admin-Portal, das du unter
`https://gfs.example.com/admin` findest, sobald das Relay läuft.

Öffne `data/global_server.toml` und trag deine Domain ein:

```toml
[server]
base_url = "https://gfs.example.com"
```

<details class="tech">
<summary>Unter der Haube</summary>

Jede Option in `global_server.toml` lässt sich auch als
Umgebungsvariable mit dem Präfix `GFS_` setzen — praktisch, wenn du
die Compose-Datei lieber in sich geschlossen halten willst:

| Variable          | Konfigurationsschlüssel | Standard          |
| ----------------- | ----------------------- | ----------------- |
| `GFS_HOST`        | `[server] host`         | `0.0.0.0`         |
| `GFS_PORT`        | `[server] port`         | `8765`            |
| `GFS_BASE_URL`    | `[server] base_url`     | —                 |
| `GFS_DATA_DIR`    | Datenverzeichnis        | `/var/lib/sh-gfs` |
| `GFS_OPEN_SIGNUP` | `open_signup`           | `false`           |

Bei gleichem Schlüssel gewinnt die Umgebungsvariable über die Datei.

</details>

## Standardeinstellungen

Ab Werk ist ein frisches Relay an den richtigen Stellen vorsichtig.
Haushalte, die sich damit koppeln, werden automatisch angenommen
(`auto_accept_clients`), sodass sich Leute verbinden können, ohne
dass du irgendetwas anklicken musst. Spaces, die auf deinem Relay
veröffentlicht werden, warten dagegen im Admin-Portal auf deine
Freigabe (`auto_accept_spaces = false`) — dein Verzeichnis listet
nur, was du dir angesehen hast. Die offene Registrierung ist aus,
sodass niemand ein Konto auf dem Relay selbst anlegen kann, solange
du sie nicht einschaltest.

## 5. Firewall öffnen

Auf dem VPS:

```bash
sudo ufw allow 80/tcp        # Cloudflare-Proxy → GFS
```

Port 8765 muss **nicht** offen sein — er ist intern im
Docker-Netzwerk.

## 6. Relay starten

```bash
docker compose up -d
```

Prüfe von deinem Laptop aus, dass es antwortet:

```sh
curl https://gfs.example.com/healthz
# → {"status":"ok","version":"…"}
```

## 7. Von Social Home aus verbinden

In Social Home → **Einstellungen → Verbindungen → Global Federation
Servers → GFS hinzufügen**:

- URL: `https://gfs.example.com`
- Klicke auf **Koppeln**

Fertig. Wenn dein Relay Kopplungs-Tokens ausgibt (zum Beispiel aus
dem Admin-Portal), ist jedes Token einmalig nutzbar und 10 Minuten
gültig.

## Was dein Relay sehen wird

Ein Relay zu betreiben gibt dir kein Fenster in irgendeinen Space.
Beiträge kommen versiegelt und aufgepolstert an; du erfährst, zu
welchem Space ein Umschlag gehört und wann er angekommen ist, und —
im standardmäßigen vertrauenden Modus (trusted) eines Space —
welcher Haushalt ihn veröffentlicht hat. Im strengen Modus (strict)
erfährst du nicht einmal das. Das vollständige Bild, einschließlich
dessen, was das Relay weiterhin beobachten kann (Timing, Größen,
IP-Adressen), steht im [Sicherheitsmodell](/de/docs/security/).

## Aktualisieren

```bash
cd ~/gfs
docker compose pull
docker compose up -d
```

Der Container ist bis auf `./data` zustandslos; ein Backup ist ein
schlichtes `tar -czf data.tgz ./data`.

## Das Projekt-Relay

Wenn du kein eigenes betreiben willst: Das Projekt hostet ein
öffentliches Relay unter [`gfs.social-home.io`](/de/servers/) — ein
QR-Scan, und du bist gekoppelt. Deinen Space auf ein Relay zu
richten, dem du vertraust, ist allerdings der ganze Sinn davon, eine
Wahl zu haben — für jede Community mit mehr als einer Handvoll
Haushalten ist ein eigenes Relay daher empfohlen.
