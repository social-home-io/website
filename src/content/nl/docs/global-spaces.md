---
title: Wereldwijde spaces
description: Ruimtes voor huishoudens die elkaar nog niet kennen – de vier soorten space, de relay die wereldwijde spaces draagt (een die je vertrouwt, of een die je zelf draait) en wat die wel en niet kan zien.
order: 40
---

De meeste spaces in Social Home worden gedeeld tussen huishoudens
die je al kent: de familie, de buren met wie je gekoppeld bent.
Maar sommige communities zijn van nature open: een
buurtmarktplaats, een hardloopclub voor de hele stad, een
leesclub voor boeken uit het publieke domein. Daarvoor heeft
Social Home **wereldwijde spaces**, en een kleine relay – de GFS
(Global Federation Server – de wereldwijde federatieserver) – die
huishoudens die elkaar nooit ontmoet hebben helpt elkaar te
vinden. (Nieuw woord? Zie [GFS](/nl/docs/glossary/#gfs) in de
woordenlijst.)

## Vier soorten space

Elke soort reikt een stukje verder dan de vorige:

| Soort          | Wie kan hem vinden                                    | Ziet de GFS hem?                                                |
| -------------- | ----------------------------------------------------- | --------------------------------------------------------------- |
| **Privé**      | Alleen mensen die je uitnodigt                        | Nee, tenzij de eigenaar de GFS ervoor inschakelt                |
| **Huishouden** | Iedereen in je huis, automatisch                      | Nee                                                             |
| **Openbaar**   | Je gekoppelde huishoudens, onder **Ruimtes bekijken** | Nee, tenzij een beheerder hem met de hand op een GFS publiceert |
| **Wereldwijd** | Iedereen wiens huis met dezelfde GFS is verbonden     | **Ja**, hij staat op elke GFS die je gebruikt                   |

Eén regel maakt de rest makkelijk: **huishoudens waarmee je
gekoppeld bent, hebben de GFS niet nodig.** Posts bereiken ze
rechtstreeks, of via de mesh van huishoudens die jullie allebei
kennen, wat voor space het ook is. De GFS komt alleen in beeld
voor huishoudens waarmee je _niet_ gekoppeld bent (of als
terugvaloptie, als je die voor een verbinding hebt aangezet en
de directe weg uitvalt).

Een **openbare** space blijft dus binnen je eigen kring: het is
een space die je gekoppelde huishoudens kunnen vinden en waar ze
om toegang kunnen vragen, niet een die de hele wereld ziet. Een
**wereldwijde** space is die voor onbekenden. De rest van deze
pagina gaat over wereldwijde spaces.

## Grote veranderingen vragen een stemming

Twee acties zijn te ingrijpend om door één persoon alleen te
laten doen: **een space opheffen** en **het bereik wijzigen** –
in beide richtingen, breder of smaller. Heeft een space meer dan
één beheerder, dan wordt elk van die acties een _voorstel_ in
plaats van meteen te gebeuren.

- Elke beheerder kan het voorstel openen; de anderen stemmen ja
  of nee.
- Het wordt uitgevoerd zodra **meer dan de helft** van de
  beheerders instemt – de eigenaar telt als beheerder, net als
  iedereen.
- Eén _nee_ annuleert het. Wachten ook: een voorstel vervalt na
  zeven dagen als het nooit een meerderheid haalt.

Een space met maar één beheerder handelt nog steeds meteen – een
meerderheid van één. Maar zodra een tweede beheerder erbij komt,
kan niemand in zijn eentje de space opheffen of veranderen wie
hem ziet. Beheerders in gekoppelde huishoudens stemmen ook mee;
de host telt iedereen op en alleen het goedgekeurde resultaat
gaat naar buiten.

## Wie doet wat in een space

Elke space heeft een eigenaar, en de eigenaar kan rollen
uitdelen. Van de meeste naar de minste macht: **eigenaar**,
**beheerder**, **moderator**, **lid**, **volger**. Een volger
leest wel, maar plaatst niets.

Elke functie in een space – posten, de agenda, de marktplaats –
kan **open** zijn voor elk lid, **beoordeeld** (de bijdrage van
een lid wacht in een wachtrij tot een moderator of beheerder hem
goedkeurt) of **alleen beheerders**. Beoordeelde items waar
niemand naar kijkt, vervallen na zeven dagen.

## Wat de GFS doet voor een wereldwijde space

Een GFS is een relay waarmee elk huishouden verbinding kan maken.
Voor een wereldwijde space heeft hij twee taken:

1. **Hij is een gids.** Hij toont de wereldwijde spaces die erop
   zijn gepubliceerd, wie ze host, hoe je lid wordt en, als de
   space er een heeft, een speld op de kaart, afgerond op
   ongeveer 11 m. Iedereen die met die GFS is verbonden, vindt ze
   onder **Ruimtes bekijken**.
2. **Hij brengt posts naar wie je niet gekoppeld bent.** Dat zijn
   **volgers**, huishoudens die meelezen zonder lid te worden
   (alleen als de eigenaar volgers toestaat; standaard staat dat
   uit), en **leden die via een GFS-link zijn toegetreden**. Leden
   met wie je gekoppeld bent, krijgen elke post nog steeds
   rechtstreeks of via de mesh.

De relay ziet nooit de _inhoud_ van je posts. Elke post wordt
verzegeld als hij je huis verlaat en pas weer geopend in het
huis van elke ontvanger. De envelop wordt opgevuld tot een van
een paar vaste groottes, zodat de relay niet eens een kort
bericht van een lang kan onderscheiden. Hij slaat geen inhoud op:
is een huishouden offline, dan houdt hij diens verzegelde
enveloppen een dag vast en laat ze daarna los.

> Zie de relay als het postkantoor van een open community. Het
> postkantoor ziet dat er een verzegeld pakket naar de leesclub
> ging, en ongeveer hoe zwaar het was – maar alleen de leden
> hebben een sleutel om het te openen.

<details class="tech">
<summary>Onder de motorkap</summary>

`PUBLIC_SPACE_TIERS = {public, global}`: alleen die twee mogen
ooit inhoud naar een GFS doorgeven. Een wereldwijde space wordt
op elke GFS gepubliceerd waarmee het huishouden verbonden is
zodra hij wereldwijd wordt, en van al die GFS'en teruggetrokken
zodra hij dat niet meer is. Een openbare space bereikt gekoppelde
huishoudens als een `SPACE_DIRECTORY_SYNC`-snapshot (naam,
omschrijving, emoji, aantal leden, toetredingsmodus), nooit via
een GFS; een GFS bereikt hij alleen via de knop om met de hand te
publiceren, en hij wordt weer teruggetrokken als hij privé of
huishouden wordt. Volgers vereisen `allow_subscribers` aan
(standaard uit). Leden ontvangen posts altijd via de gewone
verspreiding naar leden, rechtstreeks of via de mesh, los van de
GFS. Enveloppen zijn AES-256-GCM, ondertekend met Ed25519.
Paddingbuckets: 1 / 4 / 16 / 64 / 128 KiB (publicatie door
leden), plus 191 KiB voor envelop-relay. Offline ontvangers
worden 24 uur in de wachtrij gehouden, met maximaal 2000
enveloppen of 64 MiB per ontvanger. Alle details op de pagina
[beveiligingsmodel](/nl/docs/security/#wat-een-relay-ziet).

</details>

## Vertrouwd of strikt

Voor de posts die wel via de GFS gaan, draait een space standaard
in de **vertrouwde** modus (trusted): de relay leert welk
huishouden in welke space heeft gepost, en wanneer – maar nooit
wat. Voor communities waarvoor zelfs dat te
veel is, kan de eigenaar van de space overschakelen naar de
**strikte** modus (strict): posts gaan naar buiten zonder enige
afzender erop, en de relay weet alleen dat _iemand_ in de space
heeft gepost.

<details class="tech">
<summary>Onder de motorkap</summary>

Twee paden bereiken de GFS. Als het host-huishouden een post
doorgeeft, is het verzoek identiteitsvrij –
`{space_id, event_type, payload}` op een sessie zonder cookies –
en wordt het alleen gestuurd naar een GFS die heeft bewezen
`anonymous_publish` te ondersteunen. Als een lid voor zichzelf
publiceert, ondertekent de vertrouwde modus het verzoek met de
sleutel van dat huishouden (zodat de GFS leert wie heeft
gepost); de strikte modus ondertekent het met een gedeelde
schrijfsleutel per epoche, afgeleid van de space-seed, zodat de
GFS leden niet van elkaar kan onderscheiden. Een gewone
ledensynchronisatie vertelt de GFS niets. In beide modi ziet de
GFS nog steeds het bron-IP, de timing, de groottebucket en de
abonneeset.

</details>

## Hoe vinden en lid worden werken

1. Een huishouden maakt een space **wereldwijd**. Zijn huis
   publiceert de naam, omschrijving, omslagfoto, het
   leeftijdsbeleid en de accentkleur op elke GFS waarmee het
   verbonden is: genoeg om hem te tonen, maar **geen
   berichtinhoud**.
2. Iedereen wiens huis met diezelfde GFS is verbonden, kan hem
   vinden onder **Ruimtes bekijken** en vragen om lid te worden,
   of hem volgen als de eigenaar volgers toestaat.
3. Of een toetreding wordt toegestaan, hangt af van de
   **toetredingsmodus** van de space: **Open** (iedereen kan
   meteen lid worden), **Aanvragen** (een beheerder zegt ja) of
   **Alleen op uitnodiging**. Uitnodigingslinks werken naast elk
   daarvan.
4. Zodra je binnen bent, reizen posts van jouw huis naar het huis
   van elk ander lid: rechtstreeks of via de mesh voor
   huishoudens waarmee je gekoppeld bent, via de GFS voor volgers
   en leden die via een GFS-link zijn toegetreden.

## Twee soorten uitnodigingslink

- Een **GFS-link** werkt voor iedereen. Wie hem opent, hoeft niet
  met jou gekoppeld te zijn – de GFS regelt de kennismaking.
  Behandel hem als een sleutel: wie hem heeft, kan binnen.
- Een **Lokale link** werkt alleen voor huishoudens waarmee je al
  verbonden bent, en komt nooit bij een GFS. Gebruik hem voor de
  familiespace of de drie buren die je al kent.

## Versleuteling staat altijd aan

Elke post in elke space – openbaar, wereldwijd of privé – is
onderweg **altijd** verzegeld. Er is in Social Home geen
schakelaar "versleuteld / niet versleuteld", en geen terugval op
onversleuteld verzenden: kan een space niet verzegelen, dan
verstuurt hij niet.

Wat dat in de praktijk betekent:

- De relay kan je berichten, foto's of spraakmemo's niet lezen –
  ook niet als de beheerder ervan dat zou willen. Hij ziet
  alleen de verzegelde envelop.
- Een nieuw lid dat later toetreedt, ontvangt alleen berichten
  die na het toetreden zijn geplaatst. Eerdere geschiedenis
  wordt niet met terugwerkende kracht gedeeld – leden regelen
  hun eigen back-ups lokaal.
- Elke keer dat het ledenbestand verandert, krijgt de space een
  nieuwe sleutel. Wie is vertrokken, kan niets lezen wat na het
  vertrek is geplaatst.

## Wat gebeurt er als de relay uitvalt?

Leden met wie je gekoppeld bent, merken niets: hun posts gingen
nooit via de GFS. Volgers en leden die via een GFS-link zijn
toegetreden, moeten wachten. Er gaat niets stilletjes verloren:
je huishouden blijft het proberen – na een paar seconden, dan een
halve minuut, dan een paar minuten, dan elke tien – en de relay
houdt, zodra hij terug is, nog steeds tot een dag aan verzegelde
enveloppen vast voor huishoudens die offline waren. Je lokale
kopie wordt thuis opgeslagen op het moment dat je op verzenden
drukt.

Heeft je space veel volgers, dan is je huishouden met een tweede
relay verbinden (of er zelf een draaien) de remedie. Een
wereldwijde space wordt gepubliceerd op elke relay waarmee je
verbonden bent, en posts voor volgers gaan via al die relays naar
buiten.

<details class="tech">
<summary>Onder de motorkap</summary>

Retry-backoff: 5 s, 30 s, 2 min, 10 min. Wachtrij aan GFS-kant
voor offline ontvangers: 24 uur, 2000 enveloppen / 64 MiB per
ontvanger.

</details>

## Verbind met een kant-en-klare relay

Het Social Home-project draait één openbare relay op
**[`gfs.social-home.io`](/nl/servers/)**, met het
leeftijdsgrensbeleid afgedwongen. Eén QR-scan en je bent
verbonden.

Of [draai er zelf een](/nl/docs/running-a-gfs/) op een
willekeurige VPS in 15 minuten – handig voor een privécommunity,
een relay voor één huishouden, of als tweede verbinding voor de
veerkracht.

## Een relay draaien

Een relay is een kleine Python-server (open source onder
MPL 2.0). Je kunt er een hosten voor je buurt, je stad of een
specifieke community. Zie
[Zelf een relay draaien](/nl/docs/running-a-gfs/) voor een
handleiding met Docker Compose + Cloudflare.

## Naast elkaar

| Gedrag                  | Privé / huishouden / openbaar                                    | Wereldwijd                                                                      |
| ----------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Wie kan hem vinden      | uitgenodigde mensen / je huis / gekoppelde huishoudens           | iedereen die met dezelfde GFS is verbonden                                      |
| Lid worden              | uitnodiging, lidmaatschap van het huishouden of toetredingsmodus | open / aanvragen / alleen op uitnodiging, plus uitnodigingslinks                |
| Hoe posts reizen        | rechtstreeks of via de mesh                                      | hetzelfde voor gekoppelde leden; via de GFS voor de rest                        |
| Wat de relay ziet       | niets (geen relay, tenzij ingeschakeld)                          | routeringsdata en een verzegelde, opgevulde envelop – nooit inhoud              |
| Versleuteling           | **altijd aan**                                                   | **altijd aan**                                                                  |
| Waar berichten leven    | in het huis van elk lid                                          | in het huis van elk lid (de relay slaat nooit inhoud op)                        |
| Als de relay offline is | n.v.t.                                                           | volgers wachten; posts proberen opnieuw, de relay houdt een dag enveloppen vast |
| Kan worden uitgezet     | ja, per stemming van beheerders                                  | ja: per stemming van beheerders niet-wereldwijd maken, en de relay vergeet      |

## Privacy in wereldwijde spaces

Een wereldwijde space blijft afgeschermd van de rest van je
huishouden. Informatie die in de ene space wordt geplaatst, lekt
nooit naar een andere, of naar je privéspaces, en de relay leert
alleen iets over de wereldwijde spaces waaraan je meedoet. Wat de
relay wel en niet kan zien, staat uitgespeld op de pagina's
[privacymodel](/nl/docs/privacy/) en
[beveiligingsmodel](/nl/docs/security/).
