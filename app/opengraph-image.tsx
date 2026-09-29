import { readFileSync } from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Delhi Arts & Health Festival — 2 to 6 December 2026, Delhi, India";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Trimmed (transparent margins cropped) copy of the black lockup, generated
// once from /public/images/logoblack.png — see public/images/README.md.
// Read from disk and inlined as a data URI: Satori's <img> can only resolve
// an absolute http(s) URL or a data URI, not a site-relative path, since this
// route has no request/origin of its own to resolve "/images/..." against.
const logo = readFileSync(
  path.join(process.cwd(), "public/images/og-logoblack.png"),
).toString("base64");

/**
 * OG / Twitter card: the actual DELHI lockup artwork on cream (CLAUDE.md §9),
 * on client request — replaces the earlier version, which redrew the Venn and
 * set the wordmark in a system font rather than using the logo file itself.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#F2E7DA",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/png;base64,${logo}`}
          width={900}
          height={318}
          alt=""
        />
        <div style={{ display: "flex", fontSize: 28, color: "#7F3653", marginTop: 40 }}>
          2 to 6 December 2026 · Delhi, India
        </div>
      </div>
    ),
    size,
  );
}
