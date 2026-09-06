/**
 * The DAHF lockup: three-circle Venn + DELHI wordmark + descriptor. All SVG.
 *
 * Venn colour map, sampled from the press kit (CLAUDE.md §0.2). NOT a multiply
 * blend — every lens is an explicitly assigned brand token, which is the whole
 * idea of the identity: the palette IS the Venn diagram, with teal (the primary
 * brand colour) at the centre where all three meet.
 *
 *   top circle .......... pink   #ED2B75
 *   lower-left circle ... red    #ED3237
 *   lower-right circle .. yellow #EDBF09
 *   pink ∩ red .......... navy   #000066
 *   pink ∩ yellow ....... slate  #4C8E9A
 *   red  ∩ yellow ....... maroon #7F3653
 *   all three ........... teal   #09A794
 *
 * Real `mix-blend-mode: multiply` would give muddy browns, so the lenses are
 * drawn as nested-clip regions with flat token fills instead. Renders
 * identically everywhere, needs no blend-mode fallback.
 *
 * The wordmark is drawn as paths, not live text: the brand face is heavier and
 * wider-stemmed than Antonio, so live text would be visibly wrong — and paths
 * mean zero CLS and no font dependency.
 */

/** Venn geometry, shared with <Hero> so it can animate the circles. */
export const VENN = {
  viewBox: "0 0 300 288",
  circles: [
    { key: "pink", cx: 150, cy: 100, r: 100, fill: "var(--color-pink)" },
    { key: "red", cx: 100, cy: 188, r: 100, fill: "var(--color-red)" },
    { key: "yellow", cx: 200, cy: 188, r: 100, fill: "var(--color-yellow)" },
  ],
} as const;

/** The four intersection regions, drawn over the three base circles. */
export function VennLenses({ id }: { id: string }) {
  const c = VENN.circles;
  return (
    <>
      <defs>
        {c.map((circle) => (
          <clipPath key={circle.key} id={`${id}-${circle.key}`}>
            <circle cx={circle.cx} cy={circle.cy} r={circle.r} />
          </clipPath>
        ))}
      </defs>

      {/* pink ∩ red → navy */}
      <g clipPath={`url(#${id}-pink)`}>
        <g clipPath={`url(#${id}-red)`}>
          <rect width="300" height="288" fill="var(--color-navy)" />
        </g>
      </g>

      {/* pink ∩ yellow → slate */}
      <g clipPath={`url(#${id}-pink)`}>
        <g clipPath={`url(#${id}-yellow)`}>
          <rect width="300" height="288" fill="var(--color-slate)" />
        </g>
      </g>

      {/* red ∩ yellow → maroon */}
      <g clipPath={`url(#${id}-red)`}>
        <g clipPath={`url(#${id}-yellow)`}>
          <rect width="300" height="288" fill="var(--color-maroon)" />
        </g>
      </g>

      {/* all three → teal */}
      <g clipPath={`url(#${id}-pink)`}>
        <g clipPath={`url(#${id}-red)`}>
          <g clipPath={`url(#${id}-yellow)`}>
            <rect width="300" height="288" fill="var(--color-teal)" />
          </g>
        </g>
      </g>
    </>
  );
}

/** Static Venn, for anywhere that isn't the animated hero. */
export function Venn({ id }: { id: string }) {
  return (
    <>
      {VENN.circles.map((c) => (
        <circle key={c.key} cx={c.cx} cy={c.cy} r={c.r} fill={c.fill} />
      ))}
      <VennLenses id={id} />
    </>
  );
}

/**
 * DELHI letterforms, traced from the press-kit artwork by pixel-measuring the
 * positive logo. All values are units on a 100-unit cap height; the whole word
 * is 347 wide (measured aspect 3.47:1). Stem weight 26, letter gaps ~10.
 *
 * The H is India Gate: a small finial stepping out through a ziggurat cornice
 * to full width at 34% height, then two legs with a semicircular arch springing
 * at 58% (apex 47%). Not crenellations — that was a guess, and the measurement
 * disagreed.
 */
export const WORDMARK = {
  viewBox: "0 0 347 100",
  letters: [
    // D — flat left stem, right bowl rounded r=22; counter rounded r=12
    {
      key: "D",
      x: 0,
      d: "M0 0 H52.6 C64.7 0 74.6 9.9 74.6 22 V78 C74.6 90.1 64.7 100 52.6 100 H0 Z M26 22 H35.6 C42.2 22 47.6 27.4 47.6 34 V66 C47.6 72.6 42.2 78 35.6 78 H26 Z",
      jitter: -1.4,
    },
    {
      key: "E",
      x: 88,
      d: "M0 0 H69.2 V24 H26 V42 H61 V60 H26 V76 H69.2 V100 H0 Z",
      jitter: 0.9,
    },
    { key: "L", x: 167, d: "M0 0 H27 V76 H60.5 V100 H0 Z", jitter: -0.6 },
    {
      key: "H",
      x: 238.4,
      d: "M32 0 H41 V7 H50 V14 H62 V20 H68 V30 H73.5 V38 H70.8 V100 H2.7 V38 H0 V30 H5 V20 H11 V14 H23 V7 H32 Z M25.9 100 V58.05 a10.85 10.85 0 0 1 21.7 0 V100 Z",
      jitter: 1.2,
    },
    { key: "I", x: 321.1, d: "M0 0 H25.9 V100 H0 Z", jitter: -0.8 },
  ],
} as const;

type LogoProps = {
  /** Unique per instance — namespaces the clipPath ids. */
  id: string;
  variant?: "positive" | "negative";
  orientation?: "stacked" | "horizontal";
  className?: string;
};

export default function Logo({
  id,
  variant = "positive",
  orientation = "horizontal",
  className,
}: LogoProps) {
  const ink = variant === "negative" ? "text-cream" : "text-black";
  const label = "Delhi Arts & Health Festival";

  const wordmark = (
    <g fill="currentColor" fillRule="evenodd">
      {WORDMARK.letters.map((l) => (
        <path key={l.key} d={l.d} transform={`translate(${l.x} 0)`} />
      ))}
    </g>
  );

  if (orientation === "stacked") {
    return (
      <svg
        viewBox="0 0 347 466"
        className={`${ink} ${className ?? ""}`}
        role="img"
        aria-label={label}
      >
        <g transform="translate(23.5 0)">
          <Venn id={id} />
        </g>
        <g transform="translate(0 312)">{wordmark}</g>
        <text
          x="173.5"
          y="454"
          textAnchor="middle"
          textLength="340"
          lengthAdjust="spacingAndGlyphs"
          fontSize="44"
          fill="currentColor"
          className="font-body"
        >
          Arts &amp; Health Festival
        </text>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 640 250"
      className={`${ink} ${className ?? ""}`}
      role="img"
      aria-label={label}
    >
      <g transform="translate(0 5) scale(0.8)">
        <Venn id={id} />
      </g>
      <g transform="translate(270 55)">{wordmark}</g>
      <text
        x="270"
        y="202"
        textLength="347"
        lengthAdjust="spacingAndGlyphs"
        fontSize="44"
        fill="currentColor"
        className="font-body"
      >
        Arts &amp; Health Festival
      </text>
    </svg>
  );
}
