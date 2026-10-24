---
title: Installeren met Python
description: Installeer Social Home vanaf PyPI en draai het met Python — om het uit te proberen op je laptop, of op een server die je zelf beheert.
order: 13
---

Social Home is een Python-programma, dus je kunt het ook zo
installeren. Dat is handig om het op je laptop uit te proberen, of om
het te draaien op een server die je toch al beheert. Voor een huis
waar het gewoon moet werken, is de
[Home Assistant App](/nl/docs/install-home-assistant/) of
[Docker](/nl/docs/install-docker/) minder onderhoud.

## Wat je nodig hebt

- **Python 3.14** of nieuwer. Controleer het met `python3 --version`.
- 64-bit Linux (x86 of ARM, zoals een Raspberry Pi 4 of 5), of een Mac
  met Apple silicon.

## 1. Installeren

Geef Social Home een eigen map en installeer het daar, zodat het de
rest op de computer niet in de weg zit:

```sh
python3.14 -m venv ~/socialhome
~/socialhome/bin/pip install socialhome
```

## 2. Starten

```sh
~/socialhome/bin/python -m socialhome
```

Social Home antwoordt nu op poort 8099. Laat de terminal open, of
draai het als dienst (zie „Onder de motorkap”).

## 3. Je beheerdersaccount maken

Open `http://localhost:8099` (of `http://<je-server>:8099`) in een
browser. Bij het eerste bezoek opent **Social Home instellen**: kies
een gebruikersnaam en een wachtwoord voor jezelf. Jij bent beheerder
en haalt van daaruit de rest van je huishouden erbij.

Gebruik je Home Assistant Container of Core ernaast? Stel dan vóór de
eerste start de drie Home Assistant-instellingen uit
[Home Assistant zonder apps](/nl/docs/install-home-assistant/#home-assistant-zonder-apps)
in en ga daarna daar verder.

## 4. Bereikbaar zijn voor andere huishoudens en een back-up bewaren

Allebei werkt het net als met Docker: een **Extern adres** onder
**Instellingen → Verbindingen** als huishoudens je rechtstreeks moeten
kunnen bereiken (of je koppelt via een GFS), en een back-up plus een
**Herstelkit** onder **Admin → Back-up**. Zie
[Installeren met Docker](/nl/docs/install-docker/#3-bereikbaar-zijn-voor-andere-huishoudens).

## Bijstellen met een instellingenbestand (optioneel)

De dagelijkse instellingen staan in de webinterface. Voor de paar
dingen die Social Home bij het starten leest — een TURN-server voor
gesprekken, een opslaglimiet, je eigen GFS, de verbinding met Home
Assistant — is er een instellingenbestand. Kopieer het
voorbeeldbestand, waarin elke instelling uitgecommentarieerd en
uitgelegd is, naar de plek waar Social Home het zoekt:

```sh
mkdir -p ~/.config/socialhome
curl -o ~/.config/socialhome/socialhome.toml https://raw.githubusercontent.com/social-home-io/socialhome/main/socialhome.toml.example
```

Haal het `#` weg voor de regels die je wilt, vul je waarden in en
start Social Home opnieuw. Een omgevingsvariabele wint altijd van het
bestand, en een bestand met een typfout wordt in zijn geheel
overgeslagen — controleer dus of je wijziging is doorgekomen. Meer in
[Installeren met Docker](/nl/docs/install-docker/#5-bijstellen-met-een-instellingenbestand-optioneel).

## Bijwerken

```sh
~/socialhome/bin/pip install --upgrade socialhome
```

Start Social Home daarna opnieuw.

<details class="tech">
<summary>Onder de motorkap</summary>

- Pakket [`socialhome`](https://pypi.org/project/socialhome/) op PyPI;
  versies volgens CalVer, één per release. De directe afhankelijkheden
  liggen exact vast; voor de volledig vergrendelde set installeer je
  vanuit de repository met `uv sync --locked`.
- Gegevens komen in `~/.local/share/socialhome` (`SH_DATA_DIR`), het
  configuratiebestand is `~/.config/socialhome/socialhome.toml`
  (`SH_CONFIG`). Elke instelling heeft een `SH_*`-omgevingsvariabele,
  die voorgaat op het bestand; zie
  [`socialhome.toml.example`](https://github.com/social-home-io/socialhome/blob/main/socialhome.toml.example).
- De modus is standaard `standalone` (lokale accounts). Luistert op
  `0.0.0.0:8099` (`SH_LISTEN_HOST`, `SH_LISTEN_PORT`).
- Om het te laten doorlopen, een minimale systemd-unit:

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
