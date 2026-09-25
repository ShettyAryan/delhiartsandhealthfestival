# Stay Informed sign-ups → Google Sheet

The website's email pop-up posts to `/api/stay-informed`, which forwards each
address to a Google Apps Script web app that appends it to a Sheet.

## One-time setup

1. Create a Google Sheet (any name, e.g. "DAHF sign-ups").
2. In the Sheet: **Extensions → Apps Script**. Delete the default code and paste
   in `google-apps-script/stay-informed.gs`. Save.
3. (Optional) Set `SECRET` at the top of the script to a long random string.
4. **Deploy → New deployment → type: Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Deploy, approve the permissions prompt, and copy the **Web app URL**
     (ends in `/exec`).
5. Give the website the URL:
   - Locally: create `.env.local` with
     `STAY_INFORMED_WEBHOOK=<the /exec URL>` (and `STAY_INFORMED_SECRET=<secret>`
     if you set one), then restart `npm run dev`.
   - On Vercel: Project → Settings → Environment Variables, add the same
     variable(s), then redeploy.

Each sign-up becomes a row: submitted-at, email, source. Repeat addresses are
skipped. After editing the script, use **Deploy → Manage deployments → Edit →
New version** so the live URL picks up the change.
