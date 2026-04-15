"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Heart, Target, Users, Clock, ArrowRight, Filter } from "lucide-react"
import { CCTButton } from "./button"
import { CCTProgressBar } from "./progress"
import { CCTTabs } from "./tabs"

const campaigns = [
  {
    id: 1,
    title: "Fund Platelet Separator Machine",
    description: "Help us purchase a state-of-the-art platelet separator for the Hyderabad Blood Bank to serve cancer patients better.",
    raised: 1450000,
    goal: 1800000,
    donors: 342,
    daysLeft: 15,
    category: "equipment",
    image: "/campaign-1.jpg",
    featured: true,
  },
  {
    id: 2,
    title: "Mobile Blood Collection Van",
    description: "Enable blood donation camps in remote villages of Telangana with a fully-equipped mobile collection unit.",
    raised: 850000,
    goal: 2500000,
    donors: 189,
    daysLeft: 30,
    category: "infrastructure",
    image: "/campaign-2.jpg",
    featured: true,
  },
  {
    id: 3,
    title: "Blood Storage Refrigerators",
    description: "Upgrade blood storage facilities at 5 district hospitals in Andhra Pradesh to prevent wastage.",
    raised: 380000,
    goal: 500000,
    donors: 156,
    daysLeft: 8,
    category: "equipment",
    image: "/campaign-3.jpg",
    featured: false,
  },
  {
    id: 4,
    title: "Donor Awareness Program 2024",
    description: "Conduct awareness campaigns across 50 colleges to educate youth about the importance of regular blood donation.",
    raised: 120000,
    goal: 300000,
    donors: 78,
    daysLeft: 45,
    category: "awareness",
    image: "/campaign-4.jpg",
    featured: false,
  },
  {
    id: 5,
    title: "Emergency Blood Fund",
    description: "Create a reserve fund to provide free blood to patients from economically weaker sections during emergencies.",
    raised: 2100000,
    goal: 3000000,
    donors: 512,
    daysLeft: 60,
    category: "emergency",
    image: "/campaign-5.jpg",
    featured: true,
  },
  {
    id: 6,
    title: "Thalassemia Care Support",
    description: "Support regular blood transfusions for 200+ thalassemia patients across our network hospitals.",
    raised: 680000,
    goal: 1200000,
    donors: 234,
    daysLeft: 22,
    category: "patient-care",
    image: "/campaign-6.jpg",
    featured: false,
  },
]

const tabs = [
  { id: "all", label: "All Campaigns" },
  { id: "equipment", label: "Equipment" },
  { id: "infrastructure", label: "Infrastructure" },
  { id: "awareness", label: "Awareness" },
  { id: "patient-care", label: "Patient Care" },
]

export function CampaignsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeTab, setActiveTab] = useState("all")

  const filteredCampaigns = activeTab === "all" 
    ? campaigns 
    : campaigns.filter(c => c.category === activeTab)

  return (
    <section id="campaigns" className="py-24 bg-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-amber-100 text-[#F59E0B] text-sm font-semibold rounded-full mb-4">
            Fundraising
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-6">
            Active Campaigns
          </h2>
          <p className="text-lg text-[#6B7280]">
            Support our initiatives to strengthen blood banking infrastructure 
            and save more lives across the region.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <CCTTabs 
            tabs={tabs} 
            defaultTab="all" 
            onChange={setActiveTab}
          />
        </motion.div>

        {/* Campaign Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCampaigns.map((campaign, index) => (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg shadow-black/5 border border-gray-100 group"
            >
              {/* Campaign Image */}
              <div className="relative h-48 bg-gradient-to-br from-[#DC2626] to-[#B91C1C] overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjEiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNCAxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNCAxNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
                
                {campaign.featured && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[#F59E0B] text-white text-xs font-semibold rounded-full">
                      Featured
                    </span>
                  </div>
                )}
                
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                    <Clock className="w-3 h-3 inline mr-1" />
                    {campaign.daysLeft} days left
                  </span>
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                    <Users className="w-3 h-3 inline mr-1" />
                    {campaign.donors}
                  </span>
                </div>
              </div>

              {/* Campaign Content */}
              <div className="p-6">
                <h3 className="font-serif text-xl font-bold text-[#1A1A1A] mb-2 group-hover:text-[#DC2626] transition-colors">
                  {campaign.title}
                </h3>
                <p className="text-[#6B7280] text-sm mb-6 line-clamp-2">
                  {campaign.description}
                </p>

                {/* Progress */}
                <CCTProgressBar
                  value={campaign.raised}
                  max={campaign.goal}
                  delay={0.3 + index * 0.1}
                  size="sm"
                />

                {/* CTA */}
                <div className="mt-6">
                  <CCTButton variant="outline" size="sm" className="w-full group/btn">
                    <Heart className="w-4 h-4" />
                    Donate to Campaign
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </CCTButton>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <CCTButton variant="secondary" size="lg">
            View All Campaigns
            <ArrowRight className="w-5 h-5" />
          </CCTButton>
        </motion.div>
      </div>
    </section>
  )
}
