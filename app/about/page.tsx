import Image from "next/image"

const values = [
  {
    title: "Start with the problem",
    description:
      "We don't lead with technology. We start by understanding how your operations actually work — the workarounds, the blind spots, the things that fall between systems. The solution follows from there.",
  },
  {
    title: "Make it usable",
    description:
      "Software that operators won't use is software that doesn't work. Everything we build is designed for the people on the floor — fast, clear, no training manual required.",
  },
  {
    title: "Own the outcome",
    description:
      "We don't hand over a system and walk away. We stay involved through rollout, adoption, and iteration. If it's not delivering results, that's our problem too.",
  },
  {
    title: "Earn trust with data",
    description:
      "We avoid buzzwords and vague promises. When we say a system will improve OEE, we show how, by how much, and what it takes. Decisions should be based on facts — including the decision to work with us.",
  },
]

const team = [
  {
    name: "Morten Mathiasen",
    role: "CEO & Founder",
    photo: "/images/team/morten.jpg",
  },
  {
    name: "Kasper Jensen",
    role: "CTO",
    photo: "/images/team/kasper.jpg",
  },
  {
    name: "Line Sørensen",
    role: "Head of Customer Success",
    photo: "/images/team/line.jpg",
  },
  {
    name: "Anders Holm",
    role: "Lead Developer",
    photo: "/images/team/anders.jpg",
  },
  {
    name: "Sara Nielsen",
    role: "Product Manager",
    photo: "/images/team/sara.jpg",
  },
  {
    name: "Thomas Berg",
    role: "Solutions Architect",
    photo: "/images/team/thomas.jpg",
  },
]

const stats = [
  { metric: "10+", label: "Years in industrial operations" },
  { metric: "50+", label: "Factories running on Opticloud" },
  { metric: "15k+", label: "Machines connected" },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="pt-16 sm:pt-24 pb-16 lg:pb-24 px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase mb-3">
            About
          </p>
          <h1 className="text-4xl sm:text-5xl font-light text-foreground tracking-tight leading-tight">
            We make industrial operations work
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-3xl">
            OptiPeople is a digital operations company. We build software, connect
            systems, and help industrial teams turn data into better decisions —
            from the shopfloor to the boardroom.
          </p>
        </div>
      </section>

      {/* Mission / What We Do */}
      <section className="py-16 lg:py-24 px-6 lg:px-8 bg-muted/30">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl lg:text-4xl font-light tracking-tight mb-8">
            Built for the space between shopfloor and ERP
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Most factories have machines that produce data and ERP systems that need
            it — but nothing useful in between. OptiPeople fills that gap. Our
            platform, Opticloud, captures real-time production data, makes it
            visible to operators and managers, and turns it into actions that
            improve performance, reduce waste, and keep operations running.
          </p>
        </div>
      </section>

      {/* Values / How We Work */}
      <section className="py-16 lg:py-24 px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl lg:text-4xl font-light tracking-tight mb-16">
            How we work
          </h2>
          <div className="space-y-12">
            {values.map((value) => (
              <div
                key={value.title}
                className="grid sm:grid-cols-[200px_1fr] gap-4 sm:gap-8"
              >
                <h3 className="text-lg font-medium">{value.title}</h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 lg:py-24 px-6 lg:px-8 bg-muted/30">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl lg:text-4xl font-light tracking-tight mb-16">
            The team
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {team.map((person) => (
              <div key={person.name}>
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-muted mb-4">
                  <Image
                    src={person.photo}
                    alt={person.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-base font-medium">{person.name}</h3>
                <p className="text-sm text-muted-foreground">{person.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Track Record */}
      <section className="py-16 lg:py-24 px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="grid sm:grid-cols-3 gap-8 lg:gap-12 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-5xl lg:text-6xl font-extralight text-primary tracking-tight">
                  {stat.metric}
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
