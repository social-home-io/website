---
title: Beveiligingsmodel
description: Wat verzegeld is, wat ondertekend is, wat de relay nog steeds kan zien — en wat we nog niet hebben opgelost.
order: 55
---

Deze pagina is de tweeling in gewone taal van de
[principes](https://github.com/social-home-io/socialhome/blob/main/docs/principles.md)
van het project: elke garantie hieronder is eerst geschreven voor
wie het huishouden runt, en daarna — in de blokken „Onder de
motorkap” — voor wie het tegen de code wil controleren. Is een
woord nieuw, dan staat het in
[Woorden die we gebruiken](/nl/docs/glossary/).

## Eén regel, eerlijk verteld

Niets verlaat je huishouden leesbaar. De boodschappenlijst, de
leesclubchat, de foto van het avondeten, de tandartsafspraak —
alles wordt verzegeld voordat het je huis verlaat en pas geopend
in het huis waarvoor het bestemd was.

De regel gaat over de verbinding en over elke machine ertussen: de
relay, het netwerk en de servers van andere leden die een bericht
doorgeven.

<details class="tech">
<summary>Onder de motorkap</summary>

De versleuteling is van server tot server: de server van jouw
huishouden verzegelt, de server van het ontvangende huishouden
opent. Er is geen sleutel per apparaat en geen claim van
geheimhouding van apparaat tot apparaat.

</details>

## Tegen wie het je beschermt

| Iemand die…                                | …krijgt                                                                                                                 |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| de GFS draait die jij gebruikt             | verzegelde enveloppen, routeringsgegevens en tijdstippen — nooit één woord inhoud                                       |
| het netwerk afluistert                     | verzegeld, opgevuld verkeer tussen bekende adressen                                                                     |
| uit een space is verwijderd                | niets wat na zijn vertrek is geplaatst — de space kreeg een nieuwe sleutel                                              |
| je openbare link krijgt                    | dat ene highlight of moment, geopend in een viewer die de GFS niet draait — dus de GFS kan het nog steeds niet lezen    |
| een rondslingerende uitnodigingslink vindt | toegang tot de space, als het een GFS-link was — behandel die als sleutels; een Lokale link doet niets voor een vreemde |
| root heeft op de server van je huis        | alles — het is jouw server; bescherm hem zoals de rest van je thuisnetwerk                                              |
| beheerder is van een space waar jij in zit | alles in die space, net als elk ander lid — beheerders zijn geen achterdeur                                             |

De laatste twee rijen zijn de eerlijke: Social Home beschermt je
huishouden tegen de buitenwereld, niet tegen zichzelf.

## Versleuteld van huis tot huis

Elk bericht, elke post en elke agenda-afspraak wordt in jouw huis
in een envelop verzegeld en ondertekend, zodat het ontvangende
huishouden kan controleren dat het echt van jou kwam en dat
niemand het onderweg heeft veranderd. Privéberichten werken op
dezelfde manier: verzegeld van jouw huis tot het hunne.

<details class="tech">
<summary>Onder de motorkap</summary>

- Enveloppen: AES-256-GCM. Handtekeningen: Ed25519 over de envelop.
- De enige platte tekst op de verbinding: `event_type`,
  `from_instance`, `to_instance`, `space_id`, `epoch`.

</details>

## Het faalt gesloten

Er is geen schakelaar „versleuteld / niet versleuteld” en geen
terugval naar onversleuteld versturen. Als een space niet verzegeld
kan worden, blijft het bericht thuis. Een envelop met een
ongeldige handtekening, of een die veel te laat aankomt, wordt
weggegooid — geen uitzonderingen, geen modus „vertrouw deze toch
maar”.

<details class="tech">
<summary>Onder de motorkap</summary>

- Geen terugval naar platte tekst; geen trusted-instance-modus.
- Tijdstempelvenster ±300 s; replay-cache 24 h.
- Elke mislukte handtekeningcontrole gooit de envelop weg voordat
  die verder wordt geparset.

</details>

## Sleutels en rotatie

Je huishouden krijgt een eigen identiteitssleutel de eerste keer
dat het start. Als je met een ander huishouden koppelt, spreken
jullie samen een gedeeld geheim af via een QR-code of een korte
uitgesproken code, zodat niemand ertussen kan glippen.

Elke space heeft een eigen sleutel, en die sleutel verandert
telkens als het ledenbestand verandert. Als iemand de leesclub
verlaat, krijgt de club een nieuwe sleutel; die persoon kan niets
lezen wat daarna is geplaatst. Als een beheerder wordt verwijderd,
verandert ook de sleutel die beheerdersbeslissingen ondertekent.

De sleutels op je schijf zijn ingepakt onder een hoofdsleutel. Gebruik je de Home Assistant App, dan reizen ze mee met je normale Home
Assistant-back-up; met Docker of Python download je een Recovery Kit en bewaar je die op een veilige plek.

<details class="tech">
<summary>Onder de motorkap</summary>

- Identiteit: Ed25519. Opt-in hybride Ed25519 + ML-DSA-65-
  handtekeningen (vereist liboqs).
- Koppelen: X25519 + HKDF-SHA256, geauthenticeerd door de
  uitgesproken code.
- Space-inhoud: AES-256-GCM-sleutel per epoche, geroteerd bij elke
  wijziging in het ledenbestand. Autoriteitssleutel geroteerd bij
  intrekking van een beheerder.
- In rust: sleutels ingepakt onder een KEK (key-encryption key).
  Recovery Kit `.shrk` = scrypt + AES-256-GCM, voor installaties met Docker en
  Python; de Home Assistant-back-up dekt de app.
- Restrisico: de sleuteluitwisseling is alleen X25519 — nog niet
  post-quantum. Hybride handtekeningen maken de sleuteluitwisseling
  niet post-quantum.

</details>

## Wat een relay ziet

De GFS (Global Federation Server) — de wereldwijde
federatieserver, de relay die huishoudens helpt elkaar te vinden —
brengt de posts van een wereldwijde space naar huishoudens waarmee
je niet gekoppeld bent: volgers, en leden die via een GFS-link
zijn toegetreden. Gekoppelde huishoudens krijgen ze rechtstreeks
of via de mesh. Hij draagt verzegelde enveloppen, opgevuld tot
een paar vaste groottes, en waaiert ze uit. Hij slaat
geen inhoud op: is een huishouden offline, dan bewaart hij de
verzegelde enveloppen een dag en laat ze daarna los. Zie
[GFS](/nl/docs/glossary/#gfs) in de woordenlijst.

| Modus                     | Wat de relay te weten komt                                                                           |
| ------------------------- | ---------------------------------------------------------------------------------------------------- |
| **Vertrouwd** (standaard) | dat _iemand_ in de space plaatste, en wanneer — nooit welk huishouden                                |
| **Strikt** (opt-in)       | hetzelfde, en hij kan niet zien welke huishoudens mogen schrijven                                    |
| **Privé space, GFS aan**  | welke huishoudens bij het kanaal horen — nooit de naam, het id, de sleutel of de inhoud van de space |

Alleen de GFS'en die de eigenaar voor een space heeft gekozen,
doen mee. In elke modus ziet de relay nog steeds het IP-adres van
de afzender, de tijdstippen, de grootteklasse en welke huishoudens de
posts van een space ontvangen. Een gewone ledensynchronisatie
vertelt de GFS niets.

<details class="tech">
<summary>Onder de motorkap</summary>

- Alleen routeringsmetadata: `space_id`, `event_type`,
  grootteklasse, tijdstippen, abonneeset, bron-IP.
- Als het host-huishouden een post doorgeeft, noemt het verzoek
  helemaal geen huishouden: `{space_id, event_type, payload}` op
  een sessie zonder cookies, en alleen naar een GFS die
  `anonymous_publish` heeft bewezen — anders wordt er niets
  verstuurd.
- Als een lid voor zichzelf publiceert (zodat de host niet online
  hoeft te zijn), ondertekent het in beide modi met een gedeelde
  schrijfsleutel per epoche, zodat de GFS niet kan zien welk lid
  plaatste. Het stuurt naar elke GFS op de door de eigenaar
  ondertekende lijst (maximaal 8), via een sessie zonder cookies
  die vastgepind is op het vermelde adres, nadat die GFS heeft
  bewezen dat hij de vermelde sleutel bezit. In de strikte modus
  abonneren schrijvers zich bovendien in dezelfde geschudde batch
  als volgers.
- Privé spaces: `private_gfs` standaard uit; indien aan, een
  ondoorzichtig 128-bits kanaal-id op de GFS'en die de eigenaar
  kiest.
- Opvulklassen: 1 / 4 / 16 / 64 / 128 KiB voor publicaties door
  leden, plus een klasse van 191 KiB voor envelop-relay.
- Offline ontvangers: 24 h in de wachtrij, hoogstens 2000
  enveloppen of 64 MiB per ontvanger. Je huishouden probeert
  opnieuw met backoff: 5 s, 30 s, 2 min, 10 min.

</details>

## Mesh en gesprekken

Als twee lid-huishoudens elkaar niet rechtstreeks kunnen bereiken,
kan een post via de servers van andere leden hoppen. Elke hop is
verzegeld voor de uiteindelijke ontvanger, dus de servers ertussen
dragen hem maar kunnen hem niet openen.

Spraak- en videogesprekken lopen rechtstreeks tussen de
deelnemers. Als een rechtstreekse verbinding niet mogelijk is,
geeft een TURN-server — een relay alleen voor gesprekken — de
stream door, en die ziet alleen ooit versleutelde media.

<details class="tech">
<summary>Onder de motorkap</summary>

- `SPACE_ROUTED`-doorsturen: hoogstens drie hops, verzegeld voor
  een kortstondige X25519-sleutel van de ontvanger.
- Gesprekken: WebRTC met DTLS-SRTP tussen de deelnemers; een
  TURN-terugval geeft alleen cijfertekst door.

</details>

## Apps

Apps uit de catalogus draaien in een afgesloten doos binnen Social
Home. Een app kan niet naar huis bellen, kan niets van het
internet laden en kan niet achter je rug om voor een andere versie
worden verwisseld. Apps reizen rechtstreeks tussen huishoudens; de
GFS komt er niet aan te pas.

<details class="tech">
<summary>Onder de motorkap</summary>

- Bundels sha256-pinned; limiet van 1 MiB.
- Sandboxed iframe (alleen `allow-scripts`) met
  `connect-src 'none'`.
- Peer-to-peer verspreid tussen gekoppelde huishoudens.

</details>

## Openbare links

Een openbare highlight-link, de deellink van een moment, de pagina
van een wereldwijde space, een GFS-uitnodigingslink en een
Momentum-profiel worden geopend door mensen die niet op Social Home
zitten, in een gewone browser. Ze openen allemaal in de
[Social Home-viewer](/nl/docs/glossary/#viewer) op
`viewer.social-home.io` — een pagina die de GFS niet aanbiedt.

Dat doet ertoe vanwege de plek van de sleutel. Een highlight- of
momentlink draagt zijn sleutel na de `#`, en dat deel sturen browsers
nooit naar een server, dus de GFS krijgt hem nooit. Maar de pagina
die de link opent, is de code die de sleutel leest. Als de GFS die
pagina aanbood, kon hij er een aanbieden die de sleutel kopieert. Met
de viewer kunnen de mensen die een GFS draaien niet lezen wat je deelt
en de pagina die je bezoeker ziet niet veranderen. De GFS helpt nog
steeds een link af te leveren — verzegelde bytes, nooit de sleutel.

De viewer is gemaakt om gecontroleerd te worden, niet om blind te
vertrouwen:

- Elke versie heeft een eigen adres, en de bestanden erachter
  veranderen nooit. Een link noemt precies de versie waarvoor hij
  gemaakt is.
- De pagina vertelt de browser precies welk script hij moet draaien;
  één gewijzigde byte en de browser weigert het.
- De viewer wordt twee keer gebouwd — door de Social Home-release en
  nog eens door de aparte repository
  [`social-home-io/viewer`](https://github.com/social-home-io/viewer)
  — en alleen gepubliceerd als beide builds gelijk zijn. Versies
  worden alleen toegevoegd, dus oude links blijven openen.

Wat je in plaats daarvan vertrouwt, is de host van de viewer: GitHub
Pages en de organisatie `social-home-io`. Een zelf gehoste GFS of
huishouden kan naar een eigen kopie van de bestanden wijzen.

<details class="tech">
<summary>Onder de motorkap</summary>

- Pad `v/<hash>/`: de eerste 16 hextekens van de sha384 van de pagina,
  die de SRI-hash van het script en de hashes van de styles bevat. Het
  manifest `socialhome/pinned_viewer.json` is ingecheckt; CI bouwt de
  viewer twee keer en faalt bij elk verschil in bytes.
- CSP van de pagina: `default-src 'none'`, script per hash,
  `img-src blob: data:`, `base-uri 'none'`, `form-action 'none'`;
  `no-referrer`. Elk verzoek gaat naar de GFS uit het fragment, met
  `credentials: 'omit'` en `redirect: 'error'`; een GFS zonder
  `https` weigert de viewer.
- Highlight-streams: AES-256-GCM per frame onder
  `HKDF-SHA256(ECDH(P-256), salt = linkgeheim)`, op het directe
  DataChannel en de relay-terugval gelijk.
- `/spaces/{id}`, `/join/{token}` en `/moments/{user}` van de GFS
  antwoorden met een inerte overdrachtspagina (alleen preview-tags,
  `default-src 'none'`); de viewer leest `/gfs/pages/*` cross-origin
  zonder inloggegevens en toont de Over-tekst als nodes, nooit als
  HTML.
- Eigen origin `viewer.social-home.io`, geen gedeelde
  `github.io`-origin die een andere site van de organisatie met een
  service worker zou kunnen inpikken.
- De `gh-pages`-branch van de viewer-repo is via een ruleset
  append-only.

</details>

## De kleine dingen

- Een space die op de GFS-kaart staat, heeft zijn locatie afgerond
  op ongeveer 11 m — de straat, niet de voordeur.
- Posts kunnen geen afbeeldingen van andere websites laden, dus
  niemand kan een trackingpixel in je feed planten.
- Linkvoorbeelden worden alleen door het huishouden van de auteur
  opgehaald, nooit door elke lezer. Een huishoudbeheerder kan ze
  uitschakelen.
- Pushmeldingen bevatten alleen de titel; de inhoud wacht tot je
  de app opent.
- Beschermde accounts voor minderjarigen worden zonder meer
  geweigerd voor de Bazaar, openbare spaces, openbare momenten,
  openbare highlight-links en API-tokens — zie
  [Gezinsveiligheid](/nl/docs/family-safety/).

<details class="tech">
<summary>Onder de motorkap</summary>

- Gps afgekapt op 4 decimalen (~11 m).
- CSP `img-src 'self' data: blob:` blokkeert externe afbeeldingen
  in gebruikersinhoud.
- Linkvoorbeelden: opgehaald door het huishouden van de auteur,
  beveiligd tegen SSRF, door de beheerder uit te schakelen.
- API- en WebSocket-antwoorden zijn beperkt tot wat de weergave
  nodig heeft.
- `min_age` wordt gecontroleerd op elk pad dat een lid een plek
  geeft.

</details>

## Hoe we het waar houden

Elke regel op deze pagina heeft tests achter zich, en die tests
draaien voor elke release. Faalt er één, dan gaat de release niet
uit — er is geen „we lossen het de volgende keer op”. Wijzigingen
aan beveiligingsgevoelige code krijgen een tweede, bewust
vijandige review, en elke wijziging aan een principe krijgt een
gedateerde aftekening in het principesbestand, met wat het
onopgelost laat ernaast opgeschreven.

Wat we nog niet hebben: geautomatiseerd scannen van
afhankelijkheden van derden. Dat staat op de lijst, niet in de
pijplijn.

<details class="tech">
<summary>Onder de motorkap</summary>

- 68 protocoltestbestanden met het label `security`; ze blokkeren
  een release ongeacht de dekkingscijfers.
- CI: pytest met 90 % branch-dekking, de beveiligingstests als
  aparte stap, ruff, mypy, eslint, tsc, vitest.
- Aftekeningen staan in
  [`docs/principles.md`](https://github.com/social-home-io/socialhome/blob/main/docs/principles.md).
- Nog geen CodeQL, bandit of scannen van afhankelijkheden.

</details>

## Bekende restrisico's

De dingen die vandaag waar zijn en die je moet weten voordat je
ons de groepschat toevertrouwt:

- Een GFS die de eigenaar van de space heeft gekozen, maar
  waarmee je huishouden nooit verbonden was, ziet je IP-adres als
  je daar post. Omdat anonieme schrijvers niet van elkaar te
  onderscheiden zijn, kan een GFS niet één huishouden bannen; de
  eigenaar verwijdert een schrijver door de sleutel van de space
  te roteren.
- In elke modus ziet de relay je IP-adres, de tijdstippen en de
  grootteklasse van elke envelop, en welke huishoudens de posts van
  een space ontvangen.
- De sleuteluitwisseling is nog niet post-quantum; alleen
  handtekeningen hebben een opt-in post-quantumvariant.
- Er is nog geen geautomatiseerd scannen van afhankelijkheden.
- Openbare links openen in de [viewer](#openbare-links), dus je
  vertrouwt de host ervan — GitHub Pages en de organisatie
  `social-home-io` — om de uitgebrachte bestanden aan te bieden. De
  vingerafdrukken maken een verwisselde pagina herkenbaar, maar alleen
  als iemand het controleert.
- Een openbare highlight- of momentlink is een sleutel. Wie hem heeft,
  kan hem openen, en hij staat in de browsergeschiedenis van iedereen
  die hem opende. De deellink van een moment kun je alleen terugnemen
  door het moment te verwijderen.
- De GFS ziet wanneer een openbare link wordt geopend, en vanaf welk
  adres. Een highlight dat opent, laat zien dat je huis op dat moment
  online was.

## Een probleem melden

Vind je een gat, vertel het ons dan liever privé dan in een
openbaar issue: open een melding onder
[GitHub Security Advisories](https://github.com/social-home-io/socialhome/security)
in de repository `social-home-io/socialhome`.
