---
title: "Ein Space, der weiterläuft: mehr GFS, und jedes Mitglied kann dir nachliefern"
description: Spaces stützen sich jetzt auf jeden Haushalt und jeden GFS, den sie nutzen. Beiträge erreichen Mitglieder auf jedem GFS eines Space, dein Haushalt zieht zu einem anderen GFS um, wenn einer ausfällt, und du siehst, ob du alles aus einem Space hast, und holst Fehlendes bei jedem Mitglied nach, während der Gastgeber offline ist. In Social Home 2026.11.23.
date: 2026-11-23
author: Das Social Home Team
image: /blog/2026-11-sync/cover.webp
imageAlt: Eine Illustration von fünf Haushalten, die miteinander und mit zwei GFS verbunden sind. Ein GFS ist ausgegraut und durchgekreuzt, und ein gepunkteter Pfeil führt von ihm zum anderen GFS. Der Gastgeber-Haushalt in der Mitte ist verblasst, mit einem Mond daneben, während versiegelte Umschläge weiter zwischen den anderen Haushalten reisen, drei davon mit einem grünen Haken
order: 50
---

Social Home hat keine Mitte. Jeder Haushalt hat seine eigene Kopie der
[Spaces](/de/docs/glossary/#space), in denen er ist, bei sich zu Hause.
Der [GFS (Global Federation Server)](/de/docs/glossary/#gfs) trägt
versiegelte Beiträge zu Haushalten, mit denen du nicht gekoppelt bist,
und ein Space kann mehrere davon nutzen.

Die letzten beiden Releases bauen darauf auf. Ein Space nutzt jetzt
**jeden** GFS, den sein Eigentümer gewählt hat, und seine Mitglieder
liefern einander nach, was fehlt. Wenn ein GFS ausfällt, wenn das
Zuhause des Gastgebers gerade aktualisiert wird oder wenn dein eigenes
Zuhause übers Wochenende aus war, läuft der Space weiter, und du
siehst, dass du alles hast.

## Ein Space auf mehr als einem GFS

Der Eigentümer eines [globalen Space](/de/docs/global-spaces/) kann ihn
auf bis zu acht GFS listen, zum Beispiel auf dem GFS des Projekts und
auf einem, den ein Mitglied zu Hause betreibt. Deine Beiträge gehen
direkt an die Mitglieder auf **jedem** dieser GFS, auch auf solchen,
mit denen dein Haushalt nie verbunden war. Das ist ein Upload pro GFS,
egal wie viele Mitglieder dort warten.

So bekommt ein Mitglied, das nur den zweiten GFS nutzt, deinen Beitrag
genauso schnell wie alle anderen, und der Gastgeber muss ihn nicht
weitergeben.

<details class="tech">
<summary>Unter der Haube</summary>

Das Postfach eines Mitglieds kann auf jedem GFS der vom Eigentümer
signierten Liste `gfs_servers` liegen. Zwei oder mehr Mitglieder auf
einem GFS bekommen einen Upload per `POST /gfs/envelope/multi`, ein
einzelnes Mitglied per `POST /gfs/envelope`. Deine eigene Verbindung
zu einem GFS wird zuerst genutzt. Für einen gelisteten GFS, mit dem du
nie verbunden warst, nutzt dein Zuhause eine Sitzung ohne Cookie, die
an die gelistete Adresse gepinnt ist, nachdem der GFS bewiesen hat,
dass er den Schlüssel hält, den der Eigentümer signiert hat. Ein GFS,
der nicht auf der signierten Liste steht, bekommt gar keine Anfrage.

Der Gastgeber trägt einen Beitrag weiterhin, wenn kein gelisteter GFS es
kann: Der GFS steht nicht auf der Liste, er bietet keine Postfächer an,
er ist dreimal hintereinander gescheitert, oder das Element ist zu groß
für den Weg. Für 200 Mitglieder auf drei GFS ist ein Beitrag 3 Uploads.

</details>

## Fällt ein GFS aus, zieht dein Haushalt um

Dein Haushalt bekommt die Beiträge eines Space in einem anonymen
Postfach auf einem GFS. Bleibt dieser GFS etwa zehn Minuten lang weg,
und ist dein Haushalt mit einem anderen GFS des Space verbunden, öffnet
dein Zuhause dort ein Postfach und sagt es den anderen Mitgliedern.
Ihre Beiträge gehen dann in das neue Postfach.

Dein Haushalt springt dabei nicht hin und her. Kommt der erste GFS
zurück, bleibt dein Haushalt, wo er ist, und zieht erst wieder um, wenn
auch der zweite GFS ausfällt. Ist dein eigenes Internet weg, zieht
nichts um.

<details class="tech">
<summary>Unter der Haube</summary>

Die Prüfung läuft im eigenen Reconnect-Backoff des Postfachs mit, es
gibt also keinen zusätzlichen Timer: Der Umzug passiert 10 bis 18
Minuten nach Beginn eines Ausfalls, und nur zu einem GFS, der gerade
antwortet. Der ausgefallene GFS wird als _demoted_ markiert und steht ab
dann an letzter Stelle. Deine Mitgliedskarte für jeden betroffenen Space
bekommt eine neuere Revision und geht an den Gastgeber, der sie mit seinem
nächsten Update der Mitgliederliste weitergibt; etwa 0,7 KB pro Space.
Die Wahl übersteht einen Neustart.

</details>

## Der Space sagt dir, welcher GFS dir fehlt

Um zu einem anderen GFS umzuziehen, muss dein Haushalt mit ihm
verbunden sein. Deshalb sagt ein Space jetzt in seinem Feed, wenn er auf
einem GFS ist, mit dem dein Haushalt nicht verbunden ist: „Dieser Space
ist auch auf _GFS-Name_. Verbinde dich für eine stabilere Verbindung.“
Ein Admin des Haushalts bekommt einen Button **Verbinden**, der den
richtigen GFS öffnet, und alle anderen werden gebeten, einen Admin zu
fragen.

Für Admins, die für den Eigentümer handeln (mit **Admins dürfen für
mich handeln** an), zählt jeder GFS des Space. Die Admins ihres
Haushalts bekommen außerdem eine Mitteilung unter **Wartet auf dich**,
bis ihr Haushalt mit allen verbunden ist.

## Ist alles da?

Die Einstellungen eines Space haben jetzt einen Bereich namens **Ist
alles da?** Er sagt dir in einem Satz:

- **Alles ist da**, und wann es zuletzt geprüft wurde.
- **Neues wird geholt…**, während neue Beiträge ankommen.
- **Gerade keine Verbindung zum Gastgeber-Haushalt**, mit dem Stand,
  bis zu dem du alles hast. Was du postest, geht raus, sobald die
  Verbindung wieder da ist.
- **Vielleicht fehlen Beiträge**, erst nachdem zwei Abgleiche
  hintereinander nicht alles gebracht haben. Dein Zuhause versucht es
  alle 30 Minuten neu, und **Jetzt prüfen** fragt sofort nach.

Wenn Beiträge fehlen könnten, bekommt der Space ein ⚠ in deiner Liste
der Spaces. Deine eigenen Beiträge, die noch darauf warten, rauszugehen,
zeigen **Noch nicht gesendet**. Ein Space, bei dem dein Haushalt Gastgeber ist,
zeigt nie eine Warnung: Er hat per Definition alles.

<details class="tech">
<summary>Unter der Haube</summary>

Jedes Sync-Ergebnis wird pro Space gespeichert und zu einem Zustand in
`GET /api/spaces/{id}` und im Frame `space.sync_state`. **Jetzt
prüfen** steht jedem Mitglied offen (nicht Followern), dreimal pro
Stunde und Space. Admins bekommen eine Ansicht **Details** mit dem
Seitenvergleich: zu welcher Seite du passt, wie viele Teile abweichen
und wer sie signiert hat.

</details>

## Bei jedem Mitglied nachholen

Das Zuhause des Gastgebers, oder ein Admin, der für den Eigentümer handelt,
signiert ab und zu eine kurze Zusammenfassung von allem, was gerade im
Space ist, und schickt sie an alle Mitglieder. Dein Zuhause vergleicht
seine eigene Kopie mit dieser Zusammenfassung. Fehlt etwas, kann es das
bei **jedem** anderen Mitglieds-Haushalt holen, nicht nur beim Gastgeber.

Dein Zuhause behält nur, wofür die signierte Zusammenfassung bürgt. Ein
Mitglied, das etwas anderes oder etwas Verändertes schickt, kommt damit
nicht an deinem Zuhause vorbei. Ein Mitglied kann dir also beim
Nachholen helfen, aber nichts einschmuggeln.

So holst du nach einem Wochenende weg alles nach, auch wenn der Gastgeber
offline ist, wenn du zurückkommst. Jedes Mitglied, das da war, kann dir
nachliefern.

<details class="tech">
<summary>Unter der Haube</summary>

Die Zusammenfassung ist eine **Sync-Seite**: 256 Bucket-Hashes über
jede Zeile des Space und ein Header (`space_id`, Epoche, Unterzeichner,
Sequenz, Zeilenzahl, Root-Hash), signiert mit dem Autoritätsschlüssel
des Space (`page_suite: sha256-b256-c1`). Der Eigentümer und Admins mit
dem Signaturschlüssel des Space versiegeln höchstens alle 15 Minuten
nach einer Änderung eine, und schicken sie höchstens einmal pro Stunde
und Space, versiegelt mit dem Inhaltsschlüssel des Space: an gekoppelte
Mitglieder direkt, an Mitglieder hinter einem GFS mit einem Upload pro
GFS. Ein ruhiger Space schickt nichts.

Ein Mitglied vergleicht seine eigenen Bucket-Hashes mit der neuesten
Seite. Für die abweichenden Buckets fragt es einen beliebigen
Mitglieds-Haushalt (`SPACE_SYNC_BEGIN` mit `buckets`), höchstens drei
pro Runde und einen nach dem anderen. Eine Zeile wird nur übernommen,
wenn ihr Hash in einer Bucket-Liste steht, deren Hash zur signierten
Seite passt. Ein Mitglied hält etwa 9 KB pro Space. In einem belebten
Space mit 200 Mitglieds-Haushalten machen die Seiten etwa 7 % des
Uploads des Unterzeichners aus.

</details>

## Wie es zusammenkommt

Zusammen hat ein Space viele Stellen, auf denen er steht:

- **Das Zuhause jedes Mitglieds** hält den ganzen Space und kann den
  anderen nachliefern.
- **Jeder gelistete GFS** trägt die Beiträge, und Haushalte ziehen
  zwischen ihnen um, wenn einer ausfällt.
- **Admins** können den Space führen, während der Eigentümer weg ist,
  wenn der Eigentümer sie lässt.

Nichts davon musst du einrichten. Betreibst du einen belebten globalen
Space, liste ihn auf zwei GFS, zum Beispiel auf unserem und auf einem,
den du [selbst betreibst](/de/docs/running-a-gfs/), und verbinde deinen
Haushalt mit beiden. Social Home erledigt den Rest.

## Was es kostet, ganz offen

- **Ein GFS, mit dem du nie verbunden warst, sieht dich zustellen.**
  Geht dein Beitrag an Mitglieder auf einem gelisteten GFS, mit dem
  dein Haushalt nie verbunden war, sieht dieser GFS deine
  Internetadresse, die Zeit, die Größe und an welche Postfächer der
  Beitrag geht. Er sieht nie, welcher Haushalt du bist oder was du
  geschrieben hast.
- **Ein Mitglied, das mit keinem GFS des Space verbunden ist,** wird
  weiterhin über den Gastgeber erreicht, also wartet dieses Mitglied auf den
  Gastgeber.
- **Ein Mitglied kann dich noch einmal nachsehen lassen.** Ein
  Mitglied, das falsche Daten schickt, kann deinen Space „Vielleicht
  fehlen Beiträge“ sagen lassen. Es kann nie einen fehlenden Beitrag
  als vorhanden erscheinen lassen.
- **Wird ein Beitrag gelöscht, während der Gastgeber weg ist,** sagt dein
  Space vielleicht erst „Alles ist da“, wenn der Gastgeber zurück ist.

## Ausprobieren

Das Posten an jeden GFS eines Space und der Umzug zu einem anderen GFS
sind in **Social Home 2026.11.21** gekommen. **Ist alles da?** und das
Nachholen bei jedem Mitglied stecken in **Social Home 2026.11.23**.
Aktualisiere dein Zuhause und prüfe, ob dein Haushalt mit jedem GFS
verbunden ist, den deine Spaces nutzen. Mehr in
[Globale Spaces](/de/docs/global-spaces/).
