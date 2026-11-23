---
title: "Ein neuer GFS: alle Mitglieder gleich, und der GFS erfährt weniger"
description: Echte Haushalte haben uns gezeigt, wo der GFS besser werden kann, also haben wir neu gestaltet, wie er arbeitet. Jeder Haushalt bekommt sein eigenes anonymes Postfach, jedes Mitglied erreicht jedes andere, Posten ist immer anonym, Admins können einen Space ohne den Eigentümer am Laufen halten, und du kannst um Beitritt zu einem globalen Space bitten, ohne zu koppeln. In Social Home 2026.11.19.
date: 2026-11-20
author: Das Social Home Team
image: /blog/2026-11-gfs/cover.webp
imageAlt: Eine Illustration eines GFS als grüner Schrank aus kleinen Postfächern ohne Namen, nur mit verwürfelten Zeichen. Fünf Haushalte darunter schicken versiegelte Umschläge auf gepunkteten Wegen in einige der Postfächer, und ein Haushalt hält zwei Tickets
order: 50
---

Der [GFS (Global Federation Server)](/de/docs/glossary/#gfs) ist das
Relay, das Haushalten hilft, einander zu finden. Außerdem trägt er
einen [Space](/de/docs/glossary/#space) zu Haushalten, mit denen du
nicht gekoppelt bist: zu den Followern eines globalen Space und zu
Mitgliedern, die über einen **GFS-Link** beigetreten sind.

In den letzten Wochen haben viele Haushalte den GFS im Alltag genutzt:
Familien-Spaces mit Oma und Opa in einer anderen Stadt, Vereine mit
Dutzenden Mitgliedern, globale Spaces mit Followern überall. Dabei
haben wir drei Dinge gelernt:

- **Jedes Mitglied soll gleich sein**, egal wie sein Haushalt den
  Space erreicht. Wer über einen GFS-Link beitritt, soll denselben
  Space bekommen wie jemand, der mit dem Gastgeber gekoppelt ist.
- **Ein Space soll nicht auf seinen Eigentümer warten.** Wenn das
  Zuhause des Eigentümers gerade aktualisiert wird oder offline ist,
  sollen die Mitglieder einander trotzdem erreichen, und Admins
  sollen den Space trotzdem führen können.
- **Der GFS soll so wenig wie möglich erfahren.** Nicht, was gepostet
  wird, und nicht, wer es gepostet hat. Am besten nicht einmal, an
  welchen Haushalt er zustellt.

Also haben wir noch einmal von vorn angefangen und neu festgelegt, wie
ein GFS arbeitet. Das Ergebnis steckt in **Social Home 2026.11.19**.
Deine Beiträge sind weiterhin von deinem Zuhause zu ihrem versiegelt,
und der GFS kann noch immer keinen einzigen davon lesen.

## Jeder Haushalt bekommt ein anonymes Postfach

Ist dein Haushalt über einen GFS in einem Space, bekommt er auf diesem
GFS ein **anonymes Postfach**. Der Gastgeber und alle anderen Mitglieder
legen versiegelte Nachrichten hinein, und dein Zuhause holt sie ab. Der
GFS kennt ein Postfach nur unter einer zufällig aussehenden Nummer. Er
weiß nicht, welchem Haushalt das Postfach gehört, zu welchen Spaces es
gehört oder was in den Nachrichten steht.

Um ein Postfach zu eröffnen, löst dein Zuhause ein **Ticket** ein. Es
holt sich jeden Tag einen kleinen Stapel Tickets, und die sind so
gemacht, dass der GFS nicht erkennen kann, welcher Haushalt eines
eingelöst hat. So bleibt ein vielgenutzter GFS fair, ohne dass er
erfährt, wer hinter einem Postfach steckt.

Du musst dafür nichts tun. Es gibt keine Einstellung, und nichts in der
App heißt Postfach. Es funktioniert einfach.

<details class="tech">
<summary>Unter der Haube</summary>

Ein Postfach pro Haushalt und GFS, geteilt von allen seinen Spaces
dort. Die Schlüssel werden per HKDF-SHA256 aus einer
32-Byte-Postfach-Wurzel abgeleitet: ein X25519-Schlüssel zum
Versiegeln und ein Ed25519-Schlüssel zum Beanspruchen. Die Postfach-ID
ist `base32(SHA-256("sh-mbx-v1" ‖ sign_pk))`. Die Space-ID geht nicht
in die Ableitung ein, und zwei GFS sehen Postfächer, die nichts
miteinander zu tun haben. Dein Haushalt kündigt sein Postfach auf einer
**Mitgliedskarte** an, die mit seinem Identitätsschlüssel signiert ist,
sodass ein Gastgeber eine Karte verwerfen, aber nie fälschen kann. Ein
Haushalt nimmt Postfach-Nachrichten nur von Mitgliedern an, deren Karte
er hat.

Die Registrierung (`POST /gfs/mailbox/register`) ist anonym, mit
Besitznachweis. Der Socket zum Beanspruchen (`/gfs/mailbox/ws`) ist vom
eigenen Socket des Haushalts getrennt. Der GFS speichert die
Postfach-ID, ihren gepinnten Schlüssel und zwei auf den Tag gerundete
Zeitstempel. Er speichert keine Haushalts-ID, keine Adresse und keinen
Space. Tickets sind Privacy-Pass-Tokens (RFC 9576–9578, Blind RSA-2048,
RFC 9474), höchstens 50 pro Haushalt und Tag, mit einem
Aussteller-Schlüssel pro 30 Tage. Ein Ticket versteckt seinen Haushalt
unter allen Haushalten, die Tickets unter demselben Schlüssel geholt
haben.

</details>

## Jedes Mitglied erreicht jedes Mitglied

Mit einem Postfach für jeden Haushalt gehen Mitglieder nicht mehr über
den Gastgeber, um einander zu erreichen:

- **Beiträge kommen an, während der Gastgeber offline ist.** Jedes Mitglied
  stellt direkt an die anderen zu, auch in privaten Spaces.
- **Bilder und lange Seiten kommen in einem Stück an.** Haushalte
  hinter einem GFS bekommen dieselben Bilder und dieselben langen
  Seiten wie gekoppelte Haushalte.
- **Ein Upload, egal wie viele Mitglieder.** Ein Kalendereintrag für
  200 Haushalte hinter demselben GFS geht einmal hoch, nicht 200-mal.
- **Lücken füllen sich von selbst.** Antwortet der Gastgeber nicht, fragt
  dein Zuhause stattdessen beim Haushalt eines Admins oder Moderators
  nach. Ein älteres Bild, das du nie bekommen hast, wird geholt, wenn
  du es öffnest. Ein neues Mitglied bekommt sofort die letzten 30 Tage.
- **Reaktionen erscheinen in jedem Haushalt.** Du kannst bis zu fünf
  Reaktionen an einem Beitrag hinterlassen, und alle sehen dieselben.

<details class="tech">
<summary>Unter der Haube</summary>

Ein Space-Update für viele Postfächer wird einmal mit einem frischen
AES-256-GCM-Schlüssel versiegelt, und dieser Schlüssel wird für jeden
Empfänger mit X25519 + HKDF verpackt (`POST /gfs/envelope/multi`, bis
zu 500 Empfänger). Für 200 Haushalte ist das ein Upload von 51 KB statt
1,13 MB. Elemente über dem Umschlag von ~191 KiB reisen als
Binär-Frames, aufgepolstert auf 64/128/256/516 KiB, und Bilder gehen in
vollen Stücken von 512 KiB.

Selbstheilung: Bleibt der Gastgeber während einer Synchronisation 120 s
still, fragt das Mitglied einen Helfer (den Haushalt eines Admins oder
Moderators). Ein fehlendes Bild wird zuerst beim Gastgeber angefragt und
nach 60 s bei einem Helfer; jede Datei wird gegen ihren Hash geprüft.
Die Mitgliederliste wird per Digest (`rd1-sha256`) repariert, statt
nach Zeitplan neu gesendet zu werden. Ein Mitglied, dessen Zuhause
nicht mit dem GFS verbunden ist, wird über den Gastgeber erreicht, der
einzige Fall, in dem der Gastgeber noch online sein muss.

</details>

## Posten ist immer anonym

Wenn ein Mitglied über den GFS postet, kann der GFS nicht erkennen, aus
welchem Haushalt der Beitrag kam, und nicht einmal, welche Haushalte
schreiben dürfen. So funktioniert jeder Space, ohne dass du etwas
einrichten musst.

<details class="tech">
<summary>Unter der Haube</summary>

Jedes Mitglied veröffentlicht mit `POST /gfs/member-publish-anon`,
autorisiert durch einen Writer-Key, der pro Schlüssel-Epoche geteilt
wird. Der äußere Typ ist immer `space_item`, innerhalb des AEAD auf
1/4/16/64/128 KiB aufgepolstert. Das Schreiber-Zertifikat des Mitglieds
reist nur im Geheimtext mit, wo die empfangenden Haushalte es prüfen.
Schreiber abonnieren im selben gemischten Stapel wie Follower.

</details>

## Admins können den Space am Laufen halten

Eigentümer eines Space können jetzt **Admins dürfen für mich handeln**
einschalten. Deine Admins aus anderen Haushalten können dann
moderieren, einladen und veröffentlichen, während dein Zuhause offline
ist, auch Admins, die den Space nur über einen GFS erreichen.
Standardmäßig ist das aus.

Bevor du einen Haushalt zum Admin machst, zeigt dir die App seine
**Haushalts-ID**. Bitte die anderen, dir ihre von ihrer Seite
**Verbindungen** vorzulesen, damit du weißt, dass sie es wirklich sind.
Entfernst du einen Admin, funktioniert sein Schlüssel auf keinem GFS
mehr, auf dem der Space je gelistet war.

<details class="tech">
<summary>Unter der Haube</summary>

Ist der Schalter an, bekommt jeder Admin-Haushalt den
Ed25519-Signatur-Seed des Space, versiegelt für diesen Haushalt.
Gegenüber dem GFS sieht ein Admin aus wie jeder andere Schreiber: Der
GFS kann erfahren, dass ein Space delegierte Admins hat, nicht, welcher
Haushalt sie sind. Das Entfernen eines Admins rotiert den Schlüssel des
Space auf jedem GFS, auch auf GFS, von denen die Listung zurückgezogen
wurde, und die Änderung wird bestätigt und wiederholt, bis jeder GFS
sie hat. Jede Listung ist für einen GFS signiert, sodass ein GFS sie
nicht bei einem anderen wieder einspielen kann.

</details>

## Um Beitritt zu einem globalen Space bitten, ohne zu koppeln

Du siehst auf deinem GFS einen globalen Space, der dir gefällt? Jetzt
kannst du direkt um Beitritt bitten, ohne dich vorher mit seinem Gastgeber
zu koppeln. Der Eigentümer sieht deine Anfrage mit der Markierung
**Über den GFS · nicht überprüft**, weil der Name, den du schickst, das
ist, was du eingetippt hast, und niemand ihn geprüft hat. Stapeln sich
viele Anfragen, kann der Eigentümer alle auf einmal ablehnen.

## Follower sind Mitglieder, die lesen

Ein Follower ist jetzt einfach ein Mitglied mit einer Rolle nur zum
Lesen. Follower bekommen dieselben Beiträge auf demselben Weg, und der
Eigentümer entscheidet mit zwei Schaltern, ob Follower kommentieren oder
Reaktionen hinterlassen dürfen. Abstimmen bei Umfragen bleibt den
Mitgliedern vorbehalten; Follower sehen die Ergebnisse.

## Was der GFS weiterhin sieht

Wir sagen es dir lieber klar:

- **Welche Postfächer ein Space-Update bekommen.** Schickt ein Mitglied
  ein Update auf einmal an viele Postfächer, sieht der GFS diese Liste
  von Postfächern, aber nicht den Space, die Haushalte oder den Inhalt.
- **Wer einem globalen Space folgt.** Follower abonnieren den Space auf
  dem GFS, und Schreiber verstecken sich unter ihnen.
- **Welche Haushalte an einem privaten Space teilnehmen**, den der
  Eigentümer mit dem GFS verbunden hat. Nie den Namen, den Schlüssel
  oder die Beiträge des Space.
- **Netzwerkadressen.** Ein GFS, der Adressen protokolliert, könnte ein
  Postfach einem Haushalt zuordnen, der sich von derselben Adresse
  verbindet. Der Social Home GFS protokolliert keine Adressen. Wenn du
  [selbst einen GFS betreibst](/de/docs/running-a-gfs/), halte es
  genauso.

## Ausprobieren

Alles in diesem Beitrag steckt in **Social Home 2026.11.19**.
Aktualisiere dein Zuhause, und der neue GFS erledigt den Rest. Du
willst die Details? Lies [Globale Spaces](/de/docs/global-spaces/) und
[Datenschutzmodell](/de/docs/privacy/).
