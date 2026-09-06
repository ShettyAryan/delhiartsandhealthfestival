"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

/**
 * Lenis smooth-scroll provider (CLAUDE.md §5.4).
 *
 * Lenis drives the real window scroll position, so Framer Motion's `useScroll`
 * picks it up with no extra syncing — that's what makes the mural parallax feel
 * attached to the page rather than lagging behind it.
 *
 * Reduced motion is read via matchMedia rather than motion's `useReducedMotion`
 * on purpose: this component sits in the root layout, so importing motion here
 * would pull the whole animation runtime into every page's critical path,
 * including the pages that never animate anything.
 *
 * Disabled entirely under prefers-reduced-motion: reduce → native scroll.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;
    let frame = 0;

    const start = () => {
      if (lenis || mq.matches) return;
      lenis = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2,
      });
      const raf = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    };

    const stop = () => {
      cancelAnimationFrame(frame);
      lenis?.destroy();
      lenis = null;
    };

    // Respond if the user flips the OS setting mid-session.
    const onChange = () => {
      stop();
      start();
    };

    start();
    mq.addEventListener("change", onChange);
    return () => {
      mq.removeEventListener("change", onChange);
      stop();
    };
  }, []);

  return <>{children}</>;
}
