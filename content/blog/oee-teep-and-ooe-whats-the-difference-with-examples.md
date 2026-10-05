---
title: "OOE vs OEE vs TEEP: Meaning, Formulas and Examples"
description: "OOE stands for Overall Operations Effectiveness. How OOE differs from OEE and TEEP, the formula for each, and one example that compares all three."
date: "2022-06-28"
updated: "2026-10-05"
author: "OptiPeople Team"
category: "Insights"
image: "/images/blog and case/blog/oee1-vs-oee2.jpg"
---

OOE stands for Overall Operations Effectiveness. It uses the same formula as OEE (Availability x Performance x Quality), but measures against operations time: all the time the plant is open, including breaks and planned stops. OEE uses only planned production time, and TEEP uses all calendar time. So for one machine, OEE is always highest and TEEP lowest.

## What does OOE stand for?

OOE stands for **Overall Operations Effectiveness**. It measures how well the operation uses the time the plant is open and staffed, its operations time.

The difference from OEE is what counts as a loss. OEE leaves planned stops out of the calculation: breaks, meetings, planned maintenance and team briefings. OOE counts them as lost time. That makes OOE the better number when you want to know how well the whole operation runs during opening hours, not just the machine while it is scheduled to produce.

## What does TEEP stand for?

TEEP stands for **Total Effective Equipment Performance**. It measures production against all calendar time: 24 hours a day, 7 days a week, 365 days a year.

TEEP counts every hour without production as a loss, including nights, weekends and holidays when the plant is closed. That makes it a capacity measure. It answers how much more the equipment could make if you ran it around the clock, which matters before you invest in a new machine or a new hall.

## What does OEE stand for?

OEE stands for **Overall Equipment Effectiveness**. It measures how much of the planned production time is truly productive: good parts, at full speed, with no stops. It is the most widely used of the three and the right number for daily improvement work. For the full explanation, see [what OEE is](/blog/what-is-oee).

## What is the difference between OOE, OEE and TEEP?

All three multiply availability, performance and quality. Only the time base changes, and with it what counts as lost time:

| Metric | Stands for | Time base | Counted as lost time | Answers |
|---|---|---|---|---|
| OEE | Overall Equipment Effectiveness | Planned production time | Unplanned stops, slow running, scrap | How well does the machine run when it is scheduled? |
| OOE | Overall Operations Effectiveness | Operations time (the plant is open) | The OEE losses, plus breaks and planned stops | How well does the operation use its opening hours? |
| TEEP | Total Effective Equipment Performance | All time (24/7/365) | The OOE losses, plus all hours the plant is closed | How much capacity is left in the equipment? |

Because each time base is larger than the one before, OEE is always at least as high as OOE, and OOE is always at least as high as TEEP.

## What are the formulas for OEE, OOE and TEEP?

Performance and quality are the same in all three. Only availability changes:

```text
OEE  = Availability x Performance x Quality

Availability (OEE)  = Run time / Planned production time
Availability (OOE)  = Run time / Operations time
Availability (TEEP) = Run time / All time

Performance = (Ideal cycle time x Total count) / Run time
Quality     = Good count / Total count

TEEP = OEE x Utilization
Utilization = Planned production time / All time
```

## How do OEE, OOE and TEEP compare on the same machine?

Take one machine over one week:

- All time: `168 hours` (7 days x 24 hours)
- Operations time: `80 hours` (two 8-hour shifts, 5 days)
- Planned stops (breaks, meetings, planned maintenance): `10 hours`
- Planned production time: `70 hours`
- Unplanned stops and changeovers: `14 hours`
- Run time: `56 hours`
- Performance: `90%`
- Quality: `95%`

Performance x quality is 90% x 95% = 85.5% in all three. Availability is what moves:

| Metric | Time base | Hours | Availability | Result |
|---|---|---:|---:|---:|
| OEE | Planned production time | 70 | 80.0% | 68.4% |
| OOE | Operations time | 80 | 70.0% | 59.9% |
| TEEP | All time | 168 | 33.3% | 28.5% |

The same 56 hours of running give three different answers. OEE says the machine runs fairly well when it is scheduled. OOE shows that breaks and planned stops cost another 10 hours of opening time. TEEP shows that the machine runs only a third of the week, so there is room for more volume before anyone needs to buy a new machine.

## When should you use OEE, OOE or TEEP?

- **OEE** for daily and weekly improvement on a machine or line. It focuses on the losses the operators and maintenance team can act on now.
- **OOE** when you want to see how planned stops affect output: break cover, meeting length, how planned maintenance is scheduled.
- **TEEP** for capacity planning, before adding shifts, investing in equipment or taking on a large order.

Most plants start with OEE and add TEEP when the question becomes capacity. In Scandinavia you will also meet OEE1 and OEE2, where OEE1 uses all calendar time like TEEP. See [OEE1 vs OEE2](/blog/oee1-vs-oee2-whats-the-difference).

## How do you track OEE in practice?

All three numbers depend on knowing the real run time and the reasons for every stop. The [OptiPeople OEE module](/modules/production) collects that data straight from the machines and shows availability, performance, quality and OEE live per machine, line and shift, with stop causes registered by the operators at the machine.

## FAQ

### What is OOE in manufacturing?

OOE is Overall Operations Effectiveness: availability x performance x quality, measured against the time the plant is open. Unlike OEE, it counts breaks and planned stops as lost time.

### What is the difference between OOE and OEE?

The time base. OEE measures against planned production time and leaves planned stops out. OOE measures against operations time, so planned stops count as a loss and OOE is lower than OEE.

### What does TEEP mean?

TEEP means Total Effective Equipment Performance. It measures production against all calendar time, 24 hours a day, 7 days a week, and shows how much capacity the equipment has left.

### How do you calculate TEEP?

TEEP = OEE x Utilization, where utilization is planned production time divided by all calendar time. An OEE of 68.4% on a machine planned for 70 of 168 hours gives a TEEP of 28.5%.

### Which is better, OEE or TEEP?

Neither. They answer different questions. Use OEE to improve how the machine runs when it is scheduled, and TEEP to see how much more it could produce if it ran more hours.
