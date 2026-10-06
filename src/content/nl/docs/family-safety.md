---
title: Gezinsveiligheid
description: Beschermde accounts voor kinderen — spaces en apps met een leeftijdsgrens, privéberichten dicht bij huis, en een rustig alleen-lezen overzicht voor voogden.
order: 28
---

Social Home is gebouwd voor huishoudens, en bij huishoudens horen
kinderen. Met **Gezinsveiligheid** kan een huishoudbeheerder een
kind een account geven met verstandige vangrails ingebouwd —
zonder de boel in een bewakingssysteem te veranderen.

## Beschermde accounts

Een huishoudbeheerder kan een lid markeren als **beschermde
minderjarige**, zijn of haar **opgegeven leeftijd** instellen en
een of meer **voogden** toewijzen. Die opgegeven leeftijd bepaalt
dan stilletjes wat het account kan bereiken:

- **Spaces met een leeftijdsgrens** — een beschermde minderjarige
  kan geen lid worden van een space waarvan de minimumleeftijd
  hoger is dan zijn of haar opgegeven leeftijd. De grens wordt
  overal afgedwongen waar een lid een plek krijgt, ook over
  gekoppelde huishoudens heen, en reist mee met de space wanneer
  die federeert — dus een space op afstand kan er niet langs
  glippen.
- **Apps met leeftijdsbeperking** — apps die een beheerder achter
  een leeftijdsgrens heeft gezet, gaan niet open voor een account
  dat te jong is.
- **Privéberichten blijven dicht bij huis** — de privéberichten
  van een beschermde minderjarige zijn beperkt tot huishoudens
  waarmee je rechtstreeks gekoppeld bent, niet de bredere
  federatie.
- **Geen openbare onderdelen** — een beschermd account wordt zonder
  meer geweigerd voor de Bazaar (de marktplaats), openbare spaces,
  openbare momenten, openbare highlight-links en API-tokens. Er is
  geen instelling om dat te versoepelen.

## Het voogdoverzicht

Een voogd krijgt een **alleen-lezen** overzicht van de mensen en
plekken in de wereld van zijn of haar kind — de spaces waar het in
zit, met wie het praat, zijn privéberichtcontacten en wie het
heeft geblokkeerd. Het is een venster waardoor een ouder op de
hoogte blijft, geen afstandsbediening, en het reikt nooit tot in
de inhoud van berichten.

## Leeftijdsgrenzen zijn ook een space-instelling

Elke space — niet alleen spaces die met kinderen in gedachten zijn
gemaakt — kan een **minimumleeftijd** instellen (13, 16 of 18 — of
geen) en een doelgroep. Beheerders stellen het één keer in, en de
minimumleeftijd wordt gecontroleerd op elk pad dat een lid een
plek geeft: lokaal lid worden, lid worden vanuit een gekoppeld
huishouden, en lid worden via een GFS-link. Er is geen pad dat de
controle overslaat. Zie [Wereldwijde spaces](/nl/docs/global-spaces/)
voor hoe een relay een leeftijdsbeleid meeneemt naar een openbare
directory.

<details class="tech">
<summary>Onder de motorkap</summary>

`min_age ∈ {0, 13, 16, 18}` maakt deel uit van de ondertekende
instellingen van de space en wordt door dezelfde plaatsingscode
geëvalueerd voor lokale joins, gefedereerde joins vanuit gekoppelde
huishoudens en joins via een GFS-link. Beschermde accounts
(`protected_minor = true`) worden op de servicelaag geweigerd voor
de Bazaar, spaces met openbaar bereik, openbare Momentum, openbare
highlight-links en persoonlijke API-tokens, ongeacht de opgegeven
leeftijd.

</details>
