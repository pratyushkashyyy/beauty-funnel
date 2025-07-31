'use client'

import { motion } from 'framer-motion'

interface QuizNavigationProps {
  currentStep: number
  totalSteps: number
  canProceed: boolean
  onNext: () => void
  onPrevious: () => void
  isMultiSelect?: boolean
}

export default function QuizNavigation({ 
  currentStep, 
  totalSteps, 
  canProceed, 
  onNext, 
  onPrevious,
  isMultiSelect = false
}: QuizNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
      <div className="flex justify-center">
        {/* Continue Button - Show when any answer is selected */}
        {canProceed && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onClick={onNext}
            disabled={!canProceed}
            className={`w-full max-w-md py-4 px-6 rounded-lg font-semibold text-base transition-all duration-300 touch-manipulation ${
              canProceed
                ? 'bg-black text-white hover:bg-gray-800 shadow-lg hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            CONTINUE
          </motion.button>
        )}
      </div>
    </div>
  )
} 