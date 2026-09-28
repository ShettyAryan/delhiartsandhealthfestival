import Link from "next/link";
import ColorSection from "@/components/color-section";
import { GRIEVANCES_EMAIL } from "@/lib/content";
import type { LegalDoc } from "@/lib/legal";

/**
 * Shared renderer for the two legal pages (Terms & Refund Policy, Privacy
 * Policy) — same editorial structure as the rest of the site (a plain
 * numbered-clause list, in the vein of About's "What We Hope to Achieve"),
 * just applied to a much longer document. Bullet dots reuse that section's
 * maroon-dot treatment; a bold "sub" line (Privacy's "Information you give
 * us when you register:" style lead-ins) gets no bullet or number of its
 * own, since the source document doesn't number it either.
 *
 * No hero photo — CLAUDE.md's photo slots are for festival imagery, and nothing
 * on hand actually illustrates a Refund Policy. The heading, eyebrow date, and
 * intro paragraphs carry the top of the page instead, same type treatment as
 * every other page's own hero.
 */
export default function LegalDocument({ doc }: { doc: LegalDoc }) {
  return (
    <>
      <ColorSection tone="cream" className="pt-8 md:pt-12">
        <p className="font-eyebrow text-eyebrow text-maroon">{doc.title}</p>
        {/* A dedicated, smaller clamp than the shared --text-h1 token: Terms'
            title is a long sentence, not a short page name, and at full
            text-h1 size it wraps to three towering lines. */}
        <h1 className="mt-4 max-w-[24ch] font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.05] text-navy">
          {doc.subtitle}
        </h1>
        <div className="mt-5 h-1.5 w-16 bg-teal" />
        <p className="mt-6 font-body text-small text-navy/70">
          Last updated: {doc.lastUpdated}
        </p>
        <div className="mt-6 max-w-[75ch] space-y-4">
          {doc.intro.map((p, i) => (
            <p key={i} className="text-lead">
              {p}
            </p>
          ))}
        </div>
      </ColorSection>

      <ColorSection tone="cream-2">
        <div className="space-y-12 md:space-y-14">
          {doc.sections.map((section) => (
            <div key={section.heading} className="border-t border-navy/20 pt-8">
              <h2 className="font-display text-h3 font-bold text-navy">{section.heading}</h2>
              <div className="mt-4 max-w-[75ch] space-y-4">
                {section.blocks.map((block, i) => {
                  if (block.type === "p") {
                    return (
                      <p key={i} className="text-body">
                        {block.text}
                      </p>
                    );
                  }
                  if (block.type === "sub") {
                    return (
                      <p key={i} className="font-semibold text-navy">
                        {block.text}
                      </p>
                    );
                  }
                  if (block.type === "email") {
                    return (
                      <p key={i}>
                        <a
                          href={`mailto:${GRIEVANCES_EMAIL}`}
                          className="text-maroon underline decoration-1 underline-offset-4"
                        >
                          {GRIEVANCES_EMAIL}
                        </a>
                      </p>
                    );
                  }
                  return (
                    <ul key={i} className="space-y-2">
                      {block.items.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span
                            aria-hidden="true"
                            className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-chip bg-maroon"
                          />
                          <span className="text-body">{item}</span>
                        </li>
                      ))}
                    </ul>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {doc.closing ? (
          <p className="mt-14 max-w-[75ch] border-t border-navy/20 pt-8 text-body">
            This policy should be read together with our{" "}
            <Link
              href="/terms"
              className="text-maroon underline decoration-1 underline-offset-4"
            >
              Registration Terms and Conditions
            </Link>
            .
          </p>
        ) : null}
      </ColorSection>
    </>
  );
}
