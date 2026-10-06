import { defineCollection, z } from "astro:content";

/**
 * One collection per locale. ``en`` is the reference; ``de``,
 * ``nl`` and ``fr`` are hand-maintained translations that mirror
 * the same file tree, frontmatter and schema (see CLAUDE.md,
 * "Translations").
 */
const docFrontmatter = z.object({
  title: z.string(),
  description: z.string().optional(),
  /** Sidebar order; lower values appear first. */
  order: z.number().default(50),
  /** Hide the page from sidebar / build. */
  draft: z.boolean().default(false),
  /** Blog posts only (``blog/*``): publish date shown in the byline. */
  date: z.coerce.date().optional(),
  /** Blog posts only: byline. */
  author: z.string().optional(),
  /** Blog posts only: cover image, absolute path under ``public/``. */
  image: z.string().optional(),
  /** Blog posts only: alt text for ``image``. */
  imageAlt: z.string().optional(),
});

const en = defineCollection({ type: "content", schema: docFrontmatter });
const de = defineCollection({ type: "content", schema: docFrontmatter });
const nl = defineCollection({ type: "content", schema: docFrontmatter });
const fr = defineCollection({ type: "content", schema: docFrontmatter });

export const collections = { en, de, nl, fr };
