"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { ArrowRight, Droplet, Heart } from "lucide-react"

interface CTABannerProps {
  onNavigate?: (page: string) => void
}

export function CTABanner({ onNavigate }: CTABannerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8])

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden flex items-center">
      {/* Background with Parallax */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#C81924] via-[#B91822] to-[#F2E8EA]"
      >
        {/* Animated Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-0 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
          className="absolute bottom-0 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"
        />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", duration: 0.8 }}
          className="w-20 h-20 mx-auto mb-8 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20"
        >
          <Droplet className="w-10 h-10 text-white" />
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
        >
          Your blood can save 3 lives.
        </motion.h2>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base md:text-lg text-white/90 mb-10 max-w-2xl mx-auto"
        >
          Register as a donor today and become a hero in your community.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              y: -2,
              boxShadow: "0 12px 28px rgba(200,25,36,0.32)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate?.("register")}
            className="px-6 py-2.5 bg-[#C81924] text-white font-semibold text-sm md:text-base rounded-full inline-flex items-center gap-2 shadow-lg shadow-red-500/35 hover:bg-[#AE1620] transition-colors"
          >
            Register as Donor
            <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04, y: -1, backgroundColor: "rgba(255,255,255,0.2)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate?.("donate")}
            className="px-6 py-2.5 bg-transparent border border-white/70 text-white text-sm md:text-base font-semibold rounded-full inline-flex items-center gap-2 hover:border-white transition-colors backdrop-blur-sm"
          >
            <Heart className="w-3.5 h-3.5 md:w-4 md:h-4" />
            Donate Funds
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  )
}
