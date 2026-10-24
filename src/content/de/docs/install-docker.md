---
title: Mit Docker installieren
description: Betreibe Social Home als Docker-Container auf einem Heimserver oder NAS — mit Home Assistant daneben oder ganz für sich.
order: 12
---

Wenn du einen Heimserver oder ein NAS mit Docker hast, läuft Social
Home dort als ein einzelner Container. Es funktioniert für sich, mit
eigenen Konten und Passwörtern, oder zusammen mit einem Home
Assistant, das ohne Apps läuft.

Du nutzt Home Assistant OS? Dann ist die
[Home Assistant App](/de/docs/install-home-assistant/) einfacher — ein
Klick, nichts zu pflegen.

## Was du brauchst

- Docker (gern mit Compose) auf einem 64-Bit-Rechner — `amd64` oder
  `arm64`, ein Raspberry Pi 4 oder 5 geht also auch.
- Platz für die Daten von Social Home. Die Beispiele unten legen sie in
  ein Docker-Volume namens `socialhome-data`; dort liegen die Beiträge,
  Fotos und Schlüssel deines Haushalts.

## 1. Den Container starten

Mit Docker Compose speicherst du das als `docker-compose.yml`:

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

und startest es:

```sh
docker compose up -d
```

Oder mit reinem Docker:

```sh
docker run -d --name socialhome --restart unless-stopped \
  -p 8099:8099 -v socialhome-data:/data \
  ghcr.io/social-home-io/socialhome:latest
```

Du nutzt Home Assistant Container oder Core? Dann füge vor dem Start
die drei Home Assistant Einstellungen aus
[Home Assistant ohne Apps](/de/docs/install-home-assistant/#home-assistant-ohne-apps)
hinzu und mach danach dort weiter.

## 2. Dein Admin-Konto anlegen

Öffne `http://<dein-server>:8099` im Browser. Beim ersten Besuch
öffnet sich **Social Home einrichten**: Wähl einen Benutzernamen und
ein Passwort für dich. Du bist Admin und holst von dort aus den Rest
deines Haushalts dazu.

## 3. Für andere Haushalte erreichbar sein

Um direkt mit einem Haushalt zu koppeln, braucht deiner eine Adresse,
die er erreichen kann — zum Beispiel `https://social.example.com` über
den Reverse Proxy, den du zu Hause schon für anderes nutzt. Trag sie
unter **Einstellungen → Verbindungen → Externe Adresse** ein.

Keine eigene Adresse? Kein Problem: Du kannst über einen
[GFS (Global Federation Server)](/de/docs/glossary/#gfs) koppeln, das
Relay, das Haushalten hilft, einander zu finden. Deine Beiträge bleiben
unterwegs versiegelt.

## 4. Ein Backup behalten

Deine Daten liegen im Volume `socialhome-data`. Öffne ab und zu
**Admin → Sicherung**: Lade ein Backup herunter und erstelle ein
**Wiederherstellungs-Kit**. Das Kit ist eine versiegelte Datei,
geschützt mit einer Passphrase, die du wählst. Es bringt deinen
Haushalt und seine gekoppelten Haushalte auf neuer Hardware zurück,
falls einmal eine Festplatte stirbt. Erstelle ein neues, nachdem du
mit jemand Neuem gekoppelt hast.

## 5. Mit einer Einstellungsdatei feinjustieren (optional)

Die meisten Haushalte brauchen das nie: Die alltäglichen Einstellungen
liegen in der Weboberfläche. Eine Einstellungsdatei, `socialhome.toml`,
ist für die paar Dinge, die Social Home beim Start liest — zum Beispiel
den TURN-Server, den deine Anrufe hinter strengen Netzwerken nutzen,
ein Speicherlimit, deinen eigenen GFS für den Schritt „Mit dem GFS
verbinden“ beim ersten Start, oder die Verbindung zu Home Assistant
statt über Umgebungsvariablen.

1. Lade neben deiner `docker-compose.yml` die Beispieldatei herunter.
   Jede Einstellung darin ist auskommentiert und erklärt:

   ```sh
   curl -o socialhome.toml https://raw.githubusercontent.com/social-home-io/socialhome/main/socialhome.toml.example
   ```

2. Entferne das `#` vor den Zeilen, die du willst, und setz deine
   Werte, zum Beispiel:

   ```toml
   [storage]
   max_storage_bytes = 21474836480   # 20 GB

   [webrtc]
   turn_url = "turn:turn.example.com:3478"
   turn_secret = "das-gemeinsame-geheimnis-deines-turn-servers"
   ```

3. Gib die Datei an den Container und sag Social Home, wo sie liegt —
   zwei Zeilen mehr in `docker-compose.yml`:

   ```yaml
   services:
     socialhome:
       # … wie oben …
       environment:
         SH_CONFIG: /config/socialhome.toml
       volumes:
         - socialhome-data:/data
         - ./socialhome.toml:/config/socialhome.toml:ro
   ```

4. Neu starten: `docker compose up -d`. Social Home liest die Datei nur
   beim Start, also starte nach jeder Änderung neu.

Zwei Dinge solltest du wissen. Eine Umgebungsvariable gewinnt immer
gegen die Datei: Eine Einstellung, die du auch mit `-e` oder unter
`environment:` setzt, ignoriert die Datei. Und wenn die Datei einen
Tippfehler hat, den Social Home nicht lesen kann, startet es
stattdessen mit seinen Standardwerten — prüf nach dem Bearbeiten, ob
deine Änderung angekommen ist.

## Aktualisieren

```sh
docker compose pull
docker compose up -d
```

`latest` folgt den stabilen Releases. Um bei einer bekannten Version
zu bleiben, nimm stattdessen ihren Tag, zum Beispiel
`ghcr.io/social-home-io/socialhome:2026.10.24`.

<details class="tech">
<summary>Unter der Haube</summary>

- Image `ghcr.io/social-home-io/socialhome`, Multi-Arch
  (`linux/amd64`, `linux/arm64`). Tags: `YYYY.M.D[.N]` (fest),
  `YYYY.M` und `YYYY` (rollend), `latest` (aktuelle stabile Version).
- Läuft als Nicht-Root-Benutzer (uid 10001) mit `SH_DATA_DIR=/data`
  und `SH_MODE=standalone` (lokale Konten, scrypt-Passwort-Hashes).
  Setz `SH_MODE=ha` plus `SH_HA_URL` und `SH_HA_TOKEN`, um stattdessen
  Home Assistant zu nutzen.
- Port `8099` ist Weboberfläche, API und WebSocket. Port `8100` ist das
  Haushalts-Dashboard fürs Wandtablet, das aus bleibt, bis ein Admin es
  einschaltet; gib ihn nur frei, wenn du es nutzt, und nur in deinem
  Heimnetz.
- Einstellungen sind geschichtet: `SH_*`-Umgebungsvariablen, dann die
  TOML-Datei unter `SH_CONFIG` (Standard
  `~/.config/socialhome/socialhome.toml`, im Container
  `/home/hsuser/.config/…`, außerhalb des Daten-Volumes — daher der
  Mount), dann eingebaute Standardwerte. Eine fehlende oder nicht
  lesbare Datei wird komplett übersprungen. Das Image setzt
  `SH_DATA_DIR` und `SH_MODE`, deshalb wirken `[storage] data_dir` und
  `[server] mode` aus der Datei unter Docker nicht.
- Schlüssel: `[server]`, `[storage]`, `[federation]` entsprechen dem
  Namen der Einstellung; Schlüssel in `[webrtc]`, `[gfs]`,
  `[highlights]` bekommen den Abschnitt als Präfix
  (`[gfs] default_url` = `SH_GFS_DEFAULT_URL`);
  `[homeassistant] url` / `token` = `SH_HA_URL` / `SH_HA_TOKEN`. Die
  Referenz ist [`socialhome.toml.example`](https://github.com/social-home-io/socialhome/blob/main/socialhome.toml.example).
- Die Datei muss für uid 10001 lesbar sein. Enthält sie ein Home
  Assistant Token, halte sie von anderen Benutzern auf dem Host fern:
  `sudo chgrp 10001 socialhome.toml && chmod 640 socialhome.toml`.
- Bind-Mount statt Volume? Mach den Ordner für uid 10001 beschreibbar
  (`sudo chown 10001:10001 ./data`).
- Healthcheck: `GET /healthz`.

</details>
