'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

interface FaceScanPageProps {
  onContinue: () => void
  onSkip: () => void
}

export default function FaceScanPage({ onContinue, onSkip }: FaceScanPageProps) {
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
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            Let's customize your experience perfectly.
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Scanning your face provides valuable insights to reveal your most beautiful self. It's quick, and completely private - your scan stays <strong>confidential</strong> and is <strong>never viewed by others.</strong>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mb-8"
        >
          <div className="relative w-full max-w-md mx-auto">
            <div className="relative">
              <img
                src="/images/scan-photo_vyk9gf.jpg"
                alt="Woman's face for scanning"
                className="w-full h-auto rounded-lg"
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mb-8"
        >
          <p className="text-lg text-gray-700 font-medium">
            <strong>93,451</strong> people like you already scanned their face.
          </p>
        </motion.div>

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
            LET'S DO IT
          </button>
          <button
            onClick={onSkip}
            className="w-full text-gray-600 hover:text-gray-800 transition-colors font-medium"
          >
            DO IT LATER
          </button>
        </motion.div>

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