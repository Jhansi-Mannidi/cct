"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "./language-context"

interface CTABannerProps {
  onNavigate?: (page: string) => void
}

export function CTABanner({ onNavigate }: CTABannerProps) {
  const { language } = useLanguage()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8])

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden flex items-center">
      {/* Background image */}
      <div className="absolute inset-0">
        <div
          className="h-full w-full bg-cover bg-center"
          style={{ backgroundImage: "url('/images/cta-fourth-slide.png')" }}
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          <div className="text-center md:text-left">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5"
            >
              {language === "te" ? "మీ రక్తం 3 ప్రాణాలను కాపాడగలదు." : "Your blood can save 3 lives."}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-lg text-white/90 mb-8 max-w-xl"
            >
              {language === "te"
                ? "ఈరోజే దాతగా నమోదు అవ్వండి మరియు మీ సమాజంలో హీరోగా నిలవండి."
                : "Register as a donor today and become a hero in your community."}
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35 }}
              whileHover={{
                scale: 1.05,
                y: -2,
                boxShadow: "0 12px 28px rgba(200,25,36,0.32)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate?.("register")}
              className="px-6 py-2.5 bg-[#C81924] text-white font-semibold text-sm md:text-base rounded-full inline-flex items-center gap-2 shadow-lg shadow-red-500/35 hover:bg-[#AE1620] transition-colors"
            >
              {language === "te" ? "రక్తదానం చేయండి" : "Donate Blood"}
              <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </motion.button>
          </div>
          <div className="hidden md:block" />
        </div>
      </motion.div>
    </section>
  )
}
