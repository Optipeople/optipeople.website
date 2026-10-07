---
title: "How to Calculate OEE: Formula and Worked Example"
description: "OEE = Availability x Performance x Quality. How to calculate each factor step by step, with a worked shift example and the shortcut that checks it."
date: "2022-04-06"
updated: "2026-10-07"
author: "OptiPeople Team"
category: "Insights"
image: "/images/blog and case/blog/oee-calculation.jpg"
---

To calculate OEE, multiply three factors: Availability x Performance x Quality. Availability is run time divided by planned production time. Performance is ideal cycle time times total count, divided by run time. Quality is good count divided by total count. A machine at 90% availability, 90% performance and 98% quality has an OEE of 79.4%.

## What is the OEE formula?

OEE (Overall Equipment Effectiveness) multiplies three factors, each a percentage of the ideal:

```text
OEE = Availability x Performance x Quality

Availability = Run time / Planned production time
Performance  = (Ideal cycle time x Total count) / Run time
Quality      = Good count / Total count
```

The three factors cancel out to a shortcut that gives the same answer:

```text
OEE = (Good count x Ideal cycle time) / Planned production time
```

The shortcut is the quickest way to check your result. The three factors are what tell you where the time went. For what OEE measures and why it matters, see [what OEE is](/blog/what-is-oee).

## What data do you need to calculate OEE?

Five numbers per machine and period:

| Data | What it is | Where it usually comes from |
|---|---|---|
| Planned production time | The time the machine is scheduled to produce, after breaks and planned stops | The shift plan |
| Run time | Planned production time minus all unplanned stops and changeovers | Machine signal or stop log |
| Ideal cycle time | The fastest time per part the machine can reliably run | Machine spec or best demonstrated rate |
| Total count | Every part made, good or bad | Machine counter |
| Good count | Parts that pass quality the first time | Quality registration |

Planned stops (breaks, meetings, planned maintenance) are left out of planned production time, so they do not lower OEE. If you want them counted as a loss, use OOE instead. See [OEE, OOE and TEEP compared](/blog/oee-teep-and-ooe-whats-the-difference-with-examples).

## How do you calculate availability?

Availability is the share of planned production time the machine actually runs.

```text
Availability = Run time / Planned production time
```

Every unplanned stop lowers it: breakdowns, waiting for material, changeovers and setups. Most plants count changeovers as an availability loss, because the machine is not producing while it is set up.

## How do you calculate performance?

Performance compares the actual output with what the machine would have made at its ideal speed during the run time.

```text
Performance = (Ideal cycle time x Total count) / Run time
```

If you know the ideal rate in parts per minute instead of the cycle time, divide: Performance = Total count / (Run time x Ideal rate). Slow running and short stops that nobody registers show up here.

## How do you calculate quality?

Quality is the share of parts that are good the first time.

```text
Quality = Good count / Total count
```

Parts that need rework count as bad, even if they are sold in the end. The time spent making them was not good production.

## What does an OEE calculation look like step by step?

Take one 8-hour shift:

- Shift length: `480 minutes`
- Breaks: `30 minutes`
- Unplanned stops and a changeover: `45 minutes`
- Ideal cycle time: `1.5 seconds` per part (40 parts per minute)
- Total count: `14,580 parts`
- Rejects: `292 parts`

**1. Planned production time:** 480 minus 30 minutes of breaks is `450 minutes`.

**2. Run time:** 450 minus 45 minutes of stops is `405 minutes`.

**3. Availability:** 405 / 450 = `90.0%`.

**4. Performance:** at 40 parts per minute, 405 minutes could make 16,200 parts. 14,580 / 16,200 = `90.0%`.

**5. Quality:** 14,580 minus 292 rejects is 14,288 good parts. 14,288 / 14,580 = `98.0%`.

**6. OEE:** 90.0% x 90.0% x 98.0% = `79.4%`.

The shortcut confirms it: 14,288 good parts x 1.5 seconds is 21,432 seconds, or 357.2 minutes. 357.2 / 450 = 79.4%. Of the 450 planned minutes, only about 357 made good parts. Availability and performance lose the same amount here, so the next step is to look at the stop causes and the short stops side by side.

## What are common mistakes when calculating OEE?

- **An ideal cycle time that is too slow.** Using the average or the planned speed makes performance look better than it is, and can push OEE above 100%. Use the fastest rate the machine can reliably run.
- **Leaving out short stops.** Stops of a minute or two are rarely written on a shift sheet. They then end up hidden in performance, and nobody knows what caused them.
- **Counting rework as good.** Quality is first-pass yield. A part that went round twice cost the time of two.
- **Averaging OEE across machines.** Two machines at 60% and 80% are not 70% together if they ran different hours. Add up the times and counts first, then calculate.

## Can OEE be over 100%?

No. 100% is perfect production: only good parts, at the ideal speed, with no stops. If you get more than 100%, the ideal cycle time is set too slow, or the count includes parts made outside the planned time.

## How do you calculate OEE automatically?

Calculating OEE by hand from shift sheets is slow and usually too optimistic, because short stops and slow running are not written down. The [OptiPeople OEE module](/modules/production) collects run time and counts straight from the machines and calculates availability, performance, quality and OEE live per machine, line and shift. Operators register the stop cause at the machine, so you see what took the time, not just the number.

Once you have the number, the [guide to improving OEE](/blog/how-do-i-improve-my-oee-with-examples) shows where to start.

## FAQ

### What is the formula for OEE?

OEE = Availability x Performance x Quality. Availability is run time / planned production time, performance is (ideal cycle time x total count) / run time, and quality is good count / total count.

### How do you calculate OEE in Excel?

Put planned production time, run time, ideal cycle time, total count and good count in five cells. Calculate each factor in its own cell with the formulas above, then multiply the three. Use the same unit of time everywhere, for example minutes.

### Do breaks count in OEE?

No. Breaks and other planned stops are taken out of planned production time before you calculate, so they do not lower OEE. OOE and TEEP count them as lost time.

### What is a good OEE score?

85% is considered world class for discrete manufacturing. Many plants run around 60%, and 40% is common when a plant first starts measuring. See [what a world class OEE score is](/blog/unlocking-world-class-performance-with-oee-how-to-maximize-efficiency-and-results).

### Is OEE calculated per machine or per line?

Both work. For a line, calculate OEE on the bottleneck machine or on the output at the end of the line, because that is what limits how much the line can make.
