"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import Logo from "@/components/logo";
import { NAV, REGISTER_HREF } from "@/lib/content";

/**
 * Loaded on demand. The overlay is the only animated thing on most pages, so
 * importing it eagerly would put the whole motion runtime in every page's
 * critical path for a menu that may never be opened. Prefetched on first
 * pointer/focus contact with the trigger, so the wipe is ready before the tap
 * completes.
 */
const MobileMenu = dynamic(() => import("@/components/mobile-menu"));

/** Warm the overlay chunk before the tap lands. Safe to call repeatedly. */
const prefetchMenu = () => {
  void import("@/components/mobile-menu");
};

/**
 * Client only for scroll state and the menu toggle (CLAUDE.md §7).
 * Cream, becoming a translucent cream once the page moves.
 */
export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the overlay on navigation. Adjusted during render rather than in an
  // effect — React's documented pattern for reacting to a changed input, and it
  // avoids the extra commit an effect would cost.
  const [seenPath, setSeenPath] = useState(pathname);
  // The desktop dropdowns below are pure CSS (:hover / :focus-within) so they
  // keep working with JS disabled, but that means clicking a link doesn't
  // close one on its own: the mouse is usually still sitting right over it,
  // so :hover keeps it visible after the click-through navigation lands.
  // This tracks which category (if any) was just dismissed by a click, so its
  // panel can be force-hidden until the pointer actually leaves and re-enters.
  const [dismissed, setDismissed] = useState<string | null>(null);
  if (seenPath !== pathname) {
    setSeenPath(pathname);
    setOpen(false);
  }

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-60 focus:rounded-chip focus:bg-navy focus:px-5 focus:py-3 focus:text-cream"
      >
        Skip to content
      </a>

      <header
        className={`sticky top-0 z-40 h-16 px-section-x transition-colors md:h-18 ${
          scrolled ? "bg-cream/90 backdrop-blur-sm" : "bg-cream"
        }`}
      >
        <div className="mx-auto flex h-full w-full max-w-360 items-center justify-between gap-6">
          <Link href="/" aria-label="Delhi Arts & Health Festival, home">
            <Logo id="hdr" orientation="horizontal" className="h-9 w-auto md:h-10" />
          </Link>

          {/* Nav and the Register/menu controls grouped as one right-aligned
              cluster, rather than justify-between spreading all three across
              the header — the gap-8 here is what keeps them next to each
              other with visible breathing room, instead of the nav drifting
              toward the middle. */}
          <div className="flex items-center gap-8">
            <nav className="hidden lg:block" aria-label="Main">
              <ul className="flex items-center gap-7">
                {/* A plain link, not a dropdown category — no children to
                    show, so it doesn't go through the NAV.map below. */}
                <li>
                  <Link
                    href="/"
                    aria-current={pathname === "/" ? "page" : undefined}
                    className={`font-body text-body transition-colors hover:text-maroon ${
                      pathname === "/" ? "text-maroon" : "text-ink"
                    }`}
                  >
                    Home
                  </Link>
                </li>

                {NAV.map((n) => {
                  const activeChild = n.children.some(
                    (c) => pathname === c.href.split("#")[0],
                  );
                  return (
                    <li
                      key={n.label}
                      className="group relative"
                      onMouseEnter={() =>
                        setDismissed((d) => (d === n.label ? null : d))
                      }
                    >
                      {/*
                        No href on this button — every one of the three
                        categories would otherwise duplicate one of its own
                        children's routes (see the NAV comment in content.ts).
                        The dropdown itself is pure CSS: :hover for the mouse,
                        :focus-within for the keyboard, so it needs no client
                        state and still works with JavaScript disabled (§9).
                      */}
                      <button
                        type="button"
                        aria-haspopup="true"
                        className={`flex items-center gap-1.5 py-2 font-body text-body transition-colors group-hover:text-maroon group-focus-within:text-maroon ${
                          activeChild ? "text-maroon" : "text-ink"
                        }`}
                      >
                        {n.label}
                        <svg
                          viewBox="0 0 10 6"
                          className="h-1.5 w-2.5 fill-current"
                          aria-hidden="true"
                        >
                          <path d="M0 0 L5 6 L10 0 Z" />
                        </svg>
                      </button>

                      <ul
                        className={`invisible absolute left-0 top-full z-50 min-w-52 -translate-y-1 rounded-card border border-navy/10 bg-cream py-2 opacity-0 shadow-lg transition-[opacity,transform,visibility] duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 ${
                          dismissed === n.label ? "invisible! opacity-0!" : ""
                        }`}
                      >
                        {n.children.map((c) => (
                          <li key={c.href}>
                            <Link
                              href={c.href}
                              aria-current={pathname === c.href.split("#")[0] ? "page" : undefined}
                              onClick={(e) => {
                                setDismissed(n.label);
                                e.currentTarget.blur();
                              }}
                              className="block px-4 py-2.5 font-body text-body text-ink transition-colors hover:bg-cream-2 hover:text-maroon"
                            >
                              {c.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-3">
              <a
                href={REGISTER_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden rounded-chip bg-pink px-5 py-2.5 font-body text-small font-medium text-black transition-colors hover:bg-maroon md:inline-flex"
              >
                Register
              </a>

              {/* Opens only — the overlay carries its own close button, because
                  this sticky header cannot paint above it. */}
              <button
                ref={triggerRef}
                type="button"
                onPointerEnter={prefetchMenu}
                onFocus={prefetchMenu}
                onTouchStart={prefetchMenu}
                onClick={() => setOpen(true)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label="Open menu"
                className="flex h-11 w-11 items-center justify-center text-navy lg:hidden"
              >
                {/* Custom mark — no icon library (§5.5) */}
                <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true" fill="currentColor">
                  <rect x="3" y="5" width="18" height="2.6" />
                  <rect x="3" y="11" width="18" height="2.6" />
                  <rect x="3" y="17" width="18" height="2.6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        open={open}
        onClose={() => {
          setOpen(false);
          // Return focus to the control that opened it.
          triggerRef.current?.focus();
        }}
      />
    </>
  );
}
