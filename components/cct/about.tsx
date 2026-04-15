"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Heart, Target, Eye, Users, Award, Building2 } from "lucide-react"
import { CCTCard } from "./card"

const values = [
  {
    icon: Heart,
    title: "Compassion",
    description: "We believe in serving humanity with love and empathy, treating every life as precious."
  },
  {
    icon: Target,
    title: "Transparency",
    description: "Every rupee donated is tracked and reported. We maintain complete accountability."
  },
  {
    icon: Users,
    title: "Community",
    description: "Building a network of donors, volunteers, and partners across Andhra Pradesh & Telangana."
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for the highest standards in blood banking and healthcare support."
  }
]

const milestones = [
  { year: "2009", title: "Foundation", description: "CCT established in Vijayawada" },
  { year: "2012", title: "First Blood Bank", description: "Opened our first blood bank facility" },
  { year: "2016", title: "50,000 Donors", description: "Reached 50,000 registered donors" },
  { year: "2020", title: "COVID Response", description: "Plasma donation drives across states" },
  { year: "2024", title: "Digital Platform", description: "Launched app for instant blood requests" },
]

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-red-50 to-transparent" />
      
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-red-50 text-[#DC2626] text-sm font-semibold rounded-full mb-4">
            Our Story
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-6">
            About Chiranjeevi Charitable Trust
          </h2>
          <p className="text-lg text-[#6B7280] leading-relaxed">
            For over 15 years, we have been at the forefront of blood donation and community 
            healthcare in Andhra Pradesh and Telangana, driven by a simple belief: 
            no one should die due to lack of blood.
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-[#DC2626] to-[#B91C1C] rounded-3xl p-8 text-white relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-white/90 leading-relaxed">
                To create a robust, volunteer-driven blood donation ecosystem that ensures 
                timely access to safe blood for every patient in need, while promoting 
                a culture of regular voluntary blood donation.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gradient-to-br from-[#1E3A5F] to-[#0F2942] rounded-3xl p-8 text-white relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <Eye className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-white/90 leading-relaxed">
                A future where every hospital in Andhra Pradesh and Telangana has adequate 
                blood supply, every citizen understands the importance of blood donation, 
                and every emergency is met with immediate response.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <h3 className="font-serif text-2xl font-bold text-[#1A1A1A] text-center mb-10">
            Our Core Values
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <CCTCard key={value.title} delay={0.1 * index} className="text-center">
                <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-[#DC2626]" />
                </div>
                <h4 className="font-semibold text-[#1A1A1A] mb-2">{value.title}</h4>
                <p className="text-sm text-[#6B7280]">{value.description}</p>
              </CCTCard>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="font-serif text-2xl font-bold text-[#1A1A1A] text-center mb-10">
            Our Journey
          </h3>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 hidden md:block" />
            
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`flex items-center gap-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <div className="bg-white rounded-2xl p-6 shadow-lg shadow-black/5 border border-gray-100 inline-block">
                      <span className="text-[#DC2626] font-bold text-lg">{milestone.year}</span>
                      <h4 className="font-semibold text-[#1A1A1A] mt-1">{milestone.title}</h4>
                      <p className="text-sm text-[#6B7280] mt-1">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex w-4 h-4 bg-[#DC2626] rounded-full border-4 border-white shadow-lg z-10" />
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
