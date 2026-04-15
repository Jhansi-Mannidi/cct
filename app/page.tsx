"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { AnnouncementBar } from "@/components/cct/announcement-bar"
import { CCTNavigation } from "@/components/cct/navigation"
import { HeroSection } from "@/components/cct/hero"
import { ImpactTicker } from "@/components/cct/impact-ticker"
import { HowItWorksSection } from "@/components/cct/how-it-works"
import { FeaturedCampaignsSection } from "@/components/cct/featured-campaigns"
import { BloodInventorySnapshot } from "@/components/cct/blood-inventory-snapshot"
import { UpcomingEventsSection } from "@/components/cct/upcoming-events"
import { DonorWallPreview } from "@/components/cct/donor-wall"
import { CTABanner } from "@/components/cct/cta-banner"
import { Footer } from "@/components/cct/footer"
import { ToastProvider } from "@/components/cct/toast"
import { PageTransition, staggerContainer, staggerItem } from "@/components/cct/page-transition"

// Other page components for navigation
import { AboutSection } from "@/components/cct/about"
import { BloodInventorySection } from "@/components/cct/blood-inventory"
import { CampaignsSection } from "@/components/cct/campaigns"
import { EventsSection } from "@/components/cct/events"
import { LeaderboardSection } from "@/components/cct/leaderboard"
import { ContactSection } from "@/components/cct/contact"
import { CampaignPages } from "@/components/cct/campaign-pages"
import { BloodBankDashboard } from "@/components/cct/blood-bank-dashboard"
import { EventsPages } from "@/components/cct/events-pages"
import { DonorWallPage } from "@/components/cct/donor-wall-page"
import { DonorRegistration } from "@/components/cct/donor-registration"
import { BloodRequestFlow } from "@/components/cct/blood-request-flow"
import { DonationFlow } from "@/components/cct/donation-flow"
import { PostDonationJourney } from "@/components/cct/post-donation-journey"
import { UserProfileDashboard } from "@/components/cct/user-profile-dashboard"
import { GoodWorksFeed } from "@/components/cct/good-works-feed"
import { OurImpactPage } from "@/components/cct/our-impact-page"
import { NotificationCentre } from "@/components/cct/notification-centre"
import { AdminDashboard } from "@/components/cct/admin-dashboard"
import { AdminDonors } from "@/components/cct/admin-donors"
import { AdminModeration } from "@/components/cct/admin-moderation"
import { MobileAppHome } from "@/components/cct/mobile-app-home"
import { MobileQRCheckin } from "@/components/cct/mobile-qr-checkin"
import { Heart, Droplet, Calendar, Users, Trophy, Info, Search, UserPlus } from "lucide-react"

// Home Page with all 8 sections as per Prompt 1.1
function HomePage({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <>
      {/* 1. Hero Section */}
      <HeroSection onNavigate={onNavigate} />
      
      {/* 2. Impact Ticker Strip */}
      <ImpactTicker />
      
      {/* 3. How It Works */}
      <HowItWorksSection />
      
      {/* 4. Featured Campaigns */}
      <FeaturedCampaignsSection />
      
      {/* 5. Blood Inventory Snapshot */}
      <BloodInventorySnapshot />
      
      {/* 6. Upcoming Events */}
      <UpcomingEventsSection />
      
      {/* 7. Donor Wall Preview */}
      <DonorWallPreview />
      
      {/* 8. CTA Banner */}
      <CTABanner />
    </>
  )
}

function CampaignsPage() {
  return (
    <motion.div 
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="pt-24"
    >
      <CampaignPages />
    </motion.div>
  )
}

function EventsPage() {
  return (
    <motion.div 
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <EventsPages />
    </motion.div>
  )
}

function AboutPage() {
  return (
    <motion.div 
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="pt-32 pb-20 min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={staggerItem} className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-[#1E3A5F] rounded-full text-sm font-medium mb-4">
            <Info className="w-4 h-4" />
            Our Story
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4">
            About CCT
          </h1>
          <p className="text-[#6B7280] max-w-2xl mx-auto">
            Learn about our mission, vision, and the impact we have made over the years.
          </p>
        </motion.div>
        <AboutSection />
      </div>
    </motion.div>
  )
}

function LeaderboardsPage() {
  return <DonorWallPage />
}

function InventoryPage() {
  return (
    <motion.div 
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <BloodBankDashboard />
    </motion.div>
  )
}

function RegisterPage({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const handleComplete = (action: string) => {
    if (onNavigate) {
      if (action === "find-drive") {
        onNavigate("events")
      } else if (action === "campaigns") {
        onNavigate("campaigns")
      } else {
        onNavigate("home")
      }
    }
  }

  return (
    <DonorRegistration 
      onComplete={handleComplete}
    />
  )
}

function FindBloodPage() {
  return <BloodRequestFlow />
}

function DonatePage({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const handleComplete = (action: string) => {
    if (onNavigate) {
      if (action === "campaigns") {
        onNavigate("campaigns")
      } else if (action === "register") {
        onNavigate("register")
      } else {
        onNavigate("home")
      }
    }
  }

  return (
    <DonationFlow 
      onComplete={handleComplete}
    />
  )
}

function ContactPage() {
  return (
    <motion.div 
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="pt-32 pb-20 min-h-screen"
    >
      <ContactSection />
    </motion.div>
  )
}

function PostDonationPage() {
  return <PostDonationJourney />
}

function ProfilePage() {
  return <UserProfileDashboard />
}

function GoodWorksPage() {
  return <GoodWorksFeed />
}

function ImpactPage({ onNavigate }: { onNavigate?: (page: string) => void }) {
  return <OurImpactPage onNavigate={onNavigate} />
}

function NotificationsPage() {
  return <NotificationCentre />
}

function AdminPage() {
  return <AdminDashboard />
}

function AdminDonorsPage() {
  return <AdminDonors />
}

function AdminModerationPage() {
  return <AdminModeration />
}

function MobileAppPage() {
  return <MobileAppHome />
}

function MobileQRPage() {
  return <MobileQRCheckin />
}

// Page renderer based on current page state
function renderPage(page: string, onNavigate: (page: string) => void) {
  switch (page) {
    case "home":
      return <HomePage onNavigate={onNavigate} />
    case "campaigns":
      return <CampaignsPage />
    case "events":
      return <EventsPage />
    case "about":
      return <AboutPage />
    case "leaderboards":
      return <LeaderboardsPage />
    case "inventory":
      return <InventoryPage />
    case "register":
      return <RegisterPage onNavigate={onNavigate} />
    case "find-blood":
      return <FindBloodPage />
    case "donate":
      return <DonatePage onNavigate={onNavigate} />
    case "post-donation":
      return <PostDonationPage />
    case "profile":
      return <ProfilePage />
    case "good-works":
      return <GoodWorksPage />
    case "impact":
      return <ImpactPage onNavigate={onNavigate} />
    case "notifications":
      return <NotificationsPage />
    case "admin":
      return <AdminPage />
    case "admin-donors":
      return <AdminDonorsPage />
    case "admin-moderation":
      return <AdminModerationPage />
    case "mobile-app":
      return <MobileAppPage />
    case "mobile-qr":
      return <MobileQRPage />
    case "contact":
      return <ContactPage />
    default:
      return <HomePage />
  }
}

export default function CCTHomePage() {
  const [currentPage, setCurrentPage] = useState("home")
  const [announcementVisible, setAnnouncementVisible] = useState(true)

  const handleNavigate = (page: string) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <ToastProvider>
      <div className="min-h-screen bg-background">
        {announcementVisible && (
          <AnnouncementBar onDismiss={() => setAnnouncementVisible(false)} />
        )}
        <CCTNavigation
          onNavigate={handleNavigate}
          currentPage={currentPage}
          announcementVisible={announcementVisible}
        />
        <main>
          <PageTransition pageKey={currentPage}>
            {renderPage(currentPage, handleNavigate)}
          </PageTransition>
        </main>
        <Footer />
      </div>
    </ToastProvider>
  )
}
