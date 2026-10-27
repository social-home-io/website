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
Seitenleiste, mit zwei Tabs. **Heute** zeigt dein eigenes Highlight
(wie viele Frames, von wie vielen gesehen und für wen es ist), dann
eine Zeile pro Person, aufgeteilt in **Neu** und **Gesehen**, jeweils
mit für wen es war und, kurz vor Schluss, wann es endet. **Archiv**
listet ältere Highlights Tag für Tag, mit einer Monatsauswahl und
**Nur meine**. Die Ringe der Leute, die etwas Neues haben, sitzen auf
**Start**, in einer Karte, die verschwindet, wenn nichts neu ist.

## So funktioniert es

- **Ein Highlight pro Autor und Tag.** Ein Highlight ist ein
  kleines Album aus _Frames_; jeder Beitrag am selben Tag hängt
  einen Frame an das heutige Highlight an, statt ein neues
  anzulegen. Neuer Tag → neuer Highlight-Eintrag.
- **Ein Publikum für den Tag.** Der erste Frame von heute legt fest,
  wer das ganze Highlight sieht, ausgehend von deiner
  Standardeinstellung unter **Einstellungen → Privatsphäre →
  Highlights**:
  - **Alle gekoppelten Haushalte** — jeder bestätigte gekoppelte
    Haushalt.
  - **Nur dein Haushalt.**
  - **Haushalte oder Personen auswählen…** — die Haushalte oder
    einzelnen Personen, die du auswählst.

  Fügst du später Frames hinzu, zeigt das Eingabefeld, an wen sie
  gehen. **Für den ganzen Tag ändern…** verkleinert oder erweitert
  das Publikum für alle Frames auf einmal und sagt dir vorher, wer
  das Highlight dazubekommt und wer es verliert. Wer schon
  zugeschaut hat, hat es gesehen. Hat das Highlight einen
  öffentlichen Link, kannst du ihn im selben Schritt entfernen.

- **Aufbewahrung.** Standard 30 Tage, pro Autor einstellbar von
  1 bis 90 Tagen unter **Einstellungen → Privatsphäre**. Der
  Aufbewahrungs-Scheduler räumt abgelaufene Einträge stündlich
  weg.
- **Ansehen.** Der Viewer hat Knöpfe für Pausieren, ein Menü und
  Schließen; die Leertaste oder K pausiert, und die Pfeiltasten
  springen zwischen den Frames. Videos starten stumm. Am Ende geht
  es weiter zur nächsten Person, die etwas Neues hat.
- **Antworten & Reaktionen.** Reagiere mit einem Emoji unter dem
  Frame; deine Reaktion bleibt markiert, und ein erneutes Tippen
  nimmt sie zurück. Der Autor wird benachrichtigt. **… privat
  antworten** schickt den Frame in deinen Chat mit dem Autor — so
  bleibt das Gespräch verständlich, auch wenn der Frame längst
  abgelaufen ist.
- **Für den Autor.** Das ⋯-Menü löscht einen Frame oder das ganze
  heutige Highlight, teilt es im Feed oder einem Space oder
  erstellt einen öffentlichen Link.

## Datenschutz

- Highlight-Frames werden von deinem Zuhause zum anderen Haushalt
  versiegelt, genau wie Direktnachrichten. Nichts auf dem Weg
  kann sie öffnen.
- Frames werden von deinem Haushalt signiert; ein empfangender
  Haushalt verwirft Fälschungen, bevor sie je in seiner Datenbank
  landen.
- Wer ein Highlight ansieht, sieht nur ein kurzes Label dafür, für
  wen es war („Ausgewählte Leute“, „Nur Haushalt“), nie die Liste,
  und jeder Haushalt bekommt nur seinen eigenen Teil des
  Publikums.
- Die persönliche Blockierliste (**Einstellungen → Privatsphäre →
  Blockierte Konten**) verbirgt jedes Highlight eines blockierten
  Autors auf jeder Oberfläche — Posteingang, Archiv und die Ringe
  oben auf der Seite — ohne ein „du wurdest blockiert“-Signal
  durchsickern zu lassen.

## Öffentlich teilen über einen Global Server

Manchmal möchtest du ein Highlight jemandem schicken, der nicht
auf Social Home ist — einem Freund auf Twitter, einer Verwandten,
die nur ihre E-Mails liest. Im Highlight-Viewer kann der Autor
auf **Öffentlichen Link erstellen** tippen und einen gekoppelten
[GFS (Global Federation Server)](/de/docs/glossary/#gfs) wählen —
das Relay, das Haushalten hilft, einander zu finden. Du bekommst
einen Link zum [Social Home Viewer](/de/docs/glossary/#viewer),
etwa so:

```
https://viewer.social-home.io/v/0123456789abcdef/#g=…&i=…&h=…&t=…&k=…
```

Jeder mit diesem Link kann das Highlight im Browser öffnen. Die
Seite zeigt, wer es geteilt hat — deinen Namen, dein Bild und
deine Bio — und dann die Frames. Die Bilder reisen direkt von
deinem Zuhause zum Browser des Besuchers; der GFS stellt die
beiden nur einander vor. Wenn dieser direkte Weg nicht aufgebaut
werden kann (etwa in einem strengen Büronetzwerk), reicht der GFS
die Frames durch — aber nur, solange dein Zuhause online ist, und
er speichert keinen davon.

Auf beiden Wegen ist das Highlight von deinem Zuhause bis zum
Browser des Besuchers versiegelt. Der Schlüssel ist der Teil des
Links nach dem `#`, den Browser nie an einen Server schicken —
deshalb kann der GFS das Highlight nicht öffnen, obwohl er hilft,
es zuzustellen. Und die Seite, die den Schlüssel liest, liefert
nicht der GFS aus: Sie kommt vom Social Home Viewer, einem festen
Satz Dateien, dessen Versionen sich alle überprüfen lassen. Wer den
GFS betreibt, kann dein Highlight weder lesen noch die Seite
verändern, die dein Besucher sieht.

Dieselbe Aufbewahrungsfrist, die du für das Highlight gesetzt
hast, gilt auch für den öffentlichen Link: Wenn das Highlight für
gekoppelte Haushalte gelöscht worden wäre, funktioniert der Link
nicht mehr.

Du kannst mehrere Links pro Highlight erstellen (zum Beispiel
einen pro Plattform) und jeden einzeln entfernen. Der Autor kann
mit **Alle öffentlichen Links für dieses Highlight entfernen**
auch alle auf einmal zurückziehen, falls ein Link außer Kontrolle
gerät.

Das ist die einzige Stelle in Social Home, an der ein Highlight
absichtlich ohne Haushaltsidentität lesbar ist, und sie ist pro
Highlight Opt-in — nichts verlässt dein Zuhause, bis du einen Link
erstellst. Behandle den Link wie einen Schlüssel: Wer ihn hat,
kann zuschauen.

<details class="tech">
<summary>Unter der Haube</summary>

- Der GFS vermittelt einen WebRTC-Handshake zwischen dem Zuhause
  des Autors und dem Browser des Besuchers; die Highlight-Bytes
  fließen dann über diese direkte Verbindung. Schlägt WebRTC fehl,
  fällt der GFS auf eine HTTP-Durchleitung zurück, die Frames vom
  Zuhause des Autors streamt, solange es erreichbar ist. Auf keinem
  der beiden Wege wird ein Highlight-Byte auf die Festplatte des
  GFS geschrieben.
- Versiegelung: Der Viewer schickt mit seinem Angebot einen
  flüchtigen P-256-Schlüssel (`vk`); das Zuhause des Autors
  versiegelt jeden Frame mit AES-256-GCM unter
  `HKDF-SHA256(ECDH, salt = k)`. `k` wird aus dem Identitäts-Seed des
  Autors und dem Token abgeleitet und steht nur im Fragment.
- `v/<hash>/` im Link benennt genau eine inhaltsadressierte
  Viewer-Version; ihr Skript ist per SRI fixiert, ihre CSP streng,
  und die Versionen werden nur hinzugefügt, veröffentlicht von
  [`social-home-io/viewer`](https://github.com/social-home-io/viewer).
  Der GFS beantwortet die anonymen Signalisierungsrouten des Viewers
  mit CORS, nie mit Zugangsdaten.
- Tokens gelten pro Highlight und pro Link und sind einzeln oder
  alle auf einmal widerrufbar. Ein fehlgeschlagenes Öffnen zeigt
  immer „Das ist gerade nicht verfügbar“ — ob der Link widerrufen,
  abgelaufen oder der Autor offline ist.

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
Autors, damit „Gesehen von“ richtig zählt. Wird das heutige
Publikum erweitert, gehen die Frames von heute einmal an jeden
Haushalt, der dazugekommen ist.

<details class="tech">
<summary>Unter der Haube</summary>

Highlights nutzen die eingehende Pipeline nach §24.11, die sie
mit Direktnachrichten und Space-Inhalten teilen: signierte
Umschläge, durch den Replay-Cache geschützt, Routing-Felder im
Klartext und jedes Inhaltsfeld verschlüsselt. Reaktionen und
Lesebestätigungen laufen über einen Unicast-Rückkanal zum
Haushalt des Autors. Das Erweitern des Tagespublikums schickt
höchstens 30 Frames, einmal, an jeden neu hinzugekommenen Haushalt;
beim Verkleinern löscht ein Haushalt, der herausfällt, das
Highlight. Änderungen am Publikum sind auf 6 pro Stunde und Autor
begrenzt.

</details>
