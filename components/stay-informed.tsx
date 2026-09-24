"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

type Status = "idle" | "sending" | "done" | "error";

/**
 * "Stay Informed" button plus the email-collection modal it opens. Same
 * open/close mechanics as <TeamModal>: Escape and backdrop close it, focus
 * moves into the dialog on open and back to the button on close, and body
 * scroll locks while it is up.
 */
export default function StayInformed({
  children = "Stay Informed",
  variant = "button",
}: {
  children?: React.ReactNode;
  /** `button` is the outlined hero CTA; `link` is an inline text link. */
  variant?: "button" | "link";
}) {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const triggerRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    inputRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [open]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setStatus("sending");
    setMessage("");
    try {
      const res = await fetch("/api/stay-informed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.get("email"),
          website: data.get("website"),
        }),
      });
      if (res.ok) {
        setStatus("done");
        return;
      }
      const json = (await res.json().catch(() => null)) as { error?: string } | null;
      setMessage(json?.error ?? "Something went wrong. Please try again.");
    } catch {
      setMessage("Something went wrong. Please try again.");
    }
    setStatus("error");
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => {
          setStatus("idle");
          setMessage("");
          setOpen(true);
        }}
        className={
          variant === "link"
            ? "cursor-pointer text-maroon underline decoration-1 underline-offset-4 hover:text-navy"
            : "inline-flex items-center justify-center rounded-chip border-2 border-navy px-7 py-3.5 font-body text-body font-medium text-navy transition-[color,background-color,transform] hover:-translate-y-0.5 hover:bg-navy hover:text-cream active:translate-y-0"
        }
      >
        {children}
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-navy/70 p-4 md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0.01 : 0.2 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) close();
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="stay-informed-title"
              className="relative w-full max-w-lg rounded-card bg-cream p-7 text-ink md:p-10"
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: reduced ? 0.01 : 0.25, ease: "easeOut" }}
            >
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center text-navy md:right-5 md:top-5"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                  <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="5" y1="5" x2="19" y2="19" />
                    <line x1="19" y1="5" x2="5" y2="19" />
                  </g>
                </svg>
              </button>

              <h2
                id="stay-informed-title"
                className="pr-10 font-display text-h3 font-bold text-navy"
              >
                Stay Informed
              </h2>

              {status === "done" ? (
                <div role="status" className="mt-4">
                  <p className="text-body">
                    Thank you. We will keep you posted on the Delhi Arts &amp; Health Festival.
                  </p>
                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={close}
                      className="inline-flex items-center justify-center rounded-chip bg-navy px-7 py-3.5 font-body text-body font-medium text-cream transition-colors hover:bg-maroon"
                    >
                      Close
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="mt-4">
                  <p className="text-body">
                    Share your email and we will send you updates on the festival, 2 to 6
                    December 2026.
                  </p>
                  <label htmlFor="stay-informed-email" className="mt-6 block text-small font-semibold text-navy">
                    Email address
                  </label>
                  <input
                    ref={inputRef}
                    id="stay-informed-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    aria-describedby={status === "error" ? "stay-informed-error" : undefined}
                    aria-invalid={status === "error" ? true : undefined}
                    className="mt-2 w-full rounded-chip border-2 border-navy bg-white px-5 py-3.5 font-body text-body text-ink"
                  />
                  {/* Honeypot — hidden from people and assistive tech. */}
                  <div aria-hidden="true" className="absolute -left-2499.75 h-0 w-0 overflow-hidden">
                    <label>
                      Website
                      <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                    </label>
                  </div>
                  {status === "error" ? (
                    <p id="stay-informed-error" role="alert" className="mt-3 text-small font-semibold text-maroon">
                      {message}
                    </p>
                  ) : null}
                  <div className="mt-6">
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="inline-flex items-center justify-center rounded-chip bg-navy px-7 py-3.5 font-body text-body font-medium text-cream transition-colors hover:bg-maroon disabled:opacity-60"
                    >
                      {status === "sending" ? "Sending" : "Subscribe"}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
