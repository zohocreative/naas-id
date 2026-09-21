# NAAS ID Portal — Setup Guide

A small, fast, plain-JS website (no build tools, no framework) that connects
directly to your NAAS Campus Google Sheet. It has three pages people will use:

- **`student.html`** — Student/Parent Portal (login with Student ID + phone)
- **`admin.html`** — Admin Panel (search all students, view profile, print/download ID cards)
- **`scan.html`** — what a printed ID card's QR code opens (asks for phone PIN, shows fee status)

It is **read-only** — nobody can change your Sheet data through this site.
All data entry still happens exactly where it does today: in the Google Sheet.

---

## Step 1 — Update your Google Sheet's script

1. Open your NAAS Campus Google Sheet → **Extensions ▸ Apps Script**.
2. Replace the contents of your existing script file with the updated
   **`naas_engine.gs`** (delivered alongside this portal).
3. Save (Ctrl+S / Cmd+S).
4. Back in the Sheet, refresh the page once so the **NAAS** menu reloads.

## Step 2 — Set the Admin Panel password

In the Sheet: **NAAS menu ▸ "Set ID Portal Admin Password"** — type a
password only staff should know. This is what the Admin Panel (`admin.html`)
will ask for. Nothing in the Admin Panel works until this is set.

## Step 3 — Deploy the Web App (the API this site talks to)

1. Still in **Extensions ▸ Apps Script**, click **Deploy ▸ New deployment**.
2. Click the gear icon next to "Select type" → choose **Web app**.
3. Settings:
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Click **Deploy**, then **Authorize access** (approve the permissions
   prompt — this is your own script asking to read your own Sheet).
5. Copy the **Web app URL** it gives you (ends in `/exec`).

> Whenever you edit `naas_engine.gs` again later, use **Manage deployments ▸
> Edit (pencil icon) ▸ Version: New version ▸ Deploy** — NOT "New deployment"
> — so this same URL keeps working without needing to update the site again.

## Step 4 — Connect the site to your Sheet

Open **`config.js`** in this folder and paste the URL from Step 3:

```js
const API_URL = "https://script.google.com/macros/s/XXXXXXXXXXXX/exec";
```

Save the file.

## Step 5 — Host the site

Any static hosting works — no server needed. Easiest free options:

- **GitHub Pages**: create a repo, upload all files in this folder, turn on
  Pages in repo settings → your site is live at `yourname.github.io/repo`.
- **Netlify / Vercel**: drag-and-drop this whole folder onto their dashboard.
- Or point your own domain (like `zio.lk`) at whichever host you pick.

That's it — share the link with parents/students, and keep the Admin Panel
link (`/admin.html`) private to staff.

---

## Notes & things to know

- **Photo on ID card**: add a `Photo URL` column (already added to the
  Students sheet template) — paste a public image link (Google Drive
  "Anyone with the link" share URL works, or any direct image URL). If
  left blank, the card shows the student's initials instead.
  ⚠️ Sheets you already created **before** this update won't have this
  column yet — add a "Photo URL" column yourself at the end of any
  existing `* — Students` sheet if you want photos there too.
- **PIN = last 4 digits of the phone number** on the student's own row.
  This protects the QR-scan page and is also the Portal login password
  (no separate password to manage).
- **ID card themes**: Course students get a green card, Class students get
  a blue card — same layout, instantly different at a glance.
- **Everything stays live**: since the site reads the Sheet directly, any
  edit you make in the Sheet (fee paid, attendance marked) shows up on the
  portal immediately — no separate sync step.
- If the site ever shows *"Couldn't reach the server"*, the usual causes
  are: `config.js` still has the placeholder URL, or the deployment's
  "Who has access" isn't set to Anyone.
