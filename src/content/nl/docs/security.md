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

De sleutels op je schijf zijn ingepakt onder een hoofdsleutel. Heb
je de add-on geïnstalleerd, dan reizen ze mee met je normale Home
Assistant-back-up; op een losstaande installatie download je een
Recovery Kit en bewaar je die op een veilige plek.

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
  Recovery Kit `.shrk` = scrypt + AES-256-GCM, voor losstaande
  installaties; de Home Assistant-back-up dekt add-on-installaties.
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
| **Vertrouwd** (standaard) | welk huishouden in welke vermelde space plaatste, bij welke sleutelepoche, en wanneer                |
| **Strikt** (opt-in)       | dat _iemand_ in de space plaatste — de afzender is anoniem tussen de schrijvers van de space         |
| **Privé space, GFS aan**  | welke huishoudens bij het kanaal horen — nooit de naam, het id, de sleutel of de inhoud van de space |

In elke modus ziet de relay nog steeds het IP-adres van de
afzender, de tijdstippen, de grootteklasse en welke huishoudens de
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
  hoeft te zijn), ondertekent de vertrouwde modus het verzoek met
  de sleutel van dat huishouden; de strikte modus ondertekent het
  in plaats daarvan met een gedeelde schrijfsleutel per epoche,
  zodat de GFS niet kan zien welk lid plaatste.
- Privé spaces: `private_gfs` standaard uit; indien aan, een
  ondoorzichtig 128-bits kanaal-id.
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

- In de vertrouwde modus komt de relay te weten welk huishouden in
  welke space plaatste, en wanneer.
- In elke modus ziet de relay je IP-adres, de tijdstippen en de
  grootteklasse van elke envelop, en welke huishoudens de posts van
  een space ontvangen.
- De sleuteluitwisseling is nog niet post-quantum; alleen
  handtekeningen hebben een opt-in post-quantumvariant.
- Er is nog geen geautomatiseerd scannen van afhankelijkheden.

## Een probleem melden

Vind je een gat, vertel het ons dan liever privé dan in een
openbaar issue: open een melding onder
[GitHub Security Advisories](https://github.com/social-home-io/socialhome/security)
in de repository `social-home-io/socialhome`.
