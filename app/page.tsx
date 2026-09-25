import type { Metadata } from "next";
import Image from "next/image";
import Hero from "@/components/hero";
import Figure from "@/components/figure";
import FloatingMotif from "@/components/floating-motif";
import Marquee from "@/components/marquee";
import LogoBand from "@/components/logo-band";
import ColorSection from "@/components/color-section";
import StatBlock from "@/components/stat-block";
import PathwayCard from "@/components/pathway-card";
import CTAButton from "@/components/cta-button";
import {
  FESTIVAL,
  FINAL_CTA,
  GLOBAL_ECOSYSTEM,
  PATHWAYS,
  STATS,
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

/** Same accents again, as top-border colours for the Why Arts/Health/Community
 * cards. Same literal-map reasoning as ACCENT_BG above. */
const ACCENT_BORDER: Record<string, string> = {
  pink: "border-pink",
  teal: "border-teal",
  purple: "border-purple",
  yellow: "border-yellow",
  lime: "border-lime",
  maroon: "border-maroon",
};

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
      {/*
        Scaled down throughout — at the previous sizing (py-section-y padding,
        h-60/sm:h-72 logos, gap-8 between stacked rows) this section ran to
        ~1550px tall on a 375×667 phone against a 667px budget, and still
        ~1070px on a 900px-tall desktop window. The min-h-screen + flex
        centering below matches the same one-viewport approach hero.tsx uses.
        Logos step up by breakpoint rather than jumping straight to their
        largest size, since that's what was blowing the mobile budget out;
        they still reach the full 3x-larger size the client asked for, just
        only once the viewport actually has room for it (xl, 1280px+).
      */}
      <ColorSection
        tone="cream"
        className="pb-2 pt-8 md:pb-2 md:pt-12"
      >
        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="max-w-[24ch] font-display text-h2 font-bold text-navy">
              {GLOBAL_ECOSYSTEM.heading}
            </h2>
            <div className="mt-5 h-1.5 w-16 bg-teal" />

            <p className="mt-6 font-eyebrow text-eyebrow text-maroon">
              In Association with
            </p>
            {/* Both source files carry generous transparent padding around
                the mark itself, so a fixed height + object-contain keeps them
                from distorting rather than matching visual weight. */}
            <div className="mt-2 flex flex-wrap items-center gap-6 md:gap-10">
              <Image
                src="/images/GAIMFlogo.png"
                alt="Global Arts in Medicine Fellowship (GAIMF)"
                width={864}
                height={1080}
                className="h-14 w-auto sm:h-20 lg:h-32 xl:h-50"
              />
              <Image
                src="/images/GSAHlogo.png"
                alt="Global South Arts & Health (GSAH)"
                width={864}
                height={1080}
                className="h-14 w-auto sm:h-20 lg:h-32 xl:h-50"
              />
            </div>
          </div>

          <p className="max-w-[65ch] text-justify text-[clamp(0.9375rem,2.2vw,1.1875rem)] leading-[1.5]">
            {GLOBAL_ECOSYSTEM.body}
          </p>
        </div>
      </ColorSection>

      <LogoBand />

      {/* Festival at a Glance — 5 stats on teal. Moved up to sit right after
          the ecosystem section, with the mural band as its separator, rather
          than lower against Why Delhi (§8's original placement). */}
      <ColorSection tone="teal">
        <h2 className="font-display text-h2 font-bold text-white">Festival at a Glance</h2>
        <div className="mt-5 h-1.5 w-16 bg-white" />
        <div className="mt-12 grid gap-10 text-white sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
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

      {/* What is Arts & Health — editorial two-column. The heading now spans
          the full width on its own row, above the grid, rather than being
          boxed into the left column — that decoupled it from the image's
          height and let the two columns start and end at different points.
          The image and text columns below are equal 6/6 splits (not the
          previous 6/5-offset-8, which made the columns different widths) and
          `items-stretch` matches their heights — the image now fills to the
          same height as the paragraph stack via object-cover instead of
          stopping short/running long against it. A teal rule still anchors
          the heading instead of an eyebrow label (§2 rules those out). */}
      <ColorSection tone="cream-2">
        <h2 className="font-display text-h2 font-bold text-navy">
          {WHAT_IS_ARTS_HEALTH.heading}
        </h2>
        <div className="mt-5 h-1.5 w-16 bg-teal" />

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-stretch lg:gap-14">
          <div className="flex flex-col justify-center space-y-6 lg:col-span-6">
            {WHAT_IS_ARTS_HEALTH.paragraphs.map((p, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "max-w-[52ch] text-body"
                    : "max-w-[52ch] text-lead font-medium text-navy"
                }
              >
                {p}
              </p>
            ))}
          </div>
          <div className="lg:col-span-6 lg:min-h-88">
            <Figure
              image={WHAT_IS_ARTS_HEALTH_IMAGE}
              ratio="landscape"
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="h-full lg:aspect-auto"
            />
          </div>
        </div>
      </ColorSection>

      {/* Why Arts, Health & Community — three cards, each with its own accent
          top rule. Bordered + rounded-card rather than a drop shadow — the
          card treatment the user asked for, without the generic
          soft-shadow-on-every-card look §2 rules out. */}
      <ColorSection tone="cream">
        <h2 className="font-display text-h2 font-bold text-navy">
          Why Arts, Health &amp; Community?
        </h2>
        <div className="mt-5 h-1.5 w-16 bg-teal" />
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {WHY_ARTS_HEALTH_COMMUNITY.map((c) => (
            <div
              key={c.term}
              className={`rounded-card border-t-4 bg-cream-2 p-8 ${ACCENT_BORDER[c.accent]}`}
            >
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
          <p className="mx-auto mt-6 max-w-[65ch] text-justify text-lead">
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
        </figure>

        {/*
          A properly aligned 2-up grid, not the previous editorial zigzag
          (each pillar staggered to its own column-start) — on client
          direction, that read as misaligned rather than intentional. Body
          copy is text-body here, not text-lead, so the section reads more
          compactly and needs less scrolling to get through all four.
        */}
        <div className="mt-16 grid gap-x-12 gap-y-10 md:mt-20 md:grid-cols-2 md:gap-y-12">
          {WHY_DELHI.pillars.map((p) => (
            <div
              key={p.term}
              className="group border-t border-cream/20 pt-8 transition-colors hover:border-cream/50"
            >
              <h3
                className={`flex items-center gap-3 font-display text-h3 font-semibold ${ACCENT[p.accent]}`}
              >
                <span
                  aria-hidden="true"
                  className={`h-3 w-3 shrink-0 rounded-chip transition-transform duration-300 group-hover:scale-125 ${ACCENT_BG[p.accent]}`}
                />
                {p.term}
              </h3>
              <p className="mt-3 max-w-[52ch] text-body">{p.body}</p>
            </div>
          ))}
        </div>
      </ColorSection>

      {/* Experience Pathways — 5 colour blocks stacked, one per pathway */}
      {/* <section aria-labelledby="pathways">
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
      </section> */}

      {/* Final CTA — white background, black text, per client direction
          (was navy/white before that, pink before that). Using tone="cream"
          for the white fill (cream is literally white now, see globals.css)
          rather than adding a new tone just for this one section, with
          text-black set explicitly since the tone's own default (text-ink,
          #1A1A1A) is a near-black, not the literal black asked for here. */}
      <ColorSection tone="cream" className="text-black">
        {/*
          Back inside the same lg:col-span-7 column as the body/button, so
          the heading's left edge lines up with them and the block as a
          whole aligns against the image beside it, rather than floating
          full-width and disconnected above the row (the previous attempt at
          a one-line fit). Still doubled up from the original half-size, so
          it wraps at "Health" — "Festival" drops to its own line, which is
          fine here; a clean shared alignment with the image matters more
          than forcing one line, per client direction.
        */}
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-[1.05]">
              {FINAL_CTA.heading}
            </h2>
            <div className="mt-5 h-1.5 w-16 bg-teal" />
            <p className="mt-8 max-w-[52ch] text-lead">{FINAL_CTA.body}</p>
            <div className="mt-8">
              {/* primary, not invert — this section is white now, not navy,
                  so the navy-fill primary button is what reads clearly here. */}
              <CTAButton href="/get-involved">Get Involved</CTAButton>
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
