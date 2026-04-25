import { defineCollection, z } from "astro:content";

/**
 * One collection per locale. ``en`` is the source of truth; the
 * other locales are populated by the Azure Translator CI and
 * mirror the same schema.
 */
const docFrontmatter = z.object({
  title: z.string(),
  description: z.string().optional(),
  /** Sidebar order; lower values appear first. */
  order: z.number().default(50),
  /** Hide the page from sidebar / build. */
  draft: z.boolean().default(false),
});

const en = defineCollection({ type: "content", schema: docFrontmatter });
const de = defineCollection({ type: "content", schema: docFrontmatter });
const nl = defineCollection({ type: "content", schema: docFrontmatter });
const fr = defineCollection({ type: "content", schema: docFrontmatter });

export const collections = { en, de, nl, fr };
