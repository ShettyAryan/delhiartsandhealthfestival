import type { Metadata } from "next";
import ColorSection from "@/components/color-section";
import Figure from "@/components/figure";
import FloatingMotif from "@/components/floating-motif";
import {
  CONTACT,
  CONTACT_HERO_IMAGE,
  CONTACT_PAGE,
  SOCIALS,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Programming, partnerships, volunteering, media, or funding — write to the right address and the relevant team will get back to you.",
};

export default function ContactPage() {
  return (
    <>
      {/*
        Hero, matching Home/About/Programme/Press's two-column treatment:
        copy left, photo right in the shared rounded-photo frame, brand
        circles bleeding off the corners — maroon and yellow here, the one
        pairing none of the other pages use. This page was previously the
        one with no photography and no murals at all: just a heading, a list
        of email addresses, and a social strip.
      */}
      <section className="relative z-0 overflow-hidden bg-cream px-section-x pb-section-y pt-8 md:pt-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[6%] -top-[14%] aspect-square w-[24%] rounded-chip bg-maroon"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-[7%] bottom-[10%] aspect-square w-[20%] rounded-chip bg-yellow"
        />

        {/*
          No items-start override here (unlike the plain heading+intro
          version this replaced) — align-items:stretch, grid's own default,
          is what the flex/h-full/mt-auto trick below depends on: it makes
          this column's outer box match the image's full height, even though
          items-start would have left it exactly as tall as its own content
          and given mt-auto nothing to push into. Content still starts flush
          at the top of that stretched box either way, so this doesn't bring
          back the "gap above the heading" items-center used to cause.
        */}
        <div className="relative z-10 mx-auto grid w-full max-w-360 gap-12 lg:grid-cols-12 lg:gap-16">
          {/*
            flex flex-col: the stretched grid cell (see above) gives this
            column the image's full height, but heading+intro alone are
            shorter than that, leaving it empty. mt-auto on the email list
            pushes it down to fill exactly that gap, landing its own bottom
            on the same line as the photo's.
          */}
          <div className="flex h-full flex-col lg:col-span-7">
            <h1 className="font-display text-h1 font-bold text-navy">
              {CONTACT_PAGE.heading}
            </h1>
            <p className="mt-8 max-w-[62ch] text-lead">{CONTACT_PAGE.intro}</p>

            {/*
              The emails, moved up from their own section into the hero
              itself — text-h3 rather than the full-page text-h2 treatment,
              since this column is narrower than a full-width section.
              break-words keeps long addresses from overflowing at 375px.
            */}
            <dl className="mt-auto space-y-6 pt-10">
              {CONTACT.map((c) => (
                <div key={c.email} className="border-t border-navy/20 pt-5">
                  <dt className="font-mono text-mono tracking-[0.08em] text-maroon">
                    {c.role}
                  </dt>
                  <dd className="mt-2">
                    <a
                      href={`mailto:${c.email}`}
                      className="block break-words font-display text-h3 font-semibold text-navy transition-colors hover:text-pink"
                    >
                      {c.email}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <Figure
            image={CONTACT_HERO_IMAGE}
            ratio="portrait"
            sizes="(min-width: 1024px) 38vw, 100vw"
            priority
            className="rounded-photo lg:col-span-5"
          />
        </div>
      </section>

      <ColorSection tone="teal" className="relative z-0 overflow-hidden">
        <FloatingMotif
          variant="star"
          className="-right-[2%] -top-[10%] hidden h-20 w-20 lg:block lg:h-24 lg:w-24"
          baseRotate={-9}
          duration={11}
        />
        <div className="relative">
          <h2 className="font-display text-h2 font-bold">Follow the festival</h2>
          <p className="mt-6 max-w-[52ch] text-lead">{CONTACT_PAGE.followIntro}</p>
          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
            {SOCIALS.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-h3 font-semibold underline decoration-2 underline-offset-8 hover:text-navy"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </ColorSection>
    </>
  );
}
