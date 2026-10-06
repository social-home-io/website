---
title: Erste Schritte
description: Installiere das Social Home Add-on, bestätige die Ein-Klick-Abfrage der Integration, fertig. Etwa fünf Minuten, Kaffee inklusive.
order: 10
---

Social Home wird als Home Assistant Add-on installiert, du
brauchst also ein Home Assistant mit Supervisor — das ist **Home
Assistant OS** oder **Home Assistant Supervised**, auf einer
aarch64-Maschine (Raspberry Pi, Home Assistant Green/Yellow) oder
einer amd64-Maschine, mit Home Assistant **2026.3 oder neuer**.
Wenn du stattdessen die Container- oder Core-Variante nutzt,
kannst du Social Home als
[eigenständigen Docker-Container](https://github.com/social-home-io/socialhome#docker)
betreiben (er stellt die Ports 8099 und 8124 bereit) und die
Integration von Hand hinzufügen.

## 1. Das Add-on-Repository hinzufügen

Klicke auf den
[Ein-Klick-Button „Zu Home Assistant hinzufügen“](https://my.home-assistant.io/redirect/supervisor_addon/?addon=752dab87_socialhome&repository_url=https%3A%2F%2Fgithub.com%2Fsocial-home-io%2Fha-app)
— er fügt das Repository hinzu und öffnet die Add-on-Seite für
dich.

Lieber von Hand? Öffne in Home Assistant **Einstellungen →
Add-ons → Add-on-Store**. Klicke oben rechts auf das
Drei-Punkte-Menü und wähle **Repositories**. Füge diese URL ein:

```
https://github.com/social-home-io/ha-app
```

Zwei neue Add-ons erscheinen: **Social Home** (stable, empfohlen)
und **Social Home (Early)** (Release-Kandidaten, eine Version vor
stable — für Haushalte, die Dinge gern zuerst ausprobieren).

## 2. **Social Home** installieren

Klicke auf **Installieren**. Die Images sind vorgebaut, das
dauert also etwa eine Minute. Klicke dann auf **Starten** und
öffne den Reiter **Protokoll**, um zu prüfen, ob der Bootstrap
geklappt hat:

```
[INFO] Starting Social Home...
[INFO] Configuration written to /data/social_home.toml
[INFO] HA owner detected: alex · provisioned as admin
[INFO] Integration token written to /data/integration_token.txt
[INFO] Discovery pushed to Supervisor
```

## 3. Die Integration hinzufügen

Das Add-on bringt die Home Assistant Integration gleich mit und
kopiert sie beim Start nach `custom_components` — nichts
herunterladen, nichts von woanders installieren. Innerhalb von
Sekunden zeigt Home Assistant eine Erkennungskarte unter
**Einstellungen → Geräte & Dienste**. Klicke auf der Social Home
Karte auf **Konfigurieren**. Du musst nichts eintippen — das
Add-on hat bereits einen Admin eingerichtet und ein Token
erzeugt.

## 4. Die Web-Oberfläche öffnen

Klicke auf den Eintrag **Social Home** in der HA-Seitenleiste
(das Symbol ist ein kleines Haus mit einer Sprechblasen-Kerbe).
Die Seite öffnet sich über Home Assistant Ingress auf Port 8099,
es gibt also nichts weiterzuleiten und nichts freizugeben — wenn
du dein Home Assistant erreichst, erreichst du auch Social Home.
Die erste Anfrage richtet dich als normales Mitglied ein; der
Admin-Benutzer, den das Add-on beim ersten Start angelegt hat,
gehört standardmäßig dir.

## Wie geht es weiter

- Einen anderen Haushalt koppeln: **Einstellungen → Verbindungen
  → Haushalt koppeln** in der Web-Oberfläche. Siehe
  [Haushalte, föderiert](/de/docs/federation/) für den Ablauf mit
  QR-Scan.
- Lege eine externe URL fest, damit andere Haushalte dich
  erreichen können. HA schickt automatisch an Social Home, was du
  unter **Einstellungen → Netzwerk → Externe URL** (oder deine
  Nabu Casa Remote UI) einträgst — kein manueller Schritt.
- Wenn du ein HA-Sprachsetup mit Mikrofon hast, probiere
  _„Hey HA, setz Olivenöl auf die Einkaufsliste.“_
