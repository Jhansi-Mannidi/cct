"use client"

import { HeroSection } from "@/components/cct/hero"
import { MegastarSpotlight } from "@/components/cct/megastar-spotlight"

interface HomeTopSliderProps {
  onNavigate: (page: string) => void
}

export function HomeTopSlider({ onNavigate }: HomeTopSliderProps) {
  return (
    <>
      {/* Static start section (no auto-scroll/carousel) */}
      <HeroSection onNavigate={onNavigate} />

      {/* Second reference image section placed separately on home */}
      <MegastarSpotlight onNavigate={onNavigate} />
    </>
  )
}
