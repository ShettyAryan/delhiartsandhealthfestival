"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "motion/react";
import { NAV, REGISTER_HREF } from "@/lib/content";

/**
 * Animation moment 5 of 6 (CLAUDE.md §4): full-screen navy overlay opening with
 * a colour-block wipe from the menu-icon corner outward — not a fade. Giant
 * Antonio nav items, each in a different palette colour, revealed in stagger
 * (~80ms apart) — one per top-level category now, not per page, since the
 * header nav collapsed six flat links into three categories with a dropdown
 * each. Every category's pages/sections list underneath it at body scale, so
 * nothing the old flat menu could reach is lost, just regrouped.
 *
 * Under reduced motion the wipe becomes a fast fade and the stagger collapses.
 */

/** One palette colour per category, so the menu reads as a colour chart. */
const ITEM_COLORS = ["text-yellow", "text-pink", "text-lime"];

export default function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const reduced = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);

  // Hold the page behind the overlay, let Escape close it, and move focus in so
  // keyboard users land inside the menu rather than behind it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const panel: Variants = reduced
    ? {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.12 } },
        exit: { opacity: 0, transition: { duration: 0.1 } },
      }
    : {
        // Wipe outward from the top-right, where the menu button sits.
        hidden: { clipPath: "circle(0% at calc(100% - 3rem) 2rem)" },
        show: {
          clipPath: "circle(150% at calc(100% - 3rem) 2rem)",
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
        exit: {
          clipPath: "circle(0% at calc(100% - 3rem) 2rem)",
          transition: { duration: 0.35, ease: [0.64, 0, 0.78, 0] },
        },
      };

  const list: Variants = {
    hidden: {},
    show: {
      transition: { delayChildren: reduced ? 0 : 0.18, staggerChildren: reduced ? 0 : 0.08 },
    },
  };

  const item: Variants = reduced
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 14 },
        show: { opacity: 1, y: 0, transition: { duration: 0.32, ease: "easeOut" } },
      };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="menu"
          id="mobile-menu"
          className="fixed inset-0 z-50 flex flex-col bg-navy px-section-x pb-12 pt-24"
          variants={panel}
          initial="hidden"
          animate="show"
          exit="exit"
        >
          {/*
            The close control lives inside the overlay. The header is sticky
            with a z-index, which makes it a stacking context — a button in
            there can never paint above this panel, however high its z-index.
          */}
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="absolute right-[calc(var(--spacing-section-x)-0.75rem)] top-4 flex h-11 w-11 items-center justify-center text-cream"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
              <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="5" y1="5" x2="19" y2="19" />
                <line x1="19" y1="5" x2="5" y2="19" />
              </g>
            </svg>
          </button>

          <motion.nav
            className="flex flex-1 flex-col justify-center"
            variants={list}
            initial="hidden"
            animate="show"
            aria-label="Main"
          >
            <ul className="space-y-7">
              {/* A plain link, not a category — no children list underneath,
                  so it's kept out of the NAV.map below. */}
              <motion.li variants={item}>
                <Link
                  href="/"
                  onClick={onClose}
                  className="block font-display text-h1 font-bold leading-none text-cream"
                >
                  Home
                </Link>
              </motion.li>

              {/*
                Giant Antonio treatment stays on the three categories (§4);
                each one's pages/sections list underneath at body scale,
                inside the same motion.li so they arrive with their heading
                rather than needing a second stagger pass.
              */}
              {NAV.map((n, i) => (
                <motion.li key={n.label} variants={item}>
                  <div
                    className={`font-display text-h1 font-bold leading-none ${ITEM_COLORS[i % ITEM_COLORS.length]}`}
                  >
                    {n.label}
                  </div>
                  <ul className="mt-3 space-y-2">
                    {n.children.map((c) => (
                      <li key={c.href}>
                        <Link
                          href={c.href}
                          onClick={onClose}
                          className="block font-body text-lead text-cream/80 transition-colors hover:text-cream"
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.li>
              ))}
              <motion.li variants={item} className="pt-6">
                {/*
                  Cream (white) fill / navy text, not a navy fill — this
                  overlay's own background is bg-navy, so a navy button here
                  would be invisible against it. Same inverted treatment
                  CTAButton's `invert` variant uses on other dark surfaces.
                */}
                <a
                  href={REGISTER_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  className="inline-flex rounded-chip bg-cream px-7 py-3.5 font-body text-body font-medium text-navy transition-colors hover:bg-white"
                >
                  Register
                </a>
              </motion.li>
            </ul>
          </motion.nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
