---
title: So funktioniert's
description: Ein Rundgang in einfacher Sprache — was Social Home tut, was auf deinem Server bleibt und wie Haushalte sich verbinden, ganz ohne Protokoll-Jargon.
order: 20
---

Social Home gibt deinem Zuhause das Haushalts-Betriebssystem, das
dein Handy nie geworden ist: gemeinsame Kalender, eine Einkaufsliste
in Echtzeit, Fotos, Sprachnotizen, Anwesenheit und Chat — alles auf
Hardware, die du schon besitzt. Und es lässt deinen Haushalt sich
mit anderen Haushalten verbinden, so wie du in jedem anderen
Netzwerk jemanden als Freund hinzufügst — nur ohne dass irgendwessen
Daten an eine Firma in der Mitte gehen.

Diese Seite zeigt, was du damit tatsächlich machen kannst. Keine
Abkürzungen im Haupttext; die technischen Details stecken in den
Blöcken „Unter der Haube“, und die Begriffe stehen in
[Wörter, die wir verwenden](/de/docs/glossary/).

## Was kann ich damit machen?

Bleib mit den Menschen verbunden, die dir wichtig sind — ohne deine
Daten an irgendwen sonst zu geben. Das kannst du mit Social Home in
deinem Haushalt tun:

- **📸 Teile ein Foto vom Abendessen** in deinem Haushalts-Feed. Dein
  Partner sieht es sofort auf dem Handy, deine Mitbewohner können
  reagieren und kommentieren — ganz ohne Umweg über einen
  Cloud-Dienst.
- **🗓 Sieh alle Kalender an einem Ort.** Dein persönlicher Kalender,
  der Plan deiner Mitbewohnerin und der gemeinsame „Haus“-Kalender
  liegen farbcodiert übereinander in einer Ansicht. Termine bleiben
  auf deinem Server.
- **🛒 Ruf „Ich bin im Supermarkt — braucht jemand was?“** Die
  Einkaufsliste deines Haushalts ist live. Jemand fügt Milch hinzu,
  du siehst es, bevor du an der Kasse bist. Sag es deinem
  Sprachassistenten, und er trägt es ein.
- **🔔 Wissen, wer zu Hause ist**, ohne zu fragen. Eine dezente
  Anwesenheitsanzeige zeigt, wer gerade da ist — kein
  Standort-Tracking, kein Verlauf, nur der aktuelle Moment.
- **✅ Aufgaben verteilen statt nörgeln.** Aufgabenlisten mit
  Zuständigen, Fristen und einem Überfällig-Badge. Dieses Wochenende
  das Bücherregal anbohren; heute den alten Kühlschrank entsorgen;
  alle sehen, wer was übernommen hat.
- **📒 Das Haus-Handbuch an einem Ort.** Seiten sind
  Markdown-Wiki-Einträge, die in einem Space leben — wie man die
  Heizkörper entlüftet, wo die Zählerstände hinkommen, die Übergabe
  an den Babysitter. Sie synchronisieren sich auf jedes Gerät im
  Haushalt.
- **📝 Haftnotizen (Stickies) für alles, was keine Seite verdient.**
  Bunte Notizen zum Antippen und Bearbeiten, an eine Space-Pinnwand
  geheftet — der moderne Kühlschrankmagnet. Karotten in der unteren
  Schublade; Geschenkideen zum Geburtstag; die Einkaufsliste für die
  Klingel-Reparatur.
- **💬 Schreib deiner Familie rund um die Welt** — versiegelt von
  deinem Zuhause zu ihrem, ohne Cloud dazwischen. Keine
  Telefonnummern. Kein Konto bei einem Drittanbieter.
- **📞 Telefoniere ohne Fremde in der Leitung** — Sprach- und
  Videoanrufe, zu zweit oder in der Gruppe, direkt aus deinen
  Direktnachrichten und Gruppenchats. Audio und Video fließen direkt
  zwischen den Teilnehmenden; kommt keine direkte Verbindung
  zustande, reicht ein Relay den Stream durch, sieht aber immer nur
  verschlüsselte Medien.
- **🏘 Bau deine eigene Community, auf deine Art** — leg einen Space
  für jede Gruppe an: deine Straße, dein Mehrfamilienhaus, dein
  Sportteam oder deinen Maker-Club. Organisiere ein
  Nachbarschaftsgrillen, betreib einen Buchclub — an einem privaten
  Ort, den kein Tech-Konzern lesen, zu Geld machen oder abschalten
  kann. Jeder behält seinen eigenen Server.
- **🔨 Betreib einen Marktplatz** — biete Dinge an, die du
  verschenken oder an Leute verkaufen willst, die du schon kennst.
  Keine Fremden, keine Plattformgebühren.
- **🎙 Transkribiere eine Sprachnotiz** von einem Mikrofon im Haus
  und poste sie in den Feed — praktisch, wenn du gerade keine Hand
  frei hast.

<details class="tech">
<summary>Unter der Haube</summary>

Anrufe laufen über WebRTC mit DTLS-SRTP zwischen den Teilnehmenden;
ein TURN-Fallback leitet ausschließlich Chiffretext weiter.
Direktnachrichten werden von Server zu Server verschlüsselt
(AES-256-GCM-Umschläge, Ed25519-Signaturen).

</details>

## Deine Daten bleiben deine

Alles, was Social Home weiß, liegt in deinem Zuhause, auf deinem
eigenen Server. Die
Fotos, die Nachrichten, die Einkaufsliste, die Kalendereinträge —
alles in einer kleinen Datenbank auf deinem Rechner. Es gibt kein
Cloud-Konto, keine Analytics, kein Werbenetzwerk, keinen Logger aus
der Ferne, der mithört, was dein Haushalt sagt. Fällt dein Internet
aus, laufen die Haushaltsfunktionen in deinem LAN weiter; nur das
Schreiben mit Leuten _außerhalb_ des Hauses pausiert.

<details class="tech">
<summary>Unter der Haube</summary>

Wenn du das Add-on installiert hast, ist es Teil deines normalen
Home-Assistant-Backups; eigenständige Installationen bekommen für
die Schlüssel ein Recovery Kit (`.shrk`, scrypt + AES-256-GCM).

</details>

## Mit anderen Haushalten verbinden

Zwei Zuhause verbindest du, indem du einen QR-Code scannst — in der
App heißt das **Koppeln**. Danach kennen sich die beiden Server und
können Direktnachrichten und gemeinsame Spaces zwischen sich
transportieren. Der QR-Code enthält einen öffentlichen Schlüssel —
so etwas wie ein digitaler Ausweis —, mit dem die Gegenseite prüfen
kann, dass du es wirklich noch bist, selbst wenn sich deine Adresse
später ändert.

Was du mit einem gekoppelten Haushalt teilst: deinen Anzeigenamen,
deinen Avatar und die Spaces, in denen ihr gemeinsam seid.

Was du nie teilst: Passwörter, E-Mail-Adressen, deinen
Standortverlauf oder irgendetwas aus einem Space, dem ihr nicht
beide beigetreten seid.

<details class="tech">
<summary>Unter der Haube</summary>

Jeder Haushalt erzeugt beim ersten Start einen
Ed25519-Identitätsschlüssel. Die Kopplung ist X25519 + HKDF-SHA256,
authentifiziert über den QR-Code oder einen kurzen gesprochenen
Code. Die Signatur jedes eingehenden Umschlags wird gegen die
Kopplung geprüft; eine ungültige Signatur wird verworfen, und es
gibt keinen „Trusted-Instance“-Modus, der das umgeht.

</details>

## Spaces — gemeinsame Räume für jede Gruppe

Ein Space ist ein gemeinsamer Feed, Chat und Kalender für eine
beliebige Gruppe von Menschen, über beliebig viele Haushalte hinweg.
Zum Beispiel:

- **Familie** — die Leute in deinem Haus, plus Eltern und
  Geschwister in ihrem eigenen Zuhause.
- **Eichenstrasse 3–17** — dein Wohnblock. Jeder betreibt seinen
  eigenen Server; der Space ist das gemeinsame Schwarze Brett.
- **Buchclub**, **Boulder-Truppe**, **Makerspace** — die
  wiederkehrenden Gruppen, die es in deinem Leben schon gibt, nur
  eben auf keiner Plattform, der man trauen könnte.

Du entscheidest, wer einen Space sieht. Du entscheidest, welche
Haushalte eingeladen werden. Jeder Space hat einen Host-Haushalt —
den, der ihn angelegt hat und die Mitgliederliste führt —, aber die
Mitglieder posten direkt untereinander, und die großen
Entscheidungen (wer ihn sieht, ob es ihn noch gibt) treffen alle
seine Admins gemeinsam.

## Öffentliche und globale Spaces

Manche Spaces sind privat und nur für eingeladene Haushalte. Ein
_öffentlicher_ Space ist einer, den deine gekoppelten Haushalte
finden und um Beitritt bitten können; er bleibt in deinem eigenen
Kreis. Ein _globaler_ Space — ein öffentlicher Marktplatz, eine
Hobby-Community, das Schwarze Brett deiner Nachbarschaft — ist auch
für Fremde: Ein leichtgewichtiges Relay, der GFS (Global Federation
Server – der globale Föderationsserver), listet ihn, damit Haushalte,
die sich nicht kennen, ihn finden können (siehe
[GFS](/de/docs/glossary/#gfs)).

Gekoppelte Haushalte bekommen die Beiträge eines Space immer direkt
oder über das Mesh. Das Relay trägt Beiträge nur zu Haushalten, mit
denen du nicht gekoppelt bist — Followern und Mitgliedern, die über
einen GFS-Link beigetreten sind —, als versiegelte, aufgepolsterte
Umschläge. Lesen kann es kein Wort.
Standardmäßig weiß es, welcher Haushalt wann gepostet hat; ein Space
kann in den strengen Modus wechseln, in dem es nicht einmal das
weiß. Mehr dazu unter [Globale Spaces](/de/docs/global-spaces/).

<details class="tech">
<summary>Unter der Haube</summary>

`PUBLIC_SPACE_TIERS = {public, global}`: Nur diese dürfen an einen
GFS weiterleiten. Ein globaler Space wird automatisch auf jedem
verbundenen GFS veröffentlicht; ein öffentlicher Space nur, wenn ein
Admin ihn von Hand veröffentlicht. Öffentliche Spaces erreichen
gekoppelte Haushalte als `SPACE_DIRECTORY_SYNC`-Snapshot, nie über
einen GFS. Der GFS sieht nur
Routing-Metadaten (`space_id`, `event_type`, Größenklasse, Timing,
Abonnentenmenge, Quell-IP); der strenge Modus macht
Veröffentlichungen identitätsfrei. Für Offline-Mitglieder wird 24 h
lang gepuffert; sonst wird nichts gespeichert.

</details>

## Öffentliche Highlight-Links

Dieselbe Art Relay hat noch eine zweite Aufgabe: ein einzelnes
Highlight an Menschen außerhalb von Social Home weiterzureichen.
Wenn du einen Highlight-Link veröffentlichst, erzeugt das Relay eine
URL, die jeder im Browser öffnen kann — aber die Bytes des
Highlights fließen direkt von deinem Heimserver in den Browser des
Besuchers. Kommt dieser direkte Weg nicht zustande, reicht das Relay
die Frames nur durch, solange du online bist, und speichert keinen
davon. Siehe
[Highlights](/de/docs/highlights/#öffentlich-teilen-über-einen-global-server)
für den Ablauf aus Sicht des Autors.

<details class="tech">
<summary>Unter der Haube</summary>

WebRTC-direkt vom Server des Autors in den Browser; HTTP-Durchleitung
als Fallback nur, solange der Autor online ist. Null Highlight- oder
Moment-Bytes werden auf dem GFS gespeichert.

</details>

## Verschlüsselung, immer an

Jede Nachricht, die deinen Server verlässt, ist in einem Umschlag
versiegelt, den nur die empfangenden Haushalte öffnen können —
immer, ohne Schalter zum Abstellen und ohne Klartext-Fallback.
Selbst das Relay kann nicht hineinsehen. Stell dir einen Umschlag
vor, für den nur die Leute auf der Gästeliste einen Schlüssel haben
— die Post befördert ihn, öffnet ihn aber nie. Die Seite zum
[Sicherheitsmodell](/de/docs/security/) sagt genau, was das abdeckt
und was nicht.

## Privatsphäre auf einen Blick

- ✅ Jede Nachricht auf dem Weg verschlüsselt — immer an, kein Opt-out
- ✅ Keine Werbung, kein Tracking, keine Analytics
- ✅ GPS ist Opt-in pro Gerät
- ✅ Dein Server, deine Regeln
- ✅ Open Source unter MPL 2.0

## Wie Verbindungen funktionieren (für Neugierige)

Jedes Zuhause, auf dem Social Home läuft, erzeugt beim ersten Start
eine eindeutige kryptografische Identität — das Gegenstück zu einem
digitalen Ausweis. Wenn zwei Haushalte sich koppeln, tauschen sie
diese Ausweise aus und prüfen bei jeder ankommenden Nachricht die
Signatur des anderen. Nach diesem einmaligen Handshake können die
beiden Server direkt miteinander reden: Eine Nachricht an deine
Schwester erscheint in derselben Sekunde in ihrem Zuhause, ohne
Relay dazwischen.

Ändert sich die Adresse eines Haushalts (du ziehst um, deine IP
wechselt oder du steigst auf eine Domain um), wird die neue Adresse
automatisch allen gekoppelten Haushalten mitgeteilt — das Zuhause
deiner Schwester merkt sich den Umzug und hält die Verbindung am
Leben.

## Ein Relay für globale Spaces betreiben

Wenn du ein Discovery-Relay für eine Community hosten willst: Es ist
ein kleiner Python-Server, der auf einem VPS läuft — siehe
[Ein Relay selbst betreiben](/de/docs/running-a-gfs/). Open Source,
lizenziert unter MPL 2.0, keine Gebühren.
