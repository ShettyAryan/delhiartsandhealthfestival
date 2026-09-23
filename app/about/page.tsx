import type { Metadata } from "next";
import ColorSection from "@/components/color-section";
import MuralBandStatic from "@/components/mural-band-static";
import Figure from "@/components/figure";
import FloatingMotif from "@/components/floating-motif";
import {
  ABOUT,
  ABOUT_IMAGE,
  ABOUT_HERO_IMAGE,
  ABOUT_VISION_IMAGE,
  ABOUT_WHY_NOW_IMAGE,
  ABOUT_WHY_NOW_IMAGES,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "What would it look like if we placed care at the centre of city life? The vision, mission, and evidence behind the Delhi Arts & Health Festival.",
};

export default function AboutPage() {
  return (
    <>
      {/*
        Opening question, redesigned in the hero's own language rather than
        as a text-only poster moment: a two-column split (copy left, one
        photo right in the hero's rounded-photo frame) and the same pair of
        flat brand-colour circles bleeding off the section's corners. Static
        here, not floating — the hero's ambient drift is that section's
        signature, and repeating it site-wide would turn a deliberate flourish
        into wallpaper.

        `relative z-0 overflow-hidden` on the section is required, not
        decorative — see hero.tsx for why a positioned element with
        z-index:auto doesn't contain its own stacking order.
      */}
      <section className="relative z-0 overflow-hidden bg-cream px-section-x pb-section-y pt-8 md:pt-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[6%] -top-[16%] aspect-square w-[26%] rounded-chip bg-yellow/70"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-[7%] bottom-[8%] aspect-square w-[20%] rounded-chip bg-pink/70"
        />

        {/*
          items-start, not items-center — the text block (eyebrow + question)
          is much shorter than the portrait photo beside it, so centring it
          left a tall empty gap above the heading with nothing to anchor it
          to. Top-aligned, the question now starts level with the photo.
        */}
        <div className="relative z-10 mx-auto grid w-full max-w-360 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="font-eyebrow text-eyebrow text-maroon">
              {ABOUT.heading}
            </p>
            <h1 className="mt-5 max-w-[22ch] font-display text-h1 font-bold text-navy">
              {ABOUT.question}
            </h1>

            {/*
              The opening passage's first two paragraphs, pulled up from the
              section below to answer the question in the same breath rather
              than leaving a gap under it — the text column was noticeably
              shorter than the portrait photo beside it once top-aligned.
              The remaining two paragraphs continue directly below, in the
              cream-2 section, unchanged in wording or order.
            */}
            <div className="mt-6 max-w-[52ch] space-y-4">
              <p className="text-lead font-medium leading-normal text-navy">
                {ABOUT.opening[0]}
              </p>
              <p className="text-body leading-[1.6] text-ink">
                {ABOUT.opening[1]}
              </p>
            </div>
          </div>

          <Figure
            image={ABOUT_HERO_IMAGE}
            ratio="portrait"
            sizes="(min-width: 1024px) 38vw, 100vw"
            priority
            className="rounded-photo lg:col-span-5"
          />
        </div>
      </section>

      {/*
        The reflective passage continues from the hero's opening two
        paragraphs — this section carries the remaining two, plus the
        closing image. Plain text-body throughout: the lead-in treatment
        already happened once, at the top of the hero; repeating it here
        would just be the same flourish twice.

        Heading added on request — every other section on this page has one,
        this was the exception. "Bringing Communities Together" names what
        the first of the two paragraphs below is actually about (DAHF
        bringing artists, doctors, therapists, and communities together).
      */}
      <ColorSection tone="cream-2">
        <h2 className="font-display text-h2 font-bold text-navy">
          Bringing Communities Together
        </h2>
        <div className="mt-8 max-w-[62ch] space-y-5">
          {ABOUT.opening.slice(2).map((p, i) => (
            <p key={i} className="text-body leading-[1.6] text-ink">
              {p}
            </p>
          ))}
        </div>
        <Figure
          image={ABOUT_IMAGE}
          ratio="wide"
          sizes="(min-width: 1024px) 90vw, 100vw"
          className="mt-14"
        />
      </ColorSection>

      {/* Vision and Mission as two adjacent colour blocks */}
      <div className="grid md:grid-cols-2">
        <div className="bg-teal px-section-x py-section-y text-black">
          <h2 className="font-display text-h2 font-bold">
            {ABOUT.vision.heading}
          </h2>
          <p className="mt-6 max-w-[46ch] text-lead">{ABOUT.vision.body}</p>
          {/* A participant's own hand-made vision board — literal enough to
              feel like more than decoration next to a section called "Our
              Vision". Block radius 0, same as every other photo on the site
              outside the hero. */}
          <Figure
            image={ABOUT_VISION_IMAGE}
            ratio="tall"
            sizes="(min-width: 768px) 30vw, 80vw"
            className="mt-10 max-w-xs"
          />
        </div>
        <div className="bg-navy px-section-x py-section-y text-cream">
          <h2 className="font-display text-h2 font-bold">
            {ABOUT.mission.heading}
          </h2>
          <div className="mt-6 max-w-[46ch] space-y-4">
            {ABOUT.mission.paragraphs.map((p, i) => (
              <p key={i} className="text-body">
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>

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
          <h2 className="font-display text-h2 font-bold text-navy">Why Now</h2>
        </div>

        {/*
          Heading and a supporting image stack in the left column; the
          paragraphs run the full height of the right column beside them —
          an image makes this section's own point (creativity as a health
          practice) rather than just illustrating nearby text.
        */}
        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          <h3 className="font-display text-h3 font-semibold text-pink lg:col-span-4 lg:col-start-1 lg:row-start-1">
            {ABOUT.globalMomentum.heading}
          </h3>
          <Figure
            image={ABOUT_WHY_NOW_IMAGE}
            ratio="tall"
            sizes="(min-width: 1024px) 26vw, 80vw"
            className="mt-2 lg:col-span-4 lg:col-start-1 lg:row-start-2 lg:mt-0"
          />
          {/*
            flex flex-col, not just a block: the grid's default
            align-items:stretch already makes this column's box match the
            full row1+row2 height of the heading+image column beside it, but
            the paragraph text alone is shorter, leaving that stretched space
            empty below it. mt-auto on the image pair pushes them down to
            fill it, landing their bottom edge on the same grid line as the
            body-map image's bottom — "aligned with the left image" without
            hardcoding a height anywhere.
          */}
          <div className="flex flex-col lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
            <div className="space-y-5">
              {ABOUT.globalMomentum.paragraphs.map((p, i) => (
                <p key={i} className="max-w-[65ch] text-body">
                  {p}
                </p>
              ))}
            </div>
            <div className="mt-auto grid grid-cols-2 gap-4 pt-8">
              <Figure
                image={ABOUT_WHY_NOW_IMAGES[0]}
                ratio="landscape"
                sizes="(min-width: 1024px) 20vw, 40vw"
              />
              <Figure
                image={ABOUT_WHY_NOW_IMAGES[1]}
                ratio="landscape"
                sizes="(min-width: 1024px) 20vw, 40vw"
              />
            </div>
          </div>
        </div>

        {/* Research highlights as pull-quotes, not bullets */}
        <div className="relative mt-16 space-y-8">
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

      {/* GSAH as an inset framed box. Two motifs bookend the box itself,
          scoped to the whole section since there's no image here to hide
          behind — just the bordered box, with cream margin around it. */}
      <ColorSection tone="cream" className="relative z-0 overflow-hidden">
        <FloatingMotif
          variant="daisy"
          className="-left-[2%] -top-[8%] hidden h-20 w-20 lg:block lg:h-24 lg:w-24"
          baseRotate={-14}
          duration={9}
        />
        <FloatingMotif
          variant="kalash"
          className="-right-[2%] -bottom-[8%] hidden h-20 w-20 lg:block lg:h-24 lg:w-24"
          baseRotate={10}
          duration={12}
          delay={0.7}
        />
        <div className="relative border-2 border-navy p-8 md:p-14">
          <h2 className="font-display text-h3 font-semibold text-navy">
            {ABOUT.gsah.heading}
          </h2>
          <div className="mt-5 space-y-4">
            {ABOUT.gsah.paragraphs.map((p, i) => (
              <p key={i} className="max-w-[65ch] text-body">
                {p}
              </p>
            ))}
          </div>
        </div>
      </ColorSection>

      <ColorSection tone="purple">
        <div className="grid gap-8 lg:grid-cols-12">
          <h2 className="font-display text-h2 font-bold lg:col-span-4">
            {ABOUT.indiaMoment.heading}
          </h2>
          <div className="space-y-5 lg:col-span-7 lg:col-start-6">
            {ABOUT.indiaMoment.paragraphs.map((p, i) => (
              <p key={i} className="max-w-[62ch] text-lead">
                {p}
              </p>
            ))}
          </div>
        </div>
      </ColorSection>

      <MuralBandStatic id="about-mural" />

      {/* What we hope to achieve — editorial list with display numbers */}
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
        </div>
        <ol className="relative mt-12 space-y-10 md:space-y-12">
          {ABOUT.hopes.map((h, i) => (
            <li
              key={h.term}
              className="grid gap-x-8 gap-y-2 border-t border-navy/20 pt-6 md:grid-cols-12"
            >
              <span
                className="font-display text-h3 font-bold text-pink md:col-span-1"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-h3 font-semibold text-navy md:col-span-4">
                {h.term}
              </h3>
              <p className="max-w-[52ch] text-body md:col-span-6 md:col-start-7">
                {h.body}
              </p>
            </li>
          ))}
        </ol>
      </ColorSection>
    </>
  );
}
