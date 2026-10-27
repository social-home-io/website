---
title: Momentum
description: Kurze Beiträge, die drei Schritte weit über gekoppelte Haushalte reisen. Bis zu 1 000 Zeichen plus ein Bild oder ein 15-Sekunden-Clip; nach einem Tag weg, oder so lange, wie der Autor es wählt, bei Leuten, die ihm folgen. Deine eigenen bleiben unter Deine.
order: 24
---

**Momentum** ist die Rundfunk-Säule von Social Home. Jeder
Beitrag — ein _Moment_ — verbreitet sich über gekoppelte
Haushalte _und deren gekoppelte Haushalte_ bis zu drei Hops
weit. Antworten sind selbst Momente, verknüpft mit dem, auf den
sie antworten, damit sich ein Thread wie aus einem Guss liest.
Die ganze Säule lebt unter **Reden → Momentum** in der
Seitenleiste, mit drei Tabs: **Momente** (alles, was dich erreicht
hat), **Deine** (alles, was du gepostet hast) und **Entdecken**
(öffentliche Autoren auf einem GFS). Der **#**-Knopf filtert nach
Hashtag, in jeder Sprache. Start zeigt eine Zeile „Momentum · 3 neu“,
wenn neue Momente warten.

## Was du posten kannst

- Bis zu **1 000 Zeichen** Text (der Editor zeigt einen
  Live-Zähler).
- Optional ein einzelnes **Bild** _oder_ ein einzelner
  **Videoclip bis 15 Sekunden**. Der Editor lehnt längere Clips
  schon vor dem Upload ab, damit du keine Bandbreite
  verschwendest.
- Die Zeile unter dem Eingabefeld sagt, wohin der Moment geht:
  „Gekoppelte Haushalte und von dort weiter, bis zu 3 Schritte ·
  24 Std.“. Tippe auf ⓘ für die Details.
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

- **24 Stunden** für alle, die dir nicht folgen.
- **So lange, wie du es wählst**, für Leute, die dir folgen: 1, 3,
  7 (Standard), 14 oder 30 Tage, unter **Einstellungen →
  Privatsphäre → Momentum → Deine Follower behalten deine
  Momente**. Das gilt für Momente, die du ab dann postest.
- **Deine eigenen Momente bleiben.** Alles, was du postest, bleibt
  unter **Deine**, mit wer es sieht und bis wann, auch nachdem es
  für alle anderen abgelaufen ist. Der Admin deines Haushalts kann
  unter **Admin → Speicher** festlegen, wie viel Platz Bilder und
  Videos pro Person belegen dürfen (standardmäßig 2 GB); darüber
  gehen die ältesten Bilder und Videos zuerst, und der Text bleibt.
- **Merke dir den Moment von jemand anderem** über sein ⋯-Menü,
  und er bleibt bei dir, bis sein Autor ihn löscht. Ein Löschen
  entfernt auch gemerkte Kopien, deshalb erscheint Merken nur dort,
  wo ein Löschen deine Kopie erreichen kann: bei einem Moment aus
  deinem Haushalt, aus einem direkt gekoppelten Haushalt oder von
  einem GFS, der Löschungen aufbewahrt.

Folgen kannst du jemandem über das Personenfenster. Bei einer
Person aus einem gekoppelten Haushalt siehst du die Momente so
lange, wie sie sie behält, und das Folgen bleibt zwischen euren
Haushalten. Bei jemandem, den du nur über einen GFS kennst, läuft
das Folgen über diesen GFS, der dann weiß, dass du der Person
folgst.

<details class="tech">
<summary>Unter der Haube</summary>

Das Follower-Fenster reist im signierten `expires_at` des Moments
mit, sodass jeder empfangende Haushalt es einhält; die Werte sind
auf 30 Tage begrenzt. Das Löschen eines Autors wird 30 Tage lang
erneut versucht, Relays reichen es nur weiter, wenn es etwas
geändert hat, und ein GFS bewahrt die signierten Löschzertifikate
(ohne Inhalt) 30 Tage lang für Follower auf, die sich wieder
verbinden. Merken ist eine Markierung pro Person
(`PUT /api/moments/{id}/save`) auf der Kopie, die dein Haushalt
schon hat; der Autor erfährt nichts davon.

</details>

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
kannst du sie herunterdrehen. **Einstellungen → Privatsphäre →
Momentum → Momente zeigen bis** wählt zwischen **1 Schritt** (nur
deine gekoppelten Haushalte), **2 Schritte** (auch deren gekoppelte
Haushalte) und **3 Schritte** (Standard — jeder Moment, der dich
erreicht).
Die Einstellung ändert nur, was _du_ siehst; dein Haushalt leitet
weiterhin die vollen drei Hops weiter, damit der Rest des Mesh
intakt bleibt.

## Geschützte Konten

Ein geschütztes Konto, meist das eines Kindes, sieht Momente nur
aus seinem eigenen Haushalt und aus direkt gekoppelten Haushalten,
demselben Kreis, den seine eigenen Momente und Antworten erreichen.
Es hat keinen Tab Entdecken und kann nicht öffentlich posten. Siehe
[Familienschutz](/de/docs/family-safety/).

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
einander zu finden. Melde dich unter **Einstellungen →
Privatsphäre → Öffentlich teilen** an (auch verlinkt von **Deine**
und vom Eingabefeld aus) und wähle einen GFS. Öffentlich bleibt
für jeden Moment **aus**, bis du im Eingabefeld „Auch öffentlich
auf …“ einschaltest; dann steht auf dem Knopf **Öffentlich
posten**. Soll jeder neue Moment öffentlich sein, schalte dort
**Neue Momente öffentlich teilen** ein. Ob öffentlich, entscheidest
du beim Schreiben, nicht danach. Eine Antwort kann nur öffentlich
sein, wenn der Moment, auf den sie antwortet, öffentlich ist.
Öffentliche Momente verbreiten sich zu allen auf diesem GFS, die
dir folgen. Was der GFS über dich weiß, ist genau das, was du unter
**Einstellungen → Profil** festlegst: Anzeigename, Bio, Avatar.
Änderst du diese, wird die GFS-Kopie beim Speichern
aktualisiert — eine Identität, keine Sonderregeln pro Säule.

### Entdecken und folgen

- **In deinem Social Home.** Der Tab **Entdecken** in Momentum
  listet jeden öffentlichen Autor auf jedem GFS, mit dem du
  gekoppelt bist. Suche nach Name, Handle oder Bio; ein Klick zum
  Folgen. Ihr nächster Moment landet in deinem Posteingang neben
  den Momenten gekoppelter Haushalte — markiert mit einem
  „via {gfs}“-Chip.
- **Aus dem offenen Web.** Jeder GFS listet seine öffentlichen
  Autoren unter `/moments`, und jeder Autor hat unter
  `/moments/<id>` eine Profilseite mit Bild, Bio und einem
  **Folgen**-Button. Das Profil öffnet sich im
  [Social Home Viewer](/de/docs/glossary/#viewer), einer Seite, die
  kein GFS ausliefert. Praktisch, um dein Momentum-Profil mit Leuten
  zu teilen, die noch nicht auf einem Social Home sind. Das Profil
  zeigt, wer du bist, nicht was du gepostet hast.

Die Verzeichniskarten verwenden denselben Avatar, dieselbe Bio
und denselben Anzeigenamen, die gekoppelte Haushalte sehen — es
gibt keine separate „öffentliche Persona“ zu pflegen.

### Einen Moment teilen

Um einen einzelnen öffentlichen Moment jemandem ohne Social Home zu
zeigen, öffne ihn und tippe auf **Link zum Teilen kopieren**. Der
Link öffnet genau diesen Moment — und nichts anderes, was du
gepostet hast — im Social Home Viewer, bis der Moment endet. Das
klappt sogar, während dein Zuhause offline ist: Der GFS bewahrt
eine versiegelte Kopie auf, die er selbst nicht öffnen kann, und
der Schlüssel ist der Teil des Links nach dem `#`, den Browser nie
an einen Server schicken. Ein Link zum Teilen lässt sich nur
zurückholen, indem du den Moment löschst — teile ihn also wie
einen Schlüssel.

<details class="tech">
<summary>Unter der Haube</summary>

Der Link lautet
`viewer.social-home.io/v/<hash>/#g=<GFS>&a=<author>&m=<moment>&b=<share copy>&k=<item key>`.
`k` ist der Item-Schlüssel des Moments, nie ein Generations- oder
Stufenschlüssel. Die Teilkopie (Text, Zeiten, Anzeigename,
Medienbeschreibung) ist darunter versiegelt, auf 4 KB gepolstert und
wird erst auf den GFS geladen, wenn du nach einem Link fragst. Der
Viewer holt sie und die Datei anonym, prüft jede SHA-256-Adresse und
öffnet sie mit WebCrypto. Das Zuhause des Autors wird nie
kontaktiert.

</details>

## Ratenbegrenzung

Ein **Top-Level**-Moment pro Autor alle **15 Minuten**. Das
Eingabefeld sagt es dir, bevor du schreibst: „Dein nächster Moment
geht um 13:24“. Du kannst in der Zwischenzeit schreiben; bis dahin
steht auf dem Knopf „Posten um 13:24“. Antworten und Reaktionen
sind ausgenommen — ein Hin und Her im Thread soll
nicht ins Stocken geraten, weil der Timer noch läuft.

<details class="tech">
<summary>Unter der Haube</summary>

Das 15-Minuten-Fenster wird auf der Service-Ebene durchgesetzt;
die API liefert einen 429-Fehlercode `MOMENT_RATE_LIMIT`, wenn es
greift.

</details>

## Reaktionen

Wähle aus einer schnellen Emoji-Reihe oder tippe erneut auf deine
Reaktion, um sie zurückzunehmen. Reaktionen gehen nur an den
Haushalt des Autors, auch bei Autoren zwei oder drei Schritte
entfernt und bei Autoren, denen du über einen GFS folgst. Unterwegs
sind sie für den Haushalt des Autors versiegelt, sodass die
Haushalte und der GFS, die sie weiterreichen, nicht sehen, wer
reagiert hat oder mit welchem Emoji.

Nur der Haushalt des Autors kennt die volle Zahl, deshalb schickt
er die Summen ein paar Mal wieder hinaus, solange der Moment frisch
ist, und nur, wenn sie sich geändert haben. Nie, wer reagiert hat.
Bis die ersten Summen ankommen, siehst du nur deine eigene
Reaktion, und deine neue Reaktion geht beim nächsten Update des
Autors in die Zahl ein.

<details class="tech">
<summary>Unter der Haube</summary>

- Eine entfernte Reaktion wird von deinem Haushalt signiert
  (Ed25519), auf 1 KB aufgefüllt und für den Key-Wrap-Schlüssel des
  Autorhaushalts versiegelt (X25519). Über das Mesh reist sie den
  Weg des Moments zurück, mit zustandslosen Rückweg-Tokens
  (AES-256-GCM, HKDF aus dem Routing-Geheimnis jedes Relays). Ein
  Moment behält bis zu 3 Rückwege über verschiedene Nachbarn; jede
  Reaktion geht über 2 davon.
- Über einen GFS geht sie nur an den Haushalt des Autors, wenn du
  dem Autor dort folgst.
- Die Summen umfassen die 8 meistgenutzten Emoji plus die
  Gesamtzahl, signiert vom Haushalt des Autors, 10 Minuten,
  6 Stunden und 3 Tage nach dem Posten im Mesh und 10 Minuten,
  3 Stunden und 24 Stunden über den GFS (dort versiegelt und auf
  640 Byte aufgefüllt).
- In der eigenen Sitzung des Autors landet die Aktualisierung als
  `moment.reaction_changed`-WebSocket-Frame.

</details>

## Blockieren + melden

- **Blockieren.** Dieselbe `Blockieren`-Aktion, die Highlights
  verbirgt, verbirgt auch jeden Moment dieses Autors. Blockierungen
  verwaltest du unter **Einstellungen → Privatsphäre → Blockierte
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
| `GET`                     | `/api/moments/archive`             | Deine eigenen Momente und die, die du dir gemerkt hast (Deine).                                    |
| `GET`                     | `/api/moments/{id}`                | Detail mit Antworten + Reaktionen.                                                                 |
| `DELETE`                  | `/api/moments/{id}`                | Löschen durch Autor oder Admin.                                                                    |
| `PUT` / `DELETE`          | `/api/moments/{id}/reaction`       | Eigenes Emoji setzen / entfernen.                                                                  |
| `POST`                    | `/api/moments/{id}/report`         | Eine `content_reports`-Zeile anlegen.                                                              |
| `PUT` / `DELETE`          | `/api/moments/{id}/save`           | Den Moment von jemand anderem merken / nicht mehr merken.                                          |
| `GET` / `POST` / `DELETE` | `/api/moments/follows[/{user_id}]` | Deine Follow-Liste verwalten.                                                                      |

Der Haushalts-Schalter `feat_momentum` unter **Einstellungen →
Haushaltsfunktionen** deaktiviert jeden Endpunkt oben mit einer
403-Antwort `FEATURE_DISABLED`, wenn Admins die Säule
ausgeschaltet lassen wollen.

</details>
