"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  Trophy, 
  Users, 
  MapPin,
  Droplet,
  Heart,
  Crown,
  Medal,
  Award,
  Sparkles,
  TrendingUp,
  Calendar
} from "lucide-react"

// Tier colors and icons
const tierConfig = {
  platinum: { color: "#E5E4E2", bgColor: "bg-gradient-to-r from-gray-200 to-gray-300", icon: Crown, label: "Platinum" },
  gold: { color: "#F59E0B", bgColor: "bg-gradient-to-r from-amber-400 to-yellow-500", icon: Trophy, label: "Gold" },
  silver: { color: "#9CA3AF", bgColor: "bg-gradient-to-r from-gray-300 to-gray-400", icon: Medal, label: "Silver" },
  bronze: { color: "#CD7F32", bgColor: "bg-gradient-to-r from-amber-600 to-amber-700", icon: Award, label: "Bronze" },
}

// Mock donor data
const initialDonors = [
  { id: 1, name: "Ravi Kumar", bloodType: "A+", city: "Hyderabad", timeAgo: "2 hours ago", donationCount: 8, tier: "gold" },
  { id: 2, name: "Lakshmi Devi", bloodType: "O+", city: "Vijayawada", timeAgo: "3 hours ago", donationCount: 12, tier: "platinum" },
  { id: 3, name: "Anonymous", bloodType: "B+", city: "Tirupati", timeAgo: "4 hours ago", donationCount: 3, tier: "bronze" },
  { id: 4, name: "Venkat Rao", bloodType: "AB-", city: "Guntur", timeAgo: "5 hours ago", donationCount: 6, tier: "silver" },
  { id: 5, name: "Priya Reddy", bloodType: "O-", city: "Warangal", timeAgo: "6 hours ago", donationCount: 15, tier: "platinum" },
  { id: 6, name: "Mahesh Babu", bloodType: "A-", city: "Chennai", timeAgo: "Yesterday", donationCount: 4, tier: "bronze" },
  { id: 7, name: "Swathi Naidu", bloodType: "B-", city: "Visakhapatnam", timeAgo: "Yesterday", donationCount: 9, tier: "gold" },
  { id: 8, name: "Suresh Reddy", bloodType: "AB+", city: "Kakinada", timeAgo: "Yesterday", donationCount: 2, tier: "bronze" },
  { id: 9, name: "Padma Priya", bloodType: "O+", city: "Nellore", timeAgo: "2 days ago", donationCount: 7, tier: "silver" },
  { id: 10, name: "Kiran Kumar", bloodType: "A+", city: "Kurnool", timeAgo: "2 days ago", donationCount: 11, tier: "gold" },
  { id: 11, name: "Anonymous", bloodType: "B+", city: "Rajahmundry", timeAgo: "2 days ago", donationCount: 5, tier: "silver" },
  { id: 12, name: "Srinivas Rao", bloodType: "O-", city: "Hyderabad", timeAgo: "3 days ago", donationCount: 18, tier: "platinum" },
  { id: 13, name: "Anjali Sharma", bloodType: "AB+", city: "Vijayawada", timeAgo: "3 days ago", donationCount: 3, tier: "bronze" },
  { id: 14, name: "Ramesh Babu", bloodType: "A-", city: "Tirupati", timeAgo: "3 days ago", donationCount: 10, tier: "gold" },
  { id: 15, name: "Kavitha Reddy", bloodType: "B-", city: "Guntur", timeAgo: "4 days ago", donationCount: 6, tier: "silver" },
  { id: 16, name: "Nagaraju", bloodType: "O+", city: "Warangal", timeAgo: "4 days ago", donationCount: 14, tier: "platinum" },
  { id: 17, name: "Sunitha Devi", bloodType: "A+", city: "Visakhapatnam", timeAgo: "5 days ago", donationCount: 4, tier: "bronze" },
  { id: 18, name: "Pavan Kumar", bloodType: "AB-", city: "Kakinada", timeAgo: "5 days ago", donationCount: 8, tier: "gold" },
  { id: 19, name: "Radha Krishna", bloodType: "B+", city: "Nellore", timeAgo: "6 days ago", donationCount: 2, tier: "bronze" },
  { id: 20, name: "Vijaya Lakshmi", bloodType: "O-", city: "Kurnool", timeAgo: "1 week ago", donationCount: 16, tier: "platinum" },
]

const newDonorPool = [
  { name: "Chandra Sekhar", bloodType: "A+", city: "Hyderabad", tier: "silver" },
  { name: "Annapurna Devi", bloodType: "O+", city: "Vijayawada", tier: "gold" },
  { name: "Bhaskar Rao", bloodType: "B-", city: "Tirupati", tier: "bronze" },
  { name: "Sravani", bloodType: "AB+", city: "Guntur", tier: "silver" },
  { name: "Anonymous", bloodType: "O-", city: "Warangal", tier: "platinum" },
]

// City leaderboard data
const cityLeaderboardData = [
  { rank: 1, city: "Hyderabad", donations: 1240, amount: 1850000, score: 2450 },
  { rank: 2, city: "Vijayawada", donations: 890, amount: 1210000, score: 1780 },
  { rank: 3, city: "Tirupati", donations: 720, amount: 980000, score: 1420 },
  { rank: 4, city: "Visakhapatnam", donations: 650, amount: 870000, score: 1280 },
  { rank: 5, city: "Guntur", donations: 580, amount: 760000, score: 1120 },
  { rank: 6, city: "Warangal", donations: 520, amount: 680000, score: 1010 },
  { rank: 7, city: "Kakinada", donations: 480, amount: 620000, score: 920 },
  { rank: 8, city: "Kurnool", donations: 420, amount: 540000, score: 810 },
  { rank: 9, city: "Nellore", donations: 380, amount: 480000, score: 720 },
  { rank: 10, city: "Rajahmundry", donations: 340, amount: 420000, score: 640 },
]

// Individual leaderboard data
const individualLeaderboardData = [
  { rank: 1, name: "Srinivas Rao", tier: "platinum", credits: 4850, donations: 24, city: "Hyderabad" },
  { rank: 2, name: "Vijaya Lakshmi", tier: "platinum", credits: 4200, donations: 21, city: "Kurnool" },
  { rank: 3, name: "Nagaraju", tier: "platinum", credits: 3800, donations: 19, city: "Warangal" },
  { rank: 4, name: "Lakshmi Devi", tier: "platinum", credits: 3400, donations: 17, city: "Vijayawada" },
  { rank: 5, name: "Priya Reddy", tier: "gold", credits: 2900, donations: 15, city: "Warangal" },
  { rank: 6, name: "Kiran Kumar", tier: "gold", credits: 2600, donations: 14, city: "Kurnool" },
  { rank: 7, name: "Ramesh Babu", tier: "gold", credits: 2200, donations: 12, city: "Tirupati" },
  { rank: 8, name: "Swathi Naidu", tier: "gold", credits: 1900, donations: 10, city: "Visakhapatnam" },
  { rank: 9, name: "Ravi Kumar", tier: "silver", credits: 1500, donations: 8, city: "Hyderabad" },
  { rank: 10, name: "Pavan Kumar", tier: "silver", credits: 1200, donations: 6, city: "Kakinada" },
]

// Fan club leaderboard data
const fanClubLeaderboardData = [
  { rank: 1, name: "Mega Star Fans — Tirupati", events: 28, donations: 1850, members: 4200 },
  { rank: 2, name: "Icon Star Fans — Hyderabad", events: 24, donations: 1620, members: 3800 },
  { rank: 3, name: "Power Star Fans — Vijayawada", events: 22, donations: 1480, members: 3500 },
  { rank: 4, name: "Stylish Star Fans — Guntur", events: 18, donations: 1200, members: 2900 },
  { rank: 5, name: "Natural Star Fans — Warangal", events: 16, donations: 1050, members: 2600 },
  { rank: 6, name: "Young Tiger Fans — Visakhapatnam", events: 14, donations: 920, members: 2200 },
  { rank: 7, name: "Rebel Star Fans — Kakinada", events: 12, donations: 780, members: 1800 },
  { rank: 8, name: "Mass Maharaja Fans — Nellore", events: 10, donations: 640, members: 1500 },
]

// Blood type badge colors
const bloodTypeColors: Record<string, string> = {
  "A+": "bg-red-500",
  "A-": "bg-red-600",
  "B+": "bg-blue-500",
  "B-": "bg-blue-600",
  "AB+": "bg-purple-500",
  "AB-": "bg-purple-600",
  "O+": "bg-green-500",
  "O-": "bg-green-600",
}

// Donor Card Component
function DonorCard({ donor, isNew = false }: { donor: typeof initialDonors[0], isNew?: boolean }) {
  const TierIcon = tierConfig[donor.tier as keyof typeof tierConfig].icon

  return (
    <motion.div
      layout
      initial={isNew ? { y: -50, opacity: 0, scale: 0.9 } : { opacity: 0, y: 20 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, x: -100 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={`bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow ${
        isNew ? "ring-2 ring-[#F59E0B] ring-opacity-50" : ""
      }`}
    >
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#DC2626] to-[#1E3A5F] flex items-center justify-center text-white font-semibold text-lg">
            {donor.name === "Anonymous" ? "?" : donor.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
          </div>
          {/* Tier indicator */}
          <div 
            className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
            style={{ backgroundColor: tierConfig[donor.tier as keyof typeof tierConfig].color }}
          >
            <TierIcon className="w-3 h-3 text-white" />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-semibold text-[#1A1A1A] truncate">{donor.name}</h4>
            <span className={`${bloodTypeColors[donor.bloodType]} text-white text-xs px-2 py-0.5 rounded-full font-medium`}>
              {donor.bloodType}
            </span>
          </div>
          <div className="flex items-center gap-3 mt-1 text-sm text-[#6B7280]">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {donor.city}
            </span>
            <span>{donor.timeAgo}</span>
          </div>
        </div>

        {/* Donation count badge */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 bg-[#FFF7ED] text-[#F59E0B] px-3 py-1 rounded-full">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-semibold">{donor.donationCount}</span>
          </div>
          <span className="text-xs text-[#6B7280] mt-1">
            {donor.donationCount === 1 ? "1st" : donor.donationCount === 2 ? "2nd" : donor.donationCount === 3 ? "3rd" : `${donor.donationCount}th`} donation
          </span>
        </div>
      </div>
    </motion.div>
  )
}

// Podium Component
function Podium({ cities, animate }: { cities: typeof cityLeaderboardData, animate: boolean }) {
  const podiumOrder = [cities[1], cities[0], cities[2]] // 2nd, 1st, 3rd
  const heights = [180, 220, 150]
  const colors = ["bg-gray-300", "bg-gradient-to-b from-amber-400 to-yellow-500", "bg-amber-700"]
  const medals = ["#C0C0C0", "#FFD700", "#CD7F32"]

  return (
    <div className="flex items-end justify-center gap-4 py-8">
      {podiumOrder.map((city, index) => (
        <motion.div
          key={city.city}
          initial={animate ? { y: 100, opacity: 0 } : false}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 20, 
            delay: index === 1 ? 0.2 : index === 0 ? 0.4 : 0.6 
          }}
          className="flex flex-col items-center"
        >
          {/* City info */}
          <motion.div 
            initial={animate ? { scale: 0 } : false}
            animate={{ scale: 1 }}
            transition={{ delay: index === 1 ? 0.5 : index === 0 ? 0.7 : 0.9 }}
            className="text-center mb-3"
          >
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2"
              style={{ backgroundColor: medals[index] }}
            >
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-serif font-bold text-[#1A1A1A]">{city.city}</h4>
            <p className="text-sm text-[#6B7280]">{city.donations.toLocaleString()} donations</p>
            <p className="text-xs text-[#F59E0B] font-semibold">Rs.{(city.amount / 100000).toFixed(1)}L</p>
          </motion.div>

          {/* Podium block */}
          <motion.div
            initial={animate ? { height: 0 } : false}
            animate={{ height: heights[index] }}
            transition={{ 
              type: "spring", 
              stiffness: 100, 
              damping: 15, 
              delay: index === 1 ? 0.1 : index === 0 ? 0.3 : 0.5 
            }}
            className={`w-24 md:w-32 ${colors[index]} rounded-t-lg flex items-start justify-center pt-4`}
          >
            <span className="text-3xl font-bold text-white">#{city.rank}</span>
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}

// City Leaderboard Tab
function CityLeaderboard() {
  const [month, setMonth] = useState("April 2026")
  const [animatePodium, setAnimatePodium] = useState(true)

  const months = ["February 2026", "March 2026", "April 2026"]
  const currentIndex = months.indexOf(month)

  const prevMonth = () => {
    if (currentIndex > 0) {
      setMonth(months[currentIndex - 1])
      setAnimatePodium(true)
    }
  }

  const nextMonth = () => {
    if (currentIndex < months.length - 1) {
      setMonth(months[currentIndex + 1])
      setAnimatePodium(true)
    }
  }

  useEffect(() => {
    if (animatePodium) {
      const timer = setTimeout(() => setAnimatePodium(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [animatePodium])

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Month selector */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <button 
          onClick={prevMonth}
          disabled={currentIndex === 0}
          className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-[#F59E0B]" />
          <span className="font-semibold text-[#1A1A1A]">{month}</span>
        </div>
        <button 
          onClick={nextMonth}
          disabled={currentIndex === months.length - 1}
          className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Podium */}
      <Podium cities={cityLeaderboardData.slice(0, 3)} animate={animatePodium} />

      {/* Remaining cities */}
      <div className="mt-8 space-y-3">
        {cityLeaderboardData.slice(3).map((city, index) => (
          <motion.div
            key={city.city}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 + index * 0.1 }}
            className="flex items-center gap-4 bg-white rounded-lg p-4 border border-gray-100"
          >
            <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-[#6B7280]">
              {city.rank}
            </span>
            <div className="flex-1">
              <h4 className="font-semibold text-[#1A1A1A]">{city.city}</h4>
            </div>
            <div className="text-right">
              <p className="font-semibold text-[#1A1A1A]">{city.donations.toLocaleString()} donations</p>
              <p className="text-sm text-[#F59E0B]">Rs.{(city.amount / 100000).toFixed(1)}L</p>
            </div>
            <div className="bg-[#1E3A5F] text-white px-3 py-1 rounded-full text-sm font-semibold">
              {city.score.toLocaleString()} pts
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

// Individual Leaderboard Tab
function IndividualLeaderboard() {
  const [cityFilter, setCityFilter] = useState("all")
  const [bloodTypeFilter, setBloodTypeFilter] = useState("all")

  const cities = ["all", "Hyderabad", "Vijayawada", "Tirupati", "Warangal", "Kurnool", "Visakhapatnam", "Kakinada"]
  const bloodTypes = ["all", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

  const filteredData = individualLeaderboardData.filter(donor => {
    if (cityFilter !== "all" && donor.city !== cityFilter) return false
    return true
  })

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <select 
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#DC2626]"
        >
          {cities.map(city => (
            <option key={city} value={city}>{city === "all" ? "All Cities" : city}</option>
          ))}
        </select>
        <select 
          value={bloodTypeFilter}
          onChange={(e) => setBloodTypeFilter(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#DC2626]"
        >
          {bloodTypes.map(type => (
            <option key={type} value={type}>{type === "all" ? "All Blood Types" : type}</option>
          ))}
        </select>
      </div>

      {/* Top 3 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {filteredData.slice(0, 3).map((donor, index) => {
          const TierIcon = tierConfig[donor.tier as keyof typeof tierConfig].icon
          const borderColor = index === 0 ? "border-[#F59E0B] ring-2 ring-[#F59E0B] ring-opacity-30" : 
                             index === 1 ? "border-gray-300" : "border-amber-700"
          
          return (
            <motion.div
              key={donor.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-xl p-5 border-2 ${borderColor} relative overflow-hidden`}
            >
              {index === 0 && (
                <div className="absolute top-0 right-0">
                  <div className="bg-[#F59E0B] text-white text-xs px-3 py-1 rounded-bl-lg font-semibold">
                    TOP DONOR
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3 mb-3">
                <span className="w-10 h-10 rounded-full bg-gradient-to-br from-[#DC2626] to-[#1E3A5F] flex items-center justify-center text-white font-bold text-lg">
                  #{donor.rank}
                </span>
                <div>
                  <h4 className="font-semibold text-[#1A1A1A]">{donor.name}</h4>
                  <div className="flex items-center gap-1">
                    <TierIcon className="w-4 h-4" style={{ color: tierConfig[donor.tier as keyof typeof tierConfig].color }} />
                    <span className="text-xs text-[#6B7280]">{tierConfig[donor.tier as keyof typeof tierConfig].label}</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-[#FFF7ED] rounded-lg p-2 text-center">
                  <p className="text-[#F59E0B] font-bold">{donor.credits.toLocaleString()}</p>
                  <p className="text-xs text-[#6B7280]">Credits</p>
                </div>
                <div className="bg-red-50 rounded-lg p-2 text-center">
                  <p className="text-[#DC2626] font-bold">{donor.donations}</p>
                  <p className="text-xs text-[#6B7280]">Donations</p>
                </div>
              </div>
              <div className="flex items-center gap-1 mt-3 text-sm text-[#6B7280]">
                <MapPin className="w-3 h-3" />
                {donor.city}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Remaining donors */}
      <div className="space-y-3">
        {filteredData.slice(3).map((donor, index) => {
          const TierIcon = tierConfig[donor.tier as keyof typeof tierConfig].icon
          
          return (
            <motion.div
              key={donor.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="flex items-center gap-4 bg-white rounded-lg p-4 border border-gray-100"
            >
              <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-[#6B7280]">
                {donor.rank}
              </span>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#DC2626] to-[#1E3A5F] flex items-center justify-center text-white font-semibold">
                {donor.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-[#1A1A1A]">{donor.name}</h4>
                  <div 
                    className="w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: tierConfig[donor.tier as keyof typeof tierConfig].color }}
                  >
                    <TierIcon className="w-3 h-3 text-white" />
                  </div>
                </div>
                <p className="text-sm text-[#6B7280]">{donor.city}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-[#F59E0B]">{donor.credits.toLocaleString()} credits</p>
                <p className="text-sm text-[#6B7280]">{donor.donations} donations</p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

// Fan Club Leaderboard Tab
function FanClubLeaderboard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Top 3 Fan Clubs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {fanClubLeaderboardData.slice(0, 3).map((club, index) => {
          const medals = ["#FFD700", "#C0C0C0", "#CD7F32"]
          
          return (
            <motion.div
              key={club.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.15 }}
              className="bg-white rounded-xl p-5 border border-gray-100 relative overflow-hidden"
            >
              <div 
                className="absolute top-0 left-0 w-full h-1"
                style={{ backgroundColor: medals[index] }}
              />
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: medals[index] }}
                >
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-semibold text-[#F59E0B]">#{club.rank}</span>
                  <h4 className="font-semibold text-[#1A1A1A] text-sm leading-tight">{club.name}</h4>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="font-bold text-[#1E3A5F]">{club.events}</p>
                  <p className="text-xs text-[#6B7280]">Events</p>
                </div>
                <div>
                  <p className="font-bold text-[#DC2626]">{club.donations.toLocaleString()}</p>
                  <p className="text-xs text-[#6B7280]">Donations</p>
                </div>
                <div>
                  <p className="font-bold text-[#F59E0B]">{club.members.toLocaleString()}</p>
                  <p className="text-xs text-[#6B7280]">Members</p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Remaining fan clubs */}
      <div className="space-y-3">
        {fanClubLeaderboardData.slice(3).map((club, index) => (
          <motion.div
            key={club.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45 + index * 0.1 }}
            className="flex items-center gap-4 bg-white rounded-lg p-4 border border-gray-100"
          >
            <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-[#6B7280]">
              {club.rank}
            </span>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F59E0B] to-[#DC2626] flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-[#1A1A1A] text-sm">{club.name}</h4>
              <p className="text-xs text-[#6B7280]">{club.members.toLocaleString()} members</p>
            </div>
            <div className="flex gap-4 text-sm">
              <div className="text-center">
                <p className="font-semibold text-[#1E3A5F]">{club.events}</p>
                <p className="text-xs text-[#6B7280]">Events</p>
              </div>
              <div className="text-center">
                <p className="font-semibold text-[#DC2626]">{club.donations.toLocaleString()}</p>
                <p className="text-xs text-[#6B7280]">Donations</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

// Main Donor Wall Page Component
export function DonorWallPage() {
  const [donors, setDonors] = useState(initialDonors)
  const [activeTab, setActiveTab] = useState<"city" | "individual" | "fanclub">("city")
  const [newDonorIndex, setNewDonorIndex] = useState(0)
  const [newestDonorId, setNewestDonorId] = useState<number | null>(null)
  const feedRef = useRef<HTMLDivElement>(null)

  // Simulate new donations appearing
  useEffect(() => {
    const interval = setInterval(() => {
      const newDonor = {
        ...newDonorPool[newDonorIndex % newDonorPool.length],
        id: Date.now(),
        timeAgo: "Just now",
        donationCount: Math.floor(Math.random() * 10) + 1,
      }
      
      setNewestDonorId(newDonor.id)
      setDonors(prev => [newDonor, ...prev.slice(0, 24)])
      setNewDonorIndex(prev => prev + 1)

      // Clear the "new" indicator after animation
      setTimeout(() => setNewestDonorId(null), 3000)
    }, 8000)

    return () => clearInterval(interval)
  }, [newDonorIndex])

  const loadMore = () => {
    const moreDonors = initialDonors.map((donor, index) => ({
      ...donor,
      id: Date.now() + index,
      timeAgo: `${Math.floor(Math.random() * 30) + 7} days ago`,
    }))
    setDonors(prev => [...prev, ...moreDonors.slice(0, 10)])
  }

  const tabs = [
    { id: "city" as const, label: "City Leaderboard", icon: MapPin },
    { id: "individual" as const, label: "Individual Leaderboard", icon: Trophy },
    { id: "fanclub" as const, label: "Fan Club Leaderboard", icon: Users },
  ]

  return (
    <div className="min-h-screen bg-[#FFF7ED]">
      {/* Donor Wall Section */}
      <section className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#F59E0B]/20 text-[#F59E0B] rounded-full text-sm font-medium mb-4"
            >
              <Sparkles className="w-4 h-4" />
              Hall of Heroes
            </motion.div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4">
              Wall of Heroes
            </h1>
            <p className="text-[#6B7280] text-lg max-w-xl mx-auto">
              Every donation writes a story of hope. Join our community of lifesavers.
            </p>
          </motion.div>

          {/* Live indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#DC2626] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#DC2626]"></span>
            </span>
            <span className="text-sm text-[#6B7280]">Live donations feed</span>
          </motion.div>

          {/* Donor feed */}
          <div ref={feedRef} className="space-y-4 mb-8">
            <AnimatePresence mode="popLayout">
              {donors.map((donor) => (
                <DonorCard 
                  key={donor.id} 
                  donor={donor} 
                  isNew={donor.id === newestDonorId}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Load more button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={loadMore}
              className="px-8 py-3 bg-white border-2 border-[#DC2626] text-[#DC2626] rounded-full font-semibold hover:bg-[#DC2626] hover:text-white transition-colors"
            >
              Load More Heroes
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Decorative divider */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="relative py-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#F59E0B]/30"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-[#FFF7ED] px-6 flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#DC2626]" />
              <Trophy className="w-6 h-6 text-[#F59E0B]" />
              <Heart className="w-5 h-5 text-[#DC2626]" />
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboards Section */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
              Leaderboards
            </h2>
            <p className="text-[#6B7280] max-w-xl mx-auto">
              Celebrating our top contributors and communities making a difference.
            </p>
          </motion.div>

          {/* Tab navigation */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-gray-100 rounded-full p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                    activeTab === tab.id ? "text-white" : "text-[#6B7280] hover:text-[#1A1A1A]"
                  }`}
                >
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-[#DC2626] rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative flex items-center gap-2">
                    <tab.icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            {activeTab === "city" && <CityLeaderboard key="city" />}
            {activeTab === "individual" && <IndividualLeaderboard key="individual" />}
            {activeTab === "fanclub" && <FanClubLeaderboard key="fanclub" />}
          </AnimatePresence>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-gradient-to-r from-[#DC2626] to-[#1E3A5F]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Join Our Wall of Heroes?
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Your donation could be the next one to appear on our live feed. Start your journey today.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-[#DC2626] rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <span className="flex items-center gap-2">
                <Droplet className="w-5 h-5" />
                Register as a Donor
              </span>
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
