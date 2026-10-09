---
title: "Ein Chat im Feed, ein Sicherheitsnetz für gekoppelte Haushalte und schlankere Syncs"
description: Jeder Haushalt und jeder Space bekommt einen eigenen Chat, gekoppelte Haushalte können auf den GFS ausweichen, wenn kein direkter Weg sie erreicht, und der Space-Sync sendet nur noch, was sich geändert hat. In Social Home 2026.10.8 und 2026.10.9.
date: 2026-10-09
author: Das Social Home Team
image: /blog/2026-10-chat-sync/household-chat.png
imageAlt: Der Haushalts-Feed mit geöffnetem Chat-Tab, mit Nachrichten von Familienmitgliedern, einer @Erwähnung und der Trennlinie Neue Nachrichten
order: 50
---

Zwei Releases in zwei Tagen und drei Änderungen, die du im Alltag
merkst: Dein Haushalt bekommt einen Chat direkt im Feed, gekoppelte
Haushalte erreichen einander auch dann, wenn die direkte Leitung
streikt, und gemeinsame Spaces aktuell zu halten kostet viel weniger.

_Alle Bildschirme unten zeigen Beispieldaten._

## Ein Chat für den ganzen Haushalt

„Essen ist fertig.“ „Kann jemand nach der Heizung schauen?“
„Pizza am Freitag?“ Nicht jede Nachricht ist einen Beitrag wert. Der
Feed hat oben jetzt einen **Feed | Chat**-Umschalter, und dahinter
liegt ein Chat, den alle in deinem Haushalt lesen können. Er
funktioniert wie jeder Gruppenchat: @Erwähnungen, Reaktionen,
Bearbeiten, Anhänge und eine Linie **Neue Nachrichten** dort, wo du
aufgehört hast. Du kannst ihn stummschalten oder dich nur
benachrichtigen lassen, wenn dich jemand erwähnt.

Der Haushalts-Chat verlässt dein Zuhause nie. Er wird nicht an
gekoppelte Haushalte gesendet und landet nicht in deinem
Chats-Posteingang. Ein Admin kann ihn in den Haushaltseinstellungen
ausschalten; dann sieht der Feed genau so aus wie vorher.

<div class="shots">
<figure class="desk"><a href="/blog/2026-10-chat-sync/household-chat.png"><img src="/blog/2026-10-chat-sync/household-chat.png" alt="Der Haushalts-Feed mit geöffnetem Chat-Tab, mit Nachrichten von Familienmitgliedern, einer @Erwähnung und der Trennlinie Neue Nachrichten" width="1280" height="720" loading="lazy"></a><figcaption><b>Feed | Chat</b>Ein Chat für alle zu Hause, einen Tipp vom Feed entfernt.</figcaption></figure>
<figure class="phone"><a href="/blog/2026-10-chat-sync/space-chat-phone.png"><img src="/blog/2026-10-chat-sync/space-chat-phone.png" alt="Der Chat eines Space auf dem Handy, mit Nachrichten von Mitgliedern aus drei Haushalten, einer bearbeiteten Nachricht und einer gelöschten Antwort" width="390" height="844" loading="lazy"></a><figcaption><b>Chat in einem Space</b>Mitglieder aus drei Haushalten, ein Gespräch.</figcaption></figure>
</div>

**Spaces bekommen denselben Umschalter.** Jeder Space hat jetzt einen
Chat, den seine Mitglieder über Haushalte hinweg teilen – der
Buchclub kann den nächsten Termin abstimmen, ohne dafür einen Beitrag
zu schreiben. Follower eines Space sehen den Chat nicht und bekommen
ihn nicht. Standardmäßig benachrichtigt er dich nur, wenn dich jemand
erwähnt, die Moderatoren des Space können jede Nachricht entfernen,
und ein archivierter Space hält seinen Chat lesbar, aber geschlossen.
Vorerst ist der Space-Chat nur Text. Der Besitzer kann ihn in den
Einstellungen des Space ausschalten.

<details class="tech">
<summary>Unter der Haube</summary>

Der Haushalts-Chat ist ein normaler Gruppen-DM mit Haushalts-Scope:
Er nutzt Nachrichten, Erwähnungen, Reaktionen, Stummschalten und
Lesestatus mit, aber der ausgehende Fan-out überspringt ihn, und
jeder eingehende `DM_*`-Handler lehnt seine ID ab. Der Space-Chat
reist als vier neue Föderationsereignisse
(`SPACE_CHAT_MESSAGE_CREATED`, `_UPDATED`, `_DELETED`,
`SPACE_CHAT_REACTION`, Protokoll v55), versiegelt wie alle anderen
Space-Ereignisse, und wird nur an Haushalte mit einem Schreibsitz
zugestellt. Haushalte unter v55 werden übersprungen. Neue Mitglieder
holen über den Space-Sync auf, Löschungen eingeschlossen.

</details>

## Ein Sicherheitsnetz für gekoppelte Haushalte

Gekoppelte Haushalte sprechen direkt miteinander. Wenn dieser direkte
Weg ausfällt – ein zickiger Router, eine geänderte Adresse, ein
Haushalt ganz ohne Adresse von außen –, warteten Nachrichten bisher
im Postausgang, bis er wieder da war.

Jetzt kannst du den [GFS (Global Federation Server – der globale Föderationsserver)](/de/docs/glossary/#gfs)
als **Ausweichweg** einspringen lassen. Er ist **standardmäßig aus**
und wird pro Verbindung eingestellt, unter **Verbindungen → Verwalten**.
Beide Haushalte müssen ihn einschalten, und ihre Zuhause finden einen
GFS, den beide nutzen, ohne einander zu verraten, mit welchen sie
verbunden sind. Beim Koppeln lässt die neue Frage **Wie erreichen sie
dich?** einen Haushalt ohne Adresse von außen über den GFS koppeln.
Bekommt er später eine Adresse, wechselt das Paar von selbst auf
direkt.

Der GFS wird nur genutzt, wenn der direkte Weg ausfällt, und alles,
was er trägt, bleibt versiegelt. Er kann sehen, wann und wie viel
eure beiden Haushalte austauschen und dass ihr gekoppelt seid – nie,
was ihr sagt. Deshalb nennt die App eine direkte Adresse weiterhin die
privatere Wahl.

<div class="shots">
<figure class="desk"><a href="/blog/2026-10-chat-sync/gfs-fallback.png"><img src="/blog/2026-10-chat-sync/gfs-fallback.png" alt="Verwalten-Fenster für einen gekoppelten Haushalt mit aktiviertem Use the GFS as a fallback, der Meldung, dass er über 1 gemeinsam genutzten GFS erreichbar ist, und was der GFS sehen kann" width="1280" height="720" loading="lazy"></a><figcaption><b>Ein Schalter pro Verbindung</b>Die Statuszeile sagt, ob es funktioniert, und der Hinweis, was der GFS sieht.</figcaption></figure>
</div>

Noch eine Änderung auf der GFS-Seite: Das Kästchen **Mit dem GFS
verbinden** in der Willkommenstour ist jetzt vorab angehakt. Entferne
den Haken, um dem GFS fernzubleiben; verbinden oder trennen kannst du
jederzeit unter Verbindungen.

<details class="tech">
<summary>Unter der Haube</summary>

Gekoppelter Verkehr versucht zuerst den WebRTC-DataChannel, dann den
HTTPS-Posteingang, und nur bei einem Netzwerkfehler oder 5xx (oder
ganz ohne URL) wechselt er reihum über die GFS-Routen des Paares. Ein
4xx fällt nie durch. Der GFS sieht nur `{to_instance, sealed}`.
Gemeinsame GFS werden gefunden, indem eine Nonce-Probe über jede
unserer eigenen GFS-Verbindungen geht; eine Route wird nur
gespeichert, wenn die Antwort über denselben GFS zurückkommt, sodass
ein GFS, der eine Probe anderswo wiederholt, nichts anlegt. Routen
werden alle 24 h neu geprüft und verfallen nach 72 h. Protokoll v53
(Routen) und v54 (Schlüsselaustausch für bestehende Paare).

</details>

## Syncs senden nur noch, was sich geändert hat

Jede halbe Stunde gleicht sich dein Zuhause mit den anderen
Haushalten in deinen Spaces ab, damit niemand etwas verpasst. Bisher
hieß das, jeden neueren Beitrag, Kommentar und Fotoeintrag jedes Mal
erneut zu senden. Jetzt sendet jeder Haushalt nur, was sich seit dem
letzten Sync geändert hat, den die andere Seite bestätigt hat. Ein
ruhiger Space kostet fast nichts.

Zwei Dinge sind dabei zuverlässiger geworden:

- **Löschungen erreichen alle.** Ein gelöschter Beitrag, Kommentar,
  eine Haftnotiz, ein Termin, ein Foto oder eine Zone erreicht jetzt
  auch Haushalte, die gerade offline waren, statt später still
  zurückzukehren.
- **Ein wiederhergestelltes Backup holt auf.** Ein Haushalt, der aus
  einem älteren Backup wiederhergestellt wurde, bekommt die fehlenden
  Änderungen beim nächsten Sync, ohne dass jemand **Jetzt
  synchronisieren** drücken muss.

Was ein Sync mitnimmt, wird nicht mehr bei festen Zahlen
abgeschnitten. Die Aufbewahrungsdauer des Space entscheidet, wie weit
er zurückreicht.

<details class="tech">
<summary>Unter der Haube</summary>

SQLite-Trigger stempeln jede synchronisierte Zeile mit einem Zähler
pro Haushalt (`sync_seq`), sodass kein Schreibpfad es vergessen kann.
Der Sender führt pro Haushalt ein Wasserzeichen und rückt es erst
nach einem Stream vor, den der Empfänger als `clean` meldet; ein
fehlgeschlagener Chunk kommt also beim nächsten Mal wieder. Ein
wiederhergestellter Haushalt meldet den letzten angewendeten Snapshot
zurück (`have_seq`); der Sender streamt ab dem kleineren der beiden
Werte und vertraut nie einem Wert über seinem eigenen. Ein voller
Stream läuft weiterhin beim Koppeln, beim Beitritt, bei **Jetzt
synchronisieren**, nach einer Formänderung und mindestens einmal am
Tag. Löschungen reisen als inhaltsfreie Tombstones und werden mit
derselben Berechtigung angewendet wie eine Live-Löschung. Kein
Protokollsprung.

</details>

## Ausprobieren

Der GFS-Ausweichweg steckt in **Social Home 2026.10.8**; die Chats und
der schlankere Sync in **Social Home 2026.10.9**. Für den Ausweichweg
und den Space-Chat brauchen beide Haushalte die neue Version. Mehr
darüber, wie Haushalte einander erreichen, steht in
[Haushalte, föderiert](/de/docs/federation/).
