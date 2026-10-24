---
title: Auf Home Assistant installieren
description: Installiere die Social Home App in Home Assistant in etwa fünf Minuten. Keine Apps-Seite? Betreibe Social Home neben Home Assistant und füge die Integration aus HACS hinzu.
order: 11
---

So empfehlen wir es. Social Home läuft als App in deinem Home
Assistant, startet mit ihm, wird mit ihm gesichert und öffnet sich
aus der Seitenleiste von Home Assistant. Du musst keinen Port öffnen,
kein Passwort festlegen und kein Token kopieren: Das alles erledigt
die App für dich.

Du brauchst Home Assistant OS oder Home Assistant Supervised — wenn
du unter **Einstellungen** eine Seite **Apps** hast, passt es — auf
einem 64-Bit-Rechner (einem Home Assistant Green oder Yellow, einem
Raspberry Pi 4 oder 5 oder einem Mini-PC) mit Home Assistant
**2026.3 oder neuer**.

Keine Seite **Apps**? Dann nutzt du Home Assistant Container oder
Core, und [der Abschnitt weiter unten](#home-assistant-ohne-apps) ist
für dich.

## 1. Die App hinzufügen

Klicke auf den Button und bestätige in deinem Home Assistant:

[**Social Home zu Home Assistant hinzufügen →**](https://my.home-assistant.io/redirect/supervisor_addon/?addon=752dab87_socialhome&repository_url=https%3A%2F%2Fgithub.com%2Fsocial-home-io%2Fha-app)

Er fügt das App-Repository von Social Home hinzu und öffnet die Seite
der App.

<details class="tech">
<summary>Unter der Haube</summary>

Von Hand: Öffne in Home Assistant **Einstellungen → Apps**, geh in den
App-Store, wähle im Drei-Punkte-Menü **Repositories** und füge ein:

```
https://github.com/social-home-io/ha-app
```

Zwei Apps erscheinen: **Social Home** (stabil, für jeden Tag) und
**Social Home (Early)** (Release Candidates, eine Version vor der
stabilen — für Haushalte, die Neues gern zuerst ausprobieren). Die
Images sind für `aarch64` und `amd64` vorgebaut.

</details>

## 2. Installieren und starten

Klicke auf **Installieren**. Das dauert etwa eine Minute. Dann klicke
auf **Starten**.

Beim ersten Start macht die App dich zum Admin (die Person, der dein
Home Assistant gehört) und stellt sich Home Assistant vor.

<details class="tech">
<summary>Unter der Haube</summary>

Der Tab **Protokoll** zeigt den ersten Start:

```
[INFO] Starting Social Home...
[INFO] Configuration written to /data/social_home.toml
[INFO] HA owner detected: alex · provisioned as admin
[INFO] Integration token written to /data/integration_token.txt
[INFO] Discovery pushed to Supervisor
```

</details>

## 3. Die Integration bestätigen

Die App bringt ihre Home Assistant Integration gleich mit — nichts
muss von anderswo heruntergeladen werden. Nach ein paar Sekunden zeigt
Home Assistant unter **Einstellungen → Geräte & Dienste** eine Karte
**Entdeckt** für Social Home. Klicke auf **Konfigurieren** und
bestätige. Es gibt nichts einzutippen.

Über die Integration erreichen andere Haushalte dein Zuhause unter
der Adresse deines Home Assistant. Sie kann außerdem teilen, wo deine
Leute laut Home Assistant gerade sind, wenn du das einschaltest.

## 4. Social Home öffnen

Klicke in der Seitenleiste von Home Assistant auf **Social Home**. Das
war's: Wenn du dein Home Assistant erreichst, erreichst du auch Social
Home — im Browser und in der Home Assistant Companion App. Alle bei
dir zu Hause, die es aus der Seitenleiste öffnen, bekommen ihr eigenes
Social Home Konto.

**Backups** kommen mit deinen Home Assistant Backups: Spiel eines
zurück, und Social Home ist wieder da, gekoppelte Haushalte
inklusive.

Wie weiter? Siehe [Erste Schritte → Nach der
Installation](/de/docs/getting-started/#nach-der-installation).

## Home Assistant ohne Apps

Du nutzt Home Assistant Container oder Home Assistant Core? Die haben
keine Apps, aber Social Home funktioniert trotzdem damit. Du betreibst
Social Home neben Home Assistant, auf demselben Rechner oder einem
anderen bei dir zu Hause, und fügst dann die Social Home Integration
über [HACS](https://hacs.xyz/) hinzu. Das dauert etwa zwanzig Minuten,
und du machst es nur einmal.

### 1. Ein Token für Social Home erstellen

Social Home braucht die Erlaubnis, mit deinem Home Assistant zu
sprechen. Öffne in Home Assistant dein **Profil** (unten links), geh
zum Tab **Sicherheit** und klicke unter **Langlebige Zugangs-Token**
auf **Token erstellen**. Nenne es „Social Home“ und kopiere es. Du
fügst es im nächsten Schritt ein.

### 2. Social Home starten

Starte Social Home mit [Docker](/de/docs/install-docker/) (hier am
einfachsten, weil du Home Assistant vermutlich schon mit Docker
betreibst) oder mit [Python](/de/docs/install-python/). Folge dieser
Seite und gib Social Home drei zusätzliche Einstellungen mit:

| Einstellung   | Was hinein gehört                                                          |
| ------------- | -------------------------------------------------------------------------- |
| `SH_MODE`     | `ha`                                                                       |
| `SH_HA_URL`   | die Adresse deines Home Assistant, z. B. `http://homeassistant.local:8123` |
| `SH_HA_TOKEN` | das Token aus Schritt 1                                                    |

Lieber eine Einstellungsdatei? Dieselben drei kommen als
`mode = "ha"` unter `[server]` und `url` und `token` unter
`[homeassistant]` in die `socialhome.toml` — siehe
[die Einstellungsdatei](/de/docs/install-docker/#5-mit-einer-einstellungsdatei-feinjustieren-optional).
Bei Docker sind das drei zusätzliche `-e`-Zeilen (oder drei Zeilen
unter `environment:` in Compose):

```sh
docker run -d --name socialhome --restart unless-stopped \
  -p 8099:8099 -v socialhome-data:/data \
  -e SH_MODE=ha \
  -e SH_HA_URL=http://homeassistant.local:8123 \
  -e SH_HA_TOKEN=hier-dein-token-einfuegen \
  ghcr.io/social-home-io/socialhome:latest
```

### 3. Festlegen, wer Admin ist

Öffne `http://<dein-server>:8099` im Browser. Social Home zeigt die
Personen aus deinem Home Assistant: Wähle, wer Admin wird, und lege
ein Passwort zum Anmelden fest. (Niemand in der Liste? Leg dich zuerst
in Home Assistant unter **Einstellungen → Personen** an.)

### 4. Die Integration aus HACS hinzufügen

[HACS](https://hacs.xyz/) ist der Community-Store, den die meisten Home
Assistant Nutzer für zusätzliche Integrationen schon haben. Falls du
ihn noch nicht hast, führt dich seine
[Einrichtungsanleitung](https://hacs.xyz/docs/use/) durch.

1. Öffne in Home Assistant **HACS**, wähle im Drei-Punkte-Menü
   **Benutzerdefinierte Repositories**, füge
   `https://github.com/social-home-io/ha-integration` ein und wähle den
   Typ **Integration**.
2. Such **Social Home** in HACS, klicke auf **Herunterladen** und
   starte Home Assistant neu.
3. Geh zu **Einstellungen → Geräte & Dienste → Integration
   hinzufügen** und wähle **Social Home**.
4. Gefragt wird nach zwei Dingen: der Adresse von Social Home
   (`http://<dein-server>:8099`) und einem API-Token. Erstelle das
   Token in Social Home unter **Einstellungen → Sicherheit** und füge
   es ein.

Fertig. Andere Haushalte erreichen dein Zuhause jetzt unter der
Adresse deines Home Assistant, und Social Home kann teilen, wo deine
Leute laut Home Assistant gerade sind, wenn du das in den Optionen der
Integration einschaltest.

<details class="tech">
<summary>Unter der Haube</summary>

- `SH_MODE=ha` spricht über die REST-API mit Home Assistant, mit dem
  langlebigen Token; die App läuft stattdessen als `haos` mit dem
  Supervisor. Ohne die Integration trägst du die Adresse für andere
  Haushalte selbst ein: **Einstellungen → Verbindungen → Externe Adresse**.
- Die Integration übergibt Social Home die externe URL (oder interne
  URL) von Home Assistant bei der Einrichtung und bei jeder Änderung,
  reicht die STUN/TURN-Server von Home Assistant weiter (die von Nabu
  Casa eingeschlossen), leitet Föderations-Umschläge unter
  `/api/socialhome/inbox/{id}` weiter, ohne sie zu lesen, und — wenn
  **sync location** in ihren Optionen an ist — übergibt die Positionen
  von `person.*`, auf 4 Nachkommastellen gekürzt.
- Backups: Außerhalb der App enthalten die Backups von Home Assistant
  kein Social Home. Lade ein Backup unter **Admin → Sicherung** herunter
  und erstelle dort auch ein **Wiederherstellungs-Kit** — das Kit bringt die
  Identität deines Haushalts und die gekoppelten Haushalte auf neuer
  Hardware zurück.

</details>
