import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/**
 * Browser-tab favicon: the Venn mark alone, not the full DELHI lockup — the
 * wordmark's thin letterforms disappear at 16–32px, but three flat-coloured
 * circles still read clearly that small. Same geometry and colour map as
 * <Logo> (CLAUDE.md §0.2); hex literals rather than the CSS custom
 * properties <Logo> uses, since this renders through Satori at build time,
 * outside the browser where those tokens resolve.
 */
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse needs a div-rooted tree — returning a bare <svg> as the
      // top-level node rendered as a fully transparent (0-alpha) image in
      // testing, even though the identical markup works fine nested one level
      // down inside a div, as in opengraph-image.tsx and apple-icon.tsx.
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 300 288"
          xmlns="http://www.w3.org/2000/svg"
        >
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
      </div>
    ),
    size,
  );
}
