"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowRight, Droplet } from "lucide-react"

const recentDonors = [
  { name: "Ravi K.", bloodType: "A+", city: "Vijayawada", time: "2 hours ago" },
  { name: "Anonymous", bloodType: "O-", city: "Hyderabad", time: "5 hours ago" },
  { name: "Priya S.", bloodType: "B+", city: "Tirupati", time: "8 hours ago" },
  { name: "Kumar V.", bloodType: "AB+", city: "Guntur", time: "12 hours ago" },
  { name: "Lakshmi R.", bloodType: "A-", city: "Vizag", time: "1 day ago" },
]

const bloodTypeColors: Record<string, string> = {
  "A+": "bg-red-100 text-red-700 border-red-200",
  "A-": "bg-red-100 text-red-700 border-red-200",
  "B+": "bg-blue-100 text-blue-700 border-blue-200",
  "B-": "bg-blue-100 text-blue-700 border-blue-200",
  "AB+": "bg-purple-100 text-purple-700 border-purple-200",
  "AB-": "bg-purple-100 text-purple-700 border-purple-200",
  "O+": "bg-green-100 text-green-700 border-green-200",
  "O-": "bg-green-100 text-green-700 border-green-200",
}

export function DonorWallPreview() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-24 bg-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-amber-100 text-[#F59E0B] text-sm font-semibold rounded-full mb-4">
            Our Heroes
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-6">
            Recent Heroes
          </h2>
          <p className="text-lg text-[#6B7280]">
            Celebrating the selfless donors who are saving lives every day.
          </p>
        </motion.div>

        {/* Donor Pills */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {recentDonors.map((donor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -4 }}
              className="bg-[#FFF7ED] rounded-full px-5 py-3 flex items-center gap-3 border border-gray-100 shadow-sm hover:shadow-md transition-all"
            >
              {/* Avatar Placeholder */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#DC2626] to-[#B91C1C] flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {donor.name === "Anonymous" ? "?" : donor.name.split(" ").map(n => n[0]).join("")}
                </span>
              </div>

              {/* Info */}
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#1A1A1A]">{donor.name}</span>
                <span className="text-[#6B7280]">•</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${bloodTypeColors[donor.bloodType]}`}>
                  {donor.bloodType}
                </span>
                <span className="text-[#6B7280]">•</span>
                <span className="text-[#6B7280] text-sm">{donor.city}</span>
                <span className="text-[#6B7280]">•</span>
                <span className="text-[#9CA3AF] text-sm">{donor.time}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <motion.a
            href="#"
            whileHover={{ x: 5 }}
            className="inline-flex items-center gap-2 text-[#DC2626] font-semibold group"
          >
            View Donor Wall
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
