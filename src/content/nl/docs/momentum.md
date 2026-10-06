---
title: Momentum
description: Eenmalige berichten die drie hops ver uitwaaieren over de federatie. Tot 1 000 tekens plus een afbeelding of een clip van 15 seconden; weg na een dag, of na een week voor mensen die je volgt.
order: 24
---

**Momentum** is de uitzendpijler van Social Home. Elk bericht —
een _moment_ — waaiert uit over gekoppelde huishoudens _en hun
gekoppelde huishoudens_, tot drie hops (stappen) ver. Antwoorden
zijn zelf ook momenten, gekoppeld aan het moment dat ze
beantwoorden, zodat een draad als één geheel leest. De hele pijler
staat onder **Praten → Momentum** in de zijbalk; het dashboard
**Bladeren → Momentenarchief** groepeert elk ontvangen moment per
dag binnen de bewaartermijn.

## Wat je kunt plaatsen

- Tot **1 000 tekens** tekst (de editor toont een live teller).
- Optioneel één **afbeelding** _of_ één **videoclip van hoogstens
  15 seconden**. De editor weigert langere clips al vóór het
  uploaden, zodat je geen bandbreedte verspilt.
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

- **24 uur** standaard voor momenten van mensen die je niet
  volgt.
- **7 dagen** voor momenten van iedereen op je volglijst.
- De bewaarplanner gooit elk uur elke rij weg die over de absolute
  grens van 7 dagen is; het zichtbare venster wordt per kijker
  berekend bij het ophalen van de lijst. Je kunt volgen / ontvolgen
  via het ⋯-menu op elk moment, of via **Instellingen → Privacy →
  Volgend**.

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
lager zetten. **Instellingen → Privacy → Zichtbaarheid Momentum**
kiest tussen **1 hop** (alleen je gekoppelde huishoudens),
**2 hops** (ook hun gekoppelde huishoudens) en **3 hops**
(standaard — het volledige relaybereik). De instelling verandert
alleen wat _jij_ ziet; je huishouden geeft nog steeds de volle
drie hops door, zodat de rest van het mesh intact blijft.

## Doorgeven zonder opslaan

Als een inkomend moment binnenkomt en niemand in je huishouden het
kan zien — zeg dat iedereen max-hops op 1 heeft gezet, of dat ze
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
bij **Instellingen → Privacy → Openbare Momentum**, kies een GFS,
en je momenten waaieren uit naar iedereen daar die je volgt. Wat
de GFS over je weet, is precies wat je instelt bij **Instellingen
→ Profiel**: weergavenaam, bio, avatar. Werk die bij en de kopie
op de GFS ververst bij het opslaan — één identiteit, geen aparte
versies per pijler.

### Ontdekken en volgen

- **In je Social Home.** **Praten → Momentum → Ontdekken** toont
  elke openbare auteur op elke GFS waarmee je gekoppeld bent. Zoek
  op naam, handle of bio; één klik om te volgen. Hun volgende
  moment belandt in je inbox naast de momenten van gekoppelde
  huishoudens — gemarkeerd met een chip „via {gfs}”.
- **Vanaf het open web.** Elke GFS host een openbare landingspagina
  op `/users` (de directory) en `/users/<id>` (pagina per auteur
  met avatar, bio, aantal volgers en een deeplink die de volgflow
  op jouw Social Home opent). Handig om je Momentum-profiel te
  delen met mensen die nog niet op een Social Home zitten.

De directorykaarten gebruiken dezelfde avatar + bio + weergavenaam
die gekoppelde huishoudens zien — er is geen aparte „openbare
persona” om bij te houden.

## Snelheidslimiet

Eén moment **op het hoogste niveau** per auteur per **15 minuten**.
Antwoorden en reacties zijn uitgezonderd — een heen-en-weer-draad
hoort niet stil te vallen in afwachting van de timer.

<details class="tech">
<summary>Onder de motorkap</summary>

Het venster van 15 minuten wordt op de servicelaag afgedwongen; de
API geeft een 429-foutcode `MOMENT_RATE_LIMIT` terug wanneer het
ingaat.

</details>

## Reacties

Kies uit een snelle rij emoji op de detailpagina, of tik op een
bestaande reactie om de jouwe te zetten / te wijzigen. Reacties
gaan alleen terug naar het huishouden van de auteur, en de teller
op diens scherm werkt live bij.

<details class="tech">
<summary>Onder de motorkap</summary>

Reacties reizen over een unicast-terugkanaal naar het huishouden
van de auteur; de update komt aan als een
`moment.reaction_changed`-WebSocket-frame in de sessie van de
auteur.

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
| `GET`                     | `/api/moments/archive`             | Volledige lijst binnen de bewaartermijn voor het kalenderdashboard.                               |
| `GET`                     | `/api/moments/{id}`                | Detail met antwoorden + reacties.                                                                 |
| `DELETE`                  | `/api/moments/{id}`                | Verwijderen door auteur of beheerder.                                                             |
| `PUT` / `DELETE`          | `/api/moments/{id}/reaction`       | Je eigen emoji zetten / wissen.                                                                   |
| `POST`                    | `/api/moments/{id}/report`         | Een `content_reports`-rij indienen.                                                               |
| `GET` / `POST` / `DELETE` | `/api/moments/follows[/{user_id}]` | Je volglijst beheren.                                                                             |

De huishoudschakelaar `feat_momentum` in **Instellingen →
Huishoudfuncties** schakelt elk bovenstaand eindpunt uit met een
403-antwoord `FEATURE_DISABLED` wanneer beheerders de pijler uit
willen laten.

</details>
