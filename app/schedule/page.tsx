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
  SCHEDULE_ALSO,
  SCHEDULE_VENUES,
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

const EXPERIENCES = Object.keys(EXPERIENCE) as Experience[];

/** "10:00 AM" → ["10:00", "AM"]; "All day" stays whole. */
function splitTime(t: string): [string, string?] {
  const m = t.match(/^(\d{1,2}:\d{2})\s?(AM|PM)$/);
  return m ? [m[1], m[2]] : [t];
}

/** Same pin as the Pre-Festival Events page. */
function PinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 1.5a7.5 7.5 0 0 0-7.5 7.5c0 5.4 6.2 12.2 6.9 12.9a.8.8 0 0 0 1.2 0c.7-.7 6.9-7.5 6.9-12.9A7.5 7.5 0 0 0 12 1.5Zm0 10.3a2.8 2.8 0 1 1 0-5.6 2.8 2.8 0 0 1 0 5.6Z" />
    </svg>
  );
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

/**
 * Column count per card, and how the last, short row is filled. Busy days go
 * four-up so the card stays inside Instagram's 4:5; a short last row is
 * widened to fill the row instead of ending ragged.
 */
const GRID: Record<number, string> = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-2 lg:grid-cols-3",
  4: "md:grid-cols-2 lg:grid-cols-4",
};
const SPAN: Record<string, string> = {
  "2:2": "md:col-span-2",
  "3:2": "lg:col-span-2",
  "3:3": "lg:col-span-3",
  "4:2": "lg:col-span-2",
  "4:3": "lg:col-span-3",
  "4:4": "lg:col-span-4",
};

function columnsFor(n: number) {
  return n >= 8 ? 4 : n >= 5 ? 3 : 2;
}

/** Span for tile `i` of `n`: the tiles of a short last row share it evenly
 * where they can; otherwise the last one takes the leftover columns. */
function spanFor(i: number, n: number, cols: number): string | undefined {
  const r = n % cols;
  if (r === 0 || i < n - r) return undefined;
  const span = cols % r === 0 ? cols / r : i === n - 1 ? cols - r + 1 : 1;
  return span > 1 ? SPAN[`${cols}:${span}`] : undefined;
}

function SessionTile({
  s,
  span,
  compact = false,
}: {
  s: ScheduleSession;
  span?: string;
  /** Four-across cards: tighter padding so busy days stay inside 4:5. */
  compact?: boolean;
}) {
  const [clock, meridiem] = s.time ? splitTime(s.time) : [];
  const xp = s.experience ? EXPERIENCE[s.experience] : undefined;
  const hasTags = Boolean(s.experience || s.format || s.theme);
  return (
    <li
      className={`flex flex-col rounded-card border-t-4 bg-cream p-4 text-ink ${
        compact ? "" : "md:p-5"
      } ${xp?.rule ?? "border-navy"} ${span ?? ""}`}
    >
      <div className="flex items-start justify-between gap-3">
        {clock ? (
          <div>
            <FieldLabel>Time</FieldLabel>
            <p className="font-display font-bold leading-none text-navy">
              <span className="text-[1.375rem] md:text-[1.5rem]">{clock}</span>
              {meridiem ? (
                <span className="ml-1 text-[0.8125rem] font-semibold">{meridiem}</span>
              ) : null}
            </p>
          </div>
        ) : (
          <span />
        )}
        {s.duration ? (
          <div className="shrink-0 text-right">
            <FieldLabel>Duration</FieldLabel>
            <p className="font-display text-[0.9375rem] font-semibold leading-none text-maroon">
              {s.duration}
            </p>
          </div>
        ) : null}
      </div>

      <div className={clock || s.duration ? (compact ? "mt-3" : "mt-4") : ""}>
        <FieldLabel>Programme</FieldLabel>
        <h3 className="font-display text-[1.125rem] font-semibold leading-snug text-navy md:text-[1.1875rem]">
          {s.title}
        </h3>
        {s.subtitle ? (
          <p className="mt-1 text-[0.9375rem] leading-snug">{s.subtitle}</p>
        ) : null}
      </div>

      {s.people ? (
        <div className="mt-3">
          <FieldLabel>Facilitator / Artist / Speaker</FieldLabel>
          <p className="text-[0.9375rem] font-medium leading-snug text-maroon">{s.people}</p>
        </div>
      ) : null}

      {/* mt-auto pins the tags to the tile's foot, so tiles stretched to a
          shared row height still line their tags up. */}
      {hasTags ? (
        <div
          className={`mt-auto flex flex-wrap items-end gap-x-3 gap-y-2.5 text-[0.8125rem] font-semibold leading-none ${
            compact ? "pt-3" : "pt-4"
          }`}
        >
          {s.experience && xp ? (
            <div>
              <FieldLabel>Experience Section</FieldLabel>
              <span className={`inline-block rounded-chip px-2.5 py-1.5 ${xp.chip}`}>
                {s.experience}
              </span>
            </div>
          ) : null}
          {s.format ? (
            <div>
              <FieldLabel>Format</FieldLabel>
              <span className="inline-block rounded-chip border border-navy px-2.5 py-[0.3125rem] text-navy">
                {s.format}
              </span>
            </div>
          ) : null}
          {s.theme ? (
            <div>
              <FieldLabel>Thematic Area</FieldLabel>
              <span className="inline-block rounded-chip bg-cream-2 px-2.5 py-1.5 text-ink">
                {s.theme}
              </span>
            </div>
          ) : null}
        </div>
      ) : null}
    </li>
  );
}

/** Lockup, dates and handle at the foot of every card, so a screen grab of
 * any one card stands alone as a post. */
function CardFooter({ id, logo }: { id: string; logo: "positive" | "negative" }) {
  return (
    <footer className="mt-6 flex items-center justify-between gap-4 md:mt-8">
      <Logo id={id} variant={logo} className="h-9 w-auto md:h-12" />
      <p className="text-right font-eyebrow text-[0.75rem] font-semibold leading-snug md:text-small">
        {FESTIVAL.dates}
        <span className="block">@delhiartsandhealthfestival</span>
      </p>
    </footer>
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
          className="pointer-events-none absolute -bottom-[22%] -left-[6%] aspect-square w-[18%] rounded-chip bg-teal/70"
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
              <p className="font-display text-small font-semibold text-navy">Venue</p>
              <ul className="mt-3 space-y-2">
                {SCHEDULE_VENUES.map((v) => (
                  <li key={v.dates} className="flex items-start gap-2 text-[1rem] leading-snug">
                    <PinIcon className="mt-0.5 h-5 w-5 shrink-0 text-maroon" />
                    <span>
                      <span className="font-semibold text-navy">{v.dates}</span>
                      <span className="block">{v.venue}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <p className="font-display text-small font-semibold text-navy">
                Experience sections
              </p>
              {/* All five, Refresh included, even where no session carries it yet. */}
              <ul className="mt-3 flex flex-wrap gap-2.5 text-[1.0625rem] font-semibold md:text-[1.125rem]">
                {EXPERIENCES.map((e) => (
                  <li key={e} className={`rounded-chip px-4 py-2 ${EXPERIENCE[e].chip}`}>
                    {e}
                  </li>
                ))}
              </ul>
            </div>

            <CTAButton href={REGISTER_HREF} external className="mt-8">
              Register
            </CTAButton>
            <p className="mt-3 text-small italic">Open to all - Free Registration</p>
          </div>

          <nav aria-label="Jump to a day" className="lg:col-span-6">
            <ul className="grid grid-cols-5 gap-2 sm:gap-3">
              {SCHEDULE.map((sd) => {
                const d = DAYS[sd.day];
                const tone = DAY_TONE[d.bg];
                // Client direction: the hero bands alternate white / black
                // text, so the last (yellow) band takes white. Below AA
                // (~1.7:1 on yellow) — accepted for this band only; the
                // Muskaan day card further down keeps black.
                const text = d.bg === "yellow" ? "text-cream" : tone.text;
                const dateNum = sd.date.match(/\d+/)?.[0] ?? "";
                return (
                  <li key={d.name}>
                    <a
                      href={`#day-${sd.day + 1}`}
                      className={`group flex h-[16rem] flex-col items-center justify-between rounded-card py-4 transition-transform hover:-translate-y-1 sm:h-[20rem] lg:h-[24rem] ${tone.bg} ${text}`}
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
                      {/* Stacked so it fits the narrow phone columns. */}
                      <span className="text-center font-eyebrow text-[0.6875rem] font-semibold leading-tight sm:text-[0.8125rem]">
                        Day
                        <span className="block text-[1rem] font-bold sm:text-[1.25rem]">
                          {sd.day + 1}
                        </span>
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
            const n = sd.sessions.length;
            const cols = columnsFor(n);
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
                    <p className="mt-3 flex items-start gap-1.5 text-[0.9375rem] font-medium leading-snug md:text-[1rem]">
                      <PinIcon className="mt-0.5 h-4 w-4 shrink-0 md:h-5 md:w-5" />
                      <span>
                        <span className="sr-only">Venue: </span>
                        {sd.venue}
                      </span>
                    </p>
                  </div>
                  <Motif
                    variant={d.image.motif ?? "daisy"}
                    className="h-16 w-16 shrink-0 rounded-chip ring-4 ring-cream md:h-24 md:w-24"
                  />
                </header>

                {/* auto-rows-fr + flex-1: on a card with few sessions the
                    tiles stretch to fill the square frame instead of leaving
                    a bare band of colour above the footer. Busy four-across
                    cards skip it: equal rows would pad every row to the
                    tallest and push the card past 4:5. */}
                <ul
                  className={`mt-6 grid flex-1 gap-3 md:mt-8 md:gap-4 ${
                    cols === 4 ? "" : "md:auto-rows-fr"
                  } ${GRID[cols]}`}
                >
                  {sd.sessions.map((s, i) => (
                    <SessionTile
                      key={`${s.time}-${s.title}`}
                      s={s}
                      span={spanFor(i, n, cols)}
                      compact={cols === 4}
                    />
                  ))}
                </ul>

                <CardFooter id={`schedule-logo-${sd.day}`} logo={tone.logo} />
              </article>
            );
          })}

          {/* Exhibits, installations and stations that run across several
              days — one card of their own rather than repeated on each day.
              Same poster frame as the day cards, in maroon. */}
          <article
            id="also-at-the-festival"
            aria-label="Also at the Festival"
            className="flex scroll-mt-24 flex-col rounded-card bg-maroon p-5 text-cream sm:p-8 md:aspect-square md:p-10"
          >
            <header className="flex items-start justify-between gap-6">
              <div>
                <p className="font-eyebrow text-small font-semibold md:text-[1rem]">
                  {FESTIVAL.dates}
                </p>
                <h2 className="mt-3 font-display text-[clamp(2.25rem,5vw,3.75rem)] font-bold leading-none">
                  Also at the Festival
                </h2>
                <p className="mt-3 font-display text-[clamp(1.0625rem,1.8vw,1.375rem)] font-semibold leading-tight">
                  Exhibits, installations and experiences, open all day
                </p>
              </div>
              <Motif
                variant="kalash"
                className="h-16 w-16 shrink-0 rounded-chip ring-4 ring-cream md:h-24 md:w-24"
              />
            </header>

            <div className="mt-6 flex flex-1 flex-col gap-6 md:mt-8">
              {SCHEDULE_ALSO.map((g) => {
                const n = g.items.length;
                const cols = n >= 4 ? 4 : n >= 3 ? 3 : 2;
                return (
                  <section key={g.dates} aria-label={g.dates}>
                    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-display text-[1.0625rem] font-semibold leading-snug md:text-[1.125rem]">
                      <span>{g.dates}</span>
                      <span className="flex items-center gap-1.5 text-[0.9375rem] font-medium">
                        <PinIcon className="h-4 w-4 shrink-0" />
                        <span className="sr-only">Venue: </span>
                        {g.venue}
                      </span>
                    </p>
                    <ul className={`mt-3 grid gap-3 md:auto-rows-fr md:gap-4 ${GRID[cols]}`}>
                      {g.items.map((s, i) => (
                        <SessionTile
                          key={s.title}
                          s={s}
                          span={n === 1 ? "md:col-span-2 lg:col-span-4" : spanFor(i, n, cols)}
                        />
                      ))}
                    </ul>
                  </section>
                );
              })}
            </div>

            <div className="mt-6 border-t border-cream/30 pt-6 md:mt-8 md:pt-8">
              <p className="max-w-[60ch] font-display text-[clamp(1.0625rem,1.8vw,1.375rem)] font-semibold leading-snug">
                Open all 5 days: A curated marketplace of food, folklore,
                handmade crafts, and mindful gifts.
              </p>
              {/* Cream on maroon: the `invert` CTA, 6.8:1+ against this card. */}
              <CTAButton href={REGISTER_HREF} external variant="invert" className="mt-5">
                Register
              </CTAButton>
            </div>

            <CardFooter id="schedule-logo-also" logo="negative" />
          </article>

          {/* The Register button now lives inside the card above. */}
          <p className="mx-auto max-w-[52ch] text-center text-body">
            The schedule may change as the festival comes together. Register to
            hear about updates first.
          </p>
        </div>
      </section>
    </>
  );
}
