/**
 * French UI strings — mirrors ``en.ts`` key for key.
 *
 * ``en.ts`` is the reference; edit it first, then update this file
 * to match. ``npm run check`` fails when this locale drifts from
 * ``UiStrings``.
 */
import type { UiStrings } from "./types";
import { installHref } from "./en";

export const fr: UiStrings = {
  dateLocale: "fr-FR",

  site: {
    name: "Social Home",
    landingDescription:
      "Un réseau social de foyer, privé et fédéré — calendriers, listes de courses, photos et discussions qui tournent chez vous. Open source, MPL 2.0.",
    defaultDescription:
      "L'OS du foyer qui est aussi un réseau social fédéré — il tourne chez vous.",
    ogImageAlt: "Social Home — la maison sociale de votre foyer. Tourne chez vous.",
    skipToContent: "Aller au contenu",
  },

  header: {
    homeAriaLabel: "Social Home — accueil",
    motto: "OS du foyer · fédéré · ouvert",
    links: [
      { href: "/docs/", label: "Docs" },
      { href: "/docs/protocol/", label: "Comment ça marche" },
      { href: "/docs/global-spaces/", label: "Espaces globaux" },
      { href: "/servers/", label: "Notre serveur" },
      { href: "/blog/", label: "Blog" },
      { href: "/contribute/", label: "Contribuer" },
    ],
    primaryNavLabel: "Principale",
    githubAriaLabel: "Social Home sur GitHub",
    languageLabel: "Langue",
  },

  footer: {
    mottoHtml: "<em>La maison sociale de votre foyer.</em>",
    smallHtml:
      'Open source sous <a href="/license/">Mozilla Public License 2.0</a>. Hébergé par le foyer, jamais par nous.',
    navLabel: "Pied de page",
    columns: [
      {
        heading: "Lire",
        links: [
          { href: "/docs/getting-started/", label: "Premiers pas" },
          { href: "/docs/protocol/", label: "Comment ça marche" },
          { href: "/docs/federation/", label: "Des foyers fédérés" },
          { href: "/docs/global-spaces/", label: "Espaces globaux" },
          { href: "/docs/privacy/", label: "Modèle de confidentialité" },
          { href: "/docs/security/", label: "Modèle de sécurité" },
        ],
      },
      {
        heading: "Faire tourner",
        links: [
          { href: "/docs/getting-started/", label: "Ajouter à Home Assistant" },
          { href: "/servers/", label: "Notre serveur" },
          { href: "/docs/running-a-gfs/", label: "Héberger un relais" },
          { href: "https://github.com/social-home-io/socialhome/releases", label: "Versions" },
          { href: "/blog/", label: "Blog" },
        ],
      },
      {
        heading: "Projet",
        links: [
          { href: "https://github.com/social-home-io", label: "GitHub" },
          { href: "/contribute/", label: "Contribuer" },
          { href: "/license/", label: "Licence (MPL 2.0)" },
        ],
      },
    ],
    copyright: "Les contributeurs de Social Home",
    builtWith: "Créé avec Astro · sans cookies ni mesure d'audience",
  },

  docs: {
    navLabel: "Documentation",
    drawerTitle: "Sur ce site",
    metaLabel: "Métadonnées de la page",
    editOnGithub: "Modifier cette page sur GitHub →",
    underTheHood: "Sous le capot",
  },

  blog: {
    title: "Blog",
    description:
      "Les nouveautés de Social Home, racontées du point de vue du foyer — ce qui change dans votre journée, captures d'écran à l'appui.",
    eyebrow: "Blog",
    h1Html: "Quoi de neuf <em>à la maison</em>.",
    ledeHtml:
      "Les nouveautés, racontées du point de vue de votre foyer : ce qui change dans votre journée, captures d'écran à l'appui. Chaque version est listée sur <a href=\"https://github.com/social-home-io/socialhome/releases\">GitHub Releases</a>.",
    readPost: "Lire l'article →",
    allPosts: "← Tous les articles",
    editOnGithub: "Modifier cet article sur GitHub →",
  },

  landing: {
    hero: {
      eyebrow: "Ouvert · fédéré · MPL 2.0",
      sub: "Calendrier, liste de courses, photos, discussions, highlights, moments, apps — le tout tourne chez vous. Un OS du foyer qui est aussi un réseau social qui vous appartient vraiment.",
      primaryCta: "Ajouter à Home Assistant",
      secondaryCta: "Que sait-il faire ?",
      installHref,
      secondaryHref: "/docs/protocol/",
    },
    heroHeadlineHtml: "La maison <em>sociale</em><br />de votre <em>foyer</em>.",
    heroCaption: "Libre et open source · MPL 2.0 · tourne sur votre propre Home Assistant",
    heroLeadIn: "Un aperçu de la journée d'un foyer",
    valueProps: [
      {
        claim: "Votre serveur, vos règles.",
        detail: "Tout vit chez vous. Aucun cloud tiers ne touche à votre journée.",
      },
      {
        claim: "Toujours chiffré.",
        detail:
          "Chaque message est scellé avant de quitter votre serveur — pas d'interrupteur, pas d'exception. Même le relais ne peut pas le lire.",
      },
      {
        claim: "La fédération, pas des silos.",
        detail:
          "Connectez les foyers un scan de QR code à la fois. Jumelez, puis parlez-vous directement.",
      },
      {
        claim: "Open source. Sans publicité.",
        detail:
          "MPL 2.0. Pas de mesure d'audience, pas d'équipe growth qui cherche à monétiser votre soirée.",
      },
    ],
    household: {
      heading: "Un OS du foyer qui fait tourner la journée, discrètement.",
      lede: "Calendriers, listes, tâches, notes, pages, présence, voix — toutes les surfaces logistiques partagées dont un foyer a vraiment besoin, sans la taxe de l'inscription à un cloud.",
      cards: [
        {
          tag: "Calendrier partagé",
          title: "Tous les calendriers en une seule vue.",
          body: "Personnel, partenaire, foyer — codés par couleur dans une seule vue. Ajoutez des événements à la voix ou depuis n'importe quel téléphone, puis répondez oui / non / peut-être pour que tout le monde sache qui vient. Les invités des foyers jumelés répondent à travers la fédération.",
        },
        {
          tag: "Liste de courses en direct",
          title: "Des listes vivantes, sur tous les téléphones.",
          body: "« Ajoute du lait » depuis le téléphone de n'importe qui, ou à la voix. Cochez les articles en temps réel au supermarché.",
        },
        {
          tag: "Tâches",
          title: "Les corvées réparties, sans harcèlement.",
          body: "Responsables par liste, échéances, badges de retard. Percer l'étagère ce week-end ; recycler le vieux frigo aujourd'hui ; tout le monde voit qui s'occupe de quoi.",
        },
        {
          tag: "Pages",
          title: "Un wiki pour le manuel de la maison.",
          body: "Des pages Markdown avec verrous d'édition et wikiliens. La notice pour purger les radiateurs vit là où vous la retrouverez vraiment — à côté de toutes les autres entrées du manuel de la maison.",
        },
        {
          tag: "Post-it",
          title: "Des notes aimantées au frigo qui vous suivent.",
          body: "Des notes de couleur, modifiables d'un tapotement, épinglées sur le canevas d'un espace. Les carottes dans le bac du bas ; des idées de cadeaux d'anniversaire ; tout ce dont le foyer doit se souvenir ensemble.",
        },
        {
          tag: "Présence discrète",
          title: "Qui est à la maison, là maintenant.",
          body: "Un simple indicateur, rien de plus — pas d'historique GPS, pas de miettes de pain. Sur activation, par personne et par appareil.",
        },
        {
          tag: "Sécurité familiale",
          title: "Des comptes pour les enfants, avec des garde-fous.",
          body: "Marquez le compte d'un enfant comme protégé, indiquez son âge et nommez un tuteur. Les espaces et apps à limite d'âge restent hors de portée, ses messages privés restent entre les foyers que vous avez jumelés, et les tuteurs disposent d'un aperçu discret en lecture seule.",
        },
      ],
    },
    social: {
      heading: "Un réseau social qui vous appartient vraiment.",
      lede: "Les bons côtés des réseaux sociaux — fils, photos, messages privés, appels, salons de groupe — sans rien donner à vendre à la plateforme.",
      cards: [
        {
          tag: "Fil du foyer",
          title: "Photos, notes vocales, nouvelles.",
          body: "Postez une photo du dîner. Enregistrez une note vocale quand vous avez les mains prises. Les réactions arrivent instantanément sur tous les appareils du foyer.",
        },
        {
          tag: "Messages privés entre foyers",
          title: "Écrivez à la famille, où qu'elle soit.",
          body: "Chiffré de maison à maison. Pas de numéro de téléphone, pas de messagerie tierce, pas de compte sur un service qui n'est pas le vôtre.",
        },
        {
          tag: "Appels audio et vidéo",
          title: "Appelez sans qu'un tiers écoute.",
          body: "Appels 1:1 ou de groupe directement depuis vos messages privés et discussions de groupe. WebRTC entre les participants, chiffré en DTLS-SRTP ; le serveur aide seulement à démarrer l'appel, et si un relais est nécessaire il ne voit jamais que des médias chiffrés.",
        },
        {
          tag: "Des espaces pour chaque groupe",
          title: "Des salons qui traversent les foyers.",
          body: "Famille, voisins, club de lecture, équipe de sport — chacun dans son propre espace privé. Jumelez les foyers une fois, ensuite ça marche tout seul.",
        },
        {
          tag: "Highlights",
          title: "Un aperçu, puis plus rien.",
          body: "Postez une photo ou un court clip avec une légende — les foyers jumelés le voient dans leur boîte de réception, réagissent avec un emoji, et il expire de lui-même. Aucune archive qui grossit dans le centre de données d'un inconnu.",
        },
        {
          tag: "Momentum",
          title: "Des publications éphémères qui voyagent.",
          body: "Jusqu'à mille caractères et un clip de 15 secondes. Chaque moment se propage sur trois sauts à travers la fédération — vos foyers jumelés et les leurs — et disparaît après un jour, ou une semaine pour les personnes que vous suivez.",
        },
        {
          tag: "Place de marché",
          title: "Achetez, vendez et donnez dans votre cercle.",
          body: "Mettez des objets en vente dans un espace — prix fixe, meilleure offre ou enchère à durée limitée. Seuls les foyers de cet espace les voient. Pas d'inconnus, pas de frais de plateforme, pas d'annonces vendues aux annonceurs.",
        },
      ],
    },
    householdPill: "Gérez votre foyer",
    socialPill: "Restez sociable — en privé",
    federated: {
      eyebrow: "La fédération, pas des silos",
      heading: "Les espaces traversent les foyers — le vôtre et ceux auxquels vous vous connectez.",
      p1Html:
        "Jumelez deux maisons une fois avec un QR code. Ensuite, vous pouvez créer des <em>espaces</em> — des salons partagés avec leur propre fil, leur discussion et leur calendrier — entre les deux. Animez un club de lecture, organisez une fête de quartier, ou gardez un salon tranquille pour les grands-parents.",
      p2Html:
        'Un petit <a href="/docs/global-spaces/">relais</a> open source — le GFS — aide les foyers qui ne se sont pas jumelés à se trouver dans les espaces globaux, et transporte leurs publications scellées. Il ne peut pas les lire : chaque publication est scellée avant de quitter votre maison. Nous en faisons tourner un sur <a href="/servers/">gfs.social-home.io</a> — connectez-vous d\'un geste.',
    },
  },

  apps: {
    eyebrow: "Nouveau · Apps Social Home",
    heading: "Des apps qui jouent entre foyers.",
    ledeHtml:
      "Installez une petite app une fois — un échiquier, un tableau blanc partagé, un quiz — et elle dialogue avec la <em>même app</em> qui tourne dans un foyer jumelé. Jouez un coup ici ; il arrive là-bas. Chaque octet est scellé entre vos deux maisons, directement de l'une à l'autre.",
    points: [
      {
        k: "Fédération d'app à app",
        v: "La même app dans une maison jumelée échange coups et opérations directement — pas de cloud partagé, pas de serveur de lobby.",
      },
      {
        k: "Le chiffrement d'abord",
        v: "Chaque coup est scellé et signé avant de quitter votre maison. Seule l'étiquette d'adresse circule en clair.",
        chips: ["AES-256-GCM", "Ed25519"],
      },
      {
        k: "Isolées (sandbox)",
        v: "Chaque app tourne dans son propre cadre verrouillé, sans accès réseau. L'admin l'installe une fois — les bundles sont épinglés par somme de contrôle — et fixe une limite d'âge.",
        chips: ["sha256-pinned", "connect-src 'none'", "1 MiB max"],
      },
      {
        k: "Pair à pair",
        v: "Les sessions passent directement entre foyers confirmés. Le relais n'y intervient pas du tout.",
      },
    ],
    technicalTerms: "Termes techniques",
    showcaseLabel: "L'écran Apps",
    tabInstalled: "Installées",
    tabCatalog: "Catalogue",
    syncLine: "⇄ jumelé avec maple-st",
    cards: [
      {
        glyph: "♞",
        name: "Échecs",
        blurb: "Jouez contre la maison des grands-parents, un coup à la fois.",
        state: "open",
      },
      {
        glyph: "✎",
        name: "Tableau blanc",
        blurb: "Dessinez un plan de table ensemble, en direct.",
        state: "open",
      },
      { glyph: "◑", name: "Soirée quiz", blurb: "Deux foyers, un seul quiz.", state: "install" },
    ],
    open: "Ouvrir",
    install: "Installer",
    liveHtml: "Échecs · session ouverte avec <strong>maple-st</strong> · chiffrée",
  },

  trust: {
    eyebrow: "Privé par construction",
    heading: "Scellé de votre maison à la leur. Fail-closed. Testé avant chaque version.",
    lede: "La liste de courses et la discussion du club de lecture sont scellées de la même façon : avant que quoi que ce soit ne quitte votre maison, c'est verrouillé pour que seuls les foyers destinataires puissent l'ouvrir. L'OS du foyer et le réseau social partagent une seule règle, et cette règle n'a pas d'interrupteur.",
    guarantees: [
      {
        claim: "Il n'envoie jamais rien en clair.",
        detail:
          "Si un espace ne peut pas être scellé, le message reste à la maison. Il n'existe aucun repli en texte clair.",
        chips: ["AES-256-GCM", "Ed25519", "fail-closed"],
      },
      {
        claim: "Quittez un espace, perdez la clé.",
        detail:
          "À chaque changement de membres, l'espace reçoit une nouvelle clé. Les anciens membres ne peuvent pas lire les nouvelles publications.",
        chips: ["clé par époque", "renouvelée à chaque changement"],
      },
      {
        claim: "Le relais transporte des colis, pas des lettres.",
        detail:
          "Il voit à quel espace appartient une enveloppe scellée, et quand — jamais ce qu'il y a dedans. Le mode strict masque même qui l'a envoyée.",
        chips: ["rembourrage 1/4/16/64/128 KiB", "±300 s", "cache anti-rejeu 24 h"],
      },
      {
        claim: "Testé avant chaque version.",
        detail:
          "68 fichiers de tests du protocole vérifient ces règles ; un seul échec bloque la version.",
        chips: ["tests/protocol", "bloquant pour la version"],
      },
      {
        claim: "Rien à vendre.",
        detail:
          "Pas de comptes, pas de mesure d'audience, pas de publicité. Le code est ouvert, lisible par tous.",
        chips: ["MPL 2.0", "aucun JS tiers"],
      },
      {
        claim: "Honnête sur le reste.",
        detail:
          "Tout ce que cette page ne peut pas promettre est écrit à côté des règles, avec une date et une signature.",
        chips: ["principles.md", "risques résiduels signés"],
      },
    ],
    technicalTerms: "Termes techniques",
    readSecurityModel: "Lire le modèle de sécurité",
    principlesLink: "principles.md sur GitHub →",
  },

  installBanner: {
    headline: "Installez en deux clics.",
    body: "Ajoutez le dépôt de modules complémentaires Social Home à votre Home Assistant. Le module complémentaire vous configure automatiquement comme admin, génère un jeton et enregistre l'intégration correspondante via la découverte du Supervisor — rien à saisir.",
    primaryCta: "Ajouter à Home Assistant",
    readGuide: "Lire le guide d'installation",
    shellLabel: "Ce que vous verrez dans Home Assistant",
    terminalTitle: "Home Assistant · Boutique des modules complémentaires",
  },

  familyWall: {
    figureLabel: "Un aperçu de la journée d'un foyer sur Social Home",
    cal: {
      kicker: "mar. · 29 juil.",
      title: "Brunch du dimanche chez Maria",
      attendees: ["Maria", "Pascal", "Maman"],
      more: "+3",
      meta: "Calendrier du foyer",
      pill: "3 foyers",
    },
    shop: {
      kicker: "Liste de courses — cuisine",
      title: "5 articles, dernier ajout il y a 4 min",
      done: ["Pain au levain", "Huile d'olive"],
      open: [
        { item: "Tomates", by: "+ Maria" },
        { item: "Basilic", by: "+ Pascal" },
        { item: "Fromage de chèvre", by: "+ voix" },
      ],
    },
    tasks: {
      kicker: "Tâches · corvées d'emménagement",
      title: "3 à faire · 6 terminées",
      items: [
        { title: "Accrocher la télé", owner: "Pascal", done: true },
        { title: "Percer l'étagère", owner: "Maria · cette semaine", pin: "due" },
        { title: "Acheter des plantes", owner: "Lina · week-end" },
        {
          title: "Déposer le vieux frigo au recyclage",
          owner: "Pascal · aujourd'hui",
          pin: "overdue",
        },
      ],
      pinDue: "à échéance",
      pinOverdue: "en retard",
    },
    page: {
      kicker: "Pages · Manuel de la maison",
      title: "Comment purger les radiateurs",
      introHtml:
        "D'abord, éteignez le chauffage. Attendez que le circuit refroidisse — généralement <em>10 à 15 minutes</em>.",
      steps: [
        "Trouvez la clé de purge dans le tiroir de la cuisine (couvercle rouge).",
        "Tournez la vis d'un quart de tour jusqu'à ce que l'eau siffle.",
        "Refermez bien. Passez au radiateur suivant.",
      ],
      meta: "Modifié par Maria · il y a 2 jours",
      pill: "wiki",
    },
    sticky: {
      lineHtml:
        "🥕 Carottes dans le bac du bas<br /><span>Rôti du dimanche — n’en rachetez pas !</span>",
      meta: "Maria · post-it",
    },
    photo: {
      caption: "« Première tomate de l’année — taxe de la maison : la moitié pour Maman. »",
    },
    voice: {
      kicker: "Note vocale · 0:17",
      title: "Pascal — des pâtes, ça tente quelqu’un ?",
      transcriptHtml:
        "« …des <em>pâtes</em> ce soir, ça tente quelqu’un ? Je suis près du traiteur. »",
    },
    call: {
      kicker: "Appel de groupe · 14:32",
      title: "Appel du dimanche en famille",
      tiles: ["Maman", "Papa", "Sœur", "Vous"],
      meta: "Chiffré · 4 foyers",
      pill: "P2P · DTLS-SRTP",
    },
    presence: {
      kicker: "Présence discrète",
      title: "En ce moment",
      people: [
        { name: "Maria", status: "à la maison", on: true },
        { name: "Pascal", status: "rentre à vélo", on: true },
        { name: "Maman", status: "absente", on: false },
        { name: "Lina", status: "à la maison", on: true },
      ],
      meta: "Aucun historique conservé",
      pill: "sur activation",
    },
  },

  spaceWall: {
    figureLabel: "Un aperçu des types d'espaces que les foyers partagent",
    tiles: [
      {
        glyph: "🏡",
        scope: "private",
        name: "Famille",
        meta: "4 personnes · 3 foyers · privé",
        poster: "Maman",
        quote: "« Dîner chez nous dimanche — amenez le chien. »",
      },
      {
        glyph: "🌳",
        scope: "public",
        name: "Eichenstrasse 3–17",
        meta: "24 personnes · 14 foyers · public",
        poster: "Lina",
        quote: "« Barbecue de rue samedi prochain — apportez des chaises. »",
        chips: ["📅 sam. 19:00", "📍 jardin du n° 11"],
      },
      {
        glyph: "🔨",
        scope: "public",
        name: "Maker Space",
        meta: "12 personnes · 7 foyers · public",
        poster: "Rita",
        quote: "« Chaise en chêne terminée — photos dans le fil. »",
      },
      {
        glyph: "📖",
        scope: "private",
        name: "Club de lecture",
        meta: "8 personnes · 5 foyers · privé",
        poster: "Rebecca",
        quote: "« Lisez le chapitre 7 pour vendredi — c’est dans le calendrier. »",
      },
      {
        glyph: "⛰️",
        scope: "public",
        name: "Équipe de bloc",
        meta: "16 personnes · 11 foyers · public",
        poster: "Pascal",
        quote: "« Entraînement déplacé à 19:00 — même salle. »",
      },
      {
        glyph: "🛒",
        scope: "global",
        name: "Bazar · quartier",
        meta: "~50 personnes · global · via votre GFS",
        poster: "Maria",
        quote: "« Étagère en chêne à donner — à venir chercher, avant dim. »",
        chips: ["🪑 À donner", "🔁 1 échange en attente"],
      },
    ],
    legendLabel: "Légende des portées d'espace",
    legend: {
      private: "Privé — seulement les personnes que vous invitez.",
      household: "Foyer — tout le monde chez vous, automatiquement.",
      public: "Public — vos foyers jumelés peuvent le trouver et demander à le rejoindre.",
      global: "Global — listé sur votre GFS pour que tout le monde puisse le trouver.",
    },
  },

  servers: {
    title: "Notre serveur",
    description:
      "Le projet Social Home fait tourner un Global Federation Server public, en ligne sur gfs.social-home.io. Aveugle au contenu par conception : il transporte des publications scellées et ne les lit jamais. Connectez-vous d'un geste, ou faites tourner le vôtre.",
    eyebrow: "Global Federation Server",
    h1Html: "Connectez-vous au relais que nous faisons tourner <em>pour vous</em>.",
    ledeHtml:
      "Le projet Social Home fait tourner un Global Federation Server (GFS) public — en ligne dès maintenant sur <code>gfs.social-home.io</code>. Il aide vos espaces globaux et vos moments publics à atteindre des foyers qui ne se sont pas encore jumelés avec vous. Chaque publication est scellée avant de quitter votre maison, le relais la transporte donc sans jamais la lire.",
    hostedBy: "Hébergé par Social Home",
    serverName: "Global Federation Server",
    live: "En ligne",
    body: "Un scan de QR code et vous êtes connecté. Les espaces globaux apparaissent dans Parcourir les espaces ; les moments publics se propagent aux abonnés de chaque foyer jumelé ; les liens publics des Highlights passent aussi par ici. Aveugle au contenu par conception.",
    bullets: [
      "Annuaire des espaces globaux",
      "Annuaire public Momentum + graphe d'abonnements",
      "Relais des liens publics Highlights",
      "Politique de limite d'âge appliquée",
      "Publications scellées mises en file pour les foyers hors ligne, puis effacées",
      "Ne lit jamais le contenu des messages, photos ou appels",
    ],
    technicalTerms: "Termes techniques",
    chips: ["rembourrage 1/4/16/64/128 KiB", "file d'attente 24 h", "zéro contenu stocké"],
    connect: "Se connecter →",
    qrLabel: "QR code de jumelage du GFS Social Home",
    qrCaptionHtml:
      "Scannez-le dans <strong>Social Home → Paramètres → Connexions → Global Federation Servers</strong>",
    howToHeading: "Comment se connecter",
    howToStepsHtml: [
      "Ouvrez <strong>Social Home</strong> à la maison.",
      "Allez dans <strong>Paramètres → Connexions → Global Federation Servers</strong>.",
      "Tapez sur <strong>Ajouter un GFS</strong>.",
      "Scannez le QR code ci-dessus — ou collez l'URL.",
    ],
    howToNote:
      "La plupart des foyers n'en ont besoin que d'un. Vous pouvez vous jumeler avec d'autres relais pour la résilience, ou pour la politique d'une communauté privée.",
    seesHeading: "Ce que ce relais peut et ne peut pas voir",
    seesIntro:
      "Le relais ne manipule jamais que des enveloppes scellées. Ce qu'il apprend dépend du type d'espace auquel l'enveloppe appartient — et dans tous les cas, la réponse à « le contenu ? » est : jamais.",
    seesColSpace: "Espace",
    seesColSees: "Le relais voit",
    seesColNever: "Jamais",
    seesRows: [
      {
        space: "Espaces globaux",
        mode: "confiance · par défaut",
        sees: "Quel foyer a publié, dans quel espace, et quand.",
        never: "Le contenu.",
      },
      {
        space: "Espaces globaux",
        mode: "strict · au choix du propriétaire",
        sees: "La même chose — mais pas qui a publié.",
        never: "Le contenu, ni l'expéditeur.",
      },
      {
        space: "Espace privé avec le GFS activé",
        mode: "désactivé par défaut",
        sees: "Quels foyers participent.",
        never: "Le nom de l'espace, ses publications ou sa clé.",
      },
    ],
    seesChips: [
      "métadonnées de routage uniquement",
      "relais hôte sans identité",
      "preuve anonymous_publish",
      "mode strict · clé d'écriture partagée",
    ],
    residualsHtml:
      "Comme n'importe quel serveur sur Internet, il voit aussi votre adresse IP, l'heure de chaque requête et la classe de taille de chaque enveloppe. Ces risques résiduels sont consignés dans le <a href=\"/docs/security/\">modèle de sécurité</a>.",
    runOwnHeading: "Faites tourner le vôtre",
    runOwnHtml:
      'Pour une communauté privée, une organisation ou un relais propre à votre foyer, vous pouvez monter votre propre GFS sur n\'importe quel VPS en 15 minutes environ. <a href="/docs/running-a-gfs/">Configurer votre propre GFS →</a>',
  },

  notFound: {
    title: "404 — page introuvable",
    eyebrow: "Erreur · 404",
    heading: "🏠 Cette page a déménagé dans un autre foyer.",
    lede: "La page que vous demandez a déménagé ou n'a jamais existé.",
    goHome: "Retour à l'accueil",
    searchDocs: "Chercher dans la documentation",
  },
};
