import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import Motif from "@/components/motif";
import type { FestivalImage } from "@/lib/content";

/**
 * Resolve a local `src` only if the file is actually present in /public.
 *
 * Every slot below already names the photograph it expects, but the files are
 * delivered separately. Without this check a missing file ships a broken image;
 * with it, the slot keeps its motif placeholder and swaps to the photo the
 * moment the file lands — no code change, no redeploy of the layout.
 *
 * Safe to do here: this is a server component, every page is statically
 * prerendered, so the check runs at build time and costs nothing at runtime.
 */
export function resolveSrc(src?: string): string | undefined {
  if (!src) return undefined;
  if (/^https?:\/\//.test(src)) return src;
  return existsSync(path.join(process.cwd(), "public", src)) ? src : undefined;
}

/**
 * A photographic slot.
 *
 * The homepage is photographed; the other pages are not yet (CLAUDE.md §0.7).
 * When `src` is absent this stands a whole folk-motif tile on a warm field
 * instead of a grey box, so those pages still read as finished, and a real photo
 * drops in by setting one field in `lib/content.ts` — no layout work.
 *
 * The placeholder is `aria-hidden`: announcing alt text for a photo that is not
 * there yet would describe something no one can see. The alt travels with the
 * slot regardless, so it is already correct the moment `src` appears.
 */

export const RATIOS = {
  wide: "aspect-[16/9]",
  landscape: "aspect-[3/2]",
  square: "aspect-square",
  portrait: "aspect-[4/5]",
  tall: "aspect-[3/4]",
} as const;

export type Ratio = keyof typeof RATIOS;

export default function Figure({
  image,
  ratio = "landscape",
  priority = false,
  sizes = "100vw",
  className,
  rounded = false,
}: {
  image: FestivalImage;
  ratio?: Ratio;
  priority?: boolean;
  sizes?: string;
  className?: string;
  rounded?: boolean;
}) {
  const shape = `relative overflow-hidden ${RATIOS[ratio]} ${rounded ? "rounded-card" : ""} ${className ?? ""}`;
  const src = resolveSrc(image.src);

  if (!src) {
    // A whole motif tile centred on a warm field, rather than a motif cropped to
    // the slot — a cropped one reads as an abstract blob in tall boxes. Sized off
    // whichever axis is scarce so it fits any ratio without overflowing.
    const inner = ratio === "tall" || ratio === "portrait" ? "w-[58%]" : "h-[52%]";
    return (
      <div
        className={`${shape} grid place-items-center bg-cream-2`}
        aria-hidden="true"
      >
        <Motif
          variant={image.motif ?? "daisy"}
          fit="meet"
          className={`${inner} aspect-square`}
        />
      </div>
    );
  }

  return (
    <div className={shape}>
      <Image
        src={src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}
