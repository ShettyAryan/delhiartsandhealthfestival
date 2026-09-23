/**
 * Receives the hero's "Stay Informed" email sign-ups and forwards them to
 * whatever collects them. There is no database in this project, so the
 * destination is configured, not hard-coded: set STAY_INFORMED_WEBHOOK to a
 * URL that accepts a JSON POST (a Google Apps Script web app writing to a
 * Sheet, Formspree, Zapier, a mailing-list provider's webhook, and so on).
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
        source: "website-hero-stay-informed",
        submittedAt: new Date().toISOString(),
      }),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  } catch {
    return Response.json({ error: "Something went wrong. Please try again." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
