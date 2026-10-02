---
title: "Types of Predictive Maintenance: The 4 Main Approaches"
description: "The four types of predictive maintenance compared: condition-, time-, usage- and model-based. What triggers each, what data it needs, where it fits."
date: "2022-09-05"
author: "OptiPeople Team"
category: "Insights"
image: "/images/blog and case/blog/bohica.jpg"
---

There are four main types of predictive maintenance: condition-based (sensors watch vibration, temperature or current), time-based (failure history estimates when a part wears out), usage-based (running hours or cycle counts trigger service) and model-based (machine learning predicts failure from many signals). Most plants combine two or more.

## The four types of predictive maintenance compared

| Type | What triggers maintenance | Data it needs | Best for |
|---|---|---|---|
| Condition-based | A measured value drifts past a limit | Live sensor data: vibration, temperature, current, oil | Motors, pumps, compressors, gearboxes |
| Time-based | The expected life of a part runs out | Failure and repair history | Parts that wear out on a regular pattern |
| Usage-based | A running-hour or cycle count is reached | Running hours, cycles, units produced | Presses, cranes, forklifts, machines with varying load |
| Model-based | A model predicts a rising risk of failure | Many signals plus recorded failures | Critical assets with complex failure modes |

## What is predictive maintenance?

Predictive maintenance is maintenance timed by data about the machine instead of by the calendar. The goal is to act just before a failure, so the repair happens in a planned stop. For a fuller explanation, see [what predictive maintenance means](/blog/what-is-the-definition-or-meaning-of-predictive-maintenance) and [how it works step by step](/blog/how-does-predictive-maintenance-work).

## What is condition-based predictive maintenance?

Sensors measure the condition of a machine continuously, and maintenance is triggered when a value moves outside its normal range. Typical signals are vibration, temperature, current draw, pressure and oil quality.

It suits rotating equipment such as motors, pumps, fans, compressors and turbines, where wear shows up as a change in vibration or heat long before the machine stops. The limit is cost: every monitored point needs a sensor and somewhere to send the data. The [tools used for condition monitoring](/blog/what-are-predictive-maintenance-tools) are covered in a separate guide.

## What is time-based predictive maintenance?

Time-based predictive maintenance uses the failure history of a component to estimate how long it lasts, then schedules replacement before that point. Instead of a fixed interval picked from the manual, the interval comes from your own data.

It works when failures follow a clear, repeatable pattern, which is true for many mechanical and electrical wear parts. It is the closest of the four to [preventive maintenance](/blog/what-is-the-difference-between-preventive-and-predictive-maintenance), and it misses parts that wear faster because the machine is run harder.

## What is usage-based predictive maintenance?

Usage-based maintenance triggers service after a set amount of actual use: running hours, cycles, strokes or units produced. A machine that runs three shifts gets serviced sooner than one that runs one shift, even though the calendar says the same.

It is often the easiest place to start, because most machines can already report running hours and cycle counts without new sensors. It fits presses, packaging machines, cranes, forklifts and any equipment where load varies from week to week. The kitchen maker [Kvik switched from fixed intervals to usage-based maintenance](/blog/kvik-maximizing-uptime-and-efficiency-with-usage-based-maintenance-through-opticloud), raised uptime by 5% and removed around four unnecessary services a year.

## What is model-based predictive maintenance?

Model-based predictive maintenance uses statistical or machine learning models that combine many signals to predict the risk of failure, or the remaining useful life of a component. It can catch patterns no single limit would reveal.

It pays off on critical, expensive assets with complex failure modes. It needs the most data: several signals over time and a record of real failures to learn from. Without that history, the model has nothing to learn.

## Which type of predictive maintenance should you use?

Match the type to the machine, not the other way round:

1. **Start with usage-based** on machines where wear follows how much they run. It needs little more than a connection to the machine.
2. **Add condition-based monitoring** on critical rotating equipment, where vibration or temperature gives an early warning.
3. **Use time-based intervals** for wear parts with a known, stable life.
4. **Move to model-based** only on assets where downtime is very expensive and you have the data and failure history to support it.

Weigh the cost against the downtime it saves. The [advantages and disadvantages of predictive maintenance](/blog/what-are-the-advantages-and-disadvantages-of-predictive-maintenance) sets out where it pays and where it does not, and [real examples](/blog/what-are-the-examples-of-predictive-maintenance) show each type in use.

## How do you put it into practice?

Pick the assets where a breakdown hurts most, connect them, set the triggers and make sure each alert turns into a maintenance task with an owner. Then review the results and adjust thresholds as failures are recorded.

The [OptiPeople Maintenance module](/modules/maintenance) supports usage-based and condition-based triggers on the same machine. It reads running hours, cycle counts, temperature, vibration and current from connected equipment and raises alerts and tasks when a limit is reached.

## Frequently asked questions

### What are the 4 types of predictive maintenance?

Condition-based, time-based, usage-based and model-based. They differ in what triggers the work: a measured condition, the expected life of a part, the amount of use, or a model's prediction.

### Is usage-based maintenance preventive or predictive?

It sits between the two. Like preventive maintenance it uses a planned trigger, but the trigger comes from the machine's actual use rather than the calendar, so it is often counted as a simple form of predictive maintenance.

### What is the difference between condition monitoring and predictive maintenance?

Condition monitoring is the measuring: collecting vibration, temperature or current data. Predictive maintenance is the strategy that uses those measurements, along with other data, to decide when to act.

### Which type of predictive maintenance is most common?

Condition-based maintenance is the most widespread, especially vibration and temperature monitoring on rotating equipment. Usage-based maintenance is the most common starting point, because it needs the least new hardware.
