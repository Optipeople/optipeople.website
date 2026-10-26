# Growth loop log

One entry per week, newest first. See `growth-loop.md`.

Template:

```
## YYYY-MM-DD

**Numbers** (last 28 days vs the 28 before): non-brand clicks, impressions, Danish non-brand impressions, AI referral sessions, key events.
**Targets:** which moved, which did not, with positions.
**AI answers:** per prompt, named or not, and who was named.
**Changes from 2 to 4 weeks ago (review weeks):** worked, too early, or missed.
**Shipped this week:** pages and commits.
**Filed:** quests.
**Next time check:** what to look at first.
```

## 2026-10-26 (key events)

**Key events:** `generate_lead` and `sign_up` were already marked as key events on GA4 property 310277562 (created 2026-10-06, counted once per event). The Admin API returned 409 on create, and the list shows them next to `purchase`. So the baseline note that none were marked was out of date.
**Test:** submitted the contact form on optipeople.com with a marked test message (test-ignore@optipeople.dk) after accepting cookies. `generate_lead` appeared in GA4 realtime (Data API) within about a minute. Tracking only fires after cookie consent. `sign_up` (newsletter) was not tested live.

## 2026-10-26 (baseline)

**Numbers:** last 28 days to 2026-10-24: non-brand 15,152 impressions and 24 clicks (query-level data), almost all US readers of guides. Danish non-brand: 709 impressions and 3 clicks in the last 3 months. AI referral sessions: 75 in 16 months. Key events: none, because GA4 has no key events marked. The new site went live on optipeople.com on 2026-10-26, so the next cycle compares across the migration.
**Targets:** set in `targets.md`. All Danish buyer targets are not seen. Cloud MES ranks 11 to 17 with the blog post. Guides rank 5 to 10.
**AI answers:** prompts 1 and 2 checked: not named (Evocon; Trendlog, Flexkom, Vetech).
**Done this cycle:** the growth loop, the targets, a targets section in `report.mjs`, a 28-day pull in `pull.mjs`.
**Filed:** the first cycle (2026-11-09) and one-off quests for key events, Bing, Danish buyer pages, cloud MES, directory listings and comparison pages.
**Next time check:** that old WordPress URLs hand their rankings to the new /blog paths; that generate_lead and sign_up arrive as key events.
