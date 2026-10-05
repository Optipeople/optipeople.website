---
title: "What Is OEE? Meaning, Formula and Examples"
description: "OEE (Overall Equipment Effectiveness) is the share of planned production time that is truly productive. The formula, worked examples and what a good score is."
date: "2023-01-18"
updated: "2026-10-05"
author: "OptiPeople Team"
category: "Insights"
image: "/images/blog and case/blog/oee-calculation.jpg"
---

OEE (Overall Equipment Effectiveness) is the share of planned production time that is truly productive: making good parts, at full speed, with no stops. It is calculated as Availability x Performance x Quality. An OEE of 100% is perfect production, 85% is considered world class, and a typical plant runs closer to 60%.

## What does OEE stand for?

OEE stands for **Overall Equipment Effectiveness**. It is the standard KPI for how well a machine, line or plant uses the time it is scheduled to produce. One number tells you how far production is from perfect, and its three factors tell you where the gap is.

OEE comes from Total Productive Maintenance (TPM), developed in Japan by Seiichi Nakajima, and it is now used in manufacturing across every industry.

## How do you calculate OEE?

OEE multiplies three factors, each a percentage of the ideal:

```text
OEE = Availability x Performance x Quality

Availability = Run time / Planned production time
Performance  = (Ideal cycle time x Total count) / Run time
Quality      = Good count / Total count
```

The three factors cancel out to a shortcut that gives the same result:

```text
OEE = (Good count x Ideal cycle time) / Planned production time
```

Each factor captures a different kind of loss. Together they cover the six big losses from TPM:

| Factor | What it measures | Losses it captures |
|---|---|---|
| Availability | Run time as a share of planned production time | Breakdowns, setups and changeovers |
| Performance | Actual speed against the ideal speed | Minor stops, idling and reduced speed |
| Quality | Good parts as a share of all parts made | Scrap, rework and start-up rejects |

For more worked calculations, see [how to calculate OEE step by step](/blog/how-to-calculate-oee-for-manufacturing-and-maintenance).

## What is an example of an OEE calculation?

Take one 8-hour shift on a machine with an ideal cycle time of 1 minute per part:

- Planned production time: `480 minutes`
- Downtime (a breakdown and a changeover): `80 minutes`
- Run time: `400 minutes`
- Total count: `360 parts`
- Good count: `342 parts`

Then:

```text
Availability = 400 / 480       = 83.3%
Performance  = (1 x 360) / 400 = 90.0%
Quality      = 342 / 360       = 95.0%

OEE = 83.3% x 90.0% x 95.0%    = 71.3%
```

The shortcut confirms it: 342 good parts x 1 minute / 480 minutes = 71.3%. Of the 480 minutes, only about 342 produced good parts. The biggest loss is availability, so the downtime is the place to start.

## What is a good OEE score?

| OEE score | What it means |
|---|---|
| 100% | Perfect production: only good parts, at full speed, with no stops |
| 85% | World class for discrete manufacturing, a long-term goal for most plants |
| 60% | Typical for discrete manufacturers, with plenty of room to improve |
| 40% | Common when a plant first starts measuring, and easy to raise |

The 85% benchmark comes from 90% availability, 95% performance and 99.9% quality. Read more about [what a world class OEE score is](/blog/unlocking-world-class-performance-with-oee-how-to-maximize-efficiency-and-results) and how to get there.

## What does weekly OEE data look like?

Here is one machine over four weeks:

| Week | Availability (%) | Performance (%) | Quality (%) | OEE (%) |
| --- | ---: | ---: | ---: | ---: |
| 1 | 92 | 85 | 98 | 76.6 |
| 2 | 88 | 80 | 95 | 66.9 |
| 3 | 93 | 87 | 99 | 80.1 |
| 4 | 90 | 82 | 97 | 71.6 |

OEE is highest in week 3 and lowest in week 2. Week 2 lost on all three factors at once, so the question is what was different that week: a new product, a new operator, a machine that needed attention.

## Is OEE a KPI?

Yes. OEE is one of the most used KPIs in manufacturing, because it compares actual production with the ideal on a single scale. It measures how well machines, processes and the people around them work together.

Production uses it to find the machine, shift or product that loses the most time. Maintenance uses it to see how equipment condition affects output and quality: breakdowns show up in availability, and worn equipment often shows up as lower speed and more scrap. [OEE for maintenance](/blog/oee-for-maintenance) covers that side in more detail.

## Why is OEE important?

Raising OEE frees capacity you already own. Before you add shifts, overtime or new machines, OEE shows how much more the current equipment could make. It also gives operators, production and maintenance a shared number to improve, instead of each team arguing from its own data.

## How do you improve OEE?

1. Measure it automatically, so the numbers are trusted and current.
2. Find the factor that loses the most: availability, performance or quality.
3. Register stop causes and fix the biggest ones first.
4. Shorten changeovers and remove minor stops.
5. Follow the trend per shift and per week, not just the monthly average.

The [guide to improving OEE](/blog/how-do-i-improve-my-oee-with-examples) goes through each step with examples.

## How do you measure OEE automatically?

Manual OEE from shift sheets is slow and usually too optimistic, because short stops and slow running are not written down. The [OptiPeople OEE module](/modules/production) collects the data straight from the machines and shows availability, performance, quality and OEE live per machine, line and shift. Operators register stop causes at the machine, so you see not just the number but what took the time.

## FAQ

### What does OEE stand for?

OEE stands for Overall Equipment Effectiveness. It measures how much of the planned production time is truly productive.

### What is the formula for OEE?

OEE = Availability x Performance x Quality. Availability is run time divided by planned production time, performance is ideal cycle time times total count divided by run time, and quality is good count divided by total count.

### What is a good OEE?

85% is considered world class for discrete manufacturing. Many plants run around 60%, and 40% is common when a plant starts measuring.

### What is the difference between OEE and TEEP?

OEE measures against planned production time. TEEP measures against all calendar time, 24 hours a day, 7 days a week, so it also shows unused capacity. See [OEE, OOE and TEEP compared](/blog/oee-teep-and-ooe-whats-the-difference-with-examples).

### Can OEE be higher than 100%?

No. If OEE comes out above 100%, the ideal cycle time is set too slow. Use the fastest cycle time the machine can reliably run, not the average.
