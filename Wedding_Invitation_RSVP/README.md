# Wedding Invitation React — Real RSVP email notifications

A complete full-browser React wedding invitation. This project has a real RSVP form that sends guest replies to **Formspree**, which can email the wedding host for each submission. Unlike the earlier demo, selecting Yes/No does NOT falsely claim that an RSVP was sent. Guests click **SEND RSVP**, and the confirmation displays only if Formspree returns success.

**IMPORTANT: RSVP delivery is NOT ACTIVE until you connect your own Formspree form ID and select a verified notification email.** The project has no access to your email account and cannot decide where to send the responses without that setup. No emails have been sent during testing.

## STEP 1 — Create your free email inbox integration (about 5 minutes of setup)

1. Open https://formspree.io and create a free account (or sign in).
2. Verify the email address on your account.
3. Create a form; call it **Wedding RSVPs**.
4. Choose **your email address** as the form's target email. In **Workflow > Actions**, make sure an **Email** notification action is enabled and directed at your verified email.
5. In **Workflow > Validation**, **remove any requirement for an `email` field** if your new form has one. Our invitation asks for guest NAME, RSVP and party size, NOT a guest email address. (Do not remove the EMAIL notification action.)
6. Open **Integration**, and copy the form ID from a URL like `https://formspree.io/f/xabcdefgh`. In this example the ID is just `xabcdefgh`.

Formspree's Free plan currently allows **50 submissions per month**. If you expect more, check their current plan limits. Formspree keeps responses in its dashboard, too. You should check your Inbox and Spam folder after a test RSVP.

## STEP 2 — Connect the project (Windows: easiest)

1. Extract the ZIP.
2. Double-click **SETUP_EMAIL_WINDOWS.cmd** in the extracted project folder.
3. Paste your Formspree form ID (just the final ID, not the complete URL), then press Enter.
4. This automatically updates THREE files: `src/App.jsx`, `OPEN_WEBSITE.html` and `DEPLOY_THIS_FOLDER/index.html`.
5. Do NOT share Formspree passwords or API keys. The public **form ID** is all that's needed.

**Or manually:** Open each of the three files and change ONLY the setting line:

    const RSVP_FORM_ID = 'PASTE_YOUR_FORMSPREE_ID';

to (using your real ID):

    const RSVP_FORM_ID = 'xabcdefgh';

Do not change the `RSVP_READY` line that compares the value against `'PASTE_YOUR_FORMSPREE_ID'`.

## STEP 3 — Test and deploy

**React (recommended for development):** Open a terminal in this folder and run:

    npm install
    npm run dev

Visit the localhost address printed by Vite, open the envelope, navigate to RSVP and submit a TEST response. If Formspree accepts it, you will see **RSVP sent — thank you!**. You should receive an email at the address you set in Formspree. You can also look for that submission in the Formspree dashboard.

**No-build hosting:** Upload the contents of `DEPLOY_THIS_FOLDER` to a static web host. The single `index.html` includes all needed CSS, images and JavaScript. It works in normal desktop/mobile browsers.

**Offline preview:** `OPEN_WEBSITE.html` still opens without npm and shows the animations, but the real email feature requires the internet. Some browsers/services reject form submissions from a `file://` page: use the hosted or `npm run dev` version for a reliable email test.

When sharing with guests, share the PUBLIC website address, not a local `.html` file.

## What guests fill out

- Their name (required)
- Yes, attending or No, cannot attend (required)
- Number attending (only for Yes)
- Optional short message

When guests submit, Formspree receives the details and can email you a notification. The site displays a success message only after a successful response from the server; otherwise it shows an actionable error. Guests can update and resubmit their response, which sends a new notification.

## Features unchanged

- Full-screen website; no phone frame
- Envelope-opening animation
- Manual up/down scroll/swipe/keyboard navigation
- Auto-scroll on regular scenes, **paused on RSVP** so guests can finish
- Sai Garden, Ganga Darshan Colony / Saket Puri Colony / Sabri Nai Dasami, Mirzapur, Uttar Pradesh 231001
- Google Maps button, sharing, thank-you scene
- Reference video button removed

**Sample wedding text:** The couple names (Ayaan & Hiba) and dates are examples from the reference video and can be edited inside `src/App.jsx` in the `WEDDING` object. If using the pre-built standalone HTML, edit the matching values there or build the React project.

## Troubleshooting

- **"Email delivery is not connected"**: connect your real Formspree form ID using `SETUP_EMAIL_WINDOWS.cmd` (or edit the configuration line). In React, restart the development server if needed.
- **"Required field email"**: remove the email-field requirement in Formspree Workflow > Validation. Our form intentionally does not ask for guest emails.
- **"No email arrived"**: check Formspree submissions dashboard, target email, Workflow Email action, linked/verified address, and Spam folder. A successful website response proves acceptance, NOT that the recipient's email server delivered it.
- **"Request failed"**: verify that your form ID is correct, the form is active, and the internet works; test from a hosted or localhost web page instead of `file://`.
- **Many guests**: Formspree free-tier submissions are limited. For a large wedding, use an appropriately sized plan or another backend.

External provider: https://formspree.io. Use of their service is subject to their current policies and quota limits.
