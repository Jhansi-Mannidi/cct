"use client"

import { motion, HTMLMotionProps } from "framer-motion"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { forwardRef } from "react"

interface CCTButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  isLoading?: boolean
  children: React.ReactNode
}

const CCTButton = forwardRef<HTMLButtonElement, CCTButtonProps>(
  ({ variant = "primary", size = "md", isLoading = false, children, className, disabled, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-semibold rounded-full border transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
    
    const variants = {
      primary: "bg-[#0A0A0A] border-[#0A0A0A] text-white hover:bg-black focus:ring-black shadow-sm",
      secondary: "bg-[#1E3A5F] border-[#1E3A5F] text-white hover:bg-[#2D4A6F] focus:ring-[#1E3A5F] shadow-sm",
      outline: "bg-[#F8F5F0] border-[#D8CCBE] text-[#1A1A1A] hover:bg-white focus:ring-[#D8CCBE]",
      ghost: "bg-transparent border-transparent text-[#1A1A1A] hover:bg-black/5 focus:ring-[#D8CCBE]",
    }
    
    const sizes = {
      sm: "px-4 py-2 text-sm gap-2",
      md: "px-6 py-2.5 text-base gap-2",
      lg: "px-8 py-3 text-lg gap-3",
    }
    
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.02, y: disabled || isLoading ? 0 : -2 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
        {children}
      </motion.button>
    )
  }
)

CCTButton.displayName = "CCTButton"

export { CCTButton }
