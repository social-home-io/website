// Regenerate public/og-image.png from public/og-image.svg.
//
// Social platforms (X, Facebook, LinkedIn, Slack, Discord, iMessage) do NOT
// render SVG link previews, so the SVG is the design source and this script
// rasterises it to the PNG that og:image actually points at.
//
// The SVG sets the brand type stack (Fraunces / Manrope / JetBrains Mono).
// Those fonts aren't installed system-wide, so we ship them alongside this
// script and hand fontconfig a one-line config pointing at them — otherwise
// every glyph rasterises as tofu. This is why OG generation is a manual
// `npm run og:image` step, not part of `astro build` (CI has no fonts).
//
// Usage: npm run og:image
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { writeFileSync, readFileSync } from "node:fs";

const here = dirname(fileURLToPath(import.meta.url));
const fontsDir = join(here, "fonts");
const repoRoot = join(here, "..", "..");

// Point fontconfig at our bundled fonts BEFORE sharp/libvips loads.
const confPath = join(here, "fonts.conf");
writeFileSync(
  confPath,
  `<?xml version="1.0"?>\n<fontconfig>\n  <dir>${fontsDir}</dir>\n  <cachedir>${join(fontsDir, ".cache")}</cachedir>\n</fontconfig>\n`,
);
process.env.FONTCONFIG_FILE = confPath;

const { default: sharp } = await import("sharp");

const svg = readFileSync(join(repoRoot, "public", "og-image.svg"));
const out = join(repoRoot, "public", "og-image.png");
const info = await sharp(svg, { density: 220 })
  .resize(1200, 630, { fit: "fill" })
  .png({ compressionLevel: 9 })
  .toFile(out);

console.log(`og-image.png ${info.width}x${info.height} ${Math.round(info.size / 1024)}KB`);
