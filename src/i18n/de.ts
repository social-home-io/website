/**
 * German UI strings — mirrors ``en.ts`` key for key.
 *
 * ``en.ts`` is the reference. Keys and structure must stay
 * identical across locales; ``npm run check`` fails when this
 * file drifts from ``UiStrings``.
 */
import type { UiStrings } from "./types";
import { installHref } from "./en";

export const de: UiStrings = {
  dateLocale: "de-DE",

  site: {
    name: "Social Home",
    landingDescription:
      "Ein privates, föderiertes soziales Netzwerk für deinen Haushalt — Kalender, Einkaufslisten, Fotos und Chat, die bei dir zu Hause laufen. Open Source, MPL 2.0.",
    defaultDescription:
      "Das Haushalts-Betriebssystem, das zugleich ein föderiertes soziales Netzwerk ist — läuft bei dir zu Hause.",
    ogImageAlt: "Social Home — das soziale Zuhause für deinen Haushalt. Läuft bei dir zu Hause.",
    skipToContent: "Zum Inhalt springen",
  },

  header: {
    homeAriaLabel: "Social Home — Startseite",
    motto: "Haushalts-OS · föderiert · offen",
    links: [
      { href: "/docs/", label: "Doku" },
      { href: "/docs/protocol/", label: "So funktioniert's" },
      { href: "/docs/global-spaces/", label: "Globale Spaces" },
      { href: "/servers/", label: "Unser Server" },
      { href: "/blog/", label: "Blog" },
      { href: "/contribute/", label: "Mitmachen" },
    ],
    primaryNavLabel: "Hauptnavigation",
    githubAriaLabel: "Social Home auf GitHub",
    languageLabel: "Sprache",
  },

  footer: {
    mottoHtml: "<em>Das soziale Zuhause für deinen Haushalt.</em>",
    smallHtml:
      'Open Source unter der <a href="/license/">Mozilla Public License 2.0</a>. Gehostet vom Haushalt, nie von uns.',
    navLabel: "Fußzeile",
    columns: [
      {
        heading: "Lesen",
        links: [
          { href: "/docs/getting-started/", label: "Erste Schritte" },
          { href: "/docs/protocol/", label: "So funktioniert's" },
          { href: "/docs/federation/", label: "Haushalte, föderiert" },
          { href: "/docs/global-spaces/", label: "Globale Spaces" },
          { href: "/docs/privacy/", label: "Datenschutzmodell" },
          { href: "/docs/security/", label: "Sicherheitsmodell" },
        ],
      },
      {
        heading: "Betreiben",
        links: [
          { href: "/docs/getting-started/", label: "Zu Home Assistant hinzufügen" },
          { href: "/servers/", label: "Unser Server" },
          { href: "/docs/running-a-gfs/", label: "Ein Relay betreiben" },
          { href: "https://github.com/social-home-io/socialhome/releases", label: "Releases" },
          { href: "/blog/", label: "Blog" },
        ],
      },
      {
        heading: "Projekt",
        links: [
          { href: "https://github.com/social-home-io", label: "GitHub" },
          { href: "/contribute/", label: "Mitmachen" },
          { href: "/license/", label: "Lizenz (MPL 2.0)" },
        ],
      },
    ],
    copyright: "Social Home Mitwirkende",
    builtWith: "Gebaut mit Astro · keine Cookies, keine Analytics",
  },

  docs: {
    navLabel: "Dokumentation",
    drawerTitle: "Auf dieser Seite",
    metaLabel: "Seiteninfos",
    editOnGithub: "Diese Seite auf GitHub bearbeiten →",
    underTheHood: "Unter der Haube",
  },

  blog: {
    title: "Blog",
    description:
      "Neue Funktionen in Social Home, erzählt aus Sicht des Haushalts — was sich in deinem Alltag ändert, mit Screenshots.",
    eyebrow: "Blog",
    h1Html: "Was es Neues <em>zu Hause</em> gibt.",
    ledeHtml:
      'Neue Funktionen, erzählt aus Sicht deines Haushalts: was sich in deinem Alltag ändert, mit Screenshots. Jedes Release steht auf <a href="https://github.com/social-home-io/socialhome/releases">GitHub Releases</a>.',
    readPost: "Beitrag lesen →",
    allPosts: "← Alle Beiträge",
    editOnGithub: "Diesen Beitrag auf GitHub bearbeiten →",
  },

  landing: {
    hero: {
      eyebrow: "Offen · föderiert · MPL 2.0",
      sub: "Kalender, Einkaufsliste, Fotos, Chat, Highlights, Momente, Apps — alles läuft bei dir zu Hause. Ein Haushalts-Betriebssystem, das zugleich ein soziales Netzwerk ist, das dir wirklich gehört.",
      primaryCta: "Zu Home Assistant hinzufügen",
      secondaryCta: "Was kann es?",
      installHref,
      secondaryHref: "/docs/protocol/",
    },
    heroHeadlineHtml: "Das <em>soziale</em> Zuhause<br />für deinen <em>Haushalt</em>.",
    heroCaption: "Kostenlos & Open Source · MPL 2.0 · läuft auf deinem eigenen Home Assistant",
    heroLeadIn: "Ein Blick auf den Tag eines Haushalts",
    valueProps: [
      {
        claim: "Dein Server, deine Regeln.",
        detail: "Alles bleibt bei dir zu Hause. Keine fremde Cloud mischt sich in deinen Tag ein.",
      },
      {
        claim: "Immer verschlüsselt.",
        detail:
          "Jede Nachricht wird versiegelt, bevor sie deinen Server verlässt — kein Schalter, keine Ausnahmen. Nicht einmal das Relay kann sie lesen.",
      },
      {
        claim: "Föderation statt Silos.",
        detail: "Verbinde Haushalte mit je einem QR-Scan. Koppeln, dann direkt miteinander reden.",
      },
      {
        claim: "Open Source. Keine Werbung.",
        detail:
          "MPL 2.0. Keine Analytics, kein Growth-Team, das deinen Feierabend monetarisieren will.",
      },
    ],
    household: {
      heading: "Ein Haushalts-Betriebssystem, das den Tag leise am Laufen hält.",
      lede: "Kalender, Listen, Aufgaben, Notizen, Seiten, Anwesenheit, Sprache — alles, was ein Haushalt zum gemeinsamen Organisieren wirklich braucht, ohne den Zwang zur Cloud-Anmeldung.",
      cards: [
        {
          tag: "Gemeinsamer Kalender",
          title: "Alle Kalender in einer Ansicht.",
          body: "Persönlich, Partner, Haushalt — farblich getrennt in einer Übersicht. Termine per Sprache oder von jedem Handy anlegen, dann mit Ja/Nein/Vielleicht antworten, damit alle sehen, wer dabei ist. Eingeladene aus gekoppelten Haushalten antworten über die Föderation hinweg.",
        },
        {
          tag: "Live-Einkaufsliste",
          title: "Lebendige Listen auf allen Handys.",
          body: "„Milch hinzufügen“ von jedem Handy oder per Sprache. Im Supermarkt in Echtzeit abhaken.",
        },
        {
          tag: "Aufgaben",
          title: "Hausarbeit aufgeteilt, nicht angemahnt.",
          body: "Zuständige pro Liste, Fristen, Überfällig-Markierungen. Regal am Wochenende bohren; alten Kühlschrank heute entsorgen; alle sehen, wer was übernommen hat.",
        },
        {
          tag: "Seiten",
          title: "Ein Wiki fürs Haushandbuch.",
          body: "Markdown-Seiten mit Bearbeitungssperren und Wikilinks. Die Anleitung zum Heizkörper-Entlüften liegt dort, wo du sie wirklich findest — neben allen anderen Einträgen im Haushandbuch.",
        },
        {
          tag: "Haftnotizen",
          title: "Kühlschrank-Zettel, die dir folgen.",
          body: "Farbige Notizen zum Antippen und Bearbeiten, angeheftet auf der Fläche eines Space. Karotten in der unteren Schublade; Geschenkideen zum Geburtstag; alles, was sich der Haushalt gemeinsam merken muss.",
        },
        {
          tag: "Stille Anwesenheit",
          title: "Wer gerade zu Hause ist.",
          body: "Nur ein dezenter Hinweis — kein GPS-Verlauf, keine Spuren. Opt-in pro Person und pro Gerät.",
        },
        {
          tag: "Familienschutz",
          title: "Konten für Kinder, mit Leitplanken.",
          body: "Markiere das Konto eines Kindes als geschützt, lege sein Alter fest und benenne eine Aufsichtsperson. Spaces und Apps mit Altersfreigabe bleiben außer Reichweite, Direktnachrichten bleiben innerhalb der Haushalte, die du gekoppelt hast, und Aufsichtspersonen bekommen eine stille, schreibgeschützte Übersicht.",
        },
      ],
    },
    social: {
      heading: "Ein soziales Netzwerk, das dir wirklich gehört.",
      lede: "Die warmen Seiten sozialer Medien — Feeds, Fotos, Direktnachrichten, Anrufe, Gruppenräume — ohne der Plattform irgendetwas zum Verkaufen zu geben.",
      cards: [
        {
          tag: "Haushalts-Feed",
          title: "Fotos, Sprachnotizen, Neuigkeiten.",
          body: "Wirf ein Foto vom Abendessen rein. Sprich eine Notiz ein, wenn du die Hände voll hast. Reaktionen kommen sofort auf jedem Gerät im Haushalt an.",
        },
        {
          tag: "Direktnachrichten zwischen Haushalten",
          title: "Mit der Familie weltweit schreiben.",
          body: "Verschlüsselt von Zuhause zu Zuhause. Keine Telefonnummern, kein fremder Messenger, kein Konto bei einem Dienst, der dir nicht gehört.",
        },
        {
          tag: "Sprach- & Videoanrufe",
          title: "Telefonieren, ohne dass ein Dritter mithört.",
          body: "1:1- oder Gruppenanrufe direkt aus deinen Direktnachrichten und Gruppenchats. WebRTC zwischen den Teilnehmenden, mit DTLS-SRTP verschlüsselt; der Server hilft nur beim Aufbau des Anrufs, und falls ein Relay nötig ist, sieht es immer nur verschlüsselte Medien.",
        },
        {
          tag: "Spaces für jede Gruppe",
          title: "Räume, die Haushalte verbinden.",
          body: "Familie, Nachbarschaft, Buchclub, Sportverein — jede Gruppe in ihrem eigenen privaten Space. Haushalte einmal koppeln, danach funktioniert es einfach.",
        },
        {
          tag: "Highlights",
          title: "Ein kurzer Blick, dann ist es weg.",
          body: "Teile ein Foto oder einen kurzen Clip mit Bildunterschrift — gekoppelte Haushalte sehen es in ihrem Posteingang, reagieren mit einem Emoji, und es läuft von selbst ab. Kein Archiv, das im Rechenzentrum eines Fremden wächst.",
        },
        {
          tag: "Momentum",
          title: "Einmalige Beiträge, die reisen.",
          body: "Bis zu tausend Zeichen und ein 15-Sekunden-Clip. Jeder Moment verbreitet sich drei Hops weit durch die Föderation — deine gekoppelten Haushalte und deren — und verschwindet nach einem Tag, oder nach einer Woche bei Leuten, denen du folgst.",
        },
        {
          tag: "Marktplatz",
          title: "Kaufen, verkaufen und verschenken im eigenen Kreis.",
          body: "Biete Dinge in einem Space an — Festpreis, Preisvorschlag oder zeitlich begrenzte Auktion. Nur die Haushalte in diesem Space sehen es. Keine Fremden, keine Plattformgebühren, keine Anzeigen, die an Werbekunden verkauft werden.",
        },
      ],
    },
    householdPill: "Deinen Haushalt organisieren",
    socialPill: "Sozial bleiben — privat",
    federated: {
      eyebrow: "Föderation statt Silos",
      heading: "Spaces verbinden Haushalte — deinen und die, mit denen du dich verbindest.",
      p1Html:
        "Kopple zwei Zuhause einmal per QR-Code. Danach kannst du <em>Spaces</em> anlegen — gemeinsame Räume mit eigenem Feed, Chat und Kalender — über beide hinweg. Führe einen Buchclub, organisiere ein Straßenfest oder richte einen ruhigen Raum für die Großeltern ein.",
      p2Html:
        'Ein kleines, quelloffenes <a href="/docs/global-spaces/">Relay</a> — der GFS — hilft Haushalten, die sich noch nicht gekoppelt haben, sich in globalen Spaces zu finden, und trägt ihre versiegelten Beiträge weiter. Lesen kann es sie nicht: Jeder Beitrag wird versiegelt, bevor er dein Zuhause verlässt. Wir betreiben einen unter <a href="/servers/">gfs.social-home.io</a> — verbinde dich mit einem Tipp.',
    },
  },

  apps: {
    eyebrow: "Neu · Social Home Apps",
    heading: "Apps, die über Haushalte hinweg zusammenspielen.",
    ledeHtml:
      "Installiere eine kleine App einmal — ein Schachbrett, ein gemeinsames Whiteboard, ein Quiz — und sie spricht mit <em>derselben App</em>, die in einem gekoppelten Haushalt läuft. Du machst hier einen Zug; er kommt dort an. Jedes Byte zwischen euren beiden Zuhause versiegelt, direkt von einem Zuhause zum anderen.",
    points: [
      {
        k: "App-zu-App-Föderation",
        v: "Dieselbe App in einem gekoppelten Zuhause tauscht Züge und Aktionen direkt aus — keine gemeinsame Cloud, kein Lobby-Server.",
      },
      {
        k: "Verschlüsselung zuerst",
        v: "Jeder Zug wird versiegelt und signiert, bevor er dein Zuhause verlässt. Nur das Adressetikett reist im Klartext.",
        chips: ["AES-256-GCM", "Ed25519"],
      },
      {
        k: "Sandbox",
        v: "Jede App läuft in einem eigenen, abgeriegelten Rahmen ohne Netzwerkzugriff. Der Admin installiert einmal — Bundles sind per Prüfsumme festgepinnt — und setzt eine Altersfreigabe.",
        chips: ["sha256-pinned", "connect-src 'none'", "1 MiB Limit"],
      },
      {
        k: "Peer-to-Peer",
        v: "Sitzungen laufen direkt zwischen bestätigten Haushalten. Das Relay bleibt komplett außen vor.",
      },
    ],
    technicalTerms: "Fachbegriffe",
    showcaseLabel: "Der Apps-Bildschirm",
    tabInstalled: "Installiert",
    tabCatalog: "Katalog",
    syncLine: "⇄ gekoppelt mit maple-st",
    cards: [
      {
        glyph: "♞",
        name: "Schach",
        blurb: "Gegen das Haus der Großeltern spielen, Zug für Zug.",
        state: "open",
      },
      {
        glyph: "✎",
        name: "Whiteboard",
        blurb: "Gemeinsam live eine Sitzordnung skizzieren.",
        state: "open",
      },
      { glyph: "◑", name: "Quizabend", blurb: "Zwei Haushalte, ein Quiz.", state: "install" },
    ],
    open: "Öffnen",
    install: "Installieren",
    liveHtml: "Schach · Sitzung offen mit <strong>maple-st</strong> · verschlüsselt",
  },

  trust: {
    eyebrow: "Privat von Grund auf",
    heading: "Versiegelt von deinem Zuhause zu ihrem. Fail-closed. Vor jedem Release getestet.",
    lede: "Die Einkaufsliste und der Buchclub-Chat werden auf dieselbe Weise versiegelt: Bevor irgendetwas dein Zuhause verlässt, wird es so verschlossen, dass nur die Haushalte, für die es bestimmt ist, es öffnen können. Das Haushalts-Betriebssystem und das soziale Netzwerk teilen sich eine Regel, und diese Regel hat keinen Ausschalter.",
    guarantees: [
      {
        claim: "Es sendet nie unverschlüsselt.",
        detail:
          "Wenn ein Space nicht versiegelt werden kann, bleibt die Nachricht zu Hause. Es gibt keinen Klartext-Fallback, auf den zurückgegriffen werden könnte.",
        chips: ["AES-256-GCM", "Ed25519", "fail-closed"],
      },
      {
        claim: "Space verlassen, Schlüssel verlieren.",
        detail:
          "Jedes Mal, wenn sich die Mitgliedschaft ändert, bekommt der Space einen frischen Schlüssel. Ehemalige Mitglieder können neue Beiträge nicht lesen.",
        chips: ["Schlüssel pro Epoche", "bei jeder Änderung rotiert"],
      },
      {
        claim: "Das Relay trägt Pakete, keine Briefe.",
        detail:
          "Es sieht, zu welchem Space ein versiegelter Umschlag gehört und wann — nie, was drin ist. Der strenge Modus verbirgt sogar, wer ihn gesendet hat.",
        chips: ["gepolstert 1/4/16/64/128 KiB", "±300 s", "24 h Replay-Cache"],
      },
      {
        claim: "Vor jedem Release getestet.",
        detail:
          "68 Protokoll-Testdateien prüfen diese Regeln; ein einziger Fehlschlag blockiert das Release.",
        chips: ["tests/protocol", "release-blocking"],
      },
      {
        claim: "Nichts zu verkaufen.",
        detail:
          "Keine Konten, keine Analytics, keine Werbung. Der Code ist offen und kann von jedem gelesen werden.",
        chips: ["MPL 2.0", "kein Fremd-JS"],
      },
      {
        claim: "Ehrlich beim Rest.",
        detail:
          "Was diese Seite nicht versprechen kann, steht neben den Regeln geschrieben, mit Datum und Abnahme.",
        chips: ["principles.md", "abgenommene Restrisiken"],
      },
    ],
    technicalTerms: "Fachbegriffe",
    readSecurityModel: "Das Sicherheitsmodell lesen",
    principlesLink: "principles.md auf GitHub →",
  },

  installBanner: {
    headline: "In zwei Klicks installiert.",
    body: "Füge das Add-on-Repository von Social Home zu deinem Home Assistant hinzu. Das Add-on richtet dich automatisch als Admin ein, erzeugt ein Token und registriert die passende Integration über die Supervisor-Erkennung — du musst nichts eintippen.",
    primaryCta: "Zu Home Assistant hinzufügen",
    readGuide: "Installationsanleitung lesen",
    shellLabel: "Was du in Home Assistant sehen wirst",
    terminalTitle: "Home Assistant · Add-on-Store",
  },

  familyWall: {
    figureLabel: "Ein Blick auf den Tag eines Haushalts mit Social Home",
    cal: {
      kicker: "Di · 29. Jul",
      title: "Sonntagsbrunch bei Maria",
      attendees: ["Maria", "Pascal", "Mama"],
      more: "+3",
      meta: "Haushaltskalender",
      pill: "3 Haushalte",
    },
    shop: {
      kicker: "Einkaufsliste — Küche",
      title: "5 Dinge, zuletzt ergänzt vor 4 Min.",
      done: ["Sauerteigbrot", "Olivenöl"],
      open: [
        { item: "Tomaten", by: "+ Maria" },
        { item: "Basilikum", by: "+ Pascal" },
        { item: "Ziegenkäse", by: "+ Sprache" },
      ],
    },
    tasks: {
      kicker: "Aufgaben · Einzug",
      title: "3 offen · 6 erledigt",
      items: [
        { title: "Fernseher aufhängen", owner: "Pascal", done: true },
        { title: "Bücherregal bohren", owner: "Maria · diese Woche", pin: "due" },
        { title: "Pflanzen kaufen", owner: "Lina · Wochenende" },
        { title: "Alten Kühlschrank zum Recyclinghof", owner: "Pascal · heute", pin: "overdue" },
      ],
      pinDue: "fällig",
      pinOverdue: "überfällig",
    },
    page: {
      kicker: "Seiten · Haushandbuch",
      title: "Heizkörper entlüften",
      introHtml:
        "Zuerst die Heizung ausschalten. Warten, bis die Anlage abgekühlt ist — meist <em>10 bis 15 Minuten</em>.",
      steps: [
        "Entlüftungsschlüssel in der Küchenschublade suchen (roter Deckel).",
        "Ventil eine Vierteldrehung öffnen, bis Wasser zischend austritt.",
        "Fest zudrehen. Weiter zum nächsten Heizkörper.",
      ],
      meta: "Bearbeitet von Maria · vor 2 Tagen",
      pill: "Wiki",
    },
    sticky: {
      lineHtml:
        "🥕 Karotten in der unteren Schublade<br /><span>Sonntagsbraten — keine mehr kaufen!</span>",
      meta: "Maria · Haftnotizen",
    },
    photo: {
      caption: "„Erste Tomate des Jahres — Haussteuer: die Hälfte geht an Mama.“",
    },
    voice: {
      kicker: "Sprachnotiz · 0:17",
      title: "Pascal — jemand Lust auf Pasta?",
      transcriptHtml: "„…jemand Lust auf <em>Pasta</em> heute Abend? Ich bin beim Feinkostladen.“",
    },
    call: {
      kicker: "Gruppenanruf · 14:32",
      title: "Sonntagsanruf mit der Familie",
      tiles: ["Mama", "Papa", "Schwester", "Du"],
      meta: "Verschlüsselt · 4 Haushalte",
      pill: "P2P · DTLS-SRTP",
    },
    presence: {
      kicker: "Stille Anwesenheit",
      title: "Gerade jetzt",
      people: [
        { name: "Maria", status: "zu Hause", on: true },
        { name: "Pascal", status: "radelt heim", on: true },
        { name: "Mama", status: "unterwegs", on: false },
        { name: "Lina", status: "zu Hause", on: true },
      ],
      meta: "Kein Verlauf gespeichert",
      pill: "Opt-in",
    },
  },

  spaceWall: {
    figureLabel: "Ein Blick auf die Arten von Spaces, die Haushalte teilen",
    tiles: [
      {
        glyph: "🏡",
        scope: "private",
        name: "Familie",
        meta: "4 Personen · 3 Haushalte · privat",
        poster: "Mama",
        quote: "„Sonntag Abendessen bei uns — bringt den Hund mit.“",
      },
      {
        glyph: "🌳",
        scope: "public",
        name: "Eichenstrasse 3–17",
        meta: "24 Personen · 14 Haushalte · öffentlich",
        poster: "Lina",
        quote: "„Straßengrillen nächsten Samstag — Stühle mitbringen.“",
        chips: ["📅 Sa 19:00", "📍 Garten Nr. 11"],
      },
      {
        glyph: "🔨",
        scope: "public",
        name: "Maker Space",
        meta: "12 Personen · 7 Haushalte · öffentlich",
        poster: "Rita",
        quote: "„Eichenstuhl fertig — Bilder im Feed.“",
      },
      {
        glyph: "📖",
        scope: "private",
        name: "Buchclub",
        meta: "8 Personen · 5 Haushalte · privat",
        poster: "Rebecca",
        quote: "„Kapitel 7 bis Freitag lesen — steht im Kalender.“",
      },
      {
        glyph: "⛰️",
        scope: "public",
        name: "Boulder-Crew",
        meta: "16 Personen · 11 Haushalte · öffentlich",
        poster: "Pascal",
        quote: "„Training auf 19:00 verschoben — gleiche Halle.“",
      },
      {
        glyph: "🛒",
        scope: "global",
        name: "Basar · Nachbarschaft",
        meta: "~50 Personen · global · über deinen GFS",
        poster: "Maria",
        quote: "„Eichenregal zu verschenken — nur Abholung, bis So.“",
        chips: ["🪑 Gratis", "🔁 1 Tausch offen"],
      },
    ],
    legendLabel: "Legende zur Reichweite von Spaces",
    legend: {
      private: "Privat — nur die Leute, die du einlädst.",
      household: "Haushalt — automatisch alle in deinem Zuhause.",
      public: "Öffentlich — deine gekoppelten Haushalte können ihn finden und um Beitritt bitten.",
      global: "Global — auf deinem GFS gelistet, damit jeder ihn finden kann.",
    },
  },

  servers: {
    title: "Unser Server",
    description:
      "Das Social-Home-Projekt betreibt einen öffentlichen Global Federation Server, live unter gfs.social-home.io. Inhaltsblind per Design: Er trägt versiegelte Beiträge weiter und liest sie nie. Mit einem Tipp verbinden — oder einen eigenen betreiben.",
    eyebrow: "Global Federation Server",
    h1Html: "Verbinde dich mit dem Relay, das wir <em>für dich</em> betreiben.",
    ledeHtml:
      "Das Social-Home-Projekt betreibt einen öffentlichen Global Federation Server (GFS) — jetzt live unter <code>gfs.social-home.io</code>. Er hilft deinen globalen Spaces und deinen öffentlichen Momenten, Haushalte zu erreichen, die sich noch nicht mit dir gekoppelt haben. Jeder Beitrag wird versiegelt, bevor er dein Zuhause verlässt, also trägt das Relay ihn weiter, ohne ihn je zu lesen.",
    hostedBy: "Gehostet von Social Home",
    serverName: "Global Federation Server",
    live: "Live",
    body: "Ein QR-Scan und du bist verbunden. Globale Spaces erscheinen unter Räume entdecken; öffentliche Momente verbreiten sich zu Followern in jedem gekoppelten Haushalt; öffentliche Highlights-Links laufen ebenfalls hier durch. Inhaltsblind per Design.",
    bullets: [
      "Verzeichnis globaler Spaces",
      "Öffentliches Momentum-Verzeichnis + Follow-Graph",
      "Relay für öffentliche Highlights-Links",
      "Altersfreigabe-Richtlinie wird durchgesetzt",
      "Versiegelte Beiträge für Offline-Haushalte zwischengespeichert, dann weg",
      "Liest nie Nachrichten, Fotos oder Anrufinhalte",
    ],
    technicalTerms: "Fachbegriffe",
    chips: ["gepolstert 1/4/16/64/128 KiB", "24 h Warteschlange", "keine Inhalte gespeichert"],
    connect: "Verbinden →",
    qrLabel: "QR-Code zur Kopplung mit dem Social Home GFS",
    qrCaptionHtml:
      "Scannen in <strong>Social Home → Einstellungen → Verbindungen → Global Federation Server</strong>",
    howToHeading: "So verbindest du dich",
    howToStepsHtml: [
      "Öffne <strong>Social Home</strong> zu Hause.",
      "Gehe zu <strong>Einstellungen → Verbindungen → Global Federation Server</strong>.",
      "Tippe auf <strong>GFS hinzufügen</strong>.",
      "Scanne den QR-Code oben — oder füge die URL ein.",
    ],
    howToNote:
      "Die meisten Haushalte brauchen nur einen. Du kannst dich mit weiteren Relays koppeln, für Ausfallsicherheit oder die Richtlinie einer privaten Community.",
    seesHeading: "Was dieses Relay sehen kann und was nicht",
    seesIntro:
      "Das Relay bekommt immer nur versiegelte Umschläge zu sehen. Was es erfährt, hängt von der Art des Space ab, zu dem der Umschlag gehört — und in jedem Fall lautet die Antwort auf „den Inhalt?“: nie.",
    seesColSpace: "Space",
    seesColSees: "Das Relay sieht",
    seesColNever: "Nie",
    seesRows: [
      {
        space: "Globale Spaces",
        mode: "vertrauend · Standard",
        sees: "Welcher Haushalt in welchen Space gepostet hat, und wann.",
        never: "Den Inhalt.",
      },
      {
        space: "Globale Spaces",
        mode: "streng · Wahl des Besitzers",
        sees: "Dasselbe — aber nicht, wer gepostet hat.",
        never: "Den Inhalt oder den Absender.",
      },
      {
        space: "Privater Space mit eingeschaltetem GFS",
        mode: "standardmäßig aus",
        sees: "Welche Haushalte teilnehmen.",
        never: "Den Namen des Space, seine Beiträge oder seinen Schlüssel.",
      },
    ],
    seesChips: [
      "nur Routing-Metadaten",
      "identitätsfreies Host-Relay",
      "anonymous_publish proof",
      "strenger Modus · gemeinsamer Writer-Key",
    ],
    residualsHtml:
      'Wie jeder Server im Internet sieht es außerdem deine IP-Adresse, den Zeitpunkt jeder Anfrage und die Größenklasse jedes Umschlags. Diese Restrisiken stehen im <a href="/docs/security/">Sicherheitsmodell</a>.',
    runOwnHeading: "Betreibe deinen eigenen",
    runOwnHtml:
      'Für eine private Community, eine Organisation oder ein haushaltsspezifisches Relay kannst du in etwa 15 Minuten einen eigenen GFS auf jedem VPS aufsetzen. <a href="/docs/running-a-gfs/">Eigenen GFS einrichten →</a>',
  },

  notFound: {
    title: "404 — Seite nicht gefunden",
    eyebrow: "Fehler · 404",
    heading: "🏠 Diese Seite ist in einen anderen Haushalt gezogen.",
    lede: "Die gesuchte Seite ist entweder umgezogen oder hat nie existiert.",
    goHome: "Zur Startseite",
    searchDocs: "Doku durchsuchen",
  },
};
