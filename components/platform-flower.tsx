"use client"

import { useState, useEffect, useCallback } from "react"
import { cn } from "@/lib/utils"

interface ModuleNode {
  id: string
  name: string
  description: string
  pitch: string
  features: string[]
  bgVar: string // CSS variable name for background
  borderVar: string // CSS variable name for border
  textColor: "light" | "dark" // whether to use light or dark text
  x: number // percentage
  y: number // percentage
  connections: string[] // ids of connected modules
}

const modules: ModuleNode[] = [
  {
    id: "opticloud",
    name: "OptiCloud",
    description: "Your single source of truth",
    pitch: "All your production data in one place. Connect machines, systems, and people to make decisions based on facts, not gut feeling.",
    features: ["Real-time data collection", "Secure cloud infrastructure", "Open API integrations"],
    bgVar: "--green-dark3",
    borderVar: "--green-dark3",
    textColor: "light",
    x: 50,
    y: 50,
    connections: ["production", "quality", "erp-shopfloor", "maintenance", "energy", "analysis", "iot"],
  },
  {
    id: "production",
    name: "Production",
    description: "See where time is lost",
    pitch: "Track OEE in real-time and understand exactly where production time disappears. Stop guessing, start improving.",
    features: ["Live OEE dashboards", "Stop cause registration", "Work order tracking"],
    bgVar: "--purple-dark2",
    borderVar: "--purple-dark1",
    textColor: "light",
    x: 50,
    y: 12,
    connections: ["opticloud", "quality", "iot"],
  },
  {
    id: "quality",
    name: "Quality",
    description: "Build in accountability",
    pitch: "Register quality data at the source and trace every deviation back to machines, batches, and shifts.",
    features: ["Digital inspections", "Full traceability", "Deviation tracking"],
    bgVar: "--yellow-dark2",
    borderVar: "--yellow-dark3",
    textColor: "dark",
    x: 80,
    y: 26,
    connections: ["opticloud", "production", "erp-shopfloor"],
  },
  {
    id: "erp-shopfloor",
    name: "ERP Shopfloor",
    description: "Bridge ERP and floor",
    pitch: "Your ERP knows the plan. Your machines know reality. OptiCloud connects the two — giving planners real-time actuals and operators the context they need.",
    features: ["Two-way ERP sync", "Work order tracking", "Live shopfloor dashboards"],
    bgVar: "--purple-dark1",
    borderVar: "--purple-dark2",
    textColor: "light",
    x: 87,
    y: 59,
    connections: ["opticloud", "quality", "maintenance"],
  },
  {
    id: "maintenance",
    name: "Maintenance",
    description: "Fix it before it breaks",
    pitch: "Move from reactive firefighting to planned maintenance. Reduce unplanned downtime and extend equipment life.",
    features: ["Preventive scheduling", "Predictive alerts", "Mobile task management"],
    bgVar: "--orange-dark2",
    borderVar: "--orange-dark3",
    textColor: "light",
    x: 67,
    y: 84,
    connections: ["opticloud", "erp-shopfloor", "energy"],
  },
  {
    id: "energy",
    name: "Energy",
    description: "Cut waste, not corners",
    pitch: "Connect energy consumption directly to production output. Find anomalies and optimization opportunities automatically.",
    features: ["Real-time kWh tracking", "Sensor telemetry", "Anomaly detection"],
    bgVar: "--orange-dark3",
    borderVar: "--orange-dark3",
    textColor: "light",
    x: 34,
    y: 84,
    connections: ["opticloud", "maintenance", "analysis"],
  },
  {
    id: "analysis",
    name: "Analysis",
    description: "From data to decisions",
    pitch: "Turn raw production data into clear reports on performance, losses, and cost drivers—without spreadsheets.",
    features: ["Automated reporting", "Cost analysis", "Investment planning"],
    bgVar: "--green-light2",
    borderVar: "--green-light1",
    textColor: "dark",
    x: 13,
    y: 59,
    connections: ["opticloud", "energy", "iot"],
  },
  {
    id: "iot",
    name: "IoT",
    description: "Get data from anything",
    pitch: "Connect any machine, sensor, or system to your platform. Ingest data from PLCs, IoT gateways, and legacy equipment — no matter the protocol or age.",
    features: ["Plug-and-play connectors", "Protocol-agnostic ingestion", "Edge data collection"],
    bgVar: "--green-dark1",
    borderVar: "--green-dark2",
    textColor: "light",
    x: 20,
    y: 26,
    connections: ["opticloud", "production", "analysis"],
  },
]

// Module IDs for auto-rotation (excluding opticloud center)
const rotationOrder = ["production", "quality", "erp-shopfloor", "maintenance", "energy", "analysis", "iot"]

export function PlatformFlower() {
  const [activeModule, setActiveModule] = useState<string | null>(null)
  const [hoveredModule, setHoveredModule] = useState<string | null>(null)
  const [autoRotateIndex, setAutoRotateIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Auto-rotate through modules when not interacting
  useEffect(() => {
    // Don't auto-rotate if user is hovering or has clicked a module
    if (isPaused || hoveredModule || activeModule) return

    const interval = setInterval(() => {
      setAutoRotateIndex((prev) => (prev + 1) % rotationOrder.length)
    }, 5000) // Switch every 5 seconds

    return () => clearInterval(interval)
  }, [isPaused, hoveredModule, activeModule])

  // The displayed module: hover > click > auto-rotate
  const currentId = hoveredModule || activeModule || rotationOrder[autoRotateIndex]
  const currentModule = modules.find(m => m.id === currentId)

  // Pause auto-rotation when user interacts
  const handleMouseEnter = useCallback((moduleId: string) => {
    setHoveredModule(moduleId)
    setIsPaused(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setHoveredModule(null)
    // Resume auto-rotation after a short delay
    setTimeout(() => setIsPaused(false), 500)
  }, [])

  // Get all connections for the current module
  const activeConnections = currentModule?.connections || []

  // Check if a connection line should be highlighted
  const isConnectionActive = (from: string, to: string) => {
    if (!currentId) return false
    return (from === currentId && activeConnections.includes(to)) ||
           (to === currentId && modules.find(m => m.id === from)?.connections.includes(currentId))
  }

  // Generate connection lines between modules
  const connections: Array<{ from: ModuleNode; to: ModuleNode; key: string }> = []
  const drawnConnections = new Set<string>()

  modules.forEach(module => {
    module.connections.forEach(targetId => {
      const connectionKey = [module.id, targetId].sort().join('-')
      if (!drawnConnections.has(connectionKey)) {
        const target = modules.find(m => m.id === targetId)
        if (target) {
          connections.push({ from: module, to: target, key: connectionKey })
          drawnConnections.add(connectionKey)
        }
      }
    })
  })

  return (
    <section className="py-20 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase mb-4">
            Platform
          </p>
          <h2 className="text-4xl lg:text-6xl font-light text-foreground tracking-tight">
            Connected by design
          </h2>
          <p className="mt-5 text-xl text-muted-foreground max-w-2xl mx-auto">
            Every module shares data seamlessly, creating a unified view of your operations
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-8">
          {/* Mobile: Grid layout */}
          <div className="lg:hidden w-full">
            <div className="grid grid-cols-2 gap-3">
              {modules.filter(m => m.id !== "opticloud").map((module) => (
                <button
                  key={module.id}
                  onClick={() => setActiveModule(activeModule === module.id ? null : module.id)}
                  className={cn(
                    "p-4 rounded-[1.5rem] transition-all duration-300 text-left border-2",
                    module.textColor === "light" ? "text-white" : "text-foreground",
                    activeModule === module.id && "ring-2 ring-offset-2 ring-primary"
                  )}
                  style={{
                    backgroundColor: `var(${module.bgVar})`,
                    borderColor: `var(${module.borderVar})`,
                  }}
                >
                  <h3 className="font-semibold text-sm">{module.name}</h3>
                  <p className="text-xs opacity-80 mt-1">{module.description}</p>
                </button>
              ))}
            </div>
            {/* Mobile center hub */}
            <div className="flex justify-center mt-6">
              <div
                className="px-6 py-3 rounded-full text-white font-semibold text-sm shadow-lg"
                style={{ backgroundColor: "var(--green-dark3)" }}
              >
                OptiCloud Platform
              </div>
            </div>
          </div>

          {/* Desktop: Node graph */}
          <div className="hidden lg:block relative w-full max-w-[850px] aspect-square isolate">
            {/* SVG for connection lines */}
            <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
              {connections.map(({ from, to, key }) => {
                const isActive = isConnectionActive(from.id, to.id)
                const isToCenter = from.id === "opticloud" || to.id === "opticloud"

                return (
                  <line
                    key={key}
                    x1={`${from.x}%`}
                    y1={`${from.y}%`}
                    x2={`${to.x}%`}
                    y2={`${to.y}%`}
                    className={cn(
                      "transition-all duration-300",
                      isActive && "drop-shadow-sm"
                    )}
                    style={{
                      stroke: isActive ? "var(--green-dark3)" : "var(--gray-2)",
                      strokeWidth: isActive ? 4 : isToCenter ? 2.5 : 2,
                      strokeDasharray: isActive ? "none" : isToCenter ? "none" : "6 6",
                      opacity: isActive ? 1 : currentId ? 0.2 : (isToCenter ? 0.4 : 0.25),
                    }}
                  />
                )
              })}

              {/* Animated data flow dots on active connections */}
              {currentId && connections
                .filter(({ from, to }) => isConnectionActive(from.id, to.id))
                .map(({ from, to, key }) => (
                  <circle
                    key={`dot-${key}`}
                    r="6"
                    className="drop-shadow-sm"
                    style={{ fill: "var(--green-dark3)" }}
                  >
                    <animateMotion
                      dur="2s"
                      repeatCount="indefinite"
                      path={`M${from.x * 8.5},${from.y * 8.5} L${to.x * 8.5},${to.y * 8.5}`}
                    />
                  </circle>
                ))
              }
            </svg>

            {/* Module nodes */}
            {modules.map((module) => {
              const isCenter = module.id === "opticloud"
              const isActive = currentId === module.id
              const isConnected = activeConnections.includes(module.id) || module.connections.includes(currentId || "")
              const dimmed = currentId && !isActive && !isConnected

              return (
                <button
                  key={module.id}
                  onMouseEnter={() => handleMouseEnter(module.id)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => setActiveModule(activeModule === module.id ? null : module.id)}
                  className={cn(
                    "absolute transition-all duration-300 ease-out",
                    isCenter
                      ? "w-48 h-48 -ml-24 -mt-24 rounded-[3rem] shadow-xl"
                      : "w-36 h-36 -ml-18 -mt-18 rounded-[2.5rem] shadow-lg",
                    module.textColor === "light" ? "text-white" : "text-foreground",
                    "flex flex-col items-center justify-center text-center",
                    "hover:scale-110 hover:shadow-xl",
                    "border-2",
                    isActive && "scale-110 ring-4 ring-primary/20",
                    isConnected && !isActive && currentId && "scale-105",
                    dimmed && "opacity-40 scale-95"
                  )}
                  style={{
                    left: `${module.x}%`,
                    top: `${module.y}%`,
                    zIndex: isCenter ? 10 : isActive ? 15 : isConnected ? 12 : 5,
                    backgroundColor: `var(${module.bgVar})`,
                    borderColor: `var(${module.borderVar})`,
                  }}
                >
                  {isCenter ? (
                    <>
                      <svg className="w-14 h-14 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                        <path d="M8 12l3 3 5-6" />
                      </svg>
                      <span className="font-semibold text-lg">{module.name}</span>
                      <span className="text-sm opacity-80 mt-1">{module.description}</span>
                    </>
                  ) : (
                    <>
                      <span className="font-semibold text-base leading-tight">{module.name}</span>
                      <span className="text-xs opacity-80 mt-1.5 px-3 leading-snug">{module.description}</span>
                    </>
                  )}
                </button>
              )
            })}
          </div>

          {/* Info panel (desktop) */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="p-6 rounded-2xl bg-muted/50 transition-all duration-300">
              {currentModule ? (
                <>
                  <h3 className="text-xl font-semibold text-foreground mb-1">
                    {currentModule.name}
                  </h3>
                  <p className="text-sm font-medium text-muted-foreground mb-3">
                    {currentModule.description}
                  </p>
                  <p className="text-sm text-muted-foreground mb-5">
                    {currentModule.pitch}
                  </p>
                  <ul className="space-y-2">
                    {currentModule.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-sm text-foreground">
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: `var(${currentModule.bgVar})` }}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
