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
```

`CONTACT_FROM_EMAIL` must be on the **verified** Resend domain (`svhealthcare.in`).

### 4. After deploy

- Test `/contact-us/` and footer newsletter
- Confirm mail arrives at `info@svhealthcare.in`
- Check `/sitemap.xml` and `/robots.txt`

Do not paste an old static-export `.htaccess` over the proxy file GoDaddy creates for the Node app.

Mail is sent by Next.js routes (`/api/contact`, `/api/newsletter`) using Resend. PHP mail files have been removed.
