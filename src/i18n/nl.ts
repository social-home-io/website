import type { UiStrings } from "./types";
import { installHref } from "./en";

export const nl: UiStrings = {
  dateLocale: "nl-NL",

  site: {
    name: "Social Home",
    landingDescription:
      "Een privé, gefedereerd sociaal netwerk voor je huishouden — agenda's, boodschappenlijsten, foto's en chat die in je eigen huis draaien. Open source, MPL 2.0.",
    defaultDescription:
      "Het huishoud-OS dat ook een gefedereerd sociaal netwerk is — draait in je eigen huis.",
    ogImageAlt: "Social Home — het sociale thuis voor je huishouden. Draait in je eigen huis.",
    skipToContent: "Ga naar de inhoud",
  },

  header: {
    homeAriaLabel: "Social Home — startpagina",
    motto: "huishoud-OS · gefedereerd · open",
    links: [
      { href: "/docs/", label: "Docs" },
      { href: "/docs/protocol/", label: "Hoe het werkt" },
      { href: "/docs/global-spaces/", label: "Wereldwijde spaces" },
      { href: "/servers/", label: "Onze server" },
      { href: "/blog/", label: "Blog" },
      { href: "/contribute/", label: "Meedoen" },
    ],
    primaryNavLabel: "Hoofdnavigatie",
    githubAriaLabel: "Social Home op GitHub",
    languageLabel: "Taal",
  },

  footer: {
    mottoHtml: "<em>Het sociale thuis voor je huishouden.</em>",
    smallHtml:
      'Open source onder de <a href="/license/">Mozilla Public License 2.0</a>. Gehost door het huishouden, nooit door ons.',
    navLabel: "Voettekst",
    columns: [
      {
        heading: "Lezen",
        links: [
          { href: "/docs/getting-started/", label: "Aan de slag" },
          { href: "/docs/protocol/", label: "Hoe het werkt" },
          { href: "/docs/federation/", label: "Huishoudens, gefedereerd" },
          { href: "/docs/global-spaces/", label: "Wereldwijde spaces" },
          { href: "/docs/privacy/", label: "Privacymodel" },
          { href: "/docs/security/", label: "Beveiligingsmodel" },
        ],
      },
      {
        heading: "Draaien",
        links: [
          { href: "/docs/getting-started/", label: "Toevoegen aan Home Assistant" },
          { href: "/servers/", label: "Onze server" },
          { href: "/docs/running-a-gfs/", label: "Een relay hosten" },
          { href: "https://github.com/social-home-io/socialhome/releases", label: "Releases" },
          { href: "/blog/", label: "Blog" },
        ],
      },
      {
        heading: "Project",
        links: [
          { href: "https://github.com/social-home-io", label: "GitHub" },
          { href: "/contribute/", label: "Meedoen" },
          { href: "/license/", label: "Licentie (MPL 2.0)" },
        ],
      },
    ],
    copyright: "Social Home-bijdragers",
    builtWith: "Gebouwd met Astro · geen cookies, geen analytics",
  },

  docs: {
    navLabel: "Documentatie",
    drawerTitle: "Op deze site",
    metaLabel: "Paginagegevens",
    editOnGithub: "Bewerk deze pagina op GitHub →",
    underTheHood: "Onder de motorkap",
  },

  blog: {
    title: "Blog",
    description:
      "Nieuwe functies in Social Home, verteld vanuit het huishouden — wat er in je dag verandert, met schermafbeeldingen.",
    eyebrow: "Blog",
    h1Html: "Wat is er nieuw <em>thuis</em>.",
    ledeHtml:
      'Nieuwe functies, verteld vanuit je huishouden: wat er in je dag verandert, met schermafbeeldingen. Elke release staat op <a href="https://github.com/social-home-io/socialhome/releases">GitHub Releases</a>.',
    readPost: "Lees het bericht →",
    allPosts: "← Alle berichten",
    editOnGithub: "Bewerk dit bericht op GitHub →",
  },

  landing: {
    hero: {
      eyebrow: "Open · gefedereerd · MPL 2.0",
      sub: "Agenda, boodschappenlijst, foto's, chat, highlights, momenten, apps — draaiend in je eigen huis. Een huishoud-OS dat ook een sociaal netwerk is dat echt van jou is.",
      primaryCta: "Toevoegen aan Home Assistant",
      secondaryCta: "Wat kan het?",
      installHref,
      secondaryHref: "/docs/protocol/",
    },
    heroHeadlineHtml: "Het <em>sociale</em> thuis<br />voor je <em>huishouden</em>.",
    heroCaption: "Gratis & open source · MPL 2.0 · draait op je eigen Home Assistant",
    heroLeadIn: "Een blik op de dag van één huishouden",
    valueProps: [
      {
        claim: "Jouw server, jouw regels.",
        detail: "Alles blijft in je huis. Geen cloud van derden komt aan je dag.",
      },
      {
        claim: "Altijd versleuteld.",
        detail:
          "Elk bericht wordt verzegeld voordat het je server verlaat — geen schakelaar, geen uitzonderingen. Zelfs de relay kan het niet lezen.",
      },
      {
        claim: "Federatie, geen silo's.",
        detail: "Verbind huishoudens, één QR-scan per keer. Koppel, en praat daarna rechtstreeks.",
      },
      {
        claim: "Open source. Geen advertenties.",
        detail: "MPL 2.0. Geen analytics, geen groeiteam dat je avond wil verzilveren.",
      },
    ],
    household: {
      heading: "Een huishoud-OS dat stilletjes de dag draaiende houdt.",
      lede: "Agenda's, lijsten, taken, notities, pagina's, aanwezigheid, spraak — elk gedeeld logistiek hulpmiddel dat een huishouden echt nodig heeft, zonder de tol van een cloudaccount.",
      cards: [
        {
          tag: "Gedeelde agenda",
          title: "Elke agenda in één overzicht.",
          body: "Persoonlijk, partner, huishouden — kleurgecodeerd in één weergave. Voeg afspraken toe met je stem of vanaf elke telefoon, en antwoord met ja/nee/misschien zodat iedereen ziet wie erbij is. Genodigden uit gekoppelde huishoudens antwoorden dwars door de federatie heen.",
        },
        {
          tag: "Live boodschappenlijst",
          title: "Levende lijsten op elke telefoon.",
          body: "„Melk erbij” vanaf iemands telefoon of met je stem. Streep dingen in realtime af in de supermarkt.",
        },
        {
          tag: "Taken",
          title: "Klusjes verdeeld, niet gezeurd.",
          body: "Toegewezen personen per lijst, deadlines, badges voor te laat. De boekenkast dit weekend boren; de oude koelkast vandaag wegbrengen; iedereen ziet wie wat doet.",
        },
        {
          tag: "Pagina's",
          title: "Een wiki voor de huishandleiding.",
          body: "Markdown-pagina's met bewerkvergrendeling en wikilinks. De instructies voor het ontluchten van de radiator staan waar je ze echt terugvindt — naast elk ander stuk van de huishandleiding.",
        },
        {
          tag: "Sticky's",
          title: "Koelkastbriefjes die met je meegaan.",
          body: "Gekleurde notities die je met één tik bewerkt, vastgeprikt op het canvas van een space. Wortels in de onderste la; cadeau-ideeën voor een verjaardag; alles wat het huishouden samen wil onthouden.",
        },
        {
          tag: "Stille aanwezigheid",
          title: "Wie is er thuis, nu.",
          body: "Alleen een subtiele indicator — geen gps-geschiedenis, geen spoor. Opt-in per persoon en per apparaat.",
        },
        {
          tag: "Gezinsveiligheid",
          title: "Kinderaccounts, met vangrails.",
          body: "Markeer het account van een kind als beschermd, stel de leeftijd in en wijs een voogd aan. Spaces en apps met een leeftijdsgrens blijven buiten bereik, hun privéberichten blijven binnen de huishoudens die je hebt gekoppeld, en voogden krijgen een rustig alleen-lezen overzicht.",
        },
      ],
    },
    social: {
      heading: "Een sociaal netwerk dat echt van jou is.",
      lede: "De warme kanten van sociale media — feeds, foto's, privéberichten, gesprekken, groepsruimtes — zonder het platform iets te geven om te verkopen.",
      cards: [
        {
          tag: "Huishoudfeed",
          title: "Foto's, spraakmemo's, updates.",
          body: "Deel een foto van het avondeten. Plaats een spraakmemo als je handen vol zijn. Reacties komen direct aan op elk apparaat in het huishouden.",
        },
        {
          tag: "Privéberichten tussen huishoudens",
          title: "Berichten naar familie, wereldwijd.",
          body: "Versleuteld van huis tot huis. Geen telefoonnummers, geen messenger van derden, geen account bij een dienst die niet van jou is.",
        },
        {
          tag: "Spraak- en videogesprekken",
          title: "Bellen zonder dat een derde meeluistert.",
          body: "1-op-1- of groepsgesprekken, rechtstreeks vanuit je privéberichten en groepschats. WebRTC tussen de deelnemers, versleuteld met DTLS-SRTP; de server helpt alleen het gesprek op gang, en als er een relay nodig is, ziet die alleen ooit versleutelde media.",
        },
        {
          tag: "Spaces voor elke groep",
          title: "Ruimtes die huishoudens overspannen.",
          body: "Familie, buren, leesclub, sportteam — elk in een eigen privé space. Koppel huishoudens één keer, daarna werkt het gewoon.",
        },
        {
          tag: "Highlights",
          title: "Even kijken, dan is het weg.",
          body: "Deel een foto of kort filmpje met een bijschrift — gekoppelde huishoudens zien het in hun inbox, reageren met een emoji, en het verloopt vanzelf. Geen archief dat groeit in het datacenter van een vreemde.",
        },
        {
          tag: "Momentum",
          title: "Eenmalige berichten die reizen.",
          body: "Tot duizend tekens en een clip van 15 seconden. Elk moment waaiert drie stappen ver uit over de federatie — jouw gekoppelde huishoudens en de hunne — en verdwijnt na een dag, of na een week voor mensen die je volgt.",
        },
        {
          tag: "Marktplaats",
          title: "Kopen, verkopen en weggeven binnen je kring.",
          body: "Zet iets te koop in een space — vaste prijs, beste bod of een veiling met tijdslimiet. Alleen de huishoudens in die space zien het. Geen vreemden, geen platformkosten, geen advertenties die aan adverteerders worden doorverkocht.",
        },
      ],
    },
    householdPill: "Regel je huishouden",
    socialPill: "Blijf sociaal — privé",
    federated: {
      eyebrow: "Federatie, geen silo's",
      heading: "Spaces overspannen huishoudens — het jouwe en die waarmee je verbindt.",
      p1Html:
        "Koppel twee huizen één keer met een QR-code. Daarna kun je <em>spaces</em> maken — gedeelde ruimtes met een eigen feed, chat en agenda — over beide heen. Run een leesclub, organiseer een straatfeest of houd één rustige ruimte voor de grootouders.",
      p2Html:
        'Een kleine, open-source <a href="/docs/global-spaces/">relay</a> — de GFS — helpt huishoudens die niet gekoppeld zijn elkaar te vinden voor openbare en wereldwijde spaces en draagt hun verzegelde berichten. Lezen kan hij ze niet: elk bericht wordt verzegeld voordat het je huis verlaat. Wij draaien er een live op <a href="/servers/">gfs.social-home.io</a> — verbind met één tik.',
    },
  },

  apps: {
    eyebrow: "Nieuw · Social Home Apps",
    heading: "Apps die over huishoudens heen samenspelen.",
    ledeHtml:
      "Installeer één keer een kleine app — een schaakbord, een gedeeld whiteboard, een quiz — en die praat met <em>dezelfde app</em> in een huishouden waarmee je gekoppeld bent. Doe hier een zet; die komt daar aan. Elke byte verzegeld tussen jullie twee huizen, rechtstreeks van het ene huis naar het andere.",
    points: [
      {
        k: "Federatie van app tot app",
        v: "Dezelfde app in een gekoppeld huis wisselt zetten en bewerkingen rechtstreeks uit — geen gedeelde cloud, geen lobbyserver.",
      },
      {
        k: "Versleuteling voorop",
        v: "Elke zet wordt verzegeld en ondertekend voordat die je huis verlaat. Alleen het adreslabel reist leesbaar mee.",
        chips: ["AES-256-GCM", "Ed25519"],
      },
      {
        k: "Sandboxed",
        v: "Elke app draait in een eigen afgesloten frame zonder netwerktoegang. De beheerder installeert één keer — bundels zijn vastgepind op hun checksum — en stelt een leeftijdsgrens in.",
        chips: ["sha256-pinned", "connect-src 'none'", "1 MiB cap"],
      },
      {
        k: "Peer-to-peer",
        v: "Sessies lopen rechtstreeks tussen bevestigde huishoudens. De relay blijft er helemaal buiten.",
      },
    ],
    technicalTerms: "Technische termen",
    showcaseLabel: "Het Apps-scherm",
    tabInstalled: "Geïnstalleerd",
    tabCatalog: "Catalogus",
    syncLine: "⇄ gekoppeld met maple-st",
    cards: [
      {
        glyph: "♞",
        name: "Schaken",
        blurb: "Speel tegen het huis van de grootouders, zet voor zet.",
        state: "open",
      },
      {
        glyph: "✎",
        name: "Whiteboard",
        blurb: "Schets samen een tafelschikking, live.",
        state: "open",
      },
      { glyph: "◑", name: "Quizavond", blurb: "Twee huishoudens, één quiz.", state: "install" },
    ],
    open: "Openen",
    install: "Installeren",
    liveHtml: "Schaken · sessie open met <strong>maple-st</strong> · versleuteld",
  },

  trust: {
    eyebrow: "Privé door constructie",
    heading: "Verzegeld van jouw huis tot het hunne. Fail-closed. Getest voor elke release.",
    lede: "De boodschappenlijst en de leesclubchat worden op dezelfde manier verzegeld: voordat iets je huis verlaat, gaat het op slot zodat alleen de huishoudens waarvoor het bedoeld is het kunnen openen. Het huishoud-OS en het sociale netwerk delen één regel, en die regel heeft geen uitknop.",
    guarantees: [
      {
        claim: "Het verstuurt nooit onversleuteld.",
        detail:
          "Als een space niet verzegeld kan worden, blijft het bericht thuis. Er is geen onversleutelde terugvaloptie om op terug te vallen.",
        chips: ["AES-256-GCM", "Ed25519", "fail-closed"],
      },
      {
        claim: "Space verlaten? Sleutel kwijt.",
        detail:
          "Elke keer dat het ledenbestand verandert, krijgt de space een nieuwe sleutel. Oude leden kunnen nieuwe berichten niet lezen.",
        chips: ["sleutel per epoche", "gewisseld bij elke wijziging"],
      },
      {
        claim: "De relay draagt pakjes, geen brieven.",
        detail:
          "Hij ziet bij welke space een verzegelde envelop hoort en wanneer — nooit wat erin zit. De strikte modus verbergt zelfs wie het verstuurde.",
        chips: ["padded 1/4/16/64/128 KiB", "±300 s", "24 h replay cache"],
      },
      {
        claim: "Getest voor elke release.",
        detail: "68 protocoltestbestanden controleren deze regels; één fout blokkeert de release.",
        chips: ["tests/protocol", "release-blokkerend"],
      },
      {
        claim: "Niets te verkopen.",
        detail:
          "Geen accounts, geen analytics, geen advertenties. De code is open, iedereen kan hem lezen.",
        chips: ["MPL 2.0", "geen JS van derden"],
      },
      {
        claim: "Eerlijk over de rest.",
        detail:
          "Wat deze pagina niet kan beloven, staat naast de regels opgeschreven, met een datum en een aftekening.",
        chips: ["principles.md", "afgetekende restrisico's"],
      },
    ],
    technicalTerms: "Technische termen",
    readSecurityModel: "Lees het beveiligingsmodel",
    principlesLink: "principles.md op GitHub →",
  },

  installBanner: {
    headline: "Installeren in twee klikken.",
    body: "Voeg de add-on-repository van Social Home toe aan je Home Assistant. De add-on maakt je automatisch beheerder, maakt een token aan en registreert de bijbehorende integratie via Supervisor-discovery — je hoeft niets in te typen.",
    primaryCta: "Toevoegen aan Home Assistant",
    readGuide: "Lees de installatiehandleiding",
    shellLabel: "Wat je in Home Assistant ziet",
    terminalTitle: "Home Assistant · Add-on winkel",
  },

  familyWall: {
    figureLabel: "Een blik op de dag van één huishouden op Social Home",
    cal: {
      kicker: "di · 29 jul",
      title: "Zondagsbrunch bij Maria",
      attendees: ["Maria", "Pascal", "Mam"],
      more: "+3",
      meta: "Huishoudagenda",
      pill: "3 huishoudens",
    },
    shop: {
      kicker: "Boodschappenlijst — keuken",
      title: "5 dingen, laatste toevoeging 4 min geleden",
      done: ["Zuurdesem", "Olijfolie"],
      open: [
        { item: "Tomaten", by: "+ Maria" },
        { item: "Basilicum", by: "+ Pascal" },
        { item: "Geitenkaas", by: "+ spraak" },
      ],
    },
    tasks: {
      kicker: "Taken · verhuisklusjes",
      title: "3 te doen · 6 klaar",
      items: [
        { title: "Tv ophangen", owner: "Pascal", done: true },
        { title: "Boekenkast boren", owner: "Maria · deze week", pin: "due" },
        { title: "Planten kopen", owner: "Lina · weekend" },
        { title: "Oude koelkast naar de recycling", owner: "Pascal · vandaag", pin: "overdue" },
      ],
      pinDue: "binnenkort",
      pinOverdue: "te laat",
    },
    page: {
      kicker: "Pagina's · Huishandleiding",
      title: "Radiatoren ontluchten",
      introHtml:
        "Zet eerst de verwarming uit. Wacht tot het systeem is afgekoeld — meestal <em>10 tot 15 minuten</em>.",
      steps: [
        "Pak de ontluchtingssleutel uit de keukenla (rode deksel).",
        "Draai het ventiel een kwartslag open tot er sissend water uitkomt.",
        "Draai het goed dicht. Door naar de volgende radiator.",
      ],
      meta: "Bewerkt door Maria · 2 dagen geleden",
      pill: "wiki",
    },
    sticky: {
      lineHtml:
        "🥕 Wortels in de onderste la<br /><span>Zondags braadstuk — niet nog meer kopen!</span>",
      meta: "Maria · sticky's",
    },
    photo: {
      caption: "„Eerste tomaat van het jaar — huisbelasting: de helft is voor mam.”",
    },
    voice: {
      kicker: "Spraakmemo · 0:17",
      title: "Pascal — iemand zin in pasta?",
      transcriptHtml: "„…iemand zin in <em>pasta</em> vanavond? Ik ben bij de delicatessenzaak.”",
    },
    call: {
      kicker: "Groepsgesprek · 14:32",
      title: "Zondagsgesprek met de familie",
      tiles: ["Mam", "Pap", "Zus", "Jij"],
      meta: "Versleuteld · 4 huishoudens",
      pill: "P2P · DTLS-SRTP",
    },
    presence: {
      kicker: "Stille aanwezigheid",
      title: "Op dit moment",
      people: [
        { name: "Maria", status: "thuis", on: true },
        { name: "Pascal", status: "fietst naar huis", on: true },
        { name: "Mam", status: "weg", on: false },
        { name: "Lina", status: "thuis", on: true },
      ],
      meta: "Geen geschiedenis bewaard",
      pill: "opt-in",
    },
  },

  spaceWall: {
    figureLabel: "Een blik op de soorten spaces die huishoudens delen",
    tiles: [
      {
        glyph: "🏡",
        scope: "private",
        name: "Familie",
        meta: "4 mensen · 3 huishoudens · privé",
        poster: "Mam",
        quote: "„Zondag eten bij ons — neem de hond mee.”",
      },
      {
        glyph: "🌳",
        scope: "public",
        name: "Eichenstrasse 3–17",
        meta: "24 mensen · 14 huishoudens · openbaar",
        poster: "Lina",
        quote: "„Straatbarbecue volgende zaterdag — neem stoelen mee.”",
        chips: ["📅 za 19:00", "📍 tuin van nr. 11"],
      },
      {
        glyph: "🔨",
        scope: "public",
        name: "Maker Space",
        meta: "12 mensen · 7 huishoudens · openbaar",
        poster: "Rita",
        quote: "„De eiken stoel is af — foto's in de feed.”",
      },
      {
        glyph: "📖",
        scope: "private",
        name: "Leesclub",
        meta: "8 mensen · 5 huishoudens · privé",
        poster: "Rebecca",
        quote: "„Hoofdstuk 7 lezen voor vrijdag — staat in de agenda.”",
      },
      {
        glyph: "⛰️",
        scope: "public",
        name: "Boulderploeg",
        meta: "16 mensen · 11 huishoudens · openbaar",
        poster: "Pascal",
        quote: "„Training verplaatst naar 19:00 — zelfde hal.”",
      },
      {
        glyph: "🛒",
        scope: "global",
        name: "Bazaar · buurt",
        meta: "~50 mensen · wereldwijd · via je GFS",
        poster: "Maria",
        quote: "„Gratis eiken boekenkast — alleen ophalen, vóór zondag.”",
        chips: ["🪑 Gratis", "🔁 1 ruil in behandeling"],
      },
    ],
    legendLabel: "Legenda spacebereik",
    legend: {
      private: "Privé — alleen de mensen die je uitnodigt.",
      household: "Huishouden — iedereen in je huis, automatisch.",
      public: "Openbaar — staat op de kaart van je GFS zodat anderen hem kunnen vinden.",
      global: "Wereldwijd — overal ter wereld gepubliceerd via je GFS.",
    },
  },

  servers: {
    title: "Onze server",
    description:
      "Het Social Home-project draait één openbare Global Federation Server, live op gfs.social-home.io. Inhoudsblind van ontwerp: hij draagt verzegelde berichten en leest ze nooit. Verbind met één tik, of draai je eigen server.",
    eyebrow: "Global Federation Server",
    h1Html: "Verbind met de relay die wij <em>voor jou</em> draaien.",
    ledeHtml:
      "Het Social Home-project draait één openbare Global Federation Server (GFS) — nu live op <code>gfs.social-home.io</code>. Hij helpt je openbare en wereldwijde spaces en je openbare momenten om huishoudens te bereiken die nog niet met je gekoppeld zijn. Elk bericht wordt verzegeld voordat het je huis verlaat, dus de relay draagt het zonder het ooit te lezen.",
    hostedBy: "Gehost door Social Home",
    serverName: "Global Federation Server",
    live: "Live",
    body: "Eén QR-scan en je bent verbonden. Openbare spaces verschijnen op de kaart; openbare momenten waaieren uit naar volgers in elk gekoppeld huishouden; openbare links van Highlights lopen ook hierlangs. Inhoudsblind van ontwerp.",
    bullets: [
      "Kaart van openbare spaces + wereldwijde spaces",
      "Openbare Momentum-directory + volggraaf",
      "Relay voor openbare Highlights-links",
      "Leeftijdsgrensbeleid wordt afgedwongen",
      "Verzegelde berichten in de wachtrij voor offline huishoudens, daarna weg",
      "Leest nooit de inhoud van berichten, foto's of gesprekken",
    ],
    technicalTerms: "Technische termen",
    chips: ["padded 1/4/16/64/128 KiB", "wachtrij 24 h", "geen inhoud opgeslagen"],
    connect: "Verbinden →",
    qrLabel: "QR-code om met de Social Home-GFS te koppelen",
    qrCaptionHtml:
      "Scan in <strong>Social Home → Instellingen → Verbindingen → Global Federation Servers</strong>",
    howToHeading: "Zo verbind je",
    howToStepsHtml: [
      "Open <strong>Social Home</strong> thuis.",
      "Ga naar <strong>Instellingen → Verbindingen → Global Federation Servers</strong>.",
      "Tik op <strong>GFS toevoegen</strong>.",
      "Scan de QR-code hierboven — of plak de URL.",
    ],
    howToNote:
      "De meeste huishoudens hebben er maar één nodig. Je kunt extra relays koppelen voor veerkracht of voor het beleid van een besloten gemeenschap.",
    seesHeading: "Wat deze relay wel en niet kan zien",
    seesIntro:
      "De relay krijgt alleen ooit verzegelde enveloppen in handen. Wat hij te weten komt, hangt af van het soort space waar de envelop bij hoort — en in elk geval is het antwoord op „de inhoud?” nooit.",
    seesColSpace: "Space",
    seesColSees: "De relay ziet",
    seesColNever: "Nooit",
    seesRows: [
      {
        space: "Openbare & wereldwijde spaces",
        mode: "vertrouwd · standaard",
        sees: "Welk huishouden iets plaatste, in welke space, wanneer.",
        never: "De inhoud.",
      },
      {
        space: "Openbare & wereldwijde spaces",
        mode: "strikt · keuze van de eigenaar",
        sees: "Hetzelfde — maar niet wie het plaatste.",
        never: "De inhoud, of de afzender.",
      },
      {
        space: "Privé space met de GFS ingeschakeld",
        mode: "standaard uit",
        sees: "Welke huishoudens meedoen.",
        never: "De naam van de space, zijn berichten of zijn sleutel.",
      },
    ],
    seesChips: [
      "alleen routeringsmetadata",
      "identity-free host relay",
      "anonymous_publish proof",
      "strikte modus · gedeelde schrijfsleutel",
    ],
    residualsHtml:
      'Zoals elke server op het internet ziet hij ook je IP-adres, het tijdstip van elk verzoek en de grootteklasse van elke envelop. Die restrisico\'s staan opgeschreven in het <a href="/docs/security/">beveiligingsmodel</a>.',
    runOwnHeading: "Draai je eigen",
    runOwnHtml:
      'Voor een besloten gemeenschap, een organisatie of een relay voor één huishouden kun je in ongeveer 15 minuten je eigen GFS opzetten op elke VPS. <a href="/docs/running-a-gfs/">Zet je eigen GFS op →</a>',
  },

  notFound: {
    title: "404 — pagina niet gevonden",
    eyebrow: "Fout · 404",
    heading: "🏠 Deze pagina is verhuisd naar een ander huishouden.",
    lede: "De pagina die je zocht is verhuisd of heeft nooit bestaan.",
    goHome: "Naar de startpagina",
    searchDocs: "Zoek in de docs",
  },
};
