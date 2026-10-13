---
title: "Een bord voor de keukenmuur, en een kaart die jullie plekken kent"
description: Het huishouddashboard zet de dag, de huishoudchat en wie waar is op een tablet aan de muur, met een plaatjesweergave voor kinderen en een privacyslot voor bezoek. Zones geven je huishouden eigen plekken, desgewenst gesynchroniseerd vanuit Home Assistant. Alles in Social Home 2026.10.13.
date: 2026-10-13
author: Het Social Home-team
image: /blog/2026-10-dashboard/overview.png
imageAlt: Overzicht op de wandtablet om 16:32 met een banner Bericht voor iedereen van Anna, de volgende afspraak Zwemmen om 17:00, recente huishoudberichten en een tijdlijn van vandaag voor elk gezinslid
order: 50
---

Het is half vijf op een maandag. Anna gaat net van haar werk weg en
haalt nog een taart voor oma. Mia's muziekles is verplaatst naar
lokaal 12, Leo's zwemles begint om vijf uur, en iemand moet de
zwemtas nog vinden. Niemand wil daarvoor een telefoon ontgrendelen.

Daarom heeft Social Home nu een **huishouddashboard**: een rustig bord
voor een tablet aan de keukenmuur of in de gang. Het laat de dag in één
oogopslag zien, de berichten die er nu toe doen en, nieuw deze week,
een kaart van wie waar is. Achter die kaart zitten **zones**: de
plekken die je huishouden bij naam kent. Thuis, school, werk, bij oma.

_Alle schermen hieronder tonen een voorbeeldhuishouden: Anna, Pascal,
Mia (11) en Leo (6), op een doordeweekse middag in Zürich._

## Het hele huishouden in één oogopslag

Het **Overzicht** is het bord dat je ziet als je langsloopt: een grote
klok en de datum, wat er **Hierna** komt ('s avonds het eerste van
**Morgen**), wie thuis is en wie weg, en voor iedereen een baan door de
dag met een „nu”-markering. Schoollessen komen uit het
[lesrooster](/nl/blog/2026-10-01-timetables/) van elk kind, en de
wijzigingen van vandaag staan er gewoon bij: uitgevallen, naar een
ander lokaal verplaatst of erbij gekomen. Taken, de boodschappenlijst
en notities vullen de rest. Op een telefoon of een tablet die rechtop
hangt, wordt hetzelfde bord één kolom.

Het bord ververst zichzelf elke 30 seconden. Valt de wifi weg, dan
blijft de laatste stand staan, wordt grijs wat verouderd kan zijn, en
herstelt het zich vanzelf.

<div class="shots">
<figure class="desk"><a href="/blog/2026-10-dashboard/overview.png"><img src="/blog/2026-10-dashboard/overview.png" alt="Overzicht op de wandtablet om 16:32 met een banner Bericht voor iedereen van Anna, die van haar werk vertrekt en een taart voor oma haalt, een knop Begrepen, de volgende afspraak Zwemmen om 17:00, recente berichten en een tijdlijn van vandaag voor Anna, Leo, Mia en Pascal" width="1280" height="800" loading="lazy"></a><figcaption><b>Overzicht</b>Vier uur 's middags, met Anna's bericht voor iedereen bovenaan.</figcaption></figure>
</div>

## Berichten die aan de muur aankomen

Vast in de file? Schrijf „Begin maar aan je huiswerk, ik ben er over
20 minuten” in de huishoudchat op je telefoon, en het verschijnt op
het bord in de keuken. Dit staat **standaard uit**: het dashboard toont
nooit chat, tenzij een beheerder **Huishoudberichten tonen** aanzet.

Staat het aan, dan toont het Overzicht de drie nieuwste berichten van
de laatste zes uur, en het tabblad **Berichten** de huishoudchat van
de afgelopen dag. Tik op een bericht en de tablet leest het voor, handig
voor kinderen die nog niet kunnen lezen. Schrijf **@here** en het wordt
een banner voor iedereen; schrijf **@leo** en er verschijnt een stip op
Leo's gezicht en het bericht wacht bovenaan zijn pagina. **Begrepen**
haalt het op elke tablet weg en zet een ✅ bij het bericht in de chat,
zodat de afzender weet dat het gezien is. Bij een nieuwe vermelding
klinkt één keer een zachte toon, 's nachts nooit.

<div class="shots">
<figure class="desk"><a href="/blog/2026-10-dashboard/messages-tab.png"><img src="/blog/2026-10-dashboard/messages-tab.png" alt="Tabblad Berichten met de @here-banner bovenaan en de huishoudberichten van vandaag van Pascal, Mia, Anna en Leo, nieuwste eerst, met tijden en een NIEUW-label bij het laatste" width="1280" height="800" loading="lazy"></a><figcaption><b>Berichten</b>De huishoudchat van de afgelopen dag op één plek, voorgelezen met een tik.</figcaption></figure>
<figure class="phone"><a href="/blog/2026-10-dashboard/mention-phone.png"><img src="/blog/2026-10-dashboard/mention-phone.png" alt="Mia's pagina op een telefoon met een kaart Bericht voor jou van Anna die haar aan haar pianoboek herinnert, een knop Begrepen, daaronder Nu Muziek in lokaal 12 en Hierna Piano" width="390" height="844" loading="lazy"></a><figcaption><b>Bericht voor jou</b>Een @vermelding wacht bovenaan de pagina van die persoon.</figcaption></figure>
</div>

<details class="tech">
<summary>Onder de motorkap</summary>

Het dashboard leest de chat alleen: het maakt hem nooit aan en
verschuift niemands leesmarkering. Systeemmeldingen, locatiepins,
verwijderde berichten en berichten van verborgen personen blijven
buiten beeld, en blokkades door ouders of voogden worden gerespecteerd
(mislukt die controle, dan verschijnen er helemaal geen berichten).
Voorlezen gebruikt alleen stemmen die op de tablet zelf draaien
(`localService === true`); een tablet zonder zo'n stem toont geen 🔊,
dus tekst gaat nooit naar een cloudstem. „Begrepen” is de enige
schrijfactie van het dashboard: een ✅-reactie in `message_reactions`,
op de server opnieuw gecontroleerd en beperkt tot 30 per 5 minuten per
tablet.

</details>

## Een pagina voor iedereen, en plaatjes voor kinderen

Tik op een gezicht en je ziet de dag van die persoon: nu en hierna,
afspraken, taken, morgen en het lesrooster met wat uitvalt en wat is
verplaatst.

Kinderen die nog niet kunnen lezen krijgen in plaats daarvan een
**plaatjesweergave**: een grote wijzerklok met een gekleurde punt die
krimpt tot het volgende moment, **NU** en **HIERNA** als grote
plaatjes, de dag verdeeld in ochtend, middag, avond en nacht, en taken
als tegels om af te vinken. Kleine onderschriften helpen een volwassene
meelezen. De plaatjesweergave staat standaard aan voor beschermde
kinderaccounts, en een beheerder kan hem per persoon omzetten.

<div class="shots">
<figure class="desk"><a href="/blog/2026-10-dashboard/person-school.png"><img src="/blog/2026-10-dashboard/person-school.png" alt="Mia's pagina, gescrold naar School vandaag: Engels en wiskunde, gym doorgestreept en als uitgevallen gemarkeerd, natuurkunde, tekenen, en muziek als gewijzigd gemarkeerd en nu in lokaal 12, naast haar avondplannen en taken" width="1280" height="800" loading="lazy"></a><figcaption><b>Mia's schooldag</b>Wat uitvalt en wat is verplaatst, altijd met tekst, nooit alleen met kleur.</figcaption></figure>
<figure class="desk"><a href="/blog/2026-10-dashboard/picture-view.png"><img src="/blog/2026-10-dashboard/picture-view.png" alt="Leo's plaatjespagina met een wijzerklok, een berichttegel van Pascal met een groot vinkje, het paar Nu vrije tijd en Hierna zwemmen, berichtgezichten met korte onderschriften en zijn dag in tegels voor ochtend, middag en avond" width="1280" height="800" loading="lazy"></a><figcaption><b>Plaatjesweergave</b>Leo kan nog niet lezen, dus zijn pagina praat in plaatjes en een klok.</figcaption></figure>
</div>

## 's Nachts, en als er bezoek is

'S Nachts dimt het bord naar een klok en het eerste van morgen. Zijn
er gasten, een oppas of de schoonmaker, dan vergrendelt één tik op 🔒
de tablet op een scherm zonder iets persoonlijks: de naam van het
huishouden, de tijd en de datum. Een pincode van 4 tot 6 cijfers
ontgrendelt hem, en na vijf foute pogingen wordt de tablet afgemeld.

Sommige dingen komen nooit op de muur, slot of geen slot:
privéberichten, meldingen, polls en de locatie van afspraken. Personen
die een beheerder in het dashboard verbergt, komen er nergens op voor.

<div class="shots">
<figure class="desk"><a href="/blog/2026-10-dashboard/night.png"><img src="/blog/2026-10-dashboard/night.png" alt="Nachtweergave op een zwart scherm met 22:32, maandag 12 oktober, en Morgen 08:00 School met Leo's gezicht, plus een hint dat een tik het dashboard toont" width="1280" height="800" loading="lazy"></a><figcaption><b>'s Nachts</b>Een klok en het eerste van morgen.</figcaption></figure>
<figure class="desk"><a href="/blog/2026-10-dashboard/lock.png"><img src="/blog/2026-10-dashboard/lock.png" alt="Vergrendelscherm met alleen de naam van het huishouden, de tijd 16:32, de datum en een pincodeknop" width="1280" height="800" loading="lazy"></a><figcaption><b>Privacyslot</b>Alleen de naam van het huishouden en de tijd.</figcaption></figure>
</div>

## Instellen

Alles staat onder **Beheer › Dashboard**, in de volgorde waarin je het
nodig hebt: een huishoudwachtwoord instellen, het dashboard aanzetten,
en de tablet aanmelden door een eenmalige QR-code te scannen, zodat
niemand op de tablet hoeft te typen. Op dezelfde pagina stel je de
pincode in, het nachtvenster, de taal, welke personen verschijnen en wie
de plaatjesweergave krijgt. **Alle tablets afmelden** zit één knop
verderop.

<div class="shots">
<figure class="desk"><a href="/blog/2026-10-dashboard/admin-qr.png"><img src="/blog/2026-10-dashboard/admin-qr.png" alt="Dashboardinstellingen in de Social Home-app met het adres van de tablet, een aanmeld-QR-code die tien minuten geldig is, een knop voor een nieuwe aanmeldlink en de poort" width="1280" height="720" loading="lazy"></a><figcaption><b>Een tablet aanmelden</b>Scan de QR-code; die werkt één keer en tien minuten lang.</figcaption></figure>
</div>

<details class="tech">
<summary>Onder de motorkap</summary>

Het dashboard is een aparte, op de server gerenderde webapp op een
eigen poort (standaard `8100`), bedoeld voor je thuisnetwerk. Het
accepteert de aanmelding van de app niet, en ook geen ingress-headers
van Home Assistant. In de Home Assistant-add-on zet je de poort aan
onder **Instellingen › Apps › Social Home › Netwerk**. Het
huishoudwachtwoord wordt gehasht met scrypt; tablets krijgen een
ondertekende cookie (12 uur, of een jaar met „Houd deze tablet
aangemeld”), en alle tablets afmelden trekt alle cookies in één keer
in. Het QR-token werkt één keer, tien minuten lang, en wordt alleen als
SHA-256-hash opgeslagen. Aanmeldpogingen worden afgeremd, `Host` wordt
gecontroleerd tegen een toegestane lijst, en de pagina's hebben een
strikte CSP zonder verzoeken aan derden.

</details>

## Zones: de plekken die je huishouden kent

Een zone is een plek met een naam en een straal: thuis, school, werk,
bij oma. Is iemand erbinnen, dan ziet het huishouden die persoon daar
bij naam, op de kaart en in de ledenlijst, in plaats van als stip op
een straat.

Beheerders regelen ze onder **Beheer › Zones**. **Thuis** staat altijd
bovenaan en kan niet worden verwijderd; om het te verplaatsen markeer
je een andere zone als Thuis. Elke zone kan een emoji krijgen, uit een
tiental plekvoorbeelden of elke andere emoji, en lijsten staan op A–Z.
Deelt een telefoon een locatie zonder een zone te noemen, dan bepaalt
Social Home de zone zelf.

**Je zonenamen verlaten je thuis nooit.** Ze gaan niet naar gekoppelde
huishoudens en niet naar een space.

<div class="shots">
<figure class="desk"><a href="/blog/2026-10-dashboard/admin-zones.png"><img src="/blog/2026-10-dashboard/admin-zones.png" alt="Tabblad Beheer Zones met de kop Huishoudzones, 4 van 50 zones gebruikt, een knop Zone toevoegen en kaarten voor Home (gemarkeerd als Thuis), Gran's, School en Work met hun emoji, straal en coördinaten, naast een kaart van Zürich met de vier zonecirkels" width="1280" height="820" loading="lazy"></a><figcaption><b>Beheer › Zones</b>Thuis bovenaan, elke plek met een eigen emoji.</figcaption></figure>
<figure class="desk"><a href="/blog/2026-10-dashboard/zone-icon.png"><img src="/blog/2026-10-dashboard/zone-icon.png" alt="Dialoog Zone bewerken met de naam Home, een rij plekpictogrammen met het huis geselecteerd, de opties Geen pictogram en Andere emoji, een rij kleuren en een straalschuif op 150 m" width="1280" height="720" loading="lazy"></a><figcaption><b>Zone bewerken</b>Plekvoorbeelden, geen pictogram, of elke andere emoji.</figcaption></figure>
</div>

**Heb je al zones in Home Assistant?** Als je Social Home via Home
Assistant hebt geïnstalleerd, kan het die overnemen: zet **Zones
synchroniseren vanuit Home Assistant** aan, en de zones verschijnen in
de lijst, gemarkeerd met _Vanuit Home Assistant_ en altijd bijgewerkt.
Die bewerk je in Home Assistant; zones die je in Social Home toevoegt,
blijven van jou. Uitzetten vraagt eerst om bevestiging en verwijdert
dan alleen de gesynchroniseerde zones. En als Home Assistant net
herstart of onbereikbaar is, wordt er niets verwijderd.

Spaces hebben al een tijdje hun eigen zones; die krijgen nu dezelfde
emoji-pictogrammen.

<details class="tech">
<summary>Onder de motorkap</summary>

Huishoudzones staan in een puur lokale tabel `household_zones` die
nooit wordt gefedereerd: tot 50 zones, een straal van 25 m tot 50 km
en hooguit één Thuis-zone. Een protocoltest controleert dat een
huishoudzonenaam nooit opduikt in de federatie-fan-out, in
WebSocket-frames van een space of in `GET /api/spaces/{id}/presence`.
Een gedeeld GPS-punt wordt alleen aan een zone gekoppeld als de app
zelf geen zone noemde, zodat Home Assistant leidend blijft voor wie in
welke zone is.

De synchronisatie leest `zone.*` uit `GET /api/states` van Home
Assistant, bij het opstarten en elke 5 minuten: passieve zones worden
overgeslagen, `zone.home` wordt Thuis, en `mdi:`-pictogrammen worden
emoji. Een antwoord zonder `zone.home` betekent dat Home Assistant nog
opstart, dus die ronde wordt overgeslagen. Pictogrammen van spacezones
reizen mee als optioneel veld `icon`; oudere huishoudens negeren het
gewoon.

</details>

## Een kaart die leest als een lijst

De kaart in de app is opnieuw gemaakt, in de stijl van de nieuwe kaart
van Home Assistant. Personen zijn fotomarkers in hun eigen kleur.
Iedereen in dezelfde zone deelt één bel bij de zone, met maximaal drie
gezichten en een „+N”; bellen dicht bij elkaar smelten samen als je
uitzoomt. Elke zone toont haar emoji in het midden.

Naast de kaart zegt een paneel **Personen** en **Zones** het in
woorden: kies een persoon om naar die persoon te zoomen en de zone en
laatste update te zien, of kies een zone om te zien wie er nu is. Op
een telefoon is het paneel een blad dat je omhoog trekt. Social Home
bewaart geen locatiegeschiedenis. Het weet alleen waar iemand nu is.

<div class="shots">
<figure class="desk"><a href="/blog/2026-10-dashboard/presence-map.png"><img src="/blog/2026-10-dashboard/presence-map.png" alt="Aanwezigheidspagina met een kaart van Zürich: bellen voor Mia op school, Leo en Pascal samen in de Thuis-bel en Anna alleen, zonepins voor Gran's en Work, en een paneel Personen en Zones met de zone en laatste update van elke persoon" width="1280" height="720" loading="lazy"></a><figcaption><b>Aanwezigheid</b>De kaart en een personenlijst naast elkaar.</figcaption></figure>
<figure class="phone"><a href="/blog/2026-10-dashboard/presence-phone.png"><img src="/blog/2026-10-dashboard/presence-phone.png" alt="Aanwezigheidspagina op een telefoon met de kaart gericht op Mia's bel bij de schoolpin en een blad onderaan met haar gegevens: Waar School, Laatste update 27 min geleden, Activiteit offline" width="390" height="844" loading="lazy"></a><figcaption><b>Op een telefoon</b>Tik op Mia en zie waar ze is en wanneer ze voor het laatst bijwerkte.</figcaption></figure>
</div>

Dezelfde markers staan op de kaart van een space. In een space die
alleen zones deelt, verschijnen leden in het midden van een zone die
de space heeft vastgelegd, nooit op hun echte positie.

<div class="shots">
<figure class="desk"><a href="/blog/2026-10-dashboard/space-zone-only.png"><img src="/blog/2026-10-dashboard/space-zone-only.png" alt="Kaarttabblad van een space met een melding dat alleen de zonenaam wordt gedeeld, nooit je exacte positie, ledenbellen in het midden van de zones Home en School met een +2-chip, en daaronder de lijst met zones en leden" width="1280" height="720" loading="lazy"></a><figcaption><b>Kaart van een space, alleen zones</b>Gezichten bij de zone, nooit een positie.</figcaption></figure>
</div>

## Wie waar is, aan de muur

Dit alles komt samen op het keukenbord: een tabblad **Kaart** naast
Overzicht, Berichten en Notities. Gezichten verzamelen zich in de bel
van hun zone, en een lijst **Wie is waar** ernaast leest in één
oogopslag: „Leo, Thuis, 36 min geleden”. Tik op een persoon en de kaart
zoomt in en laat zien hoe vers de locatie is; **Iedereen tonen** of
een minuut zonder aanraking haalt het hele gezin terug.

Het tabblad verschijnt alleen zolang iemand in het huishouden de
afgelopen dag een locatie heeft gedeeld. Een locatie ouder dan een uur
vervaagt en toont „laatst gezien”; na een dag valt de persoon weg.
Onder het privacyslot en 's nachts is de kaart verborgen, net als al
het andere.

<div class="shots">
<figure class="desk"><a href="/blog/2026-10-dashboard/wall-map.png"><img src="/blog/2026-10-dashboard/wall-map.png" alt="Kaarttabblad op de wandtablet om 16:11 boven een stadsplattegrond van Zürich, met fotobellen voor Mia boven de schoolzone, Leo en Pascal samen boven Thuis en Anna alleen tussen Thuis en Werk, zonepins voor Gran's en Work, en rechts een lijst Wie is waar" width="1280" height="800" loading="lazy"></a><figcaption><b>Het tabblad Kaart</b>Leo en Pascal delen de Thuis-bel, Mia is op school, Anna is onderweg.</figcaption></figure>
<figure class="desk"><a href="/blog/2026-10-dashboard/wall-map-callout.png"><img src="/blog/2026-10-dashboard/wall-map-callout.png" alt="Kaarttabblad ingezoomd op de schoolzone, met Mia's foto boven de schoolpin, een label Mia, School, 27 min geleden, een knop Iedereen tonen en Mia's rij gemarkeerd in de lijst Wie is waar" width="1280" height="800" loading="lazy"></a><figcaption><b>Eén tik op Mia</b>De kaart zoomt naar de school en laat zien hoe vers haar locatie is.</figcaption></figure>
<figure class="phone"><a href="/blog/2026-10-dashboard/wall-map-phone.png"><img src="/blog/2026-10-dashboard/wall-map-phone.png" alt="Kaarttabblad op een telefoon met één gecombineerde bel met de gezichten van Leo, Pascal en Mia plus +1, met als onderschrift Thuis, School, Onderweg, boven de kaart met zonepins, en daaronder een lijst Wie is waar in twee kolommen" width="390" height="844" loading="lazy"></a><figcaption><b>Op een telefoon</b>De plekken liggen dichter bij elkaar, dus smelten hun bellen samen.</figcaption></figure>
</div>

<details class="tech">
<summary>Onder de motorkap</summary>

De wandkaart toont posities afgerond op ongeveer 11 m (4 decimalen),
net als de app, en alleen op het eigen dashboard van het huishouden.
Kaarttegels komen via je eigen server op `/tiles/{z}/{x}/{y}`, dus de
tablet doet geen verzoeken naar buiten. Tegels vereisen een
dashboardsessie (401 zonder, 423 als hij vergrendeld is) en worden
`private, no-cache` geleverd, zodat een vergrendelde tablet geen
tegels uit de cache kan tonen. Er draait geen kaartbibliotheek op de
tablet: een klein script legt het tegelraster neer en probeert
mislukte tegels opnieuw met een oplopende wachttijd, van 30 s tot 10
minuten.

</details>

## Wat hierna komt: het dashboard op ESPHome

Een tablet is niet het enige scherm dat aan een muur past. Hierna
werken we aan een **ESPHome**-versie van het dashboard, zodat het
huishoudbord ook op een ESPHome-apparaat kan draaien.

## Probeer het

Het huishouddashboard en de zones zitten in **Social Home 2026.10.13**.
Zet het dashboard aan onder **Beheer › Dashboard**, stel je plekken in
onder **Beheer › Zones**, en hang die oude tablet weer aan de muur.
