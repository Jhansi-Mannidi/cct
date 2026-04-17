"use client"

import { useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  ArrowRight,
  Banknote,
  Check,
  CheckCircle2,
  ChevronDown,
  Copy,
  CreditCard,
  Heart,
  Landmark,
  Smartphone,
} from "lucide-react"

interface DonateFundsPageProps {
  onNavigate?: (page: string) => void
}

const CAMPAIGN_NAME = "Fund Platelet Separator"
const CAMPAIGN_RAISED = 1240000
const CAMPAIGN_GOAL = 1800000
const PRESET_AMOUNTS = [100, 500, 1000, 2500, 5000]
const SHARE_URL = "https://cct.org/campaigns/platelet-separator"
const AMOUNT_META: Record<number, string> = {
  100: "1 blood test",
  500: "1 transfusion",
  1000: "2 sessions",
  2500: "1 month care",
  5000: "10 sessions",
}

export function DonateFundsPage({ onNavigate }: DonateFundsPageProps) {
  const [step, setStep] = useState(1)
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "netbanking">("upi")
  const [donationMode, setDonationMode] = useState<"once" | "monthly">("once")
  const [isPaying, setIsPaying] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const [details, setDetails] = useState({
    fullName: "",
    email: "",
    phone: "",
  })

  const [paymentData, setPaymentData] = useState({
    upiId: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    bank: "",
  })

  const campaignProgress = (CAMPAIGN_RAISED / CAMPAIGN_GOAL) * 100

  const amount = useMemo(() => {
    if (customAmount) {
      const parsed = Number(customAmount)
      if (!Number.isNaN(parsed)) return parsed
    }
    return selectedAmount ?? 0
  }, [customAmount, selectedAmount])

  const clampedAmount = Math.max(50, Math.min(1000000, amount || 0))
  const sessions = Math.max(1, Math.floor(clampedAmount / 500))
  const impactText = `\u20B9${clampedAmount.toLocaleString("en-IN")} can fund ${sessions} blood transfusion session${sessions > 1 ? "s" : ""}`

  const canContinueStep1 = clampedAmount >= 50 && clampedAmount <= 1000000
  const canContinueStep2 =
    details.fullName.trim().length > 1 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email) &&
    /^\d{10}$/.test(details.phone)

  const canPay =
    paymentMethod === "upi"
      ? paymentData.upiId.includes("@")
      : paymentMethod === "card"
      ? paymentData.cardNumber.replace(/\s/g, "").length >= 12 &&
        paymentData.expiry.length >= 4 &&
        paymentData.cvv.length >= 3
      : paymentData.bank.length > 1

  const handlePay = () => {
    if (!canPay) return
    setIsPaying(true)
    setTimeout(() => {
      setIsPaying(false)
      setIsSuccess(true)
    }, 3000)
  }

  const shareText = `I just contributed \u20B9${clampedAmount.toLocaleString("en-IN")} to ${CAMPAIGN_NAME} on CCT! Join me \u2192 ${SHARE_URL}`

  const transactionId = "TXN-2026-04-15-8847"
  const today = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })

  return (
    <section className="pt-24 pb-14 min-h-screen bg-[#FFF7ED]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key={`step-${step}`}
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -28 }}
              transition={{ duration: 0.32 }}
            >
              <div className="bg-white border border-[#EBDCC8] rounded-3xl p-5 md:p-8 shadow-lg shadow-black/5">
                {/* Context header */}
                <div className="mb-7">
                  <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A1A]">Contribute to CCT</h1>
                  <p className="text-[#6B7280] mt-1">
                    {CAMPAIGN_NAME} - ₹{(CAMPAIGN_RAISED / 100000).toFixed(1)}L of ₹
                    {(CAMPAIGN_GOAL / 100000).toFixed(0)}L raised
                  </p>
                  <div className="h-2.5 bg-[#F1E8DA] rounded-full mt-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${campaignProgress}%` }}
                      transition={{ duration: 0.8 }}
                      className="h-full bg-gradient-to-r from-[#1E3A5F] to-[#F59E0B]"
                    />
                  </div>
                </div>

                {step === 1 && (
                  <div>
                    <div className="rounded-2xl overflow-hidden border border-[#E9DFD1] mb-5">
                      <div className="relative bg-gradient-to-br from-[#1E3A5F] via-[#1B3557] to-[#122844] p-5 md:p-6 text-white">
                        <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-white/10 blur-xl" />
                        <div className="absolute right-6 top-6 text-white/10">
                          <Heart className="w-14 h-14" />
                        </div>
                        <p className="text-[11px] uppercase tracking-[0.18em] text-white/80 font-semibold">
                          Chiranjeevi Charitable Trust - Est. 1997
                        </p>
                        <h2 className="font-serif text-4xl md:text-5xl font-bold leading-[0.9] mt-2">
                          Make a difference
                          <span className="block italic font-normal text-[#FFD3DB]">today.</span>
                        </h2>
                        <p className="text-white/90 mt-3 max-w-2xl text-sm md:text-base">
                          100% of your donation goes directly to CCT&apos;s blood bank operations, patient support, and community health initiatives across AP & Telangana.
                        </p>
                        <div className="mt-5 pt-4 border-t border-white/20 grid grid-cols-3 gap-3 max-w-lg">
                          <div>
                            <p className="font-serif text-2xl font-bold">12L+</p>
                            <p className="text-[11px] uppercase tracking-[0.1em] text-white/70">Blood Units</p>
                          </div>
                          <div>
                            <p className="font-serif text-2xl font-bold">4,700+</p>
                            <p className="text-[11px] uppercase tracking-[0.1em] text-white/70">Lives Saved</p>
                          </div>
                          <div>
                            <p className="font-serif text-2xl font-bold">28K+</p>
                            <p className="text-[11px] uppercase tracking-[0.1em] text-white/70">Donors</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white p-4 md:p-5">
                        <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-[#F3ECE6] border border-[#E8DED0] mb-4">
                          <button
                            onClick={() => setDonationMode("once")}
                            className={`py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                              donationMode === "once" ? "bg-white text-[#1A1A1A] shadow-sm" : "text-[#6B7280]"
                            }`}
                          >
                            Give Once
                          </button>
                          <button
                            onClick={() => setDonationMode("monthly")}
                            className={`py-2.5 rounded-lg text-sm font-semibold transition-colors inline-flex items-center justify-center gap-2 ${
                              donationMode === "monthly" ? "bg-white text-[#1A1A1A] shadow-sm" : "text-[#6B7280]"
                            }`}
                          >
                            Give Monthly
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#F59E0B] text-white">NEW</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-3">Choose Amount</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {PRESET_AMOUNTS.map((amt) => {
                        const active = selectedAmount === amt && !customAmount
                        const popular = amt === 500
                        return (
                          <motion.button
                            key={amt}
                            whileTap={{ scale: 0.97 }}
                            animate={{ scale: active ? 1.05 : 1 }}
                            transition={{ type: "spring", stiffness: 280, damping: 18 }}
                            onClick={() => {
                              setSelectedAmount(amt)
                              setCustomAmount("")
                            }}
                            className={`relative rounded-xl border-2 px-3 py-3.5 text-left ${
                              active ? "border-[#1E3A5F] bg-blue-50" : "border-[#E8DFD1] bg-white hover:border-[#1E3A5F]/40"
                            }`}
                          >
                            {popular && (
                              <span className="absolute -top-2 right-2 text-[10px] px-2 py-0.5 rounded-full bg-[#F59E0B] text-white font-semibold">
                                Most Given
                              </span>
                            )}
                            <p className="font-serif text-2xl font-bold text-[#1A1A1A]">₹{amt.toLocaleString("en-IN")}</p>
                            <p className="text-xs text-[#6B7280] mt-0.5">{AMOUNT_META[amt]}</p>
                            {active && <Check className="w-4 h-4 text-[#1E3A5F] absolute top-2 right-2" />}
                          </motion.button>
                        )
                      })}
                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          setSelectedAmount(null)
                          setCustomAmount("")
                        }}
                        className={`rounded-xl border-2 px-3 py-3.5 text-left ${
                          !selectedAmount && !customAmount ? "border-[#1E3A5F] bg-blue-50" : "border-[#E8DFD1] bg-white hover:border-[#1E3A5F]/40"
                        }`}
                      >
                        <p className="font-serif text-2xl font-bold text-[#1A1A1A]">Other</p>
                        <p className="text-xs text-[#6B7280] mt-0.5">Any amount</p>
                      </motion.button>
                    </div>

                    <div className="mt-4">
                      <p className="text-sm text-[#6B7280] mb-2">Or enter a custom amount</p>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280] font-semibold">₹</span>
                        <input
                          value={customAmount}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "")
                            setCustomAmount(value)
                            setSelectedAmount(null)
                          }}
                          className="w-full border-2 border-[#E8DFD1] rounded-xl py-3 pl-9 pr-4 focus:border-[#1E3A5F] outline-none"
                          placeholder="Min 50, Max 10,00,000"
                        />
                      </div>
                    </div>

                    <div className="mt-4 rounded-xl bg-[#FFF8E7] border border-[#F0DFC0] p-3 min-h-[52px]">
                      <AnimatePresence mode="wait">
                        <motion.p
                          key={impactText}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          className="text-[#8A6A24] font-medium text-sm"
                        >
                          {canContinueStep1 ? impactText : "Select an amount above to see your impact"}
                        </motion.p>
                      </AnimatePresence>
                    </div>

                    <motion.button
                      whileHover={canContinueStep1 ? { scale: 1.01 } : {}}
                      whileTap={canContinueStep1 ? { scale: 0.98 } : {}}
                      disabled={!canContinueStep1}
                      onClick={() => setStep(2)}
                      animate={{ opacity: canContinueStep1 ? 1 : 0.55, scale: canContinueStep1 ? 1 : 0.98 }}
                      className="mt-6 w-full md:w-auto px-8 py-3 rounded-xl bg-[#C9A961] text-white font-semibold disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
                    >
                      Continue <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                )}

                {step === 2 && (
                  <div className="grid lg:grid-cols-[1fr_1fr] gap-6 items-start">
                    <CheckoutSidePanel amount={clampedAmount} campaign={CAMPAIGN_NAME} />
                    <div>
                      <CheckoutStepper activeStep={2} />
                      <h2 className="font-serif text-3xl font-bold text-[#1A1A1A] mt-5">Your Details</h2>
                      <p className="text-[#6B7280] mb-5">No account needed - just a few details</p>

                      <div className="space-y-4">
                        <FloatingInput
                          label="Full Name"
                          value={details.fullName}
                          onChange={(value) => setDetails((s) => ({ ...s, fullName: value }))}
                          requiredField
                        />
                        <FloatingInput
                          label="Email Address"
                          value={details.email}
                          onChange={(value) => setDetails((s) => ({ ...s, email: value }))}
                          type="email"
                          requiredField
                        />
                        <FloatingInput
                          label="Phone Number"
                          value={details.phone}
                          onChange={(value) => setDetails((s) => ({ ...s, phone: value.replace(/\D/g, "").slice(0, 10) }))}
                          prefix="+91"
                          requiredField
                        />
                      </div>

                      <div className="mt-6 flex flex-wrap gap-3">
                        <button
                          onClick={() => setStep(1)}
                          className="px-6 py-3 rounded-xl border border-[#D8CCBE] text-[#374151] font-medium"
                        >
                          Back
                        </button>
                        <button
                          disabled={!canContinueStep2}
                          onClick={() => setStep(3)}
                          className="px-8 py-3 rounded-xl bg-[#C9A961] text-white font-semibold disabled:opacity-50 inline-flex items-center gap-2"
                        >
                          Proceed to Payment <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="grid lg:grid-cols-[1fr_1fr] gap-6">
                    <CheckoutSidePanel amount={clampedAmount} campaign={CAMPAIGN_NAME} compact />
                    <div>
                      <CheckoutStepper activeStep={3} />
                      <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-4">Choose Payment Method</h2>

                      <PaymentCard
                        title="UPI"
                        badge="Recommended"
                        icon={<Smartphone className="w-5 h-5 text-[#C9A961]" />}
                        active={paymentMethod === "upi"}
                        onClick={() => setPaymentMethod("upi")}
                      >
                        <FloatingInput
                          label="UPI ID"
                          value={paymentData.upiId}
                          onChange={(value) => setPaymentData((s) => ({ ...s, upiId: value }))}
                          placeholder="yourname@upi"
                          requiredField
                        />
                      </PaymentCard>

                      <PaymentCard
                        title="Credit / Debit Card"
                        icon={<CreditCard className="w-5 h-5 text-[#C9A961]" />}
                        active={paymentMethod === "card"}
                        onClick={() => setPaymentMethod("card")}
                      >
                        <div className="space-y-3">
                          <FloatingInput
                            label="Card Number"
                            value={paymentData.cardNumber}
                            onChange={(value) =>
                              setPaymentData((s) => ({ ...s, cardNumber: value.replace(/[^\d ]/g, "").slice(0, 19) }))
                            }
                            requiredField
                          />
                          <div className="grid grid-cols-2 gap-3">
                            <FloatingInput
                              label="Expiry (MM/YY)"
                              value={paymentData.expiry}
                              onChange={(value) => setPaymentData((s) => ({ ...s, expiry: value.slice(0, 5) }))}
                              requiredField
                            />
                            <FloatingInput
                              label="CVV"
                              value={paymentData.cvv}
                              onChange={(value) => setPaymentData((s) => ({ ...s, cvv: value.replace(/\D/g, "").slice(0, 3) }))}
                              requiredField
                            />
                          </div>
                        </div>
                      </PaymentCard>

                      <PaymentCard
                        title="Net Banking"
                        icon={<Landmark className="w-5 h-5 text-[#C9A961]" />}
                        active={paymentMethod === "netbanking"}
                        onClick={() => setPaymentMethod("netbanking")}
                      >
                        <div className="relative">
                          <select
                            value={paymentData.bank}
                            onChange={(e) => setPaymentData((s) => ({ ...s, bank: e.target.value }))}
                            className="w-full rounded-xl border-2 border-[#E8DFD1] py-3 px-4 appearance-none focus:border-[#C9A961] outline-none"
                          >
                            <option value="">Select Bank</option>
                            <option>State Bank of India</option>
                            <option>HDFC Bank</option>
                            <option>ICICI Bank</option>
                            <option>Axis Bank</option>
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                        </div>
                      </PaymentCard>

                      <div className="mt-5 flex gap-3">
                        <button
                          onClick={() => setStep(2)}
                          className="px-5 py-3 rounded-xl border border-[#D8CCBE] text-[#374151] font-medium"
                        >
                          Back
                        </button>
                        <button
                          onClick={handlePay}
                          disabled={!canPay || isPaying}
                          className="flex-1 py-3 rounded-xl bg-[#C9A961] text-white text-lg font-semibold disabled:opacity-50"
                        >
                          {isPaying ? "Processing..." : `Pay ₹${clampedAmount.toLocaleString("en-IN")}`}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {isPaying && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-2xl p-8 w-full max-w-sm text-center"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.08, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-20 h-20 mx-auto rounded-full bg-[#EAF0F8] flex items-center justify-center"
                    >
                      <motion.div
                        animate={{ y: [0, 6, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="text-[#1E3A5F]"
                      >
                        <Heart className="w-10 h-10" />
                      </motion.div>
                    </motion.div>
                    <p className="mt-4 font-semibold text-[#1A1A1A]">Securing your payment...</p>
                    <p className="text-sm text-[#6B7280] mt-1">Please do not refresh this page.</p>
                  </motion.div>
                </div>
              )}
            </motion.div>
          ) : (
            <SuccessView
              amount={clampedAmount}
              name={details.fullName}
              campaign={CAMPAIGN_NAME}
              txnId={transactionId}
              date={today}
              impactText={impactText}
              shareText={shareText}
              onNavigate={onNavigate}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

function FloatingInput({
  label,
  value,
  onChange,
  type = "text",
  prefix,
  placeholder,
  requiredField = false,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
  prefix?: string
  placeholder?: string
  requiredField?: boolean
}) {
  return (
    <div className="relative">
      {prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]">{prefix}</span>}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder=" "
        className={`peer w-full rounded-xl border-2 border-[#E8DFD1] bg-white py-3 ${prefix ? "pl-12 pr-4" : "px-4"} focus:border-[#C9A961] focus:ring-2 focus:ring-[#C9A961]/20 outline-none transition-all`}
      />
      <label
        className={`absolute left-3 transition-all pointer-events-none ${
          value ? "top-1 text-[11px] text-[#C9A961] font-medium" : "top-3.5 text-sm text-[#6B7280]"
        }`}
      >
        {placeholder || label}
        {requiredField && <span className="text-[#F59E0B]"> *</span>}
      </label>
    </div>
  )
}

function PaymentCard({
  title,
  badge,
  icon,
  active,
  onClick,
  children,
}: {
  title: string
  badge?: string
  icon: React.ReactNode
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <div className={`rounded-2xl border-2 mb-3 ${active ? "border-[#C9A961] bg-[#C9A961]/10" : "border-[#E8DFD1] bg-white"}`}>
      <button onClick={onClick} className="w-full p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {icon}
          <span className="font-semibold text-[#1A1A1A]">{title}</span>
          {badge && <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#F59E0B] text-white font-semibold">{badge}</span>}
        </div>
        <span className={`w-4 h-4 rounded-full border-2 ${active ? "border-[#C9A961] bg-[#C9A961]" : "border-gray-300"}`} />
      </button>
      <AnimatePresence initial={false}>
        {active && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-4 pb-4">
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-[#6B7280]">{label}</span>
      <span className="font-medium text-[#1A1A1A] text-right">{value}</span>
    </div>
  )
}

function CheckoutStepper({ activeStep }: { activeStep: 2 | 3 }) {
  const steps = [
    { id: 1, label: "Amount" },
    { id: 2, label: "Details" },
    { id: 3, label: "Payment" },
  ]

  return (
    <div className="flex items-center gap-3 text-xs">
      {steps.map((step, idx) => {
        const active = step.id <= activeStep
        return (
          <div key={step.id} className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${active ? "bg-[#C9A961] border-[#C9A961] text-white" : "border-[#D9D3C8] text-[#8B8B8B]"}`}>
              {step.id === activeStep ? <Check className="w-3.5 h-3.5" /> : step.id}
            </div>
            <span className={`${active ? "text-[#1A1A1A] font-semibold" : "text-[#8B8B8B]"}`}>{step.label}</span>
            {idx < steps.length - 1 && <span className="w-7 h-px bg-[#D9D3C8]" />}
          </div>
        )
      })}
    </div>
  )
}

function CheckoutSidePanel({ amount, campaign, compact = false }: { amount: number; campaign: string; compact?: boolean }) {
  const impactCount = Math.max(1, Math.floor(amount / 500))
  return (
    <div className="rounded-2xl border border-[#E8DFD1] bg-[#F8F3EA] p-5">
      <span className="inline-flex px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-[0.12em] bg-[#F6D777] text-[#6B4E00]">
        General Fund
      </span>
      <h3 className="mt-3 font-serif text-3xl font-bold text-[#1A1A1A]">Chiranjeevi Charitable Trust</h3>
      <p className="text-[#6B7280] mt-2 text-sm">Your donation goes where it&apos;s needed most - blood drives, patient support, and community health.</p>

      <div className="mt-4">
        <div className="h-2 bg-[#E6DCCB] rounded-full overflow-hidden">
          <div className="h-full w-[58%] bg-gradient-to-r from-[#1E3A5F] to-[#E49A4E] rounded-full" />
        </div>
        <div className="mt-2 flex justify-between text-xs text-[#6B7280]">
          <span className="font-semibold text-[#1A1A1A]">₹14,80,000 raised</span>
          <span>Goal: ₹24,00,000</span>
        </div>
      </div>

      <div className="mt-4 rounded-xl bg-white border border-[#E8DFD1] p-4">
        <p className="text-[11px] uppercase tracking-[0.12em] text-[#A15B68] font-semibold">Your Impact</p>
        <p className="font-serif text-3xl font-bold text-[#1A1A1A] mt-1">₹{amount.toLocaleString("en-IN")}</p>
        <p className="text-sm text-[#6B7280]">Fund {impactCount} transfusion sessions</p>
      </div>

      <div className="mt-4 space-y-1.5 text-xs text-[#6B7280]">
        <p>🔒 256-bit SSL encrypted payment</p>
        <p>📄 80G tax certificate within 48 hours</p>
        <p>✓ 100% goes to the cause - zero admin fees</p>
      </div>

      {!compact && (
        <div className="mt-5 pt-4 border-t border-[#E3D8C7]">
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#6B7280] font-semibold mb-2">Others Who Contributed</p>
          <div className="space-y-1.5 text-sm">
            <div className="flex items-center justify-between"><span>Had K contributed ₹5,000</span><span className="text-[#A3A3A3]">1h ago</span></div>
            <div className="flex items-center justify-between"><span>Anonymous contributed ₹1,000</span><span className="text-[#A3A3A3]">3h ago</span></div>
            <div className="flex items-center justify-between"><span>Priya M contributed ₹2,500</span><span className="text-[#A3A3A3]">8h ago</span></div>
          </div>
        </div>
      )}

      {compact && (
        <div className="mt-5 rounded-xl bg-white border border-[#E8DFD1] p-4">
          <h4 className="font-semibold text-[#1A1A1A] mb-2">Order Summary</h4>
          <div className="space-y-1.5 text-sm">
            <SummaryRow label="Campaign" value={campaign} />
            <SummaryRow label="Amount" value={`₹${amount.toLocaleString("en-IN")}`} />
          </div>
        </div>
      )}
    </div>
  )
}

function SuccessView({
  amount,
  name,
  campaign,
  txnId,
  date,
  impactText,
  shareText,
  onNavigate,
}: {
  amount: number
  name: string
  campaign: string
  txnId: string
  date: string
  impactText: string
  shareText: string
  onNavigate?: (page: string) => void
}) {
  const confetti = Array.from({ length: 32 }).map((_, i) => i)

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareText)
    } catch {
      // no-op for unsupported clipboard environments
    }
  }

  return (
    <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-[72vh] rounded-3xl bg-[#F8F3EA] border border-[#E8DFD1] relative overflow-hidden p-6 md:p-10">
      <div className="absolute inset-0 pointer-events-none">
        {confetti.map((i) => (
          <motion.span
            key={i}
            initial={{ opacity: 1, y: 0, x: 0, scale: 1 }}
            animate={{
              opacity: 0,
              y: 180 + (i % 5) * 20,
              x: (i % 2 === 0 ? 1 : -1) * (20 + (i % 7) * 12),
              scale: 0.6,
            }}
            transition={{ duration: 1.4, delay: (i % 10) * 0.05 }}
            className="absolute left-1/2 top-24 w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: ["#1E3A5F", "#4B6688", "#F59E0B", "#22C55E"][i % 4] }}
          />
        ))}
      </div>

      <div className="max-w-2xl mx-auto text-center relative z-10">
        <motion.svg width="92" height="92" viewBox="0 0 92 92" className="mx-auto">
          <motion.circle
            cx="46"
            cy="46"
            r="40"
            fill="none"
            stroke="#22C55E"
            strokeWidth="4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.45 }}
          />
          <motion.path
            d="M27 47L40 60L66 33"
            fill="none"
            stroke="#22C55E"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.4, delay: 0.25 }}
          />
        </motion.svg>

        <h2 className="font-serif text-5xl font-bold text-[#1A1A1A] mt-5">Thank you, {name || "Supporter"}!</h2>
        <p className="text-[#6B7280] mt-2">Your contribution of ₹{amount.toLocaleString("en-IN")} makes a real difference</p>

        <div className="mt-6 rounded-2xl border border-[#E8DFD1] bg-white p-5 text-left">
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#6B7280] font-semibold mb-3">Receipt</p>
          <SummaryRow label="Amount" value={`₹${amount.toLocaleString("en-IN")}`} />
          <SummaryRow label="Campaign" value={campaign} />
          <SummaryRow label="Transaction ID" value={txnId} />
          <SummaryRow label="Date" value={date} />
          </div>
        <p className="mt-3 text-[#6B7280]">{`Your ₹${amount.toLocaleString("en-IN")} will help ${impactText.replace(/^₹[\d,]+\s+can fund\s+/u, "")}.`}</p>

        <div className="mt-6">
          <p className="font-semibold text-[#1A1A1A] mb-3">Spread the word</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-lg bg-[#22C55E] text-white font-medium hover:brightness-95 transition"
            >
              WhatsApp
            </a>
            <a
              href={`https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-lg bg-black text-white font-medium hover:opacity-90 transition"
            >
              X
            </a>
            <button onClick={copyLink} className="px-4 py-2 rounded-lg border border-[#D8CCBE] text-[#1A1A1A] font-medium inline-flex items-center gap-2 hover:bg-gray-50">
              <Copy className="w-4 h-4" />
              Copy Link
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => onNavigate?.("home")}
            className="px-5 py-3 rounded-xl border border-[#D8CCBE] bg-white text-[#1A1A1A] font-semibold inline-flex items-center gap-2"
          >
            <Banknote className="w-4 h-4" />
            Back to Home
          </button>
          <button
            onClick={() => onNavigate?.("register")}
            className="px-5 py-3 rounded-xl bg-[#C9A961] text-white font-semibold inline-flex items-center gap-2"
          >
            <Heart className="w-4 h-4" />
            Register as Blood Donor
          </button>
        </div>
      </div>
    </motion.div>
  )
}
