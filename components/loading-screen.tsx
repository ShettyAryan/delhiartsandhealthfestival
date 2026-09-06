"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "motion/react";
import { VENN, Venn, WORDMARK } from "@/components/logo";

const SESSION_KEY = "dahf:splash-played";

/**
 * Whether this browser tab still owes the splash. Read through
 * useSyncExternalStore, not an effect: the server (and the pre-hydration
 * client render it must match) always answers `false`, so a no-JS or
 * reduced-motion visitor — or a returning one, once corrected — never mounts
 * this component at all. There is no stuck-overlay case to guard against
 * (unlike a CSS-visibility toggle) because the whole splash simply isn't in
 * the tree until a genuine first visit says otherwise.
 */
let cachedFirstVisit: boolean | null = null;

const subscribe = () => () => {};

function getClientSnapshot() {
  if (cachedFirstVisit === null) {
    try {
      cachedFirstVisit = sessionStorage.getItem(SESSION_KEY) !== "1";
    } catch {
      cachedFirstVisit = true; // private mode / blocked storage
    }
  }
  return cachedFirstVisit;
}

const getServerSnapshot = () => false;

/** Letters carry no opacity — a stamp lands, it does not fade. */
const letterVariants: Variants = {
  hidden: (jitter: number) => ({ scaleY: 1.14, y: -14, rotate: jitter }),
  land: {
    scaleY: 1,
    y: 0,
    rotate: 0,
    transition: { type: "spring", stiffness: 700, damping: 30 },
  },
};

/**
 * The Venn mark tumbling down onto the I, same choreography as the hero's
 * former inline flourish (CLAUDE.md §0.11) — now played once, here, as the
 * page's actual loading moment rather than after the page has already
 * appeared underneath it.
 */
const dotVariants: Variants = {
  hidden: { scale: 0.45, opacity: 0, y: -56, rotate: -170 },
  land: {
    scale: 1,
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { type: "spring", stiffness: 240, damping: 15 },
  },
};

// Letters finish stamping in ~0.1 + 4×0.07 + settle ≈ 0.7s. The dot starts
// right after and takes another ~0.9s to spring to rest, so the whole reveal
// reads by ~1.6s. A short hold, then the fade — well under the 5s WCAG 2.2.2
// threshold for auto-updating content, so no pause control is required.
const HOLD_MS = 1650;
const FADE_MS = 500;

export default function LoadingScreen() {
  const reduced = useReducedMotion();
  const firstVisit = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
  const play = firstVisit && !reduced;

  // `dismissed` only ever moves false → true, either from the auto-hide
  // timeout or a manual skip. The splash's actual visibility is `play &&
  // !dismissed`, derived at render time rather than mirrored into its own
  // state — writing that mirror synchronously inside an effect would trigger
  // a cascading re-render for no reason (Framer's mount timing already needs
  // `play` to flip via a real render, not an effect, for the reasons below).
  const [dismissed, setDismissed] = useState(false);
  const showSplash = play && !dismissed;

  // Conditionally MOUNTING the splash (rather than animating a variant on an
  // always-present element) is what makes this reliable: Framer only honours
  // `initial` at true mount time, and `play` only becomes true after
  // hydration corrects the server-matching first render — a prop flip on an
  // already-mounted tree, which Framer would silently ignore (see hero.tsx's
  // git history for the bug this sidesteps). A fresh mount always gets a
  // fresh `initial`.
  useEffect(() => {
    if (!play) return;
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* not remembered, but the splash still ran correctly */
    }
    const t = setTimeout(() => setDismissed(true), HOLD_MS);
    return () => clearTimeout(t);
  }, [play]);

  // Lock background scroll while the splash covers the page, same technique
  // as <MobileMenu>.
  useEffect(() => {
    if (!showSplash) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") setDismissed(true);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [showSplash]);

  return (
    <AnimatePresence>
      {showSplash ? (
        <motion.div
          role="presentation"
          aria-hidden="true"
          onClick={() => setDismissed(true)}
          className="fixed inset-0 z-100 flex cursor-pointer items-center justify-center bg-cream"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: FADE_MS / 1000, ease: "easeInOut" } }}
        >
          {/*
            Sized by height (14vw, clamped) with the wordmark's own 3.47:1
            aspect ratio giving the width — same box hero.tsx uses, just in
            viewport units instead of em since there's no surrounding text run
            to inherit a font-size from here.
          */}
          <div className="relative aspect-347/100 h-[14vw] max-h-32 min-h-16">
            <svg
              viewBox={WORDMARK.viewBox}
              className="absolute inset-0 h-full w-full text-navy"
              fill="currentColor"
              fillRule="evenodd"
              focusable="false"
            >
              {WORDMARK.letters.map((l) => (
                <g key={l.key} transform={`translate(${l.x} 0)`}>
                  <motion.path
                    d={l.d}
                    custom={l.jitter}
                    variants={letterVariants}
                    initial="hidden"
                    animate="land"
                    transition={{ delayChildren: 0.1, staggerChildren: 0.07 }}
                    style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}
                  />
                </g>
              ))}
            </svg>

            {/*
              Centred over the I (96.3% from the left, same spot as the
              hero's own wordmark) and sized/offset as a percentage of this
              box rather than em: width 10.55% of the box's width and height
              36.6% of its height both equal 0.3× the wordmark's own cap
              height, so the dot renders square despite the box itself being
              3.47:1. Position lives on this plain span, animated transform
              on the motion.span inside — Framer would silently overwrite a
              `translateX(-50%)` set directly on the animated element (the
              same trap noted in hero.tsx / CLAUDE.md §0.2).
            */}
            <span
              className="absolute"
              style={{
                left: "96.3%",
                top: "-43.9%",
                width: "10.55%",
                height: "36.6%",
                transform: "translateX(-50%)",
              }}
            >
              <motion.span
                className="block h-full w-full"
                variants={dotVariants}
                initial="hidden"
                animate="land"
                transition={{ delay: 0.75 }}
              >
                <svg viewBox={VENN.viewBox} className="h-full w-full">
                  <Venn id="loading-venn-dot" />
                </svg>
              </motion.span>
            </span>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
