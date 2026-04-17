"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "./language-context"

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

interface DonorWallPreviewProps {
  onNavigate?: (page: string) => void
}

export function DonorWallPreview({ onNavigate }: DonorWallPreviewProps) {
  const { language } = useLanguage()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-16 md:py-20 bg-[#F4EFE9]">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-10 flex flex-col md:flex-row md:items-start md:justify-between gap-6"
        >
          <div>
            <span className="inline-flex items-center gap-2 uppercase tracking-[0.2em] text-[10px] font-semibold text-[#B91C1C]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B91C1C]" />
              {language === "te" ? "ఇటీవలి దానాలు" : "Recent Donations"}
            </span>
            <h2 className="mt-2 font-serif text-4xl md:text-5xl italic text-[#171717]">
              {language === "te" ? "దాతల గోడ" : "The Donor Wall"}
            </h2>
            <p className="mt-2 text-sm text-[#6B7280]">
              {language === "te" ? "ప్రతి దాతకు గౌరవం. ప్రతి చుక్కకు విలువ." : "Every donor recognized. Every drop counted."}
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onNavigate?.("register")}
            className="self-start md:self-center px-6 py-2.5 rounded-full bg-black text-white text-xs font-semibold uppercase tracking-wide inline-flex items-center gap-2"
          >
            {language === "te" ? "రక్తదానం చేయండి" : "Donate Blood"}
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.button>
        </motion.div>

        <div className="overflow-hidden pb-2 mb-8">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="flex items-center gap-3 min-w-max"
          >
            {[...recentDonors, ...recentDonors].map((donor, index) => {
              const initials = donor.name === "Anonymous"
                ? "?"
                : donor.name.split(" ").map((part) => part[0]).join("")

              return (
                <motion.div
                  key={`${donor.name}-${index}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.06 + (index % recentDonors.length) * 0.05 }}
                  whileHover={{ y: -2 }}
                  className="bg-white rounded-full px-3.5 py-2.5 flex items-center gap-2.5 border border-[#EFE9DE] shadow-sm"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#DC2626] to-[#B91C1C] flex items-center justify-center">
                    <span className="text-white font-semibold text-[10px]">{initials}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="font-medium text-sm text-[#1A1A1A]">{donor.name}</span>
                    <span className="text-[#9CA3AF]">•</span>
                    <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold border ${bloodTypeColors[donor.bloodType]}`}>
                      {donor.bloodType}
                    </span>
                    <span className="text-[#9CA3AF]">•</span>
                    <span className="text-[#6B7280] text-xs">{donor.city}</span>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center"
        >
          <motion.a
            href="#"
            whileHover={{ x: 5 }}
            className="inline-flex items-center gap-2 text-[#B91C1C] font-semibold text-sm group"
          >
            {language === "te" ? "దాతల గోడ చూడండి" : "View Donor Wall"}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
