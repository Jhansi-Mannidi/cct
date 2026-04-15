"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { 
  Droplet, 
  MapPin, 
  Phone, 
  Clock, 
  ExternalLink, 
  Navigation, 
  AlertTriangle,
  ArrowRight,
  X,
  Bell,
  CheckCircle,
  Map,
  List,
  ChevronDown,
  RefreshCw
} from "lucide-react"
import { CCTButton } from "./button"

// Blood group types
const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] as const
type BloodGroup = typeof BLOOD_GROUPS[number]

// Cities in AP & Telangana
const CITIES = [
  "All Cities",
  "Hyderabad",
  "Vijayawada", 
  "Guntur",
  "Tirupati",
  "Visakhapatnam",
  "Kakinada",
  "Warangal"
]

// Distance options
const DISTANCE_OPTIONS = [
  { label: "Any Distance", value: 0 },
  { label: "Within 5 km", value: 5 },
  { label: "Within 10 km", value: 10 },
  { label: "Within 25 km", value: 25 },
  { label: "Within 50 km", value: 50 },
]

// Sort options
const SORT_OPTIONS = [
  { label: "Distance (Nearest)", value: "distance" },
  { label: "Name (A-Z)", value: "name" },
  { label: "Most Critical Stock", value: "critical" },
]

// Status thresholds
const getStatus = (units: number): "critical" | "low" | "sufficient" => {
  if (units < 10) return "critical"
  if (units <= 30) return "low"
  return "sufficient"
}

// Mock blood bank data
const bloodBanksData = [
  {
    id: 1,
    name: "Red Cross Blood Bank",
    hospital: "NIMS Hospital",
    city: "Hyderabad",
    address: "Punjagutta, Hyderabad, Telangana 500082",
    phone: "+91 40 2346 7890",
    hours: "Open 24/7",
    distance: 2.1,
    lastUpdated: "10 mins ago",
    stocks: {
      "A+": 45, "A-": 8, "B+": 32, "B-": 3, "AB+": 18, "AB-": 5, "O+": 52, "O-": 2
    }
  },
  {
    id: 2,
    name: "Gandhi Hospital Blood Centre",
    hospital: "Gandhi Hospital",
    city: "Hyderabad",
    address: "Musheerabad, Secunderabad, Telangana 500003",
    phone: "+91 40 2770 1234",
    hours: "8 AM - 8 PM",
    distance: 5.8,
    lastUpdated: "5 mins ago",
    stocks: {
      "A+": 28, "A-": 12, "B+": 15, "B-": 9, "AB+": 22, "AB-": 11, "O+": 35, "O-": 7
    }
  },
  {
    id: 3,
    name: "NTR Blood Bank",
    hospital: "Vijayawada Govt Hospital",
    city: "Vijayawada",
    address: "MG Road, Vijayawada, Andhra Pradesh 520002",
    phone: "+91 866 257 8900",
    hours: "Open 24/7",
    distance: 280,
    lastUpdated: "15 mins ago",
    stocks: {
      "A+": 60, "A-": 20, "B+": 44, "B-": 16, "AB+": 38, "AB-": 14, "O+": 55, "O-": 12
    }
  },
  {
    id: 4,
    name: "SVR Blood Centre",
    hospital: "SVR Ruia Hospital",
    city: "Tirupati",
    address: "Railway Station Road, Tirupati, AP 517501",
    phone: "+91 877 228 7654",
    hours: "9 AM - 6 PM",
    distance: 550,
    lastUpdated: "20 mins ago",
    stocks: {
      "A+": 35, "A-": 6, "B+": 28, "B-": 11, "AB+": 15, "AB-": 4, "O+": 42, "O-": 8
    }
  },
  {
    id: 5,
    name: "KGH Blood Bank",
    hospital: "King George Hospital",
    city: "Visakhapatnam",
    address: "Maharanipeta, Visakhapatnam, AP 530002",
    phone: "+91 891 256 7890",
    hours: "Open 24/7",
    distance: 620,
    lastUpdated: "8 mins ago",
    stocks: {
      "A+": 50, "A-": 15, "B+": 38, "B-": 7, "AB+": 25, "AB-": 9, "O+": 48, "O-": 5
    }
  }
]

// Status badge config
const statusConfig = {
  critical: {
    bg: "bg-red-100",
    text: "text-red-700",
    border: "border-red-200",
    glow: "shadow-red-500/20",
    label: "Critical"
  },
  low: {
    bg: "bg-amber-100",
    text: "text-amber-700",
    border: "border-amber-200",
    glow: "shadow-amber-500/20",
    label: "Low"
  },
  sufficient: {
    bg: "bg-green-100",
    text: "text-green-700",
    border: "border-green-200",
    glow: "shadow-green-500/20",
    label: "Sufficient"
  }
}

// Animated counter component
function AnimatedCounter({ value, duration = 1 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    
    let startTime: number
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      setCount(Math.floor(progress * value))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [isInView, value, duration])

  return <span ref={ref}>{count}</span>
}

// Blood Group Selector Button
function BloodGroupButton({ 
  type, 
  selected, 
  onSelect 
}: { 
  type: BloodGroup | "All"
  selected: boolean
  onSelect: () => void 
}) {
  return (
    <motion.button
      onClick={onSelect}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative"
    >
      <motion.div
        className={`
          w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-colors
          ${selected 
            ? "bg-[#DC2626] text-white" 
            : "bg-white text-[#1A1A1A] border-2 border-gray-200 hover:border-[#DC2626]"
          }
        `}
        animate={selected ? { scale: 1.1 } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {type}
      </motion.div>
      {selected && (
        <motion.div
          layoutId="blood-group-ring"
          className="absolute inset-0 rounded-full ring-4 ring-[#DC2626]/30"
          initial={false}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
    </motion.button>
  )
}

// Blood Stock Cell
function BloodStockCell({ 
  type, 
  units, 
  highlighted 
}: { 
  type: BloodGroup
  units: number
  highlighted: boolean 
}) {
  const status = getStatus(units)
  const config = statusConfig[status]

  return (
    <motion.div
      className={`
        relative p-3 rounded-xl border text-center transition-all
        ${config.bg} ${config.border}
        ${highlighted ? "ring-2 ring-[#DC2626] ring-offset-2" : ""}
        ${!highlighted && status !== "critical" ? "opacity-50" : ""}
      `}
      animate={status === "critical" ? {
        boxShadow: [
          "0 0 0 0 rgba(220, 38, 38, 0)",
          "0 0 20px 5px rgba(220, 38, 38, 0.2)",
          "0 0 0 0 rgba(220, 38, 38, 0)"
        ]
      } : {}}
      transition={{ duration: 2, repeat: status === "critical" ? Infinity : 0 }}
    >
      <p className="text-xs font-medium text-[#6B7280] mb-1">{type}</p>
      <p className={`text-lg font-bold ${config.text}`}>{units}</p>
      <span className={`
        inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase
        ${config.bg} ${config.text}
      `}>
        {config.label}
      </span>
      {status === "critical" && (
        <motion.div
          className="absolute -top-1 -right-1"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <AlertTriangle className="w-4 h-4 text-red-500" />
        </motion.div>
      )}
    </motion.div>
  )
}

// Blood Bank Card
function BloodBankCard({ 
  bank, 
  selectedBloodGroup,
  index 
}: { 
  bank: typeof bloodBanksData[0]
  selectedBloodGroup: BloodGroup | "All"
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  const criticalCount = Object.values(bank.stocks).filter(u => getStatus(u) === "critical").length
  const lowCount = Object.values(bank.stocks).filter(u => getStatus(u) === "low").length

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-lg shadow-black/5 overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-serif text-xl font-bold text-[#1A1A1A]">
              {bank.name}
            </h3>
            <p className="text-sm text-[#6B7280]">{bank.hospital}</p>
          </div>
          <div className="flex items-center gap-2">
            {criticalCount > 0 && (
              <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                {criticalCount} Critical
              </span>
            )}
            {lowCount > 0 && (
              <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">
                {lowCount} Low
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center gap-2 text-[#6B7280]">
            <MapPin className="w-4 h-4 text-[#DC2626]" />
            <span>{bank.city}</span>
          </div>
          <div className="flex items-center gap-2 text-[#6B7280]">
            <Navigation className="w-4 h-4 text-[#1E3A5F]" />
            <span>{bank.distance < 100 ? `${bank.distance} km away` : `${bank.distance} km`}</span>
          </div>
          <div className="flex items-center gap-2 text-[#6B7280]">
            <Clock className="w-4 h-4 text-green-600" />
            <span>{bank.hours}</span>
          </div>
          <a 
            href={`tel:${bank.phone}`}
            className="flex items-center gap-2 text-[#1E3A5F] hover:text-[#DC2626] transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span className="underline">{bank.phone}</span>
          </a>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <p className="text-xs text-[#6B7280]">{bank.address}</p>
          <a 
            href={`https://maps.google.com/?q=${encodeURIComponent(bank.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-[#1E3A5F] hover:text-[#DC2626] transition-colors"
          >
            Get Directions
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Blood Groups Grid */}
      <div className="p-6">
        <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
          {BLOOD_GROUPS.map((type) => (
            <BloodStockCell
              key={type}
              type={type}
              units={bank.stocks[type]}
              highlighted={selectedBloodGroup === "All" || selectedBloodGroup === type}
            />
          ))}
        </div>
        <p className="text-xs text-[#6B7280] mt-4 text-right">
          Last updated: {bank.lastUpdated}
        </p>
      </div>
    </motion.div>
  )
}

// Map Placeholder View
function MapView({ banks }: { banks: typeof bloodBanksData }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-[#1E3A5F]/5 rounded-2xl h-[500px] flex items-center justify-center relative overflow-hidden"
    >
      {/* Map placeholder with animated pins */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1E3A5F]/10 to-[#1E3A5F]/20" />
      
      {/* Simulated map pins */}
      {banks.map((bank, index) => (
        <motion.div
          key={bank.id}
          className="absolute"
          style={{
            left: `${20 + (index * 15)}%`,
            top: `${30 + (index % 3) * 20}%`
          }}
          initial={{ scale: 0, y: -20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ delay: index * 0.1, type: "spring" }}
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
            className="relative"
          >
            <div className="w-8 h-8 bg-[#DC2626] rounded-full flex items-center justify-center shadow-lg">
              <Droplet className="w-4 h-4 text-white" />
            </div>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#DC2626] rotate-45" />
          </motion.div>
        </motion.div>
      ))}

      <div className="relative text-center z-10">
        <Map className="w-16 h-16 text-[#1E3A5F] mx-auto mb-4 opacity-50" />
        <p className="text-[#1E3A5F] font-medium">Interactive Map View</p>
        <p className="text-sm text-[#6B7280]">Showing {banks.length} blood banks</p>
      </div>
    </motion.div>
  )
}

// Alert Subscription Form
function AlertSubscription() {
  const [phone, setPhone] = useState("")
  const [bloodType, setBloodType] = useState<BloodGroup | "">("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (phone && bloodType) {
      setSubscribed(true)
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-[#1E3A5F] rounded-3xl p-8 md:p-12 text-white"
    >
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          <Bell className="w-12 h-12 mx-auto mb-4 text-[#F59E0B]" />
        </motion.div>
        <h3 className="font-serif text-2xl md:text-3xl font-bold mb-4">
          Get Stock Alerts
        </h3>
        <p className="text-white/70 mb-8">
          Get notified when your required blood type becomes available near you.
        </p>

        <AnimatePresence mode="wait">
          {subscribed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex items-center justify-center gap-3 py-4"
            >
              <CheckCircle className="w-8 h-8 text-green-400" />
              <span className="text-lg font-medium">You&apos;re subscribed! We&apos;ll notify you.</span>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="flex flex-col md:flex-row gap-4"
            >
              <div className="flex-1">
                <select
                  value={bloodType}
                  onChange={(e) => setBloodType(e.target.value as BloodGroup)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20 outline-none transition-all"
                >
                  <option value="" className="text-[#1A1A1A]">Select Blood Type</option>
                  {BLOOD_GROUPS.map(type => (
                    <option key={type} value={type} className="text-[#1A1A1A]">{type}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter phone number"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20 outline-none transition-all"
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 bg-[#F59E0B] text-[#1A1A1A] font-semibold rounded-xl hover:bg-[#D97706] transition-colors"
              >
                Subscribe
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

// Main Dashboard Component
export function BloodBankDashboard() {
  const [selectedBloodGroup, setSelectedBloodGroup] = useState<BloodGroup | "All">("All")
  const [selectedCity, setSelectedCity] = useState("All Cities")
  const [selectedDistance, setSelectedDistance] = useState(0)
  const [sortBy, setSortBy] = useState("distance")
  const [viewMode, setViewMode] = useState<"list" | "map">("list")
  const [lastSynced] = useState("15 minutes ago")

  // Filter and sort blood banks
  const filteredBanks = bloodBanksData
    .filter(bank => {
      if (selectedCity !== "All Cities" && bank.city !== selectedCity) return false
      if (selectedDistance > 0 && bank.distance > selectedDistance) return false
      return true
    })
    .sort((a, b) => {
      if (sortBy === "distance") return a.distance - b.distance
      if (sortBy === "name") return a.name.localeCompare(b.name)
      if (sortBy === "critical") {
        const aCritical = Object.values(a.stocks).filter(u => getStatus(u) === "critical").length
        const bCritical = Object.values(b.stocks).filter(u => getStatus(u) === "critical").length
        return bCritical - aCritical
      }
      return 0
    })

  // Calculate summary stats
  const totalCritical = filteredBanks.reduce((acc, bank) => 
    acc + Object.values(bank.stocks).filter(u => getStatus(u) === "critical").length, 0
  )
  const totalSufficient = filteredBanks.reduce((acc, bank) => 
    acc + Object.values(bank.stocks).filter(u => getStatus(u) === "sufficient").length, 0
  )

  const clearFilters = () => {
    setSelectedBloodGroup("All")
    setSelectedCity("All Cities")
    setSelectedDistance(0)
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Page Header */}
      <div className="bg-[#1E3A5F] pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
              Blood Bank Inventory
            </h1>
            <p className="text-xl text-white/70 mb-4">
              Real-time stock levels across CCT partner hospitals
            </p>
            <div className="flex items-center justify-center gap-2 text-white/60 text-sm">
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-green-400 rounded-full"
              />
              Last synced: {lastSynced}
              <button className="ml-2 p-1 hover:bg-white/10 rounded-lg transition-colors">
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Emergency CTA Bar */}
      <div className="relative -mt-6 mx-4 md:mx-auto max-w-5xl z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 rounded-2xl"
            animate={{
              background: [
                "linear-gradient(90deg, #DC2626 0%, #B91C1C 50%, #DC2626 100%)",
                "linear-gradient(90deg, #B91C1C 0%, #DC2626 50%, #B91C1C 100%)",
                "linear-gradient(90deg, #DC2626 0%, #B91C1C 50%, #DC2626 100%)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <div className="relative bg-gradient-to-r from-[#DC2626] to-[#B91C1C] rounded-2xl p-4 md:p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <AlertTriangle className="w-8 h-8 text-white" />
              </motion.div>
              <div>
                <p className="text-white font-semibold text-lg">Need blood urgently?</p>
                <p className="text-white/80 text-sm">Submit a request and we&apos;ll help you find donors</p>
              </div>
            </div>
            <CCTButton variant="secondary" className="bg-white text-[#DC2626] hover:bg-white/90">
              Request Blood
              <ArrowRight className="w-4 h-4 ml-2" />
            </CCTButton>
          </div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg shadow-black/5 p-6 mb-8"
        >
          {/* Blood Group Selector */}
          <div className="mb-6">
            <p className="text-sm font-medium text-[#6B7280] mb-3">Filter by Blood Group</p>
            <div className="flex flex-wrap gap-3">
              <BloodGroupButton
                type="All"
                selected={selectedBloodGroup === "All"}
                onSelect={() => setSelectedBloodGroup("All")}
              />
              {BLOOD_GROUPS.map(type => (
                <BloodGroupButton
                  key={type}
                  type={type}
                  selected={selectedBloodGroup === type}
                  onSelect={() => setSelectedBloodGroup(type)}
                />
              ))}
            </div>
          </div>

          {/* Other Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* City Filter */}
            <div className="relative">
              <label className="text-xs font-medium text-[#6B7280] mb-1 block">City</label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#1E3A5F] focus:ring-2 focus:ring-[#1E3A5F]/20 outline-none transition-all appearance-none bg-white"
              >
                {CITIES.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-8 w-4 h-4 text-[#6B7280] pointer-events-none" />
            </div>

            {/* Distance Filter */}
            <div className="relative">
              <label className="text-xs font-medium text-[#6B7280] mb-1 block">Distance</label>
              <select
                value={selectedDistance}
                onChange={(e) => setSelectedDistance(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#1E3A5F] focus:ring-2 focus:ring-[#1E3A5F]/20 outline-none transition-all appearance-none bg-white"
              >
                {DISTANCE_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-8 w-4 h-4 text-[#6B7280] pointer-events-none" />
            </div>

            {/* Sort By */}
            <div className="relative">
              <label className="text-xs font-medium text-[#6B7280] mb-1 block">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#1E3A5F] focus:ring-2 focus:ring-[#1E3A5F]/20 outline-none transition-all appearance-none bg-white"
              >
                {SORT_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-8 w-4 h-4 text-[#6B7280] pointer-events-none" />
            </div>

            {/* Clear & View Toggle */}
            <div className="flex items-end gap-2">
              <button
                onClick={clearFilters}
                className="flex-1 px-4 py-2.5 text-[#6B7280] hover:text-[#DC2626] border border-gray-200 rounded-xl hover:border-[#DC2626] transition-colors text-sm font-medium"
              >
                Clear Filters
              </button>
              <div className="flex border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2.5 ${viewMode === "list" ? "bg-[#1E3A5F] text-white" : "text-[#6B7280] hover:bg-gray-100"} transition-colors`}
                >
                  <List className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("map")}
                  className={`p-2.5 ${viewMode === "map" ? "bg-[#1E3A5F] text-white" : "text-[#6B7280] hover:bg-gray-100"} transition-colors`}
                >
                  <Map className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Summary Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex gap-4 mb-8 overflow-x-auto pb-2 scrollbar-hide"
        >
          <div className="flex-shrink-0 bg-white rounded-xl px-6 py-4 shadow-sm border border-gray-100">
            <p className="text-sm text-[#6B7280]">Blood Banks</p>
            <p className="text-2xl font-bold text-[#1E3A5F]">
              <AnimatedCounter value={filteredBanks.length} /> shown
            </p>
          </div>
          <div className="flex-shrink-0 bg-red-50 rounded-xl px-6 py-4 shadow-sm border border-red-100">
            <p className="text-sm text-red-600">Critical Stock</p>
            <p className="text-2xl font-bold text-red-700">
              <AnimatedCounter value={totalCritical} /> units
            </p>
          </div>
          <div className="flex-shrink-0 bg-green-50 rounded-xl px-6 py-4 shadow-sm border border-green-100">
            <p className="text-sm text-green-600">Sufficient Stock</p>
            <p className="text-2xl font-bold text-green-700">
              <AnimatedCounter value={totalSufficient} /> units
            </p>
          </div>
        </motion.div>

        {/* Main Content - List or Map View */}
        <AnimatePresence mode="wait">
          {viewMode === "list" ? (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {filteredBanks.map((bank, index) => (
                <BloodBankCard
                  key={bank.id}
                  bank={bank}
                  selectedBloodGroup={selectedBloodGroup}
                  index={index}
                />
              ))}
              {filteredBanks.length === 0 && (
                <div className="text-center py-16">
                  <Droplet className="w-16 h-16 text-[#6B7280] mx-auto mb-4 opacity-30" />
                  <p className="text-[#6B7280] text-lg">No blood banks found with the selected filters.</p>
                  <button
                    onClick={clearFilters}
                    className="mt-4 text-[#DC2626] font-medium hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </motion.div>
          ) : (
            <MapView key="map" banks={filteredBanks} />
          )}
        </AnimatePresence>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-white rounded-xl p-4 border border-gray-100"
        >
          <p className="text-sm font-medium text-[#6B7280] mb-3">Stock Level Legend</p>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-3 h-3 bg-red-500 rounded-full"
              />
              <span className="text-sm text-[#6B7280]">Critical (&lt;10 units)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-amber-500 rounded-full" />
              <span className="text-sm text-[#6B7280]">Low (10-30 units)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full" />
              <span className="text-sm text-[#6B7280]">Sufficient (&gt;30 units)</span>
            </div>
          </div>
        </motion.div>

        {/* Alert Subscription */}
        <div className="mt-12">
          <AlertSubscription />
        </div>
      </div>
    </div>
  )
}
