---
title: "Een nieuwe GFS: elk lid gelijk, en de GFS weet minder"
description: Echte huishoudens lieten ons zien waar de GFS beter kon, dus hebben we de werking ervan opnieuw ontworpen. Elk huishouden krijgt een eigen anonieme brievenbus, elk lid bereikt elk ander lid, posten is altijd anoniem, beheerders kunnen een space draaiende houden zonder de eigenaar, en je kunt vragen om lid te worden van een wereldwijde space zonder te koppelen. In Social Home 2026.11.19.
date: 2026-11-20
author: Het Social Home-team
order: 50
---

De [GFS (Global Federation Server)](/nl/docs/glossary/#gfs) is de
relay die huishoudens helpt elkaar te vinden. Hij brengt ook een
[space](/nl/docs/glossary/#space) naar huishoudens waarmee je niet
gekoppeld bent: de volgers van een wereldwijde space, en leden die
via een **GFS-link** zijn toegetreden.

De afgelopen weken hebben veel huishoudens de GFS in het dagelijks
leven gebruikt: familiespaces met opa en oma in een andere stad,
clubs met tientallen leden, wereldwijde spaces met volgers overal
vandaan. Daar hebben we drie dingen van geleerd:

- **Elk lid hoort gelijk te zijn**, hoe zijn huishouden de space ook
  bereikt. Lid worden via een GFS-link moet je dezelfde space geven
  als gekoppeld zijn met de host.
- **Een space hoort niet op zijn eigenaar te wachten.** Als het huis
  van de eigenaar aan het updaten is of offline is, moeten de leden
  elkaar nog steeds bereiken, en moeten beheerders de space nog
  steeds kunnen draaien.
- **De GFS hoort zo weinig mogelijk te weten.** Niet wat er gepost
  wordt, en niet wie het postte. Liefst zelfs niet bij welk
  huishouden hij bezorgt.

Dus zijn we terug naar de tekentafel gegaan en hebben we opnieuw
bepaald hoe een GFS werkt. Het resultaat zit in **Social Home
2026.11.19**. Je posts zijn nog steeds verzegeld van jouw huis tot het
hunne, en de GFS kan er nog steeds geen enkele van lezen.

## Elk huishouden krijgt een anonieme brievenbus

Zit je huishouden via een GFS in een space, dan krijgt het één
**anonieme brievenbus** op die GFS. De host en elk ander lid gooien
er verzegelde berichten in, en je huis haalt ze op. De GFS kent een
brievenbus alleen aan een willekeurig ogend nummer. Hij weet niet
welk huishouden de brievenbus heeft, bij welke spaces hij hoort of
wat er in de berichten staat.

Om een brievenbus te openen, geeft je huis een **ticket** uit. Het
haalt elke dag een klein stapeltje tickets op, en die zijn zo
gemaakt dat de GFS niet kan zien welk huishouden er een uitgaf. Zo
blijft een drukke GFS eerlijk, zonder dat de GFS te weten komt wie
er achter elke brievenbus zit.

Je hoeft hier niets voor te doen. Er is geen instelling, en niets in
de app heet brievenbus. Het werkt gewoon.

<details class="tech">
<summary>Onder de motorkap</summary>

Eén brievenbus per huishouden per GFS, gedeeld door al zijn spaces
daar. De sleutels komen met HKDF-SHA256 uit een brievenbus-root van
32 bytes: een X25519-sleutel om naar te verzegelen en een
Ed25519-sleutel om mee te claimen. Het brievenbus-id is
`base32(SHA-256("sh-mbx-v1" ‖ sign_pk))`. Het space-id doet niet mee
in de afleiding, en twee GFS'en zien brievenbussen die niets met
elkaar te maken hebben. Je huishouden kondigt zijn brievenbus aan op
een **ledenkaart** die met zijn identiteitssleutel is ondertekend,
dus een host kan een kaart laten vallen maar er nooit een vervalsen.
Een huishouden accepteert alleen brievenbusberichten van leden van
wie het de kaart heeft.

Registratie (`POST /gfs/mailbox/register`) is anoniem, met bewijs
van bezit. De claim-socket (`/gfs/mailbox/ws`) staat los van de eigen
socket van het huishouden. De GFS slaat het brievenbus-id op, de
vastgepinde sleutel ervan en twee op de dag afgeronde tijdstempels.
Hij slaat geen huishoud-id, adres of space op. Tickets zijn Privacy
Pass-tokens (RFC 9576–9578, blind RSA-2048, RFC 9474), maximaal 50
per huishouden per dag, met één uitgeverssleutel per 30 dagen. Een
ticket verbergt zijn huishouden tussen alle huishoudens die onder
dezelfde sleutel tickets ophaalden.

</details>

## Elk lid bereikt elk lid

Met een brievenbus voor elk huishouden hoeven leden niet meer via de
host om elkaar te bereiken:

- **Posts komen aan terwijl de host offline is.** Elk lid bezorgt
  rechtstreeks bij de anderen, ook in privéspaces.
- **Foto's en lange pagina's komen in één stuk aan.** Huishoudens
  achter een GFS krijgen dezelfde foto's en dezelfde lange pagina's
  als gekoppelde huishoudens.
- **Eén upload, hoeveel leden er ook zijn.** Een agenda-afspraak voor
  200 huishoudens achter dezelfde GFS gaat één keer omhoog, niet 200
  keer.
- **Gaten vullen zichzelf.** Antwoordt de host niet, dan vraagt je
  huis het aan het huishouden van een beheerder of moderator. Een
  oudere foto die je nooit kreeg, wordt opgehaald als je hem opent.
  Een nieuw lid krijgt meteen de laatste 30 dagen.
- **Reacties verschijnen in elk huishouden.** Je kunt tot vijf
  reacties op een post achterlaten, en iedereen ziet dezelfde.

<details class="tech">
<summary>Onder de motorkap</summary>

Een space-update voor veel brievenbussen wordt één keer verzegeld met
een verse AES-256-GCM-sleutel, en die sleutel wordt voor elke
ontvanger ingepakt met X25519 + HKDF (`POST /gfs/envelope/multi`, tot
500 ontvangers). Voor 200 huishoudens is dat één upload van 51 KB in
plaats van 1,13 MB. Items boven de envelop van ~191 KiB reizen als
binaire frames, opgevuld tot 64/128/256/516 KiB, en foto's gaan in
volle stukken van 512 KiB.

Herstel: blijft de host tijdens een synchronisatie 120 s stil, dan
vraagt het lid één helper (een huishouden van een beheerder of
moderator). Een ontbrekende foto wordt eerst aan de host gevraagd en
na 60 s aan een helper; elk bestand wordt tegen zijn hash
gecontroleerd. De ledenlijst wordt hersteld via een digest
(`rd1-sha256`) in plaats van op een timer opnieuw te worden
verstuurd. Een lid van wie het huis niet met de GFS verbonden is,
wordt via de host bereikt, het enige geval waarin de host nog online
moet zijn.

</details>

## Posten is altijd anoniem

Als een lid via de GFS post, kan de GFS niet zien van welk huishouden
het kwam, en zelfs niet welke huishoudens mogen schrijven. Zo werkt
elke space, zonder dat je iets hoeft in te stellen.

<details class="tech">
<summary>Onder de motorkap</summary>

Elk lid publiceert met `POST /gfs/member-publish-anon`, geautoriseerd
door een schrijfsleutel die per sleutelepoche wordt gedeeld. Het
buitenste type is altijd `space_item`, opgevuld tot
1/4/16/64/128 KiB binnen de AEAD. Het schrijverscertificaat van het
lid reist alleen mee in de ciphertext, waar de ontvangende
huishoudens het controleren. Schrijvers abonneren zich in dezelfde
geschudde batch als volgers.

</details>

## Beheerders kunnen de space draaiende houden

Eigenaars van een space kunnen nu **Beheerders mogen namens mij
handelen** aanzetten. Je beheerders uit andere huishoudens kunnen dan
modereren, uitnodigen en publiceren terwijl jouw huis offline is, ook
beheerders die de space alleen via een GFS bereiken. Het staat
standaard uit.

Voordat je een huishouden beheerder maakt, toont de app zijn
**Huishoud-ID**. Vraag hen het hunne voor te lezen van hun pagina
**Verbindingen**, zodat je weet dat zij het echt zijn. Verwijder je
een beheerder, dan werkt diens sleutel niet meer op elke GFS waarop
de space ooit vermeld stond.

<details class="tech">
<summary>Onder de motorkap</summary>

Met de schakelaar aan krijgt elk huishouden van een beheerder de
Ed25519-ondertekeningsseed van de space, verzegeld voor dat
huishouden. Richting de GFS ziet een beheerder eruit als elke andere
schrijver: de GFS kan te weten komen dat een space gedelegeerde
beheerders heeft, niet welk huishouden het is. Een beheerder
verwijderen roteert de sleutel van de space op elke GFS, ook op
GFS'en waarvan de vermelding is ingetrokken, en de wijziging wordt
bevestigd en opnieuw geprobeerd tot elke GFS hem heeft. Elke
vermelding is ondertekend voor één GFS, dus een GFS kan hem niet bij
een andere opnieuw afspelen.

</details>

## Vraag om lid te worden van een wereldwijde space zonder te koppelen

Zie je op je GFS een wereldwijde space die je leuk vindt? Je kunt nu
meteen vragen om lid te worden, zonder eerst met de host te koppelen.
De eigenaar ziet je verzoek gemarkeerd met **Via de GFS · niet
gecontroleerd**, omdat de naam die je stuurt is wat jij hebt
getypt, niet iets wat iemand heeft gecontroleerd. Stapelen de
verzoeken zich op, dan kan de eigenaar ze allemaal tegelijk afwijzen.

## Volgers zijn leden die lezen

Een volger is nu gewoon een lid met een alleen-lezenrol. Volgers
krijgen dezelfde posts op dezelfde manier, en de eigenaar bepaalt met
twee schakelaars of volgers mogen reageren of emoji-reacties mogen
geven. Stemmen in peilingen blijft bij de leden; volgers zien de
uitslag.

## Wat de GFS nog wel ziet

We zeggen het je liever gewoon:

- **Welke brievenbussen een space-update krijgen.** Als een lid één
  update tegelijk naar veel brievenbussen stuurt, ziet de GFS die
  lijst met brievenbussen, maar niet de space, de huishoudens of de
  inhoud.
- **Wie een wereldwijde space volgt.** Volgers abonneren zich op de
  GFS op de space, en schrijvers gaan tussen hen op.
- **Welke huishoudens meedoen in een privéspace** die de eigenaar met
  de GFS heeft verbonden. Nooit de naam, de sleutel of de posts van
  de space.
- **Netwerkadressen.** Een GFS die adressen logde, zou een
  brievenbus in verband kunnen brengen met een huishouden dat vanaf
  hetzelfde adres verbinding maakt. De GFS van Social Home logt geen
  adressen. [Draai je zelf een GFS](/nl/docs/running-a-gfs/), houd
  het dan zo.

## Probeer het

Alles in deze post zit in **Social Home 2026.11.19**. Update je huis,
en de nieuwe GFS doet de rest. Wil je de details? Lees
[Wereldwijde spaces](/nl/docs/global-spaces/) en
[Privacymodel](/nl/docs/privacy/).
