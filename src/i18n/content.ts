/**
 * Locale-aware access to the content collections.
 *
 * ``en`` is the reference. For any other locale, an entry missing
 * from ``src/content/<locale>/`` falls back to the English one so a
 * lagging translation never breaks the build or 404s a page — the
 * URL stays localized, the body shows up in English.
 */
import { getCollection, type CollectionEntry } from "astro:content";
import { DEFAULT_LOCALE, type Locale } from "./index";

export type Entry = CollectionEntry<Locale>;

export interface LocalizedEntry {
  entry: Entry;
  /** ``true`` when the English entry stands in for a missing translation. */
  fallback: boolean;
}

/**
 * Every published entry of ``locale`` that matches ``filter``, keyed
 * by slug, with English entries filling the gaps. Drafts are dropped
 * on both sides.
 */
export async function getLocalizedEntries(
  locale: Locale,
  filter: (entry: Entry) => boolean,
): Promise<LocalizedEntry[]> {
  const pick = (e: Entry) => e.data.draft !== true && filter(e);
  const base = (await getCollection(DEFAULT_LOCALE, pick)) as Entry[];
  if (locale === DEFAULT_LOCALE) return base.map((entry) => ({ entry, fallback: false }));

  const translated = new Map(
    ((await getCollection(locale, pick)) as Entry[]).map((e) => [e.slug, e] as const),
  );
  return base.map((en) => {
    const entry = translated.get(en.slug);
    return entry ? { entry, fallback: false } : { entry: en, fallback: true };
  });
}

export const isDoc = (e: Entry) => e.slug === "docs" || e.slug.startsWith("docs/");
export const isPost = (e: Entry) => e.slug.startsWith("blog/");
export const isPage = (e: Entry) => !isPost(e);
