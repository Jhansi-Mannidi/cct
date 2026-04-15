"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Phone, 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Camera,
  Bell,
  MessageSquare,
  Mail,
  User,
  MapPin,
  Calendar,
  Loader2,
  AlertTriangle,
  CheckCircle2,
  ChevronDown
} from "lucide-react"

// Brand colors
const colors = {
  bloodRed: "#DC2626",
  trustNavy: "#1E3A5F",
  goldAccent: "#F59E0B",
  warmBg: "#FFF7ED",
}

// Animation variants
const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 50 : -50,
    opacity: 0,
  }),
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

// Progress Indicator Component
function ProgressIndicator({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div key={index} className="flex items-center">
          {/* Step dot */}
          <motion.div
            initial={false}
            animate={{
              scale: index === currentStep ? 1.2 : 1,
              backgroundColor: index <= currentStep ? colors.bloodRed : "#D1D5DB",
            }}
            className="relative w-4 h-4 rounded-full flex items-center justify-center"
          >
            {index < currentStep && (
              <Check className="w-2.5 h-2.5 text-white" />
            )}
            {index === currentStep && (
              <motion.div
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-[#DC2626]/30"
              />
            )}
          </motion.div>
          
          {/* Connecting line */}
          {index < totalSteps - 1 && (
            <div className="relative w-16 h-1 bg-gray-200 mx-1">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: index < currentStep ? "100%" : "0%" }}
                transition={{ duration: 0.3 }}
                className="absolute h-full bg-[#DC2626]"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// Checkmark success animation
function SuccessCheckmark({ onComplete }: { onComplete?: () => void }) {
  useEffect(() => {
    if (onComplete) {
      const timer = setTimeout(onComplete, 1000)
      return () => clearTimeout(timer)
    }
  }, [onComplete])

  return (
    <div className="flex items-center justify-center">
      <motion.svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        initial="hidden"
        animate="visible"
      >
        <motion.circle
          cx="40"
          cy="40"
          r="36"
          fill="none"
          stroke="#22C55E"
          strokeWidth="4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.path
          d="M24 40 L35 51 L56 30"
          fill="none"
          stroke="#22C55E"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        />
      </motion.svg>
    </div>
  )
}

// Confetti Particles
function ConfettiParticles() {
  const particles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    color: ["#DC2626", "#F59E0B", "#22C55E", "#3B82F6", "#8B5CF6"][i % 5],
    angle: (i / 30) * 360,
    distance: 100 + Math.random() * 100,
    size: 6 + Math.random() * 8,
    delay: Math.random() * 0.3,
  }))

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute left-1/2 top-1/2 rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
          }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: Math.cos((particle.angle * Math.PI) / 180) * particle.distance,
            y: Math.sin((particle.angle * Math.PI) / 180) * particle.distance,
            opacity: 0,
            scale: 0,
          }}
          transition={{
            duration: 1,
            delay: particle.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  )
}

// Step 1: Phone Verification
function PhoneVerificationStep({ 
  onNext,
  phoneNumber,
  setPhoneNumber,
}: { 
  onNext: () => void
  phoneNumber: string
  setPhoneNumber: (value: string) => void
}) {
  const [showOTP, setShowOTP] = useState(false)
  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [timer, setTimer] = useState(30)
  const [canResend, setCanResend] = useState(false)
  const [verified, setVerified] = useState(false)
  const otpRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (showOTP && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [showOTP, timer])

  const handleSendOTP = () => {
    if (phoneNumber.length !== 10) return
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setShowOTP(true)
      setTimer(30)
      setCanResend(false)
    }, 1500)
  }

  const handleResendOTP = () => {
    setTimer(30)
    setCanResend(false)
    setOtp("")
  }

  const handleOTPChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return
    const newOTP = otp.split("")
    newOTP[index] = value.slice(-1)
    const updatedOTP = newOTP.join("")
    setOtp(updatedOTP)

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus()
    }
  }

  const handleOTPKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus()
    }
  }

  const handleVerify = () => {
    if (otp.length !== 6) return
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setVerified(true)
    }, 1000)
  }

  if (verified) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <SuccessCheckmark onComplete={onNext} />
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-4 text-lg font-medium text-green-600"
        >
          Phone Verified!
        </motion.p>
      </motion.div>
    )
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={staggerItem} className="text-center">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-2">
          Join 28,000+ blood donors
        </h2>
        <p className="text-[#6B7280]">
          It takes 2 minutes to register. Your blood can save 3 lives.
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {!showOTP ? (
          <motion.div
            key="phone"
            variants={staggerItem}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-4"
          >
            <div className="relative">
              <div className="flex items-center border-2 border-gray-200 rounded-xl focus-within:border-[#DC2626] focus-within:ring-2 focus-within:ring-[#DC2626]/20 transition-all overflow-hidden bg-white">
                <div className="flex items-center gap-2 px-4 py-4 bg-gray-50 border-r border-gray-200">
                  <span className="text-xl">🇮🇳</span>
                  <span className="font-medium text-[#374151]">+91</span>
                </div>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "").slice(0, 10)
                    setPhoneNumber(value)
                  }}
                  placeholder="Enter your phone number"
                  className="flex-1 px-4 py-4 outline-none text-lg"
                />
              </div>
            </div>

            <motion.button
              onClick={handleSendOTP}
              disabled={phoneNumber.length !== 10 || isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-gradient-to-r from-[#DC2626] to-[#B91C1C] text-white font-semibold rounded-xl shadow-lg shadow-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending OTP...
                </>
              ) : (
                <>
                  <Phone className="w-5 h-5" />
                  Send OTP
                </>
              )}
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="otp"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="text-center">
              <p className="text-[#6B7280] mb-6">
                Enter the 6-digit OTP sent to{" "}
                <span className="font-semibold text-[#1A1A1A]">+91 {phoneNumber}</span>
              </p>
              
              <div className="flex gap-2 justify-center mb-4">
                {Array.from({ length: 6 }).map((_, index) => (
                  <motion.input
                    key={index}
                    ref={(el) => { otpRefs.current[index] = el }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={otp[index] || ""}
                    onChange={(e) => handleOTPChange(index, e.target.value)}
                    onKeyDown={(e) => handleOTPKeyDown(index, e)}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className={`w-12 h-14 text-center text-xl font-bold rounded-xl border-2 transition-all outline-none ${
                      otp[index]
                        ? "border-[#DC2626] bg-red-50"
                        : "border-gray-200 bg-white focus:border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/20"
                    }`}
                  />
                ))}
              </div>

              <div className="text-sm text-[#6B7280]">
                {canResend ? (
                  <button
                    onClick={handleResendOTP}
                    className="text-[#DC2626] font-medium hover:underline"
                  >
                    Resend OTP
                  </button>
                ) : (
                  <span>
                    Resend OTP in{" "}
                    <span className="font-semibold text-[#1A1A1A]">
                      00:{timer.toString().padStart(2, "0")}
                    </span>
                  </span>
                )}
              </div>
            </div>

            <motion.button
              onClick={handleVerify}
              disabled={otp.length !== 6 || isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-gradient-to-r from-[#DC2626] to-[#B91C1C] text-white font-semibold rounded-xl shadow-lg shadow-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <Check className="w-5 h-5" />
                  Verify
                </>
              )}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// Step 2: Personal Details
function PersonalDetailsStep({
  formData,
  setFormData,
}: {
  formData: {
    fullName: string
    dob: string
    gender: string
    bloodType: string
    email: string
  }
  setFormData: (data: Partial<typeof formData>) => void
}) {
  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
  const genders = ["Male", "Female", "Other"]

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={staggerItem} className="text-center mb-8">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-2">
          Tell us about yourself
        </h2>
        <p className="text-[#6B7280]">
          We need a few details to complete your profile
        </p>
      </motion.div>

      {/* Full Name */}
      <motion.div variants={staggerItem} className="relative">
        <input
          type="text"
          value={formData.fullName}
          onChange={(e) => setFormData({ fullName: e.target.value })}
          className="peer w-full px-4 py-4 pt-6 border-2 border-gray-200 rounded-xl focus:border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/20 outline-none transition-all bg-white"
          placeholder=" "
        />
        <label className={`absolute left-4 transition-all duration-200 pointer-events-none ${
          formData.fullName 
            ? "top-2 text-xs text-[#DC2626] font-medium" 
            : "top-4 text-[#6B7280]"
        }`}>
          Full Name
        </label>
      </motion.div>

      {/* Date of Birth */}
      <motion.div variants={staggerItem} className="relative">
        <input
          type="date"
          value={formData.dob}
          onChange={(e) => setFormData({ dob: e.target.value })}
          className="peer w-full px-4 py-4 pt-6 border-2 border-gray-200 rounded-xl focus:border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/20 outline-none transition-all bg-white"
        />
        <label className="absolute left-4 top-2 text-xs text-[#DC2626] font-medium pointer-events-none">
          Date of Birth
        </label>
      </motion.div>

      {/* Gender */}
      <motion.div variants={staggerItem}>
        <label className="block text-sm font-medium text-[#374151] mb-3">Gender</label>
        <div className="flex gap-3">
          {genders.map((gender) => (
            <motion.button
              key={gender}
              onClick={() => setFormData({ gender })}
              className="relative flex-1 py-3 px-4 rounded-xl border-2 text-center font-medium transition-colors"
              style={{
                borderColor: formData.gender === gender ? colors.bloodRed : "#E5E7EB",
                backgroundColor: formData.gender === gender ? "#FEF2F2" : "white",
                color: formData.gender === gender ? colors.bloodRed : "#374151",
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {formData.gender === gender && (
                <motion.div
                  layoutId="genderIndicator"
                  className="absolute inset-0 border-2 border-[#DC2626] rounded-xl"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <span className="relative z-10">{gender}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Blood Type */}
      <motion.div variants={staggerItem}>
        <label className="block text-sm font-medium text-[#374151] mb-3">Blood Type</label>
        <div className="grid grid-cols-4 gap-3">
          {bloodTypes.map((type) => (
            <motion.button
              key={type}
              onClick={() => setFormData({ bloodType: type })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                scale: formData.bloodType === type ? 1.1 : 1,
              }}
              className={`relative w-full aspect-square rounded-full flex items-center justify-center font-bold text-lg transition-all ${
                formData.bloodType === type
                  ? "bg-[#DC2626] text-white shadow-lg shadow-red-500/30"
                  : "bg-white border-2 border-gray-200 text-[#374151] hover:border-[#DC2626]"
              }`}
            >
              {formData.bloodType === type && (
                <motion.div
                  layoutId="bloodTypeRing"
                  className="absolute -inset-1 rounded-full border-2 border-[#DC2626]"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <span className="relative z-10">{type}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Email (Optional) */}
      <motion.div variants={staggerItem} className="relative">
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ email: e.target.value })}
          className="peer w-full px-4 py-4 pt-6 border-2 border-gray-200 rounded-xl focus:border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/20 outline-none transition-all bg-white"
          placeholder=" "
        />
        <label className={`absolute left-4 transition-all duration-200 pointer-events-none ${
          formData.email 
            ? "top-2 text-xs text-[#DC2626] font-medium" 
            : "top-4 text-[#6B7280]"
        }`}>
          Email (Optional)
        </label>
        <p className="text-xs text-[#9CA3AF] mt-1.5 ml-1">For 80G certificates</p>
      </motion.div>
    </motion.div>
  )
}

// Step 3: Location & Screening
function LocationScreeningStep({
  formData,
  setFormData,
}: {
  formData: {
    city: string
    district: string
    state: string
    pinCode: string
    screening: {
      weight: boolean | null
      surgery: boolean | null
      chronic: boolean | null
      medication: boolean | null
    }
  }
  setFormData: (data: Partial<typeof formData>) => void
}) {
  const cities = ["Hyderabad", "Vijayawada", "Visakhapatnam", "Tirupati", "Guntur", "Warangal", "Kakinada", "Nellore"]
  const districts = ["Hyderabad", "Krishna", "Visakhapatnam", "Chittoor", "Guntur", "Warangal", "East Godavari", "Nellore"]

  const screeningQuestions = [
    { key: "weight", question: "Do you weigh more than 45 kg?", goodAnswer: true },
    { key: "surgery", question: "Have you had any surgery in the last 6 months?", goodAnswer: false },
    { key: "chronic", question: "Do you have any chronic medical conditions?", goodAnswer: false },
    { key: "medication", question: "Are you currently on any blood-thinning medication?", goodAnswer: false },
  ] as const

  const isEligible = 
    formData.screening.weight === true &&
    formData.screening.surgery === false &&
    formData.screening.chronic === false &&
    formData.screening.medication === false

  const hasAnsweredAll = Object.values(formData.screening).every(v => v !== null)

  const isWarning = (key: keyof typeof formData.screening, value: boolean | null) => {
    const question = screeningQuestions.find(q => q.key === key)
    if (!question || value === null) return false
    return value !== question.goodAnswer
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={staggerItem} className="text-center mb-8">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-2">
          Location & Health Check
        </h2>
        <p className="text-[#6B7280]">
          Help us find donation opportunities near you
        </p>
      </motion.div>

      {/* State */}
      <motion.div variants={staggerItem}>
        <label className="block text-sm font-medium text-[#374151] mb-3">State</label>
        <div className="flex gap-3">
          {["AP", "TS", "Other"].map((state) => (
            <motion.button
              key={state}
              onClick={() => setFormData({ state })}
              className="relative flex-1 py-3 px-4 rounded-xl border-2 text-center font-medium transition-colors"
              style={{
                borderColor: formData.state === state ? colors.bloodRed : "#E5E7EB",
                backgroundColor: formData.state === state ? "#FEF2F2" : "white",
                color: formData.state === state ? colors.bloodRed : "#374151",
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {state === "AP" ? "Andhra Pradesh" : state === "TS" ? "Telangana" : "Other"}
            </motion.button>
          ))}
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* City */}
        <motion.div variants={staggerItem} className="relative">
          <select
            value={formData.city}
            onChange={(e) => setFormData({ city: e.target.value })}
            className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/20 outline-none transition-all bg-white appearance-none"
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </motion.div>

        {/* District */}
        <motion.div variants={staggerItem} className="relative">
          <select
            value={formData.district}
            onChange={(e) => setFormData({ district: e.target.value })}
            className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/20 outline-none transition-all bg-white appearance-none"
          >
            <option value="">Select District</option>
            {districts.map((district) => (
              <option key={district} value={district}>{district}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </motion.div>
      </div>

      {/* Pin Code */}
      <motion.div variants={staggerItem} className="relative">
        <input
          type="text"
          value={formData.pinCode}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "").slice(0, 6)
            setFormData({ pinCode: value })
          }}
          className="peer w-full px-4 py-4 pt-6 border-2 border-gray-200 rounded-xl focus:border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/20 outline-none transition-all bg-white"
          placeholder=" "
        />
        <label className={`absolute left-4 transition-all duration-200 pointer-events-none ${
          formData.pinCode 
            ? "top-2 text-xs text-[#DC2626] font-medium" 
            : "top-4 text-[#6B7280]"
        }`}>
          Pin Code
        </label>
      </motion.div>

      {/* Health Screening */}
      <motion.div variants={staggerItem}>
        <label className="block text-sm font-medium text-[#374151] mb-3">Health Screening</label>
        <div className="space-y-3">
          {screeningQuestions.map((q, index) => {
            const value = formData.screening[q.key]
            const showWarning = isWarning(q.key, value)
            
            return (
              <motion.div
                key={q.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-xl border-2 transition-all ${
                  showWarning 
                    ? "border-amber-400 bg-amber-50" 
                    : value !== null 
                    ? "border-green-400 bg-green-50" 
                    : "border-gray-200 bg-white"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {showWarning && (
                      <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                    )}
                    <span className={`text-sm ${showWarning ? "text-amber-800" : "text-[#374151]"}`}>
                      {q.question}
                    </span>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => setFormData({ 
                        screening: { ...formData.screening, [q.key]: true } 
                      })}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                        value === true
                          ? "bg-[#DC2626] text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setFormData({ 
                        screening: { ...formData.screening, [q.key]: false } 
                      })}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                        value === false
                          ? "bg-[#DC2626] text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Eligibility Result */}
      <AnimatePresence>
        {hasAnsweredAll && (
          <motion.div
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            className={`p-4 rounded-xl ${
              isEligible 
                ? "bg-green-100 border-2 border-green-400" 
                : "bg-amber-100 border-2 border-amber-400"
            }`}
          >
            <div className="flex items-center gap-3">
              {isEligible ? (
                <>
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                  <span className="font-medium text-green-800">
                    {"You're eligible to donate! 🎉"}
                  </span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-6 h-6 text-amber-600" />
                  <div>
                    <span className="font-medium text-amber-800 block">
                      You may not be eligible right now
                    </span>
                    <span className="text-sm text-amber-700">
                      Please consult with a medical professional before donating.
                    </span>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// Step 4: Confirmation
function ConfirmationStep({
  formData,
  phoneNumber,
  preferences,
  setPreferences,
  onSubmit,
}: {
  formData: {
    fullName: string
    dob: string
    gender: string
    bloodType: string
    email: string
    city: string
    state: string
  }
  phoneNumber: string
  preferences: {
    push: boolean
    sms: boolean
    email: boolean
    whatsapp: boolean
    showOnWall: boolean
  }
  setPreferences: (data: Partial<typeof preferences>) => void
  onSubmit: () => void
}) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Calculate profile completeness
  const fields = [
    formData.fullName,
    formData.dob,
    formData.gender,
    formData.bloodType,
    phoneNumber,
    formData.city,
    formData.state,
  ]
  const completedFields = fields.filter(Boolean).length
  const completeness = Math.round((completedFields / fields.length) * 100)

  const handleSubmit = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      onSubmit()
    }, 1500)
  }

  const summaryItems = [
    { label: "Name", value: formData.fullName },
    { label: "Phone", value: `+91 ${phoneNumber}` },
    { label: "Date of Birth", value: formData.dob },
    { label: "Gender", value: formData.gender },
    { label: "Blood Type", value: formData.bloodType },
    { label: "Location", value: `${formData.city}, ${formData.state}` },
    { label: "Email", value: formData.email || "Not provided" },
  ]

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={staggerItem} className="text-center mb-8">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-2">
          Almost there!
        </h2>
        <p className="text-[#6B7280]">
          Review your details and complete registration
        </p>
      </motion.div>

      {/* Profile Completeness */}
      <motion.div variants={staggerItem} className="flex items-center justify-center mb-6">
        <div className="relative w-24 h-24">
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="48"
              cy="48"
              r="40"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="8"
            />
            <motion.circle
              cx="48"
              cy="48"
              r="40"
              fill="none"
              stroke={colors.bloodRed}
              strokeWidth="8"
              strokeLinecap="round"
              initial={{ strokeDasharray: "251.2", strokeDashoffset: 251.2 }}
              animate={{ strokeDashoffset: 251.2 - (251.2 * completeness) / 100 }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-bold text-[#1A1A1A]">{completeness}%</span>
          </div>
        </div>
      </motion.div>

      {/* Summary Card */}
      <motion.div
        variants={staggerItem}
        className="bg-white rounded-2xl border-2 border-gray-100 p-6"
      >
        <h3 className="font-semibold text-[#1A1A1A] mb-4">Your Details</h3>
        <div className="space-y-3">
          {summaryItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
            >
              <span className="text-[#6B7280] text-sm">{item.label}</span>
              <span className="font-medium text-[#1A1A1A]">{item.value}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Profile Photo Upload */}
      <motion.div variants={staggerItem} className="flex justify-center">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-[#DC2626] hover:bg-red-50 transition-all">
            <Camera className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-xs text-center text-[#6B7280] mt-2">Add Photo (Optional)</p>
        </div>
      </motion.div>

      {/* Notification Preferences */}
      <motion.div variants={staggerItem} className="bg-white rounded-2xl border-2 border-gray-100 p-6">
        <h3 className="font-semibold text-[#1A1A1A] mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          {[
            { key: "push", label: "Push Notifications", icon: Bell },
            { key: "sms", label: "SMS", icon: MessageSquare },
            { key: "email", label: "Email", icon: Mail },
            { key: "whatsapp", label: "WhatsApp", icon: MessageSquare },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5 text-[#6B7280]" />
                <span className="text-[#374151]">{item.label}</span>
              </div>
              <button
                onClick={() => setPreferences({ 
                  [item.key]: !preferences[item.key as keyof typeof preferences] 
                })}
                className={`w-12 h-6 rounded-full transition-all relative ${
                  preferences[item.key as keyof typeof preferences]
                    ? "bg-[#DC2626]"
                    : "bg-gray-200"
                }`}
              >
                <motion.div
                  animate={{
                    x: preferences[item.key as keyof typeof preferences] ? 24 : 2,
                  }}
                  className="absolute top-1 w-4 h-4 rounded-full bg-white shadow"
                />
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Donor Wall Visibility */}
      <motion.div variants={staggerItem} className="bg-white rounded-2xl border-2 border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-[#1A1A1A]">Donor Wall Visibility</h3>
            <p className="text-sm text-[#6B7280]">Show my name on the Donor Wall</p>
          </div>
          <button
            onClick={() => setPreferences({ showOnWall: !preferences.showOnWall })}
            className={`w-12 h-6 rounded-full transition-all relative ${
              preferences.showOnWall ? "bg-[#DC2626]" : "bg-gray-200"
            }`}
          >
            <motion.div
              animate={{ x: preferences.showOnWall ? 24 : 2 }}
              className="absolute top-1 w-4 h-4 rounded-full bg-white shadow"
            />
          </button>
        </div>
      </motion.div>

      {/* Submit Button */}
      <motion.button
        variants={staggerItem}
        onClick={handleSubmit}
        disabled={isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-4 bg-gradient-to-r from-[#DC2626] to-[#B91C1C] text-white font-semibold rounded-xl shadow-lg shadow-red-500/30 disabled:opacity-70 flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Completing Registration...
          </>
        ) : (
          <>
            <Check className="w-5 h-5" />
            Complete Registration
          </>
        )}
      </motion.button>
    </motion.div>
  )
}

// Success Screen
function SuccessScreen({ name, onCTA }: { name: string; onCTA: (action: string) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center p-8"
    >
      <div className="relative">
        <ConfettiParticles />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
        >
          <svg width="120" height="120" viewBox="0 0 120 120">
            <motion.circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="#22C55E"
              strokeWidth="6"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            />
            <motion.path
              d="M36 60 L52 76 L84 44"
              fill="none"
              stroke="#22C55E"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, delay: 0.9 }}
            />
          </svg>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
        className="text-center mt-8"
      >
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
          Welcome to the CCT family, {name.split(" ")[0]}!
        </h1>
        <p className="text-[#6B7280] max-w-md mx-auto">
          {"You've joined 28,000+ donors who are making a difference. Your generosity can save up to 3 lives."}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="flex flex-col sm:flex-row gap-4 mt-8 w-full max-w-md"
      >
        <motion.button
          onClick={() => onCTA("find-drive")}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 py-4 bg-gradient-to-r from-[#DC2626] to-[#B91C1C] text-white font-semibold rounded-xl shadow-lg shadow-red-500/30 flex items-center justify-center gap-2"
        >
          <MapPin className="w-5 h-5" />
          Find a Blood Drive
        </motion.button>
        <motion.button
          onClick={() => onCTA("campaigns")}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 py-4 bg-[#1E3A5F] text-white font-semibold rounded-xl shadow-lg flex items-center justify-center gap-2"
        >
          <User className="w-5 h-5" />
          Explore Campaigns
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

// Main Donor Registration Component
export function DonorRegistration({ onClose, onComplete }: { onClose?: () => void; onComplete?: (action: string) => void }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [direction, setDirection] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)
  
  const [phoneNumber, setPhoneNumber] = useState("")
  const [personalData, setPersonalData] = useState({
    fullName: "",
    dob: "",
    gender: "",
    bloodType: "",
    email: "",
  })
  const [locationData, setLocationData] = useState({
    city: "",
    district: "",
    state: "",
    pinCode: "",
    screening: {
      weight: null as boolean | null,
      surgery: null as boolean | null,
      chronic: null as boolean | null,
      medication: null as boolean | null,
    },
  })
  const [preferences, setPreferences] = useState({
    push: true,
    sms: true,
    email: true,
    whatsapp: true,
    showOnWall: true,
  })

  const goNext = () => {
    setDirection(1)
    setCurrentStep((prev) => Math.min(prev + 1, 3))
  }

  const goBack = () => {
    setDirection(-1)
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const handleSubmit = () => {
    setShowSuccess(true)
  }

  const handleCTA = (action: string) => {
    if (onComplete) {
      onComplete(action)
    }
  }

  if (showSuccess) {
    return <SuccessScreen name={personalData.fullName} onCTA={handleCTA} />
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return personalData.fullName && personalData.dob && personalData.gender && personalData.bloodType
      case 2:
        return locationData.city && locationData.state && 
          Object.values(locationData.screening).every(v => v !== null)
      default:
        return true
    }
  }

  return (
    <div className="min-h-screen bg-[#FFF7ED] px-4 py-8 pt-28 md:pt-32 flex items-start justify-center">
      <div className="max-w-lg mx-auto">
        {/* Close button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        )}

        {/* Progress Indicator */}
        <ProgressIndicator currentStep={currentStep} totalSteps={4} />

        {/* Step Content */}
        <div className="bg-white rounded-3xl shadow-xl shadow-black/5 p-6 md:p-8 overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              {currentStep === 0 && (
                <PhoneVerificationStep
                  onNext={goNext}
                  phoneNumber={phoneNumber}
                  setPhoneNumber={setPhoneNumber}
                />
              )}
              {currentStep === 1 && (
                <PersonalDetailsStep
                  formData={personalData}
                  setFormData={(data) => setPersonalData((prev) => ({ ...prev, ...data }))}
                />
              )}
              {currentStep === 2 && (
                <LocationScreeningStep
                  formData={locationData}
                  setFormData={(data) => setLocationData((prev) => ({ ...prev, ...data }))}
                />
              )}
              {currentStep === 3 && (
                <ConfirmationStep
                  formData={{ ...personalData, ...locationData }}
                  phoneNumber={phoneNumber}
                  preferences={preferences}
                  setPreferences={(data) => setPreferences((prev) => ({ ...prev, ...data }))}
                  onSubmit={handleSubmit}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        {currentStep > 0 && currentStep < 3 && (
          <div className="flex justify-between mt-6">
            <motion.button
              onClick={goBack}
              whileHover={{ scale: 1.02, x: -4 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-6 py-3 text-[#6B7280] font-medium hover:text-[#1A1A1A] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </motion.button>
            
            <motion.button
              onClick={goNext}
              disabled={!canProceed()}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-6 py-3 bg-[#DC2626] text-white font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        )}
      </div>
    </div>
  )
}
