"use client"

import { motion, useInView } from "framer-motion"
import { useEffect, useRef, useState } from "react"

interface HeroSectionProps {
  onNavigate?: (page: string) => void
}

const textRevealVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 + i * 0.12,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
}

function useAnimatedCounter(target: number, duration: number = 1800) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  useEffect(() => {
    if (!isInView) return
    let startTime: number | null = null
    let raf = 0
    const tick = (now: number) => {
      if (startTime === null) startTime = now
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [isInView, target, duration])

  return { count, ref }
}

function HeroStat({ value, display, label }: { value: number; display: (n: number) => string; label: string }) {
  const { count, ref } = useAnimatedCounter(value)
  return (
    <div>
      <span ref={ref} className="font-display text-2xl md:text-3xl font-extrabold text-white leading-none block">
        {display(count)}
      </span>
      <span className="mt-1.5 block text-[10px] tracking-[0.1em] uppercase text-white/55">
        {label}
      </span>
    </div>
  )
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative w-full overflow-hidden bg-[#F4EFE6]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:min-h-[calc(100vh-84px)]">
        {/* LEFT — RED PANE */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative isolate flex flex-col justify-between overflow-hidden px-6 pt-28 pb-16 sm:px-10 sm:pt-32 md:px-12 md:pt-36 md:pb-20 lg:px-[52px] lg:pt-40 lg:pb-[72px] lg:[clip-path:polygon(0_0,100%_0,90%_100%,0_100%)]"
          style={{
            backgroundImage: `linear-gradient(120deg, rgba(200,25,36,0.92) 0%, rgba(170,16,36,0.9) 62%, rgba(140,10,28,0.9) 100%), url('/images/chiranjeevi.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Soft vignette */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-[5%] -top-[30%] h-[120%] w-[65%] rounded-full bg-black/10"
          />

          {/* Kicker */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={textRevealVariants}
            className="relative z-10"
          >
            <div className="font-display whitespace-nowrap text-xl sm:text-2xl md:text-[32px] lg:text-[36px] font-extrabold uppercase tracking-[0.04em] leading-[1.05] text-white">
              Chiranjeevi Charitable Trust
            </div>
            <div className="mt-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-white/55">
              <span className="h-[1.5px] w-[18px] bg-white/35" />
              Est. 1997
            </div>
          </motion.div>

          {/* Big headline */}
          <motion.h1
            className="relative z-10 mt-10 font-display text-[clamp(68px,9vw,120px)] font-extrabold leading-[0.9] tracking-[-0.04em] text-white"
          >
            <motion.span custom={1} initial="hidden" animate="visible" variants={textRevealVariants} className="block">
              DROP
            </motion.span>
            <motion.span custom={2} initial="hidden" animate="visible" variants={textRevealVariants} className="block">
              GIVE
            </motion.span>
            <motion.span
              custom={3}
              initial="hidden"
              animate="visible"
              variants={textRevealVariants}
              className="block font-italic-serif italic font-normal text-[0.68em] text-white/85"
            >
              Live
            </motion.span>
          </motion.h1>

          {/* Foot: stats */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 mt-14 flex flex-wrap items-end gap-6"
          >
            <div className="flex gap-6 md:gap-8">
              <HeroStat value={12} display={(n) => `${n}L+`} label="Units" />
              <HeroStat value={47} display={(n) => `${(n / 10).toFixed(1)}K`} label="Lives" />
              <HeroStat value={28} display={(n) => `${n}K`} label="Donors" />
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT — CREAM PANE */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-col justify-between gap-10 bg-[#F4EFE6] px-6 pt-24 pb-14 sm:px-10 sm:pt-28 md:px-12 md:pt-32 md:pb-20 lg:px-20 lg:pt-40 lg:pb-[72px]"
        >
          {/* Chip */}
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="inline-flex w-fit items-center rounded-md bg-[#0D0905] px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#FEFCF8]"
          >
            Megastar · Fan Community · Impact Platform
          </motion.span>

          {/* Mid content */}
          <div className="flex flex-1 flex-col justify-center py-4">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="mb-5 font-italic-serif text-[clamp(26px,3.2vw,42px)] italic leading-[1.25] text-[#6B5C4A]"
            >
              Millions of fans
              <br />
              <strong className="not-italic font-display font-extrabold text-[#0D0905]">One mission</strong>
              <br />
              Infinite lives changed
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mb-8 max-w-[420px] text-[15px] leading-[1.85] text-[#6B5C4A]"
            >
              You don&apos;t need a cape to be a hero. One pint of blood. One rupee. One story shared.
              The Chiranjeevi Charitable Trust turns love into action — across blood donation,
              community giving, and a legacy of care.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.6 }}
              className="flex flex-wrap gap-2.5"
            >
              <motion.button
                whileHover={{ y: -2, backgroundColor: "#CC0033", boxShadow: "0 6px 18px rgba(204,0,51,0.3)" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onNavigate?.("donate")}
                className="rounded-full bg-[#0D0905] px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.04em] text-[#FEFCF8] transition-colors"
              >
                Support a Cause
              </motion.button>
              <motion.button
                whileHover={{ borderColor: "#C98A0A", color: "#C98A0A", backgroundColor: "#FEF3D7" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onNavigate?.("good-works")}
                className="rounded-full border-[1.5px] border-[#DDD3C4] bg-transparent px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.04em] text-[#0D0905] transition-colors"
              >
                See Good Works
              </motion.button>
            </motion.div>
          </div>

        </motion.div>
      </div>
    </section>
  )
}
