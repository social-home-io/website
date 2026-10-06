/**
 * Locale helpers shared by pages, layouts and components.
 *
 * English is the reference locale and lives at the site root
 * (``/docs/…``); every other locale is prefixed (``/de/docs/…``).
 * Content for a locale lives in ``src/content/<locale>/`` and UI
 * strings in ``src/i18n/<locale>.ts`` — both are hand-maintained
 * mirrors of ``en`` (see CLAUDE.md, "Translations").
 */
import { en } from "./en";
import { de } from "./de";
import { nl } from "./nl";
import { fr } from "./fr";
import type { UiStrings } from "./types";

export const LOCALES = ["en", "de", "nl", "fr"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

/** Locales that get a URL prefix (everything except ``en``). */
export const PREFIXED_LOCALES = LOCALES.filter((l) => l !== DEFAULT_LOCALE) as Exclude<
  Locale,
  "en"
>[];

export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  de: "Deutsch",
  nl: "Nederlands",
  fr: "Français",
};

const strings: Record<Locale, UiStrings> = { en, de, nl, fr };

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

/**
 * Resolve the locale of the current request. ``Astro.currentLocale``
 * is derived from the URL prefix; the un-prefixed default locale
 * comes back as ``undefined`` in some render paths, so fall back.
 */
export function getLocale(current: string | undefined): Locale {
  return isLocale(current) ? current : DEFAULT_LOCALE;
}

export function t(locale: Locale): UiStrings {
  return strings[locale];
}

/**
 * Prefix a root-relative path with the locale segment. External
 * URLs, anchors and asset paths (``/fonts/``, ``/blog/*.png`` …)
 * pass through unchanged.
 */
export function localePath(locale: Locale, path: string): string {
  if (locale === DEFAULT_LOCALE) return path;
  if (!path.startsWith("/")) return path;
  if (/^\/(fonts\/|blog\/.*\.[a-z0-9]+$|favicon|og-image|robots|sitemap|_astro\/)/i.test(path))
    return path;
  if (new RegExp(`^/(${LOCALES.join("|")})(/|$)`).test(path)) return path;
  return `/${locale}${path}`;
}

/** Strip a leading locale segment from a pathname: ``/de/docs/`` → ``/docs/``. */
export function stripLocale(pathname: string): string {
  const stripped = pathname.replace(new RegExp(`^/(${LOCALES.join("|")})(?=/|$)`), "");
  return stripped || "/";
}

/**
 * Rewrite root-relative ``href="/…"`` attributes inside a trusted
 * HTML string so hand-written links in UI strings land on the
 * current locale.
 */
export function localizeHtml(locale: Locale, html: string): string {
  if (locale === DEFAULT_LOCALE) return html;
  return html.replace(
    /href="(\/[^"]*)"/g,
    (_m, href: string) => `href="${localePath(locale, href)}"`,
  );
}

/** Format a date for the byline in the locale's own convention. */
export function formatDate(locale: Locale, d: Date): string {
  return d.toLocaleDateString(t(locale).dateLocale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
