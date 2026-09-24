import type { Metadata } from "next";
import Figure from "@/components/figure";
import {
  CONTACT,
  CONTACT_HERO_IMAGE,
  CONTACT_PAGE,
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
          className="pointer-events-none absolute -right-[6%] -top-[14%] aspect-square w-[24%] rounded-chip bg-maroon/70"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-[7%] bottom-[10%] aspect-square w-[20%] rounded-chip bg-yellow/70"
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
        <div className="relative z-10 mx-auto grid w-full max-w-360 items-center gap-8 lg:grid-cols-12 lg:gap-16">
          {/*
            flex flex-col: the stretched grid cell (see above) gives this
            column the image's full height, but heading+intro alone are
            shorter than that, leaving it empty. mt-auto on the email list
            pushes it down to fill exactly that gap, landing its own bottom
            on the same line as the photo's.
          */}
          <div className="lg:col-span-7">
            <h1 className="font-display text-[clamp(2.25rem,4.5vw,3.5rem)] font-bold leading-[0.95] text-navy">
              {CONTACT_PAGE.heading}
            </h1>

            {/*
              The emails, moved up from their own section into the hero
              itself — text-h3 rather than the full-page text-h2 treatment,
              since this column is narrower than a full-width section.
              break-words keeps long addresses from overflowing at 375px.
            */}
            <dl className="mt-6 space-y-3">
              {CONTACT.map((c) => (
                <div key={c.email} className="min-w-0 border-t border-navy/20 pt-2">
                  <dt className="font-eyebrow text-eyebrow text-maroon">
                    {c.role}
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={`mailto:${c.email}`}
                      className="block break-words font-display text-[clamp(1rem,1.5vw,1.25rem)] font-semibold text-navy transition-colors hover:text-pink"
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
            className="h-[30vh] w-full rounded-photo sm:h-[32vh] md:h-[38vh] lg:col-span-5 lg:h-[54vh]"
          />
        </div>
      </section>

    </>
  );
}
