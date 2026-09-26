import Link from "next/link";
import Image from "next/image";
import { MuralStrip } from "@/components/motif";
import SocialIcon, { platformFromLabel } from "@/components/social-icon";
import { CONTACT, FOOTER_LINKS, GRIEVANCES_EMAIL, SOCIALS, FESTIVAL } from "@/lib/content";

/** Static mural band — no parallax here, the footer is a full stop. */
function FooterMural() {
  return (
    <div className="h-20 w-full overflow-hidden md:h-28">
      <MuralStrip id="footer-mural" className="h-full w-full" />
    </div>
  );
}

export default function SiteFooter() {
  return (
    <footer className="bg-black text-cream">
      <FooterMural />

      <div className="px-section-x py-section-y">
        <div className="mx-auto grid w-full max-w-360 gap-12 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-4">
            <Image
              src="/images/logowhitebig.png"
              alt="Delhi Arts & Health Festival"
              width={864}
              height={1080}
              className="w-44 h-auto"
            />
            <p className="mt-6 font-eyebrow text-eyebrow text-yellow">
              {FESTIVAL.datesLine}
            </p>
          </div>

          <div className="min-w-0 lg:col-span-4">
            <h2 className="font-display text-h3 font-semibold text-cream">
              Write to us
            </h2>
            <dl className="mt-5 space-y-4">
              {CONTACT.map((c) => (
                <div key={c.email}>
                  <dt className="font-eyebrow text-eyebrow text-yellow">
                    {c.role}
                  </dt>
                  <dd>
                    <a
                      href={`mailto:${c.email}`}
                      className="break-words font-body text-body underline decoration-1 underline-offset-4 hover:text-yellow"
                    >
                      {c.email}
                    </a>
                  </dd>
                </div>
              ))}
              <div>
                <dt className="font-eyebrow text-eyebrow text-yellow">
                  Grievances
                </dt>
                <dd>
                  <a
                    href={`mailto:${GRIEVANCES_EMAIL}`}
                    className="break-words font-body text-body underline decoration-1 underline-offset-4 hover:text-yellow"
                  >
                    {GRIEVANCES_EMAIL}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <div className="min-w-0 lg:col-span-3 lg:col-start-10">
            <h2 className="font-display text-h3 font-semibold text-cream">
              Explore
            </h2>
            <ul className="mt-5 space-y-2">
              {FOOTER_LINKS.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="font-body text-body hover:text-yellow">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h2 className="mt-10 font-display text-h3 font-semibold text-cream">
              Follow
            </h2>
            {/* Logo badges, not text links — each still carries an
                aria-label since the glyph alone (SVG marked aria-hidden)
                isn't an accessible name. 44px badges clear the 24px WCAG
                2.5.8 target-size minimum with room to spare. */}
            <ul className="mt-5 flex gap-3">
              {SOCIALS.map((s) => {
                const platform = platformFromLabel(s.label);
                return (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="flex h-11 w-11 items-center justify-center rounded-chip border border-cream/30 text-cream transition-colors hover:border-yellow hover:text-yellow"
                    >
                      {platform ? (
                        <SocialIcon platform={platform} className="h-5 w-5" />
                      ) : (
                        <span className="font-body text-small">{s.label[0]}</span>
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <p className="mx-auto mt-16 w-full max-w-360 font-body text-small text-cream/70">
          © {new Date().getFullYear()} {FESTIVAL.name}
        </p>
      </div>
    </footer>
  );
}
