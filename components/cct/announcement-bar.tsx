"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { X } from "lucide-react"

interface AnnouncementBarProps {
  onDismiss?: () => void
}

export function AnnouncementBar({ onDismiss }: AnnouncementBarProps) {
  const [isVisible, setIsVisible] = useState(true)

  const announcementText = "12,00,000+ units collected • 4,700+ lives saved • 28,000+ active donors • Join the movement"

  if (!isVisible) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-black text-white overflow-hidden relative z-40 mt-16"
        >
          <div className="relative h-10 flex items-center">
            {/* Marquee Container */}
            <div className="flex-1 overflow-hidden">
              <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="flex whitespace-nowrap"
              >
                {/* Duplicate the text for seamless loop */}
                {[...Array(4)].map((_, i) => (
                  <span key={i} className="text-sm font-medium mx-8 flex items-center gap-2">
                    <span className="text-lg">🩸</span>
                    {announcementText}
                    <span className="mx-4 opacity-50">|</span>
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setIsVisible(false)
                onDismiss?.()
              }}
              className="absolute right-2 md:right-4 p-1.5 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Dismiss announcement"
            >
              <X className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
