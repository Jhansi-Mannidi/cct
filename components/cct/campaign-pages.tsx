"use client"

import { motion, AnimatePresence, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import {
  Heart,
  Clock,
  Users,
  ArrowLeft,
  ArrowRight,
  Share2,
  Copy,
  Check,
  Building2,
  MapPin,
  Calendar,
  TrendingUp,
  AlertCircle,
  Timer,
  Stethoscope,
  Truck,
  Wrench,
  Zap,
  ChevronDown,
  MessageSquare,
} from "lucide-react"

// Brand Colors
const COLORS = {
  bloodRed: "#DC2626",
  trustNavy: "#1E3A5F",
  goldAccent: "#F59E0B",
  cream: "#FFF7ED",
}

// Category configurations
const CATEGORIES = {
  equipment: { label: "Equipment", color: "bg-blue-400", icon: Wrench },
  "patient-support": { label: "Patient Support", color: "bg-emerald-400", icon: Stethoscope },
  "blood-bank-ops": { label: "Blood Bank Ops", color: "bg-rose-400", icon: Heart },
  infrastructure: { label: "Infrastructure", color: "bg-amber-400", icon: Building2 },
  emergency: { label: "Emergency", color: "bg-red-400", icon: Zap },
}

// City options
const CITIES = ["All Cities", "Hyderabad", "Guntur", "Tirupati", "Kakinada", "Visakhapatnam"]

// Filter tabs
const FILTER_TABS = [
  { id: "all", label: "All" },
  { id: "equipment", label: "Equipment" },
  { id: "patient-support", label: "Patient Support" },
  { id: "blood-bank-ops", label: "Blood Bank Ops" },
  { id: "infrastructure", label: "Infrastructure" },
  { id: "emergency", label: "Emergency" },
]

// Mock campaigns data
const CAMPAIGNS = [
  {
    id: "general-fund",
    isGeneralFund: true,
    title: "CCT General Fund",
    description: "Contribute to CCT's General Fund — your donation goes where it's needed most.",
    fullDescription: `The CCT General Fund is the backbone of our operations, providing flexibility to respond to urgent needs across all our programs. Your contribution helps us maintain blood bank operations, support patients in need, upgrade equipment, and respond to emergencies without delay.

When you donate to the General Fund, you're trusting us to direct your contribution where it will have the greatest impact. This might mean purchasing critical supplies during a shortage, supporting a patient who can't afford treatment, or helping us maintain our network of blood banks.

Every rupee counts, and your generosity enables us to act swiftly when lives are on the line.`,
    institution: "Chiranjeevi Charitable Trust",
    city: "Hyderabad",
    category: "blood-bank-ops",
    raised: 4500000,
    goal: 10000000,
    donors: 1234,
    daysLeft: 365,
    urgent: false,
    closingSoon: false,
    coverGradient: "from-[#1E3A5F] to-[#0F172A]",
    updates: [
      { date: "2024-01-15", text: "We have allocated Rs. 5,00,000 to emergency blood supplies this month." },
      { date: "2024-01-08", text: "Thank you for helping us reach 1,200+ donors for the General Fund!" },
    ],
    contributors: [
      { name: "Ramesh Kumar", amount: 25000, timeAgo: "2 hours ago" },
      { name: "Anonymous", amount: 10000, timeAgo: "5 hours ago" },
      { name: "Lakshmi Devi", amount: 5000, timeAgo: "1 day ago" },
      { name: "Tech Solutions Pvt Ltd", amount: 100000, timeAgo: "2 days ago" },
      { name: "Anonymous", amount: 2500, timeAgo: "3 days ago" },
    ],
  },
  {
    id: "platelet-separator",
    title: "Fund Platelet Separator",
    description: "Help us purchase a state-of-the-art platelet separator machine for Guntur Blood Bank to serve cancer patients and those with blood disorders.",
    fullDescription: `Platelets are essential for patients undergoing cancer treatment, those with blood disorders, and accident victims. Currently, the Guntur Blood Bank relies on outdated equipment that cannot efficiently separate platelets from whole blood donations.

A modern platelet separator will allow us to collect platelets directly from donors through apheresis, a process that returns red cells to the donor while collecting only the platelets. This means we can help more patients with each donation and ensure a steady supply of this critical blood component.

The equipment we're fundraising for is the Terumo BCT Trima Accel, which can process up to 20 platelet donations per day. This will dramatically increase our capacity to serve cancer patients at the Guntur Government Hospital and surrounding areas.`,
    institution: "Guntur Blood Bank",
    city: "Guntur",
    category: "equipment",
    raised: 1240000,
    goal: 1800000,
    donors: 342,
    daysLeft: 23,
    urgent: false,
    closingSoon: false,
    coverGradient: "from-blue-600 to-blue-800",
    updates: [
      { date: "2024-01-12", text: "We've reached 68% of our goal! Thank you to all 342 donors." },
      { date: "2024-01-05", text: "Equipment vendor has confirmed delivery within 2 weeks of funding completion." },
    ],
    contributors: [
      { name: "Dr. Suresh Reddy", amount: 50000, timeAgo: "3 hours ago" },
      { name: "Guntur Lions Club", amount: 75000, timeAgo: "1 day ago" },
      { name: "Anonymous", amount: 5000, timeAgo: "1 day ago" },
      { name: "Srinivas Rao", amount: 10000, timeAgo: "2 days ago" },
      { name: "Padma Foundation", amount: 100000, timeAgo: "4 days ago" },
    ],
  },
  {
    id: "thalassemia-support",
    title: "Support 50 Thalassemia Patients Monthly",
    description: "Provide regular blood transfusions and chelation therapy for thalassemia patients who cannot afford treatment.",
    fullDescription: `Thalassemia is a genetic blood disorder that requires patients to receive regular blood transfusions, often every 2-4 weeks, throughout their lives. Without these transfusions, patients face severe anemia, organ damage, and reduced life expectancy.

At NIMS Hyderabad, we support over 50 thalassemia patients, many from economically disadvantaged families. Each transfusion costs approximately Rs. 2,500 including blood, testing, and chelation therapy (medication to remove excess iron from repeated transfusions).

Your contribution directly funds these life-sustaining treatments. Rs. 6,00,000 annually covers all 50 patients for a full year of transfusions and chelation therapy, giving them the chance to live normal, productive lives.`,
    institution: "NIMS Hyderabad",
    city: "Hyderabad",
    category: "patient-support",
    raised: 380000,
    goal: 600000,
    donors: 189,
    daysLeft: 45,
    urgent: false,
    closingSoon: false,
    coverGradient: "from-emerald-600 to-emerald-800",
    updates: [
      { date: "2024-01-10", text: "This month's transfusions for all 50 patients have been completed successfully." },
      { date: "2024-01-02", text: "We welcomed 3 new thalassemia patients to our support program." },
    ],
    contributors: [
      { name: "Hyderabad Blood Donors Association", amount: 50000, timeAgo: "6 hours ago" },
      { name: "Anonymous", amount: 2500, timeAgo: "12 hours ago" },
      { name: "Meera Sharma", amount: 5000, timeAgo: "1 day ago" },
      { name: "Rajesh Gupta", amount: 10000, timeAgo: "3 days ago" },
      { name: "Anonymous", amount: 1000, timeAgo: "4 days ago" },
    ],
  },
  {
    id: "emergency-storage",
    title: "Emergency Blood Storage Unit",
    description: "Install an emergency backup blood storage unit at Tirupati Hospital to prevent wastage during power outages.",
    fullDescription: `Blood must be stored at precise temperatures (2-6°C for red cells, -18°C for plasma) to remain safe for transfusion. Power outages, even brief ones, can compromise entire blood inventories, leading to wastage and critical shortages.

Tirupati Hospital serves over 500 patients daily and maintains one of the largest blood banks in the region. However, the current backup power system is inadequate, and last year alone we lost blood products worth Rs. 15,00,000 due to storage temperature fluctuations during extended power cuts.

This campaign funds a dedicated emergency blood storage unit with its own generator, battery backup, and temperature monitoring system. The unit will protect up to 500 units of blood products and ensure continuous availability even during the worst power situations.`,
    institution: "Tirupati Hospital",
    city: "Tirupati",
    category: "emergency",
    raised: 890000,
    goal: 1000000,
    donors: 412,
    daysLeft: 8,
    urgent: true,
    closingSoon: false,
    coverGradient: "from-rose-600 to-rose-800",
    updates: [
      { date: "2024-01-14", text: "URGENT: Only 8 days left! We're at 89% - help us cross the finish line!" },
      { date: "2024-01-11", text: "Emergency unit specifications finalized. Installation team on standby." },
    ],
    contributors: [
      { name: "TTD Trust", amount: 200000, timeAgo: "1 hour ago" },
      { name: "Anonymous", amount: 25000, timeAgo: "4 hours ago" },
      { name: "Dr. Venkat Rao", amount: 15000, timeAgo: "8 hours ago" },
      { name: "Tirupati Business Association", amount: 50000, timeAgo: "1 day ago" },
      { name: "Srinivasa Reddy", amount: 5000, timeAgo: "1 day ago" },
    ],
  },
  {
    id: "refrigeration-upgrade",
    title: "Blood Bank Refrigeration Upgrade",
    description: "Replace aging refrigeration units at Kakinada Government Hospital blood bank to ensure safe storage.",
    fullDescription: `The blood bank refrigeration units at Kakinada Government Hospital are over 15 years old and increasingly unreliable. These units store blood products for the entire East Godavari district, serving a population of over 50 lakh people.

Modern blood bank refrigerators offer precise temperature control, alarm systems for any deviations, and energy efficiency that reduces operating costs by up to 40%. The upgrade will include 4 blood storage refrigerators, 2 plasma freezers, and 1 platelet agitator.

This investment in infrastructure will serve the community for the next 15-20 years and ensure that blood products are always stored safely, reducing wastage and ensuring availability for emergencies.`,
    institution: "Kakinada Govt Hospital",
    city: "Kakinada",
    category: "equipment",
    raised: 520000,
    goal: 1200000,
    donors: 156,
    daysLeft: 60,
    urgent: false,
    closingSoon: false,
    coverGradient: "from-blue-600 to-indigo-800",
    updates: [
      { date: "2024-01-08", text: "Tender process for equipment procurement has been initiated." },
      { date: "2023-12-28", text: "Site assessment completed. Installation plan approved." },
    ],
    contributors: [
      { name: "Kakinada Rotary Club", amount: 100000, timeAgo: "2 days ago" },
      { name: "Anonymous", amount: 5000, timeAgo: "3 days ago" },
      { name: "Dr. Prasad", amount: 25000, timeAgo: "5 days ago" },
      { name: "East Godavari Welfare Trust", amount: 75000, timeAgo: "1 week ago" },
      { name: "Ramana Kumar", amount: 2500, timeAgo: "1 week ago" },
    ],
  },
  {
    id: "mobile-van",
    title: "Mobile Blood Collection Van",
    description: "Purchase a fully-equipped mobile blood collection van to conduct donation camps in remote villages.",
    fullDescription: `Many villages in Telangana are hours away from the nearest blood bank, making it difficult for willing donors to contribute and for patients to access blood in emergencies. A mobile blood collection van solves both problems.

The van we're fundraising for will be equipped with 4 donation beds, refrigerated storage for collected blood, a generator for power independence, and all necessary medical equipment. It will be staffed by trained phlebotomists and can collect up to 50 donations per camp.

Our plan is to conduct camps in 200+ villages per year, rotating through underserved areas and building a network of registered donors in remote regions. This will dramatically increase blood availability while spreading awareness about the importance of voluntary donation.`,
    institution: "CCT Hyderabad",
    city: "Hyderabad",
    category: "infrastructure",
    raised: 2200000,
    goal: 2500000,
    donors: 567,
    daysLeft: 15,
    urgent: false,
    closingSoon: true,
    coverGradient: "from-amber-600 to-orange-700",
    updates: [
      { date: "2024-01-13", text: "Van manufacturer selected! Customization specs being finalized." },
      { date: "2024-01-06", text: "Crossed Rs. 22 lakhs! Just Rs. 3 lakhs more to go!" },
    ],
    contributors: [
      { name: "Telangana Transport Association", amount: 100000, timeAgo: "5 hours ago" },
      { name: "Anonymous", amount: 50000, timeAgo: "1 day ago" },
      { name: "IT Professionals Collective", amount: 150000, timeAgo: "2 days ago" },
      { name: "Dr. Shyam Sundar", amount: 25000, timeAgo: "3 days ago" },
      { name: "Megha Engineering", amount: 200000, timeAgo: "5 days ago" },
    ],
  },
  {
    id: "ward-renovation",
    title: "Thalassemia Ward Renovation",
    description: "Renovate and expand the thalassemia ward at Visakhapatnam Hospital to accommodate more patients.",
    fullDescription: `The thalassemia ward at Visakhapatnam Hospital currently accommodates 15 patients at a time, but demand has grown to over 30 patients requiring regular transfusions. Patients are often turned away or forced to wait for hours due to space constraints.

This renovation project will double the ward capacity to 30 beds, add a dedicated pediatric section, install modern blood warming equipment, and create a comfortable waiting area for families. The improved facility will also include a counseling room for newly diagnosed patients and their families.

The project has been designed in consultation with thalassemia patients and their caregivers to ensure it meets their real needs. Construction is expected to take 6 months once funding is secured.`,
    institution: "Visakhapatnam Hospital",
    city: "Visakhapatnam",
    category: "infrastructure",
    raised: 150000,
    goal: 800000,
    donors: 78,
    daysLeft: 90,
    urgent: false,
    closingSoon: false,
    coverGradient: "from-amber-500 to-yellow-600",
    updates: [
      { date: "2024-01-05", text: "Architectural plans approved by hospital administration." },
      { date: "2023-12-20", text: "Patient input sessions completed. Design incorporates all feedback." },
    ],
    contributors: [
      { name: "Vizag Steel Plant CSR", amount: 50000, timeAgo: "3 days ago" },
      { name: "Anonymous", amount: 2000, timeAgo: "5 days ago" },
      { name: "Coastal Andhra Medical Association", amount: 25000, timeAgo: "1 week ago" },
      { name: "Pavan Kumar", amount: 5000, timeAgo: "1 week ago" },
      { name: "Anonymous", amount: 1000, timeAgo: "2 weeks ago" },
    ],
  },
]

// Format INR currency
function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount)
}

// Animated counter component
function AnimatedCounter({ value, duration = 1.5 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      let startTime: number
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
        setCount(Math.floor(progress * value))
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }
  }, [isInView, value, duration])

  return <span ref={ref}>{count.toLocaleString("en-IN")}</span>
}

// Animated progress bar
function AnimatedProgressBar({ value, max, delay = 0 }: { value: number; max: number; delay?: number }) {
  const [progress, setProgress] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setProgress((value / max) * 100)
      }, delay * 1000)
      return () => clearTimeout(timer)
    }
  }, [isInView, value, max, delay])

  const percentage = Math.round((value / max) * 100)

  return (
    <div ref={ref} className="space-y-2">
      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-[#D88A99] to-[#E9B36A] rounded-full"
        />
      </div>
      <div className="flex justify-between text-sm">
        <span className="font-semibold text-[#1A1A1A]">{formatINR(value)} raised</span>
        <span className="text-[#6B7280]">of {formatINR(max)} ({percentage}%)</span>
      </div>
    </div>
  )
}

// Campaign Card Component
function CampaignCard({
  campaign,
  index,
  onClick,
}: {
  campaign: typeof CAMPAIGNS[0]
  index: number
  onClick: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const categoryConfig = CATEGORIES[campaign.category as keyof typeof CATEGORIES]
  const CategoryIcon = categoryConfig?.icon || Heart
  const coverImage = campaign.id === "thalassemia-support" || campaign.id === "refrigeration-upgrade"
    ? "/images/chiranjeevi-portrait.png"
    : "/images/chiranjeevi.jpg"

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      onClick={onClick}
      className="cursor-pointer rounded-2xl overflow-hidden shadow-md shadow-black/6 border border-[#E9E1D4] bg-white group"
    >
      {campaign.isGeneralFund ? (
        // General Fund Card - same image-first layout
        <>
          <div className="relative h-40 overflow-hidden">
            <Image
              src="/images/chiranjeevi.jpg"
              alt="Chiranjeevi campaign"
              fill
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(0,0,0,0.14)_100%)]" />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-[#F6D777] text-[#6B4E00] text-xs font-semibold rounded-full">
                General Fund
              </span>
            </div>
          </div>

          <div className="p-4">
            <h3 className="font-serif text-[2rem] leading-[1.05] font-bold text-[#1A1A1A] mb-2 group-hover:text-[#B85B6A] transition-colors">
              {campaign.title}
            </h3>
            <p className="text-sm text-[#6B7280] mb-3 line-clamp-4">{campaign.description}</p>
            <div className="flex items-center justify-between text-sm text-[#6B7280]">
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                {campaign.donors.toLocaleString()} donors
              </span>
              <span className="flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4" />
                {formatINR(campaign.raised)}
              </span>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-3 py-2.5 bg-[#B85B6A] text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-[#A44C5C] transition-colors"
            >
              <Heart className="w-4 h-4" />
              Contribute
            </motion.button>
          </div>
        </>
      ) : (
        // Regular Campaign Card
        <>
          {/* Cover Image */}
          <div className="relative h-40 overflow-hidden">
            <Image
              src={coverImage}
              alt={campaign.title}
              fill
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.20)_0%,rgba(0,0,0,0.08)_100%)]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <CategoryIcon className="w-16 h-16 text-white/30" />
            </div>

            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1 ${categoryConfig?.color} text-white text-xs font-semibold rounded-full`}>
                {categoryConfig?.label}
              </span>
            </div>

            {/* Urgency Badges */}
            {campaign.urgent && (
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute top-4 right-4"
              >
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-[#B85B6A] text-xs font-bold rounded-full shadow-lg">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B85B6A] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B85B6A]" />
                  </span>
                  Urgent
                </span>
              </motion.div>
            )}
            {campaign.closingSoon && !campaign.urgent && (
              <div className="absolute top-4 right-4">
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 text-white text-xs font-bold rounded-full">
                  <Timer className="w-3 h-3" />
                  Closing Soon
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="font-serif text-xl font-bold text-[#1A1A1A] mb-1 group-hover:text-[#DC2626] transition-colors line-clamp-2">
              {campaign.title}
            </h3>
            <p className="text-sm text-[#6B7280] mb-3 flex items-center gap-1.5">
              <Building2 className="w-4 h-4" />
              {campaign.institution} • {campaign.city}
            </p>

            {/* Progress Bar */}
            <AnimatedProgressBar value={campaign.raised} max={campaign.goal} delay={0.2 + index * 0.1} />

            {/* Meta */}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 text-sm text-[#6B7280]">
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                {campaign.donors} donors
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {campaign.daysLeft} days left
              </span>
            </div>

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-3 py-2.5 bg-[#B85B6A] text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-[#A44C5C] transition-colors"
            >
              <Heart className="w-4 h-4" />
              Contribute
            </motion.button>
          </div>
        </>
      )}
    </motion.div>
  )
}

// Campaign Detail View
function CampaignDetailView({
  campaign,
  onBack,
  onDonate,
}: {
  campaign: typeof CAMPAIGNS[0]
  onBack: () => void
  onDonate?: () => void
}) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(1000)
  const [customAmount, setCustomAmount] = useState("")
  const [copied, setCopied] = useState(false)
  const categoryConfig = CATEGORIES[campaign.category as keyof typeof CATEGORIES]
  const CategoryIcon = categoryConfig?.icon || Heart

  const presetAmounts = [100, 500, 1000, 2500, 5000]

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent(`Support ${campaign.title} - ${campaign.institution}`)
    
    if (platform === "whatsapp") {
      window.open(`https://wa.me/?text=${text}%20${url}`, "_blank")
    } else if (platform === "twitter") {
      window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank")
    }
  }

  const donationAmount = customAmount ? parseInt(customAmount) : selectedAmount

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-[#FFF7ED] pb-32 md:pb-20"
    >
      {/* Back Button */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          onClick={onBack}
          className="flex items-center gap-2 text-[#6B7280] hover:text-[#DC2626] transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">All Campaigns</span>
        </motion.button>

        {/* Hero Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className={`relative rounded-3xl overflow-hidden bg-gradient-to-br ${campaign.coverGradient} h-64 md:h-80 mb-8`}
        >
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 flex items-center justify-center">
            <CategoryIcon className="w-24 h-24 text-white/20" />
          </div>
          
          {/* Badges */}
          <div className="absolute top-6 left-6 flex flex-wrap gap-2">
            <span className={`px-4 py-1.5 ${categoryConfig?.color} text-white text-sm font-semibold rounded-full`}>
              {categoryConfig?.label}
            </span>
            {campaign.urgent && (
              <motion.span
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-white text-[#DC2626] text-sm font-bold rounded-full"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#DC2626] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#DC2626]" />
                </span>
                Urgent
              </motion.span>
            )}
            {campaign.closingSoon && !campaign.urgent && (
              <span className="flex items-center gap-1.5 px-4 py-1.5 bg-amber-500 text-white text-sm font-bold rounded-full">
                <Timer className="w-4 h-4" />
                Closing Soon
              </span>
            )}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title & Institution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-3">
                {campaign.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-[#6B7280]">
                <span className="flex items-center gap-1.5">
                  <Building2 className="w-5 h-5" />
                  {campaign.institution}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-5 h-5" />
                  {campaign.city}
                </span>
              </div>
            </motion.div>

            {/* Large Progress Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="bg-white rounded-2xl p-6 shadow-lg shadow-black/5"
            >
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(campaign.raised / campaign.goal) * 100}%` }}
                    transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-[#DC2626] to-[#F97316] rounded-full"
                  />
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-3xl font-bold text-[#1A1A1A]">{formatINR(campaign.raised)}</span>
                    <span className="text-[#6B7280] ml-2">raised of {formatINR(campaign.goal)}</span>
                  </div>
                  <span className="text-2xl font-bold text-[#DC2626]">
                    {Math.round((campaign.raised / campaign.goal) * 100)}%
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Stat Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg shadow-black/5 text-center">
                <Users className="w-8 h-8 text-[#DC2626] mx-auto mb-2" />
                <div className="text-3xl font-bold text-[#1A1A1A]">
                  <AnimatedCounter value={campaign.donors} />
                </div>
                <p className="text-[#6B7280] text-sm">Donors</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg shadow-black/5 text-center">
                <Clock className="w-8 h-8 text-[#F59E0B] mx-auto mb-2" />
                <div className="text-3xl font-bold text-[#1A1A1A]">{campaign.daysLeft}</div>
                <p className="text-[#6B7280] text-sm">Days Left</p>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="bg-white rounded-2xl p-6 shadow-lg shadow-black/5"
            >
              <h2 className="font-serif text-xl font-bold text-[#1A1A1A] mb-4">About This Campaign</h2>
              <div className="prose prose-gray max-w-none text-[#4B5563] leading-relaxed whitespace-pre-line">
                {campaign.fullDescription}
              </div>
            </motion.div>

            {/* Contributors */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl p-6 shadow-lg shadow-black/5"
            >
              <h2 className="font-serif text-xl font-bold text-[#1A1A1A] mb-4">Recent Contributors</h2>
              <div className="space-y-4">
                {campaign.contributors.map((contributor, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.45 + idx * 0.05 }}
                    className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#DC2626] to-[#F97316] flex items-center justify-center text-white font-semibold">
                        {contributor.name === "Anonymous" ? "?" : contributor.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-[#1A1A1A]">{contributor.name}</p>
                        <p className="text-sm text-[#6B7280]">{contributor.timeAgo}</p>
                      </div>
                    </div>
                    <span className="font-semibold text-[#1A1A1A]">{formatINR(contributor.amount)}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Updates */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl p-6 shadow-lg shadow-black/5"
            >
              <h2 className="font-serif text-xl font-bold text-[#1A1A1A] mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#DC2626]" />
                Campaign Updates
              </h2>
              <div className="space-y-4">
                {campaign.updates.map((update, idx) => (
                  <div key={idx} className="pl-4 border-l-2 border-[#DC2626]">
                    <p className="text-sm text-[#6B7280] mb-1">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      {new Date(update.date).toLocaleDateString("en-IN", { 
                        year: "numeric", 
                        month: "long", 
                        day: "numeric" 
                      })}
                    </p>
                    <p className="text-[#4B5563]">{update.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Social Share */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="bg-white rounded-2xl p-6 shadow-lg shadow-black/5"
            >
              <h2 className="font-serif text-xl font-bold text-[#1A1A1A] mb-4">Share This Campaign</h2>
              <div className="flex flex-wrap gap-3">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleShare("whatsapp")}
                  className="flex items-center gap-2 px-5 py-3 bg-[#25D366] text-white font-medium rounded-xl"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleShare("twitter")}
                  className="flex items-center gap-2 px-5 py-3 bg-black text-white font-medium rounded-xl"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  Post on X
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCopyLink}
                  className="flex items-center gap-2 px-5 py-3 bg-gray-100 text-[#1A1A1A] font-medium rounded-xl"
                >
                  {copied ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
                  {copied ? "Copied!" : "Copy Link"}
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Donation Sidebar - Sticky on Desktop */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="bg-white rounded-2xl p-6 shadow-lg shadow-black/5 lg:sticky lg:top-32"
            >
              <h2 className="font-serif text-xl font-bold text-[#1A1A1A] mb-4">Make a Donation</h2>
              
              {/* Preset Amounts */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {presetAmounts.map((amount) => (
                  <motion.button
                    key={amount}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedAmount(amount)
                      setCustomAmount("")
                    }}
                    className={`py-3 rounded-xl font-semibold text-sm transition-all ${
                      selectedAmount === amount && !customAmount
                        ? "bg-[#DC2626] text-white shadow-lg shadow-red-500/30 scale-105"
                        : "bg-gray-100 text-[#1A1A1A] hover:bg-gray-200"
                    }`}
                  >
                    {formatINR(amount)}
                  </motion.button>
                ))}
              </div>

              {/* Custom Amount */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#374151] mb-2">Custom Amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]">₹</span>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value)
                      setSelectedAmount(null)
                    }}
                    placeholder="Enter amount"
                    className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#DC2626] focus:ring-2 focus:ring-red-100 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Donate Button */}
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={onDonate}
                className="w-full py-4 bg-gradient-to-r from-[#DC2626] to-[#B91C1C] text-white font-bold rounded-xl shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 transition-all flex items-center justify-center gap-2 text-lg"
              >
                <Heart className="w-5 h-5" />
                Donate {donationAmount ? formatINR(donationAmount) : ""}
              </motion.button>

              <p className="text-xs text-[#6B7280] text-center mt-4">
                100% of your donation goes to the campaign. Tax benefits under 80G applicable.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 lg:hidden z-50"
      >
        <div className="flex items-center gap-3 max-w-lg mx-auto">
          <div className="flex-1">
            <p className="text-xs text-[#6B7280]">Selected Amount</p>
            <p className="font-bold text-lg text-[#1A1A1A]">{donationAmount ? formatINR(donationAmount) : "Select amount"}</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onDonate}
            className="px-8 py-3 bg-gradient-to-r from-[#DC2626] to-[#B91C1C] text-white font-bold rounded-xl shadow-lg shadow-red-500/30 flex items-center gap-2"
          >
            <Heart className="w-5 h-5" />
            Donate Now
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Main Campaign Pages Component
export function CampaignPages({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const [activeFilter, setActiveFilter] = useState("all")
  const [selectedCity, setSelectedCity] = useState("All Cities")
  const [statusFilter, setStatusFilter] = useState<"active" | "completed">("active")
  const [selectedCampaign, setSelectedCampaign] = useState<typeof CAMPAIGNS[0] | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // Filter campaigns
  const filteredCampaigns = CAMPAIGNS.filter((campaign) => {
    const categoryMatch = activeFilter === "all" || campaign.category === activeFilter
    const cityMatch = selectedCity === "All Cities" || campaign.city === selectedCity
    const statusMatch = statusFilter === "active" ? campaign.daysLeft > 0 : campaign.daysLeft <= 0
    return categoryMatch && cityMatch && statusMatch
  })

  // Sort: General Fund first, then by urgency, then by days left
  const sortedCampaigns = [...filteredCampaigns].sort((a, b) => {
    if (a.isGeneralFund) return -1
    if (b.isGeneralFund) return 1
    if (a.urgent && !b.urgent) return -1
    if (!a.urgent && b.urgent) return 1
    if (a.closingSoon && !b.closingSoon) return -1
    if (!a.closingSoon && b.closingSoon) return 1
    return a.daysLeft - b.daysLeft
  })

  return (
    <AnimatePresence mode="wait">
      {selectedCampaign ? (
        <CampaignDetailView
          key="detail"
          campaign={selectedCampaign}
          onBack={() => setSelectedCampaign(null)}
          onDonate={() => onNavigate?.("donate")}
        />
      ) : (
        <motion.div
          key="listing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          ref={ref}
          className="min-h-screen bg-[#FFF7ED] pt-2 pb-8"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Page Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-5"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-rose-100 text-[#B85B6A] rounded-full text-sm font-medium mb-2">
                <Heart className="w-4 h-4" />
                Financial Campaigns
              </span>
              <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#1A1A1A] mb-3">
                Campaigns
              </h1>
              <p className="text-base md:text-lg text-[#6B7280] max-w-2xl mx-auto">
                Fund life-saving equipment and patient care across Andhra Pradesh & Telangana.
              </p>
            </motion.div>

            {/* Filter Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-4"
            >
              {/* Category Tabs - Horizontally scrollable */}
              <div className="flex gap-2 overflow-x-auto pb-0.5 -mx-4 px-4 md:mx-0 md:px-0 md:justify-center scrollbar-hide">
                {FILTER_TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveFilter(tab.id)}
                    className="relative px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors"
                  >
                    {activeFilter === tab.id && (
                      <motion.div
                        layoutId="activeFilter"
                        className="absolute inset-0 bg-[#B85B6A] rounded-full"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className={`relative z-10 ${activeFilter === tab.id ? "text-white" : "text-[#6B7280] hover:text-[#1A1A1A]"}`}>
                      {tab.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Additional Filters */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-1.5">
                {/* City Dropdown */}
                <div className="relative">
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="appearance-none px-4 py-2.5 pr-10 rounded-xl border border-gray-200 bg-white text-sm font-medium text-[#1A1A1A] focus:border-[#DC2626] focus:ring-2 focus:ring-red-100 outline-none cursor-pointer"
                  >
                    {CITIES.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280] pointer-events-none" />
                </div>

                {/* Status Toggle */}
                <div className="flex bg-white rounded-xl border border-gray-200 p-1">
                  <button
                    onClick={() => setStatusFilter("active")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      statusFilter === "active"
                        ? "bg-[#B85B6A] text-white"
                        : "text-[#6B7280] hover:text-[#1A1A1A]"
                    }`}
                  >
                    Active
                  </button>
                  <button
                    onClick={() => setStatusFilter("completed")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      statusFilter === "completed"
                        ? "bg-[#B85B6A] text-white"
                        : "text-[#6B7280] hover:text-[#1A1A1A]"
                    }`}
                  >
                    Completed
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Campaign Grid */}
            {sortedCampaigns.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {sortedCampaigns.map((campaign, index) => (
                  <CampaignCard
                    key={campaign.id}
                    campaign={campaign}
                    index={index}
                    onClick={() => setSelectedCampaign(campaign)}
                  />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-[#6B7280]" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1A1A1A] mb-2">No campaigns found</h3>
                <p className="text-[#6B7280]">Try adjusting your filters to see more campaigns.</p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
