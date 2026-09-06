"use client";

import { useId, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { MuralStrip } from "@/components/motif";

/**
 * Animation moment 4 of 6 (CLAUDE.md §4): the mural strip scrolls horizontally
 * as the page scrolls vertically — a conveyor belt of joy between sections.
 *
 * Parallax disabled under reduced motion; the strip renders static.
 */
export default function MuralBand({
  height = "h-24 md:h-32",
  rate = 0.3,
}: {
  height?: string;
  rate?: number;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const patternId = useId();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", `${-rate * 100}%`]);

  return (
    <div
      ref={ref}
      className={`w-full overflow-hidden bg-cream ${height}`}
      aria-hidden="true"
    >
      {/* Oversized so the parallax travel never exposes the trailing edge. */}
      <motion.div
        className="h-full w-[160%]"
        style={reduced ? undefined : { x }}
      >
        <MuralStrip id={patternId} className="h-full w-full" />
      </motion.div>
    </div>
  );
}
