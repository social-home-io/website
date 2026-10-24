---
title: "Links zum Teilen, die der GFS nicht öffnen kann"
description: Öffentliche Highlight-Links, Links zum Teilen von Momenten, die Seite eines globalen Space, Einladungslinks und Momentum-Profile öffnen sich jetzt im Social Home Viewer, einer Seite, die kein GFS ausliefert. Wer einen GFS betreibt, kann nicht lesen, was du teilst, und die Seite nicht verändern, die deine Freunde sehen. Seit Social Home 2026.10.22.
date: 2026-10-24
author: Das Social Home Team
order: 50
---

Das meiste, was du in Social Home tust, bleibt zwischen Haushalten:
versiegelt bei dir zu Hause, geöffnet bei ihnen. Aber manchmal willst
du jemanden erreichen, der gar nicht auf Social Home ist. Vielleicht
Opa, der nur E-Mails liest, oder die Freundin aus den Ferien, oder die
Eltern aus der Schule, die du in den Space der Klasse einladen willst.
Sie öffnen deinen Link in einem ganz normalen Browser.

Bisher kam diese Browserseite vom
[GFS (Global Federation Server)](/de/docs/glossary/#gfs), dem Relay,
das Haushalten hilft, einander zu finden. Seit **Social Home
2026.10.22** kommt sie vom **Social Home Viewer** unter
`viewer.social-home.io`, einer Seite, die kein GFS ausliefert. Diese
eine Änderung bedeutet: Wer einen GFS betreibt, kann nicht lesen, was
du teilst, und kann die Seite nicht verändern, die deine Freunde
sehen.

## Das Schloss und der Schlüsseldienst

Ein öffentlicher Highlight-Link ist von deinem Zuhause bis zum
Browser deiner Freunde versiegelt. Der Schlüssel, der ihn öffnet,
steht im Teil des Links nach dem `#`. Diesen Teil schicken Browser nie
an einen Server, also sieht ihn der GFS nie, der beim Aufbau hilft.

Aber ein Schlüssel nützt nur, wenn du den Händen traust, die ihn
halten. Die Seite, die das Highlight öffnet, ist der Code, der den
Schlüssel liest. Würde der GFS diese Seite ausliefern, könnte er
auch eine leicht andere ausliefern, die den Schlüssel kopiert, und
niemand würde es merken. Verschlüsselung ist nur so stark wie die
Seite, die das Öffnen übernimmt.

Deshalb kommt die Seite jetzt von woanders. Dein Haushalt erstellt
Links, die auf den Viewer zeigen, und der Viewer spricht mit dem GFS
nur, um die Verbindung aufzubauen. Der GFS stellt dein Zuhause und den
Browser deiner Freunde weiterhin einander vor, und er reicht weiterhin
versiegelte Bytes durch, wenn keine direkte Verbindung zustande kommt.
Den Code, der den Schlüssel hält, führt er nie aus.

| Wer                  | Was er bekommt                                                                                                              |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Wer den GFS betreibt | dass ein Link geöffnet wurde, von welcher Adresse und wann, dazu versiegelte Bytes. Nie den Schlüssel, nie die Seite selbst |
| Der Host des Viewers | dass jemand den Viewer geladen hat. Nicht welchen Link, nicht welchen GFS, nicht was darin war                              |
| Wer den Link hat     | genau dieses eine Highlight oder diesen Moment, bis es endet (ein Highlight-Link endet auch, sobald du ihn entfernst)       |
| Wer ihn nicht hat    | nichts                                                                                                                      |

## Jede Version eingefroren

Der Viewer ist ein kleiner Satz statischer Dateien. Seine Aufgabe ist,
langweilig und leicht überprüfbar zu sein:

- **Jede Version bekommt ihre eigene Adresse.** Ein Link nennt genau
  die Viewer-Version, für die er erstellt wurde. Die Dateien hinter
  dieser Adresse ändern sich nie, also öffnet ein Link von heute auch
  nächstes Jahr dieselbe Seite.
- **Das Skript ist über seinen Fingerabdruck fixiert.** Die Seite sagt
  dem Browser genau, welches Skript er ausführen soll. Ist auch nur ein
  Byte anders, verweigert der Browser es.
- **Zweimal gebaut, von zwei verschiedenen Repositories.** Das Social
  Home Release baut den Viewer und hält seinen Fingerabdruck fest. Das
  separate Repository
  [`social-home-io/viewer`](https://github.com/social-home-io/viewer)
  baut ihn aus demselben Release noch einmal und veröffentlicht ihn nur,
  wenn beide Builds übereinstimmen.
- **Versionen kommen nur hinzu.** Alte Versionen werden nie
  überschrieben oder gelöscht, also öffnet sich jeder Link, den ein
  früheres Release erstellt hat, weiterhin.
- **Jeder kann es prüfen.** Hol die Dateien, vergleiche ihren
  Fingerabdruck mit dem im Release, baue aus dem Tag neu. Du musst uns
  nicht beim Wort nehmen.

## Ein Viewer für alle draußen

Highlights waren der Anfang. Alles, was Fremde von einem GFS öffnen,
öffnet sich jetzt im selben Viewer:

- **Öffentliche Highlight-Links.** Tippe im Highlight-Viewer auf
  **Öffentlichen Link erstellen**, wähle einen GFS und teile den Link.
  Die Seite zeigt, wer es geteilt hat (Name, Bild und Bio, versiegelt
  wie die Frames), und streamt das Highlight direkt von deinem Zuhause.
  Siehe
  [Highlights](/de/docs/highlights/#öffentlich-teilen-über-einen-global-server).
- **Links zum Teilen von Momenten.** Bei einem öffentlichen Moment
  erstellt **Link zum Teilen kopieren** einen Link, der genau diesen
  Moment öffnet und nichts anderes, was du gepostet hast. Das klappt
  sogar, während dein Zuhause offline ist, weil der GFS eine versiegelte
  Kopie aufbewahrt, die er selbst nicht öffnen kann. Siehe
  [Momentum](/de/docs/momentum/#einen-moment-teilen).
- **Die Seite eines globalen Space, Einladungslinks und Profile.** Die
  Seite eines Space auf einem GFS, ein GFS-Einladungslink und das
  Momentum-Profil einer Person übergeben an den Viewer, der den
  Info-Text des Space, den Einladungscode und QR-Code oder das Profil
  mit einem Folgen-Button zeigt.

Der Viewer spricht Englisch, Deutsch, Niederländisch, Französisch und
Spanisch, passend zur Browsersprache deiner Freunde, und die Seiten
folgen ihrer hellen oder dunklen Einstellung. In einer Chat-App
geteilt, zeigt ein Space- oder Profil-Link weiterhin eine Vorschau mit
Namen und Bild. Der GFS beantwortet die Chat-App mit einer kleinen
Vorschauseite ohne Skripte.

## Was es nicht löst

Die Grenzen sollst du lieber von uns hören:

- **Du vertraust dem Host des Viewers.** Der Viewer wird auf GitHub
  Pages unter der Organisation `social-home-io` veröffentlicht. Die
  Fingerabdrücke machen eine ausgetauschte Seite erkennbar, aber nur,
  wenn jemand nachsieht.
- **Der Link ist der Schlüssel.** Jeder, an den er weitergeleitet wird,
  kann ihn öffnen. Er steht außerdem im Browserverlauf deiner Freunde,
  wie jeder andere Link, den sie öffnen.
- **Einen Moment-Link kannst du nicht zurückholen**, außer du löschst
  den Moment. Einen Highlight-Link schon: Entferne ihn oder lass das
  Highlight ablaufen.
- **Der GFS sieht weiterhin den Verkehr.** Er weiß, wann ein Link
  geöffnet wird und von welcher Adresse. Er weiß nicht, was drin ist.

Die vollständige Liste steht auf der Seite
[Sicherheitsmodell](/de/docs/security/#öffentliche-links).

## Dein eigener GFS

Es gibt nichts zu tun. Ein GFS übergibt seine öffentlichen Seiten
standardmäßig an den Viewer des Projekts. Wenn du lieber nicht davon
abhängen willst, kannst du die veröffentlichten Viewer-Dateien selbst
hosten und deinen GFS und deine Haushalte darauf zeigen lassen, oder
die Übergabe ausschalten. Dann zeichnet dein GFS seine Seiten wieder
selbst. Das ist für Highlight-Links weniger sicher, weil dein GFS dann
die Seite ausliefert, die den Schlüssel liest. Siehe
[Ein eigenes Relay betreiben](/de/docs/running-a-gfs/#deine-öffentlichen-seiten).

<details class="tech">
<summary>Unter der Haube</summary>

- Highlight-Link:
  `https://viewer.social-home.io/v/<hash>/#g=<GFS>&i=<home>&h=<highlight>&t=<token>&k=<secret>`.
  Alles nach `#` bleibt im Browser. `k` wird mit HKDF-SHA256 aus dem
  Identitäts-Seed des Autors und dem Token abgeleitet; der GFS sieht es
  nie.
- Der Stream wird pro Ansicht versiegelt: Der Viewer schickt einen
  flüchtigen P-256-Schlüssel, und das Zuhause des Autors leitet aus dem
  ECDH-Ergebnis, gesalzen mit `k`, einen AES-256-GCM-Schlüssel ab. Der
  GFS sieht auf dem direkten Weg wie auf dem Relay-Fallback das Token
  und den Viewer-Schlüssel, aber nie `k`.
- `<hash>` sind die ersten 16 Hex-Zeichen des sha384 der Seite, die den
  SRI-Hash des Skripts und die Styles per Hash trägt. Strenge CSP in
  einem `<meta>`-Tag, `no-referrer`, jede Anfrage mit
  `credentials: 'omit'` und `redirect: 'error'`.
- Das Manifest `socialhome/pinned_viewer.json` ist im Core-Repo
  eingecheckt; CI baut den Viewer zweimal und schlägt bei jedem
  abweichenden Byte fehl. Das Viewer-Repo baut ihn neu, prüft die
  `integrity` und fügt `v/<hash>/` zu `gh-pages` hinzu, das ein Ruleset
  append-only hält.
- Der Viewer hat seine eigene Domain, `viewer.social-home.io`, statt
  eines geteilten `github.io`-Origins, damit keine andere Seite der
  Organisation einen Service Worker darüber registrieren kann.
- Öffentliche GFS-Seiten: `/spaces/{id}`, `/join/{token}` und
  `/moments/{user}` antworten mit einer inerten Übergabeseite
  (Vorschau-Tags, eine Weiterleitung zum Viewer, `default-src 'none'`).
  Der Viewer liest `/gfs/pages/*` cross-origin ohne Zugangsdaten und
  rendert den Info-Text aus einer kleinen Markdown-Teilmenge, nie als
  HTML.
- TURN-Zugangsdaten für den Viewer werden pro Antwort erzeugt (TURN
  REST API, standardmäßig 10 Minuten), nie statisch.

</details>
