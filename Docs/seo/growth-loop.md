# Search and AI growth loop

Every 14 days a Horadric quest named "SEO growth cycle YYYY-MM-DD" runs this playbook. The aim is buyers, not traffic: production, maintenance and operations managers at small and mid-sized manufacturers, first in Denmark, then the Nordics and the English-speaking market, who find OptiPeople in Google or get it recommended by ChatGPT, Perplexity, Gemini or Google AI Overviews.

Why 14 days: Search Console lags two to three days and rankings take two to four weeks to settle after a change. Weekly cycles would mostly read noise.

## Files

- `Docs/seo/growth-loop.md`: this playbook.
- `Docs/seo/targets.md`: what we want to rank for and be named for, and why. The strategy.
- `Docs/seo/targets.json`: the tracked queries. `scripts/seo/report.mjs` measures each one over the last 28 days.
- `Docs/seo/log.md`: one entry per cycle, newest first. What we saw, what we changed, what we filed, what to check next time.
- `Docs/seo/content-inventory.md`: keep, rewrite, merge or retire per blog post.
- `seo-data/` (gitignored): raw Search Console and GA4 pulls and `report.md`.

## The cycle

1. **Wait for the date.** If today is before the date in the quest title, run `horadric quest blocked "waiting for the cycle date" --until <date>T07:00Z` and stop.
2. **Read what came before.** The last three entries in `log.md`, `targets.md`, and `git log --since="15 days ago" --oneline`. Note what each earlier change was meant to move.
3. **Pull and report.** In the main checkout (the key in `.secrets/` is only there):
   `GSC_SITE=https://optipeople.com/ GA4_PROPERTY=310277562 node scripts/seo/pull.mjs --pull`, then `node scripts/seo/report.mjs`. Read `seo-data/report.md`, starting with the Targets table.
4. **Check the AI answers.** Ask each prompt in the AI prompt list in `targets.md` in Perplexity (perplexity.ai, no login needed) in the Horadric browser. Wait for the answer to finish. Record per prompt: is OptiPeople named, is optipeople.com a cited source, which vendors are named. Also run a site check of the live pages changed last cycle (they answer 200, the title and description are what we shipped).
5. **Judge the last cycle.** For each change logged last time: did its target move? Say so plainly, including when nothing moved or it got worse. A change gets two cycles before it is called a miss.
6. **Pick at most five actions,** in this order of priority:
   1. Broken things: 404s with traffic, missing redirects, indexing errors, tracking gaps.
   2. Targets that rank 4 to 15: sharpen the page (answer first, question-shaped headings, title and description, internal links from strong pages).
   3. Targets where the wrong page ranks: point internal links and the content at the right one.
   4. Targets that are not seen: write or rebuild the page that should rank.
   5. AI visibility: facts AI engines need and do not find (pricing approach, who it is for, Danish vendor, integrations, cases), and the off-site places they cite.
7. **Do the small ones now,** in this session, with subagents where the parts are independent: title and description fixes, answer-first rewrites of existing pages, internal links, redirects, structured data. Danish copy follows `design-guides/danish-voice.md`. Run `npm run lint` and the build through `horadric heavy` before pushing. Commit and push to main. Once Vercel has deployed, ping Bing and the other IndexNow engines about every page you changed or added: `node scripts/seo/indexnow.mjs /path/one /path/two` (`--all` after a sitewide change). Bing feeds Copilot and ChatGPT search.
8. **File the big ones as quests** with `horadric quest add`, with notes that name the target query, the page, the data behind it and what done looks like. Anything that needs a human (outreach, reviews, customer quotes, prices, money) is a quest that says so in its title.
9. **Update the targets** in `targets.json` and `targets.md` if the data says a target is wrong or a better one has appeared. Never more than a few per cycle, so the history stays comparable.
10. **Write the log entry** at the top of `log.md`, using the template there. Commit it.
11. **Schedule the next cycle:** `horadric quest add "SEO growth cycle <date + 14 days>" --notes "Follow Docs/seo/growth-loop.md."` Then `horadric quest done "<one line>"`.

## Rules

- Never invent facts. Customer names, numbers, quotes, prices and certifications come from the existing site, OptiCore (search_knowledge) or a human. If a page needs a fact we do not have, file a quest asking for it.
- Never delete or merge posts on your own. The content inventory decisions are a human call.
- New pages, comparison pages and anything that names a competitor go through quest review (the quest waits for `horadric quest pass`), not straight to main.
- Product name in prose is OptiPeople Data Platform. Slugs and ids keep `opticloud`.
- Danish is the first market. When a change touches a page that has a Danish version, change both.
- Report in plain words in the log. Numbers with their date range.
