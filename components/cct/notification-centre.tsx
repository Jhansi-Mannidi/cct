"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
import { 
  Bell, 
  Droplet, 
  Heart, 
  Calendar, 
  Gift, 
  Check, 
  ChevronRight, 
  Trash2,
  X,
  Sparkles,
  Trophy,
  ArrowRight
} from "lucide-react"

// Notification types
type NotificationType = "blood" | "campaign" | "event" | "cross-domain"

interface Notification {
  id: string
  type: NotificationType
  title: string
  body: string
  timestamp: string
  isRead: boolean
  actionText?: string
}

// Mock notifications data
const initialNotifications: Notification[] = [
  {
    id: "1",
    type: "blood",
    title: "You're eligible to donate again!",
    body: "Your 90-day cooldown is complete. Find a blood drive near you.",
    timestamp: "2 hours ago",
    isRead: false,
    actionText: "Find Blood Drive"
  },
  {
    id: "2",
    type: "campaign",
    title: "Campaign fully funded!",
    body: "The Platelet Separator campaign reached Rs.18L. Thank you for your Rs.500 contribution.",
    timestamp: "5 hours ago",
    isRead: false,
    actionText: "View Campaign"
  },
  {
    id: "3",
    type: "event",
    title: "Reminder: Mega Blood Drive tomorrow",
    body: "LB Stadium, Hyderabad. Your slot: #142. Arrive by 8 AM.",
    timestamp: "8 hours ago",
    isRead: false,
    actionText: "View Details"
  },
  {
    id: "4",
    type: "blood",
    title: "Your blood was used!",
    body: "A unit from your March donation helped a patient at NIMS Hyderabad.",
    timestamp: "1 day ago",
    isRead: false,
    actionText: "See Impact"
  },
  {
    id: "5",
    type: "campaign",
    title: "New campaign near you",
    body: "'Emergency Blood Storage Unit' needs funding at Tirupati Hospital.",
    timestamp: "1 day ago",
    isRead: false,
    actionText: "Contribute"
  },
  {
    id: "6",
    type: "blood",
    title: "Post-donation check-in",
    body: "How are you feeling? It's been 3 days since your donation. Tap to respond.",
    timestamp: "3 days ago",
    isRead: true,
    actionText: "Respond"
  },
  {
    id: "7",
    type: "event",
    title: "Event completed: JNTU Campus Drive",
    body: "200 donors, 180 units collected. Thank you for participating!",
    timestamp: "5 days ago",
    isRead: true
  },
  {
    id: "8",
    type: "blood",
    title: "10 days until eligibility",
    body: "You'll be eligible to donate again on May 25. Want to book a slot?",
    timestamp: "1 week ago",
    isRead: true,
    actionText: "Book Slot"
  },
  {
    id: "9",
    type: "campaign",
    title: "Impact update",
    body: "Your contributions funded 10 transfusion sessions at Guntur Blood Bank.",
    timestamp: "1 week ago",
    isRead: true
  },
  {
    id: "10",
    type: "cross-domain",
    title: "Double your impact",
    body: "You donated blood last month. Consider funding life-saving equipment too.",
    timestamp: "2 weeks ago",
    isRead: true,
    actionText: "Explore Campaigns"
  },
  {
    id: "11",
    type: "blood",
    title: "Welcome to Silver tier!",
    body: "You've earned 150 credits. Next tier: Gold at 500 credits.",
    timestamp: "3 weeks ago",
    isRead: true,
    actionText: "View Profile"
  },
  {
    id: "12",
    type: "event",
    title: "New event: Birthday Blood Drive — Tirupati",
    body: "June 2, 2026. 300 slots available. Register now!",
    timestamp: "3 weeks ago",
    isRead: true,
    actionText: "Register"
  }
]

// New notification templates for simulation
const newNotificationTemplates: Omit<Notification, "id" | "timestamp" | "isRead">[] = [
  {
    type: "blood",
    title: "Urgent: O- blood needed",
    body: "Gandhi Hospital needs O- blood urgently. You're a match!",
    actionText: "Respond"
  },
  {
    type: "campaign",
    title: "Campaign milestone reached!",
    body: "The Pediatric Blood Bank campaign is 75% funded.",
    actionText: "View Progress"
  },
  {
    type: "event",
    title: "New event in your area",
    body: "Blood Donation Camp at Jubilee Hills on June 15. Limited slots!",
    actionText: "Register"
  }
]

// Get icon for notification type
function getTypeIcon(type: NotificationType) {
  switch (type) {
    case "blood":
      return <Droplet className="w-5 h-5" />
    case "campaign":
      return <Heart className="w-5 h-5" />
    case "event":
      return <Calendar className="w-5 h-5" />
    case "cross-domain":
      return <Sparkles className="w-5 h-5" />
    default:
      return <Bell className="w-5 h-5" />
  }
}

// Get color for notification type
function getTypeColor(type: NotificationType) {
  switch (type) {
    case "blood":
      return "bg-red-100 text-[#DC2626]"
    case "campaign":
      return "bg-amber-100 text-amber-600"
    case "event":
      return "bg-blue-100 text-[#1E3A5F]"
    case "cross-domain":
      return "bg-purple-100 text-purple-600"
    default:
      return "bg-gray-100 text-gray-600"
  }
}

// Individual notification card with swipe-to-dismiss
function NotificationCard({ 
  notification, 
  onRead, 
  onDismiss,
  onExpand,
  isExpanded 
}: { 
  notification: Notification
  onRead: (id: string) => void
  onDismiss: (id: string) => void
  onExpand: (id: string | null) => void
  isExpanded: boolean
}) {
  const x = useMotionValue(0)
  const background = useTransform(
    x,
    [-100, 0],
    ["rgba(220, 38, 38, 0.2)", "rgba(255, 255, 255, 1)"]
  )
  const dismissOpacity = useTransform(x, [-100, -50, 0], [1, 0.5, 0])

  const handleDragEnd = (_: any, info: { offset: { x: number } }) => {
    if (info.offset.x < -100) {
      onDismiss(notification.id)
    }
  }

  const handleTap = () => {
    if (!notification.isRead) {
      onRead(notification.id)
    }
    onExpand(isExpanded ? null : notification.id)
  }

  return (
    <div className="relative overflow-hidden">
      {/* Dismiss background */}
      <motion.div 
        className="absolute inset-0 bg-red-500 flex items-center justify-end pr-4"
        style={{ opacity: dismissOpacity }}
      >
        <Trash2 className="w-5 h-5 text-white" />
      </motion.div>

      {/* Card */}
      <motion.div
        drag="x"
        dragConstraints={{ left: -120, right: 0 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        style={{ x, background }}
        onClick={handleTap}
        className={`relative p-4 border-b border-gray-100 cursor-pointer transition-colors ${
          notification.isRead ? "bg-white" : "bg-red-50/50"
        }`}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex gap-3">
          {/* Icon */}
          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${getTypeColor(notification.type)}`}>
            {getTypeIcon(notification.type)}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h4 className={`font-medium text-sm ${notification.isRead ? "text-gray-700" : "text-[#1A1A1A]"}`}>
                {notification.title}
              </h4>
              {/* Unread indicator */}
              {!notification.isRead && (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-[#DC2626] shrink-0 mt-1.5"
                />
              )}
            </div>
            <p className={`text-xs mt-1 line-clamp-2 ${notification.isRead ? "text-gray-500" : "text-gray-600"}`}>
              {notification.body}
            </p>
            <p className="text-xs text-gray-400 mt-1.5">{notification.timestamp}</p>
          </div>

          {/* Chevron */}
          <motion.div
            animate={{ rotate: isExpanded ? 90 : 0 }}
            className="shrink-0 self-center"
          >
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </motion.div>
        </div>

        {/* Expanded content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="pt-4 pl-13 ml-10">
                <p className="text-sm text-gray-600 mb-3">{notification.body}</p>
                {notification.actionText && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-2 bg-[#DC2626] text-white text-sm font-medium rounded-lg flex items-center gap-2"
                  >
                    {notification.actionText}
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

// Empty state component
function EmptyState({ tab }: { tab: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-6 text-center"
    >
      <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        {tab === "events" && <Calendar className="w-8 h-8 text-gray-400" />}
        {tab === "blood" && <Droplet className="w-8 h-8 text-gray-400" />}
        {tab === "campaigns" && <Heart className="w-8 h-8 text-gray-400" />}
      </div>
      <h3 className="font-medium text-gray-700 mb-1">No {tab} notifications yet</h3>
      <p className="text-sm text-gray-500 mb-4">
        {tab === "events" && "Browse upcoming events to get started"}
        {tab === "blood" && "Complete your donor registration to receive updates"}
        {tab === "campaigns" && "Explore campaigns to support life-saving initiatives"}
      </p>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="text-[#DC2626] text-sm font-medium flex items-center gap-1"
      >
        {tab === "events" && "Browse upcoming events"}
        {tab === "blood" && "Register as donor"}
        {tab === "campaigns" && "Explore campaigns"}
        <ArrowRight className="w-4 h-4" />
      </motion.button>
    </motion.div>
  )
}

// Main Notification Centre component
export function NotificationCentre() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)
  const [activeTab, setActiveTab] = useState<"all" | "blood" | "campaigns" | "events">("all")
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [newNotifId, setNewNotifId] = useState(100)

  const tabs = [
    { id: "all", label: "All" },
    { id: "blood", label: "Blood" },
    { id: "campaigns", label: "Campaigns" },
    { id: "events", label: "Events" }
  ] as const

  // Filter notifications by tab
  const filteredNotifications = notifications.filter(n => {
    if (activeTab === "all") return true
    if (activeTab === "blood") return n.type === "blood" || n.type === "cross-domain"
    if (activeTab === "campaigns") return n.type === "campaign"
    if (activeTab === "events") return n.type === "event"
    return true
  })

  // Count unread
  const unreadCount = notifications.filter(n => !n.isRead).length

  // Mark notification as read
  const handleRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    )
  }

  // Dismiss notification
  const handleDismiss = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
    if (expandedId === id) setExpandedId(null)
  }

  // Mark all as read
  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })))
  }

  // Simulate new notification every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const template = newNotificationTemplates[Math.floor(Math.random() * newNotificationTemplates.length)]
      const newNotification: Notification = {
        ...template,
        id: `new-${newNotifId}`,
        timestamp: "Just now",
        isRead: false
      }
      setNewNotifId(prev => prev + 1)
      setNotifications(prev => [newNotification, ...prev])
    }, 15000)

    return () => clearInterval(interval)
  }, [newNotifId])

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1E3A5F] to-[#0F1F33] py-12 px-4 flex items-center justify-center">
      {/* Phone Frame */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[390px] bg-white rounded-[40px] shadow-2xl overflow-hidden"
        style={{ 
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 12px #1A1A1A, 0 0 0 14px #333" 
        }}
      >
        {/* Phone Notch */}
        <div className="h-7 bg-[#1A1A1A] relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-32 h-7 bg-[#1A1A1A] rounded-b-2xl" />
        </div>

        {/* Header */}
        <div className="bg-white px-5 pt-4 pb-3 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl font-bold text-[#1A1A1A]">Notifications</h1>
              {unreadCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-6 h-6 rounded-full bg-[#DC2626] text-white text-xs font-bold flex items-center justify-center"
                >
                  {unreadCount}
                </motion.span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="text-sm text-[#DC2626] font-medium"
              >
                Mark all as read
              </button>
            )}
          </div>

          {/* Tabs */}
          <div className="flex gap-1 relative">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2 text-sm font-medium relative z-10 transition-colors ${
                  activeTab === tab.id ? "text-[#DC2626]" : "text-gray-500"
                }`}
              >
                {tab.label}
              </button>
            ))}
            {/* Animated underline */}
            <motion.div
              layoutId="notification-tab-underline"
              className="absolute bottom-0 h-0.5 bg-[#DC2626] rounded-full"
              style={{
                width: `${100 / tabs.length}%`,
                left: `${tabs.findIndex(t => t.id === activeTab) * (100 / tabs.length)}%`
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          </div>
        </div>

        {/* Notification List */}
        <div className="h-[520px] overflow-y-auto">
          <AnimatePresence mode="popLayout">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -200 }}
                  transition={{ 
                    delay: index * 0.03,
                    type: "spring",
                    stiffness: 300,
                    damping: 25
                  }}
                  layout
                >
                  <NotificationCard
                    notification={notification}
                    onRead={handleRead}
                    onDismiss={handleDismiss}
                    onExpand={setExpandedId}
                    isExpanded={expandedId === notification.id}
                  />
                </motion.div>
              ))
            ) : (
              <EmptyState tab={activeTab} />
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Safe Area */}
        <div className="h-8 bg-white" />
      </motion.div>
    </div>
  )
}
