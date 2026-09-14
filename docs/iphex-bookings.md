# iPHEX bookings — JSON file + private page

Bookings are saved in a JSON file. There is no SQLite database.

## Feature flag (on / off)

Public event UI is controlled by `enabled` in `lib/iphex-event.ts`.

```ts
export const IPHEX_EVENT = {
  enabled: false, // false = hide popup + navbar button + booking form
  // ...
};
```

- `false` → visitors do not see the event (current setting after iPHEX closed)
- `true` → popup, iPHEX button, and booking form are live again

Booking APIs return `410` when the event is disabled. The private admin page at `/iphex-bookings/` still works so you can review old submissions.

For the next event: update name, image, dates, and slots, then set `enabled: true` and deploy.

## Local check

1. Copy `.env.example` values into `.env.local`.
2. Set a secret:

```
IPHEX_BOOKINGS_PATH=./data/iphex-bookings.json
IPHEX_ADMIN_KEY=local-iphex-admin
```

3. Run `npm run dev`.
4. Book a test slot on the site.
5. Open:

[http://localhost:3000/iphex-bookings/?key=local-iphex-admin](http://localhost:3000/iphex-bookings/?key=local-iphex-admin)

6. Click **Download JSON** if you want the file on your computer.

The file on disk is:

`data/iphex-bookings.json`

## GoDaddy setup

Add these in **Node.js Apps → Environment variables**, then restart:

```
NODE_ENV=production
RESEND_API_KEY=re_...
CONTACT_TO_EMAIL=info@svhealthcare.in
CONTACT_FROM_EMAIL=noreply@svhealthcare.in
IPHEX_BOOKINGS_PATH=/home/YOUR_USER/iphex-data/iphex-bookings.json
IPHEX_ADMIN_KEY=a-long-random-secret
```

Use a folder **outside** the app clone if GitHub deploys replace the project files. Ask GoDaddy support for a persistent writable path if you are unsure. One app instance is enough.

Choose a long `IPHEX_ADMIN_KEY`. Do not commit it.

## After deploy, how to see data

Open:

```
https://YOUR-DOMAIN/iphex-bookings/?key=YOUR-SECRET
```

Bookmark that URL.

You will see:

- slot date and time
- name
- company
- email
- phone
- submitted time (IST)

Use **Download JSON** for a backup.

## What a record looks like

```json
[
  {
    "slotId": "2026-09-08-13",
    "date": "Tuesday, 8 September 2026",
    "time": "1:00 PM – 2:00 PM",
    "name": "Amit Shah",
    "company": "Example Pharma",
    "email": "amit@example.com",
    "phone": "+919876543210",
    "createdAt": "2026-08-26T16:55:00.000Z"
  }
]
```

A booked `slotId` cannot be taken again.

## Notes

- This page is private (`noindex`) and blocked in `robots.txt`.
- Still keep the admin email as a backup.
- Do not put the JSON file in `public/`.
- If you redeploy and did not set a persistent `IPHEX_BOOKINGS_PATH`, the list can reset.
