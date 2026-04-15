"use client"

import { cn } from "@/lib/utils"

interface SkeletonProps {
  className?: string
}

export function CCTSkeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "bg-gray-200 rounded-lg animate-shimmer",
        className
      )}
      style={{
        background: "linear-gradient(90deg, #e5e5e5 25%, #d4d4d4 50%, #e5e5e5 75%)",
        backgroundSize: "200% 100%",
      }}
    />
  )
}

export function CardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg shadow-black/5 border border-gray-100">
      <CCTSkeleton className="h-48 w-full rounded-xl mb-4" />
      <CCTSkeleton className="h-6 w-3/4 mb-2" />
      <CCTSkeleton className="h-4 w-full mb-4" />
      <CCTSkeleton className="h-2 w-full rounded-full mb-4" />
      <div className="flex justify-between">
        <CCTSkeleton className="h-4 w-20" />
        <CCTSkeleton className="h-4 w-16" />
      </div>
    </div>
  )
}

export function EventCardSkeleton() {
  return (
    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
      <div className="flex items-start justify-between mb-4">
        <div>
          <CCTSkeleton className="h-4 w-24 mb-2" />
          <CCTSkeleton className="h-6 w-40" />
        </div>
        <CCTSkeleton className="h-6 w-16 rounded-full" />
      </div>
      <CCTSkeleton className="h-4 w-32 mb-3" />
      <CCTSkeleton className="h-4 w-20" />
    </div>
  )
}

export function StatCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg shadow-black/5 border border-gray-100 text-center">
      <CCTSkeleton className="w-12 h-12 rounded-xl mx-auto mb-4" />
      <CCTSkeleton className="h-10 w-24 mx-auto mb-2" />
      <CCTSkeleton className="h-4 w-20 mx-auto" />
    </div>
  )
}

export function DonorCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-lg shadow-black/5 border border-gray-100 flex items-center gap-4">
      <CCTSkeleton className="w-14 h-14 rounded-full flex-shrink-0" />
      <div className="flex-1">
        <CCTSkeleton className="h-5 w-32 mb-1" />
        <CCTSkeleton className="h-4 w-24" />
      </div>
      <CCTSkeleton className="w-12 h-8 rounded-lg" />
    </div>
  )
}

export function TableRowSkeleton() {
  return (
    <div className="flex items-center gap-4 py-4 border-b border-gray-100">
      <CCTSkeleton className="w-10 h-10 rounded-full flex-shrink-0" />
      <CCTSkeleton className="h-4 w-32" />
      <CCTSkeleton className="h-4 w-24 ml-auto" />
      <CCTSkeleton className="h-4 w-16" />
      <CCTSkeleton className="h-8 w-20 rounded-lg" />
    </div>
  )
}

export function ProfileSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg shadow-black/5 border border-gray-100">
      <div className="flex items-center gap-6 mb-8">
        <CCTSkeleton className="w-24 h-24 rounded-full" />
        <div>
          <CCTSkeleton className="h-8 w-48 mb-2" />
          <CCTSkeleton className="h-4 w-32" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>
    </div>
  )
}
