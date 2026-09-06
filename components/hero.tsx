"use client";

import { motion, useReducedMotion } from "motion/react";
import { VENN, Venn, WORDMARK } from "@/components/logo";
import CTAButton from "@/components/cta-button";
import HeroCarousel from "@/components/hero-carousel";
import { DONATE_HREF, FESTIVAL } from "@/lib/content";

/**
 * The wordmark stamp-in + falling Venn dot used to play here, gated on first
 * visit. Moved to <LoadingScreen> (a full-screen splash mounted in the root
 * layout) instead: showing the reveal once as a page-loading moment, then
 * fading into the site, reads as a proper "loading" experience rather than a
 * flourish that plays after the page has already appeared underneath it.
 * Playing it a second time here, right after the splash, would just repeat
 * the same falling-dot moment twice back to back. The wordmark below is
 * therefore always in its resting pose — no variants, no session gating.
 */
export default function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative z-0 overflow-hidden bg-cream px-section-x pb-16 pt-8 md:pb-24 md:pt-12">
      {/*
        Decorative brand-colour circles, scoped to the whole section (moved
        here from <HeroCarousel> on client reference) rather than just the
        photo box — pink bleeds off the top-right corner, yellow off the left
        edge at mid-height. Negative z-index puts them behind the content grid
        below, which is explicitly `relative z-10` to guarantee that: a
        position:absolute element paints above static in-flow content by
        default regardless of DOM order, so z-index has to be explicit on
        both sides rather than relying on source order.

        The section itself needs `z-0`, not just `relative` — a positioned
        element with z-index:auto does not open a new stacking context, so a
        bare -z-10 here escaped past the section entirely and painted behind
        the whole page instead of just behind its own content. `z-0` forces
        the section to contain its own stacking order.

        The float is ongoing ambient motion, not a one-off — an eighth moment
        beyond §4's six (on top of the carousel's already-flagged seventh),
        added on the same direct client direction as the circles themselves.
        Reduced motion freezes both in place rather than looping.
      */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[8%] -top-[12%] -z-10 aspect-square w-[30%] rounded-chip bg-pink"
        animate={reduced ? undefined : { y: [0, -22, 0], x: [0, 12, 0] }}
        transition={reduced ? undefined : { duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[9%] top-[38%] -z-10 aspect-square w-[22%] rounded-chip bg-yellow"
        animate={reduced ? undefined : { y: [0, 18, 0], x: [0, -10, 0] }}
        transition={
          reduced ? undefined : { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }
        }
      />

      <div className="relative z-10 mx-auto grid w-full max-w-360 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Text column */}
        <div className="lg:col-span-6">
          <p className="font-mono text-mono tracking-[0.08em] text-maroon">
            {FESTIVAL.datesLine}
          </p>

          {/*
            The DELHI wordmark stays real (traced paths), just resized to sit
            inline with the rest of the headline instead of spanning the full
            container width — a deliberate departure from §2's "monumental"
            hero for this specific two-column composition.

            Accessible name: the SVG and the dot are aria-hidden, so "Delhi" is
            supplied via sr-only text and the rest ("Arts & Health Festival")
            is real, readable text — no double-announcement.
          */}
          <h1 className="mt-4 font-display text-h1 font-bold leading-[0.95] md:mt-6">
            <span className="sr-only">Delhi</span>
            {/*
              Wrapper sized to the wordmark's own aspect ratio (347:100, so
              width = height × 3.47) rather than left as w-auto shrink-wrap —
              the dot below needs a definite box to position against.
            */}
            <span
              className="relative inline-block align-baseline"
              style={{ height: "0.82em", width: "2.8454em" }}
            >
              <svg
                viewBox={WORDMARK.viewBox}
                className="absolute inset-0 h-full w-full text-navy"
                fill="currentColor"
                fillRule="evenodd"
                aria-hidden="true"
                focusable="false"
              >
                {WORDMARK.letters.map((l) => (
                  <path key={l.key} d={l.d} transform={`translate(${l.x} 0)`} />
                ))}
              </svg>

              {/*
                Centred over the I (x 321.1–347 of the 347-wide viewBox, so
                96.3% from the left), sitting above the letter's top edge the
                way a tittle sits above a lowercase i — the same spot
                <LoadingScreen>'s dot falls onto, at splash time.
              */}
              <span
                aria-hidden="true"
                className="absolute"
                style={{
                  left: "96.3%",
                  top: "-0.36em",
                  width: "0.3em",
                  height: "0.3em",
                  transform: "translateX(-50%)",
                }}
              >
                <svg viewBox={VENN.viewBox} className="h-full w-full">
                  <Venn id="hero-venn-dot" />
                </svg>
              </span>
            </span>{" "}
            <span className="uppercase text-pink">Arts &amp; Health</span>{" "}
            <span className="uppercase text-navy">Festival</span>
          </h1>

          <div>
            {/*
              Pink text is used here, not maroon: at this size (text-lead is
              still well above the 24px/18.66px-bold large-text threshold once
              set in bold — here it's the Antonio headline weight above, and
              this line itself is regular Libre Franklin at ~20-24px, so it is
              checked separately) — measured at ~3.3:1 against cream, which
              clears the 3:1 large-text AA minimum narrowly. Kept below body
              size elsewhere per §0.5; not reused for smaller text.

              Real italic glyphs were not added to the Libre Franklin font load
              (§0.1 already limits it to 400/500 to protect the mobile perf
              budget), so this is a browser-synthesised oblique — an accepted
              trade-off for one short line rather than a second font fetch.
            */}
            <p className="mt-6 max-w-[46ch] text-lead italic text-ink">
              {FESTIVAL.subheading}
            </p>
            <p className="mt-5 max-w-[58ch] text-body text-ink">
              {FESTIVAL.intro}
            </p>
            <div className="mt-8 flex flex-wrap gap-3 md:gap-4">
              <CTAButton href={DONATE_HREF} external>
                Donate
              </CTAButton>
              <CTAButton href="/get-involved" variant="secondary">
                Get Involved
              </CTAButton>
            </div>
          </div>
        </div>

        {/* Photo column — decorative circles live inside HeroCarousel, scoped
            to just the photo box so they never reach the controls below. */}
        <div className="lg:col-span-6">
          <HeroCarousel />
        </div>
      </div>
    </section>
  );
}
