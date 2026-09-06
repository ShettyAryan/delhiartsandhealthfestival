/**
 * One folk-art mural motif, rebuilt as SVG on a 100×100 tile.
 *
 * Corrected against the press-kit artwork (CLAUDE.md §0.3 — §3.3 describes
 * these from memory and gets three details wrong):
 *
 *   daisy  — 8 cream petals, red centre, on PURPLE (§3.3 says cream)
 *   stairs — cream scalloped step-wave on mural-blue, red arch anchor
 *   star   — EIGHT-pointed mural-green star, yellow cushion centre, on pink
 *            (§3.3 says six-pointed)
 *   kalash — red goblet on yellow
 *
 * Rendered flat. The source artwork carries a grain texture and soft radial
 * gradients; those are deliberately dropped — §2 rules out gradient washes as
 * decoration, and per-tile SVG filters would cost more than they return against
 * the Lighthouse budget in §9.
 */

export type MotifVariant = "daisy" | "stairs" | "star" | "kalash";

export const MOTIF_ORDER: readonly MotifVariant[] = [
  "daisy",
  "stairs",
  "star",
  "kalash",
];

/** Eight-pointed star: alternating outer/inner radii, 16 vertices. */
function starPoints(cx = 50, cy = 50, outer = 48, inner = 21) {
  return Array.from({ length: 16 }, (_, i) => {
    const r = i % 2 === 0 ? outer : inner;
    const a = (Math.PI / 8) * i - Math.PI / 2;
    return `${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`;
  }).join(" ");
}

function Daisy() {
  return (
    <>
      <rect width="100" height="100" fill="var(--color-purple)" />
      {Array.from({ length: 8 }, (_, i) => (
        <rect
          key={i}
          x="42"
          y="4"
          width="16"
          height="33"
          rx="8"
          fill="var(--color-mural-cream)"
          transform={`rotate(${i * 45} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="21" fill="var(--color-red)" />
    </>
  );
}

function Stairs() {
  return (
    <>
      <rect width="100" height="100" fill="var(--color-mural-blue)" />
      {/* Scalloped staircase: five treads, each a semicircular bump, dropping
          left-to-right. The cream fills everything below and left of it. */}
      <path
        d="M0 0
           a10 10 0 0 1 20 0 v20
           a10 10 0 0 1 20 0 v20
           a10 10 0 0 1 20 0 v20
           a10 10 0 0 1 20 0 v20
           a10 10 0 0 1 20 0 v20
           H0 Z"
        fill="var(--color-mural-cream)"
      />
      {/* Red arch anchor */}
      <path
        d="M24 100 V74 a10 10 0 0 1 20 0 V100 Z"
        fill="var(--color-red)"
      />
    </>
  );
}

function Star() {
  return (
    <>
      <rect width="100" height="100" fill="var(--color-pink)" />
      <polygon points={starPoints()} fill="var(--color-mural-green)" />
      {/* Yellow cushion centre — concave-sided diamond */}
      <path
        d="M50 38 Q56 44 62 50 Q56 56 50 62 Q44 56 38 50 Q44 44 50 38 Z"
        fill="var(--color-yellow)"
      />
    </>
  );
}

function Kalash() {
  return (
    <>
      <rect width="100" height="100" fill="var(--color-yellow)" />
      {/* Bowl: flat top, half-disc below */}
      <path d="M20 26 H80 A30 30 0 0 1 20 26 Z" fill="var(--color-red)" />
      {/* Stem */}
      <rect x="46" y="54" width="8" height="28" fill="var(--color-red)" />
      {/* Flared foot, running off the bottom edge */}
      <path d="M28 100 L46 80 H54 L72 100 Z" fill="var(--color-red)" />
    </>
  );
}

const SHAPES: Record<MotifVariant, () => React.JSX.Element> = {
  daisy: Daisy,
  stairs: Stairs,
  star: Star,
  kalash: Kalash,
};

const defId = (v: MotifVariant) => `dahf-motif-${v}`;

/**
 * Every motif's geometry, emitted once per document.
 *
 * Rendered in the root layout; <Motif> and the mural pattern then reference
 * these with <use>. The homepage shows thirteen motifs (eight image
 * placeholders plus five pathway slots) — inlining each one's ~10 shape nodes
 * cost real DOM for artwork that is identical every time.
 *
 * Hidden by clipping rather than `display: none`, which is the safer form when
 * the content is pulled out by <use>.
 */
export function MotifDefs() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="0"
      height="0"
      className="absolute h-0 w-0 overflow-hidden"
    >
      <defs>
        {MOTIF_ORDER.map((variant) => {
          const Shape = SHAPES[variant];
          return (
            <g key={variant} id={defId(variant)}>
              <Shape />
            </g>
          );
        })}
      </defs>
    </svg>
  );
}

/**
 * The four motifs as a repeating SVG <pattern>, 400×100 user units.
 *
 * Drawn once and tiled by the renderer. Emitting the strip as individual <Motif>
 * elements cost ~250 DOM nodes per band — this is ~15, for the same picture.
 */
export function MuralPattern({ id }: { id: string }) {
  return (
    <pattern
      id={id}
      width="400"
      height="100"
      patternUnits="userSpaceOnUse"
      patternContentUnits="userSpaceOnUse"
    >
      {MOTIF_ORDER.map((variant, i) => (
        <use
          key={variant}
          href={`#${defId(variant)}`}
          transform={`translate(${i * 100} 0)`}
        />
      ))}
    </pattern>
  );
}

/**
 * A full-width band of the repeating mural. `slice` scales one tile to the band
 * height, so the strip always shows whole motifs whatever the viewport.
 */
export function MuralStrip({ id, className }: { id: string; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 2400 100"
      preserveAspectRatio="xMinYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <MuralPattern id={id} />
      </defs>
      <rect width="2400" height="100" fill={`url(#${id})`} />
    </svg>
  );
}

export default function Motif({
  variant,
  className,
  /**
   * `slice` crops the tile to fill its box — right for the mural band, where
   * tiles are square. `meet` fits the whole tile inside, which is what a
   * photo placeholder wants: a cropped motif in a tall slot just reads as an
   * abstract blob.
   */
  fit = "slice",
}: {
  variant: MotifVariant;
  className?: string;
  fit?: "slice" | "meet";
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio={`xMidYMid ${fit}`}
    >
      <use href={`#${defId(variant)}`} />
    </svg>
  );
}
