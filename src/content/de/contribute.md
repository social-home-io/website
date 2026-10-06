---
title: Mitmachen
description: Ob du Code schreibst, Texte übersetzt, gestaltest oder einfach anderen Haushalten von Social Home erzählst — so kannst du helfen.
order: 95
---

Social Home ist ein kleines Projekt, das von ein paar Freiwilligen
getragen wird. Jeder Anstoß hilft. Es gibt keine
Contributor-Lizenzvereinbarung zu unterschreiben, keine
kommerzielle Firma dahinter und niemanden, der Beiträge in einen
künftigen Bezahlplan verwandeln will.

## Wenn du Code schreibst

Die Repos sind klein und gut dokumentiert:

- **Core-Server** —
  [`social-home-io/socialhome`](https://github.com/social-home-io/socialhome).
  Python 3.14, aiohttp, SQLite, Preact-Frontend.
- **HA-Integration** —
  [`social-home-io/ha-integration`](https://github.com/social-home-io/ha-integration).
  Custom Integration; Tests über
  `pytest-homeassistant-custom-component`.
- **Client-Bibliothek** —
  [`social-home-io/socialhome-client`](https://github.com/social-home-io/socialhome-client).
  Reiner asynchroner HTTP/WS-Client, keine HA-Abhängigkeit.
- **HA Add-on** —
  [`social-home-io/ha-app`](https://github.com/social-home-io/ha-app).
  Zwei Kanäle (stable + Early), bashio + tempio.
- **Website** — dieses Repo unter
  [`social-home-io/website`](https://github.com/social-home-io/website).

Lies die `CLAUDE.md`- / `AGENTS.md`-Dateien im Wurzelverzeichnis
jedes Repos, bevor du einen PR öffnest — sie erklären die
Konventionen (CalVer, MPL 2.0, keine Inline-Imports usw.), die
den Code konsistent halten.

## Wenn du übersetzt

Nicht-englische Texte auf dieser Website und in den Apps sollen
bei jedem CI-Lauf automatisch von Azure Translator erzeugt
werden — das Übersetzungsskript ist geplant, aber noch nicht im
Repo. So oder so wird das Ergebnis nicht perfekt sein: Wenn du
eine Sprache als Muttersprache liest und die Formulierung sich
falsch anfühlt, öffne einen PR gegen die **englische** Quelle.
Handbearbeitungen an den übersetzten Dateien nehmen wir nicht an,
weil der nächste CI-Lauf sie überschreiben würde.

Wenn du die Verantwortung für eine Sprache übernehmen möchtest
(Korrekturlesen + die Quelle so anstoßen, dass sie sich besser
übersetzt), öffne ein Issue mit dem Tag `i18n`, und wir tragen
dich als Maintainer für diese Sprache ein.

## Wenn du gestaltest

Alles Visuelle — Illustrationen, Verfeinerungen am Logo,
Spot-Illustrationen, Vorlagen für Social Cards, das OG-Bild — ist
Gold wert. Öffne einen Draft-PR mit der Datei (am liebsten SVG,
unter MPL 2.0 lizenziert), und wir arbeiten von dort aus weiter.

## Wenn du einen Haushalt führst

Das Nützlichste, was du tun kannst, ist: **installiere es und sag
uns, was verwirrend war**. Die ersten 100 Haushalte, die Social
Home ausprobieren, prägen das nächste Jahr Arbeit stärker als
jede Überarbeitung der Spezifikation.

## Was das Projekt _nicht_ braucht

- **Geld.** Keine Spendenlinks, kein Patreon, kein Open
  Collective — das Projekt wird von Leuten betrieben, die es
  nutzen, nicht von einer Firma, die sich selbst ernähren muss.
  Sollten Hosting-Kosten je ein echtes Problem werden, sagen wir
  das zuerst laut und deutlich.
- **„Könnt ihr X hinzufügen?“**-Issues ohne Beschreibung des
  Problems, das du lösen willst. Ein Anwendungsfall schlägt jeden
  Feature-Wunsch.
- **Versprechen, beizutragen.** Ein funktionierender Pull Request,
  auch ein kleiner, ist mehr wert als eine Roadmap.

## Zum Schluss

Social Home ist für Menschen, die glauben, dass ihre
Familienfotos, Nachrichten und Kalender nicht das Produkt von
jemand anderem sein sollten. Wenn dich das anspricht, bist du
schon Teil davon.
