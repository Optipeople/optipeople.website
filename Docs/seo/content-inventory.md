# Blog content inventory

Proposals only. Nothing has been deleted, merged or redirected. Each "merge" or "retire" below is a human call.

## Data

- Source: `seo-data/` in the main checkout, pulled by `scripts/seo/pull.mjs`. Search Console covers 2025-05-30 to 2026-09-29 (16 months).
- All URLs are the old WordPress paths (`/<slug>/`), because the new site is not live yet. After launch the posts move to `/blog/<slug>` through `lib/legacy-redirects.ts`.
- **Imp**, **Clicks** and **Pos** come from `gsc-pages.json`. Pos is the impression-weighted average position.
- **Main query** is the page's top query by impressions in `gsc-query-page.json`, written as `query (impressions @ position)`.
- **US** is an estimate: each of the page's queries is weighted by its US share in `gsc-query-country.json`. That file holds only the top rows, so treat the figure as rough.
- A dash means no impressions in 16 months. Usually that means the old URL had a different slug, or the post was never indexed.

## Summary

The blog had 723,000 impressions and 1,640 clicks in the period.

- **Predictive maintenance:** 11 posts, 264,000 impressions (36%), 164 clicks (10%). US-heavy (66 to 96%). The posts compete with each other for the same queries.
- **CMMS and lean:** 2 posts, 122,000 impressions (17%), 21 clicks.
- **OEE:** about 250,000 impressions and 1,110 clicks. That is two thirds of all blog clicks, and it is what OptiPeople sells.

OptiPeople does sell maintenance: `/modules/maintenance` covers planned and usage-based maintenance with predictive alerts. It does not sell condition-monitoring hardware (vibration, thermography, oil analysis) or a standalone CMMS, so most of the predictive maintenance and CMMS traffic is from researchers, students and US facility managers, not buyers. The proposal keeps a small, strong predictive maintenance cluster that links to the module, and folds the rest into it.

## Proposed merges and retirements

| Post | Proposal | Target |
| --- | --- | --- |
| what-is-the-definition-or-meaning-of-predictive-maintenance | Merge | the-four-types-of-predictive-maintenance-and-why-they-matter |
| what-are-predictive-maintenance-tools | Merge | the-four-types-of-predictive-maintenance-and-why-they-matter |
| how-does-predictive-maintenance-work | Merge | the-four-types-of-predictive-maintenance-and-why-they-matter |
| what-are-the-examples-of-predictive-maintenance | Merge (lowest confidence) | the-four-types-of-predictive-maintenance-and-why-they-matter |
| predictive-maintenance-the-benefits-you-get-from-it | Merge | what-are-the-advantages-and-disadvantages-of-predictive-maintenance |
| predictive-maintenance-vs-reactive-maintenance | Merge | what-is-the-difference-between-preventive-and-predictive-maintenance |
| what-is-oee-for-manufacturing-and-maintenance | Merge (already planned in the OEE rewrite quest) | what-is-oee |
| what-are-the-effects-of-oee | Merge | what-is-oee |
| cmms-the-ultimate-guide-for-facility-management-professionals-and-owners | Retire, redirect | /modules/maintenance |
| what-are-the-5-principles-of-lean-manufacturing | Retire, redirect | how-do-i-improve-my-oee-with-examples |
| maximize-productivity-with-opticlouds-predictive-maintenance | Retire, redirect | /modules/maintenance |
| iot-consultancy-and-development | Retire, redirect | /services/automation |
| microsoft-power-bi-consultancy-and-development | Retire, redirect | /services/business-intelligence |

The result is 3 predictive maintenance posts instead of 11, 1 "what is OEE" post instead of 3, and no CMMS or lean post.

### How a merge would be done

1. Move what is useful from the merged post into the target as a section, with an H2 that matches the merged post's main query (for example "Predictive maintenance tools" in the four-types post). Do not paste the whole post.
2. Delete the merged post's `.md` and `.da.md`.
3. In `lib/legacy-redirects.ts`, point the old `/<slug>` straight at the target so it stays a single 301, and add `/blog/<slug>` and `/da/blog/<slug>` to the target.
4. Update internal links that point at the merged post.
5. Recheck after four weeks with `node scripts/seo/pull.mjs --pull`: the target should pick up the merged post's queries.

### Why merge rather than delete the predictive maintenance posts

- They already compete with each other. For "predictive maintenance", the four-types post ranks 19 (7,000 impressions) and the definition post ranks 48 (6,700). For "benefits of predictive maintenance", the benefits post ranks 49 and the pros-and-cons post ranks 66. Google is splitting its signal across pages that say the same thing.
- Each post is 330 to 510 words. Separately they cannot outrank the big guides. Combined, one 1,500-word hub with question-shaped H2s has a chance.
- The four-types post is the natural hub. It already ranks best for the head term, and "tools" (vibration, thermography, oil analysis, ultrasound) are the same thing as "types" seen from the hardware side.
- The examples merge is the least certain. That post earns 34 clicks and ranks 20 to 26 for "predictive maintenance examples". Keep it separate if you would rather not risk those.

### Why retire CMMS and lean

- **CMMS** (81,900 impressions, 21 clicks, position 62). Queries are "cmms", "cmms system", "cmms software", at 63 to 70. Those results belong to CMMS vendors with large guides. OptiPeople is not a CMMS, and a 460-word post will not reach page one. Redirecting to `/modules/maintenance` keeps any backlinks. Alternative: rewrite as "CMMS or machine monitoring: which do you need?" for a narrower query.
- **Lean** (40,200 impressions, 0 clicks, position 48). "lean manufacturing principles" at 44 is owned by lean institutes and universities. Zero clicks in 16 months. OEE is a lean tool, so the nearest on-topic page is the OEE improvement post. Alternative: rewrite as "Lean and OEE: measuring the waste".

High impressions with no clicks do not harm the site directly. The case for retiring is focus: these pages teach Google that the site is about general US maintenance and lean topics, not OEE and production data for Nordic manufacturers.

## Inventory

Recommendation key: **Keep** (leave as is), **Rewrite** (keep the URL, improve the content), **Merge into X**, **Retire** (remove and redirect).

### OEE and production efficiency (core topic)

| Post | Imp | Clicks | Pos | US | Main query | Recommendation | Reason |
| --- | ---: | ---: | ---: | ---: | --- | --- | --- |
| oee-teep-and-ooe-whats-the-difference-with-examples | 96,256 | 136 | 12.9 | 23% | ooe (40,083 @ 7) | Keep, rewrite | Biggest page on the site. Ranks 5 to 10 for "ooe" variants. Answer-first rewrite already queued in the OEE quest. |
| oee1-vs-oee2-whats-the-difference | 44,396 | 849 | 23.2 | 39% | oee (8,693 @ 51) | Keep | Half of all blog clicks. Ranks 1 to 2 for "oee1", "oee2", "oee1 vs oee2". |
| how-to-calculate-oee-for-manufacturing-and-maintenance | 31,153 | 38 | 40.4 | 58% | how to calculate oee (3,199 @ 43) | Rewrite | Core query, too far down. Needs the formula box and a worked example up top. |
| what-is-oee | 26,107 | 37 | 41.7 | 34% | what is oee (2,017 @ 47) | Keep, merge target | The longest OEE guide (950 words). Loses "what is oee" to its own sibling. |
| what-is-oee-for-manufacturing-and-maintenance | 22,760 | 11 | 46.5 | 40% | what is oee (2,850 @ 79) | Merge into what-is-oee | Same query as what-is-oee, both lose. Already decided in the OEE rewrite quest. |
| how-do-i-improve-my-oee-with-examples | 15,224 | 20 | 45.2 | 65% | oee improvement (2,730 @ 46) | Rewrite | On topic, buyer-adjacent intent. Ranks 31 for "oee improvement strategy". |
| unlocking-world-class-performance-with-oee-how-to-maximize-efficiency-and-results | 7,269 | 3 | 19.7 | 56% | world class oee (2,421 @ 18) | Rewrite | Own query, close to page one. Retitle around "world class OEE" and answer "what is a world class OEE score" in the first lines. |
| oee-for-maintenance | 3,641 | 16 | 15.7 | 57% | oee in maintenance (773 @ 21) | Keep | Bridges OEE and maintenance. Link it from the merged maintenance hub. |
| what-are-the-effects-of-oee | - | - | - | - | - | Merge into what-is-oee | No search data. Thin overlap with what-is-oee. |
| krisestyring-med-oee | - | - | - | - | - | Keep | Danish market content. No search data. |
| how-to-increase-manufacturing-efficiency-in-your-facility-today | - | - | - | - | - | Keep | No search data. On topic. |
| de-seks-store-effektiviserings-omrader | 1,729 | 4 | 15.6 | - | high efficiency in critical areas (109 @ 14) | Keep | On topic, Danish audience. |
| units-produced-per-hour-v51 | 631 | 1 | 14.5 | - | units per hour (275 @ 18) | Keep | Product feature note. |
| kwh-per-produced-unit-v50 | 47 | 0 | 11.0 | - | site:optipeople.com (2 @ 68) | Keep | Product feature note (energy). |
| emnetaeller | 82 | 0 | 8.9 | - | site:optipeople.com (25 @ 10) | Keep | Product feature note. |

### Predictive and preventive maintenance

| Post | Imp | Clicks | Pos | US | Main query | Recommendation | Reason |
| --- | ---: | ---: | ---: | ---: | --- | --- | --- |
| what-are-the-advantages-and-disadvantages-of-predictive-maintenance | 60,566 | 57 | 24.1 | 80% | what are the disadvantages of predictive maintenance (16,724 @ 5) | Keep, rewrite, merge target | Ranks 5 with no clicks, so an AI answer takes the click. Rewrite already queued. Absorbs the benefits post. |
| the-four-types-of-predictive-maintenance-and-why-they-matter | 54,050 | 46 | 24.4 | 73% | types of predictive maintenance (8,803 @ 11) | Keep, rewrite, hub | Best rank for the head term "predictive maintenance" (19). Rewrite already queued. Absorbs definition, tools, how it works and examples. |
| what-is-the-definition-or-meaning-of-predictive-maintenance | 34,795 | 2 | 44.0 | 72% | predictive maintenance (6,724 @ 48) | Merge into the-four-types | Competes with the hub for "predictive maintenance" and loses. 2 clicks in 16 months. |
| what-are-the-examples-of-predictive-maintenance | 31,946 | 34 | 44.9 | 78% | predictive maintenance examples (3,294 @ 26) | Merge into the-four-types | Examples belong under each type. Lowest-confidence merge: it earns real clicks. |
| what-is-the-difference-between-preventive-and-predictive-maintenance | 31,088 | 4 | 53.1 | 71% | preventive vs predictive maintenance (4,102 @ 60) | Rewrite, merge target | Becomes the one comparison page: reactive vs preventive vs predictive, with a table. Links to /modules/maintenance, which is preventive and usage-based. |
| what-are-predictive-maintenance-tools | 28,485 | 13 | 45.8 | 66% | predictive maintenance tools (9,590 @ 35) | Merge into the-four-types | Tools and types are the same list (vibration, thermography, oil, ultrasound). Add a "Predictive maintenance tools" H2 to the hub. |
| predictive-maintenance-vs-reactive-maintenance | 9,436 | 7 | 42.8 | 85% | reactive preventive predictive maintenance (3,376 @ 37) | Merge into preventive-vs-predictive | Its main query is the three-way comparison the target should own. |
| which-operations-would-be-described-as-preventive-maintenance | 5,121 | 0 | 14.2 | 93% | which operation would be described as preventive maintenance (2,768 @ 9) | Keep, rewrite | Ranks 9 for a quiz-style question. Rewrite already queued with Industry 5.0. Distinct question, so not merged. |
| predictive-maintenance-the-benefits-you-get-from-it | 4,991 | 0 | 62.6 | 56% | benefits of predictive maintenance (1,810 @ 49) | Merge into advantages-and-disadvantages | Same query as the pros-and-cons post, both lose. Zero clicks. |
| how-does-predictive-maintenance-work | 2,207 | 0 | 45.9 | 96% | how does predictive maintenance work (332 @ 29) | Merge into the-four-types | Small, zero clicks, the hub explains how each type works. |
| maximize-productivity-with-opticlouds-predictive-maintenance | 1,268 | 1 | 19.0 | 89% | tpm modules predictive maintenance (167 @ 11) | Retire, redirect to /modules/maintenance | A product pitch that /modules/maintenance now does better. Its traffic is for "TPM modules", which means Trusted Platform Modules (chip hardware), so the wrong audience. |

### CMMS and lean (off topic)

| Post | Imp | Clicks | Pos | US | Main query | Recommendation | Reason |
| --- | ---: | ---: | ---: | ---: | --- | --- | --- |
| cmms-the-ultimate-guide-for-facility-management-professionals-and-owners | 81,914 | 21 | 61.7 | 49% | cmms (11,577 @ 63) | Retire, redirect to /modules/maintenance | Vendor-owned head terms at 63 to 70. OptiPeople is not a CMMS. Facility management is not the audience. See "Why retire CMMS and lean". |
| what-are-the-5-principles-of-lean-manufacturing | 40,209 | 0 | 47.9 | 26% | lean manufacturing principles (15,088 @ 44) | Retire, redirect to how-do-i-improve-my-oee-with-examples | Zero clicks in 16 months. Competes with lean institutes. |

### Industry 4.0 and 5.0, digital transformation

| Post | Imp | Clicks | Pos | US | Main query | Recommendation | Reason |
| --- | ---: | ---: | ---: | ---: | --- | --- | --- |
| the-fifth-industrial-revolution-industry-5-0 | 40,127 | 249 | 11.9 | 22% | 5th industrial revolution (5,962 @ 10) | Keep, rewrite | Second-best blog post for clicks and the top AI-assistant landing page. Off topic but earns its place. Rewrite already queued. |
| cloud-mes-cloud-based-manufacturing-execution-system | 32,712 | 14 | 27.1 | 51% | cloud based manufacturing execution system (6,032 @ 17) | Rewrite | The most commercial query on the blog: OptiPeople is a cloud MES. Ranks 17 to 25, 300 words. Highest-value rewrite on this list. Link to /modules/mes. |
| hvad-er-industri-4-0 | 2,419 | 0 | 71.6 | - | industri 4.0 (1,417 @ 75) | Rewrite (low priority) | Danish head term, Danish market. Too thin to rank today. |
| fra-e-handel-til-industri-4-0 | 306 | 0 | 39.5 | - | e commerce industry 4.0 (162 @ 42) | Keep | Small, Danish story content. |
| konkurrencekraft-og-tempo-pa-digital-transformation | 433 | 0 | 28.7 | - | fiberline (221 @ 32) | Keep | Fiberline case. Retitle so the slug matches the case (human call; the slug stays). |
| digital-transformation-og-co2-partnerskab-det-er-en-nodvendighed | 16 | 0 | 15.9 | - | - | Keep | Small, harmless. |
| supply-chain-management-og-effektivitet | 228 | 0 | 47.5 | - | supply chain efficiency (84 @ 50) | Keep (retire candidate) | Off topic and almost no traffic. Harmless, but could go in a later cleanup. |
| fokus-pa-capex | 601 | 0 | 19.5 | - | hvad er capex (94 @ 27) | Keep | Danish query, finance angle for production managers. |
| efficiency-as-a-service | - | - | - | - | - | Keep | Explains the business model. No search data. |

### Product, features and services

| Post | Imp | Clicks | Pos | US | Main query | Recommendation | Reason |
| --- | ---: | ---: | ---: | ---: | --- | --- | --- |
| dashboards | 1,731 | 6 | 6.0 | - | optipeople (181 @ 2) | Keep | Brand traffic. |
| opticloud-api-how-to-use-it-step-by-step | 1,356 | 47 | 7.8 | - | opticloud (146 @ 9) | Keep | Customer documentation, 47 clicks. |
| opticloud-mqtt-json-schema | 564 | 1 | 10.8 | - | site:optipeople.com (16 @ 41) | Keep | Integration documentation. |
| opticlouds-efficiency-and-oee-module | 340 | 1 | 24.7 | - | cloud oee (91 @ 53) | Keep | Product post. Link to /modules/production. |
| opticloud-real-time-dashboard-powering-decision-making-enhancing-efficiency | 30 | 0 | 25.1 | - | site:optipeople.com (3 @ 95) | Keep | Small product post. |
| opticlouds-enhanced-reporting-feature-your-businesss-new-best-friend | 25 | 0 | 15.6 | - | opticloud (1 @ 10) | Keep | Small product post. |
| ved-du-at-du-kan-have-din-fabrik-i-lommen | - | - | - | - | - | Keep | Product post (mobile). No search data. |
| sammenspillet-mellem-opticloud-og-ifix-fra-general-electrics | 228 | 0 | 31.4 | - | ifix demo (44 @ 59) | Keep | Integration case. |
| iot-consultancy-and-development | 972 | 0 | 63.7 | 6% | iot consultancy (324 @ 84) | Retire, redirect to /services/automation | A service page living in the blog. /services/automation now covers IoT architecture, and /modules/iot the product side. |
| microsoft-power-bi-consultancy-and-development | 141 | 1 | 57.9 | - | microsoft bi consultancy (22 @ 68) | Retire, redirect to /services/business-intelligence | Same as above. |
| ligna-2025 | 9 | 0 | 4.1 | - | - | Keep | Event news. |

### Culture and shopfloor (Danish insight posts)

| Post | Imp | Clicks | Pos | US | Main query | Recommendation | Reason |
| --- | ---: | ---: | ---: | ---: | --- | --- | --- |
| nulfejlskultur | 917 | 5 | 7.9 | - | zero error culture (493 @ 6) | Keep | Ranks 6 for its own query. |
| bohica | 459 | 2 | 14.2 | - | bohica (183 @ 23) | Keep | Distinctive voice piece. |
| tavlemoder | - | - | - | - | - | Keep | No search data under this slug (old URL spelled tavlemoeder). |
| skiftehold-uden-bovl | - | - | - | - | - | Keep | No search data. |
| fun-facts-hvad-koster-det | - | - | - | - | - | Keep | No search data. |

### Cases

All cases are kept. They rank for customer names and are the sales proof. Their search numbers are small by nature.

| Post | Imp | Clicks | Pos | Main query | Recommendation |
| --- | ---: | ---: | ---: | --- | --- |
| danpres-boosting-production-by-reducing-tool-repair-time-by-50 | 1,473 | 3 | 3.6 | optipeople (1,125 @ 1) | Keep |
| carl-hansen-son-enhances-productivity-and-reduces-setup-times-with-opticloud-and-optiai | 869 | 1 | 9.8 | optiai (434 @ 8) | Keep |
| jbs | 613 | 1 | 20.2 | gurit (256 @ 23) | Keep |
| dfi-geisler-increases-productivity-by-5-with-opticlouds-data-driven-insights | 509 | 1 | 10.5 | dfi geisler (7 @ 9) | Keep |
| xl-byg-brejnholt-achieves-energy-savings-and-sustainability-with-optimized-forklift-charging | 373 | 2 | 14.9 | brejnholt (12 @ 9) | Keep |
| optimizing-machine-performance-and-power-consumption-with-opticloud-at-steel-products | 186 | 3 | 17.4 | opticloud (8 @ 45) | Keep |
| expedit-opticloud-enables-decision-making-around-automations-and-investments | 140 | 0 | 16.2 | expedit hadsten (11 @ 11) | Keep |
| fra-data-til-effektivitet | 107 | 2 | 33.0 | data efficiency platform (9 @ 59) | Keep |
| dansand-3-5-million-bags-of-sand-yearly-opticloud-enables-better-time-management | 96 | 1 | 25.4 | dansand (6 @ 47) | Keep (currently a draft) |
| realtidsbillede-af-produktionen-skaber-samarbejde-mellem-ledere-og-operatorer-pa-et-hojere-niveau | 53 | 0 | 29.8 | broen valves catalog (1 @ 3) | Keep |
| kvik-maximizing-uptime-and-efficiency-with-usage-based-maintenance-through-opticloud | 32 | 0 | 6.9 | - | Keep |
| dansk-traeemballage-boosts-oee-by-5-in-3-months-with-opticloud | 13 | 0 | 7.8 | - | Keep |
| detaljeret-viden-om-produktion-giver-medicinal-kunde-mulighed-for-at-hoste-lavt-haengende-frugter | - | - | - | - | Keep |

Danish `.da.md` siblings have no data of their own (the old site had no Danish locale). They follow their English post: if a post is merged or retired, its `.da.md` goes with it.

## Not covered here

- Two old cases that are missing from this repo (Ege Carpets, Fog Veno) were already gone from the old site (404 there on 2026-10-05), so `lib/legacy-redirects.ts` sends both to `/cases`.
- Old non-blog pages with search traffic (`/predictive-maintenance-cmms-tpm/`, `/efficiency-and-oee/` and others) are redirect questions for `lib/legacy-redirects.ts`, not content decisions.
