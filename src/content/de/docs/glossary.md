---
title: Wörter, die wir verwenden
description: Das Dutzend Wörter, das überall in Social Home vorkommt — Haushalt, Space, Reichweite, Host, GFS, Kopplung und der Rest — jedes in einem Absatz erklärt.
order: 5
---

Social Home versucht, in der App, in dieser Doku und im Code
dieselben Wörter zu verwenden. Diese Seite ist die kurze Liste.
Wenn eine Doku-Seite einen Begriff benutzt, den du nicht kennst,
steht er mit ziemlicher Sicherheit hier — und die technischen
Details stecken auf jeder Seite in einem aufklappbaren
„Unter der Haube“-Block, den du nach Belieben überspringen oder
öffnen kannst.

## Haushalt

Ein Haushalt ist ein Zuhause, in dem Social Home läuft — ein
Server, meist als Home Assistant Add-on installiert — und die
Menschen, die dahinter wohnen — du, dein Partner oder deine
Partnerin, die Kinder, die Mitbewohnerin. Alles, was ein Haushalt
tut (die Einkaufsliste, der Kalender, die Fotos, der Chat), wird
auf diesem einen Server gespeichert. Wenn diese Doku „dein
Haushalt“ sagt, meint sie deinen Server und alle, die ein Konto
darauf haben.

<details class="tech">
<summary>Unter der Haube</summary>

Der Code und die Protokollspezifikation nennen einen Haushalt
_instance_. Die beiden lesbaren Adressfelder auf jedem Umschlag,
`from_instance` und `to_instance`, sind Haushalts-IDs.

</details>

## Kopplung

Die Kopplung ist der Weg, auf dem sich zwei Haushalte
kennenlernen: Du scannst einen QR-Code (oder sagst einen kurzen
Code am Telefon durch), und von da an können dein Zuhause und
ihres Direktnachrichten austauschen und Spaces teilen. Die
Kopplung passiert einmal pro Haushaltspaar, und jede Seite kann
sie später unter **Einstellungen → Verbindungen** wieder
aufheben.

<details class="tech">
<summary>Unter der Haube</summary>

Die Kopplung ist eine X25519-Schlüsselvereinbarung mit
HKDF-SHA256-Schlüsselableitung; der gesprochene Code schützt den
Austausch davor, gekapert zu werden. Die langfristige Identität
jedes Haushalts ist ein Ed25519-Signaturschlüssel.

</details>

## Space

Ein Space ist ein gemeinsamer Raum für eine beliebige Gruppe von
Menschen, über beliebig viele Haushalte hinweg: die Familie, das
Mietshaus, der Buchclub. Ein Space hat einen Feed, einen Chat
und einen Kalender, und seine Mitglieder entscheiden gemeinsam,
wer sonst noch hineinkommt.

## Reichweite

Die Reichweite eines Space legt fest, wer ihn finden und wer
darin posten kann. Es gibt vier, jede mit einem größeren Publikum
als die vorige:

- **Privat** — nur Leute, die du einlädst.
- **Haushalt** — alle in deinem eigenen Zuhause.
- **Öffentlich** — deine [gekoppelten](#kopplung) Haushalte
  können ihn unter Räume entdecken finden. Er bleibt in deinem
  eigenen Kreis.
- **Global** — gelistet auf jedem [GFS](#gfs), mit dem dein
  Zuhause verbunden ist, damit jeder auf diesem GFS ihn finden
  kann.

Nur globale Spaces werden auf einem GFS gelistet. Ein
öffentlicher Space auch, wenn ein Admin ihn von Hand dort
veröffentlicht, und ein privater Space kann den GFS nutzen, wenn
sein Besitzer das einschaltet (standardmäßig aus). Haushalte, mit
denen du gekoppelt bist, bekommen die Beiträge eines Space direkt
oder über das Mesh, egal welche Reichweite er hat. Die Reichweite
eines Space zu ändern ist eine Entscheidung aller seiner Admins —
siehe
[Globale Spaces](/de/docs/global-spaces/#große-änderungen-brauchen-eine-abstimmung).

## Host

Jeder Space hat einen Host-Haushalt: den, der ihn angelegt hat
und die Admin-Stimmen auszählt. Der Host ist kein Mittelsmann —
Mitglieder posten direkt zueinander — aber er ist der Ort, an dem
die Mitgliederliste lebt.

## GFS

Ein GFS ist ein **Global Federation Server** — der globale
Föderationsserver: das Relay, das Haushalten hilft, einander zu
finden, wenn sie sich noch nicht kennen. Er listet globale
Spaces und trägt ihre versiegelten Beiträge zu Haushalten, mit
denen du nicht gekoppelt bist: Followern und Mitgliedern, die
über einen GFS-Link beigetreten sind. Das Social-Home-Projekt betreibt einen; jeder kann
[einen eigenen betreiben](/de/docs/running-a-gfs/). Ein GFS sieht
versiegelte Umschläge und Routing-Informationen, nie den Inhalt
eines Beitrags. Was er sehen kann und was nicht, steht auf der
Seite zum [Sicherheitsmodell](/de/docs/security/#was-ein-relay-sieht).

## GFS-Link und Lokaler Link

Beides sind Einladungslinks zu einem Space. Ein **GFS-Link**
funktioniert für jeden — die Person, die ihn öffnet, muss nicht
mit dir gekoppelt sein, weil der GFS die Vorstellung übernimmt.
Ein **Lokaler Link** funktioniert nur für Haushalte, mit denen du
bereits verbunden bist, und berührt nie einen GFS.

## Follower

Ein Follower ist jemand, der einen Space liest, ohne Mitglied zu
sein. Follower sehen, was der Space veröffentlicht, aber sie
posten nicht und haben keine Stimme. Die Mitgliedsrollen lauten
Besitzer → Admin → Moderator → Mitglied → Follower.

## Schlüsselrotation (Epoche)

Jeder Space hat einen Schlüssel, der seine Beiträge versiegelt.
Immer wenn sich die Mitgliedschaft ändert — jemand kommt dazu,
jemand geht, jemand wird entfernt — bekommt der Space einen
frischen Schlüssel und beginnt eine neue _Epoche_. Wer gegangen
ist, kann nichts lesen, was nach dem Weggang gepostet wurde.

<details class="tech">
<summary>Unter der Haube</summary>

Space-Inhalte werden mit einem AES-256-GCM-Schlüssel pro Epoche
versiegelt; die Epochennummer ist eines der wenigen lesbaren
Felder auf einem Umschlag, damit ein Mitglied weiß, welchen
Schlüssel es verwenden muss. Der Autoritätsschlüssel des Space
rotiert separat, wann immer ein Admin entfernt wird.

</details>

## Versiegelter Umschlag

Ein versiegelter Umschlag ist das, was tatsächlich zwischen
Haushalten reist. Der Beitrag, das Foto oder der Kalendereintrag
darin wird verschlüsselt, bevor er dein Zuhause verlässt, und
erst im empfangenden Zuhause wieder entschlüsselt; die Außenseite
des Umschlags trägt gerade genug, um ihn zuzustellen. Nichts
verlässt je einen Haushalt unversiegelt — wenn ein Space nicht
versiegeln kann, sendet er nicht.

<details class="tech">
<summary>Unter der Haube</summary>

Umschläge sind AES-256-GCM, signiert mit Ed25519. Die einzigen
lesbaren Felder sind `event_type`, `from_instance`,
`to_instance`, `space_id` und `epoch`.

</details>

## Mesh

Wenn zwei Mitgliedshaushalte einander nicht direkt erreichen
können, kann ein Beitrag über die Server anderer Mitglieder
hüpfen, um anzukommen. Jeder Hop ist für den endgültigen
Empfänger versiegelt, sodass die Haushalte dazwischen den
Umschlag tragen, ihn aber nicht öffnen können.

<details class="tech">
<summary>Unter der Haube</summary>

`SPACE_ROUTED`-Weiterleitung, höchstens drei Hops, versiegelt für
einen kurzlebigen X25519-Schlüssel des Empfängers.

</details>

## Relay und TURN

Ein Relay ist jeder Server, der versiegelte Umschläge zwischen
Haushalten weiterreicht, ohne sie lesen zu können; in Social Home
ist das der GFS. Ein **TURN**-Server ist eine andere Art Relay,
die nur für Sprach- und Videoanrufe genutzt wird, und nur dann,
wenn keine direkte Verbindung zwischen den beiden Handys
zustande kommt. Er reicht die verschlüsselten Medien durch und
sieht sonst nichts.
