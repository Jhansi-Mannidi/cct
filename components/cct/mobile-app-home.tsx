"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion"
import { 
  Droplet, 
  Heart, 
  Calendar, 
  User, 
  Bell, 
  Home,
  ChevronRight,
  Check,
  Gift,
  Zap,
  MapPin
} from "lucide-react"

// Stagger container for page load animation
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
}

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
}

// Status Bar Component
function StatusBar() {
  return (
    <div className="flex items-center justify-between px-6 py-2 text-[10px] text-gray-600">
      <span className="font-medium">9:41</span>
      <div className="flex items-center gap-1">
        <div className="flex gap-0.5">
          <div className="w-1 h-2.5 bg-gray-600 rounded-sm" />
          <div className="w-1 h-2 bg-gray-600 rounded-sm" />
          <div className="w-1 h-1.5 bg-gray-600 rounded-sm" />
          <div className="w-1 h-1 bg-gray-400 rounded-sm" />
        </div>
        <span className="ml-1">5G</span>
        <div className="ml-1 w-6 h-3 border border-gray-600 rounded-sm relative">
          <div className="absolute inset-0.5 right-1 bg-gray-600 rounded-sm" />
          <div className="absolute -right-0.5 top-1 w-0.5 h-1 bg-gray-600 rounded-r" />
        </div>
      </div>
    </div>
  )
}

// Quick Action Button
function QuickAction({ 
  icon: Icon, 
  label, 
  color, 
  bgColor,
  onTap 
}: { 
  icon: React.ElementType
  label: string
  color: string
  bgColor: string
  onTap: () => void
}) {
  const [isPressed, setIsPressed] = useState(false)

  return (
    <motion.button
      className={`flex flex-col items-center justify-center p-4 rounded-2xl ${bgColor} relative overflow-hidden`}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      onTapStart={() => setIsPressed(true)}
      onTap={() => {
        onTap()
        setTimeout(() => setIsPressed(false), 150)
      }}
      onTapCancel={() => setIsPressed(false)}
      // Long press wobble
      onMouseDown={(e) => {
        const timeout = setTimeout(() => {
          // Wobble animation handled by framer motion
        }, 500)
        const cleanup = () => clearTimeout(timeout)
        e.currentTarget.addEventListener('mouseup', cleanup, { once: true })
        e.currentTarget.addEventListener('mouseleave', cleanup, { once: true })
      }}
    >
      {/* Haptic flash effect */}
      <AnimatePresence>
        {isPressed && (
          <motion.div
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-white"
          />
        )}
      </AnimatePresence>
      <Icon className={`w-7 h-7 ${color} mb-2`} />
      <span className={`text-xs font-medium ${color}`}>{label}</span>
    </motion.button>
  )
}

// Eligibility Card Component
function EligibilityCard({ isEligible = false }: { isEligible?: boolean }) {
  const daysRemaining = 42
  const totalDays = 90
  const daysPassed = totalDays - daysRemaining
  const progress = (daysPassed / totalDays) * 100

  // Animated progress
  const progressValue = useMotionValue(0)
  const circumference = 2 * Math.PI * 36

  // Animate on mount
  useState(() => {
    animate(progressValue, progress, { duration: 1.5, ease: "easeOut" })
  })

  const strokeDashoffset = useTransform(
    progressValue,
    [0, 100],
    [circumference, 0]
  )

  if (isEligible) {
    return (
      <motion.div
        variants={staggerItem}
        className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-4 text-white relative overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 bg-white/10"
          animate={{ opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg">You&apos;re eligible to donate!</h3>
            <p className="text-green-100 text-sm mt-1">Your donation can save 3 lives</p>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="bg-white text-green-600 px-4 py-2 rounded-xl font-semibold text-sm flex items-center gap-1"
          >
            Find a Drive
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      variants={staggerItem}
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
    >
      <div className="flex items-center gap-4">
        {/* Countdown Ring */}
        <div className="relative w-20 h-20 flex-shrink-0">
          <svg className="w-20 h-20 transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="40"
              cy="40"
              r="36"
              fill="none"
              stroke="#F3F4F6"
              strokeWidth="6"
            />
            {/* Progress circle */}
            <motion.circle
              cx="40"
              cy="40"
              r="36"
              fill="none"
              stroke="#DC2626"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circumference}
              style={{ strokeDashoffset }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-lg font-bold text-[#1A1A1A]">{daysPassed}</span>
            <span className="text-[10px] text-gray-500">of {totalDays}</span>
          </div>
        </div>
        
        <div className="flex-1">
          <p className="text-sm text-gray-500">Next donation</p>
          <p className="font-semibold text-[#1A1A1A]">May 25, 2026</p>
          <p className="text-sm text-[#DC2626] mt-1">{daysRemaining} days remaining</p>
        </div>
      </div>
    </motion.div>
  )
}

// Featured Campaign Card (Swipeable)
function FeaturedCampaigns() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const campaigns = [
    { id: 1, title: "Fund Platelet Separator", progress: 72, goal: "Rs.5,00,000" },
    { id: 2, title: "Mobile Blood Van", progress: 45, goal: "Rs.8,00,000" }
  ]

  const dragX = useMotionValue(0)

  return (
    <motion.div variants={staggerItem} className="overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-[#1A1A1A]">Featured Campaign</h3>
        <div className="flex gap-1">
          {campaigns.map((_, i) => (
            <div 
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                i === currentIndex ? "bg-[#DC2626]" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
      
      <motion.div
        drag="x"
        dragConstraints={{ left: -200, right: 0 }}
        style={{ x: dragX }}
        onDragEnd={(_, info) => {
          if (info.offset.x < -50 && currentIndex < campaigns.length - 1) {
            setCurrentIndex(currentIndex + 1)
          } else if (info.offset.x > 50 && currentIndex > 0) {
            setCurrentIndex(currentIndex - 1)
          }
        }}
        animate={{ x: -currentIndex * 320 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="flex gap-4"
      >
        {campaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="flex-shrink-0 w-[calc(100%-16px)] bg-gradient-to-br from-[#1E3A5F] to-[#2D4A6F] rounded-2xl p-4 text-white"
          >
            <h4 className="font-semibold mb-2">{campaign.title}</h4>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${campaign.progress}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-[#F59E0B] rounded-full"
                />
              </div>
              <span className="text-sm font-medium">{campaign.progress}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/70">Goal: {campaign.goal}</span>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="bg-white text-[#1E3A5F] px-3 py-1.5 rounded-lg text-sm font-semibold"
              >
                Contribute
              </motion.button>
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  )
}

// Upcoming Event Card
function UpcomingEvent() {
  const isRegistered = true

  return (
    <motion.div variants={staggerItem}>
      <h3 className="font-semibold text-[#1A1A1A] mb-3">Upcoming Event</h3>
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-amber-100 text-amber-700 text-[10px] font-medium px-2 py-0.5 rounded-full">
                Blood Drive
              </span>
            </div>
            <h4 className="font-semibold text-[#1A1A1A]">Mega Blood Drive</h4>
            <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>May 15, 2026</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <MapPin className="w-3.5 h-3.5" />
              <span>NTR Stadium, Hyderabad</span>
            </div>
          </div>
          {isRegistered ? (
            <div className="flex items-center gap-1 text-green-600 bg-green-50 px-3 py-1.5 rounded-lg">
              <Check className="w-4 h-4" />
              <span className="text-sm font-medium">Registered</span>
            </div>
          ) : (
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="bg-[#DC2626] text-white px-4 py-2 rounded-lg text-sm font-semibold"
            >
              Register
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// Recent Activity
function RecentActivity() {
  const activities = [
    { icon: Droplet, text: "You donated blood", time: "48 days ago", color: "text-[#DC2626]" },
    { icon: Zap, text: "+50 credits earned", time: "48 days ago", color: "text-amber-500" },
    { icon: Gift, text: "Campaign funded: Platelet Separator", time: "2 weeks ago", color: "text-green-500" }
  ]

  return (
    <motion.div variants={staggerItem}>
      <h3 className="font-semibold text-[#1A1A1A] mb-3">Recent Activity</h3>
      <div className="space-y-2">
        {activities.map((activity, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex items-center gap-3"
          >
            <div className={`w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center ${activity.color}`}>
              <activity.icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#1A1A1A] truncate">{activity.text}</p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

// Bottom Tab Bar
function BottomTabBar({ activeTab, onTabChange }: { activeTab: string; onTabChange: (tab: string) => void }) {
  const tabs = [
    { id: "home", icon: Home, label: "Home" },
    { id: "blood", icon: Droplet, label: "Blood" },
    { id: "campaigns", icon: Heart, label: "Campaigns" },
    { id: "events", icon: Calendar, label: "Events" },
    { id: "profile", icon: User, label: "Profile" }
  ]

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-2 pb-5 pt-2">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center gap-0.5 py-1 px-3 relative"
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                animate={{ 
                  scale: isActive ? [1, 1.2, 1] : 1,
                }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <tab.icon 
                  className={`w-6 h-6 transition-colors ${
                    isActive ? "text-[#DC2626]" : "text-gray-400"
                  }`}
                  fill={isActive ? "#DC2626" : "none"}
                />
                {tab.id === "home" && isActive && (
                  <motion.div
                    layoutId="activeTabDot"
                    className="absolute -top-1 -right-1 w-2 h-2 bg-[#DC2626] rounded-full"
                  />
                )}
              </motion.div>
              <span className={`text-[10px] font-medium ${
                isActive ? "text-[#DC2626]" : "text-gray-400"
              }`}>
                {tab.label}
              </span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

// Main Mobile App Home Component
export function MobileAppHome() {
  const [activeTab, setActiveTab] = useState("home")
  const notificationCount = 3
  const isEligible = false // Set to true to see eligible state

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-8">
      {/* Phone Frame */}
      <div className="relative w-[390px] h-[844px] bg-[#F8FAFC] rounded-[3rem] shadow-2xl overflow-hidden border-[12px] border-gray-900">
        {/* Dynamic Island / Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-8 bg-gray-900 rounded-b-3xl z-50" />
        
        {/* Screen Content */}
        <div className="h-full overflow-hidden flex flex-col">
          {/* Status Bar */}
          <StatusBar />
          
          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto pb-24">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="px-5 pt-2"
            >
              {/* Header */}
              <motion.div variants={staggerItem} className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-semibold text-[#1A1A1A]">Hi Ravi</h1>
                  <span className="bg-red-100 text-[#DC2626] text-xs font-bold px-2 py-0.5 rounded-full">
                    A+
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full" />
                    Silver Donor
                  </span>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="relative p-2"
                  >
                    <Bell className="w-6 h-6 text-gray-600" />
                    {notificationCount > 0 && (
                      <span className="absolute top-1 right-1 w-4 h-4 bg-[#DC2626] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                        {notificationCount}
                      </span>
                    )}
                  </motion.button>
                </div>
              </motion.div>

              {/* Quick Actions Grid */}
              <motion.div variants={staggerItem} className="grid grid-cols-4 gap-3 mb-6">
                <QuickAction 
                  icon={Droplet} 
                  label="Find Blood" 
                  color="text-[#DC2626]"
                  bgColor="bg-red-50"
                  onTap={() => {}}
                />
                <QuickAction 
                  icon={Heart} 
                  label="Donate" 
                  color="text-[#1E3A5F]"
                  bgColor="bg-blue-50"
                  onTap={() => {}}
                />
                <QuickAction 
                  icon={Calendar} 
                  label="Events" 
                  color="text-amber-600"
                  bgColor="bg-amber-50"
                  onTap={() => {}}
                />
                <QuickAction 
                  icon={User} 
                  label="My Profile" 
                  color="text-gray-600"
                  bgColor="bg-gray-100"
                  onTap={() => {}}
                />
              </motion.div>

              {/* Eligibility Card */}
              <div className="mb-6">
                <EligibilityCard isEligible={isEligible} />
              </div>

              {/* Featured Campaign */}
              <div className="mb-6">
                <FeaturedCampaigns />
              </div>

              {/* Upcoming Event */}
              <div className="mb-6">
                <UpcomingEvent />
              </div>

              {/* Recent Activity */}
              <RecentActivity />
            </motion.div>
          </div>

          {/* Bottom Tab Bar */}
          <BottomTabBar activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-900 rounded-full" />
      </div>
    </div>
  )
}
