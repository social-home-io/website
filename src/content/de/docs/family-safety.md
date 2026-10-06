---
title: Familienschutz
description: Geschützte Konten für Kinder — Spaces und Apps mit Altersfreigabe, Direktnachrichten nah am Zuhause und eine stille, schreibgeschützte Übersicht für Aufsichtspersonen.
order: 28
---

Social Home ist für Haushalte gebaut, und zu Haushalten gehören
Kinder. **Familienschutz** lässt einen Haushalts-Admin einem Kind
ein Konto mit vernünftigen Leitplanken geben — ohne das Zuhause
in ein Überwachungssystem zu verwandeln.

## Geschützte Konten

Ein Haushalts-Admin kann ein Mitglied als **geschützte
minderjährige Person** markieren, ihr **angegebenes Alter**
festlegen und eine oder mehrere **Aufsichtspersonen** zuweisen.
Dieses angegebene Alter bestimmt dann still, was das Konto
erreichen kann:

- **Spaces mit Altersfreigabe** — eine geschützte minderjährige
  Person kann keinem Space beitreten, dessen Mindestalter über
  ihrem angegebenen Alter liegt. Die Sperre wird überall
  durchgesetzt, wo ein Mitglied aufgenommen wird, auch über
  gekoppelte Haushalte hinweg, und sie reist mit dem Space mit,
  wenn er föderiert — ein entfernter Space kann sich also nicht
  daran vorbeischleichen.
- **Apps mit Altersbeschränkung** — Apps, die ein Admin hinter
  eine Altersfreigabe gestellt hat, öffnen sich für ein zu junges
  Konto nicht.
- **Direktnachrichten bleiben nah am Zuhause** — die
  Direktnachrichten einer geschützten minderjährigen Person sind
  auf Haushalte beschränkt, mit denen du direkt gekoppelt bist,
  nicht auf die weitere Föderation.
- **Keine öffentlichen Oberflächen** — ein geschütztes Konto wird
  vom Basar (dem Marktplatz), öffentlichen Spaces, öffentlichen
  Momenten, öffentlichen Highlight-Links und API-Tokens rundweg
  abgewiesen. Es gibt keine Einstellung, um das zu lockern.

## Die Ansicht für Aufsichtspersonen

Eine Aufsichtsperson bekommt eine **schreibgeschützte** Übersicht
über die Menschen und Orte in der Welt ihres Kindes — die Spaces,
in denen es ist, mit wem es redet, seine
Direktnachrichten-Kontakte und wen es blockiert hat. Es ist ein
Fenster, durch das Eltern den Überblick behalten, keine
Fernsteuerung, und es greift nie auf Nachrichteninhalte zu.

## Altersfreigaben sind auch eine Space-Einstellung

Jeder Space — nicht nur solche, die für Kinder gedacht sind —
kann ein **Mindestalter** (13, 16 oder 18 — oder keines) und
eine Zielgruppe festlegen. Admins stellen es einmal ein, und das
Mindestalter wird auf jedem Pfad geprüft, der ein Mitglied
aufnimmt: lokaler Beitritt, Beitritt aus einem gekoppelten
Haushalt und Beitritt über einen GFS-Link. Es gibt keinen Pfad,
der die Prüfung überspringt. Siehe
[Globale Spaces](/de/docs/global-spaces/) dazu, wie ein Relay eine
Altersrichtlinie in ein öffentliches Verzeichnis mitnimmt.

<details class="tech">
<summary>Unter der Haube</summary>

`min_age ∈ {0, 13, 16, 18}` ist Teil der signierten
Space-Einstellungen und wird von demselben Aufnahmecode für
lokale Beitritte, föderierte Beitritte aus gekoppelten Haushalten
und Beitritte per GFS-Link ausgewertet. Geschützte Konten
(`protected_minor = true`) werden auf der Service-Ebene für den
Basar, Spaces mit öffentlicher Reichweite, öffentliches Momentum,
öffentliche Highlight-Links und persönliche API-Tokens
abgewiesen, unabhängig vom angegebenen Alter.

</details>
