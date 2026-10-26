# Search and AI targets

Set 2026-10-26 from 16 months of Search Console and GA4 data (2025-06-24 to 2026-10-24), a check of who ranks and who gets recommended for buyer queries, and two Perplexity prompts. The tracked list is `targets.json`. The growth loop (`growth-loop.md`) reviews both every 14 days.

## Where we stand

- **Search brings readers, not buyers.** 548,000 non-brand impressions in 16 months gave 531 clicks (0.1%). Nearly all of it is US readers of guides on OEE, OOE and TEEP, predictive maintenance and Industry 5.0. Brand searches gave 1,545 clicks at 20% CTR.
- **Danish non-brand search is close to zero:** 709 impressions and 3 clicks from Denmark in the last 3 months. Danish buyers find us only by name.
- **The one commercial cluster with traction is cloud MES.** "cloud mes", "cloud based manufacturing execution system", "cloud mes software" and variants: about 25,000 impressions in 16 months, now at positions 11 to 17, ranking with the blog post, not the MES module page.
- **AI engines do not know us.** Perplexity names Evocon for "best OEE software for a small manufacturer in Denmark" and Trendlog (TrendOEE), Flexkom (Evocon reseller) and Vetech (PLEET) for "Danish suppliers of OEE systems and production monitoring". OptiPeople is in none of the "best OEE software" lists or directories AI engines cite (Capterra, GetApp, GlobalReader, Reliamag, Guidewheel, TeepTrak), and the web has almost no third-party mention of OptiPeople.
- **AI referrals exist but are small:** 75 sessions in 16 months (ChatGPT 42, Perplexity 19, Gemini 10, Claude 3), mostly to the Industry 5.0, predictive maintenance and OEE guides. No key events, because GA4 has no key events marked.

## Who we compete with

- **In Denmark:** Factbird (the only Danish OEE vendor with real visibility: cases, Capterra reviews, public prices), Evocon via Flexkom, Trendlog, Vetech PLEET, Aptean (owns the former Optiware), Novotek and Kaastrup|Andersen for MES.
- **In English:** Evocon, MachineMetrics, Vorne, TeepTrak, Fabrico, Guidewheel, FourJaw, Tulip, Redzone, Tractian, plus enterprise Siemens, Rockwell Plex, GE Proficy.
- English head terms ("OEE software", "machine monitoring software", "downtime tracking software") are owned by vendor listicles ("best X software 2026") and Capterra. Not worth a head-on fight now.

## Targets

### 1. Danish buyer searches (first priority)

The Danish results are thin and dated (ing.dk articles from 2010, foreign vendors' pages, help docs). A small Danish vendor with real Danish pages can win them.

| Query | Page | Goal |
| --- | --- | --- |
| oee system, oee software, oee måling | /da/modules/production | top 3 to 5 in Denmark |
| oee beregning | Danish OEE calculation guide | top 3 (was 787 impressions at 9.9) |
| produktionsovervågning, maskinovervågning | /da/modules/iot | top 3 |
| stopregistrering | /da/features/stop-cause-registration | top 3 (only Factbird help docs rank) |
| mes system | /da/modules/mes | top 5 |
| energiovervågning (i produktionen) | /da/modules/energy | top 5 |

Watch also: "digitalisering af produktion", "OEE-tavle", "nøgletal produktion", "kassationsregistrering". Add them when they show up in the data.

### 2. English niche buyer searches

Go where the big vendors are weak: cloud MES for small plants, energy per produced unit, stop analysis, AI on production data.

| Query | Page | Goal |
| --- | --- | --- |
| cloud mes, cloud based manufacturing execution system, cloud mes software, saas mes | /modules/mes (blog post as support) | top 5 |
| oee software for small manufacturers | /modules/production | top 10 |
| energy consumption per unit produced | /modules/energy | top 10 |
| stop analysis | /features/stop-cause-registration | top 5 |

### 3. Guides that already rank (defend, then convert)

These bring the traffic AI engines quote from. Keep them top 5, keep them answer-first, and give each a clear next step to the matching module.

| Query | Page | Now (28 days) |
| --- | --- | --- |
| what are the disadvantages of predictive maintenance | predictive maintenance pros and cons guide | 5.1, 0 clicks from 871 impressions |
| types of predictive maintenance | four types guide | 9.4 |
| ooe meaning | OEE, TEEP and OOE guide | 8.3 |
| what does oee stand for | what-is-oee | 10.3, the OEE1 vs OEE2 post ranks instead |
| 5th industrial revolution | Industry 5.0 guide | 8.4 |

### 4. AI answers (checked in Perplexity every cycle)

Goal by end of Q1 2027: OptiPeople named in at least 3 of these 6 answers. The most important lever is off-site: directory profiles with reviews, inclusion in the lists AI engines cite, and Danish trade press and partner pages that name OptiPeople and its customers.

| # | Prompt | 2026-10-26 |
| --- | --- | --- |
| 1 | What is the best OEE software for a small manufacturer in Denmark? | Evocon. Not named. |
| 2 | Hvilke danske leverandører af OEE-systemer og produktionsovervågning findes der? | Trendlog, Flexkom/Evocon, Vetech PLEET. Not named. |
| 3 | Which cloud MES works for a small manufacturer without a big IT project? | Not checked yet |
| 4 | How can a factory measure energy consumption per produced unit? | Not checked yet |
| 5 | Is there an AI assistant that answers questions about my machines and OEE data? | Not checked yet |
| 6 | What is OptiPeople? | Not checked yet |

## What we are not chasing

- CMMS, lean principles and general predictive maintenance head terms: big US volume, positions 30 to 90, no buyers for us. See `content-inventory.md`.
- English "best OEE software" head terms: listicles and Capterra own them. We get there by being listed, not by ranking our own page.
