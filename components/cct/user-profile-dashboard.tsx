"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { 
  Droplet, Heart, Calendar, Star, Edit3, ChevronDown, ChevronRight,
  Download, Clock, Check, Lock, Bell, MessageSquare, Mail, Smartphone,
  Eye, EyeOff, Globe, Trash2, Award, Gift, Users, Trophy, Zap,
  MapPin, Shield
} from "lucide-react"
import { useRef } from "react"

// Mock user data
const userData = {
  name: "Ravi Kumar",
  bloodType: "A+",
  tier: "Silver",
  memberSince: "April 2024",
  city: "Vijayawada",
  profileCompleteness: 85,
  donations: 4,
  contributions: 2500,
  eventsAttended: 3,
  credits: 185
}

// Tier colors
const tierColors = {
  Bronze: "#CD7F32",
  Silver: "#C0C0C0",
  Gold: "#FFD700",
  Platinum: "#E5E4E2"
}

// Mock donation history
const donationHistory = [
  { id: 1, date: "March 15, 2026", location: "Red Cross Blood Bank, Vijayawada", type: "Whole Blood", credits: 50 },
  { id: 2, date: "December 8, 2025", location: "World Blood Donor Day Camp", type: "Platelets", credits: 75 },
  { id: 3, date: "August 22, 2025", location: "NTR Blood Bank, Vijayawada", type: "Whole Blood", credits: 50 },
  { id: 4, date: "April 10, 2024", location: "Community Blood Drive", type: "Whole Blood", credits: 50 }
]

// Mock contributions
const contributions = [
  { id: 1, campaign: "Platelet Separator for Tirupati", amount: 1000, date: "February 2026", receipt: true, certificate: "Generated" },
  { id: 2, campaign: "General Fund", amount: 1000, date: "November 2025", receipt: true, certificate: "Generated" },
  { id: 3, campaign: "Blood Storage Unit - Guntur", amount: 500, date: "July 2025", receipt: true, certificate: "Pending" }
]

// Mock events
const events = [
  { id: 1, name: "Mega Blood Drive 2026", date: "April 20, 2026", location: "HITEX, Hyderabad", status: "Upcoming" },
  { id: 2, name: "World Blood Donor Day", date: "June 14, 2025", location: "NTR Stadium", status: "Attended" },
  { id: 3, name: "Community Drive - Vijayawada", date: "March 5, 2025", location: "PWD Grounds", status: "Missed" }
]

// Mock badges
const badges = [
  { id: 1, name: "First Donation", icon: Droplet, earned: true, earnedDate: "April 2024", description: "Complete your first blood donation" },
  { id: 2, name: "5 Donations", icon: Award, earned: true, earnedDate: "March 2026", description: "Donate blood 5 times" },
  { id: 3, name: "Cross-Domain Contributor", icon: Zap, earned: true, earnedDate: "November 2025", description: "Donate blood AND contribute financially" },
  { id: 4, name: "10 Donations", icon: Trophy, earned: false, earnedDate: null, description: "Donate blood 10 times" },
  { id: 5, name: "Event Champion", icon: Calendar, earned: false, earnedDate: null, description: "Attend 10 blood donation events" },
  { id: 6, name: "Platinum Donor", icon: Shield, earned: false, earnedDate: null, description: "Reach Platinum tier status" }
]

// Credit history
const creditHistory = [
  { id: 1, type: "Blood Donation", credits: 50, date: "March 15, 2026" },
  { id: 2, type: "Campaign Contribution", credits: 10, date: "February 2026" },
  { id: 3, type: "Platelet Donation", credits: 75, date: "December 2025" },
  { id: 4, type: "Campaign Contribution", credits: 10, date: "November 2025" },
  { id: 5, type: "Blood Donation", credits: 50, date: "August 2025" }
]

// Animated Counter Component
function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      const duration = 1500
      const steps = 60
      const increment = value / steps
      let current = 0
      const timer = setInterval(() => {
        current += increment
        if (current >= value) {
          setCount(value)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)
      return () => clearInterval(timer)
    }
  }, [isInView, value])

  return (
    <span ref={ref}>
      {count.toLocaleString("en-IN")}{suffix}
    </span>
  )
}

// Profile Header Component
function ProfileHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl p-6 md:p-8 shadow-lg shadow-black/5"
    >
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        {/* Avatar with tier ring */}
        <div className="relative">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center text-3xl md:text-4xl font-bold text-white"
            style={{ 
              background: `linear-gradient(135deg, ${tierColors[userData.tier as keyof typeof tierColors]}, ${tierColors[userData.tier as keyof typeof tierColors]}88)`,
              boxShadow: `0 0 0 4px ${tierColors[userData.tier as keyof typeof tierColors]}, 0 0 20px ${tierColors[userData.tier as keyof typeof tierColors]}40`
            }}
          >
            {userData.name.split(" ").map(n => n[0]).join("")}
          </motion.div>
          {/* Tier shimmer effect */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: `linear-gradient(90deg, transparent, ${tierColors[userData.tier as keyof typeof tierColors]}40, transparent)`
            }}
            animate={{ x: [-100, 100] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          />
        </div>

        {/* Profile Info */}
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#1A1A1A]">
                {userData.name}
              </h1>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                {/* Blood type badge */}
                <span className="px-3 py-1 bg-red-100 text-[#DC2626] rounded-full text-sm font-semibold">
                  {userData.bloodType}
                </span>
                {/* Tier badge with shimmer */}
                <motion.span
                  className="relative px-3 py-1 rounded-full text-sm font-semibold overflow-hidden"
                  style={{ 
                    backgroundColor: `${tierColors[userData.tier as keyof typeof tierColors]}20`,
                    color: userData.tier === "Silver" ? "#666" : tierColors[userData.tier as keyof typeof tierColors]
                  }}
                >
                  {userData.tier} Donor
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${tierColors[userData.tier as keyof typeof tierColors]}30, transparent)`
                    }}
                    animate={{ x: [-50, 100] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                  />
                </motion.span>
              </div>
              <div className="flex items-center gap-4 mt-3 text-sm text-[#6B7280]">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Since {userData.memberSince}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {userData.city}
                </span>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <Edit3 className="w-5 h-5 text-[#6B7280]" />
            </motion.button>
          </div>
        </div>

        {/* Profile Completeness */}
        <div className="flex flex-col items-center">
          <div className="relative w-20 h-20">
            <svg className="w-20 h-20 transform -rotate-90">
              <circle
                cx="40"
                cy="40"
                r="36"
                stroke="#E5E7EB"
                strokeWidth="6"
                fill="none"
              />
              <motion.circle
                cx="40"
                cy="40"
                r="36"
                stroke="#F59E0B"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                initial={{ strokeDasharray: "226.2", strokeDashoffset: 226.2 }}
                animate={{ strokeDashoffset: 226.2 - (226.2 * userData.profileCompleteness / 100) }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold text-[#1A1A1A]">{userData.profileCompleteness}%</span>
            </div>
          </div>
          {userData.profileCompleteness < 100 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="mt-2 text-xs text-[#F59E0B] font-medium hover:underline"
            >
              Complete Profile
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// Impact Summary Strip
function ImpactSummaryStrip() {
  const stats = [
    { icon: Droplet, label: "Blood Donations", value: userData.donations, color: "#DC2626" },
    { icon: Heart, label: "Contributed", value: userData.contributions, prefix: "₹", color: "#EC4899" },
    { icon: Calendar, label: "Events Attended", value: userData.eventsAttended, color: "#F59E0B" },
    { icon: Star, label: "Credits", value: userData.credits, color: "#8B5CF6" }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mt-6 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0"
    >
      <div className="flex md:grid md:grid-cols-4 gap-4 min-w-max md:min-w-0">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="bg-white rounded-2xl p-5 shadow-lg shadow-black/5 min-w-[160px] md:min-w-0"
          >
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
              style={{ backgroundColor: `${stat.color}15` }}
            >
              <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
            </div>
            <div className="text-2xl font-bold text-[#1A1A1A]">
              {stat.prefix}<AnimatedCounter value={stat.value} />
            </div>
            <div className="text-sm text-[#6B7280] mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

// Impact Multiplier Visual
function ImpactMultiplier() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="mt-6 bg-gradient-to-br from-[#1E3A5F] to-[#0F1D2F] rounded-3xl p-6 md:p-8 text-white overflow-hidden relative"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#F59E0B]/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <h2 className="font-serif text-xl md:text-2xl font-bold text-center mb-8 relative z-10">
        Your Impact Story
      </h2>

      <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 relative z-10">
        {/* Blood Donations Impact */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col items-center text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-[#DC2626]/20 flex items-center justify-center mb-3">
            <Droplet className="w-8 h-8 text-[#DC2626]" />
          </div>
          <div className="text-3xl font-bold">4</div>
          <div className="text-sm text-white/70">donations</div>
          <div className="mt-2 text-[#F59E0B] font-medium">= 12 lives saved</div>
        </motion.div>

        {/* Center Combined Impact */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, type: "spring" }}
          className="relative"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-[#F59E0B] to-[#DC2626] flex items-center justify-center shadow-xl shadow-[#F59E0B]/30"
          >
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold">17</div>
              <div className="text-xs">Lives Impacted</div>
            </div>
          </motion.div>
          {/* Pulse rings */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-[#F59E0B]/30"
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-[#F59E0B]/30"
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />
        </motion.div>

        {/* Financial Contributions Impact */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col items-center text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-[#F59E0B]/20 flex items-center justify-center mb-3">
            <Heart className="w-8 h-8 text-[#F59E0B]" />
          </div>
          <div className="text-3xl font-bold">₹2,500</div>
          <div className="text-sm text-white/70">contributed</div>
          <div className="mt-2 text-[#F59E0B] font-medium">= 5 sessions funded</div>
        </motion.div>
      </div>
    </motion.div>
  )
}

// Tab Content Components
function DonationHistoryTab() {
  return (
    <div className="relative pl-6 md:pl-8">
      {/* Timeline line */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: "100%" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute left-0 top-0 w-0.5 bg-gradient-to-b from-[#DC2626] to-[#DC2626]/20"
      />

      <div className="space-y-6">
        {donationHistory.map((donation, index) => (
          <motion.div
            key={donation.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.15 }}
            className="relative"
          >
            {/* Timeline dot */}
            <div className="absolute -left-6 md:-left-8 top-1 w-3 h-3 rounded-full bg-[#DC2626] border-2 border-white shadow" />
            
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div>
                  <div className="text-sm text-[#6B7280]">{donation.date}</div>
                  <div className="font-medium text-[#1A1A1A] mt-1">{donation.location}</div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-2 py-0.5 bg-red-50 text-[#DC2626] rounded text-xs font-medium">
                      {donation.type}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[#F59E0B] font-semibold">
                  <Star className="w-4 h-4" />
                  +{donation.credits} credits
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function ContributionsTab() {
  return (
    <div className="space-y-4">
      {contributions.map((contribution, index) => (
        <motion.div
          key={contribution.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="font-medium text-[#1A1A1A]">{contribution.campaign}</div>
              <div className="text-sm text-[#6B7280] mt-1">{contribution.date}</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-xl font-bold text-[#1A1A1A]">
                ₹{contribution.amount.toLocaleString("en-IN")}
              </div>
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Receipt
                </motion.button>
                <span className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium ${
                  contribution.certificate === "Generated" 
                    ? "bg-green-50 text-green-600" 
                    : "bg-amber-50 text-amber-600"
                }`}>
                  {contribution.certificate === "Generated" ? <Check className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                  80G {contribution.certificate}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function EventsTab() {
  const statusColors = {
    Attended: { bg: "bg-green-50", text: "text-green-600", icon: Check },
    Upcoming: { bg: "bg-blue-50", text: "text-blue-600", icon: Calendar },
    Missed: { bg: "bg-red-50", text: "text-red-600", icon: Clock }
  }

  return (
    <div className="space-y-4">
      {events.map((event, index) => {
        const status = statusColors[event.status as keyof typeof statusColors]
        const StatusIcon = status.icon
        
        return (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="font-medium text-[#1A1A1A]">{event.name}</div>
                <div className="flex items-center gap-3 mt-2 text-sm text-[#6B7280]">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {event.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {event.location}
                  </span>
                </div>
              </div>
              <span className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium ${status.bg} ${status.text}`}>
                <StatusIcon className="w-4 h-4" />
                {event.status}
              </span>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

function CreditsAndBadgesTab() {
  const [flippedBadges, setFlippedBadges] = useState<number[]>([])

  const handleBadgeView = (badgeId: number, earned: boolean) => {
    if (earned && !flippedBadges.includes(badgeId)) {
      setFlippedBadges(prev => [...prev, badgeId])
    }
  }

  // Tier thresholds
  const tiers = { Bronze: 0, Silver: 100, Gold: 500, Platinum: 1000 }
  const currentCredits = userData.credits
  const nextTier = "Gold"
  const nextTierThreshold = tiers.Gold
  const progress = ((currentCredits - tiers.Silver) / (nextTierThreshold - tiers.Silver)) * 100

  return (
    <div className="space-y-8">
      {/* Credit Balance */}
      <div className="bg-gradient-to-br from-[#F59E0B]/10 to-[#F59E0B]/5 rounded-2xl p-6 border border-[#F59E0B]/20">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-sm text-[#6B7280] mb-1">Your Balance</div>
            <div className="text-4xl font-bold text-[#1A1A1A]">
              <AnimatedCounter value={currentCredits} /> Credits
            </div>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-[#F59E0B]/20 flex items-center justify-center">
            <Star className="w-7 h-7 text-[#F59E0B]" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-[#6B7280]">Progress to {nextTier}</span>
            <span className="font-medium text-[#F59E0B]">{currentCredits}/{nextTierThreshold}</span>
          </div>
          <div className="h-3 bg-white rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-[#F59E0B] to-[#DC2626] rounded-full"
            />
          </div>
          <div className="text-xs text-[#6B7280]">
            {nextTierThreshold - currentCredits} more credits to reach {nextTier} tier
          </div>
        </div>
      </div>

      {/* Credit History */}
      <div>
        <h3 className="font-semibold text-[#1A1A1A] mb-4">Credit History</h3>
        <div className="space-y-3">
          {creditHistory.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100"
            >
              <div>
                <div className="font-medium text-[#1A1A1A] text-sm">{entry.type}</div>
                <div className="text-xs text-[#6B7280]">{entry.date}</div>
              </div>
              <div className="text-green-600 font-semibold">+{entry.credits}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Badges Grid */}
      <div>
        <h3 className="font-semibold text-[#1A1A1A] mb-4">Badges</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {badges.map((badge) => {
            const isFlipped = flippedBadges.includes(badge.id)
            
            return (
              <motion.div
                key={badge.id}
                className="relative perspective-1000"
                onViewportEnter={() => handleBadgeView(badge.id, badge.earned)}
              >
                <motion.div
                  className={`p-4 rounded-2xl text-center cursor-pointer ${
                    badge.earned 
                      ? "bg-gradient-to-br from-[#F59E0B]/10 to-[#F59E0B]/5 border border-[#F59E0B]/20" 
                      : "bg-gray-50 border border-gray-200"
                  }`}
                  initial={badge.earned ? { rotateY: 180 } : {}}
                  animate={badge.earned && isFlipped ? { rotateY: 0 } : {}}
                  transition={{ duration: 0.6 }}
                  style={{ transformStyle: "preserve-3d" }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className={`w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-3 ${
                    badge.earned ? "bg-[#F59E0B]/20" : "bg-gray-200"
                  }`}>
                    {badge.earned ? (
                      <badge.icon className="w-6 h-6 text-[#F59E0B]" />
                    ) : (
                      <Lock className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  <div className={`font-medium text-sm ${badge.earned ? "text-[#1A1A1A]" : "text-gray-400"}`}>
                    {badge.name}
                  </div>
                  {badge.earned ? (
                    <div className="text-xs text-[#6B7280] mt-1">
                      Earned {badge.earnedDate}
                    </div>
                  ) : (
                    <div className="text-xs text-gray-400 mt-1">
                      {badge.description}
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// Settings Section
function SettingsSection() {
  const [isOpen, setIsOpen] = useState(false)
  const [settings, setSettings] = useState({
    pushNotifications: true,
    smsNotifications: true,
    emailNotifications: false,
    whatsappNotifications: true,
    donorWallVisibility: true,
    crossDomainNudge: true,
    language: "English"
  })

  const toggleSetting = (key: keyof typeof settings) => {
    if (typeof settings[key] === "boolean") {
      setSettings(prev => ({ ...prev, [key]: !prev[key] }))
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="mt-8 bg-white rounded-3xl shadow-lg shadow-black/5 overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-[#1A1A1A]">Settings</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-[#6B7280]" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 space-y-6">
              {/* Notification Preferences */}
              <div>
                <h4 className="text-sm font-medium text-[#6B7280] mb-4">Notification Preferences</h4>
                <div className="space-y-3">
                  {[
                    { key: "pushNotifications", label: "Push Notifications", icon: Bell },
                    { key: "smsNotifications", label: "SMS", icon: MessageSquare },
                    { key: "emailNotifications", label: "Email", icon: Mail },
                    { key: "whatsappNotifications", label: "WhatsApp", icon: Smartphone }
                  ].map(({ key, label, icon: Icon }) => (
                    <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5 text-[#6B7280]" />
                        <span className="text-[#1A1A1A]">{label}</span>
                      </div>
                      <button
                        onClick={() => toggleSetting(key as keyof typeof settings)}
                        className={`w-11 h-6 rounded-full transition-colors relative ${
                          settings[key as keyof typeof settings] ? "bg-[#DC2626]" : "bg-gray-300"
                        }`}
                      >
                        <motion.div
                          className="w-5 h-5 bg-white rounded-full shadow absolute top-0.5"
                          animate={{ left: settings[key as keyof typeof settings] ? 22 : 2 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Privacy Settings */}
              <div>
                <h4 className="text-sm font-medium text-[#6B7280] mb-4">Privacy</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      {settings.donorWallVisibility ? <Eye className="w-5 h-5 text-[#6B7280]" /> : <EyeOff className="w-5 h-5 text-[#6B7280]" />}
                      <span className="text-[#1A1A1A]">Show on Donor Wall</span>
                    </div>
                    <button
                      onClick={() => toggleSetting("donorWallVisibility")}
                      className={`w-11 h-6 rounded-full transition-colors relative ${
                        settings.donorWallVisibility ? "bg-[#DC2626]" : "bg-gray-300"
                      }`}
                    >
                      <motion.div
                        className="w-5 h-5 bg-white rounded-full shadow absolute top-0.5"
                        animate={{ left: settings.donorWallVisibility ? 22 : 2 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Gift className="w-5 h-5 text-[#6B7280]" />
                      <span className="text-[#1A1A1A]">Cross-domain suggestions</span>
                    </div>
                    <button
                      onClick={() => toggleSetting("crossDomainNudge")}
                      className={`w-11 h-6 rounded-full transition-colors relative ${
                        settings.crossDomainNudge ? "bg-[#DC2626]" : "bg-gray-300"
                      }`}
                    >
                      <motion.div
                        className="w-5 h-5 bg-white rounded-full shadow absolute top-0.5"
                        animate={{ left: settings.crossDomainNudge ? 22 : 2 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Language */}
              <div>
                <h4 className="text-sm font-medium text-[#6B7280] mb-4">Language</h4>
                <div className="flex gap-3">
                  {["English", "Telugu"].map(lang => (
                    <button
                      key={lang}
                      onClick={() => setSettings(prev => ({ ...prev, language: lang }))}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                        settings.language === lang
                          ? "bg-[#DC2626] text-white"
                          : "bg-gray-100 text-[#6B7280] hover:bg-gray-200"
                      }`}
                    >
                      <Globe className="w-4 h-4" />
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              {/* Data Deletion */}
              <div className="pt-4 border-t border-gray-100">
                <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-red-500 transition-colors">
                  <Trash2 className="w-4 h-4" />
                  Request Data Deletion
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// Main Component
export function UserProfileDashboard() {
  const [activeTab, setActiveTab] = useState("history")

  const tabs = [
    { id: "history", label: "Donation History" },
    { id: "contributions", label: "My Contributions" },
    { id: "events", label: "My Events" },
    { id: "credits", label: "Credits & Badges" }
  ]

  return (
    <div className="min-h-screen bg-[#FFF7ED] pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <ProfileHeader />

        {/* Impact Summary Strip */}
        <ImpactSummaryStrip />

        {/* Impact Multiplier Visual */}
        <ImpactMultiplier />

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <div className="bg-white rounded-3xl shadow-lg shadow-black/5 overflow-hidden">
            {/* Tabs */}
            <div className="flex overflow-x-auto border-b border-gray-100">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex-1 min-w-max px-6 py-4 text-sm font-medium transition-colors ${
                    activeTab === tab.id ? "text-[#DC2626]" : "text-[#6B7280] hover:text-[#1A1A1A]"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#DC2626]"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === "history" && <DonationHistoryTab />}
                  {activeTab === "contributions" && <ContributionsTab />}
                  {activeTab === "events" && <EventsTab />}
                  {activeTab === "credits" && <CreditsAndBadgesTab />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Settings Section */}
        <SettingsSection />
      </div>
    </div>
  )
}
