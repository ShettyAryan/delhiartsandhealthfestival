"use client";

import { motion, useReducedMotion } from "motion/react";
import CTAButton from "@/components/cta-button";
import HeroCarousel from "@/components/hero-carousel";
import StayInformed from "@/components/stay-informed";
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
    <section className="relative z-0 flex min-h-[calc(100vh-4rem)] items-center overflow-hidden bg-cream px-section-x py-5 md:min-h-[calc(100vh-4.5rem)] md:py-10">
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
        className="pointer-events-none absolute -right-[8%] -top-[12%] -z-10 aspect-square w-[30%] rounded-chip bg-pink/70"
        animate={reduced ? undefined : { y: [0, -22, 0], x: [0, 12, 0] }}
        transition={reduced ? undefined : { duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[9%] top-[38%] -z-10 aspect-square w-[22%] rounded-chip bg-yellow/70"
        animate={reduced ? undefined : { y: [0, 18, 0], x: [0, -10, 0] }}
        transition={
          reduced ? undefined : { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }
        }
      />

      <div className="relative z-10 mx-auto grid w-full max-w-400 items-center gap-8 lg:grid-cols-12 lg:gap-16">
        {/* Text column */}
        <div className="lg:col-span-6">
          <p className="font-eyebrow text-eyebrow text-maroon">
            {FESTIVAL.datesLine}
          </p>

          {/*
            Plain text headline, not the traced SVG wordmark — on client
            direction, this composition drops the logo treatment entirely and
            reads as ordinary (if large) text, uppercased via CSS rather than
            the SVG's own letterforms.

            Pink, not navy: at this size (well above the 24px/18.66px-bold
            large-text threshold) pink on the section's white background
            measures ~4.0:1, clearing the 3:1 large-text AA minimum with
            margin — not reused at body/label size elsewhere, where it would
            fail (§0.5).
          */}
          {/*
            Sized below the shared --text-h1 token (which every other page's
            own top headline uses at full 80px) — a hero-local, deliberately
            smaller clamp so the headline reads well sharing a row with the
            photo on desktop, rather than the full-bleed monumental size.
            Tried snapping this to the exact --text-h1/--text-subtitle/
            --text-body tokens at `lg`+ for full sitewide uniformity;
            reverted after measuring it — the CTA row landed at 799px of an
            800px-tall 1280×800 window (fits by under a pixel) and was cut
            off outright at 1024×768. The one-viewport-fit guarantee and
            exact cross-page size match are in real tension here since the
            fit depends on viewport height, which no width-based breakpoint
            can key off reliably. Kept the smaller, tested-safe size.
          */}
          <h1 className="mt-3 font-display text-[clamp(2.25rem,4.5vw,3.5rem)] font-bold uppercase leading-[0.95] text-pink md:mt-4">
            Delhi Arts &amp; Health Festival
          </h1>

          <div>
            {/*
              Real italic glyphs, not a synthesised oblique: Newsreader is
              loaded specifically for this one line (medium weight, italic
              style only). Sized down from the shared --text-subtitle token
              for the same reason as the headline above.
            */}
            <p className="mt-3 max-w-[42ch] font-subtitle text-[clamp(1.25rem,1.8vw,1.4375rem)] italic leading-tight text-ink md:mt-4">
              {FESTIVAL.subheading}
            </p>
            {FESTIVAL.introParagraphs.map((para, i) => (
              <p
                key={i}
                className="mt-3 max-w-[54ch] text-[clamp(1.0625rem,1.2vw,1.125rem)] leading-[1.4] text-ink md:mt-4"
              >
                {para}
              </p>
            ))}
            <div className="mt-6 flex flex-wrap gap-3 md:gap-4">
              <CTAButton href={DONATE_HREF} external>
                Donate
              </CTAButton>
              <CTAButton href="/get-involved" variant="secondary">
                Get Involved
              </CTAButton>
              <StayInformed />
            </div>
          </div>
        </div>

        {/* Photo column — decorative circles live inside HeroCarousel, scoped
            to just the photo box so they never reach the controls below. The
            carousel's own box is capped by viewport height on desktop (see
            hero-carousel.tsx) so it still fits one viewport there; on mobile
            it's sized generously since a scroll to reach the buttons is now
            expected. */}
        <div className="lg:col-span-6">
          <HeroCarousel />
        </div>
      </div>
    </section>
  );
}
