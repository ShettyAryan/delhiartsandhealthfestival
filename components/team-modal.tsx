"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Portrait from "@/components/portrait";
import type { Person } from "@/lib/content";
import { teamTags } from "@/lib/team";

/**
 * The full profile behind a team card. Same open/close mechanics as
 * <MobileMenu> — Escape closes, focus moves to the close button on open,
 * body scroll locks while it's up — rather than a stricter full focus trap
 * this codebase doesn't otherwise implement.
 *
 * `person` is null when closed; AnimatePresence needs the exiting element to
 * still be in the tree for its exit animation, so the open/close boolean is
 * `person !== null` rather than unmounting immediately.
 */
export default function TeamModal({
  person,
  onClose,
  accent,
}: {
  person: Person | null;
  onClose: () => void;
  accent: string;
}) {
  const reduced = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!person) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [person, onClose]);

  const tags = person ? teamTags(person) : [];

  return (
    <AnimatePresence>
      {person ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy/70 p-4 md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0.01 : 0.2 }}
          onClick={(e) => {
            // Backdrop only — clicks inside the panel shouldn't close it.
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="team-modal-name"
            // data-lenis-prevent: Lenis (see smooth-scroll.tsx) listens for
            // wheel events on the whole window and hijacks them to drive its
            // own virtual scroll, which otherwise stops this panel's native
            // overflow-y-auto from ever seeing the event — trackpad and
            // mouse-wheel scroll inside the modal did nothing at all without
            // this. `modal-scroll` is the custom scrollbar skin, in
            // globals.css.
            data-lenis-prevent
            className="modal-scroll relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-card bg-cream p-7 text-ink md:p-12"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: reduced ? 0.01 : 0.25, ease: "easeOut" }}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center text-navy md:right-6 md:top-6"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="5" y1="5" x2="19" y2="19" />
                  <line x1="19" y1="5" x2="5" y2="19" />
                </g>
              </svg>
            </button>

            <div className="grid gap-6 pr-10 sm:grid-cols-[9rem_1fr] sm:items-start sm:pr-0">
              <Portrait
                name={person.name}
                src={person.photo}
                sizes="144px"
                className="w-28 sm:w-36"
              />
              <div>
                <h2
                  id="team-modal-name"
                  className="font-display text-h2 font-bold text-navy"
                >
                  {person.name}
                </h2>
                {person.pronouns ? (
                  <p className="mt-2 font-body text-body text-navy">
                    ({person.pronouns})
                  </p>
                ) : null}
                <p className={`mt-2 font-body text-body ${accent}`}>{person.role}</p>

                {tags.length ? (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {tags.map((t) => (
                      <li
                        key={t}
                        className="rounded-chip border border-navy px-3 py-1 font-body text-small text-navy"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>

            <div className="mt-8 space-y-4 border-t border-navy/15 pt-8">
              {person.bio.map((p, i) => (
                <p key={i} className="max-w-[65ch] text-body">
                  {p}
                </p>
              ))}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
