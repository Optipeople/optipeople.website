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

## Tech Notes

- UI: shadcn/ui components + Tailwind utilities only (no custom CSS files).
- Deployment: Vercel, built from the `main` branch on GitHub.
