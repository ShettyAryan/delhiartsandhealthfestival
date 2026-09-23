"use client";

import { useRef, useState } from "react";
import Portrait from "@/components/portrait";
import TeamModal from "@/components/team-modal";
import type { Person } from "@/lib/content";

/**
 * A grid of team members, each a clickable card opening the full profile in
 * <TeamModal>. Replaces the old editorial <PersonCard> ("full" and "compact"
 * variants) across every roster on the page — Leadership, Committee,
 * Advisory Board, and Consultants all use this now, on request.
 *
 * Worth flagging: a bordered, padded card is exactly what §2 names as an
 * AI-designer default ("every section wrapped in a rounded card with the
 * same soft shadow"). What's built keeps the client's ask but not the
 * cliché version of it — flat, no shadow, a crisp border rather than a soft
 * one, using the existing `rounded-card` token rather than an arbitrary
 * radius.
 *
 * Card shows only image, name, designation, and the first few lines of the
 * bio — no tags here. Tags are a modal-only device (CLAUDE.md §2 also rules
 * out middle-dot meta strings, which is exactly what a tag preview crammed
 * onto a card would turn into).
 */
export default function TeamGrid({
  people,
  accent = "text-pink",
  columns = "sm:grid-cols-2 lg:grid-cols-3",
  centerFirst = false,
}: {
  people: Person[];
  accent?: string;
  columns?: string;
  /** Three-column layout with the first person alone, centred, on row 1 and
   * everyone else on row 2 in order (used for Festival Leadership). Applies
   * from `md` up — pass a matching `columns` (md:grid-cols-3). */
  centerFirst?: boolean;
}) {
  const [active, setActive] = useState<Person | null>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);

  // Focus returns to the card that opened the modal, not lost to <body> —
  // the same courtesy <MobileMenu> pays its own trigger button.
  const close = () => {
    setActive(null);
    lastTrigger.current?.focus();
  };

  return (
    <>
      {/*
        items-stretch (grid's own default, made explicit) stretches every
        <li> in a row to match the tallest one — a longer name or role
        wrapping an extra line would otherwise leave neighbouring cards
        shorter. h-full on the button fills that stretched height in turn,
        since a block child doesn't inherit a stretched parent's height on
        its own; flex-col then lets the bio line-clamp sit wherever the
        button's own content ends rather than needing every card's internal
        layout to match line-for-line.
      */}
      <ul className={`grid items-stretch gap-4 ${columns}`}>
        {people.map((p, i) => (
          <li
            key={p.name}
            className={`h-full ${
              !centerFirst
                ? ""
                : i === 0
                  ? "md:col-start-2 md:row-start-1"
                  : `md:row-start-2 ${
                      ["md:col-start-1", "md:col-start-2", "md:col-start-3"][i - 1] ?? ""
                    }`
            }`}
          >
            <button
              type="button"
              onClick={(e) => {
                lastTrigger.current = e.currentTarget;
                setActive(p);
              }}
              aria-haspopup="dialog"
              aria-label={`View full profile: ${p.name}`}
              className="group flex h-full w-full flex-col gap-3 rounded-card border border-current/20 p-4 text-left transition-[transform,border-color] duration-200 hover:scale-[1.02] hover:border-current/50 lg:flex-row lg:gap-4"
            >
              {/* Compact card: a small portrait (stacked above the text
                  below `lg`, beside it from `lg` up) rather than a
                  full-column-width one, so both rows of Festival Leadership
                  fit on one screen. Sized the same on every roster. */}
              <Portrait
                name={p.name}
                src={p.photo}
                sizes="112px"
                className="w-24 shrink-0 lg:w-28"
              />
              <div className="min-w-0">
                <h3 className="font-display text-[clamp(1.125rem,1.5vw,1.375rem)] font-semibold leading-tight">
                  {p.name}
                </h3>
                {p.pronouns ? (
                  <p className="mt-1.5">
                    <span className="inline-block rounded-chip border border-current px-2.5 font-body text-small font-medium leading-normal">
                      {p.pronouns}
                    </span>
                  </p>
                ) : null}
                <p className={`mt-1.5 font-body text-small leading-snug ${accent}`}>
                  {p.role}
                </p>
                <p className="mt-2 line-clamp-2 text-small leading-snug">
                  {p.bio[0]}
                </p>
              </div>
            </button>
          </li>
        ))}
      </ul>

      <TeamModal person={active} onClose={close} accent={accent} />
    </>
  );
}
