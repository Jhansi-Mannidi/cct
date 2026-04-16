"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowRight } from "lucide-react"

const bloodTypeInventory = [
  { type: "O-", units: 18, status: "critical" },
  { type: "B-", units: 31, status: "critical" },
  { type: "AB-", units: 49, status: "low" },
  { type: "A-", units: 78, status: "low" },
  { type: "O+", units: 240, status: "sufficient" },
  { type: "B+", units: 302, status: "sufficient" },
  { type: "A+", units: 451, status: "sufficient" },
  { type: "AB+", units: 198, status: "sufficient" },
]

const statusConfig = {
  critical: {
    text: "text-red-700",
    dot: "bg-red-500",
    bar: "bg-red-500",
    label: "CRITICAL",
  },
  low: {
    text: "text-amber-700",
    dot: "bg-amber-500",
    bar: "bg-amber-500",
    label: "LOW",
  },
  sufficient: {
    text: "text-green-700",
    dot: "bg-green-500",
    bar: "bg-green-600",
    label: "SUFFICIENT",
  },
}

export function BloodInventorySnapshot() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const maxUnits = Math.max(...bloodTypeInventory.map((item) => item.units))

  return (
    <section className="py-24 bg-background overflow-hidden">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: -100 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="mb-4">
          <span className="inline-block text-xs tracking-[0.18em] text-primary font-semibold uppercase">
            Blood Bank . Live Status
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-3 leading-tight">
              Right Now,{" "}
              <span className="italic font-normal text-muted-foreground">We Need...</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-xl">
              Live blood inventory across CCT partner hospitals. If your type is critical, this is
              the moment.
            </p>
          </div>
          <motion.button
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3 rounded-full text-sm font-semibold shadow-lg"
          >
            Register as Donor
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {bloodTypeInventory.map((blood, index) => {
            const config = statusConfig[blood.status as keyof typeof statusConfig]
            const width = Math.max(10, Math.round((blood.units / maxUnits) * 100))
            return (
              <motion.div
                key={blood.type}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.08 * index }}
                className="group relative bg-card rounded-3xl border border-border px-5 py-5 shadow-sm"
              >
                <div className="absolute top-4 right-4">
                  <div className={`
                    relative w-2.5 h-2.5 rounded-full animate-pulse
                    ${config.dot}
                  `} />
                </div>

                <div className={`font-serif text-4xl mb-3 ${config.text}`}>
                  {blood.type}
                </div>

                <div className="w-full h-1.5 rounded-full bg-muted mb-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${width}%` } : { width: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 * index }}
                    className={`h-full rounded-full ${config.bar}`}
                  />
                </div>

                <p className="text-[11px] font-bold tracking-[0.14em] text-muted-foreground uppercase">
                  {config.label}
                </p>
                <p className="text-sm text-muted-foreground mt-1">{blood.units} units</p>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            Updated every 6 hours from CCT partner hospitals
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              Critical
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              Low
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
              Sufficient
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
