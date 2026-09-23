import type { Metadata } from "next";
import ColorSection from "@/components/color-section";
import CTAButton from "@/components/cta-button";
import Figure from "@/components/figure";
import FloatingMotif from "@/components/floating-motif";
import { FORMS, PRESS, PRESS_HERO_IMAGE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Press & Media",
  description:
    "Press materials, quick facts, and media enquiries for the Delhi Arts & Health Festival, 2 to 6 December 2026.",
};

export default function PressPage() {
  return (
    <>
      {/*
        Hero, matching Home/About/Programme's two-column treatment: copy
        left, photo right in the shared rounded-photo frame, brand circles
        bleeding off the corners — red and lime here, a pairing none of the
        other three pages use yet.
      */}
      <section className="relative z-0 overflow-hidden bg-cream px-section-x pb-section-y pt-8 md:pt-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[6%] -top-[14%] aspect-square w-[24%] rounded-chip bg-red/70"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-[7%] bottom-[10%] aspect-square w-[20%] rounded-chip bg-lime/70"
        />

        {/*
          Heading sized like the other pages' heroes (the same clamp the
          homepage and Programme heroes use, not the shared text-h1 token).
          The intro paragraphs are gone, and Quick facts now sits right in
          their place — inline rows, deliberately not a card grid (§8) —
          with the photo height-capped by viewport, same as the Programme
          hero, so it matches the shorter text column.
        */}
        <div className="relative z-10 mx-auto grid w-full max-w-360 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <h1 className="font-display text-[clamp(2.25rem,4.5vw,3.5rem)] font-bold leading-[0.95] text-navy">
              {PRESS.heading}
            </h1>
            <h2 className="mt-8 font-eyebrow text-eyebrow text-maroon">
              Quick facts
            </h2>
            <dl className="mt-3 divide-y divide-navy/20 border-y border-navy/20">
              {PRESS.quickFacts.map((f) => (
                <div key={f.term} className="grid gap-1 py-3 sm:grid-cols-12 sm:gap-6">
                  <dt className="font-body text-small font-semibold text-navy sm:col-span-4">
                    {f.term}
                  </dt>
                  <dd className="text-body leading-snug sm:col-span-8">{f.body}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6">
              <CTAButton href={FORMS.factSheet} external>
                Fact Sheet
              </CTAButton>
            </div>
          </div>

          <Figure
            image={PRESS_HERO_IMAGE}
            ratio="portrait"
            sizes="(min-width: 1024px) 46vw, 100vw"
            priority
            className="h-[30vh] w-full rounded-photo sm:h-[32vh] md:h-[38vh] lg:col-span-6 lg:h-[54vh]"
          />
        </div>
      </section>

      {/* Press FAQs — native <details>, so it works with JS disabled (§9) */}
      <ColorSection tone="cream" className="relative z-0 overflow-hidden">
        {/* Scoped to just the heading/intro, not the whole FAQ list below —
            the same reason About's Why Now motif only wraps its own
            heading rather than the section's full (unpredictable) height. */}
        <div className="relative">
          <FloatingMotif
            variant="stairs"
            className="-right-[2%] -top-[12%] hidden h-20 w-20 lg:block lg:h-24 lg:w-24"
            baseRotate={-10}
            duration={10}
          />
          <h2 className="font-display text-h2 font-bold text-navy">Press FAQs</h2>
          <p className="mt-6 max-w-[62ch] text-lead">{PRESS.faqIntro}</p>
        </div>

        <div className="mt-12 border-t border-navy/20">
          {PRESS.faqs.map((f) => (
            <details key={f.q} className="group border-b border-navy/20">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 font-display text-[clamp(1.125rem,1.6vw,1.375rem)] font-semibold leading-snug text-navy">
                {f.q}
                <span
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-pink transition-transform group-open:rotate-45"
                >
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                    <rect x="10.7" y="3" width="2.6" height="18" />
                    <rect x="3" y="10.7" width="18" height="2.6" />
                  </svg>
                </span>
              </summary>
              <p className="max-w-[65ch] pb-6 text-body">{f.a}</p>
            </details>
          ))}
        </div>

        <div className="mt-10">
          <CTAButton href={FORMS.pressFaqs} variant="secondary" external>
            Read the full Press FAQs
          </CTAButton>
        </div>
      </ColorSection>

      {/* Media enquiries. The "Media resources" column that used to sit
          beside it (list, request line, image thumbnails) is removed on
          request; enquiries stay since they carry the press contact. */}
      <ColorSection tone="cream-2" className="relative z-0 overflow-hidden">
        <FloatingMotif
          variant="daisy"
          className="-right-[3%] bottom-[8%] hidden h-20 w-20 lg:block lg:h-24 lg:w-24"
          baseRotate={11}
          duration={12}
          delay={0.4}
        />
        <div className="relative">
          <h2 className="font-display text-h2 font-bold text-navy">
            Media enquiries
          </h2>
          <p className="mt-6 max-w-[52ch] text-body">
            For festival images, press kit, interviews, features and media
            partnerships, write to{" "}
            <a
              href={`mailto:${PRESS.mediaEmail}`}
              className="text-maroon underline decoration-1 underline-offset-4"
            >
              {PRESS.mediaEmail}
            </a>
            .
          </p>
        </div>
      </ColorSection>
    </>
  );
}
