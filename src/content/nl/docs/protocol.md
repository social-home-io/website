---
title: Hoe het werkt
description: Een rondleiding in gewone taal langs wat Social Home doet, wat op je eigen server blijft en hoe huishoudens met elkaar verbinden – zonder protocoljargon.
order: 20
---

Social Home geeft je thuis het huishoud-OS dat je telefoon nooit
is geworden: gedeelde agenda's, een live boodschappenlijst,
foto's, spraakmemo's, aanwezigheid en chat – allemaal op hardware
die je al hebt. Het laat je huishouden ook verbinden met andere
huishoudens, net zoals je op elk ander netwerk een vriend
toevoegt, alleen zonder iemands gegevens aan een bedrijf in het
midden te geven.

Deze pagina laat zien wat je er in de praktijk mee kunt. Geen
afkortingen in de hoofdtekst; de technische details staan in de
blokken "Onder de motorkap", en de woorden staan in
[Woorden die we gebruiken](/nl/docs/glossary/).

## Wat kan ik ermee?

Blijf in contact met de mensen die ertoe doen – zonder je
gegevens aan iemand anders te geven. Dit is wat Social Home jou
en je huishouden laat doen:

- **📸 Deel een foto van het avondeten** op je huishoudfeed. Je
  partner ziet hem meteen op de telefoon, je huisgenoten kunnen
  reageren en commentaar geven – zonder dat hij langs een
  clouddienst gaat.
- **🗓 Zie ieders agenda op één plek.** Je persoonlijke agenda,
  het rooster van je huisgenoot en de gedeelde "Huis"-agenda
  liggen over elkaar in één kleurgecodeerde weergave. Afspraken
  blijven op je server.
- **🛒 Roep "Ik sta in de supermarkt – nog iets nodig?"** Je
  boodschappenlijst van het huishouden is live. Iemand zet melk
  erop, jij ziet het voor je bij de kassa bent. Vraag je
  spraakassistent om het toe te voegen door het gewoon te zeggen.
- **🔔 Weet wanneer mensen thuis zijn** zonder te vragen. Een
  rustige aanwezigheidsindicator laat zien wie er nu is – geen
  locatietracking, geen geschiedenis, alleen het huidige moment.
- **✅ Verdeel klusjes in plaats van te zeuren.** Takenlijsten
  met toegewezen personen, deadlines en een badge voor wat te
  laat is. Dit weekend de boekenkast ophangen; vandaag de oude
  koelkast wegbrengen; iedereen ziet wie wat heeft.
- **📒 Bewaar de huishandleiding op één plek.** Pagina's zijn
  Markdown-wiki-items die in een space leven – hoe je de
  radiatoren ontlucht, waar de meterstanden heen gaan, de
  overdracht voor de oppas. Ze synchroniseren naar elk apparaat
  in het huishouden.
- **📝 Sticky's voor de dingen die geen pagina verdienen.**
  Kleurige notities die je met een tik bewerkt, geprikt op het
  canvas van een space – de moderne koelkastmagneet. Wortels in
  de onderste la; cadeau-ideeën voor een verjaardag; het
  boodschappenlijstje voor de deurbelreparatie.
- **💬 Stuur berichten naar je familie aan de andere kant van de
  wereld** – verzegeld van jouw huis tot het hunne, zonder cloud
  ertussen. Geen telefoonnummers. Geen account bij een dienst
  van derden.
- **📞 Bel zonder een vreemde in het midden** – spraak- en
  videogesprekken, 1-op-1 of met een groep, rechtstreeks vanuit
  je privéberichten en groepschats. Audio en video stromen
  rechtstreeks tussen de deelnemers; lukt een directe verbinding
  niet, dan geeft een relay de stream door, maar die ziet alleen
  versleutelde media.
- **🏘 Bouw je eigen community, op jouw manier** – maak een
  space voor elke groep: je straat, je flatgebouw, je sportteam
  of je makersclub. Organiseer een buurtbarbecue, run een
  leesclub – op een privéplek die geen groot techbedrijf kan
  lezen, te gelde maken of sluiten. Iedereen houdt zijn eigen
  server.
- **🔨 Run een marktplaats** – zet dingen te koop of weg te geven
  voor mensen die je al kent. Geen vreemden, geen platformkosten.
- **🎙 Transcribeer een spraakmemo** van een microfoon in huis
  en plaats hem op de feed – handig als je handen vol zijn.

<details class="tech">
<summary>Onder de motorkap</summary>

Gesprekken lopen via WebRTC met DTLS-SRTP tussen de deelnemers;
een TURN-fallback geeft alleen cijfertekst door. Privéberichten
worden server-naar-server versleuteld (AES-256-GCM-enveloppen,
Ed25519-handtekeningen).

</details>

## Je gegevens blijven van jou

Alles wat Social Home weet, leeft in je thuis, op je eigen
server. De
foto's, de berichten, de boodschappenlijst, de agenda-items –
allemaal in een kleine database op je eigen machine. Er is geen
cloudaccount, geen analytics, geen advertentienetwerk, geen
logger op afstand die meekijkt met wat je huishouden zegt. Valt
je internet uit, dan blijven de huishoudfuncties op je LAN gewoon
werken; het enige dat pauzeert, is berichtenverkeer _buiten_ het
huis.

<details class="tech">
<summary>Onder de motorkap</summary>

Als je de add-on hebt geïnstalleerd, maakt hij deel uit van je
normale Home Assistant-back-up; standalone installaties krijgen
een Recovery Kit (`.shrk`, scrypt + AES-256-GCM) voor de
sleutels.

</details>

## Verbinden met andere huishoudens

Je verbindt twee huizen door een QR-code te scannen – in de app
heet dat **koppelen**. Daarna kennen de twee servers elkaar en
kunnen ze privéberichten en gedeelde spaces tussen elkaar
dragen. De QR-code bevat een publieke sleutel – een soort
digitale identiteitskaart – waarmee de andere kant kan
controleren dat jij het nog steeds bent, ook als je adres later
verandert.

Wat je deelt met een gekoppeld huishouden: je weergavenaam, je
avatar en de spaces waar jullie samen in zitten.

Wat je nooit deelt: wachtwoorden, e-mailadressen, je
locatiegeschiedenis of iets wat in een space leeft waar jullie
niet allebei lid van zijn.

<details class="tech">
<summary>Onder de motorkap</summary>

Elk huishouden genereert bij de eerste start een
Ed25519-identiteitssleutel. Koppelen is X25519 + HKDF-SHA256,
geauthenticeerd via de QR-code of een korte uitgesproken code.
De handtekening van elke binnenkomende envelop wordt
gecontroleerd tegen de koppeling; een foute handtekening wordt
weggegooid, en er is geen trusted-instance-modus om dat te
omzeilen.

</details>

## Spaces – gedeelde ruimtes voor elke groep

Een space is een gedeelde feed, chat en agenda voor elke groep
mensen, over een willekeurig aantal huishoudens heen. Denk aan:

- **Familie** – de mensen in je huis, plus ouders en broers en
  zussen in hun eigen huis.
- **Eichenstrasse 3–17** – je flatgebouw. Iedereen draait zijn
  eigen server; de space is het gedeelde prikbord.
- **Leesclub**, **boulderploeg**, **makerspace** – de
  terugkerende groepen die al in je leven bestaan, alleen niet
  op een platform dat je vertrouwen waard is.

Jij bepaalt wie een space ziet. Jij bepaalt welke huishoudens
worden uitgenodigd. Elke space heeft een host-huishouden – het
huishouden dat hem heeft gemaakt en de ledenlijst bijhoudt –
maar leden plaatsen rechtstreeks bij elkaar, en de grote
beslissingen (wie hem ziet, of hij nog bestaat) nemen alle
beheerders samen.

## Openbare en wereldwijde spaces

Sommige spaces zijn privé voor uitgenodigde huishoudens. Andere
– zoals een openbare marktplaats, een hobbycommunity of het
prikbord van je buurt – zijn _openbaar_ of _wereldwijd_: iedereen
kan ze ontdekken. Een lichte relay, de GFS (Global Federation
Server – de wereldwijde federatieserver), helpt huishoudens
elkaar te vinden als ze elkaar nog niet kennen (zie
[GFS](/nl/docs/glossary/#gfs)).

De relay blijft voor die spaces op het pad: elke post gaat
erdoorheen als een verzegelde, opgevulde envelop, en de relay
stuurt de envelop door naar de leden. Hij kan er geen woord van
lezen. Standaard weet hij welk huishouden wanneer heeft gepost;
een space kan overschakelen naar de strikte modus, waarin hij
niet eens weet wie. Meer in
[Wereldwijde spaces](/nl/docs/global-spaces/).

<details class="tech">
<summary>Onder de motorkap</summary>

`PUBLIC_SPACE_TIERS = {public, global}`. De GFS ziet alleen
routeringsmetadata (`space_id`, `event_type`, groottebucket,
timing, abonneeset, bron-IP); de strikte modus maakt publicaties
identiteitsvrij. Voor offline leden wordt 24 uur in de wachtrij
gezet; verder wordt niets opgeslagen.

</details>

## Openbare highlight-links

Dezelfde soort relay heeft nog een tweede taak: één highlight
overhandigen aan mensen buiten Social Home. Als je een
highlight-link publiceert, maakt de relay een URL aan die
iedereen in een browser kan openen – maar de bytes van de
highlight stromen rechtstreeks van je thuisserver naar de
browser van de bezoeker. Lukt dat directe pad niet, dan geeft de
relay de frames alleen door zolang jij online bent, en slaat er
geen enkele van op. Zie
[Highlights](/nl/docs/highlights/#openbaar-delen-via-een-global-server)
voor de kant van de auteur.

<details class="tech">
<summary>Onder de motorkap</summary>

WebRTC-direct van de server van de auteur naar de browser;
HTTP-doorgifte alleen als fallback zolang de auteur online is.
Er worden nul highlight- of moment-bytes op de GFS opgeslagen.

</details>

## Versleuteling, altijd aan

Elk bericht dat je server verlaat, zit verzegeld in een envelop
die alleen de ontvangende huishoudens kunnen openen – altijd,
zonder schakelaar om het uit te zetten en zonder terugval op
platte tekst. Zelfs de relay kan er niet in kijken. Zie het als
een envelop waar alleen de mensen op de gastenlijst een sleutel
voor hebben – de post bezorgt hem, maar maakt hem nooit open. De
pagina [beveiligingsmodel](/nl/docs/security/) zegt precies wat
dat wel en niet afdekt.

## Privacy in één oogopslag

- ✅ Elk bericht versleuteld onderweg – altijd aan, niet uit te zetten
- ✅ Geen advertenties, geen tracking, geen analytics
- ✅ GPS is opt-in per apparaat
- ✅ Jouw server, jouw regels
- ✅ Open source onder MPL 2.0

## Hoe verbindingen werken (voor de nieuwsgierigen)

Elk thuis waarop Social Home draait, genereert bij de eerste
start een unieke cryptografische identiteit – het equivalent van
een digitale identiteitskaart. Als twee huishoudens koppelen,
wisselen ze deze ID's uit en controleren ze elkaars handtekening
telkens wanneer er een bericht binnenkomt. Na die eenmalige
handshake kunnen de twee servers rechtstreeks praten: een
bericht dat je naar je zus stuurt, verschijnt dezelfde seconde
in haar huis, zonder relay ertussen.

Verandert het adres van een huishouden (je verhuist, je IP
wisselt, of je stapt over op een domein), dan wordt het nieuwe
adres automatisch aan alle gekoppelde huishoudens gemeld – het
huis van je zus registreert de verhuizing en houdt de verbinding
in leven.

## Een relay voor wereldwijde spaces draaien

Wil je een discovery-relay hosten voor een community, dan is dat
een kleine Python-server die op een VPS draait – zie
[zelf een relay draaien](/nl/docs/running-a-gfs/). Open source,
gelicentieerd onder MPL 2.0, geen kosten.
