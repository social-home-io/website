---
title: Globale Spaces
description: Räume für Haushalte, die sich noch nicht kennen — öffentliche und globale Spaces, das Relay, das sie transportiert (eines, dem du vertraust, oder dein eigenes), und was es sehen kann und was nicht.
order: 40
---

Die meisten Spaces in Social Home sind privat — nur für eingeladene
Haushalte. Aber manche Communities sind von Natur aus offen: ein
Nachbarschafts-Marktplatz, ein Laufclub für die ganze Stadt, ein
Buchclub für gemeinfreie Bücher. Dafür hat Social Home
**öffentliche** und **globale Spaces** und ein kleines Relay — den
GFS (Global Federation Server – der globale Föderationsserver) —,
das Haushalten hilft, einander zu finden. (Neues Wort? Siehe
[GFS](/de/docs/glossary/#gfs) im Glossar.)

## Vier Arten von Space

Bevor du zu einem Relay greifst, lohnt sich ein Blick auf das ganze
Spektrum. Social Home kennt vier Space-Reichweiten (Scopes), jede
mit einem etwas größeren Publikum:

| Reichweite     | Sichtbar für                                                                              | Nutzt ein Relay (GFS)?       |
| -------------- | ----------------------------------------------------------------------------------------- | ---------------------------- |
| **Privat**     | Mitglieder, die du ausdrücklich einlädst                                                  | Optional (standardmäßig aus) |
| **Haushalt**   | Mitglieder deines eigenen Haushalts                                                       | Nein                         |
| **Öffentlich** | Auf der Karte des GFS gelistet — jeder, der mit diesem GFS verbunden ist, kann ihn finden | **Ja**                       |
| **Global**     | Weltweit über deinen GFS veröffentlicht                                                   | **Ja**                       |

Private und Haushalts-Spaces reisen direkt zwischen den beteiligten
Haushalten. Der Besitzer eines privaten Space kann den GFS dafür
einschalten — nützlich, wenn Mitglieder sich nicht direkt erreichen
können —, aber er ist aus, solange du ihn nicht einschaltest.

Öffentliche und globale Spaces laufen beide über den GFS. Ein
**öffentlicher** Space bekommt einen Pin auf der Karte des GFS, mit
dem du verbunden bist, mit auf etwa 11 m gerundetem Standort, sodass
jeder auf diesem GFS ihn finden kann. Ein **globaler** Space wird
weltweit über deinen GFS veröffentlicht. Der Rest dieser Seite
behandelt diese beiden.

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

## Was ein globaler Space ist

Ein öffentlicher oder globaler Space lebt auf einem GFS, mit dem
sich jeder Haushalt verbinden kann. Das Relay hat zwei Aufgaben:

1. **Es ist Karte und Verzeichnis.** Es listet, welche Spaces dort
   veröffentlicht wurden, wer sie hostet und wie man beitritt.
2. **Es ist die Beitrags-Drehscheibe.** Sobald du Mitglied bist,
   geht jeder Beitrag, den du schreibst, durch das Relay, das ihn an
   jeden anderen Haushalt in diesem Space verteilt.

Das Relay sieht nie den _Inhalt_ deiner Beiträge. Jeder Beitrag wird
auf dem Weg aus deinem Zuhause versiegelt und erst im Zuhause jedes
Mitglieds wieder geöffnet, wenn er ankommt. Der Umschlag wird auf
eine von wenigen festen Größen aufgepolstert, sodass das Relay nicht
einmal eine kurze Nachricht von einer langen unterscheiden kann. Es
speichert keine Inhalte: Ist ein Mitglied offline, hält es dessen
versiegelte Umschläge einen Tag lang zurück und lässt sie dann
fallen.

> Stell dir das Relay als Poststelle einer offenen Community vor.
> Die Poststelle sieht, dass ein versiegeltes Paket an den Buchclub
> ging und ungefähr, wie schwer es war — aber nur die Mitglieder
> haben Schlüssel, um es zu öffnen.

<details class="tech">
<summary>Unter der Haube</summary>

Umschläge sind AES-256-GCM, signiert mit Ed25519; die einzigen
lesbaren Felder sind `event_type`, `from_instance`, `to_instance`,
`space_id` und `epoch`. Padding-Klassen: 1 / 4 / 16 / 64 / 128 KiB
(Mitglieder-Veröffentlichung), plus 191 KiB für Umschlag-Relay.
Offline-Empfänger werden 24 h lang gepuffert, höchstens 2000
Umschläge oder 64 MiB pro Empfänger. Alle Details auf der Seite zum
[Sicherheitsmodell](/de/docs/security/#was-ein-relay-sieht).

</details>

## Vertrauend oder streng

Standardmäßig läuft ein Space im **vertrauenden** Modus (trusted):
Das Relay erfährt, welcher Haushalt in welchen Space gepostet hat
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

## Wie Entdecken und Posten funktionieren

1. Ein Haushalt legt einen Space an und **veröffentlicht** ihn auf
   einem Relay. Das Relay erhält Name, Beschreibung, Titelbild,
   Altersrichtlinie und Akzentfarbe des Space — genug, um ihn auf
   die Karte zu setzen — aber **keine Nachrichteninhalte**.
2. Jeder, dessen Zuhause mit demselben Relay verbunden ist, kann die
   Karte durchstöbern, den Space finden und um Beitritt bitten.
3. Ob der Beitritt gewährt wird, hängt vom **Beitrittsmodus** des
   Space ab, den der Host wählt: **Offen** (jeder kann sofort
   beitreten) oder **Anfrage** (der Host-Haushalt prüft und
   genehmigt). Einladungslinks funktionieren zusätzlich zu beidem.
4. Sobald du Mitglied bist, fließen Beiträge im Space so:
   `dein Zuhause → Relay → Zuhause jedes anderen Mitglieds`. Das
   Relay ist bei jeder Nachricht und jeder Reaktion auf dem Weg; es
   verabschiedet sich nicht nach dem Kennenlernen.

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

Das Relay ist die Beitrags-Drehscheibe für öffentliche und globale
Spaces; solange es ausgefallen ist, warten Beiträge an diese Spaces.
Nichts geht stillschweigend verloren: Dein Haushalt versucht es
weiter — nach ein paar Sekunden, dann nach einer halben Minute, dann
nach ein paar Minuten, dann alle zehn —, und das Relay hält, sobald
es zurück ist, weiterhin bis zu einen Tag versiegelter Umschläge
für Mitglieder bereit, die offline waren. Deine lokale Kopie ist in
dem Moment zu Hause gespeichert, in dem du auf Senden drückst.

In der Praxis zählt das, wenn:

- Dein Relay einen Ausfall hat. Mitglieder, die im Space
  _miteinander_ reden, sehen keine neuen Beiträge, bis es zurück
  ist.
- Du von einem einzigen, vom Projekt betriebenen Relay abhängst.
  Deinen Haushalt mit einem zweiten Relay zu verbinden (oder ein
  eigenes zu betreiben) ist die Lösung.

Deinen Space mit **mehreren Relays** zu verbinden wird unterstützt
und für mehr Ausfallsicherheit empfohlen. Beiträge gehen über jedes
Relay hinaus, mit dem du verbunden bist.

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

## Was sich gegenüber anderen Reichweiten ändert

| Verhalten                  | Privat / Haushalt                              | Öffentlich / global                                                                         |
| -------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Sichtbar für               | nur Eingeladene / Haushaltsmitglieder          | auf der Karte des Relays; jeder, der damit verbunden ist, kann ihn finden                   |
| Beitritt                   | Einladung oder Haushaltsmitgliedschaft         | offen / Anfrage / Einladungslink — der Host wählt pro Space                                 |
| Wie Beiträge reisen        | direkt, von Haushalt zu Haushalt               | durch das Relay an jedes Mitglied, jedes Mal                                                |
| Was das Relay sieht        | nichts (kein Relay, außer du schaltest es ein) | Routing-Daten und einen versiegelten, aufgepolsterten Umschlag — nie Inhalte                |
| Verschlüsselung            | **immer an**                                   | **immer an**                                                                                |
| Wo Nachrichten liegen      | im Zuhause jedes Mitglieds                     | im Zuhause jedes Mitglieds (das Relay speichert nie Inhalte)                                |
| Wenn das Relay offline ist | entfällt                                       | Beiträge warten und werden wiederholt; das Relay hält nach der Rückkehr einen Tag Umschläge |
| Sichtbar für Peers         | nur Mitglieder                                 | nur Mitglieder — sickert nie in den Graphen deiner gekoppelten Haushalte                    |
| Lässt sich abschalten      | ja, per Admin-Abstimmung                       | ja — per Admin-Abstimmung zurückziehen; das Relay vergisst ihn                              |

## Privatsphäre in globalen Spaces

Öffentliche und globale Spaces bleiben vom Rest deiner Föderation
abgeschottet. Sie tauchen bei deinen gekoppelten Haushalten nicht
auf, sie werden in keine Synchronisation auf Haushaltsebene
einbezogen, und was in einem Space gepostet wird, sickert nie in
einen anderen (oder in deine privaten Spaces). Der Space ist ein
bewusst gezogener Rahmen: nur Mitglieder, auf dem Relay, das du
gewählt hast. Was das Relay sehen kann und was nicht, steht auf den
Seiten zum [Datenschutzmodell](/de/docs/privacy/) und
[Sicherheitsmodell](/de/docs/security/).
