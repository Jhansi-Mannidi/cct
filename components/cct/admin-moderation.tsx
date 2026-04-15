"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  LayoutDashboard, Users, Heart, Calendar, Droplet, Shield, 
  MessageSquare, FileText, Settings, Bell, ChevronLeft, ChevronRight,
  Menu, X, Check, XIcon, Eye, Clock, User, MapPin, Users2, Image,
  AlertTriangle
} from "lucide-react"

// Admin Sidebar Component (reused pattern)
function AdminSidebar({ 
  collapsed, 
  setCollapsed, 
  mobileOpen,
  setMobileOpen
}: { 
  collapsed: boolean
  setCollapsed: (v: boolean) => void
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

  const activeItem = "moderation"

  return (
    <>
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

      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 80 : 240 }}
        className={`fixed top-0 left-0 h-full bg-[#1E3A5F] z-50 flex flex-col
          lg:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        style={{ width: collapsed ? 80 : 240 }}
      >
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

        <nav className="flex-1 py-4 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeItem === item.id
            return (
              <button
                key={item.id}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all relative
                  ${isActive 
                    ? 'bg-white/10 text-white' 
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="modActiveIndicator"
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

// Mock data for Good Works submissions
const mockGoodWorksSubmissions = [
  {
    id: "gw1",
    submittedAt: "2026-04-15T10:30:00",
    submitterName: "Ravi Kumar",
    organization: "Rotary Club Hyderabad",
    storyText: "Our club organized a massive blood donation camp at Hitex Exhibition Center. Over 200 volunteers came together and we collected 180 units of blood. The enthusiasm of young donors was incredible - many were first-time donors who overcame their fears to contribute. Special thanks to CCT for the seamless coordination and medical support.",
    hasPhoto: true,
    status: "pending"
  },
  {
    id: "gw2",
    submittedAt: "2026-04-14T16:45:00",
    submitterName: "Priya Reddy",
    organization: "",
    storyText: "My father needed an emergency blood transfusion after a car accident. Within 2 hours of posting on CCT, three donors reached the hospital. Words cannot express our gratitude. My father is now recovering well, and I have registered as a donor myself to give back to this amazing community.",
    hasPhoto: false,
    status: "pending"
  },
  {
    id: "gw3",
    submittedAt: "2026-04-14T09:15:00",
    submitterName: "Venkat Rao",
    organization: "JNTU Student Council",
    storyText: "We conducted a week-long awareness campaign on campus about blood donation myths and facts. Partnered with CCT to host a drive on the final day - 75 students donated! Many students said they never knew how simple and painless the process is. Planning to make this an annual tradition.",
    hasPhoto: true,
    status: "pending"
  },
  {
    id: "gw4",
    submittedAt: "2026-04-13T14:20:00",
    submitterName: "Lakshmi Devi",
    organization: "Sri Sai Charitable Trust",
    storyText: "Donated my 25th unit today! Started donating in 2015 after my mother received blood during her surgery. It feels incredible to know that my donations have potentially saved up to 75 lives. CCT has made the entire journey so rewarding with their recognition program.",
    hasPhoto: true,
    status: "pending"
  },
  {
    id: "gw5",
    submittedAt: "2026-04-12T11:00:00",
    submitterName: "Suresh Babu",
    organization: "Tech Mahindra CSR",
    storyText: "Our corporate blood donation drive was a huge success! 150 employees participated across our Hyderabad campus. CCT's mobile unit made it so convenient - employees could donate during lunch breaks. Already planning our next drive for Diwali.",
    hasPhoto: true,
    status: "pending"
  }
]

// Mock data for Fan Club Events
const mockFanClubEvents = [
  {
    id: "fc1",
    submittedAt: "2026-04-15T08:00:00",
    eventName: "Chiranjeevi Birthday Mega Blood Drive",
    eventType: "Blood Drive",
    eventDate: "2026-08-22",
    venue: "LB Stadium",
    city: "Hyderabad",
    expectedTurnout: 500,
    submitterName: "Mega Fans Association",
    status: "pending"
  },
  {
    id: "fc2",
    submittedAt: "2026-04-14T12:30:00",
    eventName: "Charity Walk for Thalassemia Awareness",
    eventType: "Awareness",
    eventDate: "2026-05-08",
    venue: "KBR Park",
    city: "Hyderabad",
    expectedTurnout: 200,
    submitterName: "Chiru Youth Wing",
    status: "pending"
  },
  {
    id: "fc3",
    submittedAt: "2026-04-13T17:45:00",
    eventName: "Village Medical Camp",
    eventType: "Medical Camp",
    eventDate: "2026-04-28",
    venue: "Govt. School Grounds",
    city: "Warangal",
    expectedTurnout: 300,
    submitterName: "Rural Mega Fans Club",
    status: "pending"
  }
]

// Mock data for approved/rejected
const mockProcessedSubmissions = [
  { id: "p1", title: "Community Drive Success Story", submitter: "Rotary Vijayawada", dateSubmitted: "2026-04-10", dateActioned: "2026-04-11", actionedBy: "Lakshmi", status: "approved", type: "story" },
  { id: "p2", title: "First-time Donor Experience", submitter: "Anitha K", dateSubmitted: "2026-04-09", dateActioned: "2026-04-10", actionedBy: "Lakshmi", status: "approved", type: "story" },
  { id: "p3", title: "College Awareness Event", submitter: "OU Student Union", dateSubmitted: "2026-04-08", dateActioned: "2026-04-09", actionedBy: "Ravi", status: "approved", type: "event" },
  { id: "p4", title: "Promotional Content", submitter: "Unknown", dateSubmitted: "2026-04-07", dateActioned: "2026-04-08", actionedBy: "Lakshmi", status: "rejected", type: "story", rejectionReason: "Content appears to be promotional/spam and not a genuine story." },
  { id: "p5", title: "Duplicate Submission", submitter: "Ram K", dateSubmitted: "2026-04-06", dateActioned: "2026-04-07", actionedBy: "Ravi", status: "rejected", type: "story", rejectionReason: "This story was already submitted and approved previously." },
]

// Animated Badge Count
function AnimatedBadge({ count }: { count: number }) {
  return (
    <motion.span
      key={count}
      initial={{ scale: 1.3, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="ml-2 px-2 py-0.5 bg-[#DC2626] text-white text-xs font-bold rounded-full"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={count}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 10, opacity: 0 }}
        >
          {count}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  )
}

// Good Works Card
function GoodWorksCard({ 
  submission, 
  onApprove, 
  onReject 
}: { 
  submission: typeof mockGoodWorksSubmissions[0]
  onApprove: () => void
  onReject: (reason: string) => void
}) {
  const [showRejectReason, setShowRejectReason] = useState(false)
  const [rejectReason, setRejectReason] = useState("")
  const [showPreview, setShowPreview] = useState(false)
  const [isApproving, setIsApproving] = useState(false)
  const [isRejecting, setIsRejecting] = useState(false)

  const handleApprove = () => {
    setIsApproving(true)
    setTimeout(() => {
      onApprove()
    }, 500)
  }

  const handleReject = () => {
    setIsRejecting(true)
    setTimeout(() => {
      onReject(rejectReason)
    }, 500)
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: isApproving || isRejecting ? 0 : 1, 
          x: isApproving ? -100 : isRejecting ? 100 : 0,
          backgroundColor: isApproving ? '#dcfce7' : isRejecting ? '#fee2e2' : '#ffffff'
        }}
        exit={{ opacity: 0, x: isApproving ? -100 : 100 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1E3A5F] to-[#3B82F6] flex items-center justify-center text-white font-bold">
                {submission.submitterName.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-[#1A1A1A]">{submission.submitterName}</p>
                {submission.organization && (
                  <p className="text-sm text-[#6B7280]">{submission.organization}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#6B7280]">
              <Clock className="w-4 h-4" />
              {formatDate(submission.submittedAt)}
            </div>
          </div>

          {/* Story Text */}
          <p className="text-[#374151] leading-relaxed mb-4">
            {submission.storyText}
          </p>

          {/* Photo Placeholder */}
          {submission.hasPhoto && (
            <div className="mb-4 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 h-48 flex items-center justify-center">
              <div className="text-center text-[#6B7280]">
                <Image className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Attached Photo</p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowPreview(true)}
              className="flex items-center gap-2 px-4 py-2 text-[#1E3A5F] bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors font-medium"
            >
              <Eye className="w-4 h-4" />
              Preview
            </button>
            <button
              onClick={handleApprove}
              disabled={isApproving || isRejecting}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50"
            >
              <Check className="w-4 h-4" />
              Approve
            </button>
            <button
              onClick={() => setShowRejectReason(!showRejectReason)}
              disabled={isApproving || isRejecting}
              className="flex items-center gap-2 px-4 py-2 border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors font-medium disabled:opacity-50"
            >
              <XIcon className="w-4 h-4" />
              Reject
            </button>
          </div>

          {/* Reject Reason Field */}
          <AnimatePresence>
            {showRejectReason && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <label className="block text-sm font-medium text-[#374151] mb-2">
                    Rejection Reason
                  </label>
                  <textarea
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    placeholder="Please provide a reason for rejection..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none resize-none"
                    rows={3}
                  />
                  <button
                    onClick={handleReject}
                    disabled={!rejectReason.trim()}
                    className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Confirm Reject
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Preview Modal */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4"
            onClick={() => setShowPreview(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#FFF7ED] rounded-2xl max-w-md w-full overflow-hidden shadow-2xl"
            >
              <div className="p-4 bg-white border-b border-gray-100">
                <p className="text-center text-sm text-[#6B7280]">Public Feed Preview</p>
              </div>
              <div className="p-6">
                {submission.hasPhoto && (
                  <div className="mb-4 rounded-lg bg-gradient-to-br from-amber-100 to-orange-100 h-40 flex items-center justify-center">
                    <Image className="w-8 h-8 text-amber-400" />
                  </div>
                )}
                <p className="text-[#374151] leading-relaxed mb-4 text-sm">
                  {submission.storyText}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1E3A5F] to-[#3B82F6] flex items-center justify-center text-white text-sm font-bold">
                    {submission.submitterName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-sm text-[#1A1A1A]">{submission.submitterName}</p>
                    {submission.organization && (
                      <p className="text-xs text-[#6B7280]">{submission.organization}</p>
                    )}
                  </div>
                  <span className="ml-auto px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    Verified by CCT
                  </span>
                </div>
              </div>
              <div className="p-4 bg-gray-50 flex justify-end">
                <button
                  onClick={() => setShowPreview(false)}
                  className="px-4 py-2 bg-[#1E3A5F] text-white rounded-lg hover:bg-[#2d4a6f] transition-colors font-medium"
                >
                  Close Preview
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Fan Club Event Card
function FanClubEventCard({ 
  event, 
  onApprove, 
  onReject 
}: { 
  event: typeof mockFanClubEvents[0]
  onApprove: () => void
  onReject: (reason: string) => void
}) {
  const [showRejectReason, setShowRejectReason] = useState(false)
  const [rejectReason, setRejectReason] = useState("")
  const [isApproving, setIsApproving] = useState(false)
  const [isRejecting, setIsRejecting] = useState(false)

  const handleApprove = () => {
    setIsApproving(true)
    setTimeout(() => {
      onApprove()
    }, 500)
  }

  const handleReject = () => {
    setIsRejecting(true)
    setTimeout(() => {
      onReject(rejectReason)
    }, 500)
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric'
    })
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: isApproving || isRejecting ? 0 : 1, 
        x: isApproving ? -100 : isRejecting ? 100 : 0,
        backgroundColor: isApproving ? '#dcfce7' : isRejecting ? '#fee2e2' : '#ffffff'
      }}
      exit={{ opacity: 0, x: isApproving ? -100 : 100 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-bold text-lg text-[#1A1A1A]">{event.eventName}</h3>
            <p className="text-sm text-[#6B7280]">Submitted by {event.submitterName}</p>
          </div>
          <span className="px-3 py-1 bg-amber-100 text-amber-700 text-sm font-medium rounded-full">
            {event.eventType}
          </span>
        </div>

        {/* Event Details */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2 text-[#374151]">
            <Calendar className="w-4 h-4 text-[#6B7280]" />
            <span className="text-sm">{formatDate(event.eventDate)}</span>
          </div>
          <div className="flex items-center gap-2 text-[#374151]">
            <MapPin className="w-4 h-4 text-[#6B7280]" />
            <span className="text-sm">{event.city}</span>
          </div>
          <div className="flex items-center gap-2 text-[#374151]">
            <MapPin className="w-4 h-4 text-[#6B7280]" />
            <span className="text-sm">{event.venue}</span>
          </div>
          <div className="flex items-center gap-2 text-[#374151]">
            <Users2 className="w-4 h-4 text-[#6B7280]" />
            <span className="text-sm">{event.expectedTurnout} expected</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleApprove}
            disabled={isApproving || isRejecting}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50"
          >
            <Check className="w-4 h-4" />
            Approve
          </button>
          <button
            onClick={() => setShowRejectReason(!showRejectReason)}
            disabled={isApproving || isRejecting}
            className="flex items-center gap-2 px-4 py-2 border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors font-medium disabled:opacity-50"
          >
            <XIcon className="w-4 h-4" />
            Reject
          </button>
        </div>

        {/* Reject Reason Field */}
        <AnimatePresence>
          {showRejectReason && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-4 pt-4 border-t border-gray-100">
                <label className="block text-sm font-medium text-[#374151] mb-2">
                  Rejection Reason
                </label>
                <textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Please provide a reason for rejection..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none resize-none"
                  rows={3}
                />
                <button
                  onClick={handleReject}
                  disabled={!rejectReason.trim()}
                  className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Confirm Reject
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

// Main Admin Moderation Component
export function AdminModeration() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"stories" | "events" | "approved" | "rejected">("stories")
  
  const [goodWorksQueue, setGoodWorksQueue] = useState(mockGoodWorksSubmissions)
  const [fanClubQueue, setFanClubQueue] = useState(mockFanClubEvents)
  const [processedItems, setProcessedItems] = useState(mockProcessedSubmissions)

  const [approvedToday, setApprovedToday] = useState(45)
  const [rejectedToday, setRejectedToday] = useState(2)

  const tabs = [
    { id: "stories" as const, label: "Good Works Stories", count: goodWorksQueue.length },
    { id: "events" as const, label: "Fan Club Events", count: fanClubQueue.length },
    { id: "approved" as const, label: "Approved", count: null },
    { id: "rejected" as const, label: "Rejected", count: null },
  ]

  const handleApproveStory = (id: string) => {
    setGoodWorksQueue(prev => prev.filter(s => s.id !== id))
    setApprovedToday(prev => prev + 1)
  }

  const handleRejectStory = (id: string, reason: string) => {
    setGoodWorksQueue(prev => prev.filter(s => s.id !== id))
    setRejectedToday(prev => prev + 1)
  }

  const handleApproveEvent = (id: string) => {
    setFanClubQueue(prev => prev.filter(e => e.id !== id))
    setApprovedToday(prev => prev + 1)
  }

  const handleRejectEvent = (id: string, reason: string) => {
    setFanClubQueue(prev => prev.filter(e => e.id !== id))
    setRejectedToday(prev => prev + 1)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar 
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Content */}
      <div 
        className="transition-all duration-300"
        style={{ marginLeft: collapsed ? 80 : 240 }}
      >
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden text-[#374151]"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold text-[#1A1A1A]">Content Moderation</h1>
          </div>
          <button className="relative p-2 text-[#6B7280] hover:text-[#1A1A1A] transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#DC2626] rounded-full" />
          </button>
        </header>

        <main className="p-6">
          {/* Quick Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-4 border border-gray-100"
            >
              <p className="text-sm text-[#6B7280]">Stories Pending</p>
              <p className="text-2xl font-bold text-[#1A1A1A]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={goodWorksQueue.length}
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 10, opacity: 0 }}
                  >
                    {goodWorksQueue.length}
                  </motion.span>
                </AnimatePresence>
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-4 border border-gray-100"
            >
              <p className="text-sm text-[#6B7280]">Events Pending</p>
              <p className="text-2xl font-bold text-[#1A1A1A]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={fanClubQueue.length}
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 10, opacity: 0 }}
                  >
                    {fanClubQueue.length}
                  </motion.span>
                </AnimatePresence>
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-4 border border-gray-100"
            >
              <p className="text-sm text-[#6B7280]">Approved Today</p>
              <p className="text-2xl font-bold text-green-600">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={approvedToday}
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 10, opacity: 0 }}
                  >
                    {approvedToday}
                  </motion.span>
                </AnimatePresence>
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl p-4 border border-gray-100"
            >
              <p className="text-sm text-[#6B7280]">Rejected Today</p>
              <p className="text-2xl font-bold text-red-600">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={rejectedToday}
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 10, opacity: 0 }}
                  >
                    {rejectedToday}
                  </motion.span>
                </AnimatePresence>
              </p>
            </motion.div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl border border-gray-100 mb-6">
            <div className="flex border-b border-gray-100 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-6 py-4 font-medium whitespace-nowrap transition-colors
                    ${activeTab === tab.id 
                      ? 'text-[#DC2626]' 
                      : 'text-[#6B7280] hover:text-[#1A1A1A]'
                    }`}
                >
                  {tab.label}
                  {tab.count !== null && tab.count > 0 && (
                    <motion.span
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="ml-2 px-2 py-0.5 bg-[#DC2626] text-white text-xs font-bold rounded-full"
                    >
                      {tab.count}
                    </motion.span>
                  )}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="modTabIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#DC2626]"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="p-6"
              >
                {activeTab === "stories" && (
                  <div className="space-y-4 max-w-3xl">
                    <AnimatePresence mode="popLayout">
                      {goodWorksQueue.length === 0 ? (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-center py-12"
                        >
                          <Check className="w-12 h-12 mx-auto text-green-500 mb-4" />
                          <p className="text-[#6B7280]">All stories have been reviewed!</p>
                        </motion.div>
                      ) : (
                        goodWorksQueue.map((submission) => (
                          <GoodWorksCard
                            key={submission.id}
                            submission={submission}
                            onApprove={() => handleApproveStory(submission.id)}
                            onReject={(reason) => handleRejectStory(submission.id, reason)}
                          />
                        ))
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {activeTab === "events" && (
                  <div className="space-y-4 max-w-3xl">
                    <AnimatePresence mode="popLayout">
                      {fanClubQueue.length === 0 ? (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-center py-12"
                        >
                          <Check className="w-12 h-12 mx-auto text-green-500 mb-4" />
                          <p className="text-[#6B7280]">All events have been reviewed!</p>
                        </motion.div>
                      ) : (
                        fanClubQueue.map((event) => (
                          <FanClubEventCard
                            key={event.id}
                            event={event}
                            onApprove={() => handleApproveEvent(event.id)}
                            onReject={(reason) => handleRejectEvent(event.id, reason)}
                          />
                        ))
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {activeTab === "approved" && (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-100">
                          <th className="text-left py-3 px-4 font-semibold text-[#374151]">Title</th>
                          <th className="text-left py-3 px-4 font-semibold text-[#374151]">Submitter</th>
                          <th className="text-left py-3 px-4 font-semibold text-[#374151]">Submitted</th>
                          <th className="text-left py-3 px-4 font-semibold text-[#374151]">Approved</th>
                          <th className="text-left py-3 px-4 font-semibold text-[#374151]">By</th>
                        </tr>
                      </thead>
                      <tbody>
                        {processedItems
                          .filter(item => item.status === "approved")
                          .map((item, index) => (
                            <motion.tr
                              key={item.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className="border-b border-gray-50 hover:bg-gray-50"
                            >
                              <td className="py-3 px-4 text-[#1A1A1A]">{item.title}</td>
                              <td className="py-3 px-4 text-[#6B7280]">{item.submitter}</td>
                              <td className="py-3 px-4 text-[#6B7280]">{item.dateSubmitted}</td>
                              <td className="py-3 px-4 text-[#6B7280]">{item.dateActioned}</td>
                              <td className="py-3 px-4 text-[#6B7280]">{item.actionedBy}</td>
                            </motion.tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {activeTab === "rejected" && (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-100">
                          <th className="text-left py-3 px-4 font-semibold text-[#374151]">Title</th>
                          <th className="text-left py-3 px-4 font-semibold text-[#374151]">Submitter</th>
                          <th className="text-left py-3 px-4 font-semibold text-[#374151]">Rejected</th>
                          <th className="text-left py-3 px-4 font-semibold text-[#374151]">By</th>
                          <th className="text-left py-3 px-4 font-semibold text-[#374151]">Reason</th>
                        </tr>
                      </thead>
                      <tbody>
                        {processedItems
                          .filter(item => item.status === "rejected")
                          .map((item, index) => (
                            <motion.tr
                              key={item.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className="border-b border-gray-50 hover:bg-gray-50"
                            >
                              <td className="py-3 px-4 text-[#1A1A1A]">{item.title}</td>
                              <td className="py-3 px-4 text-[#6B7280]">{item.submitter}</td>
                              <td className="py-3 px-4 text-[#6B7280]">{item.dateActioned}</td>
                              <td className="py-3 px-4 text-[#6B7280]">{item.actionedBy}</td>
                              <td className="py-3 px-4">
                                <div className="group relative">
                                  <span className="flex items-center gap-1 text-amber-600 cursor-help">
                                    <AlertTriangle className="w-4 h-4" />
                                    View
                                  </span>
                                  <div className="absolute left-0 top-full mt-1 w-64 p-3 bg-[#1A1A1A] text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                                    {item.rejectionReason}
                                  </div>
                                </div>
                              </td>
                            </motion.tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  )
}
