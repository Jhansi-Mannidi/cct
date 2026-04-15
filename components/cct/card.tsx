"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface CCTCardProps {
  children: ReactNode
  className?: string
  delay?: number
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: delay,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
}

export function CCTCard({ children, className, delay = 0 }: CCTCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      custom={delay}
      whileHover={{ 
        y: -8, 
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
        transition: { duration: 0.3 }
      }}
      className={cn(
        "bg-white rounded-2xl p-6 shadow-lg shadow-black/5 border border-gray-100",
        className
      )}
    >
      {children}
    </motion.div>
  )
}

interface CampaignCardProps {
  title: string
  description: string
  raised: number
  goal: number
  donors: number
  daysLeft: number
  image?: string
  delay?: number
}

export function CampaignCard({ title, description, raised, goal, donors, daysLeft, image, delay = 0 }: CampaignCardProps) {
  const progress = (raised / goal) * 100
  
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      custom={delay}
      whileHover={{ 
        y: -8, 
        boxShadow: "0 25px 50px -12px rgba(220, 38, 38, 0.15)",
        transition: { duration: 0.3 }
      }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg shadow-black/5 border border-gray-100"
    >
      {image && (
        <div className="relative h-48 bg-gradient-to-br from-[#DC2626] to-[#B91C1C] overflow-hidden">
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
          <div className="absolute bottom-4 left-4 right-4">
            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
              {daysLeft} days left
            </span>
          </div>
        </div>
      )}
      <div className="p-6">
        <h3 className="font-serif text-xl font-bold text-[#1A1A1A] mb-2">{title}</h3>
        <p className="text-[#6B7280] text-sm mb-4 line-clamp-2">{description}</p>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-semibold text-[#DC2626]">
              {formatIndianCurrency(raised)} raised
            </span>
            <span className="text-[#6B7280]">
              of {formatIndianCurrency(goal)}
            </span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${Math.min(progress, 100)}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: delay + 0.3, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-[#DC2626] to-[#EF4444] rounded-full"
            />
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm text-[#6B7280]">
          <span>{donors} donors</span>
          <span>{Math.round(progress)}% funded</span>
        </div>
      </div>
    </motion.div>
  )
}

interface EventCardProps {
  title: string
  date: string
  location: string
  attendees: number
  type: "blood-drive" | "fundraiser" | "awareness"
  delay?: number
}

const eventTypeConfig = {
  "blood-drive": { bg: "bg-red-50", border: "border-red-100", icon: "text-[#DC2626]" },
  "fundraiser": { bg: "bg-amber-50", border: "border-amber-100", icon: "text-[#F59E0B]" },
  "awareness": { bg: "bg-blue-50", border: "border-blue-100", icon: "text-[#1E3A5F]" },
}

export function EventCard({ title, date, location, attendees, type, delay = 0 }: EventCardProps) {
  const config = eventTypeConfig[type]
  
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      custom={delay}
      whileHover={{ 
        y: -8, 
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)",
        transition: { duration: 0.3 }
      }}
      className={cn(
        "rounded-2xl p-6 border-2",
        config.bg,
        config.border
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-[#6B7280] mb-1">{date}</p>
          <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">{title}</h3>
        </div>
        <span className="capitalize text-xs font-semibold px-2 py-1 rounded-full bg-white/50">
          {type.replace("-", " ")}
        </span>
      </div>
      <p className="text-sm text-[#6B7280] mb-3">{location}</p>
      <div className="flex items-center gap-2 text-sm">
        <span className="font-medium text-[#1A1A1A]">{attendees}</span>
        <span className="text-[#6B7280]">registered</span>
      </div>
    </motion.div>
  )
}

interface StatCardProps {
  value: number
  label: string
  icon: ReactNode
  suffix?: string
  delay?: number
}

export function StatCard({ value, label, icon, suffix = "", delay = 0 }: StatCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      custom={delay}
      whileHover={{ 
        y: -4, 
        boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.1)",
        transition: { duration: 0.3 }
      }}
      className="bg-white rounded-2xl p-6 shadow-lg shadow-black/5 border border-gray-100 text-center"
    >
      <div className="inline-flex items-center justify-center w-12 h-12 bg-red-50 rounded-xl mb-4 text-[#DC2626]">
        {icon}
      </div>
      <div className="font-serif text-3xl font-bold text-[#1A1A1A] mb-1">
        <AnimatedCounter value={value} delay={delay} />{suffix}
      </div>
      <p className="text-sm text-[#6B7280]">{label}</p>
    </motion.div>
  )
}

interface DonorCardProps {
  name: string
  bloodType: string
  donations: number
  tier: "bronze" | "silver" | "gold" | "platinum"
  avatar?: string
  delay?: number
}

const tierColors = {
  bronze: "bg-amber-600",
  silver: "bg-gray-400",
  gold: "bg-yellow-400",
  platinum: "bg-gradient-to-r from-indigo-400 to-purple-400",
}

export function DonorCard({ name, bloodType, donations, tier, delay = 0 }: DonorCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      custom={delay}
      whileHover={{ 
        y: -4, 
        transition: { duration: 0.3 }
      }}
      className="bg-white rounded-2xl p-4 shadow-lg shadow-black/5 border border-gray-100 flex items-center gap-4"
    >
      <div className="relative">
        <div className="w-14 h-14 bg-gradient-to-br from-[#DC2626] to-[#EF4444] rounded-full flex items-center justify-center text-white font-bold text-lg">
          {name.split(" ").map(n => n[0]).join("")}
        </div>
        <div className={cn(
          "absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white",
          tierColors[tier]
        )} />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-[#1A1A1A] truncate">{name}</h4>
        <p className="text-sm text-[#6B7280]">{donations} donations</p>
      </div>
      <BloodTypeBadge type={bloodType} />
    </motion.div>
  )
}

// Helper Components
function AnimatedCounter({ value, delay = 0 }: { value: number; delay?: number }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay }}
      >
        {formatIndianNumber(value)}
      </motion.span>
    </motion.span>
  )
}

function BloodTypeBadge({ type }: { type: string }) {
  return (
    <motion.div
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      className="relative"
    >
      <div className="absolute inset-0 bg-[#DC2626] rounded-lg animate-pulse-ring opacity-30" />
      <div className="relative px-3 py-1.5 bg-[#DC2626] text-white font-bold text-sm rounded-lg">
        {type}
      </div>
    </motion.div>
  )
}

// Utility functions
function formatIndianCurrency(num: number): string {
  if (num >= 10000000) {
    return `₹${(num / 10000000).toFixed(1)}Cr`
  } else if (num >= 100000) {
    return `₹${(num / 100000).toFixed(1)}L`
  } else if (num >= 1000) {
    return `₹${(num / 1000).toFixed(1)}K`
  }
  return `₹${num}`
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
