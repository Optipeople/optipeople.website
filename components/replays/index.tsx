import type { ReactNode } from "react"

import { FramedImage } from "@/components/framed-image"
import type { Locale } from "@/i18n/routing"
import type { ReplaySlug, ReplayShowcase } from "@/content/replays/types"

import { PlatformReplay } from "./platform-replay"
import { MesReplay } from "./mes-replay"
import { OeeReplay } from "./oee-replay"
import { OrdersReplay } from "./orders-replay"
import { PlanningReplay } from "./planning-replay"
import { QualityReplay } from "./quality-replay"
import { MaintenanceReplay } from "./maintenance-replay"
import { EnergyReplay } from "./energy-replay"
import { IotReplay } from "./iot-replay"
import { DocumentsReplay } from "./documents-replay"

import { platformReplay } from "@/content/replays/platform"
import { mesReplay } from "@/content/replays/mes"
import { oeeReplay } from "@/content/replays/oee"
import { ordersReplay } from "@/content/replays/orders"
import { planningReplay } from "@/content/replays/planning"
import { qualityReplay } from "@/content/replays/quality"
import { maintenanceReplay } from "@/content/replays/maintenance"
import { energyReplay } from "@/content/replays/energy"
import { iotReplay } from "@/content/replays/iot"
import { documentsReplay } from "@/content/replays/documents"

/**
 * The Data Platform product replays: one scripted, code-built replay of the
 * real app per page, plus the real screenshots that follow it. Each replay
 * lives in its own file here, its copy in content/replays/<name>.ts.
 */
function entry(slug: ReplaySlug, locale: Locale) {
  const l = locale === "da" ? "da" : "en"
  switch (slug) {
    case "platform": {
      const c = platformReplay[l]
      return { c, node: <PlatformReplay copy={c.demo} label={c.label} /> }
    }
    case "mes": {
      const c = mesReplay[l]
      return { c, node: <MesReplay copy={c.demo} label={c.label} /> }
    }
    case "production": {
      const c = oeeReplay[l]
      return { c, node: <OeeReplay copy={c.demo} label={c.label} /> }
    }
    case "erp-shopfloor": {
      const c = ordersReplay[l]
      return { c, node: <OrdersReplay copy={c.demo} label={c.label} /> }
    }
    case "planning": {
      const c = planningReplay[l]
      return { c, node: <PlanningReplay copy={c.demo} label={c.label} /> }
    }
    case "quality": {
      const c = qualityReplay[l]
      return { c, node: <QualityReplay copy={c.demo} label={c.label} /> }
    }
    case "maintenance": {
      const c = maintenanceReplay[l]
      return { c, node: <MaintenanceReplay copy={c.demo} label={c.label} /> }
    }
    case "energy": {
      const c = energyReplay[l]
      return { c, node: <EnergyReplay copy={c.demo} label={c.label} /> }
    }
    case "iot": {
      const c = iotReplay[l]
      return { c, node: <IotReplay copy={c.demo} label={c.label} /> }
    }
    case "documents": {
      const c = documentsReplay[l]
      return { c, node: <DocumentsReplay copy={c.demo} label={c.label} /> }
    }
  }
}

/**
 * The hero stage: the replay on a deep card in the page's colour. On a hero
 * that is already the deep colour (`dark`), a light ring keeps the card's edge.
 */
export function ReplayStage({
  slug,
  locale,
  deep,
  dark = false,
}: {
  slug: ReplaySlug
  locale: Locale
  deep: string
  dark?: boolean
}) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-[1.75rem] px-4 py-10 shadow-[0_28px_70px_-30px_rgba(0,0,0,0.45)] ring-1 sm:px-8 sm:py-12 lg:rounded-[2rem] ${
        dark ? "ring-white/15" : "ring-black/[0.06]"
      }`}
      style={{
        background: `radial-gradient(120% 80% at 50% 0%, color-mix(in srgb, ${deep} 70%, white) 0%, ${deep} 65%)`,
      }}
    >
      {entry(slug, locale).node}
    </div>
  )
}

/** Showcase rows: real screenshots beside their claim, sides alternating. */
export function ReplayShowcases({ slug, locale, tint }: { slug: ReplaySlug; locale: Locale; tint: string }) {
  const { c } = entry(slug, locale)
  if (c.showcases.length === 0) return null
  return (
    <section className="px-[var(--edge)] pb-16 sm:pb-20 lg:pb-28">
      <h2 className="max-w-2xl text-3xl font-normal leading-[1.15] tracking-tight text-foreground lg:text-4xl">
        {c.showcaseTitle}
      </h2>
      <div className="mt-10 space-y-6 lg:mt-14 lg:space-y-8">
        {c.showcases.map((item: ReplayShowcase, i: number) => (
          <div
            key={item.image}
            className={`reveal grid items-center gap-8 overflow-hidden rounded-[1.5rem] p-7 sm:p-10 lg:gap-12 lg:rounded-[1.75rem] lg:p-12 ${
              i % 2
                ? "lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]"
                : "lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]"
            }`}
            style={{ backgroundColor: tint }}
          >
            <div className={i % 2 ? "lg:order-2" : ""}>
              <span className="text-sm font-medium tabular-nums text-foreground/50">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-2xl font-normal leading-[1.2] tracking-tight text-foreground lg:text-3xl">
                {item.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-foreground/78 lg:text-lg">
                {item.body}
              </p>
            </div>
            <AppWindow>
              <FramedImage
                src={item.image}
                alt={item.alt}
                boxSizes="(min-width: 1024px) 680px, 100vw"
                cap="[--frame-cap:30rem] lg:[--frame-cap:36rem]"
                className="mx-auto"
              />
            </AppWindow>
          </div>
        ))}
      </div>
    </section>
  )
}

function AppWindow({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl bg-[#f7f7f6] shadow-[0_18px_44px_-24px_rgba(0,0,0,0.35)] ring-1 ring-black/[0.08]">
      <div className="flex items-center gap-1.5 bg-[#233431] px-3.5 py-2.5">
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="ml-3 text-[0.68rem] font-medium text-white/70">platform.optipeople.dk</span>
      </div>
      <div className="p-3 sm:p-4">{children}</div>
    </div>
  )
}
