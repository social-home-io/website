---
title: Mit Python installieren
description: Installiere Social Home von PyPI und starte es mit Python — zum Ausprobieren auf dem Laptop oder auf einem Server, den du selbst betreust.
order: 13
---

Social Home ist ein Python-Programm, also kannst du es auch wie eines
installieren. Das ist praktisch, um es auf dem Laptop auszuprobieren
oder auf einem Server zu betreiben, den du ohnehin betreust. Für ein
Zuhause, in dem es einfach laufen soll, ist die
[Home Assistant App](/de/docs/install-home-assistant/) oder
[Docker](/de/docs/install-docker/) weniger Pflege.

## Was du brauchst

- **Python 3.14** oder neuer. Prüf es mit `python3 --version`.
- 64-Bit-Linux (x86 oder ARM, etwa ein Raspberry Pi 4 oder 5) oder
  einen Mac mit Apple Silicon.

## 1. Installieren

Leg Social Home einen eigenen Ordner an und installiere es dort, damit
es dem Rest auf dem Rechner nicht in die Quere kommt:

```sh
python3.14 -m venv ~/socialhome
~/socialhome/bin/pip install socialhome
```

## 2. Starten

```sh
~/socialhome/bin/python -m socialhome
```

Social Home antwortet jetzt auf Port 8099. Lass das Terminal offen
oder betreibe es als Dienst (siehe „Unter der Haube“).

## 3. Dein Admin-Konto anlegen

Öffne `http://localhost:8099` (oder `http://<dein-server>:8099`) im
Browser. Beim ersten Besuch öffnet sich **Social Home einrichten**:
Wähl einen Benutzernamen und ein Passwort für dich. Du bist Admin und
holst von dort aus den Rest deines Haushalts dazu.

Du nutzt Home Assistant Container oder Core daneben? Setz vor dem
ersten Start die drei Home Assistant Einstellungen aus
[Home Assistant ohne Apps](/de/docs/install-home-assistant/#home-assistant-ohne-apps)
und mach danach dort weiter.

## 4. Für andere Haushalte erreichbar sein und ein Backup behalten

Beides funktioniert wie bei Docker: eine **Externe Adresse** unter
**Einstellungen → Verbindungen**, wenn Haushalte dich direkt erreichen
sollen (oder du koppelst über einen GFS), und ein Backup plus ein
**Wiederherstellungs-Kit** unter **Admin → Sicherung**. Siehe
[Mit Docker installieren](/de/docs/install-docker/#3-für-andere-haushalte-erreichbar-sein).

## Mit einer Einstellungsdatei feinjustieren (optional)

Die alltäglichen Einstellungen liegen in der Weboberfläche. Für die
paar Dinge, die Social Home beim Start liest — einen TURN-Server für
Anrufe, ein Speicherlimit, deinen eigenen GFS, die Verbindung zu Home
Assistant — gibt es eine Einstellungsdatei. Kopier die Beispieldatei,
in der jede Einstellung auskommentiert und erklärt ist, an die Stelle,
an der Social Home sie sucht:

```sh
mkdir -p ~/.config/socialhome
curl -o ~/.config/socialhome/socialhome.toml https://raw.githubusercontent.com/social-home-io/socialhome/main/socialhome.toml.example
```

Entferne das `#` vor den Zeilen, die du willst, setz deine Werte und
starte Social Home neu. Eine Umgebungsvariable gewinnt immer gegen die
Datei, und eine Datei mit Tippfehler wird komplett übersprungen — prüf
also, ob deine Änderung angekommen ist. Mehr dazu unter
[Mit Docker installieren](/de/docs/install-docker/#5-mit-einer-einstellungsdatei-feinjustieren-optional).

## Aktualisieren

```sh
~/socialhome/bin/pip install --upgrade socialhome
```

Starte Social Home danach neu.

<details class="tech">
<summary>Unter der Haube</summary>

- Paket [`socialhome`](https://pypi.org/project/socialhome/) auf PyPI;
  Versionen nach CalVer, eine pro Release. Seine direkten
  Abhängigkeiten sind exakt festgelegt; für den vollständig gesperrten
  Satz installierst du aus dem Repository mit `uv sync --locked`.
- Daten landen in `~/.local/share/socialhome` (`SH_DATA_DIR`), die
  Konfigurationsdatei ist `~/.config/socialhome/socialhome.toml`
  (`SH_CONFIG`). Jede Einstellung hat eine `SH_*`-Umgebungsvariable,
  die Vorrang vor der Datei hat; siehe
  [`socialhome.toml.example`](https://github.com/social-home-io/socialhome/blob/main/socialhome.toml.example).
- Der Modus ist standardmäßig `standalone` (lokale Konten). Lauscht auf
  `0.0.0.0:8099` (`SH_LISTEN_HOST`, `SH_LISTEN_PORT`).
- Damit es weiterläuft, eine minimale systemd-Unit:

  ```ini
  [Unit]
  Description=Social Home
  After=network-online.target

  [Service]
  User=socialhome
  ExecStart=/home/socialhome/socialhome/bin/python -m socialhome
  Restart=on-failure

  [Install]
  WantedBy=multi-user.target
  ```

</details>
