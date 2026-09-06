import Link from "next/link";
import Logo from "@/components/logo";
import { MuralStrip } from "@/components/motif";
import { CONTACT, FOOTER_LINKS, SOCIALS, FESTIVAL } from "@/lib/content";

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
    <footer className="bg-navy text-cream">
      <FooterMural />

      <div className="px-section-x py-section-y">
        <div className="mx-auto grid w-full max-w-360 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo id="ftr" variant="negative" orientation="stacked" className="w-44" />
            <p className="mt-6 font-mono text-mono tracking-[0.08em] text-yellow">
              {FESTIVAL.datesLine}
            </p>
          </div>

          <div className="lg:col-span-4">
            <h2 className="font-display text-h3 font-semibold text-cream">
              Write to us
            </h2>
            <dl className="mt-5 space-y-4">
              {CONTACT.map((c) => (
                <div key={c.email}>
                  <dt className="font-mono text-mono tracking-[0.08em] text-yellow">
                    {c.role}
                  </dt>
                  <dd>
                    <a
                      href={`mailto:${c.email}`}
                      className="font-body text-body underline decoration-1 underline-offset-4 hover:text-yellow"
                    >
                      {c.email}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-3 lg:col-start-10">
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
            <ul className="mt-5 space-y-2">
              {SOCIALS.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-body hover:text-yellow"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
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
