import type { Metadata } from "next";
import ColorSection from "@/components/color-section";
import TeamGrid from "@/components/team-grid";
import MuralBandStatic from "@/components/mural-band-static";
import { ADVISORY_BOARD, ADVISORY_INTRO, CONSULTANTS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Advisory Board & Consultants",
  description:
    "The advisors and consultants guiding the Delhi Arts & Health Festival across creative arts therapies, healthcare, accessibility, research, and public art.",
};

export default function AdvisoryBoardPage() {
  return (
    <>
      {/* Same treatment as the Festival Team page: cream sections, the shared
          card grid, a mural band between the two groups. */}
      <ColorSection tone="cream" className="pt-8 md:pt-12">
        <h1 className="font-display text-h1 font-bold text-navy">
          {ADVISORY_INTRO.heading}
        </h1>
        <div className="mt-5 h-1.5 w-16 bg-teal" />

        <h2 className="mt-10 font-display text-h2 font-bold text-navy">Advisors</h2>
        <div className="mt-6">
          <TeamGrid people={ADVISORY_BOARD} accent="text-maroon" />
        </div>
      </ColorSection>

      <MuralBandStatic id="advisory-mural" />

      <ColorSection tone="cream-2">
        <h2 className="font-display text-h2 font-bold text-navy">Consultants</h2>
        <div className="mt-6">
          <TeamGrid people={CONSULTANTS} accent="text-maroon" />
        </div>
      </ColorSection>
    </>
  );
}
