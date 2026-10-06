---
title: Woorden die we gebruiken
description: Het dozijn woorden dat overal in Social Home terugkomt — huishouden, space, bereik, host, GFS, koppelen en de rest — elk uitgelegd in één alinea.
order: 5
---

Social Home probeert in de app, in deze docs en in de code
dezelfde woorden te gebruiken. Deze pagina is de korte lijst. Kom
je op een docpagina een term tegen die je niet kent, dan staat die
vrijwel zeker hier — en het technische detail op elke pagina zit
in een inklapbaar blok „Onder de motorkap” dat je naar wens kunt
overslaan of openen.

## Huishouden

Een huishouden is één huis waar Social Home draait — één server,
meestal geïnstalleerd als Home Assistant add-on — en de mensen die
erachter wonen — jij, je partner, de kinderen, de huisgenoot.
Alles wat een huishouden doet (de boodschappenlijst, de agenda, de
foto's, de chat) wordt opgeslagen op die ene server. Als deze docs
„je huishouden” zeggen, bedoelen ze je server en iedereen met een
account erop.

<details class="tech">
<summary>Onder de motorkap</summary>

De code en de protocolspec noemen een huishouden een _instance_.
De twee leesbare adresvelden op elke envelop, `from_instance` en
`to_instance`, zijn huishoud-id's.

</details>

## Koppelen

Koppelen is hoe twee huishoudens elkaar leren kennen: je scant een
QR-code (of leest een korte code hardop voor over de telefoon), en
vanaf dat moment kunnen jouw huis en het hunne privéberichten
uitwisselen en spaces delen. Koppelen gebeurt één keer per paar
huishoudens, en beide kanten kunnen de koppeling later weer
verwijderen onder **Instellingen → Verbindingen**.

<details class="tech">
<summary>Onder de motorkap</summary>

Koppelen is een X25519-sleutelovereenkomst met
HKDF-SHA256-sleutelafleiding; de uitgesproken code beschermt de
uitwisseling tegen kaping. De langetermijnidentiteit van elk
huishouden is een Ed25519-ondertekeningssleutel.

</details>

## Space

Een space is een gedeelde ruimte voor elke groep mensen, verspreid
over een willekeurig aantal huishoudens: de familie, het
appartementencomplex, de leesclub. Een space heeft een feed, een
chat en een agenda, en de leden bepalen samen wie er verder in mag.

## Bereik

Het bereik (scope) van een space bepaalt wie hem kan vinden en wie
erin kan plaatsen. Er zijn er vier, elk met een breder publiek dan
de vorige:

- **Privé** — leden die je uitdrukkelijk uitnodigt.
- **Huishouden** — de leden van je eigen huishouden.
- **Openbaar** — staat op de kaart van een
  [GFS](#gfs) waarmee je verbonden bent, zodat iedereen op die GFS
  hem kan vinden.
- **Wereldwijd** — overal ter wereld gepubliceerd via je GFS.

Openbare en wereldwijde spaces lopen via een GFS; privé en
huishoudspaces niet, tenzij de eigenaar van een privé space de GFS
ervoor inschakelt (standaard staat die uit). Het bereik van een
space veranderen is een beslissing van al zijn beheerders — zie
[Wereldwijde spaces](/nl/docs/global-spaces/#grote-veranderingen-vragen-een-stemming).

## Host

Elke space heeft een host-huishouden: het huishouden dat hem
aanmaakte en de stemmen van de beheerders telt. De host is geen
tussenpersoon — leden plaatsen rechtstreeks naar elkaar — maar het
is wel de plek waar de ledenlijst woont.

## GFS

Een GFS is een **Global Federation Server** — de wereldwijde
federatieserver: de relay die huishoudens helpt elkaar te vinden
als ze elkaar nog niet kennen, en die de verzegelde berichten van
openbare en wereldwijde spaces draagt. Het Social Home-project
draait er een; iedereen kan
[er zelf een draaien](/nl/docs/running-a-gfs/). Een GFS ziet
verzegelde enveloppen en routeringsinformatie, nooit de inhoud van
een bericht. Wat hij wel en niet kan zien staat uitgeschreven op
de pagina [Beveiligingsmodel](/nl/docs/security/#wat-een-relay-ziet).

## GFS-link en Lokale link

Beide zijn uitnodigingslinks naar een space. Een **GFS-link** werkt
voor iedereen — wie hem opent hoeft niet met je gekoppeld te zijn,
want de GFS zorgt voor de kennismaking. Een **Lokale link** werkt
alleen voor huishoudens waarmee je al verbonden bent, en raakt
nooit een GFS aan.

## Volger

Een volger is iemand die een space leest zonder er lid van te
zijn. Volgers zien wat de space publiceert, maar ze plaatsen niets
en ze hebben geen stem. De lidmaatschapsrollen lopen van
eigenaar → beheerder → moderator → lid → volger.

## Sleutelrotatie (epoche)

Elke space heeft een sleutel die zijn berichten verzegelt. Telkens
als het ledenbestand verandert — iemand komt erbij, iemand
vertrekt, iemand wordt verwijderd — krijgt de space een nieuwe
sleutel en begint een nieuwe _epoche_. Wie vertrokken is, kan
niets lezen wat na zijn vertrek is geplaatst.

<details class="tech">
<summary>Onder de motorkap</summary>

Space-inhoud wordt verzegeld met een AES-256-GCM-sleutel per
epoche; het epochenummer is een van de weinige leesbare velden op
een envelop, zodat een lid weet welke sleutel het moet gebruiken.
De autoriteitssleutel van de space roteert apart telkens als een
beheerder wordt ingetrokken.

</details>

## Verzegelde envelop

Een verzegelde envelop is wat er werkelijk tussen huishoudens
reist. Het bericht, de foto of de agenda-afspraak erin wordt
versleuteld voordat het je huis verlaat en pas in het ontvangende
huis ontsleuteld; de buitenkant van de envelop draagt net genoeg
om hem te bezorgen. Niets verlaat ooit een huishouden onverzegeld
— als een space niet kan verzegelen, verstuurt hij niet.

<details class="tech">
<summary>Onder de motorkap</summary>

Enveloppen zijn AES-256-GCM, ondertekend met Ed25519. De enige
leesbare velden zijn `event_type`, `from_instance`, `to_instance`,
`space_id` en `epoch`.

</details>

## Mesh

Als twee lid-huishoudens elkaar niet rechtstreeks kunnen bereiken,
kan een bericht via de servers van andere leden hoppen om er te
komen. Elke hop is verzegeld voor de uiteindelijke ontvanger, dus
de huishoudens ertussen dragen de envelop maar kunnen hem niet
openen.

<details class="tech">
<summary>Onder de motorkap</summary>

`SPACE_ROUTED`-doorsturen, hoogstens drie hops, verzegeld voor een
kortstondige X25519-sleutel van de ontvanger.

</details>

## Relay en TURN

Een relay is elke server die verzegelde enveloppen tussen
huishoudens doorgeeft zonder ze te kunnen lezen; in Social Home is
dat de GFS. Een **TURN**-server is een ander soort relay, die
alleen voor spraak- en videogesprekken wordt gebruikt, en alleen
wanneer een rechtstreekse verbinding tussen de twee telefoons niet
tot stand komt. Die geeft de versleutelde media door en ziet
verder niets.
