"use client"

import Image from "next/image"
import { useMemo } from "react"
import { employees } from "@/lib/employees"

export function PeopleDirectory() {
  const stats = useMemo(() => {
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

    return [
      { value: `${employees.length}`, label: "Employees" },
      { value: `${uniqueTeams.size}`, label: "Departments" },
      { value: `${uniqueLocations.size}`, label: "Locations" },
      { value: `${averageTenure}+ yrs`, label: "Average tenure" },
    ]
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
            Engineers, consultants, and operations specialists helping industrial
            teams improve performance every day.
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
            {employees.map((person) => (
              <article key={person.slug} className="group">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-muted mb-4">
                  <Image
                    src={person.photo}
                    alt={`${person.name}, ${person.role} at OptiPeople`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h2 className="text-base font-medium">{person.name}</h2>
                <p className="text-sm text-muted-foreground">{person.role}</p>
                <p className="mt-1 text-sm text-muted-foreground">{person.team}</p>
                <p className="mt-1 text-xs text-muted-foreground">{person.location}</p>
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
