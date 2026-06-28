import type { Metric } from "@/content/shared/types"

export function MetricsSection({
  title,
  metrics,
}: {
  title: string
  metrics: Metric[]
}) {
  return (
    <section className="px-6 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-16 text-center text-3xl font-light lg:text-4xl">
          {title}
        </h2>
        <div className="grid gap-8 text-center sm:grid-cols-3 lg:gap-12">
          {metrics.map((item) => (
            <div key={item.label}>
              <p className="text-5xl font-extralight tracking-tight text-primary lg:text-6xl">
                {item.metric}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
