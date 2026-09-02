# SoukNStory — MVP

A real, deployable Next.js + Supabase app. This replaces the earlier
in-browser prototype — it has a real database, real (passwordless) auth
for business owners, and pages that read/write actual data.

Verified with `npm run build` before delivery — it compiles cleanly.

## What's real vs. what's still a stub

**Real:** database schema, all pages/routes, Supabase queries for
listings/stories/experiences/trips/favorites/bookings, business-owner
magic-link login, claim/suggest-business flow with pending-verification
status.

**Stubbed, on purpose, with a clear swap-in point:**
- `app/api/ask/route.js` — Ask Souk currently does keyword-based
  retrieval against your real Supabase data (never invents businesses),
  but doesn't call a real LLM yet. The file has a comment showing
  exactly where to add an Anthropic API call.
- Payments — experiences use a request-to-book flow; no Stripe yet.
- Admin dashboard — not built yet (approve/reject pending businesses
  currently has to be done directly in the Supabase table editor).

## 1. Set up Supabase (your database + auth)

1. Go to [supabase.com](https://supabase.com), create a free account and a new project.
2. In your project, open **SQL Editor → New query**, paste in the contents of
   `supabase/schema.sql`, and run it.
3. Run `supabase/seed.sql` the same way to load demo listings/stories/experiences
   (all clearly flagged `is_demo = true` — replace with real verified
   businesses before you actually launch).
4. Go to **Project Settings → API** and copy your **Project URL** and **anon public key**.
5. Go to **Authentication → URL Configuration** and add your site URL
   (your Vercel URL, and later souknstory.com) to the allowed redirect URLs —
   this is required for the business-owner magic-link login to work.

## 2. Run it locally (optional, but recommended before deploying)

```
cp .env.local.example .env.local
# paste your Supabase URL + anon key into .env.local
npm install
npm run dev
```

Open http://localhost:3000.

## 3. Deploy to Vercel

1. Push this folder to a new GitHub repository.
2. Go to [vercel.com](https://vercel.com) → **New Project** → import that repo.
3. In the project's **Environment Variables**, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Click **Deploy**. You'll get a live URL like `souknstory.vercel.app` within a minute or two.

## 4. Point souknstory.com at it

1. In the Vercel project, go to **Settings → Domains** and add `souknstory.com`
   (and `www.souknstory.com` if you want both).
2. Vercel will show you DNS records to add (usually an `A` record or `CNAME`).
3. Go to wherever you registered the domain (GoDaddy, Namecheap, Google Domains,
   etc.) → DNS settings → add the records Vercel gave you.
4. Wait for DNS to propagate (usually minutes, can take up to 24–48 hours).
5. Go back to **Authentication → URL Configuration** in Supabase and add
   `https://souknstory.com` as an allowed redirect URL too.

At this point souknstory.com is a real, live, working app — no Squarespace involved.

## 5. Make it installable on phones (PWA) — no App Store needed to start

Add a `manifest.json` and a service worker (or use a library like `next-pwa`)
so people can tap "Add to Home Screen" on iPhone/Android. This gets you an
app-like experience live in days, while you decide if a native App Store
listing is worth the extra investment.

## 6. Later: native app for the App Store

- Wrap this app with [Capacitor](https://capacitorjs.com) to get a real iOS
  build, or rebuild the UI in React Native/Expo if you want a fully native feel.
- Join the Apple Developer Program ($99/year).
- Apple requires genuine native functionality beyond "a website in a frame"
  (Guideline 4.2) — plan for push notifications, offline support, or similar
  before submitting.

## Project structure

```
app/                  Next.js App Router pages
  api/ask/             Ask Souk retrieval endpoint (LLM swap-in point)
  business/            Business owner login + dashboard
  onboarding/, trip/    Onboarding flow + AI trip builder
  hidden/, stories/,    Discovery, stories, experiences, saved trip
  experiences/, my-trip/
components/           Shared UI (buttons, cards, nav) and design tokens
lib/                   Supabase client + auth hook
supabase/              schema.sql (run first) + seed.sql (demo data)
```
"# souknstory-app" 
