/**
 * Shared types for static page composition.
 *
 * Page copy is split into typed objects so the same component
 * tree can be re-rendered for every locale once the CI
 * translator catches up.
 */

export interface HeroCopy {
  /** Tiny line above the headline. Keep ≤ 8 words. */
  eyebrow: string;
  /** Sub-headline beneath the display headline. ≤ 30 words. */
  sub: string;
  /** "Add to Home Assistant" — primary CTA label. */
  primaryCta: string;
  /** Secondary CTA label. */
  secondaryCta: string;
  /** HACS install URL. */
  installHref: string;
  /** Where the secondary CTA goes. */
  secondaryHref: string;
}

export interface FeatureCard {
  /** Short imperative title. */
  title: string;
  /** One-sentence body. */
  body: string;
  /** Mono-cap label, e.g. "shopping list". */
  tag: string;
}

export interface FeatureColumn {
  heading: string;
  /** A single line of micro-copy under the column heading. */
  lede: string;
  cards: FeatureCard[];
}

export interface ValueProp {
  /** Short statement, ≤ 5 words. */
  claim: string;
  /** Brief amplifier, ≤ 12 words. */
  detail: string;
}
