import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Variants per CLAUDE.md §7: primary = pink fill / cream text,
 * secondary = navy outline / navy text.
 *
 * No `→` appended — §2 rules that out.
 */
export default function CTAButton({
  href,
  children,
  variant = "primary",
  external = false,
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "invert";
  external?: boolean;
  className?: string;
}) {
  // The lift/press is a plain CSS transition, not motion/react — it's already
  // covered by the global `prefers-reduced-motion` rule in globals.css, which
  // zeroes every transition-duration, so it needs no useReducedMotion check.
  const base =
    "inline-flex items-center justify-center rounded-chip px-7 py-3.5 font-body text-body font-medium transition-[color,background-color,transform] hover:-translate-y-0.5 active:translate-y-0";

  const VARIANTS = {
    // §7 asks for cream text on the pink fill, but that measures 3.3:1 — below
    // AA at this size. Black on pink is 5.2:1 and keeps the pink signature.
    primary: "bg-pink text-black hover:bg-maroon hover:text-cream",
    secondary: "border-2 border-navy text-navy hover:bg-navy hover:text-cream",
    // For use on pink/red sections, where a navy outline would only reach 4.4:1.
    invert: "bg-cream text-navy hover:bg-white",
  } as const;

  const styles = VARIANTS[variant];

  const cls = `${base} ${styles} ${className ?? ""}`;

  if (external) {
    // mailto:/tel: hand off to another app — opening a blank tab first just
    // leaves an empty window behind.
    const handoff = /^(mailto|tel):/.test(href);
    return (
      <a
        href={href}
        {...(handoff ? {} : { target: "_blank", rel: "noopener noreferrer" })}
        className={cls}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
