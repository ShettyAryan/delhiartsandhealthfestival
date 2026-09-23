import type { Metadata } from "next";
import ColorSection from "@/components/color-section";
import TeamGrid from "@/components/team-grid";
import { ADVISORY_BOARD, ADVISORY_INTRO } from "@/lib/content";

export const metadata: Metadata = {
  title: "Advisory Board",
  description:
    "The advisory board guiding the Delhi Arts & Health Festival across creative arts therapies, healthcare, accessibility, research, and public art.",
};

export default function AdvisoryBoardPage() {
  return (
    <>
      <ColorSection tone="cream" className="pt-8 md:pt-12">
        <p className="font-eyebrow text-eyebrow text-maroon">Advisory Board</p>
        <h1 className="mt-4 font-display text-h1 font-bold text-navy">
          {ADVISORY_INTRO.heading}
        </h1>
      </ColorSection>

      <ColorSection tone="navy">
        <TeamGrid people={ADVISORY_BOARD} accent="text-yellow" />
      </ColorSection>
    </>
  );
}
