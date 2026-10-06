#!/usr/bin/env node
/**
 * Internal link + anchor checker for the built site (``dist/``).
 *
 * For every HTML page it verifies that
 *   - every root-relative ``href`` / ``src`` resolves to a file in
 *     ``dist/`` (``/docs/x/`` → ``dist/docs/x/index.html``),
 *   - every ``#fragment`` on an internal link exists as an ``id``
 *     in the target page (headings get their ids from the
 *     translated text, so this catches a stale anchor in a
 *     translation),
 *   - a page under ``/de/``, ``/nl/`` or ``/fr/`` links only to
 *     pages of the same locale (assets are shared and exempt),
 *   - ``<html lang>`` matches the locale prefix.
 *
 * Usage: ``node tools/check-links.mjs`` (after ``npm run build``).
 * Exits non-zero when anything is broken.
 */
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join, relative, dirname, resolve } from "node:path";

const DIST = resolve(process.argv[2] ?? "dist");
const LOCALES = ["de", "nl", "fr"];
const SHARED =
  /^\/(fonts\/|blog\/.*\.[a-z0-9]+$|favicon\.svg|og-image\.|robots\.txt|sitemap|_astro\/|CNAME)/i;

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (name.endsWith(".html")) out.push(p);
  }
  return out;
}

const pages = walk(DIST);
const idCache = new Map();
function idsOf(file) {
  if (!idCache.has(file)) {
    const html = readFileSync(file, "utf8");
    const ids = new Set();
    for (const m of html.matchAll(/\sid="([^"]+)"/g)) ids.add(m[1]);
    for (const m of html.matchAll(/<a\s[^>]*name="([^"]+)"/g)) ids.add(m[1]);
    idCache.set(file, ids);
  }
  return idCache.get(file);
}

function targetFile(path) {
  const clean = path.replace(/\/+$/, "");
  const asDir = join(DIST, clean, "index.html");
  if (existsSync(asDir)) return asDir;
  const asFile = join(DIST, clean);
  if (clean && existsSync(asFile) && statSync(asFile).isFile()) return asFile;
  return null;
}

const errors = [];
let checked = 0;
for (const page of pages) {
  const rel = "/" + relative(DIST, page).replace(/\\/g, "/");
  const html = readFileSync(page, "utf8");
  const locale = LOCALES.find((l) => rel.startsWith(`/${l}/`)) ?? "en";

  const lang = html.match(/<html[^>]*\slang="([^"]+)"/)?.[1];
  if (lang !== locale) errors.push(`${rel}: <html lang="${lang}"> but locale is ${locale}`);

  for (const m of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    const raw = m[1];
    if (!raw.startsWith("/") || raw.startsWith("//")) continue;
    checked++;
    const [path, hash] = raw.split("#");
    if (!SHARED.test(path) && path !== "" && locale !== "en") {
      if (!path.startsWith(`/${locale}/`) && path !== `/${locale}`) {
        // A localized page may legitimately link to another locale
        // only via the switcher / hreflang, which live in <head>.
        if (!/rel="alternate"/.test(html.slice(Math.max(0, m.index - 80), m.index))) {
          errors.push(`${rel}: link to other locale ${raw}`);
        }
      }
    }
    const file = path === "" ? page : targetFile(path);
    if (!file) {
      errors.push(`${rel}: missing target ${raw}`);
      continue;
    }
    if (hash && hash !== "" && !idsOf(file).has(decodeURIComponent(hash))) {
      errors.push(`${rel}: missing anchor #${hash} in ${path || rel}`);
    }
  }
}

if (errors.length) {
  console.error(`check-links: ${errors.length} problem(s) in ${pages.length} pages:`);
  for (const e of errors) console.error("  " + e);
  process.exit(1);
}
console.log(`check-links: ${pages.length} pages, ${checked} internal links, all good.`);
