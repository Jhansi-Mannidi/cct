"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Heart, 
  Award, 
  Droplet, 
  ChevronDown, 
  Share2, 
  Clock, 
  Calendar,
  MapPin,
  ArrowRight,
  Phone,
  X,
  Check,
  Sparkles,
  Gift,
  Bell,
  Apple,
  Utensils,
  Dumbbell
} from "lucide-react"

// Tab configuration
const tabs = [
  { id: "thank-you", label: "Thank You" },
  { id: "recovery", label: "Recovery Check-in" },
  { id: "eligibility", label: "Eligibility Reminder" },
  { id: "bridge", label: "Cross-Domain Bridge" },
]

// Confetti component
function Confetti({ count = 30 }: { count?: number }) {
  const [particles, setParticles] = useState<Array<{
    id: number
    x: number
    y: number
    color: string
    size: number
    delay: number
  }>>([])

  useEffect(() => {
    const colors = ["#DC2626", "#F59E0B", "#1E3A5F", "#10B981", "#EC4899"]
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100 - 50,
      y: Math.random() * -100 - 50,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 4,
      delay: Math.random() * 0.5,
    }))
    setParticles(newParticles)
  }, [count])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ 
            x: "50%", 
            y: "30%", 
            opacity: 1,
            scale: 0 
          }}
          animate={{ 
            x: `calc(50% + ${p.x}vw)`, 
            y: `calc(30% + ${p.y}vh)`,
            opacity: 0,
            scale: 1,
            rotate: Math.random() * 360
          }}
          transition={{ 
            duration: 1.5, 
            delay: p.delay,
            ease: "easeOut"
          }}
          className="absolute rounded-full"
          style={{ 
            width: p.size, 
            height: p.size, 
            backgroundColor: p.color 
          }}
        />
      ))}
    </div>
  )
}

// TAB 1: Thank You Screen
function ThankYouTab() {
  const [showConfetti, setShowConfetti] = useState(true)
  const [expandedTip, setExpandedTip] = useState<number | null>(null)
  const [showShareCard, setShowShareCard] = useState(false)

  const healthTips = [
    { 
      icon: Droplet, 
      title: "Stay hydrated for 24 hours", 
      description: "Drink plenty of water and fluids to help your body recover. Aim for at least 8 glasses of water today." 
    },
    { 
      icon: Dumbbell, 
      title: "Avoid heavy exercise today", 
      description: "Rest and avoid strenuous physical activities for the next 24 hours to allow your body to replenish." 
    },
    { 
      icon: Utensils, 
      title: "Eat iron-rich foods this week", 
      description: "Include spinach, lentils, red meat, and fortified cereals in your diet to help restore iron levels." 
    },
  ]

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative min-h-[600px] overflow-hidden">
      {/* Animated gradient background */}
      <motion.div 
        className="absolute inset-0"
        animate={{
          background: [
            "linear-gradient(135deg, #DC2626 0%, #1E3A5F 100%)",
            "linear-gradient(135deg, #1E3A5F 0%, #DC2626 100%)",
            "linear-gradient(135deg, #DC2626 0%, #1E3A5F 100%)",
          ]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Confetti */}
      {showConfetti && <Confetti count={50} />}
      
      {/* Content */}
      <div className="relative z-10 px-6 py-12 text-center">
        {/* Thank you heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6"
          >
            <Heart className="w-10 h-10 text-white fill-white" />
          </motion.div>
          
          <motion.h1 
            className="font-serif text-4xl md:text-5xl font-bold text-white mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {"Thank You, Ravi!".split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.03 }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-white/90 text-lg"
          >
            Your 4th blood donation
          </motion.p>
        </motion.div>

        {/* Tier Badge */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 1 }}
          className="mt-8"
        >
          <div className="inline-flex flex-col items-center">
            <div className="bg-gradient-to-br from-gray-300 to-gray-400 p-1 rounded-full mb-2">
              <div className="bg-white rounded-full p-4">
                <Award className="w-12 h-12 text-gray-400" />
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3 }}
              className="flex items-center gap-2 text-white/80 text-sm"
            >
              <span>Bronze</span>
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </div>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 1.5 }}
            className="inline-flex flex-col items-center ml-4"
          >
            <div className="bg-gradient-to-br from-gray-300 to-gray-500 p-1 rounded-full mb-2 ring-4 ring-white/30">
              <div className="bg-white rounded-full p-4">
                <Award className="w-12 h-12 text-gray-500" />
              </div>
            </div>
            <span className="text-white font-semibold">Silver Donor</span>
          </motion.div>
        </motion.div>

        {/* Credits */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8 }}
          className="mt-8 inline-flex items-center gap-2 bg-[#F59E0B] text-white px-6 py-3 rounded-full font-bold text-lg"
        >
          <Sparkles className="w-5 h-5" />
          <CountUp target={50} prefix="+" suffix=" credits" />
        </motion.div>

        {/* Health Tips */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2 }}
          className="mt-10 max-w-md mx-auto"
        >
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl">
            <h3 className="font-semibold text-[#1E3A5F] mb-3 flex items-center gap-2">
              <Apple className="w-5 h-5 text-green-600" />
              Health Tips for Recovery
            </h3>
            <div className="space-y-2">
              {healthTips.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2.4 + index * 0.1 }}
                >
                  <button
                    onClick={() => setExpandedTip(expandedTip === index ? null : index)}
                    className="w-full text-left"
                  >
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                          <tip.icon className="w-4 h-4 text-[#DC2626]" />
                        </div>
                        <span className="text-sm font-medium text-[#1A1A1A]">{tip.title}</span>
                      </div>
                      <motion.div
                        animate={{ rotate: expandedTip === index ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      </motion.div>
                    </div>
                  </button>
                  <AnimatePresence>
                    {expandedTip === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="px-3 py-2 text-sm text-gray-600 bg-gray-50 rounded-b-xl -mt-2">
                          {tip.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Share Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowShareCard(true)}
          className="mt-8 inline-flex items-center gap-2 bg-white text-[#DC2626] px-6 py-3 rounded-full font-semibold shadow-lg"
        >
          <Share2 className="w-5 h-5" />
          Share Your Achievement
        </motion.button>

        {/* Share Card Modal */}
        <AnimatePresence>
          {showShareCard && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowShareCard(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-[#1A1A1A]">Share Your Achievement</h3>
                  <button onClick={() => setShowShareCard(false)}>
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
                
                {/* Preview Card */}
                <div className="bg-gradient-to-br from-[#DC2626] to-[#1E3A5F] rounded-xl p-6 text-white mb-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Heart className="w-6 h-6 fill-white" />
                    <span className="font-bold">CCT Blood Donation</span>
                  </div>
                  <p className="text-2xl font-serif font-bold mb-1">Ravi Kumar</p>
                  <p className="text-white/80">Completed 4th donation</p>
                  <p className="text-white/60 text-sm mt-2">April 15, 2026</p>
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <span className="text-sm text-white/80">Silver Donor</span>
                  </div>
                </div>
                
                {/* Share Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors">
                    WhatsApp
                  </button>
                  <button className="flex-1 py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition-colors">
                    X
                  </button>
                  <button className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:opacity-90 transition-opacity">
                    Instagram
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// Count Up Animation Component
function CountUp({ target, prefix = "", suffix = "" }: { target: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 1500
    const steps = 30
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [target])

  return <span>{prefix}{count}{suffix}</span>
}

// TAB 2: Recovery Check-in
function RecoveryTab() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null)

  const moods = [
    { id: "great", emoji: "😊", label: "Great", response: "Glad to hear it! You're doing great. See you in 87 days for your next donation!" },
    { id: "good", emoji: "🙂", label: "Good", response: "Glad to hear it! You're doing great. See you in 87 days for your next donation!" },
    { id: "okay", emoji: "😐", label: "Okay", response: "Take it easy. Recovery is normal for a few days." },
    { id: "not-great", emoji: "😕", label: "Not great", response: "Please consult your doctor. CCT helpline: 1800-123-4567", isWarning: true },
    { id: "unwell", emoji: "😟", label: "Unwell", response: "Please consult your doctor. CCT helpline: 1800-123-4567", isWarning: true },
  ]

  const currentMood = moods.find(m => m.id === selectedMood)
  const cooldownDay = 3
  const totalDays = 90
  const progress = (cooldownDay / totalDays) * 100

  return (
    <div className="min-h-[600px] bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="max-w-md mx-auto pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-2">
            How are you feeling, Ravi?
          </h1>
          <p className="text-gray-600">Day 3 after your donation</p>
        </motion.div>

        {/* Mood Buttons */}
        <div className="flex justify-center gap-3 mb-8">
          {moods.map((mood, index) => (
            <motion.button
              key={mood.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: selectedMood ? 1 : 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedMood(mood.id)}
              className={`flex flex-col items-center p-3 rounded-2xl transition-all ${
                selectedMood === mood.id 
                  ? "bg-white shadow-lg scale-110" 
                  : selectedMood 
                    ? "opacity-50 scale-90" 
                    : "bg-white/50 hover:bg-white"
              }`}
            >
              <motion.span 
                className="text-3xl mb-1"
                animate={{ scale: selectedMood === mood.id ? 1.2 : 1 }}
              >
                {mood.emoji}
              </motion.span>
              <span className="text-xs text-gray-600">{mood.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Response Message */}
        <AnimatePresence mode="wait">
          {currentMood && (
            <motion.div
              key={currentMood.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`p-4 rounded-2xl mb-8 ${
                currentMood.isWarning 
                  ? "bg-red-50 border border-red-200" 
                  : "bg-green-50 border border-green-200"
              }`}
            >
              <p className={`text-center ${currentMood.isWarning ? "text-red-700" : "text-green-700"}`}>
                {currentMood.response}
              </p>
              {currentMood.isWarning && (
                <motion.a
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  href="tel:18001234567"
                  className="flex items-center justify-center gap-2 mt-3 text-red-600 font-semibold"
                >
                  <Phone className="w-4 h-4" />
                  Call Helpline
                </motion.a>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cooldown Tracker */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <h3 className="text-center text-gray-600 mb-4">Cooldown Tracker</h3>
          <div className="relative w-40 h-40 mx-auto">
            {/* Background circle */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="12"
              />
              <motion.circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="#1E3A5F"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={440}
                initial={{ strokeDashoffset: 440 }}
                animate={{ strokeDashoffset: 440 - (440 * progress / 100) }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </svg>
            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-[#1E3A5F]">Day {cooldownDay}</span>
              <span className="text-gray-500 text-sm">of {totalDays}</span>
            </div>
          </div>
          <p className="text-center text-gray-600 mt-4">
            <span className="font-semibold text-[#1E3A5F]">{totalDays - cooldownDay} days</span> until your next donation
          </p>
        </motion.div>
      </div>
    </div>
  )
}

// TAB 3: Eligibility Reminder
function EligibilityTab() {
  const [selectedSnooze, setSelectedSnooze] = useState<number | null>(null)
  const daysRemaining = 10

  const upcomingDrives = [
    {
      id: 1,
      name: "Mega Blood Drive - Hyderabad",
      date: "May 1, 2026",
      venue: "HITEX Convention Center",
      city: "Hyderabad",
    },
    {
      id: 2,
      name: "Community Camp - Secunderabad",
      date: "May 5, 2026",
      venue: "Clock Tower Ground",
      city: "Secunderabad",
    },
  ]

  const snoozeOptions = [
    { days: 7, label: "7 days" },
    { days: 14, label: "14 days" },
    { days: 30, label: "30 days" },
  ]

  return (
    <div className="min-h-[600px] bg-gradient-to-br from-amber-50 to-orange-50 p-6">
      <div className="max-w-md mx-auto pt-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, 360, 360] }}
            transition={{ duration: 1, times: [0, 0.5, 1] }}
            className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4"
          >
            <Clock className="w-8 h-8 text-[#F59E0B]" />
          </motion.div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-2">
            You&apos;re Almost Eligible!
          </h1>
          <div className="flex items-center justify-center gap-2 text-lg">
            <motion.span 
              className="text-5xl font-bold text-[#F59E0B]"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
            >
              {daysRemaining}
            </motion.span>
            <span className="text-gray-600">days until you can donate again</span>
          </div>
        </motion.div>

        {/* Upcoming Drives */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h3 className="font-semibold text-[#1A1A1A] mb-3 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#F59E0B]" />
            Upcoming Blood Drives Near You
          </h3>
          <div className="space-y-3">
            {upcomingDrives.map((drive, index) => (
              <motion.div
                key={drive.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-white rounded-xl p-4 shadow-md"
              >
                <h4 className="font-semibold text-[#1A1A1A] mb-1">{drive.name}</h4>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {drive.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {drive.city}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-3">{drive.venue}</p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-2 bg-[#F59E0B] text-white rounded-lg font-medium hover:bg-amber-600 transition-colors"
                >
                  Register
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Snooze Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white/80 rounded-xl p-4"
        >
          <p className="text-center text-gray-600 mb-3">Remind me in:</p>
          <div className="flex gap-2 justify-center">
            {snoozeOptions.map((option) => (
              <motion.button
                key={option.days}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedSnooze(option.days)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedSnooze === option.days
                    ? "bg-[#1E3A5F] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {option.label}
              </motion.button>
            ))}
          </div>
          <AnimatePresence>
            {selectedSnooze && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-center text-green-600 text-sm mt-3 flex items-center justify-center gap-1"
              >
                <Check className="w-4 h-4" />
                We&apos;ll remind you in {selectedSnooze} days
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}

// TAB 4: Cross-Domain Bridge
function BridgeTab() {
  const [showCampaign, setShowCampaign] = useState(false)
  const [redirecting, setRedirecting] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowCampaign(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleContribute = () => {
    setRedirecting(true)
    setTimeout(() => setRedirecting(false), 2000)
  }

  const campaignProgress = (1240000 / 1800000) * 100

  return (
    <div className="min-h-[600px] bg-[#FFF7ED] p-6">
      <div className="max-w-md mx-auto pt-8">
        {/* Context Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4"
          >
            <Heart className="w-8 h-8 text-green-600 fill-green-600" />
          </motion.div>
          <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-2">
            You just saved a life.
          </h2>
          <p className="text-gray-600">
            Want to fund life-saving equipment too?
          </p>
        </motion.div>

        {/* Campaign Card - slides in after delay */}
        <AnimatePresence>
          {showCampaign && !redirecting && (
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6"
            >
              {/* Campaign Image Placeholder */}
              <div className="h-32 bg-gradient-to-br from-[#DC2626] to-[#1E3A5F] flex items-center justify-center">
                <Gift className="w-12 h-12 text-white/50" />
              </div>
              
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-red-100 text-[#DC2626] text-xs font-medium rounded-full">
                    Equipment
                  </span>
                  <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full animate-pulse">
                    Urgent
                  </span>
                </div>
                
                <h3 className="font-serif text-lg font-bold text-[#1A1A1A] mb-2">
                  Fund Platelet Separator for Gandhi Hospital
                </h3>
                
                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">₹12.4L raised</span>
                    <span className="font-semibold text-[#1A1A1A]">₹18L goal</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${campaignProgress}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-[#DC2626] to-[#F59E0B] rounded-full"
                    />
                  </div>
                </div>
                
                {/* Quick Contribute Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleContribute}
                  className="w-full py-3 bg-gradient-to-r from-[#DC2626] to-[#B91C1C] text-white rounded-xl font-semibold shadow-lg shadow-red-500/30 hover:shadow-xl transition-all"
                >
                  Contribute ₹100
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Redirecting Animation */}
        <AnimatePresence>
          {redirecting && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl shadow-xl p-8 text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="inline-flex items-center justify-center w-16 h-16 border-4 border-gray-200 border-t-[#DC2626] rounded-full mb-4"
              />
              <p className="text-[#1A1A1A] font-medium">Redirecting to campaign...</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dismiss Options */}
        {showCampaign && !redirecting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="text-center space-y-2"
          >
            <button className="text-gray-500 hover:text-gray-700 text-sm">
              Not now
            </button>
            <br />
            <button className="text-gray-400 hover:text-gray-500 text-xs">
              Don&apos;t show me these
            </button>
          </motion.div>
        )}

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-4"
        >
          <div className="flex items-start gap-3">
            <Bell className="w-5 h-5 text-[#1E3A5F] mt-0.5" />
            <div>
              <p className="text-sm text-[#1E3A5F]">
                <strong>Why this matters:</strong> Your blood donation saved a life today. Your financial contribution helps us save even more lives by funding critical equipment and operations.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// Main Component
export function PostDonationJourney() {
  const [activeTab, setActiveTab] = useState("thank-you")

  return (
    <div className="min-h-screen bg-[#FFF7ED] pt-28 pb-20">
      <div className="max-w-2xl mx-auto px-4">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
            <Heart className="w-4 h-4" />
            Post-Donation Experience
          </span>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A1A]">
            Donor Journey Screens
          </h1>
        </motion.div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="border-b border-gray-100">
            <div className="flex overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex-1 min-w-max px-4 py-4 text-sm font-medium transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? "text-[#DC2626]"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="tab-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#DC2626]"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "thank-you" && <ThankYouTab />}
              {activeTab === "recovery" && <RecoveryTab />}
              {activeTab === "eligibility" && <EligibilityTab />}
              {activeTab === "bridge" && <BridgeTab />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
