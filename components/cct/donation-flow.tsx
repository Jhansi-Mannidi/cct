"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  CreditCard, 
  Building2, 
  Smartphone,
  Lock,
  Info,
  Heart,
  Share2,
  Copy,
  CheckCircle,
  Shield
} from "lucide-react"

// Brand colors
const colors = {
  bloodRed: "#DC2626",
  trustNavy: "#1E3A5F",
  goldAccent: "#F59E0B",
  warmBg: "#FFF7ED",
}

// Step transition variants
const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
  }),
}

// Impact messages based on amount
const getImpactMessage = (amount: number): string => {
  if (amount >= 10000) return `can fund ${Math.floor(amount / 500)} blood transfusion sessions`
  if (amount >= 5000) return "can fund 10 transfusion sessions"
  if (amount >= 2500) return "can fund 5 transfusion sessions"
  if (amount >= 1000) return "can fund 2 transfusion sessions"
  if (amount >= 500) return "can fund 1 blood transfusion session"
  if (amount >= 100) return "can help cover testing costs for 1 unit"
  return "contributes to life-saving equipment"
}

// Confetti component
function Confetti() {
  const colors = ["#DC2626", "#F59E0B", "#22C55E", "#3B82F6", "#EC4899"]
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full"
          style={{
            backgroundColor: colors[i % colors.length],
            left: `${Math.random() * 100}%`,
            top: -20,
          }}
          initial={{ y: -20, opacity: 1, rotate: 0 }}
          animate={{
            y: window.innerHeight + 100,
            opacity: [1, 1, 0],
            rotate: Math.random() * 720 - 360,
            x: Math.random() * 200 - 100,
          }}
          transition={{
            duration: 2.5 + Math.random() * 2,
            delay: Math.random() * 0.5,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  )
}

interface DonationFlowProps {
  campaignName?: string
  campaignProgress?: { raised: number; goal: number }
  onComplete?: (action: string) => void
}

export function DonationFlow({ 
  campaignName = "Fund Platelet Separator for Tirupati",
  campaignProgress = { raised: 1240000, goal: 1800000 },
  onComplete 
}: DonationFlowProps) {
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [copied, setCopied] = useState(false)
  
  // Form data
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    pan: "",
    receiveUpdates: true,
  })

  // Form validation
  const [errors, setErrors] = useState<Record<string, string>>({})

  const presetAmounts = [100, 500, 1000, 2500, 5000]
  const finalAmount = selectedAmount || (customAmount ? parseInt(customAmount) : 0)

  const formatCurrency = (amount: number) => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`
    }
    return `₹${amount.toLocaleString("en-IN")}`
  }

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Name is required"
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address"
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Invalid phone number"
    }
    if (formData.pan && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan.toUpperCase())) {
      newErrors.pan = "Invalid PAN format"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (step === 2 && !validateStep2()) return
    setDirection(1)
    setStep(step + 1)
  }

  const prevStep = () => {
    setDirection(-1)
    setStep(step - 1)
  }

  const handlePayment = () => {
    setIsProcessing(true)
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setShowConfetti(true)
      setIsComplete(true)
      
      setTimeout(() => setShowConfetti(false), 3000)
    }, 3000)
  }

  const handleShare = (platform: string) => {
    const shareText = `I just contributed ${formatCurrency(finalAmount)} to ${campaignName} on CCT! Join me in saving lives → https://cct.org/donate`
    
    if (platform === "whatsapp") {
      window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, "_blank")
    } else if (platform === "twitter") {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, "_blank")
    } else if (platform === "copy") {
      navigator.clipboard.writeText(shareText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // Processing animation component
  const ProcessingAnimation = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-3xl p-8 text-center max-w-sm mx-4"
      >
        {/* Animated blood drop filling */}
        <div className="relative w-24 h-32 mx-auto mb-6">
          <svg viewBox="0 0 40 56" className="w-full h-full">
            <defs>
              <clipPath id="dropClip">
                <path d="M20 0 C20 0 0 24 0 36 C0 47.046 8.954 56 20 56 C31.046 56 40 47.046 40 36 C40 24 20 0 20 0 Z" />
              </clipPath>
            </defs>
            {/* Background drop */}
            <path 
              d="M20 0 C20 0 0 24 0 36 C0 47.046 8.954 56 20 56 C31.046 56 40 47.046 40 36 C40 24 20 0 20 0 Z" 
              fill="#FEE2E2"
              stroke="#DC2626"
              strokeWidth="2"
            />
            {/* Filling animation */}
            <g clipPath="url(#dropClip)">
              <motion.rect
                x="0"
                y="56"
                width="40"
                height="56"
                fill="#DC2626"
                animate={{ y: [56, 0] }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
              />
            </g>
          </svg>
        </div>
        <motion.p 
          className="text-lg font-medium text-[#1A1A1A]"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Processing your donation...
        </motion.p>
        <p className="text-sm text-[#6B7280] mt-2">Please do not close this window</p>
      </motion.div>
    </motion.div>
  )

  // Success screen
  if (isComplete) {
    const transactionId = `TXN-2026-04-15-${Math.floor(Math.random() * 9000) + 1000}`
    
    return (
      <>
        {showConfetti && <Confetti />}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-screen pt-24 pb-20 px-4"
        >
          <div className="max-w-lg mx-auto text-center">
            {/* Success checkmark */}
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-24 h-24 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center"
            >
              <svg className="w-12 h-12 text-green-600" viewBox="0 0 24 24" fill="none">
                <motion.path
                  d="M5 13l4 4L19 7"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                />
              </svg>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-3"
            >
              Thank you, {formData.fullName.split(" ")[0]}!
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-[#6B7280] mb-8"
            >
              Your contribution makes a real difference in saving lives.
            </motion.p>

            {/* Receipt card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl p-6 shadow-lg shadow-black/5 mb-6 text-left"
            >
              <h3 className="font-semibold text-[#1A1A1A] mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Donation Receipt
              </h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Amount</span>
                  <span className="font-semibold text-[#DC2626]">{formatCurrency(finalAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Campaign</span>
                  <span className="font-medium text-[#1A1A1A] text-right max-w-[200px]">{campaignName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Transaction ID</span>
                  <span className="font-mono text-[#1A1A1A]">{transactionId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Date</span>
                  <span className="text-[#1A1A1A]">{new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
                </div>
              </div>

              {formData.pan && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm text-green-700 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Your 80G certificate will be emailed within 48 hours
                  </p>
                </div>
              )}
            </motion.div>

            {/* Impact message */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-6 mb-6"
            >
              <Heart className="w-8 h-8 text-[#DC2626] mx-auto mb-3" />
              <p className="text-[#1A1A1A] font-medium">
                Your {formatCurrency(finalAmount)} {getImpactMessage(finalAmount)}
              </p>
            </motion.div>

            {/* Share section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mb-8"
            >
              <p className="text-sm text-[#6B7280] mb-3 flex items-center justify-center gap-2">
                <Share2 className="w-4 h-4" />
                Spread the word
              </p>
              <div className="flex justify-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleShare("whatsapp")}
                  className="px-6 py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors"
                >
                  WhatsApp
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleShare("twitter")}
                  className="px-6 py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
                >
                  X
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleShare("copy")}
                  className="px-6 py-3 bg-gray-100 text-[#1A1A1A] rounded-xl font-medium hover:bg-gray-200 transition-colors flex items-center gap-2"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied!" : "Copy"}
                </motion.button>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onComplete?.("campaigns")}
                className="flex-1 py-4 bg-gradient-to-r from-[#DC2626] to-[#B91C1C] text-white font-semibold rounded-xl shadow-lg shadow-red-500/30"
              >
                Explore More Campaigns
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onComplete?.("register")}
                className="flex-1 py-4 bg-[#1E3A5F] text-white font-semibold rounded-xl"
              >
                Register as Blood Donor
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </>
    )
  }

  return (
    <>
      {isProcessing && <ProcessingAnimation />}
      
      <div className="min-h-screen pt-24 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Progress indicator */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <motion.div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${
                    step >= s 
                      ? "bg-[#DC2626] text-white" 
                      : "bg-gray-200 text-gray-500"
                  }`}
                  animate={{ scale: step === s ? 1.1 : 1 }}
                >
                  {step > s ? <Check className="w-5 h-5" /> : s}
                </motion.div>
                {s < 3 && (
                  <div className={`w-12 sm:w-20 h-1 mx-1 rounded ${
                    step > s ? "bg-[#DC2626]" : "bg-gray-200"
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Campaign context header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-4 mb-6 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#DC2626] to-[#B91C1C] rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-[#1A1A1A] truncate">{campaignName}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-[#DC2626] to-[#F59E0B] rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(campaignProgress.raised / campaignProgress.goal) * 100}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                  <span className="text-xs text-[#6B7280] whitespace-nowrap">
                    {formatCurrency(campaignProgress.raised)} of {formatCurrency(campaignProgress.goal)}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Step content */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              {step === 1 && (
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-black/5">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-2">
                    Choose Amount
                  </h2>
                  <p className="text-[#6B7280] mb-6">
                    Select a preset amount or enter your own
                  </p>

                  {/* Preset amounts */}
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-6">
                    {presetAmounts.map((amount) => (
                      <motion.button
                        key={amount}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setSelectedAmount(amount)
                          setCustomAmount("")
                        }}
                        className={`relative p-4 rounded-xl border-2 transition-all ${
                          selectedAmount === amount
                            ? "border-[#DC2626] bg-red-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {amount === 500 && (
                          <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#F59E0B] text-white text-[10px] font-semibold rounded-full whitespace-nowrap">
                            Most Popular
                          </span>
                        )}
                        <span className={`text-lg font-bold ${
                          selectedAmount === amount ? "text-[#DC2626]" : "text-[#1A1A1A]"
                        }`}>
                          ₹{amount.toLocaleString("en-IN")}
                        </span>
                        <AnimatePresence>
                          {selectedAmount === amount && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                              className="absolute top-2 right-2"
                            >
                              <Check className="w-4 h-4 text-[#DC2626]" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    ))}
                  </div>

                  {/* Custom amount */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-[#374151] mb-2">
                      Or enter a custom amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280] font-medium">₹</span>
                      <input
                        type="number"
                        value={customAmount}
                        onChange={(e) => {
                          setCustomAmount(e.target.value)
                          setSelectedAmount(null)
                        }}
                        min={50}
                        max={1000000}
                        placeholder="Enter amount (Min ₹50)"
                        className="w-full pl-8 pr-4 py-4 rounded-xl border border-gray-200 focus:border-[#DC2626] focus:ring-2 focus:ring-red-100 outline-none transition-all text-lg"
                      />
                    </div>
                  </div>

                  {/* Impact preview */}
                  <AnimatePresence mode="wait">
                    {finalAmount > 0 && (
                      <motion.div
                        key={finalAmount}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-4 mb-6"
                      >
                        <p className="text-center text-[#1A1A1A]">
                          <span className="font-semibold text-[#DC2626]">{formatCurrency(finalAmount)}</span>{" "}
                          {getImpactMessage(finalAmount)}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Continue button */}
                  <motion.button
                    whileHover={{ scale: finalAmount > 0 ? 1.02 : 1 }}
                    whileTap={{ scale: finalAmount > 0 ? 0.98 : 1 }}
                    onClick={nextStep}
                    disabled={!finalAmount || finalAmount < 50}
                    className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                      finalAmount >= 50
                        ? "bg-gradient-to-r from-[#DC2626] to-[#B91C1C] text-white shadow-lg shadow-red-500/30"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Continue
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </div>
              )}

              {step === 2 && (
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-black/5">
                  <button
                    onClick={prevStep}
                    className="flex items-center gap-2 text-[#6B7280] hover:text-[#1A1A1A] mb-4 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>

                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-2">
                    Your Details
                  </h2>
                  <p className="text-[#6B7280] mb-6">
                    No account needed. We just need a few details.
                  </p>

                  <div className="space-y-5">
                    {/* Full Name */}
                    <div>
                      <label className="block text-sm font-medium text-[#374151] mb-2">
                        Full Name <span className="text-[#DC2626]">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="Enter your full name"
                        className={`w-full px-4 py-4 rounded-xl border ${
                          errors.fullName ? "border-red-500" : "border-gray-200"
                        } focus:border-[#DC2626] focus:ring-2 focus:ring-red-100 outline-none transition-all`}
                      />
                      {errors.fullName && (
                        <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-[#374151] mb-2">
                        Email Address <span className="text-[#DC2626]">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        className={`w-full px-4 py-4 rounded-xl border ${
                          errors.email ? "border-red-500" : "border-gray-200"
                        } focus:border-[#DC2626] focus:ring-2 focus:ring-red-100 outline-none transition-all`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-[#374151] mb-2">
                        Phone Number <span className="text-[#DC2626]">*</span>
                      </label>
                      <div className="flex">
                        <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-gray-200 bg-gray-50 text-[#6B7280]">
                          +91
                        </span>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })}
                          placeholder="98765 43210"
                          className={`flex-1 px-4 py-4 rounded-r-xl border ${
                            errors.phone ? "border-red-500" : "border-gray-200"
                          } focus:border-[#DC2626] focus:ring-2 focus:ring-red-100 outline-none transition-all`}
                        />
                      </div>
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                      )}
                    </div>

                    {/* PAN */}
                    <div>
                      <label className="block text-sm font-medium text-[#374151] mb-2 flex items-center gap-2">
                        PAN Number
                        <span className="text-xs text-[#6B7280]">(Optional)</span>
                        <div className="relative group">
                          <Info className="w-4 h-4 text-[#6B7280] cursor-help" />
                          <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            whileHover={{ opacity: 1, y: 0 }}
                            className="absolute left-0 bottom-full mb-2 w-64 p-3 bg-[#1E3A5F] text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10"
                          >
                            Required for 80G tax certificate. Your PAN is encrypted and secure.
                            <div className="absolute bottom-0 left-4 w-2 h-2 bg-[#1E3A5F] transform translate-y-1/2 rotate-45" />
                          </motion.div>
                        </div>
                      </label>
                      <input
                        type="text"
                        value={formData.pan}
                        onChange={(e) => setFormData({ ...formData, pan: e.target.value.toUpperCase().slice(0, 10) })}
                        placeholder="ABCDE1234F"
                        className={`w-full px-4 py-4 rounded-xl border ${
                          errors.pan ? "border-red-500" : "border-gray-200"
                        } focus:border-[#DC2626] focus:ring-2 focus:ring-red-100 outline-none transition-all uppercase`}
                      />
                      {errors.pan && (
                        <p className="mt-1 text-sm text-red-500">{errors.pan}</p>
                      )}
                    </div>

                    {/* Updates checkbox */}
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.receiveUpdates}
                        onChange={(e) => setFormData({ ...formData, receiveUpdates: e.target.checked })}
                        className="mt-1 w-5 h-5 rounded border-gray-300 text-[#DC2626] focus:ring-[#DC2626]"
                      />
                      <span className="text-sm text-[#374151]">
                        {"I'd like to receive impact updates about this campaign"}
                      </span>
                    </label>
                  </div>

                  {/* Security strip */}
                  <div className="mt-6 p-4 bg-gray-50 rounded-xl flex items-center justify-center gap-3">
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Lock className="w-5 h-5 text-green-600" />
                    </motion.div>
                    <span className="text-sm text-[#6B7280]">
                      256-bit encrypted • PCI-DSS compliant • Your data is safe
                    </span>
                  </div>

                  {/* Continue button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={nextStep}
                    className="w-full mt-6 py-4 bg-gradient-to-r from-[#DC2626] to-[#B91C1C] text-white font-semibold rounded-xl shadow-lg shadow-red-500/30 flex items-center justify-center gap-2"
                  >
                    Proceed to Payment
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </div>
              )}

              {step === 3 && (
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Payment methods */}
                  <div className="lg:col-span-2 bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-black/5">
                    <button
                      onClick={prevStep}
                      className="flex items-center gap-2 text-[#6B7280] hover:text-[#1A1A1A] mb-4 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </button>

                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-2">
                      Choose Payment Method
                    </h2>
                    <p className="text-[#6B7280] mb-6">
                      Select your preferred payment option
                    </p>

                    <div className="space-y-4">
                      {/* UPI */}
                      <motion.div
                        onClick={() => setPaymentMethod("upi")}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          paymentMethod === "upi"
                            ? "border-[#DC2626] bg-red-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              paymentMethod === "upi" ? "border-[#DC2626]" : "border-gray-300"
                            }`}>
                              {paymentMethod === "upi" && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="w-3 h-3 bg-[#DC2626] rounded-full"
                                />
                              )}
                            </div>
                            <Smartphone className="w-6 h-6 text-[#1A1A1A]" />
                            <span className="font-medium text-[#1A1A1A]">UPI</span>
                          </div>
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                            Recommended
                          </span>
                        </div>

                        <AnimatePresence>
                          {paymentMethod === "upi" && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="mt-4 pt-4 border-t border-gray-100">
                                <label className="block text-sm font-medium text-[#374151] mb-2">
                                  UPI ID
                                </label>
                                <input
                                  type="text"
                                  placeholder="yourname@upi"
                                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#DC2626] focus:ring-2 focus:ring-red-100 outline-none transition-all"
                                />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>

                      {/* Card */}
                      <motion.div
                        onClick={() => setPaymentMethod("card")}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          paymentMethod === "card"
                            ? "border-[#DC2626] bg-red-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            paymentMethod === "card" ? "border-[#DC2626]" : "border-gray-300"
                          }`}>
                            {paymentMethod === "card" && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-3 h-3 bg-[#DC2626] rounded-full"
                              />
                            )}
                          </div>
                          <CreditCard className="w-6 h-6 text-[#1A1A1A]" />
                          <span className="font-medium text-[#1A1A1A]">Credit / Debit Card</span>
                        </div>

                        <AnimatePresence>
                          {paymentMethod === "card" && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="mt-4 pt-4 border-t border-gray-100 space-y-4">
                                <div>
                                  <label className="block text-sm font-medium text-[#374151] mb-2">
                                    Card Number
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="1234 5678 9012 3456"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#DC2626] focus:ring-2 focus:ring-red-100 outline-none transition-all"
                                  />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="block text-sm font-medium text-[#374151] mb-2">
                                      Expiry
                                    </label>
                                    <input
                                      type="text"
                                      placeholder="MM/YY"
                                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#DC2626] focus:ring-2 focus:ring-red-100 outline-none transition-all"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-[#374151] mb-2">
                                      CVV
                                    </label>
                                    <input
                                      type="text"
                                      placeholder="123"
                                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#DC2626] focus:ring-2 focus:ring-red-100 outline-none transition-all"
                                    />
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>

                      {/* Net Banking */}
                      <motion.div
                        onClick={() => setPaymentMethod("netbanking")}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          paymentMethod === "netbanking"
                            ? "border-[#DC2626] bg-red-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            paymentMethod === "netbanking" ? "border-[#DC2626]" : "border-gray-300"
                          }`}>
                            {paymentMethod === "netbanking" && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-3 h-3 bg-[#DC2626] rounded-full"
                              />
                            )}
                          </div>
                          <Building2 className="w-6 h-6 text-[#1A1A1A]" />
                          <span className="font-medium text-[#1A1A1A]">Net Banking</span>
                        </div>

                        <AnimatePresence>
                          {paymentMethod === "netbanking" && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="mt-4 pt-4 border-t border-gray-100">
                                <label className="block text-sm font-medium text-[#374151] mb-2">
                                  Select Bank
                                </label>
                                <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#DC2626] focus:ring-2 focus:ring-red-100 outline-none transition-all">
                                  <option value="">Choose your bank</option>
                                  <option value="sbi">State Bank of India</option>
                                  <option value="hdfc">HDFC Bank</option>
                                  <option value="icici">ICICI Bank</option>
                                  <option value="axis">Axis Bank</option>
                                  <option value="kotak">Kotak Mahindra Bank</option>
                                </select>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </div>

                    {/* Pay button */}
                    <motion.button
                      whileHover={{ scale: paymentMethod ? 1.02 : 1 }}
                      whileTap={{ scale: paymentMethod ? 0.98 : 1 }}
                      onClick={handlePayment}
                      disabled={!paymentMethod}
                      className={`w-full mt-6 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                        paymentMethod
                          ? "bg-gradient-to-r from-[#DC2626] to-[#B91C1C] text-white shadow-lg shadow-red-500/30"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      <Lock className="w-5 h-5" />
                      Pay {formatCurrency(finalAmount)}
                    </motion.button>
                  </div>

                  {/* Order summary */}
                  <div className="bg-white rounded-3xl p-6 shadow-xl shadow-black/5 h-fit lg:sticky lg:top-24">
                    <h3 className="font-semibold text-[#1A1A1A] mb-4">Order Summary</h3>
                    
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[#6B7280]">Campaign</span>
                        <span className="font-medium text-[#1A1A1A] text-right max-w-[150px] truncate">
                          {campaignName}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#6B7280]">Amount</span>
                        <span className="font-bold text-[#DC2626]">{formatCurrency(finalAmount)}</span>
                      </div>
                      <hr className="my-3" />
                      <div className="flex justify-between">
                        <span className="text-[#6B7280]">Name</span>
                        <span className="text-[#1A1A1A]">{formData.fullName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#6B7280]">Email</span>
                        <span className="text-[#1A1A1A] text-right max-w-[150px] truncate">{formData.email}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                        <Shield className="w-4 h-4 text-green-600" />
                        100% Secure Payment
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  )
}
