"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useInView, useAnimation } from "framer-motion"
import { Heart, Droplet, Users, IndianRupee, Calendar, MapPin, TrendingUp, Award, Building2, Stethoscope, ArrowRight } from "lucide-react"

// Animated count-up hook
function useCountUp(end: number, duration: number = 2000, startOnView: boolean = true) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const hasStarted = useRef(false)

  useEffect(() => {
    if (startOnView && !isInView) return
    if (hasStarted.current) return
    hasStarted.current = true

    const startTime = Date.now()
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(end * easeOut))
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }, [end, duration, isInView, startOnView])

  return { count, ref }
}

// Floating particles component
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#F59E0B] rounded-full opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

// Hero Stats Section
function HeroStatsSection() {
  const stats = [
    { value: 1200000, label: "Blood Units Collected", suffix: "+", icon: Droplet },
    { value: 4700, label: "Lives Saved", suffix: "+", icon: Heart },
    { value: 28000, label: "Active Donors", suffix: "+", icon: Users },
    { value: 23000000, label: "Funds Raised", prefix: "Rs.", suffix: "", isRupee: true, icon: IndianRupee },
  ]

  return (
    <section className="relative min-h-[78vh] flex items-center justify-center pt-10 pb-16 md:pt-14 md:pb-20 overflow-hidden bg-[linear-gradient(180deg,#FFF7ED_0%,#FFF9F2_45%,#FFFDF9_100%)]">
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage:
          "linear-gradient(rgba(30,58,95,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(30,58,95,0.2) 1px, transparent 1px)",
        backgroundSize: "42px 42px",
      }} />
      <div className="absolute -top-20 -left-20 h-80 w-80 rounded-full bg-[#DC2626]/10 blur-3xl" />
      <div className="absolute top-1/3 -right-16 h-[22rem] w-[22rem] rounded-full bg-[#F59E0B]/12 blur-3xl" />
      <div className="absolute -bottom-20 left-1/3 h-[18rem] w-[18rem] rounded-full bg-[#1E3A5F]/8 blur-3xl" />
      <FloatingParticles />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-12"
        >
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-[#1A1A1A] mb-2 leading-tight">
            Our <span className="text-[#F59E0B] italic">Impact</span>
          </h1>
          <p className="text-[#6B7280] text-lg max-w-2xl mx-auto">
            Three decades of saving lives across Andhra Pradesh and Telangana
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4 lg:gap-5">
          {stats.map((stat, index) => {
            const { count, ref } = useCountUp(stat.value, 2000)
            const Icon = stat.icon
            
            return (
              <motion.div
                key={stat.label}
                ref={ref}
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.55, delay: index * 0.12, ease: "easeOut" }}
                whileHover={{ y: -4 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#F59E0B]/25 via-transparent to-[#DC2626]/10 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative h-full bg-[linear-gradient(180deg,#FFFFFF_0%,#FFFCF7_100%)] border border-[#EADFCC] rounded-[2rem] p-8 md:p-6 lg:p-8 text-center hover:border-[#F59E0B]/45 transition-colors overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.07)]">
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent" />
                  <div className="absolute -left-10 -top-10 h-24 w-24 rounded-full bg-[#F59E0B]/6" />
                  <div className="absolute -right-8 -bottom-10 h-28 w-28 rounded-full border border-[#F3E5CF]" />
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                    className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/25 mb-5 shadow-sm"
                  >
                    <Icon className="w-6 h-6 text-[#DC2626]" />
                  </motion.div>
                  
                  <div
                    className={`font-serif font-bold text-[#1E3A5F] mb-2 leading-[0.95] tracking-tight whitespace-nowrap ${
                      stat.isRupee ? "text-4xl md:text-5xl lg:text-6xl" : "text-4xl md:text-5xl lg:text-[56px]"
                    }`}
                  >
                    {stat.prefix && <span>{stat.prefix}</span>}
                    {stat.isRupee ? (
                      <span>{(count / 10000000).toFixed(1)} Cr</span>
                    ) : (
                      <span>{count.toLocaleString("en-IN")}</span>
                    )}
                    {stat.suffix && <span>{stat.suffix}</span>}
                  </div>
                  <p className="text-[#6B7280] text-base md:text-lg">{stat.label}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// Timeline Section
function TimelineSection() {
  const milestones = [
    { year: "1998", event: "CCT Founded by Megastar Chiranjeevi" },
    { year: "2005", event: "1,00,000 blood units milestone" },
    { year: "2012", event: "First mega blood drive — 5,000 donors in one day" },
    { year: "2018", event: "Partnership with 50+ hospitals across AP & TS" },
    { year: "2024", event: "Digital platform launch" },
    { year: "2026", event: "12 lakh units and counting" },
  ]

  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#1A1A1A] mb-4">
            Our <span className="text-[#F59E0B]">Journey</span>
          </h2>
          <p className="text-[#6B7280] max-w-xl mx-auto">
            Key milestones in our mission to save lives
          </p>
        </motion.div>

        <div ref={containerRef} className="relative">
          {/* Horizontal scroll container for mobile */}
          <div className="overflow-x-auto pb-8 -mx-4 px-4 scrollbar-hide">
            <div className="relative min-w-[900px] md:min-w-0">
              {/* Connection line */}
              <div className="absolute top-8 left-0 right-0 h-0.5 bg-[#E6DCCB]">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#DC2626] via-[#F59E0B] to-[#DC2626]"
                  initial={{ width: "0%" }}
                  animate={isInView ? { width: "100%" } : { width: "0%" }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
              </div>

              <div className="flex justify-between relative">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.3 + index * 0.2, duration: 0.5 }}
                    className="flex flex-col items-center w-36"
                  >
                    {/* Dot */}
                    <motion.div
                      className="relative z-10 w-4 h-4 rounded-full bg-white border-4 border-[#F59E0B]"
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ delay: 0.5 + index * 0.2, type: "spring" }}
                    >
                      <motion.div
                        className="absolute inset-0 rounded-full bg-[#F59E0B]"
                        animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                      />
                    </motion.div>

                    {/* Year */}
                    <span className="mt-4 font-serif text-2xl font-bold text-[#F59E0B]">
                      {milestone.year}
                    </span>

                    {/* Event */}
                    <p className="mt-2 text-[#6B7280] text-sm text-center leading-tight">
                      {milestone.event}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Donation Heatmap Section
function DonationHeatmapSection() {
  const [visibleCount, setVisibleCount] = useState(5)
  const districts = [
    { name: "Hyderabad", donations: 85000, color: "#DC2626" },
    { name: "Vijayawada", donations: 62000, color: "#DC2626" },
    { name: "Visakhapatnam", donations: 58000, color: "#EF4444" },
    { name: "Guntur", donations: 45000, color: "#EF4444" },
    { name: "Tirupati", donations: 42000, color: "#F87171" },
    { name: "Warangal", donations: 38000, color: "#F87171" },
    { name: "Kakinada", donations: 32000, color: "#FCA5A5" },
    { name: "Nellore", donations: 28000, color: "#FCA5A5" },
    { name: "Kurnool", donations: 25000, color: "#FECACA" },
    { name: "Rajahmundry", donations: 22000, color: "#FECACA" },
    { name: "Kadapa", donations: 18000, color: "#FEE2E2" },
    { name: "Anantapur", donations: 15000, color: "#FEE2E2" },
  ]
  const sortedDistricts = [...districts].sort((a, b) => b.donations - a.donations)
  const maxDonations = sortedDistricts[0]?.donations ?? 1
  const hotspotDistricts = sortedDistricts.slice(0, 4)
  const visibleDistricts = sortedDistricts.slice(0, visibleCount)
  const hasMore = visibleCount < sortedDistricts.length

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#1A1A1A] mb-4">
            Donation <span className="text-[#DC2626]">Heatmap</span>
          </h2>
          <p className="text-[#6B7280] max-w-xl mx-auto">
            Blood donation density across AP & Telangana districts
          </p>
        </motion.div>

        <div className="rounded-3xl border border-[#E8DED0] bg-white p-4 md:p-6 lg:p-7 shadow-lg shadow-black/5">
          <div className="grid lg:grid-cols-[1.75fr_1fr] gap-6">
            {/* District intensity board */}
            <div className="space-y-3">
              {visibleDistricts.map((district, index) => {
                const width = Math.max(10, Math.round((district.donations / maxDonations) * 100))
                return (
                  <motion.div
                    key={district.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.04 }}
                    className="rounded-xl border border-[#EFE5D6] bg-[#FFFDF9] p-2.5 md:p-3"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#FEE2E2] text-[#DC2626] text-xs font-bold">
                          #{index + 1}
                        </span>
                        <p className="text-sm font-semibold text-[#1A1A1A]">{district.name}</p>
                      </div>
                      <p className="text-sm font-bold text-[#DC2626]">{district.donations.toLocaleString("en-IN")}</p>
                    </div>
                    <div className="h-2 rounded-full bg-[#F5EDE0] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${width}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.04 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: district.color }}
                      />
                    </div>
                  </motion.div>
                )
              })}

              {hasMore && (
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setVisibleCount((prev) => Math.min(prev + 4, sortedDistricts.length))}
                  className="w-full mt-1 py-2.5 rounded-xl border border-[#E8DED0] bg-white text-[#1E3A5F] text-sm font-semibold hover:border-[#DC2626] hover:text-[#DC2626] transition-colors"
                >
                  Load More Details
                </motion.button>
              )}
            </div>

            {/* Hotspot cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-3">
              {hotspotDistricts.map((district, index) => (
                <motion.div
                  key={district.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="rounded-xl border border-[#E8DED0] bg-[#FFF7ED] p-3.5 md:p-4"
                >
                  <p className="text-[11px] uppercase tracking-[0.14em] text-[#6B7280]">Top Hotspot</p>
                  <p className="font-serif text-2xl font-bold text-[#1A1A1A] mt-1">{district.name}</p>
                  <p className="text-[#DC2626] font-semibold mt-1">
                    {district.donations.toLocaleString("en-IN")} donations
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <span className="text-[#6B7280] text-sm">Low</span>
          <div className="flex gap-1">
            {["#FEE2E2", "#FECACA", "#FCA5A5", "#F87171", "#EF4444", "#DC2626"].map((color) => (
              <div key={color} className="w-8 h-4 rounded" style={{ backgroundColor: color }} />
            ))}
          </div>
          <span className="text-[#6B7280] text-sm">High</span>
        </div>
      </div>
    </section>
  )
}

// Monthly Trends Bar Chart
function MonthlyTrendsSection() {
  const monthlyData = [
    { month: "Apr", donations: 1250 },
    { month: "May", donations: 980 },
    { month: "Jun", donations: 1420 },
    { month: "Jul", donations: 1680 },
    { month: "Aug", donations: 2100 },
    { month: "Sep", donations: 1850 },
    { month: "Oct", donations: 2400 },
    { month: "Nov", donations: 1920 },
    { month: "Dec", donations: 1560 },
    { month: "Jan", donations: 1380 },
    { month: "Feb", donations: 1150 },
    { month: "Mar", donations: 1780 },
  ]

  const maxDonations = Math.max(...monthlyData.map((d) => d.donations))
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#1A1A1A] mb-4">
            Monthly <span className="text-[#F59E0B]">Trends</span>
          </h2>
          <p className="text-[#6B7280] max-w-xl mx-auto">
            Donation activity from April 2025 to March 2026
          </p>
        </motion.div>

        <div ref={ref} className="bg-white border border-[#E8DED0] rounded-3xl p-6 md:p-10 shadow-lg shadow-black/5">
          <div className="flex items-end justify-between gap-2 md:gap-4 h-64 md:h-80">
            {monthlyData.map((data, index) => {
              const heightPercent = (data.donations / maxDonations) * 100
              const isHighest = data.donations === maxDonations

              return (
                <div key={data.month} className="flex flex-col items-center flex-1">
                  <motion.div
                    className="text-xs md:text-sm font-semibold mb-2"
                    style={{ color: isHighest ? "#F59E0B" : "#6B7280" }}
                  >
                    {data.donations.toLocaleString("en-IN")}
                  </motion.div>
                  <motion.div
                    className={`w-full rounded-t-lg ${isHighest ? "bg-[#F59E0B]" : "bg-[#DC2626]"}`}
                    initial={{ height: 0 }}
                    animate={isInView ? { height: `${heightPercent}%` } : { height: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.08, ease: "easeOut" }}
                  />
                  <span className="mt-3 text-xs md:text-sm text-[#6B7280]">{data.month}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

// Blood Type Distribution Donut Chart
function BloodTypeDistributionSection() {
  const bloodTypes = [
    { type: "O+", percentage: 35, color: "#DC2626" },
    { type: "B+", percentage: 25, color: "#F59E0B" },
    { type: "A+", percentage: 20, color: "#3B82F6" },
    { type: "AB+", percentage: 8, color: "#8B5CF6" },
    { type: "O-", percentage: 5, color: "#EF4444" },
    { type: "B-", percentage: 3, color: "#FBBF24" },
    { type: "A-", percentage: 3, color: "#60A5FA" },
    { type: "AB-", percentage: 1, color: "#A78BFA" },
  ]

  const [hoveredType, setHoveredType] = useState<string | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // Calculate stroke-dasharray for each segment
  const radius = 80
  const circumference = 2 * Math.PI * radius
  let accumulatedOffset = 0

  return (
    <section className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#1A1A1A] mb-4">
            Blood Type <span className="text-[#DC2626]">Distribution</span>
          </h2>
          <p className="text-[#6B7280] max-w-xl mx-auto">
            Breakdown of donations by blood type
          </p>
        </motion.div>

        <div ref={ref} className="flex flex-col md:flex-row items-center justify-center gap-12">
          {/* Donut Chart */}
          <div className="relative">
            <svg width="280" height="280" viewBox="0 0 200 200">
              {bloodTypes.map((blood, index) => {
                const strokeLength = (blood.percentage / 100) * circumference
                const currentOffset = accumulatedOffset
                accumulatedOffset += strokeLength

                const isHovered = hoveredType === blood.type

                return (
                  <motion.circle
                    key={blood.type}
                    cx="100"
                    cy="100"
                    r={radius}
                    fill="none"
                    stroke={blood.color}
                    strokeWidth={isHovered ? 28 : 24}
                    strokeDasharray={`${strokeLength} ${circumference}`}
                    strokeDashoffset={-currentOffset}
                    strokeLinecap="round"
                    initial={{ strokeDashoffset: circumference }}
                    animate={isInView ? { strokeDashoffset: -currentOffset } : { strokeDashoffset: circumference }}
                    transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
                    onMouseEnter={() => setHoveredType(blood.type)}
                    onMouseLeave={() => setHoveredType(null)}
                    style={{ cursor: "pointer", transformOrigin: "center", transform: "rotate(-90deg)" }}
                  />
                )
              })}
              {/* Center text */}
              <text x="100" y="95" textAnchor="middle" className="fill-[#1A1A1A] font-serif text-2xl font-bold">
                {hoveredType || "All"}
              </text>
              <text x="100" y="115" textAnchor="middle" className="fill-[#6B7280] text-sm">
                {hoveredType ? `${bloodTypes.find((b) => b.type === hoveredType)?.percentage}%` : "Types"}
              </text>
            </svg>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-4">
            {bloodTypes.map((blood, index) => (
              <motion.div
                key={blood.type}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                onMouseEnter={() => setHoveredType(blood.type)}
                onMouseLeave={() => setHoveredType(null)}
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${
                  hoveredType === blood.type ? "bg-white shadow-sm border border-[#E8DED0]" : ""
                }`}
              >
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: blood.color }} />
                <span className="text-[#1A1A1A] font-semibold">{blood.type}</span>
                <span className="text-[#6B7280]">{blood.percentage}%</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Campaign Impact Summary
function CampaignImpactSection() {
  const highlights = [
    { icon: Stethoscope, value: "12", label: "Equipment Campaigns Completed", color: "#DC2626" },
    { icon: Users, value: "2,500+", label: "Patients Supported", color: "#F59E0B" },
    { icon: Building2, value: "8", label: "Blood Banks Upgraded", color: "#3B82F6" },
  ]

  return (
    <section className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#1A1A1A] mb-4">
            Campaign <span className="text-[#F59E0B]">Impact</span>
          </h2>
          <p className="text-[#F59E0B] text-xl font-semibold">
            Rs.2.3 Crore raised across 47 campaigns
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {highlights.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, type: "spring", stiffness: 100 }}
                className="bg-white border border-[#E8DED0] rounded-3xl p-8 text-center hover:border-[#F59E0B]/40 transition-colors shadow-lg shadow-black/5"
              >
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
                  style={{ backgroundColor: `${item.color}20` }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Icon className="w-8 h-8" style={{ color: item.color }} />
                </motion.div>
                <div className="font-serif text-4xl font-bold text-[#1A1A1A] mb-2">{item.value}</div>
                <p className="text-[#6B7280]">{item.label}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// Call to Action Section
function CTASection({ onNavigate }: { onNavigate?: (page: string) => void }) {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Glow effects */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#DC2626]/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[#F59E0B]/20 rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-4xl md:text-6xl font-bold text-[#1A1A1A] mb-6"
        >
          Be part of the <span className="text-[#F59E0B]">next chapter</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-[#6B7280] text-lg mb-10 max-w-2xl mx-auto"
        >
          Join thousands of heroes who have made a difference. Your contribution can save lives.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            onClick={() => onNavigate?.("register")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group px-6 py-2.5 text-sm bg-[#DC2626] text-white font-semibold rounded-xl overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Droplet className="w-5 h-5" />
              Donate Blood
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#DC2626] to-[#F59E0B]"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          <motion.button
            onClick={() => onNavigate?.("campaigns")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group px-6 py-2.5 text-sm border-2 border-[#F59E0B] text-[#F59E0B] font-semibold rounded-xl overflow-hidden hover:text-white transition-colors"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Heart className="w-5 h-5" />
              Start a Campaign
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <motion.div
              className="absolute inset-0 bg-[#F59E0B]"
              initial={{ y: "100%" }}
              whileHover={{ y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

// Main Export
export function OurImpactPage({ onNavigate }: { onNavigate?: (page: string) => void }) {
  return (
    <div className="bg-[#FFF7ED] min-h-screen">
      <HeroStatsSection />
      <TimelineSection />
      <DonationHeatmapSection />
      <BloodTypeDistributionSection />
      <CampaignImpactSection />
      <CTASection onNavigate={onNavigate} />
    </div>
  )
}
