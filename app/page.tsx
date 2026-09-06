import type { Metadata } from "next";
import Hero from "@/components/hero";
import Figure from "@/components/figure";
import Motif from "@/components/motif";
import FloatingMotif from "@/components/floating-motif";
import Marquee from "@/components/marquee";
import MuralBand from "@/components/mural-band";
import ColorSection from "@/components/color-section";
import StatBlock from "@/components/stat-block";
import PathwayCard from "@/components/pathway-card";
import ThemeChip from "@/components/theme-chip";
import CTAButton from "@/components/cta-button";
import {
  FESTIVAL,
  FINAL_CTA,
  GLOBAL_ECOSYSTEM,
  PATHWAYS,
  STATS,
  THEMATIC_AREAS,
  WHAT_IS_ARTS_HEALTH,
  WHY_ARTS_HEALTH_COMMUNITY,
  WHY_DELHI,
  WHAT_IS_ARTS_HEALTH_IMAGE,
  WHY_DELHI_IMAGE,
  FINAL_CTA_IMAGE,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Delhi Arts & Health Festival",
  description: FESTIVAL.subheading,
  openGraph: {
    title: "Delhi Arts & Health Festival",
    description: FESTIVAL.subheading,
    type: "website",
  },
};

/** Accent colour per pillar/column. Never a default Tailwind colour (§5.1). */
const ACCENT: Record<string, string> = {
  pink: "text-pink",
  teal: "text-teal",
  purple: "text-purple",
  yellow: "text-yellow",
  lime: "text-lime",
  maroon: "text-maroon",
};

/** Same accents as solid fills, for the Why Delhi pillar dots. Kept as its own
 * literal map rather than a `bg-${accent}` template — Tailwind's scanner needs
 * the full class string somewhere in source, not assembled at runtime. */
const ACCENT_BG: Record<string, string> = {
  pink: "bg-pink",
  teal: "bg-teal",
  purple: "bg-purple",
  yellow: "bg-yellow",
  lime: "bg-lime",
  maroon: "bg-maroon",
};

/**
 * The Why Delhi stagger. Each pillar steps further right (1 → 2 → 1 → 3) so the
 * four read as an editorial spread rather than a 4-up card grid (§8). Written
 * as literal class strings so Tailwind's scanner sees them.
 */
const PILLAR_POS = [
  { head: "lg:col-span-5 lg:col-start-1", body: "lg:col-span-6 lg:col-start-7" },
  { head: "lg:col-span-5 lg:col-start-2", body: "lg:col-span-5 lg:col-start-8" },
  { head: "lg:col-span-6 lg:col-start-1", body: "lg:col-span-5 lg:col-start-7" },
  { head: "lg:col-span-5 lg:col-start-3", body: "lg:col-span-4 lg:col-start-9" },
];

export default function Home() {
  return (
    <>
      <Hero />

      <Marquee />

      {/* Global ecosystem. The intro paragraph moved into the hero (§0.10), so
          this section carries the GSAH/GAIMF context on its own — centred as
          a poster moment, with all four brand motifs bookending the text (a
          one-off use, not the "every section" repetition §3.3 warns against).
          Each side is one grid child holding two motifs, so mobile still gets
          only two extra stacked rows (a short side-by-side pair above and
          below the text) instead of four. */}
      <ColorSection tone="cream">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-8">
          <div className="mx-auto flex gap-4 lg:col-span-2 lg:flex-col">
            <Motif
              variant="daisy"
              fit="meet"
              className="h-14 w-14 rounded-card lg:h-24 lg:w-24"
            />
            <Motif
              variant="stairs"
              fit="meet"
              className="h-14 w-14 rounded-card lg:h-24 lg:w-24"
            />
          </div>
          <div className="text-center lg:col-span-8">
            <h2 className="mx-auto max-w-[24ch] font-display text-h2 font-bold text-navy">
              {GLOBAL_ECOSYSTEM.heading}
            </h2>
            <p className="mx-auto mt-6 max-w-[65ch] text-lead">
              {GLOBAL_ECOSYSTEM.body}
            </p>
          </div>
          <div className="mx-auto flex gap-4 lg:col-span-2 lg:flex-col">
            <Motif
              variant="star"
              fit="meet"
              className="h-14 w-14 rounded-card lg:h-24 lg:w-24"
            />
            <Motif
              variant="kalash"
              fit="meet"
              className="h-14 w-14 rounded-card lg:h-24 lg:w-24"
            />
          </div>
        </div>
      </ColorSection>

      <MuralBand />

      {/* Festival at a Glance — 5 stats on teal. Moved up to sit right after
          the ecosystem section, with the mural band as its separator, rather
          than lower against Why Delhi (§8's original placement). */}
      <ColorSection tone="teal">
        <h2 className="font-display text-h2 font-bold">Festival at a Glance</h2>
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          {STATS.map((s) => (
            <StatBlock
              key={s.label}
              value={s.value}
              suffix={s.suffix}
              label={s.label}
            />
          ))}
        </div>
      </ColorSection>

      {/* What is Arts & Health — editorial two-column, image anchoring the
          left. A teal rule gives the heading a graphic anchor instead of an
          eyebrow label (§2 rules those out), and the first paragraph reads as
          a lead statement — larger than the two that follow it — rather than
          three paragraphs of identical weight. */}
      <ColorSection tone="cream-2">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <h2 className="font-display text-h2 font-bold text-navy">
              {WHAT_IS_ARTS_HEALTH.heading}
            </h2>
            <div className="mt-5 h-1.5 w-16 bg-teal" />
            <Figure
              image={WHAT_IS_ARTS_HEALTH_IMAGE}
              ratio="landscape"
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="mt-8"
            />
          </div>
          <div className="space-y-6 lg:col-span-5 lg:col-start-8">
            {WHAT_IS_ARTS_HEALTH.paragraphs.map((p, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "max-w-[52ch] text-lead font-medium text-navy"
                    : "max-w-[52ch] text-body"
                }
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </ColorSection>

      {/* Why Arts, Health & Community — three columns, each with its own accent */}
      <ColorSection tone="cream">
        <h2 className="font-display text-h2 font-bold text-navy">
          Why Arts, Health &amp; Community?
        </h2>
        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {WHY_ARTS_HEALTH_COMMUNITY.map((c) => (
            <div key={c.term}>
              <h3
                className={`font-display text-h3 font-semibold ${ACCENT[c.accent]}`}
              >
                {c.term}
              </h3>
              <p className="mt-3 max-w-[42ch] text-body">{c.body}</p>
            </div>
          ))}
        </div>
      </ColorSection>

      {/*
        Why Delhi — four pillars in an editorial layout, explicitly NOT a 4-up
        card grid (§8). Each pillar steps further right; hairlines carry the
        rhythm instead of boxes.
      */}
      <ColorSection tone="navy" className="relative z-0 overflow-hidden">
        {/*
          Three motifs set loose rather than tiled or mirrored — off-grid
          sizes, rotations, and heights so the eye reads them as scattered,
          not as a matched pair like the Global Ecosystem section.

          Scoped to this intro block specifically, not the whole (much taller)
          section: percentages need a predictable box to measure against, and
          against the full section they landed wherever the photo happened to
          be, hidden behind it. Here they can only ever bleed into the empty
          navy margin around the heading and lead paragraph, never behind the
          image below. -z-10 plus the section's own `z-0` keeps them behind
          the content without needing an explicit z-index there too — see
          hero.tsx for why the section needs that z-0 at all.

          Star and daisy are lg-only: below that the lead paragraph's 65ch
          column fills nearly the full width, so the side margin they need
          hasn't opened up yet — tested at 700px, where a lower breakpoint
          (sm) still let the star land on top of the text. Kalash stays
          visible at every width since it sits above the heading, not beside
          the body copy, so it never depends on that margin.
        */}
        <div className="relative text-center">
          <FloatingMotif
            variant="kalash"
            className="-left-[1%] -top-[14%] h-20 w-20 lg:h-28 lg:w-28"
            baseRotate={-10}
            duration={10}
          />
          <FloatingMotif
            variant="star"
            className="-right-[1%] top-[40%] hidden lg:block lg:h-24 lg:w-24"
            baseRotate={14}
            duration={12}
            delay={0.6}
          />
          <FloatingMotif
            variant="daisy"
            className="left-[8%] -bottom-[16%] hidden lg:block lg:h-20 lg:w-20"
            baseRotate={8}
            duration={11}
            delay={1.1}
          />

          <h2 className="mx-auto max-w-[20ch] font-display text-h1 font-bold">
            {WHY_DELHI.heading}
          </h2>
          <div className="mx-auto mt-5 h-1.5 w-16 bg-lime" />
          <p className="mx-auto mt-6 max-w-[65ch] text-lead">
            {WHY_DELHI.lead}
          </p>
        </div>

        {/* Delhi itself, before the four pillars break it down. A Special
            Elite caption names the place — grounded in the alt text already
            written for this photo, not new copy. */}
        <figure className="mt-14">
          <Figure
            image={WHY_DELHI_IMAGE}
            ratio="wide"
            sizes="(min-width: 1024px) 90vw, 100vw"
          />
          <figcaption className="mt-3 font-mono text-mono tracking-[0.04em] text-cream/70">
            Lodhi Garden, Delhi
          </figcaption>
        </figure>

        <div className="mt-16 space-y-10 md:mt-20 md:space-y-14">
          {WHY_DELHI.pillars.map((p, i) => {
            const pos = PILLAR_POS[i % PILLAR_POS.length];
            return (
              <div
                key={p.term}
                className="group grid gap-3 border-t border-cream/20 pt-10 transition-colors hover:border-cream/50 lg:grid-cols-12 lg:gap-8"
              >
                <h3
                  className={`flex items-center gap-3 font-display text-h3 font-semibold ${ACCENT[p.accent]} ${pos.head}`}
                >
                  <span
                    aria-hidden="true"
                    className={`h-3 w-3 shrink-0 rounded-chip transition-transform duration-300 group-hover:scale-125 ${ACCENT_BG[p.accent]}`}
                  />
                  {p.term}
                </h3>
                {/* text-lead, not text-body — the heading and the intro
                    paragraph above are the only other type in this section,
                    so "the text" bumping up means these pillar descriptions. */}
                <p className={`max-w-[52ch] text-lead ${pos.body}`}>{p.body}</p>
              </div>
            );
          })}
        </div>
      </ColorSection>

      {/* Experience Pathways — 5 colour blocks stacked, one per pathway */}
      <section aria-labelledby="pathways">
        <div className="bg-cream px-section-x pt-section-y">
          <h2
            id="pathways"
            className="mx-auto w-full max-w-360 font-display text-h2 font-bold text-navy"
          >
            Festival Experience Pathways
          </h2>
        </div>
        <div className="mt-12">
          {PATHWAYS.map((p, i) => (
            <PathwayCard
              key={p.term}
              term={p.term}
              body={p.body}
              tone={p.bg}
              image={p.image}
              flip={i % 2 === 1}
            />
          ))}
        </div>
      </section>

      {/* Thematic Areas — chips on cream */}
      <ColorSection tone="cream">
        <h2 className="font-display text-h2 font-bold text-navy">
          Festival Thematic Areas
        </h2>
        <ul className="mt-10 flex flex-wrap gap-x-2 gap-y-3">
          {THEMATIC_AREAS.map((t) => (
            <ThemeChip key={t}>{t}</ThemeChip>
          ))}
        </ul>
      </ColorSection>

      {/* Final CTA */}
      <ColorSection tone="pink">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <h2 className="max-w-[16ch] font-display text-h1 font-bold">
              {FINAL_CTA.heading}
            </h2>
            <p className="mt-8 max-w-[52ch] text-lead">{FINAL_CTA.body}</p>
            <div className="mt-8">
              {/* `invert` on pink: a navy outline would only reach 4.4:1 here. */}
              <CTAButton href="/get-involved" variant="invert">
                Get Involved
              </CTAButton>
            </div>
          </div>

          <Figure
            image={FINAL_CTA_IMAGE}
            ratio="portrait"
            sizes="(min-width: 1024px) 32vw, 100vw"
            className="lg:col-span-4 lg:col-start-9"
          />
        </div>
      </ColorSection>
    </>
  );
}
