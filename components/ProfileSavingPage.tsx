'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

interface ProfileSavingPageProps {
  onContinue: () => void
}

export default function ProfileSavingPage({ onContinue }: ProfileSavingPageProps) {
  const router = useRouter()

  const handleBack = () => {
    router.push('/')
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
          alt="Person in elegant outfit"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Header */}
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
            <div className="w-full h-full bg-white rounded-full"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            You're on Track to Your Most Beautiful Self.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-white/90 mb-12 leading-relaxed"
          >
            Let's securely save your profile to get recommendations that match your preferences.
          </motion.p>
        </motion.div>
      </main>

      {/* Continue Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative z-10 fixed bottom-0 left-0 right-0 p-6"
      >
        <div className="max-w-2xl mx-auto">
          <button
            onClick={onContinue}
            className="w-full bg-white/90 backdrop-blur-sm text-black py-4 px-8 rounded-lg font-semibold text-lg hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl border border-white/20"
          >
            CONTINUE
          </button>
        </div>
      </motion.div>
    </div>
  )
} 