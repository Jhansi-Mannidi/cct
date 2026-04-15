"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface BloodTypeBadgeProps {
  type: string
  size?: "sm" | "md" | "lg"
  showPulse?: boolean
}

export function BloodTypeBadge({ type, size = "md", showPulse = true }: BloodTypeBadgeProps) {
  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
  }

  return (
    <motion.div
      animate={showPulse ? { scale: [1, 1.05, 1] } : {}}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      className="relative inline-flex"
    >
      {showPulse && (
        <div className="absolute inset-0 bg-[#DC2626] rounded-lg animate-pulse-ring opacity-30" />
      )}
      <div className={cn(
        "relative bg-[#DC2626] text-white font-bold rounded-lg shadow-lg shadow-red-500/25",
        sizes[size]
      )}>
        {type}
      </div>
    </motion.div>
  )
}

interface TierBadgeProps {
  tier: "bronze" | "silver" | "gold" | "platinum"
  size?: "sm" | "md" | "lg"
}

const tierConfig = {
  bronze: {
    bg: "bg-gradient-to-r from-amber-600 to-amber-700",
    text: "text-white",
    label: "Bronze",
    shadow: "shadow-amber-500/25",
  },
  silver: {
    bg: "bg-gradient-to-r from-gray-300 to-gray-400",
    text: "text-gray-800",
    label: "Silver",
    shadow: "shadow-gray-400/25",
  },
  gold: {
    bg: "bg-gradient-to-r from-yellow-400 to-amber-400",
    text: "text-amber-900",
    label: "Gold",
    shadow: "shadow-yellow-400/25",
  },
  platinum: {
    bg: "bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400",
    text: "text-white",
    label: "Platinum",
    shadow: "shadow-purple-400/25",
  },
}

export function TierBadge({ tier, size = "md" }: TierBadgeProps) {
  const config = tierConfig[tier]
  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
  }

  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      className={cn(
        "inline-flex items-center font-semibold rounded-full shadow-lg",
        config.bg,
        config.text,
        config.shadow,
        sizes[size]
      )}
    >
      {config.label}
    </motion.span>
  )
}

interface StatusBadgeProps {
  status: "critical" | "low" | "sufficient"
  label?: string
  size?: "sm" | "md" | "lg"
}

const statusConfig = {
  critical: {
    bg: "bg-red-100",
    text: "text-red-700",
    dot: "bg-red-500",
    pulse: true,
  },
  low: {
    bg: "bg-amber-100",
    text: "text-amber-700",
    dot: "bg-amber-500",
    pulse: false,
  },
  sufficient: {
    bg: "bg-green-100",
    text: "text-green-700",
    dot: "bg-green-500",
    pulse: false,
  },
}

export function StatusBadge({ status, label, size = "md" }: StatusBadgeProps) {
  const config = statusConfig[status]
  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
  }

  const statusLabels = {
    critical: "Critical",
    low: "Low",
    sufficient: "Sufficient",
  }

  return (
    <span className={cn(
      "inline-flex items-center gap-2 font-medium rounded-full",
      config.bg,
      config.text,
      sizes[size]
    )}>
      <span className="relative flex h-2 w-2">
        {config.pulse && (
          <span className={cn(
            "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
            config.dot
          )} />
        )}
        <span className={cn("relative inline-flex rounded-full h-2 w-2", config.dot)} />
      </span>
      {label || statusLabels[status]}
    </span>
  )
}

interface GenericBadgeProps {
  children: React.ReactNode
  variant?: "default" | "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
}

export function CCTBadge({ children, variant = "default", size = "md" }: GenericBadgeProps) {
  const variants = {
    default: "bg-gray-100 text-gray-700",
    primary: "bg-[#DC2626] text-white",
    secondary: "bg-[#1E3A5F] text-white",
    outline: "border-2 border-[#DC2626] text-[#DC2626] bg-transparent",
  }

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-sm",
    lg: "px-3 py-1.5 text-base",
  }

  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      className={cn(
        "inline-flex items-center font-medium rounded-full",
        variants[variant],
        sizes[size]
      )}
    >
      {children}
    </motion.span>
  )
}
