"use client"

import { useMemo } from "react"
import { employees } from "@/lib/employees"

export function PeopleDirectory() {
  const { stats, orderedEmployees } = useMemo(() => {
    const uniqueTeams = new Set(employees.map((employee) => employee.team))
    const uniqueLocations = new Set(employees.map((employee) => employee.location))

    const currentYear = new Date().getFullYear()
    const totalYears = employees.reduce(
      (sum, employee) => sum + (currentYear - employee.startYear),
      0
    )
    const averageTenure = Math.max(
      Math.round(totalYears / Math.max(employees.length, 1)),
      1
    )

    const priorityByRole: Record<string, number> = {
      "Chief Executive Officer": 1,
      "Chief Technology Officer": 2,
      "Head of Projects": 3,
      "Sales Engineer": 4,
      "Technical Consultant": 5,
      "BI Consultant": 6,
      "IoT Engineer": 7,
      "Marketing Project Manager": 8,
    }

    const orderedEmployees = [...employees].sort((a, b) => {
      const aPriority = priorityByRole[a.role] ?? 999
      const bPriority = priorityByRole[b.role] ?? 999

      if (aPriority !== bPriority) {
        return aPriority - bPriority
      }

      return a.name.localeCompare(b.name)
    })

    return {
      stats: [
        { value: `${employees.length}`, label: "Employees" },
        { value: `${uniqueTeams.size}`, label: "Departments" },
        { value: `${uniqueLocations.size}`, label: "Locations" },
        { value: `${averageTenure}+ yrs`, label: "Average tenure" },
      ],
      orderedEmployees,
    }
  }, [])

  return (
    <div>
      <section className="pt-16 sm:pt-24 pb-16 lg:pb-24 px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase mb-3">
            People
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-tight">
            Meet the team behind OptiPeople
          </h1>
          <p className="mt-6 text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl">
            Leadership, engineering, projects, sales, and consulting working
            together to help industrial teams improve performance every day.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16 px-6 lg:px-8 bg-muted/30">
        <div className="mx-auto max-w-6xl grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-4xl lg:text-5xl font-extralight text-primary tracking-tight">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 lg:py-24 px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10">
            {orderedEmployees.map((person) => (
              <article
                key={person.slug}
                className="rounded-3xl border border-border/60 bg-background p-6 transition-colors hover:border-primary/40"
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
                      {person.team}
                    </p>
                    <h2 className="mt-2 text-lg font-medium leading-tight">
                      {person.name}
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">{person.role}</p>
                  </div>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-muted text-sm font-medium text-foreground">
                    {person.name
                      .split(" ")
                      .slice(0, 2)
                      .map((part) => part[0])
                      .join("")}
                  </div>
                </div>

                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>{person.location}</p>
                  <a
                    href={`mailto:${person.email}`}
                    className="inline-flex items-center text-foreground underline-offset-4 hover:underline"
                  >
                    {person.email}
                  </a>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {person.expertise.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 px-6 lg:px-8 bg-muted/30">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl lg:text-4xl font-light tracking-tight">
            Built by people who care about the real factory floor
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            We combine industrial experience with product engineering to help
            manufacturers improve daily operations.
          </p>
        </div>
      </section>
    </div>
  )
}
