export default function VideosPage() {
  return (
    <main className="min-h-screen">
      <section className="pt-16 sm:pt-24 pb-16 lg:pb-24 px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase mb-3">
            Videos
          </p>
          <h1 className="text-4xl sm:text-5xl font-light text-foreground tracking-tight leading-tight">
            See Opticloud in action
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-3xl">
            Watch product demos, customer stories, and tutorials to understand
            how Opticloud works on the shopfloor.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 px-6 lg:px-8 bg-muted/30">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-lg text-muted-foreground">
            Videos coming soon.
          </p>
        </div>
      </section>
    </main>
  )
}
