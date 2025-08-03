'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import OptimizedImage from './OptimizedImage'

interface MotivationalPageProps {
  onContinue: () => void
}

export default function MotivationalPage({ onContinue }: MotivationalPageProps) {
  const router = useRouter()

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
            You're just 2 minutes away from discovering your personalized beauty plan
          </h1>
        </motion.div>

        {/* Single Provided Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 flex justify-center"
        >
          <OptimizedImage
            src="/images/optimized/image_qcmtku.webp"
            alt="Motivational beauty image"
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
            onClick={onContinue}
            className="w-full bg-black text-white py-4 px-8 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            START MY ANALYSIS
          </button>
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