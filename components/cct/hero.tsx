"use client"

import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Droplet, ArrowRight, Heart } from "lucide-react"
import { CCTButton } from "./button"

// Animated counter hook
function useAnimatedCounter(target: number, duration: number = 2000, startOnView: boolean = true) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  
  useEffect(() => {
    if (!startOnView || !isInView) return
    
    let startTime: number | null = null
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }, [isInView, target, duration, startOnView])
  
  return { count, ref }
}

// Stat Counter Component
function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { count, ref } = useAnimatedCounter(value)
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <span ref={ref} className="text-4xl md:text-5xl font-bold text-white">
        {value >= 100000 ? `${(count / 100000).toFixed(1)}L` : count.toLocaleString()}{suffix}
      </span>
      <p className="text-white/80 text-sm mt-1">{label}</p>
    </motion.div>
  )
}

// Floating Blood Drop Component
function FloatingBloodDrop({ delay, x, size }: { delay: number; x: number; size: number }) {
  return (
    <motion.div
      initial={{ y: -50, x, opacity: 0 }}
      animate={{
        y: [0, 30, 0],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        y: { duration: 4 + Math.random() * 2, repeat: Infinity, ease: "easeInOut", delay },
        opacity: { duration: 4 + Math.random() * 2, repeat: Infinity, ease: "easeInOut", delay },
      }}
      className="absolute pointer-events-none"
      style={{ left: `${x}%`, top: `${Math.random() * 60 + 10}%` }}
    >
      <svg
        width={size}
        height={size * 1.3}
        viewBox="0 0 24 32"
        fill="none"
        className="text-white/20"
      >
        <path
          d="M12 0C12 0 0 14 0 22C0 27.523 5.373 32 12 32C18.627 32 24 27.523 24 22C24 14 12 0 12 0Z"
          fill="currentColor"
        />
      </svg>
    </motion.div>
  )
}

// Text Reveal Animation
const textRevealVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const headlineWords = ["Every", "Drop", "Counts.", "Every", "Rupee", "Saves."]
  const stats = [
    { value: 1200000, suffix: "+", label: "Units Collected" },
    { value: 4700, suffix: "+", label: "Lives Saved" },
    { value: 28000, suffix: "+", label: "Active Donors" },
    { value: 23000000, suffix: "", label: "Funds Raised" },
  ]

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Gradient Mesh Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#DC2626] via-[#991B1B] to-[#1E3A5F]">
        {/* Noise Texture Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Animated Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#DC2626]/40 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#1E3A5F]/60 rounded-full blur-[100px]"
        />
      </div>

      {/* Floating Blood Drops */}
      {[...Array(12)].map((_, i) => (
        <FloatingBloodDrop
          key={i}
          delay={i * 0.5}
          x={Math.random() * 100}
          size={20 + Math.random() * 30}
        />
      ))}

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 text-center"
      >
        {/* Main Headline with Word-by-Word Animation */}
        <motion.h1 className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight mb-6">
          <span className="flex flex-wrap justify-center gap-x-4 md:gap-x-6">
            {headlineWords.map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={textRevealVariants}
                className={i === 2 || i === 5 ? "text-[#F59E0B]" : ""}
              >
                {word}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-lg md:text-xl lg:text-2xl text-white/90 font-sans max-w-2xl mx-auto mb-10"
        >
          Join 28,000+ donors building India&apos;s largest blood donation community.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(220, 38, 38, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-[#DC2626] text-white font-semibold rounded-full flex items-center gap-3 shadow-lg shadow-red-900/50 hover:bg-[#B91C1C] transition-colors"
          >
            <Droplet className="w-5 h-5" />
            Register as Donor
            <ArrowRight className="w-5 h-5" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-full flex items-center gap-3 hover:border-white/80 transition-colors"
          >
            <Heart className="w-5 h-5" />
            Donate Funds
          </motion.button>
        </motion.div>

        {/* Animated Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20"
        >
          {stats.map((stat, index) => (
            <StatCounter
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label === "Funds Raised" ? `${String.fromCharCode(8377)}2.3Cr Raised` : stat.label}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-white rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
