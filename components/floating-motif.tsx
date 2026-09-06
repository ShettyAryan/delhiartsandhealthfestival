"use client";

import { motion, useReducedMotion } from "motion/react";
import Motif, { type MotifVariant } from "@/components/motif";

/**
 * A single mural motif, set loose rather than tiled — the "abstract"
 * placements in the Why Delhi section, as opposed to the symmetric flanking
 * pair in the Global Ecosystem section above it. Positioned by the caller via
 * `className` (top/left/right/bottom, size), so each instance can sit at its
 * own off-grid spot and rotation.
 *
 * The drift extends the same ambient-motion language as the hero's decorative
 * circles (CLAUDE.md §0.11) into a second section, rather than inventing a new
 * kind of animation — still gated by `useReducedMotion`, which freezes it at
 * `baseRotate` with no loop.
 */
export default function FloatingMotif({
  variant,
  className,
  baseRotate = 0,
  driftY = 14,
  driftRotate = 5,
  duration = 9,
  delay = 0,
}: {
  variant: MotifVariant;
  className: string;
  baseRotate?: number;
  driftY?: number;
  driftRotate?: number;
  duration?: number;
  delay?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute -z-10 ${className}`}
      initial={{ rotate: baseRotate }}
      animate={
        reduced
          ? undefined
          : { y: [0, -driftY, 0], rotate: [baseRotate, baseRotate + driftRotate, baseRotate] }
      }
      transition={reduced ? undefined : { duration, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <Motif variant={variant} fit="meet" className="h-full w-full rounded-card" />
    </motion.div>
  );
}
