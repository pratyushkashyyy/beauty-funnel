'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

interface SocialProofPageProps {
  onContinue: () => void
}

export default function SocialProofPage({ onContinue }: SocialProofPageProps) {
  const router = useRouter()

  const handleBack = () => {
    router.push('/')
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        {/* Desktop Background Image */}
        <img
          src="/images/Desktop_ai5ywz.jpg"
          alt="Desktop background"
          className="hidden md:block w-full h-full object-cover"
          loading="lazy"
        />
        {/* Mobile Background Image */}
        <img
          src="/images/image_qcmtku.webp"
          alt="Mobile background"
          className="block md:hidden w-full h-full object-cover"
          loading="lazy"
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
        <div className="px-4">
          <div className="flex justify-between items-center h-14">
            {/* Brand Logo - Mobile optimized */}
            <div className="flex flex-col">
              <span className="text-lg font-serif text-gray-800">Skyfluence</span>
              <span className="text-xs font-serif text-gray-600 ml-3">Beauty</span>
            </div>

            {/* Mobile Header Buttons */}
            <div className="flex items-center space-x-2">
              {/* Support Button - Mobile sized */}
              <button className="flex items-center space-x-1 px-3 py-2 bg-black text-white rounded-lg text-xs font-medium hover:bg-gray-800 transition-colors">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                <span>Support</span>
              </button>

              {/* Hamburger Menu - Mobile sized */}
              <button className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Main Content */}
      <main className="pt-14 min-h-screen flex flex-col px-4">
        <div className="w-full max-w-sm mx-auto text-center flex-1 flex flex-col justify-center">
          {/* Mobile Headline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <h1 className="text-2xl font-['Playfair Display'] font-bold text-white mb-2 leading-tight drop-shadow-lg">
              You're Not Alone
            </h1>
            <p className="text-base text-white drop-shadow-md leading-relaxed">
              WE'VE HELPED 670,329 WOMEN WITH SIMILAR CONCERNS
            </p>
          </motion.div>
        </div>
      </main>

      {/* Mobile Continue Button - Fixed at bottom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="fixed bottom-20 left-0 right-0 px-4 z-10"
      >
        <div className="max-w-sm mx-auto">
          <button
            onClick={onContinue}
            className="w-full bg-white text-black px-6 py-4 rounded-lg font-semibold text-base hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl touch-manipulation"
          >
            CONTINUE
          </button>
        </div>
      </motion.div>

      {/* Mobile Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 py-3">
        <div className="px-4">
          <p className="text-center text-xs text-gray-600 leading-relaxed">
            By continuing, I agree to Skyfluence's{' '}
            <a href="#" className="underline hover:text-gray-800">Privacy policy</a>
            {' '}and{' '}
            <a href="#" className="underline hover:text-gray-800">Terms of Use</a>
          </p>
        </div>
      </footer>
    </div>
  )
} 