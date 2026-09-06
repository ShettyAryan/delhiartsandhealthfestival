import type { Metadata } from "next";
import ColorSection from "@/components/color-section";
import Figure from "@/components/figure";
import { GET_INVOLVED } from "@/lib/content";

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "Join the team, partner with us, or bring your practice to Delhi's first Arts and Health Festival.",
};

/**
 * Text and CTA colours measured against each block (§9). Pink takes black
 * rather than cream — cream on pink is 3.3:1, below AA at body size.
 */
const BLOCK: Record<string, { bg: string; cta: string }> = {
  pink: { bg: "bg-pink text-black", cta: "bg-navy text-cream hover:bg-black" },
  teal: { bg: "bg-teal text-black", cta: "bg-navy text-cream hover:bg-black" },
  yellow: { bg: "bg-yellow text-black", cta: "bg-navy text-cream hover:bg-black" },
};

export default function GetInvolvedPage() {
  return (
    <>
      <ColorSection tone="cream">
        <h1 className="max-w-[18ch] font-display text-h1 font-bold text-navy">
          {GET_INVOLVED.heading}
        </h1>
        <p className="mt-8 max-w-[62ch] text-lead">{GET_INVOLVED.intro}</p>
      </ColorSection>

      {/* Three paths as three full colour blocks, stacked */}
      {GET_INVOLVED.paths.map((p) => {
        const style = BLOCK[p.bg] ?? BLOCK.pink;
        return (
          <section
            key={p.heading}
            className={`px-section-x py-section-y ${style.bg}`}
            aria-labelledby={p.heading.replace(/\s+/g, "-").toLowerCase()}
          >
            <div className="mx-auto grid w-full max-w-360 items-center gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-7">
                <h2
                  id={p.heading.replace(/\s+/g, "-").toLowerCase()}
                  className="font-display text-h2 font-bold"
                >
                  {p.heading}
                </h2>
                <p className="mt-6 max-w-[58ch] text-lead">{p.body}</p>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-8 inline-flex rounded-chip px-7 py-3.5 font-body text-body font-medium transition-colors ${style.cta}`}
                >
                  {p.cta}
                </a>
              </div>

              <Figure
                image={p.image}
                ratio="landscape"
                sizes="(min-width: 1024px) 34vw, 100vw"
                className="lg:col-span-4 lg:col-start-9"
              />
            </div>
          </section>
        );
      })}
    </>
  );
}
