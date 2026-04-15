"use client"

import { motion } from "framer-motion"
import { Droplet, HeartPulse, HandHeart, ShieldCheck } from "lucide-react"

const services = [
  {
    icon: Droplet,
    title: "Blood Bank Network",
    description: "Real-time donor and blood unit coordination across partner hospitals.",
  },
  {
    icon: HeartPulse,
    title: "Emergency Response",
    description: "Rapid matching support for urgent blood requirements and trauma cases.",
  },
  {
    icon: HandHeart,
    title: "Patient Support",
    description: "Fundraising and care support for surgeries and critical treatments.",
  },
  {
    icon: ShieldCheck,
    title: "Donor Safety & Trust",
    description: "Transparent screening, tracking, and verified impact for every donation.",
  },
]

export function ServicesSpotlight() {
  return (
    <section className="min-h-screen bg-gradient-to-r from-[#061326] via-[#102541] to-[#1B3F72]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 min-h-screen flex items-center">
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mx-auto mb-5 w-36 h-36 md:w-44 md:h-44 rounded-full bg-white/95 p-1.5"
            >
              <img
                src="/images/services-drop.png"
                alt="CCT services emblem"
                className="w-full h-full rounded-full object-cover [filter:hue-rotate(155deg)_saturate(0.28)_brightness(1.45)]"
                loading="lazy"
              />
            </motion.div>
            <p className="text-xs tracking-[0.22em] uppercase text-[#F4C75A] mb-3">
              What We Provide
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              Services by CCT
            </h2>
            <p className="mt-4 text-sm md:text-base lg:text-lg text-white/90 font-sans max-w-2xl mx-auto">
              From blood availability to emergency coordination, CCT provides end-to-end support
              for donors, patients, and hospitals.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-sm p-6 md:p-7"
              >
                <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-[#F4C75A]" />
                </div>
                <h3 className="text-white text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-white/80 text-sm md:text-base leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
