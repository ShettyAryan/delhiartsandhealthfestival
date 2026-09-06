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
}: {
  people: Person[];
  accent?: string;
  columns?: string;
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
      <ul className={`grid items-stretch gap-6 ${columns}`}>
        {people.map((p) => (
          <li key={p.name} className="h-full">
            <button
              type="button"
              onClick={(e) => {
                lastTrigger.current = e.currentTarget;
                setActive(p);
              }}
              aria-haspopup="dialog"
              aria-label={`View full profile: ${p.name}`}
              className="group flex h-full w-full flex-col rounded-card border border-current/20 p-5 text-left transition-[transform,border-color] duration-200 hover:scale-[1.03] hover:border-current/50"
            >
              <Portrait
                name={p.name}
                src={p.photo}
                sizes="(min-width: 1024px) 22vw, (min-width: 640px) 40vw, 80vw"
                className="w-full"
              />
              <h3 className="mt-4 font-display text-h3 font-semibold">
                {p.name}
              </h3>
              <p className={`mt-1 font-body text-small ${accent}`}>{p.role}</p>
              <p className="mt-3 line-clamp-3 text-body">{p.bio[0]}</p>
            </button>
          </li>
        ))}
      </ul>

      <TeamModal person={active} onClose={close} accent={accent} />
    </>
  );
}
