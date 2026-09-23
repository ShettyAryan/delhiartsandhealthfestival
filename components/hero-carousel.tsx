"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { HERO_STRIP } from "@/lib/content";

const INTERVAL = 5000;

/**
 * The rotating hero carousel the content PDF asks for: a dance movement
 * workshop, hospital arts programme, community mural, theatre performance,
 * nature-based arts session, elder engagement programme, children's creative
 * workshop, and a public art intervention in Delhi.
 *
 * This is a SEVENTH animation moment, beyond the six §4 allows. Added on
 * explicit client direction (see CLAUDE.md §0.10) rather than by drifting past
 * the rule — a cross-fade, not the parallax §4 rules out.
 *
 * Two things it must get right:
 *
 * - **WCAG 2.2.2 (Pause, Stop, Hide), partially.** The client asked for the
 *   visible pause button and caption gone. Hover and focus still pause it —
 *   tabbing to a dot stops the advance — but a touch-only user has no way to
 *   stop it short of picking a slide. Flagged rather than silently dropped;
 *   revisit if that turns out to matter.
 * - **Weight.** Eight full-bleed images above the fold would wreck LCP. Only
 *   the slide on screen and the one after it are mounted, so at most two images
 *   are ever in flight, and the next is always warm before it is needed.
 */
export default function HeroCarousel() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const count = HERO_STRIP.length;
  const go = useCallback((n: number) => setIndex(((n % count) + count) % count), [count]);

  // Reduced motion never auto-advances — the dots still work, so every image
  // stays reachable, it just will not move on its own.
  const running = !reduced && !paused;

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (!running) return;
    timer.current = setTimeout(() => go(index + 1), INTERVAL);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [running, index, go]);

  const next = (index + 1) % count;
  const current = HERO_STRIP[index];

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="The festival in pictures"
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/*
        The decorative brand-colour circles moved up to <Hero>, scoped to the
        whole section rather than just this photo box — see hero.tsx.
      */}
      {/*
        Height pinned to viewport height rather than aspect-ratio-off-width —
        on the two-column desktop layout an aspect-[4/3] box driven by ~46vw
        of column width could grow taller than the hero's one-viewport
        budget there. Mobile no longer needs to fit one viewport (a scroll to
        reach the CTAs is expected), so its height here is just a
        comfortable size, not a fit constraint.
      */}
      <div className="relative h-[30vh] w-full overflow-hidden rounded-photo bg-cream-2 sm:h-[32vh] md:h-[38vh] lg:h-[54vh]">
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.7, ease: "easeInOut" }}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${count}`}
          >
            {current.src ? (
              <Image
                src={current.src}
                alt={current.alt}
                fill
                sizes="(min-width: 1024px) 46vw, 100vw"
                priority={index === 0}
                className="object-cover"
              />
            ) : null}
          </motion.div>
        </AnimatePresence>

        {/* Warms the next slide so the cross-fade never lands on a blank frame.
            Mounted but not painted, and never announced. */}
        {HERO_STRIP[next]?.src ? (
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-0" aria-hidden="true">
            <Image
              src={HERO_STRIP[next].src}
              alt=""
              fill
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="object-cover"
            />
          </div>
        ) : null}
      </div>

      {/* Controls. Live region is polite only when nothing is moving on its own. */}
      <div
        className="mt-4 flex items-center gap-4"
        aria-live={running ? "off" : "polite"}
      >
        {/*
          The dot is 10px, but the button around it is 24px — WCAG 2.5.8 sets a
          24×24 minimum for pointer targets, and a bare 10px dot fails it.
        */}
        <ul className="flex flex-wrap items-center">
          {HERO_STRIP.map((img, i) => (
            <li key={img.alt}>
              <button
                type="button"
                onClick={() => {
                  setPaused(true);
                  go(i);
                }}
                aria-label={`Show image ${i + 1}: ${img.alt}`}
                aria-current={i === index ? "true" : undefined}
                className="flex h-6 w-6 items-center justify-center"
              >
                <span
                  aria-hidden="true"
                  className={`block h-2.5 w-2.5 rounded-chip border border-navy transition-colors ${
                    i === index ? "bg-navy" : "bg-transparent"
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
