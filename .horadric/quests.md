Aim: Buyers find OptiPeople in Google and AI answers: Danish buyer searches top 5, OptiPeople named in 3 of the 6 Perplexity prompts in Docs/seo/targets.md by end of Q1 2027. The growth loop in Docs/seo/growth-loop.md runs every 14 days.
Aim: Buyers find OptiPeople in Google and AI answers: Danish buyer searches top 5, OptiPeople named in 3 of the 6 Perplexity prompts in Docs/seo/targets.md by end of Q1 2027. The growth loop in Docs/seo/growth-loop.md ships 2 to 3 pages every week from Docs/seo/content-plan.md and reviews the data every second week.

- [/] Animated product replays for the Data Platform pages @animated-product-replays-for-the-data-56437
  Give the platform pages the same treatment as the Opti Assist page (/ai/chat, commit 22d8b2c): an animated, code-built replay of the real product in the hero, plus real screenshots in showcase rows. Reuse the pattern in components/opti-assist-demo.tsx (beat timeline, pauses offscreen via IntersectionObserver, still frame and aria label for reduced motion, assist-* keyframes in app/globals.css) and the showcase rows in components/opti-assist-page.tsx. Start with the pages that sell hardest: /platform, then the modules (MES, OEE, Orders, Planning, Quality, Maintenance, Energy, IoT, Documents). For each, try the real app on the demo account (OptiCloud Demo, CNC Drilling and CNC Robot) to pick a short story worth replaying, e.g. a stop registered on the operator panel showing up in the OEE report, or an order moving through planning. Take screenshots in the logged-in Horadric pane with document.documentElement.style.zoom=1.5 and crop with sharp (see lore note #9). Never show names, phone numbers, tokens or customer data. English and Danish copy, Danish per design-guides/danish-voice.md.
  Outcome: claude-opus-5-5, 2m, blocked, 281k tokens
  Assumed: portal.optipeople.dk and platform.optipeople.dk both ask for a Microsoft consent grant (OptiCloudMultiTenant, 'consent on behalf of your organization') before login, which I will not accept for you. So replays are coded from the demo account's real data via the Optipeople Demo connector, and showcase rows use the existing real captures in public/images. Fresh 1.5x captures need you to log in once.
- [!] Week 1 SEO check after launch @week-1-seo-check-after-launch-56449: waiting for week 1 {until: 2026-11-02T08:00Z}
  The new site went live on optipeople.com on 2026-10-26 at about 13:00 UTC (DNS at Wannafind now points apex and www at Vercel 216.150.1.1). If it is before 2026-11-02, run 'horadric quest blocked "waiting for week 1" --until 2026-11-02T08:00Z' and stop. Then: node scripts/seo/pull.mjs --pull (GSC_SITE=https://optipeople.com/, GA4_PROPERTY=310277562) and compare clicks, impressions and indexed pages to the weeks before launch. Check Search Console for 404s and crawl errors on old URLs, sitemap.xml status, and that GA4 receives page_view, generate_lead and sign_up. Fix any old URL that 404s by adding it to lib/legacy-redirects.ts. Report findings in plain words.
  Warriv: Model: sonnet
- [ ] Week 4 SEO check after launch
  Same as the week 1 check, but wait until 2026-11-23 (use quest blocked --until 2026-11-23T08:00Z if earlier). Compare 4 weeks after launch with the 4 weeks before 2026-10-26.
  After: Week 1 SEO check after launch
  Warriv: Model: sonnet
- [!] Verify optipeople.com after the move to Cloudflare DNS @verify-optipeople-com-after-the-move-to-56461: waiting for nameserver switch {on cmd: nslookup -type=NS optipeople.com 1.1.1.1 | findstr cloudflare}
  Cloudflare zone optipeople.com (id f791123d5ac97b9c1d372bc1793f0454, account faktura@optipeople.dk) holds a copy of all 16 Wannafind records; Wannafind support has been asked to switch the nameservers to albert/michelle.ns.cloudflare.com. If 'nslookup -type=NS optipeople.com 1.1.1.1' does not show cloudflare yet, run: horadric quest blocked "waiting for nameserver switch" --on-cmd "nslookup -type=NS optipeople.com 1.1.1.1 | findstr cloudflare". Once switched: check https://optipeople.com and www (308 to apex) answer from Vercel, MX/TXT/SendGrid CNAMEs resolve as before, portal.optipeople.com redirects to portal.optipeople.dk, and Vercel shows the domain as valid. Then tell the human the Wannafind 'DNS Hotel' subscription (10 kr/month) can be cancelled, but NOT the domain registration.
  Warriv: Model: sonnet
- [ ] Transfer optipeople.com registration to Cloudflare Registrar
  The human wants the .com registered at Cloudflare, not only its DNS. Wannafind support was asked (email from mpg@optipeople.dk) to unlock the domain and send the AUTH/EPP code. Needs: the Cloudflare zone active, and the EPP code from the human. If either is missing, run quest blocked with the question. Then in Cloudflare (account faktura@optipeople.dk) go to Domain Registration > Transfer Domains, select optipeople.com and enter the code. ASK THE HUMAN BEFORE PAYING: it costs about USD 10 and adds one year to the Sep 2027 expiry. Watch for an approval email. After the transfer completes (up to 5 days), tell the human they can cancel the Wannafind DNS Hotel product and its domain renewal. optipeople.dk stays at Punktum dk: Cloudflare cannot register .dk.
  After: Verify optipeople.com after the move to Cloudflare DNS
  Warriv: Model: sonnet
- [ ] SEO week 2026-11-02
  Follow Docs/seo/growth-loop.md from step 1. A ship week: take the top open items in Docs/seo/content-plan.md. The baseline is the 2026-10-26 entry in Docs/seo/log.md. Last step schedules "SEO week 2026-11-09 (review)".
  After: Week 1 SEO check after launch
  Warriv: Model: opus
- [x] Mark generate_lead and sign_up as GA4 key events @mark-generate-lead-and-sign-up-as-ga4-key-56473
  GA4 property 310277562 records zero key events, so no lead can be traced to search or AI. The seo-reader service account is Admin in GA4 (key in .secrets/seo-service-account.json, analytics.edit scope): create key events for generate_lead and sign_up via the Admin API (properties/310277562/keyEvents). Then submit the contact form on optipeople.com once with a clearly marked test message and confirm the event shows in GA4 realtime. Note the result in Docs/seo/log.md.
  Warriv: Model: sonnet
  Outcome: sonnet, 1m, green, 1.6M tokens
- [x] Set up Bing Webmaster Tools and IndexNow for optipeople.com @set-up-bing-webmaster-tools-and-indexnow-56485
  ChatGPT search and Copilot draw on Bing's index. Import optipeople.com from Search Console in Bing Webmaster Tools (bing.com/webmasters, in the Horadric browser; ask the human if a login needs a password), submit https://optipeople.com/sitemap.xml, and add IndexNow: a key file in public/ and a small script (scripts/seo/indexnow.mjs) that pings changed URLs, run from the growth loop after each push. Add a line to Docs/seo/growth-loop.md step 7.
  Warriv: Model: sonnet
  Outcome: sonnet, 0m, blocked, 679k tokens
  Warriv: Assumed: split it. This quest lands the IndexNow code (needs no Bing login); the Bing import and sitemap submit moved to 'Bing Webmaster Tools: import optipeople.com and submit the sitemap', which waits on the human to sign in to Bing in the Horadric pane.
  Outcome: sonnet, 2m, landed, 597k tokens
- [/] Build the Danish buyer pages for OEE, monitoring, stops, MES and energy @build-the-danish-buyer-pages-for-oee-56496
  Docs/seo/targets.md section 1. Danish searches for oee system, oee software, oee måling, produktionsovervågning, maskinovervågning, stopregistrering, mes system and energiovervågning show no page of ours; the Danish results are thin and dated. Make /da/modules/production, /da/modules/iot, /da/features/stop-cause-registration, /da/modules/mes and /da/modules/energy the clear answer for each: H1, title and description in the words a Danish production manager types (design-guides/danish-voice.md), a 40 to 60 word answer to 'hvad er X' at the top, what it does on the shopfloor, a Danish case where one exists, an FAQ with FAQPage data, and links from the Danish guides. No invented numbers or customers. Changes to existing pages ship to main; any new page waits for review.
  Warriv: Model: opus
- [x] Make the MES module page the cloud MES page @make-the-mes-module-page-the-cloud-mes-56535
  Docs/seo/targets.md section 2. cloud mes, cloud based manufacturing execution system, cloud mes software and saas mes rank 11 to 17 with /blog/cloud-mes-cloud-based-manufacturing-execution-system, not /modules/mes (about 25,000 impressions in 16 months). Put cloud MES in the /modules/mes title, H1 and description, answer 'what is a cloud MES' and 'cloud vs on-premise MES' on it, show the step-by-step rollout for a small plant, and link to it from the blog post with the query as anchor. Keep the blog post as the explainer. Same in Danish.
  Warriv: Model: sonnet
  Outcome: sonnet, 2m, conflict, 1.2M tokens
- [/] Fix the merge of make-the-mes-module-page-the-cloud-mes @fix-the-merge-of-make-the-mes-module-page-56712
  "Make the MES module page the cloud MES page" is done on the branch `make-the-mes-module-page-the-cloud-mes` but did not merge into `main`: rebasing it on `main` conflicts.
  Take its commits onto your branch with `git cherry-pick main..make-the-mes-module-page-the-cloud-mes`, resolve each conflict and `git cherry-pick --continue`, make every check in `.horadric/config.json` pass, and commit. Then delete it with `git branch -D make-the-mes-module-page-the-cloud-mes`. Your branch merges like any finished quest and carries its work.
  The quests after the finished one wait for this one too.
  What failed said:
  ```
  Auto-merging components/templates/standard-page.tsx
  CONFLICT (content): Merge conflict in components/templates/standard-page.tsx
  Auto-merging content/shared/types.ts
  error: could not apply 099abd0... Make /modules/mes the cloud MES page: title, H1, answers, rollout, blog link, EN and DA
  hint: Resolve all conflicts manually, mark them as resolved with
  hint: "git add/rm <conflicted_files>", then run "git rebase --continue".
  hint: You can instead skip this commit: run "git rebase --skip".
  hint: To abort and get back to the state before "git rebase", run "git rebase --abort".
  hint: Disable this message with "git config set advice.mergeConflict false"
  Could not apply 099abd0... # Make /modules/mes the cloud MES page: title, H1, answers, rollout, blog link, EN and DA
  ```
  Warriv: Model: sonnet
  Warriv: Assumed: the conflict is additive. c9d6512 added a generic buyer FAQ (PageFaq, faq field) to standard-page.tsx and types.ts; 099abd0 added answers, rollout and explainer. Keep both: all new fields in types.ts, answers and rollout sections where 099abd0 put them, PageFaq where c9d6512 put it. Only one FAQPage JSON-LD per page.
- [/] Human: get OptiPeople listed where AI engines look @human-get-optipeople-listed-where-ai-56651
  Docs/seo/targets.md section 4. Perplexity and the 'best OEE software' lists never name OptiPeople. Draft, for the human to send: (1) a Capterra/GetApp/Software Advice vendor profile (one Gartner network; Factbird has 12 reviews there), (2) a short review request email to 3 to 5 happy customers, (3) inclusion pitches to globalreader.eu (10 best OEE software for SME European manufacturers) and reliamag.com (best production monitoring and OEE software 2026), (4) two story pitches to Danish trade media (Ingeniøren/ing.dk, Industrien, Maskinmesteren) built on existing cases. Facts only from the site and OptiCore. Put the drafts in Docs/seo/outreach/ and block on the human to send them.
  Warriv: Model: sonnet
- [ ] Write honest comparison pages: OptiPeople vs Evocon and vs Factbird
  AI engines name Evocon and Factbird for Danish OEE questions. Write /da and English pages that compare OptiPeople Data Platform with each on what a buyer asks: who it is for, what it measures, data collection, MES and energy scope, AI assistant, Danish support, pricing model. Source competitor facts from their public pages with links and a checked date; say where they are stronger. Ask the human for anything about our own pricing. Waits for review before it goes live.
  Warriv: Model: opus
- [ ] Bing Webmaster Tools: import optipeople.com and submit the sitemap
  Split from 'Set up Bing Webmaster Tools and IndexNow for optipeople.com'. Needs the human signed in to Bing Webmaster Tools (Microsoft, Google or Facebook account) in the Horadric browser pane first. Open bing.com/webmasters; if it asks for sign-in, block and ask the human to sign in there. Then import optipeople.com from Search Console, submit https://optipeople.com/sitemap.xml, and note in Docs/seo/growth-loop.md that Bing is verified.
  Model: sonnet
  After: Set up Bing Webmaster Tools and IndexNow for optipeople.com
