'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

interface ResultsPreviewPageProps {
  onContinue: () => void
}

export default function ResultsPreviewPage({ onContinue }: ResultsPreviewPageProps) {
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  const handleBack = () => {
    router.push('/')
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Responsive Background Images */}
      <div className="absolute inset-0">
        {/* Desktop Background */}
        <img
          src="/images/Desktop_2_gltvhs.png"
          alt="Results background desktop"
          className="hidden md:block w-full h-full object-cover"
          loading="lazy"
        />
        {/* Mobile Background */}
        <img
          src="/images/image-3_nbxiwu.png"
          alt="Results background mobile"
          className="block md:hidden w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Loading Animation Overlay */}
      {loading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 transition-opacity duration-700">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-6"></div>
            <span className="text-white text-xl font-semibold drop-shadow-lg">Analyzing your results...</span>
          </div>
        </div>
      )}

      {/* Main Content - no card, just text and button */}
      {!loading && (
        <main className="relative z-10 flex flex-col items-center justify-end min-h-screen px-4 pb-24">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-4xl font-display font-bold text-white mb-6 leading-tight drop-shadow-lg text-center"
          >
            Your Results Are In!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-white mb-4 leading-relaxed italic drop-shadow-md text-center"
          >
            Based on your answers, <span className="not-italic font-bold">we're <span className='italic'>93% sure</span></span> you can look more attractive!
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base md:text-lg text-white mb-10 leading-relaxed drop-shadow text-center"
          >
            You're going to do great!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="w-full max-w-md"
          >
            <button
              onClick={onContinue}
              className="w-full bg-transparent border border-white text-white py-4 px-8 rounded-lg font-semibold text-lg hover:bg-white hover:text-black transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              CONTINUE
            </button>
          </motion.div>
        </main>
      )}
    </div>
  )
} 