import { ImageResponse } from "next/og";

export const alt = "Delhi Arts & Health Festival — 2 to 6 December 2026, Delhi, India";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * OG card: the DELHI wordmark on cream (CLAUDE.md §9). Drawn from the same SVG
 * geometry as <Logo>, so there is no raster asset to keep in sync.
 *
 * Satori (which renders this) does not support `fillRule="evenodd"` on multi-
 * subpath fills reliably, so the Venn is composed of plain circles and the
 * wordmark is set in a system-safe weight rather than the traced paths.
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
          justifyContent: "center",
          padding: "80px 96px",
        }}
      >
        <svg width="300" height="288" viewBox="0 0 300 288">
          <circle cx="150" cy="100" r="100" fill="#ED2B75" />
          <circle cx="100" cy="188" r="100" fill="#ED3237" />
          <circle cx="200" cy="188" r="100" fill="#EDBF09" />
          <clipPath id="p">
            <circle cx="150" cy="100" r="100" />
          </clipPath>
          <clipPath id="r">
            <circle cx="100" cy="188" r="100" />
          </clipPath>
          <clipPath id="y">
            <circle cx="200" cy="188" r="100" />
          </clipPath>
          <g clipPath="url(#p)">
            <g clipPath="url(#r)">
              <rect width="300" height="288" fill="#000066" />
            </g>
          </g>
          <g clipPath="url(#p)">
            <g clipPath="url(#y)">
              <rect width="300" height="288" fill="#4C8E9A" />
            </g>
          </g>
          <g clipPath="url(#r)">
            <g clipPath="url(#y)">
              <rect width="300" height="288" fill="#7F3653" />
            </g>
          </g>
          <g clipPath="url(#p)">
            <g clipPath="url(#r)">
              <g clipPath="url(#y)">
                <rect width="300" height="288" fill="#09A794" />
              </g>
            </g>
          </g>
        </svg>

        <div
          style={{
            display: "flex",
            fontSize: 132,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "#000066",
            marginTop: 28,
          }}
        >
          DELHI
        </div>
        <div style={{ display: "flex", fontSize: 34, color: "#1A1A1A", marginTop: 8 }}>
          Arts &amp; Health Festival
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#7F3653", marginTop: 26 }}>
          2 to 6 December 2026 · Delhi, India
        </div>
      </div>
    ),
    size,
  );
}
