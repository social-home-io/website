---
title: "Een chat in de feed, een vangnet voor gekoppelde huishoudens en lichtere syncs"
description: Elk huishouden en elke space krijgt een eigen chat, gekoppelde huishoudens kunnen terugvallen op de GFS als geen directe weg ze bereikt, en de space-sync stuurt alleen nog wat er veranderd is. In Social Home 2026.10.8 en 2026.10.9.
date: 2026-10-09
author: Het Social Home-team
image: /blog/2026-10-chat-sync/household-chat.png
imageAlt: De feed van het huishouden met het Chat-tabblad open, met berichten van gezinsleden, een @vermelding en een scheidingslijn Nieuwe berichten
order: 50
---

Twee releases in twee dagen, en drie veranderingen die je in het
dagelijks leven merkt: je huishouden krijgt een chat direct in de
feed, gekoppelde huishoudens bereiken elkaar ook als de directe lijn
het laat afweten, en gedeelde spaces bijhouden kost een stuk minder.

_Alle schermen hieronder tonen voorbeeldgegevens._

## Een chat voor het hele huishouden

"Het eten is klaar." "Kan iemand naar de verwarming kijken?"
"Pizza op vrijdag?" Niet elk bericht is een post waard. De feed heeft
bovenaan nu een **Feed | Chat**-schakelaar, en daarachter zit één
chat die iedereen in je huishouden kan lezen. Hij werkt als elke
groepschat: @vermeldingen, reacties, bewerken, bijlagen en een lijn
**Nieuwe berichten** waar je gebleven was. Je kunt hem dempen of
alleen een melding krijgen als iemand je noemt.

De huishoudchat verlaat je thuis nooit. Hij wordt niet naar
gekoppelde huishoudens gestuurd en komt niet in je Chats-inbox
terecht. Een beheerder kan hem uitzetten in de instellingen van het
huishouden; dan ziet de feed er precies zo uit als voorheen.

<div class="shots">
<figure class="desk"><a href="/blog/2026-10-chat-sync/household-chat.png"><img src="/blog/2026-10-chat-sync/household-chat.png" alt="De feed van het huishouden met het Chat-tabblad open, met berichten van gezinsleden, een @vermelding en een scheidingslijn Nieuwe berichten" width="1280" height="720" loading="lazy"></a><figcaption><b>Feed | Chat</b>Eén chat voor iedereen thuis, één tik van de feed vandaan.</figcaption></figure>
<figure class="phone"><a href="/blog/2026-10-chat-sync/space-chat-phone.png"><img src="/blog/2026-10-chat-sync/space-chat-phone.png" alt="De chat van een space op een telefoon, met berichten van leden uit drie huishoudens, een bewerkt bericht en een verwijderd antwoord" width="390" height="844" loading="lazy"></a><figcaption><b>Chat in een space</b>Leden uit drie huishoudens, één gesprek.</figcaption></figure>
</div>

**Spaces krijgen dezelfde schakelaar.** Elke space heeft nu een chat
die zijn leden over huishoudens heen delen — de leesclub kan de
volgende datum afspreken zonder daar een post voor te maken. Volgers
van een space zien de chat niet en ontvangen hem niet. Standaard
krijg je alleen een melding als iemand je noemt, de moderators van de
space kunnen elk bericht verwijderen, en een gearchiveerde space houdt
zijn chat leesbaar maar gesloten. Voorlopig is de space-chat alleen
tekst. De eigenaar kan hem uitzetten in de instellingen van de space.

<details class="tech">
<summary>Onder de motorkap</summary>

De huishoudchat is een gewone groeps-DM met een huishoud-scope: hij
hergebruikt berichten, vermeldingen, reacties, dempen en leesstatus,
maar de uitgaande fan-out slaat hem over en elke inkomende
`DM_*`-handler weigert zijn id. Space-chat reist als vier nieuwe
federatiegebeurtenissen (`SPACE_CHAT_MESSAGE_CREATED`, `_UPDATED`,
`_DELETED`, `SPACE_CHAT_REACTION`, protocol v55), verzegeld zoals alle
andere space-gebeurtenissen, en wordt alleen afgeleverd bij
huishoudens met een schrijfplek. Huishoudens onder v55 worden
overgeslagen. Nieuwe leden halen bij via de space-sync, verwijderingen
inbegrepen.

</details>

## Een vangnet voor gekoppelde huishoudens

Gekoppelde huishoudens praten rechtstreeks met elkaar. Als die
directe weg faalt — een kuren vertonende router, een gewijzigd adres,
een huishouden zonder adres van buitenaf — wachtten berichten tot nu
toe in de outbox tot hij terug was.

Nu kun je de [GFS (Global Federation Server)](/nl/docs/glossary/#gfs)
laten bijspringen als **terugvaloptie**. Die staat **standaard uit**
en stel je per verbinding in, onder **Verbindingen → Beheren**. Beide
huishoudens moeten hem aanzetten, en hun thuis vindt een GFS die ze
allebei gebruiken zonder elkaar te vertellen met welke ze verbonden
zijn. Bij het koppelen laat de nieuwe vraag **Hoe kunnen ze je
bereiken?** een huishouden zonder adres van buitenaf koppelen via de
GFS. Krijgt het later een adres, dan schakelt het paar vanzelf over op
direct.

De GFS wordt alleen gebruikt als de directe weg faalt, en alles wat
hij draagt blijft verzegeld. Hij kan zien wanneer en hoeveel jullie
twee huishoudens uitwisselen en dat jullie gekoppeld zijn — nooit wat
jullie zeggen. Daarom blijft de app een direct adres de meer privé
keuze noemen.

<div class="shots">
<figure class="desk"><a href="/blog/2026-10-chat-sync/gfs-fallback.png"><img src="/blog/2026-10-chat-sync/gfs-fallback.png" alt="Beheervenster voor een gekoppeld huishouden met Use the GFS as a fallback aangevinkt, de melding dat het bereikbaar is via 1 GFS die beide huishoudens gebruiken, en wat de GFS kan zien" width="1280" height="720" loading="lazy"></a><figcaption><b>Eén schakelaar per verbinding</b>De statusregel zegt of het werkt, de toelichting wat de GFS ziet.</figcaption></figure>
</div>

Nog een verandering aan de GFS-kant: het vakje **Verbinden met de
GFS** in de welkomsttour staat nu standaard aangevinkt. Vink het uit
om weg te blijven van de GFS; verbinden of loskoppelen kan altijd in
Verbindingen.

<details class="tech">
<summary>Onder de motorkap</summary>

Gekoppeld verkeer probeert eerst het WebRTC-DataChannel, dan de
HTTPS-inbox, en alleen bij een netwerkfout of 5xx (of helemaal zonder
URL) gaat het om de beurt over de GFS-routes van het paar. Een 4xx
valt nooit door. De GFS ziet alleen `{to_instance, sealed}`.
Gedeelde GFS'en worden gevonden door een nonce-probe via elk van onze
eigen GFS-verbindingen te sturen; een route wordt alleen vastgelegd
als het antwoord via dezelfde GFS terugkomt, zodat een GFS die een
probe elders herhaalt niets aanmaakt. Routes worden elke 24 uur
opnieuw getest en vervallen na 72 uur. Protocol v53 (routes) en v54
(sleuteluitwisseling voor bestaande paren).

</details>

## Syncs sturen alleen wat er veranderd is

Elk halfuur stemt je thuis af met de andere huishoudens in je spaces,
zodat niemand iets mist. Tot nu toe betekende dat elke recente post,
reactie en foto-vermelding telkens opnieuw sturen. Nu stuurt elk
huishouden alleen wat er veranderd is sinds de laatste sync die de
andere kant heeft bevestigd. Een rustige space kost bijna niets.

Twee dingen zijn onderweg betrouwbaarder geworden:

- **Verwijderingen bereiken iedereen.** Een verwijderde post, reactie,
  sticky, afspraak, foto of zone bereikt nu ook huishoudens die op dat
  moment offline waren, in plaats van later stilletjes terug te komen.
- **Een teruggezette back-up haalt bij.** Een huishouden dat van een
  oudere back-up is teruggezet, krijgt de ontbrekende wijzigingen bij
  de volgende sync, zonder dat iemand op **Nu synchroniseren** hoeft te
  drukken.

Wat een sync meeneemt wordt niet meer afgekapt bij vaste aantallen.
De bewaartermijn van de space bepaalt hoe ver hij teruggaat.

<details class="tech">
<summary>Onder de motorkap</summary>

SQLite-triggers stempelen elke gesynchroniseerde rij met een teller
per huishouden (`sync_seq`), zodat geen schrijfpad het kan vergeten.
De verzender houdt per huishouden een watermerk bij en schuift dat
pas op na een stream die de ontvanger als `clean` meldt; een mislukte
chunk komt de volgende keer dus opnieuw. Een teruggezet huishouden
meldt de laatste snapshot die het toepaste (`have_seq`); de verzender
streamt vanaf de laagste van de twee en vertrouwt nooit een waarde
boven zijn eigen. Een volledige stream draait nog steeds bij koppelen,
bij toetreden, bij **Nu synchroniseren**, na een vormwijziging en
minstens één keer per dag. Verwijderingen reizen als tombstones zonder
inhoud en worden toegepast met dezelfde bevoegdheid als een live
verwijdering. Geen protocolwijziging.

</details>

## Probeer het

De GFS-terugvaloptie zit in **Social Home 2026.10.8**; de chats en de
lichtere sync in **Social Home 2026.10.9**. Voor de terugvaloptie en
de space-chat hebben beide huishoudens de nieuwe versie nodig. Meer
over hoe huishoudens elkaar bereiken lees je in
[Huishoudens, gefedereerd](/nl/docs/federation/).
