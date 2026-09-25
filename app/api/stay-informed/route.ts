/**
 * Receives the hero's "Stay Informed" email sign-ups and forwards them to
 * whatever collects them. There is no database in this project, so the
 * destination is configured, not hard-coded: set STAY_INFORMED_WEBHOOK to a
 * URL that accepts a JSON POST. The intended target is the Google Apps Script
 * web app in google-apps-script/stay-informed.gs, which appends each address to
 * a Google Sheet (setup: README-stay-informed.md). STAY_INFORMED_SECRET, if
 * set, is sent along so the script can reject requests that did not come from
 * this site.
 *
 * Until that variable is set the route answers 503, and the modal tells the
 * visitor to try again later rather than pretending the address was saved.
 */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let body: { email?: unknown; website?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field. Report success so
  // a bot has nothing to learn from.
  if (typeof body.website === "string" && body.website.length > 0) {
    return Response.json({ ok: true });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!EMAIL.test(email) || email.length > 254) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const webhook = process.env.STAY_INFORMED_WEBHOOK;
  if (!webhook) {
    return Response.json({ error: "Sign-ups are not available yet." }, { status: 503 });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        source: "website-stay-informed",
        ...(process.env.STAY_INFORMED_SECRET ? { secret: process.env.STAY_INFORMED_SECRET } : {}),
        submittedAt: new Date().toISOString(),
      }),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    // Apps Script answers 200 even on failure; its JSON body says which.
    const reply = (await res.json().catch(() => null)) as { ok?: boolean } | null;
    if (reply && reply.ok === false) throw new Error("Webhook rejected the sign-up");
  } catch {
    return Response.json({ error: "Something went wrong. Please try again." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
