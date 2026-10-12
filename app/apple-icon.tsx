import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * Home-screen icon (iOS "Add to Home Screen"). Same Venn mark as icon.tsx,
 * but on a solid cream fill — iOS applies its own rounded-square mask and
 * does not honour transparency, so a transparent icon would show whatever
 * colour sits behind it on the device's home screen instead of the brand
 * cream.
 */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#F2E7DA",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="135"
          height="130"
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
