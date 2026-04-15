"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { UserPlus, Droplet, Heart, ArrowRight } from "lucide-react"

const steps = [
  {
    icon: UserPlus,
    title: "Register",
    description: "Sign up as a donor with your basic details and blood type.",
    color: "from-[#DC2626] to-[#B91C1C]",
  },
  {
    icon: Droplet,
    title: "Donate",
    description: "Visit a nearby blood bank or join a donation camp event.",
    color: "from-[#F59E0B] to-[#D97706]",
  },
  {
    icon: Heart,
    title: "Save Lives",
    description: "Your donation can save up to 3 lives. Track your impact.",
    color: "from-[#1E3A5F] to-[#0F2942]",
  },
]

export function HowItWorksSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [lineProgress, setLineProgress] = useState(0)

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setLineProgress(100)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isInView])

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-red-100 text-[#DC2626] text-sm font-semibold rounded-full mb-4">
            How It Works
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-6">
            Three Simple Steps to Save Lives
          </h2>
          <p className="text-lg text-[#6B7280]">
            Becoming a blood donor is easy. Follow these simple steps and join our 
            community of life-savers.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-1/2 left-[16.67%] right-[16.67%] h-1 -translate-y-1/2">
            <div className="relative h-full">
              {/* Background line */}
              <div className="absolute inset-0 bg-gray-200 rounded-full" />
              {/* Animated progress line */}
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: isInView ? "100%" : "0%" }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                className="absolute h-full bg-gradient-to-r from-[#DC2626] via-[#F59E0B] to-[#1E3A5F] rounded-full"
              />
              {/* Animated dots */}
              <svg
                className="absolute inset-0 w-full h-full overflow-visible"
                style={{ strokeDasharray: "8 8" }}
              >
                <motion.line
                  x1="0%"
                  y1="50%"
                  x2="100%"
                  y2="50%"
                  stroke="#DC2626"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray="0 12"
                  initial={{ strokeDashoffset: 0 }}
                  animate={isInView ? { strokeDashoffset: -100 } : {}}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="opacity-30"
                />
              </svg>
            </div>
          </div>

          {/* Step Cards */}
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
                  className="relative"
                >
                  <div className="bg-[#FFF7ED] rounded-3xl p-8 text-center relative z-10 border border-gray-100 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-all duration-300 group">
                    {/* Step Number */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center text-sm font-bold text-[#6B7280]">
                      {index + 1}
                    </div>

                    {/* Icon */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 shadow-lg`}
                    >
                      <Icon className="w-10 h-10 text-white" />
                    </motion.div>

                    {/* Content */}
                    <h3 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-3">
                      {step.title}
                    </h3>
                    <p className="text-[#6B7280] leading-relaxed">
                      {step.description}
                    </p>

                    {/* Arrow (Mobile) */}
                    {index < steps.length - 1 && (
                      <div className="md:hidden absolute -bottom-6 left-1/2 -translate-x-1/2 z-20">
                        <div className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center">
                          <ArrowRight className="w-4 h-4 text-[#DC2626] rotate-90" />
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
