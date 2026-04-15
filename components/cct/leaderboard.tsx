"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Trophy, Medal, Crown, Droplet, Star } from "lucide-react"
import { BloodTypeBadge, TierBadge } from "./badge"

const topDonors = [
  {
    rank: 1,
    name: "Venkata Ramana Reddy",
    bloodType: "O+",
    donations: 52,
    tier: "platinum" as const,
    city: "Hyderabad",
    lastDonation: "March 15, 2024",
  },
  {
    rank: 2,
    name: "Lakshmi Prasanna",
    bloodType: "A+",
    donations: 45,
    tier: "platinum" as const,
    city: "Vijayawada",
    lastDonation: "March 10, 2024",
  },
  {
    rank: 3,
    name: "Srinivas Rao",
    bloodType: "B+",
    donations: 38,
    tier: "gold" as const,
    city: "Visakhapatnam",
    lastDonation: "March 8, 2024",
  },
  {
    rank: 4,
    name: "Padma Kumari",
    bloodType: "AB+",
    donations: 32,
    tier: "gold" as const,
    city: "Guntur",
    lastDonation: "February 28, 2024",
  },
  {
    rank: 5,
    name: "Ravi Shankar",
    bloodType: "O-",
    donations: 28,
    tier: "gold" as const,
    city: "Warangal",
    lastDonation: "March 1, 2024",
  },
  {
    rank: 6,
    name: "Anitha Devi",
    bloodType: "A-",
    donations: 24,
    tier: "silver" as const,
    city: "Tirupati",
    lastDonation: "February 20, 2024",
  },
  {
    rank: 7,
    name: "Krishna Murthy",
    bloodType: "B-",
    donations: 21,
    tier: "silver" as const,
    city: "Kakinada",
    lastDonation: "February 15, 2024",
  },
  {
    rank: 8,
    name: "Suresh Babu",
    bloodType: "O+",
    donations: 18,
    tier: "silver" as const,
    city: "Nellore",
    lastDonation: "March 5, 2024",
  },
]

const rankIcons = {
  1: { icon: Crown, color: "text-yellow-500", bg: "bg-yellow-50" },
  2: { icon: Medal, color: "text-gray-400", bg: "bg-gray-50" },
  3: { icon: Medal, color: "text-amber-600", bg: "bg-amber-50" },
}

export function LeaderboardSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-24 bg-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-amber-100 text-[#F59E0B] text-sm font-semibold rounded-full mb-4">
            Hall of Fame
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-6">
            Top Blood Donors
          </h2>
          <p className="text-lg text-[#6B7280]">
            Celebrating our heroes who have made the greatest contribution to 
            saving lives through regular blood donation.
          </p>
        </motion.div>

        {/* Top 3 Podium */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center items-end gap-4 md:gap-8 mb-16"
        >
          {/* 2nd Place */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col items-center"
          >
            <div className="relative mb-4">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                {topDonors[1].name.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                2
              </div>
            </div>
            <h4 className="font-semibold text-[#1A1A1A] text-center text-sm md:text-base">{topDonors[1].name}</h4>
            <p className="text-sm text-[#6B7280]">{topDonors[1].donations} donations</p>
            <div className="mt-2">
              <TierBadge tier={topDonors[1].tier} size="sm" />
            </div>
            <div className="h-24 md:h-32 w-20 md:w-28 bg-gradient-to-t from-gray-200 to-gray-100 rounded-t-lg mt-4 flex items-end justify-center pb-2">
              <Medal className="w-8 h-8 text-gray-400" />
            </div>
          </motion.div>

          {/* 1st Place */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center"
          >
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="relative mb-4"
            >
              <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center text-white font-bold text-3xl shadow-xl">
                {topDonors[0].name.split(" ").map(n => n[0]).join("")}
              </div>
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-4 left-1/2 -translate-x-1/2"
              >
                <Crown className="w-10 h-10 text-yellow-500" />
              </motion.div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                1
              </div>
            </motion.div>
            <h4 className="font-semibold text-[#1A1A1A] text-center">{topDonors[0].name}</h4>
            <p className="text-sm text-[#6B7280]">{topDonors[0].donations} donations</p>
            <div className="mt-2">
              <TierBadge tier={topDonors[0].tier} size="sm" />
            </div>
            <div className="h-32 md:h-44 w-24 md:w-32 bg-gradient-to-t from-yellow-200 to-yellow-100 rounded-t-lg mt-4 flex items-end justify-center pb-2">
              <Trophy className="w-10 h-10 text-yellow-500" />
            </div>
          </motion.div>

          {/* 3rd Place */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col items-center"
          >
            <div className="relative mb-4">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                {topDonors[2].name.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                3
              </div>
            </div>
            <h4 className="font-semibold text-[#1A1A1A] text-center text-sm md:text-base">{topDonors[2].name}</h4>
            <p className="text-sm text-[#6B7280]">{topDonors[2].donations} donations</p>
            <div className="mt-2">
              <TierBadge tier={topDonors[2].tier} size="sm" />
            </div>
            <div className="h-16 md:h-24 w-20 md:w-28 bg-gradient-to-t from-amber-200 to-amber-100 rounded-t-lg mt-4 flex items-end justify-center pb-2">
              <Medal className="w-8 h-8 text-amber-600" />
            </div>
          </motion.div>
        </motion.div>

        {/* Full Leaderboard Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white rounded-2xl shadow-lg shadow-black/5 border border-gray-100 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#6B7280]">Rank</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#6B7280]">Donor</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#6B7280]">Blood Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#6B7280]">Donations</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#6B7280]">Tier</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#6B7280]">City</th>
                </tr>
              </thead>
              <tbody>
                {topDonors.map((donor, index) => (
                  <motion.tr
                    key={donor.rank}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.7 + index * 0.05 }}
                    className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      {donor.rank <= 3 ? (
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${rankIcons[donor.rank as keyof typeof rankIcons].bg}`}>
                          {(() => {
                            const IconComponent = rankIcons[donor.rank as keyof typeof rankIcons].icon
                            return <IconComponent className={`w-4 h-4 ${rankIcons[donor.rank as keyof typeof rankIcons].color}`} />
                          })()}
                        </div>
                      ) : (
                        <span className="text-[#6B7280] font-medium">#{donor.rank}</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#DC2626] to-[#EF4444] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {donor.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                          <p className="font-medium text-[#1A1A1A]">{donor.name}</p>
                          <p className="text-xs text-[#6B7280]">Last: {donor.lastDonation}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <BloodTypeBadge type={donor.bloodType} size="sm" showPulse={false} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Droplet className="w-4 h-4 text-[#DC2626]" />
                        <span className="font-semibold text-[#1A1A1A]">{donor.donations}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <TierBadge tier={donor.tier} size="sm" />
                    </td>
                    <td className="px-6 py-4 text-[#6B7280]">{donor.city}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
