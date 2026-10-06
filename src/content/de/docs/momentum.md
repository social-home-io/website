---
title: Momentum
description: Einmalige Beiträge, die sich drei Hops weit durch die Föderation verbreiten. Bis zu 1 000 Zeichen plus ein Bild oder ein 15-Sekunden-Clip; nach einem Tag weg, oder nach einer Woche bei Leuten, denen du folgst.
order: 24
---

**Momentum** ist die Rundfunk-Säule von Social Home. Jeder
Beitrag — ein _Moment_ — verbreitet sich über gekoppelte
Haushalte _und deren gekoppelte Haushalte_ bis zu drei Hops
weit. Antworten sind selbst Momente, verknüpft mit dem, auf den
sie antworten, damit sich ein Thread wie aus einem Guss liest.
Die ganze Säule lebt unter **Reden → Momentum** in der
Seitenleiste; das Dashboard **Stöbern → Momente-Archiv**
gruppiert jeden empfangenen Moment innerhalb der
Aufbewahrungsfrist nach Tag.

## Was du posten kannst

- Bis zu **1 000 Zeichen** Text (der Editor zeigt einen
  Live-Zähler).
- Optional ein einzelnes **Bild** _oder_ ein einzelner
  **Videoclip bis 15 Sekunden**. Der Editor lehnt längere Clips
  schon vor dem Upload ab, damit du keine Bandbreite
  verschwendest.
- Antworten hängen sich an den Moment, auf den sie antworten.
  Die Verschachtelung bleibt flach — eine Antwort auf eine
  Antwort hängt sich an die ursprüngliche Thread-Wurzel, damit
  sich die Detailansicht von oben nach unten ohne verschachtelte
  Zweige liest.

<details class="tech">
<summary>Unter der Haube</summary>

Eine Antwort trägt `parent_moment_id`; verschachtelte Antworten
werden beim Anlegen auf die Thread-Wurzel umgehängt.

</details>

## Aufbewahrung

- **24 Stunden** standardmäßig für Momente von Leuten, denen du
  nicht folgst.
- **7 Tage** für Momente von allen auf deiner Follow-Liste.
- Der stündliche Aufbewahrungs-Scheduler löscht jede Zeile
  jenseits der absoluten 7-Tage-Grenze; das sichtbare Fenster
  wird pro Betrachter beim Auflisten berechnet. Folgen /
  Entfolgen kannst du über das ⋯-Menü an jedem Moment oder unter
  **Einstellungen → Datenschutz → Gefolgt**.

## Föderation — das 3-Hop-Relay

```
            hop=1               hop=2               hop=3
   A ───►   B ───►              C ───►              D
   author    paired household    B's paired household  C's paired household
                                 (skips A)             (skips A and B)
```

Dein Haushalt schickt den Moment an jeden Haushalt, mit dem er
gekoppelt ist. Jeder davon behält eine Kopie, zeigt sie seinen
eigenen Mitgliedern und reicht sie an _seine_ gekoppelten
Haushalte weiter — unter Auslassung aller, die ihn schon haben —
bis er drei Hops weit gereist ist. Ein Moment, der auf zwei
Wegen zweimal ankommt, wird einfach erkannt und nur einmal
behalten. Wer ihn empfängt, kann immer prüfen, dass er wirklich
vom ursprünglichen Autor stammt, auch wenn er über den Freund
eines Freundes angekommen ist.

<details class="tech">
<summary>Unter der Haube</summary>

Der Haushalt des Autors verteilt den Moment mit `hop_count = 1`
an jeden gekoppelten Haushalt. Jeder empfangende Haushalt:

1. **Speichert** die Zeile (UPSERT nach `moment_id`, sodass eine
   doppelte Zustellung über zwei Relay-Pfade ein No-op ist).
2. **Veröffentlicht** das Bus-Ereignis erneut, damit die
   Echtzeitschicht einen `moment.created`-WebSocket-Frame an
   lokale Betrachter schickt.
3. **Sendet** denselben Umschlag erneut an _seine eigenen_
   gekoppelten Haushalte — erhöht dabei `hop_count` und lässt
   sowohl den ursprünglichen Ursprung als auch den unmittelbaren
   Absender aus.
4. **Stoppt**, wenn `hop_count` den Wert `MOMENT_MAX_HOPS` (3)
   überschreiten würde.

Der Umschlag trägt ein Feld `origin_instance_id`, das den
ursprünglichen Absender über alle Hops hinweg festhält, damit der
empfangende Haushalt die Autorität auch dann prüfen kann, wenn
der Umschlag von einem Weiterleiter statt vom Zuhause des Autors
kam.

</details>

## Wie weit du schauen willst

Drei Hops sind die Obergrenze auf Protokollebene; pro Konto
kannst du sie herunterdrehen. **Einstellungen → Datenschutz →
Momentum-Sichtbarkeit** wählt zwischen **1 Hop** (nur deine
gekoppelten Haushalte), **2 Hops** (auch deren gekoppelte
Haushalte) und **3 Hops** (Standard — die volle Relay-Reichweite).
Die Einstellung ändert nur, was _du_ siehst; dein Haushalt leitet
weiterhin die vollen drei Hops weiter, damit der Rest des Mesh
intakt bleibt.

## Weiterleiten ohne zu speichern

Wenn ein eingehender Moment landet und niemand in deinem Haushalt
ihn sehen kann — etwa weil alle die maximalen Hops auf 1
heruntergedreht haben oder alle den Autor blockieren —
überspringt dein Haushalt die lokale Kopie komplett und leitet
ihn nur an den nächsten Hop weiter. Reine Durchleitung: kein
Schreiben auf die Festplatte, keine Aufbewahrungsarbeit, keine
Oberfläche. Das Mesh bleibt für alle anderen vollständig; dein
Haushalt behält nur keine Kopie von etwas, das niemand wollte.

## Gesperrte Haushalte + offene Meldungen

Zwei zusätzliche Sperren liegen über dem Relay:

- **Gesperrte Haushalte.** Admins können einen ganzen Haushalt
  sperren; Momente von ihm werden beim Eintreffen verworfen und
  nie weitergeleitet. Jeder Haushalt führt seine eigene Liste —
  Sperren föderieren nicht.
- **Offene Inhaltsmeldungen.** Solange eine Meldung gegen einen
  Moment oder seinen Autor offen ist, verteilt dein Haushalt den
  Moment nicht an andere. Wird die Meldung erledigt oder
  verworfen, läuft das Relay wieder. Der Autor sieht seinen
  eigenen Moment weiterhin lokal — andere Haushalte holen erst
  auf, nachdem ein Moderator gehandelt hat.

<details class="tech">
<summary>Unter der Haube</summary>

Sperren sind Instanz-IDs, die unter **Einstellungen → Föderation
→ Gesperrte Instanzen** gelistet sind; passende eingehende
Momente werden in der §24.11-Pipeline verworfen. Meldungen sind
`content_reports`-Zeilen; die Relay-Sperre fällt, sobald die
Zeile über `/api/admin/reports` erledigt oder verworfen wurde.

</details>

## Öffentlich werden über einen Global Federation Server

Drei Hops decken gekoppelte Haushalte ab, aber das weitere
Netzwerk läuft über den
[GFS (Global Federation Server)](/de/docs/glossary/#gfs) — den
globalen Föderationsserver, das Relay, das Haushalten hilft,
einander zu finden. Schalte es unter **Einstellungen →
Datenschutz → Öffentliches Momentum** ein, wähle einen GFS, und
deine Momente verbreiten sich zu allen dort, die dir folgen. Was
der GFS über dich weiß, ist genau das, was du unter
**Einstellungen → Profil** festlegst: Anzeigename, Bio, Avatar.
Änderst du diese, wird die GFS-Kopie beim Speichern
aktualisiert — eine Identität, keine Sonderregeln pro Säule.

### Entdecken und folgen

- **In deinem Social Home.** **Reden → Momentum → Entdecken**
  listet jeden öffentlichen Autor auf jedem GFS, mit dem du
  gekoppelt bist. Suche nach Name, Handle oder Bio; ein Klick zum
  Folgen. Ihr nächster Moment landet in deinem Posteingang neben
  den Momenten gekoppelter Haushalte — markiert mit einem
  „via {gfs}“-Chip.
- **Aus dem offenen Web.** Jeder GFS hostet eine öffentliche
  Startseite unter `/users` (das Verzeichnis) und `/users/<id>`
  (Seite pro Autor mit Avatar, Bio, Follower-Zahl und einem
  Deeplink, der den Folgen-Ablauf in deinem Social Home öffnet).
  Praktisch, um dein Momentum-Profil mit Leuten zu teilen, die
  noch nicht auf einem Social Home sind.

Die Verzeichniskarten verwenden denselben Avatar, dieselbe Bio
und denselben Anzeigenamen, die gekoppelte Haushalte sehen — es
gibt keine separate „öffentliche Persona“ zu pflegen.

## Ratenbegrenzung

Ein **Top-Level**-Moment pro Autor alle **15 Minuten**. Antworten
und Reaktionen sind ausgenommen — ein Hin und Her im Thread soll
nicht ins Stocken geraten, weil der Timer noch läuft.

<details class="tech">
<summary>Unter der Haube</summary>

Das 15-Minuten-Fenster wird auf der Service-Ebene durchgesetzt;
die API liefert einen 429-Fehlercode `MOMENT_RATE_LIMIT`, wenn es
greift.

</details>

## Reaktionen

Wähle aus einer schnellen Emoji-Reihe auf der Detailseite oder
tippe auf eine vorhandene Reaktion, um deine zu setzen / zu
ändern. Reaktionen gehen nur zurück zum Haushalt des Autors, und
die Zahl auf dessen Bildschirm aktualisiert sich live.

<details class="tech">
<summary>Unter der Haube</summary>

Reaktionen laufen über einen Unicast-Rückkanal zum Haushalt des
Autors; die Aktualisierung landet als
`moment.reaction_changed`-WebSocket-Frame in der Sitzung des
Autors.

</details>

## Blockieren + melden

- **Blockieren.** Dieselbe `Blockieren`-Aktion, die Highlights
  verbirgt, verbirgt auch jeden Moment dieses Autors. Blockierungen
  verwaltest du unter **Einstellungen → Datenschutz → Blockierte
  Konten**.
- **Melden.** ⋯ → **Melden** auf der Detailseite legt eine Meldung
  in der Prüfwarteschlange des Haushalts-Admins ab — derselben,
  die auch Beiträge, Kommentare, Highlights und Benutzer
  verwaltet — damit der Admin alles an einem Ort sichtet.

<details class="tech">
<summary>Unter der Haube</summary>

Meldungen sind Zeilen in der gemeinsamen
`content_reports`-Warteschlange; Admins listen sie unter
`/api/admin/reports?status=pending` auf.

</details>

## API

<details class="tech">
<summary>Unter der Haube</summary>

| Methode                   | Pfad                               | Zweck                                                                                              |
| ------------------------- | ---------------------------------- | -------------------------------------------------------------------------------------------------- |
| `GET`                     | `/api/moments`                     | Für den Aufrufer sichtbare Momente auflisten (berücksichtigt Blockierungen und Follows).           |
| `POST`                    | `/api/moments`                     | Einen Moment anlegen. Body: `{content, media_url?, media_type?, duration_ms?, parent_moment_id?}`. |
| `GET`                     | `/api/moments/archive`             | Vollständige Liste im Aufbewahrungsfenster für das Kalender-Dashboard.                             |
| `GET`                     | `/api/moments/{id}`                | Detail mit Antworten + Reaktionen.                                                                 |
| `DELETE`                  | `/api/moments/{id}`                | Löschen durch Autor oder Admin.                                                                    |
| `PUT` / `DELETE`          | `/api/moments/{id}/reaction`       | Eigenes Emoji setzen / entfernen.                                                                  |
| `POST`                    | `/api/moments/{id}/report`         | Eine `content_reports`-Zeile anlegen.                                                              |
| `GET` / `POST` / `DELETE` | `/api/moments/follows[/{user_id}]` | Deine Follow-Liste verwalten.                                                                      |

Der Haushalts-Schalter `feat_momentum` unter **Einstellungen →
Haushaltsfunktionen** deaktiviert jeden Endpunkt oben mit einer
403-Antwort `FEATURE_DISABLED`, wenn Admins die Säule
ausgeschaltet lassen wollen.

</details>
