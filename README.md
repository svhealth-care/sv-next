# S V Healthcare

Next.js website for [svhealthcare.in](https://svhealthcare.in).

## Local development

```bash
npm install
cp .env.example .env
# add your Resend key in .env
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## GoDaddy Node.js Apps (GitHub)

Use **Node.js Apps → Add App → Connect GitHub**. Prefer **`new.svhealthcare.in` first**, then switch the primary domain after it works.

### 1. GitHub

Push this repo (`main` branch). Do **not** commit `.env`.

### 2. Node.js app settings

| Field | Value |
|---|---|
| Node version | **20** |
| Application root | `/` (repo root) |
| Application URL | `new.svhealthcare.in` (test) |
| Startup file | `server.js` |
| Build | `npm install && npm run build` |
| Start | `npm start` |

### 3. Environment variables (required)

Add these in the Node.js Apps dashboard, then restart:

```
NODE_ENV=production
RESEND_API_KEY=re_...
CONTACT_TO_EMAIL=info@svhealthcare.in
CONTACT_FROM_EMAIL=noreply@svhealthcare.in
IPHEX_BOOKINGS_PATH=/absolute/persistent/path/iphex-bookings.json
IPHEX_ADMIN_KEY=a-long-random-secret
```

`CONTACT_FROM_EMAIL` must be on the **verified** Resend domain (`svhealthcare.in`).
`IPHEX_BOOKINGS_PATH` must be a writable JSON file that survives GitHub deploys.
`IPHEX_ADMIN_KEY` is the secret for the private bookings page. Local defaults are
`./data/iphex-bookings.json` and a key you set in `.env.local`.

### 4. After deploy

- Test `/contact-us/` and footer newsletter
- Test the iPHEX popup, availability, and attendee confirmation email
- Confirm mail arrives at `info@svhealthcare.in`
- Open `/iphex-bookings/?key=YOUR-SECRET` and confirm the JSON list
- Check `/sitemap.xml` and `/robots.txt`

Full iPHEX JSON steps: [docs/iphex-bookings.md](docs/iphex-bookings.md).

Do not paste an old static-export `.htaccess` over the proxy file GoDaddy creates for the Node app.

Mail is sent by Next.js routes (`/api/contact`, `/api/newsletter`) using Resend. PHP mail files have been removed.
