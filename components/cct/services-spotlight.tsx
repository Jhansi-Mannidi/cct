"use client"

import { motion } from "framer-motion"
import { Droplet, ArrowRight, Heart } from "lucide-react"

interface ServicesSpotlightProps {
  onNavigate?: (page: string) => void
}

export function ServicesSpotlight({ onNavigate }: ServicesSpotlightProps) {
  return (
    <section className="min-h-screen bg-[#EFEDE9]">
      <div className="grid md:grid-cols-[1.05fr_1fr] min-h-screen">
        {/* Left Red Panel */}
        <div className="relative overflow-hidden bg-[linear-gradient(90deg,#C81924_0%,#C51C24_24%,#BE2528_48%,#B93B3B_72%,#C98C8E_88%,#EAD7D8_100%)] text-white px-8 lg:px-10 py-10 flex flex-col">
          <div className="flex items-start justify-between text-[11px] tracking-[0.2em] uppercase font-medium opacity-90">
            <div>
              Chiranjeevi
              <br />
              Charitable Trust
            </div>
            <div>Blood Drive</div>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-[420px] text-center">
              <div className="mb-10 text-xs md:text-sm tracking-[0.22em] uppercase text-white/75">
                Blood Donation Community Legacy
              </div>
              <h2 className="font-sans font-black leading-[0.9] text-[3.2rem] md:text-[4rem]">
                DROP.
                <br />
                GIVE.
                <br />
                <span className="font-serif italic text-[#FFE07A] font-semibold">Live.</span>
              </h2>

            </div>
          </div>
          <div className="absolute right-12 top-1/2 -translate-y-1/2 opacity-20">
            <Droplet className="w-24 h-24" />
          </div>
        </div>

        {/* Right Content Panel */}
        <div className="bg-[#F5F3EF] px-8 lg:px-12 py-10 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-xl w-full"
          >
            <div className="inline-flex items-center rounded-md bg-[#101116] px-4 py-2 mb-8">
              <p className="text-[10px] tracking-[0.22em] uppercase text-white font-semibold">
                Megastar · Fan Community · Impact Platform
              </p>
            </div>

            <p className="font-serif italic text-3xl md:text-4xl text-[#5A5752]">Millions of fans</p>
            <h3 className="font-sans font-black text-5xl md:text-6xl leading-[0.85] text-[#202020] mt-1">
              ONE
              <br />
              MISSION.
            </h3>
            <p className="font-serif italic text-3xl md:text-4xl text-[#5A5752] mt-1">Infinite lives changed.</p>

            <p className="mt-8 text-sm md:text-base text-[#5A5752] font-sans max-w-xl leading-relaxed">
              You don&apos;t need a cape to be a hero. One pint of blood. One rupee. One story shared.
              The Chiranjeevi Charitable Trust turns love into action across blood donation,
              community giving, and generational care.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.04, y: -1, boxShadow: "0 0 36px rgba(197, 31, 31, 0.45)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate?.("register")}
                className="px-5 py-2.5 bg-[#C81924] text-white text-xs md:text-sm font-semibold rounded-full inline-flex items-center gap-2 shadow-lg shadow-red-500/25 hover:bg-[#A3131C] transition-colors"
              >
                <Droplet className="w-3.5 h-3.5 md:w-4 md:h-4" />
                Register as Donor
                <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04, y: -1, backgroundColor: "rgba(31,31,31,0.06)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate?.("donate")}
                className="px-5 py-2.5 bg-transparent border border-[#1F1F1F] text-[#1F1F1F] text-xs md:text-sm font-semibold rounded-full inline-flex items-center gap-2 transition-colors"
              >
                <Heart className="w-3.5 h-3.5 md:w-4 md:h-4" />
                Donate Funds
              </motion.button>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  )
}
