"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

const SESSION_KEY = "dahf:stats-counted";

function owesCountUp() {
  try {
    return sessionStorage.getItem(SESSION_KEY) !== "1";
  } catch {
    return true; // private mode / blocked storage
  }
}

/**
 * Animation moment 6 of 6 (CLAUDE.md §4): numbers count up on first scroll into
 * view, once per session. The `+` appears only after the number finishes — a
 * small punctuation.
 *
 * A per-digit rolling "odometer" reel was tried here and pulled back out: at
 * this size, Antonio's bold digit glyphs slightly overshoot a tight 1-line
 * row, so the row stacked above the visible one left a hairline sliver (the
 * curve of a "0", the serif of a "1") bleeding into the digit below it.
 * Giving each row more height to fix that would have thrown off vertical
 * alignment against the static comma and "+" beside it. Not worth shipping a
 * visible rendering glitch for — this plain count-up already reads as a
 * ticker (the digits visibly climb to the final value) with none of that risk.
 *
 * The number is written straight to the DOM rather than held in React state:
 * a 1.4s count-up would otherwise re-render this component ~85 times, and the
 * animation is an external system driving the DOM, not state React owns.
 *
 * Server renders the final value, so reduced motion, a repeat visit, and a
 * JS-disabled page all show the correct number on first paint (§9).
 */
export default function StatBlock({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const plusRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (reduced || !inView || !owesCountUp()) return;

    const num = numRef.current;
    const plus = plusRef.current;
    const final = value.toLocaleString("en-IN");

    // Zeroed here rather than at mount: if the observer never fires — print,
    // reader mode, a viewport that never reaches this section — the number
    // stays correct instead of being stranded at 0.
    if (num) num.textContent = "0";
    if (plus) plus.style.opacity = "0";

    const controls = animate(0, value, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => {
        if (num) num.textContent = Math.round(v).toLocaleString("en-IN");
      },
      onComplete: () => {
        if (num) num.textContent = final;
        if (plus) plus.style.opacity = "1";
        try {
          sessionStorage.setItem(SESSION_KEY, "1");
        } catch {
          /* not remembered, but the number is correct */
        }
      },
    });

    // Interrupted mid-count (navigation, unmount) — leave the true value behind.
    return () => {
      controls.stop();
      if (num) num.textContent = final;
      if (plus) plus.style.opacity = "1";
    };
  }, [reduced, inView, value]);

  return (
    <div ref={ref}>
      <div className="font-display text-h1 font-bold leading-none tabular-nums">
        <span ref={numRef}>{value.toLocaleString("en-IN")}</span>
        <span ref={plusRef}>{suffix}</span>
      </div>
      <div className="mt-2 font-body text-body">{label}</div>
    </div>
  );
}
