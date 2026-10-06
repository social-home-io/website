/**
 * Shape of the per-locale UI strings (``src/i18n/<locale>.ts``).
 *
 * ``en.ts`` is the reference; every other locale mirrors it key for
 * key. Strings whose name ends in ``Html`` may contain inline
 * markup (``<em>``, ``<a>``, ``<strong>``, ``<br />``) and are
 * rendered with ``set:html`` — keep them to trusted, hand-written
 * copy. All other strings are plain text.
 *
 * Internal links inside ``Html`` strings are written root-relative
 * (``/docs/security/``); components pass them through
 * ``localizeHtml()`` so they get the locale prefix at render time.
 */

import type { HeroCopy, FeatureColumn, ValueProp } from "../types";

export interface NavLink {
  href: string;
  label: string;
}

export interface FooterColumn {
  heading: string;
  links: NavLink[];
}

export interface AppCard {
  glyph: string;
  name: string;
  blurb: string;
  state: "open" | "install";
}

export interface AppPoint {
  k: string;
  v: string;
  chips?: string[];
}

export interface Guarantee {
  /** Plain claim, ≤ 6 words. */
  claim: string;
  /** One or two sentences in household terms. */
  detail: string;
  /** Technical terms for the chip row — never in the sentence. */
  chips: string[];
}

export interface SpaceTile {
  glyph: string;
  /** Scope colour on the tile edge. */
  scope: "private" | "public" | "global";
  name: string;
  meta: string;
  poster: string;
  quote: string;
  chips?: string[];
}

export interface ServerSeesRow {
  space: string;
  mode: string;
  sees: string;
  never: string;
}

export interface UiStrings {
  /** BCP-47 tag used for ``toLocaleDateString``. */
  dateLocale: string;

  site: {
    name: string;
    /** <title> / description of the landing page. */
    landingDescription: string;
    /** Default <meta description> for pages that set none. */
    defaultDescription: string;
    ogImageAlt: string;
    skipToContent: string;
  };

  header: {
    homeAriaLabel: string;
    motto: string;
    links: NavLink[];
    primaryNavLabel: string;
    githubAriaLabel: string;
    languageLabel: string;
  };

  footer: {
    mottoHtml: string;
    smallHtml: string;
    navLabel: string;
    columns: FooterColumn[];
    copyright: string;
    builtWith: string;
  };

  docs: {
    navLabel: string;
    drawerTitle: string;
    metaLabel: string;
    editOnGithub: string;
    /** Summary line of the ``details.tech`` block, for reference. */
    underTheHood: string;
  };

  blog: {
    title: string;
    description: string;
    eyebrow: string;
    h1Html: string;
    ledeHtml: string;
    readPost: string;
    allPosts: string;
    editOnGithub: string;
  };

  landing: {
    hero: HeroCopy;
    heroHeadlineHtml: string;
    heroCaption: string;
    heroLeadIn: string;
    valueProps: ValueProp[];
    household: FeatureColumn;
    social: FeatureColumn;
    householdPill: string;
    socialPill: string;
    federated: {
      eyebrow: string;
      heading: string;
      p1Html: string;
      p2Html: string;
    };
  };

  apps: {
    eyebrow: string;
    heading: string;
    ledeHtml: string;
    points: AppPoint[];
    technicalTerms: string;
    showcaseLabel: string;
    tabInstalled: string;
    tabCatalog: string;
    syncLine: string;
    cards: AppCard[];
    open: string;
    install: string;
    liveHtml: string;
  };

  trust: {
    eyebrow: string;
    heading: string;
    lede: string;
    guarantees: Guarantee[];
    technicalTerms: string;
    readSecurityModel: string;
    principlesLink: string;
  };

  installBanner: {
    headline: string;
    body: string;
    primaryCta: string;
    readGuide: string;
    shellLabel: string;
    terminalTitle: string;
  };

  familyWall: {
    figureLabel: string;
    cal: {
      kicker: string;
      title: string;
      attendees: string[];
      more: string;
      meta: string;
      pill: string;
    };
    shop: { kicker: string; title: string; done: string[]; open: { item: string; by: string }[] };
    tasks: {
      kicker: string;
      title: string;
      items: { title: string; owner: string; done?: boolean; pin?: "due" | "overdue" }[];
      pinDue: string;
      pinOverdue: string;
    };
    page: {
      kicker: string;
      title: string;
      introHtml: string;
      steps: string[];
      meta: string;
      pill: string;
    };
    sticky: { lineHtml: string; meta: string };
    photo: { caption: string };
    voice: { kicker: string; title: string; transcriptHtml: string };
    call: { kicker: string; title: string; tiles: string[]; meta: string; pill: string };
    presence: {
      kicker: string;
      title: string;
      people: { name: string; status: string; on: boolean }[];
      meta: string;
      pill: string;
    };
  };

  spaceWall: {
    figureLabel: string;
    tiles: SpaceTile[];
    legendLabel: string;
    legend: { private: string; household: string; public: string; global: string };
  };

  servers: {
    title: string;
    description: string;
    eyebrow: string;
    h1Html: string;
    ledeHtml: string;
    hostedBy: string;
    serverName: string;
    live: string;
    body: string;
    bullets: string[];
    technicalTerms: string;
    chips: string[];
    connect: string;
    qrLabel: string;
    qrCaptionHtml: string;
    howToHeading: string;
    howToStepsHtml: string[];
    howToNote: string;
    seesHeading: string;
    seesIntro: string;
    seesColSpace: string;
    seesColSees: string;
    seesColNever: string;
    seesRows: ServerSeesRow[];
    seesChips: string[];
    residualsHtml: string;
    runOwnHeading: string;
    runOwnHtml: string;
  };

  notFound: {
    title: string;
    eyebrow: string;
    heading: string;
    lede: string;
    goHome: string;
    searchDocs: string;
  };
}
