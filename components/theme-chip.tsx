/**
 * Thematic-area tag. Chips get the pill radius; nothing else does (§5.1).
 *
 * These aren't links or buttons, so the hover fill is pointer-only — a small
 * reward for scanning the list, not a navigation affordance. No tabIndex:
 * making it a keyboard focus stop with nothing to activate would just add a
 * dead tab stop.
 */
export default function ThemeChip({ children }: { children: string }) {
  return (
    <li className="rounded-chip border border-navy px-4 py-2 font-body text-small text-navy transition-colors hover:bg-navy hover:text-cream">
      {children}
    </li>
  );
}
