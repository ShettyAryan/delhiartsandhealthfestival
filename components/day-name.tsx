"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

/**
 * Animation moment 3 of 6 (CLAUDE.md §4): each day name stamps in
 * letter-by-letter as it scrolls into view — the same block-print landing as
 * the hero DELHI.
 *
 * As in the hero, letters carry no opacity. A stamp lands, it does not fade,
 * and keeping them painted means the day name is readable the moment it is on
 * screen. Under reduced motion the stamp is replaced by instant appearance.
 *
 * Deterministic per-letter jitter — never Math.random(), which would desync
 * server and client markup and throw a hydration mismatch.
 */
const JITTER = [-1.4, 0.9, -0.6, 1.2, -0.8, 0.7, -1.1, 0.5];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const letter: Variants = {
  hidden: (j: number) => ({ scaleY: 1.14, y: -8, rotate: j }),
  show: {
    scaleY: 1,
    y: 0,
    rotate: 0,
    transition: { type: "spring", stiffness: 700, damping: 30 },
  },
};

export default function DayName({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <h2 className={className}>{name}</h2>;
  }

  return (
    <motion.h2
      className={`flex flex-wrap ${className ?? ""}`}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
      aria-label={name}
    >
      {name.split("").map((ch, i) => (
        <motion.span
          key={`${ch}-${i}`}
          custom={JITTER[i % JITTER.length]}
          variants={letter}
          className="inline-block origin-bottom"
          aria-hidden="true"
        >
          {ch}
        </motion.span>
      ))}
    </motion.h2>
  );
}
