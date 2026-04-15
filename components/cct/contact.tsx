"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { MapPin, Phone, Mail, Clock, Send, Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import { CCTButton } from "./button"
import { CCTInput, CCTTextarea } from "./input"

const contactInfo = [
  {
    icon: MapPin,
    title: "Head Office",
    content: "Plot No. 123, Road No. 10, Jubilee Hills, Hyderabad, Telangana 500033"
  },
  {
    icon: Phone,
    title: "Emergency Helpline",
    content: "+91 1800 123 4567 (24/7 Toll Free)"
  },
  {
    icon: Mail,
    title: "Email Us",
    content: "help@cctrust.org"
  },
  {
    icon: Clock,
    title: "Office Hours",
    content: "Mon - Sat: 9:00 AM - 6:00 PM"
  },
]

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
]

export function ContactSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    setTimeout(() => setIsSubmitting(false), 2000)
  }

  return (
    <section id="contact" className="py-24 bg-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-[#1E3A5F]/10 text-[#1E3A5F] text-sm font-semibold rounded-full mb-4">
            Get in Touch
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-6">
            Contact Us
          </h2>
          <p className="text-lg text-[#6B7280]">
            Have questions or want to get involved? We would love to hear from you. 
            Reach out to us through any of the channels below.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-[#FFF7ED] rounded-3xl p-8">
              <h3 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-6">
                Send us a Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <CCTInput 
                    label="Full Name" 
                    name="name"
                    required
                  />
                  <CCTInput 
                    label="Phone Number" 
                    name="phone"
                    type="tel"
                    required
                  />
                </div>
                
                <CCTInput 
                  label="Email Address" 
                  name="email"
                  type="email"
                  required
                />
                
                <CCTInput 
                  label="Subject" 
                  name="subject"
                  required
                />
                
                <CCTTextarea 
                  label="Your Message" 
                  name="message"
                  required
                />
                
                <CCTButton 
                  type="submit" 
                  variant="primary" 
                  size="lg" 
                  className="w-full"
                  isLoading={isSubmitting}
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </CCTButton>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                whileHover={{ x: 4, transition: { duration: 0.2 } }}
                className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors"
              >
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <info.icon className="w-6 h-6 text-[#DC2626]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#1A1A1A] mb-1">{info.title}</h4>
                  <p className="text-[#6B7280]">{info.content}</p>
                </div>
              </motion.div>
            ))}

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.8 }}
              className="pt-6 border-t border-gray-100"
            >
              <h4 className="font-semibold text-[#1A1A1A] mb-4">Follow Us</h4>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-[#6B7280] hover:bg-[#DC2626] hover:text-white transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Map placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.9 }}
              className="mt-8 h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden relative"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-[#DC2626] mx-auto mb-2" />
                  <p className="text-[#6B7280] font-medium">Hyderabad, Telangana</p>
                  <p className="text-sm text-[#6B7280]">View on Google Maps</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
