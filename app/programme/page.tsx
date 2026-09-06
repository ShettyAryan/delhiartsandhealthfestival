import type { Metadata } from "next";
import ColorSection from "@/components/color-section";
import DayName from "@/components/day-name";
import Figure from "@/components/figure";
import CTAButton from "@/components/cta-button";
import {
  DAYS,
  FESTIVAL_EXPLORES,
  FORMS,
  PROGRAMME,
  PROGRAMME_HERO_IMAGE,
  TIMELINE,
  WAYS_TO_EXPERIENCE,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Programme",
  description:
    "Five days. Many ways in. One conversation. Pehchaan, Bayaan, Armaan, Karwaan, Muskaan — the shape of the festival week.",
};

/** Full-viewport colour per day, per CLAUDE.md §8. */
const DAY_TONE: Record<string, string> = {
  navy: "bg-navy text-cream",
  pink: "bg-pink text-black",
  purple: "bg-purple text-cream",
  teal: "bg-teal text-black",
  yellow: "bg-yellow text-black",
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
          className="pointer-events-none absolute -right-[6%] -top-[14%] aspect-square w-[24%] rounded-chip bg-teal"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-[7%] bottom-[10%] aspect-square w-[20%] rounded-chip bg-purple"
        />

        <div className="relative z-10 mx-auto grid w-full max-w-360 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h1 className="max-w-[16ch] font-display text-h1 font-bold text-navy">
              {PROGRAMME.heading}
            </h1>
            <p className="mt-8 max-w-[62ch] text-lead">{PROGRAMME.intro}</p>
          </div>

          <Figure
            image={PROGRAMME_HERO_IMAGE}
            ratio="portrait"
            sizes="(min-width: 1024px) 38vw, 100vw"
            priority
            className="rounded-photo lg:col-span-5"
          />
        </div>
      </section>

      {/*
        "The shape of the week" — centred as its own poster moment (the same
        treatment as Global Ecosystem and Why Delhi on the homepage), sized
        up to text-h1 rather than the section-heading text-h2 every other
        heading on this page uses. It's meant to read as a second beat, not
        another routine section header.
      */}
      <ColorSection tone="cream-2">
        <div className="text-center">
          <h2 className="mx-auto max-w-[20ch] font-display text-h1 font-bold text-navy">
            {PROGRAMME.shapeHeading}
          </h2>
          <p className="mx-auto mt-6 max-w-[62ch] text-lead">
            {PROGRAMME.shapeIntro}
          </p>
        </div>
      </ColorSection>

      {/*
        The five-day journey — each day a full-viewport colour block, now paired
        with an image. The picture alternates side down the week so the five read
        as a journey rather than one template repeated, and the day name stays
        left-anchored throughout so the stamp-in always lands in the same place.
      */}
      {DAYS.map((d, i) => (
        <section
          key={d.name}
          className={`flex min-h-[80vh] flex-col justify-center px-section-x py-section-y ${DAY_TONE[d.bg]}`}
          aria-label={`${d.n}: ${d.name}`}
        >
          <div className="mx-auto grid w-full max-w-360 items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div
              className={
                i % 2 === 1
                  ? "lg:col-span-6 lg:col-start-7 lg:row-start-1"
                  : "lg:col-span-6"
              }
            >
              {/* No opacity here: dimming the label to 80% drops it to 4.4:1 on
                  pink and 4.2:1 on purple, just under AA at this size. */}
              <p className="font-mono text-mono tracking-[0.08em]">{d.n}</p>
              <DayName
                name={d.name}
                className="mt-4 font-display text-display font-bold leading-none"
              />
              <p className="mt-4 font-mono text-lead">({d.english})</p>
              <p className="mt-8 max-w-[42ch] text-lead">{d.body}</p>
            </div>

            <Figure
              image={d.image}
              ratio="landscape"
              sizes="(min-width: 1024px) 40vw, 100vw"
              className={
                i % 2 === 1
                  ? "lg:col-span-5 lg:col-start-1 lg:row-start-1"
                  : "lg:col-span-5 lg:col-start-8"
              }
            />
          </div>
        </section>
      ))}

      {/* Ways to experience — horizontal band */}
      <ColorSection tone="cream">
        <h2 className="font-display text-h2 font-bold text-navy">
          Ways to experience the festival
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3 lg:grid-cols-5">
          {WAYS_TO_EXPERIENCE.map((w) => (
            <div key={w.term} className="border-t-4 border-pink pt-5">
              <h3 className="font-display text-h3 font-semibold text-navy">
                {w.term}
              </h3>
              <p className="mt-3 text-body">{w.body}</p>
            </div>
          ))}
        </div>
      </ColorSection>

      {/* What the festival explores — compact chip grid + descriptions */}
      <ColorSection tone="cream-2">
        <h2 className="font-display text-h2 font-bold text-navy">
          {FESTIVAL_EXPLORES.heading}
        </h2>
        <p className="mt-6 max-w-[62ch] text-lead">{FESTIVAL_EXPLORES.intro}</p>

        {/*
          No chip row here: it would repeat the eleven terms immediately above
          the list that already carries them with the client's descriptions. The
          chip treatment lives on the homepage, where the terms stand alone.
        */}
        <dl className="mt-14 grid gap-x-8 gap-y-6 md:grid-cols-2">
          {FESTIVAL_EXPLORES.items.map((t) => (
            <div key={t.term} className="border-t border-navy/20 pt-4">
              <dt className="font-display text-h3 font-semibold text-navy">
                {t.term}
              </dt>
              <dd className="mt-2 max-w-[50ch] text-body">{t.body}</dd>
            </div>
          ))}
        </dl>
      </ColorSection>

      {/* How the programme unfolds — horizontal timeline */}
      <ColorSection tone="navy">
        <h2 className="font-display text-h2 font-bold">
          How the programme unfolds
        </h2>
        <ol className="mt-12 grid gap-8 md:grid-cols-4">
          {TIMELINE.map((t) => (
            <li key={t.when} className="border-t-4 border-yellow pt-5">
              <p className="font-mono text-mono tracking-[0.08em] text-yellow">
                {t.when}
              </p>
              <p className="mt-3 max-w-[26ch] text-body">{t.what}</p>
            </li>
          ))}
        </ol>

        <div className="mt-14">
          <CTAButton href={FORMS.programmes} external>
            Festival Programmes
          </CTAButton>
        </div>
      </ColorSection>
    </>
  );
}
