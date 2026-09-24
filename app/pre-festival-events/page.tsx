import type { Metadata } from "next";
import ColorSection from "@/components/color-section";
import Figure from "@/components/figure";
import EventCarousel from "@/components/event-carousel";
import StayInformed from "@/components/stay-informed";
import { PRE_FESTIVAL } from "@/lib/content";

export const metadata: Metadata = {
  title: "Pre-Festival Events",
  description:
    "Events leading up to the Delhi Arts & Health Festival, 2 to 6 December 2026: Dilli Art Jam, school initiatives, and what is coming next.",
};

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="currentColor" aria-hidden="true">
      <path d="M12 1.5a7.5 7.5 0 0 0-7.5 7.5c0 5.4 6.2 12.2 6.9 12.9a.8.8 0 0 0 1.2 0c.7-.7 6.9-7.5 6.9-12.9A7.5 7.5 0 0 0 12 1.5Zm0 10.3a2.8 2.8 0 1 1 0-5.6 2.8 2.8 0 0 1 0 5.6Z" />
    </svg>
  );
}

export default function PreFestivalEventsPage() {
  return (
    <>
      <ColorSection tone="cream" className="pt-8 md:pt-12">
        <h1 className="font-display text-[clamp(2.25rem,4.5vw,3.5rem)] font-bold leading-[0.95] text-navy">
          {PRE_FESTIVAL.heading}
        </h1>

        {/* Alternates carousel-left / carousel-right down the list. The
            carousel stays first in the DOM; `lg:order-last` swaps sides. */}
        <div className="mt-10 space-y-14 md:space-y-20">
          {PRE_FESTIVAL.events.map((e, i) => (
            <article
              key={e.title}
              className="grid items-center gap-8 lg:grid-cols-12 lg:gap-16"
            >
              <div className={`lg:col-span-6 ${i % 2 === 1 ? "lg:order-last" : ""}`}>
                <EventCarousel
                  slides={e.images.map((img) => (
                    <Figure
                      key={img.alt}
                      image={img}
                      ratio="landscape"
                      sizes="(min-width: 1024px) 46vw, 100vw"
                      className="w-full rounded-photo"
                    />
                  ))}
                />
              </div>
              <div className="lg:col-span-6">
                <p className="font-eyebrow text-eyebrow text-maroon">{e.group}</p>
                <h2 className="mt-3 font-display text-h2 font-bold leading-[1.05] text-navy">
                  {e.title}
                </h2>
                {e.partner ? <p className="mt-4 text-lead">{e.partner}</p> : null}
                <p className="mt-6 flex items-center gap-2 text-body text-navy">
                  <PinIcon />
                  <span>
                    <span className="sr-only">Location: </span>
                    {e.location}
                  </span>
                </p>
                <p className="mt-2 text-body font-semibold text-navy">{e.date}</p>
              </div>
            </article>
          ))}
        </div>
      </ColorSection>

      <ColorSection tone="cream-2">
        <h2 className="font-display text-h2 font-bold text-navy">
          {PRE_FESTIVAL.upcomingHeading}
        </h2>
        <ul className="mt-8 grid gap-6 lg:grid-cols-3">
          {PRE_FESTIVAL.upcoming.map((u) => (
            <li key={u.title} className="rounded-card border-t-4 border-pink bg-cream p-8">
              <h3 className="font-display text-h3 font-semibold text-navy">{u.title}</h3>
              {u.partner ? <p className="mt-4 text-body">{u.partner}</p> : null}
            </li>
          ))}
        </ul>
        <p className="mt-10 max-w-[62ch] text-lead"><StayInformed variant="link">{PRE_FESTIVAL.closingLink}</StayInformed>
          {PRE_FESTIVAL.closingRest}</p>
      </ColorSection>
    </>
  );
}
