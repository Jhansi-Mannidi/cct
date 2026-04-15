"use client"

import { motion } from "framer-motion"
import { ArrowRight, Droplet, Heart } from "lucide-react"

interface MegastarSpotlightProps {
  onNavigate?: (page: string) => void
}

export function MegastarSpotlight({ onNavigate }: MegastarSpotlightProps) {
  return (
    <section className="min-h-screen bg-gradient-to-r from-[#050607] via-[#160304] to-[#2C0000]">
      <div className="grid md:grid-cols-2 min-h-screen">
        <div className="px-6 sm:px-10 lg:px-16 py-16 md:py-20 flex items-center">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            animate={{ y: [0, -6, 0] }}
            className="max-w-xl"
          >
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[10px] tracking-[0.24em] text-[#E4A423] uppercase mb-5"
            >
              The Man Behind The Mission
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05]"
            >
              More than a
              <span className="block text-[#E4A423] italic font-normal">Megastar.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-7 text-sm md:text-base lg:text-lg text-white/90 font-sans max-w-2xl leading-relaxed"
            >
              For over two decades, Chiranjeevi has channeled the love of millions into one of
              India&apos;s most impactful charitable movements - blood banks, eye donation,
              community health, and a digital platform that extends his legacy to every fan.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-7 pl-4 border-l-2 border-[#E4A423] text-sm md:text-base lg:text-lg text-white/90 font-sans italic max-w-2xl"
            >
              &quot;The true measure of a hero is not on screen - it is in the lives they touch off it.&quot;
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="mt-8 flex flex-col sm:flex-row gap-4 items-start"
            >
              <motion.button
                whileHover={{ scale: 1.04, y: -1, boxShadow: "0 0 36px rgba(204, 0, 51, 0.58)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate?.("register")}
                className="px-5 py-2.5 bg-[#CC0033] text-white text-xs md:text-sm font-semibold rounded-full flex items-center gap-2 shadow-lg shadow-[#6E0326]/55 hover:bg-[#A6002A] transition-colors"
              >
                <Droplet className="w-3.5 h-3.5 md:w-4 md:h-4" />
                Register as Donor
                <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04, y: -1, backgroundColor: "rgba(255,255,255,0.2)" }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2.5 bg-transparent border border-white/70 text-white text-xs md:text-sm font-semibold rounded-full flex items-center gap-2 hover:border-white transition-colors backdrop-blur-sm"
              >
                <Heart className="w-3.5 h-3.5 md:w-4 md:h-4" />
                Donate Funds
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        <div className="relative overflow-hidden flex items-center justify-center p-8">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#3A0000]/45 to-[#4A0000]/70" />
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(228,164,35,0.25)_1px,transparent_1px)] [background-size:24px_24px]" />
          </div>
          <div className="relative z-10 w-80 h-80 md:w-[26rem] md:h-[26rem] rounded-full overflow-hidden">
            <img
              src="/images/chiranjeevi-portrait.png"
              alt="Chiranjeevi portrait"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
