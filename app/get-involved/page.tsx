import type { Metadata } from "next";
import ColorSection from "@/components/color-section";
import CTAButton from "@/components/cta-button";
import { GET_INVOLVED } from "@/lib/content";

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "Join the team, partner with us, or share your practice at Delhi's first Arts and Health Festival.",
};

/** Accent top rule per path, matching the colour each used to have as a
 * full-bleed block. Literal map so Tailwind's scanner sees the classes. */
const BORDER: Record<string, string> = {
  pink: "border-pink",
  teal: "border-teal",
  yellow: "border-yellow",
};

export default function GetInvolvedPage() {
  return (
    <>
      {/*
        The three paths are three cards in one row now (they used to be three
        stacked full-bleed colour blocks with an image each). The heading is
        held to one line from `lg` up — the same clamp/nowrap treatment as the
        homepage's closing CTA, since a 48-character title can't be one line
        at phone widths at any readable size, and wraps there instead.
      */}
      <ColorSection tone="cream" className="pt-8 md:pt-12">
        <h1 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.05] text-navy lg:whitespace-nowrap">
          {GET_INVOLVED.heading}
        </h1>
        <p className="mt-6 max-w-[62ch] text-lead">{GET_INVOLVED.intro}</p>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {GET_INVOLVED.paths.map((p) => (
            <div
              key={p.heading}
              className={`flex flex-col rounded-card border-t-4 bg-cream-2 p-8 ${BORDER[p.bg]}`}
            >
              <h2 className="font-display text-h3 font-semibold text-navy">
                {p.heading}
              </h2>
              <p className="mt-4 text-body">{p.body}</p>
              <div className="mt-auto pt-8">
                <CTAButton href={p.href} external>
                  {p.cta}
                </CTAButton>
              </div>
            </div>
          ))}
        </div>
      </ColorSection>
    </>
  );
}
