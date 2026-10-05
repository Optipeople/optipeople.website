---
title: "OEE1 vs OEE2: What OEE Stands For and the Difference"
description: "OEE stands for Overall Equipment Effectiveness. OEE1 uses all calendar time, OEE2 only planned production time. The formula, an example and when to use each."
date: "2022-12-13"
updated: "2026-10-05"
author: "OptiPeople Team"
category: "Insights"
image: "/images/blog and case/blog/oee1-vs-oee2.jpg"
---

OEE stands for Overall Equipment Effectiveness: Availability x Performance x Quality. OEE1 and OEE2 use the same formula with a different time base. OEE1 measures against all calendar time, 24 hours a day, 365 days a year. OEE2 measures against planned production time, the hours you actually schedule production. OEE1 shows capacity, OEE2 drives daily improvement.

## What does OEE stand for?

OEE stands for **Overall Equipment Effectiveness**. It is the standard manufacturing KPI for how much of the available time a machine spends making good parts at full speed. 100% means only good parts, as fast as possible, with no stops. For the full introduction, see [what OEE is](/blog/what-is-oee).

## How do you calculate OEE?

OEE multiplies three factors. Performance and quality are the same in OEE1 and OEE2. Only availability changes, because it is measured against a different amount of time:

```text
OEE = Availability x Performance x Quality

Availability (OEE1) = Run time / All calendar time
Availability (OEE2) = Run time / Planned production time

Performance = (Ideal cycle time x Total count) / Run time
Quality     = Good count / Total count
```

## What is the difference between OEE1 and OEE2?

| | OEE1 | OEE2 |
|---|---|---|
| Time base | All calendar time | Planned production time |
| Hours in a year | 8,760 (24 x 365) | Only the scheduled shifts, minus planned stops |
| Counted as lost time | Everything, including nights, weekends and holidays | Only unplanned stops, slow running and scrap |
| Answers | How much capacity is left in the machine? | How well does the machine run when it is scheduled? |
| Also known as | Close to TEEP | Classic OEE |
| Best for | Capacity planning and investment decisions | Daily improvement on machines and shifts |

Because OEE1 divides by more hours, it is always lower than OEE2 on the same machine.

## What is an example of OEE1 and OEE2?

Take one machine over one week:

- All calendar time: `168 hours`
- Planned production time: `70 hours` (two shifts, 5 days, minus breaks and planned stops)
- Run time: `56 hours`
- Performance: `90%`
- Quality: `95%`

```text
OEE2 = (56 / 70)  x 90% x 95% = 80.0% x 85.5% = 68.4%
OEE1 = (56 / 168) x 90% x 95% = 33.3% x 85.5% = 28.5%
```

Same machine, same week, same parts. OEE2 says the machine runs fairly well when it is scheduled, with downtime as the biggest loss. OEE1 says it produces for less than a third of the week, so there is room for a lot more volume before anyone needs a new machine.

## When should you use OEE1?

Use OEE1 when the question is capacity:

- How much total capacity do we have?
- Can we take a big order by adding a shift instead of buying a machine?
- How much unused potential is there across the plant?

### When not to use OEE1

OEE1 is the wrong number for improving a specific machine or shift. Holidays, closed weekends and a missing night shift pull it down, even when the machine runs perfectly in every scheduled hour. Operators cannot act on those losses.

## When should you use OEE2?

Use OEE2 for daily improvement work. It leaves out the hours where production was never planned, so every loss it shows is one the team can do something about:

- shift-level improvement
- machine-level analysis
- targeted work on stops, speed and scrap

To calculate OEE2 correctly, you need to know:

- how many shifts you run
- how many hours those shifts work
- how many planned stops you have
- how much planned production time remains after those stops

## How do you measure OEE2 automatically?

OEE2 is only as good as the run time and stop data behind it. The [OptiPeople OEE module](/modules/production) collects that data straight from the machines and shows availability, performance, quality and OEE live per machine, line and shift. Operators register stop causes at the machine, so the team sees what took the time, not just the number.

## FAQ

### What does OEE stand for in manufacturing?

OEE stands for Overall Equipment Effectiveness. It measures how much of the planned time a machine spends making good parts at full speed, calculated as availability x performance x quality.

### Is OEE1 the same as TEEP?

In practice, yes. Both measure against all calendar time, 24 hours a day, 365 days a year. TEEP is the international term, while OEE1 is mostly used in Scandinavia. See [OEE, OOE and TEEP compared](/blog/oee-teep-and-ooe-whats-the-difference-with-examples).

### Is OEE2 the same as OEE?

Yes. OEE2 is OEE as it is usually defined: measured against planned production time.

### Why is OEE1 lower than OEE2?

OEE1 divides the same run time by more hours. Every hour without planned production counts as a loss in OEE1, but not in OEE2.

### What is a good OEE2 score?

85% is considered world class for discrete manufacturing, and many plants run around 60%. OEE1 has no common benchmark, because it depends mostly on how many shifts the plant runs.
