"use client"

import { motion } from "framer-motion"
import { useState, useRef, useEffect, forwardRef } from "react"
import { cn } from "@/lib/utils"

interface CCTInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  helperText?: string
  hideRequiredIndicator?: boolean
  fieldClassName?: string
}

export const CCTInput = forwardRef<HTMLInputElement, CCTInputProps>(
  ({ label, error, helperText, className, fieldClassName, required, hideRequiredIndicator, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false)
    const [hasValue, setHasValue] = useState(false)

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      setHasValue(e.target.value.length > 0)
      props.onBlur?.(e)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(e.target.value.length > 0)
      props.onChange?.(e)
    }

    const isFloating = isFocused || hasValue

    return (
      <div className={cn("relative", className)}>
        <div className="relative">
          <input
            ref={ref}
            {...props}
            onFocus={(e) => {
              setIsFocused(true)
              props.onFocus?.(e)
            }}
            onBlur={handleBlur}
            onChange={handleChange}
            className={cn(
              "peer w-full px-4 py-3 pt-6 border-2 rounded-xl text-[#1A1A1A] bg-white transition-all duration-200 outline-none",
              error 
                ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20" 
                : "border-gray-200 focus:border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/20",
              fieldClassName
            )}
            placeholder=" "
          />
          <motion.label
            initial={false}
            animate={{
              y: isFloating ? -8 : 0,
              scale: isFloating ? 0.85 : 1,
              color: error ? "#DC2626" : isFloating ? "#DC2626" : "#6B7280",
            }}
            transition={{ duration: 0.15 }}
            className="absolute left-4 top-4 origin-left pointer-events-none font-medium"
          >
            {label}
            {required && !hideRequiredIndicator && <span className="text-[#DC2626]"> *</span>}
          </motion.label>
        </div>
        
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5, x: [-2, 2, -2, 2, 0] }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            className="text-sm text-red-500 mt-1.5 ml-1"
          >
            {error}
          </motion.p>
        )}
        
        {helperText && !error && (
          <p className="text-sm text-[#6B7280] mt-1.5 ml-1">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

CCTInput.displayName = "CCTInput"

interface OTPInputProps {
  length?: number
  value: string
  onChange: (value: string) => void
  error?: string
}

export function OTPInput({ length = 6, value, onChange, error }: OTPInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const newChar = e.target.value.slice(-1)
    if (!/^\d*$/.test(newChar)) return

    const newValue = value.split("")
    newValue[index] = newChar
    onChange(newValue.join(""))

    // Auto-focus next input
    if (newChar && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").slice(0, length)
    if (!/^\d*$/.test(pastedData)) return
    onChange(pastedData.padEnd(length, "").slice(0, length))
    inputRefs.current[Math.min(pastedData.length, length - 1)]?.focus()
  }

  return (
    <div>
      <div className="flex gap-2 justify-center">
        {Array.from({ length }).map((_, index) => (
          <motion.input
            key={index}
            ref={(el) => { inputRefs.current[index] = el }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={value[index] || ""}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.05 }}
            whileFocus={{ scale: 1.05, borderColor: "#DC2626" }}
            className={cn(
              "w-12 h-14 text-center text-xl font-bold rounded-xl border-2 transition-all outline-none",
              error
                ? "border-red-500 bg-red-50"
                : value[index]
                ? "border-[#DC2626] bg-red-50"
                : "border-gray-200 bg-white focus:border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/20"
            )}
          />
        ))}
      </div>
      
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-500 mt-3 text-center"
        >
          {error}
        </motion.p>
      )}
    </div>
  )
}

interface CCTTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
  helperText?: string
  hideRequiredIndicator?: boolean
  fieldClassName?: string
}

export const CCTTextarea = forwardRef<HTMLTextAreaElement, CCTTextareaProps>(
  ({ label, error, helperText, className, fieldClassName, required, hideRequiredIndicator, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false)
    const [hasValue, setHasValue] = useState(false)

    const isFloating = isFocused || hasValue

    return (
      <div className={cn("relative", className)}>
        <div className="relative">
          <textarea
            ref={ref}
            {...props}
            onFocus={(e) => {
              setIsFocused(true)
              props.onFocus?.(e)
            }}
            onBlur={(e) => {
              setIsFocused(false)
              setHasValue(e.target.value.length > 0)
              props.onBlur?.(e)
            }}
            onChange={(e) => {
              setHasValue(e.target.value.length > 0)
              props.onChange?.(e)
            }}
            className={cn(
              "peer w-full px-4 py-3 pt-6 border-2 rounded-xl text-[#1A1A1A] bg-white transition-all duration-200 outline-none min-h-[120px] resize-none",
              error 
                ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20" 
                : "border-gray-200 focus:border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/20",
              fieldClassName
            )}
            placeholder=" "
          />
          <motion.label
            initial={false}
            animate={{
              y: isFloating ? -8 : 0,
              scale: isFloating ? 0.85 : 1,
              color: error ? "#DC2626" : isFloating ? "#DC2626" : "#6B7280",
            }}
            transition={{ duration: 0.15 }}
            className="absolute left-4 top-4 origin-left pointer-events-none font-medium"
          >
            {label}
            {required && !hideRequiredIndicator && <span className="text-[#DC2626]"> *</span>}
          </motion.label>
        </div>
        
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-red-500 mt-1.5 ml-1"
          >
            {error}
          </motion.p>
        )}
        
        {helperText && !error && (
          <p className="text-sm text-[#6B7280] mt-1.5 ml-1">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

CCTTextarea.displayName = "CCTTextarea"
