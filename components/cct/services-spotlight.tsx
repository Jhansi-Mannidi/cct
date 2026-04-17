"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "./language-context"

interface ServicesSpotlightProps {
  onNavigate?: (page: string) => void
}

export function ServicesSpotlight({ onNavigate }: ServicesSpotlightProps) {
  const { language } = useLanguage()

  return (
    <section className="h-screen min-h-[760px] overflow-hidden bg-[#F4F2EC]">
      <div className="grid h-full md:grid-cols-[1.05fr_1fr]">
        {/* Left Red Panel */}
        <div className="relative overflow-hidden bg-[#CC0033] text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.12),transparent_42%),radial-gradient(circle_at_92%_88%,rgba(0,0,0,0.12),transparent_46%)]" />

          <div className="relative z-10 flex h-full flex-col px-8 py-10 lg:px-10">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/75">
              {language === "te" ? "చిరంజీవి చారిటబుల్ ట్రస్ట్ - స్థాపితం 1997" : "Chiranjeevi Charitable Trust - Est. 1997"}
            </p>

            <div className="flex flex-1 items-center pb-10">
              <h2 className="font-sans text-[4.1rem] leading-[0.84] font-black md:text-[5.1rem]">
                DROP.
                <br />
                GIVE.
                <br />
                <span className="font-serif text-[3.8rem] italic font-medium text-[#FFD5DF] md:text-[4.4rem]">
                  {language === "te" ? "జీవించండి." : "Live."}
                </span>
              </h2>
            </div>

            <div className="flex items-end justify-between gap-4 pb-3">
              <div className="flex items-center gap-6">
                <div>
                  <p className="font-serif text-3xl font-bold">12L+</p>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-white/70">{language === "te" ? "యూనిట్లు" : "Units"}</p>
                </div>
                <div>
                  <p className="font-serif text-3xl font-bold">4.7K</p>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-white/70">{language === "te" ? "ప్రాణాలు" : "Lives"}</p>
                </div>
                <div>
                  <p className="font-serif text-3xl font-bold">28K</p>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-white/70">{language === "te" ? "దాతలు" : "Donors"}</p>
                </div>
              </div>

              <div className="w-[110px]" />
            </div>
          </div>
        </div>

        {/* Right Content Panel */}
        <div className="bg-[#F4F2EC] px-8 py-10 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="h-full max-w-[640px] flex flex-col justify-between"
          >
            <div className="inline-flex items-center rounded-sm bg-black px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white self-start">
              {language === "te" ? "మెగాస్టార్ - ఫ్యాన్ కమ్యూనిటీ - ఇంపాక్ట్ ప్లాట్‌ఫారమ్" : "Megastar - Fan Community - Impact Platform"}
            </div>

            <div className="mt-10">
              <p className="font-serif text-5xl italic text-[#5B5750]">{language === "te" ? "లక్షలాది అభిమానులు" : "Millions of fans"}</p>
              <h3 className="mt-1 font-sans text-6xl font-black leading-[0.9] text-[#111111]">{language === "te" ? "ఒకే లక్ష్యం." : "One mission."}</h3>
              <p className="mt-1 font-serif text-5xl italic text-[#5B5750]">{language === "te" ? "అనేక జీవితాల్లో మార్పు." : "Infinite lives changed."}</p>

              <p className="mt-7 max-w-xl text-sm leading-relaxed text-[#5B5750] md:text-base">
                {language === "te"
                  ? "హీరో కావాలంటే కేప్ అవసరం లేదు. ఒక యూనిట్ రక్తం. ఒక రూపాయి. ఒక కథ పంచుకోవడం. చిరంజీవి చారిటబుల్ ట్రస్ట్ ప్రేమను కార్యరూపంలోకి తెస్తుంది - రక్తదానం, సమాజ సేవ, శాశ్వత సేవా వారసత్వం."
                  : "You don&apos;t need a cape to be a hero. One pint of blood.\nOne rupee. One story shared. The Chiranjeevi Charitable\nTrust turns love into action - across blood donation,\ncommunity giving, and a legacy of care."}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onNavigate?.("donate")}
                  className="rounded-full bg-[#0F0F0F] px-6 py-2.5 text-sm font-semibold uppercase tracking-[0.08em] text-white hover:bg-black/90 transition-colors"
                >
                  {language === "te" ? "సహకరించండి" : "Contribute"}
                </button>
                <button
                  onClick={() => onNavigate?.("register")}
                  className="rounded-full border border-[#DED9CD] bg-[#F4F2EC] px-6 py-2.5 text-sm font-semibold uppercase tracking-[0.08em] text-[#2A2926] hover:bg-white transition-colors"
                >
                  {language === "te" ? "రక్తదానం చేయండి" : "Donate Blood"}
                </button>
              </div>
            </div>

            <div className="pt-8">
              <div className="rounded-2xl border border-[#E4E0D4] bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#D3224E]">
                      {language === "te" ? "ప్రస్తుత సేవా చర్యలు" : "Live Impact Actions"}
                    </p>
                    <h4 className="mt-2 font-serif text-xl font-bold text-[#121212]">
                      {language === "te" ? "జీవితాలను కాపాడే మార్పులో భాగమవ్వండి" : "Be part of life-saving change"}
                    </h4>
                    <p className="mt-1 text-xs text-[#69645D]">
                      {language === "te" ? "మీరు ఎలా సహాయం చేయాలో ఎంచుకోండి: నిధులు ఇవ్వండి లేదా రక్తదానం చేయండి." : "Choose how you want to help: contribute funds or donate blood."}
                    </p>
                  </div>
                  <button
                    onClick={() => onNavigate?.("donate")}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#DF1447] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-white hover:bg-[#C0103C] transition-colors"
                  >
                    {language === "te" ? "సహకరించండి" : "Contribute"}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    onClick={() => onNavigate?.("register")}
                    className="rounded-full border border-[#D9D3C7] bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#27231D] hover:bg-[#F8F5EF] transition-colors"
                  >
                    {language === "te" ? "రక్తదానం చేయండి" : "Donate Blood"}
                  </button>
                  <button
                    onClick={() => onNavigate?.("donate")}
                    className="rounded-full border border-[#D9D3C7] bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#27231D] hover:bg-[#F8F5EF] transition-colors"
                  >
                    {language === "te" ? "సహకరించండి" : "Contribute"}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
