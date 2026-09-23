import type { Metadata } from "next";
import ColorSection from "@/components/color-section";
import CTAButton from "@/components/cta-button";
import Figure from "@/components/figure";
import FloatingMotif from "@/components/floating-motif";
import {
  FORMS,
  PRESS,
  PRESS_HERO_IMAGE,
  PRESS_IMAGES,
  SOCIALS,
} from "@/lib/content";

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

        <div className="relative z-10 mx-auto grid w-full max-w-360 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h1 className="font-display text-h1 font-bold text-navy">
              {PRESS.heading}
            </h1>
            <div className="mt-8 max-w-[62ch] space-y-5">
              {PRESS.about.map((p, i) => (
                <p key={i} className="text-lead">
                  {p}
                </p>
              ))}
            </div>
          </div>

          <Figure
            image={PRESS_HERO_IMAGE}
            ratio="portrait"
            sizes="(min-width: 1024px) 38vw, 100vw"
            priority
            className="rounded-photo lg:col-span-5"
          />
        </div>
      </section>

      {/* Quick facts — inline, deliberately not a card grid (§8) */}
      <ColorSection tone="navy">
        <h2 className="font-display text-h2 font-bold">Quick facts</h2>
        <dl className="mt-10 divide-y divide-cream/20 border-y border-cream/20">
          {PRESS.quickFacts.map((f) => (
            <div key={f.term} className="grid gap-1 py-5 md:grid-cols-12 md:gap-8">
              <dt className="font-eyebrow text-eyebrow text-yellow md:col-span-3">
                {f.term}
              </dt>
              <dd className="text-body md:col-span-8 md:col-start-5">{f.body}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-10">
          {/* invert, not the default primary — this section is tone="navy"
              above, and CTAButton's primary variant is now a navy fill,
              which would disappear against it. */}
          <CTAButton href={FORMS.factSheet} variant="invert" external>
            Fact Sheet
          </CTAButton>
        </div>
      </ColorSection>

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
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 font-display text-h3 font-semibold text-navy">
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

      {/* Media resources + enquiries */}
      <ColorSection tone="cream-2" className="relative z-0 overflow-hidden">
        <FloatingMotif
          variant="daisy"
          className="-right-[3%] bottom-[8%] hidden h-20 w-20 lg:block lg:h-24 lg:w-24"
          baseRotate={11}
          duration={12}
          delay={0.4}
        />
        <div className="relative grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="font-display text-h2 font-bold text-navy">
              Media resources
            </h2>
            <ul className="mt-6 space-y-3">
              {PRESS.mediaResources.map((r) => (
                <li key={r} className="border-l-4 border-teal pl-4 text-body">
                  {r}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-body">
              To request materials, write to{" "}
              <a
                href={`mailto:${PRESS.mediaEmail}`}
                className="text-maroon underline decoration-1 underline-offset-4"
              >
                {PRESS.mediaEmail}
              </a>
              .
            </p>

            {/* A look at what's available, against the "View festival images"
                line above — press need to see before they request. */}
            <ul className="mt-8 grid grid-cols-3 gap-3">
              {PRESS_IMAGES.map((img) => (
                <li key={img.alt}>
                  <Figure
                    image={img}
                    ratio="square"
                    sizes="(min-width: 1024px) 14vw, 30vw"
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <h2 className="font-display text-h2 font-bold text-navy">
              Media enquiries
            </h2>
            <p className="mt-6 max-w-[52ch] text-body">
              For interviews, features, media partnerships, and accreditation,
              write to{" "}
              <a
                href={`mailto:${PRESS.mediaEmail}`}
                className="text-maroon underline decoration-1 underline-offset-4"
              >
                {PRESS.mediaEmail}
              </a>
              .
            </p>
          </div>
        </div>
      </ColorSection>

      {/* Social follow strip */}
      <ColorSection tone="pink">
        <h2 className="font-display text-h2 font-bold">Follow the festival</h2>
        <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
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
      </ColorSection>
    </>
  );
}
