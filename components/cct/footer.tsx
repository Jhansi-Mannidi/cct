"use client"

import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion"
import { useState } from "react"
import { 
  Droplet, Heart, MapPin, Phone, Mail, ArrowUp,
  Facebook, Twitter, Instagram, Youtube, Linkedin
} from "lucide-react"

const footerLinks = {
  aboutCCT: [
    { label: "Our Story", href: "#story" },
    { label: "Mission & Vision", href: "#mission" },
    { label: "Leadership Team", href: "#team" },
    { label: "Annual Reports", href: "#reports" },
    { label: "Media Coverage", href: "#media" },
    { label: "Careers", href: "#careers" },
  ],
  quickLinks: [
    { label: "Register as Donor", href: "#register" },
    { label: "Find Blood", href: "#find-blood" },
    { label: "Blood Inventory", href: "#inventory" },
    { label: "Upcoming Events", href: "#events" },
    { label: "Active Campaigns", href: "#campaigns" },
    { label: "Success Stories", href: "#stories" },
  ],
  getInvolved: [
    { label: "Volunteer", href: "#volunteer" },
    { label: "Partner With Us", href: "#partner" },
    { label: "Corporate CSR", href: "#csr" },
    { label: "Organize a Camp", href: "#camp" },
    { label: "Spread Awareness", href: "#awareness" },
    { label: "Donate", href: "#donate" },
  ],
  contact: [
    { label: "Contact Form", href: "#contact-form" },
    { label: "FAQs", href: "#faqs" },
    { label: "Helpline", href: "#helpline" },
    { label: "Emergency Blood", href: "#emergency" },
    { label: "Feedback", href: "#feedback" },
    { label: "Report an Issue", href: "#report" },
  ],
}

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
]

export function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setShowBackToTop(latest > 400)
  })

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-[#1E3A5F] text-white relative">
      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-[#DC2626] via-[#B91C1C] to-[#DC2626] py-12 relative overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px),
                             radial-gradient(circle at 80% 50%, white 1px, transparent 1px)`,
            backgroundSize: "60px 60px"
          }} />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="font-serif text-2xl md:text-3xl font-bold mb-2 text-balance">
                Ready to Save a Life?
              </h3>
              <p className="text-white/80">
                Your donation can give someone another chance at life.
              </p>
            </motion.div>
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-white text-[#DC2626] font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center gap-2"
            >
              <Heart className="w-5 h-5" />
              Become a Donor Today
            </motion.button>
          </div>
        </div>
      </div>

      {/* Main Footer - 4 Column Grid */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
            {/* Brand Column */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <Droplet className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="font-serif text-xl font-bold">CCT</span>
                  <p className="text-xs text-white/60">Chiranjeevi Charitable Trust</p>
                </div>
              </div>
              <p className="text-white/70 mb-6 max-w-sm leading-relaxed text-sm">
                Dedicated to ensuring no one in Andhra Pradesh or Telangana ever has 
                to struggle to find blood during emergencies. Every drop counts.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-white/70">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span className="text-sm">Jubilee Hills, Hyderabad - 500033</span>
                </div>
                <div className="flex items-center gap-3 text-white/70">
                  <Phone className="w-4 h-4 shrink-0" />
                  <span className="text-sm">+91 1800 123 4567 (Toll Free)</span>
                </div>
                <div className="flex items-center gap-3 text-white/70">
                  <Mail className="w-4 h-4 shrink-0" />
                  <span className="text-sm">help@cctrust.org</span>
                </div>
              </div>
            </div>

            {/* About CCT */}
            <div>
              <h4 className="font-semibold text-lg mb-5">About CCT</h4>
              <ul className="space-y-3">
                {footerLinks.aboutCCT.map((link) => (
                  <li key={link.label}>
                    <motion.a
                      href={link.href}
                      whileHover={{ x: 4, color: "#F59E0B" }}
                      className="text-white/70 hover:text-white transition-colors text-sm inline-block"
                    >
                      {link.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-lg mb-5">Quick Links</h4>
              <ul className="space-y-3">
                {footerLinks.quickLinks.map((link) => (
                  <li key={link.label}>
                    <motion.a
                      href={link.href}
                      whileHover={{ x: 4, color: "#F59E0B" }}
                      className="text-white/70 hover:text-white transition-colors text-sm inline-block"
                    >
                      {link.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Get Involved */}
            <div>
              <h4 className="font-semibold text-lg mb-5">Get Involved</h4>
              <ul className="space-y-3">
                {footerLinks.getInvolved.map((link) => (
                  <li key={link.label}>
                    <motion.a
                      href={link.href}
                      whileHover={{ x: 4, color: "#F59E0B" }}
                      className="text-white/70 hover:text-white transition-colors text-sm inline-block"
                    >
                      {link.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-lg mb-5">Contact</h4>
              <ul className="space-y-3">
                {footerLinks.contact.map((link) => (
                  <li key={link.label}>
                    <motion.a
                      href={link.href}
                      whileHover={{ x: 4, color: "#F59E0B" }}
                      className="text-white/70 hover:text-white transition-colors text-sm inline-block"
                    >
                      {link.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-white/60 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} Chiranjeevi Charitable Trust. All rights reserved.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#DC2626] transition-colors duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>

            <div className="flex items-center gap-6">
              <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button - Fixed */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 w-12 h-12 bg-[#DC2626] text-white rounded-full flex items-center justify-center shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 transition-shadow z-50"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  )
}
