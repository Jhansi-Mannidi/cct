"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Droplet, Heart, MapPin, Users } from "lucide-react"

const impactUpdates = [
  { icon: Droplet, text: "Ravi from Vijayawada donated blood", color: "text-[#DC2626]" },
  { icon: Heart, text: "Priya from Dallas contributed \u20B95,000 to thalassemia fund", color: "text-[#F59E0B]" },
  { icon: Users, text: "Mega Drive: 352 units collected in Tirupati", color: "text-[#1E3A5F]" },
  { icon: MapPin, text: "Sunita received A+ blood in Hyderabad", color: "text-[#22C55E]" },
  { icon: Droplet, text: "Venkat from Guntur donated O- blood", color: "text-[#DC2626]" },
  { icon: Heart, text: "Anonymous donor contributed \u20B910,000", color: "text-[#F59E0B]" },
  { icon: Users, text: "College drive: 180 units at JNTU Kakinada", color: "text-[#1E3A5F]" },
  { icon: MapPin, text: "Kumar received B+ blood in Vizag", color: "text-[#22C55E]" },
]

export function ImpactTicker() {
  const [isPaused, setIsPaused] = useState(false)

  // Double the items for seamless loop
  const allItems = [...impactUpdates, ...impactUpdates]

  return (
    <section className="relative bg-[#1E3A5F] py-4 overflow-hidden">
      <div
        className="flex"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div
          animate={{
            x: isPaused ? 0 : "-50%",
          }}
          transition={{
            x: {
              duration: 30,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            },
          }}
          className="flex gap-8 whitespace-nowrap"
        >
          {allItems.map((item, index) => {
            const Icon = item.icon
            return (
              <div
                key={index}
                className="flex items-center gap-3 px-4 py-1"
              >
                <span className={`p-1.5 rounded-full bg-white/10 ${item.color}`}>
                  <Icon className="w-4 h-4" />
                </span>
                <span className="text-white/90 text-sm font-medium">
                  {item.text}
                </span>
                <span className="text-white/30">•</span>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
