---
title: Highlights
description: Een foto of kort filmpje dat verdwijnt. Met Highlights deel je een moment met gekoppelde huishoudens zonder een archief achter te laten in het datacenter van iemand anders.
order: 22
---

Een **highlight** is de lichte, vluchtige tegenhanger van de
huishoudfeed. Je deelt een foto of een korte video, voegt
eventueel een bijschrift toe, en het belandt in de
_Highlights_-inbox van elk gekoppeld huishouden. Het verloopt
vanzelf — standaard na 30 dagen, of na de bewaartermijn die je
instelt — en wordt daarna van de schijf gewist, op jouw server.

Highlights vind je onder **Praten → Highlights** in de zijbalk.

## Hoe het werkt

- **Eén highlight per auteur per dag.** Een highlight is een klein
  album van _frames_; elke post op dezelfde dag voegt een frame
  toe aan de highlight van vandaag in plaats van een nieuwe te
  maken. Nieuwe dag → nieuwe highlight.
- **Publiek.** Bij het plaatsen kies je uit drie opties:
  - **Alle gekoppelde huishoudens** — elk bevestigd gekoppeld
    huishouden.
  - **Specifieke huishoudens** — de huishoudens die je kiest.
  - **Specifieke mensen** — bepaalde mensen in die huishoudens.
- **Bewaartermijn.** Standaard 30 dagen, per auteur instelbaar van
  1 tot 90 dagen in **Instellingen → Privacy**. De bewaarplanner
  ruimt verlopen rijen elk uur op.
- **Antwoorden & reacties.** Tik op een frame om met een emoji te
  reageren; veeg omhoog of tik op de ✉-chip om via een
  privébericht te antwoorden, met een momentopname van het frame
  erbij, zodat het gesprek betekenis houdt, ook nadat het
  oorspronkelijke frame is verlopen.
- **Archief.** **Bladeren → Highlight-archief** is een
  kalenderraster van elke highlight die nog binnen zijn
  bewaartermijn zit — die van jou en die van elk gekoppeld
  huishouden. Dagen met highlights zijn klikbaar; tik op een datum
  om te zien wie die dag iets plaatste.

## Privacy

- Highlight-frames worden verzegeld van jouw huis tot dat van het
  andere huishouden, net zoals privéberichten. Niets onderweg kan
  ze openen.
- Frames worden ondertekend door je huishouden; een ontvangend
  huishouden gooit vervalsingen weg voordat ze ooit in zijn
  database belanden.
- De persoonlijke blokkeerlijst (**Instellingen → Privacy →
  Geblokkeerde accounts**) verbergt elke highlight van een
  geblokkeerde auteur op elk scherm — inbox, archief en de ringen
  bovenaan de pagina — zonder een signaal „je bent geblokkeerd” te
  lekken.

## Openbaar delen via een Global Server

Soms wil je een highlight sturen naar iemand die niet op Social
Home zit — een vriend op Twitter, een familielid dat alleen e-mail
leest. In de highlight-viewer kan de auteur op **Openbare link
publiceren** tikken en een gekoppelde
[GFS (Global Federation Server)](/nl/docs/glossary/#gfs) kiezen —
de relay die huishoudens helpt elkaar te vinden. De GFS geeft een
URL terug zoals

```
https://gfs.example/highlight/{instance}/{highlight}/{token}
```

Iedereen met die URL kan de highlight in een browser openen. De
beelden reizen rechtstreeks van jouw server naar de browser van de
bezoeker; de GFS brengt de twee alleen met elkaar in contact. Als
die rechtstreekse route niet kan worden opgezet (een streng
kantoornetwerk, bijvoorbeeld), geeft de GFS de frames door — maar
alleen zolang je huis online is, en hij slaat er geen enkele van
op. Dezelfde bewaartermijn die je op de highlight hebt ingesteld,
geldt ook voor de openbare link: zodra de highlight voor
gekoppelde huishoudens gewist zou zijn, werkt de openbare URL niet
meer.

Je kunt per highlight meerdere tokens aanmaken (één per platform,
bijvoorbeeld) en elk ervan afzonderlijk intrekken. De auteur kan
met **Publicatie ongedaan maken** ook alle tokens in één keer
intrekken als de link uit de hand loopt.

Dit is het enige onderdeel van Social Home waar inhoud bewust
leesbaar is zonder huishoudidentiteit, en het is opt-in per
highlight — niets verlaat je thuisserver totdat je de schakelaar
omzet.

<details class="tech">
<summary>Onder de motorkap</summary>

De GFS bemiddelt een WebRTC-handshake tussen de server van de
auteur en de browser van de bezoeker; de highlight-bytes stromen
daarna over die rechtstreekse verbinding. Als WebRTC mislukt, valt
de GFS terug op een HTTP-pass-through die frames streamt vanaf de
server van de auteur zolang die bereikbaar is — in geen van beide
gevallen wordt er ook maar één highlight-byte naar de schijf van
de relay geschreven. Tokens zijn per highlight, per link, en
afzonderlijk of allemaal tegelijk in te trekken.

</details>

## Rapporteren

Als een highlight de normen van de gemeenschap schendt — spam,
intimidatie, ongepaste inhoud, desinformatie — open dan het
⋯-menu in de viewer en kies **Rapporteren**. De melding belandt in
de beoordelingswachtrij van de huishoudbeheerder — dezelfde die
posts, opmerkingen en Momentum-meldingen afhandelt — zodat de
beheerder die kan beoordelen.

<details class="tech">
<summary>Onder de motorkap</summary>

Meldingen zijn rijen in de gezamenlijke tabel `content_reports`;
beheerders halen ze op via `/api/admin/reports?status=pending`.

</details>

## Federatie

Highlights reizen tussen huishoudens op dezelfde manier als
privéberichten en space-inhoud: verzegeld, ondertekend en bij
aankomst gecontroleerd op herhalingen. Reacties en
weergavebevestigingen vinden hun weg terug naar het huishouden van
de auteur, zodat de chip op het frame goed telt.

<details class="tech">
<summary>Onder de motorkap</summary>

Highlights gebruiken de inkomende pijplijn van §24.11 die ze delen
met privéberichten en space-inhoud: ondertekende enveloppen,
beschermd door een replay-cache, routeringsvelden in platte tekst
en elk inhoudsveld versleuteld. Reacties en weergavebevestigingen
reizen over een unicast-terugkanaal naar het huishouden van de
auteur.

</details>
