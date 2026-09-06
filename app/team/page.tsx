import type { Metadata } from "next";
import ColorSection from "@/components/color-section";
import TeamGrid from "@/components/team-grid";
import MuralBandStatic from "@/components/mural-band-static";
import {
  ADVISORY_BOARD,
  ADVISORY_INTRO,
  COMMITTEE,
  CONSULTANTS,
  CONSULTANTS_INTRO,
  LEADERSHIP,
  TEAM_INTRO,
  WIDER_TEAM_NOTE,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Team",
  description:
    "The festival leadership, working committees, advisory board, and consultants behind the Delhi Arts & Health Festival.",
};

export default function TeamPage() {
  return (
    <>
      <ColorSection tone="cream">
        <h1 className="max-w-[16ch] font-display text-h1 font-bold text-navy">
          {TEAM_INTRO.heading}
        </h1>
        <p className="mt-8 max-w-[62ch] text-lead">{TEAM_INTRO.body}</p>
      </ColorSection>

      {/*
        Every roster on this page is now the same clickable card grid —
        image, name, designation, and a first line of bio, opening the full
        profile in a modal on click. Replaces the old "full" (editorial
        spread) and "compact" (small inline portrait) treatments, on request
        — see components/team-grid.tsx for the trade-off that's worth
        knowing about.
      */}
      <ColorSection tone="cream">
        <h2 className="font-display text-h2 font-bold text-navy">
          Festival Leadership
        </h2>
        <div className="mt-12">
          <TeamGrid
            people={LEADERSHIP}
            accent="text-pink"
            columns="sm:grid-cols-2 lg:grid-cols-4"
          />
        </div>
      </ColorSection>

      <MuralBandStatic id="team-mural" />

      {/* Wider team + committee heads. id matches the header nav's Team >
          Festival Team dropdown link. scroll-mt clears the sticky header
          (h-16/h-18) so the jump doesn't land the heading underneath it. */}
      <ColorSection tone="cream-2" id="festival-team" className="scroll-mt-24">
        <h2 className="font-display text-h2 font-bold text-navy">
          Festival team
        </h2>
        <p className="mt-6 max-w-[62ch] text-lead">{WIDER_TEAM_NOTE}</p>

        <div className="mt-14">
          <TeamGrid people={COMMITTEE} accent="text-maroon" />
        </div>
      </ColorSection>

      {/* Advisory Board. id matches the header nav's Team > Advisory Board
          dropdown link. */}
      <ColorSection tone="navy" id="advisory-board" className="scroll-mt-24">
        <h2 className="font-display text-h2 font-bold">
          {ADVISORY_INTRO.heading}
        </h2>
        <p className="mt-6 max-w-[62ch] text-lead">{ADVISORY_INTRO.body}</p>

        <div className="mt-14">
          <TeamGrid people={ADVISORY_BOARD} accent="text-yellow" />
        </div>
      </ColorSection>

      {/* Consultants — inset, on a different surface */}
      <ColorSection tone="cream-2">
        <div className="border-2 border-maroon p-8 md:p-14">
          <h2 className="font-display text-h2 font-bold text-maroon">
            {CONSULTANTS_INTRO.heading}
          </h2>
          <p className="mt-6 max-w-[62ch] text-lead">{CONSULTANTS_INTRO.body}</p>

          <div className="mt-12">
            <TeamGrid people={CONSULTANTS} accent="text-maroon" />
          </div>
        </div>
      </ColorSection>
    </>
  );
}
