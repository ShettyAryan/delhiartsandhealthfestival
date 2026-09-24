import type { Metadata } from "next";
import ColorSection from "@/components/color-section";
import DayName from "@/components/day-name";
import Figure from "@/components/figure";
import {
  DAYS,
  FESTIVAL_EXPLORES,
  PATHWAYS,
  PROGRAMME,
  PROGRAMME_HERO_IMAGE,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Programme",
  description:
    "Five days. Many ways in. One conversation. Pehchaan, Bayaan, Armaan, Karwaan, Muskaan — the shape of the festival week.",
};

/** Colour per day, per CLAUDE.md §8. */
const DAY_TONE: Record<string, string> = {
  navy: "bg-navy text-white",
  pink: "bg-pink text-white",
  purple: "bg-purple text-white",
  teal: "bg-teal text-white",
  yellow: "bg-yellow text-white",
};

/** Same five colours as top-border accents, for the Festival Pathways cards.
 * Literal map, not a `border-${bg}` template — Tailwind's scanner needs the
 * full class string somewhere in source. */
const PATHWAY_BORDER: Record<string, string> = {
  pink: "border-pink",
  yellow: "border-yellow",
  red: "border-red",
  lime: "border-lime",
  purple: "border-purple",
};

export default function ProgrammePage() {
  return (
    <>
      {/*
        Hero, matching the two-column treatment on Home and About: copy left,
        one photo right in the shared rounded-photo frame, a pair of flat
        brand-colour circles bleeding off the corners. Teal and purple here
        rather than About's pink and yellow — each page hero keeps the same
        structure but its own accent pairing, so the pattern reads as a
        system rather than one image literally reused.

        items-start, not items-center: the same fix as the About hero — a
        short text block centred against a much taller photo leaves a bare
        gap above it. `relative z-0 overflow-hidden` on the section is what
        lets the negative-z circles paint behind the content grid at all;
        see hero.tsx for why a bare `relative` isn't enough.
      */}
      <section className="relative z-0 overflow-hidden bg-cream px-section-x pb-section-y pt-8 md:pt-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[6%] -top-[14%] aspect-square w-[24%] rounded-chip bg-teal/70"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-[7%] bottom-[10%] aspect-square w-[20%] rounded-chip bg-purple/70"
        />

        {/*
          Heading and intro text sized to match the homepage hero exactly
          (the same hero-local clamps hero.tsx uses, not the shared --text-h1/
          --text-lead tokens every other page's own hero uses) — on request.
          The photo is resized to match: hero.tsx's own image is height-capped
          by viewport rather than left to grow with a "portrait" aspect ratio,
          so this one gets the same treatment instead of towering over the
          now-smaller text beside it.
        */}
        <div className="relative z-10 mx-auto grid w-full max-w-360 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <h1 className="font-display text-[clamp(1.35rem,3vw,2.5rem)] font-bold leading-[1.05] text-navy">
              <span className="whitespace-nowrap">Five Days. Five Themes.</span>
              <br />
              Many Conversations
            </h1>
            <p className="mt-6 max-w-[62ch] text-[clamp(1.0625rem,1.2vw,1.125rem)] leading-[1.4] text-ink">
              {PROGRAMME.intro}
            </p>
          </div>

          <Figure
            image={PROGRAMME_HERO_IMAGE}
            ratio="portrait"
            sizes="(min-width: 1024px) 46vw, 100vw"
            priority
            className="h-[30vh] w-full rounded-photo sm:h-[32vh] md:h-[38vh] lg:col-span-6 lg:h-[54vh]"
          />
        </div>
      </section>

      {/* Festival Pathways — the five colour-blocked cards PathwayCard
          renders on the homepage (currently unused there, that section is
          commented out) shown here instead as compact cards, the same
          bordered/rounded-card/accent-top-rule treatment as the homepage's
          Why Arts/Health/Community cards, rather than full-bleed blocks. */}
      <ColorSection tone="cream">
        <h2 className="font-display text-h2 font-bold text-navy">
          Festival Pathways
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-5 lg:gap-4">
          {PATHWAYS.map((p) => (
            <div
              key={p.term}
              className={`rounded-card border-t-4 bg-cream-2 p-8 lg:p-5 ${PATHWAY_BORDER[p.bg]}`}
            >
              <h3 className="font-display text-h3 font-semibold text-navy">
                {p.term}
              </h3>
              <p className="mt-3 max-w-[42ch] text-body">{p.body}</p>
            </div>
          ))}
        </div>
      </ColorSection>

      {/*
        "The shape of the week" — centred as its own poster moment (the same
        treatment as Global Ecosystem and Why Delhi on the homepage), sized
        up to text-h1 rather than the section-heading text-h2 every other
        heading on this page uses. It's meant to read as a second beat, not
        another routine section header.
      */}
      {/* py-10/md:py-14 override the default py-section-y (up to 128px each
          side) — trimmed specifically so this heading plus all five compact
          day bars below have a real shot at fitting within one viewport
          without scrolling, per the per-day sizing goal below. */}
      <ColorSection tone="cream-2" className="py-10 md:py-14">
        <div className="text-center">
          <h2 className="mx-auto max-w-[20ch] font-display text-h1 font-bold text-navy">
            {PROGRAMME.shapeHeading}
          </h2>
        </div>
      </ColorSection>

      {/*
        The five-day journey — compact colour bars now, not full-viewport
        (min-h-[80vh]) blocks with their own image each. At the old size,
        just the five min-heights totalled 400vh before any padding or
        content, meaning a visitor arriving at this section had to scroll
        through roughly four extra screens to see all five days. No images
        here anymore (that's what made the old per-day block tall enough to
        need 80vh in the first place) and the day name drops from
        text-display (up to 192px) to text-h2 — still the same DayName
        component and its letter-by-letter stamp-in animation, just smaller.
        Five compact bars stacked like this land at well under one extra
        screen combined, in practice — verified at common desktop heights.
      */}
      {DAYS.map((d) => (
        <section
          key={d.name}
          className={`px-section-x py-6 md:py-8 ${DAY_TONE[d.bg]}`}
          aria-label={`${d.n}: ${d.name}`}
        >
          <div className="mx-auto grid w-full max-w-360 items-center gap-4 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              {/* No opacity here: dimming the label to 80% drops it to 4.4:1 on
                  pink and 4.2:1 on purple, just under AA at this size. */}
              <p className="font-eyebrow text-eyebrow">{d.n}</p>
              <DayName
                name={d.name}
                className="mt-1 font-samarkan text-h2 font-normal leading-none"
              />
              <p className="mt-1 font-eyebrow text-small">({d.english})</p>
            </div>
            <p className="mt-3 max-w-[60ch] text-body lg:col-span-8 lg:mt-0">
              {d.body}
            </p>
          </div>
        </section>
      ))}

      {/* What the festival explores — three columns, smaller type, so all
          eleven areas fit on screen at once without scrolling. The term
          (subheading) drops from text-h3 to a ~17-18px clamp and the
          description from text-body to text-small; padding is trimmed the
          same way as the shape-of-the-week section above. Below `sm` it's a
          single column — three columns can't hold these on a phone. */}
      <ColorSection tone="cream-2" className="py-10 md:py-14">
        <h2 className="font-display text-h2 font-bold text-navy">
          {FESTIVAL_EXPLORES.heading}
        </h2>

        <dl className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
          {FESTIVAL_EXPLORES.items.map((t) => (
            <div key={t.term} className="border-t border-navy/20 pt-3">
              <dt className="font-display text-[clamp(1rem,1.3vw,1.125rem)] font-semibold leading-snug text-navy">
                {t.term}
              </dt>
              <dd className="mt-1 text-small leading-snug">{t.body}</dd>
            </div>
          ))}
        </dl>
      </ColorSection>

      {/* Full Programme Schedule — replaces the earlier "How the programme
          unfolds" timeline + Festival Programmes button, on request. No
          link here since there's nothing to link to yet. */}
      <ColorSection tone="navy">
        <div className="text-center">
          <h2 className="font-display text-h2 font-bold">
            Full Programme Schedule
          </h2>
          <p className="mt-6 font-display text-h1 font-bold uppercase text-yellow">
            Coming Soon!
          </p>
        </div>
      </ColorSection>
    </>
  );
}
