import Image from "next/image";

/**
 * A person's photograph.
 *
 * Until headshots arrive, this falls back to their initials set in Antonio on a
 * brand colour — a monogram rather than a motif, because a face-shaped slot
 * wants something human in it, and initials stay legible at every size.
 *
 * The colour is picked deterministically from the name, so each person keeps the
 * same monogram across renders and pages instead of shuffling on every build.
 *
 * No `resolveSrc()` build-time file check here (contrast <Figure>) — this
 * component now renders inside <TeamGrid>/<TeamModal>, both client
 * components, and `resolveSrc` reads the filesystem via `node:fs`, which
 * cannot be bundled for the browser at all, not just deferred. `src` is
 * trusted directly instead, the same way <HeroCarousel> already trusts
 * `HERO_STRIP` image paths client-side: correct by construction, since
 * `lib/content.ts` only sets a `photo` path once the file is actually in
 * `public/images/team`.
 */

/**
 * Each tone carries its own verified text colour (CLAUDE.md §0.5) — cream on
 * teal is only 2.5:1, so the pairing cannot be assumed.
 *
 * Navy is deliberately absent: the advisory board sits on a navy section, and a
 * navy monogram there would disappear. These four stay legible on cream,
 * cream-2 and navy alike.
 */
const MONOGRAM_TONES = [
  "bg-purple text-cream",
  "bg-maroon text-cream",
  "bg-teal text-black",
  "bg-slate text-black",
] as const;

function initials(name: string) {
  return name
    .replace(/^(Dr\.?|Prof\.?)\s+/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

function toneFor(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return MONOGRAM_TONES[h % MONOGRAM_TONES.length];
}

export default function Portrait({
  name,
  src,
  sizes = "(min-width: 1024px) 22vw, 40vw",
  className,
}: {
  name: string;
  src?: string;
  sizes?: string;
  className?: string;
}) {
  const shape = `relative overflow-hidden aspect-[4/5] ${className ?? ""}`;

  if (!src) {
    return (
      <div
        className={`${shape} ${toneFor(name)} flex items-center justify-center`}
        aria-hidden="true"
      >
        <span className="font-display text-h1 font-bold leading-none">
          {initials(name)}
        </span>
      </div>
    );
  }

  return (
    <div className={shape}>
      <Image
        src={src}
        alt={`${name}, Delhi Arts & Health Festival`}
        fill
        sizes={sizes}
        className="object-cover"
      />
    </div>
  );
}
