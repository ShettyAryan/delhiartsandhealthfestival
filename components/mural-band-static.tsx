import { MuralStrip } from "@/components/motif";

/**
 * The mural strip without parallax — a server component, so it pulls no
 * animation runtime onto the page.
 *
 * §4 scopes the scrolling mural to the homepage ("Section separators
 * (homepage)"), so every other page uses this. On the long pages that matters:
 * it keeps the whole motion library out of their bundle.
 */
export default function MuralBandStatic({
  id,
  height = "h-24 md:h-32",
}: {
  id: string;
  height?: string;
}) {
  return (
    <div className={`w-full overflow-hidden ${height}`}>
      <MuralStrip id={id} className="h-full w-full" />
    </div>
  );
}
