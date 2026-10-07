# Warriv's memory

## Rules
- Steps that need the human's Vercel login or the GA4 UI stay with the human. Since 2026-10-06 the seo-reader service account is GA4 Admin and Search Console Full user, so API-reachable GA4 and Search Console steps (key events, sitemap submit) can go to agents.
- `quest blocked` fails on a quest with no live session; a note is the only way to leave the human a question there.

## Lately
- 2026-10-07 Launch checklist blocked again after its pre-launch part landed (key events, MONDAY_API_TOKEN, 504 redirects verified). Noted what is left: trafficheap.cc unwanted referral (GA4 UI only) and the post-switch steps, which agents can now do.
- 2026-10-07 Round after the image prune landed: only the merges (awaiting the human's row approval) and the launch checklist remain, both with the human. No aim, no ship stone; nothing to file or cast.
- 2026-10-07 Round after the image shrink landed: prune quest in progress, merges and launch checklist still wait on the human. Nothing to file or cast.
- 2026-10-07 Round after the OEE rewrites landed: images in progress, merges and launch checklist wait on the human. Nothing to file or cast.
- 2026-10-07 Merges quest session asked for the per-row approval. Noted the table and handed it to the human with one question: approve all, or name rows to skip.
- 2026-10-07 Round after the CI redirect check landed: images, OEE rewrites and merges are in progress, launch checklist still waits on the human. Nothing to file or cast.
- 2026-10-07 Round after the monday merge fix landed: images, OEE rewrites and CI redirect check are in progress, merges quest not started. Launch checklist still waits on the human. Nothing to file or cast.
- 2026-10-07 Monday message quest hit a merge conflict with the spam guard commit. Gave the fix-up quest sonnet and told it to keep both: guard first, then the message as a monday update, one length cap.
- 2026-10-07 Round after the contact form guard landed: five new quests (images, OEE rewrites, CI redirect check, merges, monday message) had no Model line, gave each sonnet. Noted that the merges quest needs the human's per-row yes or no before deleting posts.
- 2026-10-07 Hourly round: unchanged, launch day checklist still waits on the human going live. No aim, no check stone, nothing to file or cast.
- 2026-10-07 Round as the human left: unchanged, launch day checklist still waits on the human going live. No aim, no check stone, nothing to file or cast.
- 2026-10-07 Hourly rounds (7 so far after the look-back): unchanged, launch day checklist still waits on the human going live. No aim, no check stone, nothing to file or cast.
- 2026-10-07 Hourly round and day look-back: the day was clean, nothing went wrong twice. Unchanged otherwise, launch day checklist still waits on the human going live; no aim, no check stone, nothing to file or cast.
- 2026-10-07 Hourly round: unchanged, launch day checklist still waits on the human going live. No aim, no check stone, nothing to file or cast.
- 2026-10-07 Hourly round: unchanged, launch day checklist still waits on the human going live. No aim, no check stone, nothing to file or cast.
- 2026-10-07 Hourly round: unchanged, launch day checklist still waits on the human going live. No aim, no check stone, nothing to file or cast.
- 2026-10-07 Hourly round: unchanged, launch day checklist still waits on the human going live. No aim, no check stone, nothing to file or cast.
- 2026-10-06 Hourly round: unchanged, launch day checklist still waits on the human going live. No aim, nothing to file or cast.
- 2026-10-06 Hourly round: unchanged, launch day checklist still waits on the human going live. No aim, nothing to file or cast.
- 2026-10-06 Hourly round: unchanged, launch day checklist still waits on the human going live. No aim, no check stone, nothing to file or cast.
- 2026-10-06 Round as the human left: unchanged, launch day checklist still waits on the human going live. No aim, no check stone, nothing to file or cast.
- 2026-10-06 Hourly round: unchanged, launch day checklist still waits on the human going live. No aim, no check stone, nothing to file or cast.
- 2026-10-06 Hourly round: unchanged, launch day checklist still waits on the human going live. No aim, no check stone to cast, nothing to file.
- 2026-10-06 Hourly round: unchanged, only the launch day checklist is open and waits on the human going live. No aim, nothing to file or cast.
- 2026-10-06 Round as the human left: still only the launch day checklist open, waiting on the human to go live. No aim, nothing to file; "Start dev" stone not needed.
- 2026-10-06 Hourly round: only the launch day checklist is open, still waiting on the human to go live. No aim open, nothing to file or cast.
- 2026-10-06 Round after the site URL quest closed (unset on Vercel, fallback applies) and Dansand closed (post stays a draft). Only the launch day checklist is open, waiting on the human. No aim open, nothing to file. Day look-back: clean, nothing went wrong twice.
- 2026-10-06 Woken for two blocked human-step quests (launch day SEO checklist, check NEXT_PUBLIC_SITE_URL on Vercel). Both need accounts, so left them with the human and noted one-line questions. Checked lib/seo.ts falls back to https://optipeople.com, so an unset var is safe.

## Open
- Merges and retirements quest: handed to the human (approve all or name rows to skip). When answered, the session goes on; check that redirects land in lib/legacy-redirects.ts and the fixture.
- Launch day SEO checklist: human still to add trafficheap.cc to GA4 unwanted referrals. Once the site is live on optipeople.com, file agent quests for the sitemap resubmit via API, check-redirects against https://optipeople.com, and the week 1 and week 4 pull.mjs comparisons.
