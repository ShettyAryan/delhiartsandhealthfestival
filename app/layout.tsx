import type { Metadata } from "next";
import { Antonio, Libre_Franklin, Special_Elite } from "next/font/google";
import SmoothScroll from "@/components/smooth-scroll";
import { MotifDefs } from "@/components/motif";
import LoadingScreen from "@/components/loading-screen";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import "./globals.css";

/**
 * Weights are named explicitly rather than letting next/font pull the variable
 * face. The variable files measured larger here and, being one slice per subset,
 * left a 52kB face that the browser still fetched outside the preload set.
 * Naming weights emits exactly the four cuts the design uses.
 *
 * Libre Franklin 700 is deliberately absent: every bold in the design is Antonio
 * (font-display). The only body weight above 400 is font-medium on buttons.
 */
const antonio = Antonio({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-antonio",
  display: "swap",
});

const libreFranklin = Libre_Franklin({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-libre-franklin",
  display: "swap",
});

// Not preloaded: Special Elite only sets small metadata labels, never the LCP
// element, so it should not compete for bandwidth with the body font.
const specialElite = Special_Elite({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-special-elite",
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
      className={`${antonio.variable} ${libreFranklin.variable} ${specialElite.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        {/*
          First-visit splash: DELHI stamping in with the Venn dot falling onto
          the I, then fading to reveal the site underneath. Mounted here
          rather than inside <Hero> so it covers whichever page a visitor
          actually lands on first, and so it only ever runs once per tab (a
          root layout persists across client-side navigations; only a full
          reload remounts it).
        */}
        <LoadingScreen />
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
