import type { ReactNode } from "react";

/**
 * Full-bleed colour block with a constrained inner column.
 * Colour is content (CLAUDE.md §2) — these mark shifts in mood and topic.
 *
 * No border radius: §5.1 gives colour-blocked sections `radius-block: 0`.
 */
export type SectionTone =
  | "cream"
  | "cream-2"
  | "navy"
  | "teal"
  | "pink"
  | "yellow"
  | "red"
  | "lime"
  | "purple"
  | "slate"
  | "maroon";

/**
 * Background + a text colour measured to clear WCAG AA against it (§9).
 *
 * Pink and red take BLACK, not cream. §3.1 says to adjust the text to cream or
 * white on colour, but neither reaches 4.5:1 on these two — cream on pink is
 * 3.3:1 and white only 4.0:1, so body copy would fail at any size. Black gives
 * 5.2:1 on pink and 5.1:1 on red, and reads as block-print rather than harsh.
 *
 * Measured ratios: navy/cream 14.4 · teal/black 7.0 · pink/black 5.2 ·
 * red/black 5.1 · purple/cream 5.6 · maroon/cream 6.8 · slate/black 5.7.
 */
const TONES: Record<SectionTone, string> = {
  cream: "bg-cream text-ink",
  "cream-2": "bg-cream-2 text-ink",
  navy: "bg-navy text-cream",
  teal: "bg-teal text-black",
  pink: "bg-pink text-black",
  yellow: "bg-yellow text-black",
  red: "bg-red text-black",
  lime: "bg-lime text-black",
  purple: "bg-purple text-cream",
  slate: "bg-slate text-black",
  maroon: "bg-maroon text-cream",
};

export default function ColorSection({
  tone = "cream",
  children,
  id,
  className,
  as: Tag = "section",
}: {
  tone?: SectionTone;
  children: ReactNode;
  id?: string;
  className?: string;
  as?: "section" | "div" | "footer";
}) {
  return (
    <Tag
      id={id}
      className={`${TONES[tone]} px-section-x py-section-y ${className ?? ""}`}
    >
      <div className="mx-auto w-full max-w-360">{children}</div>
    </Tag>
  );
}
