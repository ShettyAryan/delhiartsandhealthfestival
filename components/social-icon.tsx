/**
 * Custom flat glyphs for the footer's social links — no icon library (§5.5).
 * Stroke-based and drawn in `currentColor` so each inherits its link's own
 * colour/hover state rather than carrying a fixed fill. These are
 * simplified, brand-flat representations (not the platforms' own logo
 * marks), consistent with the mural/motif SVGs elsewhere on the site.
 */
export type SocialPlatform = "instagram" | "linkedin" | "youtube";

/** Matches a social link's label to its icon — case-insensitive, falls back
 * to null (renders no glyph) for a platform not drawn below. */
export function platformFromLabel(label: string): SocialPlatform | null {
  const key = label.trim().toLowerCase();
  if (key === "instagram") return "instagram";
  if (key === "linkedin") return "linkedin";
  if (key === "youtube") return "youtube";
  return null;
}

export default function SocialIcon({
  platform,
  className,
}: {
  platform: SocialPlatform;
  className?: string;
}) {
  const common = {
    viewBox: "0 0 24 24",
    className: className ?? "h-5 w-5",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    "aria-hidden": "true" as const,
    focusable: "false" as const,
  };

  if (platform === "instagram") {
    return (
      <svg {...common}>
        <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (platform === "linkedin") {
    return (
      <svg {...common}>
        <circle cx="7" cy="7" r="1.3" fill="currentColor" stroke="none" />
        <line x1="7" y1="10.5" x2="7" y2="18" />
        <line x1="12" y1="10.5" x2="12" y2="18" />
        <path d="M12 13.5C12 11.6 13.3 10.5 15 10.5C17 10.5 18 11.8 18 14V18" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="M10 9.3L16 12L10 14.7V9.3Z" fill="currentColor" stroke="none" />
    </svg>
  );
}
