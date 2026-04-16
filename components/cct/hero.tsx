"use client"

import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Droplet, ArrowRight, Heart } from "lucide-react"

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
      <span ref={ref} className="text-xl md:text-2xl lg:text-3xl font-bold text-white [text-shadow:none]">
        {value >= 100000 ? `${(count / 100000).toFixed(1)}L` : count.toLocaleString()}{suffix}
      </span>
      <p className="text-white/75 text-xs md:text-sm mt-1 tracking-wide">{label}</p>
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
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
}

interface HeroSectionProps {
  onNavigate?: (page: string) => void
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

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
      <div className="absolute inset-0 bg-gradient-to-br from-[#C81924] via-[#9D1520] to-[#1B3F72]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.16),transparent_30%),radial-gradient(circle_at_80%_75%,rgba(232,159,29,0.15),transparent_32%)]" />
        {/* Noise Texture Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.12]"
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
          className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#C81924]/40 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#1B3F72]/60 rounded-full blur-[100px]"
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
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-28 text-center"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Main Headline with two fixed lines */}
          <motion.h1 className="inline-block text-left font-serif text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-[1.05] mb-6 drop-shadow-[0_8px_20px_rgba(0,0,0,0.28)]">
            <motion.span
              custom={0}
              initial="hidden"
              animate="visible"
              variants={textRevealVariants}
              className="block"
            >
              Every drop counts..
            </motion.span>
            <motion.span
              custom={1}
              initial="hidden"
              animate="visible"
              variants={textRevealVariants}
              className="block mt-1 pl-[5.3ch] md:pl-[5.1ch]"
            >
              Every rupee saves ..
            </motion.span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="text-sm md:text-base lg:text-lg text-white/90 font-sans max-w-2xl mx-auto mb-10"
          >
            Join 28,000+ donors building India&apos;s largest blood donation community.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-14"
          >
            <motion.button
              whileHover={{ scale: 1.04, y: -1, boxShadow: "0 0 36px rgba(204, 0, 51, 0.58)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate?.("register")}
            className="px-5 py-2.5 bg-[#C81924] text-white text-xs md:text-sm font-semibold rounded-full flex items-center gap-2 shadow-lg shadow-[#6E0326]/55 hover:bg-[#A3131C] transition-colors"
            >
              <Droplet className="w-3.5 h-3.5 md:w-4 md:h-4" />
              Register as Donor
              <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.04, y: -1, backgroundColor: "rgba(255,255,255,0.2)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate?.("donate")}
              className="px-5 py-2.5 bg-transparent border border-white/70 text-white text-xs md:text-sm font-semibold rounded-full flex items-center gap-2 hover:border-white transition-colors backdrop-blur-sm"
            >
              <Heart className="w-3.5 h-3.5 md:w-4 md:h-4" />
              Donate Funds
            </motion.button>
          </motion.div>

          {/* Animated Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 bg-white/12 rounded-3xl p-7 md:p-8"
          >
            {stats.map((stat, index) => {
              const isFunds = stat.label === "Funds Raised"
              return (
                <div key={stat.label} className="relative">
                  <StatCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    label={isFunds ? `${String.fromCharCode(8377)}2.3Cr Raised` : stat.label}
                  />
                  {index < stats.length - 1 && null}
                </div>
              )
            })}
          </motion.div>
        </motion.div>
      </motion.div>

    </section>
  )
}
