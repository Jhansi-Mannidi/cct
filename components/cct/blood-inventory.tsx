"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Droplet, AlertTriangle, MapPin, Phone, Clock } from "lucide-react"
import { BloodTypeBadge, StatusBadge } from "./badge"
import { CCTButton } from "./button"

const bloodInventory = [
  { type: "A+", units: 45, status: "sufficient" as const },
  { type: "A-", units: 12, status: "low" as const },
  { type: "B+", units: 38, status: "sufficient" as const },
  { type: "B-", units: 5, status: "critical" as const },
  { type: "AB+", units: 22, status: "sufficient" as const },
  { type: "AB-", units: 8, status: "low" as const },
  { type: "O+", units: 52, status: "sufficient" as const },
  { type: "O-", units: 3, status: "critical" as const },
]

const urgentRequests = [
  {
    bloodType: "B-",
    hospital: "KIMS Hospital",
    location: "Secunderabad",
    units: 3,
    urgency: "critical",
    postedTime: "15 mins ago",
    contact: "+91 98765 43210"
  },
  {
    bloodType: "O-",
    hospital: "Apollo Hospitals",
    location: "Jubilee Hills, Hyderabad",
    units: 2,
    urgency: "critical",
    postedTime: "32 mins ago",
    contact: "+91 98765 43211"
  },
  {
    bloodType: "A-",
    hospital: "Care Hospital",
    location: "Banjara Hills, Hyderabad",
    units: 4,
    urgency: "low",
    postedTime: "1 hour ago",
    contact: "+91 98765 43212"
  },
]

export function BloodInventorySection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="donate-blood" className="py-24 bg-[#FFF7ED]">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-red-100 text-[#DC2626] text-sm font-semibold rounded-full mb-4">
            Blood Bank
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-6">
            Current Blood Inventory
          </h2>
          <p className="text-lg text-[#6B7280]">
            Real-time blood availability across our network of blood banks in 
            Andhra Pradesh and Telangana.
          </p>
        </motion.div>

        {/* Blood Type Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {bloodInventory.map((blood, index) => (
            <motion.div
              key={blood.type}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`
                relative bg-white rounded-2xl p-6 shadow-lg shadow-black/5 border-2 transition-colors
                ${blood.status === "critical" ? "border-red-300 bg-red-50" : 
                  blood.status === "low" ? "border-amber-200" : "border-gray-100"}
              `}
            >
              {blood.status === "critical" && (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="absolute top-3 right-3"
                >
                  <AlertTriangle className="w-5 h-5 text-[#DC2626]" />
                </motion.div>
              )}
              
              <div className="flex items-center justify-between mb-4">
                <BloodTypeBadge type={blood.type} size="lg" showPulse={blood.status === "critical"} />
              </div>
              
              <div className="mb-3">
                <p className="text-3xl font-bold text-[#1A1A1A]">{blood.units}</p>
                <p className="text-sm text-[#6B7280]">units available</p>
              </div>
              
              <StatusBadge status={blood.status} size="sm" />
            </motion.div>
          ))}
        </motion.div>

        {/* Urgent Requests */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#1A1A1A]">
                Urgent Blood Requests
              </h3>
              <p className="text-[#6B7280] mt-1">
                Help save lives by responding to these urgent requests
              </p>
            </div>
            <CCTButton variant="outline" size="sm">
              View All Requests
            </CCTButton>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {urgentRequests.map((request, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`
                  bg-white rounded-2xl p-6 shadow-lg shadow-black/5 border-2
                  ${request.urgency === "critical" ? "border-red-200" : "border-gray-100"}
                `}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <BloodTypeBadge 
                      type={request.bloodType} 
                      size="lg" 
                      showPulse={request.urgency === "critical"} 
                    />
                    <div>
                      <p className="font-semibold text-[#1A1A1A]">{request.units} units needed</p>
                      <p className="text-sm text-[#6B7280]">{request.bloodType} Blood Type</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                    <MapPin className="w-4 h-4" />
                    <span>{request.hospital}, {request.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                    <Clock className="w-4 h-4" />
                    <span>Posted {request.postedTime}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <CCTButton 
                    variant={request.urgency === "critical" ? "primary" : "secondary"} 
                    size="sm" 
                    className="flex-1"
                  >
                    <Droplet className="w-4 h-4" />
                    Donate Now
                  </CCTButton>
                  <motion.a
                    href={`tel:${request.contact}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2.5 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    <Phone className="w-5 h-5 text-[#1A1A1A]" />
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
