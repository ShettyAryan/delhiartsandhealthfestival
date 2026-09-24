"use client";

import { useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { MARQUEE_WORDS } from "@/lib/content";

/** Keeps a value looping inside [min, max) without ever snapping. */
function wrap(min: number, max: number, v: number) {
  const range = max - min;
  return min + (((v - min) % range) + range) % range;
}

/**
 * Animation moment 2 of 6 (CLAUDE.md §4): continuous right-to-left scroll of
 * festival themes. Slow, hypnotic, never stopping. Pauses on hover.
 *
 * Middle dots are correct *here* — it's a marquee and the sequence is
 * meaningful. §2 rules them out for meta strings, not for this.
 *
 * Driven per-frame rather than by a keyframe animation, because hover has to
 * pause it mid-travel and resume from exactly where it stopped.
 *
 * Under reduced motion it crawls (~60s per loop) instead of stopping dead,
 * per §4's motion-accessibility note.
 */
export default function Marquee() {
  const reduced = useReducedMotion();
  const paused = useRef(false);
  const [, force] = useState(0);

  const baseX = useMotionValue(0);
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (paused.current) return;
    // Percent of the doubled track to travel per second.
    const perSecond = reduced ? 50 / 60 : 50 / 42;
    baseX.set(baseX.get() - perSecond * (delta / 1000));
  });

  const run = (
    <ul className="flex shrink-0 items-center">
      {MARQUEE_WORDS.map((word) => (
        <li key={word} className="flex items-center">
          <span className="font-display text-[clamp(1.25rem,2vw,1.625rem)] lowercase text-cream">
            {word}
          </span>
          <span className="px-5 text-[clamp(1.25rem,2vw,1.625rem)] text-yellow md:px-8" aria-hidden="true">
            ·
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className="w-full overflow-hidden bg-navy py-5 md:py-7"
      onMouseEnter={() => {
        paused.current = true;
        force((n) => n + 1);
      }}
      onMouseLeave={() => {
        paused.current = false;
        force((n) => n + 1);
      }}
    >
      <motion.div className="flex w-max" style={{ x }}>
        {run}
        <div aria-hidden="true" className="flex shrink-0">
          {run}
        </div>
      </motion.div>
    </div>
  );
}
