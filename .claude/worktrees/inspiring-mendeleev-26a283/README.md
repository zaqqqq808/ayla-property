# Ayla Property

Bali villa investment & specialist agency website. Built with Astro + Tailwind, deployed to Vercel.

Live site: [aylaproperty.com](https://aylaproperty.com) (after DNS migration)
Repo: `github.com/zaqqqq808/ayla-property` (private)

---

## Stack

- **Astro 4** — static-first framework, ships near-zero JS
- **Tailwind CSS** — utility-first styling with brand colours preconfigured
- **Vercel** — hosting + edge functions for the contact form
- **Cloudflare** (free) — DNS + email forwarding
- **Calendly** — call booking
- **Resend** (free tier) — outbound email for the contact form

No WordPress, no plugins, no security patches. The whole site is static HTML except `/api/contact`.

---

## Quick start (local dev)

```bash
# 1. Install dependencies
npm install

# 2. Copy env example and fill in your values
cp .env.example .env

# 3. Run dev server
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

---

## Deploy to Vercel

### One-time setup

1. **Push this folder to your GitHub repo:**

   ```bash
   cd ayla-property
   git init
   git add .
   git commit -m "Initial scaffold"
   git branch -M main
   git remote add origin https://github.com/zaqqqq808/ayla-property.git
   git push -u origin main
   ```

2. **Import to Vercel:**
   - Go to [vercel.com/new](https://vercel.com/new)
   - If your personal GitHub isn't connected yet: click the GitHub dropdown → "Add GitHub Account" → grant access to the `ayla-property` repo
   - Select `zaqqqq808/ayla-property` from the list → Import
   - Framework preset auto-detects as Astro
   - Click Deploy. First deploy takes ~60 seconds.

3. **Add environment variables in Vercel:**
   Project → Settings → Environment Variables. Paste in the values from your local `.env`:
   - `RESEND_API_KEY` — from resend.com (free tier, 100 emails/day)
   - `CONTACT_TO_EMAIL` — where contact form enquiries land (e.g. `zaq@aylaproperty.com`)
   - `CONTACT_FROM_EMAIL` — the "from" address (must be on a domain you've verified in Resend)
   - `PUBLIC_CALENDLY_URL` — your Calendly link (e.g. `https://calendly.com/aylaproperty`)

4. **Connect your custom domain:**
   Project → Settings → Domains → Add `aylaproperty.com` and `www.aylaproperty.com`. Vercel will tell you which DNS records to set.

### Ongoing — every change after the first deploy

Just push to `main`:

```bash
git add .
git commit -m "Update copy"
git push
```

Vercel auto-deploys on every push. PRs/branches get preview URLs automatically.

---

## DNS migration (when you're ready to go live)

The current WordPress site stays live until you flip DNS. Recommended sequence:

1. Sign up at [cloudflare.com](https://cloudflare.com) (free)
2. Add `aylaproperty.com` as a site → Cloudflare gives you 2 nameservers
3. In GoDaddy: Domain Settings → Nameservers → enter Cloudflare's nameservers. Propagation takes 5–60 minutes.
4. Once DNS is on Cloudflare, follow Vercel's instructions in Project → Domains to point the domain at Vercel (usually a CNAME for `www` and an A record for the apex).
5. **Email forwarding:** in Cloudflare → Email → Email Routing, add `zaq@aylaproperty.com` → forward to your personal Gmail. Then in Gmail, set up "Send mail as" to send replies from the custom address (free, takes 5 minutes).

That's it. Site is live, email is working, WordPress can be cancelled.

---

## File structure

```
src/
  components/         # All reusable Astro components
    Header.astro
    Hero.astro
    Methodology.astro
    Team.astro
    Journal.astro
    ContactCTA.astro
    Footer.astro
    CalendlyButton.astro
  content/
    config.ts         # Blog content collection schema
    blog/             # Markdown files — one per blog post
  layouts/
    BaseLayout.astro  # HTML shell + meta tags
  pages/
    index.astro       # Homepage
    journal/
      index.astro     # Blog listing
      [...slug].astro # Dynamic post page
    api/
      contact.ts      # Vercel edge function — contact form handler
  styles/
    global.css

public/
  logo.png            # ⚠️ Drop your logo here
  favicon.svg
  images/             # Hero, team, journal images
  ASSETS_TODO.md      # Checklist of files to provide
```

---

## Editing content

- **Blog posts**: add a new `.md` file in `src/content/blog/`. Frontmatter schema is in `src/content/config.ts`. Use Claude Code to write/edit posts.
- **Page copy**: edit the relevant component file (e.g. `src/components/Hero.astro` for the hero headline).
- **Team members**: edit the `team` array at the top of `src/components/Team.astro`.
- **Methodology steps**: edit the `steps` array at the top of `src/components/Methodology.astro`. Set `youtubeId` to your actual YouTube video ID.
- **Brand colours**: edit `tailwind.config.mjs` if anything needs to shift.

---

## Cost summary

| Service     | Plan       | Cost                      |
|-------------|------------|---------------------------|
| Vercel      | Pro        | Existing — included       |
| Cloudflare  | Free       | £0                        |
| Resend      | Free       | £0 (up to 100 emails/day) |
| Calendly    | Existing   | What you already pay      |
| Domain      | Cloudflare Registrar at next renewal | ~£8/year |

**Total new spend: £0/year.** (Domain renewal is the same as before, just cheaper through Cloudflare than GoDaddy.)
