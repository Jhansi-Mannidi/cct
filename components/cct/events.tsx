"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Calendar, MapPin, Users, Clock, ArrowRight, Droplet, Heart, Megaphone } from "lucide-react"
import { CCTButton } from "./button"

const events = [
  {
    id: 1,
    title: "Mega Blood Donation Drive",
    date: "April 20, 2024",
    time: "9:00 AM - 5:00 PM",
    location: "HITEC City Convention Center, Hyderabad",
    attendees: 450,
    capacity: 500,
    type: "blood-drive",
    description: "Join us for our biggest blood donation drive of the year. Free health checkup for all donors.",
    highlights: ["Free Health Checkup", "Refreshments", "Certificate"]
  },
  {
    id: 2,
    title: "World Blood Donor Day Celebration",
    date: "June 14, 2024",
    time: "10:00 AM - 2:00 PM",
    location: "Ravindra Bharathi, Hyderabad",
    attendees: 280,
    capacity: 400,
    type: "awareness",
    description: "Celebrating our heroes - the voluntary blood donors. Awards ceremony and cultural program.",
    highlights: ["Donor Awards", "Cultural Program", "Guest Speakers"]
  },
  {
    id: 3,
    title: "Charity Gala Dinner",
    date: "May 5, 2024",
    time: "7:00 PM - 10:00 PM",
    location: "Taj Krishna, Banjara Hills",
    attendees: 180,
    capacity: 200,
    type: "fundraiser",
    description: "An evening of elegance and purpose. All proceeds go towards mobile blood collection units.",
    highlights: ["Live Auction", "Gourmet Dinner", "Entertainment"]
  },
  {
    id: 4,
    title: "College Campus Drive - JNTU",
    date: "April 25, 2024",
    time: "10:00 AM - 4:00 PM",
    location: "JNTU Kukatpally Campus",
    attendees: 320,
    capacity: 400,
    type: "blood-drive",
    description: "Partnering with JNTU to conduct a blood donation camp for students and faculty.",
    highlights: ["NSS Points", "Free T-Shirt", "Certificates"]
  },
]

const eventTypeConfig = {
  "blood-drive": { 
    icon: Droplet, 
    bg: "bg-red-50", 
    border: "border-red-100", 
    accent: "text-[#DC2626]",
    badge: "bg-red-100 text-red-700"
  },
  "fundraiser": { 
    icon: Heart, 
    bg: "bg-amber-50", 
    border: "border-amber-100", 
    accent: "text-[#F59E0B]",
    badge: "bg-amber-100 text-amber-700"
  },
  "awareness": { 
    icon: Megaphone, 
    bg: "bg-blue-50", 
    border: "border-blue-100", 
    accent: "text-[#1E3A5F]",
    badge: "bg-blue-100 text-blue-700"
  },
}

export function EventsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="events" className="py-24 bg-[#FFF7ED]">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-[#1E3A5F]/10 text-[#1E3A5F] text-sm font-semibold rounded-full mb-4">
            Events
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-6">
            Upcoming Events
          </h2>
          <p className="text-lg text-[#6B7280]">
            Join us at blood donation drives, awareness campaigns, and fundraising 
            events across Andhra Pradesh and Telangana.
          </p>
        </motion.div>

        {/* Featured Event */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="relative bg-gradient-to-br from-[#DC2626] to-[#B91C1C] rounded-3xl p-8 md:p-12 text-white overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
            </div>
            
            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">
                  Featured Event
                </span>
                <h3 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                  {events[0].title}
                </h3>
                <p className="text-white/80 mb-6">
                  {events[0].description}
                </p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5" />
                    <span>{events[0].date} | {events[0].time}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5" />
                    <span>{events[0].location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5" />
                    <span>{events[0].attendees} / {events[0].capacity} registered</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {events[0].highlights.map((highlight) => (
                    <span key={highlight} className="px-3 py-1 bg-white/20 rounded-full text-sm">
                      {highlight}
                    </span>
                  ))}
                </div>

                <CCTButton 
                  variant="ghost" 
                  size="lg" 
                  className="bg-white text-[#DC2626] hover:bg-white/90"
                >
                  Register Now
                  <ArrowRight className="w-5 h-5" />
                </CCTButton>
              </div>

              <div className="hidden md:block">
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative"
                >
                  <div className="w-full aspect-square max-w-sm mx-auto bg-white/10 rounded-3xl backdrop-blur-sm flex items-center justify-center">
                    <Droplet className="w-32 h-32 text-white/50" />
                  </div>
                  {/* Progress ring */}
                  <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle
                      cx="50%"
                      cy="50%"
                      r="45%"
                      fill="none"
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth="8"
                    />
                    <motion.circle
                      cx="50%"
                      cy="50%"
                      r="45%"
                      fill="none"
                      stroke="white"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${(events[0].attendees / events[0].capacity) * 283} 283`}
                      initial={{ strokeDasharray: "0 283" }}
                      animate={{ strokeDasharray: `${(events[0].attendees / events[0].capacity) * 283} 283` }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-4xl font-bold">{Math.round((events[0].attendees / events[0].capacity) * 100)}%</p>
                      <p className="text-sm text-white/80">Capacity Filled</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.slice(1).map((event, index) => {
            const config = eventTypeConfig[event.type as keyof typeof eventTypeConfig]
            const Icon = config.icon
            
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`
                  rounded-2xl p-6 border-2 transition-all
                  ${config.bg} ${config.border}
                `}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${config.bg} border ${config.border}`}>
                    <Icon className={`w-6 h-6 ${config.accent}`} />
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${config.badge}`}>
                    {event.type.replace("-", " ")}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-[#1A1A1A] mb-2">
                  {event.title}
                </h3>
                <p className="text-sm text-[#6B7280] mb-4 line-clamp-2">
                  {event.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                    <MapPin className="w-4 h-4" />
                    <span className="truncate">{event.location}</span>
                  </div>
                </div>

                {/* Attendance progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-[#6B7280]">{event.attendees} registered</span>
                    <span className="text-[#6B7280]">{event.capacity} spots</span>
                  </div>
                  <div className="h-2 bg-white rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(event.attendees / event.capacity) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className={`h-full rounded-full ${
                        event.type === "blood-drive" ? "bg-[#DC2626]" :
                        event.type === "fundraiser" ? "bg-[#F59E0B]" : "bg-[#1E3A5F]"
                      }`}
                    />
                  </div>
                </div>

                <CCTButton variant="outline" size="sm" className="w-full">
                  Register
                  <ArrowRight className="w-4 h-4" />
                </CCTButton>
              </motion.div>
            )
          })}
        </div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <CCTButton variant="secondary" size="lg">
            View All Events
            <ArrowRight className="w-5 h-5" />
          </CCTButton>
        </motion.div>
      </div>
    </section>
  )
}
