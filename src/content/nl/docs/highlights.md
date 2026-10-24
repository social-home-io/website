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
leest. Vanuit de highlight-viewer kan de auteur op **Openbare link
maken** tikken en een gekoppelde
[GFS (Global Federation Server)](/nl/docs/glossary/#gfs) kiezen —
de relay die huishoudens helpt elkaar te vinden. Je krijgt een link
naar de [Social Home-viewer](/nl/docs/glossary/#viewer), zoals

```
https://viewer.social-home.io/v/0123456789abcdef/#g=…&i=…&h=…&t=…&k=…
```

Iedereen met die link kan het highlight in een browser openen. De
pagina laat zien wie het gedeeld heeft — je naam, foto en bio — en
daarna de frames. De beelden reizen rechtstreeks van je huis naar de
browser van de bezoeker; de GFS stelt de twee alleen aan elkaar
voor. Als die directe weg niet lukt (een streng kantoornetwerk,
bijvoorbeeld), geeft de GFS de frames door — maar alleen zolang je
huis online is, en hij bewaart er geen een van.

Op beide wegen is het highlight verzegeld van je huis tot de browser
van de bezoeker. De sleutel is het deel van de link na de `#`, dat
browsers nooit naar een server sturen. Daarom kan de GFS het
highlight niet openen, ook al helpt hij het af te leveren. En de
pagina die de sleutel leest, komt niet van de GFS: die komt van de
Social Home-viewer, een vaste set bestanden waarvan je elke versie
kunt controleren. Wie de GFS draait, kan je highlight niet lezen en
de pagina die je bezoeker ziet niet veranderen.

Dezelfde bewaartermijn die je voor het highlight hebt ingesteld,
geldt ook voor de openbare link: wanneer het highlight voor
gekoppelde huishoudens zou zijn opgeruimd, werkt de link niet meer.

Je kunt meerdere links per highlight maken (één per platform,
bijvoorbeeld) en elk ervan afzonderlijk verwijderen. De auteur kan
ook alle links tegelijk intrekken met **Alle openbare links voor dit
highlight verwijderen** als een link uit de hand loopt.

Dit is de enige plek in Social Home waar een highlight bewust
leesbaar is zonder huishoudidentiteit, en het is per highlight
opt-in — niets verlaat je huis totdat je een link maakt. Behandel de
link als een sleutel: wie hem heeft, kan kijken.

<details class="tech">
<summary>Onder de motorkap</summary>

- De GFS bemiddelt een WebRTC-handshake tussen het huis van de
  auteur en de browser van de bezoeker; de highlight-bytes stromen
  daarna over die directe verbinding. Als WebRTC faalt, valt de GFS
  terug op een HTTP-doorgifte die frames van het huis van de auteur
  streamt zolang het bereikbaar is. Op geen van beide wegen wordt een
  highlight-byte naar de schijf van de GFS geschreven.
- Verzegeling: de viewer stuurt met zijn aanbod een tijdelijke
  P-256-sleutel (`vk`) mee; het huis van de auteur verzegelt elk
  frame met AES-256-GCM onder `HKDF-SHA256(ECDH, salt = k)`. `k` wordt
  afgeleid uit de identiteitsseed van de auteur en het token, en
  staat alleen in het fragment.
- `v/<hash>/` in de link wijst naar precies één inhoudsgeadresseerde
  viewerversie; het script is vastgezet met SRI, de CSP is streng, en
  versies worden alleen toegevoegd, gepubliceerd door
  [`social-home-io/viewer`](https://github.com/social-home-io/viewer).
  De GFS beantwoordt de anonieme signaleringsroutes van de viewer
  met CORS, nooit met inloggegevens.
- Tokens gelden per highlight en per link, en zijn afzonderlijk of
  allemaal tegelijk in te trekken. Een mislukte poging toont altijd
  „Dit is nu niet beschikbaar”, of de link nu is ingetrokken, is
  verlopen of de auteur offline is.

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
