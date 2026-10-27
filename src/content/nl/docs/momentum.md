---
title: Momentum
description: Korte berichten die drie stappen ver reizen langs gekoppelde huishoudens. Tot 1 000 tekens plus een afbeelding of een clip van 15 seconden; weg na een dag, of zo lang als de auteur kiest voor wie hem volgt. Je eigen momenten blijven onder Van jou.
order: 24
---

**Momentum** is de uitzendpijler van Social Home. Elk bericht —
een _moment_ — waaiert uit over gekoppelde huishoudens _en hun
gekoppelde huishoudens_, tot drie hops (stappen) ver. Antwoorden
zijn zelf ook momenten, gekoppeld aan het moment dat ze
beantwoorden, zodat een draad als één geheel leest. De hele pijler
staat onder **Praten → Momentum** in de zijbalk, met drie
tabbladen: **Momenten** (alles wat jou bereikte), **Van jou** (alles
wat je plaatste) en **Ontdekken** (openbare auteurs op een GFS). De
knop **#** filtert op hashtag, in elke taal. Start toont een regel
„Momentum · 3 nieuw” als er nieuwe momenten wachten.

## Wat je kunt plaatsen

- Tot **1 000 tekens** tekst (de editor toont een live teller).
- Optioneel één **afbeelding** _of_ één **videoclip van hoogstens
  15 seconden**. De editor weigert langere clips al vóór het
  uploaden, zodat je geen bandbreedte verspilt.
- De regel onder het invoerveld zegt waar het moment heen gaat:
  „Gekoppelde huishoudens en die van hen, tot 3 stappen · 24 u”.
  Tik op ⓘ voor de details.
- Antwoorden hangen aan het moment dat ze beantwoorden. De draad
  blijft plat — een antwoord op een antwoord hangt aan de
  oorspronkelijke draadwortel, zodat de detailweergave van boven
  naar beneden leest zonder geneste takken.

<details class="tech">
<summary>Onder de motorkap</summary>

Een antwoord draagt `parent_moment_id`; geneste antwoorden krijgen
bij aanmaak de draadwortel als ouder.

</details>

## Bewaartermijn

- **24 uur** voor iedereen die je niet volgt.
- **Zo lang als jij kiest** voor mensen die je volgen: 1, 3, 7
  (standaard), 14 of 30 dagen, onder **Instellingen → Privacy →
  Momentum → Je volgers houden je momenten**. Het geldt voor
  momenten die je vanaf dat moment plaatst.
- **Je eigen momenten blijven.** Alles wat je plaatst, blijft onder
  **Van jou** staan, met wie het ziet en tot wanneer, ook als het
  voor alle anderen is afgelopen. De beheerder van je huishouden kan
  onder **Admin → Opslag** instellen hoeveel ruimte foto's en video's
  per persoon mogen innemen (standaard 2 GB); daarboven gaan de
  oudste foto's en video's als eerste weg en blijft de tekst staan.
- **Bewaar het moment van iemand anders** via het ⋯-menu, en het
  blijft bij je tot de auteur het verwijdert. Een verwijdering haalt
  ook bewaarde kopieën weg, dus Bewaren verschijnt alleen waar een
  verwijdering je kopie kan bereiken: een moment uit je huishouden,
  uit een direct gekoppeld huishouden of van een GFS die
  verwijderingen bijhoudt.

Volg iemand via het profielpaneel van die persoon. Bij iemand uit
een gekoppeld huishouden zie je de momenten zo lang als die persoon
ze bewaart, en het volgen blijft tussen jullie huishoudens. Bij
iemand die je alleen via een GFS kent, loopt het volgen via die GFS,
die dan weet dat je deze persoon volgt.

<details class="tech">
<summary>Onder de motorkap</summary>

Het venster voor volgers reist mee in de ondertekende `expires_at`
van het moment, zodat elk ontvangend huishouden zich eraan houdt;
waarden worden afgekapt op 30 dagen. De verwijdering van een auteur
wordt 30 dagen lang opnieuw geprobeerd, doorgevers geven hem alleen
door als hij iets veranderde, en een GFS bewaart de ondertekende
verwijderingscertificaten (zonder inhoud) 30 dagen voor volgers die
opnieuw verbinding maken. Bewaren is een pin per persoon
(`PUT /api/moments/{id}/save`) op de kopie die je huishouden al
heeft; de auteur komt er niets over te weten.

</details>

## Federatie — de relay in 3 hops

```
            hop=1               hop=2                     hop=3
   A ───►   B ───►              C ───►                    D
   auteur   gekoppeld huishouden  gekoppeld huishouden van B  gekoppeld huishouden van C
                                  (slaat A over)              (slaat A en B over)
```

Je huishouden stuurt het moment naar elk huishouden waarmee het
gekoppeld is. Elk daarvan houdt een kopie, toont het aan zijn
eigen leden en geeft het door aan _zijn_ gekoppelde huishoudens —
met overslaan van wie het al heeft — totdat het drie hops heeft
afgelegd. Een moment dat twee keer aankomt via twee routes wordt
gewoon herkend en één keer bewaard. Wie het ontvangt, kan altijd
controleren dat het echt van de oorspronkelijke auteur kwam, ook
als het via een vriend van een vriend binnenkwam.

<details class="tech">
<summary>Onder de motorkap</summary>

Het huishouden van de auteur waaiert het moment uit naar elk
gekoppeld huishouden met `hop_count = 1`. Elk ontvangend
huishouden:

1. **Bewaart** de rij (UPSERT op `moment_id`, zodat dubbele
   bezorging via twee relaypaden een no-op is).
2. **Publiceert** het busevent opnieuw, zodat de realtime-laag een
   `moment.created`-WebSocket-frame naar lokale kijkers pusht.
3. **Zendt** dezelfde envelop opnieuw uit naar _zijn eigen_
   gekoppelde huishoudens — met verhoging van `hop_count` en met
   overslaan van zowel de oorspronkelijke bron als de directe
   afzender.
4. **Stopt** wanneer `hop_count` boven `MOMENT_MAX_HOPS` (3) zou
   uitkomen.

De envelop draagt een veld `origin_instance_id` dat de
oorspronkelijke afzender over de hops heen vastlegt, zodat het
ontvangende huishouden de autoriteit kan verifiëren, ook als de
envelop van een doorgever kwam in plaats van uit het huis van de
auteur.

</details>

## Hoe ver je wilt kijken

Drie hops is de limiet op draadniveau; je kunt hem per account
lager zetten. **Instellingen → Privacy → Momentum → Momenten tonen
tot** kiest tussen **1 stap** (alleen je gekoppelde huishoudens),
**2 stappen** (ook hun gekoppelde huishoudens) en **3 stappen**
(standaard — elk moment dat je bereikt). De instelling verandert
alleen wat _jij_ ziet; je huishouden geeft nog steeds de volle
drie hops door, zodat de rest van het mesh intact blijft.

## Beschermde accounts

Een beschermd account, meestal dat van een kind, ziet alleen
momenten van het eigen huishouden en direct gekoppelde huishoudens,
dezelfde kring die zijn eigen momenten en antwoorden bereiken. Het
heeft geen tabblad Ontdekken en kan niet openbaar plaatsen. Zie
[Gezinsveiligheid](/nl/docs/family-safety/).

## Doorgeven zonder opslaan

Als een inkomend moment binnenkomt en niemand in je huishouden het
kan zien — zeg dat iedereen „Momenten tonen tot” op 1 stap heeft
gezet, of dat ze
allemaal de auteur blokkeren — slaat je huishouden de lokale kopie
helemaal over en stuurt het alleen door naar de volgende hop. Pure
doorvoer: geen schrijfactie naar schijf, geen bewaarwerk, geen
plek in de interface. Het mesh blijft heel voor alle anderen; je
huishouden houdt alleen geen kopie van iets waar niemand om vroeg.

## Verbannen huishoudens + open meldingen

Twee extra poorten zitten bovenop de relay:

- **Verbannen huishoudens.** Beheerders kunnen een heel huishouden
  verbannen; momenten daarvan worden bij aankomst weggegooid en
  nooit doorgegeven. Elk huishouden houdt zijn eigen lijst bij —
  verbanningen federeren niet.
- **Open inhoudsmeldingen.** Zolang er een melding openstaat tegen
  een moment of zijn auteur, waaiert je huishouden het moment niet
  uit naar anderen. De melding oplossen of afwijzen herstelt de
  relay. De auteur ziet zijn eigen moment nog steeds lokaal —
  andere huishoudens lopen pas bij nadat een moderator heeft
  gehandeld.

<details class="tech">
<summary>Onder de motorkap</summary>

Verbanningen zijn instance-id's onder **Instellingen → Federatie →
Verbannen instances**; overeenkomende inkomende momenten worden in
de §24.11-pijplijn weggegooid. Meldingen zijn
`content_reports`-rijen; de relay-blokkade wordt opgeheven zodra
de rij via `/api/admin/reports` is opgelost of afgewezen.

</details>

## Openbaar gaan via een Global Federation Server

Drie hops dekken gekoppelde huishoudens, maar het bredere netwerk
loopt via de [GFS (Global Federation Server)](/nl/docs/glossary/#gfs)
— de relay die huishoudens helpt elkaar te vinden. Meld je aan
bij **Instellingen → Privacy → Openbaar delen** (ook gelinkt vanuit
**Van jou** en het invoerveld) en kies een GFS. Openbaar blijft
voor elk moment **uit** tot je in het invoerveld „Ook openbaar op …”
aanzet; op de knop staat dan **Openbaar plaatsen**. Wil je liever
dat elk nieuw moment openbaar is, zet daar dan **Nieuwe momenten
openbaar maken** aan. Openbaar kies je bij het schrijven, niet
achteraf. Een antwoord kan alleen openbaar zijn als het moment
waarop het antwoordt openbaar is. Openbare momenten waaieren uit
naar iedereen op die GFS die je volgt. Wat de GFS over je weet, is precies wat je instelt bij **Instellingen
→ Profiel**: weergavenaam, bio, avatar. Werk die bij en de kopie
op de GFS ververst bij het opslaan — één identiteit, geen aparte
versies per pijler.

### Ontdekken en volgen

- **In je Social Home.** Het tabblad **Ontdekken** in Momentum toont
  elke openbare auteur op elke GFS waarmee je gekoppeld bent. Zoek
  op naam, handle of bio; één klik om te volgen. Hun volgende
  moment belandt in je inbox naast de momenten van gekoppelde
  huishoudens — gemarkeerd met een chip „via {gfs}”.
- **Vanaf het open web.** Elke GFS toont zijn openbare auteurs op
  `/moments`, en elke auteur heeft een profielpagina op
  `/moments/<id>` met foto, bio en een knop **Volgen**. Het profiel
  opent in de [Social Home-viewer](/nl/docs/glossary/#viewer), een
  pagina die geen GFS aanbiedt. Handig om je Momentum-profiel te delen
  met mensen die nog niet op een Social Home zitten. Het profiel laat
  zien wie je bent, niet wat je gepost hebt.

De directorykaarten gebruiken dezelfde avatar + bio + weergavenaam
die gekoppelde huishoudens zien — er is geen aparte „openbare
persona” om bij te houden.

### Eén moment delen

Wil je één openbaar moment laten zien aan iemand zonder Social Home,
open het dan en tik op **Deellink kopiëren**. De link opent precies
dat moment — en niets anders wat je gepost hebt — in de Social
Home-viewer, tot het moment afloopt. Dat werkt zelfs als je huis
offline is: de GFS bewaart een verzegelde kopie die hij zelf niet
kan openen, en de sleutel is het deel van de link na de `#`, dat
browsers nooit naar een server sturen. Een deellink kun je alleen
terugnemen door het moment te verwijderen, dus deel hem als een
sleutel.

<details class="tech">
<summary>Onder de motorkap</summary>

De link is
`viewer.social-home.io/v/<hash>/#g=<GFS>&a=<author>&m=<moment>&b=<share copy>&k=<item key>`.
`k` is de item-sleutel van het moment, nooit een generatie- of
stapsleutel. De deelkopie (tekst, tijden, weergavenaam,
mediabeschrijving) is eronder verzegeld, opgevuld tot 4 KB en wordt
pas naar de GFS geüpload als je om een link vraagt. De viewer haalt
die kopie en het bestand anoniem op, controleert elk SHA-256-adres en
opent ze met WebCrypto. Het huis van de auteur wordt nooit benaderd.

</details>

## Snelheidslimiet

Eén moment **op het hoogste niveau** per auteur per **15 minuten**.
Het invoerveld zegt het je voordat je schrijft: „Je volgende moment
kan om 13:24”. Intussen kun je al schrijven; tot dan staat op de
knop „Plaatsen om 13:24”. Antwoorden en reacties zijn uitgezonderd
— een heen-en-weer-draad hoort niet stil te vallen in afwachting
van de timer.

<details class="tech">
<summary>Onder de motorkap</summary>

Het venster van 15 minuten wordt op de servicelaag afgedwongen; de
API geeft een 429-foutcode `MOMENT_RATE_LIMIT` terug wanneer het
ingaat.

</details>

## Reacties

Kies uit een snelle rij emoji, of tik nog een keer op je reactie om
hem terug te nemen. Reacties gaan alleen naar het huishouden van de
auteur, ook bij auteurs twee of drie stappen ver en auteurs die je
via een GFS volgt. Onderweg zijn ze verzegeld voor het huishouden
van de auteur, zodat de huishoudens en de GFS die ze doorgeven niet
kunnen zien wie er reageerde of met welke emoji.

Alleen het huishouden van de auteur kent het volledige aantal, dus
dat stuurt de totalen een paar keer terug zolang het moment vers
is, en alleen als ze veranderd zijn. Nooit wie er reageerde. Tot de
eerste totalen binnen zijn, zie je alleen je eigen reactie, en je
nieuwe reactie telt mee bij de volgende update van de auteur.

<details class="tech">
<summary>Onder de motorkap</summary>

- Een reactie van verder weg wordt ondertekend door je huishouden
  (Ed25519), opgevuld tot 1 KB en verzegeld voor de
  key-wrap-sleutel van het huishouden van de auteur (X25519). Over
  het mesh reist ze terug langs het pad van het moment, met
  retourtokens zonder status (AES-256-GCM, HKDF uit het
  routeringsgeheim van elke doorgever). Een moment houdt tot 3
  retourpaden via verschillende buren bij; elke reactie gaat langs 2
  daarvan.
- Via een GFS gaat ze alleen naar het huishouden van de auteur, als
  je de auteur daar volgt.
- Totalen omvatten de 8 meest gebruikte emoji plus het totaal,
  ondertekend door het huishouden van de auteur, op 10 minuten,
  6 uur en 3 dagen na het plaatsen over het mesh, en op 10 minuten,
  3 uur en 24 uur via de GFS (daar verzegeld en opgevuld tot
  640 bytes).
- In de eigen sessie van de auteur komt de update aan als een
  `moment.reaction_changed`-WebSocket-frame.

</details>

## Blokkeren + rapporteren

- **Blokkeren.** Dezelfde actie `Block` die Highlights verbergt,
  verbergt ook elk moment van die auteur. Beheer blokkades bij
  **Instellingen → Privacy → Geblokkeerde accounts**.
- **Rapporteren.** ⋯ → **Rapporteren** op de detailpagina dient
  een melding in bij de beoordelingswachtrij van de
  huishoudbeheerder — dezelfde die posts, opmerkingen, highlights
  en gebruikers afhandelt — zodat de beheerder alles vanaf één plek
  beoordeelt.

<details class="tech">
<summary>Onder de motorkap</summary>

Meldingen zijn rijen in de gezamenlijke wachtrij `content_reports`;
beheerders halen ze op via `/api/admin/reports?status=pending`.

</details>

## API

<details class="tech">
<summary>Onder de motorkap</summary>

| Methode                   | Pad                                | Doel                                                                                              |
| ------------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------- |
| `GET`                     | `/api/moments`                     | Momenten weergeven die zichtbaar zijn voor de aanroeper (houdt rekening met blokkades en volgen). |
| `POST`                    | `/api/moments`                     | Een moment aanmaken. Body: `{content, media_url?, media_type?, duration_ms?, parent_moment_id?}`. |
| `GET`                     | `/api/moments/archive`             | Je eigen momenten en die je bewaard hebt (Van jou).                                               |
| `GET`                     | `/api/moments/{id}`                | Detail met antwoorden + reacties.                                                                 |
| `DELETE`                  | `/api/moments/{id}`                | Verwijderen door auteur of beheerder.                                                             |
| `PUT` / `DELETE`          | `/api/moments/{id}/reaction`       | Je eigen emoji zetten / wissen.                                                                   |
| `POST`                    | `/api/moments/{id}/report`         | Een `content_reports`-rij indienen.                                                               |
| `PUT` / `DELETE`          | `/api/moments/{id}/save`           | Het moment van iemand anders bewaren / niet meer bewaren.                                         |
| `GET` / `POST` / `DELETE` | `/api/moments/follows[/{user_id}]` | Je volglijst beheren.                                                                             |

De huishoudschakelaar `feat_momentum` in **Instellingen →
Huishoudfuncties** schakelt elk bovenstaand eindpunt uit met een
403-antwoord `FEATURE_DISABLED` wanneer beheerders de pijler uit
willen laten.

</details>
