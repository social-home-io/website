---
title: Privacymodel
description: Wat Social Home bewaart, wat reist, en wat niemand — ook wij niet — ooit kan zien.
order: 50
---

Social Home is gebouwd op een simpele regel: **het huishouden
bewaart alles**. Er is geen cloudaccount, geen analytics, geen
logger op afstand, geen groeiteam. De website die je nu leest is
statische HTML, geserveerd door GitHub Pages — geen analytics,
geen cookies, geen verzoeken naar derden; zelfs de lettertypen
komen van dezelfde plek.

Deze pagina somt elk stukje data op dat Social Home aanraakt en
precies waar het heen gaat. De pagina
[Beveiligingsmodel](/nl/docs/security/) legt uit hoe het
verzegelen werkt en wat het niet kan; de woorden die hier worden
gebruikt staan in [Woorden die we gebruiken](/nl/docs/glossary/).

## Wat waar woont

| Data                                           | Thuis opgeslagen?    | Verlaat het je server?                                                             |
| ---------------------------------------------- | -------------------- | ---------------------------------------------------------------------------------- |
| Berichten, posts, foto's                       | ja                   | alleen naar huishoudens in de space, verzegeld                                     |
| Privéberichten                                 | ja                   | verzegeld naar de server van het andere huishouden                                 |
| Boodschappenlijst                              | ja                   | alleen tussen de apparaten van je huishouden                                       |
| Agenda-afspraken                               | ja                   | alleen naar huishoudens die de agenda delen                                        |
| Spraaktranscripties                            | ja (de tekst)        | net als posts                                                                      |
| Avatars + weergavenamen                        | ja                   | ja — naar gekoppelde huishoudens (zo herkennen ze je)                              |
| Publieke sleutel (identiteit)                  | ja                   | ja — dat is letterlijk het hele punt van koppelen                                  |
| Externe URL                                    | ja                   | ja — naar gekoppelde huishoudens wanneer die verandert                             |
| Je Home Assistant-account (e-mail, wachtwoord) | **nooit gelezen**    | nooit                                                                              |
| Gps / locatiegeschiedenis                      | **nooit** standaard  | alleen de huidige zone, alleen als je ervoor kiest; kaartspelden afgerond op ~11 m |
| Logs                                           | blijven op je server | nooit                                                                              |

## Wat de wereldwijde relay ziet

De GFS (Global Federation Server) — de wereldwijde
federatieserver, de relay die huishoudens helpt elkaar te vinden —
toont wereldwijde spaces en brengt hun posts, als verzegelde
enveloppen, naar huishoudens waarmee je niet gekoppeld bent. Wat hij over je te weten komt, hangt af van hoe de
space is ingesteld (zie [GFS](/nl/docs/glossary/#gfs) in de
woordenlijst):

- **Vertrouwd** (de standaard): welk huishouden in welke vermelde
  space plaatste, en wanneer.
- **Strikt** (opt-in per space): alleen dat _iemand_ in de space
  plaatste. De afzender is anoniem tussen de schrijvers van de
  space.
- **Een privé space met de GFS-schakelaar aan** (standaard uit):
  welke huishoudens bij het kanaal horen — nooit de naam, het id,
  de sleutel of de inhoud van de space.

Hij ziet **nooit**:

- De inhoud van welk bericht, welke post, agenda-afspraak, foto of
  spraakmemo dan ook.
- Iets uit een privé space met de GFS-schakelaar uit, of uit een
  huishoudspace.
- De boodschappenlijst, agenda, aanwezigheid of logs van je
  huishouden.

Hij ziet wel je IP-adres, de tijdstippen en de ruwe grootte van
elke envelop, en welke huishoudens de posts van een space
ontvangen.

Er komt helemaal geen relay aan te pas als je geen wereldwijde
spaces hebt (en geen openbare space die je met de hand op een GFS
hebt gepubliceerd), geen openbare momenten, geen openbare
highlight-links en geen privé space met de GFS-schakelaar aan. Je
huishouden praat dan alleen met huishoudens waarmee je gekoppeld
bent, rechtstreeks.

<details class="tech">
<summary>Onder de motorkap</summary>

Alleen routeringsmetadata: `space_id`, `event_type`, grootteklasse
(1 / 4 / 16 / 64 / 128 KiB, plus 191 KiB voor envelop-relay),
tijdstippen, abonneeset, bron-IP. Een post die door het
host-huishouden wordt doorgegeven is identiteitsvrij
`{space_id, event_type, payload}` op een sessie zonder cookies;
een lid dat voor zichzelf publiceert is in de vertrouwde modus
ondertekend door het huishouden en in de strikte modus met een
gedeelde schrijfsleutel per epoche. Een privé space met
`private_gfs` aan gebruikt een ondoorzichtig 128-bits kanaal-id.
Offline ontvangers staan 24 h in de wachtrij (2000 enveloppen /
64 MiB per ontvanger); daarbuiten wordt geen inhoud opgeslagen.

</details>

## Versleuteling

Elk bericht dat je server verlaat is versleuteld — altijd, zonder
schakelaar die je kunt vergeten. Elke post wordt in een envelop
verzegeld en ondertekend, zodat alleen de huishoudens in de space
hem kunnen openen en zelfs een kwaadwillende relay geen woord kan
lezen. Privéberichten worden verzegeld van jouw huis tot het
hunne. Er is geen schakelaar „versleuteld / niet versleuteld” en
geen terugval naar platte tekst: als een space niet kan
verzegelen, verstuurt hij niet.

De regel is simpel: niets verlaat het huis onverzegeld, en niets
wat een relay aanraakt is ooit leesbaar.

<details class="tech">
<summary>Onder de motorkap</summary>

AES-256-GCM-enveloppen, Ed25519-handtekeningen. De enige leesbare
velden op een envelop zijn `event_type`, `from_instance`,
`to_instance`, `space_id` en `epoch`. Alle details op de pagina
[Beveiligingsmodel](/nl/docs/security/).

</details>

## Dingen die Social Home niet heeft

- Een account in een Social Home-cloud (die is er niet).
- Een kopie van je gegevens ergens anders. Heb je de add-on
  geïnstalleerd, dan maakt Social Home deel uit van je normale Home
  Assistant-back-up; op een losstaande installatie download je een
  Recovery Kit en bewaar je die op een veilige plek.
- Telemetrie, analytics, crashrapportage of A/B-testen.
- Een advertentieplek.
- Een groeiteam dat je avond wil verzilveren.

<details class="tech">
<summary>Onder de motorkap</summary>

Sleutels in rust zijn ingepakt onder een KEK. De Recovery Kit is
een `.shrk`-bestand, verzegeld met scrypt + AES-256-GCM.

</details>

## Dingen waar jij over gaat

- **Wie er in een space zit** (Instellingen → Spaces — nodig leden
  uit of verwijder ze; elke wijziging in het ledenbestand geeft de
  space een nieuwe sleutel, dus wie verwijderd is kan niets lezen
  wat daarna is geplaatst).
- **Aanwezigheid delen** (Instellingen → Privacy — opt-in, per lid
  van het huishouden, op elk moment uit te zetten).
- **Koppelen** (Instellingen → Verbindingen — verwijder een
  huishouden en zijn kopie van je berichten wordt niet langer
  vertrouwd).
- **Welke relay, als er al een is** (Instellingen → Verbindingen —
  de GFS is optioneel en jij kiest welke).
- **Back-ups** — jouw verantwoordelijkheid, zoals al het andere in
  je huis.

## Problemen melden

Beveiligingsproblemen horen thuis in
[`social-home-io/socialhome`](https://github.com/social-home-io/socialhome/security)
op GitHub. Meld ze liever privé via de link naar GitHub Security
Advisories dan in een openbaar issue.
