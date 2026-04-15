"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { 
  Calendar, MapPin, Clock, Users, ArrowLeft, ArrowRight, Share2, 
  Droplet, Heart, Megaphone, UserPlus, ChevronLeft, ChevronRight,
  Check, Copy, Plus, X, Building, Ticket
} from "lucide-react"
import { CCTButton } from "./button"

// Event Types
type EventType = "blood-drive" | "fundraiser" | "awareness" | "community"

interface ChildVenue {
  id: string
  name: string
  city: string
  slotsBooked: number
  totalSlots: number
}

interface Event {
  id: number
  title: string
  type: EventType
  date: string
  time: string
  venue: string
  city: string
  slotsBooked: number
  totalSlots: number
  description: string
  fullDescription: string[]
  isMega?: boolean
  pricePerSeat?: number
  childVenues?: ChildVenue[]
  image?: string
}

// Mock Events Data
const eventsData: Event[] = [
  {
    id: 1,
    title: "Mega Blood Drive 2026",
    type: "blood-drive",
    date: "May 15, 2026",
    time: "8:00 AM - 6:00 PM",
    venue: "LB Stadium",
    city: "Hyderabad",
    slotsBooked: 358,
    totalSlots: 500,
    description: "Join us for the biggest blood donation event of the year. Multiple venues, one mission - saving lives.",
    fullDescription: [
      "CCT's Mega Blood Drive 2026 is our flagship annual event bringing together thousands of donors across Telangana and Andhra Pradesh. This year, we aim to collect 500+ units of blood in a single day, setting a new record for the region.",
      "The event will feature free health checkups for all donors, refreshments, entertainment, and certificates of appreciation. Celebrity guests and local leaders will be present to motivate and thank our donor heroes.",
      "Multiple blood collection stations will be operational simultaneously, ensuring minimal wait times. Our trained medical staff will guide you through the entire donation process with care and professionalism."
    ],
    isMega: true,
    childVenues: [
      { id: "v1", name: "LB Stadium - Main Arena", city: "Hyderabad", slotsBooked: 158, totalSlots: 200 },
      { id: "v2", name: "HITEC City Convention", city: "Hyderabad", slotsBooked: 120, totalSlots: 150 },
      { id: "v3", name: "Gachibowli Indoor Stadium", city: "Hyderabad", slotsBooked: 80, totalSlots: 150 }
    ]
  },
  {
    id: 2,
    title: "Campus Blood Donation Camp",
    type: "blood-drive",
    date: "May 22, 2026",
    time: "10:00 AM - 4:00 PM",
    venue: "JNTU Campus",
    city: "Vijayawada",
    slotsBooked: 45,
    totalSlots: 200,
    description: "Partnering with JNTU Vijayawada to host a blood donation camp for students and faculty.",
    fullDescription: [
      "In collaboration with JNTU Vijayawada's NSS unit, CCT is organizing a campus-wide blood donation camp. This event aims to create awareness about blood donation among the youth and encourage first-time donors.",
      "Students who donate blood will receive NSS activity points, certificates, and refreshments. The event also includes an educational seminar on the importance of regular blood donation and its impact on saving lives."
    ]
  },
  {
    id: 3,
    title: "Birthday Celebration Blood Drive",
    type: "blood-drive",
    date: "June 2, 2026",
    time: "9:00 AM - 5:00 PM",
    venue: "Sri Venkateswara University",
    city: "Tirupati",
    slotsBooked: 200,
    totalSlots: 300,
    description: "Celebrate the spirit of giving on this special occasion with a blood donation drive.",
    fullDescription: [
      "Join us for a special blood donation drive celebrating the birthday of our beloved megastar. What better way to celebrate than by giving the gift of life?",
      "The event will feature cultural performances, fan club gatherings, and of course, the opportunity to donate blood and help save lives. All donors will receive special commemorative badges and certificates."
    ]
  },
  {
    id: 4,
    title: "Thalassemia Awareness Walk",
    type: "awareness",
    date: "May 28, 2026",
    time: "7:00 AM",
    venue: "Tank Bund",
    city: "Hyderabad",
    slotsBooked: 120,
    totalSlots: 500,
    description: "Join us for a 5km awareness walk to spread knowledge about Thalassemia and the importance of regular blood transfusions.",
    fullDescription: [
      "Thalassemia patients require regular blood transfusions to survive. This awareness walk aims to educate the public about this condition and the critical need for blood donors.",
      "The walk will start from Tank Bund and cover 5km along the scenic Hussain Sagar Lake. Participants will receive awareness materials, t-shirts, and breakfast. Medical experts will be available to answer questions about Thalassemia."
    ]
  },
  {
    id: 5,
    title: "Annual Fundraiser Gala",
    type: "fundraiser",
    date: "June 10, 2026",
    time: "6:00 PM",
    venue: "Marriott Hotel",
    city: "Hyderabad",
    slotsBooked: 80,
    totalSlots: 150,
    pricePerSeat: 2000,
    description: "An evening of elegance and purpose. All proceeds go towards mobile blood collection units.",
    fullDescription: [
      "CCT's Annual Fundraiser Gala is our premier fundraising event, bringing together philanthropists, business leaders, and celebrities for an evening of giving.",
      "This year's funds will be used to purchase two new mobile blood collection units, enabling us to reach remote areas across AP and Telangana. The evening includes a gourmet dinner, live entertainment, and a silent auction featuring exclusive items."
    ]
  },
  {
    id: 6,
    title: "Community Health Check Camp",
    type: "community",
    date: "May 30, 2026",
    time: "9:00 AM - 1:00 PM",
    venue: "Government School",
    city: "Guntur",
    slotsBooked: 0,
    totalSlots: 100,
    description: "Free health checkups for the community including blood pressure, sugar levels, and basic health screenings.",
    fullDescription: [
      "CCT's Community Health Check Camp brings free healthcare to underserved communities. Our team of volunteer doctors and nurses will provide basic health screenings and consultations.",
      "Services include blood pressure monitoring, blood sugar testing, BMI calculation, and general health advice. This camp also serves as an opportunity to identify potential blood donors and educate the community about the importance of blood donation."
    ]
  },
  {
    id: 7,
    title: "Eye Donation Pledge Drive",
    type: "awareness",
    date: "June 5, 2026",
    time: "10:00 AM - 4:00 PM",
    venue: "Kurnool Medical College",
    city: "Kurnool",
    slotsBooked: 50,
    totalSlots: 200,
    description: "Pledge to donate your eyes and help restore vision for the blind after you.",
    fullDescription: [
      "In partnership with Kurnool Medical College's ophthalmology department, CCT is organizing an eye donation pledge drive. This event aims to create awareness about the gift of sight.",
      "Participants can sign up to pledge their eyes for donation after their passing. Eye donation experts will be available to answer questions and address concerns. All pledge signers will receive certificates of commitment."
    ]
  },
  {
    id: 8,
    title: "Fan Club Blood Drive Marathon",
    type: "blood-drive",
    date: "June 15, 2026",
    time: "All Day",
    venue: "Multiple Cities",
    city: "AP & Telangana",
    slotsBooked: 0,
    totalSlots: 1000,
    description: "A state-wide blood donation marathon organized by fan clubs across AP and Telangana.",
    fullDescription: [
      "The Fan Club Blood Drive Marathon is a coordinated effort by fan clubs across AP and Telangana to donate blood simultaneously on the same day. This year, we aim to collect 1000+ units in a single day.",
      "Fan clubs from Hyderabad, Vijayawada, Visakhapatnam, Tirupati, Guntur, Warangal, and more will participate. Each location will have certified blood collection facilities and medical staff."
    ],
    isMega: true,
    childVenues: [
      { id: "m1", name: "People's Plaza", city: "Hyderabad", slotsBooked: 0, totalSlots: 200 },
      { id: "m2", name: "Vijayawada Club", city: "Vijayawada", slotsBooked: 0, totalSlots: 200 },
      { id: "m3", name: "Beach Road Convention", city: "Visakhapatnam", slotsBooked: 0, totalSlots: 200 },
      { id: "m4", name: "Town Hall", city: "Tirupati", slotsBooked: 0, totalSlots: 200 },
      { id: "m5", name: "Municipal Grounds", city: "Guntur", slotsBooked: 0, totalSlots: 200 }
    ]
  }
]

// Event Type Configuration
const eventTypeConfig = {
  "blood-drive": { 
    label: "Blood Drive",
    icon: Droplet, 
    bg: "bg-red-50", 
    border: "border-red-200", 
    accent: "text-[#DC2626]",
    badge: "bg-[#DC2626] text-white",
    badgeLight: "bg-red-100 text-red-700"
  },
  "fundraiser": { 
    label: "Fundraiser",
    icon: Heart, 
    bg: "bg-[#1E3A5F]/5", 
    border: "border-[#1E3A5F]/20", 
    accent: "text-[#1E3A5F]",
    badge: "bg-[#1E3A5F] text-white",
    badgeLight: "bg-blue-100 text-blue-700"
  },
  "awareness": { 
    label: "Awareness",
    icon: Megaphone, 
    bg: "bg-amber-50", 
    border: "border-amber-200", 
    accent: "text-[#F59E0B]",
    badge: "bg-[#F59E0B] text-white",
    badgeLight: "bg-amber-100 text-amber-700"
  },
  "community": { 
    label: "Community",
    icon: Users, 
    bg: "bg-green-50", 
    border: "border-green-200", 
    accent: "text-green-600",
    badge: "bg-green-600 text-white",
    badgeLight: "bg-green-100 text-green-700"
  },
}

// Animation variants
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

// Confetti particle component
function ConfettiParticle({ delay }: { delay: number }) {
  const colors = ["#DC2626", "#F59E0B", "#1E3A5F", "#10B981", "#8B5CF6"]
  const color = colors[Math.floor(Math.random() * colors.length)]
  const x = (Math.random() - 0.5) * 200
  const y = (Math.random() - 0.5) * 200
  
  return (
    <motion.div
      initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
      animate={{ 
        opacity: [1, 1, 0], 
        scale: [0, 1, 0.5], 
        x: x, 
        y: y 
      }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className="absolute w-2 h-2 rounded-full"
      style={{ backgroundColor: color }}
    />
  )
}

// Success animation component
function SuccessAnimation({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onComplete}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        className="bg-white rounded-3xl p-12 text-center relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Confetti */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <ConfettiParticle key={i} delay={i * 0.05} />
          ))}
        </div>
        
        {/* Checkmark */}
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
          <motion.svg
            viewBox="0 0 24 24"
            className="w-12 h-12 text-green-600"
          >
            <motion.path
              d="M5 13l4 4L19 7"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
          </motion.svg>
        </div>
        
        <h3 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-2">
          Registration Successful!
        </h3>
        <p className="text-[#6B7280] mb-6">
          You have been registered for this event. Check your phone for confirmation.
        </p>
        <CCTButton onClick={onComplete}>
          Done
        </CCTButton>
      </motion.div>
    </motion.div>
  )
}

// Calendar component
function CalendarView({ 
  events, 
  onSelectDate 
}: { 
  events: Event[]
  onSelectDate: (date: string, dayEvents: Event[]) => void 
}) {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 4)) // May 2026
  
  const monthNames = ["January", "February", "March", "April", "May", "June", 
                      "July", "August", "September", "October", "November", "December"]
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    return { firstDay, daysInMonth }
  }
  
  const { firstDay, daysInMonth } = getDaysInMonth(currentMonth)
  
  // Parse event dates to check which days have events
  const getEventsForDay = (day: number) => {
    const monthStr = monthNames[currentMonth.getMonth()]
    return events.filter(event => {
      const eventDateParts = event.date.split(" ")
      const eventMonth = eventDateParts[0]
      const eventDay = parseInt(eventDateParts[1].replace(",", ""))
      const eventYear = parseInt(eventDateParts[2])
      return eventMonth === monthStr && eventDay === day && eventYear === currentMonth.getFullYear()
    })
  }
  
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }
  
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg shadow-black/5 overflow-hidden"
    >
      {/* Calendar Header */}
      <div className="flex items-center justify-between p-4 bg-[#1E3A5F] text-white">
        <button onClick={prevMonth} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h3 className="font-serif text-xl font-bold">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        <button onClick={nextMonth} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      
      {/* Day Headers */}
      <div className="grid grid-cols-7 bg-gray-50">
        {dayNames.map(day => (
          <div key={day} className="p-3 text-center text-sm font-medium text-[#6B7280]">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar Grid */}
      <div className="grid grid-cols-7">
        {/* Empty cells for days before month starts */}
        {[...Array(firstDay)].map((_, i) => (
          <div key={`empty-${i}`} className="p-3 min-h-[80px] bg-gray-50/50" />
        ))}
        
        {/* Days of the month */}
        {[...Array(daysInMonth)].map((_, i) => {
          const day = i + 1
          const dayEvents = getEventsForDay(day)
          const hasEvents = dayEvents.length > 0
          
          return (
            <motion.button
              key={day}
              onClick={() => hasEvents && onSelectDate(`${monthNames[currentMonth.getMonth()]} ${day}, ${currentMonth.getFullYear()}`, dayEvents)}
              className={`
                p-3 min-h-[80px] border-t border-l border-gray-100 text-left relative
                ${hasEvents ? "cursor-pointer hover:bg-gray-50" : "cursor-default"}
                transition-colors
              `}
              whileHover={hasEvents ? { scale: 1.02 } : {}}
              whileTap={hasEvents ? { scale: 0.98 } : {}}
            >
              <span className={`text-sm ${hasEvents ? "font-bold text-[#1A1A1A]" : "text-[#6B7280]"}`}>
                {day}
              </span>
              
              {/* Event dots */}
              {hasEvents && (
                <div className="flex gap-1 mt-2 flex-wrap">
                  {dayEvents.slice(0, 3).map((event) => {
                    const config = eventTypeConfig[event.type]
                    return (
                      <motion.div
                        key={event.id}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={`w-2 h-2 rounded-full ${config.badge.split(" ")[0]}`}
                      />
                    )
                  })}
                  {dayEvents.length > 3 && (
                    <span className="text-xs text-[#6B7280]">+{dayEvents.length - 3}</span>
                  )}
                </div>
              )}
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}

// Event Card Component
function EventCard({ 
  event, 
  onClick,
  index = 0 
}: { 
  event: Event
  onClick: () => void
  index?: number 
}) {
  const config = eventTypeConfig[event.type]
  const Icon = config.icon
  const slotsRemaining = event.totalSlots - event.slotsBooked
  const progress = (event.slotsBooked / event.totalSlots) * 100
  
  return (
    <motion.div
      variants={staggerItem}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={onClick}
      className={`
        bg-white rounded-2xl overflow-hidden shadow-lg shadow-black/5 cursor-pointer
        border-2 border-transparent hover:border-[#DC2626]/20 transition-all
        ${event.isMega ? "md:col-span-2" : ""}
      `}
    >
      {/* Image Placeholder */}
      <div className={`relative h-48 ${config.bg}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon className={`w-16 h-16 ${config.accent} opacity-30`} />
        </div>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${config.badge}`}>
            {config.label}
          </span>
          {event.isMega && (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#F59E0B] text-white">
              Mega Event
            </span>
          )}
        </div>
        
        {event.pricePerSeat && (
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white text-[#1A1A1A] shadow-md">
              Rs.{event.pricePerSeat.toLocaleString()}/seat
            </span>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h3 className="font-serif text-xl font-bold text-[#1A1A1A] mb-3">
          {event.title}
        </h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-[#6B7280]">
            <Calendar className="w-4 h-4 text-[#DC2626]" />
            <span>{event.date} | {event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#6B7280]">
            <MapPin className="w-4 h-4 text-[#DC2626]" />
            <span>{event.venue}, {event.city}</span>
          </div>
        </div>
        
        {/* Slots Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-[#1A1A1A]">
              {slotsRemaining} of {event.totalSlots} slots remaining
            </span>
            <span className="text-[#6B7280]">{Math.round(progress)}% filled</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${progress}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className={`h-full rounded-full ${
                progress >= 80 ? "bg-[#DC2626]" : progress >= 50 ? "bg-[#F59E0B]" : "bg-green-500"
              }`}
            />
          </div>
        </div>
        
        <CCTButton variant="outline" className="w-full">
          Register
          <ArrowRight className="w-4 h-4" />
        </CCTButton>
      </div>
    </motion.div>
  )
}

// Event Detail Component
function EventDetail({ 
  event, 
  onBack,
  allEvents 
}: { 
  event: Event
  onBack: () => void
  allEvents: Event[]
}) {
  const [selectedVenue, setSelectedVenue] = useState<string | null>(
    event.childVenues ? event.childVenues[0].id : null
  )
  const [formData, setFormData] = useState({ name: "", phone: "", bloodType: "" })
  const [showSuccess, setShowSuccess] = useState(false)
  const [copied, setCopied] = useState(false)
  
  const config = eventTypeConfig[event.type]
  const Icon = config.icon
  const slotsRemaining = event.totalSlots - event.slotsBooked
  const progress = (event.slotsBooked / event.totalSlots) * 100
  
  // Get similar events (same type, different event)
  const similarEvents = allEvents
    .filter(e => e.type === event.type && e.id !== event.id)
    .slice(0, 2)
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.phone && formData.bloodType) {
      setShowSuccess(true)
    }
  }
  
  const copyLink = () => {
    navigator.clipboard.writeText(`https://cct.org/events/${event.id}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  
  const shareWhatsApp = () => {
    const text = `Check out this event: ${event.title} on ${event.date} at ${event.venue}, ${event.city}. Register now!`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank")
  }
  
  const shareTwitter = () => {
    const text = `I'm registering for ${event.title} with @CCT_Official! Join me in saving lives.`
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, "_blank")
  }
  
  // Progress Arc calculations
  const radius = 80
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (progress / 100) * circumference
  
  return (
    <>
      <AnimatePresence>
        {showSuccess && (
          <SuccessAnimation onComplete={() => setShowSuccess(false)} />
        )}
      </AnimatePresence>
      
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        className="pt-28 pb-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onBack}
            className="flex items-center gap-2 text-[#6B7280] hover:text-[#1A1A1A] mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Events</span>
          </motion.button>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Hero Image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`relative h-64 md:h-96 rounded-3xl overflow-hidden ${config.bg}`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <Icon className={`w-32 h-32 ${config.accent} opacity-20`} />
                </div>
                
                <div className="absolute top-6 left-6 flex gap-2">
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${config.badge}`}>
                    {config.label}
                  </span>
                  {event.isMega && (
                    <span className="px-4 py-2 rounded-full text-sm font-semibold bg-[#F59E0B] text-white">
                      Mega Event
                    </span>
                  )}
                </div>
              </motion.div>
              
              {/* Title & Info */}
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6"
                >
                  {event.title}
                </motion.h1>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-wrap gap-6 mb-8"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-[#DC2626]" />
                    </div>
                    <div>
                      <p className="text-sm text-[#6B7280]">Date & Time</p>
                      <p className="font-medium text-[#1A1A1A]">{event.date}</p>
                      <p className="text-sm text-[#6B7280]">{event.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-[#DC2626]" />
                    </div>
                    <div>
                      <p className="text-sm text-[#6B7280]">Venue</p>
                      <p className="font-medium text-[#1A1A1A]">{event.venue}</p>
                      <p className="text-sm text-[#6B7280]">{event.city}</p>
                    </div>
                  </div>
                </motion.div>
                
                {/* Slot Counter with Progress Arc */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-8 p-6 bg-white rounded-2xl shadow-lg shadow-black/5 mb-8"
                >
                  <div className="relative">
                    <svg className="w-40 h-40 -rotate-90">
                      <circle
                        cx="80"
                        cy="80"
                        r={radius}
                        fill="none"
                        stroke="#E5E7EB"
                        strokeWidth="12"
                      />
                      <motion.circle
                        cx="80"
                        cy="80"
                        r={radius}
                        fill="none"
                        stroke={progress >= 80 ? "#DC2626" : progress >= 50 ? "#F59E0B" : "#10B981"}
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-3xl font-bold text-[#1A1A1A]"
                        >
                          {slotsRemaining}
                        </motion.span>
                        <p className="text-xs text-[#6B7280]">slots left</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-2">
                      {slotsRemaining} slots remaining
                    </h3>
                    <p className="text-[#6B7280]">
                      of {event.totalSlots} total slots
                    </p>
                    {progress >= 80 && (
                      <p className="text-[#DC2626] font-medium mt-2">
                        Filling up fast! Register now.
                      </p>
                    )}
                  </div>
                </motion.div>
              </div>
              
              {/* Mega Event Venues */}
              {event.isMega && event.childVenues && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white rounded-2xl shadow-lg shadow-black/5 overflow-hidden"
                >
                  <div className="p-4 bg-[#1E3A5F]">
                    <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                      <Building className="w-5 h-5" />
                      Select Venue
                    </h3>
                  </div>
                  <div className="p-4">
                    <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
                      {event.childVenues.map((venue) => (
                        <button
                          key={venue.id}
                          onClick={() => setSelectedVenue(venue.id)}
                          className={`
                            px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all
                            ${selectedVenue === venue.id 
                              ? "bg-[#DC2626] text-white" 
                              : "bg-gray-100 text-[#6B7280] hover:bg-gray-200"
                            }
                          `}
                        >
                          {venue.city}
                        </button>
                      ))}
                    </div>
                    
                    {event.childVenues.map((venue) => (
                      selectedVenue === venue.id && (
                        <motion.div
                          key={venue.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 bg-gray-50 rounded-xl"
                        >
                          <h4 className="font-semibold text-[#1A1A1A] mb-2">{venue.name}</h4>
                          <p className="text-sm text-[#6B7280] mb-3">{venue.city}</p>
                          <div className="flex justify-between text-sm mb-2">
                            <span>{venue.totalSlots - venue.slotsBooked} slots remaining</span>
                            <span>{Math.round((venue.slotsBooked / venue.totalSlots) * 100)}% filled</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(venue.slotsBooked / venue.totalSlots) * 100}%` }}
                              className="h-full bg-[#DC2626] rounded-full"
                            />
                          </div>
                        </motion.div>
                      )
                    ))}
                  </div>
                </motion.div>
              )}
              
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="prose prose-gray max-w-none"
              >
                <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-4">About This Event</h2>
                {event.fullDescription.map((paragraph, i) => (
                  <p key={i} className="text-[#6B7280] mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </motion.div>
              
              {/* Map Placeholder */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-gray-100 rounded-2xl h-64 flex items-center justify-center"
              >
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-[#6B7280] mx-auto mb-3" />
                  <p className="text-[#6B7280] mb-3">{event.venue}, {event.city}</p>
                  <a 
                    href={`https://maps.google.com/?q=${encodeURIComponent(`${event.venue}, ${event.city}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#DC2626] font-medium hover:underline"
                  >
                    View on Google Maps
                  </a>
                </div>
              </motion.div>
              
              {/* Share Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex items-center gap-4"
              >
                <span className="text-[#6B7280] font-medium">Share:</span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={shareWhatsApp}
                  className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={shareTwitter}
                  className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={copyLink}
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center transition-colors
                    ${copied ? "bg-green-500 text-white" : "bg-gray-200 text-[#6B7280]"}
                  `}
                >
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </motion.button>
              </motion.div>
              
              {/* Similar Events */}
              {similarEvents.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-6">Similar Events</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {similarEvents.map((e, i) => {
                      const eConfig = eventTypeConfig[e.type]
                      const eIcon = eConfig.icon
                      return (
                        <motion.div
                          key={e.id}
                          whileHover={{ y: -4 }}
                          className="bg-white rounded-2xl overflow-hidden shadow-lg shadow-black/5"
                        >
                          <div className={`h-32 ${eConfig.bg} flex items-center justify-center relative`}>
                            <eIcon className={`w-12 h-12 ${eConfig.accent} opacity-30`} />
                            <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${eConfig.badge}`}>
                              {eConfig.label}
                            </span>
                          </div>
                          <div className="p-4">
                            <h3 className="font-serif font-bold text-[#1A1A1A] mb-2">{e.title}</h3>
                            <p className="text-sm text-[#6B7280]">{e.date} | {e.city}</p>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>
              )}
            </div>
            
            {/* Sidebar - Registration Form */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="sticky top-28 bg-white rounded-2xl shadow-lg shadow-black/5 overflow-hidden"
              >
                <div className="p-4 bg-gradient-to-r from-[#DC2626] to-[#B91C1C] text-white">
                  <h3 className="font-serif text-xl font-bold flex items-center gap-2">
                    <Ticket className="w-5 h-5" />
                    Register Now
                  </h3>
                  {event.pricePerSeat && (
                    <p className="text-white/80 text-sm mt-1">
                      Rs.{event.pricePerSeat.toLocaleString()} per seat
                    </p>
                  )}
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-2">Full Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#DC2626] focus:ring-2 focus:ring-red-100 outline-none transition-all"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#DC2626] focus:ring-2 focus:ring-red-100 outline-none transition-all"
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-2">Blood Type</label>
                    <select
                      value={formData.bloodType}
                      onChange={(e) => setFormData({ ...formData, bloodType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#DC2626] focus:ring-2 focus:ring-red-100 outline-none transition-all"
                      required
                    >
                      <option value="">Select blood type</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-[#DC2626] to-[#B91C1C] text-white font-semibold rounded-xl shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 transition-all"
                  >
                    Complete Registration
                  </motion.button>
                  
                  <p className="text-xs text-center text-[#6B7280]">
                    By registering, you agree to our terms and conditions.
                  </p>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Mobile Sticky CTA */}
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 shadow-lg z-40"
        >
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <p className="font-semibold text-[#1A1A1A]">{slotsRemaining} slots left</p>
              {event.pricePerSeat && (
                <p className="text-sm text-[#6B7280]">Rs.{event.pricePerSeat.toLocaleString()}/seat</p>
              )}
            </div>
            <CCTButton
              onClick={() => document.querySelector("form")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8"
            >
              Register
            </CCTButton>
          </div>
        </motion.div>
      </motion.div>
    </>
  )
}

// Day Events Panel (for calendar view)
function DayEventsPanel({ 
  date, 
  events, 
  onClose,
  onSelectEvent 
}: { 
  date: string
  events: Event[]
  onClose: () => void
  onSelectEvent: (event: Event) => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed inset-x-0 bottom-0 bg-white rounded-t-3xl shadow-2xl z-50 max-h-[70vh] overflow-hidden"
    >
      <div className="p-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white">
        <h3 className="font-serif text-xl font-bold text-[#1A1A1A]">
          Events on {date}
        </h3>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="p-4 overflow-y-auto max-h-[calc(70vh-80px)]">
        <div className="space-y-4">
          {events.map((event) => {
            const config = eventTypeConfig[event.type]
            const Icon = config.icon
            return (
              <motion.button
                key={event.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectEvent(event)}
                className="w-full p-4 bg-gray-50 rounded-xl flex items-start gap-4 text-left"
              >
                <div className={`w-12 h-12 rounded-xl ${config.bg} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-6 h-6 ${config.accent}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${config.badgeLight} mb-1`}>
                    {config.label}
                  </span>
                  <h4 className="font-semibold text-[#1A1A1A] truncate">{event.title}</h4>
                  <p className="text-sm text-[#6B7280]">{event.time} | {event.venue}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-[#6B7280] flex-shrink-0" />
              </motion.button>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}

// Main Events Pages Component
export function EventsPages() {
  const [view, setView] = useState<"list" | "calendar">("list")
  const [selectedType, setSelectedType] = useState<EventType | "all">("all")
  const [selectedCity, setSelectedCity] = useState<string>("all")
  const [dateRange, setDateRange] = useState<string>("all")
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [selectedDate, setSelectedDate] = useState<{ date: string; events: Event[] } | null>(null)
  
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  const eventTypes: { value: EventType | "all"; label: string }[] = [
    { value: "all", label: "All Types" },
    { value: "blood-drive", label: "Blood Drive" },
    { value: "fundraiser", label: "Fundraiser" },
    { value: "awareness", label: "Awareness" },
    { value: "community", label: "Community" },
  ]
  
  const cities = ["all", "Hyderabad", "Vijayawada", "Tirupati", "Guntur", "Kurnool"]
  const dateRanges = [
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" },
    { value: "all", label: "All Upcoming" },
  ]
  
  // Filter events
  const filteredEvents = eventsData.filter(event => {
    const typeMatch = selectedType === "all" || event.type === selectedType
    const cityMatch = selectedCity === "all" || event.city === selectedCity || event.city === "AP & Telangana"
    return typeMatch && cityMatch
  })
  
  // Group events by month
  const groupedEvents = filteredEvents.reduce((acc, event) => {
    const month = event.date.split(" ")[0] + " " + event.date.split(" ")[2]
    if (!acc[month]) acc[month] = []
    acc[month].push(event)
    return acc
  }, {} as Record<string, Event[]>)
  
  // If an event is selected, show detail view
  if (selectedEvent) {
    return (
      <EventDetail 
        event={selectedEvent} 
        onBack={() => setSelectedEvent(null)}
        allEvents={eventsData}
      />
    )
  }
  
  return (
    <div ref={ref} className="pt-28 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-4">
            <Calendar className="w-4 h-4" />
            Events Calendar
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4">
            Events
          </h1>
          <p className="text-lg text-[#6B7280]">
            Discover blood drives, fundraisers, and community events across AP & Telangana.
          </p>
        </motion.div>
        
        {/* View Toggle + Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          {/* View Toggle */}
          <div className="flex justify-center mb-6">
            <div className="bg-gray-100 rounded-full p-1 inline-flex">
              {["list", "calendar"].map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v as "list" | "calendar")}
                  className="relative px-6 py-2 rounded-full text-sm font-medium capitalize transition-colors"
                >
                  {view === v && (
                    <motion.div
                      layoutId="viewToggle"
                      className="absolute inset-0 bg-white rounded-full shadow-sm"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className={`relative z-10 ${view === v ? "text-[#1A1A1A]" : "text-[#6B7280]"}`}>
                    {v === "list" ? "List View" : "Calendar View"}
                  </span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 justify-center">
            {/* Event Type Pills */}
            <div className="flex gap-2 overflow-x-auto pb-2 max-w-full">
              {eventTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setSelectedType(type.value)}
                  className={`
                    px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all
                    ${selectedType === type.value 
                      ? "bg-[#DC2626] text-white" 
                      : "bg-white text-[#6B7280] hover:bg-gray-50 border border-gray-200"
                    }
                  `}
                >
                  {type.label}
                </button>
              ))}
            </div>
            
            {/* City Dropdown */}
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="px-4 py-2 rounded-full border border-gray-200 bg-white text-sm text-[#6B7280] focus:border-[#DC2626] focus:ring-2 focus:ring-red-100 outline-none"
            >
              <option value="all">All Cities</option>
              {cities.slice(1).map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            
            {/* Date Range */}
            <div className="flex gap-2">
              {dateRanges.map((range) => (
                <button
                  key={range.value}
                  onClick={() => setDateRange(range.value)}
                  className={`
                    px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all
                    ${dateRange === range.value 
                      ? "bg-[#1E3A5F] text-white" 
                      : "bg-white text-[#6B7280] hover:bg-gray-50 border border-gray-200"
                    }
                  `}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* List View */}
        <AnimatePresence mode="wait">
          {view === "list" && (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {Object.entries(groupedEvents).map(([month, events]) => (
                <div key={month} className="mb-12">
                  <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-6 flex items-center gap-3">
                    <Calendar className="w-6 h-6 text-[#DC2626]" />
                    {month}
                  </h2>
                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="grid md:grid-cols-2 gap-6"
                  >
                    {events.map((event, index) => (
                      <EventCard
                        key={event.id}
                        event={event}
                        onClick={() => setSelectedEvent(event)}
                        index={index}
                      />
                    ))}
                  </motion.div>
                </div>
              ))}
              
              {filteredEvents.length === 0 && (
                <div className="text-center py-16">
                  <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">No events found</h3>
                  <p className="text-[#6B7280]">Try adjusting your filters to see more events.</p>
                </div>
              )}
            </motion.div>
          )}
          
          {view === "calendar" && (
            <motion.div
              key="calendar"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CalendarView 
                events={filteredEvents}
                onSelectDate={(date, events) => setSelectedDate({ date, events })}
              />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Day Events Panel */}
        <AnimatePresence>
          {selectedDate && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/30 z-40"
                onClick={() => setSelectedDate(null)}
              />
              <DayEventsPanel
                date={selectedDate.date}
                events={selectedDate.events}
                onClose={() => setSelectedDate(null)}
                onSelectEvent={(event) => {
                  setSelectedDate(null)
                  setSelectedEvent(event)
                }}
              />
            </>
          )}
        </AnimatePresence>
        
        {/* Submit Event FAB (Mobile) */}
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring", bounce: 0.5 }}
          className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-[#DC2626] to-[#B91C1C] text-white rounded-full shadow-lg shadow-red-500/30 flex items-center justify-center z-30"
        >
          <Plus className="w-6 h-6" />
        </motion.button>
        
        {/* Submit Event CTA (Desktop) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="hidden lg:block mt-12"
        >
          <div className="bg-gradient-to-r from-[#1E3A5F] to-[#2D4A6F] rounded-2xl p-8 text-center">
            <h3 className="font-serif text-2xl font-bold text-white mb-3">
              Are you a fan club organiser?
            </h3>
            <p className="text-white/80 mb-6 max-w-xl mx-auto">
              Submit your blood donation event to be featured on our platform and reach thousands of potential donors.
            </p>
            <CCTButton variant="ghost" className="bg-white text-[#1E3A5F] hover:bg-white/90">
              <Plus className="w-5 h-5" />
              Submit an Event
            </CCTButton>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
