import type { Metadata } from "next";
import Image from "next/image";
import ColorSection from "@/components/color-section";
import MuralBandStatic from "@/components/mural-band-static";
import { PARTNERS, type Partner, type PartnerGroup } from "@/lib/content";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "The organisations, venues and collectives partnering with the Delhi Arts & Health Festival, 2 to 6 December 2026.",
};

/**
 * One logo on a white card with the partner's name set beneath it. Every
 * logo sits in the same square, `object-contain`, so wide wordmarks and
 * round seals read at a comparable weight. Most supplied logos carry their
 * own white ground, which is why the card is white rather than cream-2:
 * the edge of the artwork disappears into it instead of showing as a box.
 */
function PartnerTile({ p, size = "md" }: { p: Partner; size?: "md" | "lg" }) {
  return (
    <li className={size === "lg" ? "w-full" : "w-36 md:w-44"}>
      <div className="relative aspect-square rounded-card border border-navy/10 bg-white">
        <Image
          src={`/images/partners/${p.slug}.png`}
          alt={`${p.name} logo`}
          fill
          sizes={size === "lg" ? "(min-width: 1024px) 18vw, 45vw" : "176px"}
          className="object-contain p-4 md:p-5"
        />
      </div>
      <p className="mt-3 text-small font-medium leading-snug text-ink">{p.name}</p>
    </li>
  );
}

/** The partnership type is the label; the logos follow it. */
function TypeLabel({ children }: { children: string }) {
  return <h3 className="font-display text-h3 font-semibold text-maroon">{children}</h3>;
}

function Group({ g }: { g: PartnerGroup }) {
  return (
    <div>
      <TypeLabel>{g.type}</TypeLabel>
      <ul className="mt-5 flex flex-wrap gap-5">
        {g.partners.map((p) => (
          <PartnerTile key={p.slug} p={p} />
        ))}
      </ul>
    </div>
  );
}

export default function PartnersPage() {
  return (
    <>
      <ColorSection tone="cream" className="pt-8 md:pt-12">
        <h1 className="font-display text-h1 font-bold text-navy">{PARTNERS.heading}</h1>
        <div className="mt-5 h-1.5 w-16 bg-teal" />

        {/* The organisations the festival is made with: given the most room,
            five across on desktop. */}
        <h2 className="mt-12 font-display text-h2 font-bold text-navy">
          {PARTNERS.associates.type}
        </h2>
        <ul className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5 lg:gap-8">
          {PARTNERS.associates.partners.map((p) => (
            <PartnerTile key={p.slug} p={p} size="lg" />
          ))}
        </ul>
      </ColorSection>

      {/* Most types have one or two partners, so a heading-per-type stack
          would be mostly air. The groups pack into a wrapping flow instead,
          each sized by how many logos it holds. */}
      <ColorSection tone="cream-2">
        <h2 className="font-display text-h2 font-bold text-navy">
          {PARTNERS.festivalHeading}
        </h2>
        <div className="mt-10 flex flex-wrap gap-x-14 gap-y-12">
          {PARTNERS.festival.map((g) => (
            <Group key={g.type} g={g} />
          ))}
        </div>
      </ColorSection>

      <MuralBandStatic id="partners-mural" />

      <ColorSection tone="cream">
        <h2 className="font-display text-h2 font-bold text-navy">
          {PARTNERS.preFestivalHeading}
        </h2>
        <div className="mt-10 space-y-14">
          {PARTNERS.preFestival.map((g) => (
            <Group key={g.type} g={g} />
          ))}
        </div>
      </ColorSection>
    </>
  );
}
