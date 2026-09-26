import type { Metadata } from "next";
import ColorSection from "@/components/color-section";
import MuralBandStatic from "@/components/mural-band-static";
import Figure from "@/components/figure";
import FloatingMotif from "@/components/floating-motif";
import { ABOUT, ABOUT_HERO_IMAGE, ABOUT_IMAGE, ABOUT_VISION_IMAGE } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Our vision and mission for the Delhi Arts & Health Festival, plus the evidence behind it.",
};

export default function AboutPage() {
  return (
    <>
      {/*
        Hero, matching Home/Programme/Press/Contact's two-column treatment:
        heading and subtext left, one photo right in the shared rounded-photo
        frame, height-capped by viewport so it fits beside the shorter text
        column, brand circles bleeding off the corners — navy and lime here,
        the one pairing none of the other pages use yet.
      */}
      <section className="relative z-0 overflow-hidden bg-cream px-section-x pb-section-y pt-8 md:pt-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[6%] -top-[14%] aspect-square w-[24%] rounded-chip bg-navy/70"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-[7%] bottom-[10%] aspect-square w-[20%] rounded-chip bg-lime/70"
        />

        <div className="relative z-10 mx-auto grid w-full max-w-360 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <h1 className="font-display text-[clamp(2.25rem,4.5vw,3.5rem)] font-bold leading-[0.95] text-navy">
              About DAHF
            </h1>
            <div className="mt-5 h-1.5 w-16 bg-teal" />
            <div className="mt-6 space-y-4">
              {ABOUT.heroIntro.map((p, i) => (
                <p key={i} className="max-w-[54ch] text-[clamp(1.0625rem,1.2vw,1.125rem)] leading-[1.4] text-ink">
                  {p}
                </p>
              ))}
            </div>
          </div>

          <Figure
            image={ABOUT_HERO_IMAGE}
            ratio="portrait"
            sizes="(min-width: 1024px) 46vw, 100vw"
            priority
            className="h-[30vh] w-full rounded-photo sm:h-[32vh] md:h-[38vh] lg:col-span-6 lg:h-[54vh]"
          />
        </div>
      </section>

      <MuralBandStatic id="about-hero-mural" />

      {/* Vision and Mission, as two cards — bordered + rounded-card + an
          accent top rule (teal for Vision, navy for Mission, matching their
          old block colours), the same card treatment as the homepage's Why
          Arts/Health/Community section, rather than the generic
          soft-shadow-card look §2 rules out. */}
      <ColorSection tone="cream">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-card border-t-4 border-teal bg-cream-2 p-8">
            <h2 className="font-display text-h2 font-bold text-navy">
              {ABOUT.vision.heading}
            </h2>
            <div className="mt-5 h-1.5 w-16 bg-teal" />
            <p className="mt-6 text-lead">{ABOUT.vision.body}</p>
          </div>

          <div className="rounded-card border-t-4 border-navy bg-cream-2 p-8">
            <h2 className="font-display text-h2 font-bold text-navy">
              {ABOUT.mission.heading}
            </h2>
            <div className="mt-5 h-1.5 w-16 bg-teal" />
            <div className="mt-6 space-y-4">
              {ABOUT.mission.paragraphs.map((p, i) => (
                <p key={i} className="text-body">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </ColorSection>

      {/* Standalone image, right after Vision/Mission — freed up from the
          removed "Bringing Communities Together" section it used to sit in. */}
      <ColorSection tone="cream" className="relative z-0 overflow-hidden">
        <FloatingMotif variant="stairs" className="left-[2%] top-[4%] hidden h-20 w-20 md:block lg:h-28 lg:w-28" baseRotate={-8} duration={10} delay={0} />
        <FloatingMotif variant="star" className="right-[3%] bottom-[4%] hidden h-20 w-20 md:block lg:h-28 lg:w-28" baseRotate={14} duration={12} delay={0.6} />
        <Figure
          image={ABOUT_IMAGE}
          ratio="wide"
          sizes="(min-width: 1024px) 90vw, 100vw"
        />
      </ColorSection>

      {/* Why Now */}
      <ColorSection tone="cream" className="relative z-0 overflow-hidden">
        {/*
          Two motifs scoped to their own local wrapper rather than the whole
          (tall) section — the same fix as the homepage's Why Delhi section:
          percentages need a small, predictable box, or they land wherever
          the image or a paragraph happens to be. One sits above and right of
          "Why Now" itself, in the empty cream before the grid starts; the
          other bleeds off to the right of the pull-quotes, which are capped
          at 60ch and leave real margin on wide screens.
        */}
        <div className="relative">
          <FloatingMotif
            variant="star"
            className="-right-[2%] -top-[10%] hidden h-20 w-20 lg:block lg:h-24 lg:w-24"
            baseRotate={12}
            duration={10}
          />
          <FloatingMotif variant="daisy" className="right-[16%] top-[30%] hidden h-14 w-14 lg:block lg:h-16 lg:w-16" baseRotate={6} duration={13} delay={1} />
          <h2 className="font-display text-h2 font-bold text-navy">Why Now</h2>
          <div className="mt-5 h-1.5 w-16 bg-teal" />
        </div>

        {/* Research highlights as pull-quotes, not bullets. No images in
            this section anymore — the gallery + bento grid that used to sit
            between the heading and these pull-quotes was removed on
            request, so the section is now just the heading and the points. */}
        <div className="relative mt-12 space-y-8">
          <FloatingMotif
            variant="stairs"
            className="-right-[3%] bottom-[6%] hidden h-20 w-20 lg:block lg:h-24 lg:w-24"
            baseRotate={-8}
            duration={11}
            delay={0.5}
          />
          {ABOUT.research.map((r) => (
            <blockquote
              key={r.term}
              className="border-l-4 border-yellow pl-6 md:pl-10"
            >
              <p className="max-w-[60ch] text-lead">
                <span className="font-display font-bold text-navy">
                  {r.term}
                </span>{" "}
                {r.body}
              </p>
            </blockquote>
          ))}
        </div>
      </ColorSection>

      {/* Why Delhi — new section, About-page-only context for the city
          rather than a repeat of the homepage's own Why Delhi section
          (four infrastructure pillars). Purple, the same tone the earlier
          "India and Delhi's moment" section used before it was removed. */}
      <ColorSection tone="purple" className="relative z-0 overflow-hidden">
        <FloatingMotif variant="star" className="right-[6%] top-[12%] hidden h-24 w-24 md:block lg:h-36 lg:w-36" baseRotate={12} duration={11} delay={0} />
        <FloatingMotif variant="kalash" className="right-[24%] top-[46%] hidden h-20 w-20 lg:block lg:h-28 lg:w-28" baseRotate={-10} duration={10} delay={0.4} />
        <FloatingMotif variant="stairs" className="right-[8%] bottom-[8%] hidden h-20 w-20 md:block lg:h-24 lg:w-24" baseRotate={8} duration={12} delay={0.9} />
        <h2 className="font-display text-h2 font-bold">
          {ABOUT.whyDelhi.heading}
        </h2>
        <div className="mt-5 h-1.5 w-16 bg-white" />
        <div className="mt-8 max-w-[65ch] space-y-5 text-justify">
          {ABOUT.whyDelhi.paragraphs.map((p, i) => (
            <p key={i} className="text-body">
              {p}
            </p>
          ))}
        </div>
      </ColorSection>

      <MuralBandStatic id="about-mural" />

      {/* What we hope to achieve — a plain point list now, not the earlier
          term/body pairs — each item is already a complete point on its own. */}
      <ColorSection tone="cream" className="relative z-0 overflow-hidden">
        {/* Scoped to just the heading, not the whole list below — the same
            reason Why Now's first motif only wraps its own heading. */}
        <div className="relative">
          <FloatingMotif
            variant="star"
            className="-right-[2%] -top-[14%] hidden h-20 w-20 lg:block lg:h-24 lg:w-24"
            baseRotate={9}
            duration={10}
            delay={0.3}
          />
          <h2 className="font-display text-h2 font-bold text-navy">
            What We Hope to Achieve
          </h2>
          <div className="mt-5 h-1.5 w-16 bg-teal" />
        </div>
        <FloatingMotif variant="stairs" className="right-[4%] top-[42%] hidden h-24 w-24 lg:block lg:h-32 lg:w-32" baseRotate={-9} duration={11} delay={0.3} />
        <FloatingMotif variant="daisy" className="right-[20%] bottom-[6%] hidden h-16 w-16 lg:block lg:h-20 lg:w-20" baseRotate={9} duration={12} delay={0.8} />
        <ul className="relative mt-12 space-y-6 md:space-y-8">
          {ABOUT.hopes.map((h, i) => (
            <li
              key={i}
              className="flex items-start gap-5 border-t border-navy/20 pt-6 md:gap-8"
            >
              <span
                aria-hidden="true"
                className="mt-3 h-2.5 w-2.5 shrink-0 rounded-chip bg-maroon"
              />
              <p className="max-w-[65ch] text-lead text-navy">{h}</p>
            </li>
          ))}
        </ul>
      </ColorSection>

      {/* Closing image — reuses the vision-board photo, freed up when the
          Vision section that used to carry it became a card without one. */}
      <ColorSection tone="cream" className="relative z-0 overflow-hidden">
        <FloatingMotif variant="kalash" className="left-[3%] top-[4%] hidden h-20 w-20 md:block lg:h-28 lg:w-28" baseRotate={-10} duration={10} delay={0} />
        <FloatingMotif variant="daisy" className="right-[3%] bottom-[4%] hidden h-20 w-20 md:block lg:h-28 lg:w-28" baseRotate={12} duration={11} delay={0.5} />
        <Figure
          image={ABOUT_VISION_IMAGE}
          ratio="wide"
          sizes="(min-width: 1024px) 90vw, 100vw"
        />
      </ColorSection>
    </>
  );
}
