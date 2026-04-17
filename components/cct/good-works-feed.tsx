"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Share2, X, Camera, MessageCircle, BadgeCheck } from "lucide-react"

// Mock data for 8 stories
const mockStories = [
  {
    id: 1,
    text: "352 units collected at our Tirupati birthday blood drive! Thank you to all 400+ donors who showed up. Mega Star fans never disappoint!",
    author: "Mega Star Fans — Tirupati",
    authorName: "Ravi Kumar",
    date: "2 days ago",
    likes: 234,
    category: "Blood Drives",
    image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=1200&q=80",
    verified: true,
  },
  {
    id: 2,
    text: "Our campus drive at JNTU reached 200 donors for the first time! So proud of our student volunteers who worked tirelessly to make this happen.",
    author: "JNTU Blood Drive Team",
    authorName: "Priya Sharma",
    date: "5 days ago",
    likes: 189,
    category: "Blood Drives",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
    verified: true,
  },
  {
    id: 3,
    text: "Surgery funded in 72 hours! Thanks to 47 donors on CCT, little Anjali got her heart surgery. Forever grateful to this community.",
    author: "Dr. Anand, Guntur Hospital",
    authorName: "Dr. Anand Reddy",
    date: "1 week ago",
    likes: 412,
    category: "Fundraisers",
    image: "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?auto=format&fit=crop&w=1200&q=80",
    verified: true,
  },
  {
    id: 4,
    text: "15 first-time donors at our Kakinada chapter event! Each one of them is now a lifelong hero. Welcome to the CCT family!",
    author: "CCT Kakinada Chapter",
    authorName: "Venkat Rao",
    date: "3 days ago",
    likes: 98,
    category: "Volunteering",
    image: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=1200&q=80",
    verified: true,
  },
  {
    id: 5,
    text: "Rs.5 lakh raised for platelet separator in just 10 days! This equipment will help save countless lives at NIMS. Thank you, donors!",
    author: "NIMS Hyderabad",
    authorName: "Dr. Lakshmi Devi",
    date: "2 weeks ago",
    likes: 567,
    category: "Fundraisers",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    verified: true,
  },
  {
    id: 6,
    text: "Organized blood type awareness camp at Warangal school. 500+ students now know their blood type and the importance of donation!",
    author: "Warangal Youth Club",
    authorName: "Suresh Kumar",
    date: "4 days ago",
    likes: 76,
    category: "Volunteering",
    image: "https://images.unsplash.com/photo-1469571486292-b53601020f3d?auto=format&fit=crop&w=1200&q=80",
    verified: true,
  },
  {
    id: 7,
    text: "Our 100th blood drive! Grateful to every single donor who believed in our mission. Here's to 100 more and thousands of lives saved!",
    author: "CCT Vijayawada",
    authorName: "Ramesh Babu",
    date: "1 week ago",
    likes: 321,
    category: "Milestones",
    image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=1200&q=80",
    verified: true,
  },
  {
    id: 8,
    text: "Emergency O- arranged within 2 hours through CCT platform. My father is now recovering well. This platform literally saved his life!",
    author: "Sunita K., Hyderabad",
    authorName: "Sunita Krishnamurthy",
    date: "6 days ago",
    likes: 445,
    category: "Milestones",
    image: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=1200&q=80",
    verified: true,
  },
]

const categories = ["All", "Blood Drives", "Fundraisers", "Volunteering", "Milestones"]

// Story Card Component
function StoryCard({ 
  story, 
  index 
}: { 
  story: typeof mockStories[0]
  index: number 
}) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(story.likes)
  const [showShare, setShowShare] = useState(false)

  const handleLike = () => {
    if (liked) {
      setLikeCount(prev => prev - 1)
    } else {
      setLikeCount(prev => prev + 1)
    }
    setLiked(!liked)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-2xl shadow-lg shadow-black/5 overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      {/* Cover Image */}
      <div className="h-48 relative overflow-hidden">
        <img
          src={story.image}
          alt={`${story.category} story by ${story.authorName}`}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
        <div className="absolute bottom-3 left-3">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-[#1E3A5F]">
            {story.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Story Text */}
        <p className="text-[#374151] text-sm leading-relaxed mb-4">
          {story.text}
        </p>

        {/* Author Info */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#DC2626] to-[#B91C1C] flex items-center justify-center text-white font-semibold text-sm">
            {story.authorName.split(" ").map(n => n[0]).join("").slice(0, 2)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[#1A1A1A] truncate">{story.authorName}</p>
            <p className="text-xs text-[#6B7280] truncate">{story.author}</p>
          </div>
        </div>

        {/* Date and Verified Badge */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs text-[#9CA3AF]">{story.date}</span>
          {story.verified && (
            <span className="inline-flex items-center gap-1 text-xs text-green-600 font-medium">
              <BadgeCheck className="w-3.5 h-3.5" />
              Verified by CCT
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          {/* Like Button */}
          <motion.button
            onClick={handleLike}
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-2 group"
          >
            <motion.div
              animate={liked ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <Heart 
                className={`w-5 h-5 transition-colors ${
                  liked ? "fill-[#DC2626] text-[#DC2626]" : "text-[#9CA3AF] group-hover:text-[#DC2626]"
                }`} 
              />
            </motion.div>
            <AnimatePresence mode="wait">
              <motion.span
                key={likeCount}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className={`text-sm font-medium ${liked ? "text-[#DC2626]" : "text-[#6B7280]"}`}
              >
                {likeCount}
              </motion.span>
            </AnimatePresence>
          </motion.button>

          {/* Share Button */}
          <div className="relative">
            <motion.button
              onClick={() => setShowShare(!showShare)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-[#6B7280] hover:text-[#1E3A5F] transition-colors"
            >
              <Share2 className="w-5 h-5" />
              <span className="text-sm font-medium">Share</span>
            </motion.button>

            {/* Share Options */}
            <AnimatePresence>
              {showShare && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  className="absolute bottom-full right-0 mb-2 bg-white rounded-xl shadow-lg shadow-black/10 p-2 flex gap-2"
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center text-white"
                    onClick={() => setShowShare(false)}
                  >
                    <MessageCircle className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-white"
                    onClick={() => setShowShare(false)}
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Story Submission Modal
function StorySubmissionModal({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean
  onClose: () => void 
}) {
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    story: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
    }, 1500)
  }

  const handleClose = () => {
    setSubmitted(false)
    setFormData({ name: "", organization: "", story: "" })
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`
              bg-white rounded-3xl shadow-2xl w-full overflow-hidden
              ${
                submitted
                  ? "max-w-2xl"
                  : "max-w-lg md:max-w-none md:w-[760px] md:h-[760px] md:max-h-[90vh] overflow-y-auto"
              }
            `}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-2xl font-bold text-[#1A1A1A]">
                  Share Your Story
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleClose}
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-[#6B7280] hover:bg-gray-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
              <p className="text-sm text-[#6B7280] mt-1">
                No account required. Share your CCT experience with the community.
              </p>
            </div>

            {/* Content */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <div className="grid md:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <label className="block text-sm font-medium text-[#374151] mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#DC2626] focus:ring-2 focus:ring-red-100 outline-none transition-all"
                          placeholder="Enter your name"
                        />
                      </div>

                      {/* Organization */}
                      <div>
                        <label className="block text-sm font-medium text-[#374151] mb-2">
                          Your Organization <span className="text-[#9CA3AF]">(optional)</span>
                        </label>
                        <input
                          type="text"
                          value={formData.organization}
                          onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#DC2626] focus:ring-2 focus:ring-red-100 outline-none transition-all"
                          placeholder="e.g., CCT Hyderabad Chapter"
                        />
                      </div>
                    </div>

                    {/* Story */}
                    <div>
                      <label className="block text-sm font-medium text-[#374151] mb-2">
                        Your Story *
                      </label>
                      <textarea
                        required
                        maxLength={500}
                        rows={4}
                        value={formData.story}
                        onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#DC2626] focus:ring-2 focus:ring-red-100 outline-none transition-all resize-none"
                        placeholder="Share your experience with the CCT community..."
                      />
                      <div className="flex justify-end mt-1">
                        <span className={`text-xs ${formData.story.length > 450 ? "text-amber-500" : "text-[#9CA3AF]"}`}>
                          {formData.story.length}/500
                        </span>
                      </div>
                    </div>

                    {/* Photo Upload Placeholder */}
                    <div>
                      <label className="block text-sm font-medium text-[#374151] mb-2">
                        Add a Photo <span className="text-[#9CA3AF]">(optional)</span>
                      </label>
                      <div className="border-2 border-dashed border-gray-200 rounded-xl p-5 text-center hover:border-[#DC2626] transition-colors cursor-pointer">
                        <Camera className="w-8 h-8 text-[#9CA3AF] mx-auto mb-2" />
                        <p className="text-sm text-[#6B7280]">Click to upload or drag and drop</p>
                        <p className="text-xs text-[#9CA3AF] mt-1">PNG, JPG up to 5MB</p>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting || !formData.name || !formData.story}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 bg-gradient-to-r from-[#DC2626] to-[#B91C1C] text-white font-semibold rounded-xl shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          />
                          Submitting...
                        </>
                      ) : (
                        "Submit for Review"
                      )}
                    </motion.button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-14 text-center"
                  >
                    <h3 className="font-serif text-3xl font-bold text-[#1A1A1A] mb-3">
                      Story submitted successfully
                    </h3>
                    <p className="text-[#6B7280] text-base max-w-lg mx-auto">
                      Thank you for sharing your impact story. It will appear after CCT review.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Main Good Works Feed Component
export function GoodWorksFeed() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [showModal, setShowModal] = useState(false)
  const [visibleStories, setVisibleStories] = useState(6)

  const filteredStories = selectedCategory === "All" 
    ? mockStories 
    : mockStories.filter(s => s.category === selectedCategory)

  const displayedStories = filteredStories.slice(0, visibleStories)

  const loadMore = () => {
    setVisibleStories(prev => Math.min(prev + 4, filteredStories.length))
  }

  return (
    <div className="min-h-screen bg-[#FFF7ED] pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4">
            Good Works
          </h1>
          <p className="text-[#6B7280] max-w-2xl mx-auto mb-8">
            Stories of impact from the CCT community
          </p>

          {/* Share Your Story CTA */}
          <motion.button
            onClick={() => setShowModal(true)}
            initial={{ scale: 1 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-[#DC2626] to-[#B91C1C] text-white font-semibold rounded-xl shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 transition-all"
          >
            Share Your Story
          </motion.button>
        </motion.div>

        {/* Feed Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => {
                setSelectedCategory(category)
                setVisibleStories(6)
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? "bg-[#DC2626] text-white shadow-lg shadow-red-500/30"
                  : "bg-white text-[#6B7280] hover:bg-gray-50 shadow-sm"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {displayedStories.map((story, index) => (
            <div key={story.id} className="break-inside-avoid">
              <StoryCard story={story} index={index} />
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleStories < filteredStories.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-12"
          >
            <motion.button
              onClick={loadMore}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-white text-[#1E3A5F] font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-100"
            >
              Load More Stories
            </motion.button>
          </motion.div>
        )}

        {/* Empty State */}
        {displayedStories.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-[#9CA3AF]" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#1A1A1A] mb-2">
              No stories yet
            </h3>
            <p className="text-[#6B7280]">
              Be the first to share a story in this category!
            </p>
          </motion.div>
        )}
      </div>

      {/* Story Submission Modal */}
      <StorySubmissionModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  )
}
