"use client"

import { motion } from "framer-motion"
import { ArrowRight, Heart, ShieldCheck } from "lucide-react"

interface DonateFundsPageProps {
  onNavigate?: (page: string) => void
}

const impactStats = [
  { value: "12L+", label: "Blood Units" },
  { value: "4,700+", label: "Lives Saved" },
  { value: "28K+", label: "Donors" },
]

const suggestedAmounts = [500, 1000, 2500, 5000]

export function DonateFundsPage({ onNavigate }: DonateFundsPageProps) {
  return (
    <section className="pt-28 pb-16 min-h-screen bg-[#F6F1F2]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#CF1235] via-[#C61536] to-[#B2102E] p-6 sm:p-10 lg:p-12 text-white shadow-2xl shadow-red-900/25"
        >
          <div className="absolute -right-10 top-10 h-40 w-40 rounded-full bg-white/6 blur-sm" />
          <div className="absolute right-12 top-14 text-[140px] leading-none text-[#E62E57]/35 font-serif select-none">
            ♥
          </div>

          <div className="relative z-10 max-w-3xl">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.24em] text-white/80">
              Chiranjeevi Charitable Trust - Est. 1997
            </p>
            <h1 className="mt-4 font-serif text-4xl sm:text-5xl md:text-6xl font-bold leading-[0.95]">
              Make a difference
              <span className="block italic font-normal text-[#FFD1DB]">today.</span>
            </h1>
            <p className="mt-5 text-base sm:text-xl text-white/85 max-w-2xl">
              100% of your donation goes directly to CCT&apos;s blood bank operations, patient support,
              and community health initiatives across AP & Telangana.
            </p>
          </div>

          <div className="relative z-10 mt-8 border-t border-white/25 pt-6">
            <div className="grid grid-cols-3 gap-6 max-w-2xl">
              {impactStats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-serif text-2xl sm:text-4xl font-bold">{stat.value}</div>
                  <p className="mt-1 text-xs sm:text-sm uppercase tracking-[0.12em] text-white/70">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-8 rounded-3xl bg-white border border-[#F0DFE3] p-6 sm:p-8 shadow-lg shadow-black/5"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="font-serif text-3xl text-[#1A1A1A] font-bold">Choose your contribution</h2>
              <p className="mt-2 text-[#6B7280]">
                Every rupee strengthens emergency blood access and patient care.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 bg-[#CF1235] text-white rounded-full font-semibold inline-flex items-center gap-2 shadow-lg shadow-red-500/30"
            >
              <Heart className="w-4 h-4" />
              Donate Now
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {suggestedAmounts.map((amount) => (
              <button
                key={amount}
                className="px-5 py-2.5 rounded-full border border-[#E6E7EB] text-[#1F2937] font-medium hover:border-[#CF1235] hover:text-[#CF1235] transition-colors"
              >
                INR {amount.toLocaleString()}
              </button>
            ))}
          </div>

          <div className="mt-8">
            <div className="inline-flex items-center gap-2 text-sm text-[#6B7280]">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Secure payment gateway. 80G tax benefits applicable.
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
