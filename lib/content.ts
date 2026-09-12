/**
 * Content for the coming-soon site. Wording that also appears on the main
 * site (name, dates, subheading) is transcribed verbatim from
 * `Website content for DAHF.pdf` — see the main site's `lib/content.ts`.
 */

export const FESTIVAL = {
  name: "Delhi Arts & Health Festival",
  shortName: "DAHF",
  dates: "2 to 6 December 2026",
  datesLine: "2 to 6 December 2026 | Delhi, India",
  location: "Delhi, India",
  subheading:
    "Reimagining Delhi as the Capital of Care through arts, health, wellbeing, creativity, and community.",
} as const;

export const CONTACT_EMAIL = "delhiartsandhealthfestival@gmail.com";

export const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/delhiartsandhealthfestival",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/delhi-arts-and-health-festival/",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@DelhiArtsandHealthFestival",
  },
] as const;
