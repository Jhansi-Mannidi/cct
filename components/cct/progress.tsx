"use client"

import { motion, useInView, useSpring, useTransform } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface ProgressBarProps {
  value: number
  max: number
  showAmount?: boolean
  label?: string
  className?: string
  delay?: number
  size?: "sm" | "md" | "lg"
}

export function CCTProgressBar({ 
  value, 
  max, 
  showAmount = true, 
  label,
  className,
  delay = 0,
  size = "md"
}: ProgressBarProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const progress = Math.min((value / max) * 100, 100)

  const heights = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4",
  }

  return (
    <div ref={ref} className={cn("w-full", className)}>
      {label && (
        <p className="text-sm font-medium text-[#6B7280] mb-2">{label}</p>
      )}
      {showAmount && (
        <div className="flex justify-between items-baseline mb-2">
          <span className="font-semibold text-[#DC2626]">
            {isInView && <AnimatedAmount value={value} delay={delay} />}
          </span>
          <span className="text-sm text-[#6B7280]">
            of {formatIndianCurrency(max)} goal
          </span>
        </div>
      )}
      <div className={cn("bg-gray-100 rounded-full overflow-hidden", heights[size])}>
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${progress}%` } : { width: 0 }}
          transition={{ 
            duration: 1.5, 
            delay: delay,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="h-full bg-gradient-to-r from-[#DC2626] to-[#EF4444] rounded-full relative overflow-hidden"
        >
          <motion.div
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />
        </motion.div>
      </div>
      <div className="flex justify-end mt-1">
        <span className="text-xs text-[#6B7280]">{Math.round(progress)}% complete</span>
      </div>
    </div>
  )
}

interface AnimatedAmountProps {
  value: number
  delay?: number
}

function AnimatedAmount({ value, delay = 0 }: AnimatedAmountProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    const timeout = setTimeout(() => {
      const duration = 1500
      const startTime = Date.now()
      const startValue = 0

      const animate = () => {
        const now = Date.now()
        const elapsed = now - startTime
        const progress = Math.min(elapsed / duration, 1)
        
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3)
        const current = Math.floor(startValue + (value - startValue) * eased)
        
        setDisplayValue(current)
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      requestAnimationFrame(animate)
    }, delay * 1000)

    return () => clearTimeout(timeout)
  }, [isInView, value, delay])

  return <span ref={ref}>{formatIndianCurrency(displayValue)}</span>
}

interface StatCounterProps {
  value: number
  label: string
  icon?: React.ReactNode
  suffix?: string
  prefix?: string
  delay?: number
  className?: string
}

export function StatCounter({ 
  value, 
  label, 
  icon, 
  suffix = "", 
  prefix = "",
  delay = 0,
  className
}: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const timeout = setTimeout(() => {
      const duration = 2000
      const startTime = Date.now()

      const animate = () => {
        const now = Date.now()
        const elapsed = now - startTime
        const progress = Math.min(elapsed / duration, 1)
        
        // Ease out expo
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
        const current = Math.floor(value * eased)
        
        setDisplayValue(current)
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      requestAnimationFrame(animate)
    }, delay * 1000)

    return () => clearTimeout(timeout)
  }, [isInView, value, delay])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
      className={cn("text-center", className)}
    >
      {icon && (
        <div className="inline-flex items-center justify-center w-14 h-14 bg-red-50 rounded-2xl mb-4 text-[#DC2626]">
          {icon}
        </div>
      )}
      <div className="font-serif text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-2">
        {prefix}
        {formatIndianNumber(displayValue)}
        {suffix}
      </div>
      <p className="text-[#6B7280] font-medium">{label}</p>
    </motion.div>
  )
}

// Utility functions
function formatIndianCurrency(num: number): string {
  if (num >= 10000000) {
    return `₹${(num / 10000000).toFixed(2)}Cr`
  } else if (num >= 100000) {
    return `₹${(num / 100000).toFixed(2)}L`
  } else if (num >= 1000) {
    return `₹${(num / 1000).toFixed(1)}K`
  }
  return `₹${num.toLocaleString('en-IN')}`
}

function formatIndianNumber(num: number): string {
  if (num >= 10000000) {
    return `${(num / 10000000).toFixed(1)}Cr`
  } else if (num >= 100000) {
    return `${(num / 100000).toFixed(0)}L`
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(0)}K`
  }
  return num.toLocaleString('en-IN')
}
