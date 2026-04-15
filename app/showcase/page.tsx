"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Heart, Droplet, Users, Calendar, Award, 
  ArrowRight, CheckCircle, AlertTriangle, Info
} from "lucide-react"
import { CCTButton } from "@/components/cct/button"
import { CCTCard, CampaignCard, EventCard, StatCard, DonorCard } from "@/components/cct/card"
import { BloodTypeBadge, TierBadge, StatusBadge, CCTBadge } from "@/components/cct/badge"
import { CCTProgressBar, StatCounter } from "@/components/cct/progress"
import { CCTInput, OTPInput, CCTTextarea } from "@/components/cct/input"
import { CCTTabs, CCTUnderlineTabs } from "@/components/cct/tabs"
import { CCTModal, ConfirmModal } from "@/components/cct/modal"
import { ToastProvider, useToast, CCTToast } from "@/components/cct/toast"
import { CardSkeleton, EventCardSkeleton, StatCardSkeleton, DonorCardSkeleton } from "@/components/cct/skeleton"

function ShowcaseContent() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [otpValue, setOtpValue] = useState("")
  const [showToast, setShowToast] = useState(false)
  const { addToast } = useToast()

  return (
    <div className="min-h-screen bg-[#FFF7ED]">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#DC2626] to-[#B91C1C] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              CCT Design System
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Component library showcase for the Chiranjeevi Charitable Trust digital platform.
              Built with React, Framer Motion, and Tailwind CSS.
            </p>
          </motion.div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        {/* Buttons Section */}
        <section>
          <SectionHeader title="Buttons" description="Interactive buttons with Framer Motion animations" />
          <div className="grid gap-8">
            <div className="flex flex-wrap gap-4 items-center">
              <CCTButton variant="primary" size="lg">
                <Heart className="w-5 h-5" />
                Primary Large
              </CCTButton>
              <CCTButton variant="secondary" size="md">
                <Droplet className="w-4 h-4" />
                Secondary
              </CCTButton>
              <CCTButton variant="outline" size="md">
                Outline
                <ArrowRight className="w-4 h-4" />
              </CCTButton>
              <CCTButton variant="ghost" size="sm">
                Ghost Small
              </CCTButton>
            </div>
            <div className="flex flex-wrap gap-4 items-center">
              <CCTButton variant="primary" isLoading>
                Loading State
              </CCTButton>
              <CCTButton variant="secondary" disabled>
                Disabled
              </CCTButton>
            </div>
          </div>
        </section>

        {/* Badges Section */}
        <section>
          <SectionHeader title="Badges" description="Blood types, tiers, and status indicators" />
          <div className="space-y-8">
            <div>
              <h4 className="text-sm font-semibold text-[#6B7280] mb-4">Blood Type Badges</h4>
              <div className="flex flex-wrap gap-4">
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((type) => (
                  <BloodTypeBadge key={type} type={type} size="lg" />
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#6B7280] mb-4">Tier Badges</h4>
              <div className="flex flex-wrap gap-4">
                <TierBadge tier="bronze" size="lg" />
                <TierBadge tier="silver" size="lg" />
                <TierBadge tier="gold" size="lg" />
                <TierBadge tier="platinum" size="lg" />
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#6B7280] mb-4">Status Badges</h4>
              <div className="flex flex-wrap gap-4">
                <StatusBadge status="critical" />
                <StatusBadge status="low" />
                <StatusBadge status="sufficient" />
              </div>
            </div>
          </div>
        </section>

        {/* Cards Section */}
        <section>
          <SectionHeader title="Cards" description="Campaign, Event, Stat, and Donor cards" />
          <div className="space-y-12">
            <div>
              <h4 className="text-sm font-semibold text-[#6B7280] mb-4">Campaign Cards</h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <CampaignCard
                  title="Fund Platelet Separator Machine"
                  description="Help us purchase a state-of-the-art platelet separator for Hyderabad Blood Bank."
                  raised={1450000}
                  goal={1800000}
                  donors={342}
                  daysLeft={15}
                  image="/placeholder"
                />
                <CampaignCard
                  title="Mobile Blood Collection Van"
                  description="Enable blood donation camps in remote villages with a mobile collection unit."
                  raised={850000}
                  goal={2500000}
                  donors={189}
                  daysLeft={30}
                  image="/placeholder"
                  delay={0.1}
                />
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#6B7280] mb-4">Event Cards</h4>
              <div className="grid md:grid-cols-3 gap-6">
                <EventCard
                  title="Mega Blood Drive - Hyderabad"
                  date="April 20, 2024"
                  location="HITEC City Convention Center"
                  attendees={450}
                  type="blood-drive"
                />
                <EventCard
                  title="Charity Gala Dinner"
                  date="May 5, 2024"
                  location="Taj Krishna, Banjara Hills"
                  attendees={180}
                  type="fundraiser"
                  delay={0.1}
                />
                <EventCard
                  title="World Blood Donor Day"
                  date="June 14, 2024"
                  location="Ravindra Bharathi"
                  attendees={280}
                  type="awareness"
                  delay={0.2}
                />
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#6B7280] mb-4">Stat Cards</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <StatCard value={125000} label="Lives Saved" suffix="+" icon={<Heart className="w-6 h-6" />} />
                <StatCard value={85000} label="Blood Donors" suffix="+" icon={<Users className="w-6 h-6" />} delay={0.1} />
                <StatCard value={250} label="Partner Hospitals" suffix="+" icon={<Award className="w-6 h-6" />} delay={0.2} />
                <StatCard value={15} label="Years of Service" suffix="+" icon={<Calendar className="w-6 h-6" />} delay={0.3} />
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#6B7280] mb-4">Donor Cards</h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <DonorCard name="Venkata Ramana Reddy" bloodType="O+" donations={52} tier="platinum" />
                <DonorCard name="Lakshmi Prasanna" bloodType="A+" donations={45} tier="gold" delay={0.1} />
                <DonorCard name="Srinivas Rao" bloodType="B+" donations={28} tier="silver" delay={0.2} />
              </div>
            </div>
          </div>
        </section>

        {/* Progress Section */}
        <section>
          <SectionHeader title="Progress & Stats" description="Animated progress bars and stat counters" />
          <div className="space-y-8 max-w-xl">
            <CCTProgressBar
              value={1450000}
              max={1800000}
              label="Platelet Separator Campaign"
            />
            <CCTProgressBar
              value={850000}
              max={2500000}
              label="Mobile Blood Van"
              delay={0.2}
            />
            <CCTProgressBar
              value={380000}
              max={500000}
              label="Storage Refrigerators"
              size="lg"
              delay={0.4}
            />
          </div>
        </section>

        {/* Form Elements Section */}
        <section>
          <SectionHeader title="Form Elements" description="Inputs with floating labels and animations" />
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
            <div className="space-y-6">
              <CCTInput label="Full Name" />
              <CCTInput label="Email Address" type="email" />
              <CCTInput label="Phone Number" type="tel" helperText="We will never share your number" />
              <CCTInput label="With Error" error="This field is required" />
            </div>
            <div className="space-y-6">
              <CCTTextarea label="Your Message" />
              <div>
                <p className="text-sm font-medium text-[#6B7280] mb-4">OTP Input</p>
                <OTPInput value={otpValue} onChange={setOtpValue} />
              </div>
            </div>
          </div>
        </section>

        {/* Tabs Section */}
        <section>
          <SectionHeader title="Tabs" description="Animated tab components with sliding indicators" />
          <div className="space-y-12 max-w-2xl">
            <div>
              <h4 className="text-sm font-semibold text-[#6B7280] mb-4">Pill Tabs</h4>
              <CCTTabs
                tabs={[
                  { id: "all", label: "All Campaigns" },
                  { id: "equipment", label: "Equipment" },
                  { id: "infrastructure", label: "Infrastructure" },
                  { id: "awareness", label: "Awareness" },
                ]}
              />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#6B7280] mb-4">Underline Tabs</h4>
              <CCTUnderlineTabs
                tabs={[
                  { id: "overview", label: "Overview", icon: <Info className="w-4 h-4" /> },
                  { id: "donations", label: "My Donations", icon: <Droplet className="w-4 h-4" /> },
                  { id: "events", label: "Events", icon: <Calendar className="w-4 h-4" /> },
                ]}
              />
            </div>
          </div>
        </section>

        {/* Modal Section */}
        <section>
          <SectionHeader title="Modals" description="Animated modals with backdrop blur" />
          <div className="flex flex-wrap gap-4">
            <CCTButton variant="primary" onClick={() => setIsModalOpen(true)}>
              Open Modal
            </CCTButton>
            <CCTButton variant="outline" onClick={() => setIsConfirmOpen(true)}>
              Open Confirm Dialog
            </CCTButton>
          </div>

          <CCTModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Donate Blood Today"
            description="Your donation can save up to 3 lives"
          >
            <div className="space-y-4">
              <p className="text-[#6B7280]">
                Thank you for your interest in donating blood. Please fill out the form below to schedule your appointment.
              </p>
              <CCTInput label="Preferred Date" type="date" />
              <CCTInput label="Preferred Location" />
              <div className="flex gap-3 mt-6">
                <CCTButton variant="ghost" onClick={() => setIsModalOpen(false)} className="flex-1">
                  Cancel
                </CCTButton>
                <CCTButton variant="primary" onClick={() => setIsModalOpen(false)} className="flex-1">
                  Schedule Donation
                </CCTButton>
              </div>
            </div>
          </CCTModal>

          <ConfirmModal
            isOpen={isConfirmOpen}
            onClose={() => setIsConfirmOpen(false)}
            onConfirm={() => {
              setIsConfirmOpen(false)
              addToast("success", "Action Confirmed!", "Your request has been processed.")
            }}
            title="Confirm Action"
            description="Are you sure you want to proceed? This action cannot be undone."
            confirmText="Yes, Proceed"
            cancelText="Cancel"
          />
        </section>

        {/* Toast Section */}
        <section>
          <SectionHeader title="Toasts" description="Notification toasts with auto-dismiss" />
          <div className="flex flex-wrap gap-4">
            <CCTButton 
              variant="primary"
              onClick={() => addToast("success", "Success!", "Blood donation scheduled successfully.")}
            >
              <CheckCircle className="w-4 h-4" />
              Success Toast
            </CCTButton>
            <CCTButton 
              variant="outline"
              onClick={() => addToast("error", "Error", "Something went wrong. Please try again.")}
            >
              <AlertTriangle className="w-4 h-4" />
              Error Toast
            </CCTButton>
            <CCTButton 
              variant="ghost"
              onClick={() => addToast("info", "Information", "New blood drive scheduled for next week.")}
            >
              <Info className="w-4 h-4" />
              Info Toast
            </CCTButton>
          </div>
        </section>

        {/* Skeleton Loaders Section */}
        <section>
          <SectionHeader title="Skeleton Loaders" description="Loading states with shimmer animation" />
          <div className="space-y-8">
            <div>
              <h4 className="text-sm font-semibold text-[#6B7280] mb-4">Card Skeletons</h4>
              <div className="grid md:grid-cols-3 gap-6">
                <CardSkeleton />
                <EventCardSkeleton />
                <StatCardSkeleton />
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#6B7280] mb-4">Donor Card Skeletons</h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <DonorCardSkeleton />
                <DonorCardSkeleton />
                <DonorCardSkeleton />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#1E3A5F] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white/60">
            CCT Design System - Built with React, Framer Motion & Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  )
}

function SectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-8"
    >
      <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-2">{title}</h2>
      <p className="text-[#6B7280]">{description}</p>
      <div className="h-1 w-16 bg-[#DC2626] rounded-full mt-4" />
    </motion.div>
  )
}

export default function ShowcasePage() {
  return (
    <ToastProvider>
      <ShowcaseContent />
    </ToastProvider>
  )
}
