# Warriv's memory

## Rules
- Steps that need the human's Vercel, Search Console or GA4 login stay with the human; no agent can do them (no Vercel CLI on this PC, seo-reader service account is Viewer only).
- `quest blocked` fails on a quest with no live session; a note is the only way to leave the human a question there.

## Lately
- 2026-10-06 Woken for two blocked human-step quests (launch day SEO checklist, check NEXT_PUBLIC_SITE_URL on Vercel). Both need accounts, so left them with the human and noted one-line questions. Checked lib/seo.ts falls back to https://optipeople.com, so an unset var is safe.

## Open
- Launch day SEO checklist: once the human says the site is live on optipeople.com, file agent quests for the 301 crawl of the top 200 old URLs and the week 1 and week 4 pull.mjs comparisons.
- Check NEXT_PUBLIC_SITE_URL on Vercel: waiting on the human to confirm unset or https://optipeople.com.
- Dansand redirect quest waits on the Dansand post being published (human call to unhide the case).
