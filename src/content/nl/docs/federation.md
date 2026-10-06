---
title: Huishoudens, gefedereerd
description: Hoe twee huizen koppelen, wat ertussen reist en wat thuisblijft.
order: 30
---

Als twee huishoudens koppelen, leren hun huizen elkaars
cryptografische identiteit kennen en slaan ze de publieke sleutel
lokaal op. Na die ene handshake draagt elk bericht tussen hen
een handtekening die je huis kan controleren – geen centraal
account, geen authenticatie door derden.

## De koppelprocedure

1. **Open een koppellink.** In Social Home → **Instellingen →
   Verbindingen → Een huishouden koppelen**. Je ziet een QR-code
   en een korte verificatiecode.
2. **Scan vanuit het andere huishouden.** Zij openen hetzelfde
   scherm in hun eigen huis, klikken op **Scannen** en richten
   een telefoon op de QR. Beide kanten lezen dan de
   verificatiecode hardop voor en bevestigen dat die overeenkomt
   – die controle buiten het kanaal om is wat voorkomt dat een
   man-in-the-middle ertussen glipt.
3. **Klaar.** De twee huishoudens wisselen publieke sleutels,
   namen, avatars en de extern bereikbare URL uit die elk voor
   zichzelf aankondigt. Vanaf nu stromen berichten rechtstreeks
   tussen jullie, verzegeld van jouw huis tot het hunne.

## Wat er reist

| Veld                                   | Gedeeld met gekoppelde huishoudens?                   |
| -------------------------------------- | ----------------------------------------------------- |
| Weergavenaam                           | ja                                                    |
| Avatar                                 | ja                                                    |
| Momenteel gedeelde spaces              | alleen spaces waar jullie allebei lid van zijn        |
| Publieke sleutel (identiteit)          | ja – daar gaat het juist om                           |
| Externe URL                            | ja, zodat ze je kunnen bereiken als je verhuist       |
| E-mail / wachtwoord                    | **nooit** – Social Home heeft er niet eens een        |
| GPS / locatiegeschiedenis              | **nooit** – alleen de huidige zone, opt-in, per space |
| Berichten uit spaces die je niet deelt | nooit zichtbaar                                       |

## Wat er gebeurt als een adres verandert

Verhuist de externe URL van je huishouden – je wisselt van
domein, verliest Nabu Casa Remote UI, of je IP wisselt – dan
vertelt Social Home elk gekoppeld huishouden automatisch het
nieuwe adres. Hun huis controleert dat de aankondiging echt van
jou komt, werkt de opgeslagen URL bij, en de verbinding blijft
in leven. Geen handmatig opnieuw koppelen.

<details class="tech">
<summary>Onder de motorkap</summary>

De aankondiging is een ondertekend `URL_UPDATED`-event. Het
ontvangende huishouden verifieert de Ed25519-handtekening tegen
de publieke sleutel die bij het koppelen is opgeslagen voordat
het de URL vervangt.

</details>

## Een koppeling intrekken

Wil je de verbinding met een ander huishouden verbreken, open dan
**Instellingen → Verbindingen** en klik op **Verwijderen**. Beide
kanten verliezen hun kopie van de identiteit van de ander;
eerder bezorgde berichten blijven waar ze al zijn (de lokale
SQLite-database) – federatie werkt alleen vooruit.

## Over het internet

Koppelen werkt over het open internet – federatie loopt van het
ene huis naar het andere, niet alleen op het LAN. Om van buiten
je netwerk bereikbaar te zijn, heb je een van deze nodig:

- **Nabu Casa Remote UI** (het makkelijkst), of
- Een **externe URL** (ingesteld in de netwerkinstellingen van
  Home Assistant als je de add-on draait) + een port forward /
  reverse proxy, of
- Een **TURN-server** voor de WebRTC-fallback wanneer geen van
  beide kanten rechtstreeks bereikbaar is.

<details class="tech">
<summary>Onder de motorkap</summary>

Als je de add-on hebt geïnstalleerd, stuurt de Home
Assistant-integratie automatisch de URL die Home Assistant als
externe URL rapporteert naar Social Home. Staat Nabu Casa aan,
dan wint de Nabu Casa-URL; anders wordt de door de beheerder
ingestelde `external_url` gebruikt.

</details>

## Je huishoudens zien

De pagina **Verbindingen** tekent ook een kaart: één speld per
gekoppeld huishouden, met de afstand en richting naar elk. Hij
is er om de federatie tastbaar te maken – om te zien dat "het
huis van mijn zus" een echte plek is, 40 km naar het noordoosten,
die rechtstreeks met het jouwe praat. Een klein symbool geeft
aan of je rechtstreeks verbonden bent (WebRTC) of via de
HTTPS-fallback; dat is puur diagnostisch – alles werkt in beide
gevallen hetzelfde. De kaart toont de globale thuislocatie van
een huishouden alleen als dat huishouden ervoor koos die te
delen toen jullie koppelden, en elke coördinaat wordt vervaagd
tot ongeveer 11 meter voordat hij wordt opgeslagen of verzonden.
