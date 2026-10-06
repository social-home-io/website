---
title: Highlights
description: Ein Foto oder ein kurzer Clip, der wieder verschwindet. Mit Highlights teilst du einen Moment mit gekoppelten Haushalten, ohne ein Archiv im Rechenzentrum von jemand anderem zu hinterlassen.
order: 22
---

Ein **Highlight** ist das leichte, vergängliche Gegenstück zum
Haushalts-Feed. Du teilst ein Foto oder ein kurzes Video, fügst
optional eine Bildunterschrift hinzu, und es landet im
_Highlights_-Posteingang jedes gekoppelten Haushalts. Es läuft
von selbst ab — standardmäßig nach 30 Tagen oder nach der
Aufbewahrungsfrist, die du festlegst — und wird dann von der
Festplatte gelöscht, auf deinem Server.

Highlights findest du unter **Reden → Highlights** in der
Seitenleiste.

## So funktioniert es

- **Ein Highlight pro Autor und Tag.** Ein Highlight ist ein
  kleines Album aus _Frames_; jeder Beitrag am selben Tag hängt
  einen Frame an das heutige Highlight an, statt ein neues
  anzulegen. Neuer Tag → neuer Highlight-Eintrag.
- **Publikum.** Beim Posten wählst du aus drei Optionen:
  - **Alle gekoppelten Haushalte** — jeder bestätigte gekoppelte
    Haushalt.
  - **Bestimmte Haushalte** — die Haushalte, die du auswählst.
  - **Bestimmte Personen** — einzelne Personen in diesen
    Haushalten.
- **Aufbewahrung.** Standard 30 Tage, pro Autor einstellbar von
  1 bis 90 Tagen unter **Einstellungen → Datenschutz**. Der
  Aufbewahrungs-Scheduler räumt abgelaufene Einträge stündlich
  weg.
- **Antworten & Reaktionen.** Tippe auf einen Frame, um mit einem
  Emoji zu reagieren; wische nach oben oder tippe auf den ✉-Chip,
  um per Direktnachricht zu antworten, mit einem Schnappschuss
  des Frames im Anhang — so bleibt das Gespräch verständlich,
  auch wenn der ursprüngliche Frame längst abgelaufen ist.
- **Archiv.** **Stöbern → Highlight-Archiv** ist ein
  Kalenderraster aller Highlights, die noch innerhalb ihrer
  Aufbewahrungsfrist sind — deine und die jedes gekoppelten
  Haushalts. Tage mit Highlights sind anklickbar; tippe auf ein
  Datum, um zu sehen, wer an diesem Tag gepostet hat.

## Datenschutz

- Highlight-Frames werden von deinem Zuhause zum anderen Haushalt
  versiegelt, genau wie Direktnachrichten. Nichts auf dem Weg
  kann sie öffnen.
- Frames werden von deinem Haushalt signiert; ein empfangender
  Haushalt verwirft Fälschungen, bevor sie je in seiner Datenbank
  landen.
- Die persönliche Blockierliste (**Einstellungen → Datenschutz →
  Blockierte Konten**) verbirgt jedes Highlight eines blockierten
  Autors auf jeder Oberfläche — Posteingang, Archiv und die Ringe
  oben auf der Seite — ohne ein „du wurdest blockiert“-Signal
  durchsickern zu lassen.

## Öffentlich teilen über einen Global Server

Manchmal möchtest du ein Highlight jemandem schicken, der nicht
auf Social Home ist — einem Freund auf Twitter, einer Verwandten,
die nur ihre E-Mails liest. Im Highlight-Viewer kann der Autor
auf **Öffentlichen Link veröffentlichen** tippen und einen
gekoppelten [GFS (Global Federation Server)](/de/docs/glossary/#gfs)
wählen — das Relay, das Haushalten hilft, einander zu finden. Der
GFS gibt eine URL zurück wie

```
https://gfs.example/highlight/{instance}/{highlight}/{token}
```

Jeder mit dieser URL kann das Highlight im Browser öffnen. Die
Bilder reisen direkt von deinem Server zum Browser des Besuchers;
der GFS stellt die beiden nur einander vor. Wenn dieser direkte
Weg nicht aufgebaut werden kann (etwa in einem strengen
Büronetzwerk), reicht der GFS die Frames durch — aber nur,
solange dein Zuhause online ist, und er speichert keinen davon.
Dieselbe Aufbewahrungsfrist, die du für das Highlight gesetzt
hast, gilt auch für den öffentlichen Link: Wenn das Highlight für
gekoppelte Haushalte gelöscht worden wäre, hört die öffentliche
URL auf zu funktionieren.

Du kannst mehrere Tokens pro Highlight erzeugen (zum Beispiel
eines pro Plattform) und jedes einzeln widerrufen. Der Autor kann
mit **Veröffentlichung aufheben** auch alle Tokens auf einmal
zurückziehen, falls der Link außer Kontrolle gerät.

Das ist die einzige Oberfläche in Social Home, auf der Inhalte
absichtlich ohne Haushaltsidentität lesbar sind, und sie ist pro
Highlight Opt-in — nichts verlässt deinen Heimserver, bis du den
Schalter umlegst.

<details class="tech">
<summary>Unter der Haube</summary>

Der GFS vermittelt einen WebRTC-Handshake zwischen dem Server des
Autors und dem Browser des Besuchers; die Highlight-Bytes fließen
dann über diese direkte Verbindung. Schlägt WebRTC fehl, fällt
der GFS auf eine HTTP-Durchleitung zurück, die Frames vom Server
des Autors streamt, solange er erreichbar ist — auf keinem der
beiden Wege wird ein einziges Highlight-Byte auf die Festplatte
des Relays geschrieben. Tokens gelten pro Highlight und pro Link
und sind einzeln oder alle auf einmal widerrufbar.

</details>

## Melden

Wenn ein Highlight gegen die Regeln der Gemeinschaft verstößt —
Spam, Belästigung, unangemessene Inhalte, Falschinformationen —
öffne das ⋯-Menü im Viewer und wähle **Melden**. Die Meldung
landet in der Prüfwarteschlange des Haushalts-Admins — derselben,
die auch Beiträge, Kommentare und Momentum-Meldungen verwaltet —
damit der Admin sie sichten kann.

<details class="tech">
<summary>Unter der Haube</summary>

Meldungen sind Zeilen in der gemeinsamen Tabelle
`content_reports`; Admins listen sie unter
`/api/admin/reports?status=pending` auf.

</details>

## Föderation

Highlights reisen zwischen Haushalten auf dieselbe Weise wie
Direktnachrichten und Space-Inhalte: versiegelt, signiert und
beim Eintreffen auf Wiederholungen geprüft. Reaktionen und
Lesebestätigungen finden ihren Weg zurück zum Haushalt des
Autors, damit der Chip auf dem Frame richtig zählt.

<details class="tech">
<summary>Unter der Haube</summary>

Highlights nutzen die eingehende Pipeline nach §24.11, die sie
mit Direktnachrichten und Space-Inhalten teilen: signierte
Umschläge, durch den Replay-Cache geschützt, Routing-Felder im
Klartext und jedes Inhaltsfeld verschlüsselt. Reaktionen und
Lesebestätigungen laufen über einen Unicast-Rückkanal zum
Haushalt des Autors.

</details>
