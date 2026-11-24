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
function PartnerTile({
  p,
  sizes,
  className,
}: {
  p: Partner;
  sizes: string;
  className?: string;
}) {
  return (
    <li className={className}>
      <div className="relative aspect-square rounded-card border border-navy/10 bg-white">
        <Image
          src={`/images/partners/${p.slug}.png`}
          alt={`${p.name} logo`}
          fill
          sizes={sizes}
          className="object-contain p-4 md:p-5"
        />
      </div>
      <p className="mt-3 text-small font-medium leading-snug text-ink">{p.name}</p>
    </li>
  );
}

/**
 * The partnership types as a ruled list: type on the left, logos on the
 * right. Every row's logos sit on the same five-column grid, so tiles line
 * up vertically down the whole section whether a type has one partner or
 * fourteen (an earlier flex-wrap version packed types side by side, and
 * because each type was a different width nothing lined up).
 *
 * Stacked below `lg`, where the label sits above its logos.
 */
function GroupList({ groups }: { groups: readonly PartnerGroup[] }) {
  return (
    <div className="divide-y divide-navy/10 border-y border-navy/10">
      {groups.map((g) => (
        <div key={g.type} className="grid gap-6 py-8 md:py-10 lg:grid-cols-12 lg:gap-8">
          <h3 className="font-display text-h3 font-semibold text-maroon lg:col-span-3">
            {g.type}
          </h3>
          <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:col-span-9 lg:grid-cols-5">
            {g.partners.map((p) => (
              <PartnerTile
                key={p.slug}
                p={p}
                sizes="(min-width: 1024px) 13vw, (min-width: 768px) 22vw, (min-width: 640px) 30vw, 45vw"
              />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/**
 * For sections where every type has only a few partners (the festival
 * partners: one to three each). The ruled list above would leave most of each
 * row empty, so the types become cells instead, three across on desktop,
 * each with a fixed three-column logo grid.
 *
 * Each cell is a two-row subgrid of the outer grid, so a label that wraps to
 * two lines pushes every cell in that row down together: the logo tiles
 * share one top edge across the row as well as one set of columns.
 */
function GroupGrid({ groups }: { groups: readonly PartnerGroup[] }) {
  return (
    <div className="grid gap-x-10 gap-y-14 md:grid-cols-2 xl:grid-cols-3">
      {groups.map((g) => (
        <div
          key={g.type}
          className="row-span-2 grid grid-rows-subgrid gap-y-5 border-t border-navy/10 pt-6"
        >
          <h3 className="font-display text-h3 font-semibold text-maroon">{g.type}</h3>
          <ul className="grid grid-cols-3 items-start gap-4">
            {g.partners.map((p) => (
              <PartnerTile
                key={p.slug}
                p={p}
                sizes="(min-width: 1280px) 9vw, (min-width: 768px) 14vw, 28vw"
              />
            ))}
          </ul>
        </div>
      ))}
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
        {PARTNERS.associates.map((g) => (
          <div key={g.type}>
            <h2 className="mt-12 font-display text-h2 font-bold text-navy">{g.type}</h2>
            <ul className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5 lg:gap-8">
              {g.partners.map((p) => (
                <PartnerTile
                  key={p.slug}
                  p={p}
                  sizes="(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 45vw"
                />
              ))}
            </ul>
          </div>
        ))}
      </ColorSection>

      <ColorSection tone="cream-2">
        <h2 className="font-display text-h2 font-bold text-navy">
          {PARTNERS.festivalHeading}
        </h2>
        <div className="mt-10">
          <GroupGrid groups={PARTNERS.festival} />
        </div>
      </ColorSection>

      <MuralBandStatic id="partners-mural" />

      <ColorSection tone="cream">
        <h2 className="font-display text-h2 font-bold text-navy">
          {PARTNERS.preFestivalHeading}
        </h2>
        <div className="mt-10">
          <GroupList groups={PARTNERS.preFestival} />
        </div>
      </ColorSection>
    </>
  );
}
