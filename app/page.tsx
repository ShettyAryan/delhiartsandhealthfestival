"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { MuralStrip } from "@/components/motif";
import { InstagramIcon, LinkedInIcon, YoutubeIcon } from "@/components/social-icons";
import { CONTACT_EMAIL, FESTIVAL, SOCIALS } from "@/lib/content";

/** Keyed on `lib/content.ts`'s own social labels, not platform slugs. */
const SOCIAL_ICON: Record<
  string,
  (props: { className?: string; id?: string }) => React.JSX.Element
> = {
  Instagram: InstagramIcon,
  LinkedIn: LinkedInIcon,
  YouTube: YoutubeIcon,
};

export default function Home() {
  const reduced = useReducedMotion();

  return (
    <div className="flex min-h-full flex-col">
      {/* Capped to one viewport tall (`h-dvh`, not `min-h-dvh`) — everything
          inside has to fit, so it stays overflow-hidden rather than growing
          past the fold. The footer strip lives outside this section. */}
      <section className="relative z-0 flex h-dvh flex-col items-center justify-center overflow-hidden bg-cream px-section-x py-6">
        {/*
          Same decorative circles as the main site's hero (CLAUDE.md §0.11) —
          flat brand-colour discs, not organic blobs, echoing the Venn's own
          circle language. Low opacity here so they read as a wash behind the
          logo and headline rather than competing with them. Ambient float,
          frozen under reduced motion.
        */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[10%] -top-[14%] -z-10 aspect-square w-[36%] rounded-chip bg-pink opacity-20"
          animate={reduced ? undefined : { y: [0, -22, 0], x: [0, 12, 0] }}
          transition={reduced ? undefined : { duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -left-[12%] bottom-[6%] -z-10 aspect-square w-[26%] rounded-chip bg-yellow opacity-20"
          animate={reduced ? undefined : { y: [0, 18, 0], x: [0, -10, 0] }}
          transition={
            reduced ? undefined : { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }
          }
        />

        <motion.div
          className="relative z-10 mx-auto flex w-full max-w-360 flex-col items-center text-center"
          initial={reduced ? undefined : { opacity: 0, y: 16 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="font-mono text-mono tracking-[0.08em] text-maroon">
            {FESTIVAL.datesLine}
          </p>

          {/* The real festival mark (public/assets), trimmed of its transparent
              margin — carries the DELHI wordmark and "Arts & Health Festival"
              lockup itself, so the page no longer redraws either as SVG. */}
          <Image
            src="/assets/dahf-logo.png"
            alt={FESTIVAL.name}
            width={714}
            height={252}
            priority
            className="mt-4 h-auto w-56 sm:w-64 md:mt-6 md:w-80"
          />

          {/* "Coming Soon" is this page's one deliberately bold moment
              (CLAUDE.md §2 principle 5) — the main site spends that on the
              DELHI wordmark; this page has nothing else to say, so it says
              this, loudly. */}
          <h1 className="mt-3 font-display text-[clamp(2.75rem,9vw,6.5rem)] font-bold uppercase leading-[0.95] text-pink md:mt-4">
            Coming Soon
          </h1>

          <p className="mt-4 max-w-[46ch] text-lead italic text-ink md:mt-5">
            {FESTIVAL.subheading}
          </p>

          <p className="mt-6 font-mono text-mono tracking-[0.08em] text-maroon md:mt-8">
            Follow Along
          </p>
          <ul className="mt-4 flex items-center justify-center gap-5">
            {SOCIALS.map((s) => {
              const Icon = SOCIAL_ICON[s.label];
              return (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="inline-flex h-16 w-16 items-center justify-center rounded-chip bg-navy text-cream transition-colors hover:bg-pink hover:text-black"
                  >
                    <Icon className="h-8 w-8" id={`hero-${s.label}`} />
                  </a>
                </li>
              );
            })}
          </ul>
        </motion.div>
      </section>

      {/* Full-width mural band as a closing strip (CLAUDE.md §3.3: the mural
          belongs in the footer, once — not tiled behind text). */}
      <footer className="bg-navy text-cream">
        <div className="h-14 w-full overflow-hidden md:h-20">
          <MuralStrip id="footer-mural" className="h-full w-full" />
        </div>
        <div className="flex flex-col items-center gap-3 px-section-x py-8 text-center md:flex-row md:justify-between md:text-left">
          <p className="font-body text-small text-cream/80">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="underline decoration-1 underline-offset-4 hover:text-yellow"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {SOCIALS.map((s) => {
              const Icon = SOCIAL_ICON[s.label];
              return (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-body text-small text-cream/80 hover:text-yellow"
                  >
                    <Icon className="h-5 w-5" id={`footer-${s.label}`} />
                    {s.label}
                  </a>
                </li>
              );
            })}
          </ul>
          <p className="font-body text-small text-cream/60">
            © {new Date().getFullYear()} {FESTIVAL.name}
          </p>
        </div>
      </footer>
    </div>
  );
}
