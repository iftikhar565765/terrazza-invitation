# Deploying Rosalind to Cloudflare

The site is a **Cloudflare Worker** (static assets + a small API) with a
**D1 database** for invitations and RSVPs. The free plan is enough:
Workers free tier allows 100,000 requests/day and D1 free tier allows
5 GB storage with 5 million row-reads/day — a wedding invitation uses a
tiny fraction of that.

Key names used throughout this project:

| Setting | Value |
| --- | --- |
| Worker name | `terrazza-invitation` |
| D1 database name | `terrazza-invitations` |
| Repository | `https://github.com/iftikhar565765/terrazza-invitation` |

Use exactly the database name above so the migration commands resolve.

There are two ways to deploy. **Path A** (dashboard + Git) needs no local
terminal; **Path B** uses the CLI from your own machine.

---

## Path A — Dashboard + GitHub (recommended, no terminal)

### Step 1 — Create the D1 database

1. Open the Cloudflare dashboard: <https://dash.cloudflare.com>
2. In the left sidebar choose **Storage & Databases → D1 SQL Database**.
   (Older layouts: **Workers & Pages → D1**.)
3. Click **Create Database**.
4. **Database name:** `terrazza-invitations`
5. **Location:** *Auto* is fine (or pick the region closest to most guests).
6. Click **Create**.
7. On the database's detail page find **Database ID** and copy it —
   it looks like `3f8a1c2e-9b4d-4e77-a1b2-c3d4e5f60718`.

### Step 2 — Put the Database ID into the project

Open `wrangler.jsonc` in the repo, replace
`REPLACE_WITH_YOUR_NEW_D1_DATABASE_ID` with the copied ID, commit and
push to `main`.

> The Database ID is an internal identifier, not a secret. It only works
> inside your own Cloudflare account, so committing it is safe.

### Step 3 — Create the tables (schema)

1. In the dashboard, open your `terrazza-invitations` database.
2. Open the **Console** tab.
3. Open `migrations/0001_initial.sql` from the repo, copy **all** of it,
   paste into the console, and click **Run**.
4. You should see the statements succeed. The database now has the
   `invitations`, `rsvps`, and `request_limits` tables.

### Step 4 — Connect the GitHub repo

1. Dashboard → **Workers & Pages → Create → Workers**.
2. Choose **Connect to Git** (Import an existing repository) and
   authorize GitHub access.
3. Select the repository `iftikhar565765/terrazza-invitation`, branch `main`.
4. Build settings:
   - **Build command:** `npm run build`
   - **Deploy command:** `npx wrangler deploy`
   - (Leave the rest as defaults; `wrangler.jsonc` is the source of truth.)
5. Click **Create and Deploy**. The first build takes a minute or two.
6. When it finishes you get a live URL like
   `https://terrazza-invitation.<your-subdomain>.workers.dev`.

Every future `git push` to `main` rebuilds and redeploys automatically.

### Step 5 — Optional secrets (recommended)

Worker → **Settings → Variables and Secrets → Add** (type *Secret*):

| Variable | Purpose | Required? |
| --- | --- | --- |
| `ACCESS_CODE` | When set, guests must quote this code before the first publish from the editor. Protects your editor from strangers. | Recommended |
| `RESEND_API_KEY` | Reply-notification emails via [resend.com](https://resend.com) | Optional |
| `RSVP_FROM` | Verified "from" address for those emails (set together with the key) | Optional |

Without the email variables, replies are still stored in D1 and visible
in the editor's replies panel and at `/replies` — nothing is lost.

### Step 6 — Social preview links

After the first deploy, update the `og:url` / `og:image` / `twitter:image`
URLs in `index.html` to your real `*.workers.dev` (or custom-domain)
address so shared links show the correct preview card, then push.
(They currently point at
`https://terrazza-invitation.glauxstudio.workers.dev` — if that is your
final URL, nothing to change.)

### Step 7 — Optional custom domain

Worker → **Settings → Domains & Routes → Add Custom Domain** — point it
at a domain hosted in the same Cloudflare account (e.g.
`invite.yourdomain.com`). DNS and the certificate are handled for you.

---

## Path B — CLI from your machine

```bash
# 1. Get the code and install dependencies
git clone https://github.com/iftikhar565765/terrazza-invitation.git
cd terrazza-invitation
npm install

# 2. Log in to Cloudflare (opens a browser)
npx wrangler login

# 3. Create the database and copy the printed database_id
npx wrangler d1 create terrazza-invitations

# 4. Put the database_id into wrangler.jsonc
#    (replace REPLACE_WITH_YOUR_NEW_D1_DATABASE_ID)

# 5. Create the tables
npx wrangler d1 migrations apply terrazza-invitations --remote

# 6. Deploy
npm run deploy
```

## Verify the deployment

```
curl -s https://terrazza-invitation.<your-subdomain>.workers.dev/ | grep name=\"build\"
```

Every page carries a build stamp (`<meta name="build">`) — the printed
value tells you exactly which build is live.

## Local development

```bash
npm install
npx wrangler d1 migrations apply terrazza-invitations --local
npm run dev        # http://localhost:8788
```
