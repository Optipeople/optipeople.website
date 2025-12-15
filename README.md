## Optipeople Marketing Site

Next.js App Router site using Tailwind v4 and shadcn/ui. Content lives in Git
as Markdown and is editable via Decap CMS at `/admin`.

## Getting Started

Install deps and start the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### If hot reload doesn't work on Windows

This repo enables file-watcher polling for `npm run dev` (helps when the project is inside OneDrive-synced folders like `Documents`).

## Content & CMS

- Home content is sourced from `content/home.md`.
- Decap CMS is available at `/admin` and writes back to the same Markdown file.
- Assets uploaded via CMS are saved to `public/uploads`.

## Tech Notes

- UI: shadcn/ui components + Tailwind utilities only (no custom CSS files).
- Deployment: designed for static hosting on Vercel; CMS is GitHub-backed.
