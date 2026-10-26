# Search and AI growth loop

Every Monday a Horadric quest named "SEO week YYYY-MM-DD" runs this playbook. The aim is buyers, not traffic: production, maintenance and operations managers at small and mid-sized manufacturers, first in Denmark, then the Nordics and the English-speaking market, who find OptiPeople in Google or get it recommended by ChatGPT, Perplexity, Gemini or Google AI Overviews.

Two rhythms, because shipping and measuring run at different speeds:

- **Every week: ship.** Two to three new or rebuilt pages from the top of `content-plan.md`, plus the small fixes. More good pages in Danish is what moves us; one page a fortnight would take years.
- **Every second week: review.** The quest title says "review" on those weeks. Search Console lags two to three days and a change takes two to four weeks to settle, so judging changes weekly would mostly read noise.

## Files

- `Docs/seo/growth-loop.md`: this playbook.
- `Docs/seo/targets.md`: what we want to rank for and be named for, and why. The strategy.
- `Docs/seo/targets.json`: the tracked queries. `scripts/seo/report.mjs` measures each one over the last 28 days.
- `Docs/seo/content-plan.md`: the ranked backlog of pages to write or rebuild. Each week takes from the top.
- `Docs/seo/log.md`: one entry per week, newest first. What we saw, what we changed, what we filed, what to check next time.
- `Docs/seo/content-inventory.md`: keep, rewrite, merge or retire per blog post.
- `seo-data/` (gitignored): raw Search Console and GA4 pulls and `report.md`.

## The week

Steps marked *(review)* run only on review weeks.

1. **Wait for the date.** If today is before the date in the quest title, run `horadric quest blocked "waiting for the week's date" --until <date>T07:00Z` and stop.
2. **Read what came before.** The last three entries in `log.md`, `targets.md`, the top of `content-plan.md`, and `git log --since="8 days ago" --oneline`.
3. **Pull and report.** In the main checkout (the key in `.secrets/` is only there):
   `GSC_SITE=https://optipeople.com/ GA4_PROPERTY=310277562 node scripts/seo/pull.mjs --pull`, then `node scripts/seo/report.mjs`. Read `seo-data/report.md`, starting with the Targets table. On ship weeks, only look for broken things (404s, indexing errors, a target that fell off a cliff).
4. *(review)* **Check the AI answers.** Ask each prompt in the AI prompt list in `targets.md` in Perplexity (perplexity.ai, no login needed) in the Horadric browser. Wait for the answer to finish. Record per prompt: is OptiPeople named, is optipeople.com a cited source, which vendors are named.
5. *(review)* **Judge the changes from two to four weeks ago.** Did their targets move? Say so plainly, including when nothing moved or it got worse. A change gets four weeks before it is called a miss.
6. *(review)* **Re-rank the backlog** in `content-plan.md` from the data: targets that rank 4 to 15 first (sharpen), then wrong page ranking (fix links), then not seen (write), then AI visibility gaps. Add new items the data shows. Update `targets.json` and `targets.md` when a target is wrong or a better one appears; only a few per review, so the history stays comparable.
7. **Ship.** Fix anything broken first. Then take the top two or three backlog items and do them in this session, one subagent per page when they touch different files. Each page: answer the main query in the first 40 to 60 words, question-shaped headings in the words buyers type, an FAQ (the `faq` field on module and feature pages, a `## FAQ` section in posts), links to and from the matching module page, Danish and English together, Danish per `design-guides/danish-voice.md`. Have a fresh agent review the diff. Run `npm run lint` and the build through `horadric heavy`. Commit and push to main. Once Vercel has deployed, ping Bing and the other IndexNow engines about every page you changed or added: `node scripts/seo/indexnow.mjs /path/one /path/two` (`--all` after a sitewide change). Bing feeds Copilot and ChatGPT search. Mark the items done in `content-plan.md` with the date.
8. **File what does not fit** with `horadric quest add`: work too big for the week, and anything that needs a human (outreach, reviews, customer quotes, prices, money), with "Human:" in the title.
9. **Write the log entry** at the top of `log.md`, using the template there. Commit it.
10. **Schedule next week:** `horadric quest add "SEO week <date + 7 days>" --notes "Follow Docs/seo/growth-loop.md."`, adding " (review)" to the title when this week was not a review week. Then `horadric quest done "<one line>"`.

## Rules

- Never invent facts. Customer names, numbers, quotes, prices and certifications come from the existing site, OptiCore (search_knowledge) or a human. If a page needs a fact we do not have, file a quest asking for it.
- Never delete or merge posts on your own. The content inventory decisions are a human call.
- Guides and module or feature page work ship straight to main. Comparison pages, anything that names a competitor or states a price, and any customer fact not already on the site wait for human review (file it as its own quest, which waits for `horadric quest pass`).
- Product name in prose is OptiPeople Data Platform. Slugs and ids keep `opticloud`.
- Danish is the first market. When a change touches a page that has a Danish version, change both.
- Report in plain words in the log. Numbers with their date range.
