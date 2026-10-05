## Optipeople Marketing Site

Next.js App Router site using Tailwind v4 and shadcn/ui. All content lives in
Git as TypeScript, Markdown and JSON, and is edited with Claude Code.

## Getting Started

Install deps and start the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### If hot reload doesn't work on Windows

This repo enables file-watcher polling for `npm run dev` (helps when the project is inside OneDrive-synced folders like `Documents`).

## Content

There is no CMS. Copy is edited in the repo, usually by asking Claude Code.

- **Pages**: `content/pages/*.ts` holds the copy for modules, features,
  services, solutions and the simple pages, as typed objects with an `en` and a
  `da` entry. Shared types are in `content/shared/types.ts`, and the module
  list is `content/modules-catalog.ts`. The homepage keeps its copy in a `copy`
  object inside `app/[locale]/page.tsx`.
- **Blog and case studies**: `content/blog/<slug>.md`, Markdown with front
  matter (title, date, author, category, image). A Danish version sits next to
  it as `<slug>.da.md`; date and category stay the canonical English ones.
  `lib/blog-data.ts` reads them.
- **Site chrome and forms**: `messages/en.json` and `messages/da.json` hold
  the navigation, footer, CTA and form strings, loaded through next-intl.
- **Shared lists**: employees, customer logos and the AI stack slides live in
  `lib/employees.ts`, `lib/customers.ts` and `lib/ai-stack.ts`.
- **Images**: `public/images/`.

Colleagues who are not developers use the `optipeople-website` Claude skill.
It fetches the latest version, previews the site locally, makes the edit and
publishes it, handling Git, GitHub and Vercel for them. Just ask Claude Code to
change something on the website from this folder.

## SEO data

Two scripts in `scripts/seo/` turn Search Console and GA4 into something to
prioritise SEO and AEO work from. Neither needs `npm install`.

**Pull** (`scripts/seo/pull.mjs`) downloads the raw data as JSON into
`seo-data/`. It needs a Google service account key at
`.secrets/seo-service-account.json` (or the path in `SEO_GOOGLE_KEY`) with read
access to the Search Console site and the GA4 property. Both `.secrets/` and
`seo-data/` are gitignored, so they exist only in the checkout where you put
them, not in new worktrees.

```bash
node scripts/seo/pull.mjs                     # list the sites and properties the key can see
GSC_SITE=https://optipeople.com/ GA4_PROPERTY=310277562 node scripts/seo/pull.mjs --pull
```

`SEO_MONTHS` sets how far back to go (default 16, the Search Console maximum).

**Report** (`scripts/seo/report.mjs`) reads `seo-data/` and writes
`seo-data/report.md`. Run it from the repo root, because it also reads
`next.config.ts`, `app/[locale]` and `content/` to check URLs against the site.

```bash
node scripts/seo/report.mjs                   # or pass another data folder as the first argument
```

The report covers:

- monthly clicks and impressions (partial months are marked)
- brand vs non-brand (optipeople, opti people, opticloud)
- striking-distance queries: position 4 to 15 with 200+ impressions
- queries with high impressions and zero clicks
- pages losing impressions between the last two complete months (needs
  `gsc-page-date.json`, which pulls made before this report do not have)
- AI assistant referrals by source and landing page
- old URLs with traffic that the new site would 404 on, checked against the
  redirects in `next.config.ts` (and `lib/legacy-redirects.ts` once it exists),
  the app routes and `public/`, with a
  `/blog/<slug>` target suggested where the slug matches a post

## Tech Notes

- UI: shadcn/ui components + Tailwind utilities only (no custom CSS files).
- Deployment: Vercel, built from the `main` branch on GitHub.
