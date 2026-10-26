---
title: "Stop registration: How to track stops and stop causes"
description: "Stop registration and stop cause analysis: why the cause is logged at the machine, how to build a good stop cause list, and what to do with the data."
date: "2026-10-26"
author: "OptiPeople Team"
category: "Insights"
image: "/images/blog and case/blog/lean-manufacturing.jpg"
---

Stop registration means recording every machine stop with its time, its duration and its cause. The machine can report by itself that it has stopped. Only the operator knows why, and only right now. That is why the cause must be registered at the machine while the stop happens. Written down after the shift, it is a guess.

## What is stop registration?

Stop registration, often called downtime tracking, is keeping a running record of when a machine stands still, for how long and why. Every stop gets three things: when it started, when it ended and a cause. Together they become stop data: how much time is lost, on which machines, in which shifts and for which reasons.

That sounds simple. The hard part is not seeing that the machine has stopped. The hard part is getting a cause on every stop that you can count and compare afterwards. "The machine stood for 40 minutes" is not something you can act on. "The machine stood for 40 minutes because there was no packaging" is.

Keep planned and unplanned stops apart from the start. Planned stops are things like breaks and planned maintenance. Unplanned stops are breakdowns, jams and waiting for material or people. Changeovers are planned, but they still cost production time, so they belong in the registration. Mix it all together and the stops you can fix get lost among the ones that have to be there.

## Why do stop causes matter for OEE?

OEE is availability x performance x quality. Longer stops pull availability down, and short stops pull performance down. The OEE number tells you that you are losing time. The stop causes tell you why. If OEE is new to you, start with [what OEE is and how it is calculated](/blog/what-is-oee).

Without causes, a discussion about downtime comes down to who remembers best. With causes you can see that, say, a large share of stop time is "waiting for material". That is a planning problem, not a machine problem, and you can send it to the people who can fix it.

Timing is everything. The moment the machine stops, the operator knows whether it was a jam, a tool that needed changing or a pallet that never arrived. Two hours later it has turned into "machine fault" or "other". So the cause has to be given at the machine, while it is clear what happened.

## Manual or automatic stop registration?

There are three common ways to do it:

| Method | Who records the time | Who gives the cause | Typical problem |
|---|---|---|---|
| Paper shift sheet | The operator, afterwards | The operator, afterwards | Short stops are left out and times are rounded |
| Operator enters the stop | The operator, when there is time | The operator | Start and end are estimated, and stops are missed in busy periods |
| Machine reports the stop | The machine, automatically | The operator, at the machine | The machine has to be connected |

Paper and manual entry give numbers that look better than production really is. Nobody is cheating. Nobody writes down a two-minute stop in the middle of a busy shift.

The best split of the work is that the machine keeps the time and the operator gives the cause. The machine knows exactly when it stopped and started again. The operator knows why. If you are choosing a system to do this, the guide on [how to choose an OEE system](/blog/how-to-choose-an-oee-system) covers what it must do, what drives the cost and what to ask the vendor.

This is how [stop cause registration in OptiPeople Data Platform](/features/stop-cause-registration) works: when the machine stops, the operator panel turns red. The operator taps the screen and picks the cause from a predefined list tailored to that machine or workstation. The duration comes from the machine, and the operator can add a note. Every stop then sits on a timeline for the shift.

## How do you build a good stop cause list?

The list decides whether stop data becomes useful. A good list is short, written in the words of the shop floor and adjusted as you go.

- **Few top-level groups.** Five to eight groups is enough, with a few sub-causes under each. A 40-line list will not get read while the machine is down.
- **Use the operators' words.** "Waiting for forklift" beats "internal logistics deviation". Build the list with the people who will use it.
- **Avoid "other".** If "other" is on the list, it becomes the biggest cause. If you need it, require a note and read the notes every week.
- **Fit the list to the machine.** A press and a packing machine do not stop for the same reasons. A shared set of top-level groups keeps machines comparable.
- **Review the list regularly.** Remove causes nobody uses. Add new ones when the notes show the same thing again and again.
- **Keep it fast.** The operator should find the cause in a few seconds. Otherwise it gets skipped.

**Example** of a stop cause list for a packing line:

| Group | Sub-causes |
|---|---|
| Changeover | Product change, format change, start-up after changeover |
| Material | Waiting for material, waiting for packaging, wrong material |
| Machine fault | Jam, sensor trips, mechanical fault, electrical fault |
| Tooling | Tool change, worn tool |
| Staffing | No operator, training |
| Quality | Quality check, adjustment after a defect |
| Planned | Break, planned maintenance, cleaning |

## What about micro stops and short stops?

Micro stops last seconds or a couple of minutes: a jam, a sensor that trips, a part that sits wrong. One on its own is nothing. Together they can take more time than a breakdown.

It makes no sense to ask the operator for a cause on every single one. People then stop registering altogether, the long stops included. Many plants therefore set a limit: stops under, say, a couple of minutes count as short stops, and only the longer ones need a cause. Where the limit should sit depends on the machine, so agree on it with the people who run it.

Short stops still need to be measured. On paper they never make it in, and they only show up as low performance, with nobody knowing why. When the machine reports stops itself, you can see how often they happen, on which product and in which shift. The [guide to improving OEE](/blog/how-do-i-improve-my-oee-with-examples) has more on getting rid of short stops.

## How do you analyse stop causes?

Stop data changes nothing until someone acts on it. Three habits make that happen.

**Sort the causes by time.** Add up the week's stop time per cause and sort with the biggest at the top. This is a Pareto chart. Usually a few causes account for most of the time, and then you know where to start.

**Example** for one machine over one week (the numbers are made up for the example):

| Stop cause | Minutes | Share | Cumulative share |
|---|---:|---:|---:|
| Changeover | 140 | 31.1% | 31.1% |
| Waiting for material | 110 | 24.4% | 55.6% |
| Jam | 85 | 18.9% | 74.4% |
| Tool change | 55 | 12.2% | 86.7% |
| No operator | 35 | 7.8% | 94.4% |
| Cleaning | 25 | 5.6% | 100.0% |
| **Total** | **450** | | |

Here the two biggest causes take more than half of the stop time. Look at the number of stops too, not only the minutes. 85 minutes of jams can be one long stop or 40 short ones, and those are two different problems.

**Bring it to the board meeting.** Once a week is a good rhythm. Look at the three biggest causes, give each action one owner, and check next week's numbers to see whether it worked. [Board meetings](/blog/tavlemoder) covers how to set up the meeting.

**Follow up.** Fix the biggest cause, see whether it disappears from the data, then take the next one. If it comes back a month later, the fix was not good enough. Stop causes also help at shift handover: see [Shifts without hassle](/blog/skiftehold-uden-bovl).

In the [OEE module in OptiPeople Data Platform](/modules/production), every registered stop goes straight into the OEE figures. The OEE report shows the biggest stop reasons, planned and unplanned stop time and the number of stops per machine, and you can pick the shifts and the period you want to look at.

## How do you get started?

1. **Start with one machine.** Pick the one that holds the rest of production back.
2. **Build the list with the operators.** Few groups, their words, no "other" without a note.
3. **Let the machine report the stop.** Then the operator only has to give the cause.
4. **Look at the numbers every week.** Sort the causes by time and take the biggest.
5. **Adjust the list after a month.** Remove what nobody uses and add what the notes show.
6. **Roll out to more machines** once the first one runs and people can see the numbers being used.

The most important thing is that operators can see their registrations lead to something. Then they keep doing it.

To see what it looks like at the machine, read about [stop cause registration](/features/stop-cause-registration) and the [OEE module](/modules/production), where the stops become OEE, reports and something to act on.

## FAQ

### What is stop registration?

Stop registration is recording every machine stop with its start, its end and its cause. Together the records show how much production time is lost, where and why.

### Why should the stop cause be registered at the machine?

Because the operator only knows exactly what happened at the moment it happens. When the cause is written down after the shift, it gets guessed and short stops get forgotten.

### How many stop causes should we have?

Five to eight top-level groups with a few sub-causes under each is a good starting point. The operator should be able to find the right cause in a few seconds.

### Do short stops need a cause?

Not necessarily every one. Many plants set a limit, so only the longer stops need a cause, while the short ones are measured automatically and looked at as a group.

### How do you analyse stop causes?

Add up the stop time per cause and sort with the biggest at the top in a Pareto chart. Fix the biggest cause first and check in the following weeks' data that it has shrunk.

### What is the difference between planned and unplanned stops?

Planned stops are things like breaks and planned maintenance. Unplanned stops are breakdowns, jams and waiting time. Keep them apart, so the stops you can fix do not get lost.
