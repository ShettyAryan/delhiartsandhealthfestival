import type { Metadata } from "next";
import { Poppins, Newsreader, Mulish } from "next/font/google";
import SmoothScroll from "@/components/smooth-scroll";
import { MotifDefs } from "@/components/motif";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import "./globals.css";

/**
 * Weights are named explicitly rather than letting next/font pull the variable
 * face, matching the discipline the previous Antonio/Libre Franklin load used.
 * Poppins covers headings, the hero title, and eyebrow labels (400 default,
 * 600/700 for the bold weights already used throughout).
 */
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mulish",
  display: "swap",
});

// Medium italic only: Newsreader's one job on this site is the hero
// subtitle line, so there is no reason to fetch a roman cut it never uses.
const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["500"],
  style: ["italic"],
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
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
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
