export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="px-6 lg:px-8 pt-16 sm:pt-24 pb-16">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-5xl tracking-tight text-[var(--gray-10)] leading-[0.9] font-extralight">
            Digital Platform for Smart Operations
          </h1>

          <div
            className="w-16 h-px bg-gradient-to-r from-[var(--green-dark2)] to-[var(--purple-dark2)] mx-auto mt-8"
            aria-hidden="true"
          />

          <p className="text-2xl font-light text-slate-600 leading-relaxed max-w-3xl mx-auto mt-8">
            Transform your operations with AI-powered smart solutions and
            intelligent automation.
          </p>
        </div>
      </section>
    </main>
  );
}
