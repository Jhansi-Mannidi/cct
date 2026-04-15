"use client"

import { useEffect, useState } from "react"
import { HeroSection } from "@/components/cct/hero"
import { MegastarSpotlight } from "@/components/cct/megastar-spotlight"
import { ServicesSpotlight } from "@/components/cct/services-spotlight"

interface HomeTopSliderProps {
  onNavigate: (page: string) => void
}

export function HomeTopSlider({ onNavigate }: HomeTopSliderProps) {
  const [activeSlide, setActiveSlide] = useState(0)
  const [withTransition, setWithTransition] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => prev + 1)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (activeSlide !== 3) return

    const resetTimer = setTimeout(() => {
      setWithTransition(false)
      setActiveSlide(0)
      requestAnimationFrame(() => setWithTransition(true))
    }, 700)

    return () => clearTimeout(resetTimer)
  }, [activeSlide])

  const visibleSlide = activeSlide % 3

  return (
    <section className="relative overflow-hidden">
      <div
        className={`flex ${withTransition ? "transition-transform duration-700 ease-in-out" : ""}`}
        style={{ transform: `translateX(-${activeSlide * 100}%)` }}
      >
        <div className="w-full shrink-0">
          <HeroSection onNavigate={onNavigate} />
        </div>
        <div className="w-full shrink-0">
          <MegastarSpotlight onNavigate={onNavigate} />
        </div>
        <div className="w-full shrink-0">
          <ServicesSpotlight />
        </div>
        <div className="w-full shrink-0">
          <HeroSection onNavigate={onNavigate} />
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {[0, 1, 2].map((dot) => (
          <button
            key={dot}
            onClick={() => setActiveSlide(dot)}
            className={`h-2.5 rounded-full transition-all ${
              visibleSlide === dot ? "w-6 bg-white" : "w-2.5 bg-white/50"
            }`}
            aria-label={`Set top slide ${dot + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
