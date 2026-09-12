import type { Metadata } from "next";
import { Antonio, Libre_Franklin, Special_Elite } from "next/font/google";
import { MotifDefs } from "@/components/motif";
import { FESTIVAL } from "@/lib/content";
import "./globals.css";

/**
 * Same weight selection as the main site (see its layout.tsx): named weights
 * rather than the variable face, and Libre Franklin 700 stays out — every
 * bold here is Antonio.
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

const specialElite = Special_Elite({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-special-elite",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: `Coming Soon — ${FESTIVAL.name}`,
  description: `${FESTIVAL.subheading} ${FESTIVAL.datesLine}.`,
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
        {/* Motif geometry, emitted once; <Motif> references it via <use>. */}
        <MotifDefs />
        <main id="main" className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
