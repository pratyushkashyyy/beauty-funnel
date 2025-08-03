'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import OptimizedImage from './OptimizedImage'
import { useEffect, useState } from 'react'

interface FaceScanAnalysisPageProps {
  capturedImage?: string | null
  onComplete: () => void
}

export default function FaceScanAnalysisPage({ capturedImage, onComplete }: FaceScanAnalysisPageProps) {
  const router = useRouter()
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)

  const analysisSteps = [
    'Analyzing facial features...',
    'Detecting skin tone and texture...',
    'Identifying beauty enhancement opportunities...',
    'Generating personalized recommendations...',
    'Finalizing your beauty plan...'
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => onComplete(), 1000)
          return 100
        }
        return prev + 2
      })
    }, 100)

    return () => clearInterval(interval)
  }, [onComplete])

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= analysisSteps.length - 1) {
          clearInterval(stepInterval)
          return analysisSteps.length - 1
        }
        return prev + 1
      })
    }, 2000)

    return () => clearInterval(stepInterval)
  }, [analysisSteps.length])

  const handleBack = () => {
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-2xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">
            Analyzing your face...
          </h1>
        </motion.div>

        {/* Analysis Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="bg-gray-200 rounded-full h-4 mb-4">
            <motion.div
              className="bg-blue-600 h-4 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${analysisProgress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-lg text-gray-700 font-medium">
            {analysisSteps[currentStep]}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {analysisProgress}% complete
          </p>
        </motion.div>

        {/* Captured Image Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8 flex justify-center"
        >
          <OptimizedImage
            src={capturedImage || "/images/optimized/Frame_1261155189_hhrqjt.webp"}
            alt="Face analysis"
            width={320}
            height={400}
            className="w-80 h-auto rounded-lg border-2 border-gray-300"
            quality={85}
            sizes="(max-width: 768px) 320px, 400px"
          />
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="space-y-4 mb-8"
        >
          <button
            onClick={handleBack}
            className="w-full bg-gray-200 text-gray-800 py-4 px-8 rounded-lg font-semibold text-lg hover:bg-gray-300 transition-all duration-300"
          >
            GO BACK
          </button>
        </motion.div>

        {/* Privacy Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex items-center justify-center space-x-2 text-sm text-gray-600"
        >
          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <span>Your privacy is our priority. You remain anonymous - no one will see your face when you scan it.</span>
        </motion.div>
      </main>
    </div>
  )
} 