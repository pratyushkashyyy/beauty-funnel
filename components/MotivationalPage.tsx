'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface MotivationalPageProps {
  onContinue: () => void
}

export default function MotivationalPage({ onContinue }: MotivationalPageProps) {
  const router = useRouter()

  const handleBack = () => {
    router.push('/')
  }

  return (
    <div className="fixed inset-0 overflow-hidden bg-orange-900">
      {/* Background Images */}
      <div className="absolute inset-0">
        {/* Mobile Background */}
        <div className="block md:hidden absolute inset-0">
          <Image
            src="/images/image_qcmtku.webp"
            alt="Mobile background"
            fill
            className="object-cover"
            priority
          />
        </div>
        {/* Desktop Background */}
        <div className="hidden md:block absolute inset-0">
          <Image
            src="/images/Desktop_ai5ywz.jpg"
            alt="Desktop background"
            fill
            className="object-cover"
            priority
          />
        </div>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="flex justify-between items-center">
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Brand Logo */}
          <div className="flex flex-col items-center">
            <span className="text-sm font-serif text-white">Skyfluence Beauty</span>
          </div>

          {/* Progress Bar */}
          <div className="w-24 h-0.5 bg-white/30 rounded-full">
            <div className="w-3/4 h-full bg-white rounded-full"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center h-full px-4 pb-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-2xl mx-auto"
        >
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-white leading-tight mb-4">
            <span className="italic">So far,</span> there's a 71% chance you can look more attractive.
          </h1>
          <p className="text-sm md:text-base text-white/80 italic mb-8">
            We can improve your chances. Let's know your face better to see if you have even more potential.
          </p>
        </motion.div>
      </main>

      {/* Continue Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="fixed bottom-6 left-0 right-0 z-50 px-4"
      >
        <div className="max-w-md mx-auto">
          <button
            onClick={onContinue}
            className="w-full bg-transparent border border-white text-white py-4 px-8 rounded-lg font-semibold text-lg hover:bg-white hover:text-black transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            CONTINUE
          </button>
        </div>
      </motion.div>
    </div>
  )
} 