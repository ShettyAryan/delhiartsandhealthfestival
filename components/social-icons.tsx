/**
 * Hand-built social glyphs — CLAUDE.md §5.5 rules out icon libraries
 * (Lucide, Heroicons, Feather, Tabler) in favour of custom SVG, same as the
 * Venn logo and the mural motifs. Flat, single-colour, `currentColor` so each
 * icon inherits the button's own state (navy at rest, pink on hover) rather
 * than carrying its own fill.
 */

type IconProps = { className?: string; id?: string };

/** The rounded-square camera badge, lens ring, and flash dot — the three
 * shapes that actually read as "Instagram"; a bare lens ring alone (the
 * previous version) just looked like a plain circle. */
export function InstagramIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect x="3" y="3" width="18" height="18" rx="6" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="16.3" cy="7.7" r="1.15" fill="currentColor" />
    </svg>
  );
}

/** Real text, not a traced lettermark — same "font honesty" call as the
 * headline wordmark (CLAUDE.md §0.11): LinkedIn's mark is just two letters. */
export function LinkedInIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <text
        x="12"
        y="16.5"
        textAnchor="middle"
        fontSize="11"
        fontWeight="700"
        className="font-body"
        fill="currentColor"
      >
        in
      </text>
    </svg>
  );
}

/** Rounded chip with a play-triangle punched out via mask, so the hole shows
 * whatever sits behind the icon (the button's own background) instead of a
 * hardcoded fill — the same reasoning as the Venn's clip-based lenses.
 * `id` namespaces the mask since this icon renders more than once per page
 * (hero + footer) and mask ids must be document-unique. */
export function YoutubeIcon({ className, id = "yt" }: IconProps) {
  const maskId = `${id}-play-cutout`;
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <mask id={maskId}>
        <rect width="24" height="24" fill="white" />
        <path d="M10.3 8.6 L16.2 12 L10.3 15.4 Z" fill="black" />
      </mask>
      <rect x="3" y="5.5" width="18" height="13" rx="4" fill="currentColor" mask={`url(#${maskId})`} />
    </svg>
  );
}
