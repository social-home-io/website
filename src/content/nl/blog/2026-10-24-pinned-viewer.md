---
title: "Deellinks die de GFS niet kan openen"
description: Openbare highlight-links, deellinks van momenten, de pagina van een wereldwijde space, uitnodigingslinks en Momentum-profielen openen nu in de Social Home-viewer, een pagina die geen GFS aanbiedt. Wie een GFS draait, kan niet lezen wat je deelt en de pagina die je vrienden zien niet veranderen. Sinds Social Home 2026.10.22.
date: 2026-10-24
author: Het Social Home-team
order: 50
---

Het meeste wat je in Social Home doet, blijft tussen huishoudens:
verzegeld bij jou thuis, geopend bij hen. Maar soms wil je iemand
bereiken die helemaal niet op Social Home zit. Opa misschien, die
alleen e-mail leest, of de vriendin van de vakantie, of de ouders van
school die je in de space van de klas wilt uitnodigen. Zij openen je
link in een gewone browser.

Tot nu toe kwam die browserpagina van de
[GFS (Global Federation Server)](/nl/docs/glossary/#gfs), de relay die
huishoudens helpt elkaar te vinden. Sinds **Social Home 2026.10.22**
komt hij van de **Social Home-viewer** op `viewer.social-home.io`, een
pagina die geen GFS aanbiedt. Die ene verandering betekent dat wie een
GFS draait niet kan lezen wat je deelt, en de pagina die je vrienden
zien niet kan veranderen.

## Het slot en de slotenmaker

Een openbare highlight-link is verzegeld van je huis tot de browser
van je vrienden. De sleutel die hem opent, staat in het deel van de
link na de `#`. Dat deel sturen browsers nooit naar een server, dus de
GFS die helpt de link op te zetten, ziet hem nooit.

Maar een sleutel helpt alleen als je de handen vertrouwt die hem
vasthouden. De pagina die het highlight opent, is de code die de
sleutel leest. Als de GFS die pagina aanbood, kon hij ook een net iets
andere pagina aanbieden die de sleutel kopieert, en niemand zou het
merken. Versleuteling is maar zo sterk als de pagina die het openen
doet.

Daarom komt de pagina nu ergens anders vandaan. Je huishouden maakt
links die naar de viewer wijzen, en de viewer praat alleen met de GFS
om de verbinding op te zetten. De GFS stelt je huis en de browser van
je vrienden nog steeds aan elkaar voor, en geeft nog steeds verzegelde
bytes door als een directe verbinding niet lukt. De code die de
sleutel vasthoudt, draait hij nooit.

| Wie                   | Wat die krijgt                                                                                                        |
| --------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Wie de GFS draait     | dat een link geopend werd, vanaf welk adres en wanneer, plus verzegelde bytes. Nooit de sleutel, nooit de pagina zelf |
| De host van de viewer | dat iemand de viewer laadde. Niet welke link, niet welke GFS, niet wat erin zat                                       |
| Wie de link heeft     | dat ene highlight of moment, tot het afloopt (een highlight-link stopt ook zodra je hem verwijdert)                   |
| Wie hem niet heeft    | niets                                                                                                                 |

## Elke versie bevroren

De viewer is een klein setje statische bestanden. Zijn taak is saai en
makkelijk te controleren zijn:

- **Elke versie krijgt een eigen adres.** Een link noemt precies de
  viewerversie waarvoor hij gemaakt is. De bestanden achter dat adres
  veranderen nooit, dus een link van vandaag opent volgend jaar dezelfde
  pagina.
- **Het script ligt vast via zijn vingerafdruk.** De pagina vertelt de
  browser precies welk script hij moet draaien. Is ook maar één byte
  anders, dan weigert de browser het.
- **Twee keer gebouwd, door twee verschillende repositories.** De
  Social Home-release bouwt de viewer en legt zijn vingerafdruk vast. De
  aparte repository
  [`social-home-io/viewer`](https://github.com/social-home-io/viewer)
  bouwt hem opnieuw uit dezelfde release en publiceert hem alleen als
  beide builds gelijk zijn.
- **Versies worden alleen toegevoegd.** Oude versies worden nooit
  overschreven of verwijderd, dus elke link die een eerdere release
  maakte, blijft openen.
- **Iedereen kan het controleren.** Haal de bestanden op, vergelijk hun
  vingerafdruk met die in de release, bouw opnieuw vanaf de tag. Je
  hoeft ons niet op ons woord te geloven.

## Eén viewer voor iedereen buiten

Highlights waren het begin. Alles wat een vreemde vanaf een GFS opent,
opent nu in dezelfde viewer:

- **Openbare highlight-links.** Tik in de highlight-viewer op
  **Openbare link maken**, kies een GFS en deel de link. De pagina laat
  zien wie het deelde (naam, foto en bio, verzegeld net als de frames)
  en streamt het highlight rechtstreeks vanaf je huis. Zie
  [Highlights](/nl/docs/highlights/#openbaar-delen-via-een-global-server).
- **Deellinks van momenten.** Bij een openbaar moment maakt
  **Deellink kopiëren** een link die precies dat moment opent en niets
  anders wat je gepost hebt. Dat werkt zelfs als je huis offline is,
  omdat de GFS een verzegelde kopie bewaart die hij zelf niet kan
  openen. Zie [Momentum](/nl/docs/momentum/#eén-moment-delen).
- **De pagina van een wereldwijde space, uitnodigingslinks en
  profielen.** De pagina van een space op een GFS, een
  GFS-uitnodigingslink en iemands Momentum-profiel geven door aan de
  viewer, die de Over-tekst van de space, de uitnodigingscode en
  QR-code, of het profiel met een Volgen-knop toont.

De viewer spreekt Engels, Duits, Nederlands, Frans en Spaans, naar de
browsertaal van je vrienden, en de pagina's volgen hun lichte of
donkere instelling. Gedeeld in een chat-app toont een space- of
profiellink nog steeds een voorbeeld met naam en foto. De GFS
beantwoordt de chat-app met een kleine voorbeeldpagina zonder scripts.

## Wat het niet oplost

De grenzen hoor je liever van ons:

- **Je vertrouwt de host van de viewer.** De viewer wordt gepubliceerd
  op GitHub Pages onder de organisatie `social-home-io`. De
  vingerafdrukken maken een verwisselde pagina herkenbaar, maar alleen
  als iemand het controleert.
- **De link is de sleutel.** Iedereen naar wie hij wordt doorgestuurd,
  kan hem openen. Hij staat ook in de browsergeschiedenis van je
  vrienden, net als elke andere link die ze openen.
- **Een momentlink kun je niet terugnemen**, behalve door het moment te
  verwijderen. Een highlight-link wel: verwijder hem, of laat het
  highlight verlopen.
- **De GFS ziet het verkeer nog steeds.** Hij weet wanneer een link
  wordt geopend en vanaf welk adres. Hij weet niet wat erin zit.

De volledige lijst staat op de pagina
[Beveiligingsmodel](/nl/docs/security/#openbare-links).

## Je eigen GFS

Er hoeft niets te gebeuren. Een GFS geeft zijn openbare pagina's
standaard door aan de viewer van het project. Wil je daar liever niet
van afhangen, dan kun je de gepubliceerde viewerbestanden zelf hosten
en je GFS en huishoudens ernaar laten wijzen, of de overdracht
uitzetten. Dan tekent je GFS zijn pagina's weer zelf. Dat is minder
veilig voor highlight-links, omdat je GFS dan de pagina aanbiedt die
de sleutel leest. Zie
[Zelf een relay draaien](/nl/docs/running-a-gfs/#je-openbare-paginas).

<details class="tech">
<summary>Onder de motorkap</summary>

- Highlight-link:
  `https://viewer.social-home.io/v/<hash>/#g=<GFS>&i=<home>&h=<highlight>&t=<token>&k=<secret>`.
  Alles na `#` blijft in de browser. `k` wordt met HKDF-SHA256 afgeleid
  uit de identiteitsseed van de auteur en het token; de GFS ziet het
  nooit.
- De stream wordt per weergave verzegeld: de viewer stuurt een
  tijdelijke P-256-sleutel, en het huis van de auteur leidt uit het
  ECDH-resultaat, gezouten met `k`, een AES-256-GCM-sleutel af. De GFS
  ziet op de directe weg en op de relay-terugval het token en de
  viewersleutel, maar nooit `k`.
- `<hash>` zijn de eerste 16 hextekens van de sha384 van de pagina, die
  de SRI-hash van het script en de styles per hash bevat. Strenge CSP in
  een `<meta>`-tag, `no-referrer`, elk verzoek met
  `credentials: 'omit'` en `redirect: 'error'`.
- Het manifest `socialhome/pinned_viewer.json` is ingecheckt in de
  core-repo; CI bouwt de viewer twee keer en faalt bij elk verschil in
  bytes. De viewer-repo bouwt hem opnieuw, controleert de `integrity`
  en voegt `v/<hash>/` toe aan `gh-pages`, dat een ruleset append-only
  houdt.
- De viewer heeft een eigen domein, `viewer.social-home.io`, in plaats
  van een gedeelde `github.io`-origin, zodat geen andere site van de
  organisatie er een service worker over kan registreren.
- Openbare GFS-pagina's: `/spaces/{id}`, `/join/{token}` en
  `/moments/{user}` antwoorden met een inerte overdrachtspagina
  (preview-tags, een doorverwijzing naar de viewer,
  `default-src 'none'`). De viewer leest `/gfs/pages/*` cross-origin
  zonder inloggegevens en toont de Over-tekst uit een kleine
  Markdown-subset, nooit als HTML.
- TURN-gegevens voor de viewer worden per antwoord aangemaakt (TURN
  REST API, standaard 10 minuten), nooit vast.

</details>
