import type { Metadata } from "next";
import CTAButton from "@/components/cta-button";
import DayName from "@/components/day-name";
import Logo from "@/components/logo";
import Motif from "@/components/motif";
import MuralBandStatic from "@/components/mural-band-static";
import {
  DAYS,
  FESTIVAL,
  REGISTER_HREF,
  SCHEDULE,
  type Experience,
  type ScheduleSession,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Festival Schedule",
  description:
    "The day-by-day schedule for the Delhi Arts & Health Festival, 2 to 6 December 2026: talks, workshops, performances and installations across five days.",
};

/**
 * Day colour + a text colour measured to clear AA on it — the same pairings
 * as <ColorSection> (pink/teal/yellow take black; navy/purple take cream).
 * Literal maps throughout: Tailwind's scanner needs whole class strings.
 */
const DAY_TONE: Record<string, { bg: string; text: string; logo: "positive" | "negative" }> = {
  navy: { bg: "bg-navy", text: "text-cream", logo: "negative" },
  pink: { bg: "bg-pink", text: "text-black", logo: "positive" },
  purple: { bg: "bg-purple", text: "text-cream", logo: "negative" },
  teal: { bg: "bg-teal", text: "text-black", logo: "positive" },
  yellow: { bg: "bg-yellow", text: "text-black", logo: "positive" },
};

/** Experience sections in the Festival Pathways colours (Programme page). */
const EXPERIENCE: Record<Experience, { chip: string; rule: string }> = {
  Reflect: { chip: "bg-pink text-black", rule: "border-pink" },
  Immerse: { chip: "bg-yellow text-black", rule: "border-yellow" },
  Discover: { chip: "bg-red text-black", rule: "border-red" },
  Energise: { chip: "bg-lime text-black", rule: "border-lime" },
  Refresh: { chip: "bg-purple text-cream", rule: "border-purple" },
};

const USED_EXPERIENCES = (Object.keys(EXPERIENCE) as Experience[]).filter((e) =>
  SCHEDULE.some((d) => d.sessions.some((s) => s.experience === e)),
);

/** "10:00 AM" → ["10:00", "AM"]; "All day" stays whole. */
function splitTime(t: string): [string, string?] {
  const m = t.match(/^(\d{1,2}:\d{2})\s?(AM|PM)$/);
  return m ? [m[1], m[2]] : [t];
}

/** Small field heading inside a session tile ("Time", "Format", …), so a
 * screen grab reads without the page around it. */
function FieldLabel({ children }: { children: string }) {
  return (
    <p className="mb-1 font-eyebrow text-[0.6875rem] font-semibold uppercase leading-none tracking-[0.08em] text-ink">
      {children}
    </p>
  );
}

function SessionTile({
  s,
  wide,
}: {
  s: ScheduleSession;
  wide: boolean;
}) {
  const [clock, meridiem] = splitTime(s.time);
  const xp = EXPERIENCE[s.experience];
  return (
    <li
      className={`flex flex-col rounded-card border-t-4 bg-cream p-4 text-ink md:p-5 ${xp.rule} ${
        wide ? "md:col-span-2" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <FieldLabel>Time</FieldLabel>
          <p className="font-display font-bold leading-none text-navy">
            <span className="text-[1.375rem] md:text-[1.5rem]">{clock}</span>
            {meridiem ? (
              <span className="ml-1 text-[0.8125rem] font-semibold">{meridiem}</span>
            ) : null}
          </p>
        </div>
        {s.duration ? (
          <div className="shrink-0 text-right">
            <FieldLabel>Duration</FieldLabel>
            <p className="font-display text-[0.9375rem] font-semibold leading-none text-maroon">
              {s.duration}
            </p>
          </div>
        ) : null}
      </div>

      <div className="mt-4">
        <FieldLabel>Programme</FieldLabel>
        <h3 className="font-display text-[1.125rem] font-semibold leading-snug text-navy md:text-[1.1875rem]">
          {s.title}
        </h3>
        {s.subtitle ? (
          <p className="mt-1 text-[0.9375rem] leading-snug">{s.subtitle}</p>
        ) : null}
      </div>

      <div className="mt-3">
        <FieldLabel>Facilitator / Artist / Speaker</FieldLabel>
        <p className="text-[0.9375rem] font-medium leading-snug text-maroon">{s.people}</p>
      </div>

      {/* mt-auto pins the tags to the tile's foot, so tiles stretched to a
          shared row height still line their tags up. */}
      <div className="mt-auto flex flex-wrap items-end gap-x-3 gap-y-2.5 pt-4 text-[0.8125rem] font-semibold leading-none">
        <div>
          <FieldLabel>Experience Section</FieldLabel>
          <span className={`inline-block rounded-chip px-2.5 py-1.5 ${xp.chip}`}>
            {s.experience}
          </span>
        </div>
        <div>
          <FieldLabel>Format</FieldLabel>
          <span className="inline-block rounded-chip border border-navy px-2.5 py-[0.3125rem] text-navy">
            {s.format}
          </span>
        </div>
        <div>
          <FieldLabel>Thematic Area</FieldLabel>
          <span className="inline-block rounded-chip bg-cream-2 px-2.5 py-1.5 text-ink">
            {s.theme}
          </span>
        </div>
      </div>
    </li>
  );
}

export default function SchedulePage() {
  return (
    <>
      {/* Hero — copy left, the week as five clickable day columns right. The
          columns double as the page's day navigation, so the hero is the
          table of contents rather than a picture of one. */}
      <section className="relative z-0 overflow-hidden bg-cream px-section-x pb-section-y pt-8 md:pt-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[5%] -top-[16%] aspect-square w-[22%] rounded-chip bg-red/70"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-[6%] bottom-[6%] aspect-square w-[18%] rounded-chip bg-teal/70"
        />

        <div className="relative z-10 mx-auto grid w-full max-w-360 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <p className="font-eyebrow text-eyebrow text-maroon">{FESTIVAL.datesLine}</p>
            <h1 className="mt-4 font-display text-[clamp(2.5rem,5.5vw,4.5rem)] font-bold leading-[1.02] text-navy">
              Festival Schedule
            </h1>
            <p className="mt-6 max-w-[52ch] text-[clamp(1.0625rem,1.2vw,1.125rem)] leading-[1.5]">
              Five days of talks, workshops, performances and installations.
              Follow a single thread through the week, or wander between them.
            </p>

            <div className="mt-8">
              <p className="font-display text-small font-semibold text-navy">
                Experience sections
              </p>
              <ul className="mt-3 flex flex-wrap gap-2 text-small font-semibold">
                {USED_EXPERIENCES.map((e) => (
                  <li key={e} className={`rounded-chip px-3.5 py-1.5 ${EXPERIENCE[e].chip}`}>
                    {e}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <nav aria-label="Jump to a day" className="lg:col-span-6">
            <ul className="grid grid-cols-5 gap-2 sm:gap-3">
              {SCHEDULE.map((sd) => {
                const d = DAYS[sd.day];
                const tone = DAY_TONE[d.bg];
                const dateNum = sd.date.match(/\d+/)?.[0] ?? "";
                return (
                  <li key={d.name}>
                    <a
                      href={`#day-${sd.day + 1}`}
                      className={`group flex h-[16rem] flex-col items-center justify-between rounded-card py-4 transition-transform hover:-translate-y-1 sm:h-[20rem] lg:h-[24rem] ${tone.bg} ${tone.text}`}
                    >
                      <span className="text-center font-display leading-none">
                        <span className="block text-[0.75rem] font-semibold sm:text-small">
                          Dec
                        </span>
                        <span className="mt-1 block text-[1.75rem] font-bold sm:text-[2.5rem] lg:text-[3rem]">
                          {dateNum.padStart(2, "0")}
                        </span>
                      </span>
                      {/* Vertical, reading bottom-to-top like a book spine. */}
                      <span className="font-samarkan text-[1.375rem] leading-none [writing-mode:vertical-rl] rotate-180 sm:text-[1.75rem] lg:text-[2.125rem]">
                        {d.name}
                      </span>
                      <span className="text-center font-eyebrow text-[0.6875rem] font-semibold leading-tight sm:text-[0.8125rem]">
                        {sd.sessions.length}
                        <span className="block">sessions</span>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </section>

      <MuralBandStatic id="schedule-hero-mural" />

      {/*
        One self-contained poster per day. Each carries its own day name,
        date, festival lockup and handle, so a screenshot of a single card
        stands on its own as an Instagram post. `aspect-square` is a minimum,
        not a crop: a card with more sessions grows past it, and the column
        count keeps every day between 1:1 and Instagram's tallest feed ratio,
        4:5 (1080×1350).
      */}
      <section className="bg-cream-2 px-section-x py-section-y">
        <div className="mx-auto flex w-full max-w-[76rem] flex-col gap-12 md:gap-20">
          {SCHEDULE.map((sd) => {
            const d = DAYS[sd.day];
            const tone = DAY_TONE[d.bg];
            // Busy days go three-up so the card stays inside Instagram's 4:5.
            const three = sd.sessions.length > 6;
            const odd = sd.sessions.length % 2 === 1;
            return (
              <article
                key={d.name}
                id={`day-${sd.day + 1}`}
                aria-label={`${d.n}, ${sd.date}: ${d.name}`}
                className={`flex scroll-mt-24 flex-col rounded-card p-5 sm:p-8 md:aspect-square md:p-10 ${tone.bg} ${tone.text}`}
              >
                <header className="flex items-start justify-between gap-6">
                  <div>
                    <p className="font-eyebrow text-small font-semibold md:text-[1rem]">
                      {d.n} | {sd.date}
                    </p>
                    <DayName
                      name={d.name}
                      className="mt-5 font-samarkan text-[clamp(2.75rem,7vw,4.75rem)] font-normal leading-none md:mt-6"
                    />
                    <p className="mt-2 font-display text-[clamp(1.0625rem,1.8vw,1.375rem)] font-semibold leading-tight">
                      {sd.theme}
                    </p>
                  </div>
                  <Motif
                    variant={d.image.motif ?? "daisy"}
                    className="h-16 w-16 shrink-0 rounded-chip ring-4 ring-cream md:h-24 md:w-24"
                  />
                </header>

                {/* auto-rows-fr + flex-1: on a card with few sessions the
                    tiles stretch to fill the 4:5 frame instead of leaving a
                    bare band of colour above the footer. An odd count lets
                    the first tile span both columns so no row ends ragged. */}
                <ul
                  className={`mt-6 grid flex-1 gap-3 md:mt-8 md:auto-rows-fr md:gap-4 ${
                    three ? "md:grid-cols-3" : "md:grid-cols-2"
                  }`}
                >
                  {sd.sessions.map((s, i) => (
                    <SessionTile
                      key={`${s.time}-${s.title}`}
                      s={s}
                      wide={!three && odd && i === 0}
                    />
                  ))}
                </ul>

                <footer className="mt-6 flex items-center justify-between gap-4 md:mt-8">
                  <Logo
                    id={`schedule-logo-${sd.day}`}
                    variant={tone.logo}
                    className="h-9 w-auto md:h-12"
                  />
                  <p className="text-right font-eyebrow text-[0.75rem] font-semibold leading-snug md:text-small">
                    {FESTIVAL.dates}
                    <span className="block">@delhiartsandhealthfestival</span>
                  </p>
                </footer>
              </article>
            );
          })}

          <div className="text-center">
            <p className="mx-auto max-w-[52ch] text-body">
              The schedule may change as the festival comes together. Register
              to hear about updates first.
            </p>
            <CTAButton href={REGISTER_HREF} external className="mt-6">
              Register
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}
