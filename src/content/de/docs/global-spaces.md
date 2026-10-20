---
title: Globale Spaces
description: Wann du einen GFS brauchst und wann nicht — die vier Arten von Space, wie der Besitzer wählt, welche GFS einen globalen Space listen, und was ein GFS sehen kann und was nicht.
order: 40
---

Die meisten Spaces in Social Home werden zwischen Haushalten
geteilt, die du schon kennst: die Familie, die Nachbarn, mit denen
du gekoppelt bist. Aber manche Communities sind von Natur aus offen:
ein Nachbarschafts-Marktplatz, ein Laufclub für die ganze Stadt, ein
Buchclub für gemeinfreie Bücher. Dafür hat Social Home **globale
Spaces** und ein kleines Relay, den GFS (Global Federation Server –
der globale Föderationsserver), das Haushalten hilft, die sich nie
begegnet sind, einander zu finden. (Neues Wort? Siehe
[GFS](/de/docs/glossary/#gfs) im Glossar.)

## Brauche ich einen GFS?

**Nicht für die Leute, die du kennst.** Sobald du mit einem Haushalt
gekoppelt bist, reist alles, was du mit ihm teilst, direkt von
deinem Zuhause zu seinem oder über das Mesh der Haushalte, die ihr
beide kennt. Private, Haushalts- und öffentliche Spaces funktionieren
alle ohne GFS.

Einen GFS brauchst du, wenn du Haushalte erreichen willst, mit denen
du **nicht** gekoppelt bist:

- **Ein globaler Space**, den Fremde finden, dem sie folgen oder
  beitreten können.
- **Einem globalen Space folgen oder beitreten**, der jemand
  anderem gehört.
- **Ein GFS-Link**, eine Einladung, die ohne vorheriges Koppeln
  funktioniert.
- **Ein privater Space**, dessen Mitglieder sich nicht alle direkt
  erreichen. Der Besitzer kann den GFS dafür einschalten.
- **Ein Sicherheitsnetz** für einen gekoppelten Haushalt, das nur
  genutzt wird, wenn der direkte Weg ausfällt. Es ist aus, solange
  du es nicht einschaltest.

## Vier Arten von Space

Jede Art reicht ein Stück weiter als die vorherige:

| Art            | Wer kann ihn finden                                          | Sieht ein GFS ihn?                                               |
| -------------- | ------------------------------------------------------------ | ---------------------------------------------------------------- |
| **Privat**     | Nur Leute, die du einlädst                                   | Nein, außer der Besitzer schaltet den GFS ein und wählt, welchen |
| **Haushalt**   | Alle in deinem Zuhause, automatisch                          | Nie                                                              |
| **Öffentlich** | Haushalte, mit denen du gekoppelt bist, unter **Entdecken**  | Nie                                                              |
| **Global**     | Jeder, der einen der GFS nutzt, die der Besitzer gewählt hat | Nur die GFS, die der Besitzer gewählt hat                        |

Ein **öffentlicher** Space bleibt in deinem eigenen Kreis: Deine
gekoppelten Haushalte können ihn finden und um Beitritt bitten, und
er berührt nie einen GFS. Um einen Space auf einem GFS zu listen,
machst du ihn **global**, und der Besitzer wählt, welche GFS ihn
listen. Der Rest dieser Seite handelt von globalen Spaces.

## Große Änderungen brauchen eine Abstimmung

Zwei Aktionen sind zu folgenreich, als dass eine Person sie allein
ausführen dürfte: **einen Space auflösen** und **seine Reichweite
ändern** — in beide Richtungen, weiter oder enger. Hat ein Space
mehr als einen Admin, wird aus beidem ein _Vorschlag_, statt sofort
zu passieren.

- Jeder Admin kann den Vorschlag eröffnen; die anderen stimmen mit
  Ja oder Nein.
- Er wird ausgeführt, sobald **mehr als die Hälfte** der Admins
  zustimmt — der Besitzer zählt als Admin wie alle anderen.
- Ein einziges _Nein_ bricht ihn ab. Abwarten auch: Ein Vorschlag
  verfällt nach sieben Tagen, wenn er nie eine Mehrheit erreicht.

Ein Space mit nur einem Admin handelt weiterhin sofort — eine
Mehrheit von einem. Aber sobald ein zweiter Admin dazukommt, kann
niemand mehr allein den Space auflösen oder ändern, wer ihn sieht.
Admins in gekoppelten Haushalten stimmen ebenfalls ab; der Host
zählt alle Stimmen zusammen, und nur das genehmigte Ergebnis geht
nach außen.

Ist ein Space einmal global, **entscheidet allein der Besitzer,
welche GFS ihn listen**, ohne Abstimmung. Der Besitzer kann in den
Einstellungen des Space jederzeit einen GFS hinzufügen oder
entfernen.

## Wer macht was in einem Space

Jeder Space hat einen Besitzer, und der Besitzer kann Rollen
vergeben. Von der meisten zur wenigsten Macht: **Besitzer**,
**Admin**, **Moderator**, **Mitglied**, **Follower**. Ein Follower
liest, postet aber nicht.

Jede Funktion in einem Space — Posten, der Kalender, der Marktplatz
— kann **offen** für jedes Mitglied sein, **geprüft** (der Beitrag
eines Mitglieds wartet in einer Warteschlange, bis ein Moderator
oder Admin ihn freigibt) oder **nur für Admins**. Geprüfte Einträge,
die sich niemand ansieht, verfallen nach sieben Tagen.

## Was der GFS für einen globalen Space tut

Ein GFS ist ein Relay, mit dem sich jeder Haushalt verbinden kann.
Für einen globalen Space hat er zwei Aufgaben:

1. **Er ist ein Verzeichnis.** Der Besitzer wählt, welche GFS den
   Space listen, bis zu acht. Jeder zeigt seinen Namen, wer ihn
   hostet, wie man beitritt und, falls der Space einen hat, einen
   auf etwa 11 m gerundeten Karten-Pin. Jeder, der einen dieser GFS
   nutzt, findet ihn unter **Entdecken › Global**.
2. **Er trägt Beiträge zu Leuten, mit denen du nicht gekoppelt
   bist.** Das sind **Follower**, Haushalte, die mitlesen, ohne
   beizutreten (nur wenn der Besitzer Follower erlaubt; standardmäßig
   ist das aus), und **Mitglieder, die über einen GFS-Link
   beigetreten sind**. Mitglieder, mit denen du gekoppelt bist,
   bekommen jeden Beitrag weiterhin direkt oder über das Mesh.

**Jeder gelistete GFS bekommt jeden Beitrag.** Ein Mitglied schickt
jeden Beitrag an alle GFS, die der Besitzer gewählt hat, auch an
solche, mit denen sein eigener Haushalt nie verbunden war. So sieht
ein Follower, der nur GFS B nutzt, trotzdem, was ein Mitglied über
GFS A gepostet hat, selbst während der Host offline ist. Ein GFS,
mit dem ein Mitglied nie verbunden war, sieht nur dessen
Internetadresse und wann es gepostet hat, nie, welcher Haushalt es
ist.

Das Relay sieht nie den _Inhalt_ deiner Beiträge. Jeder Beitrag wird
auf dem Weg aus deinem Zuhause versiegelt und erst im Zuhause jedes
Empfängers wieder geöffnet. Der Umschlag wird auf eine von wenigen
festen Größen aufgepolstert, sodass das Relay nicht einmal eine
kurze Nachricht von einer langen unterscheiden kann. Es speichert
keine Inhalte: Ist ein Haushalt offline, hält es dessen versiegelte
Umschläge einen Tag lang zurück und lässt sie dann fallen.

> Stell dir das Relay als Poststelle einer offenen Community vor.
> Die Poststelle sieht, dass ein versiegeltes Paket an den Buchclub
> ging und ungefähr, wie schwer es war — aber nur die Mitglieder
> haben Schlüssel, um es zu öffnen.

<details class="tech">
<summary>Unter der Haube</summary>

Nur ein globaler Space kann auf einem GFS gelistet werden; das
Veröffentlichen eines öffentlichen Space antwortet mit
`409 TIER_CHANGE_REQUIRED`. Die Wahl des Besitzers (höchstens 8)
reist als vom Besitzer signierte Liste (`spaces.gfs_servers`) im
verschlüsselten `space_meta` zu den Mitgliedern; ein Co-Admin kann
sie weitergeben, aber nicht ändern. Verlässt ein Space die Stufe
global oder wird er aufgelöst, wird er nur von den GFS
zurückgezogen, die ihn listen. Öffentliche Spaces erreichen
gekoppelte Haushalte als `SPACE_DIRECTORY_SYNC`-Snapshot, nie über
einen GFS. Mitglieder halten den Schreib-Gruppenschlüssel und
schicken jedes Element anonym an jeden gelisteten GFS
(`member-publish-anon`), über eine Sitzung ohne Cookies, die an die
gelistete Adresse gepinnt ist, nachdem der GFS bewiesen hat, dass er
den gelisteten Schlüssel besitzt. Empfänger deduplizieren nach
Element-ID. Umschläge sind AES-256-GCM, signiert mit Ed25519.
Padding-Klassen: 1 / 4 / 16 / 64 / 128 KiB
(Mitglieder-Veröffentlichung), plus 191 KiB für Umschlag-Relay.
Offline-Empfänger werden 24 h lang gepuffert, höchstens 2000
Umschläge oder 64 MiB pro Empfänger. Alle Details auf der Seite zum
[Sicherheitsmodell](/de/docs/security/#was-ein-relay-sieht).

</details>

## Vertraut oder streng

Der Besitzer wählt außerdem, wie Mitglieder über den GFS posten.

- **Vertraut** (Standard): Mitglieder posten anonym, der GFS kann
  also nicht erkennen, welcher Haushalt gepostet hat.
- **Streng**: Zusätzlich kann der GFS nicht einmal erkennen, welche
  Haushalte schreiben dürfen. Mitglieder und Follower sehen für ihn
  gleich aus.

<details class="tech">
<summary>Unter der Haube</summary>

Beide Modi geben jedem Schreiber den Schreib-Gruppenschlüssel pro
Epoche, sodass jedes Element anonym an jeden gelisteten GFS geht.
Das Host-Relay ist identitätsfrei
(`{space_id, event_type, payload}` auf einer Sitzung ohne Cookies).
Im strengen Modus abonnieren Schreiber im selben gemischten Stapel
wie Follower. In beiden Modi sieht der GFS weiterhin Quell-IP,
Timing, die Größenklasse und die Abonnentenmenge, und ein GFS
verliert Sperren pro Haushalt für anonyme Schreiber (Limits pro IP
bleiben; der Besitzer entzieht einem Schreiber die Rechte, indem er
den Schlüssel rotiert).

</details>

## Wie Finden und Beitreten funktionieren

1. Der Besitzer macht einen Space **global** und wählt, welche GFS
   ihn listen. Jeder bekommt Name, Beschreibung, Titelbild,
   Altersrichtlinie und Akzentfarbe: genug, um ihn zu listen, aber
   **keine Nachrichteninhalte**. Ein Space kann auch global, aber
   noch nirgends gelistet sein, bis der Besitzer einen GFS wählt.
2. Jeder, der einen dieser GFS nutzt, kann ihn unter **Entdecken ›
   Global** finden und um Beitritt bitten oder ihm folgen, wenn
   der Besitzer Follower erlaubt.
3. Ob ein Beitritt gewährt wird, hängt vom **Beitrittsmodus** des
   Space ab: **Offen** (jeder kann sofort beitreten), **Anfrage**
   (ein Admin sagt Ja) oder **Nur auf Einladung**. Einladungslinks
   funktionieren zusätzlich zu jedem davon.
4. Sobald du drin bist, reisen Beiträge von deinem Zuhause zum
   Zuhause jedes anderen Mitglieds: direkt oder über das Mesh für
   Haushalte, mit denen du gekoppelt bist, über die gelisteten GFS
   für alle anderen.

## Zwei Arten von Einladungslink

- Ein **GFS-Link** funktioniert für jeden. Wer ihn öffnet, muss
  nicht mit dir gekoppelt sein — der GFS übernimmt die Vorstellung.
  Behandle ihn wie einen Schlüssel: Wer ihn hat, kommt rein.
- Ein **Lokaler Link** funktioniert nur für Haushalte, mit denen du
  schon verbunden bist, und berührt nie einen GFS. Nimm ihn für den
  Familien-Space oder die drei Nachbarn, die du schon kennst.

## Verschlüsselung ist immer an

Jeder Beitrag in jedem Space — öffentlich, global oder privat — ist
unterwegs **immer** versiegelt. Es gibt in Social Home keinen
Schalter „verschlüsselt / unverschlüsselt“ und keinen Fallback auf
Klartext: Kann ein Space nicht versiegeln, sendet er nicht.

Was das in der Praxis heißt:

- Das Relay kann deine Nachrichten, Fotos oder Sprachnotizen nicht
  lesen — selbst wenn der Betreiber es wollte. Es sieht nur den
  versiegelten Umschlag.
- Ein neues Mitglied, das später beitritt, erhält nur Nachrichten,
  die nach seinem Beitritt gepostet wurden. Frühere Verläufe werden
  nicht nachträglich geteilt — Mitglieder kümmern sich lokal um
  ihre eigenen Backups.
- Bei jeder Änderung der Mitgliedschaft bekommt der Space einen
  neuen Schlüssel. Wer gegangen ist, kann nichts lesen, was danach
  gepostet wurde.

## Was passiert, wenn ein GFS ausfällt?

Mitglieder, mit denen du gekoppelt bist, merken nichts: Ihre
Beiträge liefen nie über den GFS. Ist der Space auf mehr als einem
GFS gelistet, merken auch Follower auf den anderen nichts. Nur
Haushalte, die auf den ausgefallenen GFS angewiesen sind, müssen
warten. Nichts geht stillschweigend verloren: Dein Haushalt versucht
es weiter (nach ein paar Sekunden, dann nach einer halben Minute,
dann nach ein paar Minuten, dann alle zehn), und der GFS hält,
sobald er zurück ist, weiterhin bis zu einen Tag versiegelter
Umschläge für Haushalte bereit, die offline waren. Deine lokale
Kopie ist in dem Moment zu Hause gespeichert, in dem du auf Senden
drückst.

Das ist der beste Grund, einen belebten globalen Space auf zwei GFS
zu listen, zum Beispiel auf dem des Projekts und auf einem, den du
selbst betreibst.

<details class="tech">
<summary>Unter der Haube</summary>

Retry-Backoff: 5 s, 30 s, 2 min, 10 min. Warteschlange auf GFS-Seite
für Offline-Empfänger: 24 h, 2000 Umschläge / 64 MiB pro Empfänger.

</details>

## Mit einem fertigen Relay verbinden

Das Social-Home-Projekt betreibt ein öffentliches Relay unter
**[`gfs.social-home.io`](/de/servers/)**, mit durchgesetzter
Altersfreigabe-Richtlinie. Ein QR-Scan, und du bist verbunden.

Oder [betreib dein eigenes](/de/docs/running-a-gfs/) in 15 Minuten
auf einem beliebigen VPS — nützlich für eine private Community, ein
Relay nur für deinen Haushalt oder als zweite Verbindung für mehr
Ausfallsicherheit.

## Ein Relay betreiben

Ein Relay ist ein kleiner Python-Server (Open Source unter MPL 2.0).
Du kannst eines für deine Nachbarschaft, deine Stadt oder eine
bestimmte Community hosten. Siehe
[Ein Relay selbst betreiben](/de/docs/running-a-gfs/) für eine
Anleitung mit Docker Compose + Cloudflare.

## Nebeneinander

| Verhalten                | Privat / Haushalt / öffentlich                         | Global                                                                        |
| ------------------------ | ------------------------------------------------------ | ----------------------------------------------------------------------------- |
| Wer kann ihn finden      | Eingeladene / dein Zuhause / gekoppelte Haushalte      | jeder, der einen der GFS nutzt, die der Besitzer gewählt hat                  |
| Beitritt                 | Einladung, Haushaltsmitgliedschaft oder Beitrittsmodus | offen / Anfrage / nur auf Einladung, plus Einladungslinks                     |
| Wie Beiträge reisen      | direkt oder über das Mesh                              | genauso für gekoppelte Mitglieder; über jeden gelisteten GFS für alle anderen |
| Was ein GFS sieht        | nichts (außer ein privater Space schaltet ihn ein)     | Routing-Daten und einen versiegelten, aufgepolsterten Umschlag, nie Inhalte   |
| Verschlüsselung          | **immer an**                                           | **immer an**                                                                  |
| Wo Nachrichten liegen    | im Zuhause jedes Mitglieds                             | im Zuhause jedes Mitglieds (ein GFS speichert nie Inhalte)                    |
| Wenn ein GFS offline ist | entfällt                                               | die anderen gelisteten GFS machen weiter; Beiträge werden wiederholt          |
| Lässt sich abschalten    | ja, per Admin-Abstimmung                               | GFS jederzeit entfernen (Besitzer) oder nicht mehr global (Admin-Abstimmung)  |

## Privatsphäre in globalen Spaces

Ein globaler Space bleibt vom Rest deines Haushalts abgeschottet.
Was in einem Space gepostet wird, sickert nie in einen anderen oder
in deine privaten Spaces, und ein GFS erfährt immer nur von den
globalen Spaces, die er listet. Was das Relay sehen kann
und was nicht, steht auf den Seiten zum
[Datenschutzmodell](/de/docs/privacy/) und
[Sicherheitsmodell](/de/docs/security/).
