"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  LayoutDashboard, Users, Heart, Calendar, Droplet, Shield, 
  MessageSquare, FileText, Settings, Bell, ChevronLeft, ChevronRight,
  Download, TrendingUp, TrendingDown, Minus, Menu, X,
  User, Clock, DollarSign, Activity
} from "lucide-react"

// Admin Sidebar Component
function AdminSidebar({ 
  collapsed, 
  setCollapsed, 
  activeItem, 
  setActiveItem,
  mobileOpen,
  setMobileOpen
}: { 
  collapsed: boolean
  setCollapsed: (v: boolean) => void
  activeItem: string
  setActiveItem: (v: string) => void
  mobileOpen: boolean
  setMobileOpen: (v: boolean) => void
}) {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "donors", label: "Donors", icon: Users },
    { id: "campaigns", label: "Campaigns", icon: Heart },
    { id: "events", label: "Events", icon: Calendar },
    { id: "blood-inventory", label: "Blood Inventory", icon: Droplet },
    { id: "moderation", label: "Moderation", icon: Shield },
    { id: "communications", label: "Communications", icon: MessageSquare },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ 
          width: collapsed ? 80 : 240,
          x: mobileOpen ? 0 : (typeof window !== 'undefined' && window.innerWidth < 1024 ? -240 : 0)
        }}
        className={`fixed top-0 left-0 h-full bg-[#1E3A5F] z-50 flex flex-col
          lg:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        style={{ width: collapsed ? 80 : 240 }}
      >
        {/* Logo */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <div className="w-8 h-8 bg-[#DC2626] rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-white text-lg">CCT Admin</span>
              </motion.div>
            )}
          </AnimatePresence>
          {collapsed && (
            <div className="w-8 h-8 bg-[#DC2626] rounded-lg flex items-center justify-center mx-auto">
              <Heart className="w-5 h-5 text-white" />
            </div>
          )}
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden text-white/70 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeItem === item.id
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveItem(item.id)
                  setMobileOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all relative
                  ${isActive 
                    ? 'bg-white/10 text-white' 
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-[#DC2626]"
                  />
                )}
                <Icon className="w-5 h-5 shrink-0" />
                <AnimatePresence mode="wait">
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      className="font-medium whitespace-nowrap overflow-hidden"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            )
          })}
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F59E0B] to-[#DC2626] flex items-center justify-center text-white font-bold shrink-0">
              L
            </div>
            <AnimatePresence mode="wait">
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="overflow-hidden"
                >
                  <p className="text-white font-medium text-sm">Lakshmi</p>
                  <p className="text-white/50 text-xs">Super Admin</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 bg-[#1E3A5F] border border-white/20 rounded-full items-center justify-center text-white/70 hover:text-white"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </motion.aside>
    </>
  )
}

// Animated Counter Hook
function useAnimatedCounter(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    let startTime: number
    let animationFrame: number
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }
    
    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration])
  
  return count
}

// Summary Card Component
function SummaryCard({ 
  icon: Icon, 
  label, 
  value, 
  trend, 
  trendValue,
  sparklineData,
  delay = 0
}: { 
  icon: React.ElementType
  label: string
  value: number
  trend: "up" | "down" | "neutral"
  trendValue: string
  sparklineData: number[]
  delay?: number
}) {
  const animatedValue = useAnimatedCounter(value)
  
  const formatNumber = (num: number) => {
    if (num >= 100000) return `${(num / 100000).toFixed(1)}L`
    if (num >= 1000) return num.toLocaleString('en-IN')
    return num.toString()
  }

  // Generate sparkline path
  const maxVal = Math.max(...sparklineData)
  const minVal = Math.min(...sparklineData)
  const range = maxVal - minVal || 1
  const points = sparklineData.map((val, i) => {
    const x = (i / (sparklineData.length - 1)) * 80
    const y = 24 - ((val - minVal) / range) * 20
    return `${x},${y}`
  }).join(' ')

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-lg bg-[#DC2626]/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-[#DC2626]" />
        </div>
        <svg width="80" height="28" className="opacity-50">
          <motion.polyline
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: delay + 0.5 }}
            points={points}
            fill="none"
            stroke={trend === "up" ? "#22C55E" : trend === "down" ? "#EF4444" : "#6B7280"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <div className="flex items-end gap-2">
        <span className="text-2xl font-bold text-[#1A1A1A]">
          {label.includes("Funds") ? `₹${formatNumber(animatedValue)}` : formatNumber(animatedValue)}
        </span>
        <div className={`flex items-center gap-1 text-sm ${
          trend === "up" ? "text-green-600" : trend === "down" ? "text-red-600" : "text-gray-500"
        }`}>
          {trend === "up" && <TrendingUp className="w-4 h-4" />}
          {trend === "down" && <TrendingDown className="w-4 h-4" />}
          {trend === "neutral" && <Minus className="w-4 h-4" />}
          <span>{trendValue}</span>
        </div>
      </div>
    </motion.div>
  )
}

// Donor Funnel Component
function DonorFunnel() {
  const stages = [
    { label: "Registered", count: 15420, percent: null },
    { label: "First Donation", count: 8200, percent: 53 },
    { label: "Second Donation", count: 4100, percent: 50 },
    { label: "Repeat Donor (4+)", count: 1800, percent: 44 },
  ]

  const maxCount = stages[0].count

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
    >
      <h3 className="font-semibold text-[#1A1A1A] mb-6">Donor Funnel</h3>
      <div className="space-y-4">
        {stages.map((stage, index) => (
          <div key={stage.label} className="relative">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">{stage.label}</span>
              <span className="text-sm text-gray-500">
                {stage.count.toLocaleString('en-IN')}
                {stage.percent && <span className="text-xs ml-1">({stage.percent}%)</span>}
              </span>
            </div>
            <div className="h-8 bg-gray-100 rounded-lg overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(stage.count / maxCount) * 100}%` }}
                transition={{ duration: 0.8, delay: 0.4 + index * 0.15 }}
                className="h-full bg-gradient-to-r from-[#DC2626] to-[#F59E0B] rounded-lg"
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

// Monthly Trends Chart Component
function MonthlyTrendsChart() {
  const months = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr"]
  const registrations = [800, 1100, 1400, 1650, 1900, 2100]
  const donations = [600, 750, 900, 1050, 1150, 1247]
  
  const maxVal = Math.max(...registrations, ...donations)
  const chartHeight = 200
  const chartWidth = 500
  
  const getPath = (data: number[]) => {
    const points = data.map((val, i) => {
      const x = (i / (data.length - 1)) * (chartWidth - 60) + 30
      const y = chartHeight - 40 - ((val / maxVal) * (chartHeight - 60))
      return { x, y }
    })
    return `M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
    >
      <h3 className="font-semibold text-[#1A1A1A] mb-6">Monthly Trends</h3>
      <div className="relative">
        <svg width="100%" height={chartHeight} viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="xMidYMid meet">
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={i}
              x1="30"
              y1={chartHeight - 40 - (i * (chartHeight - 60) / 4)}
              x2={chartWidth - 30}
              y2={chartHeight - 40 - (i * (chartHeight - 60) / 4)}
              stroke="#E5E7EB"
              strokeDasharray="4"
            />
          ))}
          
          {/* Registrations line */}
          <motion.path
            d={getPath(registrations)}
            fill="none"
            stroke="#1E3A5F"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
          
          {/* Donations line */}
          <motion.path
            d={getPath(donations)}
            fill="none"
            stroke="#DC2626"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.7 }}
          />
          
          {/* X-axis labels */}
          {months.map((month, i) => (
            <text
              key={month}
              x={(i / (months.length - 1)) * (chartWidth - 60) + 30}
              y={chartHeight - 10}
              textAnchor="middle"
              className="text-xs fill-gray-500"
            >
              {month}
            </text>
          ))}
        </svg>
        
        {/* Legend */}
        <div className="flex items-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#1E3A5F]" />
            <span className="text-sm text-gray-600">Registrations</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#DC2626]" />
            <span className="text-sm text-gray-600">Donations</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Campaign Performance Table Component
function CampaignPerformanceTable() {
  const [sortBy, setSortBy] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')

  const campaigns = [
    { name: "Platelet Separator Fund", institution: "Gandhi Hospital", goal: 500000, raised: 425000, status: "active", daysLeft: 18 },
    { name: "Tirupati Thalassemia Care", institution: "TTD Hospital", goal: 800000, raised: 780000, status: "closing", daysLeft: 3 },
    { name: "Guntur Blood Bank Upgrade", institution: "GGH Guntur", goal: 300000, raised: 300000, status: "completed", daysLeft: 0 },
    { name: "Vijayawada Mobile Unit", institution: "Red Cross VJA", goal: 600000, raised: 340000, status: "active", daysLeft: 45 },
    { name: "NIMS Equipment Fund", institution: "NIMS Hyderabad", goal: 1000000, raised: 520000, status: "active", daysLeft: 32 },
  ]

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortDir('desc')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
    >
      <div className="p-6 border-b border-gray-100">
        <h3 className="font-semibold text-[#1A1A1A]">Campaign Performance</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {["Campaign Name", "Institution", "Goal", "Raised", "Progress", "Status", "Days Left"].map((header) => (
                <th
                  key={header}
                  onClick={() => handleSort(header.toLowerCase())}
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {campaigns.map((campaign, index) => {
              const progress = (campaign.raised / campaign.goal) * 100
              return (
                <motion.tr
                  key={campaign.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-4 text-sm font-medium text-[#1A1A1A]">{campaign.name}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{campaign.institution}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">₹{(campaign.goal / 1000).toFixed(0)}K</td>
                  <td className="px-4 py-4 text-sm text-gray-600">₹{(campaign.raised / 1000).toFixed(0)}K</td>
                  <td className="px-4 py-4">
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(progress, 100)}%` }}
                        transition={{ duration: 0.8, delay: 0.7 + index * 0.1 }}
                        className="h-full bg-[#DC2626] rounded-full"
                      />
                    </div>
                    <span className="text-xs text-gray-500 mt-1">{progress.toFixed(0)}%</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      campaign.status === 'active' ? 'bg-green-100 text-green-700' :
                      campaign.status === 'closing' ? 'bg-amber-100 text-amber-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {campaign.status === 'active' ? 'Active' : 
                       campaign.status === 'closing' ? 'Closing Soon' : 'Completed'}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">{campaign.daysLeft}</td>
                </motion.tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}

// City Heatmap Component
function CityHeatmap() {
  const cities = [
    { name: "Hyderabad", donors: 4200, donations: 8500, funds: 850000 },
    { name: "Vijayawada", donors: 2800, donations: 5200, funds: 520000 },
    { name: "Tirupati", donors: 1900, donations: 3800, funds: 380000 },
    { name: "Visakhapatnam", donors: 2100, donations: 4100, funds: 410000 },
    { name: "Guntur", donors: 1500, donations: 2900, funds: 290000 },
    { name: "Warangal", donors: 1100, donations: 2100, funds: 210000 },
    { name: "Nellore", donors: 800, donations: 1500, funds: 150000 },
    { name: "Kurnool", donors: 650, donations: 1200, funds: 120000 },
    { name: "Rajahmundry", donors: 720, donations: 1400, funds: 140000 },
    { name: "Kakinada", donors: 580, donations: 1100, funds: 110000 },
  ]

  const maxDonations = Math.max(...cities.map(c => c.donations))
  const [hoveredCity, setHoveredCity] = useState<string | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
    >
      <h3 className="font-semibold text-[#1A1A1A] mb-6">City-wise Activity</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {cities.map((city, index) => {
          const intensity = city.donations / maxDonations
          const bgColor = `rgba(220, 38, 38, ${0.1 + intensity * 0.5})`
          const isHovered = hoveredCity === city.name
          
          return (
            <motion.div
              key={city.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ 
                opacity: 1, 
                scale: isHovered ? 1.05 : 1,
                y: isHovered ? -5 : 0
              }}
              transition={{ delay: 0.7 + index * 0.05 }}
              onMouseEnter={() => setHoveredCity(city.name)}
              onMouseLeave={() => setHoveredCity(null)}
              className="relative p-4 rounded-xl cursor-pointer transition-shadow"
              style={{ backgroundColor: bgColor }}
            >
              <p className="font-medium text-sm text-[#1A1A1A]">{city.name}</p>
              <p className="text-xs text-gray-600">{city.donations.toLocaleString('en-IN')} donations</p>
              
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-1/2 -translate-x-1/2 -bottom-24 z-10 bg-[#1E3A5F] text-white p-3 rounded-lg shadow-lg text-xs whitespace-nowrap"
                  >
                    <p className="font-medium mb-1">{city.name}</p>
                    <p>Donors: {city.donors.toLocaleString('en-IN')}</p>
                    <p>Donations: {city.donations.toLocaleString('en-IN')}</p>
                    <p>Funds: ₹{(city.funds / 1000).toFixed(0)}K</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

// Recent Activity Feed Component
function RecentActivityFeed() {
  const [activities, setActivities] = useState([
    { type: "donor", message: "New donor registered: Priya R., Hyderabad", time: "5 min ago" },
    { type: "campaign", message: "Campaign contribution: ₹1,000 to Platelet Separator", time: "12 min ago" },
    { type: "inventory", message: "Blood inventory updated: Red Cross Blood Bank", time: "20 min ago" },
    { type: "event", message: "Event registration: Mega Blood Drive — slot #359", time: "25 min ago" },
    { type: "donor", message: "New donor registered: Venkat K., Vijayawada", time: "32 min ago" },
  ])

  const newActivityTemplates = [
    { type: "donor", message: "New donor registered: Ramesh S., Tirupati" },
    { type: "campaign", message: "Campaign contribution: ₹500 to Guntur Blood Bank" },
    { type: "event", message: "Event registration: Campus Blood Drive — slot #124" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      const template = newActivityTemplates[Math.floor(Math.random() * newActivityTemplates.length)]
      const newActivity = { ...template, time: "Just now" }
      setActivities(prev => [newActivity, ...prev.slice(0, 4)])
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const getIcon = (type: string) => {
    switch (type) {
      case "donor": return <User className="w-4 h-4 text-green-600" />
      case "campaign": return <DollarSign className="w-4 h-4 text-amber-600" />
      case "inventory": return <Droplet className="w-4 h-4 text-red-600" />
      case "event": return <Calendar className="w-4 h-4 text-blue-600" />
      default: return <Activity className="w-4 h-4 text-gray-600" />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-[#1A1A1A]">Recent Activity</h3>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs text-gray-500">Live</span>
        </div>
      </div>
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {activities.map((activity, index) => (
            <motion.div
              key={`${activity.message}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              layout
              className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
            >
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0">
                {getIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-700 line-clamp-2">{activity.message}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Clock className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-400">{activity.time}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

// Main Admin Dashboard Component
export function AdminDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeItem, setActiveItem] = useState("dashboard")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dateRange, setDateRange] = useState("30days")
  const [notificationCount] = useState(5)

  const dateRanges = [
    { id: "7days", label: "Last 7 days" },
    { id: "30days", label: "Last 30 days" },
    { id: "90days", label: "Last 90 days" },
    { id: "custom", label: "Custom" },
  ]

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
      {/* Sidebar */}
      <AdminSidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        mobileOpen={mobileMenuOpen}
        setMobileOpen={setMobileMenuOpen}
      />

      {/* Main Content */}
      <div 
        className="transition-all duration-300"
        style={{ marginLeft: typeof window !== 'undefined' && window.innerWidth >= 1024 ? (sidebarCollapsed ? 80 : 240) : 0 }}
      >
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
              <h1 className="text-xl font-bold text-[#1A1A1A]">Dashboard</h1>
            </div>

            <div className="flex items-center gap-4">
              {/* Date Range Picker */}
              <div className="hidden sm:flex items-center bg-gray-100 rounded-lg p-1">
                {dateRanges.map((range) => (
                  <button
                    key={range.id}
                    onClick={() => setDateRange(range.id)}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                      dateRange === range.id
                        ? 'bg-white text-[#1A1A1A] shadow-sm'
                        : 'text-gray-600 hover:text-[#1A1A1A]'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>

              {/* Export Button */}
              <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#1E3A5F] text-white rounded-lg hover:bg-[#1E3A5F]/90 transition-colors">
                <Download className="w-4 h-4" />
                <span className="text-sm font-medium">Export</span>
              </button>

              {/* Notification Bell */}
              <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                <Bell className="w-5 h-5 text-gray-600" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#DC2626] text-white text-xs rounded-full flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-4 lg:p-8">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <SummaryCard
              icon={Users}
              label="Total Donors"
              value={15420}
              trend="up"
              trendValue="+12%"
              sparklineData={[12000, 12800, 13200, 14100, 14800, 15420]}
              delay={0}
            />
            <SummaryCard
              icon={Droplet}
              label="Donations This Month"
              value={1247}
              trend="up"
              trendValue="+8%"
              sparklineData={[950, 1020, 1080, 1150, 1200, 1247]}
              delay={0.1}
            />
            <SummaryCard
              icon={DollarSign}
              label="Funds Raised (MTD)"
              value={1480000}
              trend="up"
              trendValue="+23%"
              sparklineData={[800000, 950000, 1100000, 1250000, 1380000, 1480000]}
              delay={0.2}
            />
            <SummaryCard
              icon={Heart}
              label="Active Campaigns"
              value={12}
              trend="neutral"
              trendValue="0%"
              sparklineData={[10, 11, 12, 11, 12, 12]}
              delay={0.3}
            />
          </div>

          {/* Funnel and Chart Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <DonorFunnel />
            <MonthlyTrendsChart />
          </div>

          {/* Campaign Table */}
          <div className="mb-8">
            <CampaignPerformanceTable />
          </div>

          {/* Heatmap and Activity Feed Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <CityHeatmap />
            </div>
            <RecentActivityFeed />
          </div>
        </main>
      </div>
    </div>
  )
}
