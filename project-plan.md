#Build plan for the new Optipeople website. 

We need to build a new website for Optipeople.com. 

##Technical requirements

###Code and Framework

*[MUST] Framework: Next.js (App Router).
*[MUST] Language: TypeScript only, no plain JS.
*[MUST] Hosting: Vercel (prod, preview, and dev).
*[MUST] UI library: shadcn/ui.
*[MUST] Styling: Tailwind CSS only.
*[MUST] No custom CSS files, CSS modules, SCSS, or styled components.
**All styling must be via Tailwind utility classes and shadcn component APIs.
**Global styles limited to Tailwind base, components, utilities and shadcn generated styles.
**[SHOULD] Use npm

###Content Management (Decap CMS)

*[MUST] Use Decap CMS (formerly Netlify CMS) as the only CMS for the marketing site.
*[MUST] Use the Git-based workflow: content is stored as Markdown files inside the same repo as the Next.js code (no external DB).
*[MUST] Host Decap admin UI at /admin using the recommended static admin folder approach:
**public/admin/index.html with the Decap CMS script from CDN.
**public/admin/config.yml as the CMS config file.
*[MUST] Admin app should:
**Load from the CDN version decap-cms@^3 (or pinned version) for stability.
**Be reachable from production and preview builds (Vercel), not only locally.
*[MUST] Use a Git-based backend for Decap
*[MUST] No runtime dependency on Decap on the public site:
**Decap only lives under /admin and in config.yml.
**Marketing pages must render purely from static content files.

##Content

Build a very simple on-page example to get started.
Top nav, Over the fold content, Footer. 