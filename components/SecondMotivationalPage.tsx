'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface SecondMotivationalPageProps {
  onContinue: () => void
}

export default function SecondMotivationalPage({ onContinue }: SecondMotivationalPageProps) {
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
            src="/images/image-2_ulkvx0.jpg"
            alt="Mobile background"
            fill
            className="object-cover"
            priority
          />
        </div>
        {/* Desktop Background */}
        <div className="hidden md:block absolute inset-0">
          <Image
            src="/images/Desktop_1_bfoa8b.jpg"
            alt="Desktop background"
            fill
            className="object-cover"
            priority
          />
        </div>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      <header className="relative z-10 p-6">
        <div className="flex justify-between items-center">
          <button
            onClick={handleBack}
            className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex flex-col items-center">
            <span className="text-xl font-semibold text-white">Skyfluence</span>
            <span className="text-sm text-white/80">Beauty</span>
          </div>
          <div className="w-24 h-1 bg-white/30 rounded-full">
            <div className="w-3/4 h-full bg-white rounded-full"></div>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex items-center justify-center h-full px-6 pb-32">
        <div className="max-w-2xl mx-auto w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold leading-tight mb-4">
              We're 71% confident you can look<br />
              <span className="italic font-bold">more attractive!</span>
            </h1>
            <p className="text-sm md:text-base text-white/80 italic mb-8">
              Progress mode! We need a few more details to confirm your results.
            </p>
          </motion.div>
        </div>
      </main>

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