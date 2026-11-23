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
- **📝 Stickies für alles, was keine Seite verdient.**
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

Wenn du die Home Assistant App nutzt, ist es Teil deines normalen
Home-Assistant-Backups; Installationen mit Docker und Python bekommen für
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
Haushalte eingeladen werden. Jeder Space hat einen Gastgeber-Haushalt —
den, der ihn angelegt hat und die Mitgliederliste führt —, aber die
Mitglieder posten direkt untereinander, und die großen
Entscheidungen (wer ihn sieht, ob es ihn noch gibt) treffen alle
seine Admins gemeinsam. Wenn der Eigentümer es erlaubt, können Admins
aus anderen Haushalten auch handeln, während der Gastgeber offline ist.

## Öffentliche und globale Spaces

Manche Spaces sind privat und nur für eingeladene Haushalte. Ein
_öffentlicher_ Space ist einer, den deine gekoppelten Haushalte
finden und um Beitritt bitten können; er bleibt in deinem eigenen
Kreis. Ein _globaler_ Space — ein öffentlicher Marktplatz, eine
Hobby-Community, das Schwarze Brett deiner Nachbarschaft — ist auch
für Fremde: Der Eigentümer wählt ein oder mehrere leichtgewichtige
Relays, GFS (Global Federation Server – der globale
Föderationsserver), die ihn listen, damit Haushalte, die sich nicht
kennen, ihn finden können (siehe [GFS](/de/docs/glossary/#gfs)).

Gekoppelte Haushalte bekommen die Beiträge eines Space immer direkt
oder über das Mesh. Das Relay trägt Beiträge nur zu Haushalten, mit
denen du nicht gekoppelt bist — Followern, Mitgliedern, die über
einen GFS-Link beigetreten sind, und Haushalten, die über ihn um
Beitritt gebeten haben —, als versiegelte, aufgepolsterte Umschläge,
jeweils in das anonyme Postfach dieses Haushalts. Jeder gelistete
GFS bekommt jeden Beitrag. Lesen kann
es kein Wort, und Mitglieder posten anonym. Mehr dazu unter [Globale Spaces](/de/docs/global-spaces/).

<details class="tech">
<summary>Unter der Haube</summary>

Nur ein globaler Space wird überhaupt auf einem GFS gelistet, und nur
auf den GFS in seiner vom Eigentümer signierten `gfs_servers`-Liste
(höchstens 8). Öffentliche Spaces erreichen gekoppelte Haushalte als
`SPACE_DIRECTORY_SYNC`-Snapshot und berühren nie einen GFS.
Mitglieder veröffentlichen anonym auf jedem gelisteten GFS. Der GFS sieht nur
Routing-Metadaten (`space_id`, `event_type`, Größenklasse, Timing,
Abonnentenmenge, Quell-IP); Veröffentlichungen sind immer
identitätsfrei, signiert mit einem gemeinsamen Writer-Key pro
Epoche. Haushalte, die über einen GFS erreicht werden, bekommen ein
anonymes Postfach pro GFS. Versiegelte Umschläge warten bis zu 24 h;
verschlüsselte Bilder werden bis zu 3 Tage zwischengespeichert
(Einstellung des Betreibers, höchstens 7). Sonst wird nichts
gespeichert.

</details>

## Gebaut, um weiterzulaufen

Social Home hat keine Mitte. Jeder Haushalt ist sein eigener Server,
bei dir zu Hause, und hält eine vollständige Kopie der Spaces, in denen
er ist. Gekoppelte Haushalte sprechen direkt miteinander. GFS tragen
versiegelte Beiträge zu Haushalten, mit denen du nicht gekoppelt bist,
und ein Space kann bis zu acht davon nutzen. Es gibt also keine
einzelne Maschine, deren Ausfall das Netzwerk lahmlegt, und keine
einzelne Stelle, an der alles mitgelesen werden könnte.

<figure class="map">
  <img src="/docs/how-it-works/network-map-de.webp" alt="Eine Weltkarte mit Haushalten in Europa, Nord- und Südamerika, Afrika, Asien und Australien. Durchgezogene grüne Linien verbinden gekoppelte Haushalte direkt. Gepunktete Linien führen von anderen Haushalten zu drei GFS, einem in Nordeuropa, einem in Nordamerika und einem in Südostasien. Der asiatische GFS ist ausgegraut und durchgekreuzt, und rote gestrichelte Pfeile zeigen, wie seine Haushalte zum europäischen GFS umziehen. Ein Haushalt in Griechenland ist verblasst, mit einem Mond daneben: Der Gastgeber ist offline, und die anderen Haushalte machen weiter." width="1600" height="890" loading="lazy">
  <figcaption>Gekoppelte Haushalte sprechen direkt miteinander. GFS tragen versiegelte Beiträge zu allen anderen. Ist ein GFS oder ein Gastgeber weg, machen die anderen weiter.</figcaption>
</figure>

Was passiert, wenn etwas ausfällt:

- **Dein Internet ist weg.** Dein Haushalt läuft in deinem Heimnetz
  weiter: Kalender, Listen, Chat im Haus. Was du an andere Haushalte
  postest, wartet bei dir zu Hause und geht raus, sobald du wieder
  online bist.
- **Ein anderer Haushalt ist offline.** Sonst merkt das niemand. Ist
  er zurück, holt er bei jedem Mitglied eines Space nach, nicht nur
  beim Gastgeber.
- **Der Gastgeber eines Space ist offline.** Die Mitglieder posten
  weiter untereinander. Jedes Mitglied kann nachliefern, was jemand
  verpasst hat, und wenn der Eigentümer es erlaubt, können Admins aus
  anderen Haushalten den Space weiterführen.
- **Ein GFS fällt aus.** Gekoppelte Haushalte merken nichts. Spaces,
  die auf mehreren GFS gelistet sind, laufen über die anderen weiter,
  und nach etwa zehn Minuten ziehen Haushalte auf einen anderen GFS
  um, mit dem sie verbunden sind. Versiegelte Beiträge warten bis zu
  einen Tag auf Haushalte, die weg waren.
- **Einem GFS-Betreiber ist nicht zu trauen.** Er kann keinen Beitrag
  lesen, nicht erkennen, wer ihn geschrieben hat, und keinen fälschen
  oder verändern: Jeder Beitrag ist vom Haushalt signiert, der ihn
  geschrieben hat, und wird am anderen Ende geprüft. Deine Identität
  und deine Beiträge liegen bei dir zu Hause, also verbindest du dich
  mit einem anderen GFS und machst weiter.
- **Das Social-Home-Projekt verschwindet.** Dein Zuhause läuft weiter.
  Der GFS ist Open Source, jeder kann einen betreiben, und Haushalte
  können sich mit jedem GFS verbinden, der sie hereinlässt.

<details class="tech">
<summary>Unter der Haube</summary>

Jeder Haushalt speichert seine Spaces in seiner eigenen Datenbank und
signiert, was er sendet, mit seinem Ed25519-Identitätsschlüssel;
Admin-Aktionen in einem Space werden mit dem Autoritätsschlüssel des
Space signiert. Beiträge werden mit AES-256-GCM unter einem Schlüssel
pro Space versiegelt, der rotiert, sobald jemand geht. Die Zustellung
versucht es mit Backoff erneut (5 s, 30 s, 2 min, 10 min), und der GFS
hält versiegelte Umschläge 24 h in der Warteschlange. Mitglieder holen
anhand einer signierten **Sync-Seite** nach (256 Bucket-Hashes über die
Zeilen des Space) und übernehmen Zeilen von jedem Mitglied nur, wenn
die Seite für sie bürgt. Das Postfach eines Haushalts zieht auf einen
anderen gelisteten GFS um, wenn sein eigener 10 Minuten lang ausfällt.
Was bleibt: Ein GFS sieht Internetadressen, Timing und Größen; ein
Mitglied, das kein GFS des Space erreicht, wird über den Gastgeber
erreicht; öffentliche Highlight-Links öffnen sich in einem Viewer, der
auf GitHub Pages liegt. Die vollständige Liste steht im
[Sicherheitsmodell](/de/docs/security/).

</details>

## Was anders ist als bei anderen dezentralen Netzwerken

In vielen dezentralen Netzwerken hört die Dezentralisierung beim
Server auf. Jemand betreibt einen Server, Leute legen dort Konten an,
und die Server sprechen miteinander. Das verteilt das Netzwerk auf
viele Server, aber jede Person hängt trotzdem an einem davon: Fällt er
aus, sind seine Leute offline; schließt sein Betreiber ihn, sind ihre
Konten und ihr Verlauf mit ihm weg; und der Betreiber kann lesen, was
dort gespeichert ist, außer die App versiegelt es für die Empfänger.

Social Home geht mit der Dezentralisierung einen Schritt weiter, bis
zu jedem einzelnen Haushalt. Der Server ist dein Zuhause. Dein Konto,
deine Schlüssel und deine Kopie jedes Space liegen dort und nirgends
sonst. Die Relays dazwischen, die GFS, sind Helfer, kein Zuhause: Sie
halten nichts, was sie lesen könnten, sie können nicht für dich
sprechen, und man kann sie austauschen.

|                                     | Föderation über Server                             | Social Home                                                                |
| ----------------------------------- | -------------------------------------------------- | -------------------------------------------------------------------------- |
| Wo dein Konto liegt                 | auf dem Server von jemand anderem                  | bei dir zu Hause                                                           |
| Wer lesen kann, was gespeichert ist | der Betreiber des Servers, außer es ist versiegelt | dein Haushalt, und für einen Space dessen Mitglieder                       |
| Wenn ein Server ausfällt            | alle darauf sind offline                           | nur dieser eine Haushalt; die anderen machen weiter                        |
| Wenn ein Betreiber aufhört          | Konten und Verlauf sind mit ihm weg                | ein GFS hielt nichts, was er lesen konnte; verbinde dich mit einem anderen |
| Server wechseln                     | dein Konto umziehen, wenn beide Server es zulassen | mit einem anderen GFS verbinden; dein Zuhause bleibt, wo es ist            |

Der Preis, ganz offen: Dein Zuhause muss an sein, damit andere es
direkt erreichen, und ein Haushalt, der eine Weile aus war, holt nach,
wenn er zurück ist. Dafür ist die Home Assistant App da: Sie lässt
Social Home auf einem Gerät laufen, das ohnehin an ist.

## Öffentliche Highlight-Links

Dieselbe Art Relay hat noch eine zweite Aufgabe: ein einzelnes
Highlight an Menschen außerhalb von Social Home weiterzureichen.
Wenn du einen Highlight-Link veröffentlichst, erstellt dein
Haushalt einen Link zum [Social Home Viewer](/de/docs/glossary/#viewer)
— einer Seite, die kein Relay ausliefert —, den jeder im Browser
öffnen kann. Die Bytes des Highlights fließen direkt von deinem
Zuhause in den Browser des Besuchers, so versiegelt, dass nur
dieser Browser sie öffnen kann. Kommt dieser direkte Weg nicht
zustande, reicht das Relay die versiegelten Frames nur durch,
solange du online bist, und speichert keinen davon. Siehe
[Highlights](/de/docs/highlights/#öffentlich-teilen-über-einen-global-server)
für den Ablauf aus Sicht des Autors.

<details class="tech">
<summary>Unter der Haube</summary>

WebRTC-direkt vom Zuhause des Autors in den Browser; HTTP-Durchleitung
als Fallback nur, solange der Autor online ist. Jeder Frame ist an
den flüchtigen Schlüssel des Viewers und das Link-Geheimnis im
URL-Fragment versiegelt. Null Highlight-Bytes werden auf dem GFS
gespeichert, und der GFS liefert keinen Code des Viewers aus.

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
