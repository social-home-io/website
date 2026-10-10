---
title: Globale Spaces
description: Räume für Haushalte, die sich noch nicht kennen — die vier Arten von Space, das Relay, das globale Spaces transportiert (eines, dem du vertraust, oder dein eigenes), und was es sehen kann und was nicht.
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

## Vier Arten von Space

Jede Art reicht ein Stück weiter als die vorherige:

| Art            | Wer kann ihn finden                                    | Sieht der GFS ihn?                                     |
| -------------- | ------------------------------------------------------ | ------------------------------------------------------ |
| **Privat**     | Nur Leute, die du einlädst                             | Nein, außer der Besitzer schaltet den GFS dafür ein    |
| **Haushalt**   | Alle in deinem Zuhause, automatisch                    | Nein                                                   |
| **Öffentlich** | Deine gekoppelten Haushalte, unter **Räume entdecken** | Nein, außer ein Admin veröffentlicht ihn von Hand dort |
| **Global**     | Jeder, dessen Zuhause mit demselben GFS verbunden ist  | **Ja**, er ist auf jedem GFS gelistet, den du nutzt    |

Eine Regel macht den Rest einfach: **Haushalte, mit denen du
gekoppelt bist, brauchen den GFS nicht.** Beiträge erreichen sie
direkt oder über das Mesh der Haushalte, die ihr beide kennt, egal
welche Art von Space es ist. Der GFS kommt nur für Haushalte ins
Spiel, mit denen du _nicht_ gekoppelt bist (oder als Ausweichweg,
wenn du das für eine Verbindung eingeschaltet hast und der direkte
Weg ausfällt).

Ein **öffentlicher** Space bleibt also in deinem eigenen Kreis: Es
ist ein Space, den deine gekoppelten Haushalte finden und um Beitritt
bitten können, nicht einer, den die ganze Welt sieht. Ein
**globaler** Space ist der für Fremde. Der Rest dieser Seite handelt
von globalen Spaces.

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

1. **Er ist ein Verzeichnis.** Er listet die globalen Spaces, die
   dort veröffentlicht wurden, wer sie hostet, wie man beitritt und,
   falls der Space einen hat, einen auf etwa 11 m gerundeten
   Karten-Pin. Jeder, der mit diesem GFS verbunden ist, findet sie
   unter **Räume entdecken**.
2. **Er trägt Beiträge zu Leuten, mit denen du nicht gekoppelt
   bist.** Das sind **Follower**, Haushalte, die mitlesen, ohne
   beizutreten (nur wenn der Besitzer Follower erlaubt; standardmäßig
   ist das aus), und **Mitglieder, die über einen GFS-Link
   beigetreten sind**. Mitglieder, mit denen du gekoppelt bist,
   bekommen jeden Beitrag weiterhin direkt oder über das Mesh.

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

`PUBLIC_SPACE_TIERS = {public, global}`: Nur diese beiden dürfen
überhaupt Inhalte an einen GFS weiterleiten. Ein globaler Space wird
auf jedem GFS veröffentlicht, mit dem der Haushalt verbunden ist,
sobald er global wird, und von allen zurückgezogen, wenn er es nicht
mehr ist. Ein öffentlicher Space erreicht gekoppelte Haushalte als
`SPACE_DIRECTORY_SYNC`-Snapshot (Name, Beschreibung, Emoji,
Mitgliederzahl, Beitrittsmodus), nie über einen GFS; einen GFS
erreicht er nur über den manuellen Veröffentlichen-Knopf und wird
wieder zurückgezogen, wenn er privat oder Haushalt wird. Follower
brauchen `allow_subscribers` an (standardmäßig aus). Mitglieder
bekommen Beiträge immer über den normalen Mitglieder-Fan-out, direkt
oder per Mesh, unabhängig vom GFS. Umschläge sind AES-256-GCM,
signiert mit Ed25519. Padding-Klassen: 1 / 4 / 16 / 64 / 128 KiB
(Mitglieder-Veröffentlichung), plus 191 KiB für Umschlag-Relay.
Offline-Empfänger werden 24 h lang gepuffert, höchstens 2000
Umschläge oder 64 MiB pro Empfänger. Alle Details auf der Seite zum
[Sicherheitsmodell](/de/docs/security/#was-ein-relay-sieht).

</details>

## Vertrauend oder streng

Für die Beiträge, die tatsächlich über den GFS gehen, läuft ein
Space standardmäßig im **vertrauenden** Modus (trusted): Das Relay
erfährt, welcher Haushalt in welchen Space gepostet hat
und wann — aber nie was. Für Communities, denen schon das zu viel
ist, kann der Besitzer des Space in den **strengen** Modus (strict)
wechseln: Beiträge gehen ganz ohne Absender hinaus, und das Relay
weiß nur, dass _jemand_ im Space gepostet hat.

<details class="tech">
<summary>Unter der Haube</summary>

Zwei Wege erreichen den GFS. Wenn der Host-Haushalt einen Beitrag
weiterleitet, ist die Anfrage identitätsfrei — `{space_id,
event_type, payload}` auf einer Sitzung ohne Cookies — und geht nur
an einen GFS, der `anonymous_publish`-Unterstützung nachgewiesen
hat. Wenn ein Mitglied selbst veröffentlicht, signiert der
vertrauende Modus die Anfrage mit dem Schlüssel dieses Haushalts
(der GFS erfährt also, wer gepostet hat); der strenge Modus signiert
sie mit einem gemeinsamen Schreibschlüssel pro Epoche, der aus dem
Space-Seed abgeleitet wird, sodass der GFS die Mitglieder nicht
auseinanderhalten kann. Eine reine Mitgliedschafts-Synchronisation
verrät dem GFS nichts. In beiden Modi sieht der GFS weiterhin
Quell-IP, Timing, die Größenklasse und die Abonnentenmenge.

</details>

## Wie Finden und Beitreten funktionieren

1. Ein Haushalt macht einen Space **global**. Sein Zuhause
   veröffentlicht Name, Beschreibung, Titelbild, Altersrichtlinie und
   Akzentfarbe auf jedem GFS, mit dem es verbunden ist: genug, um ihn
   zu listen, aber **keine Nachrichteninhalte**.
2. Jeder, dessen Zuhause mit demselben GFS verbunden ist, kann ihn
   unter **Räume entdecken** finden und um Beitritt bitten oder
   ihm folgen, wenn der Besitzer Follower erlaubt.
3. Ob ein Beitritt gewährt wird, hängt vom **Beitrittsmodus** des
   Space ab: **Offen** (jeder kann sofort beitreten), **Anfrage**
   (ein Admin sagt Ja) oder **Nur auf Einladung**. Einladungslinks
   funktionieren zusätzlich zu jedem davon.
4. Sobald du drin bist, reisen Beiträge von deinem Zuhause zum
   Zuhause jedes anderen Mitglieds: direkt oder über das Mesh für
   Haushalte, mit denen du gekoppelt bist, über den GFS für Follower
   und Mitglieder, die über einen GFS-Link beigetreten sind.

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

## Was passiert, wenn das Relay ausfällt?

Mitglieder, mit denen du gekoppelt bist, merken nichts: Ihre
Beiträge liefen nie über den GFS. Follower und Mitglieder, die über
einen GFS-Link beigetreten sind, müssen warten. Nichts geht
stillschweigend verloren: Dein Haushalt versucht es weiter (nach ein
paar Sekunden, dann nach einer halben Minute, dann nach ein paar
Minuten, dann alle zehn), und das Relay hält, sobald es zurück ist,
weiterhin bis zu einen Tag versiegelter Umschläge für Haushalte
bereit, die offline waren. Deine lokale Kopie ist in dem Moment zu
Hause gespeichert, in dem du auf Senden drückst.

Hat dein Space viele Follower, ist es die Lösung, deinen Haushalt
mit einem zweiten Relay zu verbinden (oder ein eigenes zu
betreiben). Ein globaler Space wird auf jedem Relay veröffentlicht,
mit dem du verbunden bist, und Beiträge für Follower gehen über alle
hinaus.

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

| Verhalten                  | Privat / Haushalt / öffentlich                         | Global                                                                      |
| -------------------------- | ------------------------------------------------------ | --------------------------------------------------------------------------- |
| Wer kann ihn finden        | Eingeladene / dein Zuhause / gekoppelte Haushalte      | jeder, der mit demselben GFS verbunden ist                                  |
| Beitritt                   | Einladung, Haushaltsmitgliedschaft oder Beitrittsmodus | offen / Anfrage / nur auf Einladung, plus Einladungslinks                   |
| Wie Beiträge reisen        | direkt oder über das Mesh                              | genauso für gekoppelte Mitglieder; über den GFS für alle anderen            |
| Was das Relay sieht        | nichts (kein Relay, außer eingeschaltet)               | Routing-Daten und einen versiegelten, aufgepolsterten Umschlag, nie Inhalte |
| Verschlüsselung            | **immer an**                                           | **immer an**                                                                |
| Wo Nachrichten liegen      | im Zuhause jedes Mitglieds                             | im Zuhause jedes Mitglieds (das Relay speichert nie Inhalte)                |
| Wenn das Relay offline ist | entfällt                                               | Follower warten; Beiträge werden wiederholt, das Relay hält einen Tag lang  |
| Lässt sich abschalten      | ja, per Admin-Abstimmung                               | ja: per Admin-Abstimmung nicht mehr global machen, und das Relay vergisst   |

## Privatsphäre in globalen Spaces

Ein globaler Space bleibt vom Rest deines Haushalts abgeschottet.
Was in einem Space gepostet wird, sickert nie in einen anderen oder
in deine privaten Spaces, und das Relay erfährt immer nur von den
globalen Spaces, an denen du teilnimmst. Was das Relay sehen kann
und was nicht, steht auf den Seiten zum
[Datenschutzmodell](/de/docs/privacy/) und
[Sicherheitsmodell](/de/docs/security/).
