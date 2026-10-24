---
title: Sicherheitsmodell
description: Was versiegelt wird, was signiert wird, was das Relay trotzdem noch sieht — und was wir noch nicht gelöst haben.
order: 55
---

Diese Seite ist der Zwilling der
[Prinzipien](https://github.com/social-home-io/socialhome/blob/main/docs/principles.md)
des Projekts in einfacher Sprache: Jede Garantie unten ist zuerst
für die Person geschrieben, die den Haushalt führt, und dann — in
den „Unter der Haube“-Blöcken — für die Person, die sie gegen den
Code prüfen will. Wenn ein Wort neu ist, steht es in
[Wörter, die wir verwenden](/de/docs/glossary/).

## Eine Regel, ehrlich formuliert

Nichts verlässt deinen Haushalt lesbar. Die Einkaufsliste, der
Buchclub-Chat, das Foto vom Abendessen, der Zahnarzttermin — all
das wird versiegelt, bevor es dein Zuhause verlässt, und erst in
dem Zuhause geöffnet, an das es geschickt wurde.

Die Regel gilt für die Leitung und für jede Maschine dazwischen:
das Relay, das Netzwerk und die Server anderer Mitglieder, die
einen Beitrag weiterreichen.

<details class="tech">
<summary>Unter der Haube</summary>

Die Verschlüsselung läuft von Server zu Server: Der Server deines
Haushalts versiegelt, der Server des empfangenden Haushalts
öffnet. Es gibt keinen Schlüssel pro Gerät und keinen Anspruch
auf Geheimhaltung von Gerät zu Gerät.

</details>

## Vor wem es dich schützt

| Jemand, der…                                    | …bekommt                                                                                                                                           |
| ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| den GFS betreibt, den du nutzt                  | versiegelte Umschläge, Routing-Daten und Zeitpunkte — nie ein Wort Inhalt                                                                          |
| das Netzwerk beobachtet                         | versiegelten, gepolsterten Verkehr zwischen bekannten Adressen                                                                                     |
| aus einem Space entfernt wurde                  | nichts, was nach dem Weggang gepostet wurde — der Space hat einen neuen Schlüssel bekommen                                                         |
| deinen öffentlichen Link bekommt                | genau dieses eine Highlight oder diesen Moment, geöffnet in einem Viewer, den der GFS nicht betreibt — der GFS kann ihn also weiterhin nicht lesen |
| einen verirrten Einladungslink findet           | Zutritt zum Space, wenn es ein GFS-Link war — behandle sie wie Schlüssel; ein Lokaler Link nützt einem Fremden nichts                              |
| Root-Zugriff auf den Server deines Zuhauses hat | alles — es ist dein Server; schütze ihn wie den Rest deines Heimnetzwerks                                                                          |
| Admin eines Space ist, in dem du bist           | alles in diesem Space, wie jedes Mitglied — Admins sind keine Hintertür                                                                            |

Die letzten beiden Zeilen sind die ehrlichen: Social Home schützt
deinen Haushalt von außen, nicht vor sich selbst.

## Verschlüsselt von Zuhause zu Zuhause

Jede Nachricht, jeder Beitrag und jeder Kalendereintrag wird in
deinem Zuhause in einem Umschlag versiegelt und signiert, sodass
der empfangende Haushalt prüfen kann, dass er wirklich von dir
kommt und niemand ihn unterwegs verändert hat. Direktnachrichten
funktionieren genauso: versiegelt von deinem Zuhause zu ihrem.

<details class="tech">
<summary>Unter der Haube</summary>

- Umschläge: AES-256-GCM. Signaturen: Ed25519 über den Umschlag.
- Der einzige Klartext auf der Leitung: `event_type`,
  `from_instance`, `to_instance`, `space_id`, `epoch`.

</details>

## Es ist fail-closed

Es gibt keinen Schalter „verschlüsselt / nicht verschlüsselt“
und keinen Rückfall auf unverschlüsseltes Senden. Wenn ein Space
nicht versiegelt werden kann, bleibt die Nachricht zu Hause. Ein
Umschlag mit ungültiger Signatur oder einer, der viel zu spät
ankommt, wird verworfen — keine Ausnahmen, kein „diesem trotzdem
vertrauen“-Modus.

<details class="tech">
<summary>Unter der Haube</summary>

- Kein Klartext-Fallback; kein Modus für vertraute Instanzen.
- Zeitstempelfenster ±300 s; Replay-Cache 24 h.
- Jeder Signaturfehler verwirft den Umschlag, bevor er weiter
  geparst wird.

</details>

## Schlüssel und Rotation

Dein Haushalt bekommt beim ersten Start seinen eigenen
Identitätsschlüssel. Wenn du dich mit einem anderen Haushalt
koppelst, vereinbart ihr beide ein gemeinsames Geheimnis über
einen QR-Code oder einen kurzen gesprochenen Code, damit sich
niemand dazwischenschieben kann.

Jeder Space hat seinen eigenen Schlüssel, und dieser Schlüssel
ändert sich jedes Mal, wenn sich die Mitgliedschaft ändert. Wenn
jemand den Buchclub verlässt, bekommt der Club einen neuen
Schlüssel; die Person kann nichts lesen, was danach gepostet
wird. Wenn ein Admin entfernt wird, ändert sich auch der
Schlüssel, der Admin-Entscheidungen signiert.

Die Schlüssel auf deiner Festplatte sind unter einem
Hauptschlüssel verpackt. Wenn du das Add-on installiert hast,
reisen sie mit deinem normalen Home Assistant Backup mit; bei
einer eigenständigen Installation lädst du ein Recovery Kit
herunter und bewahrst es an einem sicheren Ort auf.

<details class="tech">
<summary>Unter der Haube</summary>

- Identität: Ed25519. Optionale hybride Ed25519 + ML-DSA-65
  Signaturen (benötigt liboqs).
- Kopplung: X25519 + HKDF-SHA256, authentifiziert durch den
  gesprochenen Code.
- Space-Inhalte: AES-256-GCM-Schlüssel pro Epoche, bei jeder
  Änderung der Mitgliedschaft rotiert. Autoritätsschlüssel wird
  beim Entfernen eines Admins rotiert.
- Im Ruhezustand: Schlüssel verpackt unter einem KEK
  (Key-Encryption Key). Recovery Kit `.shrk` = scrypt +
  AES-256-GCM, für eigenständige Installationen; das Home
  Assistant Backup deckt Add-on-Installationen ab.
- Restrisiko: Der Schlüsselaustausch ist nur X25519 — noch nicht
  post-quantum. Hybride Signaturen machen den Schlüsselaustausch
  nicht post-quantum.

</details>

## Was ein Relay sieht

Der GFS (Global Federation Server) — der globale
Föderationsserver, das Relay, das Haushalten hilft, einander zu
finden — trägt die Beiträge eines globalen Space zu Haushalten,
mit denen du nicht gekoppelt bist: Followern und Mitgliedern, die
über einen GFS-Link beigetreten sind. Gekoppelte Haushalte
bekommen sie direkt oder über das Mesh. Er trägt versiegelte
Umschläge, auf wenige feste Größen gepolstert, und verteilt sie. Er speichert keine Inhalte: Ist ein Haushalt
offline, behält er die versiegelten Umschläge einen Tag lang und
lässt sie dann los. Siehe [GFS](/de/docs/glossary/#gfs) im
Glossar.

| Modus                      | Was das Relay erfährt                                                                               |
| -------------------------- | --------------------------------------------------------------------------------------------------- |
| **Vertraut** (Standard)    | dass _jemand_ im Space gepostet hat, und wann — nie, welcher Haushalt                               |
| **Streng** (Opt-in)        | dasselbe, und er kann nicht erkennen, welche Haushalte schreiben dürfen                             |
| **Privater Space, GFS an** | welche Haushalte zum Kanal gehören — nie den Namen, die ID, den Schlüssel oder den Inhalt des Space |

Beteiligt sind nur die GFS, die der Besitzer für einen Space
gewählt hat. In jedem Modus sieht das Relay weiterhin die
IP-Adresse des Absenders, die Zeitpunkte, die Größenklasse und welche Haushalte
die Beiträge eines Space empfangen. Eine reine
Mitgliedschafts-Synchronisation verrät dem GFS nichts.

<details class="tech">
<summary>Unter der Haube</summary>

- Nur Routing-Metadaten: `space_id`, `event_type`, Größenklasse,
  Zeitpunkte, Abonnentenmenge, Quell-IP.
- Wenn der Host-Haushalt einen Beitrag weiterleitet, nennt die
  Anfrage überhaupt keinen Haushalt: `{space_id, event_type,
payload}` auf einer Sitzung ohne Cookies, und nur an einen GFS,
  der `anonymous_publish` nachgewiesen hat — sonst wird nichts
  gesendet.
- Wenn ein Mitglied für sich selbst veröffentlicht (damit der
  Host nicht online sein muss), signiert es in beiden Modi mit
  einem gemeinsamen Writer-Key pro Epoche, sodass der GFS nicht
  erkennen kann, welches Mitglied gepostet hat. Es sendet an jeden
  GFS auf der vom Besitzer signierten Liste (höchstens 8), über
  eine Sitzung ohne Cookies, die an die gelistete Adresse gepinnt
  ist, nachdem dieser GFS bewiesen hat, dass er den gelisteten
  Schlüssel besitzt. Im strengen Modus abonnieren Schreiber
  außerdem im selben gemischten Stapel wie Follower.
- Private Spaces: `private_gfs` standardmäßig aus; wenn an, eine
  opake 128-Bit-Kanal-ID auf den GFS, die der Besitzer wählt.
- Polsterungsklassen: 1 / 4 / 16 / 64 / 128 KiB für
  Mitglieder-Veröffentlichungen, plus eine 191-KiB-Klasse für das
  Weiterleiten von Umschlägen.
- Offline-Empfänger: 24 h in der Warteschlange, höchstens 2000
  Umschläge oder 64 MiB pro Empfänger. Dein Haushalt versucht es
  mit Backoff erneut: 5 s, 30 s, 2 min, 10 min.

</details>

## Mesh und Anrufe

Wenn zwei Mitgliedshaushalte einander nicht direkt erreichen
können, kann ein Beitrag über die Server anderer Mitglieder
hüpfen. Jeder Hop ist für den endgültigen Empfänger versiegelt,
sodass die Server dazwischen ihn tragen, aber nicht öffnen
können.

Sprach- und Videoanrufe laufen direkt zwischen den
Teilnehmenden. Wenn keine direkte Verbindung möglich ist, reicht
ein TURN-Server — ein Relay nur für Anrufe — den Datenstrom
durch, und er sieht dabei immer nur verschlüsselte Medien.

<details class="tech">
<summary>Unter der Haube</summary>

- `SPACE_ROUTED`-Weiterleitung: höchstens drei Hops, versiegelt
  für einen kurzlebigen X25519-Schlüssel des Empfängers.
- Anrufe: WebRTC mit DTLS-SRTP zwischen den Teilnehmenden; ein
  TURN-Fallback leitet ausschließlich Chiffretext weiter.

</details>

## Apps

Apps aus dem Katalog laufen in einer abgeschotteten Box innerhalb
von Social Home. Eine App kann nicht nach Hause telefonieren,
nichts aus dem Internet laden und nicht hinter deinem Rücken
gegen eine andere Version ausgetauscht werden. Apps reisen direkt
zwischen Haushalten; der GFS ist nicht beteiligt.

<details class="tech">
<summary>Unter der Haube</summary>

- Bundles sha256-pinned; 1 MiB Limit.
- Sandbox-iframe (nur `allow-scripts`) mit
  `connect-src 'none'`.
- Peer-to-Peer zwischen gekoppelten Haushalten verteilt.

</details>

## Öffentliche Links

Ein öffentlicher Highlight-Link, der Link zum Teilen eines Moments,
die Seite eines globalen Space, ein GFS-Einladungslink und ein
Momentum-Profil werden von Menschen geöffnet, die nicht auf Social
Home sind, in einem ganz normalen Browser. Sie alle öffnen sich im
[Social Home Viewer](/de/docs/glossary/#viewer) unter
`viewer.social-home.io` — einer Seite, die der GFS nicht ausliefert.

Das zählt, weil es darauf ankommt, wo der Schlüssel liegt. Ein
Highlight- oder Moment-Link trägt seinen Schlüssel nach dem `#`, und
diesen Teil schicken Browser nie an einen Server — der GFS bekommt
ihn also nie. Aber die Seite, die den Link öffnet, ist der Code, der
den Schlüssel liest. Würde der GFS diese Seite ausliefern, könnte er
eine ausliefern, die den Schlüssel kopiert. Mit dem Viewer können die
Betreiber eines GFS weder lesen, was du teilst, noch die Seite
verändern, die dein Besucher sieht. Der GFS hilft weiterhin, einen
Link zuzustellen — versiegelte Bytes, nie den Schlüssel.

Der Viewer ist dafür gebaut, überprüft zu werden, nicht blind
vertraut:

- Jede Version hat ihre eigene Adresse, und die Dateien dahinter
  ändern sich nie. Ein Link nennt genau die Version, für die er
  erstellt wurde.
- Die Seite sagt dem Browser genau, welches Skript er ausführen
  soll; ein einziges geändertes Byte, und der Browser verweigert es.
- Der Viewer wird zweimal gebaut — vom Social Home Release und noch
  einmal vom separaten Repository
  [`social-home-io/viewer`](https://github.com/social-home-io/viewer)
  — und nur veröffentlicht, wenn beide Builds übereinstimmen.
  Versionen kommen nur hinzu, alte Links öffnen sich also weiterhin.

Stattdessen vertraust du dem Host des Viewers: GitHub Pages und der
Organisation `social-home-io`. Ein selbst betriebener GFS oder
Haushalt kann auf eine eigene Kopie der Dateien zeigen.

<details class="tech">
<summary>Unter der Haube</summary>

- Pfad `v/<hash>/`: die ersten 16 Hex-Zeichen des sha384 der Seite,
  die den SRI-Hash des Skripts und die Hashes der Styles trägt. Das
  Manifest `socialhome/pinned_viewer.json` ist eingecheckt; CI baut
  den Viewer zweimal und schlägt bei jedem abweichenden Byte fehl.
- CSP der Seite: `default-src 'none'`, Skript per Hash,
  `img-src blob: data:`, `base-uri 'none'`, `form-action 'none'`;
  `no-referrer`. Jede Anfrage geht an den GFS aus dem Fragment, mit
  `credentials: 'omit'` und `redirect: 'error'`; einen GFS ohne
  `https` lehnt der Viewer ab.
- Highlight-Streams: AES-256-GCM pro Frame unter
  `HKDF-SHA256(ECDH(P-256), salt = Link-Geheimnis)`, auf dem direkten
  DataChannel wie auf dem Relay-Fallback.
- `/spaces/{id}`, `/join/{token}` und `/moments/{user}` des GFS
  antworten mit einer inerten Übergabeseite (nur Vorschau-Tags,
  `default-src 'none'`); der Viewer liest `/gfs/pages/*` cross-origin
  ohne Zugangsdaten und rendert Info-Texte als Knoten, nie als HTML.
- Eigener Origin `viewer.social-home.io`, kein geteilter
  `github.io`-Origin, den eine andere Seite der Organisation mit einem
  Service Worker belegen könnte.
- Der `gh-pages`-Branch des Viewer-Repos ist per Ruleset
  append-only.

</details>

## Die kleinen Dinge

- Ein Space, der auf der GFS-Karte angeheftet ist, bekommt seinen
  Standort auf etwa 11 m gerundet — die Straße, nicht die
  Haustür.
- Beiträge können keine Bilder von anderen Websites laden, also
  kann niemand ein Tracking-Pixel in deinen Feed pflanzen.
- Link-Vorschauen werden nur vom Haushalt des Autors abgerufen,
  nie von jedem Leser. Ein Haushalts-Admin kann sie abschalten.
- Push-Benachrichtigungen tragen nur den Titel; der Inhalt
  wartet, bis du die App öffnest.
- Geschützte Konten für Minderjährige werden vom Basar,
  öffentlichen Spaces, öffentlichen Momenten, öffentlichen
  Highlight-Links und API-Tokens rundweg abgewiesen — siehe
  [Familienschutz](/de/docs/family-safety/).

<details class="tech">
<summary>Unter der Haube</summary>

- GPS auf 4 Dezimalstellen gekürzt (~11 m).
- CSP `img-src 'self' data: blob:` blockiert externe Bilder in
  Nutzerinhalten.
- Link-Vorschauen: vom Haushalt des Autors abgerufen,
  SSRF-geschützt, vom Admin abschaltbar.
- API- und WebSocket-Antworten sind auf das reduziert, was die
  Ansicht braucht.
- `min_age` wird auf jedem Pfad geprüft, der ein Mitglied
  aufnimmt.

</details>

## Wie wir es wahr halten

Hinter jeder Regel auf dieser Seite stehen Tests, und diese Tests
laufen vor jedem Release. Schlägt einer fehl, wird das Release
nicht ausgeliefert — es gibt kein „beim nächsten Mal beheben wir
das“. Änderungen an sicherheitsrelevantem Code bekommen eine
zweite, bewusst gegnerische Prüfung, und jede Änderung an einem
Prinzip bekommt eine datierte Abnahme in der Prinzipien-Datei,
mit allem, was sie ungelöst lässt, direkt daneben
aufgeschrieben.

Was wir noch nicht haben: automatisches Scannen von
Drittanbieter-Abhängigkeiten. Das steht auf der Liste, nicht in
der Pipeline.

<details class="tech">
<summary>Unter der Haube</summary>

- 68 Protokoll-Testdateien mit dem Tag `security`; sie blockieren
  ein Release unabhängig von Coverage-Zahlen.
- CI: pytest mit 90 % Branch-Coverage, die Sicherheitstests als
  eigener Schritt, ruff, mypy, eslint, tsc, vitest.
- Abnahmen stehen in
  [`docs/principles.md`](https://github.com/social-home-io/socialhome/blob/main/docs/principles.md).
- Noch kein CodeQL, bandit oder Dependency-Scanning.

</details>

## Bekannte Restrisiken

Die Dinge, die heute wahr sind und die du wissen solltest, bevor
du uns den Gruppenchat anvertraust:

- Ein GFS, den der Besitzer des Space gewählt hat, mit dem dein
  Haushalt aber nie verbunden war, sieht deine IP-Adresse, wenn du
  dort postest. Weil anonyme Schreiber nicht auseinanderzuhalten
  sind, kann ein GFS keinen einzelnen Haushalt sperren; der
  Besitzer entfernt einen Schreiber, indem er den Schlüssel des
  Space rotiert.
- In jedem Modus sieht das Relay deine IP-Adresse, die Zeitpunkte
  und die Größenklasse jedes Umschlags sowie welche Haushalte die
  Beiträge eines Space empfangen.
- Der Schlüsselaustausch ist noch nicht post-quantum; nur
  Signaturen haben eine optionale Post-Quantum-Variante.
- Es gibt noch kein automatisches Dependency-Scanning.
- Öffentliche Links öffnen sich im [Viewer](#öffentliche-links), also
  vertraust du seinem Host — GitHub Pages und der Organisation
  `social-home-io` —, die veröffentlichten Dateien auszuliefern. Die
  Fingerabdrücke machen eine ausgetauschte Seite erkennbar, aber nur,
  wenn jemand nachsieht.
- Ein öffentlicher Highlight- oder Moment-Link ist ein Schlüssel. Wer
  ihn hat, kann ihn öffnen, und er steht im Browserverlauf von allen,
  die ihn geöffnet haben. Den Link zum Teilen eines Moments kannst du
  nur zurückholen, indem du den Moment löschst.
- Der GFS sieht, wann ein öffentlicher Link geöffnet wird und von
  welcher Adresse. Ein Highlight, das sich öffnet, zeigt, dass dein
  Zuhause in diesem Moment online war.

## Ein Problem melden

Wenn du eine Lücke findest, sag es uns bitte vertraulich statt
in einem öffentlichen Issue: Öffne eine Meldung unter
[GitHub Security Advisories](https://github.com/social-home-io/socialhome/security)
im Repository `social-home-io/socialhome`.
