"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Heart, Clock, Users, ArrowRight, AlertCircle } from "lucide-react"

const campaigns = [
  {
    id: 1,
    title: "Fund Platelet Separator",
    institution: "Guntur Blood Bank",
    raised: 1240000,
    goal: 1800000,
    donors: 234,
    daysLeft: 23,
    urgent: false,
    gradient: "from-[#DC2626] to-[#F97316]",
  },
  {
    id: 2,
    title: "Support 50 Thalassemia Patients",
    institution: "NIMS Hyderabad",
    raised: 380000,
    goal: 600000,
    donors: 156,
    daysLeft: 45,
    urgent: false,
    gradient: "from-[#1E3A5F] to-[#3B82F6]",
  },
  {
    id: 3,
    title: "Emergency Blood Storage Unit",
    institution: "Tirupati Hospital",
    raised: 890000,
    goal: 1000000,
    donors: 312,
    daysLeft: 8,
    urgent: true,
    gradient: "from-[#B91C1C] to-[#DC2626]",
  },
]

function formatINR(amount: number): string {
  if (amount >= 10000000) {
    return `\u20B9${(amount / 10000000).toFixed(2)} Cr`
  } else if (amount >= 100000) {
    return `\u20B9${(amount / 100000).toFixed(2)} L`
  } else if (amount >= 1000) {
    return `\u20B9${(amount / 1000).toFixed(0)}K`
  }
  return `\u20B9${amount}`
}

function AnimatedProgress({ value, max, delay }: { value: number; max: number; delay: number }) {
  const [progress, setProgress] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setProgress((value / max) * 100)
      }, delay * 1000)
      return () => clearTimeout(timer)
    }
  }, [isInView, value, max, delay])

  return (
    <div ref={ref} className="h-2 bg-white/20 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="h-full bg-white rounded-full"
      />
    </div>
  )
}

export function FeaturedCampaignsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-24 bg-[#FFF7ED]">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
        >
          <div>
            <span className="inline-block px-4 py-1.5 bg-amber-100 text-[#F59E0B] text-sm font-semibold rounded-full mb-4">
              Financial Giving
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4">
              Active Campaigns
            </h2>
            <p className="text-lg text-[#6B7280] max-w-xl">
              Support our initiatives to strengthen blood banking infrastructure and save more lives.
            </p>
          </div>
          <motion.a
            href="#"
            whileHover={{ x: 5 }}
            className="flex items-center gap-2 text-[#DC2626] font-semibold mt-4 md:mt-0 group"
          >
            View All
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>

        {/* Campaigns Grid - Horizontal scroll on mobile */}
        <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:overflow-visible snap-x snap-mandatory md:snap-none">
          {campaigns.map((campaign, index) => (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.15 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="min-w-[300px] md:min-w-0 snap-center"
            >
              <div className={`relative bg-gradient-to-br ${campaign.gradient} rounded-3xl overflow-hidden shadow-xl`}>
                {/* Urgent Badge */}
                {campaign.urgent && (
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute top-4 right-4 z-10"
                  >
                    <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-[#DC2626] text-xs font-bold rounded-full shadow-lg">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#DC2626] opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#DC2626]" />
                      </span>
                      Urgent
                    </span>
                  </motion.div>
                )}

                {/* Cover Image Placeholder */}
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-black/20" />
                  <div 
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fff' fill-opacity='.1'%3E%3Cpath d='M36 18c-9.941 0-18 8.059-18 18s8.059 18 18 18 18-8.059 18-18-8.059-18-18-18zm0 32c-7.732 0-14-6.268-14-14s6.268-14 14-14 14 6.268 14 14-6.268 14-14 14z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                  />
                </div>

                {/* Content */}
                <div className="p-6 text-white">
                  <h3 className="font-serif text-xl font-bold mb-1">
                    {campaign.title}
                  </h3>
                  <p className="text-white/70 text-sm mb-4">
                    {campaign.institution}
                  </p>

                  {/* Progress Bar */}
                  <AnimatedProgress
                    value={campaign.raised}
                    max={campaign.goal}
                    delay={0.3 + index * 0.15}
                  />

                  {/* Stats */}
                  <div className="flex items-center justify-between mt-3 mb-4">
                    <span className="font-semibold">
                      {formatINR(campaign.raised)} raised
                    </span>
                    <span className="text-white/70 text-sm">
                      of {formatINR(campaign.goal)}
                    </span>
                  </div>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-sm text-white/70 mb-4">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {campaign.donors} donors
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {campaign.daysLeft} days left
                    </span>
                  </div>

                  {/* CTA */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 bg-white text-[#1A1A1A] font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-white/90 transition-colors"
                  >
                    <Heart className="w-4 h-4" />
                    Contribute
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
