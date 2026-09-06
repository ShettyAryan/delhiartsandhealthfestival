import Figure from "@/components/figure";
import type { FestivalImage } from "@/lib/content";

/** Text colour measured to clear AA on each fill (CLAUDE.md §0.5). */
const TONES: Record<string, string> = {
  pink: "bg-pink text-black",
  yellow: "bg-yellow text-black",
  red: "bg-red text-black",
  lime: "bg-lime text-black",
  purple: "bg-purple text-cream",
};

/**
 * One experience pathway: a full-bleed colour block paired with an image.
 *
 * The image sits flush to the outer edge and alternates side down the stack, so
 * the five blocks zigzag rather than repeating one template — an editorial
 * rhythm rather than five identical cards (§2). The colour still does the
 * separating; the photo gives each pathway a face.
 */
export default function PathwayCard({
  term,
  body,
  tone,
  image,
  flip = false,
}: {
  term: string;
  body: string;
  tone: string;
  image: FestivalImage;
  flip?: boolean;
}) {
  return (
    <div className={TONES[tone] ?? TONES.pink}>
      <div
        className={`flex flex-col ${flip ? "md:flex-row-reverse" : "md:flex-row"}`}
      >
        <Figure
          image={image}
          ratio="landscape"
          sizes="(min-width: 768px) 38vw, 100vw"
          className="w-full md:aspect-auto md:w-[38%] md:shrink-0"
        />

        <div className="flex flex-1 items-center px-section-x py-12 md:min-h-[22rem] md:py-16">
          <div className="w-full">
            <h3 className="font-display text-h2 font-bold">{term}</h3>
            <p className="mt-4 max-w-[46ch] text-lead">{body}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
