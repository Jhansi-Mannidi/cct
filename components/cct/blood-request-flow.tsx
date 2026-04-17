"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Heart, 
  Droplet, 
  Clock, 
  Calendar, 
  CalendarDays,
  MapPin, 
  Phone, 
  Navigation,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Check,
  AlertTriangle,
  Radio,
  Building2,
  User,
  Stethoscope,
  FileText,
  Headphones
} from "lucide-react"

// Blood type compatibility data
const bloodCompatibility: Record<string, string[]> = {
  "A+": ["A+", "A-", "O+", "O-"],
  "A-": ["A-", "O-"],
  "B+": ["B+", "B-", "O+", "O-"],
  "B-": ["B-", "O-"],
  "AB+": ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  "AB-": ["A-", "B-", "AB-", "O-"],
  "O+": ["O+", "O-"],
  "O-": ["O-"]
}

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

// Mock blood bank results
const mockBloodBanks = [
  {
    id: 1,
    name: "Red Cross Blood Bank",
    hospital: "NIMS Hospital",
    address: "Punjagutta, Hyderabad",
    distance: "2.3 km",
    phone: "+91 40 2345 6789",
    stockLevel: "sufficient",
    units: 45
  },
  {
    id: 2,
    name: "Gandhi Hospital Blood Centre",
    hospital: "Gandhi Hospital",
    address: "Musheerabad, Hyderabad",
    distance: "4.1 km",
    phone: "+91 40 2789 0123",
    stockLevel: "low",
    units: 12
  },
  {
    id: 3,
    name: "Care Blood Bank",
    hospital: "Care Hospitals",
    address: "Banjara Hills, Hyderabad",
    distance: "5.8 km",
    phone: "+91 40 6789 0123",
    stockLevel: "critical",
    units: 4
  }
]

// Animation variants
const pageTransition = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
}

// Radar Pulse Component
function RadarPulse() {
  return (
    <div className="relative w-32 h-32 mx-auto">
      {/* Center dot */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-4 h-4 bg-[#DC2626] rounded-full z-10" />
      </div>
      
      {/* Pulse rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 border-2 border-[#DC2626] rounded-full"
          initial={{ scale: 0.3, opacity: 0.8 }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.6,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  )
}

// Success Checkmark Component
function SuccessCheckmark() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", damping: 10, stiffness: 100 }}
      className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center"
    >
      <motion.svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        className="text-green-600"
      >
        <motion.path
          d="M10 24L20 34L38 14"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
      </motion.svg>
    </motion.div>
  )
}

export function BloodRequestFlow() {
  const [step, setStep] = useState(1)
  const [selectedBloodType, setSelectedBloodType] = useState<string | null>(null)
  const [selectedUrgency, setSelectedUrgency] = useState<string | null>(null)
  const [units, setUnits] = useState(1)
  const [selectedBank, setSelectedBank] = useState<typeof mockBloodBanks[0] | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [donorsNotified, setDonorsNotified] = useState(0)
  
  // Form data for step 3
  const [formData, setFormData] = useState({
    patientName: "",
    hospitalName: "",
    doctorName: "",
    contactPhone: "",
    additionalNotes: ""
  })

  // Simulate donors being notified
  useEffect(() => {
    if (step === 2) {
      const interval = setInterval(() => {
        setDonorsNotified(prev => {
          if (prev >= 23) {
            clearInterval(interval)
            return 23
          }
          return prev + 1
        })
      }, 100)
      return () => clearInterval(interval)
    }
  }, [step])

  const handleNext = () => {
    if (step === 1 && selectedBloodType && selectedUrgency) {
      setStep(2)
    }
  }

  const handleSelectBank = (bank: typeof mockBloodBanks[0]) => {
    setSelectedBank(bank)
    setStep(3)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSuccess(true)
  }

  const getStockBadge = (level: string) => {
    switch (level) {
      case "critical":
        return (
          <motion.span 
            className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full flex items-center gap-1"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <AlertTriangle className="w-3 h-3" />
            Critical
          </motion.span>
        )
      case "low":
        return (
          <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
            Low Stock
          </span>
        )
      default:
        return (
          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
            Sufficient
          </span>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF7ED] to-white pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {/* STEP 1 - BLOOD TYPE & URGENCY */}
          {step === 1 && (
            <motion.div
              key="step1"
              variants={pageTransition}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <motion.div
                className="absolute -top-10 left-1/4 w-56 h-56 rounded-full bg-[#DC2626]/8 blur-3xl pointer-events-none"
                animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.55, 0.35] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute top-24 right-10 w-44 h-44 rounded-full bg-[#F59E0B]/10 blur-3xl pointer-events-none"
                animate={{ scale: [1, 1.12, 1], opacity: [0.25, 0.45, 0.25] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
              />

              {/* Header */}
              <div className="text-center mb-8 relative z-10">
                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.1 }}
                  className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-2"
                >
                  Need Blood?
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="text-[#6B7280] text-sm md:text-base"
                >
                  We&apos;ll help you find blood quickly
                </motion.p>
              </div>

              <div className="grid lg:grid-cols-2 gap-5 mb-5 relative z-10">
                {/* Blood Type Selector */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.15 }}
                  whileHover={{ y: -2 }}
                  className="bg-white rounded-2xl border border-[#ECE7DD] shadow-sm p-5 md:p-6"
                >
                  <h2 className="text-base font-semibold text-[#1A1A1A] mb-4 flex items-center gap-2">
                    <Droplet className="w-4 h-4 text-[#DC2626]" />
                    Select Blood Type
                  </h2>
                  
                  <div className="grid grid-cols-4 gap-2.5 mb-4">
                    {bloodTypes.map((type) => (
                      <motion.button
                        key={type}
                        onClick={() => setSelectedBloodType(type)}
                        whileHover={{ scale: 1.04, y: -1 }}
                        whileTap={{ scale: 0.95 }}
                        animate={selectedBloodType === type ? { scale: [1, 1.06, 1.03] } : { scale: 1 }}
                        transition={{ duration: 0.25 }}
                        className={`
                          relative w-full h-14 rounded-xl flex items-center justify-center
                          text-base font-semibold transition-all duration-200 border
                          ${selectedBloodType === type 
                            ? "bg-[#DC2626] text-white border-[#DC2626] shadow-md shadow-red-200" 
                            : "bg-[#F9F7F2] border-[#E9E3D8] text-[#1A1A1A] hover:bg-[#F3EEE4]"
                          }
                        `}
                      >
                        {selectedBloodType === type && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-white/20 border border-white/50"
                          />
                        )}
                        {type}
                      </motion.button>
                    ))}
                  </div>

                  {/* Compatible donors info */}
                  <AnimatePresence>
                    {selectedBloodType && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-[#F3F8FF] border border-[#DCE8FA] rounded-xl p-3.5 mt-4"
                      >
                        <p className="text-sm text-[#1E3A5F]">
                          <span className="font-medium">Compatible donors: </span>
                          {bloodCompatibility[selectedBloodType]?.join(", ")}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Urgency Selector */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.25 }}
                  whileHover={{ y: -2 }}
                  className="bg-white rounded-2xl border border-[#ECE7DD] shadow-sm p-5 md:p-6"
                >
                  <h2 className="text-base font-semibold text-[#1A1A1A] mb-4 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#DC2626]" />
                    How Urgent?
                  </h2>
                  
                  <div className="space-y-3">
                    {[
                      { id: "24h", label: "Within 24 Hours", icon: AlertTriangle, color: "red", desc: "Emergency requirement" },
                      { id: "3d", label: "Within 3 Days", icon: Calendar, color: "amber", desc: "Planned procedure" },
                      { id: "1w", label: "Within a Week", icon: CalendarDays, color: "green", desc: "Non-urgent need" }
                    ].map((urgency) => (
                      <motion.button
                        key={urgency.id}
                        onClick={() => setSelectedUrgency(urgency.id)}
                        whileHover={{ scale: 1.01, x: 2 }}
                        whileTap={{ scale: 0.98 }}
                        className={`
                          w-full p-3.5 rounded-xl border text-left transition-all duration-200 relative overflow-hidden
                          ${selectedUrgency === urgency.id 
                            ? urgency.color === "red" 
                              ? "border-red-300 bg-red-50" 
                              : urgency.color === "amber"
                                ? "border-amber-300 bg-amber-50"
                                : "border-green-300 bg-green-50"
                            : "border-[#E8E2D7] bg-white hover:border-[#D8D0C2]"
                          }
                        `}
                      >
                        {/* Pulsing border for 24h option when selected */}
                        {selectedUrgency === urgency.id && urgency.id === "24h" && (
                          <motion.div
                            className="absolute inset-0 border border-red-300 rounded-xl"
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                        )}
                        
                        <div className="flex items-center gap-4">
                          <div className={`
                            w-11 h-11 rounded-lg flex items-center justify-center
                            ${urgency.color === "red" 
                              ? "bg-red-100 text-red-600" 
                              : urgency.color === "amber"
                                ? "bg-amber-100 text-amber-600"
                                : "bg-green-100 text-green-600"
                            }
                          `}>
                            <urgency.icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-[#1A1A1A] text-[15px]">{urgency.label}</p>
                            <p className="text-xs text-[#6B7280]">{urgency.desc}</p>
                          </div>
                          {selectedUrgency === urgency.id && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-5 h-5 bg-[#16A34A] rounded-full flex items-center justify-center"
                            >
                              <Check className="w-3.5 h-3.5 text-white" />
                            </motion.div>
                          )}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Units Needed */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.32 }}
                className="bg-white rounded-2xl border border-[#ECE7DD] shadow-sm p-5 md:p-6 mb-6 relative z-10"
              >
                <h2 className="text-base font-semibold text-[#1A1A1A] mb-4 flex items-center gap-2">
                  <Droplet className="w-4 h-4 text-[#DC2626]" />
                  Units Needed
                </h2>
                
                <div className="flex items-center justify-center gap-5">
                  <motion.button
                    whileHover={units > 1 ? { scale: 1.05 } : undefined}
                    whileTap={units > 1 ? { scale: 0.9 } : undefined}
                    disabled={units <= 1}
                    onClick={() => setUnits(Math.max(1, units - 1))}
                    className="w-11 h-11 rounded-full bg-[#F4F4F5] border border-[#E4E4E7] flex items-center justify-center text-[#1A1A1A] hover:bg-[#EDEDF0] transition-colors disabled:opacity-45 disabled:cursor-not-allowed disabled:hover:bg-[#F4F4F5]"
                  >
                    <Minus className="w-5 h-5" />
                  </motion.button>
                  
                  <motion.span
                    key={units}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    className="text-4xl font-bold text-[#DC2626] w-16 text-center"
                  >
                    {units}
                  </motion.span>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setUnits(Math.min(10, units + 1))}
                    className="w-11 h-11 rounded-full bg-[#F4F4F5] border border-[#E4E4E7] flex items-center justify-center text-[#1A1A1A] hover:bg-[#EDEDF0] transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </motion.button>
                </div>
                <p className="text-center text-xs text-[#6B7280] mt-2">
                  1 unit = ~450ml of blood
                </p>
              </motion.div>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNext}
                disabled={!selectedBloodType || !selectedUrgency}
                animate={
                  selectedBloodType && selectedUrgency
                    ? { boxShadow: ["0 6px 18px rgba(201,29,46,0.18)", "0 10px 24px rgba(201,29,46,0.26)", "0 6px 18px rgba(201,29,46,0.18)"] }
                    : {}
                }
                transition={{ duration: 1.6, repeat: selectedBloodType && selectedUrgency ? Infinity : 0 }}
                className={`
                  w-full py-4 rounded-xl font-semibold text-base flex items-center justify-center gap-2 transition-all relative z-10
                  ${selectedBloodType && selectedUrgency
                    ? "bg-[#C91D2E] text-white shadow-md shadow-red-200 hover:bg-[#AF1726]"
                    : "bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed"
                  }
                `}
              >
                Find Blood
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          )}

          {/* STEP 2 - MATCHING RESULTS */}
          {step === 2 && !isSuccess && (
            <motion.div
              key="step2"
              variants={pageTransition}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              {/* Back Button */}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => setStep(1)}
                className="flex items-center gap-2 text-[#6B7280] hover:text-[#1A1A1A] mb-6 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                Back
              </motion.button>

              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-2 flex items-center justify-center gap-3">
                  Available near you
                  <span className="px-3 py-1 bg-[#DC2626] text-white text-lg rounded-full">
                    {selectedBloodType}
                  </span>
                </h1>
              </div>

              {/* Donor Notification Radar */}
              <motion.div
                variants={staggerItem}
                initial="initial"
                animate="animate"
                className="bg-gradient-to-br from-[#1E3A5F] to-[#0F1D2F] rounded-3xl p-6 mb-6 text-white text-center"
              >
                <RadarPulse />
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-2xl font-bold mt-4"
                >
                  {donorsNotified} eligible donors notified
                </motion.p>
                <p className="text-blue-200 text-sm mt-2">
                  Matching donors are being notified via SMS.
                  <br />
                  You&apos;ll receive a confirmation when a donor responds.
                </p>
              </motion.div>

              {/* Blood Bank Results */}
              <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#DC2626]" />
                Blood Banks with {selectedBloodType}
              </h2>

              <motion.div
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="space-y-4 mb-8"
              >
                {mockBloodBanks
                  .sort((a, b) => {
                    // Sort by stock level (sufficient first) then by distance
                    const stockOrder = { sufficient: 0, low: 1, critical: 2 }
                    const stockDiff = stockOrder[a.stockLevel as keyof typeof stockOrder] - stockOrder[b.stockLevel as keyof typeof stockOrder]
                    if (stockDiff !== 0) return stockDiff
                    return parseFloat(a.distance) - parseFloat(b.distance)
                  })
                  .map((bank) => (
                    <motion.div
                      key={bank.id}
                      variants={staggerItem}
                      className="bg-white rounded-2xl shadow-lg shadow-black/5 p-5 border border-gray-100"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-[#1A1A1A]">{bank.name}</h3>
                          <p className="text-sm text-[#6B7280]">{bank.hospital}</p>
                        </div>
                        {getStockBadge(bank.stockLevel)}
                      </div>

                      <div className="flex items-center gap-2 text-sm text-[#6B7280] mb-3">
                        <MapPin className="w-4 h-4" />
                        <span>{bank.address}</span>
                        <span className="text-[#DC2626] font-medium ml-auto">{bank.distance}</span>
                      </div>

                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-2 px-3 py-2 bg-red-50 rounded-xl">
                          <Droplet className="w-4 h-4 text-[#DC2626]" />
                          <span className="font-semibold text-[#DC2626]">{bank.units} units</span>
                          <span className="text-sm text-[#6B7280]">of {selectedBloodType}</span>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <motion.a
                          href={`tel:${bank.phone}`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 py-3 bg-green-500 text-white rounded-xl font-medium flex items-center justify-center gap-2"
                        >
                          <Phone className="w-4 h-4" />
                          Call Now
                        </motion.a>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 py-3 bg-gray-100 text-[#1A1A1A] rounded-xl font-medium flex items-center justify-center gap-2"
                        >
                          <Navigation className="w-4 h-4" />
                          Directions
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
              </motion.div>

              {/* Request from specific bank CTA */}
              <div className="bg-white rounded-3xl shadow-xl shadow-black/5 p-6 text-center">
                <h3 className="font-semibold text-[#1A1A1A] mb-2">Need to submit a formal request?</h3>
                <p className="text-sm text-[#6B7280] mb-4">
                  Select a blood bank to submit a detailed blood request form.
                </p>
                <div className="space-y-3">
                  {mockBloodBanks.map((bank) => (
                    <motion.button
                      key={bank.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelectBank(bank)}
                      className="w-full py-3 px-4 bg-[#1E3A5F] text-white rounded-xl font-medium flex items-center justify-between"
                    >
                      <span>{bank.name}</span>
                      <ChevronRight className="w-5 h-5" />
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Emergency Helpline */}
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-center">
                <div className="flex items-center justify-center gap-2 text-[#DC2626] font-semibold mb-1">
                  <Headphones className="w-5 h-5" />
                  CCT Emergency Helpline
                </div>
                <a href="tel:18001234567" className="text-xl font-bold text-[#DC2626]">
                  1800-123-4567
                </a>
                <p className="text-sm text-[#6B7280] mt-1">Available 24/7</p>
              </div>
            </motion.div>
          )}

          {/* STEP 3 - FORMAL REQUEST FORM */}
          {step === 3 && !isSuccess && (
            <motion.div
              key="step3"
              variants={pageTransition}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              {/* Back Button */}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => setStep(2)}
                className="flex items-center gap-2 text-[#6B7280] hover:text-[#1A1A1A] mb-6 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                Back to Results
              </motion.button>

              {/* Selected Bank */}
              {selectedBank && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#1E3A5F] text-white rounded-2xl p-4 mb-6"
                >
                  <p className="text-sm text-blue-200 mb-1">Requesting from</p>
                  <h2 className="font-semibold text-lg">{selectedBank.name}</h2>
                  <p className="text-sm text-blue-200">{selectedBank.hospital}</p>
                </motion.div>
              )}

              {/* Request Form */}
              <div className="bg-white rounded-3xl shadow-xl shadow-black/5 p-6 md:p-8">
                <h2 className="text-xl font-semibold text-[#1A1A1A] mb-6 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#DC2626]" />
                  Blood Request Form
                </h2>

                <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                  {/* Patient Name */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-[#374151] mb-2">
                      <User className="w-4 h-4" />
                      Patient Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.patientName}
                      onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                      className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:border-[#DC2626] focus:ring-2 focus:ring-red-100 outline-none transition-all text-lg"
                      placeholder="Enter patient name"
                    />
                  </div>

                  {/* Hospital Name */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-[#374151] mb-2">
                      <Building2 className="w-4 h-4" />
                      Hospital Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.hospitalName}
                      onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
                      className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:border-[#DC2626] focus:ring-2 focus:ring-red-100 outline-none transition-all text-lg"
                      placeholder="Where is the patient admitted?"
                    />
                  </div>

                  {/* Doctor Name (Optional) */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-[#374151] mb-2">
                      <Stethoscope className="w-4 h-4" />
                      Doctor Name <span className="text-[#6B7280] font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      value={formData.doctorName}
                      onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
                      className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:border-[#DC2626] focus:ring-2 focus:ring-red-100 outline-none transition-all text-lg"
                      placeholder="Treating doctor's name"
                    />
                  </div>

                  {/* Contact Phone */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-[#374151] mb-2">
                      <Phone className="w-4 h-4" />
                      Contact Phone *
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-4 bg-gray-100 border border-r-0 border-gray-200 rounded-l-xl text-[#6B7280]">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        value={formData.contactPhone}
                        onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                        className="flex-1 px-4 py-4 rounded-r-xl border border-gray-200 focus:border-[#DC2626] focus:ring-2 focus:ring-red-100 outline-none transition-all text-lg"
                        placeholder="98765 43210"
                      />
                    </div>
                  </div>

                  {/* Units Needed */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-[#374151] mb-2">
                      <Droplet className="w-4 h-4" />
                      Units Needed
                    </label>
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                      <span className="text-3xl font-bold text-[#DC2626]">{units}</span>
                      <span className="text-[#6B7280]">units of {selectedBloodType}</span>
                    </div>
                  </div>

                  {/* Additional Notes */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-[#374151] mb-2">
                      <FileText className="w-4 h-4" />
                      Additional Notes <span className="text-[#6B7280] font-normal">(Optional)</span>
                    </label>
                    <textarea
                      value={formData.additionalNotes}
                      onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:border-[#DC2626] focus:ring-2 focus:ring-red-100 outline-none transition-all text-lg resize-none"
                      placeholder="Any additional information..."
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                    className="w-full py-5 bg-gradient-to-r from-[#DC2626] to-[#B91C1C] text-white rounded-2xl font-semibold text-lg shadow-lg shadow-red-500/30 flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Request
                        <ChevronRight className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                </form>
              </div>

              {/* Emergency Helpline */}
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-center">
                <div className="flex items-center justify-center gap-2 text-[#DC2626] font-semibold mb-1">
                  <Headphones className="w-5 h-5" />
                  For immediate help
                </div>
                <a href="tel:18001234567" className="text-xl font-bold text-[#DC2626]">
                  1800-123-4567
                </a>
              </div>
            </motion.div>
          )}

          {/* SUCCESS STATE */}
          {isSuccess && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <SuccessCheckmark />
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mt-6 mb-2">
                  Request Submitted!
                </h2>
                <p className="text-[#6B7280] mb-6">
                  {selectedBank?.name} will contact you shortly.
                </p>

                <div className="bg-white rounded-2xl shadow-lg shadow-black/5 p-6 mb-6 max-w-sm mx-auto">
                  <p className="text-sm text-[#6B7280] mb-1">Request ID</p>
                  <p className="text-xl font-mono font-bold text-[#1E3A5F]">
                    #BR-2026-0847
                  </p>
                </div>

                <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl mb-6 max-w-sm mx-auto">
                  <p className="text-sm text-amber-800">
                    Save this Request ID for your records. The blood bank will call you within 30 minutes.
                  </p>
                </div>

                {/* Emergency Helpline */}
                <div className="p-4 bg-red-50 border border-red-200 rounded-2xl max-w-sm mx-auto">
                  <div className="flex items-center justify-center gap-2 text-[#DC2626] font-semibold mb-1">
                    <Headphones className="w-5 h-5" />
                    CCT Emergency Helpline
                  </div>
                  <a href="tel:18001234567" className="text-xl font-bold text-[#DC2626]">
                    1800-123-4567
                  </a>
                  <p className="text-sm text-[#6B7280] mt-1">Available 24/7</p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setStep(1)
                    setIsSuccess(false)
                    setSelectedBloodType(null)
                    setSelectedUrgency(null)
                    setUnits(1)
                    setSelectedBank(null)
                    setFormData({
                      patientName: "",
                      hospitalName: "",
                      doctorName: "",
                      contactPhone: "",
                      additionalNotes: ""
                    })
                  }}
                  className="mt-8 px-8 py-3 bg-[#1E3A5F] text-white rounded-xl font-medium"
                >
                  Start New Request
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
