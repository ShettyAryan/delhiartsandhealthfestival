"use client";

import { useState, type ReactNode } from "react";

const ARROWS = [
  { label: "Previous image", d: "M15 4 L7 12 L15 20", step: -1 },
  { label: "Next image", d: "M9 4 L17 12 L9 20", step: 1 },
] as const;

/**
 * Manual image carousel for a pre-festival event. No auto-advance, so it adds
 * no motion (and needs no pause control) — the dots and arrows are the only
 * way through. With a single image the controls are not rendered.
 *
 * Slides arrive as server-rendered nodes: Figure checks /public with node:fs,
 * which a client component cannot import.
 */
export default function EventCarousel({ slides }: { slides: ReactNode[] }) {
  const [index, setIndex] = useState(0);
  const count = slides.length;
  const go = (n: number) => setIndex(((n % count) + count) % count);

  return (
    <div role="group" aria-roledescription="carousel" aria-label="Event photographs">
      {slides[index]}
      {count > 1 ? (
        <div className="mt-3 flex items-center justify-between">
          <ul className="flex items-center">
            {slides.map((_, i) => (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Show image ${i + 1} of ${count}`}
                  aria-current={i === index ? "true" : undefined}
                  className="flex h-6 w-6 items-center justify-center"
                >
                  <span
                    aria-hidden="true"
                    className={`block h-2.5 w-2.5 rounded-chip border border-navy ${
                      i === index ? "bg-navy" : "bg-transparent"
                    }`}
                  />
                </button>
              </li>
            ))}
          </ul>
          <div className="flex gap-2">
            {ARROWS.map((b) => (
              <button
                key={b.label}
                type="button"
                onClick={() => go(index + b.step)}
                aria-label={b.label}
                className="flex h-10 w-10 items-center justify-center rounded-chip border-2 border-navy text-navy hover:bg-navy hover:text-cream"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden="true"
                >
                  <path d={b.d} />
                </svg>
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
