import type { Metadata } from "next";
import ColorSection from "@/components/color-section";
import TeamGrid from "@/components/team-grid";
import MuralBandStatic from "@/components/mural-band-static";
import { COMMITTEE, LEADERSHIP } from "@/lib/content";

export const metadata: Metadata = {
  title: "Festival Team",
  description:
    "The festival leadership and working committees behind the Delhi Arts & Health Festival.",
};

export default function FestivalTeamPage() {
  return (
    <>
      {/* Opens straight on Festival Leadership — no separate page intro. It is
          the page's <h1>, at the usual section-heading size. Leadership sits
          as a centred lead (Dr Kunle Adewale) over the other three directors. */}
      <ColorSection tone="cream" className="pt-8 md:pt-12">
        <h1 className="font-display text-h2 font-bold text-navy">
          Festival Leadership
        </h1>
        <div className="mt-6">
          <TeamGrid
            people={LEADERSHIP}
            accent="text-pink"
            columns="sm:grid-cols-2 md:grid-cols-3"
            centerFirst
          />
        </div>
      </ColorSection>

      <MuralBandStatic id="team-mural" />

      <ColorSection tone="cream-2">
        <h2 className="font-display text-h2 font-bold text-navy">
          Committees and wider team
        </h2>

        <div className="mt-12">
          <TeamGrid people={COMMITTEE} accent="text-maroon" />
        </div>
      </ColorSection>
    </>
  );
}
