---
title: "Eine Tafel für die Küchenwand und eine Karte, die eure Orte kennt"
description: Das Haushalts-Dashboard bringt den Tag, den Haushalts-Chat und wer wo ist auf ein Tablet an der Wand, mit Bildansicht für Kinder und Privatsphäre-Sperre für Besuch. Zonen geben deinem Haushalt eigene Orte, auf Wunsch aus Home Assistant synchronisiert. Alles in Social Home 2026.10.13.
date: 2026-10-13
author: Das Social Home Team
image: /blog/2026-10-dashboard/overview.png
imageAlt: Übersicht auf dem Wandtablet um 16:32 mit einem Banner Nachricht für alle von Anna, dem nächsten Termin Schwimmen um 17:00, den letzten Haushaltsnachrichten und einer Zeitleiste des Tages für jedes Familienmitglied
order: 50
---

Montag, halb fünf. Anna verlässt gerade die Arbeit und holt noch
einen Kuchen für Oma. Mias Musikstunde ist in Raum 12 umgezogen, Leos
Schwimmen beginnt um fünf, und irgendwer muss noch die Schwimmtasche
finden. Niemand will dafür extra das Handy entsperren.

Deshalb hat Social Home jetzt ein **Haushalts-Dashboard**: eine ruhige
Tafel für ein Tablet an der Küchenwand oder im Flur. Sie zeigt den Tag
auf einen Blick, die Nachrichten, die gerade zählen, und, neu diese
Woche, eine Karte, wer wo ist. Hinter der Karte stehen **Zonen**: die
Orte, die dein Haushalt beim Namen kennt. Zuhause, Schule, Arbeit,
bei Oma.

_Alle Bildschirme unten zeigen einen Beispielhaushalt: Anna, Pascal,
Mia (11) und Leo (6), an einem Wochentagnachmittag in Zürich._

## Der ganze Haushalt auf einen Blick

Die **Übersicht** ist die Tafel, die du im Vorbeigehen siehst: eine
große Uhr und das Datum, was als **Nächstes** kommt (abends das Erste
von **Morgen**), wer zu Hause ist und wer unterwegs, und für jede
Person eine Spur durch den Tag mit einer „Jetzt“-Markierung. Die
Schulstunden kommen aus dem [Stundenplan](/de/blog/2026-10-01-timetables/)
jedes Kindes, und die Änderungen von heute stehen ausgeschrieben da:
ausgefallen, in einen anderen Raum verlegt oder neu dazugekommen.
Aufgaben, Einkaufsliste und Notizen füllen den Rest. Auf dem Handy oder
einem hochkant aufgehängten Tablet wird dieselbe Tafel zu einer Spalte.

Die Tafel aktualisiert sich alle 30 Sekunden von selbst. Fällt das WLAN
aus, zeigt sie weiter den letzten Stand, graut aus, was veraltet sein
könnte, und erholt sich von allein.

<div class="shots">
<figure class="desk"><a href="/blog/2026-10-dashboard/overview.png"><img src="/blog/2026-10-dashboard/overview.png" alt="Übersicht auf dem Wandtablet um 16:32 mit einem Banner Nachricht für alle von Anna, die gerade die Arbeit verlässt und einen Kuchen für Oma holt, einem Verstanden-Knopf, dem nächsten Termin Schwimmen um 17:00, den letzten Nachrichten und einer Zeitleiste des Tages für Anna, Leo, Mia und Pascal" width="1280" height="800" loading="lazy"></a><figcaption><b>Übersicht</b>Vier Uhr nachmittags, Annas Nachricht für alle steht ganz oben.</figcaption></figure>
</div>

## Nachrichten, die an der Wand ankommen

Im Stau? Schreib „Fangt mit den Hausaufgaben an, bin in 20 Minuten da“
im Haushalts-Chat auf deinem Handy, und es erscheint auf der Tafel in
der Küche. Das ist **standardmäßig aus**: Das Dashboard zeigt nie Chat,
außer ein Admin schaltet **Haushaltsnachrichten anzeigen** ein.

Ist es an, zeigt die Übersicht die drei neuesten Nachrichten der
letzten sechs Stunden, und der Tab **Nachrichten** den Haushalts-Chat
des letzten Tages. Tippst du auf eine Nachricht, liest das Tablet sie
vor, praktisch für Kinder, die noch nicht lesen können. Schreib
**@here**, und es wird zu einem Banner für alle; schreib **@leo**, und
auf Leos Gesicht erscheint ein Punkt, die Nachricht wartet oben auf
seiner Seite. **Verstanden** entfernt sie auf jedem Tablet und setzt
ein ✅ an die Nachricht im Chat, damit der Absender sieht, dass sie
angekommen ist. Bei einer neuen Erwähnung klingt einmal ein leiser Ton,
nachts nie.

<div class="shots">
<figure class="desk"><a href="/blog/2026-10-dashboard/messages-tab.png"><img src="/blog/2026-10-dashboard/messages-tab.png" alt="Tab Nachrichten mit dem @here-Banner oben und den heutigen Haushaltsnachrichten von Pascal, Mia, Anna und Leo, neueste zuerst, mit Uhrzeiten und einer NEU-Markierung an der letzten" width="1280" height="800" loading="lazy"></a><figcaption><b>Nachrichten</b>Der Haushalts-Chat des letzten Tages an einem Ort, vorgelesen auf Tipp.</figcaption></figure>
<figure class="phone"><a href="/blog/2026-10-dashboard/mention-phone.png"><img src="/blog/2026-10-dashboard/mention-phone.png" alt="Mias Seite auf dem Handy mit einer Karte Nachricht für dich von Anna, die sie an ihr Klavierbuch erinnert, einem Verstanden-Knopf, darunter Jetzt Musik in Raum 12 und Danach Klavier" width="390" height="844" loading="lazy"></a><figcaption><b>Nachricht für dich</b>Eine @Erwähnung wartet oben auf der Seite dieser Person.</figcaption></figure>
</div>

<details class="tech">
<summary>Unter der Haube</summary>

Das Dashboard liest den Chat nur: Es legt ihn nie an und verschiebt
niemandes Lesemarke. Systemhinweise, Standort-Pins, gelöschte
Nachrichten und Nachrichten von ausgeblendeten Personen bleiben
draußen, und Sperren von Erziehungsberechtigten werden beachtet (schlägt
die Abfrage fehl, erscheinen gar keine Nachrichten). Vorlesen nutzt nur
Stimmen, die auf dem Tablet selbst laufen (`localService === true`);
ein Tablet ohne solche Stimme zeigt kein 🔊, Text geht also nie an eine
Cloud-Stimme. „Verstanden“ ist der einzige Schreibzugriff des
Dashboards: eine ✅-Reaktion in `message_reactions`, auf dem Server
erneut geprüft und auf 30 pro 5 Minuten je Tablet begrenzt.

</details>

## Eine Seite für alle, und Bilder für Kinder

Tipp auf ein Gesicht, und du siehst den Tag dieser Person: jetzt und
danach, Termine, Aufgaben, morgen und den Stundenplan mit dem, was
ausfällt und was verlegt wurde.

Kinder, die noch nicht lesen können, bekommen stattdessen eine
**Bildansicht**: eine große Zeigeruhr mit einem farbigen Keil, der bis
zum nächsten Termin schrumpft, **JETZT** und **DANACH** als große
Bilder, den Tag aufgeteilt in Morgen, Nachmittag, Abend und Nacht, und
Aufgaben als Kacheln zum Abhaken. Kleine Beschriftungen helfen
Erwachsenen beim Mitlesen. Die Bildansicht ist für geschützte
Kinderkonten standardmäßig an, ein Admin kann sie pro Person umstellen.

<div class="shots">
<figure class="desk"><a href="/blog/2026-10-dashboard/person-school.png"><img src="/blog/2026-10-dashboard/person-school.png" alt="Mias Seite, gescrollt zu Schule heute: Englisch und Mathe, Sport durchgestrichen und als ausgefallen markiert, Naturkunde, Kunst und Musik als geändert markiert und jetzt in Raum 12, daneben ihre Abendpläne und Aufgaben" width="1280" height="800" loading="lazy"></a><figcaption><b>Mias Schultag</b>Was ausfällt und was verlegt wurde, immer beschriftet, nie nur über Farbe.</figcaption></figure>
<figure class="desk"><a href="/blog/2026-10-dashboard/picture-view.png"><img src="/blog/2026-10-dashboard/picture-view.png" alt="Leos Bildseite mit einer Zeigeruhr, einer Nachrichtenkachel von Pascal mit großem Haken, dem Paar Jetzt Freizeit und Danach Schwimmen, Nachrichtengesichtern mit kurzen Beschriftungen und seinem Tag in Kacheln für Morgen, Nachmittag und Abend" width="1280" height="800" loading="lazy"></a><figcaption><b>Bildansicht</b>Leo kann noch nicht lesen, also spricht seine Seite in Bildern und mit einem Zifferblatt.</figcaption></figure>
</div>

## Nachts, und wenn Besuch da ist

Nachts dimmt die Tafel auf eine Uhr und das Erste von morgen. Sind
Gäste, Babysitter oder die Putzhilfe da, sperrt ein Tipp auf 🔒 das
Tablet auf einen Bildschirm ohne Persönliches: Haushaltsname, Uhrzeit
und Datum. Eine 4- bis 6-stellige PIN entsperrt es, und nach fünf
falschen Versuchen wird das Tablet abgemeldet.

Manches kommt nie an die Wand, ob gesperrt oder nicht:
Direktnachrichten, Benachrichtigungen, Umfragen und Orte von Terminen.
Personen, die ein Admin im Dashboard ausblendet, tauchen nirgends
darauf auf.

<div class="shots">
<figure class="desk"><a href="/blog/2026-10-dashboard/night.png"><img src="/blog/2026-10-dashboard/night.png" alt="Nachtansicht auf schwarzem Bildschirm mit 22:32, Montag, 12. Oktober, und Morgen 08:00 Schule mit Leos Gesicht, dazu ein Hinweis, dass ein Tipp das Dashboard zeigt" width="1280" height="800" loading="lazy"></a><figcaption><b>Nachts</b>Eine Uhr und das Erste von morgen.</figcaption></figure>
<figure class="desk"><a href="/blog/2026-10-dashboard/lock.png"><img src="/blog/2026-10-dashboard/lock.png" alt="Sperrbildschirm, der nur den Haushaltsnamen, die Uhrzeit 16:32, das Datum und einen PIN-Knopf zeigt" width="1280" height="800" loading="lazy"></a><figcaption><b>Privatsphäre-Sperre</b>Nur der Haushaltsname und die Uhrzeit.</figcaption></figure>
</div>

## Einrichten

Alles liegt unter **Admin › Dashboard**, in der Reihenfolge, in der du
es brauchst: ein Haushaltspasswort setzen, das Dashboard einschalten,
dann das Tablet mit einem einmaligen QR-Code anmelden, damit niemand
auf dem Tablet tippen muss. Auf derselben Seite stellst du die PIN, das
Nachtfenster, die Sprache, die angezeigten Personen und die Bildansicht
ein. **Alle Tablets abmelden** ist einen Knopf entfernt.

<div class="shots">
<figure class="desk"><a href="/blog/2026-10-dashboard/admin-qr.png"><img src="/blog/2026-10-dashboard/admin-qr.png" alt="Dashboard-Einstellungen in der Social Home App mit der Tablet-Adresse, einem zehn Minuten gültigen Anmelde-QR-Code, einem Knopf für einen neuen Anmeldelink und dem Port" width="1280" height="720" loading="lazy"></a><figcaption><b>Ein Tablet anmelden</b>QR-Code scannen; er gilt einmal und zehn Minuten lang.</figcaption></figure>
</div>

<details class="tech">
<summary>Unter der Haube</summary>

Das Dashboard ist eine eigene, serverseitig gerenderte Web-App auf
einem eigenen Port (standardmäßig `8100`), gedacht für dein Heimnetz.
Es akzeptiert weder die Anmeldung der App noch Ingress-Header von Home
Assistant. Im Home Assistant Add-on schaltest du den Port unter
**Einstellungen › Apps › Social Home › Netzwerk** frei. Das
Haushaltspasswort wird mit scrypt gehasht; Tablets bekommen ein
signiertes Cookie (12 Stunden, oder ein Jahr mit „Dieses Tablet
angemeldet lassen“), und „Alle Tablets abmelden“ widerruft alle Cookies
auf einmal. Das QR-Token gilt einmal, zehn Minuten lang, und wird nur
als SHA-256-Hash gespeichert. Anmeldungen werden gedrosselt, `Host`
wird gegen eine Erlaubnisliste geprüft, und die Seiten kommen mit
strikter CSP und ohne Anfragen an Dritte.

</details>

## Zonen: die Orte, die dein Haushalt kennt

Eine Zone ist ein benannter Ort mit Radius: Zuhause, Schule, Arbeit,
bei Oma. Ist jemand darin, sieht der Haushalt ihn dort mit Namen, auf
der Karte und in der Mitgliederliste, statt als Punkt auf einer Straße.

Admins verwalten sie unter **Admin › Zonen**. **Zuhause** steht immer
zuerst und lässt sich nicht löschen; um es zu verschieben, markierst du
eine andere Zone als Zuhause. Jede Zone kann ein Emoji tragen, aus einem
Dutzend Orts-Vorlagen oder jedes andere Emoji, und Listen sind von A–Z
sortiert. Teilt ein Handy einen Standort, ohne eine Zone zu nennen,
ermittelt Social Home die Zone selbst.

**Deine Zonennamen verlassen nie dein Zuhause.** Sie gehen weder an
gekoppelte Haushalte noch in einen Space.

<div class="shots">
<figure class="desk"><a href="/blog/2026-10-dashboard/admin-zones.png"><img src="/blog/2026-10-dashboard/admin-zones.png" alt="Tab Admin Zonen mit der Überschrift Haushaltszonen, 4 von 50 Zonen belegt, einem Knopf Zone hinzufügen und Karten für Home (als Zuhause markiert), Gran's, School und Work mit Emoji, Radius und Koordinaten, neben einer Zürich-Karte mit den vier Zonenkreisen" width="1280" height="820" loading="lazy"></a><figcaption><b>Admin › Zonen</b>Zuhause zuerst, jeder Ort mit eigenem Emoji.</figcaption></figure>
<figure class="desk"><a href="/blog/2026-10-dashboard/zone-icon.png"><img src="/blog/2026-10-dashboard/zone-icon.png" alt="Dialog Zone bearbeiten mit dem Namen Home, einer Reihe Orts-Symbole mit ausgewähltem Haus, den Optionen Kein Symbol und Anderes Emoji, einer Farbreihe und einem Radius-Regler bei 150 m" width="1280" height="720" loading="lazy"></a><figcaption><b>Zone bearbeiten</b>Orts-Vorlagen, kein Symbol oder jedes andere Emoji.</figcaption></figure>
</div>

**Du hast schon Zonen in Home Assistant?** Wenn du Social Home über
Home Assistant installiert hast, kann es sie spiegeln: Schalte **Zonen
aus Home Assistant synchronisieren** ein, und seine Zonen erscheinen in
der Liste, markiert mit _Aus Home Assistant_ und immer aktuell. Diese
bearbeitest du in Home Assistant; Zonen, die du in Social Home anlegst,
bleiben deine. Das Ausschalten fragt erst nach und entfernt dann nur die
synchronisierten Zonen. Und startet Home Assistant gerade neu oder ist
nicht erreichbar, wird nichts entfernt.

Spaces haben schon länger eigene Zonen; sie bekommen jetzt dieselben
Emoji-Symbole.

<details class="tech">
<summary>Unter der Haube</summary>

Haushaltszonen liegen in einer rein lokalen Tabelle `household_zones`,
die nie föderiert wird: bis zu 50 Zonen, Radius 25 m bis 50 km,
höchstens eine Zuhause-Zone. Ein Protokolltest prüft, dass ein
Haushaltszonenname nie im Föderations-Fan-out, in Space-WebSocket-Frames
oder in `GET /api/spaces/{id}/presence` auftaucht. Der Abgleich eines
geteilten GPS-Punkts mit Zonen läuft nur, wenn die App keine Zone
genannt hat, so bleibt Home Assistant maßgeblich dafür, wer in welcher
Zone ist.

Der Sync liest `zone.*` aus `GET /api/states` von Home Assistant, beim
Start und alle 5 Minuten: Passive Zonen werden übersprungen, `zone.home`
wird zu Zuhause, und `mdi:`-Icons werden zu Emoji. Eine Antwort ohne
`zone.home` heißt, dass Home Assistant noch startet, also wird dieser
Durchlauf übersprungen. Space-Zonen-Symbole reisen als optionales Feld
`icon`; ältere Haushalte ignorieren es einfach.

</details>

## Eine Karte, die sich wie eine Liste liest

Die Karte in der App ist neu gemacht, im Stil der neuen Karte von Home
Assistant. Personen sind Fotomarker in ihrer eigenen Farbe. Alle in
derselben Zone teilen sich eine Blase an der Zone, mit bis zu drei
Gesichtern und einem „+N“; nahe Blasen verschmelzen beim Herauszoomen.
Jede Zone zeigt ihr Emoji in der Mitte.

Neben der Karte sagt ein Panel **Personen** und **Zonen** es in Worten:
Wähl eine Person, um zu ihr zu zoomen und ihre Zone und letzte
Aktualisierung zu sehen, oder wähl eine Zone, um zu sehen, wer gerade
dort ist. Auf dem Handy ist das Panel ein Blatt zum Hochziehen. Social
Home speichert keinen Standortverlauf. Es weiß nur, wo jemand jetzt ist.

<div class="shots">
<figure class="desk"><a href="/blog/2026-10-dashboard/presence-map.png"><img src="/blog/2026-10-dashboard/presence-map.png" alt="Anwesenheitsseite mit einer Zürich-Karte: Blasen für Mia an der Schule, Leo und Pascal gemeinsam in der Zuhause-Blase und Anna allein, Zonen-Pins für Gran's und Work, daneben ein Panel Personen und Zonen mit Zone und letzter Aktualisierung jeder Person" width="1280" height="720" loading="lazy"></a><figcaption><b>Anwesenheit</b>Karte und Personenliste nebeneinander.</figcaption></figure>
<figure class="phone"><a href="/blog/2026-10-dashboard/presence-phone.png"><img src="/blog/2026-10-dashboard/presence-phone.png" alt="Anwesenheitsseite auf dem Handy, die Karte auf Mias Blase am Schul-Pin fokussiert, darunter ein Blatt mit ihren Details: Wo Schule, Letzte Aktualisierung vor 27 Min., Aktivität offline" width="390" height="844" loading="lazy"></a><figcaption><b>Auf dem Handy</b>Tipp auf Mia, und du siehst, wo sie ist und wann sie zuletzt aktualisiert hat.</figcaption></figure>
</div>

Dieselben Marker gibt es auf der Karte eines Space. In einem Space, der
nur Zonen teilt, erscheinen Mitglieder in der Mitte einer Zone, die der
Space festgelegt hat, nie an ihrer echten Position.

<div class="shots">
<figure class="desk"><a href="/blog/2026-10-dashboard/space-zone-only.png"><img src="/blog/2026-10-dashboard/space-zone-only.png" alt="Karten-Tab eines Space mit einem Hinweis, dass nur der Zonenname geteilt wird, nie die genaue Position, Mitgliederblasen in der Mitte der Zonen Home und School mit einem +2-Chip und darunter die Liste der Zonen und Mitglieder" width="1280" height="720" loading="lazy"></a><figcaption><b>Karte eines Space, nur Zonen</b>Gesichter an der Zone, nie eine Position.</figcaption></figure>
</div>

## Wer wo ist, an der Wand

All das kommt auf der Küchentafel zusammen: ein Tab **Karte** neben
Übersicht, Nachrichten und Notizen. Gesichter sammeln sich in der Blase
ihrer Zone, und eine Liste **Wer ist wo** daneben liest sich auf einen
Blick: „Leo, Zuhause, vor 36 Min.“. Tipp auf eine Person, und die Karte
zoomt hinein und zeigt, wie frisch ihr Standort ist; **Alle zeigen**
oder eine Minute ohne Berührung holt die ganze Familie zurück.

Der Tab erscheint nur, solange jemand im Haushalt am letzten Tag einen
Standort geteilt hat. Ein Standort, der älter als eine Stunde ist,
verblasst und zeigt „zuletzt gesehen“; nach einem Tag fällt die Person
weg. Unter der Privatsphäre-Sperre und nachts ist die Karte verborgen
wie alles andere.

<div class="shots">
<figure class="desk"><a href="/blog/2026-10-dashboard/wall-map.png"><img src="/blog/2026-10-dashboard/wall-map.png" alt="Karten-Tab auf dem Wandtablet um 16:11 über einem Stadtplan von Zürich, mit Fotoblasen für Mia über der Schulzone, Leo und Pascal zusammen über Zuhause und Anna allein zwischen Zuhause und Arbeit, Zonen-Pins für Gran's und Work und einer Liste Wer ist wo rechts" width="1280" height="800" loading="lazy"></a><figcaption><b>Der Karten-Tab</b>Leo und Pascal teilen sich die Zuhause-Blase, Mia ist in der Schule, Anna unterwegs.</figcaption></figure>
<figure class="desk"><a href="/blog/2026-10-dashboard/wall-map-callout.png"><img src="/blog/2026-10-dashboard/wall-map-callout.png" alt="Karten-Tab, hineingezoomt auf die Schulzone, mit Mias Foto über dem Schul-Pin, einer Sprechblase Mia, Schule, vor 27 Min., einem Knopf Alle zeigen und Mias hervorgehobener Zeile in der Liste Wer ist wo" width="1280" height="800" loading="lazy"></a><figcaption><b>Ein Tipp auf Mia</b>Die Karte zoomt zur Schule und zeigt, wie frisch ihr Standort ist.</figcaption></figure>
<figure class="phone"><a href="/blog/2026-10-dashboard/wall-map-phone.png"><img src="/blog/2026-10-dashboard/wall-map-phone.png" alt="Karten-Tab auf dem Handy mit einer gemeinsamen Blase für Leo, Pascal und Mia plus +1, beschriftet Zuhause, Schule, Unterwegs, über der Karte mit Zonen-Pins, darunter eine zweispaltige Liste Wer ist wo" width="390" height="844" loading="lazy"></a><figcaption><b>Auf dem Handy</b>Die Orte liegen näher beieinander, also verschmelzen ihre Blasen.</figcaption></figure>
</div>

<details class="tech">
<summary>Unter der Haube</summary>

Die Wandkarte zeigt Positionen auf etwa 11 m gerundet (4
Nachkommastellen), wie in der App, und nur auf dem eigenen Dashboard
des Haushalts. Kartenkacheln kommen über deinen eigenen Server unter
`/tiles/{z}/{x}/{y}`, das Tablet macht also keine Anfragen nach außen.
Kacheln brauchen eine Dashboard-Sitzung (401 ohne, 423 im gesperrten
Zustand) und werden `private, no-cache` ausgeliefert, damit ein
gesperrtes Tablet keine zwischengespeicherten Kacheln zeigen kann. Auf
dem Tablet läuft keine Kartenbibliothek: Ein kleines Skript legt das
Kachelraster aus und lädt fehlgeschlagene Kacheln mit wachsendem
Abstand neu, von 30 s bis 10 Minuten.

</details>

## Als Nächstes: das Dashboard auf ESPHome

Ein Tablet ist nicht der einzige Bildschirm, der an eine Wand passt.
Als Nächstes arbeiten wir an einer **ESPHome**-Version des Dashboards,
damit die Haushaltstafel auch auf einem ESPHome-Gerät laufen kann.

## Ausprobieren

Das Haushalts-Dashboard und die Zonen sind in **Social Home 2026.10.13**.
Schalte das Dashboard unter **Admin › Dashboard** ein, leg deine Orte
unter **Admin › Zonen** an und häng das alte Tablet wieder an die Wand.
