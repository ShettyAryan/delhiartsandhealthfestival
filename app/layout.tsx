import type { Metadata } from "next";
import localFont from "next/font/local";
import SmoothScroll from "@/components/smooth-scroll";
import { MotifDefs } from "@/components/motif";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import "./globals.css";

/**
 * Self-hosted, not next/font/google. Google Fonts has started serving some
 * font URLs as `fonts.gstatic.com/l/font?kit=…&skey=…&v=…`, and Turbopack's
 * next/font/google loader fails on any URL whose query has more than one
 * entry ("next/font/google queries have exactly one entry"), which broke both
 * `next dev` and `next build`, intermittently, depending on which URL format
 * Google returned. Local files also take the network out of the build.
 *
 * The files in app/fonts are the latin-subset woff2s Google serves for
 * exactly the faces used before: Poppins 400/600/700, Mulish 400–500 (one
 * variable file covers both), Newsreader 500 italic. To change a weight,
 * download the matching latin woff2 from fonts.googleapis.com/css2.
 *
 * Poppins covers headings, the hero title, and eyebrow labels.
 */
const poppins = localFont({
  src: [
    { path: "./fonts/poppins-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/poppins-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/poppins-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-poppins",
  display: "swap",
});

const mulish = localFont({
  src: [{ path: "./fonts/mulish-latin-variable.woff2", weight: "400 500", style: "normal" }],
  variable: "--font-mulish",
  display: "swap",
});

// Medium italic only: Newsreader's one job on this site is the hero
// subtitle line, so there is no reason to ship a roman cut it never uses.
const newsreader = localFont({
  src: [{ path: "./fonts/newsreader-500-italic.woff2", weight: "500", style: "italic" }],
  variable: "--font-newsreader",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://delhiartsandhealthfestival.com"),
  title: {
    default: "Delhi Arts & Health Festival",
    template: "%s — Delhi Arts & Health Festival",
  },
  description:
    "Reimagining Delhi as the Capital of Care through arts, health, wellbeing, creativity, and community. 2 to 6 December 2026.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${mulish.variable} ${newsreader.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        {/* Samarkan, for the Pehchaan to Muskaan day names only (programme page). */}
        <link rel="stylesheet" href="https://fonts.cdnfonts.com/css/samarkan" />
      </head>
      {/*
        Browser extensions (e.g. Liner) inject attributes like
        data-liner-extension-version onto html/body before React hydrates.
        suppressHydrationWarning on just these two tags ignores that
        attribute-only mismatch without silencing real hydration errors
        anywhere else in the tree. https://react.dev/link/hydration-mismatch
      */}
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        {/* Motif geometry, emitted once; <Motif> and the mural reference it. */}
        <MotifDefs />
        <SmoothScroll>
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </SmoothScroll>
      </body>
    </html>
  );
}
