"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { MapPin, Users, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"

const events = [
  {
    id: 1,
    title: "Mega Blood Drive",
    date: "May 15, 2026",
    city: "Hyderabad",
    slotsRegistered: 142,
    totalSlots: 500,
    gradient: "from-[#CC0033] to-[#A6002A]",
    button: "bg-[#CC0033] hover:bg-[#a6002a]",
  },
  {
    id: 2,
    title: "Campus Drive - JNTU",
    date: "May 22, 2026",
    city: "Vijayawada",
    slotsRegistered: 89,
    totalSlots: 300,
    gradient: "from-[#1B3F72] to-[#132E52]",
    button: "bg-[#1B3F72] hover:bg-[#132E52]",
  },
  {
    id: 3,
    title: "Birthday Blood Donation Camp",
    date: "June 2, 2026",
    city: "Tirupati",
    slotsRegistered: 45,
    totalSlots: 150,
    gradient: "from-[#E89F1D] to-[#D28600]",
    button: "bg-[#E89F1D] hover:bg-[#D28600]",
  },
]

export function UpcomingEventsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const containerRef = useRef<HTMLDivElement>(null)

  const scrollTo = (direction: "left" | "right") => {
    if (!containerRef.current) return
    const scrollAmount = 320
    containerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    })
  }

  return (
    <section className="py-24 bg-background">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
        >
          <div>
            <span className="inline-block px-4 py-1.5 bg-[#1E3A5F]/10 text-[#1E3A5F] text-sm font-semibold rounded-full mb-4">
              Join Us
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Upcoming Events
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl">
              Register for blood donation camps and events near you.
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scrollTo("left")}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-white hover:shadow-md transition-all"
            >
              <ChevronLeft className="w-5 h-5 text-[#6B7280]" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scrollTo("right")}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-white hover:shadow-md transition-all"
            >
              <ChevronRight className="w-5 h-5 text-[#6B7280]" />
            </motion.button>
          </div>
        </motion.div>

        {/* Events Carousel */}
        <div
          ref={containerRef}
          className="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {events.map((event, index) => (
            <motion.article
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.15 }}
              whileHover={{ y: -8 }}
              className="min-w-[300px] md:min-w-[380px] snap-center"
            >
              <div className="bg-card rounded-3xl overflow-hidden shadow-xl shadow-black/5 border border-border">
                <div className={`relative h-28 bg-gradient-to-r ${event.gradient}`}>
                  {/* Date Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="bg-white rounded-xl px-3 py-2 shadow-lg border border-black/5">
                      <div className="text-center">
                        <div className="text-2xl leading-none font-bold text-foreground">
                          {event.date.split(" ")[1].replace(",", "")}
                        </div>
                        <div className="text-[10px] font-semibold tracking-wide text-muted-foreground uppercase mt-1">
                          {event.date.split(" ")[0]}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-serif text-2xl font-bold text-foreground mb-3">
                    {event.title}
                  </h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>{event.city}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Users className="w-4 h-4" />
                      <span>{event.slotsRegistered} of {event.totalSlots} slots filled</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-5">
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(event.slotsRegistered / event.totalSlots) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className={`h-full rounded-full bg-gradient-to-r ${event.gradient}`}
                      />
                    </div>
                  </div>

                  {/* CTA */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-3 text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-md transition-colors ${event.button}`}
                  >
                    Register Now
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
