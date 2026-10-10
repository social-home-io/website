/**
 * English UI strings — the reference every other locale mirrors.
 *
 * Edit this file first, then update ``de.ts``, ``nl.ts`` and
 * ``fr.ts`` to match (see CLAUDE.md, "Translations"). Keys and
 * structure must stay identical across locales; ``npm run check``
 * fails when a locale drifts from ``UiStrings``.
 */
import type { UiStrings } from "./types";

export const installHref =
  "https://my.home-assistant.io/redirect/supervisor_addon/?addon=752dab87_socialhome&repository_url=https%3A%2F%2Fgithub.com%2Fsocial-home-io%2Fha-app";

export const en: UiStrings = {
  dateLocale: "en",

  site: {
    name: "Social Home",
    landingDescription:
      "A private, federated household social network — calendars, shopping lists, photos, and chat that run in your own home. Open source, MPL 2.0.",
    defaultDescription:
      "The household OS that's also a federated social network — runs in your own home.",
    ogImageAlt: "Social Home — the social home for your household. Runs in your own home.",
    skipToContent: "Skip to content",
  },

  header: {
    homeAriaLabel: "Social Home — home",
    motto: "household OS · federated · open",
    links: [
      { href: "/docs/", label: "Docs" },
      { href: "/docs/protocol/", label: "How it works" },
      { href: "/docs/global-spaces/", label: "Global spaces" },
      { href: "/servers/", label: "Our server" },
      { href: "/blog/", label: "Blog" },
      { href: "/contribute/", label: "Contribute" },
    ],
    primaryNavLabel: "Primary",
    githubAriaLabel: "Social Home on GitHub",
    languageLabel: "Language",
  },

  footer: {
    mottoHtml: "<em>The social home for your household.</em>",
    smallHtml:
      'Open source under the <a href="/license/">Mozilla Public License 2.0</a>. Hosted by the household, never by us.',
    navLabel: "Footer",
    columns: [
      {
        heading: "Read",
        links: [
          { href: "/docs/getting-started/", label: "Getting started" },
          { href: "/docs/protocol/", label: "How it works" },
          { href: "/docs/federation/", label: "Households, federated" },
          { href: "/docs/global-spaces/", label: "Global spaces" },
          { href: "/docs/privacy/", label: "Privacy model" },
          { href: "/docs/security/", label: "Security model" },
        ],
      },
      {
        heading: "Run",
        links: [
          { href: "/docs/getting-started/", label: "Add to Home Assistant" },
          { href: "/servers/", label: "Our server" },
          { href: "/docs/running-a-gfs/", label: "Host a relay" },
          { href: "https://github.com/social-home-io/socialhome/releases", label: "Releases" },
          { href: "/blog/", label: "Blog" },
        ],
      },
      {
        heading: "Project",
        links: [
          { href: "https://github.com/social-home-io", label: "GitHub" },
          { href: "/contribute/", label: "Contribute" },
          { href: "/license/", label: "License (MPL 2.0)" },
        ],
      },
    ],
    copyright: "Social Home contributors",
    builtWith: "Built with Astro · no cookies, no analytics",
  },

  docs: {
    navLabel: "Documentation",
    drawerTitle: "On this site",
    metaLabel: "Page meta",
    editOnGithub: "Edit this page on GitHub →",
    underTheHood: "Under the hood",
  },

  blog: {
    title: "Blog",
    description:
      "New features in Social Home, told from the household's side — what changes in your day, with screenshots.",
    eyebrow: "Blog",
    h1Html: "What's new <em>at home</em>.",
    ledeHtml:
      'New features, told from your household\'s side: what changes in your day, with screenshots. Every release is listed on <a href="https://github.com/social-home-io/socialhome/releases">GitHub Releases</a>.',
    readPost: "Read the post →",
    allPosts: "← All posts",
    editOnGithub: "Edit this post on GitHub →",
  },

  landing: {
    hero: {
      eyebrow: "Open · federated · MPL 2.0",
      sub: "Calendar, shopping list, photos, chat, highlights, moments, apps — running in your own home. A household OS that's also a social network you actually own.",
      primaryCta: "Add to Home Assistant",
      secondaryCta: "What can it do?",
      installHref,
      secondaryHref: "/docs/protocol/",
    },
    heroHeadlineHtml: "The <em>social</em> home<br />for your <em>household</em>.",
    heroCaption: "Free & open source · MPL 2.0 · runs on your own Home Assistant",
    heroLeadIn: "A glance at one household's day",
    valueProps: [
      {
        claim: "Your server, your rules.",
        detail: "Everything lives in your home. No third-party cloud touches your day.",
      },
      {
        claim: "Always encrypted.",
        detail:
          "Every message is sealed before it leaves your server — no toggle, no exceptions. Not even the relay can read it.",
      },
      {
        claim: "Federation, not silos.",
        detail: "Connect households one QR scan at a time. Pair, then talk directly.",
      },
      {
        claim: "Open source. No ads.",
        detail: "MPL 2.0. No analytics, no growth team trying to monetise your evening.",
      },
    ],
    household: {
      heading: "A household OS that quietly runs the day.",
      lede: "Calendars, lists, tasks, notes, pages, presence, voice — every shared logistics surface a household actually needs, with none of the cloud-signup tax.",
      cards: [
        {
          tag: "Shared calendar",
          title: "Every calendar in one overlay.",
          body: "Personal, partner, household — colour-coded in one view. Add events by voice or from any phone, then RSVP yes/no/maybe so everyone sees who's in. Invitees from paired households RSVP across the federation.",
        },
        {
          tag: "Live shopping list",
          title: "Living lists across phones.",
          body: "“Add milk” from anyone's phone or by voice. Tick items off in real time at the supermarket.",
        },
        {
          tag: "Tasks",
          title: "Chores split, not nagged.",
          body: "Per-list assignees, deadlines, overdue badges. Drill the bookshelf this weekend; recycle the old fridge today; everyone sees who's got what.",
        },
        {
          tag: "Pages",
          title: "A wiki for the house manual.",
          body: "Markdown pages with edit-locks and wikilinks. The radiator-bleed instructions live where you'll actually find them — alongside every other house manual entry.",
        },
        {
          tag: "Stickies",
          title: "Fridge-magnet notes that follow you.",
          body: "Tap-to-edit colour notes pinned to a Space canvas. Carrots in the bottom drawer; birthday gift ideas; whatever the household needs to remember together.",
        },
        {
          tag: "Quiet presence",
          title: "Who's home, right now.",
          body: "A subtle indicator only — no GPS history, no breadcrumbs. Opt-in per person and per device.",
        },
        {
          tag: "Family safety",
          title: "Kids' accounts, with guardrails.",
          body: "Mark a child's account as protected, set their age, and name a guardian. Age-gated spaces and apps stay out of reach, their DMs stay within households you've paired, and guardians get a quiet read-only overview.",
        },
      ],
    },
    social: {
      heading: "A social network you actually own.",
      lede: "The warm parts of social media — feeds, photos, DMs, calls, group rooms — without giving the platform anything to sell.",
      cards: [
        {
          tag: "Household feed",
          title: "Photos, voice notes, updates.",
          body: "Drop a photo of dinner. Post a voice note when your hands are full. Reactions land instantly across every household device.",
        },
        {
          tag: "DMs across households",
          title: "Message family worldwide.",
          body: "Encrypted home to home. No phone numbers, no third-party messenger, no account on a service that isn't yours.",
        },
        {
          tag: "Voice & video calls",
          title: "Call without a third party listening.",
          body: "1:1 or group calls right from your DMs and group chats. WebRTC between participants, DTLS-SRTP encrypted; the server only helps the call start, and if a relay is needed it only ever sees encrypted media.",
        },
        {
          tag: "Spaces for any group",
          title: "Rooms that span households.",
          body: "Family, neighbours, book club, sports team — each in its own private space. Pair households once, then it just works.",
        },
        {
          tag: "Highlights",
          title: "A glimpse, then it's gone.",
          body: "Drop a photo or short clip with a caption — paired peers see it in their inbox, react with an emoji, and it expires on its own. No archive growing in a stranger's data centre.",
        },
        {
          tag: "Momentum",
          title: "One-shot posts that travel.",
          body: "Up to a thousand characters and a 15-second clip. Each moment fans out three hops across the federation — your peers and theirs — and disappears after a day, or a week for people you follow.",
        },
        {
          tag: "Marketplace",
          title: "Buy, sell, and give within your circle.",
          body: "List things in a space — fixed price, best offer, or a timed auction. Only the households in that space see it. No strangers, no platform fees, no listings sold to advertisers.",
        },
      ],
    },
    householdPill: "Run your household",
    socialPill: "Stay social — privately",
    federated: {
      eyebrow: "Federation, not silos",
      heading: "Spaces span households — yours and the ones you connect to.",
      p1Html:
        "Pair two homes once with a QR code. After that, you can create <em>spaces</em> — shared rooms with their own feed, chat, and calendar — across both. Run a book club, organise a street party, or keep one quiet room for grandparents.",
      p2Html:
        'A small, open-source <a href="/docs/global-spaces/">relay</a> — the GFS — helps households that haven\'t paired find each other in global spaces and carries their sealed posts. It can\'t read them: every post is sealed before it leaves your home. We run one live at <a href="/servers/">gfs.social-home.io</a> — connect in a tap.',
    },
  },

  apps: {
    eyebrow: "New · Social Home Apps",
    heading: "Apps that play across households.",
    ledeHtml:
      "Install a small app once — a chess board, a shared whiteboard, a quiz — and it talks to the <em>same app</em> running in a household you've paired with. Make a move here; it lands there. Every byte sealed between your two homes, straight from one home to the other.",
    points: [
      {
        k: "App-to-app federation",
        v: "The same app in a paired home swaps moves and ops directly — no shared cloud, no lobby server.",
      },
      {
        k: "Encryption-first",
        v: "Every move is sealed and signed before it leaves your home. Only the address label rides in the clear.",
        chips: ["AES-256-GCM", "Ed25519"],
      },
      {
        k: "Sandboxed",
        v: "Each app runs in its own locked-down frame with no network access. The admin installs once — bundles are pinned by checksum — and sets an age gate.",
        chips: ["sha256-pinned", "connect-src 'none'", "1 MiB cap"],
      },
      {
        k: "Peer-to-peer",
        v: "Sessions run straight between confirmed households. The relay stays out of it entirely.",
      },
    ],
    technicalTerms: "Technical terms",
    showcaseLabel: "The Apps screen",
    tabInstalled: "Installed",
    tabCatalog: "Catalog",
    syncLine: "⇄ paired with maple-st",
    cards: [
      {
        glyph: "♞",
        name: "Chess",
        blurb: "Play the grandparents' house, one move at a time.",
        state: "open",
      },
      {
        glyph: "✎",
        name: "Whiteboard",
        blurb: "Sketch a seating plan together, live.",
        state: "open",
      },
      { glyph: "◑", name: "Trivia night", blurb: "Two households, one quiz.", state: "install" },
    ],
    open: "Open",
    install: "Install",
    liveHtml: "Chess · session open with <strong>maple-st</strong> · encrypted",
  },

  trust: {
    eyebrow: "Private by construction",
    heading: "Sealed from your home to theirs. Fail-closed. Tested before every release.",
    lede: "The shopping list and the book-club chat are sealed the same way: before anything leaves your home, it's locked so that only the households it's meant for can open it. The household OS and the social network share one rule, and the rule has no off switch.",
    guarantees: [
      {
        claim: "It won't send unencrypted, ever.",
        detail:
          "If a space can't be sealed, the message stays home. There is no plain-text fallback to fall back to.",
        chips: ["AES-256-GCM", "Ed25519", "fail-closed"],
      },
      {
        claim: "Leave a space, lose the key.",
        detail:
          "Every time membership changes, the space gets a fresh key. Old members can't read new posts.",
        chips: ["per-epoch key", "rotated on every change"],
      },
      {
        claim: "The relay carries parcels, not letters.",
        detail:
          "It sees which space a sealed envelope belongs to and when — never what's inside. Strict mode hides even who sent it.",
        chips: ["padded 1/4/16/64/128 KiB", "±300 s", "24 h replay cache"],
      },
      {
        claim: "Tested before every release.",
        detail: "68 protocol test files check these rules; one failure blocks the release.",
        chips: ["tests/protocol", "release-blocking"],
      },
      {
        claim: "Nothing to sell.",
        detail: "No accounts, no analytics, no ads. The code is open for anyone to read.",
        chips: ["MPL 2.0", "no third-party JS"],
      },
      {
        claim: "Honest about the rest.",
        detail:
          "Whatever this page can't promise is written down next to the rules, with a date and a sign-off.",
        chips: ["principles.md", "signed-off residuals"],
      },
    ],
    technicalTerms: "Technical terms",
    readSecurityModel: "Read the security model",
    principlesLink: "principles.md on GitHub →",
  },

  installBanner: {
    headline: "Install in two clicks.",
    body: "Add the Social Home add-on repository to your Home Assistant. The add-on auto-provisions you as admin, mints a token, and registers the matching integration via Supervisor discovery — there's nothing to type.",
    primaryCta: "Add to Home Assistant",
    readGuide: "Read the install guide",
    shellLabel: "What you'll see in Home Assistant",
    terminalTitle: "Home Assistant · Add-on store",
  },

  familyWall: {
    figureLabel: "A glance at one household's day on Social Home",
    cal: {
      kicker: "Tue · Jul 29",
      title: "Sunday brunch @ Maria’s",
      attendees: ["Maria", "Pascal", "Mom"],
      more: "+3",
      meta: "Household calendar",
      pill: "3 households",
    },
    shop: {
      kicker: "Shopping list — kitchen",
      title: "5 things, last add 4 min ago",
      done: ["Sourdough", "Olive oil"],
      open: [
        { item: "Tomatoes", by: "+ Maria" },
        { item: "Basil", by: "+ Pascal" },
        { item: "Goat cheese", by: "+ voice" },
      ],
    },
    tasks: {
      kicker: "Tasks · move-in chores",
      title: "3 to do · 6 done",
      items: [
        { title: "Hang the TV", owner: "Pascal", done: true },
        { title: "Drill the bookshelf", owner: "Maria · this week", pin: "due" },
        { title: "Buy plants", owner: "Lina · weekend" },
        { title: "Take old fridge to recycling", owner: "Pascal · today", pin: "overdue" },
      ],
      pinDue: "due",
      pinOverdue: "overdue",
    },
    page: {
      kicker: "Pages · House manual",
      title: "How to bleed the radiators",
      introHtml:
        "First, switch off the heating. Wait for the system to cool — usually <em>10 to 15 minutes</em>.",
      steps: [
        "Find the bleed key in the kitchen drawer (red lid).",
        "Turn the valve a quarter turn until water hisses out.",
        "Close it tight. Move on to the next radiator.",
      ],
      meta: "Edited by Maria · 2 days ago",
      pill: "wiki",
    },
    sticky: {
      lineHtml: "🥕 Carrots in the bottom drawer<br /><span>Sunday roast — don’t buy more!</span>",
      meta: "Maria · stickies",
    },
    photo: {
      caption: "“First tomato of the year — house tax: half goes to Mom.”",
    },
    voice: {
      kicker: "Voice note · 0:17",
      title: "Pascal — anyone up for pasta?",
      transcriptHtml: "“…anyone up for <em>pasta</em> tonight? I’m near the deli.”",
    },
    call: {
      kicker: "Group call · 14:32",
      title: "Sunday call with family",
      tiles: ["Mom", "Dad", "Sis", "You"],
      meta: "Encrypted · 4 households",
      pill: "P2P · DTLS-SRTP",
    },
    presence: {
      kicker: "Quiet presence",
      title: "Right now",
      people: [
        { name: "Maria", status: "home", on: true },
        { name: "Pascal", status: "cycling home", on: true },
        { name: "Mom", status: "away", on: false },
        { name: "Lina", status: "home", on: true },
      ],
      meta: "No history kept",
      pill: "opt-in",
    },
  },

  spaceWall: {
    figureLabel: "A glance at the kinds of Spaces households share",
    tiles: [
      {
        glyph: "🏡",
        scope: "private",
        name: "Family",
        meta: "4 people · 3 households · private",
        poster: "Mom",
        quote: '"Dinner at ours Sunday — bring the dog."',
      },
      {
        glyph: "🌳",
        scope: "public",
        name: "Eichenstrasse 3–17",
        meta: "24 people · 14 households · public",
        poster: "Lina",
        quote: '"Street BBQ next Saturday — bring chairs."',
        chips: ["📅 Sat 19:00", "📍 No. 11 garden"],
      },
      {
        glyph: "🔨",
        scope: "public",
        name: "Maker Space",
        meta: "12 people · 7 households · public",
        poster: "Rita",
        quote: '"Finished the oak chair — pictures in the feed."',
      },
      {
        glyph: "📖",
        scope: "private",
        name: "Book Club",
        meta: "8 people · 5 households · private",
        poster: "Rebecca",
        quote: '"Read chapter 7 by Friday — calendar set."',
      },
      {
        glyph: "⛰️",
        scope: "public",
        name: "Bouldering crew",
        meta: "16 people · 11 households · public",
        poster: "Pascal",
        quote: '"Practice moved to 19:00 — same gym."',
      },
      {
        glyph: "🛒",
        scope: "global",
        name: "Bazaar · neighbourhood",
        meta: "~50 people · global · via your GFS",
        poster: "Maria",
        quote: '"Free oak bookshelf — pickup only, before Sun."',
        chips: ["🪑 Free", "🔁 1 trade pending"],
      },
    ],
    legendLabel: "Space scope legend",
    legend: {
      private: "Private — only the people you invite.",
      household: "Household — everyone in your home, automatically.",
      public: "Public — your paired households can find it and ask to join.",
      global: "Global — listed on your GFS for anyone to find.",
    },
  },

  servers: {
    title: "Our server",
    description:
      "The Social Home project runs one public Global Federation Server, live at gfs.social-home.io. Content-blind by design: it carries sealed posts and never reads them. Connect in one tap, or run your own.",
    eyebrow: "Global Federation Server",
    h1Html: "Connect to the relay we run <em>for you</em>.",
    ledeHtml:
      "The Social Home project runs one public Global Federation Server (GFS) — live now at <code>gfs.social-home.io</code>. It helps your global spaces and your public Moments reach households that haven't paired with you yet. Every post is sealed before it leaves your home, so the relay carries it without ever reading it.",
    hostedBy: "Hosted by Social Home",
    serverName: "Global Federation Server",
    live: "Live",
    body: "One QR scan and you're connected. Global spaces show up in Browse spaces; public Moments fan out to followers across every paired household; Highlights public links route through here too. Content-blind by design.",
    bullets: [
      "Global space directory",
      "Public Momentum directory + follow graph",
      "Highlights public-link relay",
      "Age-gate policy enforced",
      "Sealed posts queued for offline households, then gone",
      "Never reads message, photo, or call content",
    ],
    technicalTerms: "Technical terms",
    chips: ["padded 1/4/16/64/128 KiB", "24 h queue", "zero content stored"],
    connect: "Connect →",
    qrLabel: "Social Home GFS pairing QR code",
    qrCaptionHtml:
      "Scan in <strong>Social Home → Settings → Connections → Global Federation Servers</strong>",
    howToHeading: "How to connect",
    howToStepsHtml: [
      "Open <strong>Social Home</strong> at home.",
      "Go to <strong>Settings → Connections → Global Federation Servers</strong>.",
      "Tap <strong>Add GFS</strong>.",
      "Scan the QR code above — or paste the URL.",
    ],
    howToNote:
      "Most households only need one. You can pair with additional relays for resilience or private-community policy.",
    seesHeading: "What this relay can and can't see",
    seesIntro:
      'The relay only ever handles sealed envelopes. What it learns depends on the kind of space the envelope belongs to — and in every case the answer to "the content?" is never.',
    seesColSpace: "Space",
    seesColSees: "The relay sees",
    seesColNever: "Never",
    seesRows: [
      {
        space: "Global spaces",
        mode: "trusted · default",
        sees: "Which household posted, into which space, when.",
        never: "The content.",
      },
      {
        space: "Global spaces",
        mode: "strict · owner's choice",
        sees: "The same — but not who posted.",
        never: "The content, or the sender.",
      },
      {
        space: "Private space with the GFS switched on",
        mode: "off by default",
        sees: "Which households take part.",
        never: "The space's name, its posts, or its key.",
      },
    ],
    seesChips: [
      "routing metadata only",
      "identity-free host relay",
      "anonymous_publish proof",
      "strict mode · shared writer key",
    ],
    residualsHtml:
      'Like any server on the internet it also sees your IP address, the time of each request and the size bucket of each envelope. Those residuals are written down in the <a href="/docs/security/">security model</a>.',
    runOwnHeading: "Run your own",
    runOwnHtml:
      'For a private community, organisation, or household-specific relay, you can stand up your own GFS on any VPS in about 15 minutes. <a href="/docs/running-a-gfs/">Set up your own GFS →</a>',
  },

  notFound: {
    title: "404 — page not found",
    eyebrow: "Error · 404",
    heading: "🏠 This page moved to another household.",
    lede: "The page you asked for either moved or never existed.",
    goHome: "Go home",
    searchDocs: "Search the docs",
  },
};
