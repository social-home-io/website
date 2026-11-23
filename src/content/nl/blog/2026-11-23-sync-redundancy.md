---
title: "Een space die doorgaat: meer GFS'en, en elk lid kan je aanvullen"
description: Spaces leunen nu op elk huishouden en elke GFS die ze gebruiken. Posts bereiken leden op elk van de GFS'en van een space, je huishouden verhuist naar een andere GFS als er een uitvalt, en je ziet of je alles van een space hebt en kunt bijwerken via elk lid terwijl de host offline is. In Social Home 2026.11.23.
date: 2026-11-23
author: Het Social Home-team
image: /blog/2026-11-sync/cover.webp
imageAlt: Een illustratie van vijf huishoudens die met elkaar en met twee GFS'en verbonden zijn. Eén GFS is grijs met een kruis, en een stippelpijl loopt van daar naar de andere GFS. Het host-huishouden in het midden is vervaagd met een maantje ernaast, terwijl verzegelde enveloppen blijven reizen tussen de andere huishoudens, waarvan er drie een groen vinkje hebben
order: 50
---

Social Home heeft geen middelpunt. Elk huishouden bewaart thuis zijn
eigen kopie van de [spaces](/nl/docs/glossary/#space) waarin het
zit. De [GFS (Global Federation Server)](/nl/docs/glossary/#gfs)
brengt verzegelde posts naar huishoudens waarmee je niet gekoppeld
bent, en een space kan er meerdere gebruiken.

De laatste twee releases bouwen daarop voort. Een space gebruikt nu
**elke** GFS die de eigenaar heeft gekozen, niet alleen één, en de
leden vullen elkaar aan. Valt een GFS uit, is het huis van de host
aan het updaten, of stond je eigen huis het weekend uit, dan gaat de
space gewoon door en zie je dat je alles hebt.

## Een space op meer dan één GFS

De eigenaar van een [wereldwijde space](/nl/docs/global-spaces/) kan
hem op maximaal acht GFS'en vermelden, bijvoorbeeld de GFS van het
project en een die een lid thuis draait. Je posts gaan nu
rechtstreeks naar de leden op **elk** van die GFS'en, ook op GFS'en
waarmee je huishouden nooit verbonden was. Het is één upload per
GFS, hoeveel leden er ook wachten.

Een lid dat alleen de tweede GFS gebruikt, krijgt je post dus net zo
snel als iedereen, en de host hoeft hem niet door te geven.

<details class="tech">
<summary>Onder de motorkap</summary>

De brievenbus van een lid mag op elke GFS staan uit de door de
eigenaar ondertekende lijst `gfs_servers`. Twee of meer leden op één
GFS krijgen één upload via `POST /gfs/envelope/multi`; een lid alleen
krijgt `POST /gfs/envelope`. Je eigen verbinding met een GFS gaat
voor. Voor een vermelde GFS waarmee je nooit verbonden was, gebruikt
je huis een sessie zonder cookies, vastgepind op het vermelde adres,
nadat de GFS heeft bewezen dat hij de sleutel heeft die de eigenaar
ondertekende. Een GFS die niet op de ondertekende lijst staat, krijgt
helemaal geen verzoek.

De host brengt een post nog steeds rond als geen enkele vermelde GFS
dat kan: de GFS staat niet op de lijst, biedt geen brievenbussen aan,
faalde drie keer achter elkaar, of het item is te groot voor de
route. Voor 200 leden op drie GFS'en is een post 3 uploads.

</details>

## Valt een GFS uit, dan verhuist je huishouden

Je huishouden ontvangt de posts van een space in één anonieme
brievenbus op één GFS. Blijft die GFS zo'n tien minuten
onbereikbaar, en is je huishouden verbonden met een andere GFS waar
de space op staat, dan opent je huis daar een brievenbus en laat het
de andere leden weten. Hun posts gaan dan naar de nieuwe brievenbus.

Het springt niet heen en weer. Komt de eerste GFS terug, dan blijft
je huishouden waar het is, en het verhuist pas opnieuw als ook de
tweede GFS uitvalt. Ligt je eigen internet eruit, dan verhuist er
niets.

<details class="tech">
<summary>Onder de motorkap</summary>

De controle liftt mee op de eigen reconnect-backoff van de
brievenbus, dus er is geen extra timer: de verhuizing gebeurt 10 tot
18 minuten na het begin van een storing, en alleen naar een GFS die
op dat moment antwoordt. De GFS die uitviel, wordt gemarkeerd als
_demoted_ en komt vanaf dan als laatste in de rangorde. Je ledenkaart
voor elke betrokken space krijgt een nieuwere revisie en gaat naar de
host, die hem doorgeeft met zijn volgende update van de ledenlijst;
ongeveer 0,7 KB per space. De keuze blijft bewaard na een herstart.

</details>

## De space vertelt je welke GFS je mist

Om naar een andere GFS te verhuizen, moet je huishouden ermee
verbonden zijn. Een space zegt daarom nu in zijn feed wanneer hij op
een GFS staat waarmee je huishouden niet verbonden is: "Deze space
staat ook op _naam van de GFS_. Verbind voor een stabielere
verbinding." Een beheerder van het huishouden krijgt een knop
**Verbinden** die de juiste GFS opent, en alle anderen krijgen te
horen dat ze het een beheerder moeten vragen.

Voor beheerders die namens de eigenaar handelen (met **Beheerders
mogen namens mij handelen** aan) telt elke GFS van de space. De
beheerders van hun huishouden krijgen ook een melding onder **Wacht
op jou** tot hun huishouden met al die GFS'en verbonden is.

## Is alles er?

De instellingen van een space hebben nu een onderdeel dat **Is alles
er?** heet. Het vertelt je in één zin:

- **Alles is er**, en wanneer dat voor het laatst is gecontroleerd.
- **Nieuwste wordt opgehaald…** terwijl er nieuwe posts binnenkomen.
- **Nu geen verbinding met het gastheer-huishouden**, met tot waar je
  bij bent. Wat je plaatst, wordt verstuurd zodra de verbinding terug
  is.
- **Er ontbreken misschien berichten**, pas nadat twee controles op
  rij niet alles binnenbrachten. Je huis probeert het elke 30 minuten
  opnieuw, en **Nu controleren** vraagt het meteen na.

Ontbreken er misschien posts, dan krijgt de space een ⚠ in je lijst
met spaces. Je eigen posts die nog wachten om te vertrekken, tonen
**Nog niet verzonden**. Een space die je huishouden host, toont nooit
een waarschuwing: die heeft per definitie alles.

<details class="tech">
<summary>Onder de motorkap</summary>

Elke uitkomst van een synchronisatie wordt per space opgeslagen en
omgezet in een status op `GET /api/spaces/{id}` en in het frame
`space.sync_state`. **Nu controleren** staat open voor elk lid (niet
voor volgers), drie keer per uur per space. Beheerders krijgen een
weergave **Details** met de paginavergelijking: met welke pagina je
overeenkwam, hoeveel delen verschillen en wie hem ondertekende.

</details>

## Bijwerken via elk lid

Het huis van de host, of een beheerder die namens de eigenaar
handelt, ondertekent af en toe een korte samenvatting van alles wat
er in de space staat, en stuurt die naar alle leden. Je huis
vergelijkt zijn eigen kopie met die samenvatting. Ontbreekt er iets,
dan kan het dat ophalen bij **elk** ander lid-huishouden, niet alleen
bij de host.

Je huis houdt alleen wat de ondertekende samenvatting bevestigt. Een
lid dat iets anders stuurt, of iets wat veranderd is, komt met niets
langs je huis. Een lid kan je dus helpen bijwerken, maar kan er niets
tussen smokkelen.

Na een weekend weg werk je dus bij, ook als de host offline is
wanneer je terugkomt. Elk lid dat er was, kan je aanvullen.

<details class="tech">
<summary>Onder de motorkap</summary>

De samenvatting is een **sync-pagina**: 256 bucket-hashes over elke
rij van de space, en een header (`space_id`, epoche, ondertekenaar,
volgnummer, aantal rijen, root-hash) die is ondertekend met de
autoriteitssleutel van de space (`page_suite: sha256-b256-c1`). De
eigenaar en beheerders met de ondertekeningssleutel van de space
verzegelen er hoogstens elke 15 minuten na een wijziging een, en
sturen die hoogstens één keer per uur per space, verzegeld met de
inhoudssleutel van de space: rechtstreeks naar gekoppelde leden, en
naar leden achter een GFS met één upload per GFS. Een stille space
stuurt niets.

Een lid vergelijkt zijn eigen bucket-hashes met de nieuwste pagina.
Voor de buckets die verschillen, vraagt het elk lid-huishouden
(`SPACE_SYNC_BEGIN` met `buckets`), hoogstens drie per ronde en één
tegelijk. Een rij wordt alleen toegepast als zijn hash voorkomt in
een bucketlijst die hasht naar de ondertekende pagina. Een lid
bewaart ongeveer 9 KB per space. In een drukke space met 200
lid-huishoudens voegen de pagina's ongeveer 7% toe aan de upload van
de ondertekenaar.

</details>

## Hoe het optelt

Bij elkaar heeft een space veel plekken om op te staan:

- **Het huis van elk lid** bevat de hele space en kan de anderen
  aanvullen.
- **Elke vermelde GFS** brengt de posts rond, en huishoudens
  verhuizen tussen ze als er een uitvalt.
- **Beheerders** kunnen de space draaien terwijl de eigenaar weg is,
  als de eigenaar dat toestaat.

Je hoeft hier niets voor in te stellen. Draai je een drukke
wereldwijde space, vermeld hem dan op twee GFS'en, bijvoorbeeld de
onze en een die je [zelf draait](/nl/docs/running-a-gfs/), en
verbind je huishouden met allebei. Social Home doet de rest.

## Wat het kost, gewoon gezegd

- **Een GFS waarmee je nooit verbonden was, ziet dat je bezorgt.**
  Gaat je post naar leden op een vermelde GFS waarmee je huishouden
  nooit verbonden was, dan ziet die GFS je internetadres, het
  tijdstip, de grootte en naar welke brievenbussen de post gaat. Hij
  ziet nooit welk huishouden je bent, of wat je schreef.
- **Een lid dat met geen enkele GFS van de space verbonden is,**
  wordt nog steeds via de host bereikt, dus dat lid wacht op de host.
- **Een lid kan je opnieuw laten kijken.** Een lid dat verkeerde
  gegevens stuurt, kan je space "Er ontbreken misschien berichten"
  laten zeggen. Het kan nooit een ontbrekende post laten lijken alsof
  hij er is.
- **Wordt een post verwijderd terwijl de host weg is,** dan zegt je
  space misschien pas "Alles is er" als de host terug is.

## Probeer het

Posten naar elke GFS van een space en verhuizen naar een andere GFS
kwamen in **Social Home 2026.11.21**. **Is alles er?** en bijwerken
via elk lid zitten in **Social Home 2026.11.23**. Update je huis, en
controleer of je huishouden verbonden is met elke GFS die je spaces
gebruiken. Meer in [Wereldwijde spaces](/nl/docs/global-spaces/).
