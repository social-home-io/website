---
title: Wereldwijde spaces
description: Ruimtes voor huishoudens die elkaar nog niet kennen – openbare en wereldwijde spaces, de relay die ze draagt (een die je vertrouwt, of een die je zelf draait) en wat die wel en niet kan zien.
order: 40
---

De meeste spaces in Social Home zijn privé – alleen voor
uitgenodigde huishoudens. Maar sommige communities zijn van
nature open: een buurtmarktplaats, een hardloopclub voor de hele
stad, een leesclub voor boeken uit het publieke domein. Daarvoor
heeft Social Home **openbare** en **wereldwijde spaces**, en een
kleine relay – de GFS (Global Federation Server – de wereldwijde
federatieserver) – die huishoudens helpt elkaar te vinden.
(Nieuw woord? Zie [GFS](/nl/docs/glossary/#gfs) in de
woordenlijst.)

## Vier soorten space

Voordat je naar een relay grijpt, is het goed om het hele
spectrum te kennen. Social Home heeft vier bereiken voor spaces,
elk met een iets breder publiek:

| Bereik         | Zichtbaar voor                                                                | Gebruikt een relay (GFS)? |
| -------------- | ----------------------------------------------------------------------------- | ------------------------- |
| **Privé**      | Leden die je expliciet uitnodigt                                              | Optioneel (standaard uit) |
| **Huishouden** | Leden van je eigen huishouden                                                 | Nee                       |
| **Openbaar**   | Op de kaart van de GFS – iedereen die met die GFS is verbonden kan hem vinden | **Ja**                    |
| **Wereldwijd** | Wereldwijd gepubliceerd via je GFS                                            | **Ja**                    |

Privé- en huishoudspaces reizen rechtstreeks tussen de betrokken
huishoudens. De eigenaar van een privéspace kan de GFS ervoor
inschakelen – handig als leden elkaar niet rechtstreeks kunnen
bereiken – maar hij staat uit tenzij je hem aanzet.

Openbare en wereldwijde spaces gaan allebei via de GFS. Een
**openbare** space krijgt een speld op de kaart van de GFS
waarmee je verbonden bent, met de locatie afgerond op ongeveer
11 m, zodat iedereen op die GFS hem kan vinden. Een
**wereldwijde** space wordt wereldwijd gepubliceerd via je GFS.
De rest van deze pagina gaat over deze twee.

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

## Wat een wereldwijde space is

Een openbare of wereldwijde space leeft op een GFS waarmee elk
huishouden verbinding kan maken. De relay heeft twee taken:

1. **Hij is een kaart en een gids.** Hij toont welke spaces erop
   zijn gepubliceerd, wie ze host en hoe je lid wordt.
2. **Hij is het verdeelpunt voor posts.** Zodra je lid bent, gaat
   elke post die je schrijft via de relay, die hem doorstuurt
   naar elk ander huishouden in die space.

De relay ziet nooit de _inhoud_ van je posts. Elke post wordt
verzegeld als hij je huis verlaat en pas weer geopend in het
huis van elk lid als hij aankomt. De envelop wordt opgevuld tot
een van een paar vaste groottes, zodat de relay niet eens een
kort bericht van een lang kan onderscheiden. Hij slaat geen
inhoud op: is een lid offline, dan houdt hij diens verzegelde
enveloppen een dag vast en laat ze daarna los.

> Zie de relay als het postkantoor van een open community. Het
> postkantoor ziet dat er een verzegeld pakket naar de leesclub
> ging, en ongeveer hoe zwaar het was – maar alleen de leden
> hebben een sleutel om het te openen.

<details class="tech">
<summary>Onder de motorkap</summary>

Enveloppen zijn AES-256-GCM, ondertekend met Ed25519; de enige
leesbare velden zijn `event_type`, `from_instance`,
`to_instance`, `space_id` en `epoch`. Paddingbuckets:
1 / 4 / 16 / 64 / 128 KiB (publicatie door leden), plus 191 KiB
voor envelop-relay. Offline ontvangers worden 24 uur in de
wachtrij gehouden, met maximaal 2000 enveloppen of 64 MiB per
ontvanger. Alle details op de pagina
[beveiligingsmodel](/nl/docs/security/#wat-een-relay-ziet).

</details>

## Vertrouwd of strikt

Standaard draait een space in de **vertrouwde** modus (trusted):
de relay leert welk huishouden in welke space heeft gepost, en
wanneer – maar nooit wat. Voor communities waarvoor zelfs dat te
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

## Hoe ontdekken en posten werken

1. Een huishouden maakt een space en **publiceert** hem op een
   relay. De relay ontvangt de naam, omschrijving, omslagfoto,
   het leeftijdsbeleid en de accentkleur van de space – genoeg
   om hem op de kaart te zetten – maar **geen berichtinhoud**.
2. Iedereen wiens huis met diezelfde relay is verbonden, kan de
   kaart bekijken, de space vinden en vragen om lid te worden.
3. Of dat wordt toegestaan, hangt af van de **toetredingsmodus**
   van de space, die de host kiest: **Open** (iedereen kan
   meteen lid worden) of **Verzoek** (het host-huishouden
   beoordeelt en keurt goed). Uitnodigingslinks werken naast
   beide.
4. Zodra je lid bent, stromen de posts in de space als volgt:
   `jouw huis → relay → het huis van elk ander lid`. De relay
   staat op het pad van elk bericht en elke reactie; hij haakt
   niet af na de kennismaking.

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

De relay is het verdeelpunt voor openbare en wereldwijde spaces,
dus zolang hij uit de lucht is, wachten posts naar die spaces.
Er gaat niets stilletjes verloren: je huishouden blijft het
proberen – na een paar seconden, dan een halve minuut, dan een
paar minuten, dan elke tien – en de relay houdt, zodra hij terug
is, nog steeds tot een dag aan verzegelde enveloppen vast voor
leden die offline waren. Je lokale kopie wordt thuis opgeslagen
op het moment dat je op verzenden drukt.

In de praktijk is dit van belang wanneer:

- Je relay een storing heeft. Leden die in de space met _elkaar_
  praten, zien geen nieuwe posts tot hij terug is.
- Je afhankelijk bent van één relay die door het project wordt
  gedraaid. Je huishouden met een tweede relay verbinden (of er
  zelf een draaien) is de remedie.

Je space met **meerdere relays** verbinden wordt ondersteund en
aangemoedigd voor de veerkracht. Posts gaan naar buiten via elke
relay die je hebt verbonden.

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

## Wat verandert ten opzichte van andere bereiken

| Gedrag                  | Privé / huishouden                                   | Openbaar / wereldwijd                                                                          |
| ----------------------- | ---------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Zichtbaar voor          | alleen uitgenodigde leden / leden van het huishouden | op de kaart van de relay; iedereen die ermee verbonden is kan hem vinden                       |
| Lid worden              | uitnodiging of lidmaatschap van het huishouden       | open / verzoek / uitnodigingslink – de host kiest per space                                    |
| Hoe posts reizen        | rechtstreeks, van huishouden tot huishouden          | via de relay naar elk lid, elke keer                                                           |
| Wat de relay ziet       | niets (geen relay, tenzij je hem inschakelt)         | routeringsdata en een verzegelde, opgevulde envelop – nooit inhoud                             |
| Versleuteling           | **altijd aan**                                       | **altijd aan**                                                                                 |
| Waar berichten leven    | in het huis van elk lid                              | in het huis van elk lid (de relay slaat nooit inhoud op)                                       |
| Als de relay offline is | n.v.t.                                               | posts wachten en proberen opnieuw; de relay houdt een dag aan enveloppen vast als hij terug is |
| Zichtbaar voor peers    | alleen leden                                         | alleen leden – lekt nooit naar je graaf van gekoppelde huishoudens                             |
| Kan worden uitgezet     | ja, per stemming van beheerders                      | ja – publicatie intrekken per stemming van beheerders; de relay vergeet                        |

## Privacy in wereldwijde spaces

Openbare en wereldwijde spaces blijven afgeschermd van de rest
van je federatie. Ze verschijnen niet bij je gekoppelde
huishoudens, ze worden niet meegenomen in een synchronisatie op
huishoudniveau, en informatie die in de ene space wordt
geplaatst, lekt nooit naar een andere (of naar je privéspaces).
De space is een bewust bereik: alleen leden, op de relay die jij
hebt gekozen. Wat de relay wel en niet kan zien, staat
uitgespeld op de pagina's [privacymodel](/nl/docs/privacy/) en
[beveiligingsmodel](/nl/docs/security/).
