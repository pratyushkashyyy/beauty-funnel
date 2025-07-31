'use client'

import { motion } from 'framer-motion'

interface QuizHeaderProps {
  currentStep: number
  totalSteps: number
  onBack: () => void
  isSpecialPage?: boolean
  currentPageId?: number
}

export default function QuizHeader({ currentStep, totalSteps, onBack, isSpecialPage = false, currentPageId }: QuizHeaderProps) {
  // Calculate progress based on current page ID or current step
  const getProgress = () => {
    if (currentPageId) {
      // Use the actual page ID for accurate progress calculation
      return (currentPageId / 26) * 100 // 26 is the total number of pages
    }
    // Fallback to original calculation for regular quiz questions
    return (currentStep / totalSteps) * 100
  }

  const progress = getProgress()

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="px-4">
        <div className="flex items-center justify-between h-14">
          {/* Back Button - Mobile optimized */}
          <button
            onClick={onBack}
            className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors touch-manipulation"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Brand Logo - Mobile sized */}
          <div className="flex flex-col items-center">
            {isSpecialPage ? (
              <>
                <span className="text-lg font-serif text-gray-800">Skyfluence</span>
                <span className="text-xs font-serif text-gray-600">Beauty</span>
              </>
            ) : (
              <span className="text-lg font-semibold text-gray-800">Skyfluence Beauty</span>
            )}
          </div>

          {/* Progress Bar - Mobile optimized */}
          <div className="w-20 h-1 bg-gray-200 rounded-full">
            <motion.div
              className="h-full bg-black rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>
    </header>
  )
} 