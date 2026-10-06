---
title: Agenda & RSVP's
description: Eén overzicht voor persoonlijke, partner- en huishoudagenda's. Genodigden antwoorden ja / nee / misschien – ook over gekoppelde huishoudens heen als een afspraak met een externe space wordt gedeeld.
order: 25
---

De agenda is het centrale coördinatiepunt van een huishouden.
Persoonlijke agenda's, een gedeelde **Huis**-agenda en alle
agenda's van spaces liggen over elkaar in één kleurgecodeerde
weergave onder **Thuis → Agenda**. Afspraken kun je toevoegen
vanuit de app, met je stem of door een `.ics`-bestand in de
composer te slepen.

## RSVP's

Elke afspraak heeft een lijst met genodigden. Elke genodigde kan
antwoorden met **Ja**, **Nee** of **Misschien** – en van
gedachten veranderen tot de afspraak begint. De detailweergave
vat bovenaan de aantallen samen (`✓ 3 · ✗ 1 · ? 2`) en toont elke
genodigde met de huidige status en wanneer die voor het laatst
is gewijzigd.

Standaardzichtbaarheid:

- **Persoonlijke** afspraken – RSVP's zijn alleen zichtbaar voor
  degene die uitnodigt en de genodigde.
- **Huishoud**afspraken – RSVP's zijn zichtbaar voor elk lid van
  het huishouden.
- **Space**-afspraken – RSVP's zijn zichtbaar voor elk lid van de
  space, inclusief gekoppelde externe huishoudens.

## Capaciteit en wachtlijsten

Geef een afspraak een **capaciteit** en "Ja" is niet langer
meteen definitief: het wordt een **verzoek** dat de maker van de
afspraak (of een space-beheerder) goedkeurt, en zodra de
plaatsen vol zijn, komen verdere ja's op een **wachtlijst**.
Haakt iemand af, dan schuift de persoon die het langst op de
wachtlijst staat automatisch door. "Misschien" telt nooit mee
voor de capaciteit, dus het blijft een eerlijk "ik probeer het".
Laat je de capaciteit leeg, dan staat de afspraak open voor
iedereen, zoals voorheen.

## Federatie

Als een afspraak wordt gedeeld met een space waarvan de leden in
gekoppelde huishoudens wonen, reist elke RSVP op dezelfde
verzegelde manier naar die huishoudens als al het andere. Wie is
uitgenodigd, wat ze hebben geantwoord en elke notitie die ze
hebben getypt, zit allemaal in het verzegelde deel; alleen het
id van de afspraak is aan de buitenkant leesbaar, zodat hij
gerouteerd kan worden.

Een space-beheerder die een lid verwijdert, trekt ook stilletjes
diens RSVP in – de afspraak wordt gespiegeld naar elk gekoppeld
huishouden, dus de tellerchip wordt overal binnen enkele
seconden bijgewerkt.

<details class="tech">
<summary>Onder de motorkap</summary>

RSVP's federeren via de standaard inkomende pipeline van §24.11.
Het id van de afspraak staat als platte tekst op de envelop
(routeringsdata); de lijst met genodigden, het antwoord en een
eventuele vrije notitie reizen mee in de versleutelde payload.

</details>

## Herinneringen

Afspraken hebben een optionele herinnering – _15 minuten van
tevoren_, _1 uur van tevoren_, _1 dag van tevoren_. De
herinnering gaat via de notificatiedienst: een rij in de app,
een pushmelding (als de gebruiker push heeft ingeschakeld) en
een event waar je huisautomatiseringen op kunnen reageren – een
speaker laten klinken, de lichten dimmen, of wat het huishouden
ook heeft aangesloten.

<details class="tech">
<summary>Onder de motorkap</summary>

De automatiseringshook is een event op de eventbus van Home
Assistant, afgevuurd via de integratie die de add-on meelevert;
elke automatisering kan erop triggeren.

</details>

## Bestaande afspraken importeren

Sleep een `.ics`-bestand naar de composer, plak de URL van een
openbare agendafeed, of upload een screenshot van een papieren
uitnodiging – de AI-extractor (indien geconfigureerd) haalt
titel, begin, einde, locatie en omschrijving uit de afbeelding.
Geïmporteerde afspraken komen binnen als **concept** tot je ze
bevestigt; er federeert niets tot je op Opslaan drukt.

## Privacy

- Alles in een afspraak is verzegeld als hij naar een ander
  huishouden reist.
- De locatie van een afspraak van het type _locatie_ wordt
  vervaagd tot ongeveer 11 meter voordat hij ooit wordt
  opgeslagen of verzonden.
- Persoonlijke agenda's federeren nooit. Alleen de huishoud- en
  space-agenda's steken de grens tussen huishoudens over.

<details class="tech">
<summary>Onder de motorkap</summary>

Velden van de agenda-payload worden versleuteld in de
federatie-envelop (§25.8.21). GPS-coördinaten worden afgekapt op
vier decimalen (≈ 11 m) vóór opslag of verzending (GPS-regel
§25).

</details>

## API

<details class="tech">
<summary>Onder de motorkap</summary>

| Methode                    | Pad                                   | Doel                                                                    |
| -------------------------- | ------------------------------------- | ----------------------------------------------------------------------- |
| `GET`                      | `/api/calendar`                       | Huishoudagenda, met persoonlijke agenda's erdoorheen.                   |
| `POST`                     | `/api/calendar/events`                | Een afspraak aanmaken in de huishoudagenda.                             |
| `GET` / `PATCH` / `DELETE` | `/api/calendar/events/{id}`           | Eén afspraak lezen / bewerken / verwijderen.                            |
| `PUT`                      | `/api/calendar/events/{id}/rsvps`     | Je RSVP instellen. Body: `{response: "yes" \| "no" \| "maybe", note?}`. |
| `GET`                      | `/api/calendar/events/{id}/rsvps`     | De huidige status van elke genodigde opvragen.                          |
| `POST`                     | `/api/calendar/events/{id}/reminders` | Het herinneringsvenster instellen.                                      |
| `GET`                      | `/api/calendar/events/{id}.ics`       | Eén afspraak downloaden als iCalendar-bestand.                          |
| `POST`                     | `/api/calendar/import/ics`            | Een `.ics`-bestand of feed-URL importeren.                              |
| `POST`                     | `/api/calendar/import/image`          | OCR + AI-extractie van een afspraak uit een screenshot.                 |

Space-agenda's gebruiken de parallelle vorm `/api/spaces/{id}/calendar/*`,
zodat één space zijn eigen reeks afspraken kan hosten zonder
zich te mengen in het huishoudoverzicht.

</details>
