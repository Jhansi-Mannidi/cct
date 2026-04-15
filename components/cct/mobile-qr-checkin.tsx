"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Camera, 
  QrCode, 
  Check, 
  Search, 
  User, 
  Droplet,
  AlertTriangle,
  Award,
  Send,
  ChevronLeft,
  Smartphone
} from "lucide-react"

// Phone Frame Component
function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#1E3A5F] to-[#0F1F33] p-8">
      <div className="relative">
        {/* Phone bezel */}
        <div className="w-[390px] h-[844px] bg-black rounded-[3rem] p-3 shadow-2xl">
          {/* Screen */}
          <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
            {/* Dynamic Island */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[120px] h-[35px] bg-black rounded-full z-50" />
            
            {/* Home Indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-black/20 rounded-full z-50" />
            
            {/* Content */}
            <div className="h-full overflow-y-auto pt-16 pb-8">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// View Toggle Component
function ViewToggle({ 
  view, 
  onToggle 
}: { 
  view: "donor" | "admin"
  onToggle: (view: "donor" | "admin") => void 
}) {
  return (
    <div className="flex items-center justify-center mb-6">
      <div className="bg-gray-100 rounded-full p-1 flex">
        <motion.button
          onClick={() => onToggle("donor")}
          className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            view === "donor" ? "text-white" : "text-gray-600"
          }`}
        >
          {view === "donor" && (
            <motion.div
              layoutId="viewToggle"
              className="absolute inset-0 bg-[#DC2626] rounded-full"
              transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
            />
          )}
          <span className="relative z-10">Donor View</span>
        </motion.button>
        <motion.button
          onClick={() => onToggle("admin")}
          className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            view === "admin" ? "text-white" : "text-gray-600"
          }`}
        >
          {view === "admin" && (
            <motion.div
              layoutId="viewToggle"
              className="absolute inset-0 bg-[#1E3A5F] rounded-full"
              transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
            />
          )}
          <span className="relative z-10">Admin View</span>
        </motion.button>
      </div>
    </div>
  )
}

// Donor View - QR Scanner Screen
function DonorScannerScreen({ onScan }: { onScan: () => void }) {
  const [code, setCode] = useState("")

  return (
    <div className="px-6">
      <h2 className="text-xl font-bold text-[#1A1A1A] text-center mb-6">
        Check-in to Blood Drive
      </h2>

      {/* Camera View Placeholder */}
      <motion.div 
        className="relative aspect-square bg-[#1A1A1A] rounded-2xl overflow-hidden cursor-pointer mb-6"
        onClick={onScan}
        whileTap={{ scale: 0.98 }}
      >
        {/* Corner brackets */}
        <div className="absolute top-4 left-4 w-12 h-12 border-l-4 border-t-4 border-white/60 rounded-tl-lg" />
        <div className="absolute top-4 right-4 w-12 h-12 border-r-4 border-t-4 border-white/60 rounded-tr-lg" />
        <div className="absolute bottom-4 left-4 w-12 h-12 border-l-4 border-b-4 border-white/60 rounded-bl-lg" />
        <div className="absolute bottom-4 right-4 w-12 h-12 border-r-4 border-b-4 border-white/60 rounded-br-lg" />

        {/* Scanning line */}
        <motion.div
          className="absolute left-4 right-4 h-1 bg-gradient-to-r from-transparent via-[#DC2626] to-transparent rounded-full shadow-lg shadow-red-500/50"
          animate={{
            top: ["15%", "85%", "15%"]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <QrCode className="w-16 h-16 text-white/30" />
        </div>

        {/* Tap instruction */}
        <div className="absolute bottom-8 left-0 right-0 text-center">
          <span className="text-white/60 text-sm">Tap to simulate scan</span>
        </div>
      </motion.div>

      {/* Manual code entry */}
      <div className="text-center mb-4">
        <p className="text-sm text-gray-500 mb-3">Or enter check-in code manually</p>
        <div className="flex gap-2 justify-center">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <input
              key={i}
              type="text"
              maxLength={1}
              value={code[i] || ""}
              onChange={(e) => {
                const newCode = code.split("")
                newCode[i] = e.target.value.toUpperCase()
                setCode(newCode.join(""))
                if (e.target.value && i < 5) {
                  const next = e.target.nextElementSibling as HTMLInputElement
                  next?.focus()
                }
              }}
              className="w-10 h-12 text-center text-lg font-bold border-2 border-gray-200 rounded-lg focus:border-[#DC2626] focus:ring-2 focus:ring-red-100 outline-none"
            />
          ))}
        </div>
      </div>

      <motion.button
        onClick={onScan}
        disabled={code.length < 6}
        whileHover={{ scale: code.length === 6 ? 1.02 : 1 }}
        whileTap={{ scale: code.length === 6 ? 0.98 : 1 }}
        className={`w-full py-3 rounded-xl font-semibold transition-all ${
          code.length === 6
            ? "bg-[#DC2626] text-white shadow-lg shadow-red-500/30"
            : "bg-gray-100 text-gray-400 cursor-not-allowed"
        }`}
      >
        Submit Code
      </motion.button>
    </div>
  )
}

// Donor View - Check-in Confirmed Screen
function DonorConfirmedScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="px-6 py-4">
      <motion.button
        onClick={onBack}
        className="flex items-center gap-1 text-gray-500 mb-6"
        whileTap={{ x: -5 }}
      >
        <ChevronLeft className="w-5 h-5" />
        <span className="text-sm">Back</span>
      </motion.button>

      <div className="text-center">
        {/* Success checkmark */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
          className="w-24 h-24 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center relative"
        >
          <motion.div
            className="absolute inset-0 bg-green-400/30 rounded-full"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <svg className="w-12 h-12 text-green-600" viewBox="0 0 24 24" fill="none">
            <motion.path
              d="M5 12l5 5L20 7"
              stroke="currentColor"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            />
          </svg>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xl font-bold text-[#1A1A1A] mb-2"
        >
          Check-in Confirmed!
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-50 rounded-xl p-4 mb-6 text-left"
        >
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-semibold">Event:</span> Mega Blood Drive
          </p>
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-semibold">Location:</span> LB Stadium, Hyderabad
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Your Donor ID:</span> CCT-RAV-2024
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-[#1E3A5F] text-white rounded-xl p-4 mb-6"
        >
          <p className="text-sm mb-1">Please proceed to</p>
          <p className="text-2xl font-bold">Registration Desk B</p>
        </motion.div>

        {/* QR Code placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white border-2 border-gray-200 rounded-xl p-4 inline-block mb-6"
        >
          <div className="w-32 h-32 bg-[#1A1A1A] rounded-lg flex items-center justify-center">
            <QrCode className="w-20 h-20 text-white" />
          </div>
          <p className="text-xs text-gray-500 mt-2">Show this to staff</p>
        </motion.div>
      </div>
    </div>
  )
}

// Admin View - Search Screen
function AdminSearchScreen({ onDonorFound }: { onDonorFound: (eligible: boolean) => void }) {
  const [phone, setPhone] = useState("")
  const [searching, setSearching] = useState(false)
  const [donor, setDonor] = useState<{ name: string; blood: string; eligible: boolean } | null>(null)
  const [showWarning, setShowWarning] = useState(false)

  const handleSearch = () => {
    if (phone.length < 10) return
    setSearching(true)
    setTimeout(() => {
      setSearching(false)
      const isEligible = Math.random() > 0.3
      setDonor({
        name: "Ravi Kumar",
        blood: "A+",
        eligible: isEligible
      })
      if (!isEligible) {
        setShowWarning(true)
      }
    }, 1000)
  }

  return (
    <div className="px-6">
      <h2 className="text-xl font-bold text-[#1A1A1A] text-center mb-6">
        Record Donation
      </h2>

      {/* Search input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Search Donor
        </label>
        <div className="relative">
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
            placeholder="Enter phone number"
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#1E3A5F] focus:ring-2 focus:ring-blue-100 outline-none"
          />
          <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <motion.button
          onClick={handleSearch}
          disabled={phone.length < 10 || searching}
          whileHover={{ scale: phone.length >= 10 ? 1.02 : 1 }}
          whileTap={{ scale: phone.length >= 10 ? 0.98 : 1 }}
          className={`flex-1 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 ${
            phone.length >= 10
              ? "bg-[#1E3A5F] text-white"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          {searching ? (
            <motion.div
              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          ) : (
            <>
              <Search className="w-4 h-4" />
              Search
            </>
          )}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-3 rounded-xl border-2 border-gray-200 text-gray-700 flex items-center gap-2"
        >
          <Camera className="w-4 h-4" />
          Scan QR
        </motion.button>
      </div>

      {/* Donor Card */}
      <AnimatePresence>
        {donor && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", bounce: 0.3 }}
            className="bg-white border-2 border-gray-200 rounded-2xl p-4"
          >
            <div className="flex items-center gap-4 mb-4">
              {/* Avatar */}
              <div className="w-16 h-16 bg-gradient-to-br from-[#DC2626] to-[#B91C1C] rounded-full flex items-center justify-center text-white text-xl font-bold">
                RK
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-[#1A1A1A]">{donor.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 bg-red-100 text-[#DC2626] text-sm font-semibold rounded-full">
                    {donor.blood}
                  </span>
                  <span className="text-sm text-gray-500">CCT-RAV-2024</span>
                </div>
              </div>
            </div>

            {/* Eligibility Status */}
            {donor.eligible ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-xl"
              >
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <span className="font-semibold text-green-700">Eligible to Donate</span>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={showWarning ? { opacity: 1, x: [0, -10, 10, -10, 10, 0] } : { opacity: 1 }}
                transition={{ duration: 0.5 }}
                onAnimationComplete={() => setShowWarning(false)}
                className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl"
              >
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="font-semibold text-red-700 block">Not Eligible</span>
                  <span className="text-sm text-red-600">42 days remaining in cooldown</span>
                </div>
              </motion.div>
            )}

            {donor.eligible && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                onClick={() => onDonorFound(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-4 py-3 bg-[#DC2626] text-white font-semibold rounded-xl shadow-lg shadow-red-500/30"
              >
                Proceed to Record Donation
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Admin View - Donation Form Screen
function AdminDonationForm({ onSubmit }: { onSubmit: () => void }) {
  const [donationType, setDonationType] = useState("whole")
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = () => {
    setSubmitting(true)
    setTimeout(() => {
      onSubmit()
    }, 1500)
  }

  return (
    <div className="px-6">
      <h2 className="text-xl font-bold text-[#1A1A1A] text-center mb-6">
        Donation Details
      </h2>

      {/* Donor info bar */}
      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-[#DC2626] to-[#B91C1C] rounded-full flex items-center justify-center text-white font-bold text-sm">
          RK
        </div>
        <div>
          <p className="font-semibold text-[#1A1A1A]">Ravi Kumar</p>
          <p className="text-sm text-gray-500">A+ • CCT-RAV-2024</p>
        </div>
      </div>

      {/* Donation Type */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Donation Type
        </label>
        <div className="flex gap-2">
          {[
            { id: "whole", label: "Whole Blood" },
            { id: "platelets", label: "Platelets" },
            { id: "plasma", label: "Plasma" }
          ].map((type) => (
            <motion.button
              key={type.id}
              onClick={() => setDonationType(type.id)}
              whileTap={{ scale: 0.95 }}
              className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all relative ${
                donationType === type.id
                  ? "text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {donationType === type.id && (
                <motion.div
                  layoutId="donationType"
                  className="absolute inset-0 bg-[#DC2626] rounded-xl"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                />
              )}
              <span className="relative z-10">{type.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Blood Bank / Event */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Blood Bank / Event
        </label>
        <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#1E3A5F] focus:ring-2 focus:ring-blue-100 outline-none bg-white">
          <option>Mega Blood Drive - LB Stadium</option>
          <option>Red Cross Blood Bank, Hyderabad</option>
          <option>Gandhi Hospital Blood Centre</option>
        </select>
      </div>

      {/* Date */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Date
        </label>
        <input
          type="date"
          defaultValue={new Date().toISOString().split("T")[0]}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#1E3A5F] focus:ring-2 focus:ring-blue-100 outline-none"
        />
      </div>

      {/* Notes */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Notes (optional)
        </label>
        <textarea
          placeholder="Any observations..."
          rows={3}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#1E3A5F] focus:ring-2 focus:ring-blue-100 outline-none resize-none"
        />
      </div>

      <motion.button
        onClick={handleSubmit}
        disabled={submitting}
        whileHover={{ scale: submitting ? 1 : 1.02 }}
        whileTap={{ scale: submitting ? 1 : 0.98 }}
        className="w-full py-4 bg-[#DC2626] text-white font-semibold rounded-xl shadow-lg shadow-red-500/30 flex items-center justify-center gap-2"
      >
        {submitting ? (
          <>
            <motion.div
              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            Recording...
          </>
        ) : (
          <>
            <Droplet className="w-5 h-5" />
            Record Donation
          </>
        )}
      </motion.button>
    </div>
  )
}

// Admin View - Confirmation Screen
function AdminConfirmation({ onDone }: { onDone: () => void }) {
  const [sendSms, setSendSms] = useState(true)

  return (
    <div className="px-6 py-4">
      <div className="text-center">
        {/* Success checkmark */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
          className="w-24 h-24 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center relative"
        >
          <motion.div
            className="absolute inset-0 bg-green-400/30 rounded-full"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <svg className="w-12 h-12 text-green-600" viewBox="0 0 24 24" fill="none">
            <motion.path
              d="M5 12l5 5L20 7"
              stroke="currentColor"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            />
          </svg>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xl font-bold text-[#1A1A1A] mb-2"
        >
          Donation Recorded!
        </motion.h2>

        {/* Credits awarded */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4"
        >
          <p className="text-amber-800 font-semibold">+50 credits awarded to Ravi Kumar</p>
        </motion.div>

        {/* Badge earned */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", bounce: 0.5, delay: 0.5 }}
          className="bg-gradient-to-br from-[#F59E0B] to-[#D97706] text-white rounded-xl p-4 mb-4 flex items-center gap-3"
        >
          <motion.div
            initial={{ rotate: -20, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: "spring", bounce: 0.6, delay: 0.7 }}
          >
            <Award className="w-10 h-10" />
          </motion.div>
          <div className="text-left">
            <p className="font-bold">Badge Earned!</p>
            <p className="text-sm opacity-90">4th Donation</p>
          </div>
        </motion.div>

        {/* New Tier */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="relative bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-xl p-4 mb-6 overflow-hidden"
        >
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          />
          <p className="relative font-bold text-lg">New Tier: Silver Donor!</p>
        </motion.div>

        {/* SMS toggle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex items-center justify-between p-4 bg-gray-50 rounded-xl mb-6"
        >
          <div className="flex items-center gap-2">
            <Send className="w-5 h-5 text-gray-500" />
            <span className="text-sm text-gray-700">Send health tips via SMS</span>
          </div>
          <motion.button
            onClick={() => setSendSms(!sendSms)}
            className={`w-12 h-7 rounded-full p-1 transition-colors ${
              sendSms ? "bg-[#DC2626]" : "bg-gray-300"
            }`}
          >
            <motion.div
              className="w-5 h-5 bg-white rounded-full shadow"
              animate={{ x: sendSms ? 20 : 0 }}
              transition={{ type: "spring", bounce: 0.3 }}
            />
          </motion.button>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          onClick={onDone}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 bg-[#1E3A5F] text-white font-semibold rounded-xl"
        >
          Done
        </motion.button>
      </div>
    </div>
  )
}

// Main Component
export function MobileQRCheckin() {
  const [view, setView] = useState<"donor" | "admin">("donor")
  const [donorStep, setDonorStep] = useState(1)
  const [adminStep, setAdminStep] = useState(1)
  const [scanFlash, setScanFlash] = useState(false)

  const handleDonorScan = () => {
    setScanFlash(true)
    setTimeout(() => {
      setScanFlash(false)
      setDonorStep(2)
    }, 300)
  }

  return (
    <PhoneFrame>
      {/* Scan flash overlay */}
      <AnimatePresence>
        {scanFlash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-green-400/50 z-40"
          />
        )}
      </AnimatePresence>

      {/* View Toggle */}
      <ViewToggle 
        view={view} 
        onToggle={(newView) => {
          setView(newView)
          setDonorStep(1)
          setAdminStep(1)
        }} 
      />

      {/* Donor View */}
      <AnimatePresence mode="wait">
        {view === "donor" && (
          <motion.div
            key={`donor-${donorStep}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {donorStep === 1 && <DonorScannerScreen onScan={handleDonorScan} />}
            {donorStep === 2 && <DonorConfirmedScreen onBack={() => setDonorStep(1)} />}
          </motion.div>
        )}

        {/* Admin View */}
        {view === "admin" && (
          <motion.div
            key={`admin-${adminStep}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {adminStep === 1 && <AdminSearchScreen onDonorFound={() => setAdminStep(2)} />}
            {adminStep === 2 && <AdminDonationForm onSubmit={() => setAdminStep(3)} />}
            {adminStep === 3 && <AdminConfirmation onDone={() => setAdminStep(1)} />}
          </motion.div>
        )}
      </AnimatePresence>
    </PhoneFrame>
  )
}
