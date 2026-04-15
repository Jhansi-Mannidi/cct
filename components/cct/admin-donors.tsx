"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  LayoutDashboard, Users, Heart, Calendar, Droplet, Shield, 
  MessageSquare, FileText, Settings, Bell, ChevronLeft, ChevronRight,
  Download, Search, Filter, Upload, MoreHorizontal, Eye, Edit,
  Send, X, Menu, Phone, Mail, MapPin, Award, Clock, CreditCard,
  CheckCircle, AlertCircle, ChevronDown, ChevronUp, ArrowUpDown,
  FileSpreadsheet, Trash2, Flag, User, Star
} from "lucide-react"

// Reusable Admin Sidebar Component
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
        }}
        className={`fixed top-0 left-0 h-full bg-[#1E3A5F] z-50 flex flex-col
          transition-transform lg:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
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
                    layoutId="adminDonorsActiveIndicator"
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

// Mock donor data
const mockDonors = [
  { id: 1, name: "Ravi Kumar", phone: "+91 98765 43210", bloodType: "A+", city: "Hyderabad", tier: "Gold", lastDonation: "2026-03-15", eligibility: "eligible", nextEligible: null, donations: 8, contributed: 5000 },
  { id: 2, name: "Lakshmi Devi", phone: "+91 87654 32109", bloodType: "O+", city: "Vijayawada", tier: "Platinum", lastDonation: "2026-02-28", eligibility: "cooldown", nextEligible: "2026-05-28", daysLeft: 42, donations: 15, contributed: 12000 },
  { id: 3, name: "Venkat Rao", phone: "+91 76543 21098", bloodType: "B+", city: "Tirupati", tier: "Silver", lastDonation: "2026-01-20", eligibility: "eligible", nextEligible: null, donations: 4, contributed: 2500 },
  { id: 4, name: "Priya Sharma", phone: "+91 65432 10987", bloodType: "AB-", city: "Guntur", tier: "Bronze", lastDonation: "2025-12-10", eligibility: "ineligible", nextEligible: null, reason: "Medical condition", donations: 2, contributed: 1000 },
  { id: 5, name: "Suresh Reddy", phone: "+91 54321 09876", bloodType: "O-", city: "Warangal", tier: "Gold", lastDonation: "2026-04-01", eligibility: "cooldown", nextEligible: "2026-06-30", daysLeft: 75, donations: 10, contributed: 7500 },
  { id: 6, name: "Anitha Kumari", phone: "+91 43210 98765", bloodType: "A-", city: "Kakinada", tier: "Silver", lastDonation: "2026-03-20", eligibility: "eligible", nextEligible: null, donations: 5, contributed: 3500 },
  { id: 7, name: "Krishna Murthy", phone: "+91 32109 87654", bloodType: "B-", city: "Nellore", tier: "Bronze", lastDonation: "2025-11-05", eligibility: "eligible", nextEligible: null, donations: 2, contributed: 500 },
  { id: 8, name: "Padma Rani", phone: "+91 21098 76543", bloodType: "AB+", city: "Kurnool", tier: "Gold", lastDonation: "2026-02-14", eligibility: "eligible", nextEligible: null, donations: 9, contributed: 6000 },
  { id: 9, name: "Ramesh Babu", phone: "+91 10987 65432", bloodType: "O+", city: "Hyderabad", tier: "Platinum", lastDonation: "2026-03-25", eligibility: "cooldown", nextEligible: "2026-06-23", daysLeft: 68, donations: 18, contributed: 15000 },
  { id: 10, name: "Sunita Devi", phone: "+91 09876 54321", bloodType: "A+", city: "Visakhapatnam", tier: "Silver", lastDonation: "2026-01-30", eligibility: "eligible", nextEligible: null, donations: 6, contributed: 4000 },
]

// Blood type badge colors
const bloodTypeColors: Record<string, string> = {
  "A+": "bg-red-100 text-red-700",
  "A-": "bg-red-100 text-red-700",
  "B+": "bg-blue-100 text-blue-700",
  "B-": "bg-blue-100 text-blue-700",
  "AB+": "bg-purple-100 text-purple-700",
  "AB-": "bg-purple-100 text-purple-700",
  "O+": "bg-green-100 text-green-700",
  "O-": "bg-green-100 text-green-700",
}

// Tier colors
const tierColors: Record<string, { dot: string; text: string }> = {
  Bronze: { dot: "bg-amber-600", text: "text-amber-700" },
  Silver: { dot: "bg-gray-400", text: "text-gray-600" },
  Gold: { dot: "bg-yellow-500", text: "text-yellow-700" },
  Platinum: { dot: "bg-gradient-to-r from-indigo-500 to-purple-500", text: "text-indigo-700" },
}

// Donor Detail Drawer Component
function DonorDetailDrawer({ 
  donor, 
  onClose 
}: { 
  donor: typeof mockDonors[0] | null
  onClose: () => void 
}) {
  if (!donor) return null

  const donationHistory = [
    { date: "2026-03-15", type: "Whole Blood", bloodBank: "Red Cross Hyderabad", credits: 50 },
    { date: "2025-12-20", type: "Platelets", bloodBank: "Gandhi Hospital", credits: 75 },
    { date: "2025-09-10", type: "Whole Blood", bloodBank: "NIMS Blood Bank", credits: 50 },
    { date: "2025-06-05", type: "Whole Blood", bloodBank: "Red Cross Hyderabad", credits: 50 },
  ]

  const contributions = [
    { campaign: "Platelet Separator Fund", amount: 2000, date: "2026-02-14" },
    { campaign: "Tirupati Care Center", amount: 1500, date: "2025-11-20" },
  ]

  const communications = [
    { type: "SMS", message: "Reminder: You are eligible to donate", date: "2026-04-10" },
    { type: "Email", message: "Monthly newsletter sent", date: "2026-04-01" },
    { type: "Push", message: "New blood drive in your area", date: "2026-03-28" },
  ]

  const badges = [
    { name: "First Blood", icon: Droplet, earned: true },
    { name: "Life Saver", icon: Heart, earned: true },
    { name: "Regular Donor", icon: Star, earned: true },
    { name: "Champion", icon: Award, earned: donor.tier === "Gold" || donor.tier === "Platinum" },
  ]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed right-0 top-0 h-full w-full max-w-xl bg-white z-50 overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between z-10">
          <h2 className="font-semibold text-lg text-[#1A1A1A]">Donor Profile</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Profile Header */}
          <div className="flex items-start gap-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl
              ${donor.tier === "Platinum" ? "bg-gradient-to-br from-indigo-500 to-purple-500" :
                donor.tier === "Gold" ? "bg-gradient-to-br from-yellow-400 to-amber-500" :
                donor.tier === "Silver" ? "bg-gradient-to-br from-gray-300 to-gray-500" :
                "bg-gradient-to-br from-amber-500 to-amber-700"}`}>
              {donor.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-semibold text-[#1A1A1A]">{donor.name}</h3>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${bloodTypeColors[donor.bloodType]}`}>
                  {donor.bloodType}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className={`w-2 h-2 rounded-full ${tierColors[donor.tier].dot}`} />
                <span className={`text-sm font-medium ${tierColors[donor.tier].text}`}>{donor.tier} Tier</span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-gray-50 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Phone className="w-4 h-4 text-gray-400" />
              <span className="text-gray-700">{donor.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-gray-400" />
              <span className="text-gray-700">{donor.name.toLowerCase().replace(" ", ".")}@email.com</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="text-gray-700">{donor.city}, Andhra Pradesh, 500001</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-gray-700">Registered: January 2024</span>
            </div>
          </div>

          {/* Eligibility Status */}
          <div className={`rounded-xl p-4 ${
            donor.eligibility === "eligible" ? "bg-green-50 border border-green-200" :
            donor.eligibility === "cooldown" ? "bg-amber-50 border border-amber-200" :
            "bg-red-50 border border-red-200"
          }`}>
            <div className="flex items-center gap-2">
              {donor.eligibility === "eligible" ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <AlertCircle className={`w-5 h-5 ${donor.eligibility === "cooldown" ? "text-amber-600" : "text-red-600"}`} />
              )}
              <span className={`font-medium ${
                donor.eligibility === "eligible" ? "text-green-700" :
                donor.eligibility === "cooldown" ? "text-amber-700" : "text-red-700"
              }`}>
                {donor.eligibility === "eligible" ? "Eligible to Donate" :
                 donor.eligibility === "cooldown" ? `Cooldown - ${donor.daysLeft} days left` :
                 "Ineligible"}
              </span>
            </div>
            {donor.nextEligible && (
              <p className="text-sm text-amber-600 mt-1">Next eligible: {donor.nextEligible}</p>
            )}
          </div>

          {/* Profile Completeness */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Profile Completeness</span>
              <span className="text-sm text-gray-500">85%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "85%" }}
                transition={{ duration: 0.8 }}
                className="h-full bg-[#DC2626] rounded-full"
              />
            </div>
          </div>

          {/* Donation History Timeline */}
          <div>
            <h4 className="font-semibold text-[#1A1A1A] mb-4">Donation History</h4>
            <div className="relative pl-6 space-y-4">
              <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-gray-200" />
              {donationHistory.map((donation, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="absolute -left-4 top-1 w-3 h-3 rounded-full bg-[#DC2626] border-2 border-white" />
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm text-[#1A1A1A]">{donation.type}</span>
                      <span className="text-xs text-gray-500">{donation.date}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{donation.bloodBank}</p>
                    <p className="text-xs text-[#DC2626] mt-1">+{donation.credits} credits</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Financial Contributions */}
          <div>
            <h4 className="font-semibold text-[#1A1A1A] mb-4">Financial Contributions</h4>
            <div className="space-y-2">
              {contributions.map((contrib, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-[#1A1A1A]">{contrib.campaign}</p>
                    <p className="text-xs text-gray-500">{contrib.date}</p>
                  </div>
                  <span className="font-semibold text-[#DC2626]">₹{contrib.amount.toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Communication Log */}
          <div>
            <h4 className="font-semibold text-[#1A1A1A] mb-4">Communication Log</h4>
            <div className="space-y-2">
              {communications.map((comm, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    comm.type === "SMS" ? "bg-blue-100" : comm.type === "Email" ? "bg-green-100" : "bg-purple-100"
                  }`}>
                    {comm.type === "SMS" ? <MessageSquare className="w-4 h-4 text-blue-600" /> :
                     comm.type === "Email" ? <Mail className="w-4 h-4 text-green-600" /> :
                     <Bell className="w-4 h-4 text-purple-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-[#1A1A1A]">{comm.message}</p>
                    <p className="text-xs text-gray-500">{comm.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Credits & Badges */}
          <div>
            <h4 className="font-semibold text-[#1A1A1A] mb-4">Credits & Badges</h4>
            <div className="bg-gradient-to-r from-[#1E3A5F] to-[#2D4A6F] rounded-xl p-4 mb-4">
              <p className="text-white/70 text-sm">Credit Balance</p>
              <p className="text-3xl font-bold text-white">{(donor.donations * 50 + donor.contributed / 10).toLocaleString('en-IN')}</p>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {badges.map((badge, index) => {
                const Icon = badge.icon
                return (
                  <div
                    key={index}
                    className={`p-3 rounded-lg text-center ${badge.earned ? "bg-amber-50" : "bg-gray-100 opacity-50"}`}
                  >
                    <Icon className={`w-6 h-6 mx-auto ${badge.earned ? "text-amber-500" : "text-gray-400"}`} />
                    <p className={`text-xs mt-1 ${badge.earned ? "text-amber-700" : "text-gray-500"}`}>{badge.name}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Admin Actions */}
          <div className="grid grid-cols-2 gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-[#DC2626] text-white rounded-xl font-medium"
            >
              <Droplet className="w-4 h-4" />
              Record Donation
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-[#1E3A5F] text-white rounded-xl font-medium"
            >
              <Send className="w-4 h-4" />
              Send Notification
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 px-4 py-3 border border-amber-500 text-amber-600 rounded-xl font-medium"
            >
              <Flag className="w-4 h-4" />
              Flag Account
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 text-gray-600 rounded-xl font-medium"
            >
              <Download className="w-4 h-4" />
              Export Record
            </motion.button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

// Bulk Upload Modal Component
function BulkUploadModal({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean
  onClose: () => void 
}) {
  const [isDragging, setIsDragging] = useState(false)
  const [uploadState, setUploadState] = useState<"idle" | "preview" | "processing" | "complete">("idle")
  const [progress, setProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUpload = () => {
    setUploadState("preview")
  }

  const processUpload = () => {
    setUploadState("processing")
    let p = 0
    const interval = setInterval(() => {
      p += 10
      setProgress(p)
      if (p >= 100) {
        clearInterval(interval)
        setUploadState("complete")
      }
    }, 200)
  }

  const resetAndClose = () => {
    setUploadState("idle")
    setProgress(0)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={resetAndClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-2xl z-50 overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="font-semibold text-lg text-[#1A1A1A]">Bulk Upload Donors</h2>
              <button onClick={resetAndClose} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6">
              {uploadState === "idle" && (
                <div
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleUpload() }}
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                    isDragging ? "border-[#DC2626] bg-red-50" : "border-gray-300"
                  }`}
                >
                  <Upload className={`w-12 h-12 mx-auto mb-4 ${isDragging ? "text-[#DC2626]" : "text-gray-400"}`} />
                  <p className="text-gray-600 mb-2">Drag and drop your CSV file here</p>
                  <p className="text-gray-400 text-sm mb-4">or</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv"
                    className="hidden"
                    onChange={handleUpload}
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => fileInputRef.current?.click()}
                    className="px-6 py-2 bg-[#1E3A5F] text-white rounded-lg font-medium"
                  >
                    Browse Files
                  </motion.button>
                </div>
              )}

              {uploadState === "preview" && (
                <div>
                  <p className="text-sm text-gray-600 mb-4">Preview of uploaded data:</p>
                  <div className="overflow-x-auto border border-gray-200 rounded-lg mb-4">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Name</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Phone</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Blood Type</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        <tr><td className="px-3 py-2">Arun Kumar</td><td className="px-3 py-2">+91 98765 11111</td><td className="px-3 py-2">A+</td></tr>
                        <tr><td className="px-3 py-2">Bhavani Devi</td><td className="px-3 py-2">+91 98765 22222</td><td className="px-3 py-2">B+</td></tr>
                        <tr><td className="px-3 py-2">Chandra Sekhar</td><td className="px-3 py-2">+91 98765 33333</td><td className="px-3 py-2">O+</td></tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="flex items-center gap-2 text-green-600 mb-2">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">47 valid records</span>
                    </div>
                    <div className="flex items-center gap-2 text-amber-600 mb-2">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm">3 duplicates found</span>
                    </div>
                    <div className="flex items-center gap-2 text-red-600">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm">1 invalid phone number</span>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={processUpload}
                    className="w-full py-3 bg-[#DC2626] text-white rounded-xl font-medium"
                  >
                    Process Upload
                  </motion.button>
                </div>
              )}

              {uploadState === "processing" && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 relative">
                    <svg className="w-full h-full -rotate-90">
                      <circle cx="32" cy="32" r="28" fill="none" stroke="#E5E7EB" strokeWidth="4" />
                      <motion.circle
                        cx="32" cy="32" r="28"
                        fill="none"
                        stroke="#DC2626"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray={175.93}
                        strokeDashoffset={175.93 - (175.93 * progress / 100)}
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center font-semibold text-[#1A1A1A]">
                      {progress}%
                    </span>
                  </div>
                  <p className="text-gray-600">Processing upload...</p>
                </div>
              )}

              {uploadState === "complete" && (
                <div className="text-center py-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 15 }}
                    className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center"
                  >
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">Upload Complete!</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    47 donors added. 3 duplicates merged.<br />
                    SMS invitations sent.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={resetAndClose}
                    className="px-6 py-2 bg-[#1E3A5F] text-white rounded-lg font-medium"
                  >
                    Done
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Main Admin Donors Component
export function AdminDonors() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeItem, setActiveItem] = useState("donors")
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [viewMode, setViewMode] = useState<"table" | "card">("table")
  const [selectedDonor, setSelectedDonor] = useState<typeof mockDonors[0] | null>(null)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showExportDropdown, setShowExportDropdown] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedDonors, setSelectedDonors] = useState<number[]>([])
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc")
  const [currentPage, setCurrentPage] = useState(1)

  // Filters
  const [bloodTypeFilter, setBloodTypeFilter] = useState("")
  const [cityFilter, setCityFilter] = useState("")
  const [tierFilter, setTierFilter] = useState("")
  const [eligibilityFilter, setEligibilityFilter] = useState("")

  const activeFilters = [bloodTypeFilter, cityFilter, tierFilter, eligibilityFilter].filter(Boolean).length

  // Simulate search delay
  useEffect(() => {
    if (searchQuery) {
      setIsSearching(true)
      const timer = setTimeout(() => setIsSearching(false), 500)
      return () => clearTimeout(timer)
    }
  }, [searchQuery])

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDir(sortDir === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDir("asc")
    }
  }

  const toggleSelectDonor = (id: number) => {
    setSelectedDonors(prev => 
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    )
  }

  const toggleSelectAll = () => {
    if (selectedDonors.length === mockDonors.length) {
      setSelectedDonors([])
    } else {
      setSelectedDonors(mockDonors.map(d => d.id))
    }
  }

  const clearFilters = () => {
    setBloodTypeFilter("")
    setCityFilter("")
    setTierFilter("")
    setEligibilityFilter("")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Content */}
      <div 
        className="transition-all duration-300"
        style={{ marginLeft: sidebarCollapsed ? 80 : 240 }}
      >
        {/* Top Bar */}
        <div className="sticky top-0 bg-white border-b border-gray-200 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
              <h1 className="text-xl font-semibold text-[#1A1A1A]">Donor Management</h1>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#DC2626] rounded-full" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Action Bar */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
            <div className="flex flex-wrap items-center gap-4">
              {/* Search */}
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search donors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:border-[#DC2626] focus:ring-2 focus:ring-red-100 outline-none"
                />
                {isSearching && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">Searching...</span>
                )}
              </div>

              {/* Filters */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <Filter className="w-4 h-4" />
                Filters
                {activeFilters > 0 && (
                  <span className="px-2 py-0.5 bg-[#DC2626] text-white text-xs rounded-full">{activeFilters}</span>
                )}
              </button>

              {/* Bulk Upload */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowUploadModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[#1E3A5F] text-white rounded-lg"
              >
                <Upload className="w-4 h-4" />
                Bulk Upload CSV
              </motion.button>

              {/* Export */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowExportDropdown(!showExportDropdown)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <Download className="w-4 h-4" />
                  Export
                  <ChevronDown className="w-4 h-4" />
                </motion.button>
                <AnimatePresence>
                  {showExportDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-20"
                    >
                      <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 w-full text-left">
                        <FileSpreadsheet className="w-4 h-4" />
                        Export as CSV
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 w-full text-left">
                        <FileText className="w-4 h-4" />
                        Export as Excel
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Filter Dropdowns */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-gray-100">
                    <select
                      value={bloodTypeFilter}
                      onChange={(e) => setBloodTypeFilter(e.target.value)}
                      className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-[#DC2626] outline-none"
                    >
                      <option value="">All Blood Types</option>
                      {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bt => (
                        <option key={bt} value={bt}>{bt}</option>
                      ))}
                    </select>

                    <select
                      value={cityFilter}
                      onChange={(e) => setCityFilter(e.target.value)}
                      className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-[#DC2626] outline-none"
                    >
                      <option value="">All Cities</option>
                      {["Hyderabad", "Vijayawada", "Tirupati", "Guntur", "Warangal", "Visakhapatnam"].map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>

                    <select
                      value={tierFilter}
                      onChange={(e) => setTierFilter(e.target.value)}
                      className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-[#DC2626] outline-none"
                    >
                      <option value="">All Tiers</option>
                      {["Bronze", "Silver", "Gold", "Platinum"].map(tier => (
                        <option key={tier} value={tier}>{tier}</option>
                      ))}
                    </select>

                    <select
                      value={eligibilityFilter}
                      onChange={(e) => setEligibilityFilter(e.target.value)}
                      className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-[#DC2626] outline-none"
                    >
                      <option value="">All Eligibility</option>
                      <option value="eligible">Eligible Now</option>
                      <option value="cooldown">In Cooldown</option>
                      <option value="ineligible">Ineligible</option>
                    </select>

                    {activeFilters > 0 && (
                      <button
                        onClick={clearFilters}
                        className="text-sm text-[#DC2626] hover:underline"
                      >
                        Clear all
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Results Summary & View Toggle */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-600">
              Showing <span className="font-medium">1-{mockDonors.length}</span> of <span className="font-medium">15,420</span> donors
            </p>
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-1">
              <button
                onClick={() => setViewMode("table")}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${
                  viewMode === "table" ? "bg-[#DC2626] text-white" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Table
              </button>
              <button
                onClick={() => setViewMode("card")}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${
                  viewMode === "card" ? "bg-[#DC2626] text-white" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Card
              </button>
            </div>
          </div>

          {/* Bulk Actions Bar */}
          <AnimatePresence>
            {selectedDonors.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-[#1E3A5F] text-white rounded-xl p-4 mb-4 flex items-center justify-between"
              >
                <span className="font-medium">{selectedDonors.length} donors selected</span>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-lg hover:bg-white/20">
                    <Send className="w-4 h-4" />
                    Send Notification
                  </button>
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-lg hover:bg-white/20">
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                  <button 
                    onClick={() => setSelectedDonors([])}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-lg hover:bg-white/20"
                  >
                    <X className="w-4 h-4" />
                    Clear
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Donor Table */}
          <AnimatePresence mode="wait">
            {viewMode === "table" ? (
              <motion.div
                key="table"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
              >
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-left">
                          <input
                            type="checkbox"
                            checked={selectedDonors.length === mockDonors.length}
                            onChange={toggleSelectAll}
                            className="w-4 h-4 rounded border-gray-300 text-[#DC2626] focus:ring-[#DC2626]"
                          />
                        </th>
                        {["Name", "Phone", "Blood Type", "City", "Tier", "Last Donation", "Eligibility", "Actions"].map((header) => (
                          <th
                            key={header}
                            onClick={() => header !== "Actions" && handleSort(header.toLowerCase())}
                            className={`px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                              header !== "Actions" ? "cursor-pointer hover:bg-gray-100" : ""
                            }`}
                          >
                            <div className="flex items-center gap-1">
                              {header}
                              {header !== "Actions" && (
                                <ArrowUpDown className={`w-3 h-3 ${sortColumn === header.toLowerCase() ? "text-[#DC2626]" : "text-gray-300"}`} />
                              )}
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {mockDonors.map((donor, index) => (
                        <motion.tr
                          key={donor.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={`hover:bg-gray-50 transition-colors ${selectedDonors.includes(donor.id) ? "bg-red-50" : ""}`}
                        >
                          <td className="px-4 py-4">
                            <input
                              type="checkbox"
                              checked={selectedDonors.includes(donor.id)}
                              onChange={() => toggleSelectDonor(donor.id)}
                              className="w-4 h-4 rounded border-gray-300 text-[#DC2626] focus:ring-[#DC2626]"
                            />
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#DC2626] to-[#F59E0B] flex items-center justify-center text-white text-xs font-bold">
                                {donor.name.split(" ").map(n => n[0]).join("")}
                              </div>
                              <span className="font-medium text-[#1A1A1A]">{donor.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-600">{donor.phone}</td>
                          <td className="px-4 py-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${bloodTypeColors[donor.bloodType]}`}>
                              {donor.bloodType}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-600">{donor.city}</td>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-2">
                              <span className={`w-2 h-2 rounded-full ${tierColors[donor.tier].dot}`} />
                              <span className={`text-sm ${tierColors[donor.tier].text}`}>{donor.tier}</span>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-600">{donor.lastDonation}</td>
                          <td className="px-4 py-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              donor.eligibility === "eligible" ? "bg-green-100 text-green-700" :
                              donor.eligibility === "cooldown" ? "bg-amber-100 text-amber-700" :
                              "bg-red-100 text-red-700"
                            }`}>
                              {donor.eligibility === "eligible" ? "Eligible" :
                               donor.eligibility === "cooldown" ? `Cooldown - ${donor.daysLeft}d` :
                               "Ineligible"}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setSelectedDonor(donor)}
                                className="px-3 py-1 text-sm text-[#DC2626] border border-[#DC2626] rounded-lg hover:bg-red-50"
                              >
                                View
                              </button>
                              <div className="relative group">
                                <button className="p-1 hover:bg-gray-100 rounded">
                                  <MoreHorizontal className="w-4 h-4 text-gray-500" />
                                </button>
                                <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                                  <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 w-full text-left text-sm">
                                    <Send className="w-4 h-4" />
                                    Send Notification
                                  </button>
                                  <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 w-full text-left text-sm">
                                    <Edit className="w-4 h-4" />
                                    Edit
                                  </button>
                                  <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 w-full text-left text-sm">
                                    <Download className="w-4 h-4" />
                                    Export Record
                                  </button>
                                </div>
                              </div>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>
                  <span className="text-sm text-gray-600">
                    Page <span className="font-medium">{currentPage}</span> of <span className="font-medium">771</span>
                  </span>
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="card"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {mockDonors.map((donor, index) => (
                  <motion.div
                    key={donor.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold
                          ${donor.tier === "Platinum" ? "bg-gradient-to-br from-indigo-500 to-purple-500" :
                            donor.tier === "Gold" ? "bg-gradient-to-br from-yellow-400 to-amber-500" :
                            donor.tier === "Silver" ? "bg-gradient-to-br from-gray-300 to-gray-500" :
                            "bg-gradient-to-br from-amber-500 to-amber-700"}`}>
                          {donor.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                          <h3 className="font-medium text-[#1A1A1A]">{donor.name}</h3>
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${tierColors[donor.tier].dot}`} />
                            <span className={`text-xs ${tierColors[donor.tier].text}`}>{donor.tier}</span>
                          </div>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${bloodTypeColors[donor.bloodType]}`}>
                        {donor.bloodType}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        {donor.phone}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {donor.city}
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        donor.eligibility === "eligible" ? "bg-green-100 text-green-700" :
                        donor.eligibility === "cooldown" ? "bg-amber-100 text-amber-700" :
                        "bg-red-100 text-red-700"
                      }`}>
                        {donor.eligibility === "eligible" ? "Eligible" :
                         donor.eligibility === "cooldown" ? `Cooldown - ${donor.daysLeft}d` :
                         "Ineligible"}
                      </span>
                      <button
                        onClick={() => setSelectedDonor(donor)}
                        className="text-sm text-[#DC2626] font-medium hover:underline"
                      >
                        View Profile
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Donor Detail Drawer */}
      {selectedDonor && (
        <DonorDetailDrawer donor={selectedDonor} onClose={() => setSelectedDonor(null)} />
      )}

      {/* Bulk Upload Modal */}
      <BulkUploadModal isOpen={showUploadModal} onClose={() => setShowUploadModal(false)} />
    </div>
  )
}
