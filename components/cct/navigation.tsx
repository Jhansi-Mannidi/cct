"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import Image from "next/image"
import { 
  Menu, X, Heart, Droplet, ChevronDown,
  Search, Trophy, Sparkles, UserPlus, Award, ShieldCheck, AlertTriangle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "./language-context"

const navLinks = [
  { label: "Home", teluguLabel: "హోమ్", href: "#home" },
  { label: "Impact Ledger", teluguLabel: "ఇంపాక్ట్ లెడ్జర్", href: "#impact" },
  { 
    label: "Community",
    teluguLabel: "కమ్యూనిటీ",
    href: "#community",
    children: [
      { label: "Good Works", teluguLabel: "మంచి కార్యక్రమాలు", href: "#good-works", icon: Heart },
      { label: "Leaderboards", teluguLabel: "లీడర్‌బోర్డులు", href: "#leaderboards", icon: Trophy },
      { label: "Donor Wall", teluguLabel: "దాతల గోడ", href: "#donor-wall", icon: Award },
    ]
  },
  { label: "Contact Us", teluguLabel: "సంప్రదించండి", href: "#trust", icon: ShieldCheck },
  { label: "Emergency", teluguLabel: "అత్యవసరం", href: "#emergency", icon: AlertTriangle },
]

interface CCTNavigationProps {
  onNavigate?: (page: string) => void
  currentPage?: string
}

export function CCTNavigation({
  onNavigate,
  currentPage = "home",
}: CCTNavigationProps) {
  const { language, setLanguage } = useLanguage()
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
    const aliasMap: Record<string, string> = {
      community: "good-works",
      emergency: "find-blood",
      trust: "contact",
    }
    const mappedPage = aliasMap[page] ?? page
    onNavigate?.(mappedPage)
    setMobileMenuOpen(false)
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={cn(
        "fixed left-0 right-0 z-50 transition-all duration-500",
        "top-0",
        isScrolled 
          ? "bg-[#F4EFE9] backdrop-blur-xl shadow-lg shadow-black/5 py-1.5" 
          : "bg-[#F4EFE9] backdrop-blur-sm py-2"
      )}
    >
      <nav className="w-full px-2 sm:px-3 lg:px-4">
        <div className={cn(
          "flex items-center justify-between transition-all duration-300",
          isScrolled ? "h-12" : "h-14"
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
                  "rounded-xl flex items-center justify-center shadow-lg shadow-red-500/20 transition-all duration-300 overflow-hidden bg-white",
                  isScrolled ? "w-10 h-10" : "w-12 h-12"
                )}
              >
                <Image
                  src="/images/cct-logo.png"
                  alt="CCT logo"
                  width={56}
                  height={56}
                  className="w-full h-full object-contain"
                />
              </motion.div>
            </div>
            <div className="hidden sm:block">
              <span className="font-serif text-xl font-bold text-[#1A1A1A] tracking-tight">CCT</span>
              <p className={cn(
                "text-[#6B7280] font-semibold transition-all duration-300",
                isScrolled ? "text-[10px] -mt-1" : "text-xs -mt-0.5"
                )}>{language === "te" ? "చిరంజీవి చారిటబుల్ ట్రస్ట్" : "Chiranjeevi Charitable Trust"}</p>
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
                    "group relative flex items-center gap-1 px-4 py-2 text-[11px] uppercase tracking-[0.14em] font-semibold rounded-full transition-all duration-200 border",
                    currentPage === link.href.replace("#", "")
                      ? "text-[#1A1A1A] bg-[#FBF9F5] border-[#DDD4C7] shadow-[0_1px_0_rgba(0,0,0,0.05)]"
                      : "text-[#5B5449] border-transparent hover:text-[#1A1A1A] hover:bg-[#FBF9F5] hover:border-[#DDD4C7] hover:shadow-[0_1px_0_rgba(0,0,0,0.05)]"
                  )}
                >
                  {language === "te" ? link.teluguLabel : link.label}
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
                            <span className="font-medium">{language === "te" ? child.teluguLabel : child.label}</span>
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
            <div className="flex items-center border border-[#D8CCBE]">
              <button
                onClick={() => setLanguage("en")}
                className={cn(
                  "px-2.5 py-1.5 text-[11px] uppercase tracking-[0.12em] font-semibold transition-colors",
                  language === "en" ? "bg-[#0A0A0A] text-white" : "bg-transparent text-[#1A1A1A]"
                )}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("te")}
                className={cn(
                  "px-2.5 py-1.5 text-[11px] tracking-[0.08em] font-semibold transition-colors border-l border-[#D8CCBE]",
                  language === "te" ? "bg-[#0A0A0A] text-white" : "bg-transparent text-[#1A1A1A]"
                )}
              >
                తెలు
              </button>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleNavClick("#register")}
                className="px-5 py-2.5 text-[11px] uppercase tracking-[0.12em] bg-[#F8F5F0] text-[#1A1A1A] font-semibold border border-[#D8CCBE] rounded-full transition-all duration-300 hover:bg-white"
              >
                <span className="flex items-center gap-2">
                  <Droplet className="w-4 h-4 text-[#DC2626]" />
                  {language === "te" ? "రక్తదానం" : "Donate Blood"}
                </span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleNavClick("#donate")}
                className="px-5 py-2.5 text-[11px] uppercase tracking-[0.12em] bg-black text-white font-semibold border border-black rounded-full transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  {language === "te" ? "సహకరించండి" : "Contribute"}
                </span>
              </motion.button>
            </div>
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
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-white shadow-md shadow-red-500/20 flex items-center justify-center">
                    <Image
                      src="/images/cct-logo.png"
                      alt="CCT logo"
                      width={40}
                      height={40}
                      className="w-full h-full object-contain"
                    />
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
                            {language === "te" ? link.teluguLabel : link.label}
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
                                      <span className="font-medium">{language === "te" ? child.teluguLabel : child.label}</span>
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
                          {language === "te" ? link.teluguLabel : link.label}
                        </a>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-8 pt-8 border-t border-gray-100 space-y-3"
                >
                  <div className="flex items-center border border-[#D8CCBE] w-fit">
                    <button
                      onClick={() => setLanguage("en")}
                      className={cn(
                        "px-2.5 py-1.5 text-[11px] uppercase tracking-[0.12em] font-semibold transition-colors",
                        language === "en" ? "bg-[#0A0A0A] text-white" : "bg-transparent text-[#1A1A1A]"
                      )}
                    >
                      EN
                    </button>
                    <button
                      onClick={() => setLanguage("te")}
                      className={cn(
                        "px-2.5 py-1.5 text-[11px] tracking-[0.08em] font-semibold transition-colors border-l border-[#D8CCBE]",
                        language === "te" ? "bg-[#0A0A0A] text-white" : "bg-transparent text-[#1A1A1A]"
                      )}
                    >
                      తెలు
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleNavClick("#register")}
                      className="w-full px-4 py-3 bg-[#F8F5F0] text-[#1A1A1A] font-semibold uppercase tracking-[0.1em] border border-[#D8CCBE] rounded-full flex items-center justify-center gap-2"
                    >
                      <Droplet className="w-4 h-4 text-[#DC2626]" />
                      {language === "te" ? "రక్తదానం" : "Donate Blood"}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleNavClick("#donate")}
                      className="w-full px-4 py-3 bg-black text-white font-semibold uppercase tracking-[0.1em] border border-black rounded-full flex items-center justify-center gap-2"
                    >
                      <Heart className="w-4 h-4" />
                      {language === "te" ? "సహకరించండి" : "Contribute"}
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
