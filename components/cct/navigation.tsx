"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { 
  Menu, X, Heart, Droplet, Calendar, Users, ChevronDown, 
  Search, Trophy, Sparkles, Info, UserPlus, Building2, Award,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Home", href: "#home" },
  { 
    label: "Blood Donation", 
    href: "#blood-donation",
    children: [
      { label: "Register as Donor", href: "#register", icon: UserPlus },
      { label: "Find Blood", href: "#find-blood", icon: Search },
      { label: "Blood Inventory", href: "#inventory", icon: Droplet },
      { label: "Donor Wall", href: "#donor-wall", icon: Award },
    ]
  },
  { label: "Campaigns", href: "#campaigns" },
  { label: "Events", href: "#events" },
  { 
    label: "Community", 
    href: "#community",
    children: [
      { label: "Good Works", href: "#good-works", icon: Heart },
      { label: "Leaderboards", href: "#leaderboards", icon: Trophy },
      { label: "Our Impact", href: "#impact", icon: Sparkles },
    ]
  },
  { label: "About", href: "#about" },
]

interface CCTNavigationProps {
  onNavigate?: (page: string) => void
  currentPage?: string
  announcementVisible?: boolean
}

export function CCTNavigation({
  onNavigate,
  currentPage = "home",
  announcementVisible = true,
}: CCTNavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [expandedMobileSection, setExpandedMobileSection] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  const handleNavClick = (href: string) => {
    const page = href.replace("#", "")
    onNavigate?.(page)
    setMobileMenuOpen(false)
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={cn(
        "fixed left-0 right-0 z-50 transition-all duration-500",
        announcementVisible && !isScrolled ? "top-10" : "top-0",
        isScrolled 
          ? "bg-white/95 backdrop-blur-xl shadow-lg shadow-black/5 py-2" 
          : "bg-white/80 backdrop-blur-sm py-4"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn(
          "flex items-center justify-between transition-all duration-300",
          isScrolled ? "h-14" : "h-16"
        )}>
          {/* Logo */}
          <motion.a
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick("#home")
            }}
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3"
          >
            <div className="relative">
              <motion.div 
                className={cn(
                  "bg-gradient-to-br from-[#DC2626] to-[#B91C1C] rounded-xl flex items-center justify-center shadow-lg shadow-red-500/30 transition-all duration-300",
                  isScrolled ? "w-10 h-10" : "w-12 h-12"
                )}
              >
                <Droplet className={cn(
                  "text-white transition-all duration-300",
                  isScrolled ? "w-5 h-5" : "w-6 h-6"
                )} />
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-1 -right-1 w-3 h-3 bg-[#F59E0B] rounded-full"
              />
            </div>
            <div className="hidden sm:block">
              <span className="font-serif text-xl font-bold text-[#1A1A1A] tracking-tight">CCT</span>
              <p className={cn(
                "text-[#6B7280] transition-all duration-300",
                isScrolled ? "text-[10px] -mt-1" : "text-xs -mt-0.5"
              )}>Chiranjeevi Charitable Trust</p>
            </div>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <motion.a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    if (!link.children) {
                      handleNavClick(link.href)
                    }
                  }}
                  whileHover={{ scale: 1.02 }}
                  className={cn(
                    "flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                    currentPage === link.href.replace("#", "")
                      ? "text-[#DC2626] bg-red-50"
                      : "text-[#374151] hover:text-[#1A1A1A] hover:bg-gray-100/80"
                  )}
                >
                  {link.label}
                  {link.children && (
                    <motion.div
                      animate={{ rotate: activeDropdown === link.label ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  )}
                </motion.a>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {link.children && activeDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute top-full left-0 pt-2"
                    >
                      <div className="bg-white rounded-2xl shadow-2xl shadow-black/10 border border-gray-100 py-2 min-w-[220px] overflow-hidden">
                        {link.children.map((child, index) => (
                          <motion.a
                            key={child.label}
                            href={child.href}
                            onClick={(e) => {
                              e.preventDefault()
                              handleNavClick(child.href)
                            }}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ x: 4, backgroundColor: "#FEF2F2" }}
                            className="flex items-center gap-3 px-4 py-3 text-sm text-[#374151] hover:text-[#DC2626] transition-colors"
                          >
                            {child.icon && (
                              <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center">
                                <child.icon className="w-4 h-4 text-[#DC2626]" />
                              </div>
                            )}
                            <span className="font-medium">{child.label}</span>
                          </motion.a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Right Side - CTA & User */}
          <div className="hidden lg:flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="relative px-6 py-2.5 bg-gradient-to-r from-[#DC2626] to-[#B91C1C] text-white font-semibold rounded-xl shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 transition-all duration-300"
            >
              {/* Pulsing glow effect */}
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.2, 0.5]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-[#DC2626] rounded-xl blur-lg -z-10"
              />
              <span className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                Donate Now
              </span>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu - Full Screen Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm lg:hidden z-40"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-2xl lg:hidden z-50 overflow-y-auto"
            >
              {/* Close Button */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#DC2626] to-[#B91C1C] rounded-xl flex items-center justify-center">
                    <Droplet className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-serif text-lg font-bold text-[#1A1A1A]">CCT</span>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <motion.div
                    initial={{ rotate: 0 }}
                    whileHover={{ rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                </motion.button>
              </div>

              {/* Navigation Links */}
              <div className="p-6">
                <div className="space-y-1">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 + 0.1 }}
                    >
                      {link.children ? (
                        <div>
                          <button
                            onClick={() => setExpandedMobileSection(
                              expandedMobileSection === link.label ? null : link.label
                            )}
                            className="flex items-center justify-between w-full px-4 py-4 text-lg font-medium text-[#1A1A1A] hover:bg-gray-50 rounded-xl transition-colors"
                          >
                            {link.label}
                            <motion.div
                              animate={{ rotate: expandedMobileSection === link.label ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronDown className="w-5 h-5 text-[#6B7280]" />
                            </motion.div>
                          </button>
                          <AnimatePresence>
                            {expandedMobileSection === link.label && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="pl-4 py-2 space-y-1">
                                  {link.children.map((child, childIndex) => (
                                    <motion.a
                                      key={child.label}
                                      href={child.href}
                                      onClick={(e) => {
                                        e.preventDefault()
                                        handleNavClick(child.href)
                                      }}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: childIndex * 0.05 }}
                                      className="flex items-center gap-3 px-4 py-3 text-[#374151] hover:text-[#DC2626] hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                      {child.icon && (
                                        <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center">
                                          <child.icon className="w-4 h-4 text-[#DC2626]" />
                                        </div>
                                      )}
                                      <span className="font-medium">{child.label}</span>
                                    </motion.a>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <a
                          href={link.href}
                          onClick={(e) => {
                            e.preventDefault()
                            handleNavClick(link.href)
                          }}
                          className={cn(
                            "flex items-center px-4 py-4 text-lg font-medium rounded-xl transition-colors",
                            currentPage === link.href.replace("#", "")
                              ? "text-[#DC2626] bg-red-50"
                              : "text-[#1A1A1A] hover:bg-gray-50"
                          )}
                        >
                          {link.label}
                        </a>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-8 pt-8 border-t border-gray-100"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-6 py-4 bg-gradient-to-r from-[#DC2626] to-[#B91C1C] text-white font-semibold text-lg rounded-xl shadow-lg shadow-red-500/30 flex items-center justify-center gap-2"
                  >
                    <Heart className="w-5 h-5" />
                    Donate Now
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
